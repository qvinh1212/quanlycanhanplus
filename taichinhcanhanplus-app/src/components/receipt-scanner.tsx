"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Category, Wallet } from "@/lib/types";
import { formatMoney } from "@/lib/format";
import { apiFetch } from "@/lib/api/client";

interface ReceiptScannerProps {
  categories: Category[];
  wallets: Wallet[];
}

type ScanStatus = "idle" | "scanning" | "ready" | "saving" | "success" | "error";

const receiptHints = [
  "Đang đọc tổng tiền...",
  "Đang nhận diện cửa hàng...",
  "Đang khớp danh mục chi tiêu...",
];

export function ReceiptScanner({ categories, wallets }: ReceiptScannerProps) {
  const router = useRouter();
  const [status, setStatus] = useState<ScanStatus>("idle");
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("Hóa đơn siêu thị");
  const [amount, setAmount] = useState(186000);
  const [walletId, setWalletId] = useState(wallets[0]?.id ?? "");
  const [categoryId, setCategoryId] = useState(categories.find((category) => category.kind === "expense")?.id ?? "");
  const [note, setNote] = useState("Tạo từ Quick Action quét hóa đơn #receipt");
  const [isPending, startTransition] = useTransition();

  const expenseCategories = useMemo(
    () => categories.filter((category) => category.kind === "expense"),
    [categories],
  );

  function handleScan(fileName?: string) {
    setStatus("scanning");
    setMessage(fileName ? `Đang phân tích ${fileName}...` : "Đang mô phỏng OCR hóa đơn...");

    window.setTimeout(() => {
      setStatus("ready");
      setMessage("Đã nhận diện hóa đơn. Kiểm tra lại thông tin rồi lưu giao dịch.");
      setTitle(fileName ? `Hóa đơn ${fileName.replace(/\.[^.]+$/, "")}` : "Hóa đơn siêu thị");
      setAmount(186000);
      setNote("OCR demo: siêu thị, thực phẩm, đồ dùng #receipt");
    }, 950);
  }

  function saveTransaction() {
    setStatus("saving");
    setMessage("Đang lưu giao dịch từ hóa đơn...");

    startTransition(async () => {
      try {
        const result = await apiFetch<{ success: boolean; error?: { message?: string } }>("/api/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            walletId,
            categoryId,
            type: "expense",
            amount,
            title: title.trim(),
            note: note.trim(),
            occurredAt: new Date().toISOString(),
            tags: ["receipt", "ocr-demo"],
          }),
        });
        if (!result.success) throw new Error(result.error?.message ?? "Không thể lưu giao dịch.");

        setStatus("success");
        setMessage("Đã lưu hóa đơn thành giao dịch chi tiêu. Đang quay về Dashboard...");
        router.refresh();
        window.setTimeout(() => router.push("/dashboard"), 800);
      } catch (error) {
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Có lỗi xảy ra khi lưu hóa đơn.");
      }
    });
  }

  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-[2rem] bg-tertiary-container p-6 text-white shadow-2xl shadow-tertiary-container/20">
        <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-white/15 blur-2xl" />
        <span className="material-symbols-outlined relative text-4xl">qr_code_scanner</span>
        <h1 className="relative mt-4 font-display text-3xl font-extrabold">Quét hóa đơn</h1>
        <p className="relative mt-2 text-sm text-white/80">
          MVP OCR demo: upload ảnh hoặc chạy mô phỏng để tạo giao dịch chi tiêu thật qua API.
        </p>
      </section>

      <section className="rounded-[2rem] bg-white p-5 ambient-shadow-2">
        <label htmlFor="receipt-upload" className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-outline-variant bg-surface-container-low p-6 text-center transition hover:-translate-y-1 hover:border-primary-container hover:bg-white">
          <span className="material-symbols-outlined text-5xl text-primary-container">upload_file</span>
          <span className="mt-3 font-bold text-on-surface">Chọn ảnh hóa đơn</span>
          <span className="mt-1 text-xs text-on-surface-variant">PNG, JPG hoặc ảnh chụp màn hình</span>
          <input
            id="receipt-upload"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(event) => handleScan(event.target.files?.[0]?.name)}
          />
        </label>

        <button
          id="mock-scan-button"
          type="button"
          onClick={() => handleScan()}
          disabled={status === "scanning" || isPending}
          className="mt-4 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary-container px-4 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-primary disabled:opacity-70"
        >
          <span className="material-symbols-outlined">{status === "scanning" ? "progress_activity" : "auto_awesome"}</span>
          {status === "scanning" ? "Đang quét..." : "Mô phỏng OCR ngay"}
        </button>

        {status === "scanning" ? (
          <div className="mt-4 space-y-2">
            {receiptHints.map((hint) => (
              <div key={hint} className="flex items-center gap-2 rounded-2xl bg-surface-container-low px-4 py-3 text-sm font-semibold text-on-surface-variant">
                <span className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
                {hint}
              </div>
            ))}
          </div>
        ) : null}
      </section>

      <section className="rounded-[2rem] bg-white p-5 ambient-shadow-1">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-extrabold">Kết quả nhận diện</h2>
          <span className="rounded-full bg-primary-fixed px-3 py-1 text-xs font-bold text-primary-container">
            {formatMoney(amount)}
          </span>
        </div>

        <div className="grid gap-4">
          <label htmlFor="scan-title" className="block">
            <span className="mb-2 block text-sm font-semibold text-on-surface-variant">Tên giao dịch</span>
            <input id="scan-title" value={title} onChange={(event) => setTitle(event.target.value)} className="w-full rounded-2xl bg-surface-container-low px-4 py-4 outline-none transition focus:bg-white focus:ring-2 focus:ring-primary-container" />
          </label>

          <label htmlFor="scan-amount" className="block">
            <span className="mb-2 block text-sm font-semibold text-on-surface-variant">Số tiền</span>
            <input id="scan-amount" type="number" min={1000} step={1000} value={amount} onChange={(event) => setAmount(Number(event.target.value))} className="w-full rounded-2xl bg-surface-container-low px-4 py-4 font-display text-xl font-extrabold outline-none transition focus:bg-white focus:ring-2 focus:ring-primary-container" />
          </label>

          <label htmlFor="scan-wallet" className="block">
            <span className="mb-2 block text-sm font-semibold text-on-surface-variant">Ví thanh toán</span>
            <select id="scan-wallet" value={walletId} onChange={(event) => setWalletId(event.target.value)} className="w-full rounded-2xl bg-surface-container-low px-4 py-4 outline-none transition focus:bg-white focus:ring-2 focus:ring-primary-container">
              {wallets.map((wallet) => <option key={wallet.id} value={wallet.id}>{wallet.name}</option>)}
            </select>
          </label>

          <label htmlFor="scan-category" className="block">
            <span className="mb-2 block text-sm font-semibold text-on-surface-variant">Danh mục</span>
            <select id="scan-category" value={categoryId} onChange={(event) => setCategoryId(event.target.value)} className="w-full rounded-2xl bg-surface-container-low px-4 py-4 outline-none transition focus:bg-white focus:ring-2 focus:ring-primary-container">
              {expenseCategories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
          </label>

          <label htmlFor="scan-note" className="block">
            <span className="mb-2 block text-sm font-semibold text-on-surface-variant">Ghi chú OCR</span>
            <textarea id="scan-note" rows={3} value={note} onChange={(event) => setNote(event.target.value)} className="w-full resize-none rounded-2xl bg-surface-container-low px-4 py-4 outline-none transition focus:bg-white focus:ring-2 focus:ring-primary-container" />
          </label>
        </div>

        {message ? (
          <p className={`mt-4 rounded-2xl px-4 py-3 text-sm font-semibold ${status === "error" ? "bg-error-container text-on-error-container" : "bg-secondary-container text-on-secondary-container"}`}>
            {message}
          </p>
        ) : null}

        <button
          id="save-scanned-receipt-button"
          type="button"
          onClick={saveTransaction}
          disabled={isPending || status === "scanning" || !walletId || !categoryId || amount <= 0 || !title.trim()}
          className="mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary-container px-4 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-primary disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span className="material-symbols-outlined">{isPending || status === "saving" ? "progress_activity" : "receipt_long"}</span>
          {isPending || status === "saving" ? "Đang lưu..." : "Lưu thành giao dịch"}
        </button>
      </section>
    </div>
  );
}
