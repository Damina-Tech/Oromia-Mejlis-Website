export default function FooterContent() {
  const serviceLinks = [
    "Apply for a City Job",
    "Request a 311 Service",
    "Get a Parking Permit",
    "Building Permits",
    "Online Birth Certificate",
    "Trade License",
  ];

  const usefulLinks = [
    "Our Blog",
    "Our History",
    "Documentation",
    "Environmental",
    "Town Gallery",
    "Department",
  ];

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Organization Information */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center text-white text-xl">
                🏛️
              </div>
              <h3 className="text-xl font-bold">Oromia Majlis</h3>
            </div>
            <div className="space-y-3 text-sm">
              <p className="flex items-start gap-2">
                <span className="mt-1">📍</span>
                <span>95 FF3, App Street Avenue NSW 96209, Canada</span>
              </p>
              <p className="flex items-center gap-2">
                <span>🕐</span>
                <span>Opening Hours: Mon – Fri: 8:00 am – 6:00 pm</span>
              </p>
              <p className="flex items-center gap-2">
                <span>📞</span>
                <span>Phone: 1800 123 4567</span>
              </p>
              <p className="flex items-center gap-2">
                <span>✉️</span>
                <span>Email: demo@example.com</span>
              </p>
            </div>
          </div>

          {/* Column 2: Service Request */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Service Request</h3>
            <ul className="space-y-2 text-sm">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
                  >
                    <span className="text-yellow-400">&gt;</span>
                    <span>{link}</span>
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
                    href="#"
                    className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
                  >
                    <span className="text-yellow-400">&gt;</span>
                    <span>{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: City News & Updates */}
          <div>
            <h3 className="text-lg font-semibold mb-4">City News & Updates</h3>
            <p className="text-sm mb-4 text-gray-300">
              The latest Oromia Majlis news, articles, and resources, sent
              straight to your inbox every month.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

