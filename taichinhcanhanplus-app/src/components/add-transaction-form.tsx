"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { Category, Wallet } from "@/lib/types";
import { apiFetch } from "@/lib/api/client";

interface AddTransactionFormProps {
  categories: Category[];
  wallets: Wallet[];
  initialType?: "expense" | "income";
}

type FormStatus = "idle" | "success" | "error";

export function AddTransactionForm({ categories, wallets, initialType = "expense" }: AddTransactionFormProps) {
  const router = useRouter();
  const [type, setType] = useState<"expense" | "income">(initialType);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const visibleCategories = categories.filter((category) => category.kind === type);

  async function handleSubmit(formData: FormData) {
    setStatus("idle");
    setMessage("");

    const amount = Number(formData.get("amount"));
    const title = String(formData.get("title") ?? "").trim();
    const walletId = String(formData.get("walletId") ?? "");
    const categoryId = String(formData.get("categoryId") ?? "");
    const note = String(formData.get("note") ?? "").trim();

    if (!amount || amount <= 0) {
      setStatus("error");
      setMessage("Vui lòng nhập số tiền lớn hơn 0.");
      return;
    }

    if (!title) {
      setStatus("error");
      setMessage("Vui lòng nhập tên giao dịch.");
      return;
    }

    startTransition(async () => {
      try {
        const response = await apiFetch("/api/transactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            walletId,
            categoryId,
            type,
            amount,
            title,
            note,
            occurredAt: new Date().toISOString(),
            tags: note ? note.split(/\s+/).filter((word) => word.startsWith("#")) : [],
          }),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error?.message ?? "Không thể lưu giao dịch.");
        }

        setStatus("success");
        setMessage("Đã lưu giao dịch thành công. Đang cập nhật Dashboard...");
        router.refresh();
        setTimeout(() => router.push("/dashboard"), 700);
      } catch (error) {
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Có lỗi xảy ra khi lưu giao dịch.");
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      <div className="mb-6 grid grid-cols-2 rounded-2xl bg-surface-container-low p-1">
        <button
          type="button"
          onClick={() => setType("expense")}
          className={`rounded-xl py-3 font-bold transition ${
            type === "expense"
              ? "bg-primary-container text-white shadow-md"
              : "text-on-surface-variant hover:bg-white/70"
          }`}
        >
          Chi tiêu
        </button>
        <button
          type="button"
          onClick={() => setType("income")}
          className={`rounded-xl py-3 font-bold transition ${
            type === "income"
              ? "bg-primary-container text-white shadow-md"
              : "text-on-surface-variant hover:bg-white/70"
          }`}
        >
          Thu nhập
        </button>
      </div>

      <div className="rounded-3xl bg-primary-container p-5 text-center text-white">
        <label htmlFor="amount" className="text-sm text-on-primary-container">
          Số tiền
        </label>
        <div className="mt-2 flex items-center justify-center gap-2">
          <input
            id="amount"
            name="amount"
            type="number"
            inputMode="numeric"
            min={1000}
            step={1000}
            placeholder="0"
            className="no-number-spinner w-full bg-transparent text-center font-display text-5xl font-extrabold outline-none placeholder:text-white/45"
          />
          <span className="font-bold text-on-primary-container">₫</span>
        </div>
      </div>

      <label className="block" htmlFor="title">
        <span className="mb-2 block text-sm font-semibold text-on-surface-variant">Tên giao dịch</span>
        <input
          id="title"
          name="title"
          placeholder={type === "expense" ? "Ví dụ: Cà phê sáng" : "Ví dụ: Lương freelance"}
          className="w-full rounded-2xl bg-surface-container-low px-4 py-4 outline-none transition focus:bg-white focus:ring-2 focus:ring-primary-container"
        />
      </label>

      <label className="block" htmlFor="wallet">
        <span className="mb-2 block text-sm font-semibold text-on-surface-variant">Ví thanh toán</span>
        <select
          id="wallet"
          name="walletId"
          className="w-full rounded-2xl bg-surface-container-low px-4 py-4 outline-none transition focus:bg-white focus:ring-2 focus:ring-primary-container"
        >
          {wallets.map((wallet) => (
            <option key={wallet.id} value={wallet.id}>
              {wallet.name}
            </option>
          ))}
        </select>
      </label>

      <div>
        <p className="mb-3 text-sm font-semibold text-on-surface-variant">Danh mục</p>
        <div className="grid grid-cols-3 gap-3">
          {visibleCategories.map((category, index) => (
            <label
              key={category.id}
              className="cursor-pointer rounded-3xl border border-outline-variant/70 bg-surface-container-low p-3 text-center transition hover:-translate-y-1 hover:border-primary-container hover:bg-white hover:shadow-lg"
            >
              <input
                type="radio"
                name="categoryId"
                value={category.id}
                defaultChecked={index === 0}
                className="sr-only peer"
              />
              <span
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary-container peer-checked:bg-primary-container peer-checked:text-white"
                style={{ color: index === 0 ? undefined : category.color }}
              >
                <span className="material-symbols-outlined">{category.icon}</span>
              </span>
              <span className="mt-2 block text-xs font-bold text-on-surface-variant peer-checked:text-primary-container">
                {category.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      <label className="block" htmlFor="note">
        <span className="mb-2 block text-sm font-semibold text-on-surface-variant">Ghi chú</span>
        <textarea
          id="note"
          name="note"
          rows={3}
          placeholder="Thêm ghi chú hoặc tag #cafe #daily..."
          className="w-full resize-none rounded-2xl bg-surface-container-low px-4 py-4 outline-none transition focus:bg-white focus:ring-2 focus:ring-primary-container"
        />
      </label>

      {message ? (
        <p
          className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
            status === "success"
              ? "bg-secondary-container text-on-secondary-container"
              : "bg-error-container text-on-error-container"
          }`}
        >
          {message}
        </p>
      ) : null}

      <button
        id="save-transaction-button"
        type="submit"
        disabled={isPending}
        className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary-container px-4 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-primary disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span className="material-symbols-outlined">{isPending ? "progress_activity" : "check_circle"}</span>
        {isPending ? "Đang lưu..." : "Lưu giao dịch"}
      </button>
    </form>
  );
}
