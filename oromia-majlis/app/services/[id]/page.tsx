import Link from "next/link";
import { notFound } from "next/navigation";

interface ServiceDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Service names mapping
const serviceNames: Record<string, string> = {
  "hajj-umrah-affairs": "Hajj & Umrah Affairs",
  "mosque-islamic-institution-affairs": "Mosque & Islamic Institution Affairs",
  "islamic-education-dawah": "Islamic Education & Da'wah",
  "zakat-sadaqah-charity-coordination": "Zakat, Sadaqah & Charity Coordination",
  "marriage-family-guidance": "Marriage & Family Guidance",
  "religious-affairs-fatwa-services": "Religious Affairs & Fatwa Services",
  "training-capacity-building": "Training & Capacity Building",
  "community-peace-social-harmony": "Community Peace & Social Harmony",
  "research-documentation-publications": "Research, Documentation & Publications",
  "interfaith-public-relations": "Interfaith & Public Relations",
  "halal-certification": "Halal Certification Services",
  "membership-certificate": "Membership Certificate",
};

// Generate static params for all services
export async function generateStaticParams() {
  return Object.keys(serviceNames).map((slug) => ({
    id: slug,
  }));
}

// Service data structure
type ServiceData = {
  name: string;
  icon: string;
  coordinator: {
    name: string;
    title: string;
    image: string;
  };
  information: {
    description: string;
    mission: string;
    vision: string;
  };
  message: {
    title: string;
    content: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    hours: string;
  };
  features: string[];
  benefits: string[];
  cta?: {
    title: string;
    description: string;
    label: string;
    href: string;
  };
};

// Default service data
const defaultServiceData: ServiceData = {
  name: "Service",
  icon: "📋",
  coordinator: {
    name: "Service Coordinator",
    title: "Service Coordinator",
    image: "👤",
  },
  information: {
    description:
      "This service is dedicated to serving the Muslim community with excellence and commitment, providing essential support and guidance according to Islamic principles.",
    mission:
      "To serve the Muslim community with integrity, transparency, and excellence while promoting Islamic values and strengthening unity.",
    vision:
      "To be a leading service that effectively serves the Muslim community and provides essential support and guidance.",
  },
  message: {
    title: "Message from the Service Coordinator",
    content:
      "We are committed to serving the Muslim community with dedication and excellence. Our team works tirelessly to ensure that our services meet the needs of the community and provide the support and guidance required. We value your trust and are always striving to improve our services.",
  },
  contact: {
    phone: "+251 9XX XXX XXX",
    email: "info@oromiamajlis.et",
    address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
    hours: "Mon - Fri: 8:00 AM - 5:30 PM",
  },
  features: [
    "Comprehensive service delivery",
    "Community-focused approach",
    "Islamic principles-based guidance",
    "Professional and dedicated team",
    "Continuous improvement",
  ],
  benefits: [
    "Accessible services for all community members",
    "Expert guidance and support",
    "Transparent and accountable operations",
    "Community-centered solutions",
  ],
};

