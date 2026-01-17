import Link from "next/link";
import { notFound } from "next/navigation";
import { getEvent } from "@/lib/strapi";

interface EventDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Helper function to parse HTML content
const parseContent = (htmlContent: string) => {
  const paragraphs: string[] = [];
  
  const textContent = htmlContent
    .replace(/<p[^>]*>(.*?)<\/p>/gi, (match, content) => {
      const text = content.replace(/<[^>]+>/g, '').trim();
      if (text) {
        paragraphs.push(text);
      }
      return '';
    });

  return paragraphs;
};

// Helper function to format date
const formatEventDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'long' }).toUpperCase();
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  return { day, month, dayOfWeek };
};

// Helper function to format time
const formatEventTime = (startDate: string, endDate?: string) => {
  const start = new Date(startDate);
  const startFormatted = start.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  if (endDate) {
    const end = new Date(endDate);
    const endFormatted = end.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    // Check if same day
    if (start.toDateString() === end.toDateString()) {
      return `${startFormatted.split(',')[0]}, ${start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    }
    return `${startFormatted} - ${endFormatted}`;
  }
  
  return startFormatted;
};

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) {
    notFound();
  }

  const { day, month, dayOfWeek } = formatEventDate(event.startDate);
  const time = formatEventTime(event.startDate, event.endDate);
  const content = event.content ? parseContent(event.content) : [];

  const categoryColors: Record<string, string> = {
    Conference: "bg-blue-600",
    Religious: "bg-purple-600",
    Workshop: "bg-orange-600",
    "Community Service": "bg-green-600",
    Education: "bg-indigo-600",
    Culture: "bg-pink-600",
  };

  const categoryColor = categoryColors[event.category] || "bg-gray-600";

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
            <div className="bg-gradient-to-br from-red-100 to-red-200 p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Date Section */}
                <div className="flex-shrink-0 text-center md:text-left">
                  <div className="text-6xl font-bold text-gray-900 leading-none">
                    {day}
                  </div>
                  <div className="text-lg font-semibold text-gray-700 uppercase mt-2">
                    {month}
                  </div>
                  <div className="text-sm text-gray-600 uppercase mt-1">
                    {dayOfWeek}
                  </div>
                </div>

                {/* Image */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-lg">
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="text-6xl">📅</div>
                    )}
                  </div>
                </div>

                {/* Title and Category */}
                <div className="flex-1">
                  <span className={`inline-block ${categoryColor} text-white text-sm font-semibold px-4 py-1 rounded-full mb-3`}>
                    {event.category}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {event.title}
                  </h1>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex items-center gap-2">
                      <span>🕐</span>
                      <span>{time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📍</span>
                      <span>{event.location}</span>
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
                  {event.description}
                </p>
              </div>

              {/* Content Sections */}
              {content.length > 0 && (
                <div className="space-y-6 mb-8">
                  {content.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-lg text-gray-700 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {/* Render HTML content if available */}
              {event.content && content.length === 0 && (
                <div
                  className="text-lg text-gray-700 leading-relaxed prose prose-lg max-w-none mb-8"
                  dangerouslySetInnerHTML={{ __html: event.content }}
                />
              )}

              {/* Event Details */}
              <div className="border-t border-gray-200 pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Event Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Date & Time</h3>
                    <p className="text-gray-700">{time}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                    <p className="text-gray-700">{event.location}</p>
                  </div>
                  {event.organizer && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Organizer</h3>
                      <p className="text-gray-700">{event.organizer}</p>
                    </div>
                  )}
                  {(event.contactPhone || event.contactEmail) && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Contact</h3>
                      <p className="text-gray-700">
                        {event.contactPhone && <>{event.contactPhone}<br /></>}
                        {event.contactEmail && event.contactEmail}
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
