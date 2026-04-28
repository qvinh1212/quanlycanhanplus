import { FieldValue, Timestamp, type DocumentData } from "firebase-admin/firestore";
import { getFirebaseAdminDb } from "@/lib/firebase/admin";
import type { FinanceDataAdapter } from "@/lib/db/adapter";
import type {
  Budget,
  Category,
  Transaction,
  UserDashboardSummary,
  UserProfile,
  Wallet,
} from "@/lib/types";
import type {
  CreateBudgetInput,
  CreateTransactionInput,
  CreateWalletInput,
  UpdateBudgetInput,
  UpdateTransactionInput,
  UpdateWalletInput,
} from "@/lib/db/repository";
import type {
  BudgetRiskItem,
  CategoryReportItem,
  DailyReportItem,
  ReportsAnalytics,
  WalletReportItem,
} from "@/lib/report-types";

const DEFAULT_CURRENCY = "VND" as const;
const DEFAULT_CATEGORY_IDS = {
  food: "cat-food",
  transport: "cat-transport",
  salary: "cat-salary",
} as const;
const DEFAULT_WALLET_IDS = {
  cash: "wallet-cash",
  bank: "wallet-bank",
} as const;

function userDoc(userId: string) {
  return getFirebaseAdminDb().collection("users").doc(userId);
}

function userCollection(userId: string, name: string) {
  return userDoc(userId).collection(name);
}

function serverTimestamp() {
  return FieldValue.serverTimestamp();
}

function toDate(value: unknown): Date {
  if (value instanceof Date) return value;
  if (value instanceof Timestamp) return value.toDate();
  if (typeof value === "string" || typeof value === "number") return new Date(value);
  return new Date();
}

function hydrate<T extends { createdAt: Date; updatedAt: Date }>(id: string, data: DocumentData): T {
  return {
    id,
    ...data,
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
    occurredAt: data.occurredAt ? toDate(data.occurredAt) : undefined,
    startDate: data.startDate ? toDate(data.startDate) : undefined,
    endDate: data.endDate ? toDate(data.endDate) : undefined,
  } as unknown as T;
}

function withoutUndefined<T extends Record<string, unknown>>(value: T) {
  return Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined));
}

async function listCollection<T extends { createdAt: Date; updatedAt: Date }>(
  userId: string,
  name: string,
  orderField = "createdAt",
) {
  const snapshot = await userCollection(userId, name).orderBy(orderField, "desc").get();
  return snapshot.docs.map((item) => hydrate<T>(item.id, item.data()));
}

function computeWalletsWithBalances(wallets: Wallet[], transactions: Transaction[]) {
  return wallets.map((wallet) => {
    const balanceDelta = transactions
      .filter((transaction) => transaction.walletId === wallet.id && transaction.status === "completed")
      .reduce((sum, transaction) => {
        if (transaction.type === "income") return sum + transaction.amount;
        if (transaction.type === "expense") return sum - transaction.amount;
        return sum;
      }, 0);

    return { ...wallet, currentBalance: wallet.initialBalance + balanceDelta };
  });
}

function sumTransactions(transactions: Transaction[], type: Transaction["type"], startDate: Date, endDate: Date) {
  return transactions
    .filter((transaction) => {
      const occurredAt = transaction.occurredAt.getTime();
      return transaction.type === type && occurredAt >= startDate.getTime() && occurredAt <= endDate.getTime();
    })
    .reduce((sum, transaction) => sum + transaction.amount, 0);
}

function isTransactionInBudget(transaction: Transaction, budget: Budget) {
  if (transaction.userId !== budget.userId) return false;
  if (transaction.type !== "expense") return false;
  if (transaction.status !== "completed") return false;
  if (budget.categoryId && transaction.categoryId !== budget.categoryId) return false;
  if (budget.walletId && transaction.walletId !== budget.walletId) return false;

  const occurredAt = transaction.occurredAt.getTime();
  return occurredAt >= budget.startDate.getTime() && occurredAt <= budget.endDate.getTime();
}

function hydrateBudgetTracking(budget: Budget, transactions: Transaction[]): Budget {
  const amountSpent = transactions
    .filter((transaction) => isTransactionInBudget(transaction, budget))
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return { ...budget, amountSpent };
}

