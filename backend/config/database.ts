import path from 'path';

export default ({ env }) => {
  const databaseUrl = env('DATABASE_URL', '');
  const client = env('DATABASE_CLIENT', databaseUrl ? 'postgres' : 'sqlite');

  if (
    databaseUrl &&
    /PROJECT_REF|YOUR-PASSWORD|aws-0-REGION|replace_me/i.test(databaseUrl)
  ) {
    throw new Error(
      'DATABASE_URL still contains placeholder values. Set the real Supabase Session pooler URI in Render → Environment (Dashboard → Connect → Session pooler).'
    );
  }

  const connections = {
    postgres: {
      connection: {
        connectionString: databaseUrl,
        ssl: env.bool('DATABASE_SSL', false)
          ? {
              rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false),
            }
          : false,
        schema: env('DATABASE_SCHEMA', 'public'),
      },
      pool: {
        min: env.int('DATABASE_POOL_MIN', 0),
        max: env.int('DATABASE_POOL_MAX', 4),
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
