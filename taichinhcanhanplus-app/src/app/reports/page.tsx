"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { apiFetch } from "@/lib/api/client";
import { formatCompactMoney, formatDateTime, formatMoney } from "@/lib/format";
import type { ReportsAnalytics } from "@/lib/report-types";

export default function ReportsPage() {
  const [analytics, setAnalytics] = useState<ReportsAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiFetch<ReportsAnalytics>("/api/reports/analytics")
      .then(setAnalytics)
      .finally(() => setIsLoading(false));
  }, []);

  const maxDailyAmount = useMemo(() => Math.max(...(analytics?.dailyCashflow ?? []).map((item) => Math.max(item.income, item.expense)), 1), [analytics]);
  const maxCategoryAmount = useMemo(() => Math.max(...(analytics?.topExpenseCategories ?? []).map((item) => item.amount), 1), [analytics]);

  const reportCards = analytics ? [
    { label: "Thu nhập tháng", value: formatMoney(analytics.totalIncome), subtext: analytics.periodLabel, icon: "trending_up", tone: "bg-secondary-container text-on-secondary-container" },
    { label: "Chi tiêu tháng", value: formatMoney(analytics.totalExpense), subtext: `${formatMoney(analytics.averageDailyExpense)}/ngày`, icon: "trending_down", tone: "bg-primary-fixed text-primary-container" },
    { label: "Dòng tiền ròng", value: formatMoney(analytics.netCashflow), subtext: analytics.netCashflow >= 0 ? "Thặng dư" : "Bội chi", icon: "account_balance", tone: analytics.netCashflow >= 0 ? "bg-secondary-container text-on-secondary-container" : "bg-error-container text-on-error-container" },
  ] : [];

  return (
    <AppShell title="Báo cáo" active="/reports">
      <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col gap-5 px-5 pb-32 pt-24">
        <section className="relative overflow-hidden rounded-[2rem] bg-primary-container p-6 text-white shadow-2xl shadow-primary-container/20">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-on-primary-container">Financial Insight · {analytics?.periodLabel ?? "Firestore"}</p>
              <h1 className="font-display mt-2 text-3xl font-extrabold">Bức tranh tài chính</h1>
            </div>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <span className="material-symbols-outlined">auto_graph</span>
            </span>
          </div>

          <div className="relative mt-6 rounded-3xl bg-white/12 p-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm text-on-primary-container">Tỷ lệ tiết kiệm</p>
                <p className="font-display mt-1 text-5xl font-extrabold">{analytics?.savingRate ?? 0}%</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${(analytics?.savingRate ?? 0) >= 20 ? "bg-secondary-container text-on-secondary-container" : "bg-error-container text-on-error-container"}`}>
                {(analytics?.savingRate ?? 0) >= 20 ? "Khỏe" : "Cần tối ưu"}
              </span>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/15">
              <div className="h-full rounded-full bg-secondary-container transition-all" style={{ width: `${Math.max(0, Math.min(analytics?.savingRate ?? 0, 100))}%` }} />
            </div>
            <p className="mt-4 text-sm leading-6 text-on-primary-container">{analytics?.insight ?? (isLoading ? "Đang tải phân tích từ Firestore..." : "Chưa có dữ liệu phân tích.")}</p>
          </div>
        </section>

        <section className="grid gap-4">
          {reportCards.map((card) => (
            <article key={card.label} className="flex items-center gap-4 rounded-3xl bg-white p-5 ambient-shadow-1 transition hover:-translate-y-1 hover:ambient-shadow-2">
              <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.tone}`}><span className="material-symbols-outlined">{card.icon}</span></span>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-on-surface-variant">{card.label}</p>
                <p className="truncate font-display text-xl font-extrabold">{card.value}</p>
                <p className="text-xs font-semibold text-on-surface-variant">{card.subtext}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-3xl bg-white p-5 ambient-shadow-1">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-extrabold">Xu hướng dòng tiền</h2>
              <p className="text-sm text-on-surface-variant">Thu/chi từng ngày trong tháng</p>
            </div>
            <span className="material-symbols-outlined text-primary-container">show_chart</span>
          </div>
          <div className="flex h-40 items-end gap-1 rounded-3xl bg-surface-container-low p-4">
            {(analytics?.dailyCashflow ?? []).map((item) => {
              const incomeHeight = Math.max(6, (item.income / maxDailyAmount) * 100);
              const expenseHeight = Math.max(6, (item.expense / maxDailyAmount) * 100);
              return (
                <div key={item.date} className="flex flex-1 items-end justify-center gap-0.5" title={`${item.date}: +${formatMoney(item.income)} / -${formatMoney(item.expense)}`}>
                  <span className="w-full rounded-t-full bg-secondary" style={{ height: `${incomeHeight}%`, opacity: item.income ? 1 : 0.2 }} />
                  <span className="w-full rounded-t-full bg-primary-container" style={{ height: `${expenseHeight}%`, opacity: item.expense ? 1 : 0.2 }} />
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex items-center gap-4 text-xs font-bold text-on-surface-variant">
            <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-secondary" /> Thu</span>
            <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-primary-container" /> Chi</span>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-5 ambient-shadow-1">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-extrabold">Chi tiêu theo danh mục</h2>
              <p className="text-sm text-on-surface-variant">Top nhóm chi lớn nhất</p>
            </div>
            <Link href="/transactions" className="text-sm font-bold text-primary-container">Chi tiết</Link>
          </div>
          <div className="space-y-4">
            {(analytics?.topExpenseCategories ?? []).map((category) => (
              <article key={category.categoryId}>
                <div className="mb-2 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: `${category.color}18`, color: category.color }}><span className="material-symbols-outlined">{category.icon}</span></span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold">{category.name}</p>
                    <p className="text-xs text-on-surface-variant">{category.transactionCount} giao dịch · {category.percentage}%</p>
                  </div>
                  <p className="font-display font-extrabold">{formatCompactMoney(category.amount)}</p>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-container-low">
                  <div className="h-full rounded-full" style={{ width: `${(category.amount / maxCategoryAmount) * 100}%`, backgroundColor: category.color }} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4">
          <article className="rounded-3xl bg-white p-5 ambient-shadow-1">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-fixed text-primary-container"><span className="material-symbols-outlined">payments</span></span>
            <p className="mt-4 text-sm text-on-surface-variant">Chi lớn nhất</p>
            <p className="mt-1 font-display text-lg font-extrabold">{analytics?.largestExpense ? formatMoney(analytics.largestExpense.amount) : formatMoney(0)}</p>
            <p className="mt-1 line-clamp-2 text-xs font-semibold text-on-surface-variant">
              {analytics?.largestExpense ? `${analytics.largestExpense.title} · ${formatDateTime(new Date(analytics.largestExpense.occurredAt))}` : "Chưa có chi tiêu"}
            </p>
          </article>

          <article className="rounded-3xl bg-white p-5 ambient-shadow-1">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-container text-on-secondary-container"><span className="material-symbols-outlined">calendar_month</span></span>
            <p className="mt-4 text-sm text-on-surface-variant">Chi TB/ngày</p>
            <p className="mt-1 font-display text-lg font-extrabold">{formatMoney(analytics?.averageDailyExpense ?? 0)}</p>
            <p className="mt-1 text-xs font-semibold text-on-surface-variant">Dựa trên ngày đã qua</p>
          </article>
        </section>

        <section className="rounded-3xl bg-white p-5 ambient-shadow-1">
          <div className="mb-4 flex items-center justify-between"><h2 className="font-display text-xl font-extrabold">Phân bổ tài sản</h2><Link href="/wallets" className="text-sm font-bold text-primary-container">Quản lý ví</Link></div>
          <div className="space-y-3">
            {(analytics?.walletDistribution ?? []).map((wallet) => (
              <article key={wallet.walletId} className="rounded-2xl bg-surface-container-low p-4">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${wallet.color}18`, color: wallet.color }}><span className="material-symbols-outlined">{wallet.icon}</span></span>
                  <div className="min-w-0 flex-1"><p className="truncate font-bold">{wallet.name}</p><p className="text-xs text-on-surface-variant">{wallet.percentage}% tổng tài sản</p></div>
                  <p className="font-bold">{formatCompactMoney(wallet.balance)}</p>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full" style={{ width: `${wallet.percentage}%`, backgroundColor: wallet.color }} /></div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-white p-5 ambient-shadow-1">
          <div className="mb-4 flex items-center justify-between"><div><h2 className="font-display text-xl font-extrabold">Rủi ro ngân sách</h2><p className="text-sm text-on-surface-variant">Các ngân sách gần chạm ngưỡng</p></div><Link href="/budgets" className="text-sm font-bold text-primary-container">Xem</Link></div>
          <div className="space-y-3">
            {(analytics?.budgetRisks ?? []).map((budget) => (
              <article key={budget.id} className="rounded-2xl bg-surface-container-low p-4">
                <div className="mb-2 flex items-center justify-between gap-3"><p className="font-bold">{budget.name}</p><span className={`rounded-full px-3 py-1 text-xs font-bold ${budget.percentage >= 90 ? "bg-error-container text-on-error-container" : "bg-secondary-container text-on-secondary-container"}`}>{budget.percentage}%</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-white"><div className={`h-full rounded-full ${budget.percentage >= 90 ? "bg-error" : "bg-secondary"}`} style={{ width: `${Math.min(budget.percentage, 100)}%` }} /></div>
                <p className="mt-2 text-xs font-semibold text-on-surface-variant">{formatMoney(budget.amountSpent)} / {formatMoney(budget.amountLimit)}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}
