"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import EventCard from "./EventCard";
import EventFilter from "./EventFilter";

interface Event {
  id: string;
  day: number;
  month: string;
  dayOfWeek: string;
  image: string;
  category: string;
  title: string;
  time: string;
  location: string;
  date: Date;
}

const allEvents: Event[] = [
  {
    id: "1",
    day: 15,
    month: "AUGUST",
    dayOfWeek: "TUESDAY",
    image: "🚴",
    category: "Conference",
    title: "Annual Cycling Race 2020 for the Covid-19 Donation",
    time: "August 15, 2028 @15:00 - 19:00",
    location: "32 Quincy Street, Cambridge, MA",
    date: new Date("2028-08-15"),
  },
  {
    id: "2",
    day: 26,
    month: "AUGUST",
    dayOfWeek: "MONDAY",
    image: "🧘",
    category: "Health & Sports",
    title: "Celebrating World Fitness Day at White Corner'20",
    time: "August 26, 2024 15:00 - November 26, 2026 17:00",
    location: "Millenia Orlando, USA",
    date: new Date("2024-08-26"),
  },
  {
    id: "3",
    day: 11,
    month: "AUGUST",
    dayOfWeek: "TUESDAY",
    image: "💻",
    category: "Meeting",
    title: "City Innovation and Technology Committee Meeting",
    time: "August 11, 2026 13:00 - August 14, 2026 15:00",
    location: "Mastanow City Council",
    date: new Date("2026-08-11"),
  },
  {
    id: "4",
    day: 17,
    month: "DECEMBER",
    dayOfWeek: "THURSDAY",
    image: "♟️",
    category: "Entertainment",
    title: "Cultural Festival & Concert at Domanion Valer",
    time: "December 17, 2020 @13:00 - 17:00",
    location: "Western Avenue, Allston, MA",
    date: new Date("2020-12-17"),
  },
  {
    id: "5",
    day: 15,
    month: "OCTOBER",
    dayOfWeek: "WEDNESDAY",
    image: "🎤",
    category: "Entertainment",
    title: "Cultural Festival & Concert at Domanion Valer",
    time: "October 15, 2025 13:00 - October 15, 2029 17:00",
    location: "Western Avenue, Allston, MA",
    date: new Date("2025-10-15"),
  },
  {
    id: "6",
    day: 16,
    month: "DECEMBER",
    dayOfWeek: "THURSDAY",
    image: "☕",
    category: "Workshop",
    title: "Faith Forward Future - Social Awareness Seminar",
    time: "December 16, 2021 @09:00 - 13:00",
    location: "15 Champions Center, Crewey",
    date: new Date("2021-12-16"),
  },
  {
    id: "7",
    day: 7,
    month: "JUNE",
    dayOfWeek: "FRIDAY",
    image: "📷",
    category: "Entertainment",
    title: "Organizing City Photography Contest-2021",
    time: "June 7, 2024 09:00 - October 1, 2028 13:00",
    location: "Mayor Office, Norway city",
    date: new Date("2024-06-07"),
  },
  {
    id: "8",
    day: 15,
    month: "MARCH",
    dayOfWeek: "MONDAY",
    image: "📐",
    category: "Meeting",
    title: "Real Entrepreneurship Bootcamp in 2021",
    time: "March 15, 2021 @13:00 - 17:00",
    location: "Mastanow City Council",
    date: new Date("2021-03-15"),
  },
  {
    id: "9",
    day: 2,
    month: "OCTOBER",
    dayOfWeek: "MONDAY",
    image: "🏃",
    category: "Workshop",
    title: "Sports Basement Group Monthly Ride",
    time: "October 2, 2023 @10:00 - 13:00",
    location: "Mayor Office, Norway city",
    date: new Date("2023-10-02"),
  },
  {
    id: "10",
    day: 10,
    month: "FEBRUARY",
    dayOfWeek: "WEDNESDAY",
    image: "🩰",
    category: "Health & Sports",
    title: "The Financial Freedom Boot Camp 2020",
    time: "February 10, 2021 @15:00 - 19:00",
    location: "Millenia Orlando, USA",
    date: new Date("2021-02-10"),
  },
];

const ITEMS_PER_PAGE = 8;

export default function EventList() {
  const [filters, setFilters] = useState<{
    fromDate?: string;
    toDate?: string;
    eventType?: string;
  }>({});
  const [currentPage, setCurrentPage] = useState(1);

  // Filter events
  const filteredEvents = useMemo(() => {
    let filtered = [...allEvents];

    if (filters.eventType) {
      filtered = filtered.filter((event) => event.category === filters.eventType);
    }

    if (filters.fromDate) {
      const fromDate = new Date(filters.fromDate);
      filtered = filtered.filter((event) => event.date >= fromDate);
    }

    if (filters.toDate) {
      const toDate = new Date(filters.toDate);
      toDate.setHours(23, 59, 59, 999); // End of day
      filtered = filtered.filter((event) => event.date <= toDate);
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [filters]);

  // Paginate events
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEvents = filteredEvents.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleFilter = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filtering
  };

  return (
    <div className="space-y-8">
      {/* Filter */}
      <EventFilter onFilter={handleFilter} />

      {/* Event List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden divide-y divide-gray-200">
        {paginatedEvents.length > 0 ? (
          paginatedEvents.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              day={event.day}
              month={event.month}
              dayOfWeek={event.dayOfWeek}
              image={event.image}
              category={event.category}
              title={event.title}
              time={event.time}
              location={event.location}
              href={`/event/${event.id}`}
            />
          ))
        ) : (
          <div className="p-16 text-center">
            <p className="text-gray-600 text-lg">No events found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Link
              key={page}
              href={page === 1 ? "/event" : `/event?page=${page}`}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(page);
              }}
              className={`w-10 h-10 flex items-center justify-center rounded font-semibold transition-colors ${
                page === currentPage
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {page}
            </Link>
          ))}
          {currentPage < totalPages && (
            <Link
              href={`/event?page=${currentPage + 1}`}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(currentPage + 1);
              }}
              className="w-10 h-10 flex items-center justify-center rounded bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 font-semibold transition-colors"
            >
              &gt;
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

