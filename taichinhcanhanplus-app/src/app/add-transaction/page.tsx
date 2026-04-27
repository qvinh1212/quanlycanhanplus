"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { AddTransactionForm } from "@/components/add-transaction-form";
import { apiFetch } from "@/lib/api/client";
import type { Category, Wallet } from "@/lib/types";

export default function AddTransactionPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [initialType] = useState<"expense" | "income">(() => {
    if (typeof window === "undefined") return "expense";
    const params = new URLSearchParams(window.location.search);
    return params.get("type") === "income" ? "income" : "expense";
  });

  useEffect(() => {
    Promise.all([
      apiFetch<Category[]>("/api/categories"),
      apiFetch<Wallet[]>("/api/wallets"),
    ])
      .then(([nextCategories, nextWallets]) => {
        setCategories(nextCategories);
        setWallets(nextWallets);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AppShell title="Thêm giao dịch" active="/add-transaction">
      <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col gap-6 px-5 pb-32 pt-24">
        <section className="rounded-[2rem] bg-white p-5 ambient-shadow-2">
          {isLoading ? (
            <div className="rounded-3xl bg-surface-container-low p-5 text-center text-sm font-semibold text-on-surface-variant">Đang tải dữ liệu Firestore...</div>
          ) : (
            <AddTransactionForm categories={categories} wallets={wallets} initialType={initialType} />
          )}
        </section>

        <Link href="/dashboard" className="text-center text-sm font-bold text-primary-container">
          Quay về Dashboard
        </Link>
      </main>
    </AppShell>
  );
}
