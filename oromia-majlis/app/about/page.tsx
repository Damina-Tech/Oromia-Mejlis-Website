import Link from "next/link";

const navSections = [
  { id: "mission", label: "Mission & Vision" },
  { id: "management", label: "Leadership" },
  { id: "history", label: "History" },
  { id: "activities", label: "Current Work" },
];

const missionVisionValues = [
  {
    title: "Our Mission",
    description:
      "Deliver people-centered governance that accelerates inclusive development, safeguards culture, and expands opportunity for every resident of Oromia Majlis.",
    bullets: [
      "Empower communities with transparent service delivery",
      "Invest in technology, education, and resilient infrastructure",
      "Champion sustainability across every department",
    ],
  },
  {
    title: "Our Vision",
    description:
      "A globally admired Oromia Majlis—safe, livable, digitally connected, and economically vibrant for generations to come.",
    bullets: [
      "Smart city initiatives that respect local heritage",
      "Green corridors and climate-ready neighborhoods",
      "Regional collaboration that keeps talent at home",
    ],
  },
  {
    title: "Our Values",
    description:
      "Integrity, collaboration, and courage guide our day-to-day leadership decisions and long-term strategies.",
    bullets: [
      "Integrity in public finance and procurement",
      "Collaboration with civic, religious, and private partners",
      "Courage to innovate and learn from community feedback",
    ],
  },
];

const stats = [
  { value: "62K", label: "People call Oromia Majlis home" },
  { value: "4.8K", label: "Sq. kilometers of jurisdiction" },
  { value: "32%", label: "Garden & green space coverage" },
  { value: "6th", label: "National rank for affordability" },
];

const managementTeam = [
  {
    name: "Mr. Mohammed Umar",
    role: "City Mayor",
    level: "Executive Office",
    email: "mayor@oromia.gov",
    phone: "+251 911 000 123",
  },
  {
    name: "Ms. Jemal Hassen",
    role: "Deputy Mayor, Service Delivery",
    level: "Executive Office",
    email: "deputy.sd@oromia.gov",
    phone: "+251 911 000 456",
  },
  {
    name: "Dr. Eleni Bekele",
    role: "Chief Innovation Officer",
    level: "Strategic Committee",
    email: "cio@oromia.gov",
    phone: "+251 911 000 567",
  },
  {
    name: "Mr. Lensa Abdeta",
    role: "Director, Finance & Investment",
    level: "Strategic Committee",
    email: "finance@oromia.gov",
    phone: "+251 911 000 678",
  },
  {
    name: "Ms. Rahel Fikru",
    role: "Director, Community Welfare",
    level: "Implementation Council",
    email: "community@oromia.gov",
    phone: "+251 911 000 789",
  },
  {
    name: "Mr. Adugna Daba",
    role: "Director, Infrastructure & Transport",
    level: "Implementation Council",
    email: "transport@oromia.gov",
    phone: "+251 911 000 890",
  },
];

const previousLeaders = [
  { years: "2010 - 2015", name: "Eng. Shiferaw Gurmu", role: "City Mayor" },
  { years: "2015 - 2018", name: "Ms. Almaz Gadaa", role: "Acting Mayor" },
  { years: "2018 - 2021", name: "Dr. Abdulselam Ahmed", role: "Mayor" },
];

const historyTimeline = [
  {
    year: "2005",
    title: "Founding Charter",
    description:
      "Oromia Majlis granted administrative autonomy with a population mandate of 32K residents.",
  },
  {
    year: "2012",
    title: "Digital Registry",
    description:
      "Launched one of the region's earliest e-governance registries for land, trade, and civil services.",
  },
  {
    year: "2019",
    title: "Green Mobility Plan",
    description:
      "Approved a 10-year transit and pedestrian plan linking corridors to rural cooperatives.",
  },
  {
    year: "2024",
    title: "Regional Innovation Hub",
    description:
      "Opened a civic tech campus to incubate youth-led solutions in health, finance, and agriculture.",
  },
];

