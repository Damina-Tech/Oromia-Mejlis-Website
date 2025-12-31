/**
 * Strapi API utility functions
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiImage {
  id: number;
  attributes: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any;
    createdAt: string;
    updatedAt: string;
  };
}

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image: string; // URL string for easier use in components
}

export interface HeroService {
  id: number;
  icon: string;
  title: string;
  description: string;
  href: string;
}

export interface HeroSection {
  id: number;
  slides: HeroSlide[];
  services: HeroService[];
}

/**
 * Fetch data from Strapi API
 */
async function fetchStrapi<T>(endpoint: string): Promise<T> {
  const url = `${STRAPI_URL}/api${endpoint}`;
  
  try {
    const response = await fetch(url, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching from Strapi (${endpoint}):`, error);
    throw error;
  }
}

/**
 * Get hero section data from Strapi
 * For Strapi 5 single types, the endpoint structure is different
 */
export async function getHeroSection(): Promise<HeroSection | null> {
  try {
    // Use the simplest working endpoint that populates components
    // Note: fetchStrapi already adds /api prefix, so we don't need it here
    const response = await fetchStrapi<StrapiResponse<any>>(
      '/hero-section?populate[slides][populate]=*&populate[services][populate]=*'
    );

    if (!response || !response.data) {
      console.warn('Hero section not found in Strapi. Using fallback data.');
      return null;
    }

    const heroSection = response.data;
    
    // Extract slides and services directly from response
    const slides = heroSection.slides || [];
    const services = heroSection.services || [];

    // If no slides or services, return null to use fallback
    if (slides.length === 0 && services.length === 0) {
      console.warn('⚠️ No slides or services found in API response. Using fallback data.');
      return null;
    }
    
    // Transform slides to include image URL
    const transformedSlides = slides.map((slide: any) => {
      // Handle image structure - image.url is directly available
      let imageUrl = null;
      
      if (slide.image) {
        // Direct URL property (Strapi 5 structure)
        if (slide.image.url) {
          imageUrl = slide.image.url;
        }
        // Fallback to formats if main URL not available
        else if (slide.image.formats?.large?.url) {
          imageUrl = slide.image.formats.large.url;
        }
        else if (slide.image.formats?.medium?.url) {
          imageUrl = slide.image.formats.medium.url;
        }
        else if (slide.image.formats?.small?.url) {
          imageUrl = slide.image.formats.small.url;
        }
        // String URL
        else if (typeof slide.image === 'string') {
          imageUrl = slide.image;
        }
      }
      
      return {
        id: slide.id || Math.random(),
        title: slide.title || '',
        subtitle: slide.subtitle || '',
        ctaText: slide.ctaText || 'Discover More',
        ctaLink: slide.ctaLink || '/discover',
        image: imageUrl
          ? `${STRAPI_URL}${imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`}`
          : 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
      };
    });

    // Transform services
    const transformedServices = services.map((service: any) => ({
      id: service.id || Math.random(),
      icon: service.icon || '📋',
      title: service.title || '',
      description: service.description || '',
      href: service.href || '#',
    }));

    return {
      id: heroSection.id || heroSection.documentId || 1,
      slides: transformedSlides,
      services: transformedServices,
    };
  } catch (error) {
    console.error('Error fetching hero section:', error);
    // Return null to trigger fallback data
    return null;
  }
}

