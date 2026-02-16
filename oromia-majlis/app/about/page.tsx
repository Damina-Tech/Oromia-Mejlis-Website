"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

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
      "To serve the Muslim community by promoting authentic Islamic values, strengthening unity, and managing Islamic affairs with integrity, transparency, and excellence across the Oromia Region.",
    bullets: [
      "Promote authentic Islamic teachings and values",
      "Support mosques and Islamic institutions",
      "Enhance religious education and awareness",
    ],
    icon: "🕌",
  },
  {
    title: "Our Vision",
    description:
      "A united, educated, and prosperous Muslim community in Oromia, guided by Islamic principles and contributing positively to society.",
    bullets: [
      "Unity among Muslims across the region",
      "Excellence in Islamic education and scholarship",
      "Strong community support and social services",
    ],
    icon: "🌙",
  },
  {
    title: "Our Values",
    description:
      "Integrity, justice, unity, and service to the Ummah guide our every decision and action in managing Islamic affairs.",
    bullets: [
      "Integrity in all religious and administrative matters",
      "Justice and fairness in community services",
      "Unity and cooperation among Muslims",
    ],
    icon: "⚖️",
  },
];

const stats = [
  { value: "50k+", label: "Mosques & Islamic Centers Supported" },
  { value: "30M+", label: "Muslims Served Across Oromia" },
  { value: "100+", label: "Religious Education Programs" },
  { value: "25+", label: "Years of Service to Community" },
];

// Parse value string to number (handles K, M, +)
function parseValue(value: string): number {
  const cleanValue = value.replace(/[^0-9.KMkm]/g, "");
  const num = parseFloat(cleanValue);
  
  if (cleanValue.toLowerCase().includes("m")) {
    return num * 1000000;
  } else if (cleanValue.toLowerCase().includes("k")) {
    return num * 1000;
  }
  return num;
}

// Format number back to original format
function formatValue(value: number, original: string): string {
  const hasPlus = original.includes("+");
  const hasK = original.toLowerCase().includes("k");
  const hasM = original.toLowerCase().includes("m");
  
  if (hasM && value >= 1000000) {
    return `${(value / 1000000).toFixed(0)}M${hasPlus ? "+" : ""}`;
  } else if (hasK && value >= 1000) {
    return `${(value / 1000).toFixed(0)}K${hasPlus ? "+" : ""}`;
  } else {
    return `${Math.floor(value)}${hasPlus ? "+" : ""}`;
  }
}

