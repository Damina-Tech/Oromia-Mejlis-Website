import Link from "next/link";
import type { ReactNode } from "react";

const GREEN = "text-emerald-600";
const ICON_CLASS = "h-6 w-6 text-emerald-600";

function Connector() {
  return (
    <div className="flex justify-center py-1" aria-hidden>
      <div className="h-10 w-1 rounded-full bg-gradient-to-b from-emerald-300 via-emerald-500 to-emerald-600" />
    </div>
  );
}

function LevelLabel({ children }: { children: ReactNode }) {
  return (
    <p className={`mb-4 text-center text-sm font-semibold tracking-wide ${GREEN}`}>
      {children}
    </p>
  );
}

function RoleBox({ children }: { children: ReactNode }) {
  return (
    <div className="min-w-[140px] rounded-xl border border-gray-200 bg-white px-6 py-4 text-center text-sm font-semibold text-gray-800 shadow-sm transition-shadow hover:shadow-md md:min-w-[180px] md:px-8 md:py-5 md:text-base">
      {children}
    </div>
  );
}

function BookIcon() {
  return (
    <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 9h1M9 13h1M9 17h1" strokeLinecap="round" />
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <line x1="12" y1="1" x2="12" y2="23" strokeLinecap="round" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ColumnsIcon() {
  return (
    <svg className={ICON_CLASS} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 21V3M12 21V3M20 21V3" strokeLinecap="round" />
      <path d="M2 21h20M2 3h20" strokeLinecap="round" />
    </svg>
  );
}

const departments = [
  {
    label: "Fatwa & Guidance",
    href: "/offices/fatwa-islamic-research",
    icon: <BookIcon />,
  },
  {
    label: "Education",
    href: "/offices/education-training",
    icon: <UsersIcon />,
  },
  {
    label: "Hajj & Umrah",
    href: "/offices/hajj-umrah-services",
    icon: <MapPinIcon />,
  },
  {
    label: "Halal Certification",
    href: "/offices/halal-services",
    icon: <BuildingIcon />,
  },
  {
    label: "Community Services",
    href: "/offices/social-affairs-islamic-associations",
    icon: <UsersIcon />,
  },
  {
    label: "Finance & Admin",
    href: "/offices/finance-resource-administration",
    icon: <DollarIcon />,
  },
  {
    label: "Ulama Council",
    href: "/offices/fatwa-islamic-research",
    icon: <ColumnsIcon />,
  },
  {
    label: "Research & Dev",
    href: "/offices/study-research-policy",
    icon: <BookIcon />,
  },
  {
    label: "Public Relations",
    href: "/offices/security-public-relations",
    icon: <UsersIcon />,
  },
];

function DepartmentBox({
  label,
  href,
  icon,
}: {
  label: string;
  href: string;
  icon: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-6 text-center shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
    >
      <span className="transition-transform group-hover:scale-110">{icon}</span>
      <span className="text-sm font-semibold text-gray-800 group-hover:text-emerald-700">
        {label}
      </span>
    </Link>
  );
}

export default function OrganizationalStructureDiagram() {
  return (
    <div className="border-t border-gray-200 pt-16 md:pt-20">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h3 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Organizational Structure
        </h3>
        <p className="mt-3 text-gray-600">
          Our organizational hierarchy ensures effective management and service
          delivery
        </p>
      </div>

      <div className="mx-auto max-w-4xl">
        {/* Executive */}
        <LevelLabel>Executive</LevelLabel>
        <div className="flex justify-center">
          <RoleBox>President</RoleBox>
        </div>

        <Connector />

        {/* Leadership */}
        <LevelLabel>Leadership</LevelLabel>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <RoleBox>First Vice President</RoleBox>
          <RoleBox>Vice President</RoleBox>
        </div>

        <Connector />

        {/* General Secretary */}
        <LevelLabel>General Secretary</LevelLabel>
        <div className="flex justify-center">
          <RoleBox>General Secretary</RoleBox>
        </div>

        <Connector />

        {/* Departments */}
        <LevelLabel>Departments</LevelLabel>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
          {departments.map((dept) => (
            <DepartmentBox
              key={dept.label}
              label={dept.label}
              href={dept.href}
              icon={dept.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
