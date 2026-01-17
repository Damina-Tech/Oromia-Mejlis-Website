import Link from "next/link";
import { notFound } from "next/navigation";

interface DepartmentDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Default department data (fallback)
const defaultDepartmentData = {
  name: "Department",
  head: {
    name: "Sheikh Director",
    title: "Department Director",
    image: "👤",
  },
  information: {
    description:
      "This department is dedicated to serving the Muslim community with excellence and commitment, managing Islamic affairs according to authentic Islamic principles.",
    mission:
      "To serve the Muslim community with integrity, transparency, and excellence while promoting Islamic values and strengthening unity.",
    vision:
      "To be a leading department that effectively manages Islamic affairs and serves as a pillar of support for the Muslim community.",
  },
  message: {
    title: "Message from the Director",
    content:
      "We are committed to serving the Muslim community with dedication and excellence. Our team works tirelessly to ensure that Islamic affairs are managed properly and that the community receives the support and guidance it needs. We value your trust and are always striving to improve our services.",
  },
  contact: {
    phone: "+251 9XX XXX XXX",
    email: "info@oromiamajlis.et",
    address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
    hours: "Mon - Fri: 8:00 AM - 5:30 PM",
  },
  services: [
    "Religious guidance and support",
    "Community engagement programs",
    "Islamic education and awareness",
    "Social services and support",
    "Policy development and implementation",
  ],
};

const departmentNames: Record<string, string> = {
  "religious-affairs": "Religious Affairs Department",
  "islamic-education": "Islamic Education & Da'wah",
  "mosque-affairs": "Mosque & Islamic Institution Affairs",
  "zakat-charity": "Zakat & Charity Coordination",
  "community-services": "Community Services & Family Guidance",
  "hajj-umrah": "Hajj & Umrah Affairs",
  "training-capacity": "Training & Capacity Building",
  "interfaith-relations": "Interfaith & Public Relations",
  "research-publications": "Research, Documentation & Publications",
};

