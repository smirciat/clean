module.exports = {
  apps: [
    {
      name: 'my-express-api',
      // Runs using the global 'pm2' npm package (or standard npx)
      script: 'dist/apps/api/main.js',
      // nx command to serve the api project
      //args: 'nx serve api --configuration=production',
      // Ensure the correct Node.js version is forced
      interpreter: '/home/andy/.nvm/versions/node/v24.16.0/bin/node', 
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 8080
      }
    },
    {
      name: 'my-angular-web',
      script: 'npx',
      // Serve the static build output with an HTTP server (e.g., serve or http-server)
      // Note: Angular should first be built using `npx nx build web`
      args: 'serve dist/apps/web -l 4200',
      interpreter: '/home/andy/.nvm/versions/node/v24.16.0/bin/node',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};