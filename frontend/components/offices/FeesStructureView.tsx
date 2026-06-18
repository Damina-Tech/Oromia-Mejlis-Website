import Link from "next/link";
import type { ReactNode } from "react";
import PolicyPageSidebar from "@/components/offices/PolicyPageSidebar";

const FEES_PDF_HREF = "/documents/ORIASC-HCB-Fees-Structure.pdf";

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

function WarningCallout({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
      <span className="shrink-0 text-lg" aria-hidden>
        ⚠️
      </span>
      <p className="leading-relaxed">{children}</p>
    </div>
  );
}

function FeeTable({
  title,
  rows,
  footer,
}: {
  title: string;
  rows: { no: number; item: string; fee: string }[];
  footer?: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-teal-100 bg-white p-5 shadow-md ring-1 ring-gray-100/80 md:p-6">
      <h2 className="border-b border-teal-100 pb-3 text-base font-bold text-teal-700 md:text-lg">
        {title}
      </h2>
      <div className="mt-4 overflow-x-auto rounded-lg border border-teal-100">
        <table className="w-full min-w-[28rem] text-left text-sm text-gray-800">
          <thead>
            <tr className="border-b border-teal-100 bg-teal-50/90">
              <th className="px-3 py-3 font-semibold text-teal-900 md:px-4">Sr. No.</th>
              <th className="px-3 py-3 font-semibold text-teal-900 md:px-4">Service Type / Items</th>
              <th className="px-3 py-3 font-semibold text-teal-900 md:px-4">Fees</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.no} className="border-b border-teal-50 last:border-0">
                <td className="whitespace-nowrap px-3 py-2.5 font-medium text-gray-600 md:px-4">
                  {row.no}
                </td>
                <td className="px-3 py-2.5 md:px-4">{row.item}</td>
                <td className="whitespace-nowrap px-3 py-2.5 font-semibold text-gray-900 md:px-4">
                  {row.fee}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footer}
    </section>
  );
}

