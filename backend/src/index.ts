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
  },
};
