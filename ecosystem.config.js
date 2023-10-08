module.exports = {
  apps: [
    {
      script: 'yarn start',
    },
  ],

  deploy: {
    production: {
      key: 'tokyo.pem',
      user: 'ubuntu',
      // host: '13.114.237.53',
      host: '13.230.253.165',
      ref: 'origin/main',
      repo: 'git@github.com:hungdoba/asiatips.git',
      path: '/home/ubuntu',
      'pre-deploy-local': '',
      'post-deploy':
        'source ~/.nvm/nvm.sh && yarn install && yarn build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      ssh_options: 'ForwardAgent=yes',
    },
  },
};
