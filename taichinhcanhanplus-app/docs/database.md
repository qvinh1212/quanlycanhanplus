# Database & Backend Architecture

## Collections

### `users`
Stores the authenticated user profile and app preferences.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Auth UID / document id |
| `email` | string | Unique login email |
| `displayName` | string | Display name in profile/header |
| `photoURL` | string? | Avatar URL |
| `defaultCurrency` | `VND \| USD \| EUR \| JPY` | Defaults to VND |
| `locale` | `vi-VN \| en-US` | Formatting locale |
| `timezone` | string | Example: `Asia/Ho_Chi_Minh` |
| `status` | `active \| disabled \| pending` | Account state |
| `createdAt`, `updatedAt` | Date | Audit fields |

### `wallets`
Stores cash, bank, card, e-wallet, investment, and savings accounts.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Wallet document id |
| `userId` | string | Owner user id |
| `name` | string | Wallet/account name |
| `type` | WalletType | cash, bank, credit_card, e_wallet, investment, savings |
| `currency` | CurrencyCode | Usually VND |
| `initialBalance` | number | Opening balance |
| `currentBalance` | number | Cached current balance |
| `color`, `icon` | string | UI theming from Stitch design |
| `isDefault`, `isArchived` | boolean | Display and lifecycle flags |
| `createdAt`, `updatedAt` | Date | Audit fields |

### `categories`
Stores transaction categories. Included because Transactions and Budgets reference categories.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Category document id |
| `userId` | string | Owner user id |
| `name` | string | Example: Ăn uống, Di chuyển, Lương |
| `kind` | `income \| expense` | Category direction |
| `icon`, `color` | string | Material icon and brand color |
| `parentId` | string? | Optional nested category |
| `isSystem`, `isArchived` | boolean | Lifecycle flags |
| `createdAt`, `updatedAt` | Date | Audit fields |

### `transactions`
Stores income, expense, and transfer records.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Transaction document id |
| `userId` | string | Owner user id |
| `walletId` | string | Source wallet |
| `categoryId` | string? | Required for income/expense |
| `type` | `income \| expense \| transfer` | Transaction direction |
| `amount` | number | Positive amount |
| `currency` | CurrencyCode | Usually VND |
| `title`, `note` | string | Display title and optional detail |
| `occurredAt` | Date | Time of transaction |
| `status` | `completed \| pending \| cancelled` | Processing state |
| `tags` | string[] | Search/filter labels |
| `receiptUrl` | string? | Optional uploaded receipt |
| `transferToWalletId` | string? | Required for transfers |
| `createdAt`, `updatedAt` | Date | Audit fields |

### `budgets`
Stores budget limits per category/wallet/time period.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Budget document id |
| `userId` | string | Owner user id |
| `name` | string | Budget label |
| `categoryId`, `walletId` | string? | Optional scope filters |
| `amountLimit`, `amountSpent` | number | Limit and cached usage |
| `currency` | CurrencyCode | Usually VND |
| `period` | `weekly \| monthly \| quarterly \| yearly` | Recurrence window |
| `startDate`, `endDate` | Date | Active date range |
| `alertThresholdPercent` | number | Example: 80 |
| `status` | `active \| paused \| archived` | Lifecycle state |
| `createdAt`, `updatedAt` | Date | Audit fields |

## API Routes

| Route | Methods | Purpose |
| --- | --- | --- |
| `/api/users/me` | GET | Current user profile |
| `/api/wallets` | GET, POST | List/create wallets |
| `/api/wallets/[id]` | GET, PUT, DELETE | Read, update, archive wallet |
| `/api/categories` | GET | List categories |
| `/api/transactions` | GET, POST | List/create transactions |
| `/api/transactions/[id]` | GET, PUT, DELETE | Read, update, cancel transaction |
| `/api/budgets` | GET, POST | List/create budgets with tracking |
| `/api/budgets/[id]` | GET, PUT, DELETE | Read, update, archive budget |
| `/api/dashboard/summary` | GET | Dashboard totals |

## Recommended indexes for Firestore later

- `wallets`: `userId`, `isArchived`, `createdAt`
- `categories`: `userId`, `kind`, `isArchived`
- `transactions`: `userId`, `occurredAt`, `type`
- `transactions`: `userId`, `walletId`, `occurredAt`
- `budgets`: `userId`, `status`, `startDate`, `endDate`

## Adapter migration plan

The project currently uses an in-memory repository in `src/lib/db/repository.ts`.
This keeps the frontend and API routes functional immediately while preserving a clean seam for swapping in Firebase/Firestore or another database.

A typed adapter contract now exists at `src/lib/db/adapter.ts`.
A Firestore implementation should conform to that contract and keep the same return shapes.

Recommended migration order:

1. Add Firebase client/admin configuration from environment variables.
2. Implement `firestore-adapter.ts` using the `FinanceDataAdapter` contract.
3. Convert Firestore `Timestamp` values to JavaScript `Date` before returning data.
4. Resolve the current user from Firebase Auth instead of `mockUser`.
5. Keep API routes calling repository-level functions so UI code remains unchanged.
6. Add write batches/transactions for any materialized wallet balance updates.
