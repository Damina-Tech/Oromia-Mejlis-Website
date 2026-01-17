"use client";

const servicesLeft = [
  "Mosque Registration",
  "Marriage Certificate",
  "Religious Education Programs",
  "Zakat & Charity Services",
  "Islamic Guidance & Counseling",
  "Hajj & Umrah Services",
];

const servicesRight = [
  "Quranic Studies Registration",
  "Islamic Event Permits",
  "Religious Scholar Certification",
  "Community Support Programs",
  "Interfaith Dialogue Services",
  "Islamic Publications Request",
];

export default function OnlineServicesSection() {
  return (
    <section className="py-16 bg-blue-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore Online Services & Resources
            </h2>
            <p className="text-lg text-white/90">
              Oromia Majlis provides a wide range of online services to support the Muslim community and manage Islamic affairs efficiently.
            </p>
          </div>

          {/* Right Column - Two Sub-columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              {servicesLeft.map((service, index) => (
                <a
                  key={index}
                  href={`/services/${service.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors group"
                >
                  <span className="text-white/90 group-hover:text-white">
                    {service}
                  </span>
                  <span className="text-yellow-400 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </a>
              ))}
            </div>
            <div className="space-y-3">
              {servicesRight.map((service, index) => (
                <a
                  key={index}
                  href={`/services/${service.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors group"
                >
                  <span className="text-white/90 group-hover:text-white">
                    {service}
                  </span>
                  <span className="text-yellow-400 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

