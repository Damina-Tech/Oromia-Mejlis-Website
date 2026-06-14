type Env = {
  (key: string, defaultValue?: string): string;
  bool: (key: string, defaultValue?: boolean) => boolean;
};

const DEV_CORS_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'http://localhost:1337',
];

const PRODUCTION_CORS_ORIGINS = [
  'https://oriasc.org',
  'https://www.oriasc.org',
];

export function getPublicUrl(env: Env): string {
  return env('PUBLIC_URL', 'http://localhost:1337');
}

export function getFrontendUrl(env: Env): string {
  return env('FRONTEND_URL', 'http://localhost:3000');
}

export function getCorsOrigins(env: Env): string[] {
  const configured = env('CORS_ORIGIN', '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (configured.length > 0) {
    return configured;
  }

  if (env('NODE_ENV', 'development') === 'production') {
    return PRODUCTION_CORS_ORIGINS;
  }

  return DEV_CORS_ORIGINS;
}

export function getMediaCspSources(env: Env): string[] {
  const sources = new Set<string>(["'self'", 'data:', 'blob:']);

  for (const url of [getPublicUrl(env), getFrontendUrl(env)]) {
    try {
      const parsed = new URL(url);
      sources.add(parsed.origin);
      if (parsed.hostname !== 'localhost') {
        sources.add(parsed.hostname);
      }
    } catch {
      // ignore invalid URL values in env
    }
  }

  sources.add('dl.airtable.com');
  sources.add('market-assets.strapi.io');

  return Array.from(sources);
}
