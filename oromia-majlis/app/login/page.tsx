"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="min-h-[calc(100vh-180px)] bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-6xl grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-gray-100 lg:grid-cols-2">
          <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-red-700 p-8 text-white md:p-12">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-red-400/20 blur-3xl" />

            <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-200">
              Member Access
            </p>
            <h1 className="mb-4 text-3xl font-bold leading-tight md:text-4xl">
              Welcome Back to Oromia Majlis
            </h1>
            <p className="mb-8 text-white/90">
              Sign in to manage your account, access protected resources, and
              stay connected with official updates and community services.
            </p>

            <ul className="space-y-4 text-sm md:text-base">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-red-300">✓</span>
                <span>Secure member authentication and session protection</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-red-300">✓</span>
                <span>Fast access to announcements and official documents</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 text-red-300">✓</span>
                <span>Easy profile and communication preferences management</span>
              </li>
            </ul>
          </div>

          <div className="p-8 md:p-12">
            <div className="mx-auto w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Sign In
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Enter your credentials to continue.
              </p>

              <form className="mt-8 space-y-5" onSubmit={(e) => e.preventDefault()}>
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
                  className="w-full rounded-xl bg-red-600 px-4 py-3 font-semibold text-white shadow-md transition hover:bg-red-700 hover:shadow-lg"
                >
                  Sign In
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-600">
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
