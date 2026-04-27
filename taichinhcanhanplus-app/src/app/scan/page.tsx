"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { ReceiptScanner } from "@/components/receipt-scanner";
import { apiFetch } from "@/lib/api/client";
import type { Category, Wallet } from "@/lib/types";

export default function ScanPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    <AppShell title="Quét hóa đơn" active="/dashboard">
      <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col gap-6 px-5 pb-32 pt-24">
        {isLoading ? (
          <div className="rounded-[2rem] bg-white p-6 text-center font-semibold text-on-surface-variant ambient-shadow-1">Đang tải danh mục và ví từ Firestore...</div>
        ) : (
          <ReceiptScanner categories={categories} wallets={wallets} />
        )}

        <Link href="/dashboard" className="text-center text-sm font-bold text-primary-container">
          Quay về Dashboard
        </Link>
      </main>
    </AppShell>
  );
}
