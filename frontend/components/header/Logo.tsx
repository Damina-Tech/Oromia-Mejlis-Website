import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center transition-opacity hover:opacity-90"
      aria-label="Oromiyaa Islamic Affairs Supreme Council — Home"
    >
      <Image
        src="/logo1.jpg"
        alt="Oromiyaa Islamic Affairs Supreme Council"
        width={160}
        height={160}
        className="h-12 w-auto object-contain md:h-14"
        priority
      />
    </Link>
  );
}
