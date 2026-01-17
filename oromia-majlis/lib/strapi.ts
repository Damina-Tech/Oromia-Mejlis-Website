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

export interface Service {
  id: number;
  documentId?: string;
  icon: string;
  title: string;
  slug: string;
  description: string;
  fullDescription?: string;
  content?: string;
  image?: string;
  href: string;
  featured: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
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
    // Try multiple populate strategies for Strapi 5
    let response: StrapiResponse<any> | null = null;
    let lastError: Error | null = null;

    // Strategy 1: Deep populate with component structure
    try {
      response = await fetchStrapi<StrapiResponse<any>>(
        '/hero-section?populate[slides][populate]=*&populate[services][populate]=*'
      );
      if (response?.data) {
        console.log('✅ Successfully fetched with populate strategy 1');
      }
    } catch (err) {
      lastError = err as Error;
      console.warn('⚠️ Populate strategy 1 failed, trying strategy 2...');
    }

    // Strategy 2: Simple populate
    if (!response?.data) {
      try {
        response = await fetchStrapi<StrapiResponse<any>>(
          '/hero-section?populate=*'
        );
        if (response?.data) {
          console.log('✅ Successfully fetched with populate strategy 2');
        }
      } catch (err) {
        lastError = err as Error;
        console.warn('⚠️ Populate strategy 2 failed, trying strategy 3...');
      }
    }

    // Strategy 3: No populate (components might be directly in response)
    if (!response?.data) {
      try {
        response = await fetchStrapi<StrapiResponse<any>>(
          '/hero-section'
        );
        if (response?.data) {
          console.log('✅ Successfully fetched with populate strategy 3');
        }
      } catch (err) {
        lastError = err as Error;
        console.error('❌ All populate strategies failed');
      }
    }

    if (!response || !response.data) {
      console.warn('Hero section not found in Strapi.', lastError?.message);
      return null;
    }

    const heroSection = response.data;
    
    // Extract slides and services directly from response
    const slides = heroSection.slides || [];
    const services = heroSection.services || [];

