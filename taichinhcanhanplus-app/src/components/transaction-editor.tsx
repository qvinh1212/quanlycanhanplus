"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import type { Category, Transaction, Wallet } from "@/lib/types";
import { apiFetch } from "@/lib/api/client";

interface TransactionEditorProps {
  transaction: Transaction;
  categories: Category[];
  wallets: Wallet[];
}

type FormStatus = "idle" | "success" | "error";

export function TransactionEditor({ transaction, categories, wallets }: TransactionEditorProps) {
  const router = useRouter();
  const [type, setType] = useState<"expense" | "income">(
    transaction.type === "income" ? "income" : "expense",
  );
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [isPending, startTransition] = useTransition();

  const visibleCategories = useMemo(
    () => categories.filter((category) => category.kind === type),
    [categories, type],
  );

  async function handleSubmit(formData: FormData) {
    setMessage("");
    setStatus("idle");

    const amount = Number(formData.get("amount"));
    const title = String(formData.get("title") ?? "").trim();
    const walletId = String(formData.get("walletId") ?? "");
    const categoryId = String(formData.get("categoryId") ?? "");
    const note = String(formData.get("note") ?? "").trim();

    if (!amount || amount <= 0 || !title || !walletId) {
      setStatus("error");
      setMessage("Vui lòng nhập đầy đủ ví, tiêu đề và số tiền hợp lệ.");
      return;
    }

    startTransition(async () => {
      try {
        const result = await apiFetch<{ success: boolean; error?: { message?: string } }>(`/api/transactions/${transaction.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            walletId,
            categoryId,
            type,
            amount,
            title,
            note,
            occurredAt: transaction.occurredAt,
            tags: note ? note.split(/\s+/).filter((word) => word.startsWith("#")) : [],
          }),
        });
        if (!result.success) throw new Error(result.error?.message ?? "Không thể cập nhật.");
        setStatus("success");
        setMessage("Đã cập nhật giao dịch và đồng bộ lại ngân sách.");
        router.refresh();
      } catch (error) {
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Có lỗi xảy ra.");
      }
    });
  }

  function handleDelete() {
    startTransition(async () => {
      try {
        const result = await apiFetch<{ success: boolean; error?: { message?: string } }>(`/api/transactions/${transaction.id}`, { method: "DELETE" });
        if (!result.success) throw new Error(result.error?.message ?? "Không thể xóa.");
        router.push("/transactions");
        router.refresh();
      } catch (error) {
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Có lỗi xảy ra.");
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-5 rounded-[2rem] bg-white p-5 ambient-shadow-1">
      <div className="grid grid-cols-2 rounded-2xl bg-surface-container-low p-1">
        {["expense", "income"].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setType(item as "expense" | "income")}
            className={`rounded-xl py-3 font-bold transition ${
              type === item ? "bg-primary-container text-white shadow-md" : "text-on-surface-variant"
            }`}
          >
            {item === "expense" ? "Chi tiêu" : "Thu nhập"}
          </button>
        ))}
      </div>

      <label className="block" htmlFor="detail-amount">
        <span className="mb-2 block text-sm font-semibold text-on-surface-variant">Số tiền</span>
        <input
          id="detail-amount"
          name="amount"
          type="number"
          min={1000}
          step={1000}
          defaultValue={transaction.amount}
          className="w-full rounded-2xl bg-surface-container-low px-4 py-4 font-display text-3xl font-extrabold outline-none focus:ring-2 focus:ring-primary-container"
        />
      </label>

      <label className="block" htmlFor="detail-title">
        <span className="mb-2 block text-sm font-semibold text-on-surface-variant">Tên giao dịch</span>
        <input
          id="detail-title"
          name="title"
          defaultValue={transaction.title}
          className="w-full rounded-2xl bg-surface-container-low px-4 py-4 outline-none focus:ring-2 focus:ring-primary-container"
        />
      </label>

      <label className="block" htmlFor="detail-wallet">
        <span className="mb-2 block text-sm font-semibold text-on-surface-variant">Ví</span>
        <select
          id="detail-wallet"
          name="walletId"
          defaultValue={transaction.walletId}
          className="w-full rounded-2xl bg-surface-container-low px-4 py-4 outline-none focus:ring-2 focus:ring-primary-container"
        >
          {wallets.map((wallet) => (
            <option key={wallet.id} value={wallet.id}>{wallet.name}</option>
          ))}
        </select>
      </label>

      <div>
        <p className="mb-3 text-sm font-semibold text-on-surface-variant">Danh mục</p>
        <div className="grid grid-cols-3 gap-3">
          {visibleCategories.map((category) => (
            <label key={category.id} className="cursor-pointer rounded-3xl border border-outline-variant bg-surface-container-low p-3 text-center transition hover:-translate-y-1">
              <input
                type="radio"
                name="categoryId"
                value={category.id}
                defaultChecked={category.id === transaction.categoryId}
                className="peer sr-only"
              />
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary-container peer-checked:bg-primary-container peer-checked:text-white">
                <span className="material-symbols-outlined">{category.icon}</span>
              </span>
              <span className="mt-2 block text-xs font-bold text-on-surface-variant peer-checked:text-primary-container">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      <label className="block" htmlFor="detail-note">
        <span className="mb-2 block text-sm font-semibold text-on-surface-variant">Ghi chú</span>
        <textarea
          id="detail-note"
          name="note"
          rows={3}
          defaultValue={transaction.note ?? ""}
          className="w-full resize-none rounded-2xl bg-surface-container-low px-4 py-4 outline-none focus:ring-2 focus:ring-primary-container"
        />
      </label>

      {message ? (
        <p className={`rounded-2xl px-4 py-3 text-sm font-semibold ${status === "success" ? "bg-secondary-container text-on-secondary-container" : "bg-error-container text-on-error-container"}`}>
          {message}
        </p>
      ) : null}

      <div className="grid grid-cols-[1fr_auto] gap-3">
        <button
          id="update-transaction-button"
          type="submit"
          disabled={isPending}
          className="rounded-2xl bg-primary-container px-4 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5 disabled:opacity-70"
        >
          {isPending ? "Đang xử lý..." : "Cập nhật"}
        </button>
        <button
          id="delete-transaction-button"
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className="rounded-2xl bg-error-container px-5 py-4 font-bold text-on-error-container transition hover:-translate-y-0.5 disabled:opacity-70"
        >
          Xóa
        </button>
      </div>
    </form>
  );
}
