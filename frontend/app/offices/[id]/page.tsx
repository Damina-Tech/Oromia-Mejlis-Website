import Link from "next/link";
import { notFound } from "next/navigation";
import HalalServicesDepartmentView from "@/components/offices/HalalServicesDepartmentView";
import DepartmentHeadCard from "@/components/offices/DepartmentHeadCard";
import OfficesBreadcrumb from "@/components/offices/OfficesBreadcrumb";

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

type DepartmentData = typeof defaultDepartmentData;

const departmentNames: Record<string, string> = {
  "halal-services": "Halal Services Department",
  "organizational-structure-institutional": "Organizational Structure and Institutional Department",
  "finance-resource-administration": "Finance and Resource Administration Department",
  "audit-inspection": "Audit and Inspection Department",
  "education-training": "Education and Training Department",
  "dawah-guidance-irshad": "Da'wah and Guidance (Irshad) Department",
  "fatwa-islamic-research": "Fatwa and Islamic Research Department",
  "mosques-awqaf-heritage": "Mosques, Awqaf, and Islamic Heritage Administration Department",
  "zakat-administration-development": "Zakat Administration and Development Department",
  "social-affairs-islamic-associations": "Social Affairs and Islamic Associations Department",
  "income-development": "Income and Development Department",
  "hajj-umrah-services": "Hajj and Umrah Services Department",
  "legal-services": "Legal Services Department",
  "security-public-relations": "Security and Public Relations Department",
  "communications": "Communications Department",
  "study-research-policy": "Study, Research, and Policy Department",
  "youth-womens-council": "Youth and Women's Council Department",
  "it-digital-services": "Information Technology (IT) and Digital Services Department",
};

