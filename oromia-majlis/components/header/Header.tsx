"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import TopInfoBar from "./TopInfoBar";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      <TopInfoBar />
      <div
        className={`bg-white transition-shadow ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center">
              <div className="relative">
                {/* Subtle grid pattern background */}
                <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                <h1 className="text-2xl md:text-3xl font-bold relative z-10">
                  <span className="text-blue-700">OROMIA</span>
                  <br />
                  <span className="text-yellow-500 text-lg md:text-xl">
                    MAJLIS
                  </span>
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <Navigation />

            {/* Action Buttons - Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/login"
                className="px-4 py-2 text-blue-700 font-semibold hover:text-red-600 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/donate"
                className="px-6 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition-colors shadow-md"
              >
                Donate
              </Link>
            </div>

            {/* Mobile Hamburger Menu */}
            <button
              className="lg:hidden p-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}

