"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Wallet, WalletType } from "@/lib/types";
import { formatMoney } from "@/lib/format";
import { apiFetch } from "@/lib/api/client";

interface WalletManagerProps {
  initialWallets: Wallet[];
}

type FormStatus = "idle" | "success" | "error";

const walletOptions: Array<{ type: WalletType; label: string; icon: string; color: string }> = [
  { type: "cash", label: "Tiền mặt", icon: "payments", color: "#0F9D58" },
  { type: "bank", label: "Ngân hàng", icon: "account_balance", color: "#254BB3" },
  { type: "credit_card", label: "Thẻ tín dụng", icon: "credit_card", color: "#A142F4" },
  { type: "e_wallet", label: "Ví điện tử", icon: "account_balance_wallet", color: "#F29900" },
  { type: "savings", label: "Tiết kiệm", icon: "savings", color: "#00A3A3" },
  { type: "investment", label: "Đầu tư", icon: "monitoring", color: "#D93025" },
];

export function WalletManager({ initialWallets }: WalletManagerProps) {
  const router = useRouter();
  const [wallets, setWallets] = useState(initialWallets);
  const [editingWallet, setEditingWallet] = useState<Wallet | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const totalBalance = useMemo(
    () => wallets.reduce((sum, wallet) => sum + wallet.currentBalance, 0),
    [wallets],
  );
  const selectedOption = walletOptions.find((option) => option.type === editingWallet?.type) ?? walletOptions[0];

  async function refreshWallets() {
    const response = await apiFetch("/api/wallets", { cache: "no-store" });
    const result = await response.json();
    if (response.ok && result.success) setWallets(result.data);
  }

  async function handleSubmit(formData: FormData) {
    setStatus("idle");
    setMessage("");

    const type = String(formData.get("type")) as WalletType;
    const option = walletOptions.find((item) => item.type === type) ?? walletOptions[0];
    const name = String(formData.get("name") ?? "").trim();
    const initialBalance = Number(formData.get("initialBalance"));
    const color = String(formData.get("color") || option.color);
    const icon = String(formData.get("icon") || option.icon);

    if (!name || Number.isNaN(initialBalance)) {
      setStatus("error");
      setMessage("Vui lòng nhập tên ví và số dư ban đầu hợp lệ.");
      return;
    }

    startTransition(async () => {
      try {
        const response = await apiFetch(editingWallet ? `/api/wallets/${editingWallet.id}` : "/api/wallets", {
          method: editingWallet ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, type, initialBalance, currency: "VND", color, icon }),
        });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.error?.message ?? "Không thể lưu ví.");
        await refreshWallets();
        setEditingWallet(null);
        setStatus("success");
        setMessage(editingWallet ? "Đã cập nhật ví." : "Đã tạo ví mới.");
        router.refresh();
      } catch (error) {
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Có lỗi xảy ra.");
      }
    });
  }

  function handleArchive(wallet: Wallet) {
    startTransition(async () => {
      try {
        const response = await apiFetch(`/api/wallets/${wallet.id}`, { method: "DELETE" });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.error?.message ?? "Không thể lưu trữ ví.");
        await refreshWallets();
        if (editingWallet?.id === wallet.id) setEditingWallet(null);
        setStatus("success");
        setMessage(`Đã lưu trữ ví ${wallet.name}.`);
        router.refresh();
      } catch (error) {
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Có lỗi xảy ra.");
      }
    });
  }

  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-[2rem] bg-primary-container p-6 text-white shadow-2xl shadow-primary-container/20">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <p className="relative text-sm text-on-primary-container">Tổng tài sản khả dụng</p>
        <h1 className="relative mt-2 font-display text-4xl font-extrabold tracking-tight">
          {formatMoney(totalBalance)}
        </h1>
        <div className="relative mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/12 p-4">
            <p className="text-xs text-on-primary-container">Số ví</p>
            <p className="mt-1 font-display text-2xl font-extrabold">{wallets.length}</p>
          </div>
          <div className="rounded-2xl bg-white/12 p-4">
            <p className="text-xs text-on-primary-container">Ví mặc định</p>
            <p className="mt-1 truncate font-bold">{wallets.find((wallet) => wallet.isDefault)?.name ?? wallets[0]?.name ?? "Chưa có"}</p>
          </div>
        </div>
      </section>

      <form action={handleSubmit} className="rounded-[2rem] bg-white p-5 ambient-shadow-1">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-extrabold">{editingWallet ? "Sửa ví" : "Thêm ví mới"}</h2>
            <p className="text-sm text-on-surface-variant">Quản lý tiền mặt, ngân hàng, ví điện tử và đầu tư.</p>
          </div>
          {editingWallet ? (
            <button type="button" onClick={() => setEditingWallet(null)} className="rounded-full bg-surface-container-low px-3 py-2 text-xs font-bold text-primary-container">
              Hủy
            </button>
          ) : null}
        </div>

        <div className="grid gap-4">
          <label htmlFor="wallet-name" className="block">
            <span className="mb-2 block text-sm font-semibold text-on-surface-variant">Tên ví</span>
            <input
              id="wallet-name"
              name="name"
              key={editingWallet?.id ?? "new-name"}
              defaultValue={editingWallet?.name ?? ""}
              placeholder="Ví chính, Techcombank, Momo..."
              className="w-full rounded-2xl bg-surface-container-low px-4 py-4 outline-none transition focus:bg-white focus:ring-2 focus:ring-primary-container"
            />
          </label>

          <label htmlFor="wallet-type" className="block">
            <span className="mb-2 block text-sm font-semibold text-on-surface-variant">Loại ví</span>
            <select
              id="wallet-type"
              name="type"
              key={editingWallet?.id ?? "new-type"}
              defaultValue={editingWallet?.type ?? walletOptions[0].type}
              className="w-full rounded-2xl bg-surface-container-low px-4 py-4 outline-none transition focus:bg-white focus:ring-2 focus:ring-primary-container"
            >
              {walletOptions.map((option) => (
                <option key={option.type} value={option.type}>{option.label}</option>
              ))}
            </select>
          </label>

          <label htmlFor="wallet-balance" className="block">
            <span className="mb-2 block text-sm font-semibold text-on-surface-variant">Số dư ban đầu</span>
            <input
              id="wallet-balance"
              name="initialBalance"
              type="number"
              step={1000}
              key={editingWallet?.id ?? "new-balance"}
              defaultValue={editingWallet?.initialBalance ?? 0}
              className="w-full rounded-2xl bg-surface-container-low px-4 py-4 font-display text-xl font-extrabold outline-none transition focus:bg-white focus:ring-2 focus:ring-primary-container"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label htmlFor="wallet-color" className="block">
              <span className="mb-2 block text-sm font-semibold text-on-surface-variant">Màu</span>
              <input id="wallet-color" name="color" type="color" key={editingWallet?.id ?? "new-color"} defaultValue={editingWallet?.color ?? selectedOption.color} className="h-14 w-full rounded-2xl bg-surface-container-low p-2" />
            </label>
            <label htmlFor="wallet-icon" className="block">
              <span className="mb-2 block text-sm font-semibold text-on-surface-variant">Icon</span>
              <input id="wallet-icon" name="icon" key={editingWallet?.id ?? "new-icon"} defaultValue={editingWallet?.icon ?? selectedOption.icon} className="w-full rounded-2xl bg-surface-container-low px-4 py-4 outline-none focus:ring-2 focus:ring-primary-container" />
            </label>
          </div>
        </div>

        {message ? (
          <p className={`mt-4 rounded-2xl px-4 py-3 text-sm font-semibold ${status === "success" ? "bg-secondary-container text-on-secondary-container" : "bg-error-container text-on-error-container"}`}>
            {message}
          </p>
        ) : null}

        <button id="save-wallet-button" type="submit" disabled={isPending} className="mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary-container px-4 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-primary disabled:opacity-70">
          <span className="material-symbols-outlined">{isPending ? "progress_activity" : "account_balance_wallet"}</span>
          {isPending ? "Đang lưu..." : editingWallet ? "Cập nhật ví" : "Tạo ví"}
        </button>
      </form>

      <section className="space-y-3">
        {wallets.map((wallet) => {
          const flow = wallet.currentBalance - wallet.initialBalance;
          return (
            <article key={wallet.id} className="rounded-3xl bg-white p-4 ambient-shadow-1 transition hover:-translate-y-1 hover:ambient-shadow-2">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundColor: `${wallet.color}18`, color: wallet.color }}>
                  <span className="material-symbols-outlined">{wallet.icon}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-on-surface">{wallet.name}</p>
                  <p className="text-xs text-on-surface-variant">{walletOptions.find((option) => option.type === wallet.type)?.label ?? wallet.type}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-lg font-extrabold">{formatMoney(wallet.currentBalance)}</p>
                  <p className={`text-xs font-bold ${flow >= 0 ? "text-secondary" : "text-error"}`}>{flow >= 0 ? "+" : ""}{formatMoney(flow)}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setEditingWallet(wallet)} className="rounded-2xl bg-surface-container-low px-4 py-3 text-sm font-bold text-primary-container transition hover:bg-primary-fixed">
                  Sửa ví
                </button>
                <button type="button" onClick={() => handleArchive(wallet)} disabled={isPending} className="rounded-2xl bg-error-container px-4 py-3 text-sm font-bold text-on-error-container transition hover:brightness-95 disabled:opacity-70">
                  Lưu trữ
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
