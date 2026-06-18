import Link from "next/link";
import { notFound } from "next/navigation";
import { getLeaderBySlug, getLeaderSlug } from "@/lib/leadership";

export async function generateMetadata({ params }: BiographyPageProps) {
  const { slug } = await params;
  const leader = getLeaderBySlug(slug);
  if (!leader) return { title: "Leadership | Oromia Majlis" };
  return {
    title: `${leader.name} – Biography | Oromia Majlis`,
    description: `Biography of ${leader.name}, ${leader.role} at Oromia Regional Islamic Affairs Supreme Council.`,
  };
}

/** Demo biography content – same for all leaders until leader-specific data is added */
const demoBiography = {
  intro:
    "A dedicated leader in Islamic affairs with a long-standing commitment to serving the Muslim community and advancing the mission of Oromia Majlis.",
  paragraphs: [
    "With years of experience in religious leadership and community service, our leadership has worked to strengthen Islamic institutions, promote authentic Islamic values, and foster unity among Muslims across the Oromia Region.",
    "Through transparent governance, strategic planning, and close engagement with mosques, scholars, and community members, they have contributed to the growth and stability of Islamic affairs management.",
    "Their work emphasizes education, welfare, and dialogue—ensuring that the council's mission is carried out with integrity and in service to the Ummah.",
  ],
  highlights: [
    "Service to the Muslim community and Islamic institutions",
    "Commitment to education, transparency, and good governance",
    "Collaboration with religious scholars and community leaders",
    "Focus on unity, welfare, and authentic Islamic values",
  ],
};

interface BiographyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { managementTeam, getLeaderSlug } = await import("@/lib/leadership");
  return managementTeam.map((leader) => ({
    slug: getLeaderSlug(leader),
  }));
}

export default async function LeadershipBiographyPage({ params }: BiographyPageProps) {
  const { slug } = await params;
  const leader = getLeaderBySlug(slug);

  if (!leader) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Back navigation */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/about#management"
            className="inline-flex items-center gap-2 text-blue-700 hover:text-red-600 font-semibold transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to Leadership</span>
          </Link>
        </div>
      </div>

      {/* Hero section with photo and title */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12 max-w-5xl mx-auto">
            <div className="flex-shrink-0">
              <div className="w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 ring-2 ring-white/10">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm uppercase tracking-wider text-red-300 font-semibold mb-2">
                {leader.level}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{leader.name}</h1>
              <p className="text-xl text-blue-100">{leader.role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Biography content */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-8 md:p-10 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-red-100 pb-2 inline-block">
                  Biography
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">{demoBiography.intro}</p>
              </div>

              <div className="space-y-4">
                {demoBiography.paragraphs.map((paragraph, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Key focus areas</h3>
                <ul className="space-y-2">
                  {demoBiography.highlights.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-gray-600"
                    >
                      <span className="text-red-600 font-bold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="pt-8 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Contact</h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-600">
                  <a
                    href={`mailto:${leader.email}`}
                    className="flex items-center gap-2 hover:text-red-600 transition-colors"
                  >
                    <span className="text-red-600">✉</span>
                    <span>{leader.email}</span>
                  </a>
                  <span className="hidden sm:inline text-gray-300">|</span>
                  <span className="flex items-center gap-2">
                    <span className="text-red-600">📞</span>
                    <span>{leader.phone}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA back to about */}
      <section className="border-t border-gray-200 bg-white py-10">
        <div className="container mx-auto px-4 text-center">
          <Link
            href="/about#management"
            className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-lg hover:shadow-xl"
          >
            View all leadership
          </Link>
        </div>
      </section>
    </main>
  );
}
