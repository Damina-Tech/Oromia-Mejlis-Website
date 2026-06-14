import { getMediaCspSources } from './deployment';

export default ({ env }) => {
  const mediaSources = getMediaCspSources(env);

  return {
    upload: {
      config: {
        provider: 'local',
        providerOptions: {
          sizeLimit: 10000000,
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
        security: {
          contentSecurityPolicy: {
            useDefaults: true,
            directives: {
              'connect-src': ["'self'", 'https:'],
              'img-src': mediaSources,
              'media-src': mediaSources,
              upgradeInsecureRequests: null,
            },
          },
        },
        breakpoints: {
          xlarge: 1920,
          large: 1000,
          medium: 750,
          small: 500,
          xsmall: 64,
        },
      },
    },
  };
};
