# Production Setup for DigitalOcean Droplet

## Complete Deployment Commands

### Prerequisites
- DigitalOcean Droplet with Ubuntu 22.04
- Domain (adaptiveedge.uk) pointing to droplet IP
- GitHub repository connected

### 1. Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 and Nginx
sudo npm install -g pm2
sudo apt install nginx -y

# Install Git (if not already installed)
sudo apt install git -y
```

### 2. Clone and Setup Project
```bash
# Create web directory
sudo mkdir -p /var/www
cd /var/www

# Clone your repository
sudo git clone https://github.com/natcrypto/adaptiveedge.git
sudo chown -R $USER:$USER /var/www/adaptiveedge
cd adaptiveedge

# Install dependencies
npm install
```

### 3. Environment Configuration
```bash
# Create production environment file
cat > .env << 'EOF'
DATABASE_URL=postgresql://neondb_owner:npg_jdUDQE71gJMp@ep-fragrant-bird-abgfwjpo-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
SENDGRID_API_KEY=SG.your_actual_sendgrid_api_key_here
NODE_ENV=production
PORT=5000
EOF

# Make sure to replace 'SG.your_actual_sendgrid_api_key_here' with your real SendGrid API key
```

### 4. Database Setup
```bash
# Push database schema
npm run db:push

# Verify database connection
node -e "
const { db } = require('./dist/server/db.js');
console.log('Database connection test...');
"
```

### 5. Build and Start Application
```bash
# Build the application
npm run build

# Start with PM2
pm2 start dist/index.js --name adaptive-edge

# Save PM2 configuration
pm2 startup
pm2 save

# Check status
pm2 status
pm2 logs adaptive-edge
```

### 6. Nginx Configuration
```bash
# Create Nginx configuration
sudo tee /etc/nginx/sites-available/adaptive-edge << 'EOF'
server {
    listen 80;
    server_name adaptiveedge.uk www.adaptiveedge.uk;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_buffering off;
    }
}
EOF

# Enable the site
sudo ln -s /etc/nginx/sites-available/adaptive-edge /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 7. SSL Certificate with Let's Encrypt
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d adaptiveedge.uk -d www.adaptiveedge.uk

# Test auto-renewal
sudo certbot renew --dry-run
```

### 8. Firewall Configuration
```bash
# Configure UFW firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable
sudo ufw status
```

### 9. Testing Your Deployment

#### Test the application
```bash
# Check if application is running
curl http://localhost:5000

# Test contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Production Test","email":"test@example.com","company":"Adaptive Edge","message":"Testing production deployment"}'
```

#### Test with your domain
```bash
# Test website
curl https://adaptiveedge.uk

# Test contact form via domain
curl -X POST https://adaptiveedge.uk/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Domain Test","email":"nathan@adaptiveedge.uk","company":"Adaptive Edge","message":"Testing live domain"}'
```

### 10. Monitoring and Maintenance

#### Check application status
```bash
pm2 status
pm2 logs adaptive-edge
pm2 monit
```

#### Update deployment
```bash
cd /var/www/adaptiveedge
git pull origin main
npm install
npm run build
pm2 restart adaptive-edge
```

#### Check system resources
```bash
htop
df -h
free -h
```

### 11. Backup Strategy
```bash
# Database backups (if needed locally)
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Code backups (Git handles this)
git log --oneline -10
```

## Expected Result

After successful deployment:
- **Website**: https://adaptiveedge.uk (with SSL)
- **Contact Form**: Saves to PostgreSQL database
- **Email Notifications**: Sent to nathan@adaptiveedge.uk
- **User Confirmations**: Professional branded emails
- **Animations**: Murmuration and cursor birds working
- **Performance**: Fast loading with Nginx proxy

## Troubleshooting

### Common Issues:
1. **Port 5000 in use**: `sudo lsof -i :5000` then kill process
2. **Database connection**: Check DATABASE_URL format
3. **Email not sending**: Verify SENDGRID_API_KEY is correct
4. **Nginx errors**: Check `sudo nginx -t` and logs
5. **PM2 not starting**: Check `pm2 logs adaptive-edge`

### Log Locations:
- Application logs: `pm2 logs adaptive-edge`
- Nginx logs: `/var/log/nginx/error.log`
- System logs: `journalctl -u nginx`