    // Debug logging
    console.log('📊 Hero Section API Response:', {
      hasData: !!heroSection,
      slidesCount: slides.length,
      servicesCount: services.length,
      slides: slides.length > 0 ? slides.map((s: any) => ({ id: s.id, title: s.title })) : [],
      services: services.length > 0 ? services.map((s: any) => ({ id: s.id, title: s.title })) : [],
    });

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

/**
 * Get all services from Strapi
 */
export async function getServices(): Promise<Service[]> {
  try {
    let response: StrapiResponse<any> | null = null;

    // Strategy 1: Try with populate
    try {
      response = await fetchStrapi<StrapiResponse<any>>(
        '/services?populate=*&sort=id:asc'
      );
      if (response?.data) {
        console.log('✅ Successfully fetched services with populate');
      }
    } catch (err) {
      console.warn('⚠️ Populate strategy failed, trying without populate...');
    }

    // Strategy 2: Simple fetch
    if (!response?.data) {
      try {
        response = await fetchStrapi<StrapiResponse<any>>(
          '/services?sort=id:asc'
        );
        if (response?.data) {
          console.log('✅ Successfully fetched services');
        }
      } catch (err) {
        console.error('❌ Failed to fetch services:', err);
        return [];
      }
    }

    if (!response || !response.data) {
      console.warn('⚠️ No services found in Strapi.');
      return [];
    }

    // Handle both array and single object responses
    const servicesData = Array.isArray(response.data) ? response.data : [response.data];

    if (servicesData.length === 0) {
      console.warn('⚠️ Services array is empty.');
      return [];
    }

    // Transform services
    const transformedServices = servicesData.map((service: any) => {
      // Handle both direct attributes and nested attributes structure
      const serviceData = service.attributes || service;
      
      // Extract image URL
      let imageUrl = undefined;
      if (serviceData.image) {
        if (serviceData.image.data) {
          const image = Array.isArray(serviceData.image.data) 
            ? serviceData.image.data[0] 
            : serviceData.image.data;
          if (image?.attributes?.url) {
            imageUrl = `${STRAPI_URL}${image.attributes.url.startsWith('/') ? image.attributes.url : `/${image.attributes.url}`}`;
          }
        } else if (serviceData.image.url) {
          imageUrl = `${STRAPI_URL}${serviceData.image.url.startsWith('/') ? serviceData.image.url : `/${serviceData.image.url}`}`;
        }
      }
      
      return {
        id: service.id || service.documentId || Math.random(),
        documentId: service.documentId,
        icon: serviceData.icon || '📋',
        title: serviceData.title || '',
        slug: serviceData.slug || '',
        description: serviceData.description || '',
        fullDescription: serviceData.fullDescription || serviceData.description || '',
        content: serviceData.content || serviceData.fullDescription || '',
        image: imageUrl,
        href: serviceData.href || `/services/${serviceData.slug || service.id}`,
        featured: serviceData.featured || false,
        publishedAt: serviceData.publishedAt || service.publishedAt || '',
        createdAt: serviceData.createdAt || service.createdAt || '',
        updatedAt: serviceData.updatedAt || service.updatedAt || '',
      };
    });

    console.log(`📊 Fetched ${transformedServices.length} services from Strapi`);
    return transformedServices;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

/**
 * Get a single service by ID or slug
 */
export async function getService(idOrSlug: string): Promise<Service | null> {
  try {
    let response: StrapiResponse<any> | null = null;

    // Try by ID first, then by slug
    try {
      response = await fetchStrapi<StrapiResponse<any>>(
        `/services/${idOrSlug}?populate=*`
      );
      if (response?.data) {
        console.log('✅ Successfully fetched service with populate');
      }
    } catch (err) {
      // Try finding by slug
      try {
        const allServices = await getServices();
        const service = allServices.find(
          (s) => s.slug === idOrSlug || s.id.toString() === idOrSlug
        );
        if (service) {
          return service;
        }
      } catch (findError) {
        console.error('❌ Failed to find service:', findError);
        return null;
      }
    }

    if (!response || !response.data) {
      console.warn('⚠️ Service not found in Strapi.');
      return null;
    }

    const service = response.data;
    const serviceData = service.attributes || service;

    // Extract image URL
    let imageUrl = undefined;
    if (serviceData.image) {
      if (serviceData.image.data) {
        const image = Array.isArray(serviceData.image.data) 
          ? serviceData.image.data[0] 
          : serviceData.image.data;
        if (image?.attributes?.url) {
          imageUrl = `${STRAPI_URL}${image.attributes.url.startsWith('/') ? image.attributes.url : `/${image.attributes.url}`}`;
        }
      } else if (serviceData.image.url) {
        imageUrl = `${STRAPI_URL}${serviceData.image.url.startsWith('/') ? serviceData.image.url : `/${serviceData.image.url}`}`;
      }
    }

    return {
      id: service.id || service.documentId || Math.random(),
      documentId: service.documentId,
      icon: serviceData.icon || '📋',
      title: serviceData.title || '',
      slug: serviceData.slug || '',
      description: serviceData.description || '',
      fullDescription: serviceData.fullDescription || serviceData.description || '',
      content: serviceData.content || serviceData.fullDescription || '',
      image: imageUrl,
      href: serviceData.href || `/services/${serviceData.slug || service.id}`,
      featured: serviceData.featured || false,
      publishedAt: serviceData.publishedAt || service.publishedAt || '',
      createdAt: serviceData.createdAt || service.createdAt || '',
      updatedAt: serviceData.updatedAt || service.updatedAt || '',
    };
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Article {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  image?: string;
  featured: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  description: string;
  fullDescription?: string;
  type: string;
  status: string;
  image?: string;
  startDate?: string;
  endDate?: string;
  department?: string;
  objectives?: string;
  outcomes?: string;
  featured: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryItem {
  id: number;
  documentId?: string;
  title: string;
  description?: string;
  image?: string;
  category: string;
  featured: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  category: string;
  startDate: string;
  endDate?: string;
  location: string;
  image?: string;
  organizer?: string;
  contactPhone?: string;
  contactEmail?: string;
  featured: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Submit a contact message to Strapi
 */
export async function submitContactMessage(
  message: ContactMessage
): Promise<{ success: boolean; error?: string }> {
  try {
    const url = `${STRAPI_URL}/api/contact-messages`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          name: message.name,
          email: message.email,
          subject: message.subject,
          message: message.message,
          read: false,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      // Handle Strapi error format
      const errorMessage = 
        errorData.error?.message || 
        errorData.message || 
        (response.status === 400 ? 'Invalid request. Please check your input.' : 
         response.status === 429 ? 'Too many requests. Please try again later.' :
         `HTTP error! status: ${response.status}`);
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log('✅ Contact message submitted successfully:', result);
    
    return { success: true };
  } catch (error) {
    console.error('Error submitting contact message:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit message',
    };
  }
}

/**
 * Get all articles from Strapi
 */
export async function getArticles(): Promise<Article[]> {
  try {
    let response: StrapiResponse<any> | null = null;

    // Strategy 1: Try with populate
    try {
      response = await fetchStrapi<StrapiResponse<any>>(
        '/articles?populate=*&sort=publishedAt:desc'
      );
      if (response?.data) {
        console.log('✅ Successfully fetched articles with populate');
      }
    } catch (err) {
      console.warn('⚠️ Populate strategy failed, trying without populate...');
    }

    // Strategy 2: Simple fetch
    if (!response?.data) {
      try {
        response = await fetchStrapi<StrapiResponse<any>>(
          '/articles?sort=publishedAt:desc'
        );
        if (response?.data) {
          console.log('✅ Successfully fetched articles');
        }
      } catch (err) {
        console.error('❌ Failed to fetch articles:', err);
        return [];
      }
    }

    if (!response || !response.data) {
      console.warn('⚠️ No articles found in Strapi.');
      return [];
    }

    // Handle both array and single object responses
    const articlesData = Array.isArray(response.data) ? response.data : [response.data];

    if (articlesData.length === 0) {
      console.warn('⚠️ Articles array is empty.');
      return [];
    }

    // Transform articles
    const transformedArticles = articlesData.map((article: any) => {
      const articleData = article.attributes || article;
      
      // Extract image URL
      let imageUrl = null;
      if (articleData.image) {
        if (articleData.image.data) {
          const image = Array.isArray(articleData.image.data) 
            ? articleData.image.data[0] 
            : articleData.image.data;
          if (image?.attributes?.url) {
            imageUrl = `${STRAPI_URL}${image.attributes.url.startsWith('/') ? image.attributes.url : `/${image.attributes.url}`}`;
          }
        } else if (articleData.image.url) {
          imageUrl = `${STRAPI_URL}${articleData.image.url.startsWith('/') ? articleData.image.url : `/${articleData.image.url}`}`;
        }
      }

      return {
        id: article.id || article.documentId || Math.random(),
        documentId: article.documentId,
        title: articleData.title || '',
        slug: articleData.slug || '',
        excerpt: articleData.excerpt || '',
        content: articleData.content || '',
        category: articleData.category || 'General',
        author: articleData.author || 'Oromia Majlis',
        image: imageUrl || undefined,
        featured: articleData.featured || false,
        publishedAt: articleData.publishedAt || article.publishedAt || '',
        createdAt: articleData.createdAt || article.createdAt || '',
        updatedAt: articleData.updatedAt || article.updatedAt || '',
      };
    });

    console.log(`📊 Fetched ${transformedArticles.length} articles from Strapi`);
    return transformedArticles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

/**
 * Get a single article by ID or slug
 */
export async function getArticle(idOrSlug: string): Promise<Article | null> {
  try {
    let response: StrapiResponse<any> | null = null;

    // Try by ID first, then by slug
    try {
      response = await fetchStrapi<StrapiResponse<any>>(
        `/articles/${idOrSlug}?populate=*`
      );
      if (response?.data) {
        console.log('✅ Successfully fetched article with populate');
      }
    } catch (err) {
      // Try finding by slug
      try {
        const allArticles = await getArticles();
        const article = allArticles.find(
          (a) => a.slug === idOrSlug || a.id.toString() === idOrSlug
        );
        if (article) {
          return article;
        }
      } catch (findError) {
        console.error('❌ Failed to find article:', findError);
        return null;
      }
    }

    if (!response || !response.data) {
      console.warn('⚠️ Article not found in Strapi.');
      return null;
    }

    const article = response.data;
    const articleData = article.attributes || article;

    // Extract image URL
    let imageUrl = null;
    if (articleData.image) {
      if (articleData.image.data) {
        const image = Array.isArray(articleData.image.data) 
          ? articleData.image.data[0] 
          : articleData.image.data;
        if (image?.attributes?.url) {
          imageUrl = `${STRAPI_URL}${image.attributes.url.startsWith('/') ? image.attributes.url : `/${image.attributes.url}`}`;
        }
      } else if (articleData.image.url) {
        imageUrl = `${STRAPI_URL}${articleData.image.url.startsWith('/') ? articleData.image.url : `/${articleData.image.url}`}`;
      }
    }

    return {
      id: article.id || article.documentId || Math.random(),
      documentId: article.documentId,
      title: articleData.title || '',
      slug: articleData.slug || '',
      excerpt: articleData.excerpt || '',
      content: articleData.content || '',
      category: articleData.category || 'General',
      author: articleData.author || 'Oromia Majlis',
      image: imageUrl || undefined,
      featured: articleData.featured || false,
      publishedAt: articleData.publishedAt || article.publishedAt || '',
      createdAt: articleData.createdAt || article.createdAt || '',
      updatedAt: articleData.updatedAt || article.updatedAt || '',
    };
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

/**
 * Get all projects from Strapi
 */
export async function getProjects(): Promise<Project[]> {
  try {
    let response: StrapiResponse<any> | null = null;

    // Strategy 1: Try with populate
    try {
      response = await fetchStrapi<StrapiResponse<any>>(
        '/projects?populate=*&sort=publishedAt:desc'
      );
      if (response?.data) {
        console.log('✅ Successfully fetched projects with populate');
      }
    } catch (err) {
      console.warn('⚠️ Populate strategy failed, trying without populate...');
    }

    // Strategy 2: Simple fetch
    if (!response?.data) {
      try {
        response = await fetchStrapi<StrapiResponse<any>>(
          '/projects?sort=publishedAt:desc'
        );
        if (response?.data) {
          console.log('✅ Successfully fetched projects');
        }
      } catch (err) {
        console.error('❌ Failed to fetch projects:', err);
        return [];
      }
    }

    if (!response || !response.data) {
      console.warn('⚠️ No projects found in Strapi.');
      return [];
    }

    // Handle both array and single object responses
    const projectsData = Array.isArray(response.data) ? response.data : [response.data];

    if (projectsData.length === 0) {
      console.warn('⚠️ Projects array is empty.');
      return [];
    }

    // Transform projects
    const transformedProjects = projectsData.map((project: any) => {
      const projectData = project.attributes || project;
      
      // Extract image URL
      let imageUrl = undefined;
      if (projectData.image) {
        if (projectData.image.data) {
          const image = Array.isArray(projectData.image.data) 
            ? projectData.image.data[0] 
            : projectData.image.data;
          if (image?.attributes?.url) {
            imageUrl = `${STRAPI_URL}${image.attributes.url.startsWith('/') ? image.attributes.url : `/${image.attributes.url}`}`;
          }
        } else if (projectData.image.url) {
          imageUrl = `${STRAPI_URL}${projectData.image.url.startsWith('/') ? projectData.image.url : `/${projectData.image.url}`}`;
        }
      }

      return {
        id: project.id || project.documentId || Math.random(),
        documentId: project.documentId,
        title: projectData.title || '',
        slug: projectData.slug || '',
        description: projectData.description || '',
        fullDescription: projectData.fullDescription || projectData.description || '',
        type: projectData.type || '',
        status: projectData.status || 'Planned',
        image: imageUrl,
        startDate: projectData.startDate || undefined,
        endDate: projectData.endDate || undefined,
        department: projectData.department || undefined,
        objectives: projectData.objectives || undefined,
        outcomes: projectData.outcomes || undefined,
        featured: projectData.featured || false,
        publishedAt: projectData.publishedAt || project.publishedAt || '',
        createdAt: projectData.createdAt || project.createdAt || '',
        updatedAt: projectData.updatedAt || project.updatedAt || '',
      };
    });

    console.log(`📊 Fetched ${transformedProjects.length} projects from Strapi`);
    return transformedProjects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

/**
 * Get a single project by ID or slug
 */
export async function getProject(idOrSlug: string): Promise<Project | null> {
  try {
    let response: StrapiResponse<any> | null = null;

    // Try by ID first, then by slug
    try {
      response = await fetchStrapi<StrapiResponse<any>>(
        `/projects/${idOrSlug}?populate=*`
      );
      if (response?.data) {
        console.log('✅ Successfully fetched project with populate');
      }
    } catch (err) {
      // Try finding by slug
      try {
        const allProjects = await getProjects();
        const project = allProjects.find(
          (p) => p.slug === idOrSlug || p.id.toString() === idOrSlug
        );
        if (project) {
          return project;
        }
      } catch (findError) {
        console.error('❌ Failed to find project:', findError);
        return null;
      }
    }

    if (!response || !response.data) {
      console.warn('⚠️ Project not found in Strapi.');
      return null;
    }

    const project = response.data;
    const projectData = project.attributes || project;

    // Extract image URL
    let imageUrl = undefined;
    if (projectData.image) {
      if (projectData.image.data) {
        const image = Array.isArray(projectData.image.data) 
          ? projectData.image.data[0] 
          : projectData.image.data;
        if (image?.attributes?.url) {
          imageUrl = `${STRAPI_URL}${image.attributes.url.startsWith('/') ? image.attributes.url : `/${image.attributes.url}`}`;
        }
      } else if (projectData.image.url) {
        imageUrl = `${STRAPI_URL}${projectData.image.url.startsWith('/') ? projectData.image.url : `/${projectData.image.url}`}`;
      }
    }

    return {
      id: project.id || project.documentId || Math.random(),
      documentId: project.documentId,
      title: projectData.title || '',
      slug: projectData.slug || '',
      description: projectData.description || '',
      fullDescription: projectData.fullDescription || projectData.description || '',
      type: projectData.type || '',
      status: projectData.status || 'Planned',
      image: imageUrl,
      startDate: projectData.startDate || undefined,
      endDate: projectData.endDate || undefined,
      department: projectData.department || undefined,
      objectives: projectData.objectives || undefined,
      outcomes: projectData.outcomes || undefined,
      featured: projectData.featured || false,
      publishedAt: projectData.publishedAt || project.publishedAt || '',
      createdAt: projectData.createdAt || project.createdAt || '',
      updatedAt: projectData.updatedAt || project.updatedAt || '',
    };
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

/**
 * Get all gallery items from Strapi
 */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    let response: StrapiResponse<any> | null = null;

    // Strategy 1: Try with populate
    try {
      response = await fetchStrapi<StrapiResponse<any>>(
        '/gallery-items?populate=*&sort=publishedAt:desc'
      );
      if (response?.data) {
        console.log('✅ Successfully fetched gallery items with populate');
      }
    } catch (err) {
      console.warn('⚠️ Populate strategy failed, trying without populate...');
    }

    // Strategy 2: Simple fetch
    if (!response?.data) {
      try {
        response = await fetchStrapi<StrapiResponse<any>>(
          '/gallery-items?sort=publishedAt:desc'
        );
        if (response?.data) {
          console.log('✅ Successfully fetched gallery items');
        }
      } catch (err) {
        console.error('❌ Failed to fetch gallery items:', err);
        return [];
      }
    }

    if (!response || !response.data) {
      console.warn('⚠️ No gallery items found in Strapi.');
      return [];
    }

    // Handle both array and single object responses
    const galleryData = Array.isArray(response.data) ? response.data : [response.data];

    if (galleryData.length === 0) {
      console.warn('⚠️ Gallery items array is empty.');
      return [];
    }

    // Transform gallery items
    const transformedItems = galleryData.map((item: any) => {
      const itemData = item.attributes || item;
      
      // Extract image URL
      let imageUrl = undefined;
      if (itemData.image) {
        if (itemData.image.data) {
          const image = Array.isArray(itemData.image.data) 
            ? itemData.image.data[0] 
            : itemData.image.data;
          if (image?.attributes?.url) {
            imageUrl = `${STRAPI_URL}${image.attributes.url.startsWith('/') ? image.attributes.url : `/${image.attributes.url}`}`;
          }
        } else if (itemData.image.url) {
          imageUrl = `${STRAPI_URL}${itemData.image.url.startsWith('/') ? itemData.image.url : `/${itemData.image.url}`}`;
        }
      }

      return {
        id: item.id || item.documentId || Math.random(),
        documentId: item.documentId,
        title: itemData.title || '',
        description: itemData.description || '',
        image: imageUrl,
        category: itemData.category || 'General',
        featured: itemData.featured || false,
        publishedAt: itemData.publishedAt || item.publishedAt || '',
        createdAt: itemData.createdAt || item.createdAt || '',
        updatedAt: itemData.updatedAt || item.updatedAt || '',
      };
    });

    console.log(`📊 Fetched ${transformedItems.length} gallery items from Strapi`);
    return transformedItems;
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return [];
  }
}

/**
 * Get all events from Strapi
 */
export async function getEvents(): Promise<Event[]> {
  try {
    let response: StrapiResponse<any> | null = null;

    // Strategy 1: Try with populate
    try {
      response = await fetchStrapi<StrapiResponse<any>>(
        '/events?populate=*&sort=startDate:asc'
      );
      if (response?.data) {
        console.log('✅ Successfully fetched events with populate');
      }
    } catch (err) {
      console.warn('⚠️ Populate strategy failed, trying without populate...');
    }

    // Strategy 2: Simple fetch
    if (!response?.data) {
      try {
        response = await fetchStrapi<StrapiResponse<any>>(
          '/events?sort=startDate:asc'
        );
        if (response?.data) {
          console.log('✅ Successfully fetched events');
        }
      } catch (err) {
        console.error('❌ Failed to fetch events:', err);
        return [];
      }
    }

    if (!response || !response.data) {
      console.warn('⚠️ No events found in Strapi.');
      return [];
    }

    // Handle both array and single object responses
    const eventsData = Array.isArray(response.data) ? response.data : [response.data];

    if (eventsData.length === 0) {
      console.warn('⚠️ Events array is empty.');
      return [];
    }

    // Transform events
    const transformedEvents = eventsData.map((event: any) => {
      const eventData = event.attributes || event;
      
      // Extract image URL
      let imageUrl = undefined;
      if (eventData.image) {
        if (eventData.image.data) {
          const image = Array.isArray(eventData.image.data) 
            ? eventData.image.data[0] 
            : eventData.image.data;
          if (image?.attributes?.url) {
            imageUrl = `${STRAPI_URL}${image.attributes.url.startsWith('/') ? image.attributes.url : `/${image.attributes.url}`}`;
          }
        } else if (eventData.image.url) {
          imageUrl = `${STRAPI_URL}${eventData.image.url.startsWith('/') ? eventData.image.url : `/${eventData.image.url}`}`;
        }
      }

      return {
        id: event.id || event.documentId || Math.random(),
        documentId: event.documentId,
        title: eventData.title || '',
        slug: eventData.slug || '',
        description: eventData.description || '',
        content: eventData.content || '',
        category: eventData.category || 'General',
        startDate: eventData.startDate || '',
        endDate: eventData.endDate || undefined,
        location: eventData.location || '',
        image: imageUrl,
        organizer: eventData.organizer || undefined,
        contactPhone: eventData.contactPhone || undefined,
        contactEmail: eventData.contactEmail || undefined,
        featured: eventData.featured || false,
        publishedAt: eventData.publishedAt || event.publishedAt || '',
        createdAt: eventData.createdAt || event.createdAt || '',
        updatedAt: eventData.updatedAt || event.updatedAt || '',
      };
    });

    console.log(`📊 Fetched ${transformedEvents.length} events from Strapi`);
    return transformedEvents;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

/**
 * Get a single event by ID or slug
 */
export async function getEvent(idOrSlug: string): Promise<Event | null> {
  try {
    let response: StrapiResponse<any> | null = null;

    // Try by ID first, then by slug
    try {
      response = await fetchStrapi<StrapiResponse<any>>(
        `/events/${idOrSlug}?populate=*`
      );
      if (response?.data) {
        console.log('✅ Successfully fetched event with populate');
      }
    } catch (err) {
      // Try finding by slug
      try {
        const allEvents = await getEvents();
        const event = allEvents.find(
          (e) => e.slug === idOrSlug || e.id.toString() === idOrSlug
        );
        if (event) {
          return event;
        }
      } catch (findError) {
        console.error('❌ Failed to find event:', findError);
        return null;
      }
    }

    if (!response || !response.data) {
      console.warn('⚠️ Event not found in Strapi.');
      return null;
    }

    const event = response.data;
    const eventData = event.attributes || event;

    // Extract image URL
    let imageUrl = undefined;
    if (eventData.image) {
      if (eventData.image.data) {
        const image = Array.isArray(eventData.image.data) 
          ? eventData.image.data[0] 
          : eventData.image.data;
        if (image?.attributes?.url) {
          imageUrl = `${STRAPI_URL}${image.attributes.url.startsWith('/') ? image.attributes.url : `/${image.attributes.url}`}`;
        }
      } else if (eventData.image.url) {
        imageUrl = `${STRAPI_URL}${eventData.image.url.startsWith('/') ? eventData.image.url : `/${eventData.image.url}`}`;
      }
    }

    return {
      id: event.id || event.documentId || Math.random(),
      documentId: event.documentId,
      title: eventData.title || '',
      slug: eventData.slug || '',
      description: eventData.description || '',
      content: eventData.content || '',
      category: eventData.category || 'General',
      startDate: eventData.startDate || '',
      endDate: eventData.endDate || undefined,
      location: eventData.location || '',
      image: imageUrl,
      organizer: eventData.organizer || undefined,
      contactPhone: eventData.contactPhone || undefined,
      contactEmail: eventData.contactEmail || undefined,
      featured: eventData.featured || false,
      publishedAt: eventData.publishedAt || event.publishedAt || '',
      createdAt: eventData.createdAt || event.createdAt || '',
      updatedAt: eventData.updatedAt || event.updatedAt || '',
    };
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
}

