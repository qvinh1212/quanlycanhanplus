export function MoneyLogo({ size = "lg" }: { size?: "md" | "lg" }) {
  const box = size === "lg" ? "h-32 w-32" : "h-16 w-16";
  const icon = size === "lg" ? "text-[64px]" : "text-4xl";

  return (
    <div className="relative inline-flex">
      <div className="absolute inset-0 scale-125 animate-pulse rounded-full bg-white/20" />
      <div className={`${box} relative z-10 flex items-center justify-center rounded-full bg-white text-primary-container shadow-xl`}>
        <span className={`material-symbols-outlined ${icon}`} style={{ fontVariationSettings: '"FILL" 1' }}>
          account_balance_wallet
        </span>
      </div>
    </div>
  );
}
