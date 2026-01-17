import EventList from "@/components/events/EventList";

export const metadata = {
  title: "Events - Oromia Majlis",
  description: "Browse and find upcoming events organized by Oromia Regional Islamic Affairs Supreme Council",
};

export default function EventPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Events
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover upcoming events, conferences, workshops, and community gatherings organized by Oromia Regional Islamic Affairs Supreme Council
            </p>
          </div>

          {/* Event List with Filter */}
          <EventList />
        </div>
      </section>
    </main>
  );
}

