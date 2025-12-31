const statistics = [
  {
    value: "2M+",
    label: "Total People lived in our city.",
  },
  {
    value: "4.8K",
    label: "Square kilometres region covers.",
  },
  {
    value: "32%",
    label: "Private & domestic garden land.",
  },
  {
    value: "2th",
    label: "Average Costs of Home Ownership.",
  },
];

export default function StatisticsSection() {
  return (
    <section className="py-16 bg-blue-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/5 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <div className="text-5xl md:text-6xl font-bold text-yellow-400 mb-4">
                {stat.value}
              </div>
              <p className="text-lg text-white/90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

