import path from 'path';

export default ({ env }) => {
  const databaseUrl = env('DATABASE_URL', '');
  const hasHostConfig = Boolean(env('DATABASE_HOST', ''));
  const client = env('DATABASE_CLIENT', databaseUrl || hasHostConfig ? 'postgres' : 'sqlite');

  if (
    databaseUrl &&
    /PROJECT_REF|YOUR-PASSWORD|aws-0-REGION|replace_me/i.test(databaseUrl)
  ) {
    throw new Error(
      'DATABASE_URL contains placeholder values. Set a real connection string or use DATABASE_HOST/PORT/NAME/USERNAME/PASSWORD.'
    );
  }

  const ssl = env.bool('DATABASE_SSL', false)
    ? {
        rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false),
      }
    : false;

  const postgresConnection = databaseUrl
    ? {
        connectionString: databaseUrl,
        ssl,
        schema: env('DATABASE_SCHEMA', 'public'),
      }
    : {
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi_cms'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', ''),
        ssl,
        schema: env('DATABASE_SCHEMA', 'public'),
      };

  const connections = {
    postgres: {
      connection: postgresConnection,
      pool: {
        min: env.int('DATABASE_POOL_MIN', 0),
        max: env.int('DATABASE_POOL_MAX', 10),
        acquireTimeoutMillis: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
        idleTimeoutMillis: env.int('DATABASE_POOL_IDLE_TIMEOUT', 30000),
      },
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
