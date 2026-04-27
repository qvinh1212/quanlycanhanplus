import { Budget, Category, Transaction, UserProfile, Wallet } from "@/lib/types";

export const COLLECTIONS = {
  users: "users",
  wallets: "wallets",
  categories: "categories",
  transactions: "transactions",
  budgets: "budgets",
} as const;

export const DEFAULT_CATEGORIES: Omit<
  Category,
  "id" | "userId" | "createdAt" | "updatedAt"
>[] = [
  {
    name: "Ăn uống",
    kind: "expense",
    icon: "restaurant",
    color: "#764900",
    isSystem: true,
    isArchived: false,
  },
  {
    name: "Di chuyển",
    kind: "expense",
    icon: "directions_car",
    color: "#254bb3",
    isSystem: true,
    isArchived: false,
  },
  {
    name: "Mua sắm",
    kind: "expense",
    icon: "shopping_bag",
    color: "#ba1a1a",
    isSystem: true,
    isArchived: false,
  },
  {
    name: "Lương",
    kind: "income",
    icon: "payments",
    color: "#006c49",
    isSystem: true,
    isArchived: false,
  },
  {
    name: "Đầu tư",
    kind: "income",
    icon: "trending_up",
    color: "#563400",
    isSystem: true,
    isArchived: false,
  },
];

export interface DatabaseSchema {
  [COLLECTIONS.users]: UserProfile;
  [COLLECTIONS.wallets]: Wallet;
  [COLLECTIONS.categories]: Category;
  [COLLECTIONS.transactions]: Transaction;
  [COLLECTIONS.budgets]: Budget;
}

export const DATABASE_INDEXES = [
  {
    collection: COLLECTIONS.wallets,
    fields: ["userId", "isArchived", "createdAt"],
  },
  {
    collection: COLLECTIONS.categories,
    fields: ["userId", "kind", "isArchived"],
  },
  {
    collection: COLLECTIONS.transactions,
    fields: ["userId", "occurredAt", "type"],
  },
  {
    collection: COLLECTIONS.transactions,
    fields: ["userId", "walletId", "occurredAt"],
  },
  {
    collection: COLLECTIONS.budgets,
    fields: ["userId", "status", "startDate", "endDate"],
  },
] as const;
