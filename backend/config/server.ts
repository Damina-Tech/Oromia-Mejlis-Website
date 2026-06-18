export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', env('URL', 'http://localhost:1337')),
  proxy: env.bool('IS_BEHIND_PROXY', env('NODE_ENV') === 'production'),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
