import type { Schema, Struct } from '@strapi/strapi';

export interface HeroService extends Struct.ComponentSchema {
  collectionName: 'components_hero_services';
  info: {
    description: 'Service card in hero section';
    displayName: 'Service';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HeroSlide extends Struct.ComponentSchema {
  collectionName: 'components_hero_slides';
  info: {
    description: 'Hero section slide';
    displayName: 'Slide';
  };
  attributes: {
    ctaLink: Schema.Attribute.String & Schema.Attribute.DefaultTo<'/discover'>;
    ctaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Discover More'>;
    image: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'hero.service': HeroService;
      'hero.slide': HeroSlide;
    }
  }
}
