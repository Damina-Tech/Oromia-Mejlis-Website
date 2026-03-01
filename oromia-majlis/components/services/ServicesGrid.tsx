"use client";

import ServiceCard from "./ServiceCard";

// Demo services data - matching the slugs in the detail page
const demoServices = [
  {
    id: 0,
    icon: "✅",
    title: "Halal Certification Services",
    description: "Apply online for Halal Certification through Oromia Majlis HRMS and follow your approval workflow.",
    slug: "halal-certification",
    href: "/services/halal-certification",
  },
  {
    id: 11,
    icon: "🪪",
    title: "Membership Certificate",
    description:
      "Apply online for a Membership Certificate by selecting a monthly, quarterly, or yearly plan, paying the fee, and receiving your certificate.",
    slug: "membership-certificate",
    href: "/services/membership-certificate",
  },
  {
    id: 1,
    icon: "🕋",
    title: "Hajj & Umrah Affairs",
    description: "Coordination, guidance, and supervision of Hajj and Umrah services for pilgrims from the Oromia Region.",
    slug: "hajj-umrah-affairs",
  },
  {
    id: 2,
    icon: "🕌",
    title: "Mosque & Islamic Institution Affairs",
    description: "Supervision, guidance, and support for mosques and Islamic institutions across the Oromia Region.",
    slug: "mosque-islamic-institution-affairs",
  },
  {
    id: 3,
    icon: "📖",
    title: "Islamic Education & Da'wah",
    description: "Promotion of Islamic education, religious awareness programs, and authentic da'wah activities.",
    slug: "islamic-education-dawah",
  },
  {
    id: 4,
    icon: "🤲",
    title: "Zakat, Sadaqah & Charity Coordination",
    description: "Organizing and supervising zakat, sadaqah, and charitable initiatives to support the needy.",
    slug: "zakat-sadaqah-charity-coordination",
  },
  {
    id: 5,
    icon: "👨‍👩‍👧",
    title: "Marriage & Family Guidance",
    description: "Religious guidance and counseling on marriage, family life, and social responsibility.",
    slug: "marriage-family-guidance",
  },
  {
    id: 6,
    icon: "⚖️",
    title: "Religious Affairs & Fatwa Services",
    description: "Providing guidance on religious matters in accordance with Islamic principles and national regulations.",
    slug: "religious-affairs-fatwa-services",
  },
  {
    id: 7,
    icon: "🏫",
    title: "Training & Capacity Building",
    description: "Training programs for imams, scholars, and community leaders to enhance institutional capacity.",
    slug: "training-capacity-building",
  },
  {
    id: 8,
    icon: "🤝",
    title: "Community Peace & Social Harmony",
    description: "Promoting unity, peaceful coexistence, dialogue, and conflict resolution within communities.",
    slug: "community-peace-social-harmony",
  },
  {
    id: 9,
    icon: "📊",
    title: "Research, Documentation & Publications",
    description: "Research, documentation, and publication of Islamic studies, guidelines, and official materials.",
    slug: "research-documentation-publications",
  },
  {
    id: 10,
    icon: "🌍",
    title: "Interfaith & Public Relations",
    description: "Engagement with religious institutions, government bodies, and stakeholders to foster cooperation.",
    slug: "interfaith-public-relations",
  },
];

export default function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {demoServices.map((service) => (
        <ServiceCard
          key={service.id}
          icon={service.icon}
          title={service.title}
          description={service.description}
          href={service.href || `/services/${service.slug}`}
        />
      ))}
    </div>
  );
}
