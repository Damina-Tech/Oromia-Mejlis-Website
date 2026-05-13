"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import PolicyPageSidebar from "@/components/offices/PolicyPageSidebar";

/** Place the official PDF at this path under `public/` to enable download. */
const COMPLAINTS_APPEALS_PDF_HREF =
  "/documents/ORIASC-HCB-49-Complaints-Appeals-Procedure.pdf";

function PdfIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.25" />
      <path d="M14 2v6h6" stroke="#DC2626" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M9 17h6M9 13h6M9 9h2" stroke="#DC2626" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function NumberedSection({
  number,
  title,
  children,
  collapsible,
  defaultExpanded = true,
}: {
  number: number;
  title: string;
  children: ReactNode;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="flex gap-4 md:gap-5">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white shadow-md ring-2 ring-teal-200 md:h-11 md:w-11 md:text-base"
        aria-hidden
      >
        {number}
      </div>
      <div className="min-w-0 flex-1 rounded-2xl border-l-4 border-teal-500 bg-white p-6 shadow-md ring-1 ring-gray-100/80 md:p-8">
        <h2 className="text-lg font-bold text-teal-700 md:text-xl">{title}</h2>
        <div
          className={`mt-4 text-sm leading-relaxed text-gray-800 md:text-base ${
            collapsible && !expanded ? "line-clamp-5" : ""
          }`}
        >
          {children}
        </div>
        {collapsible ? (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="mt-5 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default function ComplaintsAppealsProcedureView() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#ecfdf5] to-[#f0fdfa]">
      <header
        className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-teal-900 pb-20 pt-14 text-center text-white md:pb-24 md:pt-16"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 88%, 0 100%)" }}
      >
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Complaints and Appeals Procedure
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/95 md:text-base">
            Guidelines for handling complaints, appeals, and review requests at ORIASC-HCB
          </p>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 pb-16 pt-4 md:-mt-8 md:pt-0">
        <Link
          href="/offices/halal-services"
          className="mb-6 inline-flex items-center text-sm font-medium text-teal-800 hover:text-teal-600"
        >
          ← Back to Halal Services Department
        </Link>

        <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
          <div className="space-y-8 lg:col-span-2">
            {/* PDF download card */}
            <div className="rounded-2xl bg-white p-8 text-center shadow-md ring-1 ring-gray-100 md:p-10">
              <div className="mx-auto mb-4 flex justify-center">
                <PdfIcon className="h-16 w-14 md:h-[4.5rem] md:w-16" />
              </div>
              <a
                href={COMPLAINTS_APPEALS_PDF_HREF}
                className="text-base font-semibold text-blue-700 underline decoration-2 underline-offset-2 hover:text-blue-900"
                download
              >
                Download Full Complaints &amp; Appeals Procedure (PDF)
              </a>
              <p className="mx-auto mt-3 max-w-md text-sm text-gray-600">
                Or read the full procedure below,{" "}
                <a href="#procedure-sections" className="font-medium text-teal-700 hover:underline">
                  section by section
                </a>
                .
              </p>
            </div>

            <div id="procedure-sections" className="space-y-10 md:space-y-12 scroll-mt-24">
              <NumberedSection number={1} title="Purpose &amp; Scope" collapsible defaultExpanded>
                <p>
                  This Standard Operating Procedure (SOP) establishes the steps for handling{" "}
                  <strong>complaints</strong> received concerning certification activities,{" "}
                  <strong>appeals</strong> against certification decisions, and{" "}
                  <strong>requests for review</strong> of evaluation decisions made by ORIASC-HCB
                  (Oromiya Region Islamic Affairs Supreme Council — Department of Halal
                  Certification Body).
                </p>
                <p className="mt-4">
                  The procedure applies to all parties involved, including customers (applicants
                  and certified organizations), the <strong>Quality Unit</strong>,{" "}
                  <strong>Halal Department</strong> staff, and the{" "}
                  <strong>Appeals and Review Committee</strong>, so that each case is handled
                  consistently, confidentially, and in line with impartiality requirements.
                </p>
                <p className="mt-4">
                  Where this SOP references forms, registers, or time limits, the latest approved
                  versions published by ORIASC-HCB shall apply.
                </p>
              </NumberedSection>

              <NumberedSection number={2} title="Responsibilities">
                <p>
                  The <strong>Managing Director</strong> and{" "}
                  <strong>Quality Assurance Manager</strong> are responsible for the{" "}
                  <strong>setting</strong>, <strong>implementation</strong>, and{" "}
                  <strong>communication</strong> of this document across ORIASC-HCB, including
                  ensuring that staff and committee members are aware of their roles in complaints,
                  appeals, and review processes.
                </p>
              </NumberedSection>

              <NumberedSection number={3} title="Definitions" collapsible defaultExpanded>
                <dl className="space-y-4">
                  <div>
                    <dt className="font-semibold text-gray-900">Complaint</dt>
                    <dd className="mt-1 text-gray-800">
                      Expression of dissatisfaction, other than an appeal or request for review,
                      submitted to ORIASC-HCB by any person or organization relating to the
                      activities of ORIASC-HCB or a certified client, where a response is expected.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900">Certification Decision</dt>
                    <dd className="mt-1 text-gray-800">
                      A decision to grant, deny, maintain, renew, suspend, reduce the scope of, or
                      withdraw certification.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900">Evaluation Decision</dt>
                    <dd className="mt-1 text-gray-800">
                      A decision relating to the identification of non-conformities, verification of
                      corrective actions, or similar outcomes of audit or evaluation activities.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900">Appeal</dt>
                    <dd className="mt-1 text-gray-800">
                      A request by an applicant or certified client for reconsideration of a{" "}
                      <em>Certification Decision</em>.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900">Requests for Review</dt>
                    <dd className="mt-1 text-gray-800">
                      A request for reconsideration of an <em>Evaluation Decision</em>.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900">Appeal / Review Committee</dt>
                    <dd className="mt-1 text-gray-800">
                      The internal quality-control body constituted to impartially supervise and
                      decide on appeals and requests for review, as described in the full procedure.
                    </dd>
                  </div>
                </dl>
                <p className="mt-6 border-t border-gray-100 pt-4 text-xs leading-relaxed text-gray-600 md:text-sm">
                  <span className="font-semibold text-gray-800">Document reference:</span>{" "}
                  Oromiya Region Islamic Affairs Supreme Council — Department of Halal Certification
                  Body (ORIASC-HCB).{" "}
                  <span className="whitespace-nowrap">Doc No.: ORIASC-HCB, 49</span>
                  {" · "}
                  <span className="whitespace-nowrap">Issue Date: June/2021</span>
                  {" · "}
                  <span className="whitespace-nowrap">Page No.: 1 of 12</span>
                </p>
              </NumberedSection>
            </div>
          </div>

          <PolicyPageSidebar currentSlug="complaints-appeals-procedure" />
        </div>
      </div>
    </main>
  );
}
