import Link from "next/link";
import { MoneyLogo } from "@/components/money-logo";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-5 py-10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(37,75,179,0.18),transparent_36rem)]" />
      <section className="glass-card w-full max-w-5xl overflow-hidden rounded-[2rem] p-6 md:grid md:grid-cols-[1fr_1.15fr] md:p-8">
        <div className="flex flex-col justify-between rounded-[1.5rem] bg-primary-container p-8 text-white md:min-h-[560px]">
          <div className="flex items-center gap-3">
            <MoneyLogo size="md" />
            <span className="font-display text-2xl font-extrabold">Ví Thông Minh</span>
          </div>
          <div className="py-12">
            <p className="mb-4 inline-flex rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-on-primary-container">
              Personal Finance OS
            </p>
            <h1 className="font-display text-4xl font-extrabold leading-tight md:text-6xl">
              Quản lý tiền bạc rõ ràng, đẹp và thông minh hơn.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-8 text-on-primary-container">
              Theo dõi ví, giao dịch, ngân sách và sức khỏe tài chính trong một trải nghiệm cao cấp dành cho người Việt.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center text-sm">
            <div className="rounded-2xl bg-white/12 p-4">
              <strong className="block text-2xl">15+</strong>
              màn hình
            </div>
            <div className="rounded-2xl bg-white/12 p-4">
              <strong className="block text-2xl">API</strong>
              backend
            </div>
            <div className="rounded-2xl bg-white/12 p-4">
              <strong className="block text-2xl">AI</strong>
              hóa đơn
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center p-4 md:p-10">
          <h2 className="font-display text-3xl font-extrabold text-on-surface">Bắt đầu trải nghiệm</h2>
          <p className="mt-3 text-on-surface-variant">
            Các màn hình Splash, Login, Dashboard và Add Transaction đã được convert thành route thật.
          </p>
          <div className="mt-8 grid gap-4">
            <Link id="home-splash-link" href="/splash" className="rounded-2xl bg-primary-container px-6 py-4 text-center font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-primary">
              Xem Splash Screen
            </Link>
            <Link id="home-login-link" href="/login" className="rounded-2xl bg-white px-6 py-4 text-center font-bold text-primary-container shadow-md transition hover:-translate-y-1 hover:shadow-xl">
              Đăng nhập
            </Link>
            <Link id="home-dashboard-link" href="/dashboard" className="rounded-2xl border border-outline-variant px-6 py-4 text-center font-bold text-on-surface transition hover:-translate-y-1 hover:bg-surface-container-low">
              Vào Dashboard demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
