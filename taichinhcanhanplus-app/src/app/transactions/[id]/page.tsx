"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { TransactionEditor } from "@/components/transaction-editor";
import { apiFetch } from "@/lib/api/client";
import { formatDateTime, formatMoney } from "@/lib/format";
import type { Category, Transaction, Wallet } from "@/lib/types";

export default function TransactionDetailPage() {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = window.location.pathname.split("/").filter(Boolean).at(-1);
    if (!id) {
      queueMicrotask(() => setIsLoading(false));
      return;
    }

    Promise.all([
      apiFetch<Transaction>(`/api/transactions/${id}`),
      apiFetch<Category[]>("/api/categories"),
      apiFetch<Wallet[]>("/api/wallets"),
    ])
      .then(([nextTransaction, nextCategories, nextWallets]) => {
        setTransaction(nextTransaction);
        setCategories(nextCategories);
        setWallets(nextWallets);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const wallet = transaction ? wallets.find((item) => item.id === transaction.walletId) : undefined;
  const category = transaction ? categories.find((item) => item.id === transaction.categoryId) : undefined;
  const isIncome = transaction?.type === "income";

  return (
    <AppShell title="Chi tiết" active="/transactions">
      <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col gap-5 px-5 pb-32 pt-24">
        <Link href="/transactions" className="inline-flex items-center gap-2 text-sm font-bold text-primary-container">
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Quay lại giao dịch
        </Link>

        {isLoading ? (
          <section className="rounded-[2rem] bg-white p-6 text-center font-semibold text-on-surface-variant ambient-shadow-1">Đang tải giao dịch từ Firestore...</section>
        ) : transaction ? (
          <>
            <section className="relative overflow-hidden rounded-[2rem] bg-primary-container p-6 text-white shadow-2xl shadow-primary-container/20">
              <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
              <div className="relative flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-white/15" style={{ color: category?.color ?? wallet?.color ?? "#FAD90E" }}>
                  <span className="material-symbols-outlined text-4xl">{category?.icon ?? wallet?.icon ?? "receipt_long"}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-on-primary-container">{formatDateTime(new Date(transaction.occurredAt))}</p>
                  <h1 className="mt-1 truncate font-display text-2xl font-extrabold">{transaction.title}</h1>
                  <p className={`mt-3 font-display text-3xl font-extrabold ${isIncome ? "text-secondary-container" : "text-primary-fixed-dim"}`}>
                    {isIncome ? "+" : "-"}{formatMoney(transaction.amount)}
                  </p>
                </div>
              </div>
              <div className="relative mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/12 p-3">
                  <p className="text-xs text-on-primary-container">Ví</p>
                  <p className="mt-1 font-bold">{wallet?.name ?? "Ví"}</p>
                </div>
                <div className="rounded-2xl bg-white/12 p-3">
                  <p className="text-xs text-on-primary-container">Danh mục</p>
                  <p className="mt-1 font-bold">{category?.name ?? "Chưa phân loại"}</p>
                </div>
              </div>
            </section>

            <TransactionEditor transaction={transaction} categories={categories} wallets={wallets} />
          </>
        ) : (
          <section className="rounded-[2rem] bg-white p-6 text-center ambient-shadow-1">
            <h1 className="font-display text-xl font-extrabold">Không tìm thấy giao dịch</h1>
            <p className="mt-2 text-sm text-on-surface-variant">Giao dịch không tồn tại hoặc không thuộc tài khoản Firebase hiện tại.</p>
          </section>
        )}
      </main>
    </AppShell>
  );
}
