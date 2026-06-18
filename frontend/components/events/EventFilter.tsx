"use client";

import { useState } from "react";

interface EventFilterProps {
  onFilter: (filters: {
    fromDate?: string;
    toDate?: string;
    eventType?: string;
  }) => void;
}

const eventTypes = [
  "All Event Type",
  "Conference",
  "Religious",
  "Workshop",
  "Community Service",
  "Education",
  "Culture",
];

export default function EventFilter({ onFilter }: EventFilterProps) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [eventType, setEventType] = useState("All Event Type");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({
      fromDate: fromDate || undefined,
      toDate: toDate || undefined,
      eventType: eventType === "All Event Type" ? undefined : eventType,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* From Date */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2.5">
            From
          </label>
          <div className="relative">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 pr-10 transition-colors"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
              📅
            </span>
          </div>
        </div>

        {/* To Date */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2.5">
            To
          </label>
          <div className="relative">
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 pr-10 transition-colors"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
              📅
            </span>
          </div>
        </div>

        {/* Event Type */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2.5">
            Event Type
          </label>
          <div className="relative">
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 appearance-none bg-white transition-colors"
            >
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
              ▼
            </span>
          </div>
        </div>

        {/* Find Event Button */}
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-2.5 rounded-md transition-colors whitespace-nowrap shadow-md hover:shadow-lg"
          >
            Find Event
          </button>
        </div>
      </form>
    </div>
  );
}

