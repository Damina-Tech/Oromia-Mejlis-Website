"use client";

import OfficeCard from "./OfficeCard";

const offices = [
  {
    id: "religious-affairs",
    title: "Religious Affairs Department",
    description: "Overseeing religious matters, providing fatwa services, and ensuring compliance with Islamic principles and national regulations.",
    image: "⚖️",
    icon: "⚖️",
  },
  {
    id: "islamic-education",
    title: "Islamic Education & Da'wah",
    description: "Promoting Islamic education, managing religious schools, and organizing da'wah programs to enhance religious awareness.",
    image: "📚",
    icon: "📚",
  },
  {
    id: "mosque-affairs",
    title: "Mosque & Islamic Institution Affairs",
    description: "Supervision, guidance, and support for mosques and Islamic institutions across the Oromia Region.",
    image: "🕌",
    icon: "🕌",
  },
  {
    id: "zakat-charity",
    title: "Zakat & Charity Coordination",
    description: "Organizing and supervising zakat collection, sadaqah distribution, and charitable initiatives to support the needy.",
    image: "🤲",
    icon: "🤲",
  },
  {
    id: "community-services",
    title: "Community Services & Family Guidance",
    description: "Providing religious counseling, marriage guidance, and social support services for families and individuals.",
    image: "👨‍👩‍👧",
    icon: "👨‍👩‍👧",
  },
  {
    id: "hajj-umrah",
    title: "Hajj & Umrah Affairs",
    description: "Coordination, guidance, and supervision of Hajj and Umrah services for pilgrims from the Oromia Region.",
    image: "🕋",
    icon: "🕋",
  },
  {
    id: "training-capacity",
    title: "Training & Capacity Building",
    description: "Training programs for imams, scholars, and community leaders to enhance institutional capacity and religious knowledge.",
    image: "🏫",
    icon: "🏫",
  },
  {
    id: "interfaith-relations",
    title: "Interfaith & Public Relations",
    description: "Engagement with religious institutions, government bodies, and stakeholders to foster cooperation and harmony.",
    image: "🌍",
    icon: "🌍",
  },
  {
    id: "research-publications",
    title: "Research, Documentation & Publications",
    description: "Research, documentation, and publication of Islamic studies, guidelines, and official materials for the community.",
    image: "📊",
    icon: "📊",
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

