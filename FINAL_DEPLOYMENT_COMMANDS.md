# Complete DigitalOcean Deployment Commands

## Your Database Connection String
```
postgresql://neondb_owner:npg_5aq6TngFCYBQ@ep-dawn-glitter-a2x9eun2.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

## Quick Deployment Script

SSH into your DigitalOcean droplet and run these commands:

### 1. Install Dependencies
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install PM2 and Nginx
npm install -g pm2
apt update && apt install nginx -y
```

### 2. Upload Your Code
```bash
cd /var/www
# Option A: Clone from GitHub (if you pushed)
git clone https://github.com/yourusername/adaptive-edge-website.git

# Option B: Upload files via SCP/SFTP to /var/www/adaptive-edge-website/
```

### 3. Configure Environment
```bash
cd /var/www/adaptive-edge-website
cat > .env << 'EOF'
DATABASE_URL=postgresql://neondb_owner:npg_jdUDQE71gJMp@ep-fragrant-bird-abgfwjpo-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
NODE_ENV=production
PORT=5000
EOF
```

### 4. Build and Deploy
```bash
# Install, build, and setup database
npm install
npm run db:push
npm run build

# Start with PM2
pm2 start dist/index.js --name adaptive-edge
pm2 startup
pm2 save
```

### 5. Configure Nginx
```bash
cat > /etc/nginx/sites-available/adaptive-edge << 'EOF'
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
    }
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/adaptive-edge /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### 6. Setup SSL
```bash
# Install Certbot
apt install certbot python3-certbot-nginx -y

# Get SSL certificate
certbot --nginx -d adaptiveedge.uk -d www.adaptiveedge.uk
```

### 7. Configure Firewall
```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
```

## Test Your Deployment

### Test website:
```bash
curl https://adaptiveedge.uk
```

### Test contact form:
```bash
curl -X POST https://adaptiveedge.uk/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Live Test","email":"test@adaptiveedge.uk","company":"Adaptive Edge","message":"Testing production contact form on DigitalOcean"}'
```

### Check contact was saved:
```bash
curl https://adaptiveedge.uk/api/contacts
```

## One-Line Update Command

For future updates via GitHub:
```bash
cd /var/www/adaptive-edge-website && git pull && npm install && npm run build && pm2 restart adaptive-edge
```

## Your Site Will Have:
- ✅ Beautiful murmuration animation in hero section
- ✅ Interactive cursor birds that follow mouse
- ✅ Working contact form that saves to database
- ✅ HTTPS encryption
- ✅ Professional domain (adaptiveedge.uk)
- ✅ Auto-restart on server reboot

## Monitoring Commands:
```bash
pm2 status                    # Check app status  
pm2 logs adaptive-edge        # View app logs
systemctl status nginx       # Check Nginx status
tail -f /var/log/nginx/error.log  # Nginx error logs
```

That's it! Your production website will be live at https://adaptiveedge.uk with full database integration.