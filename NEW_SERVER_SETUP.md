# New Server Setup with Updated Database

## Your New Database Connection

Connection String:
```
postgresql://neondb_owner:npg_jdUDQE71gJMp@ep-fragrant-bird-abgfwjpo-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

## Complete Server Setup Commands

### 1. Server Preparation
```bash
# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install PM2 and Nginx
npm install -g pm2
apt update && apt install nginx -y
```

### 2. Deploy Your Code
```bash
cd /var/www
git clone https://github.com/natcrypto/adaptiveedge.git
cd adaptiveedge
```

### 3. Environment Configuration
```bash
cat > .env << 'EOF'
DATABASE_URL=postgresql://neondb_owner:npg_jdUDQE71gJMp@ep-fragrant-bird-abgfwjpo-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
NODE_ENV=production
PORT=5000
EOF
```

### 4. Install and Build
```bash
npm install
npm run db:push
npm run build
pm2 start dist/index.js --name adaptive-edge
pm2 startup
pm2 save
```

### 5. Nginx Configuration
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

ln -s /etc/nginx/sites-available/adaptive-edge /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### 6. SSL Certificate
```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d adaptiveedge.uk -d www.adaptiveedge.uk
```

### 7. Firewall
```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
```

## Testing Your Setup

### Test Database Connection
```bash
# Test the new database connection
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Server Test","email":"test@adaptiveedge.uk","company":"Adaptive Edge","message":"Testing new server setup"}'
```

### Test Live Site
```bash
curl https://adaptiveedge.uk
curl -X POST https://adaptiveedge.uk/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Live Test","email":"test@adaptiveedge.uk","company":"Adaptive Edge","message":"Testing production deployment"}'
```

## Database Features

Your new database includes:
- Connection pooling (pooler endpoint)
- Enhanced security (channel_binding=require)
- EU West 2 region for better performance
- PostgreSQL with full contact form integration

## Update Workflow for Your Server

### For Code Updates:
```bash
cd /var/www/adaptiveedge
git pull origin main
npm install
npm run build
pm2 restart adaptive-edge
```

### For Database Schema Changes:
```bash
cd /var/www/adaptiveedge
npm run db:push
pm2 restart adaptive-edge
```

## Monitoring Commands
```bash
pm2 status                    # Check application status
pm2 logs adaptive-edge        # View application logs
systemctl status nginx       # Check web server
tail -f /var/log/nginx/error.log  # Web server logs
```

## Your Website Features

After deployment, your site will have:
- Working contact form with new database
- Murmuration animation with flocking behavior
- Interactive cursor birds
- Responsive coral/navy design
- HTTPS encryption
- Professional domain setup

The contact form will save all submissions to your new PostgreSQL database permanently.