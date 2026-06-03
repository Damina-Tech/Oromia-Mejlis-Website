import Image from "next/image";
import Link from "next/link";

const PROCESS_ANCHOR_ID = "halal-certification-process";

const HALAL_HERO_IMAGE = "/img/halal.jpg";
const HALAL_HERO_IMAGE_ALT = "ORIASC-HCB Halal certification";

function ChartBadgeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M4 19h16M7 16V10M12 16V6M17 16v-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarOutlineIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path
        d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L6 21l2.3-7-6-4.6h7.6L12 2z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkleCluster() {
  return (
    <div className="flex items-end gap-1" aria-hidden>
      {[14, 20, 12].map((size, i) => (
        <span
          key={i}
          className="text-amber-400"
          style={{ fontSize: `${size}px`, lineHeight: 1 }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}

export default function HalalDepartmentHero() {
  return (
    <section className="overflow-hidden rounded-3xl bg-[#f0faf9] px-6 py-10 md:px-10 md:py-14 lg:px-12 lg:py-16">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-teal-950 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Trusted{" "}
            <span className="relative inline-block">
              Halal
              <span
                className="absolute -bottom-0.5 left-0 right-0 h-[3px] rounded-full bg-teal-500 sm:h-1"
                aria-hidden
              />
            </span>{" "}
            Certification
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-gray-600 sm:text-base">
            Halal Certification will be given for applicants when an initial audit/evaluation has
            been completed and systems deemed to be satisfactory to the standard requirements by the
            approved Decision Committee, the relevant Scheme or Asst. Scheme Manager shall inform the
            applicant accordingly and issue a certificate of Halal product certification.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full bg-teal-600 px-8 py-3.5 text-sm font-bold text-white shadow-md shadow-teal-600/25 transition hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-600/30"
            >
              Get Certification
            </Link>
            <a
              href={`#${PROCESS_ANCHOR_ID}`}
              className="text-sm font-semibold text-teal-700 underline decoration-teal-600 decoration-2 underline-offset-4 transition hover:text-teal-900"
            >
              Read how it works
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-teal-200/60 pt-8 sm:gap-6">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <StarOutlineIcon className="h-5 w-5 shrink-0 text-emerald-600" />
              <span>Oromia Region Islamic Affairs Supreme Council</span>
            </div>
            <div className="hidden h-8 w-px bg-gray-300 sm:block" aria-hidden />
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <StarOutlineIcon className="h-5 w-5 shrink-0 text-amber-500" />
              <span dir="rtl" lang="ar" className="text-base text-gray-800">
                المجلس الأعلى للشؤون الإسلامية في أوروميا
              </span>
            </div>
          </div>
        </div>

        <div className="relative w-full lg:justify-self-end">
          <div className="relative flex min-h-[300px] items-center justify-center rounded-[2.5rem] bg-white px-6 py-10 shadow-[0_20px_50px_-12px_rgba(15,118,110,0.15)] sm:min-h-[360px] sm:px-8 sm:py-12 md:min-h-[400px] md:py-14">
            <div
              className="absolute -left-3 -top-3 z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 shadow-lg shadow-amber-400/40 sm:-left-4 sm:-top-4 sm:h-16 sm:w-16"
              aria-hidden
            >
              <ChartBadgeIcon />
            </div>

            <div className="relative z-[1] mx-auto w-full max-w-[min(100%,420px)] px-2">
              <div className="relative aspect-square w-full">
                <Image
                  src={HALAL_HERO_IMAGE}
                  alt={HALAL_HERO_IMAGE_ALT}
                  fill
                  priority
                  sizes="(max-width: 1024px) 85vw, 420px"
                  className="object-contain drop-shadow-[0_12px_32px_rgba(15,118,110,0.2)]"
                />
              </div>
            </div>

            <div
              className="absolute -bottom-2 -right-2 z-10 sm:-bottom-3 sm:-right-3"
              aria-hidden
            >
              <SparkleCluster />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { PROCESS_ANCHOR_ID };
