import NewsCard from "@/components/news/NewsCard";
import { getArticles } from "@/lib/strapi";
import { notFound } from "next/navigation";

export const metadata = {
  title: "News & Updates - Oromia Majlis",
  description: "Stay updated with the latest news, events, and updates from Oromia Regional Islamic Affairs Supreme Council",
};

export default async function NewsPage() {
  const articles = await getArticles();

  if (articles.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                News & Updates
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Stay informed about the latest news, events, and updates from Oromia Majlis
              </p>
            </div>
            <div className="text-center py-12">
              <p className="text-gray-600">No news articles available at this time.</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Format date for display
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

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              News & Updates
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay informed about the latest news, events, and updates from Oromia Regional Islamic Affairs Supreme Council
            </p>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <NewsCard
                key={article.id}
                id={article.slug || article.id.toString()}
                title={article.title}
                date={formatDate(article.publishedAt)}
                category={article.category}
                author={article.author}
                excerpt={article.excerpt}
                image={article.image || "📰"}
                comments={0}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

