"use client";

import ServiceCard from "./ServiceCard";

const services = [
  {
    icon: "✈️",
    title: "Travel & Immigration",
    description:
      "City employment issue opportunities are position descriptions are listed.",
    href: "/services/travel-immigration",
  },
  {
    icon: "🏛️",
    title: "Your Government",
    description:
      "Access government services, information, and resources for citizens and residents.",
    href: "/services/government",
  },
  {
    icon: "❤️",
    title: "Health and Securities",
    description:
      "Healthcare services, public health information, and security resources.",
    href: "/services/health-security",
  },
  {
    icon: "💼",
    title: "Jobs and Unemployment",
    description:
      "Find employment opportunities, job listings, and unemployment assistance programs.",
    href: "/services/jobs",
  },
  {
    icon: "🏭",
    title: "Business and Industry",
    description:
      "Business registration, permits, licenses, and support for entrepreneurs.",
    href: "/services/business",
  },
  {
    icon: "🌳",
    title: "Culture & Recreation",
    description:
      "Cultural events, recreational facilities, parks, and community programs.",
    href: "/services/culture",
  },
  {
    icon: "🚌",
    title: "Roads & Transportation",
    description:
      "Public transportation, road maintenance, traffic information, and permits.",
    href: "/services/transportation",
  },
  {
    icon: "⚖️",
    title: "Justice, Safety and the law",
    description:
      "Legal services, safety resources, law enforcement, and justice system information.",
    href: "/services/justice",
  },
  {
    icon: "📚",
    title: "Education and skills",
    description:
      "Educational programs, skill development, training opportunities, and resources.",
    href: "/services/education",
  },
];

export default function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          icon={service.icon}
          title={service.title}
          description={service.description}
          href={service.href}
        />
      ))}
    </div>
  );
}

