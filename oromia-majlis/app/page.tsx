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

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
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
