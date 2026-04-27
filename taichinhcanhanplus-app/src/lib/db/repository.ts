import {
  mockBudgets,
  mockCategories,
  mockTransactions,
  mockUser,
  mockWallets,
} from "@/lib/db/mock-data";
import { Budget, Category, Transaction, UserDashboardSummary, Wallet } from "@/lib/types";

export interface CreateWalletInput {
  name: string;
  type: Wallet["type"];
  initialBalance: number;
  currency?: Wallet["currency"];
  color?: string;
  icon?: string;
}

export type UpdateWalletInput = Partial<CreateWalletInput> & {
  isDefault?: boolean;
  isArchived?: boolean;
};

export interface CreateTransactionInput {
  walletId: string;
  categoryId?: string;
  type: Transaction["type"];
  amount: number;
  title: string;
  note?: string;
  occurredAt?: Date;
  tags?: string[];
}

export type UpdateTransactionInput = Partial<CreateTransactionInput> & {
  status?: Transaction["status"];
};

export interface CreateBudgetInput {
  name: string;
  categoryId?: string;
  walletId?: string;
  amountLimit: number;
  period: Budget["period"];
  startDate: Date;
  endDate: Date;
  alertThresholdPercent?: number;
}

export type UpdateBudgetInput = Partial<CreateBudgetInput> & {
  status?: Budget["status"];
};

export interface CategoryReportItem {
  categoryId: string;
  name: string;
  icon: string;
  color: string;
  amount: number;
  transactionCount: number;
  percentage: number;
}

export interface DailyReportItem {
  date: string;
  income: number;
  expense: number;
  net: number;
}

export interface WalletReportItem {
  walletId: string;
  name: string;
  icon: string;
  color: string;
  balance: number;
  percentage: number;
}

export interface BudgetRiskItem {
  id: string;
  name: string;
  amountLimit: number;
  amountSpent: number;
  percentage: number;
  status: Budget["status"];
}

export interface ReportsAnalytics {
  periodLabel: string;
  totalIncome: number;
  totalExpense: number;
  netCashflow: number;
  savingRate: number;
  averageDailyExpense: number;
  largestExpense: Transaction | null;
  topExpenseCategories: CategoryReportItem[];
  dailyCashflow: DailyReportItem[];
  walletDistribution: WalletReportItem[];
  budgetRisks: BudgetRiskItem[];
  insight: string;
}

export async function getCurrentUser() {
  return mockUser;
}

export async function getDashboardSummary(userId: string): Promise<UserDashboardSummary> {
  assertDemoUser(userId);
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  const completed = mockTransactions.filter(
    (transaction) => transaction.userId === userId && transaction.status === "completed",
  );

  return {
    totalBalance: computeWalletsWithBalances(userId).reduce((sum, wallet) => sum + wallet.currentBalance, 0),
    todayIncome: sumTransactions(completed, "income", todayStart, todayEnd),
    todayExpense: sumTransactions(completed, "expense", todayStart, todayEnd),
    monthlyIncome: sumTransactions(completed, "income", monthStart, monthEnd),
    monthlyExpense: sumTransactions(completed, "expense", monthStart, monthEnd),
    currency: "VND",
  };
}

export async function listWallets(userId: string) {
  assertDemoUser(userId);
  return computeWalletsWithBalances(userId).filter((wallet) => !wallet.isArchived);
}

export async function getWallet(userId: string, walletId: string) {
  assertDemoUser(userId);
  return computeWalletsWithBalances(userId).find(
    (wallet) => wallet.id === walletId && wallet.userId === userId && !wallet.isArchived,
  ) ?? null;
}

export async function listCategories(userId: string) {
  assertDemoUser(userId);
  return mockCategories.filter((category) => !category.isArchived);
}

export async function listTransactions(userId: string) {
  assertDemoUser(userId);
  return [...mockTransactions]
    .filter((transaction) => transaction.userId === userId && transaction.status !== "cancelled")
    .sort((a, b) => b.occurredAt.getTime() - a.occurredAt.getTime());
}

export async function getTransaction(userId: string, transactionId: string) {
  assertDemoUser(userId);
  return mockTransactions.find(
    (transaction) => transaction.id === transactionId && transaction.userId === userId && transaction.status !== "cancelled",
  ) ?? null;
}

