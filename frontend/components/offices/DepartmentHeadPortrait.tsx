import Image from "next/image";

function isHeadImageUrl(image: string) {
  return (
    image.startsWith("/") ||
    image.startsWith("http://") ||
    image.startsWith("https://")
  );
}

interface DepartmentHeadPortraitProps {
  image: string;
  name: string;
  size?: "md" | "lg";
}

export default function DepartmentHeadPortrait({
  image,
  name,
  size = "lg",
}: DepartmentHeadPortraitProps) {
  const frameClass =
    size === "lg"
      ? "relative h-44 w-44 shrink-0 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-teal-100 to-emerald-200 shadow-xl ring-4 ring-white sm:h-52 sm:w-52 md:h-60 md:w-60 md:rounded-[2rem]"
      : "relative h-36 w-36 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-teal-100 to-emerald-200 shadow-lg ring-4 ring-white sm:h-40 sm:w-40";

  if (isHeadImageUrl(image)) {
    return (
      <div className={frameClass}>
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 176px, 240px"
          className="object-cover object-top"
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-teal-900/10"
          aria-hidden
        />
      </div>
    );
  }

  return (
    <div
      className={`${frameClass} flex items-center justify-center text-7xl sm:text-8xl md:text-[5.5rem]`}
      aria-hidden
    >
      {image}
    </div>
  );
}
