import Link from "next/link";

type Props = {
  /** When set, shows as the current (non-link) crumb — department detail pages */
  current?: string;
  className?: string;
};

export default function OfficesBreadcrumb({ current, className = "" }: Props) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`mb-8 ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-600">
        <li>
          <Link
            href="/"
            className="font-medium text-teal-800 underline-offset-4 transition hover:text-teal-600 hover:underline"
          >
            Home
          </Link>
        </li>
        <li className="text-gray-400" aria-hidden>
          /
        </li>
        <li>
          {current ? (
            <Link
              href="/offices"
              className="font-medium text-teal-800 underline-offset-4 transition hover:text-teal-600 hover:underline"
            >
              Offices &amp; Departments
            </Link>
          ) : (
            <span className="font-semibold text-gray-900" aria-current="page">
              Offices &amp; Departments
            </span>
          )}
        </li>
        {current ? (
          <>
            <li className="text-gray-400" aria-hidden>
              /
            </li>
            <li
              className="max-w-[min(100%,28rem)] truncate font-semibold text-gray-900"
              aria-current="page"
            >
              {current}
            </li>
          </>
        ) : null}
      </ol>
    </nav>
  );
}