function buildCategoryBreakdown(
  transactions: Transaction[],
  categories: Category[],
  totalExpense: number,
): CategoryReportItem[] {
  const categoryMap = new Map<string, { category: Category; amount: number; transactionCount: number }>();

  transactions.forEach((transaction) => {
    const category = categories.find((item) => item.id === transaction.categoryId);
    if (!category) return;
    const current = categoryMap.get(category.id) ?? { category, amount: 0, transactionCount: 0 };
    categoryMap.set(category.id, {
      category,
      amount: current.amount + transaction.amount,
      transactionCount: current.transactionCount + 1,
    });
  });

  return [...categoryMap.values()]
    .map(({ category, amount, transactionCount }) => ({
      categoryId: category.id,
      name: category.name,
      icon: category.icon,
      color: category.color,
      amount,
      transactionCount,
      percentage: Math.round((amount / Math.max(totalExpense, 1)) * 100),
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);
}

function buildDailyCashflow(transactions: Transaction[], monthStart: Date, now: Date): DailyReportItem[] {
  return Array.from({ length: now.getDate() }, (_, index) => {
    const date = new Date(monthStart.getFullYear(), monthStart.getMonth(), index + 1);
    const dateKey = date.toISOString().slice(0, 10);
    const dayTransactions = transactions.filter(
      (transaction) => transaction.occurredAt.toISOString().slice(0, 10) === dateKey,
    );
    const income = dayTransactions
      .filter((transaction) => transaction.type === "income")
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    const expense = dayTransactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    return { date: dateKey, income, expense, net: income - expense };
  });
}

function buildWalletDistribution(wallets: Wallet[]): WalletReportItem[] {
  const activeWallets = wallets.filter((wallet) => !wallet.isArchived);
  const totalBalance = activeWallets.reduce((sum, wallet) => sum + Math.max(wallet.currentBalance, 0), 0);

  return activeWallets
    .map((wallet) => ({
      walletId: wallet.id,
      name: wallet.name,
      icon: wallet.icon,
      color: wallet.color,
      balance: wallet.currentBalance,
      percentage: Math.round((Math.max(wallet.currentBalance, 0) / Math.max(totalBalance, 1)) * 100),
    }))
    .sort((a, b) => b.balance - a.balance);
}

function buildFinancialInsight(
  savingRate: number,
  highestRiskBudget?: BudgetRiskItem,
  topCategory?: CategoryReportItem,
) {
  if (highestRiskBudget && highestRiskBudget.percentage >= 90) {
    return `Ngân sách ${highestRiskBudget.name} đã dùng ${highestRiskBudget.percentage}%. Nên giảm chi hoặc tăng hạn mức trong kỳ này.`;
  }

  if (savingRate < 20) {
    return `Tỷ lệ tiết kiệm hiện là ${savingRate}%. Hãy rà soát nhóm ${topCategory?.name ?? "chi tiêu lớn"} để đưa mức tiết kiệm về trên 20%.`;
  }

  return `Dòng tiền đang khỏe với tỷ lệ tiết kiệm ${savingRate}%. Tiếp tục duy trì và ưu tiên tăng tích lũy tự động.`;
}

export class FirestoreFinanceDataAdapter implements FinanceDataAdapter {
  async getCurrentUser(): Promise<UserProfile> {
    throw new Error("Use Firebase Auth currentUser on the client or pass the authenticated uid to server actions.");
  }

  async ensureUserProfile(user: Pick<UserProfile, "id" | "email" | "displayName">) {
    const ref = userDoc(user.id);
    const snapshot = await ref.get();
    if (snapshot.exists) return hydrate<UserProfile>(snapshot.id, snapshot.data() ?? {});

    const profile = {
      email: user.email,
      displayName: user.displayName,
      defaultCurrency: DEFAULT_CURRENCY,
      locale: "vi-VN",
      timezone: "Asia/Ho_Chi_Minh",
      status: "active",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await ref.set(profile);
    const nextSnapshot = await ref.get();
    return hydrate<UserProfile>(nextSnapshot.id, nextSnapshot.data() ?? profile);
  }

  async seedUserWorkspaceIfEmpty(userId: string) {
    const existingWallets = await userCollection(userId, "wallets").orderBy("createdAt", "desc").get();
    if (!existingWallets.empty) return false;

    const now = serverTimestamp();
    const today = new Date();
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const batch = getFirebaseAdminDb().batch();

    const wallets = [
      {
        id: DEFAULT_WALLET_IDS.cash,
        data: {
          userId,
          name: "Tiền mặt",
          type: "cash",
          currency: DEFAULT_CURRENCY,
          initialBalance: 5_000_000,
          currentBalance: 5_000_000,
          color: "#003297",
          icon: "payments",
          isDefault: true,
          isArchived: false,
          createdAt: now,
          updatedAt: now,
        },
      },
      {
        id: DEFAULT_WALLET_IDS.bank,
        data: {
          userId,
          name: "Tài khoản ngân hàng",
          type: "bank",
          currency: DEFAULT_CURRENCY,
          initialBalance: 20_000_000,
          currentBalance: 20_000_000,
          color: "#006c49",
          icon: "account_balance",
          isDefault: false,
          isArchived: false,
          createdAt: now,
          updatedAt: now,
        },
      },
    ];

    const categories = [
      {
        id: DEFAULT_CATEGORY_IDS.food,
        data: {
          userId,
          name: "Ăn uống",
          kind: "expense",
          icon: "restaurant",
          color: "#764900",
          isSystem: true,
          isArchived: false,
          createdAt: now,
          updatedAt: now,
        },
      },
      {
        id: DEFAULT_CATEGORY_IDS.transport,
        data: {
          userId,
          name: "Di chuyển",
          kind: "expense",
          icon: "directions_car",
          color: "#254bb3",
          isSystem: true,
          isArchived: false,
          createdAt: now,
          updatedAt: now,
        },
      },
      {
        id: DEFAULT_CATEGORY_IDS.salary,
        data: {
          userId,
          name: "Lương tháng",
          kind: "income",
          icon: "account_balance_wallet",
          color: "#006c49",
          isSystem: true,
          isArchived: false,
          createdAt: now,
          updatedAt: now,
        },
      },
    ];

    const transactions = [
      {
        title: "Ăn trưa văn phòng",
        type: "expense",
        amount: 120_000,
        walletId: DEFAULT_WALLET_IDS.cash,
        categoryId: DEFAULT_CATEGORY_IDS.food,
        note: "Dữ liệu mẫu để bắt đầu theo dõi chi tiêu",
        occurredAt: today,
        tags: ["daily", "food"],
      },
      {
        title: "Grab đi làm",
        type: "expense",
        amount: 50_000,
        walletId: DEFAULT_WALLET_IDS.cash,
        categoryId: DEFAULT_CATEGORY_IDS.transport,
        note: "Dữ liệu mẫu có thể chỉnh sửa hoặc xoá",
        occurredAt: today,
        tags: ["transport"],
      },
      {
        title: "Lương tháng",
        type: "income",
        amount: 15_000_000,
        walletId: DEFAULT_WALLET_IDS.bank,
        categoryId: DEFAULT_CATEGORY_IDS.salary,
        note: "Khoản thu nhập mẫu",
        occurredAt: yesterday,
        tags: ["salary"],
      },
    ];

    wallets.forEach((wallet) => {
      batch.set(userCollection(userId, "wallets").doc(wallet.id), wallet.data);
    });
    categories.forEach((category) => {
      batch.set(userCollection(userId, "categories").doc(category.id), category.data);
    });
    transactions.forEach((transaction) => {
      batch.set(userCollection(userId, "transactions").doc(), {
        ...transaction,
        userId,
        currency: DEFAULT_CURRENCY,
        status: "completed",
        createdAt: now,
        updatedAt: now,
      });
    });
    batch.set(userCollection(userId, "budgets").doc("budget-food-monthly"), {
      userId,
      name: "Ăn uống tháng này",
      categoryId: DEFAULT_CATEGORY_IDS.food,
      amountLimit: 4_000_000,
      amountSpent: 0,
      currency: DEFAULT_CURRENCY,
      period: "monthly",
      startDate: monthStart,
      endDate: monthEnd,
      alertThresholdPercent: 80,
      status: "active",
      createdAt: now,
      updatedAt: now,
    });

    await batch.commit();
    return true;
  }

  async getDashboardSummary(userId: string): Promise<UserDashboardSummary> {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    const transactions = (await this.listTransactions(userId)).filter((item) => item.status === "completed");
    const wallets = await this.listWallets(userId);

    return {
      totalBalance: wallets.reduce((sum, wallet) => sum + wallet.currentBalance, 0),
      todayIncome: sumTransactions(transactions, "income", todayStart, todayEnd),
      todayExpense: sumTransactions(transactions, "expense", todayStart, todayEnd),
      monthlyIncome: sumTransactions(transactions, "income", monthStart, monthEnd),
      monthlyExpense: sumTransactions(transactions, "expense", monthStart, monthEnd),
      currency: DEFAULT_CURRENCY,
    };
  }

  async listWallets(userId: string) {
    const wallets = (await listCollection<Wallet>(userId, "wallets")).filter((wallet) => !wallet.isArchived);
    const transactions = await this.listTransactions(userId);
    return computeWalletsWithBalances(wallets, transactions);
  }

  async getWallet(userId: string, walletId: string) {
    const snapshot = await userCollection(userId, "wallets").doc(walletId).get();
    if (!snapshot.exists) return null;
    const wallet = hydrate<Wallet>(snapshot.id, snapshot.data() ?? {});
    if (wallet.isArchived) return null;
    const [withBalance] = computeWalletsWithBalances([wallet], await this.listTransactions(userId));
    return withBalance;
  }

  async createWallet(userId: string, input: CreateWalletInput) {
    const now = serverTimestamp();
    const payload = {
      ...input,
      userId,
      currency: input.currency ?? DEFAULT_CURRENCY,
      color: input.color ?? "#254bb3",
      icon: input.icon ?? "account_balance_wallet",
      currentBalance: input.initialBalance,
      isDefault: false,
      isArchived: false,
      createdAt: now,
      updatedAt: now,
    };
    const ref = userCollection(userId, "wallets").doc();
    await ref.set(payload);
    return hydrate<Wallet>(ref.id, { ...payload, createdAt: new Date(), updatedAt: new Date() });
  }

  async updateWallet(userId: string, walletId: string, input: UpdateWalletInput) {
    const ref = userCollection(userId, "wallets").doc(walletId);
    const snapshot = await ref.get();
    if (!snapshot.exists) return null;
    await ref.update(withoutUndefined({ ...input, updatedAt: serverTimestamp() }));
    return this.getWallet(userId, walletId);
  }

  async archiveWallet(userId: string, walletId: string) {
    return this.updateWallet(userId, walletId, { isArchived: true });
  }

  async listCategories(userId: string) {
    return (await listCollection<Category>(userId, "categories")).filter((item) => !item.isArchived);
  }

  async listTransactions(userId: string) {
    const snapshot = await userCollection(userId, "transactions")
      .where("status", "!=", "cancelled")
      .orderBy("status")
      .orderBy("occurredAt", "desc")
      .get();
    return snapshot.docs.map((item) => hydrate<Transaction>(item.id, item.data()));
  }

  async getTransaction(userId: string, transactionId: string) {
    const snapshot = await userCollection(userId, "transactions").doc(transactionId).get();
    if (!snapshot.exists) return null;
    const transaction = hydrate<Transaction>(snapshot.id, snapshot.data() ?? {});
    return transaction.status === "cancelled" ? null : transaction;
  }

  async createTransaction(userId: string, input: CreateTransactionInput) {
    const now = serverTimestamp();
    const payload = withoutUndefined({
      ...input,
      userId,
      currency: DEFAULT_CURRENCY,
      occurredAt: input.occurredAt ?? new Date(),
      status: "completed",
      tags: input.tags ?? [],
      createdAt: now,
      updatedAt: now,
    });
    const ref = userCollection(userId, "transactions").doc();
    await ref.set(payload);
    return hydrate<Transaction>(ref.id, { ...payload, createdAt: new Date(), updatedAt: new Date() });
  }

  async updateTransaction(userId: string, transactionId: string, input: UpdateTransactionInput) {
    const ref = userCollection(userId, "transactions").doc(transactionId);
    const snapshot = await ref.get();
    if (!snapshot.exists) return null;
    await ref.update(withoutUndefined({ ...input, updatedAt: serverTimestamp() }));
    return this.getTransaction(userId, transactionId);
  }

  async archiveTransaction(userId: string, transactionId: string) {
    return this.updateTransaction(userId, transactionId, { status: "cancelled" });
  }

  async listBudgets(userId: string) {
    const transactions = await this.listTransactions(userId);
    return (await listCollection<Budget>(userId, "budgets"))
      .filter((budget) => budget.status !== "archived")
      .map((budget) => hydrateBudgetTracking(budget, transactions));
  }

  async getBudget(userId: string, budgetId: string) {
    const snapshot = await userCollection(userId, "budgets").doc(budgetId).get();
    if (!snapshot.exists) return null;
    const budget = hydrate<Budget>(snapshot.id, snapshot.data() ?? {});
    if (budget.status === "archived") return null;
    return hydrateBudgetTracking(budget, await this.listTransactions(userId));
  }

  async createBudget(userId: string, input: CreateBudgetInput) {
    const now = serverTimestamp();
    const payload = withoutUndefined({
      ...input,
      userId,
      amountSpent: 0,
      currency: DEFAULT_CURRENCY,
      alertThresholdPercent: input.alertThresholdPercent ?? 80,
      status: "active",
      createdAt: now,
      updatedAt: now,
    });
    const ref = userCollection(userId, "budgets").doc();
    await ref.set(payload);
    return hydrate<Budget>(ref.id, { ...payload, createdAt: new Date(), updatedAt: new Date() });
  }

  async updateBudget(userId: string, budgetId: string, input: UpdateBudgetInput) {
    const ref = userCollection(userId, "budgets").doc(budgetId);
    const snapshot = await ref.get();
    if (!snapshot.exists) return null;
    await ref.update(withoutUndefined({ ...input, updatedAt: serverTimestamp() }));
    return this.getBudget(userId, budgetId);
  }

  async archiveBudget(userId: string, budgetId: string) {
    return this.updateBudget(userId, budgetId, { status: "archived" });
  }

  async getReportsAnalytics(userId: string): Promise<ReportsAnalytics> {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    const [transactions, categories, wallets, budgets] = await Promise.all([
      this.listTransactions(userId),
      this.listCategories(userId),
      this.listWallets(userId),
      this.listBudgets(userId),
    ]);
    const monthlyTransactions = transactions.filter((transaction) => {
      const occurredAt = transaction.occurredAt.getTime();
      return transaction.status === "completed" && occurredAt >= monthStart.getTime() && occurredAt <= monthEnd.getTime();
    });
    const monthlyExpenses = monthlyTransactions.filter((transaction) => transaction.type === "expense");
    const totalIncome = sumTransactions(monthlyTransactions, "income", monthStart, monthEnd);
    const totalExpense = sumTransactions(monthlyTransactions, "expense", monthStart, monthEnd);
    const savingRate = totalIncome > 0 ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100) : 0;
    const topExpenseCategories = buildCategoryBreakdown(monthlyExpenses, categories, totalExpense);
    const budgetRisks = budgets
      .map((budget) => ({
        id: budget.id,
        name: budget.name,
        amountLimit: budget.amountLimit,
        amountSpent: budget.amountSpent,
        percentage: Math.round((budget.amountSpent / Math.max(budget.amountLimit, 1)) * 100),
        status: budget.status,
      }))
      .sort((a, b) => b.percentage - a.percentage);

    return {
      periodLabel: `Tháng ${now.getMonth() + 1}/${now.getFullYear()}`,
      totalIncome,
      totalExpense,
      netCashflow: totalIncome - totalExpense,
      savingRate,
      averageDailyExpense: Math.round(totalExpense / Math.max(now.getDate(), 1)),
      largestExpense: monthlyExpenses.sort((a, b) => b.amount - a.amount).at(0) ?? null,
      topExpenseCategories,
      dailyCashflow: buildDailyCashflow(monthlyTransactions, monthStart, now),
      walletDistribution: buildWalletDistribution(wallets),
      budgetRisks,
      insight: buildFinancialInsight(savingRate, budgetRisks.at(0), topExpenseCategories.at(0)),
    };
  }
}

export const firestoreFinanceDataAdapter = new FirestoreFinanceDataAdapter();
