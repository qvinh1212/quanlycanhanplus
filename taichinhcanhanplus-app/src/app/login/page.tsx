"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { MoneyLogo } from "@/components/money-logo";
import { useAuth } from "@/contexts/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { isConfigured, isLoading, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("vinh@example.com");
  const [displayName, setDisplayName] = useState("Vinh Nguyễn");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!isConfigured) {
      router.push("/dashboard");
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === "register") {
        await signUp(email, password, displayName);
      } else {
        await signIn(email, password);
      }
      router.push("/dashboard");
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Không thể xác thực tài khoản.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-dvh items-center justify-center px-5 py-10">
      <section className="glass-card w-full max-w-md overflow-hidden rounded-3xl">
        <div className="px-8 pb-6 pt-8 text-center">
          <MoneyLogo size="md" />
          <h1 className="font-display mt-6 text-2xl font-semibold text-on-surface">
            {mode === "login" ? "Chào mừng trở lại" : "Tạo tài khoản mới"}
          </h1>
          <p className="mt-2 text-on-surface-variant">
            {isConfigured
              ? "Đăng nhập bằng Firebase để đồng bộ dữ liệu an toàn"
              : "Chưa cấu hình Firebase — bạn vẫn có thể vào demo mock data"}
          </p>
        </div>

        <div className="space-y-6 px-8 pb-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {mode === "register" ? (
              <label className="relative block" htmlFor="display-name">
                <span className="sr-only">Tên hiển thị</span>
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                  badge
                </span>
                <input
                  id="display-name"
                  name="displayName"
                  type="text"
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  placeholder="Tên hiển thị"
                  className="w-full rounded-2xl border-0 bg-surface-container-low py-4 pl-12 pr-4 text-on-surface outline-none ring-0 transition focus:bg-white focus:ring-2 focus:ring-primary-container"
                />
              </label>
            ) : null}

            <label className="relative block" htmlFor="email">
              <span className="sr-only">Email</span>
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                person
              </span>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
                required={isConfigured}
                className="w-full rounded-2xl border-0 bg-surface-container-low py-4 pl-12 pr-4 text-on-surface outline-none ring-0 transition focus:bg-white focus:ring-2 focus:ring-primary-container"
              />
            </label>

            <label className="relative block" htmlFor="password">
              <span className="sr-only">Mật khẩu</span>
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
                lock
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Mật khẩu"
                required={isConfigured}
                minLength={isConfigured ? 6 : undefined}
                className="w-full rounded-2xl border-0 bg-surface-container-low py-4 pl-12 pr-12 text-on-surface outline-none ring-0 transition focus:bg-white focus:ring-2 focus:ring-primary-container"
              />
              <button
                id="toggle-password-button"
                type="button"
                aria-label="Ẩn hiện mật khẩu"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-outline transition hover:text-on-surface"
              >
                <span className="material-symbols-outlined">
                  {showPassword ? "visibility" : "visibility_off"}
                </span>
              </button>
            </label>

            {error ? (
              <p className="rounded-2xl bg-error-container px-4 py-3 text-sm font-semibold text-on-error-container">
                {error}
              </p>
            ) : null}

            {!isConfigured ? (
              <p className="rounded-2xl bg-primary-fixed px-4 py-3 text-sm text-primary-container">
                Thêm biến <strong>NEXT_PUBLIC_FIREBASE_*</strong> trong <strong>.env.local</strong> để bật đăng nhập thật.
              </p>
            ) : null}

            <div className="flex items-center justify-between pt-1 text-sm">
              <label className="flex items-center gap-2 text-on-surface-variant" htmlFor="remember-me">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 accent-primary-container" />
                Ghi nhớ
              </label>
              <a className="font-semibold text-primary-container hover:text-primary" href="#forgot">
                Quên mật khẩu?
              </a>
            </div>

            <button
              id="login-submit-button"
              type="submit"
              disabled={isSubmitting || isLoading}
              className="flex min-h-14 w-full items-center justify-center rounded-2xl bg-primary-container px-4 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-primary disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting || isLoading
                ? "Đang xử lý..."
                : isConfigured
                  ? mode === "login"
                    ? "Đăng nhập"
                    : "Đăng ký"
                  : "Vào bản demo"}
            </button>
          </form>

          <div className="grid grid-cols-2 gap-4">
            <button className="rounded-2xl border border-outline-variant bg-white/80 px-4 py-3 font-semibold transition hover:bg-surface-container-low">
              Google
            </button>
            <Link
              href="/dashboard"
              className="rounded-2xl border border-outline-variant bg-white/80 px-4 py-3 text-center font-semibold text-primary-container transition hover:bg-surface-container-low"
            >
              Demo
            </Link>
          </div>

          <p className="text-center text-on-surface-variant">
            {mode === "login" ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
            <button
              type="button"
              className="ml-1 font-semibold text-primary-container hover:text-primary"
              onClick={() => setMode((current) => (current === "login" ? "register" : "login"))}
            >
              {mode === "login" ? "Đăng ký ngay" : "Đăng nhập"}
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}
