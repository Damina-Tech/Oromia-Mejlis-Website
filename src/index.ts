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

      // For single types in Strapi 5, check if entry exists
      let existingHero = null;
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
          });
          existingHero = Array.isArray(result) && result.length > 0 ? result[0] : result;
        } catch (entityError) {
          // Entry doesn't exist yet, which is fine
          existingHero = null;
        }
      }

      if (!existingHero) {
        // Create sample slides data
        const slidesData = [
          {
            title: "Fastest Growing City in Ethiopia",
            subtitle: "It's Called as Electronic city because this is best city in Ethiopia to start new industrial and technology related business.",
            ctaText: "Discover More",
            ctaLink: "/discover",
            image: null, // Will be uploaded via admin panel
          },
          {
            title: "Oromia Regional Islamic Affairs Supreme Council",
            subtitle: "Overseeing Islamic affairs in the Oromia region, representing the interests of Muslims, and managing Islamic affairs with dedication and excellence.",
            ctaText: "Learn More",
            ctaLink: "/about",
            image: null,
          },
          {
            title: "Serving the Muslim Community",
            subtitle: "Promoting Islamic values, supporting religious education, and fostering unity among Muslims in the Oromia region.",
            ctaText: "Get Involved",
            ctaLink: "/services",
            image: null,
          },
        ];

        // Create sample services data
        const servicesData = [
          {
            icon: "🏛️",
            title: "Your Government",
            description: "Leadership, policies, and administrative services for Islamic affairs.",
            href: "/government",
          },
          {
            icon: "💼",
            title: "Jobs and Unemployment",
            description: "Career support and workforce programs for the community.",
            href: "/jobs",
          },
          {
            icon: "🏭",
            title: "Business and Corridor Dev't",
            description: "Investments, permits, and growth corridors for economic development.",
            href: "/business",
          },
          {
            icon: "🚌",
            title: "Roads and Transport",
            description: "Transit routes, maintenance, and transportation services.",
            href: "/transport",
          },
          {
            icon: "🌳",
            title: "Culture and Recreation",
            description: "Parks, festivals, and community spaces for cultural activities.",
            href: "/culture",
          },
          {
            icon: "⚖️",
            title: "Justice, Safety and the law",
            description: "Peacekeeping, courts, and citizen rights protection.",
            href: "/justice",
          },
        ];

        // Create hero section entry
        try {
          // Try using documents API (Strapi 5)
          await strapi.documents('api::hero-section.hero-section').create({
            data: {
              slides: slidesData,
              services: servicesData,
              publishedAt: new Date(),
            },
          });
          console.log('✅ Hero section data seeded successfully (via documents API)');
        } catch (docError) {
          // Fallback to entityService
          try {
            await strapi.entityService.create('api::hero-section.hero-section', {
              data: {
                slides: slidesData,
                services: servicesData,
                publishedAt: new Date(),
              },
            });
            console.log('✅ Hero section data seeded successfully (via entityService)');
          } catch (entityError) {
            console.error('❌ Failed to create hero section entry:', entityError);
            console.log('💡 Please create the entry manually via Content Manager');
          }
        }
      } else {
        console.log('ℹ️ Hero section data already exists');
      }
    } catch (error) {
      console.error('❌ Error seeding hero section data:', error);
      // Don't throw - allow Strapi to start even if seeding fails
    }
  },
};
