"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const REGISTRATION_PURPOSE_LABELS: Record<string, string> = {
  halal_business_certificate: "Halal Business certificate",
  halal_competency_certificate: "Halal Competency Certificate",
};

export default function LoginPage() {
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registered = searchParams.get("registered") === "1";
  const registrationPurpose = searchParams.get("purpose") || "";
  const registrationPurposeLabel = registrationPurpose
    ? REGISTRATION_PURPOSE_LABELS[registrationPurpose] ?? null
    : null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/hrms/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok || !data?.redirectUrl) {
        throw new Error(data?.error || "Unable to sign in. Please try again.");
      }

      window.location.href = data.redirectUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-180px)] bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-6xl grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-gray-100 lg:grid-cols-2">
          <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-red-700 p-8 text-white md:p-12">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-red-400/20 blur-3xl" />

            <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-200">
              Halal Certification
            </p>
            <h1 className="mb-4 text-3xl font-bold leading-tight md:text-4xl">
              Welcome Back to Oromia Majlis
            </h1>
            <p className="mb-8 text-white/90">
              Sign in to the HRMS portal to continue your Halal Business certificate
              or Halal Competency Certificate application and track your status.
            </p>

            <ul className="space-y-4 text-sm md:text-base">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-red-300">✓</span>
                <span>Secure authentication and role-based HRMS access</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-red-300">✓</span>
                <span>Submit and track Halal certification workflows digitally</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-red-300">✓</span>
                <span>Business certificate and competency certificate services</span>
              </li>
            </ul>
          </div>

          <div className="p-8 md:p-12">
            <div className="mx-auto w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Sign In
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Enter your credentials to access Halal Business certificate and Halal
                Competency Certificate services in the HRMS portal.
              </p>

              {registered && (
                <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 space-y-1">
                  <p>Account created successfully. Please sign in with your new credentials.</p>
                  {registrationPurposeLabel && (
                    <p className="text-green-900/90">
                      You registered for: <strong>{registrationPurposeLabel}</strong>
                    </p>
                  )}
                </div>
              )}

              {error && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 text-gray-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-50"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="inline-flex cursor-pointer items-center gap-2 text-gray-600">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                    Remember me
                  </label>
                  <Link
                    href="/contact"
                    className="font-semibold text-blue-700 hover:text-red-600"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-red-600 px-4 py-3 font-semibold text-white shadow-md transition hover:bg-red-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-600">
                New business owner?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-blue-700 hover:text-red-600"
                >
                  Create account
                </Link>
              </p>

              <p className="mt-3 text-center text-sm text-gray-600">
                Need help accessing your account?{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-blue-700 hover:text-red-600"
                >
                  Contact support
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
