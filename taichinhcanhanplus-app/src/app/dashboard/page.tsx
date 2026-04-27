"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { apiFetch } from "@/lib/api/client";
import { formatDateTime, formatMoney } from "@/lib/format";
import type { Transaction, UserDashboardSummary, Wallet } from "@/lib/types";
import type { ReportsAnalytics } from "@/lib/report-types";

const quickActions = [
  { href: "/add-transaction?type=income", icon: "add_card", label: "Thu nhập", tone: "bg-secondary-container text-on-secondary-container" },
  { href: "/add-transaction?type=expense", icon: "payments", label: "Chi tiêu", tone: "bg-primary-fixed text-primary-container" },
  { href: "/scan", icon: "qr_code_scanner", label: "Quét hóa đơn", tone: "bg-tertiary-container text-white" },
  { href: "/budgets", icon: "savings", label: "Ngân sách", tone: "bg-error-container text-on-error-container" },
];

const emptySummary: UserDashboardSummary = {
  totalBalance: 0,
  todayIncome: 0,
  todayExpense: 0,
  monthlyIncome: 0,
  monthlyExpense: 0,
  currency: "VND",
};

export default function DashboardPage() {
  const [displayName, setDisplayName] = useState("bạn");
  const [summary, setSummary] = useState<UserDashboardSummary>(emptySummary);
  const [analytics, setAnalytics] = useState<ReportsAnalytics | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiFetch<{ displayName: string }>("/api/users/me"),
      apiFetch<UserDashboardSummary>("/api/dashboard/summary"),
      apiFetch<ReportsAnalytics>("/api/reports/analytics"),
      apiFetch<Transaction[]>("/api/transactions"),
      apiFetch<Wallet[]>("/api/wallets"),
    ])
      .then(([user, nextSummary, nextAnalytics, nextTransactions, nextWallets]) => {
        setDisplayName(user.displayName);
        setSummary(nextSummary);
        setAnalytics(nextAnalytics);
        setTransactions(nextTransactions);
        setWallets(nextWallets);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const expenseRatio = Math.round((summary.monthlyExpense / Math.max(summary.monthlyIncome, 1)) * 100);
  const healthScore = Math.max(0, Math.min(100, 100 - expenseRatio));

  return (
    <AppShell title="Trang chủ" active="/dashboard">
      <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col gap-6 px-5 pb-32 pt-24">
        <section className="rounded-[2rem] bg-primary-container p-6 text-white shadow-2xl shadow-primary-container/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-on-primary-container">Xin chào,</p>
              <h1 className="font-display mt-1 text-2xl font-extrabold">{displayName}</h1>
            </div>
            <button className="tap-target rounded-full bg-white/15 transition hover:bg-white/25" aria-label="Thông báo">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>
          <div className="mt-8">
            <p className="text-sm text-on-primary-container">Tổng số dư</p>
            <p className="font-display mt-2 text-4xl font-extrabold tracking-tight">
              {formatMoney(summary.totalBalance, summary.currency)}
            </p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/12 p-4">
              <p className="text-xs text-on-primary-container">Thu tháng này</p>
              <p className="mt-1 font-bold text-secondary-container">+{formatMoney(summary.monthlyIncome)}</p>
            </div>
            <div className="rounded-2xl bg-white/12 p-4">
              <p className="text-xs text-on-primary-container">Chi tháng này</p>
              <p className="mt-1 font-bold text-primary-fixed-dim">-{formatMoney(summary.monthlyExpense)}</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link key={action.label} href={action.href} className="group flex flex-col items-center gap-2 rounded-3xl bg-white p-3 ambient-shadow-1 transition hover:-translate-y-1 hover:ambient-shadow-2">
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${action.tone}`}>
                <span className="material-symbols-outlined">{action.icon}</span>
              </span>
              <span className="text-center text-[11px] font-semibold text-on-surface-variant">{action.label}</span>
            </Link>
          ))}
        </section>

        <section className="grid grid-cols-2 gap-4">
          {wallets.map((wallet) => (
            <article key={wallet.id} className="rounded-3xl bg-white p-5 ambient-shadow-1">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: `${wallet.color}18`, color: wallet.color }}>
                <span className="material-symbols-outlined">{wallet.icon}</span>
              </div>
              <p className="mt-4 text-sm font-semibold text-on-surface-variant">{wallet.name}</p>
              <p className="mt-1 font-display text-lg font-extrabold">{formatMoney(wallet.currentBalance)}</p>
            </article>
          ))}
        </section>

        <section className="rounded-3xl bg-white p-5 ambient-shadow-1">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-extrabold">Sức khỏe tài chính</h2>
              <p className="text-xs font-semibold text-on-surface-variant">{analytics?.periodLabel ?? "Đang đồng bộ Firestore"}</p>
            </div>
            <Link href="/reports" className="rounded-full bg-secondary-container px-3 py-1 text-xs font-bold text-on-secondary-container">
              {analytics?.savingRate ?? 0}% tiết kiệm
            </Link>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-surface-container">
            <div className="h-full rounded-full bg-gradient-to-r from-secondary to-primary-container" style={{ width: `${healthScore}%` }} />
          </div>
          <p className="mt-3 text-sm text-on-surface-variant">{analytics?.insight ?? (isLoading ? "Đang tải dữ liệu cá nhân..." : "Chưa đủ dữ liệu để phân tích.")}</p>
        </section>

        <section className="rounded-3xl bg-white p-5 ambient-shadow-1">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-extrabold">Giao dịch gần đây</h2>
            <Link href="/transactions" className="text-sm font-bold text-primary-container">Xem tất cả</Link>
          </div>
          <div className="space-y-3">
            {transactions.slice(0, 4).map((transaction) => {
              const isIncome = transaction.type === "income";
              return (
                <article key={transaction.id} className="flex items-center gap-3 rounded-2xl bg-surface-container-low p-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${isIncome ? "bg-secondary-container text-on-secondary-container" : "bg-primary-fixed text-primary-container"}`}>
                    <span className="material-symbols-outlined">{isIncome ? "trending_up" : "shopping_bag"}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{transaction.title}</p>
                    <p className="text-xs text-on-surface-variant">{formatDateTime(new Date(transaction.occurredAt))}</p>
                  </div>
                  <p className={`font-bold ${isIncome ? "text-secondary" : "text-on-surface"}`}>
                    {isIncome ? "+" : "-"}{formatMoney(transaction.amount)}
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </AppShell>
  );
}
