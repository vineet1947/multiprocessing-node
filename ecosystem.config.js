module.exports = {
  apps: [
    {
      name: 'Express',
      script: 'server.js',
      instances: 2,
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
      // exec_mode: 'cluster',
      // env: {
      //   NODE_ENV: 'development',
      // },
      // env_production: {
      //   NODE_ENV: 'production',
      // },
    },
    {
      name: 'Worker1',
      script: 'workers/fab-series-worker1.js',
      instances: 1,
    },
    {
      name: 'Worker2',
      script: 'workers/fab-series-worker2.js',
      instances: 1,
    },
  ],

  // deploy: {
  //   production: {
  //     user: 'SSH_USERNAME',
  //     host: 'SSH_HOSTMACHINE',
  //     ref: 'origin/master',
  //     repo: 'GIT_REPOSITORY',
  //     path: 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy':
  //       'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': '',
  //   },
  // },
}
