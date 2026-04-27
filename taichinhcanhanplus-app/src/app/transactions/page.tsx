"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { apiFetch } from "@/lib/api/client";
import { formatDateTime, formatMoney } from "@/lib/format";
import type { Category, Transaction, Wallet } from "@/lib/types";

type TransactionFilter = "all" | "income" | "expense" | "month";

const filters: { label: string; value: TransactionFilter; href: string }[] = [
  { label: "Tất cả", value: "all", href: "/transactions" },
  { label: "Thu nhập", value: "income", href: "/transactions?filter=income" },
  { label: "Chi tiêu", value: "expense", href: "/transactions?filter=expense" },
  { label: "Tháng này", value: "month", href: "/transactions?filter=month" },
];

export default function TransactionsPage() {
  const [activeFilter] = useState<TransactionFilter>(() => {
    if (typeof window === "undefined") return "all";
    const params = new URLSearchParams(window.location.search);
    return normalizeFilter(params.get("filter") ?? undefined);
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [wallets, setWallets] = useState<Wallet[]>([]);

  useEffect(() => {
    Promise.all([
      apiFetch<Transaction[]>("/api/transactions"),
      apiFetch<Category[]>("/api/categories"),
      apiFetch<Wallet[]>("/api/wallets"),
    ]).then(([nextTransactions, nextCategories, nextWallets]) => {
      setTransactions(nextTransactions);
      setCategories(nextCategories);
      setWallets(nextWallets);
    });
  }, []);

  const categoryById = useMemo(() => new Map(categories.map((category) => [category.id, category])), [categories]);
  const walletById = useMemo(() => new Map(wallets.map((wallet) => [wallet.id, wallet])), [wallets]);
  const now = new Date();
  const filteredTransactions = transactions.filter((transaction) => {
    if (activeFilter === "income") return transaction.type === "income";
    if (activeFilter === "expense") return transaction.type === "expense";
    if (activeFilter === "month") {
      const occurredAt = new Date(transaction.occurredAt);
      return occurredAt.getMonth() === now.getMonth() && occurredAt.getFullYear() === now.getFullYear();
    }
    return true;
  });
  const totalIncome = filteredTransactions.filter((transaction) => transaction.type === "income").reduce((sum, transaction) => sum + transaction.amount, 0);
  const totalExpense = filteredTransactions.filter((transaction) => transaction.type === "expense").reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <AppShell title="Giao dịch" active="/transactions">
      <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col gap-5 px-5 pb-32 pt-24">
        <section className="rounded-[2rem] bg-primary-container p-6 text-white shadow-2xl shadow-primary-container/20">
          <p className="text-sm text-on-primary-container">Dòng tiền hiện tại</p>
          <h1 className="font-display mt-2 text-3xl font-extrabold">Lịch sử giao dịch</h1>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/12 p-4">
              <p className="text-xs text-on-primary-container">Tổng thu</p>
              <p className="mt-1 font-bold text-secondary-container">+{formatMoney(totalIncome)}</p>
            </div>
            <div className="rounded-2xl bg-white/12 p-4">
              <p className="text-xs text-on-primary-container">Tổng chi</p>
              <p className="mt-1 font-bold text-primary-fixed-dim">-{formatMoney(totalExpense)}</p>
            </div>
          </div>
        </section>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {filters.map((filter) => (
            <Link key={filter.value} href={filter.href} className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition hover:-translate-y-0.5 ${activeFilter === filter.value ? "bg-primary-container text-white" : "bg-white text-on-surface-variant ambient-shadow-1"}`}>
              {filter.label}
            </Link>
          ))}
        </div>

        <section className="space-y-3">
          {filteredTransactions.length > 0 ? filteredTransactions.map((transaction) => {
            const category = transaction.categoryId ? categoryById.get(transaction.categoryId) : undefined;
            const wallet = walletById.get(transaction.walletId);
            const isIncome = transaction.type === "income";

            return (
              <Link key={transaction.id} href={`/transactions/${transaction.id}`} className="block rounded-3xl bg-white p-4 ambient-shadow-1 transition hover:-translate-y-1 hover:ambient-shadow-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundColor: `${category?.color ?? wallet?.color ?? "#254bb3"}18`, color: category?.color ?? wallet?.color ?? "#254bb3" }}>
                    <span className="material-symbols-outlined">{category?.icon ?? wallet?.icon ?? "receipt_long"}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-on-surface">{transaction.title}</p>
                    <p className="text-xs text-on-surface-variant">{wallet?.name ?? "Ví"} · {formatDateTime(new Date(transaction.occurredAt))}</p>
                  </div>
                  <p className={`font-display text-base font-extrabold ${isIncome ? "text-secondary" : "text-on-surface"}`}>
                    {isIncome ? "+" : "-"}{formatMoney(transaction.amount)}
                  </p>
                </div>
                {transaction.note ? <p className="mt-3 rounded-2xl bg-surface-container-low px-3 py-2 text-sm text-on-surface-variant">{transaction.note}</p> : null}
              </Link>
            );
          }) : (
            <div className="rounded-[2rem] bg-white p-6 text-center ambient-shadow-1">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-primary-fixed text-primary-container"><span className="material-symbols-outlined">receipt_long</span></div>
              <h2 className="mt-4 font-display text-xl font-extrabold">Chưa có giao dịch phù hợp</h2>
              <p className="mt-2 text-sm text-on-surface-variant">Thử đổi bộ lọc hoặc thêm giao dịch mới để cập nhật dòng tiền.</p>
            </div>
          )}
        </section>

        <Link href="/add-transaction" className="rounded-2xl bg-primary-container px-5 py-4 text-center font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-primary">
          Thêm giao dịch mới
        </Link>
      </main>
    </AppShell>
  );
}

function normalizeFilter(value?: string): TransactionFilter {
  if (value === "income" || value === "expense" || value === "month") return value;
  return "all";
}
