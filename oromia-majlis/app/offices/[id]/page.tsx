import Link from "next/link";
import { notFound } from "next/navigation";

interface DepartmentDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Sample department data - same for all departments for now
const departmentData = {
  name: "Department Name",
  head: {
    name: "Dr. Mohammed Umar",
    title: "Department Head",
    image: "👤",
  },
  information: {
    description:
      "This department is dedicated to serving the community with excellence and commitment. We work tirelessly to ensure that all citizens receive the highest quality of service and support.",
    mission:
      "Our mission is to provide efficient, transparent, and accessible services to all members of our community while maintaining the highest standards of professionalism and integrity.",
    vision:
      "To be a leading department that sets the standard for public service excellence and community engagement.",
  },
  message: {
    title: "Message from the Department Head",
    content:
      "Welcome to our department. We are committed to serving you with dedication and excellence. Our team works hard every day to ensure that your needs are met and that you receive the best possible service. We value your feedback and are always looking for ways to improve our services. Thank you for trusting us with your needs.",
  },
  contact: {
    phone: "+251911111111",
    email: "info@oromiamajlis.com",
    address: "95 FF3, App Street Avenue NSW 96209, Canada",
    hours: "Mon - Fri: 8:00 am - 6:00 pm",
  },
  services: [
    "Service delivery and support",
    "Community engagement programs",
    "Information and resource access",
    "Public consultation services",
    "Policy development and implementation",
  ],
};

const departmentNames: Record<string, string> = {
  agriculture: "Agriculture and Food",
  policing: "Policing and Crime",
  "park-recreation": "Park and Recreation",
  housing: "Housing and Land",
  "roads-transport": "Roads and Transport",
  finance: "Finance and Economy",
};

export default async function DepartmentDetailPage({
  params,
}: DepartmentDetailPageProps) {
  const { id } = await params;
  const departmentName = departmentNames[id];

  if (!departmentName) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back Button */}
          <Link
            href="/offices"
            className="inline-flex items-center text-blue-700 hover:text-red-600 mb-8 transition-colors"
          >
            <span className="mr-2">←</span>
            <span>Back to Offices</span>
          </Link>

          {/* Department Header */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {departmentName}
            </h1>
            <p className="text-lg text-gray-600">
              {departmentData.information.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Department Head */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Department Head
                </h2>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="text-6xl">{departmentData.head.image}</div>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {departmentData.head.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{departmentData.head.title}</p>
                    <p className="text-gray-700">
                      Leading the department with vision and dedication to serve
                      the community.
                    </p>
                  </div>
                </div>
              </div>

              {/* Department Information */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Department Information
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Mission
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {departmentData.information.mission}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Vision
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {departmentData.information.vision}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message from Department Head */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {departmentData.message.title}
                </h2>
                <div className="border-l-4 border-red-600 pl-6">
                  <p className="text-gray-700 leading-relaxed italic">
                    {departmentData.message.content}
                  </p>
                  <p className="text-gray-600 mt-4 font-semibold">
                    — {departmentData.head.name}
                  </p>
                </div>
              </div>

              {/* Services */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Our Services
                </h2>
                <ul className="space-y-3">
                  {departmentData.services.map((service, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-red-600 font-bold mt-1">•</span>
                      <span className="text-gray-700">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 text-xl">📞</span>
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <p className="text-gray-600">{departmentData.contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 text-xl">✉️</span>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <p className="text-gray-600">{departmentData.contact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 text-xl">📍</span>
                    <div>
                      <p className="font-semibold text-gray-900">Address</p>
                      <p className="text-gray-600">{departmentData.contact.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 text-xl">🕐</span>
                    <div>
                      <p className="font-semibold text-gray-900">Office Hours</p>
                      <p className="text-gray-600">{departmentData.contact.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Quick Links
                </h2>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/services"
                      className="text-blue-700 hover:text-red-600 transition-colors"
                    >
                      Services →
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/news"
                      className="text-blue-700 hover:text-red-600 transition-colors"
                    >
                      News & Updates →
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-blue-700 hover:text-red-600 transition-colors"
                    >
                      Contact Us →
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

