/**
 * Shared leadership data for About and Biography pages.
 */

export interface LeadershipMember {
  name: string;
  role: string;
  level: string;
  email: string;
  phone: string;
  image: string;
}

export const managementTeam: LeadershipMember[] = [
  {
    name: "Sheik Gali Muktar Abbadura",
    role: "Oromia Majlis President",
    level: "Executive Council",
    email: "president@oromiamajlis.et",
    phone: "+251 9XX XXX XXX",
    image: "/img/sheik gali.jpg",
  },
  {
    name: "Sheik Muhamadnur Ahimad Musa",
    role: "First Vice-President of the Majlis",
    level: "Executive Council",
    email: "vicepresident@oromiamajlis.et",
    phone: "+251 9XX XXX XXX",
    image: "/img/sheik Muhammadnur.jpg",
  },
  {
    name: "Sheik Tajudin Kadir",
    role: "Vice-President of the Majlis",
    level: "Executive Council",
    email: "vp@oromiamajlis.et",
    phone: "+251 9XX XXX XXX",
    image: "/img/sheik Tajudin.jpg",
  },
  {
    name: "Dr Mohamad Hakim",
    role: "General Secretary of the Majlis",
    level: "Executive Council",
    email: "secretary@oromiamajlis.et",
    phone: "+251 9XX XXX XXX",
    image: "/img/dr Mohamad.jpg",
  },
  {
    name: "Sheik Jemal Haji",
    role: "Director of Da'awa and Faith",
    level: "Strategic Committee",
    email: "dawah@oromiamajlis.et",
    phone: "+251 9XX XXX XXX",
    image: "/img/Shey jemal haji.jpg",
  },
  {
    name: "Gurmessa Milki",
    role: "Communication & IT Director",
    level: "Strategic Committee",
    email: "communication@oromiamajlis.et",
    phone: "+251 9XX XXX XXX",
    image: "/img/Gurmessa.jpg",
  },
];

/** Generate URL slug from leader name */
export function getLeaderSlug(leader: LeadershipMember): string {
  return leader.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/** Find leader by URL slug */
export function getLeaderBySlug(slug: string): LeadershipMember | undefined {
  return managementTeam.find((leader) => getLeaderSlug(leader) === slug);
}
