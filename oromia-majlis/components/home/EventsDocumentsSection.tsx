"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Event, getEvents } from "@/lib/strapi";
import { majlisDocuments } from "@/lib/documents";

const formatDateLabel = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const formatTimeLabel = (startDate: string, endDate?: string) => {
  const start = new Date(startDate);
  const startTime = start.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  if (!endDate) return startTime;

  const end = new Date(endDate);
  const endTime = end.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${startTime} - ${endTime}`;
};

const isImageUrl = (value?: string) => {
  if (!value) return false;
  return value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/");
};

export default function EventsDocumentsSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  useEffect(() => {
    const fetchTopEvents = async () => {
      try {
        const allEvents = await getEvents();
        setEvents(allEvents.slice(0, 2));
      } catch (error) {
        console.error("Error fetching top events:", error);
      } finally {
        setIsLoadingEvents(false);
      }
    };

    fetchTopEvents();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Upcoming Events */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Upcoming Events
              </h2>
              <Link
                href="/event"
                className="text-blue-700 hover:text-red-600 font-semibold transition-colors"
              >
                See All Events →
              </Link>
            </div>

            <div className="space-y-6">
              {isLoadingEvents && (
                <div className="bg-white border border-gray-200 rounded-lg p-6 text-gray-600">
                  Loading events...
                </div>
              )}

              {!isLoadingEvents &&
                events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-1/3 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-8 min-h-[200px]">
                        {isImageUrl(event.image) ? (
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover rounded"
                          />
                        ) : (
                          <div className="text-6xl">{event.image || "📅"}</div>
                        )}
                      </div>
                      <div className="sm:w-2/3 p-6">
                        <div className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded mb-3">
                          {formatDateLabel(event.startDate)}
                        </div>
                        <div className="text-sm text-blue-700 font-semibold mb-2">
                          {event.category}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          {event.title}
                        </h3>
                        <div className="space-y-1 text-sm text-gray-600 mb-4">
                          <p>📅 {formatDateLabel(event.startDate)}</p>
                          <p>🕐 {formatTimeLabel(event.startDate, event.endDate)}</p>
                          <p>📍 {event.location}</p>
                        </div>
                        <Link
                          href={`/event/${event.slug || event.id}`}
                          className="inline-block text-red-600 hover:text-red-700 font-semibold text-sm transition-colors"
                        >
                          More Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}

              {!isLoadingEvents && events.length === 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-6 text-gray-600">
                  No upcoming events found.
                </div>
              )}
            </div>
          </div>

          {/* City Documents */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Majlis Documents
              </h2>
              <Link
                href="/documents"
                className="text-blue-700 hover:text-red-600 font-semibold transition-colors"
              >
                More Documents →
              </Link>
            </div>

            <div className="space-y-4">
              {majlisDocuments.map((doc) => (
                <Link
                  key={doc.id}
                  href={`/documents#doc-${doc.id}`}
                  className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                >
                  <div className="text-red-600 text-2xl">📄</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-sm text-gray-600">{doc.date}</p>
                  </div>
                  <div className="text-blue-700 group-hover:text-red-600 transition-colors">
                    →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

