import Image from "next/image";
import Link from "next/link";
import OfficesBreadcrumb from "@/components/offices/OfficesBreadcrumb";
import OfficesGrid from "@/components/offices/OfficesGrid";
import Pagination from "@/components/offices/Pagination";

const OFFICES_PAGE_COVER = "/img/IMG_1.jpg";
const OFFICES_PAGE_COVER_ALT =
  "Oromia Regional Islamic Affairs Supreme Council headquarters";

export const metadata = {
  title: "Offices & Departments - Oromia Majlis",
  description: "Explore our offices and departments",
};

export default function OfficesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-teal-50/30">
      {/* Cover hero */}
      <section className="relative h-[min(52vw,22rem)] min-h-[240px] max-h-[420px] w-full overflow-hidden md:h-[min(42vw,26rem)] lg:max-h-[480px]">
        <Image
          src={OFFICES_PAGE_COVER}
          alt={OFFICES_PAGE_COVER_ALT}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-teal-900/75 to-teal-800/55"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-teal-950/50 via-transparent to-transparent"
          aria-hidden
        />

        <div className="container relative mx-auto flex h-full flex-col justify-end px-4 pb-8 pt-16 md:pb-10 md:pt-20">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-teal-200">
            Oromia Majlis
          </p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            Offices &amp; Departments
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base lg:text-lg">
            Explore our departments dedicated to managing Islamic affairs across
            the Oromia Region — including Halal certification and community
            services.
          </p>
          <Link
            href="/"
            className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            ← Back to home
          </Link>
        </div>
      </section>

      <section className="relative py-12 lg:py-16">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-teal-100/30 to-transparent"
          aria-hidden
        />
        <div className="container relative mx-auto max-w-7xl px-4">
          <OfficesBreadcrumb />

          <p className="mx-auto mb-10 max-w-2xl text-center text-base leading-relaxed text-gray-600 md:text-lg">
            Select a department below to learn about its mandate, leadership,
            and services.
          </p>

          <OfficesGrid />

          <Pagination currentPage={1} totalPages={1} />
        </div>
      </section>
    </main>
  );
}
