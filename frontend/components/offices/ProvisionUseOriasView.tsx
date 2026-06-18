import Link from "next/link";
import PolicyPageSidebar from "@/components/offices/PolicyPageSidebar";

function IconInfo({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function IconShield({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function IconAlert({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  );
}

function IconTrophy({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c0-.746.616-1.35 1.35-1.35h10.8c.734 0 1.35.604 1.35 1.35v8.251c0 1.392-.622 2.715-1.697 3.604l-2.407 2.002a2.25 2.25 0 01-1.445.524H8.4a2.25 2.25 0 01-1.445-.524l-2.407-2.002a4.492 4.492 0 01-1.697-3.604V4.236z" />
    </svg>
  );
}

function IconBuilding({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5M4.5 3h15M6 3v18m3-15h.008v.008H9V6zm0 3h.008v.008H9V9zm0 3h.008v.008H9v-.008zm3 6.75h3.75v-3h-3.75v3zm0-9h3.75V9H12v-.008zM12 12h3.75v2.25H12V12zm9 1.5V21M16.5 3H18v18M4.5 7.5h15" />
    </svg>
  );
}

function IconLock({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H7.5a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
}

const iconClass = "mt-0.5 h-5 w-5 shrink-0 text-teal-600";

export default function ProvisionUseOriasView() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#ecfdf5] to-[#f0fdfa]">
      <header className="bg-teal-600 pb-16 pt-14 text-center text-white md:pb-20 md:pt-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Provision for the Use of ORIASC
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/95 md:text-base">
            Guidelines and requirements for using ORIASC certification and marks
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-16 pt-6 md:pt-8">
        <Link
          href="/offices/halal-services"
          className="mb-6 inline-flex items-center text-sm font-medium text-teal-800 hover:text-teal-600"
        >
          ← Back to Halal Services Department
        </Link>

        <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
          <div className="lg:col-span-2">
            <div className="relative pl-2">
              <div
                className="absolute bottom-8 left-[15px] top-2 w-1 bg-teal-500/80 md:left-[17px]"
                aria-hidden
              />
              <div className="space-y-8">
                {/* Introduction */}
                <div className="relative">
                  <div
                    className="absolute left-0 top-8 z-10 h-3.5 w-3.5 rounded-full border-[3px] border-white bg-teal-600 shadow ring-1 ring-teal-300 md:top-9"
                    aria-hidden
                  />
                  <div className="ml-8 rounded-2xl border-l-[6px] border-teal-500 bg-white p-6 shadow-md ring-1 ring-gray-100/80 md:ml-10 md:p-8">
                    <h2 className="text-lg font-bold text-teal-700 md:text-xl">Introduction</h2>
                    <div className="mt-4 flex gap-3">
                      <IconInfo className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                      <p className="text-sm leading-relaxed text-gray-800 md:text-base">
                        This provision outlines the terms and conditions for using ORIASC-HCB
                        certification and marks in business operations and marketing materials.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Usage guidelines */}
                <div className="relative">
                  <div
                    className="absolute left-0 top-8 z-10 h-3.5 w-3.5 rounded-full border-[3px] border-white bg-teal-600 shadow ring-1 ring-teal-300 md:top-9"
                    aria-hidden
                  />
                  <div className="ml-8 rounded-2xl border-l-[6px] border-teal-500 bg-white p-6 shadow-md ring-1 ring-gray-100/80 md:ml-10 md:p-8">
                    <h2 className="text-lg font-bold text-teal-700 md:text-xl">Usage Guidelines</h2>
                    <ul className="mt-5 space-y-4">
                      <li className="flex gap-3">
                        <IconCheck className={iconClass} />
                        <p className="text-sm leading-relaxed text-gray-800 md:text-base">
                          The ORIASC Halal mark/seal may only be used in connection with the certified
                          products, processes, or services.
                        </p>
                      </li>
                      <li className="flex gap-3">
                        <IconCheck className={iconClass} />
                        <p className="text-sm leading-relaxed text-gray-800 md:text-base">
                          The mark must be displayed in its original form without any modifications or
                          alterations.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Liability */}
                <div className="relative">
                  <div
                    className="absolute left-0 top-8 z-10 h-3.5 w-3.5 rounded-full border-[3px] border-white bg-teal-600 shadow ring-1 ring-teal-300 md:top-9"
                    aria-hidden
                  />
                  <div className="ml-8 rounded-2xl border-l-[6px] border-teal-500 bg-white p-6 shadow-md ring-1 ring-gray-100/80 md:ml-10 md:p-8">
                    <h2 className="text-lg font-bold text-teal-700 md:text-xl">Liability</h2>
                    <ul className="mt-5 space-y-4">
                      <li className="flex gap-3">
                        <IconShield className={iconClass} />
                        <p className="text-sm leading-relaxed text-gray-800 md:text-base">
                          In case of claims against the certification body for improper use of the
                          ORIASC Halal mark/seal, the client is obliged to relieve the certification
                          body of any third-party claims, in accordance with producer&apos;s
                          responsibility provisions.
                        </p>
                      </li>
                      <li className="flex gap-3">
                        <IconAlert className={iconClass} />
                        <p className="text-sm leading-relaxed text-gray-800 md:text-base">
                          This also applies to claims arising from improper promotional claims made
                          by the client.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Competition */}
                <div className="relative">
                  <div
                    className="absolute left-0 top-8 z-10 h-3.5 w-3.5 rounded-full border-[3px] border-white bg-teal-600 shadow ring-1 ring-teal-300 md:top-9"
                    aria-hidden
                  />
                  <div className="ml-8 rounded-2xl border-l-[6px] border-teal-500 bg-white p-6 shadow-md ring-1 ring-gray-100/80 md:ml-10 md:p-8">
                    <h2 className="text-lg font-bold text-teal-700 md:text-xl">
                      Competition and Representation
                    </h2>
                    <ul className="mt-5 space-y-4">
                      <li className="flex gap-3">
                        <IconTrophy className={iconClass} />
                        <p className="text-sm leading-relaxed text-gray-800 md:text-base">
                          The client shall use the ORIASC Halal mark/seal for competition purposes in
                          a manner that references the company within the certification context.
                        </p>
                      </li>
                      <li className="flex gap-3">
                        <IconBuilding className={iconClass} />
                        <p className="text-sm leading-relaxed text-gray-800 md:text-base">
                          The client must avoid creating the impression that the certification was
                          granted by a state or governmental authority.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Certificate integrity */}
                <div className="relative">
                  <div
                    className="absolute left-0 top-8 z-10 h-3.5 w-3.5 rounded-full border-[3px] border-white bg-teal-600 shadow ring-1 ring-teal-300 md:top-9"
                    aria-hidden
                  />
                  <div className="ml-8 rounded-2xl border-l-[6px] border-teal-500 bg-white p-6 shadow-md ring-1 ring-gray-100/80 md:ml-10 md:p-8">
                    <h2 className="text-lg font-bold text-teal-700 md:text-xl">Certificate Integrity</h2>
                    <p className="mt-4 text-sm leading-relaxed text-gray-800 md:text-base">
                      The client has no right to make any changes to the certificates issued by
                      ORIASC-HCB.
                    </p>
                    <div className="mt-4 flex gap-3">
                      <IconLock className={iconClass} />
                      <p className="text-sm leading-relaxed text-gray-800 md:text-base">
                        Any modifications to the certificate content must be approved by ORIASC-HCB
                        in writing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <PolicyPageSidebar currentSlug="provision-use-oriasc-hcb" />
        </div>
      </div>
    </main>
  );
}
