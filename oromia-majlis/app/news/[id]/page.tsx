import Link from "next/link";
import { notFound } from "next/navigation";
import NewsSidebar from "@/components/news/NewsSidebar";
import ShareButtons from "@/components/news/ShareButtons";
import CommentForm from "@/components/news/CommentForm";

interface NewsDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const newsArticles: Record<
  string,
  {
    title: string;
    date: string;
    category: string;
    author: string;
    image: string;
    content: string[];
    sections: Array<{
      title: string;
      content: string[];
      images?: string[];
    }>;
    quote?: {
      text: string;
      author: string;
    };
  }
> = {
  "1": {
    title: "Welcome to Chiro City",
    date: "August 4, 2025",
    category: "Uncategorized",
    author: "admin",
    image: "🛣️",
    content: [
      "Welcome to Chiro City, a vibrant community dedicated to progress, innovation, and the well-being of all our residents. Our city administration works tirelessly to provide excellent services, maintain infrastructure, and create opportunities for growth and development.",
      "As you explore our website, you'll discover the many services we offer, the departments that serve you, and the projects that shape our city's future. We are committed to transparency, accessibility, and responsive governance.",
    ],
    sections: [
      {
        title: "1. City Roadmaps and Traffic Details:",
        content: [
          "Our city has implemented comprehensive roadmaps to improve traffic flow and transportation infrastructure. We understand that efficient transportation is crucial for economic development and quality of life.",
          "We have invested in modern traffic management systems, road maintenance programs, and public transportation initiatives. These efforts ensure that residents and visitors can move safely and efficiently throughout our city.",
        ],
        images: ["🚇", "🚇"],
      },
      {
        title: "2. Necessary Things Need Control Traffic:",
        content: [
          "Effective traffic control requires careful planning, modern technology, and community cooperation. We have implemented various measures including traffic signal optimization, road widening projects, and public awareness campaigns.",
          "Our traffic management team works around the clock to monitor conditions, respond to incidents, and ensure smooth flow. We also encourage residents to use public transportation and alternative modes of travel to reduce congestion.",
        ],
      },
      {
        title: "3. Design and Development Updates:",
        content: [
          "Our city continues to evolve with new developments and improvements. We focus on sustainable growth, preserving our cultural heritage while embracing modern solutions.",
          "Recent development projects include new residential areas, commercial districts, parks, and community facilities. Each project is designed with community input and environmental considerations in mind.",
        ],
      },
    ],
    quote: {
      text: "EGovt is a feature rich design theme that made launching your website inventions off the ground dead simple.",
      author: "Carnee Simmons, Mayor",
    },
  },
  "2": {
    title: "Chiro City Is The Capital City Of West Hararghe",
    date: "August 4, 2025",
    category: "Uncategorized",
    author: "admin",
    image: "🌆",
    content: [
      "Chiro City proudly serves as the capital of West Hararghe, playing a central role in regional administration, commerce, and cultural activities. Our strategic location and rich history make us a hub for development and progress.",
    ],
    sections: [],
  },
  "3": {
    title: "List Of City Weekend Celebrations",
    date: "July 31, 2025",
    category: "Events",
    author: "admin",
    image: "🎉",
    content: [
      "Join us for exciting weekend celebrations throughout the city. From cultural festivals to community gatherings, there's something for everyone.",
    ],
    sections: [],
  },
  "4": {
    title: "Welcome to Vist Us",
    date: "August 4, 2025",
    category: "Uncategorized",
    author: "admin",
    image: "👋",
    content: [
      "We invite you to visit our city and experience the warmth of our community, the beauty of our landscapes, and the opportunities we offer.",
    ],
    sections: [],
  },
};

export default async function NewsDetailPage({
  params,
}: NewsDetailPageProps) {
  const { id } = await params;
  const article = newsArticles[id];

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <article className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Hero Image */}
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <div className="text-8xl opacity-50">{article.image}</div>
                </div>

                {/* Article Content */}
                <div className="p-8">
                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-6">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span className="text-blue-700">In {article.category}</span>
                    <span>•</span>
                    <span>By {article.author}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span>💬</span>
                      <span>0</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    {article.title}
                  </h1>

                  {/* Article Body */}
                  <div className="prose prose-lg max-w-none">
                    {/* First Paragraph with Large Initial */}
                    {article.content.length > 0 && (
                      <div className="mb-6">
                        <p className="text-lg leading-relaxed text-gray-700 relative pl-16">
                          <span className="absolute left-0 top-0 text-7xl font-bold text-red-600 leading-none float-left mr-2">
                            {article.content[0][0]}
                          </span>
                          <span className="block">
                            {article.content[0].substring(1)}
                          </span>
                        </p>
                      </div>
                    )}

                    {/* Remaining Content */}
                    {article.content.slice(1).map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-lg leading-relaxed text-gray-700 mb-6"
                      >
                        {paragraph}
                      </p>
                    ))}

                    {/* Sections */}
                    {article.sections.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                          {section.title}
                        </h2>
                        {section.content.map((paragraph, paraIndex) => (
                          <p
                            key={paraIndex}
                            className="text-lg leading-relaxed text-gray-700 mb-4"
                          >
                            {paragraph}
                          </p>
                        ))}
                        {section.images && (
                          <div className="grid grid-cols-2 gap-4 my-6">
                            {section.images.map((img, imgIndex) => (
                              <div
                                key={imgIndex}
                                className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center"
                              >
                                <div className="text-5xl opacity-50">{img}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Blockquote */}
                    {article.quote && (
                      <blockquote className="border-l-4 border-blue-600 pl-6 py-4 my-8 bg-blue-50 rounded-r-lg">
                        <p className="text-lg text-blue-900 mb-2">
                          &quot;{article.quote.text}&quot;
                        </p>
                        <cite className="text-blue-800 font-semibold">
                          - {article.quote.author}
                        </cite>
                      </blockquote>
                    )}
                  </div>

                  {/* Share Buttons */}
                  <ShareButtons />

                  {/* Comment Form */}
                  <CommentForm />
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <NewsSidebar />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

