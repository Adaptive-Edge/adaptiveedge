module.exports = {
  apps: [{
    name: 'adaptiveedge',
    script: './dist/index.js',
    env: {
      NODE_ENV: 'production',
      PORT: '5000',
      DATABASE_URL: 'mysql://admin:471a1f5e3d41055fff736c8aa76fad658b276fb7e75f5a34@localhost:3306/invtnprrts2021',
      SENDGRID_API_KEY: 'placeholder'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    restart_delay: 4000
  }]
}