const departmentDataMap: Record<string, DepartmentData> = {
  "halal-services": {
    name: "Halal Services Department",
    head: { name: "Director", title: "Department Director", image: "👤" },
    information: {
      description:
        "ORIASC-HCB (Oromiya Region Islamic Affairs Supreme Council — Department of Halal Certification Body) is Ethiopia's EIAC- and SFDA Halal Center–accredited national halal certification body. We develop Halal standards, conduct inspections under Sharia and GSO requirements, and support access to UAE, Saudi Arabia, and Gulf markets.",
      mission:
        "To develop Halal standards aligned with Islamic Law and international food standards, build skilled manpower through training, and expand knowledge of Halal certification to strengthen production, exports, and global acceptance.",
      vision:
        "To be the national reference for credible Halal certification and regulatory assurance for Ethiopia and international Halal markets.",
    },
    message: {
      title: "Message from the Director",
      content:
        "Halal is a right of the consumer and a duty upon producers and certifiers. ORIASC-HCB is committed to a transparent certification journey—from first audit through Decision Committee approval—so that Ethiopian businesses can trade with confidence in Halal integrity.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "halal@oromiamajlis.et",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Fri: 8:00 AM - 5:30 PM",
    },
    services: [
      "Halal product certification (initial audit, evaluation, and certificate issuance)",
      "Scheme and compliance review aligned with GSO and Gulf market requirements",
      "Training and capacity building for auditors, inspectors, and industry",
      "Halal awareness, standards guidance, and documentation support",
      "Certification renewal, surveillance, and follow-up with applicants",
    ],
  },
  "organizational-structure-institutional": {
    name: "Organizational Structure and Institutional Department",
    head: { name: "Sheik Abdulhakiim Huseen", title: "Department Head", image: "/img/119.jpg" },
    information: {
      description:
        "The Organizational Structure and Institutional Department oversees the organizational design, bylaws, and institutional framework of Oromia Majlis. It ensures clear mandates, reporting lines, and governance so that all offices and departments operate effectively and in line with Islamic and administrative best practices.",
      mission:
        "To establish and maintain a robust organizational structure and institutional framework that enables Oromia Majlis to fulfill its mandate with clarity, accountability, and efficiency.",
      vision:
        "To be the backbone of institutional excellence, ensuring Oromia Majlis remains well-organized, adaptable, and capable of serving the Muslim community for generations to come.",
    },
    message: {
      title: "Message from the Director",
      content:
        "A strong structure is the foundation of every successful institution. Our department is committed to keeping Oromia Majlis well-organized, with clear roles and processes, so that we can serve the community with consistency and integrity.",
    },
    contact: {
      phone: "+251911772445",
      email: "institutional@oriasc.org",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Sat: 8:00 AM - 5:30 PM",
    },
    services: [
      "Organizational design and structure review",
      "Bylaws and governance framework development",
      "Mandate and job description documentation",
      "Institutional capacity assessment",
      "Coordination with branches and units",
    ],
  },
  "finance-resource-administration": {
    name: "Finance and Resource Administration Department",
    head: { name: "Sheik Naasir Tamaam", title: "Department Head", image: "/img/12.jpg" },
    information: {
      description:
        "The Finance and Resource Administration Department manages the financial operations, budgeting, procurement, and resource allocation of Oromia Majlis. It ensures transparency, accountability, and Sharia-compliant financial practices in support of all programs and services.",
      mission:
        "To manage financial and material resources with integrity, transparency, and efficiency, enabling Oromia Majlis to deliver its services and sustain its operations in accordance with Islamic and legal standards.",
      vision:
        "To be a model of sound financial and resource administration for Islamic institutions, fostering trust and sustainability.",
    },
    message: {
      title: "Message from the Director",
      content:
        "Sound finance and resource management are essential to our mission. We are dedicated to prudent budgeting, transparent reporting, and efficient use of resources so that every birr serves the community and upholds trust.",
    },
    contact: {
      phone: "+251933682084",
      email: "finance@oriasc.org",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Sat: 8:00 AM - 5:30 PM",
    },
    services: [
      "Budget planning and execution",
      "Financial reporting and accountability",
      "Procurement and asset management",
      "Payroll and human resource administration",
      "Donor and grant fund management",
    ],
  },
  "audit-inspection": {
    name: "Audit and Inspection Department",
    head: { name: "Director", title: "Department Director", image: "👤" },
    information: {
      description:
        "The Audit and Inspection Department conducts internal audits, compliance checks, and inspections across Oromia Majlis offices and programs. It promotes accountability, detects irregularities, and recommends improvements in line with Islamic ethics and regulatory requirements.",
      mission:
        "To safeguard the integrity and resources of Oromia Majlis through independent audit and inspection, ensuring compliance, transparency, and continuous improvement.",
      vision:
        "To be a trusted guardian of accountability and good governance within Oromia Majlis and a reference for Islamic institutions.",
    },
    message: {
      title: "Message from the Director",
      content:
        "Accountability is central to our faith and to public trust. Our department works independently to verify that operations, finances, and practices meet the highest standards so that the community can have confidence in Oromia Majlis.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "audit@oromiamajlis.et",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Fri: 8:00 AM - 5:30 PM",
    },
    services: [
      "Internal audit and risk assessment",
      "Compliance and process inspection",
      "Fraud prevention and detection",
      "Recommendations for improvement",
      "Follow-up on corrective actions",
    ],
  },
  "education-training": {
    name: "Education and Training Department",
    head: { name: "Director", title: "Department Director", image: "👤" },
    information: {
      description:
        "The Education and Training Department develops and delivers Islamic and professional education and training programs for imams, teachers, and staff. It supports curriculum development, teacher training, and capacity building to raise the quality of Islamic education across the Oromia Region.",
      mission:
        "To provide high-quality Islamic and professional education and training that equips religious and community workers with the knowledge and skills to serve the Muslim community effectively.",
      vision:
        "To be the leading provider of Islamic and institutional training in the region, building a capable and knowledgeable workforce for Oromia Majlis and the community.",
    },
    message: {
      title: "Message from the Director",
      content:
        "Education and training are investments in our future. We are committed to developing curricula and programs that strengthen both religious understanding and professional competence, so that our personnel can serve with excellence.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "education@oromiamajlis.et",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Fri: 8:00 AM - 5:30 PM",
    },
    services: [
      "Curriculum development for Islamic education",
      "Imam and teacher training programs",
      "Professional and leadership training",
      "Certification and accreditation support",
      "Training materials and resource development",
    ],
  },
  "dawah-guidance-irshad": {
    name: "Da'wah and Guidance (Irshad) Department",
    head: { name: "Sheik Said Muhammad ", title: "Department Head", image: "/img/120.jpg" },
    information: {
      description:
        "The Da'wah and Guidance (Irshad) Department organizes and coordinates da'wah activities, religious guidance, and outreach programs. It promotes authentic Islamic teachings, supports preachers and guides, and engages with the community to strengthen faith and practice.",
      mission:
        "To convey Islam with wisdom and clarity through organized da'wah and guidance, fostering religious awareness, correct practice, and spiritual growth in the Oromia Region.",
      vision:
        "To have a vibrant, well-coordinated da'wah and guidance system that reaches every corner of the region with authentic, balanced Islamic message.",
    },
    message: {
      title: "Message from the Director",
      content:
        "Da'wah and irshad are at the heart of our mission. We work to ensure that Islamic call and guidance are carried out with knowledge, wisdom, and compassion, so that people may understand and live Islam in the best way.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "dawah@oriasc.org",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Sat: 8:00 AM - 5:30 PM",
    },
    services: [
      "Da'wah program planning and coordination",
      "Preacher and guide support and training",
      "Religious awareness campaigns",
      "Guidance and counseling coordination",
      "Outreach and community engagement",
    ],
  },
  "fatwa-islamic-research": {
    name: "Fatwa and Islamic Research Department",
    head: { name: "Director", title: "Department Director", image: "👤" },
    information: {
      description:
        "The Fatwa and Islamic Research Department issues religious rulings (fatwas) and conducts Islamic research in accordance with recognized schools of jurisprudence. It addresses contemporary questions, produces research, and supports evidence-based religious guidance for the community and institutions.",
      mission:
        "To provide sound, evidence-based fatwas and Islamic research that serve the Muslim community and institutions, in line with authentic Islamic scholarship and Ethiopian context.",
      vision:
        "To be the trusted reference for fatwa and Islamic research in the Oromia Region, combining tradition and contemporary scholarship.",
    },
    message: {
      title: "Message from the Director",
      content:
        "Fatwa and research require knowledge, integrity, and care. Our department is committed to issuing rulings and conducting research that are grounded in the Qur'an, Sunnah, and recognized scholarly methods, so that the community may have reliable guidance.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "fatwa@oromiamajlis.et",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Fri: 8:00 AM - 5:30 PM",
    },
    services: [
      "Fatwa issuance on religious and contemporary issues",
      "Islamic research and studies",
      "Scholarly consultation for institutions",
      "Documentation and publication of rulings",
      "Coordination with national fatwa bodies",
    ],
  },
  "mosques-awqaf-heritage": {
    name: "Mosques, Awqaf, and Islamic Heritage Administration Department",
    head: { name: "Sheik Mubaarak Ibraahim Abbaas", title: "Department Head", image: "/img/116.jpg" },
    information: {
      description:
        "The Mosques, Awqaf, and Islamic Heritage Administration Department supervises mosques, awqaf (endowments), and Islamic heritage sites in the Oromia Region. It supports registration, maintenance, proper use of endowments, and preservation of Islamic cultural and historical assets.",
      mission:
        "To ensure mosques and awqaf are well-managed and serve the community, and to preserve and promote Islamic heritage in accordance with Sharia and national law.",
      vision:
        "To have well-maintained mosques, transparent and productive awqaf, and preserved Islamic heritage that benefit current and future generations.",
    },
    message: {
      title: "Message from the Director",
      content:
        "Mosques and awqaf are trusts from our community and our history. We are dedicated to their proper administration, maintenance, and the preservation of our Islamic heritage for the benefit of all.",
    },
    contact: {
      phone: "+251 91 341 3013",
      email: "mosques@oriasc.org",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Sat: 8:00 AM - 5:30 PM",
    },
    services: [
      "Mosque registration and supervision",
      "Awqaf administration and oversight",
      "Islamic heritage documentation and preservation",
      "Mosque and endowment facility support",
      "Coordination with mosque committees",
    ],
  },
  "zakat-administration-development": {
    name: "Zakat Administration and Development Department",
    head: { name: "Sheik Naziif Muusaa ", title: "Department Head", image: "/img/112.jpg" },
    information: {
      description:
        "The Zakat Administration and Development Department organizes the collection, distribution, and development use of zakat in the Oromia Region. It ensures Sharia-compliant collection, transparent distribution to eligible recipients, and projects that lift communities out of poverty.",
      mission:
        "To administer zakat with transparency and in accordance with Islamic law, ensuring it reaches rightful beneficiaries and contributes to sustainable development and poverty alleviation.",
      vision:
        "To be a model zakat administration that maximizes the social and economic impact of zakat for the benefit of the Muslim community and society.",
    },
    message: {
      title: "Message from the Director",
      content:
        "Zakat is a pillar of Islam and a means of social justice. We are committed to collecting and distributing it correctly, with full transparency, so that it truly serves the needy and strengthens our community.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "zakat@oriasc.org",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Sat: 8:00 AM - 5:30 PM",
    },
    services: [
      "Zakat collection and registration of payers",
      "Identification and support of eligible recipients",
      "Zakat-based development projects",
      "Reporting and transparency mechanisms",
      "Awareness and guidance on zakat rules",
    ],
  },
  "social-affairs-islamic-associations": {
    name: "Social Affairs and Islamic Associations Department",
    head: { name: "Sheik Yaasiin Jibroo", title: "Department Head", image: "/img/114.jpg" },
    information: {
      description:
        "The Social Affairs and Islamic Associations Department oversees social programs, family support, and coordination with Islamic associations and civil society. It promotes community welfare, family cohesion, and collaboration with organizations that serve the Muslim community.",
      mission:
        "To advance social welfare and family well-being, and to strengthen partnerships with Islamic associations and community organizations in service of the Muslim community.",
      vision:
        "To have a cohesive, well-served community supported by strong partnerships between Oromia Majlis and Islamic associations and civil society.",
    },
    message: {
      title: "Message from the Director",
      content:
        "Strong families and strong associations make a strong community. We work to support social programs, family guidance, and coordination with Islamic associations so that together we can serve more effectively.",
    },
    contact: {
      phone: "+251984578505",
      email: "social@oriasc.org",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Sat: 8:00 AM - 5:30 PM",
    },
    services: [
      "Social and family support programs",
      "Coordination with Islamic associations",
      "Community welfare initiatives",
      "Marriage and family guidance",
      "Civil society and partnership development",
    ],
  },
  "income-development": {
    name: "Income and Development Department",
    head: { name: "Director", title: "Department Director", image: "👤" },
    information: {
      description:
        "The Income and Development Department works to diversify and strengthen the revenue base of Oromia Majlis through Sharia-compliant income-generating activities and development projects. It supports financial sustainability and long-term institutional development.",
      mission:
        "To develop sustainable, Sharia-compliant income streams and development projects that enable Oromia Majlis to fulfill its mission and reduce dependence on external funding.",
      vision:
        "To achieve financial sustainability and institutional development through lawful, transparent, and impactful income and development initiatives.",
    },
    message: {
      title: "Message from the Director",
      content:
        "Sustainability allows us to serve for the long term. We focus on lawful income sources and development projects that strengthen Oromia Majlis and benefit the community, in line with Islamic principles.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "income@oromiamajlis.et",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Fri: 8:00 AM - 5:30 PM",
    },
    services: [
      "Income-generation and fundraising strategy",
      "Sharia-compliant investment oversight",
      "Development project design and support",
      "Partnership and grant development",
      "Sustainability planning and reporting",
    ],
  },
  "hajj-umrah-services": {
    name: "Hajj and Umrah Services Department",
    head: { name: "Sheik Muhammednuur Boru Guyyoo", title: "Department Head", image: "/img/113.jpg" },
    information: {
      description:
        "The Hajj and Umrah Services Department coordinates and supervises Hajj and Umrah services for pilgrims from the Oromia Region. It works with relevant authorities and service providers to ensure safe, organized, and spiritually fulfilling pilgrimages in accordance with Islamic requirements.",
      mission:
        "To facilitate Hajj and Umrah for pilgrims from the Oromia Region with proper guidance, coordination, and care, in compliance with Islamic and national regulations.",
      vision:
        "To enable every eligible Muslim in the region to perform Hajj and Umrah with ease, safety, and spiritual satisfaction.",
    },
    message: {
      title: "Message from the Director",
      content:
        "Hajj and Umrah are among the greatest acts of worship. We are committed to coordinating services, providing guidance, and ensuring that pilgrims from our region can perform these rites with peace of mind and devotion.",
    },
    contact: {
      phone: "+251921310379",
      email: "hajj@oriasc.org",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Sat: 8:00 AM - 5:30 PM",
    },
    services: [
      "Hajj and Umrah registration and coordination",
      "Pilgrim guidance and training",
      "Liaison with travel and government authorities",
      "Travel and document support",
      "Post-pilgrimage follow-up and support",
    ],
  },
  "legal-services": {
    name: "Legal Services Department",
    head: { name: "Director", title: "Department Director", image: "👤" },
    information: {
      description:
        "The Legal Services Department provides legal advice, contract review, and representation for Oromia Majlis. It ensures that the Council's activities, agreements, and operations comply with Ethiopian law and supports the resolution of legal matters in the interest of the institution and the community.",
      mission:
        "To safeguard the legal interests of Oromia Majlis and support compliance with national laws, while facilitating access to justice and legal clarity for the Council's work.",
      vision:
        "To be a reliable legal backbone for Oromia Majlis, ensuring that all operations are lawful, well-documented, and protected.",
    },
    message: {
      title: "Message from the Director",
      content:
        "Legal clarity protects the institution and those we serve. We provide advice, review agreements, and support Oromia Majlis in all legal matters so that we can operate with confidence and within the law.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "legal@oromiamajlis.et",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Fri: 8:00 AM - 5:30 PM",
    },
    services: [
      "Legal advice and opinion",
      "Contract and agreement review",
      "Representation and dispute support",
      "Compliance and regulatory guidance",
      "Legal documentation and registration",
    ],
  },
  "security-public-relations": {
    name: "Security and Public Relations Department",
    head: { name: "Ustaaz Kaliil Adamu", title: "Department Head", image: "/img/115.jpg" },
    information: {
      description:
        "The Security and Public Relations Department is responsible for the security of Oromia Majlis premises, personnel, and events, and for building positive relations with the public, government, and other stakeholders. It helps maintain a safe environment and a positive image of the Council.",
      mission:
        "To ensure a secure environment for Oromia Majlis operations and to foster constructive relations with the public and stakeholders, in support of the Council's mission and reputation.",
      vision:
        "To be recognized for a safe, professional environment and for trusted, transparent engagement with the community and partners.",
    },
    message: {
      title: "Message from the Director",
      content:
        "Security and good relations go hand in hand. We work to protect our people and assets and to build trust with the public and partners, so that Oromia Majlis can serve in safety and with credibility.",
    },
    contact: {
      phone: "+251 91 335 5575",
      email: "security@oriasc.org",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Sat: 8:00 AM - 5:30 PM",
    },
    services: [
      "Premises and event security",
      "Visitor and access management",
      "Public and stakeholder relations",
      "Crisis and incident response support",
      "Coordination with law enforcement",
    ],
  },
  "communications": {
    name: "Communications Department of Oromia Majlis",
    head: { name: "Sheik Sulxaan Muhammed ", title: "Department Head", image: "/img/118.jpg" },
    information: {
      description:
        "The Communications Department manages internal and external communications of Oromia Majlis. It handles media relations, content production, public announcements, and digital and traditional channels to inform the community and stakeholders and to present the Council's work accurately and professionally.",
      mission:
        "To communicate Oromia Majlis's message clearly, consistently, and professionally to the Muslim community, media, and the public, in support of transparency and engagement.",
      vision:
        "To be the trusted voice of Oromia Majlis, ensuring that accurate and constructive information reaches everyone who needs it.",
    },
    message: {
      title: "Message from the Director",
      content:
        "Clear communication builds trust. We are committed to sharing news, decisions, and activities in a timely and accurate way, so that the community and partners stay informed and engaged with Oromia Majlis.",
    },
    contact: {
      phone: "+251 90 223 5946",
      email: "communications@oriasc.org",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Sat: 8:00 AM - 5:30 PM",
    },
    services: [
      "Media relations and press releases",
      "Content and publication production",
      "Public announcements and campaigns",
      "Digital and social media management",
      "Internal communication support",
    ],
  },
  "study-research-policy": {
    name: "Study, Research, and Policy Department",
    head: { name: "Director", title: "Department Director", image: "👤" },
    information: {
      description:
        "The Study, Research, and Policy Department conducts studies and research on Islamic affairs, society, and policy issues affecting the Muslim community. It produces evidence-based analysis and policy recommendations to support decision-making and strategic planning within Oromia Majlis.",
      mission:
        "To produce high-quality studies, research, and policy advice that inform Oromia Majlis's strategies and positions and serve the best interests of the Muslim community.",
      vision:
        "To be the primary source of evidence-based insight and policy input for Oromia Majlis and for stakeholders interested in Islamic affairs in the region.",
    },
    message: {
      title: "Message from the Director",
      content:
        "Good decisions need good information. We carry out studies and research so that Oromia Majlis can plan and act on the basis of evidence and sound policy analysis, for the benefit of the community.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "research@oromiamajlis.et",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Fri: 8:00 AM - 5:30 PM",
    },
    services: [
      "Studies on Islamic affairs and society",
      "Policy research and recommendations",
      "Strategic and situational analysis",
      "Report and briefing production",
      "Support to planning and decision-making",
    ],
  },
  "youth-womens-council": {
    name: "Youth and Women's Council Department",
    head: { name: "Ustaaz Shuayib Shamsu", title: "Department Head", image: "/img/117.jpg" },
    information: {
      description:
        "The Youth and Women's Council Department supports the participation, empowerment, and representation of youth and women within Oromia Majlis and the Muslim community. It coordinates programs, councils, and initiatives that address the specific needs and potential of youth and women in religious and community life.",
      mission:
        "To empower youth and women and ensure their meaningful participation in the programs and leadership of Oromia Majlis and in the broader Muslim community.",
      vision:
        "To have an inclusive community where youth and women are active, empowered, and recognized as essential contributors to Islamic and social life.",
    },
    message: {
      title: "Message from the Director",
      content:
        "Youth and women are the backbone of our community. We work to create spaces, programs, and opportunities so that they can contribute fully to religious, social, and institutional life with confidence and support.",
    },
    contact: {
      phone: "+251 9XX XXX XXX",
      email: "youth@oriasc.org",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Sat: 8:00 AM - 5:30 PM",
    },
    services: [
      "Youth programs and council coordination",
      "Women's council and empowerment programs",
      "Leadership and capacity building",
      "Participation in religious and community activities",
      "Advocacy and representation support",
    ],
  },
  "it-digital-services": {
    name: "Information Technology (IT) and Digital Services Department",
    head: { name: "Gurmessa Milkiyoo", title: "Department Head", image: "/img/Gurmessa.jpg" },
    information: {
      description:
        "The Information Technology (IT) and Digital Services Department manages Oromia Majlis's technology infrastructure, digital systems, and online services. It supports websites, data management, cybersecurity, and digital tools that improve efficiency and access to the Council's services.",
      mission:
        "To provide reliable, secure, and user-friendly IT and digital services that enable Oromia Majlis to operate efficiently and to serve the community through modern technology.",
      vision:
        "To be the enabler of a digital-ready Oromia Majlis, where technology supports transparency, accessibility, and quality service delivery.",
    },
    message: {
      title: "Message from the Director",
      content:
        "Technology, when used wisely, helps us serve better and reach further. We are committed to maintaining robust systems, protecting data, and expanding digital services so that Oromia Majlis can meet the expectations of a modern community.",
    },
    contact: {
      phone: "+251 91 712 3477",
      email: "ict@oriasc.org",
      address: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
      hours: "Mon - Sat: 8:00 AM - 5:30 PM",
    },
    services: [
      "IT infrastructure and network management",
      "Website and digital platform maintenance",
      "Data management and cybersecurity",
      "Digital service development and support",
      "User support and training",
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
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-teal-50/25">
      <section className="relative py-14 lg:py-20">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-teal-100/35 to-transparent"
          aria-hidden
        />
        <div className="container relative mx-auto px-4">
          <OfficesBreadcrumb current={departmentName} />

          {id === "halal-services" ? (
            <HalalServicesDepartmentView
              departmentName={departmentName}
              head={departmentData.head}
              contact={departmentData.contact}
              services={departmentData.services}
              messageTitle={departmentData.message.title}
              messageContent={departmentData.message.content}
            />
          ) : (
            <>
              {/* Department Header */}
              <div className="mb-8 rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-white to-teal-50/40 p-8 shadow-lg ring-1 ring-gray-100/90 md:p-10">
                <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
                  {departmentName}
                </h1>
                <p className="text-lg leading-relaxed text-gray-600">
                  {departmentData.information.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/offices"
                    className="inline-flex items-center gap-2 rounded-xl border border-teal-200 bg-white px-4 py-2.5 text-sm font-semibold text-teal-800 shadow-sm transition hover:border-teal-300 hover:bg-teal-50"
                  >
                    ← All departments
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
                  >
                    Home
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  <DepartmentHeadCard
                    name={departmentData.head.name}
                    title={departmentData.head.title}
                    image={departmentData.head.image}
                  />

                  {/* Department Information */}
                  <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-md ring-1 ring-gray-100/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-200/70 hover:shadow-xl">
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
                  <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-md ring-1 ring-gray-100/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-200/70 hover:shadow-xl">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      {departmentData.message.title}
                    </h2>
                    <div className="border-l-4 border-teal-600 pl-6">
                      <p className="text-gray-700 leading-relaxed italic">
                        {departmentData.message.content}
                      </p>
                      <p className="text-gray-600 mt-4 font-semibold">
                        — {departmentData.head.name}
                      </p>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-md ring-1 ring-gray-100/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-200/70 hover:shadow-xl">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Our Services
                    </h2>
                    <ul className="space-y-3">
                      {departmentData.services.map((service, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="mt-1 font-bold text-teal-600">•</span>
                          <span className="text-gray-700">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Contact Information */}
                  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md ring-1 ring-gray-100/80 transition-all duration-300 hover:shadow-lg">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Contact Information
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <span className="text-xl text-teal-600">📞</span>
                        <div>
                          <p className="font-semibold text-gray-900">Phone</p>
                          <p className="text-gray-600">{departmentData.contact.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-xl text-teal-600">✉️</span>
                        <div>
                          <p className="font-semibold text-gray-900">Email</p>
                          <p className="text-gray-600">{departmentData.contact.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-xl text-teal-600">📍</span>
                        <div>
                          <p className="font-semibold text-gray-900">Address</p>
                          <p className="text-gray-600">{departmentData.contact.address}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-xl text-teal-600">🕐</span>
                        <div>
                          <p className="font-semibold text-gray-900">Office Hours</p>
                          <p className="text-gray-600">{departmentData.contact.hours}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md ring-1 ring-gray-100/80 transition-all duration-300 hover:shadow-lg">
                    <h2 className="mb-6 text-xl font-bold text-gray-900">
                      Quick Links
                    </h2>
                    <ul className="space-y-1">
                      <li>
                        <Link
                          href="/offices"
                          className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-teal-50 hover:text-teal-900"
                        >
                          All departments
                          <span className="text-teal-600 transition group-hover:translate-x-0.5">
                            →
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/services"
                          className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-teal-50 hover:text-teal-900"
                        >
                          Services
                          <span className="text-teal-600">→</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/news"
                          className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-teal-50 hover:text-teal-900"
                        >
                          News &amp; Updates
                          <span className="text-teal-600">→</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/contact"
                          className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-teal-50 hover:text-teal-900"
                        >
                          Contact us
                          <span className="text-teal-600">→</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/"
                          className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-teal-50 hover:text-teal-900"
                        >
                          Home
                          <span className="text-teal-600">→</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

