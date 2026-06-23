export default function FooterContent() {
  const services = [
    "Religious Affairs Management",
    "Mosque & Islamic Institution Support",
    "Marriage & Family Guidance",
    "Zakat & Charity Coordination",
    "Community Awareness Programs",
    "Training & Capacity Building",
  ];

  const usefulLinks = [
    { name: "About Oromia Majlis", href: "/about" },
    { name: "Majlis History", href: "/about/history" },
    { name: "Offices & Departments", href: "/offices" },
    { name: "Projects & Programs", href: "/projects" },
    { name: "News & Publications", href: "/news" },
    { name: "Media & Gallery", href: "/gallery" },
  ];

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Oromia Majlis */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center text-white text-xl">
                🏛️
              </div>
              <h3 className="text-xl font-bold">Oromia Majlis</h3>
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-gray-300 mb-3">
                Oromia Regional Islamic Affairs Supreme Council
              </p>
              <p className="flex items-start gap-2">
                <span className="mt-1">📍</span>
                <span>Addis Ababa, Ethiopia</span>
              </p>
              <p className="flex items-center gap-2">
                <span>🕒</span>
                <span>Working Hours: Mon – Sat, 8:00 AM – 5:30 PM</span>
              </p>
              <p className="flex items-center gap-2">
                <span>📞</span>
                <span>Phone: +251 11 123 4567</span>
              </p>
              <p className="flex items-center gap-2">
                <span>✉️</span>
                <span>Email: info@oriasc.org</span>
              </p>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
                  >
                    <span className="text-yellow-400">&gt;</span>
                    <span>{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2 text-sm">
              {usefulLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
                  >
                    <span className="text-yellow-400">&gt;</span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: News & Updates (Newsletter) */}
          <div>
            <h3 className="text-lg font-semibold mb-4">News & Updates</h3>
            <p className="text-sm mb-4 text-gray-300">
              Stay Connected with Oromia Majlis
            </p>
            <p className="text-sm mb-4 text-gray-300">
              Receive official announcements, events, publications, and community updates directly to your inbox.
            </p>
            <form className="space-y-3 mb-6">
              <input
                type="email"
                placeholder="📧 Enter your email address"
                className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold transition-colors"
              >
                🔴 Subscribe
              </button>
            </form>
            
          </div>
        </div>
      </div>
    </div>
  );
}

