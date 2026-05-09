import type { Schema, Struct } from '@strapi/strapi';

export interface HeroService extends Struct.ComponentSchema {
  collectionName: 'components_hero_services';
  info: {
    description: 'Service card in hero section';
    displayName: 'Service';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    descriptionAm: Schema.Attribute.Text;
    descriptionAr: Schema.Attribute.Text;
    descriptionOm: Schema.Attribute.Text;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    titleAm: Schema.Attribute.String;
    titleAr: Schema.Attribute.String;
    titleOm: Schema.Attribute.String;
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
    ctaLinkAm: Schema.Attribute.String;
    ctaLinkAr: Schema.Attribute.String;
    ctaLinkOm: Schema.Attribute.String;
    ctaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Discover More'>;
    ctaTextAm: Schema.Attribute.String;
    ctaTextAr: Schema.Attribute.String;
    ctaTextOm: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    subtitleAm: Schema.Attribute.Text;
    subtitleAr: Schema.Attribute.Text;
    subtitleOm: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    titleAm: Schema.Attribute.String;
    titleAr: Schema.Attribute.String;
    titleOm: Schema.Attribute.String;
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
