import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Wait a bit for Strapi to fully initialize
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Seed hero section data if it doesn't exist
    try {
      // Check if content type is registered
      const contentType = strapi.contentTypes['api::hero-section.hero-section'];
      if (!contentType) {
        console.warn('⚠️ Hero Section content type not found. Please create it via Content-Type Builder first.');
        return;
      }

      // Define sample data (3 slides and 5 services)
      const slidesData = [
        {
          title: "Oromia Regional Islamic Affairs Supreme Council",
          subtitle: "Overseeing Islamic affairs in the Oromia region, representing the interests of Muslims, and managing Islamic affairs with dedication and excellence.",
          ctaText: "Learn More",
          ctaLink: "/about",
          image: null, // Will be uploaded via admin panel
        },
        {
          title: "Serving the Muslim Community",
          subtitle: "Promoting Islamic values, supporting religious education, and fostering unity among Muslims in the Oromia region.",
          ctaText: "Get Involved",
          ctaLink: "/services",
          image: null,
        },
        {
          title: "Preserving Islamic Heritage",
          subtitle: "Protecting and promoting Islamic culture, traditions, and values throughout the Oromia region for future generations.",
          ctaText: "Discover More",
          ctaLink: "/about",
          image: null,
        },
      ];

      // Create sample services data (exactly 6 services)
      const servicesData = [
        {
          icon: "🕌",
          title: "Religious Services",
          description: "Mosque management, prayer times, and religious guidance for the community.",
          href: "/services",
        },
        {
          icon: "📚",
          title: "Islamic Education",
          description: "Quranic studies, Islamic schools, and educational programs for all ages.",
          href: "/education",
        },
        {
          icon: "🤝",
          title: "Community Support",
          description: "Social services, charity programs, and community development initiatives.",
          href: "/community",
        },
        {
          icon: "⚖️",
          title: "Islamic Law & Justice",
          description: "Sharia law guidance, dispute resolution, and legal consultation services.",
          href: "/justice",
        },
        {
          icon: "🌍",
          title: "Interfaith Relations",
          description: "Building bridges with other faith communities and promoting harmony.",
          href: "/interfaith",
        },
        {
          icon: "📋",
          title: "Administrative Services",
          description: "Documentation, certificates, and official administrative support for the community.",
          href: "/admin",
        },
      ];

      // For single types in Strapi 5, check if entry exists
      let existingHero = null;
      let needsUpdate = false;
      
      try {
        // Try using documents API first (Strapi 5)
        const docs = await strapi.documents('api::hero-section.hero-section').findMany({
          limit: 1,
        });
        existingHero = docs && docs.length > 0 ? docs[0] : null;
      } catch (docError) {
        // Fallback to entityService
        try {
          const result = await strapi.entityService.findMany('api::hero-section.hero-section', {
            limit: 1,
            populate: ['slides', 'services'],
          });
          existingHero = Array.isArray(result) && result.length > 0 ? result[0] : result;
        } catch (entityError) {
          // Entry doesn't exist yet, which is fine
          existingHero = null;
        }
      }

      // Check if existing entry needs update (empty slides or services)
      if (existingHero) {
        const existingSlides = existingHero.slides || [];
        const existingServices = existingHero.services || [];
        
        console.log('📊 Existing hero section check:', {
          id: existingHero.id || existingHero.documentId,
          slidesCount: existingSlides.length,
          servicesCount: existingServices.length,
          publishedAt: existingHero.publishedAt,
        });
        
        if (existingSlides.length === 0 || existingServices.length === 0) {
          needsUpdate = true;
          console.log('⚠️ Existing hero section has empty slides or services. Updating...');
        }
      }

      if (!existingHero || needsUpdate) {
        const dataToSave = {
          slides: slidesData,
          services: servicesData,
          publishedAt: new Date(),
        };
        
        console.log('💾 Saving hero section data:', {
          slidesCount: slidesData.length,
          servicesCount: servicesData.length,
          isUpdate: needsUpdate && !!existingHero,
        });

        try {
          if (existingHero && needsUpdate) {
            // Update existing entry
            try {
              await strapi.documents('api::hero-section.hero-section').update({
                documentId: existingHero.documentId || existingHero.id,
                data: dataToSave,
              });
              console.log('✅ Hero section data updated successfully (via documents API)');
            } catch (docError) {
              // Fallback to entityService
              await strapi.entityService.update('api::hero-section.hero-section', existingHero.id || existingHero.documentId, {
                data: dataToSave,
              });
              console.log('✅ Hero section data updated successfully (via entityService)');
            }
          } else {
            // Create new entry
            try {
              // Try using documents API (Strapi 5)
              await strapi.documents('api::hero-section.hero-section').create({
                data: dataToSave,
              });
              console.log('✅ Hero section data seeded successfully (via documents API)');
              console.log(`   - Created ${slidesData.length} slides`);
              console.log(`   - Created ${servicesData.length} services`);
            } catch (docError) {
              // Fallback to entityService
              await strapi.entityService.create('api::hero-section.hero-section', {
                data: dataToSave,
              });
              console.log('✅ Hero section data seeded successfully (via entityService)');
              console.log(`   - Created ${slidesData.length} slides`);
              console.log(`   - Created ${servicesData.length} services`);
            }
          }
        } catch (error) {
          console.error('❌ Failed to save hero section entry:', error);
          console.log('💡 Please create/update the entry manually via Content Manager');
        }
      } else {
        console.log('ℹ️ Hero section data already exists with content');
      }
    } catch (error) {
      console.error('❌ Error seeding hero section data:', error);
      // Don't throw - allow Strapi to start even if seeding fails
    }

    // Seed services data if it doesn't exist
    try {
      // Check if content type is registered
      const serviceContentType = strapi.contentTypes['api::service.service'];
      if (!serviceContentType) {
        console.warn('⚠️ Service content type not found. Please create it via Content-Type Builder first.');
        return;
      }

      // Define services data
      const servicesData = [
        {
          icon: "🕋",
          title: "Hajj & Umrah Affairs",
          description: "Coordination, guidance, and supervision of Hajj and Umrah services for pilgrims from the Oromia Region.",
          href: "/services/hajj-umrah",
          publishedAt: new Date(),
        },
        {
          icon: "🕌",
          title: "Mosque & Islamic Institution Affairs",
          description: "Supervision, guidance, and support for mosques and Islamic institutions across the Oromia Region.",
          href: "/services/mosques",
          publishedAt: new Date(),
        },
        {
          icon: "📖",
          title: "Islamic Education & Da'wah",
          description: "Promotion of Islamic education, religious awareness programs, and authentic da'wah activities.",
          href: "/services/islamic-education",
          publishedAt: new Date(),
        },
        {
          icon: "🤲",
          title: "Zakat, Sadaqah & Charity Coordination",
          description: "Organizing and supervising zakat, sadaqah, and charitable initiatives to support the needy.",
          href: "/services/zakat-charity",
          publishedAt: new Date(),
        },
        {
          icon: "👨‍👩‍👧",
          title: "Marriage & Family Guidance",
          description: "Religious guidance and counseling on marriage, family life, and social responsibility.",
          href: "/services/family-guidance",
          publishedAt: new Date(),
        },
        {
          icon: "⚖️",
          title: "Religious Affairs & Fatwa Services",
          description: "Providing guidance on religious matters in accordance with Islamic principles and national regulations.",
          href: "/services/religious-affairs",
          publishedAt: new Date(),
        },
        {
          icon: "🏫",
          title: "Training & Capacity Building",
          description: "Training programs for imams, scholars, and community leaders to enhance institutional capacity.",
          href: "/services/training",
          publishedAt: new Date(),
        },
        {
          icon: "🤝",
          title: "Community Peace & Social Harmony",
          description: "Promoting unity, peaceful coexistence, dialogue, and conflict resolution within communities.",
          href: "/services/community-peace",
          publishedAt: new Date(),
        },
        {
          icon: "📊",
          title: "Research, Documentation & Publications",
          description: "Research, documentation, and publication of Islamic studies, guidelines, and official materials.",
          href: "/services/research",
          publishedAt: new Date(),
        },
        {
          icon: "🌍",
          title: "Interfaith & Public Relations",
          description: "Engagement with religious institutions, government bodies, and stakeholders to foster cooperation.",
          href: "/services/interfaith-relations",
          publishedAt: new Date(),
        },
      ];

      // Check if services already exist
      let existingServices = [];
      try {
        const docs = await strapi.documents('api::service.service').findMany({
          limit: 100,
        });
        existingServices = docs || [];
      } catch (docError) {
        try {
          const result = await strapi.entityService.findMany('api::service.service', {
            limit: 100,
          });
          existingServices = Array.isArray(result) ? result : [];
        } catch (entityError) {
          existingServices = [];
        }
      }

      console.log(`📊 Found ${existingServices.length} existing services`);

      if (existingServices.length === 0) {
        // Create all services
        console.log(`💾 Creating ${servicesData.length} services...`);
        
        for (const serviceData of servicesData) {
          try {
            await strapi.documents('api::service.service').create({
              data: serviceData,
            });
          } catch (docError) {
            try {
              await strapi.entityService.create('api::service.service', {
                data: serviceData,
              });
            } catch (entityError) {
              console.error(`❌ Failed to create service: ${serviceData.title}`, entityError);
            }
          }
        }
        
        console.log('✅ Services data seeded successfully');
        console.log(`   - Created ${servicesData.length} services`);
      } else {
        console.log('ℹ️ Services already exist. Skipping seeding.');
      }
    } catch (error) {
      console.error('❌ Error seeding services data:', error);
      // Don't throw - allow Strapi to start even if seeding fails
    }

    // Seed articles/news data if it doesn't exist
    try {
      // Check if content type is registered
      const articleContentType = strapi.contentTypes['api::article.article'];
      if (!articleContentType) {
        console.warn('⚠️ Article content type not found. Please create it via Content-Type Builder first.');
        return;
      }

      // Define articles data aligned with Oromia Majlis
      const articlesData = [
        {
          title: "Oromia Majlis Announces New Religious Education Initiatives",
          slug: "oromia-majlis-announces-new-religious-education-initiatives",
          excerpt: "Oromia Regional Islamic Affairs Supreme Council launches comprehensive programs to enhance Islamic education and religious awareness across the region.",
          content: `<p>Oromia Regional Islamic Affairs Supreme Council is pleased to announce the launch of new religious education initiatives designed to strengthen Islamic knowledge and awareness throughout the Oromia Region. These programs aim to provide quality Islamic education to Muslims of all ages and backgrounds.</p>
          
          <h2>1. Enhanced Quranic Studies Programs</h2>
          <p>We are expanding our Quranic studies programs to include advanced memorization courses, Tajweed training, and Tafsir (Quranic interpretation) classes. These programs will be available at mosques and Islamic centers across the region, ensuring accessibility for all community members.</p>
          
          <h2>2. Islamic School Support and Development</h2>
          <p>Our department is committed to supporting Islamic schools and institutions. We provide resources, training for teachers, and accreditation services to ensure that Islamic education meets high standards of quality and authenticity.</p>
          
          <h2>3. Community Da'wah Programs</h2>
          <p>We organize regular da'wah activities and religious awareness campaigns to promote authentic Islamic teachings and strengthen the faith of the Muslim community. These programs include lectures, workshops, and community gatherings.</p>
          
          <p>These initiatives reflect our commitment to promoting Islamic education and strengthening the Muslim community in the Oromia Region. We encourage all community members to participate and benefit from these programs.</p>`,
          category: "Education",
          author: "Oromia Majlis",
          featured: true,
          publishedAt: new Date(),
        },
        {
          title: "Annual Islamic Affairs Summit Scheduled for January 2026",
          slug: "annual-islamic-affairs-summit-2026",
          excerpt: "Oromia Majlis will host its annual Islamic Affairs Summit bringing together scholars, community leaders, and stakeholders to discuss important matters affecting the Muslim community.",
          content: `<p>Oromia Regional Islamic Affairs Supreme Council is organizing the Annual Islamic Affairs Summit 2026, scheduled to take place in January. This important gathering will bring together Islamic scholars, community leaders, mosque administrators, and other stakeholders from across the Oromia Region.</p>
          
          <h2>Summit Objectives</h2>
          <p>The summit aims to address key issues affecting the Muslim community, including religious education, mosque management, community services, and interfaith relations. Participants will have the opportunity to share experiences, discuss challenges, and develop strategies for strengthening Islamic affairs management.</p>
          
          <h2>Key Topics</h2>
          <p>Topics to be covered include:</p>
          <ul>
            <li>Enhancing Islamic education and scholarship</li>
            <li>Strengthening mosque administration and services</li>
            <li>Community welfare and social services</li>
            <li>Promoting unity and harmony within the Muslim community</li>
            <li>Interfaith dialogue and cooperation</li>
          </ul>
          
          <p>We invite all interested community members and stakeholders to participate in this important event. Registration details will be announced soon.</p>`,
          category: "Events",
          author: "Oromia Majlis",
          featured: true,
          publishedAt: new Date(),
        },
        {
          title: "Community Zakat Distribution Program Launched",
          slug: "community-zakat-distribution-program",
          excerpt: "Oromia Majlis launches a comprehensive Zakat distribution program to support needy families and strengthen the social fabric of the Muslim community.",
          content: `<p>Oromia Regional Islamic Affairs Supreme Council has launched a new Zakat distribution program designed to efficiently collect and distribute Zakat funds to eligible recipients throughout the Oromia Region.</p>
          
          <h2>Program Overview</h2>
          <p>This program ensures that Zakat is collected properly according to Islamic principles and distributed fairly to those in need. We work with mosques, community organizations, and individuals to maximize the impact of charitable giving.</p>
          
          <h2>Eligibility and Distribution</h2>
          <p>Zakat funds are distributed to eligible recipients including the poor, needy, those in debt, travelers, and others as specified in Islamic law. Our department maintains strict transparency and accountability in all Zakat operations.</p>
          
          <h2>How to Contribute</h2>
          <p>Community members can contribute their Zakat through designated collection points at mosques and Islamic centers, or directly through our office. All contributions are properly documented and distributed according to Islamic guidelines.</p>
          
          <p>This program strengthens the bonds of brotherhood and sisterhood within our community while fulfilling our religious obligation to support those in need.</p>`,
          category: "Community",
          author: "Oromia Majlis",
          featured: false,
          publishedAt: new Date(),
        },
        {
          title: "New Mosque Registration and Support Services Available",
          slug: "new-mosque-registration-support-services",
          excerpt: "Oromia Majlis introduces enhanced services for mosque registration, facility support, and management assistance to help mosques serve their communities better.",
          content: `<p>Oromia Regional Islamic Affairs Supreme Council has introduced enhanced services to support mosques and Islamic institutions across the region. These services aim to ensure that mosques are properly registered, well-maintained, and effectively serve their communities.</p>
          
          <h2>Mosque Registration Services</h2>
          <p>We provide comprehensive registration services for new mosques, ensuring compliance with both Islamic requirements and national regulations. Our team assists with the registration process, documentation, and initial setup.</p>
          
          <h2>Facility Support and Maintenance</h2>
          <p>Our department offers support for mosque maintenance, facility improvements, and infrastructure development. We help coordinate resources and provide guidance for maintaining mosque facilities in good condition.</p>
          
          <h2>Management and Administration</h2>
          <p>We provide training and support for mosque administrators and committees, helping them manage mosque affairs effectively. This includes financial management, event coordination, and community engagement strategies.</p>
          
          <p>Mosques are the heart of our Muslim community, and we are committed to ensuring they have the support they need to serve effectively.</p>`,
          category: "Services",
          author: "Oromia Majlis",
          featured: false,
          publishedAt: new Date(),
        },
        {
          title: "Interfaith Dialogue Initiative Strengthens Community Relations",
          slug: "interfaith-dialogue-initiative",
          excerpt: "Oromia Majlis continues to promote interfaith dialogue and cooperation, building bridges with other faith communities while representing Muslim interests.",
          content: `<p>Oromia Regional Islamic Affairs Supreme Council continues its efforts to promote interfaith dialogue and understanding. Through regular engagement with other faith communities, we work to build mutual respect and cooperation while representing the interests of the Muslim community.</p>
          
          <h2>Building Bridges</h2>
          <p>Our interfaith initiatives include regular dialogue sessions, joint community service projects, and collaborative efforts to address common challenges. These activities promote understanding and harmony within our diverse society.</p>
          
          <h2>Representing Muslim Interests</h2>
          <p>We actively represent the interests of the Muslim community in discussions with government bodies, other religious institutions, and civil society organizations. Our goal is to ensure that Muslim voices are heard and Muslim needs are addressed.</p>
          
          <h2>Promoting Peaceful Coexistence</h2>
          <p>Through respectful dialogue and cooperation, we promote peaceful coexistence and mutual understanding. We believe that different faith communities can work together for the common good while respecting each other's beliefs and practices.</p>
          
          <p>These efforts strengthen our community and contribute to a more harmonious and prosperous society for all.</p>`,
          category: "Community",
          author: "Oromia Majlis",
          featured: false,
          publishedAt: new Date(),
        },
        {
          title: "Training Program for Imams and Religious Leaders",
          slug: "training-program-imams-religious-leaders",
          excerpt: "Oromia Majlis launches comprehensive training programs for imams and religious leaders to enhance their knowledge and leadership skills.",
          content: `<p>Oromia Regional Islamic Affairs Supreme Council has launched comprehensive training programs for imams, religious scholars, and community leaders. These programs aim to enhance religious knowledge, leadership skills, and the ability to serve the Muslim community effectively.</p>
          
          <h2>Program Components</h2>
          <p>The training includes courses on Islamic jurisprudence, Quranic studies, Hadith, Islamic history, and contemporary issues. Participants also receive training in leadership, community management, and effective communication.</p>
          
          <h2>Certification and Continuing Education</h2>
          <p>Upon completion, participants receive certification and have access to continuing education programs. We ensure that religious leaders are well-equipped to guide and serve their communities with knowledge and wisdom.</p>
          
          <h2>Impact on Community</h2>
          <p>Well-trained religious leaders are essential for the growth and strength of our community. These programs help ensure that our imams and scholars can effectively serve the Muslim community and provide authentic Islamic guidance.</p>
          
          <p>We encourage all imams and religious leaders to participate in these valuable training opportunities.</p>`,
          category: "Education",
          author: "Oromia Majlis",
          featured: false,
          publishedAt: new Date(),
        },
      ];

      // Check if articles already exist
      let existingArticles = [];
      try {
        const docs = await strapi.documents('api::article.article').findMany({
          limit: 100,
        });
        existingArticles = docs || [];
      } catch (docError) {
        try {
          const result = await strapi.entityService.findMany('api::article.article', {
            limit: 100,
          });
          existingArticles = Array.isArray(result) ? result : [];
        } catch (entityError) {
          existingArticles = [];
        }
      }

      console.log(`📊 Found ${existingArticles.length} existing articles`);

      if (existingArticles.length === 0) {
        // Create all articles
        console.log(`💾 Creating ${articlesData.length} articles...`);
        
        for (const articleData of articlesData) {
          try {
            await strapi.documents('api::article.article').create({
              data: articleData,
            });
          } catch (docError) {
            try {
              await strapi.entityService.create('api::article.article', {
                data: articleData,
              });
            } catch (entityError) {
              console.error(`❌ Failed to create article: ${articleData.title}`, entityError);
            }
          }
        }
        
        console.log('✅ Articles data seeded successfully');
        console.log(`   - Created ${articlesData.length} articles`);
      } else {
        console.log('ℹ️ Articles already exist. Skipping seeding.');
      }
    } catch (error) {
      console.error('❌ Error seeding articles data:', error);
      // Don't throw - allow Strapi to start even if seeding fails
    }

    // Seed projects data if it doesn't exist
    try {
      // Check if content type is registered
      const projectContentType = strapi.contentTypes['api::project.project'];
      if (!projectContentType) {
        console.warn('⚠️ Project content type not found. Please create it via Content-Type Builder first.');
        return;
      }

      // Define projects data aligned with Oromia Majlis
      type ProjectStatus = "Ongoing" | "Active" | "Planned" | "Completed";
      
      const projectsData: Array<{
        title: string;
        slug: string;
        description: string;
        fullDescription: string;
        type: string;
        status: ProjectStatus;
        department?: string;
        featured: boolean;
        publishedAt: Date;
      }> = [
        {
          title: "East African Grand Masjid Construction",
          slug: "east-african-grand-masjid-construction",
          description: "Construction of the largest mosque in East Africa in Oromia Region, serving as a regional Islamic hub.",
          fullDescription: `<p>This landmark project involves the construction of the largest mosque in East Africa, located in the Oromia Region. The Grand Masjid will serve as a regional Islamic hub, accommodating thousands of worshippers and providing facilities for Islamic education, community services, and cultural activities.</p>
          
          <h2>Project Objectives</h2>
          <ul>
            <li>Build a world-class Islamic center serving the Oromia Region</li>
            <li>Provide space for large congregational prayers and Islamic events</li>
            <li>Establish facilities for Islamic education and scholarship</li>
            <li>Create a hub for community services and cultural activities</li>
          </ul>
          
          <h2>Expected Outcomes</h2>
          <ul>
            <li>Enhanced capacity for religious gatherings and events</li>
            <li>Improved access to Islamic education and resources</li>
            <li>Strengthened sense of community and Islamic identity</li>
            <li>Regional recognition as a center of Islamic excellence</li>
          </ul>`,
          type: "Infrastructure / Religious Institution",
          status: "Ongoing",
          department: "Mosque & Islamic Institution Affairs",
          featured: true,
          publishedAt: new Date(),
        },
        {
          title: "Digitalization of Majlis Offices",
          slug: "digitalization-of-majlis-offices",
          description: "Full digital transformation of Oromia Majlis, including paperless workflows, internal portals, and record management.",
          fullDescription: `<p>The Digitalization of Majlis Offices project aims to transform Oromia Majlis into a fully digital organization. This comprehensive initiative includes implementing paperless workflows, developing internal portals, and establishing efficient record management systems.</p>
          
          <h2>Project Objectives</h2>
          <ul>
            <li>Eliminate paper-based processes and workflows</li>
            <li>Create centralized digital portals for staff and departments</li>
            <li>Implement efficient document and record management systems</li>
            <li>Improve internal communication and collaboration</li>
          </ul>
          
          <h2>Expected Outcomes</h2>
          <ul>
            <li>Increased operational efficiency and productivity</li>
            <li>Reduced costs and environmental impact</li>
            <li>Improved data security and accessibility</li>
            <li>Enhanced service delivery to the community</li>
          </ul>`,
          type: "IT / Administration",
          status: "Ongoing",
          department: "Administrative Services",
          featured: true,
          publishedAt: new Date(),
        },
        {
          title: "Mosque Digital Management System",
          slug: "mosque-digital-management-system",
          description: "Implementing a system to manage mosque assets, administration, donations, and community activities digitally.",
          fullDescription: `<p>The Mosque Digital Management System is a comprehensive platform designed to help mosques manage their operations digitally. The system handles mosque assets, administration, donations, and community activities, making mosque management more efficient and transparent.</p>
          
          <h2>Project Objectives</h2>
          <ul>
            <li>Digitize mosque asset and resource management</li>
            <li>Streamline administrative processes</li>
            <li>Improve transparency in donation and financial management</li>
            <li>Facilitate better coordination of community activities</li>
          </ul>
          
          <h2>Expected Outcomes</h2>
          <ul>
            <li>Improved efficiency in mosque operations</li>
            <li>Better financial transparency and accountability</li>
            <li>Enhanced community engagement and participation</li>
            <li>Standardized management practices across mosques</li>
          </ul>`,
          type: "IT / Religious Institution",
          status: "Planned",
          department: "Mosque & Islamic Institution Affairs",
          featured: false,
          publishedAt: new Date(),
        },
        {
          title: "Hajj & Umrah Pilgrim Support Program",
          slug: "hajj-umrah-pilgrim-support-program",
          description: "Organizing Hajj and Umrah pilgrimages with online registration, guidance, and logistics support for Oromia pilgrims.",
          fullDescription: `<p>The Hajj & Umrah Pilgrim Support Program provides comprehensive assistance to Muslims from the Oromia Region who wish to perform Hajj or Umrah. The program includes online registration, pre-pilgrimage guidance, and full logistics support.</p>
          
          <h2>Project Objectives</h2>
          <ul>
            <li>Facilitate Hajj and Umrah pilgrimages for Oromia Muslims</li>
            <li>Provide online registration and information systems</li>
            <li>Offer pre-pilgrimage guidance and training</li>
            <li>Coordinate logistics and support during the pilgrimage</li>
          </ul>
          
          <h2>Expected Outcomes</h2>
          <ul>
            <li>Increased number of successful pilgrimages</li>
            <li>Better preparation and guidance for pilgrims</li>
            <li>Improved coordination and support services</li>
            <li>Enhanced spiritual fulfillment for community members</li>
          </ul>`,
          type: "Religious / Community Service",
          status: "Active",
          department: "Hajj & Umrah Affairs",
          featured: true,
          publishedAt: new Date(),
        },
        {
          title: "Islamic Education Enhancement Project",
          slug: "islamic-education-enhancement-project",
          description: "Upgrading religious schools, training imams, and providing digital resources for Islamic education.",
          fullDescription: `<p>The Islamic Education Enhancement Project focuses on improving the quality and accessibility of Islamic education in the Oromia Region. This includes upgrading religious schools, providing comprehensive training for imams, and developing digital educational resources.</p>
          
          <h2>Project Objectives</h2>
          <ul>
            <li>Upgrade facilities and resources in religious schools</li>
            <li>Provide comprehensive training programs for imams</li>
            <li>Develop and distribute digital educational resources</li>
            <li>Improve the quality of Islamic education across the region</li>
          </ul>
          
          <h2>Expected Outcomes</h2>
          <ul>
            <li>Improved quality of Islamic education</li>
            <li>Better-trained and qualified imams</li>
            <li>Increased access to educational resources</li>
            <li>Enhanced religious knowledge in the community</li>
          </ul>`,
          type: "Education / Training",
          status: "Ongoing",
          department: "Islamic Education & Da'wah",
          featured: true,
          publishedAt: new Date(),
        },
        {
          title: "Community Peace & Harmony Initiative",
          slug: "community-peace-harmony-initiative",
          description: "Programs to promote unity, dialogue, and conflict resolution within Muslim communities.",
          fullDescription: `<p>The Community Peace & Harmony Initiative works to promote unity, dialogue, and conflict resolution within Muslim communities in the Oromia Region. Through various programs and activities, we aim to strengthen bonds of brotherhood and sisterhood.</p>
          
          <h2>Project Objectives</h2>
          <ul>
            <li>Promote unity and harmony within Muslim communities</li>
            <li>Facilitate dialogue and understanding</li>
            <li>Provide conflict resolution mechanisms</li>
            <li>Strengthen community bonds and cooperation</li>
          </ul>
          
          <h2>Expected Outcomes</h2>
          <ul>
            <li>Increased unity and cohesion in Muslim communities</li>
            <li>Reduced conflicts and misunderstandings</li>
            <li>Better communication and dialogue</li>
            <li>Stronger sense of community and belonging</li>
          </ul>`,
          type: "Social / Community Service",
          status: "Ongoing",
          department: "Community Services & Family Guidance",
          featured: false,
          publishedAt: new Date(),
        },
        {
          title: "Zakat & Charity Management Platform",
          slug: "zakat-charity-management-platform",
          description: "Digital system for collecting, distributing, and reporting Zakat, Sadaqah, and Waqf contributions.",
          fullDescription: `<p>The Zakat & Charity Management Platform is a comprehensive digital system designed to manage Zakat, Sadaqah, and Waqf contributions efficiently and transparently. The platform handles collection, distribution, and reporting of charitable funds.</p>
          
          <h2>Project Objectives</h2>
          <ul>
            <li>Create a transparent system for Zakat and charity collection</li>
            <li>Ensure proper distribution according to Islamic principles</li>
            <li>Provide detailed reporting and accountability</li>
            <li>Increase trust and participation in charitable giving</li>
          </ul>
          
          <h2>Expected Outcomes</h2>
          <ul>
            <li>Improved transparency in charity management</li>
            <li>More efficient collection and distribution</li>
            <li>Increased trust and participation from donors</li>
            <li>Better support for those in need</li>
          </ul>`,
          type: "IT / Financial / Religious Service",
          status: "Active",
          department: "Zakat & Charity Coordination",
          featured: true,
          publishedAt: new Date(),
        },
        {
          title: "Islamic Cultural Heritage Preservation",
          slug: "islamic-cultural-heritage-preservation",
          description: "Documentation, preservation, and promotion of Islamic historical sites and heritage in Oromia.",
          fullDescription: `<p>The Islamic Cultural Heritage Preservation project focuses on documenting, preserving, and promoting Islamic historical sites and cultural heritage in the Oromia Region. This initiative ensures that our rich Islamic heritage is protected for future generations.</p>
          
          <h2>Project Objectives</h2>
          <ul>
            <li>Document Islamic historical sites and heritage</li>
            <li>Preserve important Islamic cultural artifacts</li>
            <li>Promote awareness of Islamic heritage</li>
            <li>Create educational resources about Islamic history</li>
          </ul>
          
          <h2>Expected Outcomes</h2>
          <ul>
            <li>Preserved Islamic cultural heritage</li>
            <li>Increased awareness of Islamic history</li>
            <li>Educational resources for future generations</li>
            <li>Enhanced cultural identity and pride</li>
          </ul>`,
          type: "Culture / Heritage",
          status: "Planned",
          department: "Research, Documentation & Publications",
          featured: false,
          publishedAt: new Date(),
        },
        {
          title: "Youth & Women Empowerment Program",
          slug: "youth-women-empowerment-program",
          description: "Training, mentorship, and awareness programs for youth and women within the Muslim community.",
          fullDescription: `<p>The Youth & Women Empowerment Program provides comprehensive training, mentorship, and awareness programs specifically designed for youth and women within the Muslim community. The program aims to develop skills, build confidence, and create opportunities.</p>
          
          <h2>Project Objectives</h2>
          <ul>
            <li>Provide skills training and development programs</li>
            <li>Offer mentorship and guidance opportunities</li>
            <li>Raise awareness about important issues</li>
            <li>Create platforms for youth and women to contribute</li>
          </ul>
          
          <h2>Expected Outcomes</h2>
          <ul>
            <li>Empowered and skilled youth and women</li>
            <li>Increased participation in community activities</li>
            <li>Better opportunities for personal and professional growth</li>
            <li>Stronger representation and voice in the community</li>
          </ul>`,
          type: "Education / Social",
          status: "Active",
          department: "Community Services & Family Guidance",
          featured: false,
          publishedAt: new Date(),
        },
        {
          title: "Digital Publications & Media Project",
          slug: "digital-publications-media-project",
          description: "Producing online religious publications, newsletters, and media content to reach wider audiences.",
          fullDescription: `<p>The Digital Publications & Media Project focuses on producing high-quality online religious publications, newsletters, and media content. This initiative aims to reach wider audiences and provide accessible Islamic educational and informational resources.</p>
          
          <h2>Project Objectives</h2>
          <ul>
            <li>Produce regular online religious publications</li>
            <li>Create engaging newsletters and content</li>
            <li>Develop multimedia educational resources</li>
            <li>Reach wider audiences through digital platforms</li>
          </ul>
          
          <h2>Expected Outcomes</h2>
          <ul>
            <li>Increased access to Islamic educational content</li>
            <li>Better communication with the community</li>
            <li>Enhanced online presence and engagement</li>
            <li>Improved dissemination of information and knowledge</li>
          </ul>`,
          type: "IT / Media / Communication",
          status: "Ongoing",
          department: "Research, Documentation & Publications",
          featured: false,
          publishedAt: new Date(),
        },
      ];

      // Check if projects already exist
      let existingProjects = [];
      try {
        const docs = await strapi.documents('api::project.project').findMany({
          limit: 100,
        });
        existingProjects = docs || [];
      } catch (docError) {
        try {
          const result = await strapi.entityService.findMany('api::project.project', {
            limit: 100,
          });
          existingProjects = Array.isArray(result) ? result : [];
        } catch (entityError) {
          existingProjects = [];
        }
      }

      console.log(`📊 Found ${existingProjects.length} existing projects`);

      if (existingProjects.length === 0) {
        // Create all projects
        console.log(`💾 Creating ${projectsData.length} projects...`);
        
        for (const projectData of projectsData) {
          try {
            await strapi.documents('api::project.project').create({
              data: projectData,
            });
          } catch (docError) {
            try {
              await strapi.entityService.create('api::project.project', {
                data: projectData,
              });
            } catch (entityError) {
              console.error(`❌ Failed to create project: ${projectData.title}`, entityError);
            }
          }
        }
        
        console.log('✅ Projects data seeded successfully');
        console.log(`   - Created ${projectsData.length} projects`);
      } else {
        console.log('ℹ️ Projects already exist. Skipping seeding.');
      }
    } catch (error) {
      console.error('❌ Error seeding projects data:', error);
      // Don't throw - allow Strapi to start even if seeding fails
    }

    // Seed gallery items data if it doesn't exist
    try {
      // Check if content type is registered
      const galleryContentType = strapi.contentTypes['api::gallery-item.gallery-item'];
      if (!galleryContentType) {
        console.warn('⚠️ Gallery Item content type not found. Please create it via Content-Type Builder first.');
        return;
      }

      // Define gallery items data aligned with Oromia Majlis
      const galleryData = [
        {
          title: "Grand Masjid Construction Site",
          description: "Progress on the East African Grand Masjid construction",
          category: "Infrastructure",
          featured: true,
          publishedAt: new Date(),
        },
        {
          title: "Islamic Education Center",
          description: "Students at one of our Islamic education centers",
          category: "Education",
          featured: true,
          publishedAt: new Date(),
        },
        {
          title: "Community Gathering",
          description: "Muslim community gathering for religious events",
          category: "Community",
          featured: true,
          publishedAt: new Date(),
        },
        {
          title: "Hajj & Umrah Pilgrimage",
          description: "Oromia pilgrims preparing for Hajj and Umrah",
          category: "Religious",
          featured: false,
          publishedAt: new Date(),
        },
        {
          title: "Zakat Distribution",
          description: "Community Zakat distribution program",
          category: "Community",
          featured: false,
          publishedAt: new Date(),
        },
        {
          title: "Imam Training Program",
          description: "Training session for imams and religious leaders",
          category: "Education",
          featured: false,
          publishedAt: new Date(),
        },
        {
          title: "Interfaith Dialogue",
          description: "Interfaith dialogue and community relations",
          category: "Community",
          featured: false,
          publishedAt: new Date(),
        },
        {
          title: "Mosque Administration",
          description: "Mosque management and administration activities",
          category: "Infrastructure",
          featured: false,
          publishedAt: new Date(),
        },
        {
          title: "Youth Empowerment Program",
          description: "Youth training and empowerment activities",
          category: "Education",
          featured: false,
          publishedAt: new Date(),
        },
        {
          title: "Islamic Cultural Heritage",
          description: "Preservation of Islamic cultural heritage sites",
          category: "Culture",
          featured: false,
          publishedAt: new Date(),
        },
        {
          title: "Digital Services Launch",
          description: "Launch of digital services and platforms",
          category: "Technology",
          featured: false,
          publishedAt: new Date(),
        },
        {
          title: "Community Service",
          description: "Community service and welfare programs",
          category: "Community",
          featured: false,
          publishedAt: new Date(),
        },
        {
          title: "Religious Publications",
          description: "Islamic publications and media content",
          category: "Media",
          featured: false,
          publishedAt: new Date(),
        },
        {
          title: "Women's Program",
          description: "Women empowerment and training programs",
          category: "Education",
          featured: false,
          publishedAt: new Date(),
        },
        {
          title: "Annual Islamic Summit",
          description: "Annual Islamic Affairs Summit gathering",
          category: "Events",
          featured: true,
          publishedAt: new Date(),
        },
        {
          title: "Quranic Studies",
          description: "Quranic studies and recitation programs",
          category: "Education",
          featured: false,
          publishedAt: new Date(),
        },
        {
          title: "Mosque Facilities",
          description: "Modern mosque facilities and amenities",
          category: "Infrastructure",
          featured: false,
          publishedAt: new Date(),
        },
        {
          title: "Community Outreach",
          description: "Community outreach and awareness programs",
          category: "Community",
          featured: false,
          publishedAt: new Date(),
        },
      ];

      // Check if gallery items already exist
      let existingGallery = [];
      try {
        const docs = await strapi.documents('api::gallery-item.gallery-item').findMany({
          limit: 100,
        });
        existingGallery = docs || [];
      } catch (docError) {
        try {
          const result = await strapi.entityService.findMany('api::gallery-item.gallery-item', {
            limit: 100,
          });
          existingGallery = Array.isArray(result) ? result : [];
        } catch (entityError) {
          existingGallery = [];
        }
      }

      console.log(`📊 Found ${existingGallery.length} existing gallery items`);

      if (existingGallery.length === 0) {
        // Create all gallery items
        console.log(`💾 Creating ${galleryData.length} gallery items...`);
        
        for (const itemData of galleryData) {
          try {
            await strapi.documents('api::gallery-item.gallery-item').create({
              data: itemData as any, // Type assertion - image is optional in schema but types may be cached
            });
          } catch (docError) {
            try {
              await strapi.entityService.create('api::gallery-item.gallery-item', {
                data: itemData as any, // Type assertion - image is optional in schema but types may be cached
              });
            } catch (entityError) {
              console.error(`❌ Failed to create gallery item: ${itemData.title}`, entityError);
            }
          }
        }
        
        console.log('✅ Gallery items data seeded successfully');
        console.log(`   - Created ${galleryData.length} gallery items`);
      } else {
        console.log('ℹ️ Gallery items already exist. Skipping seeding.');
      }
    } catch (error) {
      console.error('❌ Error seeding gallery items data:', error);
      // Don't throw - allow Strapi to start even if seeding fails
    }

    // Seed events data if it doesn't exist
    try {
      // Check if content type is registered
      const eventContentType = strapi.contentTypes['api::event.event'];
      if (!eventContentType) {
        console.warn('⚠️ Event content type not found. Please create it via Content-Type Builder first.');
        return;
      }

      // Define events data aligned with Oromia Majlis
      const eventsData = [
        {
          title: "Annual Islamic Affairs Summit 2026",
          slug: "annual-islamic-affairs-summit-2026",
          description: "Join us for the Annual Islamic Affairs Summit bringing together scholars, community leaders, and stakeholders to discuss important matters affecting the Muslim community.",
          content: `<p>The Annual Islamic Affairs Summit is a major gathering that brings together Islamic scholars, community leaders, mosque administrators, and stakeholders from across the Oromia Region. This important event addresses key issues affecting the Muslim community.</p>
          
          <p>Topics to be covered include enhancing Islamic education, strengthening mosque administration, community welfare services, promoting unity within the Muslim community, and interfaith dialogue and cooperation.</p>
          
          <p>We invite all interested community members and stakeholders to participate in this important event. Registration is open and all are welcome.</p>`,
          category: "Conference",
          startDate: new Date("2026-01-15T09:00:00"),
          endDate: new Date("2026-01-17T17:00:00"),
          location: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
          organizer: "Oromia Regional Islamic Affairs Supreme Council",
          contactPhone: "+251 9XX XXX XXX",
          contactEmail: "events@oromiamajlis.et",
          featured: true,
          publishedAt: new Date(),
        },
        {
          title: "Quranic Recitation Competition",
          slug: "quranic-recitation-competition",
          description: "Annual Quranic recitation competition for children and adults, promoting excellence in Quranic studies and recitation.",
          content: `<p>The Annual Quranic Recitation Competition is a prestigious event that brings together participants from across the Oromia Region to showcase their skills in Quranic recitation and memorization.</p>
          
          <p>The competition includes multiple categories for different age groups and levels of expertise. Participants compete in Tajweed, memorization, and beautiful recitation categories.</p>
          
          <p>This event promotes excellence in Quranic studies and encourages the community to engage more deeply with the Holy Quran.</p>`,
          category: "Religious",
          startDate: new Date("2026-03-20T08:00:00"),
          endDate: new Date("2026-03-20T18:00:00"),
          location: "Grand Masjid, Addis Ababa, Ethiopia",
          organizer: "Islamic Education & Da'wah Department",
          contactPhone: "+251 9XX XXX XXX",
          contactEmail: "education@oromiamajlis.et",
          featured: true,
          publishedAt: new Date(),
        },
        {
          title: "Imam Training Workshop",
          slug: "imam-training-workshop",
          description: "Comprehensive training workshop for imams and religious leaders to enhance their knowledge and leadership skills.",
          content: `<p>This comprehensive training workshop is designed for imams and religious leaders to enhance their religious knowledge, leadership skills, and ability to serve the Muslim community effectively.</p>
          
          <p>The workshop covers topics including Islamic jurisprudence, Quranic studies, Hadith, Islamic history, contemporary issues, leadership, and community management.</p>
          
          <p>Participants will receive certification upon completion and have access to continuing education programs.</p>`,
          category: "Workshop",
          startDate: new Date("2026-04-10T09:00:00"),
          endDate: new Date("2026-04-12T17:00:00"),
          location: "Oromia Majlis Training Center, Addis Ababa",
          organizer: "Training & Capacity Building Department",
          contactPhone: "+251 9XX XXX XXX",
          contactEmail: "training@oromiamajlis.et",
          featured: false,
          publishedAt: new Date(),
        },
        {
          title: "Community Zakat Distribution Day",
          slug: "community-zakat-distribution-day",
          description: "Annual community Zakat distribution event to support needy families and strengthen the social fabric of the Muslim community.",
          content: `<p>The Community Zakat Distribution Day is an important annual event where Zakat funds are distributed to eligible recipients throughout the Oromia Region.</p>
          
          <p>This event ensures that Zakat is collected properly according to Islamic principles and distributed fairly to those in need, including the poor, needy, those in debt, and travelers.</p>
          
          <p>The distribution is conducted with strict transparency and accountability, following Islamic guidelines for Zakat management.</p>`,
          category: "Community Service",
          startDate: new Date("2026-05-01T10:00:00"),
          endDate: new Date("2026-05-01T16:00:00"),
          location: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
          organizer: "Zakat & Charity Coordination Department",
          contactPhone: "+251 9XX XXX XXX",
          contactEmail: "zakat@oromiamajlis.et",
          featured: true,
          publishedAt: new Date(),
        },
        {
          title: "Hajj & Umrah Information Session",
          slug: "hajj-umrah-information-session",
          description: "Information session for prospective Hajj and Umrah pilgrims, providing guidance and registration information.",
          content: `<p>This information session is designed for Muslims who are planning to perform Hajj or Umrah. The session provides comprehensive guidance on the pilgrimage process, requirements, and registration procedures.</p>
          
          <p>Topics covered include preparation for Hajj/Umrah, required documents, travel arrangements, religious obligations, and what to expect during the pilgrimage.</p>
          
          <p>Our Hajj & Umrah Affairs Department will be available to answer questions and assist with registration.</p>`,
          category: "Religious",
          startDate: new Date("2026-06-15T14:00:00"),
          endDate: new Date("2026-06-15T17:00:00"),
          location: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
          organizer: "Hajj & Umrah Affairs Department",
          contactPhone: "+251 9XX XXX XXX",
          contactEmail: "hajj@oromiamajlis.et",
          featured: false,
          publishedAt: new Date(),
        },
        {
          title: "Interfaith Dialogue Forum",
          slug: "interfaith-dialogue-forum",
          description: "Forum promoting interfaith dialogue and understanding, building bridges with other faith communities.",
          content: `<p>The Interfaith Dialogue Forum brings together representatives from different faith communities to promote mutual understanding, respect, and cooperation.</p>
          
          <p>This forum provides a platform for open dialogue, addressing common challenges, and working together for the common good while respecting each other's beliefs and practices.</p>
          
          <p>Through respectful dialogue and cooperation, we promote peaceful coexistence and mutual understanding in our diverse society.</p>`,
          category: "Community Service",
          startDate: new Date("2026-07-20T10:00:00"),
          endDate: new Date("2026-07-20T15:00:00"),
          location: "Oromia Majlis Conference Hall, Addis Ababa",
          organizer: "Interfaith & Public Relations Department",
          contactPhone: "+251 9XX XXX XXX",
          contactEmail: "interfaith@oromiamajlis.et",
          featured: false,
          publishedAt: new Date(),
        },
        {
          title: "Youth Leadership Program Launch",
          slug: "youth-leadership-program-launch",
          description: "Launch event for the new youth leadership program, providing training and mentorship for young Muslims.",
          content: `<p>The Youth Leadership Program Launch marks the beginning of a comprehensive initiative designed to develop leadership skills among young Muslims in the Oromia Region.</p>
          
          <p>The program includes training sessions, mentorship opportunities, community service projects, and leadership development activities.</p>
          
          <p>This program aims to empower youth to take active roles in their communities and contribute to the growth and development of the Muslim community.</p>`,
          category: "Education",
          startDate: new Date("2026-08-05T09:00:00"),
          endDate: new Date("2026-08-05T13:00:00"),
          location: "Oromia Majlis Youth Center, Addis Ababa",
          organizer: "Community Services & Family Guidance Department",
          contactPhone: "+251 9XX XXX XXX",
          contactEmail: "youth@oromiamajlis.et",
          featured: false,
          publishedAt: new Date(),
        },
        {
          title: "Women's Empowerment Workshop",
          slug: "womens-empowerment-workshop",
          description: "Workshop focused on empowering women within the Muslim community through education, skills training, and awareness programs.",
          content: `<p>This workshop is specifically designed for women in the Muslim community, providing opportunities for education, skills development, and empowerment.</p>
          
          <p>The workshop covers topics including Islamic education, life skills, health awareness, financial literacy, and community engagement.</p>
          
          <p>We believe in empowering women to contribute meaningfully to their families, communities, and society at large.</p>`,
          category: "Workshop",
          startDate: new Date("2026-09-10T09:00:00"),
          endDate: new Date("2026-09-10T16:00:00"),
          location: "Oromia Majlis Training Center, Addis Ababa",
          organizer: "Community Services & Family Guidance Department",
          contactPhone: "+251 9XX XXX XXX",
          contactEmail: "women@oromiamajlis.et",
          featured: false,
          publishedAt: new Date(),
        },
        {
          title: "Islamic Cultural Heritage Exhibition",
          slug: "islamic-cultural-heritage-exhibition",
          description: "Exhibition showcasing Islamic historical sites, artifacts, and cultural heritage in the Oromia Region.",
          content: `<p>The Islamic Cultural Heritage Exhibition showcases the rich Islamic history and cultural heritage of the Oromia Region.</p>
          
          <p>The exhibition features historical artifacts, photographs, documents, and displays related to Islamic sites, traditions, and contributions to the region's culture.</p>
          
          <p>This event aims to preserve and promote awareness of our Islamic heritage for current and future generations.</p>`,
          category: "Culture",
          startDate: new Date("2026-10-15T10:00:00"),
          endDate: new Date("2026-10-20T18:00:00"),
          location: "Oromia Majlis Cultural Center, Addis Ababa",
          organizer: "Research, Documentation & Publications Department",
          contactPhone: "+251 9XX XXX XXX",
          contactEmail: "heritage@oromiamajlis.et",
          featured: true,
          publishedAt: new Date(),
        },
        {
          title: "Digital Services Training Session",
          slug: "digital-services-training-session",
          description: "Training session on using Oromia Majlis digital services and platforms for community members.",
          content: `<p>This training session introduces community members to the various digital services and platforms offered by Oromia Majlis.</p>
          
          <p>Participants will learn how to use online services for mosque registration, Zakat contributions, event registration, and accessing educational resources.</p>
          
          <p>The session is designed to help community members take advantage of our digital transformation initiatives.</p>`,
          category: "Workshop",
          startDate: new Date("2026-11-05T14:00:00"),
          endDate: new Date("2026-11-05T17:00:00"),
          location: "Oromia Majlis Headquarters, Addis Ababa, Ethiopia",
          organizer: "Administrative Services Department",
          contactPhone: "+251 9XX XXX XXX",
          contactEmail: "admin@oromiamajlis.et",
          featured: false,
          publishedAt: new Date(),
        },
      ];

      // Check if events already exist
      let existingEvents = [];
      try {
        const docs = await strapi.documents('api::event.event').findMany({
          limit: 100,
        });
        existingEvents = docs || [];
      } catch (docError) {
        try {
          const result = await strapi.entityService.findMany('api::event.event', {
            limit: 100,
          });
          existingEvents = Array.isArray(result) ? result : [];
        } catch (entityError) {
          existingEvents = [];
        }
      }

      console.log(`📊 Found ${existingEvents.length} existing events`);

      if (existingEvents.length === 0) {
        // Create all events
        console.log(`💾 Creating ${eventsData.length} events...`);
        
        for (const eventData of eventsData) {
          try {
            await strapi.documents('api::event.event').create({
              data: eventData as any,
            });
          } catch (docError) {
            try {
              await strapi.entityService.create('api::event.event', {
                data: eventData as any,
              });
            } catch (entityError) {
              console.error(`❌ Failed to create event: ${eventData.title}`, entityError);
            }
          }
        }
        
        console.log('✅ Events data seeded successfully');
        console.log(`   - Created ${eventsData.length} events`);
      } else {
        console.log('ℹ️ Events already exist. Skipping seeding.');
      }
    } catch (error) {
      console.error('❌ Error seeding events data:', error);
      // Don't throw - allow Strapi to start even if seeding fails
    }
  },
};
