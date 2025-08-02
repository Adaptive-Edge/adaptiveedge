# Connect to Existing DigitalOcean Droplet

## Current Situation
- ✅ DigitalOcean Droplet created and connected to GitHub
- ❌ GitHub repository missing latest changes (email system, updated database)
- ❌ Droplet has old code without working contact form

## Files That Need to Be Updated on GitHub

### New Files (Add to Repository):
1. **server/email.ts** - Complete SendGrid email system
2. **HOSTING_GUIDE.md** - Hosting options documentation
3. **EMAIL_TROUBLESHOOTING.md** - Email setup guide

### Updated Files (Replace on GitHub):
1. **server/routes.ts** - Now includes email notifications
2. **FINAL_DEPLOYMENT_COMMANDS.md** - Updated database connection
3. **UPLOAD_TO_NATCRYPTO_REPO.md** - Updated database URL
4. **NEW_SERVER_SETUP.md** - Complete server setup guide

### Database Connection Updated:
**Old**: `postgresql://neondb_owner:npg_5aq6TngFCYBQ@ep-dawn-glitter-a2x9eun2.eu-central-1.aws.neon.tech/neondb?sslmode=require`
**New**: `postgresql://neondb_owner:npg_jdUDQE71gJMp@ep-fragrant-bird-abgfwjpo-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require`

## Quick Update Process

### Step 1: Update GitHub Repository
Go to https://github.com/natcrypto/adaptiveedge and upload these files:

#### Upload New Files:
- `server/email.ts`
- `HOSTING_GUIDE.md` 
- `EMAIL_TROUBLESHOOTING.md`

#### Update Existing Files:
- Replace `server/routes.ts` with version that includes email imports
- Update database URLs in deployment documentation

### Step 2: Deploy to Your DigitalOcean Droplet

SSH into your droplet and run:

```bash
# Navigate to your project
cd /var/www/adaptiveedge

# Pull latest changes
git pull origin main

# Install any new dependencies
npm install

# Set up environment variables
cat > .env << 'EOF'
DATABASE_URL=postgresql://neondb_owner:npg_jdUDQE71gJMp@ep-fragrant-bird-abgfwjpo-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
SENDGRID_API_KEY=your_sendgrid_api_key_here
NODE_ENV=production
PORT=5000
EOF

# Push database schema
npm run db:push

# Build the application
npm run build

# Start/restart with PM2
pm2 restart adaptive-edge || pm2 start dist/index.js --name adaptive-edge

# Check status
pm2 status
```

### Step 3: Configure Nginx (if needed)
```bash
# Update Nginx configuration for adaptiveedge.uk
sudo nginx -t
sudo systemctl restart nginx
```

## Environment Variables Needed on Droplet:
- `DATABASE_URL` - Your PostgreSQL connection (updated)
- `SENDGRID_API_KEY` - Your SendGrid API key  
- `NODE_ENV=production`
- `PORT=5000`

## What You'll Get After Update:
- Working contact form with database storage
- Email notifications to nathan@adaptiveedge.uk
- Professional confirmation emails to users
- All animations and features working
- Custom domain (adaptiveedge.uk) pointing to your droplet

## Quick Verification:
After deployment, test your contact form:
```bash
curl -X POST https://adaptiveedge.uk/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Droplet Test","email":"test@example.com","company":"Test","message":"Testing droplet deployment"}'
```

You should receive an email notification at nathan@adaptiveedge.uk!