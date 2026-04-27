"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { BudgetManager } from "@/components/budget-manager";
import { apiFetch } from "@/lib/api/client";
import type { Budget, Category, Wallet } from "@/lib/types";

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiFetch<Budget[]>("/api/budgets"),
      apiFetch<Category[]>("/api/categories"),
      apiFetch<Wallet[]>("/api/wallets"),
    ])
      .then(([nextBudgets, nextCategories, nextWallets]) => {
        setBudgets(nextBudgets);
        setCategories(nextCategories);
        setWallets(nextWallets);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AppShell title="Ngân sách" active="/reports">
      <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col gap-5 px-5 pb-32 pt-24">
        <section className="rounded-[2rem] bg-primary-container p-6 text-white shadow-2xl shadow-primary-container/20">
          <p className="text-sm text-on-primary-container">Kiểm soát giới hạn</p>
          <h1 className="font-display mt-2 text-3xl font-extrabold">Ngân sách tháng</h1>
          <p className="mt-3 text-sm leading-6 text-on-primary-container">
            Theo dõi mức chi theo từng danh mục, ví thanh toán và nhận cảnh báo theo thời gian thực.
          </p>
        </section>

        {isLoading ? (
          <div className="rounded-[2rem] bg-white p-6 text-center font-semibold text-on-surface-variant ambient-shadow-1">Đang tải ngân sách từ Firestore...</div>
        ) : (
          <BudgetManager budgets={budgets} categories={categories} wallets={wallets} />
        )}
      </main>
    </AppShell>
  );
}
