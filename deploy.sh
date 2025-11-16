#!/bin/bash

# Deployment script for adaptiveedge.uk
# Run this on your DigitalOcean droplet

set -e  # Exit on error

echo "🚀 Deploying Adaptive Edge..."

# Pull latest changes
echo "📥 Pulling latest code..."
git pull origin claude/add-linkedin-blog-posts-01NSVRnEew3tBtfv95BgWfzb

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run database migrations
echo "🗄️  Running database migrations..."
npm run db:push

# Build the application
echo "🔨 Building application..."
npm run build

# Restart the application with PM2
echo "♻️  Restarting application..."
pm2 restart adaptiveedge || pm2 start npm --name "adaptiveedge" -- start

echo "✅ Deployment complete!"
echo "📊 Check status: pm2 status"
echo "📝 View logs: pm2 logs adaptiveedge"