const currentActivities = [
  {
    title: "Smart Infrastructure Dashboard",
    description:
      "Real-time monitoring of roads, water networks, and solid-waste routes to cut service downtime by 27%.",
  },
  {
    title: "Youth Employment Pact",
    description:
      "Partnership with technical colleges to place 1,200 graduates annually within local industries.",
  },
  {
    title: "Resilient Neighborhoods Fund",
    description:
      "Community micro-grants to upgrade drainage, plant street trees, and retrofit public markets.",
  },
  {
    title: "Open Budget Studio",
    description:
      "Quarterly town halls and dashboards so citizens can track procurement, contracts, and project delivery.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-gray-50 text-gray-900">
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-sm uppercase tracking-wide text-blue-700 font-semibold mb-2">
                Welcome to Oromia Majlis Administration
              </p>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Governance built on trust, innovation, and people-first service.
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Mayor Mohammed Umar and the City Council oversee a network of offices that champion
                inclusive growth, health, jobs, and modern infrastructure across Oromia Majlis.
              </p>
              <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700 mb-6">
                <ul className="space-y-2 list-disc pl-5">
                  <li>Creating jobs for youth and women-led enterprises</li>
                  <li>Expanding healthcare, education, and digital literacy</li>
                  <li>Promoting livable neighborhoods through green planning</li>
                  <li>Enhancing data transparency and participatory budgeting</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="bg-blue-900 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-800 transition"
                >
                  Meet the Mayor
                </Link>
                <button className="flex items-center gap-2 text-blue-900 font-semibold">
                  <span className="text-2xl">▶</span>
                  Video Intro
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80"
                  alt="Mayor Mohammed Umar"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-4 bg-white shadow-xl rounded-lg px-6 py-4">
                <p className="font-semibold">Mayor Mohammed Umar</p>
                <p className="text-sm text-gray-500">City Mayor, Oromia Majlis</p>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-4 border-t pt-6 text-sm">
            {navSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-gray-600 hover:text-blue-900 font-semibold"
              >
                {section.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="mission" className="container mx-auto px-4 py-16 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {missionVisionValues.map((item) => (
            <div key={item.title} className="bg-white rounded-2xl shadow-md p-6 space-y-4">
              <h2 className="text-2xl font-bold text-blue-900">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
              <ul className="space-y-2 text-sm text-gray-600">
                {item.bullets.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="bg-blue-900 text-white rounded-3xl p-10 grid grid-cols-2 md:grid-cols-4 gap-8 shadow-xl">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-white/80 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 items-center">
        <div>
          <p className="text-sm uppercase text-blue-700 font-semibold mb-2">CEO Message</p>
          <h2 className="text-3xl font-bold mb-4">
            “Our city thrives when leadership listens, learns, and leads together.”
          </h2>
          <p className="text-gray-600 mb-6">
            We are investing in resilient infrastructure, digitized services, and bold economic
            corridors so that families can flourish right here at home. Thank you for trusting us to
            steward public resources with care.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-semibold">
              Donate to Community Projects
            </button>
            <Link href="/contact" className="text-blue-900 font-semibold underline underline-offset-4">
              Request a Meeting
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4 border border-red-100">
          <h3 className="text-xl font-bold text-gray-900">Why donate?</h3>
          <p className="text-gray-600 text-sm">
            Every contribution strengthens schools, health posts, safe transport, and neighborhood
            innovation labs. We acknowledge donors quarterly and share transparent progress briefs.
          </p>
          <div className="bg-red-50 text-red-700 rounded-lg p-4 text-sm">
            <p>Priority Funds 2025</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Women-led market spaces</li>
              <li>Public Wi-Fi & e-learning rooms</li>
              <li>Green transit shelters</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="management" className="bg-white border-y">
        <div className="container mx-auto px-4 py-16 space-y-10">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm uppercase text-blue-700 font-semibold">Top Management</p>
            <h2 className="text-3xl font-bold mb-4">Committee & Reporting Hierarchy</h2>
            <p className="text-gray-600">
              Executive leadership sets strategy, the strategic committee drives innovation, and the
              implementation council coordinates day-to-day delivery with neighborhood offices.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {managementTeam.map((leader) => (
              <div key={leader.email} className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100">
                <p className="text-xs uppercase text-blue-700 font-semibold mb-2">{leader.level}</p>
                <h3 className="text-xl font-bold">{leader.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{leader.role}</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>{leader.email}</p>
                  <p>{leader.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="history" className="container mx-auto px-4 py-16 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-2xl font-bold mb-4">History & Milestones</h3>
            <div className="space-y-6">
              {historyTimeline.map((item) => (
                <div key={item.year} className="flex gap-4">
                  <div className="text-blue-900 font-bold text-xl">{item.year}</div>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-2xl font-bold mb-4">Previous Leadership</h3>
            <ul className="space-y-4">
              {previousLeaders.map((leader) => (
                <li key={leader.years} className="flex justify-between border-b pb-3 text-sm">
                  <div>
                    <p className="font-semibold">{leader.name}</p>
                    <p className="text-gray-500">{leader.role}</p>
                  </div>
                  <p className="text-gray-600">{leader.years}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="activities" className="bg-white">
        <div className="container mx-auto px-4 py-16 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm uppercase text-blue-700 font-semibold">Current Activities</p>
            <h2 className="text-3xl font-bold mb-4">What we are working on today</h2>
            <p className="text-gray-600">
              These initiatives translate our mission into measurable progress. Monthly dashboards
              and open forums keep residents informed.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentActivities.map((activity) => (
              <div key={activity.title} className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-gray-50">
                <h3 className="text-xl font-semibold mb-2 text-blue-900">{activity.title}</h3>
                <p className="text-sm text-gray-600">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

