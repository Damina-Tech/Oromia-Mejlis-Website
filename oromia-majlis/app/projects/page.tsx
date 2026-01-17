import ProjectsGrid from "@/components/projects/ProjectsGrid";

export const metadata = {
  title: "Projects - Oromia Majlis",
  description: "Explore our projects and initiatives by Oromia Regional Islamic Affairs Supreme Council",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Projects
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our ongoing projects, initiatives, and programs that serve the Muslim community in the Oromia Region
            </p>
          </div>

          {/* Projects Grid with Filters */}
          <ProjectsGrid />
        </div>
      </section>
    </main>
  );
}

