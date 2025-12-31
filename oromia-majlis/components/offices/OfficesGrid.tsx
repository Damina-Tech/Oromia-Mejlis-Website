"use client";

import OfficeCard from "./OfficeCard";

const offices = [
  {
    id: "agriculture",
    title: "Agriculture and Food",
    description: "City employment issue opportunities are position descriptions are listed.",
    image: "🌾",
    icon: "🌾",
  },
  {
    id: "policing",
    title: "Policing and Crime",
    description: "We differentiate ourselves from all the other organizations by the real factors.",
    image: "🚔",
    icon: "🚔",
  },
  {
    id: "park-recreation",
    title: "Park and Recreation",
    description: "City employment issue opportunities are position descriptions are listed.",
    image: "🌳",
    icon: "🌳",
  },
  {
    id: "housing",
    title: "Housing and Land",
    description: "City employment issue opportunities are position descriptions are listed.",
    image: "🏗️",
    icon: "🏗️",
  },
  {
    id: "roads-transport",
    title: "Roads and Transport",
    description: "We differentiate ourselves from all the other organizations by the real factors.",
    image: "🚌",
    icon: "🚌",
  },
  {
    id: "finance",
    title: "Finance and Economy",
    description: "We differentiate ourselves from all the other organizations by the real factors.",
    image: "💰",
    icon: "💰",
  },
];

export default function OfficesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {offices.map((office) => (
        <OfficeCard
          key={office.id}
          id={office.id}
          title={office.title}
          description={office.description}
          image={office.image}
          icon={office.icon}
          href={`/offices/${office.id}`}
        />
      ))}
    </div>
  );
}

