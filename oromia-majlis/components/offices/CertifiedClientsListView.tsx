"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import PolicyPageSidebar from "@/components/offices/PolicyPageSidebar";

export type CertifiedClientRow = {
  id: string;
  name: string;
  location: string;
  product: string;
  contactName: string;
  contactPosition: string;
  contactMobile: string;
  contactEmail: string;
  status: "Active" | "Suspended";
};

export const CERTIFIED_CLIENTS_SAMPLE: CertifiedClientRow[] = [
  {
    id: "1",
    name: "Al-Nujum Export Slaughter House",
    location: "Dukem",
    product: "Beef, Mutton & Goat meat",
    contactName: "Wehib Sherif",
    contactPosition: "Manager",
    contactMobile: "+251911216874",
    contactEmail: "alnujum@yahoo.com",
    status: "Active",
  },
  {
    id: "2",
    name: "Ethiopian Meat Export Slaughter House",
    location: "Addis Ababa",
    product: "Beef & Mutton (export grade)",
    contactName: "Tadesse Lemma",
    contactPosition: "Operations Manager",
    contactMobile: "+251911223344",
    contactEmail: "info@ethiopianmeatexport.et",
    status: "Active",
  },
  {
    id: "3",
    name: "Halal Quality Slaughter House",
    location: "Dire Dawa",
    product: "Beef, Goat meat, Offals",
    contactName: "Fatuma Hassen",
    contactPosition: "Quality Lead",
    contactMobile: "+251920556677",
    contactEmail: "halalquality@example.com",
    status: "Active",
  },
  {
    id: "4",
    name: "Premium Meat Processing",
    location: "Bahir Dar",
    product: "Processed beef & lamb products",
    contactName: "Daniel Mekonnen",
    contactPosition: "Plant Manager",
    contactMobile: "+251930778899",
    contactEmail: "contact@premiummeat.et",
    status: "Active",
  },
];

