import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedDepartmentMetrics from "@/components/offices/AnimatedDepartmentMetrics";
import HalalDepartmentHero, { PROCESS_ANCHOR_ID } from "@/components/offices/HalalDepartmentHero";
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

const ACCREDITATION_BADGES = ["EIAC accredited", "SFDA Halal Center", "GSO standards"] as const;

const PILLAR_CARDS = [
  {
    title: "Our objective",
    icon: "🎯",
    gradient: "from-teal-500/10 via-teal-50/80 to-white",
    ring: "ring-teal-200/60",
    body: "To examine, certify, and regulate all food products and consumer products in an efficient and effective manner based on GSO standards, guaranteeing compliance with Halal requirements of the UAE, Saudi Arabia, and other Gulf countries as required by Shariah (Islamic Law).",
  },
  {
    title: "Our mission",
    icon: "🌿",
    gradient: "from-emerald-500/10 via-emerald-50/80 to-white",
    ring: "ring-emerald-200/60",
    body: "To develop Halal standards aligned with Islamic Law and international food standards, provide training for skilled manpower, and enhance knowledge on Halal certification to boost production, exports, and global acceptance.",
  },
  {
    title: "Our expertise",
    icon: "✦",
    gradient: "from-cyan-500/10 via-cyan-50/80 to-white",
    ring: "ring-cyan-200/60",
    body: "National certification aligned with Sharia and GSO requirements, with a focus on market access for Gulf countries and continuous improvement of Halal assurance systems.",
  },
] as const;

const HALAL_CRITERIA = [
  {
    num: "01",
    title: "Haram-free per Islamic law",
    body: "Free of, and not made of, or containing any part or substance taken or extracted from animals that are forbidden (haram) to be consumed by Muslims, according to Islamic law (Shariah).",
  },
  {
    num: "02",
    title: "Free from filth per Islamic law",
    body: "Not containing any substances that are declared as filth according to Islamic law.",
  },
  {
    num: "03",
    title: "No cross-contact with haram substances",
    body: "During preparation, processing, or storage, it should not come into contact or be in close proximity with any food that does not fulfill the requirements above, or any substance declared as filth according to Islamic law.",
  },
  {
    num: "04",
    title: "Avoids filthy equipment per Islamic law",
    body: "Not prepared, processed, produced, or manufactured using utensils, equipment, and/or machinery that are not free from filthy substances as directed by Islamic law.",
  },
] as const;

const PROCESS_STEPS = [
  {
    step: 1,
    title: "Apply online",
    body: "Submit your application and supporting documentation through the our portal.",
  },
  {
    step: 2,
    title: "Audit & evaluation",
    body: "Initial audit and evaluation of your systems against applicable standards.",
  },
  {
    step: 3,
    title: "Decision Committee",
    body: "Review by the approved Decision Committee when requirements are met.",
  },
  {
    step: 4,
    title: "Certificate issued",
    body: "Notification and issuance of the Halal product certificate by the Scheme or Assistant Scheme Manager.",
  },
] as const;

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-teal-200/80 bg-teal-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-teal-800">
      {children}
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function isHeadImageUrl(image: string) {
  return image.startsWith("/") || image.startsWith("http://") || image.startsWith("https://");
}

