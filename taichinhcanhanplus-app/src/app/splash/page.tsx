import Link from "next/link";
import { MoneyLogo } from "@/components/money-logo";

export default function SplashPage() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-primary-container px-5 text-center text-on-primary">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary-fixed/15 blur-3xl" />
        <div className="absolute -bottom-8 -left-20 h-80 w-80 rounded-full bg-secondary-container/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/4 h-40 w-40 -translate-x-1/2 rounded-full bg-white/10 blur-2xl" />
      </div>

      <section className="relative z-10 flex flex-col items-center">
        <MoneyLogo />
        <h1 className="font-display mt-8 text-4xl font-bold tracking-tight">Ví Thông Minh</h1>
        <p className="mt-3 max-w-xs text-lg leading-7 text-on-primary-container">
          Quản lý tài chính cá nhân dễ dàng và hiệu quả.
        </p>
        <Link
          id="splash-start-link"
          href="/login"
          className="mt-10 rounded-full bg-white px-8 py-4 font-semibold text-primary-container shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl"
        >
          Bắt đầu ngay
        </Link>
      </section>

      <div className="absolute bottom-12 left-0 right-0 flex justify-center">
        <div className="h-1 w-12 rounded-full bg-white/30" />
      </div>
    </main>
  );
}
