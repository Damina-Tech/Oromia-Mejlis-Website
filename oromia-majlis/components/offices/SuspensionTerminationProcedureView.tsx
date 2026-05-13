import type { ReactNode } from "react";
import Link from "next/link";
import PolicyPageSidebar from "@/components/offices/PolicyPageSidebar";

function BulletAlert() {
  return (
    <span
      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700"
      aria-hidden
    >
      !
    </span>
  );
}

function AccentCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`relative rounded-2xl border border-gray-100 border-l-[6px] border-l-teal-500 bg-white p-6 shadow-md ring-1 ring-gray-100/60 md:p-8 ${className}`}
    >
      <div
        className="absolute left-0 top-8 h-2.5 w-2.5 -translate-x-[5px] rounded-full border-2 border-white bg-teal-600 shadow sm:top-9"
        aria-hidden
      />
      <h2 className="text-lg font-bold text-teal-700 md:text-xl">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function SuspensionTerminationProcedureView() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-br from-teal-800 via-teal-700 to-teal-600 pb-16 pt-14 text-center text-white md:pb-20 md:pt-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            ORIASC-HCB Procedure for Suspension or Termination
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/95 md:text-base">
            Comprehensive guidelines for maintaining certification standards and compliance
          </p>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 py-10 md:py-12">
        <Link
          href="/offices/halal-services"
          className="mb-8 inline-flex items-center text-sm font-medium text-teal-800 hover:text-teal-600"
        >
          ← Back to Halal Services Department
        </Link>

        <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
          <div className="space-y-8 lg:col-span-2">
            <AccentCard title="Introduction">
              <p className="text-sm leading-relaxed text-gray-800 md:text-base">
                Halal certificates may be <strong>suspended</strong> for a limited period (usually
                less than six months) where necessary to protect the integrity of certification and
                to ensure the client returns to full compliance with ORIASC-HCB requirements. This
                procedure describes the grounds, restrictions, notifications, and follow-up
                associated with suspension and related termination decisions.
              </p>
            </AccentCard>

            <AccentCard title="Grounds for Suspension">
              <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                <ul className="space-y-3">
                  {[
                    "Noncompliance with certification or scheme requirements",
                    "Improper use of the certificate, mark, or Halal claims",
                    "Non-payment of agreed fees or failure to meet financial obligations",
                  ].map((text) => (
                    <li key={text} className="flex gap-3">
                      <BulletAlert />
                      <span className="text-sm leading-relaxed text-gray-800 md:text-base">
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-3">
                  {[
                    "Voluntary request from the client to suspend certification",
                    "Contravention of scheme rules or conditions of certification",
                    "Delayed or refused surveillance or re-audit without justified cause",
                  ].map((text) => (
                    <li key={text} className="flex gap-3">
                      <BulletAlert />
                      <span className="text-sm leading-relaxed text-gray-800 md:text-base">
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </AccentCard>

            <div className="grid gap-6 sm:grid-cols-2">
              <AccentCard title="Suspension Restrictions">
                <p className="text-sm leading-relaxed text-gray-800 md:text-base">
                  During suspension, the client <strong>shall not</strong> identify products,
                  services, or the organisation as ORIASC-HCB certified, and shall not use
                  certification marks or references except as expressly permitted in writing for
                  limited transitional labelling where the scheme allows.
                </p>
              </AccentCard>
              <AccentCard title="Notification Process">
                <p className="text-sm leading-relaxed text-gray-800 md:text-base">
                  The <strong>Scheme Manager</strong> (or Assistant Scheme Manager) confirms
                  suspension in writing, states the effective date, summarises the grounds, and
                  outlines the <strong>conditions for reinstatement</strong> and any deadlines for
                  corrective action or evidence submission.
                </p>
              </AccentCard>
              <AccentCard title="Investigation">
                <p className="text-sm leading-relaxed text-gray-800 md:text-base">
                  Following suspension, ORIASC-HCB may conduct an investigation or focused audit to
                  determine whether reinstatement conditions are met and whether certification can
                  be restored, reduced in scope, or should proceed to withdrawal.
                </p>
              </AccentCard>
              <AccentCard title="Costs">
                <p className="text-sm leading-relaxed text-gray-800 md:text-base">
                  All reasonable costs associated with suspension administration, follow-up audits,
                  reinstatement reviews, and related activities are <strong>charged to the client</strong>{" "}
                  in accordance with the published fee structure and any agreed quotation.
                </p>
              </AccentCard>
            </div>
          </div>

          <PolicyPageSidebar currentSlug="suspension-termination-procedure" />
        </div>
      </div>
    </main>
  );
}
