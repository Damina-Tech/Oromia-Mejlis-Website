import Link from "next/link";
import { majlisDocuments } from "@/lib/documents";

export const metadata = {
  title: "Documents - Oromia Majlis",
  description:
    "Browse official documents, policies, reports, and application forms from Oromia Regional Islamic Affairs Supreme Council.",
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function DocumentsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Majlis Documents
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Access official Oromia Majlis documents including policies,
              reports, and administrative forms.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-2xl p-8 md:p-10 mb-10 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div>
                <p className="text-sm uppercase tracking-wide text-red-300 font-semibold mb-2">
                  Document Center
                </p>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Governance, Registration, and Community Resources
                </h2>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-blue-900 hover:text-red-600 font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Request Support
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {majlisDocuments.map((doc) => (
              <article
                id={`doc-${doc.id}`}
                key={doc.id}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-bold px-3 py-1.5 rounded-full">
                    <span>📄</span>
                    <span>{doc.category}</span>
                  </div>
                  <span className="text-xs text-gray-500">{formatDate(doc.date)}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {doc.name}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {doc.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Updated: {formatDate(doc.date)}
                  </span>
                  <Link
                    href="/contact"
                    className="text-blue-700 hover:text-red-600 font-semibold transition-colors"
                  >
                    Request Document →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