function matchesSearch(row: CertifiedClientRow, q: string): boolean {
  if (!q.trim()) return true;
  const s = q.toLowerCase();
  const haystack = [
    row.name,
    row.location,
    row.product,
    row.contactName,
    row.contactPosition,
    row.contactMobile,
    row.contactEmail,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(s);
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

export default function CertifiedClientsListView() {
  const [query, setQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "Active" | "Suspended">("all");

  const filtered = useMemo(() => {
    return CERTIFIED_CLIENTS_SAMPLE.filter((row) => {
      if (!matchesSearch(row, appliedQuery)) return false;
      if (statusFilter === "all") return true;
      return row.status === statusFilter;
    });
  }, [appliedQuery, statusFilter]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setAppliedQuery(query);
  };

  return (
    <main className="min-h-screen bg-[#f0f9f7]">
      <header
        className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-teal-800 pb-20 pt-14 text-center text-white md:pb-24 md:pt-16"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 92%, 50% 100%, 0 92%)" }}
      >
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            ORIASC-HCB List of Certified Clients
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/95 md:text-base">
            Discover our network of certified halal establishments and their services
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
            {/* Intro */}
            <section className="rounded-2xl border border-teal-100 bg-white p-6 shadow-md ring-1 ring-gray-100/80 md:p-8">
              <h2 className="text-lg font-bold text-teal-700 md:text-xl">Our Certified Clients</h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-700 md:text-base">
                This directory highlights Halal-certified abattoirs, slaughterhouses, and meat
                processing facilities registered with ORIASC-HCB. It is published to support
                transparency for buyers, regulators, and the public. Certificate status should be
                verified for time-sensitive decisions; suspended or withdrawn certificates may not
                appear as Active.
              </p>
            </section>

            {/* Search & filter */}
            <section className="rounded-2xl border border-teal-100 bg-white p-6 shadow-md ring-1 ring-gray-100/80 md:p-8">
              <h2 className="text-lg font-bold text-teal-700 md:text-xl">Search &amp; Filter</h2>
              <form
                onSubmit={handleSearch}
                className="mt-6 flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-end"
              >
                <div className="min-w-0 flex-1 lg:min-w-[14rem]">
                  <label htmlFor="client-search" className="sr-only">
                    Search clients
                  </label>
                  <div className="relative">
                    <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      id="client-search"
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search by name, location, product…"
                      className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 text-sm text-gray-900 shadow-sm outline-none ring-teal-500/20 transition focus:border-teal-500 focus:ring-2"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-52">
                  <label htmlFor="status-filter" className="mb-1 block text-xs font-medium text-gray-600">
                    Filter by status
                  </label>
                  <select
                    id="status-filter"
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(e.target.value as "all" | "Active" | "Suspended")
                    }
                    className="w-full rounded-lg border border-gray-200 bg-white py-2.5 px-3 text-sm text-gray-900 shadow-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  >
                    <option value="all">Show all</option>
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 lg:shrink-0"
                >
                  <SearchIcon className="h-4 w-4" />
                  Search
                </button>
              </form>
              <p className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                <span className="text-base" aria-hidden>
                  👥
                </span>
                <span>
                  <strong className="font-semibold text-gray-800">{filtered.length}</strong> client
                  {filtered.length === 1 ? "" : "s"} found
                </span>
              </p>
            </section>

            {/* Table */}
            <section className="rounded-2xl border border-teal-100 bg-white p-6 shadow-md ring-1 ring-gray-100/80 md:p-8">
              <h2 className="text-lg font-bold text-teal-700 md:text-xl">Active Certified Clients</h2>
              <div className="mt-6 overflow-x-auto rounded-lg border border-teal-100">
                <table className="w-full min-w-[56rem] text-left text-sm text-gray-800">
                  <thead>
                    <tr className="border-b border-teal-100 bg-teal-50/95">
                      <th className="px-3 py-3 font-semibold text-teal-800 md:px-4">
                        Abattoir / Slaughter House
                      </th>
                      <th className="px-3 py-3 font-semibold text-teal-800 md:px-4">Location</th>
                      <th className="px-3 py-3 font-semibold text-teal-800 md:px-4">Product</th>
                      <th className="min-w-[14rem] px-3 py-3 font-semibold text-teal-800 md:px-4">
                        Contact details
                      </th>
                      <th className="px-3 py-3 font-semibold text-teal-800 md:px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-10 text-center text-gray-600">
                          No clients match your search. Try different keywords or set status to
                          &quot;Show all&quot;.
                        </td>
                      </tr>
                    ) : (
                      filtered.map((row, i) => (
                        <tr
                          key={row.id}
                          className={i % 2 === 1 ? "bg-gray-50/90" : "bg-white"}
                        >
                          <td className="border-b border-gray-100 px-3 py-3 font-medium text-gray-900 md:px-4">
                            {row.name}
                          </td>
                          <td className="border-b border-gray-100 px-3 py-3 md:px-4">
                            {row.location}
                          </td>
                          <td className="border-b border-gray-100 px-3 py-3 md:px-4">
                            {row.product}
                          </td>
                          <td className="border-b border-gray-100 px-3 py-3 text-sm leading-relaxed md:px-4">
                            <div className="space-y-0.5">
                              <p>
                                <span className="font-medium text-gray-700">Name:</span>{" "}
                                {row.contactName}
                              </p>
                              <p>
                                <span className="font-medium text-gray-700">Position:</span>{" "}
                                {row.contactPosition}
                              </p>
                              <p>
                                <span className="font-medium text-gray-700">Mob.:</span>{" "}
                                {row.contactMobile}
                              </p>
                              <p>
                                <span className="font-medium text-gray-700">Email:</span>{" "}
                                <a
                                  href={`mailto:${row.contactEmail}`}
                                  className="text-teal-700 underline hover:text-teal-900"
                                >
                                  {row.contactEmail}
                                </a>
                              </p>
                            </div>
                          </td>
                          <td className="border-b border-gray-100 px-3 py-3 align-top md:px-4">
                            {row.status === "Active" ? (
                              <span className="inline-flex rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white">
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex rounded-full bg-amber-500 px-2.5 py-1 text-xs font-semibold text-white">
                                Suspended
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <PolicyPageSidebar currentSlug="list-of-clients" />
        </div>
      </div>
    </main>
  );
}
