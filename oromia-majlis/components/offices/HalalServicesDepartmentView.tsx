import Link from "next/link";
import AnimatedDepartmentMetrics from "@/components/offices/AnimatedDepartmentMetrics";
import {
  getHalalDepartmentPolicyNav,
  HALAL_POLICIES_BASE_PATH,
} from "@/lib/halalPolicies";

export type HalalDepartmentContact = {
  phone: string;
  email: string;
  address: string;
  hours: string;
};

export type HalalDepartmentHead = {
  name: string;
  title: string;
  image: string;
};

type Props = {
  departmentName: string;
  head: HalalDepartmentHead;
  contact: HalalDepartmentContact;
  services: string[];
  messageTitle: string;
  messageContent: string;
};

const PROCESS_ANCHOR_ID = "halal-certification-process";

export default function HalalServicesDepartmentView({
  departmentName,
  head,
  contact,
  services,
  messageTitle,
  messageContent,
}: Props) {
  const policyQuickLinks = getHalalDepartmentPolicyNav();

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-teal-900 to-emerald-950 text-white shadow-2xl ring-1 ring-white/10">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-teal-400/40 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-emerald-500/30 blur-3xl" />
        </div>
        <div className="relative z-10 px-6 py-12 md:px-12 md:py-16 lg:px-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-100">
            Trusted Halal Certification
          </div>
          <h1 className="mb-4 max-w-4xl text-3xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {departmentName}
          </h1>
          <p className="mb-2 max-w-3xl text-lg font-semibold text-teal-100 md:text-xl">
            About — Trusted Halal Certification
          </p>
          <p className="mb-8 max-w-3xl text-sm leading-relaxed text-white/85 md:text-base">
            Halal certification is issued to applicants when an initial audit and evaluation are
            completed and systems are deemed satisfactory to standard requirements by the approved
            Decision Committee. The relevant Scheme or Assistant Scheme Manager shall inform the
            applicant accordingly and issue a certificate of Halal product certification.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/offices"
              className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              All departments
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-teal-800 shadow-lg transition hover:bg-teal-50"
            >
              Get Certification
            </Link>
            <a
              href={`#${PROCESS_ANCHOR_ID}`}
              className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Read how it works
            </a>
          </div>
        </div>
      </section>

      {/* EIAC / Arabic banner */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
              Oromia Region Islamic Affairs Supreme Council
            </p>
            <p className="mt-1 text-lg font-bold text-gray-900 md:text-xl" dir="rtl" lang="ar">
              المجلس الأعلى للشؤون الإسلامية في أوروميا
            </p>
          </div>
          <div
            className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-800 p-2 text-center shadow-lg ring-2 ring-teal-200/60 md:h-28 md:w-28"
            aria-label="ORIASC Halal Certification Body logo"
          >
            <span className="text-[10px] font-bold uppercase leading-tight tracking-wide text-white/90">
              ORIASC
            </span>
            <span className="text-lg font-black leading-none text-white">HCB</span>
            <span className="mt-0.5 text-[8px] font-semibold uppercase tracking-wider text-emerald-100">
              Halal
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          {/* Who we are */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md md:p-10">
            <p className="text-xs font-bold uppercase tracking-widest text-teal-700">
              Who we are
            </p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">ORIASC-HCB</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              <strong>Oromiya Region Islamic Affairs Supreme Council — Department of Halal
              Certification Body (ORIASC-HCB)</strong> is the EIAC and SFDA Halal Center accredited
              national halal certification body in Ethiopia. We develop Halal product standards and
              conduct Halal product inspection in accordance with Islamic Law (Sharia) and in
              parallel with internationally accepted and GSO standards for the UAE, Saudi Arabia, and
              other Gulf countries.
            </p>
          </section>

          {/* Objective / Mission / Expertise cards */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-teal-100 bg-gradient-to-b from-teal-50 to-white p-6 shadow-sm ring-1 ring-teal-100/80">
              <h3 className="text-lg font-bold text-gray-900">Our objective</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                To examine, certify, and regulate all food products and consumer products in an
                efficient and effective manner based on GSO standards, guaranteeing compliance with
                Halal requirements of the UAE, Saudi Arabia, and other Gulf countries as required by
                Shariah (Islamic Law).
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50 to-white p-6 shadow-sm ring-1 ring-emerald-100/80">
              <h3 className="text-lg font-bold text-gray-900">Our mission</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                To develop Halal standards aligned with Islamic Law and international food standards,
                provide training for skilled manpower, and enhance knowledge on Halal certification to
                boost production, exports, and global acceptance.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md md:col-span-1">
              <h3 className="text-lg font-bold text-gray-900">Our expertise</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                National certification aligned with Sharia and GSO requirements, with a focus on
                market access for Gulf countries and continuous improvement of Halal assurance
                systems.
              </p>
            </div>
          </div>

          {/* Our services */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md md:p-10">
            <h2 className="text-2xl font-bold text-gray-900">Our services</h2>
            <p className="mt-3 max-w-3xl text-gray-700 leading-relaxed">
              We certify Halal products in Ethiopia per Islamic Law and GSO standards, ensuring
              compliance for UAE, Saudi Arabia, and Gulf markets. We also train experts and promote
              Halal awareness.
            </p>
            <ul className="mt-6 space-y-3">
              {services.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-800">
                    ✓
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* What is Halal */}
          <section className="rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white p-6 shadow-md md:p-10">
            <p className="text-xs font-bold uppercase tracking-widest text-teal-700">
              Understanding Halal
            </p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">What is Halal?</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              In general terms, <strong>Halal</strong> means permitted, allowed, authorized,
              approved, sanctioned, lawful, legal, legitimate, or licit. Food for Muslims, food
              certified Halal, or similar terms may be understood as follows:
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Haram-free per Islamic law",
                  body: "Free of, and not made of, or containing any part or substance taken or extracted from animals that are forbidden (haram) to be consumed by Muslims, according to Islamic law (Shariah).",
                },
                {
                  title: "Free from filth per Islamic law",
                  body: "Not containing any substances that are declared as filth according to Islamic law.",
                },
                {
                  title: "No cross-contact with haram substances",
                  body: "During preparation, processing, or storage, it should not come into contact or be in close proximity with any food that does not fulfill the requirements above, or any substance declared as filth according to Islamic law.",
                },
                {
                  title: "Avoids filthy equipment per Islamic law",
                  body: "Not prepared, processed, produced, or manufactured using utensils, equipment, and/or machinery that are not free from filthy substances as directed by Islamic law.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-teal-200 hover:shadow-md"
                >
                  <h3 className="font-bold text-gray-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{card.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Process anchor */}
          <section
            id={PROCESS_ANCHOR_ID}
            className="rounded-2xl border border-dashed border-teal-300 bg-teal-50/60 p-6 md:p-8"
          >
            <h2 className="text-xl font-bold text-gray-900">How certification works</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm text-gray-700 md:text-base">
              <li>Submit your application and supporting documentation through the HRMS portal.</li>
              <li>Initial audit and evaluation of your systems against applicable standards.</li>
              <li>Review by the approved Decision Committee when requirements are met.</li>
              <li>Notification and issuance of the Halal product certificate by the Scheme or Assistant Scheme Manager.</li>
            </ol>
          </section>

          {/* Policies & documents — links to dedicated policy pages */}
          <section
            id="halal-policies-documents"
            className="scroll-mt-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-md md:p-10"
            aria-labelledby="halal-policies-heading"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-teal-700">
              Policies & documents
            </p>
            <h2 id="halal-policies-heading" className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">
              Halal certification reference
            </h2>
            <p className="mt-3 max-w-3xl text-sm text-gray-600 md:text-base">
              Open any topic below for a full policy page with structured sections and links to
              related policies.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              <li className="sm:col-span-2">
                <Link
                  href="/offices"
                  className="flex items-center justify-between rounded-xl border border-teal-200 bg-teal-50/60 px-4 py-3.5 text-sm font-semibold text-teal-900 transition hover:border-teal-400 hover:bg-teal-100/60"
                >
                  All departments
                  <span className="text-teal-600" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
              {policyQuickLinks.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`${HALAL_POLICIES_BASE_PATH}/${item.slug}`}
                    className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-3.5 text-sm font-semibold text-gray-900 transition hover:border-teal-300 hover:bg-teal-50/60 hover:text-teal-900"
                  >
                    {item.label}
                    <span className="text-teal-600" aria-hidden>
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Message */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md md:p-10">
            <h2 className="text-2xl font-bold text-gray-900">{messageTitle}</h2>
            <div className="mt-4 border-l-4 border-teal-600 pl-6">
              <p className="italic leading-relaxed text-gray-700">{messageContent}</p>
              <p className="mt-4 font-semibold text-gray-600">— {head.name}</p>
            </div>
          </section>

          {/* Department head (compact) */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md md:p-8">
            <h2 className="text-xl font-bold text-gray-900">Department leadership</h2>
            <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-100 to-emerald-200 text-5xl shadow-inner">
                {head.image}
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-bold text-gray-900">{head.name}</h3>
                <p className="text-teal-800 font-medium">{head.title}</p>
                <p className="mt-2 text-sm text-gray-600">
                  Leading ORIASC-HCB with a commitment to credible certification and service
                  excellence.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <nav
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto"
            aria-label="Quick access to policies and documents"
          >
            <h2 className="border-b border-gray-100 pb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
              Quick access
            </h2>
            <ul className="mt-3 space-y-0.5 text-sm">
              <li>
                <Link
                  href="/offices"
                  className="block rounded-lg border-l-2 border-teal-500 bg-teal-50/50 py-2.5 pl-3 pr-2 font-semibold text-teal-900 transition hover:bg-teal-50"
                >
                  All departments
                </Link>
              </li>
              {policyQuickLinks.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`${HALAL_POLICIES_BASE_PATH}/${item.slug}`}
                    className="block rounded-lg border-l-2 border-transparent py-2.5 pl-3 pr-2 font-medium text-gray-700 transition hover:border-teal-600 hover:bg-teal-50/80 hover:text-teal-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-gray-100 pt-4 text-xs text-gray-500">
              <a href="#halal-policies-documents" className="font-medium text-teal-800 hover:text-teal-600">
                ↑ Overview on this page
              </a>
            </div>
          </nav>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
            <h2 className="text-lg font-bold text-gray-900">Contact</h2>
            <div className="mt-4 space-y-4 text-sm">
              <div>
                <p className="font-semibold text-gray-900">Phone</p>
                <p className="text-gray-600">{contact.phone}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Email</p>
                <p className="text-gray-600">{contact.email}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Address</p>
                <p className="text-gray-600">{contact.address}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Office hours</p>
                <p className="text-gray-600">{contact.hours}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-teal-700 to-blue-950 p-6 text-white shadow-xl ring-1 ring-white/10">
            <h3 className="text-lg font-bold">Apply for Halal certification</h3>
            <p className="mt-2 text-sm text-white/90">
              Start your application online and track progress through the HRMS portal.
            </p>
            <Link
              href="/register"
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-3 text-center text-sm font-bold text-teal-800 transition hover:bg-teal-50"
            >
              Start registration
            </Link>
            <Link
              href="/login"
              className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-white/40 bg-white/10 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-white/20"
            >
              Sign in
            </Link>
          </div>
        </aside>
      </div>

      {/* Impact stats — full width */}
      <section className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-teal-50/40 to-emerald-50/30 p-6 shadow-lg md:p-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Our impact in numbers</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-600 md:text-base">
            Empowering businesses with Halal certification excellence
          </p>
        </div>
        <AnimatedDepartmentMetrics />
        <p className="mt-10 text-center text-sm font-medium text-gray-600 md:text-base">
          Trusted by leading businesses across Ethiopia for Halal certification.
        </p>
      </section>
    </div>
  );
}
