import Link from "next/link";
import type { ReactNode } from "react";
import PolicyPageSidebar from "@/components/offices/PolicyPageSidebar";

const SCHEME_PDF_HREF = "/documents/ORIASC-HCB-Scheme-Document.pdf";

function PdfGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
        fill="#FEE2E2"
        stroke="#DC2626"
        strokeWidth="1.25"
      />
      <path d="M14 2v6h6" stroke="#DC2626" strokeWidth="1.25" strokeLinecap="round" />
      <path
        d="M9 17h6M9 13h6M9 9h2"
        stroke="#DC2626"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LeftAccentCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-teal-100 border-l-[6px] border-l-teal-500 bg-white p-6 shadow-md ring-1 ring-gray-100/80 md:p-8">
      {children}
    </div>
  );
}

type ConditionRow = { section: string; condition: ReactNode };

function ConditionsTable({ rows }: { rows: ConditionRow[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-teal-100">
      <table className="w-full min-w-[36rem] text-left text-sm text-gray-800">
        <thead>
          <tr className="border-b border-teal-100 bg-teal-50/95">
            <th className="w-24 whitespace-nowrap px-3 py-3 font-semibold text-teal-800 md:px-4">
              Section
            </th>
            <th className="px-3 py-3 font-semibold text-teal-800 md:px-4">Condition</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.section} className="border-b border-gray-100 last:border-0">
              <td className="align-top whitespace-nowrap px-3 py-3 font-semibold text-teal-700 md:px-4">
                {row.section}
              </td>
              <td className="px-3 py-3 leading-relaxed md:px-4">{row.condition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const CONDITION_ROWS: ConditionRow[] = [
  {
    section: "1.1",
    condition:
      "Applicants shall be legally registered entities (or eligible applicants as defined by the scheme) seeking Halal certification for defined products, processes, and sites within the scope published by ORIASC-HCB.",
  },
  {
    section: "1.2",
    condition:
      "A complete application shall be submitted through the prescribed channel together with supporting documentation, applicable fees, and declarations required by the Scheme Manager or Assistant Scheme Manager.",
  },
  {
    section: "1.3",
    condition:
      "The client shall maintain documented information on raw materials, ingredients, processing aids, suppliers, and product formulations sufficient for Halal evaluation, traceability, and audit verification.",
  },
  {
    section: "1.4",
    condition:
      "Certified and applicant sites shall grant ORIASC-HCB auditors timely access to premises, records, and personnel necessary to verify conformity with Sharia requirements, applicable standards, and scheme rules.",
  },
  {
    section: "1.5",
    condition:
      "Operations under certification shall comply with Islamic Law (Sharia) for sourcing, processing, storage, packaging, and distribution of Halal products, including controls to prevent cross-contact with non-Halal substances.",
  },
  {
    section: "1.6",
    condition:
      "Where Gulf market access is claimed, the client shall meet applicable GSO-related and scheme-referenced requirements as communicated at application and surveillance stages.",
  },
  {
    section: "1.7",
    condition:
      "The certificate scope shall clearly identify products, product categories, manufacturing sites, and any limitations. Use of the Halal mark or claims outside that scope is prohibited.",
  },
  {
    section: "1.8",
    condition: (
      <>
        <p className="mb-2">The certified client shall, throughout the certification cycle:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Cooperate with scheduled and unannounced surveillance activities as applicable;</li>
          <li>Notify ORIASC-HCB without undue delay of changes affecting Halal integrity (e.g. new ingredients, new lines, new sites, or critical supplier changes);</li>
          <li>Use certification marks and references only as authorised and in line with the provision for use of ORIASC-HCB marks;</li>
          <li>Maintain corrective action closure evidence for any non-conformities raised during audits.</li>
        </ul>
      </>
    ),
  },
  {
    section: "1.9",
    condition: (
      <>
        <p className="mb-2">Certification may be suspended, reduced in scope, or withdrawn where, including but not limited to:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Serious or repeated non-conformities are not addressed within agreed timeframes;</li>
          <li>The client refuses access for required audit activities or provides false information;</li>
          <li>Fees or binding obligations are not met as per published fee structure and agreements;</li>
          <li>Misuse of marks, misleading Halal claims, or other breaches of scheme conditions is verified.</li>
        </ul>
      </>
    ),
  },
  {
    section: "1.10",
    condition: (
      <>
        <p className="mb-2">Clients may exercise rights under the complaints and appeals procedure, including:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Submitting complaints regarding certification activities in writing to the relevant Scheme or Assistant Scheme Manager;</li>
          <li>Appealing certification decisions within the published timeframe and process;</li>
          <li>Requesting review of evaluation decisions in accordance with ORIASC-HCB procedures.</li>
        </ul>
        <p className="mt-3 text-xs text-gray-600 md:text-sm">
          The full scheme document defines committee composition, timelines, and record-keeping. The table above is illustrative only.
        </p>
      </>
    ),
  },
];

export default function SchemeDocumentView() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#ecfdf5] to-[#f0fdfa]">
      <header
        className="relative bg-gradient-to-br from-teal-600 via-[#00a18c] to-teal-900 pb-20 pt-14 text-center text-white md:pb-24 md:pt-16"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 88%, 0 100%)" }}
      >
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            ORIASC-HCB Scheme Document
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/95 md:text-base">
            Halal Certification Conditions &amp; Application Requirements
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
            {/* PDF + warning */}
            <LeftAccentCard>
              <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
                <div className="mb-4 shrink-0 sm:mb-0 sm:mr-6">
                  <PdfGlyph className="mx-auto h-16 w-14 sm:mx-0 md:h-[4.5rem] md:w-16" />
                </div>
                <div className="min-w-0 flex-1">
                  <a
                    href={SCHEME_PDF_HREF}
                    className="text-base font-semibold text-blue-700 underline decoration-2 underline-offset-2 hover:text-blue-900"
                    download
                  >
                    Download Full Scheme Document (PDF)
                  </a>
                  <p className="mt-2 text-sm text-gray-600">
                    Or read the sample content{" "}
                    <a href="#scheme-sample-content" className="font-medium text-teal-700 hover:underline">
                      below
                    </a>
                    .
                  </p>
                </div>
              </div>
              <div className="mt-6 flex gap-3 rounded-xl border-l-4 border-amber-500 bg-amber-50 p-4 text-left text-sm text-amber-950">
                <span className="shrink-0 text-lg" aria-hidden>
                  ⚠️
                </span>
                <p>
                  <strong>Important:</strong> You must read the full details in the PDF. The
                  content below is a sample and may not include all requirements or the latest
                  updates.
                </p>
              </div>
            </LeftAccentCard>

            <div id="scheme-sample-content" className="scroll-mt-24 space-y-8">
              <LeftAccentCard>
                <h2 className="text-lg font-bold text-teal-700 md:text-xl">About ORIASC</h2>
                <p className="mt-4 text-sm leading-relaxed text-gray-800 md:text-base">
                  The <strong>Oromiya Region Islamic Affairs Supreme Council (ORIASC)</strong>{" "}
                  oversees Islamic affairs and related services in the Oromia Region. The{" "}
                  <strong>Department of Halal Certification Body (ORIASC-HCB)</strong> implements
                  the national Halal certification programme in line with Sharia, applicable
                  standards, and international expectations for market access. Further institutional
                  information may be available through{" "}
                  <a
                    href="https://www.oriasc.et"
                    className="font-semibold text-teal-700 underline hover:text-teal-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.oriasc.et
                  </a>
                  .
                </p>
              </LeftAccentCard>

              <LeftAccentCard>
                <h2 className="text-lg font-bold text-teal-700 md:text-xl">
                  Halal Certification Conditions
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Sample extract — refer to the official PDF for the complete scheme.
                </p>
                <div className="mt-6">
                  <ConditionsTable rows={CONDITION_ROWS} />
                </div>
              </LeftAccentCard>
            </div>
          </div>

          <PolicyPageSidebar currentSlug="scheme-document" />
        </div>
      </div>
    </main>
  );
}
