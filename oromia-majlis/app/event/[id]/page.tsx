import Link from "next/link";
import { notFound } from "next/navigation";

interface EventDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const eventDetails: Record<
  string,
  {
    day: number;
    month: string;
    dayOfWeek: string;
    image: string;
    category: string;
    title: string;
    time: string;
    location: string;
    description: string;
    content: string[];
    organizer?: string;
    contact?: {
      phone: string;
      email: string;
    };
  }
> = {
  "1": {
    day: 15,
    month: "AUGUST",
    dayOfWeek: "TUESDAY",
    image: "🚴",
    category: "Conference",
    title: "Annual Cycling Race 2020 for the Covid-19 Donation",
    time: "August 15, 2028 @15:00 - 19:00",
    location: "32 Quincy Street, Cambridge, MA",
    description:
      "Join us for our annual cycling race to raise funds for Covid-19 relief efforts. This community event brings together cyclists of all levels to support a great cause.",
    content: [
      "The Annual Cycling Race is one of our most anticipated community events. Participants from across the region come together to cycle through scenic routes while raising awareness and funds for Covid-19 relief efforts.",
      "This year's event promises to be bigger and better than ever, with multiple race categories, food vendors, live music, and family-friendly activities throughout the day.",
      "All proceeds from registration fees and donations will go directly to supporting local families affected by the pandemic and healthcare workers on the front lines.",
    ],
    organizer: "City Sports Committee",
    contact: {
      phone: "+251911111111",
      email: "events@oromiamajlis.com",
    },
  },
  "2": {
    day: 26,
    month: "AUGUST",
    dayOfWeek: "MONDAY",
    image: "🧘",
    category: "Health & Sports",
    title: "Celebrating World Fitness Day at White Corner'20",
    time: "August 26, 2024 15:00 - November 26, 2026 17:00",
    location: "Millenia Orlando, USA",
    description:
      "A comprehensive fitness celebration featuring yoga sessions, fitness workshops, and wellness activities for all ages.",
    content: [
      "World Fitness Day is a global celebration of health and wellness, and we're proud to host this event in our city.",
      "The event features free fitness classes, health screenings, nutrition workshops, and activities for the whole family.",
    ],
  },
  "3": {
    day: 11,
    month: "AUGUST",
    dayOfWeek: "TUESDAY",
    image: "💻",
    category: "Meeting",
    title: "City Innovation and Technology Committee Meeting",
    time: "August 11, 2026 13:00 - August 14, 2026 15:00",
    location: "Mastanow City Council",
    description:
      "A multi-day committee meeting to discuss technology initiatives and innovation strategies for the city.",
    content: [
      "The City Innovation and Technology Committee meets regularly to discuss and plan technology initiatives that benefit our community.",
      "This extended meeting will cover topics including digital infrastructure, smart city initiatives, and technology accessibility.",
    ],
  },
};

// Default event data for events not in the details object
const defaultEventData = {
  description:
    "Join us for this exciting event. More details will be available soon.",
  content: [
    "We're excited to host this event for our community. Stay tuned for more information as the event date approaches.",
  ],
};

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { id } = await params;
  const event = eventDetails[id];

  if (!event) {
    notFound();
  }

  const eventData = { ...event, ...defaultEventData, ...event };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back Button */}
          <Link
            href="/event"
            className="inline-flex items-center text-blue-700 hover:text-red-600 mb-8 transition-colors"
          >
            <span className="mr-2">←</span>
            <span>Back to Events</span>
          </Link>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Event Header */}
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Date Section */}
                <div className="flex-shrink-0 text-center md:text-left">
                  <div className="text-6xl font-bold text-gray-900 leading-none">
                    {eventData.day}
                  </div>
                  <div className="text-lg font-semibold text-gray-700 uppercase mt-2">
                    {eventData.month}
                  </div>
                  <div className="text-sm text-gray-600 uppercase mt-1">
                    {eventData.dayOfWeek}
                  </div>
                </div>

                {/* Image */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <div className="text-6xl">{eventData.image}</div>
                  </div>
                </div>

                {/* Title and Category */}
                <div className="flex-1">
                  <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-full mb-3">
                    {eventData.category}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {eventData.title}
                  </h1>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex items-center gap-2">
                      <span>🕐</span>
                      <span>{eventData.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📍</span>
                      <span>{eventData.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Content */}
            <div className="p-8 md:p-12">
              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  About This Event
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {eventData.description}
                </p>
              </div>

              {/* Content Sections */}
              <div className="space-y-6 mb-8">
                {eventData.content.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-lg text-gray-700 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Event Details */}
              <div className="border-t border-gray-200 pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Event Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Date & Time</h3>
                    <p className="text-gray-700">{eventData.time}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                    <p className="text-gray-700">{eventData.location}</p>
                  </div>
                  {eventData.organizer && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Organizer</h3>
                      <p className="text-gray-700">{eventData.organizer}</p>
                    </div>
                  )}
                  {eventData.contact && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Contact</h3>
                      <p className="text-gray-700">
                        {eventData.contact.phone}
                        <br />
                        {eventData.contact.email}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Register Button */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-md transition-colors">
                  Register for Event
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