export default function FeesStructureView() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#ecfdf5] to-[#f0fdfa]">
      <header
        className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-teal-900 pb-20 pt-14 text-center text-white md:pb-24 md:pt-16"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 88%, 0 100%)" }}
      >
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            ORIASC-HCB Fees Structure
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-white/95 md:text-base">
            Oromia Region Islamic Affairs Supreme Council Department of Halal Certification
            (ORIASC-HCB)
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-16 pt-4 md:-mt-8 md:pt-0">
        <Link
          href="/offices/halal-services"
          className="mb-6 inline-flex items-center text-sm font-medium text-teal-800 hover:text-teal-600"
        >
          ← Back to Halal Services Department
        </Link>

        <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
          <div className="space-y-8 lg:col-span-2">
            {/* PDF */}
            <div className="rounded-2xl border border-teal-100 bg-white p-8 text-center shadow-md md:p-10">
              <div className="mx-auto mb-4 flex justify-center">
                <PdfGlyph className="h-16 w-14 md:h-[4.5rem] md:w-16" />
              </div>
              <a
                href={FEES_PDF_HREF}
                className="text-base font-semibold text-blue-700 underline decoration-2 underline-offset-2 hover:text-blue-900"
                download
              >
                Download Full Fees Structure (PDF)
              </a>
              <p className="mx-auto mt-3 max-w-md text-sm text-gray-600">
                Or read the full fee structure below,{" "}
                <a href="#fees-tables" className="font-medium text-teal-700 hover:underline">
                  section by section
                </a>
                .
              </p>
            </div>

            <div id="fees-tables" className="scroll-mt-24 space-y-8">
              <FeeTable
                title="Fee Structure (For Registration, Approval &amp; Renewal)"
                rows={[
                  { no: 1, item: "Registration and Approval", fee: "20,000 Br" },
                  { no: 2, item: "Application and Registration", fee: "1,000 Br" },
                  { no: 3, item: "Renewal", fee: "20,000.00 Br" },
                  { no: 4, item: "Approval Fees (For Company at Foreign Country)", fee: "$300 USD" },
                  {
                    no: 5,
                    item: "Application and Registration (For Company at Foreign Country)",
                    fee: "$50 USD",
                  },
                  {
                    no: 6,
                    item: "Renewal Fees (For Company at Foreign Country)",
                    fee: "$300 USD",
                  },
                ]}
              />

              <FeeTable
                title="Fee Structure (For Logo Printing On Product)"
                rows={[
                  { no: 1, item: "Logo for 1-3 Product", fee: "1,000 Br" },
                  { no: 2, item: "Logo for 1-5 & Product", fee: "2,000 Br" },
                  { no: 3, item: "For Company at Foreign Country", fee: "$100 USD" },
                  {
                    no: 4,
                    item:
                      "Logo Printing on Letter Head/Brochure/Pamphlet/Website or any other place other than Products",
                    fee: "Free",
                  },
                ]}
                footer={
                  <WarningCallout>
                    Without Agreement printing or demonstration of Halal Logo is firmly forbidden and
                    will be treated as deception. The validity of Logo Printed on product is only
                    for One Year.
                  </WarningCallout>
                }
              />

              <FeeTable
                title="Fee Structure (For Addition of Product in Certificate)"
                rows={[
                  {
                    no: 1,
                    item: "Addition of Product in Validated Certificate",
                    fee: "2,000 Br (Per Product)",
                  },
                  {
                    no: 2,
                    item: "Additional Product Charges (For Company at Foreign Country)",
                    fee: "$200 USD (Per Product)",
                  },
                ]}
              />

              <FeeTable
                title="Fee Structure (For Other Services)"
                rows={[
                  { no: 1, item: "Company Name Change/Ownership Change", fee: "2,000 Br" },
                  {
                    no: 2,
                    item: "Company Name Change (For Company of Foreign Country)",
                    fee: "$200 USD",
                  },
                  { no: 3, item: "For shipment Certificate", fee: "3,500 Br" },
                  {
                    no: 4,
                    item: "Per Shipment Certificate of Product (Company of Foreign Country)",
                    fee: "$50 USD",
                  },
                ]}
              />

              {/* Important notes */}
              <section className="rounded-2xl border border-teal-100 bg-white p-6 shadow-md md:p-8">
                <h2 className="text-lg font-bold text-teal-700 md:text-xl">Important Notes</h2>
                <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-gray-800 md:text-base">
                  <li>The above fees are non-refundable.</li>
                  <li>
                    Renewal application shall be submitted to ORIASC-HCB at least one (1) month
                    before the expiry. Delay may cause extra charges. Non-submission of application
                    within 3 months of the expiry shall terminate the certificate and a fresh
                    application will be required for re-certification.
                  </li>
                  <li>Registration and logo printed on product is subject to annual renewal.</li>
                  <li>
                    The above fees are exclusive of any employment of required company Halal
                    supervisor or required official Halal payment, which shall be paid by the
                    client/company separately.
                  </li>
                  <li>
                    Please prepare cheque or bank transfer in favor of &quot;Oromia Region Islamic
                    Affairs — Halal Department&quot;.
                  </li>
                  <li>
                    All foreign companies outside of country of origin/Ethiopia shall pay in USD.
                  </li>
                  <li>The ORIASC-HCB may revise the fee structure at any time as required.</li>
                  <li>Please avoid cash transactions.</li>
                  <li>
                    Failure to pay any of the above agreed fee structures (the required amount) on
                    the due date may cause suspension or withdrawal of the certificate, and other
                    legal actions may be taken against the client.
                  </li>
                </ul>
                <WarningCallout>
                  Audit fee will be fixed based on the actual context of audit time, production
                  process and location of the company / distance travelled.
                </WarningCallout>
              </section>

              {/* Contact */}
              <section className="rounded-2xl border border-teal-100 bg-white p-6 shadow-md md:p-8">
                <h2 className="text-center text-lg font-bold text-teal-700 md:text-xl">
                  Contact Information
                </h2>
                <div className="mt-6 grid gap-8 md:grid-cols-2">
                  <div className="text-sm leading-relaxed text-gray-800 md:text-base">
                    <p className="font-semibold text-gray-900">Oromia Region Islamic Affairs Supreme Council</p>
                    <p className="mt-1 font-semibold text-gray-900">
                      Department of Halal Certification Body
                    </p>
                    <p className="mt-3">
                      Near Addis Ababa Stadium, Lian House-2, 5th Floor, Addis Ababa, Ethiopia
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-2 text-sm text-gray-800 sm:grid-cols-2 md:text-base">
                    <p>
                      <span className="font-semibold text-gray-900">Tel:</span> +251-115-454-557
                    </p>
                    <p>
                      <span className="font-semibold text-gray-900">Mob:</span> +251-930-77-54-96
                    </p>
                    <p>
                      <span className="font-semibold text-gray-900">Fax:</span> +251115545531
                    </p>
                    <p>
                      <span className="font-semibold text-gray-900">Website:</span>{" "}
                      <a
                        href="https://www.oriasc.org"
                        className="text-teal-700 underline hover:text-teal-900"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        www.oriasc.org
                      </a>
                    </p>
                    <p>
                      <span className="font-semibold text-gray-900">P.O. Box:</span> 24226
                    </p>
                    <p className="sm:col-span-2">
                      <span className="font-semibold text-gray-900">Email:</span>{" "}
                      <a
                        href="mailto:oriasc14@gmail.com"
                        className="text-teal-700 underline hover:text-teal-900"
                      >
                        oriasc14@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
                <p className="mt-8 text-right text-sm italic text-teal-700 md:text-base">
                  All Safe Food is not Halal but all Halal Food is Safe
                </p>
              </section>
            </div>
          </div>

          <PolicyPageSidebar currentSlug="fees-structure" />
        </div>
      </div>
    </main>
  );
}
