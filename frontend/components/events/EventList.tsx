"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { getEvents, Event } from "@/lib/strapi";
import EventCard from "./EventCard";
import EventFilter from "./EventFilter";

const ITEMS_PER_PAGE = 8;

// Helper function to format date
const formatEventDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'long' }).toUpperCase();
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  return { day, month, dayOfWeek, date };
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

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<{
    fromDate?: string;
    toDate?: string;
    eventType?: string;
  }>({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events
  const filteredEvents = useMemo(() => {
    let filtered = [...events];

    if (filters.eventType) {
      filtered = filtered.filter((event) => event.category === filters.eventType);
    }

    if (filters.fromDate) {
      const fromDate = new Date(filters.fromDate);
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.startDate);
        return eventDate >= fromDate;
      });
    }

    if (filters.toDate) {
      const toDate = new Date(filters.toDate);
      toDate.setHours(23, 59, 59, 999); // End of day
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.startDate);
        return eventDate <= toDate;
      });
    }

    // Sort by date (upcoming first)
    return filtered.sort((a, b) => {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      return dateA - dateB;
    });
  }, [events, filters]);

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

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        <p className="mt-4 text-gray-600">Loading events...</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No events available at this time.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Filter */}
      <EventFilter onFilter={handleFilter} />

      {/* Event List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden divide-y divide-gray-200">
        {paginatedEvents.length > 0 ? (
          paginatedEvents.map((event) => {
            const { day, month, dayOfWeek } = formatEventDate(event.startDate);
            const time = formatEventTime(event.startDate, event.endDate);
            
            return (
              <EventCard
                key={event.id}
                id={event.slug || event.id.toString()}
                day={day}
                month={month}
                dayOfWeek={dayOfWeek}
                image={event.image || "📅"}
                category={event.category}
                title={event.title}
                time={time}
                location={event.location}
                href={`/event/${event.slug || event.id}`}
              />
            );
          })
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
