import NewsCard from "@/components/news/NewsCard";

const newsItems = [
  {
    id: "1",
    title: "Welcome to Chiro City",
    date: "August 4, 2025",
    category: "Uncategorized",
    author: "admin",
    excerpt:
      "Discover the vibrant city of Chiro, a place of opportunity, growth, and community spirit. Learn about our initiatives, services, and the people who make our city great.",
    image: "🏙️",
    comments: 0,
  },
  {
    id: "2",
    title: "Chiro City Is The Capital City Of West Hararghe",
    date: "August 4, 2025",
    category: "Uncategorized",
    author: "admin",
    excerpt:
      "Chiro City stands as the proud capital of West Hararghe, serving as a hub for commerce, culture, and administration in the region.",
    image: "🌆",
    comments: 0,
  },
  {
    id: "3",
    title: "List Of City Weekend Celebrations",
    date: "July 31, 2025",
    category: "Events",
    author: "admin",
    excerpt:
      "Join us for exciting weekend celebrations throughout the city. From cultural festivals to community gatherings, there's something for everyone.",
    image: "🎉",
    comments: 0,
  },
  {
    id: "4",
    title: "Welcome to Vist Us",
    date: "August 4, 2025",
    category: "Uncategorized",
    author: "admin",
    excerpt:
      "We invite you to visit our city and experience the warmth of our community, the beauty of our landscapes, and the opportunities we offer.",
    image: "👋",
    comments: 0,
  },
];

export const metadata = {
  title: "News & Updates - Oromia Majlis",
  description: "Stay updated with the latest news and updates from Oromia Majlis",
};

export default function NewsPage() {
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
              Stay informed about the latest news, events, and updates from our
              city administration
            </p>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <NewsCard
                key={item.id}
                id={item.id}
                title={item.title}
                date={item.date}
                category={item.category}
                author={item.author}
                excerpt={item.excerpt}
                image={item.image}
                comments={item.comments}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

