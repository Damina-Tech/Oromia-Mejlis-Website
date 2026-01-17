import OfficesGrid from "@/components/offices/OfficesGrid";
import Pagination from "@/components/offices/Pagination";

export const metadata = {
  title: "Offices & Departments - Oromia Majlis",
  description: "Explore our offices and departments",
};

export default function OfficesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Offices & Departments
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our departments and offices dedicated to managing Islamic affairs and serving the Muslim community across the Oromia Region
            </p>
          </div>

          {/* Offices Grid */}
          <OfficesGrid />

          {/* Pagination */}
          <Pagination currentPage={1} totalPages={1} />
        </div>
      </section>
    </main>
  );
}

