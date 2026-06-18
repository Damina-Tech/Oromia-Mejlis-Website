export interface MajlisDocument {
  id: number;
  name: string;
  date: string;
  category: string;
  description: string;
}

export const majlisDocuments: MajlisDocument[] = [
  {
    id: 1,
    name: "Islamic Affairs Management Guidelines",
    date: "2025-12-15",
    category: "Policy",
    description:
      "Official framework for governance, administration, and compliance for Islamic affairs institutions across Oromia.",
  },
  {
    id: 2,
    name: "Mosque Registration Application",
    date: "2025-11-20",
    category: "Form",
    description:
      "Application document for new mosque registration, licensing requirements, and approval workflow.",
  },
  {
    id: 3,
    name: "Annual Religious Education Report",
    date: "2025-10-10",
    category: "Report",
    description:
      "Annual summary of religious education initiatives, program impact, and institutional performance metrics.",
  },
  {
    id: 4,
    name: "Zakat & Charity Distribution Policy",
    date: "2025-09-05",
    category: "Policy",
    description:
      "Guidance on collection, eligibility, transparent allocation, and monitoring of Zakat and charity resources.",
  },
];