// Service data map
const serviceDataMap: Record<string, ServiceData> = {
  "hajj-umrah-affairs": {
    name: "Hajj & Umrah Affairs",
    icon: "🕋",
    coordinator: {
      name: "Sheikh Mohammed Abdi",
      title: "Coordinator, Hajj & Umrah Affairs",
      image: "👤",
    },
    information: {
      description:
        "The Hajj & Umrah Affairs service provides comprehensive coordination, guidance, and supervision of Hajj and Umrah services for pilgrims from the Oromia Region. We ensure safe, proper, and spiritually fulfilling pilgrimage experiences.",
      mission:
        "To facilitate and coordinate Hajj and Umrah services, provide comprehensive guidance to pilgrims, and ensure that all pilgrimage activities are conducted properly and safely according to Islamic requirements and Ethiopian regulations.",
      vision:
        "To enable every eligible Muslim in the Oromia Region to perform Hajj and Umrah with ease, proper guidance, and spiritual fulfillment, making the sacred journey accessible and meaningful.",
    },
    message: {
      title: "Message from the Coordinator",
      content:
        "Hajj and Umrah are sacred journeys that every Muslim aspires to undertake. Our service works to make these pilgrimages accessible, safe, and spiritually fulfilling for all pilgrims from the Oromia Region. We coordinate with travel agencies, provide pre-pilgrimage guidance, and ensure that all arrangements comply with Islamic requirements. Our team is dedicated to supporting you throughout your spiritual journey, from registration to your return home.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "hajj@oromiamajlis.et",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Fri: 8:00 AM - 5:30 PM",
    },
    features: [
      "Online and in-person registration for Hajj and Umrah",
      "Pre-pilgrimage guidance and educational sessions",
      "Travel coordination and documentation assistance",
      "On-site support and coordination during pilgrimage",
      "Post-pilgrimage follow-up and community integration",
    ],
    benefits: [
      "Proper preparation for the sacred journey",
      "Safe and organized travel arrangements",
      "Spiritual guidance throughout the pilgrimage",
      "Support from experienced coordinators",
    ],
  },
  "mosque-islamic-institution-affairs": {
    name: "Mosque & Islamic Institution Affairs",
    icon: "🕌",
    coordinator: {
      name: "Sheikh Omar Abdullah",
      title: "Coordinator, Mosque & Islamic Institution Affairs",
      image: "👤",
    },
    information: {
      description:
        "The Mosque & Islamic Institution Affairs service provides supervision, guidance, and support for mosques and Islamic institutions across the Oromia Region, ensuring they serve the community effectively and maintain proper facilities.",
      mission:
        "To support and supervise mosques and Islamic institutions, ensuring they provide quality services, maintain proper facilities, and serve as centers of community engagement, spiritual growth, and Islamic education.",
      vision:
        "To have well-managed, vibrant mosques and Islamic institutions that serve as pillars of the Muslim community, providing spiritual guidance, education, and social services to all community members.",
    },
    message: {
      title: "Message from the Coordinator",
      content:
        "Mosques are the heart of our Muslim community. Our service works tirelessly to ensure that every mosque in the Oromia Region is well-maintained, properly managed, and serves its community effectively. We provide support for mosque construction, maintenance, and management, and help coordinate activities that strengthen the role of mosques in our communities. Together, we can ensure that our mosques continue to be centers of worship, learning, and community unity.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "mosques@oromiamajlis.et",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Fri: 8:00 AM - 5:30 PM",
    },
    features: [
      "Mosque registration and official licensing assistance",
      "Administrative support and management guidance",
      "Facility development and renovation support",
      "Imam training and appointment coordination",
      "Community program coordination and support",
    ],
    benefits: [
      "Well-maintained and properly managed mosques",
      "Professional administrative support",
      "Enhanced community services",
      "Coordinated community activities",
    ],
  },
  "islamic-education-dawah": {
    name: "Islamic Education & Da'wah",
    icon: "📖",
    coordinator: {
      name: "Sheikh Fatima Hassan",
      title: "Coordinator, Islamic Education & Da'wah",
      image: "👤",
    },
    information: {
      description:
        "The Islamic Education & Da'wah service promotes authentic Islamic knowledge and education throughout the Oromia Region. We support educational institutions, organize awareness programs, and facilitate da'wah activities to enhance religious awareness and knowledge.",
      mission:
        "To provide comprehensive Islamic education programs, support religious schools, and organize authentic da'wah activities that promote Islamic values, strengthen faith, and produce knowledgeable, pious Muslims who contribute positively to society.",
      vision:
        "To establish a network of excellent Islamic educational institutions and da'wah programs that produce well-educated Muslims who are grounded in authentic Islamic teachings and ready to serve their community and society.",
    },
    message: {
      title: "Message from the Coordinator",
      content:
        "Education is the foundation of a strong Muslim community. Our service is dedicated to ensuring that every Muslim in the Oromia Region has access to quality Islamic education. We support Quranic schools, Islamic institutions, and organize da'wah programs that spread authentic Islamic teachings. Through our educational initiatives, we aim to build a generation of Muslims who are well-grounded in their faith, knowledgeable about Islamic principles, and ready to serve their community with wisdom and dedication.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "education@oromiamajlis.et",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Fri: 8:00 AM - 5:30 PM",
    },
    features: [
      "Support for Islamic schools and educational institutions",
      "Quranic studies and memorization programs",
      "Religious awareness campaigns and workshops",
      "Da'wah activities and outreach programs",
      "Scholarship programs for students",
      "Teacher training and professional development",
    ],
    benefits: [
      "Access to quality Islamic education",
      "Enhanced religious knowledge and awareness",
      "Support for educational institutions",
      "Opportunities for students and teachers",
    ],
  },
  "zakat-sadaqah-charity-coordination": {
    name: "Zakat, Sadaqah & Charity Coordination",
    icon: "🤲",
    coordinator: {
      name: "Sheikh Amina Ibrahim",
      title: "Coordinator, Zakat & Charity",
      image: "👤",
    },
    information: {
      description:
        "The Zakat, Sadaqah & Charity Coordination service manages the collection and distribution of charitable funds according to Islamic principles. We ensure transparency, accountability, and proper distribution to those in need.",
      mission:
        "To efficiently collect and distribute zakat, coordinate charitable activities, and ensure that resources reach those in need while maintaining transparency, accountability, and adherence to Islamic principles in all charitable operations.",
      vision:
        "To establish a comprehensive zakat and charity system that effectively addresses poverty, supports the needy, and strengthens the bonds of brotherhood and sisterhood within the Muslim community.",
    },
    message: {
      title: "Message from the Coordinator",
      content:
        "Zakat and charity are fundamental pillars of Islam that strengthen our community and help those in need. Our service ensures that zakat is collected properly and distributed fairly to eligible recipients according to Islamic guidelines. We coordinate with mosques, community organizations, and individuals to maximize the impact of charitable giving and ensure that every contribution reaches those who need it most. Through transparency and accountability, we build trust and encourage greater participation in charitable activities.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "zakat@oromiamajlis.et",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Fri: 8:00 AM - 5:30 PM",
    },
    features: [
      "Secure zakat collection and management",
      "Fair distribution to eligible recipients",
      "Sadaqah coordination and oversight",
      "Needy family support programs",
      "Emergency relief assistance",
      "Transparent financial reporting",
    ],
    benefits: [
      "Proper fulfillment of zakat obligations",
      "Support for those in need",
      "Transparent and accountable operations",
      "Maximum impact of charitable contributions",
    ],
  },
  "marriage-family-guidance": {
    name: "Marriage & Family Guidance",
    icon: "👨‍👩‍👧",
    coordinator: {
      name: "Sheikh Yusuf Ali",
      title: "Coordinator, Marriage & Family Guidance",
      image: "👤",
    },
    information: {
      description:
        "The Marriage & Family Guidance service provides Islamic counseling, marriage guidance, and social support services to help families and individuals navigate life's challenges according to Islamic principles.",
      mission:
        "To provide compassionate religious counseling, family guidance, and social support services that help individuals and families live according to Islamic values, strengthen family bonds, and navigate challenges with wisdom and faith.",
      vision:
        "To have strong, healthy Muslim families and communities where individuals receive the support and guidance they need to live fulfilling lives in accordance with Islamic teachings and values.",
    },
    message: {
      title: "Message from the Coordinator",
      content:
        "Strong families are the foundation of a strong community. Our service provides religious counseling, marriage guidance, and support services to help families navigate challenges and strengthen their bonds. We offer pre-marriage counseling, marriage mediation, family dispute resolution, and ongoing support for families. Our approach is based on Islamic principles and values, providing guidance that aligns with both religious teachings and the practical needs of modern families. We are here to support you with wisdom, compassion, and Islamic guidance in all aspects of family and community life.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "family@oromiamajlis.et",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Fri: 8:00 AM - 5:30 PM",
    },
    features: [
      "Pre-marriage counseling and guidance",
      "Marriage mediation and conflict resolution",
      "Family counseling services",
      "Educational workshops on family life",
      "Youth support and guidance programs",
      "Elderly care coordination",
    ],
    benefits: [
      "Stronger family relationships",
      "Islamic guidance for family matters",
      "Support during difficult times",
      "Educational resources for families",
    ],
  },
  "religious-affairs-fatwa-services": {
    name: "Religious Affairs & Fatwa Services",
    icon: "⚖️",
    coordinator: {
      name: "Sheikh Ahmed Mohammed",
      title: "Coordinator, Religious Affairs & Fatwa",
      image: "👤",
    },
    information: {
      description:
        "The Religious Affairs & Fatwa Services provides authentic Islamic guidance and fatwas on various religious matters. Our qualified scholars ensure that guidance is based on sound Islamic principles and considers the local context.",
      mission:
        "To provide authentic Islamic guidance, issue religious rulings (fatwas) in accordance with Islamic jurisprudence, and ensure that all religious activities align with Islamic principles and Ethiopian law while serving the needs of the Muslim community.",
      vision:
        "To be the trusted source of Islamic guidance and religious authority, promoting authentic Islamic teachings while fostering harmony within the Muslim community and with other faith communities.",
    },
    message: {
      title: "Message from the Coordinator",
      content:
        "As the coordinator of Religious Affairs & Fatwa Services, I am committed to ensuring that our service provides accurate, authentic Islamic guidance to the Muslim community. We work diligently to address religious questions, provide fatwas based on sound Islamic jurisprudence, and ensure that all Islamic activities in our region are conducted in accordance with Islamic principles. Our team of qualified scholars is always ready to serve the community with wisdom, integrity, and a deep understanding of both Islamic teachings and the local context.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "fatwa@oromiamajlis.et",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Fri: 8:00 AM - 5:30 PM",
    },
    features: [
      "Fatwa services on religious matters",
      "Religious consultation and guidance",
      "Published guidance documents",
      "Access to qualified Islamic scholars",
      "Coordination with legal authorities",
      "Religious compliance oversight",
    ],
    benefits: [
      "Authentic Islamic guidance",
      "Access to qualified scholars",
      "Reliable religious rulings",
      "Compliance with Islamic principles",
    ],
  },
  "training-capacity-building": {
    name: "Training & Capacity Building",
    icon: "🏫",
    coordinator: {
      name: "Sheikh Hassan Ibrahim",
      title: "Coordinator, Training & Capacity Building",
      image: "👤",
    },
    information: {
      description:
        "The Training & Capacity Building service provides comprehensive training programs for imams, scholars, and community leaders. We aim to enhance the capacity of Islamic institutions and individuals to serve their communities effectively.",
      mission:
        "To develop the capacity of imams, scholars, and community leaders through comprehensive training programs that enhance their religious knowledge, leadership skills, and ability to serve the community effectively.",
      vision:
        "To have a network of well-trained, knowledgeable religious leaders and community workers who can effectively serve and guide the Muslim community with excellence and dedication.",
    },
    message: {
      title: "Message from the Coordinator",
      content:
        "Investing in the development of our religious leaders and community workers is essential for the growth and strength of our community. Our service provides comprehensive training programs that enhance religious knowledge, leadership skills, and practical abilities. We offer specialized training for imams, scholarship development programs, leadership workshops, and continuing education opportunities. We are committed to building a generation of capable leaders who can guide and serve the Muslim community with excellence, wisdom, and dedication.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "training@oromiamajlis.et",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Fri: 8:00 AM - 5:30 PM",
    },
    features: [
      "Imam training and certification programs",
      "Scholarship development and advanced studies",
      "Leadership training workshops",
      "Community worker capacity building",
      "Continuing education programs",
      "Professional development opportunities",
    ],
    benefits: [
      "Enhanced skills and knowledge",
      "Professional certification",
      "Career development opportunities",
      "Improved service delivery",
    ],
  },
  "community-peace-social-harmony": {
    name: "Community Peace & Social Harmony",
    icon: "🤝",
    coordinator: {
      name: "Sheikh Aisha Mohammed",
      title: "Coordinator, Community Peace & Social Harmony",
      image: "👤",
    },
    information: {
      description:
        "The Community Peace & Social Harmony service works to promote unity, peaceful coexistence, and conflict resolution within Muslim communities and with the broader society. We facilitate dialogue, mediation, and peace-building initiatives.",
      mission:
        "To promote unity, peaceful coexistence, dialogue, and conflict resolution within Muslim communities and with the broader society, fostering harmony and mutual understanding while addressing challenges constructively.",
      vision:
        "To have harmonious, united communities where differences are resolved through dialogue, mutual respect, and Islamic principles, creating a peaceful and prosperous environment for all.",
    },
    message: {
      title: "Message from the Coordinator",
      content:
        "Unity and harmony are essential for the well-being of our community. Our service works to promote understanding, dialogue, and peaceful resolution of conflicts. We facilitate community dialogue sessions, provide mediation services, and organize peace-building initiatives that strengthen bonds within the Muslim community and with the broader society. Through respectful engagement and mutual understanding, we can build a more harmonious and prosperous society for all. We believe that Islam teaches us to resolve differences through dialogue and to treat all people with respect and compassion.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "peace@oromiamajlis.et",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Fri: 8:00 AM - 5:30 PM",
    },
    features: [
      "Community dialogue facilitation",
      "Conflict resolution and mediation",
      "Unity campaigns and initiatives",
      "Social cohesion activities",
      "Peace-building programs",
      "Inter-community engagement",
    ],
    benefits: [
      "Stronger community bonds",
      "Peaceful conflict resolution",
      "Enhanced social harmony",
      "Improved community relations",
    ],
  },
  "research-documentation-publications": {
    name: "Research, Documentation & Publications",
    icon: "📊",
    coordinator: {
      name: "Sheikh Abdullah Hassan",
      title: "Coordinator, Research & Publications",
      image: "👤",
    },
    information: {
      description:
        "The Research, Documentation & Publications service conducts research, maintains documentation, and publishes Islamic studies, guidelines, and official materials to serve the community and preserve Islamic knowledge.",
      mission:
        "To conduct research on Islamic affairs, document important information, and publish educational materials, guidelines, and official publications that serve the Muslim community and preserve Islamic knowledge for future generations.",
      vision:
        "To be a leading center for Islamic research and documentation that produces valuable knowledge and resources for the Muslim community, scholars, and future generations.",
    },
    message: {
      title: "Message from the Coordinator",
      content:
        "Knowledge is a precious asset that must be preserved and shared. Our service conducts research on Islamic affairs, documents important information, and publishes materials that serve the community. We work to ensure that Islamic knowledge is accessible, accurate, and beneficial for all Muslims in the Oromia Region. Through our research and publications, we contribute to the preservation and advancement of Islamic knowledge while addressing contemporary issues facing the Muslim community.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "research@oromiamajlis.et",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Fri: 8:00 AM - 5:30 PM",
    },
    features: [
      "Islamic research and academic studies",
      "Documentation and archiving services",
      "Publication of Islamic materials and guides",
      "Guidelines and policy development",
      "Library and resource management",
      "Digital resources and databases",
    ],
    benefits: [
      "Access to research and documentation",
      "Educational resources and materials",
      "Preserved Islamic knowledge",
      "Informed decision-making",
    ],
  },
  "interfaith-public-relations": {
    name: "Interfaith & Public Relations",
    icon: "🌍",
    coordinator: {
      name: "Sheikh Aisha Mohammed",
      title: "Coordinator, Interfaith & Public Relations",
      image: "👤",
    },
    information: {
      description:
        "The Interfaith & Public Relations service facilitates engagement with other faith communities, government bodies, and stakeholders to promote understanding, cooperation, and harmony while representing the interests of the Muslim community.",
      mission:
        "To build bridges with other faith communities, engage with government and civil society, and promote understanding, cooperation, and peaceful coexistence while representing the interests of the Muslim community effectively.",
      vision:
        "To have strong, positive relationships with all stakeholders that promote mutual respect, understanding, and cooperation for the benefit of all communities and society at large.",
    },
    message: {
      title: "Message from the Coordinator",
      content:
        "Building positive relationships with other faith communities and stakeholders is essential for the well-being of our society. Our service works to promote understanding, dialogue, and cooperation while representing the interests of the Muslim community. We engage in interfaith dialogue, coordinate with government bodies, and build relationships with media and civil society organizations. Through respectful engagement and mutual understanding, we can build a more harmonious and prosperous society for all. We believe that Islam teaches us to engage with others respectfully and to work together for the common good.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "interfaith@oromiamajlis.et",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Fri: 8:00 AM - 5:30 PM",
    },
    features: [
      "Interfaith dialogue and engagement",
      "Government relations and advocacy",
      "Public communication and media relations",
      "Stakeholder coordination",
      "Community outreach programs",
      "Public awareness campaigns",
    ],
    benefits: [
      "Improved interfaith relations",
      "Better representation of Muslim interests",
      "Enhanced public understanding",
      "Stronger community partnerships",
    ],
  },
  "halal-certification": {
    name: "Halal Certification Services",
    icon: "✅",
    coordinator: {
      name: "Sheikh Abdulhadi Abate",
      title: "Coordinator, Halal Certification Services",
      image: "👤",
    },
    information: {
      description:
        "The Halal Certification Services unit helps businesses register, apply, and complete Halal compliance verification through the Oromia Majlis digital process.",
      mission:
        "To provide transparent, efficient, and Sharia-compliant certification support for food, beverage, hospitality, and related sectors seeking Halal certification.",
      vision:
        "To become a trusted regional center for high-quality Halal certification services that improve consumer confidence and market access.",
    },
    message: {
      title: "Message from the Coordinator",
      content:
        "Our department is committed to supporting businesses at every step of the Halal certification journey. From initial application and document verification to inspection and final approval, we provide clear guidance and reliable service through our digital platform.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "halal@oromiamajlis.et",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Fri: 8:00 AM - 5:30 PM",
    },
    features: [
      "Online business registration for Halal certification",
      "Document submission and compliance review workflow",
      "Inspection and audit coordination support",
      "Certification status tracking and update notifications",
      "Guidance on Halal standards and renewal requirements",
    ],
    benefits: [
      "Faster and structured certification workflow",
      "Better business credibility with Halal consumers",
      "Clear guidance from application to approval",
      "Digital tracking for improved transparency",
    ],
    cta: {
      title: "Start Halal Certification",
      description:
        "Ready to begin your certification process? Create your account and submit your application online.",
      label: "Apply for Halal Certification",
      href: "/register",
    },
  },
  "membership-certificate": {
    name: "Membership Certificate",
    icon: "🪪",
    coordinator: {
      name: "Sheikh Abdinasir Mohammed",
      title: "Coordinator, Membership Certificate Service",
      image: "👤",
    },
    information: {
      description:
        "The Membership Certificate service enables Muslim community members to apply online, select a membership plan, complete payment, and receive their certificate digitally.",
      mission:
        "To provide an easy, transparent, and accessible online membership certification process for the Muslim community across Oromia.",
      vision:
        "To establish a trusted and modern digital membership system that strengthens community participation and access to Majlis services.",
    },
    message: {
      title: "Message from the Coordinator",
      content:
        "This service is designed to simplify membership application for our community. Applicants can submit their information online, choose monthly, quarterly, or yearly plans, pay the required fee, and receive their membership certificate through a smooth digital process.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "membership@oromiamajlis.et",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Fri: 8:00 AM - 5:30 PM",
    },
    features: [
      "Online application form with applicant information",
      "Plan selection: Monthly, Quarterly, or Yearly",
      "Integrated payment step for certificate fees",
      "Certificate issuance after successful processing",
      "Digital process tracking and status visibility",
    ],
    benefits: [
      "Fast and convenient online application workflow",
      "Flexible membership plan options",
      "Secure fee payment and clear process steps",
      "Reliable certificate delivery for approved members",
    ],
    cta: {
      title: "Apply for Membership Certificate",
      description:
        "Start your membership application online, choose your preferred plan, and complete your payment.",
      label: "Start Membership Application",
      href: "http://localhost:8080/register/membership",
    },
  },
};

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { id } = await params;
  
  // Normalize the id (remove any trailing slashes, lowercase, etc.)
  const normalizedId = id?.toLowerCase().trim();
  
  const serviceName = serviceNames[normalizedId];

  if (!serviceName) {
    console.error(`Service not found for id: ${normalizedId}`);
    notFound();
  }

  // Get service-specific data or use default
  const serviceData = serviceDataMap[normalizedId] || {
    ...defaultServiceData,
    name: serviceName,
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back Button */}
          <Link
            href="/services"
            className="inline-flex items-center text-blue-700 hover:text-red-600 mb-8 transition-colors group"
          >
            <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to Services</span>
          </Link>

          {/* Service Header */}
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-lg shadow-xl p-8 md:p-12 mb-8 text-white">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-white/30">
                  <span className="text-6xl">{serviceData.icon}</span>
                </div>
              </div>
              
              {/* Title and Description */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {serviceName}
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  {serviceData.information.description}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Service Coordinator */}
              <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 bg-red-600 rounded"></span>
                  Service Coordinator
                </h2>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg border-4 border-white">
                    <div className="text-6xl">{serviceData.coordinator.image}</div>
                  </div>
                  <div className="text-center md:text-left flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {serviceData.coordinator.name}
                    </h3>
                    <p className="text-red-600 font-semibold mb-4">{serviceData.coordinator.title}</p>
                    <p className="text-gray-700 leading-relaxed">
                      Leading the service with vision and dedication to serve the community with excellence and commitment.
                    </p>
                  </div>
                </div>
              </div>

              {/* Service Information */}
              <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 bg-red-600 rounded"></span>
                  Service Information
                </h2>
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-red-50 to-transparent p-6 rounded-lg border-l-4 border-red-600">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-red-600">🎯</span>
                      Mission
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {serviceData.information.mission}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-transparent p-6 rounded-lg border-l-4 border-blue-600">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-blue-600">👁️</span>
                      Vision
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {serviceData.information.vision}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message from Coordinator */}
              <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 bg-red-600 rounded"></span>
                  {serviceData.message.title}
                </h2>
                <div className="bg-gradient-to-r from-gray-50 to-transparent border-l-4 border-red-600 pl-6 py-4 rounded-r-lg">
                  <p className="text-gray-700 leading-relaxed italic text-lg mb-4">
                    "{serviceData.message.content}"
                  </p>
                  <p className="text-gray-600 font-semibold flex items-center gap-2">
                    <span className="w-8 h-0.5 bg-red-600"></span>
                    {serviceData.coordinator.name}
                  </p>
                </div>
              </div>

              {/* Service Features */}
              <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 bg-red-600 rounded"></span>
                  Our Service Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {serviceData.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors duration-300 group"
                    >
                      <span className="text-red-600 font-bold mt-1 group-hover:scale-110 transition-transform">✓</span>
                      <span className="text-gray-700 flex-1">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Benefits */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 bg-red-600 rounded"></span>
                  Benefits
                </h2>
                <ul className="space-y-3">
                  {serviceData.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-red-600 font-bold text-xl mt-1">•</span>
                      <span className="text-gray-800 text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-red-600 rounded"></span>
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors">
                    <span className="text-red-600 text-xl">📞</span>
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <p className="text-gray-600">{serviceData.contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors">
                    <span className="text-red-600 text-xl">✉️</span>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <p className="text-gray-600 break-all">{serviceData.contact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors">
                    <span className="text-red-600 text-xl">📍</span>
                    <div>
                      <p className="font-semibold text-gray-900">Address</p>
                      <p className="text-gray-600">{serviceData.contact.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors">
                    <span className="text-red-600 text-xl">🕐</span>
                    <div>
                      <p className="font-semibold text-gray-900">Office Hours</p>
                      <p className="text-gray-600">{serviceData.contact.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {serviceData.cta && (
                <div className="bg-gradient-to-br from-red-600 to-blue-900 rounded-lg shadow-lg p-6 text-white">
                  <h3 className="text-xl font-bold mb-3">{serviceData.cta.title}</h3>
                  <p className="text-white/90 mb-5 text-sm">{serviceData.cta.description}</p>
                  <Link
                    href={serviceData.cta.href}
                    className="inline-flex w-full items-center justify-center rounded-md bg-white px-6 py-3 text-center font-semibold text-red-700 hover:bg-red-50 transition-colors"
                  >
                    {serviceData.cta.label}
                  </Link>
                </div>
              )}

              {/* Quick Links */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-red-600 rounded"></span>
                  Quick Links
                </h2>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/services"
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-red-50 text-blue-700 hover:text-red-600 transition-all duration-300 group"
                    >
                      <span>All Services</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/offices"
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-red-50 text-blue-700 hover:text-red-600 transition-all duration-300 group"
                    >
                      <span>Departments</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/news"
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-red-50 text-blue-700 hover:text-red-600 transition-all duration-300 group"
                    >
                      <span>News & Updates</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-red-50 text-blue-700 hover:text-red-600 transition-all duration-300 group"
                    >
                      <span>Contact Us</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-lg shadow-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-3">Need Help?</h3>
                <p className="text-white/90 mb-4 text-sm">
                  Our team is here to assist you with any questions or concerns about this service.
                </p>
                <Link
                  href="/contact"
                  className="inline-block w-full text-center bg-white text-red-600 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