export async function listBudgets(userId: string) {
  assertDemoUser(userId);
  return mockBudgets
    .filter((budget) => budget.status !== "archived")
    .map(hydrateBudgetTracking)
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
}

export async function getBudget(userId: string, budgetId: string) {
  assertDemoUser(userId);
  const budget = mockBudgets.find(
    (item) => item.id === budgetId && item.userId === userId && item.status !== "archived",
  );

  return budget ? hydrateBudgetTracking(budget) : null;
}

export async function getReportsAnalytics(userId: string): Promise<ReportsAnalytics> {
  assertDemoUser(userId);

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  const completedThisMonth = mockTransactions.filter((transaction) => {
    const occurredAt = transaction.occurredAt.getTime();
    return transaction.userId === userId
      && transaction.status === "completed"
      && occurredAt >= monthStart.getTime()
      && occurredAt <= monthEnd.getTime();
  });

  const incomeTransactions = completedThisMonth.filter((transaction) => transaction.type === "income");
  const expenseTransactions = completedThisMonth.filter((transaction) => transaction.type === "expense");
  const totalIncome = incomeTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const totalExpense = expenseTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const netCashflow = totalIncome - totalExpense;
  const daysElapsed = Math.max(now.getDate(), 1);
  const savingRate = Math.round((netCashflow / Math.max(totalIncome, 1)) * 100);
  const topExpenseCategories = buildCategoryBreakdown(expenseTransactions, totalExpense);
  const dailyCashflow = buildDailyCashflow(completedThisMonth, monthStart, now);
  const walletDistribution = buildWalletDistribution(userId);
  const budgetRisks = mockBudgets
    .filter((budget) => budget.userId === userId && budget.status !== "archived")
    .map(hydrateBudgetTracking)
    .map((budget) => ({
      id: budget.id,
      name: budget.name,
      amountLimit: budget.amountLimit,
      amountSpent: budget.amountSpent,
      percentage: Math.round((budget.amountSpent / Math.max(budget.amountLimit, 1)) * 100),
      status: budget.status,
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3);

  return {
    periodLabel: `Tháng ${now.getMonth() + 1}/${now.getFullYear()}`,
    totalIncome,
    totalExpense,
    netCashflow,
    savingRate,
    averageDailyExpense: Math.round(totalExpense / daysElapsed),
    largestExpense: expenseTransactions.sort((a, b) => b.amount - a.amount)[0] ?? null,
    topExpenseCategories,
    dailyCashflow,
    walletDistribution,
    budgetRisks,
    insight: buildFinancialInsight(savingRate, budgetRisks[0], topExpenseCategories[0]),
  };
}

export async function createWallet(userId: string, input: CreateWalletInput) {
  assertDemoUser(userId);

  const timestamp = new Date();
  const wallet: Wallet = {
    id: `wallet-${crypto.randomUUID()}`,
    userId,
    name: input.name,
    type: input.type,
    currency: input.currency ?? "VND",
    initialBalance: input.initialBalance,
    currentBalance: input.initialBalance,
    color: input.color ?? "#003297",
    icon: input.icon ?? "account_balance_wallet",
    isDefault: false,
    isArchived: false,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  mockWallets.push(wallet);
  return wallet;
}

export async function updateWallet(userId: string, walletId: string, input: UpdateWalletInput) {
  assertDemoUser(userId);
  const index = mockWallets.findIndex((wallet) => wallet.id === walletId && wallet.userId === userId);
  if (index === -1) return null;

  const current = mockWallets[index];
  const updated: Wallet = {
    ...current,
    ...input,
    name: input.name ?? current.name,
    type: input.type ?? current.type,
    initialBalance: input.initialBalance ?? current.initialBalance,
    currentBalance: current.currentBalance,
    currency: input.currency ?? current.currency,
    color: input.color ?? current.color,
    icon: input.icon ?? current.icon,
    updatedAt: new Date(),
  };

  mockWallets[index] = updated;
  return computeWalletsWithBalances(userId).find((wallet) => wallet.id === walletId) ?? updated;
}

export async function archiveWallet(userId: string, walletId: string) {
  return updateWallet(userId, walletId, { isArchived: true });
}

export async function createTransaction(userId: string, input: CreateTransactionInput) {
  assertDemoUser(userId);

  const timestamp = new Date();
  const transaction: Transaction = {
    id: `txn-${crypto.randomUUID()}`,
    userId,
    walletId: input.walletId,
    categoryId: input.categoryId,
    type: input.type,
    amount: input.amount,
    currency: "VND",
    title: input.title,
    note: input.note,
    occurredAt: input.occurredAt ?? timestamp,
    status: "completed",
    tags: input.tags ?? [],
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  mockTransactions.push(transaction);
  return transaction;
}

export async function updateTransaction(userId: string, transactionId: string, input: UpdateTransactionInput) {
  assertDemoUser(userId);
  const index = mockTransactions.findIndex(
    (transaction) => transaction.id === transactionId && transaction.userId === userId,
  );

  if (index === -1) return null;

  const current = mockTransactions[index];
  const updated: Transaction = {
    ...current,
    ...input,
    categoryId: input.categoryId === "" ? undefined : input.categoryId ?? current.categoryId,
    note: input.note ?? current.note,
    tags: input.tags ?? current.tags,
    occurredAt: input.occurredAt ?? current.occurredAt,
    updatedAt: new Date(),
  };

  mockTransactions[index] = updated;
  return updated;
}

export async function archiveTransaction(userId: string, transactionId: string) {
  return updateTransaction(userId, transactionId, { status: "cancelled" });
}

export async function createBudget(userId: string, input: CreateBudgetInput) {
  assertDemoUser(userId);

  const timestamp = new Date();
  const budget: Budget = {
    id: `budget-${crypto.randomUUID()}`,
    userId,
    name: input.name,
    categoryId: input.categoryId,
    walletId: input.walletId,
    amountLimit: input.amountLimit,
    amountSpent: 0,
    currency: "VND",
    period: input.period,
    startDate: input.startDate,
    endDate: input.endDate,
    alertThresholdPercent: input.alertThresholdPercent ?? 80,
    status: "active",
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  mockBudgets.push(budget);
  return hydrateBudgetTracking(budget);
}

export async function updateBudget(userId: string, budgetId: string, input: UpdateBudgetInput) {
  assertDemoUser(userId);

  const index = mockBudgets.findIndex((budget) => budget.id === budgetId && budget.userId === userId);
  if (index === -1) return null;

  const current = mockBudgets[index];
  const updated: Budget = {
    ...current,
    ...input,
    categoryId: input.categoryId === "" ? undefined : input.categoryId ?? current.categoryId,
    walletId: input.walletId === "" ? undefined : input.walletId ?? current.walletId,
    alertThresholdPercent: input.alertThresholdPercent ?? current.alertThresholdPercent,
    updatedAt: new Date(),
  };

  mockBudgets[index] = updated;
  return hydrateBudgetTracking(updated);
}

export async function archiveBudget(userId: string, budgetId: string) {
  return updateBudget(userId, budgetId, { status: "archived" });
}

function computeWalletsWithBalances(userId: string) {
  return mockWallets
    .filter((wallet) => wallet.userId === userId)
    .map((wallet) => {
      const balanceDelta = mockTransactions
        .filter((transaction) => transaction.walletId === wallet.id && transaction.status === "completed")
        .reduce((sum, transaction) => {
          if (transaction.type === "income") return sum + transaction.amount;
          if (transaction.type === "expense") return sum - transaction.amount;
          return sum;
        }, 0);

      return {
        ...wallet,
        currentBalance: wallet.initialBalance + balanceDelta,
      };
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

function hydrateBudgetTracking(budget: Budget): Budget {
  const amountSpent = mockTransactions
    .filter((transaction) => isTransactionInBudget(transaction, budget))
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return { ...budget, amountSpent };
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

function buildCategoryBreakdown(transactions: Transaction[], totalExpense: number): CategoryReportItem[] {
  const categoryMap = new Map<string, { category: Category; amount: number; transactionCount: number }>();

  transactions.forEach((transaction) => {
    const category = mockCategories.find((item) => item.id === transaction.categoryId);
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
  const daysElapsed = now.getDate();

  return Array.from({ length: daysElapsed }, (_, index) => {
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

function buildWalletDistribution(userId: string): WalletReportItem[] {
  const wallets = computeWalletsWithBalances(userId).filter((wallet) => !wallet.isArchived);
  const totalBalance = wallets.reduce((sum, wallet) => sum + Math.max(wallet.currentBalance, 0), 0);

  return wallets
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

function assertDemoUser(userId: string) {
  if (userId !== mockUser.id) {
    throw new Error("User not found in demo database adapter.");
  }
}