// Counter component for individual statistic
function Counter({ targetValue, originalValue, label }: { targetValue: number; originalValue: string; label: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            const duration = 2000; // 2 seconds
            const startTime = Date.now();
            const startValue = 0;
            const endValue = targetValue;

            const animate = () => {
              const now = Date.now();
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              
              // Easing function (ease-out)
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const currentValue = startValue + (endValue - startValue) * easeOut;
              
              setCount(currentValue);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(endValue);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [targetValue, hasAnimated]);

  return (
    <div ref={elementRef} className="text-center group">
      <p className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
        {formatValue(count, originalValue)}
      </p>
      <p className="text-sm md:text-base text-white/90">{label}</p>
    </div>
  );
}

const managementTeam = [
  {
    name: "Sheikh Gali Muktar",
    role: "President",
    level: "Executive Council",
    email: "president@oromiamajlis.et",
    phone: "+251 9XX XXX XXX",
  },
  {
    name: "Sheikh Ahmed Mohammed",
    role: "Vice President, Religious Affairs",
    level: "Executive Council",
    email: "vpreligious@oromiamajlis.et",
    phone: "+251 9XX XXX XXX",
  },
  {
    name: "Sheikh Fatima Hassan",
    role: "Director, Islamic Education",
    level: "Strategic Committee",
    email: "education@oromiamajlis.et",
    phone: "+251 9XX XXX XXX",
  },
  {
    name: "Sheikh Omar Abdullah",
    role: "Director, Community Services",
    level: "Strategic Committee",
    email: "community@oromiamajlis.et",
    phone: "+251 9XX XXX XXX",
  },
  {
    name: "Sheikh Amina Ibrahim",
    role: "Director, Zakat & Charity",
    level: "Implementation Council",
    email: "zakat@oromiamajlis.et",
    phone: "+251 9XX XXX XXX",
  },
  {
    name: "Sheikh Yusuf Ali",
    role: "Director, Interfaith Relations",
    level: "Implementation Council",
    email: "interfaith@oromiamajlis.et",
    phone: "+251 9XX XXX XXX",
  },
];

const previousLeaders = [
  { years: "2000 - 2005", name: "Sheikh Mohammed Abdi", role: "President" },
  { years: "2005 - 2010", name: "Sheikh Hassan Ibrahim", role: "President" },
  { years: "2010 - 2015", name: "Sheikh Aisha Mohammed", role: "President" },
  { years: "2015 - 2020", name: "Sheikh Abdullah Hassan", role: "President" },
];

const historyTimeline = [
  {
    year: "1999",
    title: "Establishment",
    description:
      "Oromia Regional Islamic Affairs Supreme Council was established to oversee and manage Islamic affairs across the Oromia Region.",
  },
  {
    year: "2005",
    title: "Educational Expansion",
    description:
      "Launched comprehensive Islamic education programs and established partnerships with religious schools and institutions.",
  },
  {
    year: "2012",
    title: "Community Services",
    description:
      "Expanded community support services including Zakat distribution, marriage counseling, and social welfare programs.",
  },
  {
    year: "2020",
    title: "Digital Transformation",
    description:
      "Introduced digital services for mosque registration, event management, and online religious guidance services.",
  },
];

const currentActivities = [
  {
    title: "Religious Education Enhancement",
    description:
      "Expanding Quranic studies programs, Islamic schools, and scholarship opportunities for students across the region.",
    icon: "📚",
  },
  {
    title: "Mosque Support & Development",
    description:
      "Providing resources, training, and support to mosques and Islamic centers to strengthen community services.",
    icon: "🕌",
  },
  {
    title: "Community Welfare Programs",
    description:
      "Coordinating Zakat collection and distribution, charity initiatives, and social support for families in need.",
    icon: "🤝",
  },
  {
    title: "Interfaith Dialogue",
    description:
      "Promoting harmony and understanding through interfaith dialogue and community engagement initiatives.",
    icon: "🌍",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNIDAgMCBMIDIwMCAwIEwgMjAwIDIwMCBMIDAgMjAwIFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] bg-repeat"></div>
        </div>
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-sm uppercase tracking-wide text-red-400 font-semibold mb-3">
                Welcome to Oromia Majlis
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Serving the Muslim Community with Excellence and Integrity
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed">
                Oromia Regional Islamic Affairs Supreme Council oversees Islamic affairs, promotes authentic Islamic values, and strengthens unity among Muslims across the Oromia Region.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-sm text-white/90 mb-6 border border-white/20">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">✓</span>
                    <span>Managing Islamic affairs with transparency and integrity</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">✓</span>
                    <span>Supporting mosques and Islamic institutions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">✓</span>
                    <span>Promoting religious education and awareness</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">✓</span>
                    <span>Strengthening community unity and social services</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Contact Us
                </Link>
                <Link
                  href="/about/video"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20"
                >
                  <span className="text-xl">▶</span>
                  Video Introduction
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/4] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                  <img src="/img/InShot_4.jpg" alt="Sheikh Ghali Muktar" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-4 bg-white shadow-2xl rounded-xl px-6 py-4 transform hover:scale-105 transition-transform">
                <p className="font-bold text-gray-900">Sheikh Ghali Muktar</p>
                <p className="text-sm text-gray-600">President, Oromia Majlis</p>
              </div>
            </div>
          </div>
          {/* Navigation Links */}
          <div className="mt-12 flex flex-wrap gap-4 border-t border-white/20 pt-6">
            {navSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-white/80 hover:text-white font-semibold transition-colors hover:underline underline-offset-4"
              >
                {section.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section id="mission" className="container mx-auto px-4 py-16 space-y-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-sm uppercase text-red-600 font-semibold mb-3">Our Foundation</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Mission, Vision & Values</h2>
          <p className="text-lg text-gray-600">
            The guiding principles that shape our work and commitment to the Muslim community
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {missionVisionValues.map((item) => (
            <div
              key={item.title}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl p-8 space-y-4 transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-red-200"
            >
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h2 className="text-2xl font-bold text-blue-900 group-hover:text-red-600 transition-colors">
                {item.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
              <ul className="space-y-2 text-sm text-gray-600 pt-2">
                {item.bullets.map((point, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <span className="text-red-600 mt-1 font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Statistics */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-3xl p-10 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
          {stats.map((stat) => (
            <Counter
              key={stat.label}
              targetValue={parseValue(stat.value)}
              originalValue={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </section>

      {/* President's Message Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase text-red-600 font-semibold">President's Message</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              "Our responsibility is to serve the Ummah with wisdom, justice, and sincerity."
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We are committed to managing Islamic affairs with integrity, promoting authentic Islamic teachings, and strengthening unity among Muslims. Through transparent governance and community-focused services, we work to ensure that Islamic values guide our actions and strengthen our society.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/donate"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Support Our Work
              </Link>
              <Link
                href="/contact"
                className="text-blue-900 hover:text-red-600 font-semibold underline underline-offset-4 transition-colors"
              >
                Request a Meeting
              </Link>
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-xl p-8 space-y-4 border-2 border-red-200 transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-gray-900">Why Support Us?</h3>
            <p className="text-gray-700 leading-relaxed">
              Your contributions strengthen our mosques, support Islamic education, enable community services, and help us serve the Muslim community more effectively.
            </p>
            <div className="bg-white text-red-700 rounded-xl p-5 text-sm border border-red-200">
              <p className="font-bold mb-3">Priority Areas 2026</p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Islamic education and scholarship programs</li>
                <li>Mosque development and maintenance</li>
                <li>Community welfare and Zakat distribution</li>
                <li>Religious guidance and counseling services</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="management" className="bg-white border-y">
        <div className="container mx-auto px-4 py-16 space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm uppercase text-red-600 font-semibold mb-3">Our Leadership</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Executive Council & Committees</h2>
            <p className="text-lg text-gray-600">
              Our leadership structure ensures effective governance, strategic planning, and day-to-day management of Islamic affairs across the Oromia Region.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {managementTeam.map((leader) => (
              <div
                key={leader.email}
                className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-md hover:shadow-2xl border border-gray-100 hover:border-red-300 transition-all duration-300 transform hover:-translate-y-2"
              >
                <p className="text-xs uppercase text-red-600 font-semibold mb-3">{leader.level}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {leader.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{leader.role}</p>
                <div className="space-y-2 text-sm text-gray-600 pt-4 border-t border-gray-200">
                  <p className="flex items-center gap-2">
                    <span className="text-red-600">✉</span>
                    <span className="hover:text-red-600 transition-colors">{leader.email}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-red-600">📞</span>
                    <span>{leader.phone}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section id="history" className="container mx-auto px-4 py-16 space-y-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-sm uppercase text-red-600 font-semibold mb-3">Our Journey</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">History & Milestones</h2>
          <p className="text-lg text-gray-600">
            Key moments in our journey of serving the Muslim community
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10">
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">History & Milestones</h3>
            <div className="space-y-8">
              {historyTimeline.map((item, idx) => (
                <div
                  key={item.year}
                  className="flex gap-4 group cursor-pointer"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-700 text-white font-bold text-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      {item.year.slice(-2)}
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="font-semibold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Previous Leadership</h3>
            <ul className="space-y-4">
              {previousLeaders.map((leader) => (
                <li
                  key={leader.years}
                  className="flex justify-between items-center border-b border-gray-200 pb-4 hover:border-red-300 transition-colors group"
                >
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                      {leader.name}
                    </p>
                    <p className="text-sm text-gray-500">{leader.role}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    {leader.years}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Current Activities Section */}
      <section id="activities" className="bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 py-16 space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm uppercase text-red-600 font-semibold mb-3">Active Initiatives</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Current Activities & Programs</h2>
            <p className="text-lg text-gray-600">
              Ongoing initiatives that translate our mission into measurable impact for the Muslim community
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentActivities.map((activity, idx) => (
              <div
                key={idx}
                className="group bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:border-red-300"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 text-blue-900 group-hover:text-red-600 transition-colors">
                      {activity.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{activity.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
