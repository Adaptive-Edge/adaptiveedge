#!/bin/bash

# Initial setup script for DigitalOcean droplet
# Run this once on a fresh droplet

set -e

echo "🔧 Setting up Adaptive Edge on DigitalOcean..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
echo "📦 Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt install -y nodejs

# Install PostgreSQL
echo "🗄️  Installing PostgreSQL..."
sudo apt install -y postgresql postgresql-contrib

# Install Nginx
echo "🌐 Installing Nginx..."
sudo apt install -y nginx

# Install PM2
echo "⚙️  Installing PM2..."
sudo npm install -g pm2

# Set up PostgreSQL database
echo "🗄️  Setting up PostgreSQL database..."
sudo -u postgres psql << PSQL
CREATE DATABASE adaptiveedge;
CREATE USER adaptiveedge_user WITH PASSWORD 'CHANGE_THIS_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE adaptiveedge TO adaptiveedge_user;
PSQL

echo ""
echo "✅ System setup complete!"
echo ""
echo "Next steps:"
echo "1. Clone your repository to /var/www/adaptiveedge"
echo "2. Create .env file with DATABASE_URL"
echo "3. Run: npm install && npm run db:push && npm run build"
echo "4. Run: pm2 start npm --name adaptiveedge -- start"
echo "5. Configure Nginx (see instructions)"
echo ""
echo "⚠️  IMPORTANT: Change the PostgreSQL password above!"
