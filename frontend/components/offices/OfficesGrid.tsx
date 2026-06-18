"use client";

import OfficeCard from "./OfficeCard";

const offices = [
  {
    id: "halal-services",
    title: "Halal Services Department",
    description: "End-to-end support for Halal certification: registration, compliance, inspection, and follow-up.",
    image: "✅",
    icon: "✅",
    href: "/offices/halal-services",
  },
  {
    id: "organizational-structure-institutional",
    title: "Organizational Structure and Institutional Department",
    description: "Oversight of organizational design, bylaws, and institutional framework for effective governance.",
    image: "🏛️",
    icon: "🏛️",
    href: "/offices/organizational-structure-institutional",
  },
  {
    id: "finance-resource-administration",
    title: "Finance and Resource Administration Department",
    description: "Financial operations, budgeting, procurement, and resource allocation with transparency and accountability.",
    image: "💰",
    icon: "💰",
    href: "/offices/finance-resource-administration",
  },
  {
    id: "audit-inspection",
    title: "Audit and Inspection Department",
    description: "Internal audit, compliance checks, and inspections to ensure accountability and good governance.",
    image: "📋",
    icon: "📋",
    href: "/offices/audit-inspection",
  },
  {
    id: "education-training",
    title: "Education and Training Department",
    description: "Islamic and professional education and training for imams, teachers, and staff across the region.",
    image: "📚",
    icon: "📚",
    href: "/offices/education-training",
  },
  {
    id: "dawah-guidance-irshad",
    title: "Da'wah and Guidance (Irshad) Department",
    description: "Da'wah activities, religious guidance, and outreach to strengthen faith and practice.",
    image: "🕌",
    icon: "🕌",
    href: "/offices/dawah-guidance-irshad",
  },
  {
    id: "fatwa-islamic-research",
    title: "Fatwa and Islamic Research Department",
    description: "Religious rulings (fatwas) and Islamic research in accordance with recognized scholarship.",
    image: "⚖️",
    icon: "⚖️",
    href: "/offices/fatwa-islamic-research",
  },
  {
    id: "mosques-awqaf-heritage",
    title: "Mosques, Awqaf, and Islamic Heritage Administration Department",
    description: "Supervision of mosques, awqaf, and Islamic heritage sites; preservation and proper administration.",
    image: "🕋",
    icon: "🕋",
    href: "/offices/mosques-awqaf-heritage",
  },
  {
    id: "zakat-administration-development",
    title: "Zakat Administration and Development Department",
    description: "Collection, distribution, and development use of zakat in line with Sharia and transparency.",
    image: "🤲",
    icon: "🤲",
    href: "/offices/zakat-administration-development",
  },
  {
    id: "social-affairs-islamic-associations",
    title: "Social Affairs and Islamic Associations Department",
    description: "Social programs, family support, and coordination with Islamic associations and civil society.",
    image: "👨‍👩‍👧",
    icon: "👨‍👩‍👧",
    href: "/offices/social-affairs-islamic-associations",
  },
  {
    id: "income-development",
    title: "Income and Development Department",
    description: "Sharia-compliant income generation and development projects for institutional sustainability.",
    image: "📈",
    icon: "📈",
    href: "/offices/income-development",
  },
  {
    id: "hajj-umrah-services",
    title: "Hajj and Umrah Services Department",
    description: "Coordination and supervision of Hajj and Umrah services for pilgrims from the Oromia Region.",
    image: "🕋",
    icon: "🕋",
    href: "/offices/hajj-umrah-services",
  },
  {
    id: "legal-services",
    title: "Legal Services Department",
    description: "Legal advice, contract review, and representation in compliance with Ethiopian law.",
    image: "⚖️",
    icon: "⚖️",
    href: "/offices/legal-services",
  },
  {
    id: "security-public-relations",
    title: "Security and Public Relations Department",
    description: "Security of premises and events; relations with the public, government, and stakeholders.",
    image: "🛡️",
    icon: "🛡️",
    href: "/offices/security-public-relations",
  },
  {
    id: "communications",
    title: "Communications Department",
    description: "Media relations, content, and digital channels to inform the community and present the Council's work.",
    image: "📢",
    icon: "📢",
    href: "/offices/communications",
  },
  {
    id: "study-research-policy",
    title: "Study, Research, and Policy Department",
    description: "Studies, research, and policy advice on Islamic affairs and issues affecting the Muslim community.",
    image: "📊",
    icon: "📊",
    href: "/offices/study-research-policy",
  },
  {
    id: "youth-womens-council",
    title: "Youth and Women's Council Department",
    description: "Empowerment and participation of youth and women in Oromia Majlis and the Muslim community.",
    image: "🌟",
    icon: "🌟",
    href: "/offices/youth-womens-council",
  },
  {
    id: "it-digital-services",
    title: "Information Technology (IT) and Digital Services Department",
    description: "IT infrastructure, digital systems, and online services for efficiency and accessibility.",
    image: "💻",
    icon: "💻",
    href: "/offices/it-digital-services",
  },
];

export default function OfficesGrid() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-9 lg:grid-cols-3 lg:gap-10">
      {offices.map((office) => (
        <OfficeCard
          key={office.id}
          id={office.id}
          title={office.title}
          description={office.description}
          image={office.image}
          icon={office.icon}
          href={office.href || `/offices/${office.id}`}
        />
      ))}
    </div>
  );
}
