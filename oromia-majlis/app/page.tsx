import {
  HeroSection,
  LocalServicesSection,
  LeaderSection,
  StatisticsSection,
  EventsDocumentsSection,
  NewsSection,
  OnlineServicesSection,
  CityHighlightsSection,
} from "@/components/home";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <section className="bg-gradient-to-r from-red-600 via-red-700 to-blue-900 text-white">
        <div className="container mx-auto px-4 py-10 md:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-xs md:text-sm uppercase tracking-wider font-semibold text-red-100 mb-2">
                Halal Certification
              </p>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Apply for Halal Certification Online
              </h2>
              <p className="text-white/90 text-sm md:text-base">
                Start your business Halal Certification process through Oromia Majlis HRMS.
                Register, sign in, and track your application digitally.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-xl bg-white text-red-700 px-6 py-3 font-semibold shadow-lg hover:bg-red-50 transition-colors"
              >
                Apply for Halal Certification
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-6 py-3 font-semibold hover:bg-white/20 transition-colors"
              >
                Already Registered? Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>
      <LocalServicesSection />
      <LeaderSection />
      <StatisticsSection />
      <EventsDocumentsSection />
      <NewsSection />
      <OnlineServicesSection />
      <CityHighlightsSection />
      </main>
  );
}