const departmentDataMap: Record<string, typeof departmentData> = {
  "religious-affairs": {
    name: "Religious Affairs Department",
    head: {
      name: "Sheikh Ahmed Mohammed",
      title: "Director, Religious Affairs",
      image: "👤",
    },
    information: {
      description:
        "The Religious Affairs Department oversees religious matters, provides fatwa services, and ensures all activities comply with Islamic principles and national regulations. We serve as the primary authority for religious guidance in the Oromia Region.",
      mission:
        "To provide authentic Islamic guidance, issue religious rulings (fatwas) in accordance with Islamic jurisprudence, and ensure that all religious activities align with Islamic principles and Ethiopian law.",
      vision:
        "To be the trusted source of Islamic guidance and religious authority, promoting authentic Islamic teachings while fostering harmony within the Muslim community and with other faith communities.",
    },
    message: {
      title: "Message from the Director",
      content:
        "As the Director of Religious Affairs, I am committed to ensuring that our department provides accurate, authentic Islamic guidance to the Muslim community. We work diligently to address religious questions, provide fatwas, and ensure that all Islamic activities in our region are conducted in accordance with Islamic principles. Our team of qualified scholars is always ready to serve the community with wisdom and integrity.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "religious@oromiamajlis.et",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Fri: 8:00 AM - 5:30 PM",
    },
    services: [
      "Fatwa services and religious guidance",
      "Religious compliance and oversight",
      "Islamic jurisprudence consultation",
      "Religious dispute resolution",
      "Coordination with national religious authorities",
    ],
  },
  "islamic-education": {
    name: "Islamic Education & Da'wah",
    head: {
      name: "Sheikh Fatima Hassan",
      title: "Director, Islamic Education",
      image: "👤",
    },
    information: {
      description:
        "The Islamic Education & Da'wah Department promotes Islamic education, manages religious schools, and organizes da'wah programs to enhance religious awareness and knowledge throughout the Oromia Region.",
      mission:
        "To provide comprehensive Islamic education programs, support religious schools, and organize authentic da'wah activities that promote Islamic values and strengthen the faith of the Muslim community.",
      vision:
        "To establish a network of excellent Islamic educational institutions and da'wah programs that produce knowledgeable, pious Muslims who contribute positively to society.",
    },
    message: {
      title: "Message from the Director",
      content:
        "Education is the foundation of a strong Muslim community. Our department is dedicated to ensuring that every Muslim in the Oromia Region has access to quality Islamic education. We support Quranic schools, Islamic institutions, and organize da'wah programs that spread authentic Islamic teachings. Together, we can build a generation of Muslims who are well-grounded in their faith and ready to serve their community.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "education@oromiamajlis.et",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Fri: 8:00 AM - 5:30 PM",
    },
    services: [
      "Quranic studies and memorization programs",
      "Islamic school support and accreditation",
      "Da'wah and religious awareness campaigns",
      "Scholarship programs for students",
      "Teacher training and development",
    ],
  },
  "mosque-affairs": {
    name: "Mosque & Islamic Institution Affairs",
    head: {
      name: "Sheikh Omar Abdullah",
      title: "Director, Mosque Affairs",
      image: "👤",
    },
    information: {
      description:
        "The Mosque & Islamic Institution Affairs Department provides supervision, guidance, and support for mosques and Islamic institutions across the Oromia Region, ensuring they serve the community effectively.",
      mission:
        "To support and supervise mosques and Islamic institutions, ensuring they provide quality services, maintain proper facilities, and serve as centers of community engagement and spiritual growth.",
      vision:
        "To have well-managed, vibrant mosques and Islamic institutions that serve as pillars of the Muslim community, providing spiritual guidance, education, and social services.",
    },
    message: {
      title: "Message from the Director",
      content:
        "Mosques are the heart of our Muslim community. Our department works tirelessly to ensure that every mosque in the Oromia Region is well-maintained, properly managed, and serves its community effectively. We provide support for mosque construction, maintenance, and management, and help coordinate activities that strengthen the role of mosques in our communities.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "mosques@oromiamajlis.et",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Fri: 8:00 AM - 5:30 PM",
    },
    services: [
      "Mosque registration and supervision",
      "Facility maintenance and support",
      "Imam appointment and training",
      "Prayer time coordination",
      "Community event organization",
    ],
  },
  "zakat-charity": {
    name: "Zakat & Charity Coordination",
    head: {
      name: "Sheikh Amina Ibrahim",
      title: "Director, Zakat & Charity",
      image: "👤",
    },
    information: {
      description:
        "The Zakat & Charity Coordination Department organizes and supervises zakat collection, sadaqah distribution, and charitable initiatives to support the needy and strengthen the social fabric of our community.",
      mission:
        "To efficiently collect and distribute zakat, coordinate charitable activities, and ensure that resources reach those in need while maintaining transparency and accountability in all charitable operations.",
      vision:
        "To establish a comprehensive zakat and charity system that effectively addresses poverty, supports the needy, and strengthens the bonds of brotherhood and sisterhood within the Muslim community.",
    },
    message: {
      title: "Message from the Director",
      content:
        "Zakat and charity are fundamental pillars of Islam that strengthen our community and help those in need. Our department ensures that zakat is collected properly and distributed fairly to eligible recipients. We coordinate with mosques, community organizations, and individuals to maximize the impact of charitable giving and ensure that every contribution reaches those who need it most.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "zakat@oromiamajlis.et",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Fri: 8:00 AM - 5:30 PM",
    },
    services: [
      "Zakat collection and distribution",
      "Charity coordination and oversight",
      "Needy family support programs",
      "Emergency relief assistance",
      "Transparent financial reporting",
    ],
  },
  "community-services": {
    name: "Community Services & Family Guidance",
    head: {
      name: "Sheikh Yusuf Ali",
      title: "Director, Community Services",
      image: "👤",
    },
    information: {
      description:
        "The Community Services & Family Guidance Department provides religious counseling, marriage guidance, and social support services to help families and individuals navigate life's challenges according to Islamic principles.",
      mission:
        "To provide compassionate religious counseling, family guidance, and social support services that help individuals and families live according to Islamic values and strengthen family bonds.",
      vision:
        "To have strong, healthy Muslim families and communities where individuals receive the support and guidance they need to live fulfilling lives in accordance with Islamic teachings.",
    },
    message: {
      title: "Message from the Director",
      content:
        "Strong families are the foundation of a strong community. Our department provides religious counseling, marriage guidance, and support services to help families navigate challenges and strengthen their bonds. We are here to support you with wisdom, compassion, and Islamic guidance in all aspects of family and community life.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "community@oromiamajlis.et",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Fri: 8:00 AM - 5:30 PM",
    },
    services: [
      "Marriage counseling and guidance",
      "Family dispute resolution",
      "Religious counseling services",
      "Youth support programs",
      "Elderly care coordination",
    ],
  },
  "hajj-umrah": {
    name: "Hajj & Umrah Affairs",
    head: {
      name: "Sheikh Mohammed Abdi",
      title: "Director, Hajj & Umrah",
      image: "👤",
    },
    information: {
      description:
        "The Hajj & Umrah Affairs Department coordinates, guides, and supervises Hajj and Umrah services for pilgrims from the Oromia Region, ensuring safe and proper pilgrimage experiences.",
      mission:
        "To facilitate and coordinate Hajj and Umrah services, provide guidance to pilgrims, and ensure that all pilgrimage activities are conducted properly and safely according to Islamic requirements.",
      vision:
        "To enable every eligible Muslim in the Oromia Region to perform Hajj and Umrah with ease, proper guidance, and spiritual fulfillment.",
    },
    message: {
      title: "Message from the Director",
      content:
        "Hajj and Umrah are sacred journeys that every Muslim aspires to undertake. Our department works to make these pilgrimages accessible, safe, and spiritually fulfilling for all pilgrims from the Oromia Region. We coordinate with travel agencies, provide guidance, and ensure that all arrangements comply with Islamic requirements and Ethiopian regulations.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "hajj@oromiamajlis.et",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Fri: 8:00 AM - 5:30 PM",
    },
    services: [
      "Hajj registration and coordination",
      "Umrah travel arrangements",
      "Pilgrimage guidance and training",
      "Travel document assistance",
      "Post-pilgrimage support services",
    ],
  },
  "training-capacity": {
    name: "Training & Capacity Building",
    head: {
      name: "Sheikh Hassan Ibrahim",
      title: "Director, Training & Capacity Building",
      image: "👤",
    },
    information: {
      description:
        "The Training & Capacity Building Department provides training programs for imams, scholars, and community leaders to enhance their knowledge, skills, and institutional capacity.",
      mission:
        "To develop the capacity of imams, scholars, and community leaders through comprehensive training programs that enhance their religious knowledge, leadership skills, and ability to serve the community effectively.",
      vision:
        "To have a network of well-trained, knowledgeable religious leaders and community workers who can effectively serve and guide the Muslim community.",
    },
    message: {
      title: "Message from the Director",
      content:
        "Investing in the development of our religious leaders and community workers is essential for the growth and strength of our community. Our department provides comprehensive training programs that enhance religious knowledge, leadership skills, and practical abilities. We are committed to building a generation of capable leaders who can guide and serve the Muslim community with excellence.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "training@oromiamajlis.et",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Fri: 8:00 AM - 5:30 PM",
    },
    services: [
      "Imam training and certification",
      "Scholarship development programs",
      "Leadership training workshops",
      "Community worker capacity building",
      "Continuing education programs",
    ],
  },
  "interfaith-relations": {
    name: "Interfaith & Public Relations",
    head: {
      name: "Sheikh Aisha Mohammed",
      title: "Director, Interfaith Relations",
      image: "👤",
    },
    information: {
      description:
        "The Interfaith & Public Relations Department engages with religious institutions, government bodies, and stakeholders to foster cooperation, understanding, and harmony within and beyond the Muslim community.",
      mission:
        "To build bridges with other faith communities, engage with government and civil society, and promote understanding, cooperation, and peaceful coexistence while representing the interests of the Muslim community.",
      vision:
        "To have strong, positive relationships with all stakeholders that promote mutual respect, understanding, and cooperation for the benefit of all communities.",
    },
    message: {
      title: "Message from the Director",
      content:
        "Building positive relationships with other faith communities and stakeholders is essential for the well-being of our society. Our department works to promote understanding, dialogue, and cooperation while representing the interests of the Muslim community. We believe that through respectful engagement and mutual understanding, we can build a more harmonious and prosperous society for all.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "interfaith@oromiamajlis.et",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Fri: 8:00 AM - 5:30 PM",
    },
    services: [
      "Interfaith dialogue and engagement",
      "Government relations and advocacy",
      "Public communication and media relations",
      "Stakeholder coordination",
      "Community outreach programs",
    ],
  },
  "research-publications": {
    name: "Research, Documentation & Publications",
    head: {
      name: "Sheikh Abdullah Hassan",
      title: "Director, Research & Publications",
      image: "👤",
    },
    information: {
      description:
        "The Research, Documentation & Publications Department conducts research, maintains documentation, and publishes Islamic studies, guidelines, and official materials to serve the community and preserve Islamic knowledge.",
      mission:
        "To conduct research on Islamic affairs, document important information, and publish educational materials, guidelines, and official publications that serve the Muslim community and preserve Islamic knowledge.",
      vision:
        "To be a leading center for Islamic research and documentation that produces valuable knowledge and resources for the Muslim community and future generations.",
    },
    message: {
      title: "Message from the Director",
      content:
        "Knowledge is a precious asset that must be preserved and shared. Our department conducts research on Islamic affairs, documents important information, and publishes materials that serve the community. We work to ensure that Islamic knowledge is accessible, accurate, and beneficial for all Muslims in the Oromia Region.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "research@oromiamajlis.et",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Fri: 8:00 AM - 5:30 PM",
    },
    services: [
      "Islamic research and studies",
      "Documentation and archiving",
      "Publication of Islamic materials",
      "Guidelines and policy development",
      "Library and resource management",
    ],
  },
};

