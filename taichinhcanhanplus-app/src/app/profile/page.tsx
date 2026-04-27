"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { apiFetch } from "@/lib/api/client";
import { formatMoney } from "@/lib/format";
import type { UserProfile, Wallet } from "@/lib/types";

const settings = [
  { icon: "account_circle", label: "Thông tin cá nhân", description: "Tên, email, số điện thoại" },
  { icon: "notifications", label: "Thông báo", description: "Cảnh báo ngân sách và hóa đơn" },
  { icon: "security", label: "Bảo mật", description: "Mật khẩu, sinh trắc học, thiết bị" },
  { icon: "cloud_sync", label: "Đồng bộ dữ liệu", description: "Firebase/Firestore ready" },
];

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiFetch<UserProfile>("/api/users/me"),
      apiFetch<Wallet[]>("/api/wallets"),
    ])
      .then(([nextUser, nextWallets]) => {
        setUser(nextUser);
        setWallets(nextWallets);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.currentBalance, 0);

  return (
    <AppShell title="Tài khoản" active="/profile">
      <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col gap-5 px-5 pb-32 pt-24">
        <section className="rounded-[2rem] bg-primary-container p-6 text-center text-white shadow-2xl shadow-primary-container/20">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/30 bg-white/15">
            <span className="material-symbols-outlined text-6xl" style={{ fontVariationSettings: '\"FILL\" 1' }}>
              person
            </span>
          </div>
          <h1 className="font-display mt-4 text-3xl font-extrabold">{user?.displayName ?? "Đang tải..."}</h1>
          <p className="mt-1 text-on-primary-container">{user?.email ?? "Firebase Auth"}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-left">
            <div className="rounded-2xl bg-white/12 p-4">
              <p className="text-xs text-on-primary-container">Tổng số dư</p>
              <p className="mt-1 font-bold">{formatMoney(totalBalance)}</p>
            </div>
            <div className="rounded-2xl bg-white/12 p-4">
              <p className="text-xs text-on-primary-container">Số ví</p>
              <p className="mt-1 font-bold">{wallets.length} ví</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-5 ambient-shadow-1">
          <h2 className="font-display text-xl font-extrabold">Ví của bạn</h2>
          <div className="mt-4 space-y-3">
            {isLoading ? (
              <p className="rounded-2xl bg-surface-container-low p-4 text-center text-sm font-semibold text-on-surface-variant">Đang tải ví từ Firestore...</p>
            ) : wallets.map((wallet) => (
              <article key={wallet.id} className="flex items-center gap-3 rounded-2xl bg-surface-container-low p-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: `${wallet.color}18`, color: wallet.color }}>
                  <span className="material-symbols-outlined">{wallet.icon}</span>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-bold">{wallet.name}</p>
                  <p className="text-xs text-on-surface-variant">{wallet.type.replace("_", " ")}</p>
                </div>
                <p className="font-bold">{formatMoney(wallet.currentBalance)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          {settings.map((item) => (
            <button key={item.label} className="flex w-full items-center gap-4 rounded-3xl bg-white p-4 text-left ambient-shadow-1 transition hover:-translate-y-1 hover:ambient-shadow-2">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-fixed text-primary-container">
                <span className="material-symbols-outlined">{item.icon}</span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold">{item.label}</span>
                <span className="block text-sm text-on-surface-variant">{item.description}</span>
              </span>
              <span className="material-symbols-outlined text-outline">chevron_right</span>
            </button>
          ))}
        </section>
      </main>
    </AppShell>
  );
}
