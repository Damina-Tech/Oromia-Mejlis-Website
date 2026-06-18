import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata = {
  title: "Gallery - Oromia Majlis",
  description: "Explore our gallery of images showcasing the activities, events, and initiatives of Oromia Regional Islamic Affairs Supreme Council",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Gallery
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our gallery showcasing the activities, events, and initiatives of Oromia Regional Islamic Affairs Supreme Council
            </p>
          </div>

          {/* Gallery Grid with Filters */}
          <GalleryGrid />
        </div>
      </section>
    </main>
  );
}

