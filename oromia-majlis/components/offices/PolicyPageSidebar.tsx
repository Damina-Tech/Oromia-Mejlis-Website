import Link from "next/link";
import { getPolicySidebarItems, HALAL_POLICIES_BASE_PATH } from "@/lib/halalPolicies";

type Props = {
  currentSlug: string;
};

export default function PolicyPageSidebar({ currentSlug }: Props) {
  const sidebarItems = getPolicySidebarItems(currentSlug);

  return (
    <aside className="lg:col-span-1">
      <nav
        className="sticky top-24 rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100"
        aria-label="Other policies"
      >
        <h2 className="border-b border-teal-100 pb-3 text-lg font-bold text-teal-600">
          Other Policies
        </h2>
        <ul className="mt-4 space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.slug}>
              {item.isCurrent ? (
                <span
                  className="block rounded-lg bg-teal-50 px-3 py-2.5 text-sm font-semibold text-teal-800"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={`${HALAL_POLICIES_BASE_PATH}/${item.slug}`}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-teal-50/90 hover:text-teal-900"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
