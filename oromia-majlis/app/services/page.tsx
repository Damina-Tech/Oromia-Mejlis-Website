import ServicesGrid from "@/components/services/ServicesGrid";

export const metadata = {
  title: "Services - Oromia Majlis",
  description: "Find government services and information",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Page Header Section */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Find Government Services and Information
            </h1>
            <p className="text-lg text-gray-600">
              We are offering the following information&apos;s about us that what
              we actually.
            </p>
          </div>

          {/* Services Grid */}
          <ServicesGrid />
        </div>
      </section>
    </main>
  );
}

