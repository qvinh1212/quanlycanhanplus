"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Budget, Category, Wallet } from "@/lib/types";
import { formatMoney } from "@/lib/format";
import { apiFetch } from "@/lib/api/client";

interface BudgetManagerProps {
  budgets: Budget[];
  categories: Category[];
  wallets: Wallet[];
}

type FormStatus = "idle" | "success" | "error";

function toInputDate(date: Date) {
  return new Date(date).toISOString().slice(0, 10);
}

export function BudgetManager({ budgets, categories, wallets }: BudgetManagerProps) {
  const router = useRouter();
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const expenseCategories = useMemo(
    () => categories.filter((category) => category.kind === "expense"),
    [categories],
  );
  const categoryById = useMemo(
    () => new Map(categories.map((category) => [category.id, category])),
    [categories],
  );
  const walletById = useMemo(
    () => new Map(wallets.map((wallet) => [wallet.id, wallet])),
    [wallets],
  );

  async function handleSubmit(formData: FormData) {
    setStatus("idle");
    setMessage("");

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      categoryId: String(formData.get("categoryId") ?? ""),
      walletId: String(formData.get("walletId") ?? ""),
      amountLimit: Number(formData.get("amountLimit")),
      period: String(formData.get("period") ?? "monthly"),
      startDate: String(formData.get("startDate") ?? ""),
      endDate: String(formData.get("endDate") ?? ""),
      alertThresholdPercent: Number(formData.get("alertThresholdPercent") ?? 80),
      status: String(formData.get("status") ?? "active"),
    };

    if (!payload.name) {
      setStatus("error");
      setMessage("Vui lòng nhập tên ngân sách.");
      return;
    }

    if (!payload.amountLimit || payload.amountLimit <= 0) {
      setStatus("error");
      setMessage("Vui lòng nhập giới hạn ngân sách lớn hơn 0.");
      return;
    }

    startTransition(async () => {
      try {
        const result = await apiFetch<{ success: boolean; error?: { message?: string } }>(editingBudget ? `/api/budgets/${editingBudget.id}` : "/api/budgets", {
          method: editingBudget ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!result.success) {
          throw new Error(result.error?.message ?? "Không thể lưu ngân sách.");
        }

        setStatus("success");
        setMessage(editingBudget ? "Đã cập nhật ngân sách." : "Đã tạo ngân sách mới.");
        setEditingBudget(null);
        router.refresh();
      } catch (error) {
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Có lỗi xảy ra khi lưu ngân sách.");
      }
    });
  }

  function archiveBudget(budget: Budget) {
    startTransition(async () => {
      try {
        const result = await apiFetch<{ success: boolean; error?: { message?: string } }>(`/api/budgets/${budget.id}`, { method: "DELETE" });

        if (!result.success) {
          throw new Error(result.error?.message ?? "Không thể xóa ngân sách.");
        }

        setStatus("success");
        setMessage(`Đã lưu trữ ngân sách ${budget.name}.`);
        if (editingBudget?.id === budget.id) setEditingBudget(null);
        router.refresh();
      } catch (error) {
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Có lỗi xảy ra khi xóa ngân sách.");
      }
    });
  }

  function toggleBudgetStatus(budget: Budget) {
    startTransition(async () => {
      const nextStatus = budget.status === "active" ? "paused" : "active";
      try {
        const result = await apiFetch<{ success: boolean; error?: { message?: string } }>(`/api/budgets/${budget.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: nextStatus }),
        });

        if (!result.success) {
          throw new Error(result.error?.message ?? "Không thể đổi trạng thái ngân sách.");
        }

        setStatus("success");
        setMessage(nextStatus === "active" ? "Đã kích hoạt ngân sách." : "Đã tạm dừng ngân sách.");
        router.refresh();
      } catch (error) {
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Có lỗi xảy ra khi đổi trạng thái.");
      }
    });
  }

  return (
    <div className="space-y-5">
      <section className="rounded-3xl bg-white p-5 ambient-shadow-1">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-primary-container">Budget CRUD</p>
            <h2 className="font-display text-2xl font-extrabold">
              {editingBudget ? "Sửa ngân sách" : "Tạo ngân sách"}
            </h2>
          </div>
          {editingBudget ? (
            <button
              type="button"
              onClick={() => setEditingBudget(null)}
              className="rounded-full bg-surface-container px-4 py-2 text-sm font-bold text-on-surface-variant"
            >
              Hủy
            </button>
          ) : null}
        </div>

        <form key={editingBudget?.id ?? "create"} action={handleSubmit} className="space-y-4">
          <label className="block" htmlFor="budget-name">
            <span className="mb-2 block text-sm font-semibold text-on-surface-variant">Tên ngân sách</span>
            <input
              id="budget-name"
              name="name"
              defaultValue={editingBudget?.name}
              placeholder="Ví dụ: Ăn uống tháng này"
              className="w-full rounded-2xl bg-surface-container-low px-4 py-4 outline-none transition focus:bg-white focus:ring-2 focus:ring-primary-container"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block" htmlFor="budget-category">
              <span className="mb-2 block text-sm font-semibold text-on-surface-variant">Danh mục</span>
              <select
                id="budget-category"
                name="categoryId"
                defaultValue={editingBudget?.categoryId ?? ""}
                className="w-full rounded-2xl bg-surface-container-low px-3 py-4 outline-none focus:ring-2 focus:ring-primary-container"
              >
                <option value="">Tất cả</option>
                {expenseCategories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </label>

            <label className="block" htmlFor="budget-wallet">
              <span className="mb-2 block text-sm font-semibold text-on-surface-variant">Ví</span>
              <select
                id="budget-wallet"
                name="walletId"
                defaultValue={editingBudget?.walletId ?? ""}
                className="w-full rounded-2xl bg-surface-container-low px-3 py-4 outline-none focus:ring-2 focus:ring-primary-container"
              >
                <option value="">Tất cả ví</option>
                {wallets.map((wallet) => (
                  <option key={wallet.id} value={wallet.id}>{wallet.name}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="block" htmlFor="budget-limit">
            <span className="mb-2 block text-sm font-semibold text-on-surface-variant">Giới hạn</span>
            <input
              id="budget-limit"
              name="amountLimit"
              type="number"
              min={1000}
              step={1000}
              defaultValue={editingBudget?.amountLimit}
              placeholder="4000000"
              className="no-number-spinner w-full rounded-2xl bg-surface-container-low px-4 py-4 outline-none focus:bg-white focus:ring-2 focus:ring-primary-container"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block" htmlFor="budget-period">
              <span className="mb-2 block text-sm font-semibold text-on-surface-variant">Chu kỳ</span>
              <select id="budget-period" name="period" defaultValue={editingBudget?.period ?? "monthly"} className="w-full rounded-2xl bg-surface-container-low px-3 py-4 outline-none focus:ring-2 focus:ring-primary-container">
                <option value="weekly">Tuần</option>
                <option value="monthly">Tháng</option>
                <option value="quarterly">Quý</option>
                <option value="yearly">Năm</option>
              </select>
            </label>

            <label className="block" htmlFor="budget-threshold">
              <span className="mb-2 block text-sm font-semibold text-on-surface-variant">Cảnh báo %</span>
              <input id="budget-threshold" name="alertThresholdPercent" type="number" min={1} max={100} defaultValue={editingBudget?.alertThresholdPercent ?? 80} className="w-full rounded-2xl bg-surface-container-low px-4 py-4 outline-none focus:ring-2 focus:ring-primary-container" />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="block" htmlFor="budget-start">
              <span className="mb-2 block text-sm font-semibold text-on-surface-variant">Bắt đầu</span>
              <input id="budget-start" name="startDate" type="date" defaultValue={editingBudget ? toInputDate(editingBudget.startDate) : "2026-04-01"} className="w-full rounded-2xl bg-surface-container-low px-3 py-4 outline-none focus:ring-2 focus:ring-primary-container" />
            </label>
            <label className="block" htmlFor="budget-end">
              <span className="mb-2 block text-sm font-semibold text-on-surface-variant">Kết thúc</span>
              <input id="budget-end" name="endDate" type="date" defaultValue={editingBudget ? toInputDate(editingBudget.endDate) : "2026-04-30"} className="w-full rounded-2xl bg-surface-container-low px-3 py-4 outline-none focus:ring-2 focus:ring-primary-container" />
            </label>
          </div>

          {editingBudget ? (
            <input type="hidden" name="status" value={editingBudget.status} />
          ) : null}

          {message ? (
            <p className={`rounded-2xl px-4 py-3 text-sm font-semibold ${status === "success" ? "bg-secondary-container text-on-secondary-container" : "bg-error-container text-on-error-container"}`}>
              {message}
            </p>
          ) : null}

          <button id="save-budget-button" type="submit" disabled={isPending} className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary-container px-4 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-primary disabled:cursor-not-allowed disabled:opacity-70">
            <span className="material-symbols-outlined">{isPending ? "progress_activity" : "savings"}</span>
            {isPending ? "Đang xử lý..." : editingBudget ? "Cập nhật ngân sách" : "Tạo ngân sách"}
          </button>
        </form>
      </section>

      <section className="space-y-4">
        {budgets.map((budget) => {
          const category = budget.categoryId ? categoryById.get(budget.categoryId) : undefined;
          const wallet = budget.walletId ? walletById.get(budget.walletId) : undefined;
          const progress = Math.round((budget.amountSpent / Math.max(budget.amountLimit, 1)) * 100);
          const isWarning = progress >= budget.alertThresholdPercent;

          return (
            <article key={budget.id} className="rounded-3xl bg-white p-5 ambient-shadow-1">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundColor: `${category?.color ?? "#254bb3"}18`, color: category?.color ?? "#254bb3" }}>
                  <span className="material-symbols-outlined">{category?.icon ?? "savings"}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-lg font-extrabold">{budget.name}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${budget.status === "active" ? "bg-secondary-container text-on-secondary-container" : "bg-surface-container text-on-surface-variant"}`}>
                      {budget.status === "active" ? "Đang chạy" : "Tạm dừng"}
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant">
                    {category?.name ?? "Tất cả danh mục"} · {wallet?.name ?? "Tất cả ví"}
                  </p>
                  <p className="mt-1 text-sm text-on-surface-variant">
                    {formatMoney(budget.amountSpent)} / {formatMoney(budget.amountLimit)}
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${isWarning ? "bg-error-container text-on-error-container" : "bg-secondary-container text-on-secondary-container"}`}>
                  {progress}%
                </span>
              </div>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-surface-container">
                <div className={`h-full rounded-full ${isWarning ? "bg-error" : "bg-gradient-to-r from-secondary to-primary-container"}`} style={{ width: `${Math.min(progress, 100)}%` }} />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <button type="button" onClick={() => setEditingBudget(budget)} className="rounded-2xl bg-primary-fixed px-3 py-3 text-sm font-bold text-primary-container">Sửa</button>
                <button type="button" onClick={() => toggleBudgetStatus(budget)} className="rounded-2xl bg-surface-container px-3 py-3 text-sm font-bold text-on-surface-variant">
                  {budget.status === "active" ? "Dừng" : "Bật"}
                </button>
                <button type="button" onClick={() => archiveBudget(budget)} className="rounded-2xl bg-error-container px-3 py-3 text-sm font-bold text-on-error-container">Xóa</button>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