function LeadershipPortrait({ image, name }: { image: string; name: string }) {
  const frameClass =
    "relative h-48 w-48 shrink-0 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-teal-100 to-emerald-200 shadow-xl ring-4 ring-white sm:h-56 sm:w-56 md:h-64 md:w-64 md:rounded-[2rem]";

  if (isHeadImageUrl(image)) {
    return (
      <div className={frameClass}>
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 192px, 256px"
          className="object-cover object-top"
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-teal-900/10"
          aria-hidden
        />
      </div>
    );
  }

  return (
    <div
      className={`${frameClass} flex items-center justify-center text-8xl sm:text-9xl md:text-[6.5rem]`}
      aria-hidden
    >
      {image}
    </div>
  );
}

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
    <div className="space-y-12 md:space-y-14">
      <HalalDepartmentHero />

      {/* Identity strip */}
      <div className="relative overflow-hidden rounded-3xl border border-teal-100/80 bg-gradient-to-r from-white via-teal-50/30 to-emerald-50/40 p-6 shadow-lg shadow-teal-900/5 ring-1 ring-white md:flex md:items-center md:justify-between md:gap-8 md:px-10 md:py-8">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal-400/10 blur-3xl"
          aria-hidden
        />
        <div className="relative text-center md:text-left">
          <SectionLabel>ORIASC-HCB</SectionLabel>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-teal-700">
            Department of Halal Certification
          </p>
          <p className="mt-1 text-xl font-bold text-gray-900 md:text-2xl">{departmentName}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
            {ACCREDITATION_BADGES.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-teal-200/70 bg-white/80 px-3 py-1 text-xs font-semibold text-teal-900 shadow-sm"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
        <div
          className="relative mx-auto mt-6 flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-900 p-2 text-center shadow-xl ring-4 ring-white/80 md:mx-0 md:mt-0 md:h-28 md:w-28"
          aria-label="ORIASC Halal Certification Body logo"
        >
          <span className="text-[10px] font-bold uppercase tracking-wide text-white/90">ORIASC</span>
          <span className="text-xl font-black leading-none text-white md:text-2xl">HCB</span>
          <span className="mt-0.5 text-[8px] font-semibold uppercase tracking-wider text-emerald-100">
            Halal
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="space-y-10 lg:col-span-8 xl:col-span-8">
          {/* Who we are */}
          <section className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-lg shadow-teal-900/5 ring-1 ring-gray-100/90 md:p-10">
            <div
              className="pointer-events-none absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-teal-500 to-emerald-600"
              aria-hidden
            />
            <div className="pl-4 md:pl-6">
              <SectionLabel>Who we are</SectionLabel>
              <h2 className="mt-4 text-2xl font-bold text-gray-900 md:text-3xl">
                ORIASC-HCB
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                <strong className="font-semibold text-gray-900">
                  Oromiya Region Islamic Affairs Supreme Council — Department of Halal
                  Certification Body (ORIASC-HCB)
                </strong>{" "}
                is the EIAC and SFDA Halal Center accredited national halal certification body in
                Ethiopia. We develop Halal product standards and conduct Halal product inspection in
                accordance with Islamic Law (Sharia) and in parallel with internationally accepted
                and GSO standards for the UAE, Saudi Arabia, and other Gulf countries.
              </p>
            </div>
          </section>

          {/* Pillars */}
          <div className="grid gap-5 md:grid-cols-3">
            {PILLAR_CARDS.map((card) => (
              <article
                key={card.title}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-b ${card.gradient} p-6 shadow-md ring-1 ${card.ring} transition duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <span className="text-2xl" aria-hidden>
                  {card.icon}
                </span>
                <h3 className="mt-3 text-lg font-bold text-gray-900">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{card.body}</p>
              </article>
            ))}
          </div>

          {/* Services */}
          <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg shadow-teal-900/5 ring-1 ring-gray-100/90 md:p-10">
            <SectionLabel>What we offer</SectionLabel>
            <h2 className="mt-4 text-2xl font-bold text-gray-900 md:text-3xl">Our services</h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              We certify Halal products in Ethiopia per Islamic Law and GSO standards, ensuring
              compliance for UAE, Saudi Arabia, and Gulf markets. We also train experts and promote
              Halal awareness.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {services.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50/80 to-white p-4 transition hover:border-teal-200 hover:shadow-md"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-sm font-bold text-white shadow-sm">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* What is Halal */}
          <section className="overflow-hidden rounded-3xl border border-teal-100/60 bg-gradient-to-br from-[#f0faf9] via-white to-emerald-50/40 p-6 shadow-lg md:p-10">
            <SectionLabel>Understanding Halal</SectionLabel>
            <h2 className="mt-4 text-2xl font-bold text-gray-900 md:text-3xl">What is Halal?</h2>
            <p className="mt-3 max-w-3xl text-gray-600 leading-relaxed">
              In general terms, <strong className="text-gray-900">Halal</strong> means permitted,
              allowed, authorized, approved, sanctioned, lawful, legal, legitimate, or licit. Food for
              Muslims, food certified Halal, or similar terms may be understood as follows:
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {HALAL_CRITERIA.map((card) => (
                <div
                  key={card.num}
                  className="group rounded-2xl border border-white/80 bg-white/90 p-5 shadow-sm ring-1 ring-gray-100/80 transition hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-lg"
                >
                  <span className="text-xs font-bold tabular-nums text-teal-600">{card.num}</span>
                  <h3 className="mt-2 font-bold text-gray-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{card.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Process */}
          <section
            id={PROCESS_ANCHOR_ID}
            className="scroll-mt-28 overflow-hidden rounded-3xl border border-dashed border-teal-300/80 bg-gradient-to-br from-teal-50/80 to-white p-6 md:p-10"
          >
            <SectionLabel>Certification journey</SectionLabel>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">How certification works</h2>
            <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS_STEPS.map((item) => (
                <li
                  key={item.step}
                  className="relative rounded-2xl border border-teal-100/80 bg-white p-5 shadow-sm transition hover:border-teal-300 hover:shadow-md"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white shadow-md shadow-teal-600/30">
                    {item.step}
                  </span>
                  <h3 className="mt-4 font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-teal-700"
              >
                Start application
                <ArrowIcon />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border border-teal-300 bg-white px-6 py-3 text-sm font-semibold text-teal-800 transition hover:bg-teal-50"
              >
                Sign in to our portal
              </Link>
            </div>
          </section>

          {/* Policies */}
          <section
            id="halal-policies-documents"
            className="scroll-mt-28 rounded-3xl border border-gray-100 bg-white p-6 shadow-lg shadow-teal-900/5 ring-1 ring-gray-100/90 md:p-10"
            aria-labelledby="halal-policies-heading"
          >
            <SectionLabel>Policies & documents</SectionLabel>
            <h2
              id="halal-policies-heading"
              className="mt-4 text-2xl font-bold text-gray-900 md:text-3xl"
            >
              Halal certification reference
            </h2>
            <p className="mt-3 text-sm text-gray-600 md:text-base">
              Open any topic below for a full policy page with structured sections and links to
              related policies.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              <li className="sm:col-span-2">
                <Link
                  href="/offices"
                  className="group flex items-center justify-between gap-3 rounded-2xl border-2 border-teal-200 bg-gradient-to-r from-teal-50 to-emerald-50/50 px-5 py-4 transition hover:border-teal-400 hover:shadow-md"
                >
                  <span className="font-semibold text-teal-950">All departments</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-white transition group-hover:scale-105">
                    <ArrowIcon />
                  </span>
                </Link>
              </li>
              {policyQuickLinks.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`${HALAL_POLICIES_BASE_PATH}/${item.slug}`}
                    className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-gray-50/50 px-4 py-4 transition hover:border-teal-300 hover:bg-teal-50/50 hover:shadow-md"
                  >
                    <span className="text-sm font-semibold text-gray-900 group-hover:text-teal-900">
                      {item.label}
                    </span>
                    <span className="text-teal-600 opacity-70 transition group-hover:translate-x-0.5 group-hover:opacity-100">
                      <ArrowIcon />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Message */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-950 p-6 text-white shadow-xl md:p-10">
            <div
              className="pointer-events-none absolute -right-8 -top-8 text-[8rem] font-serif leading-none text-white/5"
              aria-hidden
            >
              &ldquo;
            </div>
            <SectionLabel>
              <span className="border-teal-500/50 bg-white/10 text-teal-50">Leadership</span>
            </SectionLabel>
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">{messageTitle}</h2>
            <blockquote className="relative mt-6 border-l-4 border-teal-400/80 pl-6">
              <p className="text-base leading-relaxed text-white/90 italic md:text-lg">
                {messageContent}
              </p>
              <footer className="mt-6 font-semibold text-teal-100">— {head.name}</footer>
            </blockquote>
          </section>

          {/* Leadership */}
          <section className="relative overflow-hidden rounded-3xl border border-teal-100/80 bg-gradient-to-br from-white via-teal-50/30 to-emerald-50/50 p-6 shadow-lg shadow-teal-900/5 ring-1 ring-gray-100/90 md:p-10">
            <div
              className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-teal-400/10 blur-3xl"
              aria-hidden
            />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
              <div className="flex shrink-0 justify-center lg:justify-start">
                <div className="relative">
                  <div
                    className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-teal-400/30 to-emerald-500/20 blur-md"
                    aria-hidden
                  />
                  <LeadershipPortrait image={head.image} name={head.name} />
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-teal-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-teal-800 shadow-md">
                    ORIASC-HCB
                  </span>
                </div>
              </div>
              <div className="flex-1 text-center lg:text-left">
                <SectionLabel>Department leadership</SectionLabel>
                <h2 className="mt-4 text-2xl font-bold text-gray-900 md:text-3xl">{head.name}</h2>
                <p className="mt-2 text-lg font-semibold text-teal-800">{head.title}</p>
                <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600 lg:mx-0">
                  Leading ORIASC-HCB with a commitment to credible certification and service
                  excellence across the Oromia Region.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
                  <span className="rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm ring-1 ring-gray-200/80">
                    Halal certification
                  </span>
                  <span className="rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm ring-1 ring-gray-200/80">
                    Scheme oversight
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:col-span-4 xl:col-span-4">
          <nav
            className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg ring-1 ring-gray-100/90"
            aria-label="Quick access to policies and documents"
          >
            <div className="border-b border-teal-100 bg-gradient-to-r from-teal-50 to-emerald-50/50 px-5 py-4">
              <h2 className="text-sm font-bold uppercase tracking-wide text-teal-900">
                Quick access
              </h2>
              <p className="mt-1 text-xs text-teal-800/80">Policies, schemes & resources</p>
            </div>
            <ul className="space-y-0.5 p-3 text-sm">
              <li>
                <Link
                  href="/offices"
                  className="flex items-center gap-2 rounded-xl border-l-[3px] border-teal-600 bg-teal-50 px-3 py-2.5 font-semibold text-teal-900 transition hover:bg-teal-100/80"
                >
                  All departments
                </Link>
              </li>
              {policyQuickLinks.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`${HALAL_POLICIES_BASE_PATH}/${item.slug}`}
                    className="flex items-center justify-between gap-2 rounded-xl border-l-[3px] border-transparent px-3 py-2.5 font-medium text-gray-700 transition hover:border-teal-500 hover:bg-teal-50/70 hover:text-teal-900"
                  >
                    <span className="line-clamp-2">{item.label}</span>
                    <ArrowIcon />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-100 px-5 py-3">
              <a
                href="#halal-policies-documents"
                className="text-xs font-semibold text-teal-700 transition hover:text-teal-900"
              >
                ↓ Full list on this page
              </a>
            </div>
          </nav>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg ring-1 ring-gray-100/90">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-100 text-sm">
                ✉
              </span>
              Contact
            </h2>
            <dl className="mt-5 space-y-4 text-sm">
              {(
                [
                  ["Phone", contact.phone, "📞"],
                  ["Email", contact.email, "✉️"],
                  ["Address", contact.address, "📍"],
                  ["Office hours", contact.hours, "🕐"],
                ] as const
              ).map(([label, value, icon]) => (
                <div
                  key={label}
                  className="flex gap-3 rounded-xl border border-gray-50 bg-gray-50/50 p-3 transition hover:border-teal-100 hover:bg-teal-50/30"
                >
                  <span className="text-lg" aria-hidden>
                    {icon}
                  </span>
                  <div>
                    <dt className="font-semibold text-gray-900">{label}</dt>
                    <dd className="mt-0.5 text-gray-600">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-900 p-6 text-white shadow-xl">
            <div
              className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-2xl"
              aria-hidden
            />
            <h3 className="relative text-lg font-bold">Apply for Halal certification</h3>
            <p className="relative mt-2 text-sm text-white/90">
              Start your application online and track progress through the our portal.
            </p>
            <Link
              href="/register"
              className="relative mt-5 inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-3.5 text-sm font-bold text-teal-800 shadow-lg transition hover:bg-teal-50 hover:shadow-xl"
            >
              Start registration
            </Link>
            <Link
              href="/login"
              className="relative mt-3 inline-flex w-full items-center justify-center rounded-xl border border-white/35 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Sign in
            </Link>
          </div>
        </aside>
      </div>

      {/* Impact */}
      <section className="relative overflow-hidden rounded-3xl border border-teal-100/60 bg-gradient-to-br from-white via-teal-50/50 to-emerald-50/40 p-8 shadow-xl md:p-12">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(20,184,166,0.08),_transparent_60%)]"
          aria-hidden
        />
        <div className="relative text-center">
          <SectionLabel>By the numbers</SectionLabel>
          <h2 className="mt-4 text-2xl font-bold text-gray-900 md:text-4xl">
            Our impact in numbers
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Empowering businesses with Halal certification excellence across Ethiopia
          </p>
        </div>
        <AnimatedDepartmentMetrics />
        <p className="relative mt-10 text-center text-sm font-medium text-gray-600 md:text-base">
          Trusted by leading businesses across Ethiopia for Halal certification.
        </p>
      </section>
    </div>
  );
}