export default async function DepartmentDetailPage({
  params,
}: DepartmentDetailPageProps) {
  const { id } = await params;
  const departmentName = departmentNames[id];

  if (!departmentName) {
    notFound();
  }

  // Get department-specific data or use default
  const departmentData = departmentDataMap[id] || {
    ...defaultDepartmentData,
    name: departmentName,
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back Button */}
          <Link
            href="/offices"
            className="inline-flex items-center text-blue-700 hover:text-red-600 mb-8 transition-colors"
          >
            <span className="mr-2">←</span>
            <span>Back to Offices</span>
          </Link>

          {/* Department Header */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {departmentName}
            </h1>
            <p className="text-lg text-gray-600">
              {departmentData.information.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Department Head */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Department Head
                </h2>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="text-6xl">{departmentData.head.image}</div>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {departmentData.head.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{departmentData.head.title}</p>
                    <p className="text-gray-700">
                      Leading the department with vision and dedication to serve
                      the community.
                    </p>
                  </div>
                </div>
              </div>

              {/* Department Information */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Department Information
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Mission
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {departmentData.information.mission}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Vision
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {departmentData.information.vision}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message from Department Head */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {departmentData.message.title}
                </h2>
                <div className="border-l-4 border-red-600 pl-6">
                  <p className="text-gray-700 leading-relaxed italic">
                    {departmentData.message.content}
                  </p>
                  <p className="text-gray-600 mt-4 font-semibold">
                    — {departmentData.head.name}
                  </p>
                </div>
              </div>

              {/* Services */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Our Services
                </h2>
                <ul className="space-y-3">
                  {departmentData.services.map((service, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-red-600 font-bold mt-1">•</span>
                      <span className="text-gray-700">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 text-xl">📞</span>
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <p className="text-gray-600">{departmentData.contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 text-xl">✉️</span>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <p className="text-gray-600">{departmentData.contact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 text-xl">📍</span>
                    <div>
                      <p className="font-semibold text-gray-900">Address</p>
                      <p className="text-gray-600">{departmentData.contact.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 text-xl">🕐</span>
                    <div>
                      <p className="font-semibold text-gray-900">Office Hours</p>
                      <p className="text-gray-600">{departmentData.contact.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Quick Links
                </h2>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/services"
                      className="text-blue-700 hover:text-red-600 transition-colors"
                    >
                      Services →
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/news"
                      className="text-blue-700 hover:text-red-600 transition-colors"
                    >
                      News & Updates →
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-blue-700 hover:text-red-600 transition-colors"
                    >
                      Contact Us →
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

