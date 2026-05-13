import Link from "next/link";
import OfficesBreadcrumb from "@/components/offices/OfficesBreadcrumb";
import OfficesGrid from "@/components/offices/OfficesGrid";
import Pagination from "@/components/offices/Pagination";

export const metadata = {
  title: "Offices & Departments - Oromia Majlis",
  description: "Explore our offices and departments",
};

export default function OfficesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-teal-50/30">
      <section className="relative py-14 lg:py-20">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-teal-100/40 to-transparent"
          aria-hidden
        />
        <div className="container relative mx-auto max-w-7xl px-4">
          <OfficesBreadcrumb />

          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
              Oromia Majlis
            </p>
            <h1 className="mb-4 bg-gradient-to-r from-gray-900 via-teal-900 to-gray-900 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              Offices &amp; Departments
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
              Explore our departments and offices dedicated to managing Islamic affairs, including
              Halal Certification services for businesses across the Oromia Region.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-800 underline-offset-4 transition hover:text-teal-600 hover:underline"
            >
              ← Back to home
            </Link>
          </div>

          <OfficesGrid />

          <Pagination currentPage={1} totalPages={1} />
        </div>
      </section>
    </main>
  );
}

