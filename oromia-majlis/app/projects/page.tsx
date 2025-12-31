import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata = {
  title: "Projects Gallery - Oromia Majlis",
  description: "Explore our projects and gallery",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Projects Gallery
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our projects, initiatives, and city highlights
            </p>
          </div>

          {/* Gallery Grid with Filters */}
          <GalleryGrid />
        </div>
      </section>
    </main>
  );
}

