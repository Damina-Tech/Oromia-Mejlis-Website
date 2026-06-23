import DepartmentHeadPortrait from "./DepartmentHeadPortrait";

interface DepartmentHeadCardProps {
  name: string;
  title: string;
  image: string;
  tagline?: string;
}

export default function DepartmentHeadCard({
  name,
  title,
  image,
  tagline = "Leading the department with vision and dedication to serve the community.",
}: DepartmentHeadCardProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-teal-100/80 bg-gradient-to-br from-white via-teal-50/40 to-emerald-50/60 p-6 shadow-lg shadow-teal-900/5 ring-1 ring-gray-100/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-200/80 hover:shadow-xl md:p-10">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal-400/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl"
        aria-hidden
      />

      <p className="relative mb-6 text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
        Department leadership
      </p>

      <div className="relative flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-10">
        <div className="relative shrink-0">
          <div
            className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-teal-400/25 to-emerald-500/15 blur-md"
            aria-hidden
          />
          <DepartmentHeadPortrait image={image} name={name} size="lg" />
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-teal-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide text-teal-800 shadow-md">
            Department Head
          </span>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">{name}</h2>
          <p className="mt-2 text-lg font-semibold text-teal-800">{title}</p>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-600 md:mx-0">
            {tagline}
          </p>
        </div>
      </div>
    </section>
  );
}
