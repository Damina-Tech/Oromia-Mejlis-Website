module.exports = {
  apps: [
    {
      name: "oriasc-strapi",
      cwd: "/var/www/website/backend",
      script: "npm",
      args: "run start",
      instances: 1,
      autorestart: true,
      max_memory_restart: "1G",
      env: { NODE_ENV: "production" },
      error_file: "/var/log/website/strapi-error.log",
      out_file: "/var/log/website/strapi-out.log",
    },
    {
      name: "oriasc-web",
      cwd: "/var/www/website/frontend",
      script: "npm",
      args: "run start",
      instances: 1,
      autorestart: true,
      max_memory_restart: "750M",
      env: { NODE_ENV: "production", PORT: "3000" },
      error_file: "/var/log/website/web-error.log",
      out_file: "/var/log/website/web-out.log",
    },
  ],
};
