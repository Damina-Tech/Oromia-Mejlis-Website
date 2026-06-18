import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject } from "@/lib/strapi";

interface ProjectDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const statusColors: Record<string, string> = {
  Ongoing: "bg-blue-600",
  Active: "bg-green-600",
  Planned: "bg-yellow-600",
  Completed: "bg-gray-600",
};

// Helper function to parse HTML content
const parseContent = (htmlContent: string) => {
  const paragraphs: string[] = [];
  const sections: Array<{ title: string; content: string[] }> = [];
  
  const textContent = htmlContent
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, (match, title) => {
      sections.push({ title: title.trim(), content: [] });
      return '';
    })
    .replace(/<p[^>]*>(.*?)<\/p>/gi, (match, content) => {
      const text = content.replace(/<[^>]+>/g, '').trim();
      if (text) {
        if (sections.length > 0) {
          sections[sections.length - 1].content.push(text);
        } else {
          paragraphs.push(text);
        }
      }
      return '';
    })
    .replace(/<ul[^>]*>(.*?)<\/ul>/gi, (match, content) => {
      const items = content.match(/<li[^>]*>(.*?)<\/li>/gi) || [];
      items.forEach((item: string) => {
        const text = item.replace(/<[^>]+>/g, '').trim();
        if (text && sections.length > 0) {
          sections[sections.length - 1].content.push(`• ${text}`);
        }
      });
      return '';
    });

  return { paragraphs, sections };
};

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  const statusColor = statusColors[project.status] || "bg-gray-600";
  const { paragraphs, sections } = parseContent(project.fullDescription || project.description);

  // Format dates
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back Button */}
          <Link
            href="/projects"
            className="inline-flex items-center text-blue-700 hover:text-red-600 mb-8 transition-colors"
          >
            <span className="mr-2">←</span>
            <span>Back to Projects</span>
          </Link>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Project Header */}
            {project.image ? (
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                <div className="text-8xl opacity-50">🏗️</div>
              </div>
            )}

            {/* Project Content */}
            <div className="p-8 md:p-12">
              {/* Header Info */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`${statusColor} text-white text-sm font-semibold px-4 py-2 rounded-full`}>
                    {project.status}
                  </span>
                  <span className="bg-gray-100 text-gray-700 text-sm font-semibold px-4 py-2 rounded-full">
                    {project.type}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {project.title}
                </h1>
                <p className="text-xl text-gray-700 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
                {project.department && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Responsible Department</h3>
                    <p className="text-gray-700">{project.department}</p>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Status</h3>
                  <p className="text-gray-700">{project.status}</p>
                </div>
                {project.startDate && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Start Date</h3>
                    <p className="text-gray-700">{formatDate(project.startDate)}</p>
                  </div>
                )}
                {project.endDate && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">End Date</h3>
                    <p className="text-gray-700">{formatDate(project.endDate)}</p>
                  </div>
                )}
              </div>

              {/* Full Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Overview</h2>
                <div className="prose prose-lg max-w-none">
                  {/* First Paragraph with Large Initial */}
                  {paragraphs.length > 0 && (
                    <div className="mb-6">
                      <p className="text-lg leading-relaxed text-gray-700 relative pl-16">
                        <span className="absolute left-0 top-0 text-7xl font-bold text-red-600 leading-none float-left mr-2">
                          {paragraphs[0][0]}
                        </span>
                        <span className="block">
                          {paragraphs[0].substring(1)}
                        </span>
                      </p>
                    </div>
                  )}

                  {/* Remaining Paragraphs */}
                  {paragraphs.slice(1).map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-lg leading-relaxed text-gray-700 mb-6"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {/* Sections */}
                  {sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {section.title}
                      </h3>
                      {section.content.map((content, paraIndex) => (
                        <p
                          key={paraIndex}
                          className="text-lg leading-relaxed text-gray-700 mb-4"
                        >
                          {content}
                        </p>
                      ))}
                    </div>
                  ))}

                  {/* Render HTML content if sections/paragraphs are empty */}
                  {paragraphs.length === 0 && sections.length === 0 && (
                    <div
                      className="text-lg leading-relaxed text-gray-700 prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: project.fullDescription || project.description }}
                    />
                  )}
                </div>
              </div>

              {/* Objectives and Outcomes */}
              {(project.objectives || project.outcomes) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {project.objectives && (
                    <div className="p-6 bg-blue-50 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Objectives</h3>
                      <div
                        className="text-gray-700 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: project.objectives }}
                      />
                    </div>
                  )}
                  {project.outcomes && (
                    <div className="p-6 bg-green-50 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Expected Outcomes</h3>
                      <div
                        className="text-gray-700 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: project.outcomes }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Contact / Volunteer CTA */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Get Involved
                </h3>
                <p className="text-gray-700 mb-6">
                  Interested in learning more about this project or getting involved? Contact us for more information.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="/contact"
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-md transition-colors inline-block"
                  >
                    Contact Us
                  </a>
                  <a
                    href="/contact"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-8 py-3 rounded-md transition-colors inline-block"
                  >
                    Volunteer
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

