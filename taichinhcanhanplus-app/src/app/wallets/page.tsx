"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { WalletManager } from "@/components/wallet-manager";
import { apiFetch } from "@/lib/api/client";
import type { Wallet } from "@/lib/types";

export default function WalletsPage() {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiFetch<Wallet[]>("/api/wallets")
      .then(setWallets)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AppShell title="Ví & tài khoản" active="/wallets">
      <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col gap-5 px-5 pb-32 pt-24">
        {isLoading ? (
          <div className="rounded-[2rem] bg-white p-6 text-center font-semibold text-on-surface-variant ambient-shadow-1">Đang tải ví từ Firestore...</div>
        ) : (
          <WalletManager initialWallets={wallets} />
        )}
      </main>
    </AppShell>
  );
}
