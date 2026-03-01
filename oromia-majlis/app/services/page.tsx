import ServicesGrid from "@/components/services/ServicesGrid";

export const metadata = {
  title: "Services - Oromia Majlis",
  description:
    "Religious, educational, and community services provided by the Oromia Regional Islamic Affairs Supreme Council",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Page Header Section */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Services
            </h1>
            <p className="text-lg text-gray-600">
              Oromia Majlis provides a variety of services to the community, including Halal Certification for businesses and Membership Certificate application services for the Muslim community.
            </p>
          </div>

          {/* Services Grid */}
          <ServicesGrid />
        </div>
      </section>
    </main>
  );
}
