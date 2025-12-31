"use client";

import Link from "next/link";

const services = [
  {
    title: "Service Departments",
    image: "🏢",
    href: "/departments",
  },
  {
    title: "City Visitors Guide",
    image: "👥",
    href: "/visitors",
  },
  {
    title: "Administrations",
    image: "🚐",
    href: "/administrations",
  },
];

export default function LocalServicesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-0">
            Let&apos;s explore local services, programs & initiatives.
          </h2>
          <Link
            href="/services"
            className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-md transition-colors whitespace-nowrap"
          >
            Explore Services
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <div className="text-8xl opacity-50 group-hover:opacity-70 transition-opacity">
                  {service.image}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-xl font-bold text-white">{service.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

