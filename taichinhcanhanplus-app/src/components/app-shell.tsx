import Link from "next/link";

const navItems = [
  { href: "/dashboard", icon: "home", label: "Trang chủ" },
  { href: "/transactions", icon: "receipt_long", label: "Giao dịch" },
  { href: "/add-transaction", icon: "add", label: "Thêm mới", prominent: true },
  { href: "/wallets", icon: "account_balance_wallet", label: "Ví" },
  { href: "/reports", icon: "leaderboard", label: "Báo cáo" },
  { href: "/profile", icon: "person", label: "Tài khoản" },
];

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  active?: string;
}

export function AppShell({ children, title = "Quản lý chi tiêu", active }: AppShellProps) {
  return (
    <div className="min-h-dvh bg-background text-on-surface">
      <header className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between bg-white/85 px-5 text-primary-container shadow-[0_8px_30px_rgba(37,75,179,0.06)] backdrop-blur-xl">
        <button
          id="menu-button"
          aria-label="Mở menu"
          className="tap-target flex items-center justify-center rounded-full transition hover:bg-surface-container-low active:scale-95"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <span className="font-display text-xl font-extrabold tracking-tight">{title}</span>
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-surface-container bg-primary-fixed text-primary-container">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>
            person
          </span>
        </div>
      </header>

      {children}

      <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around rounded-t-2xl border-t border-outline-variant/60 bg-white/90 px-4 pb-6 pt-3 shadow-[0_-8px_30px_rgba(37,75,179,0.08)] backdrop-blur-xl">
        {navItems.map((item) => {
          const isActive = active === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition active:scale-95 ${
                isActive ? "text-primary-container" : "text-slate-400 hover:text-primary-container"
              } ${item.prominent ? "-mt-5" : ""}`}
            >
              {item.prominent ? (
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-on-primary shadow-lg transition hover:bg-primary-container">
                  <span className="material-symbols-outlined text-[32px]">{item.icon}</span>
                </span>
              ) : (
                <span
                  className="material-symbols-outlined"
                  style={isActive ? { fontVariationSettings: '"FILL" 1' } : undefined}
                >
                  {item.icon}
                </span>
              )}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
