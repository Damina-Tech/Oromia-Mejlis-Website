import Link from "next/link";
import { notFound } from "next/navigation";
import NewsSidebar from "@/components/news/NewsSidebar";
import ShareButtons from "@/components/news/ShareButtons";
import CommentForm from "@/components/news/CommentForm";
import { getArticle, getArticles } from "@/lib/strapi";

interface NewsDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Helper function to parse HTML content and extract sections
const parseContent = (htmlContent: string) => {
  // Simple parser to extract paragraphs and headings from HTML
  const paragraphs: string[] = [];
  const sections: Array<{ title: string; content: string[] }> = [];
  
  // Remove HTML tags and extract text
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

export default async function NewsDetailPage({
  params,
}: NewsDetailPageProps) {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    notFound();
  }

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Parse content
  const { paragraphs, sections } = parseContent(article.content);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Back Button */}
          <Link
            href="/news"
            className="inline-flex items-center text-blue-700 hover:text-red-600 mb-8 transition-colors"
          >
            <span className="mr-2">←</span>
            <span>Back to News</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <article className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Hero Image */}
                {article.image ? (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <div className="text-8xl opacity-50">📰</div>
                  </div>
                )}

                {/* Article Content */}
                <div className="p-8">
                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-6">
                    <span>{formatDate(article.publishedAt)}</span>
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                          {section.title}
                        </h2>
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
                        dangerouslySetInnerHTML={{ __html: article.content }}
                      />
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

