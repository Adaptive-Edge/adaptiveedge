#\!/bin/bash
# AdaptiveEdge Deployment Script
# Prevents recurring environment and database issues

set -e

echo "🚀 Starting AdaptiveEdge deployment..."

# 1. Install dependencies
echo "📦 Installing dependencies..."
npm install

# 2. Build the application
echo "🏗️  Building application..."
npm run build

# 3. Ensure upload directories exist
echo "📁 Creating upload directories..."
mkdir -p dist/public/blog-images
mkdir -p dist/public/case-study-images
mkdir -p logs

# 4. Set proper permissions
echo "🔒 Setting permissions..."
chmod -R 755 dist/public/blog-images
chmod -R 755 dist/public/case-study-images
chmod +x deploy.sh

# 5. Check database connection
echo "🗄️  Testing database connection..."
mysql -u admin -p471a1f5e3d41055fff736c8aa76fad658b276fb7e75f5a34 -h localhost invtnprrts2021 -e "SELECT 1 as test;" > /dev/null || {
    echo "❌ Database connection failed\!"
    exit 1
}

# 6. Stop existing PM2 process if running
echo "🛑 Stopping existing processes..."
pm2 delete adaptiveedge 2>/dev/null || echo "No existing process to stop"

# 7. Start application with ecosystem config
echo "▶️  Starting application..."
pm2 start ecosystem.config.cjs

# 8. Save PM2 configuration
echo "💾 Saving PM2 configuration..."
pm2 save

# 9. Test APIs
echo "🧪 Testing APIs..."
sleep 3

BLOG_COUNT=$(curl -s "http://localhost:5000/api/blog-posts" | jq length 2>/dev/null || echo "0")
CASE_COUNT=$(curl -s "http://localhost:5000/api/case-studies" | jq length 2>/dev/null || echo "0")

echo "📊 Blog posts: $BLOG_COUNT"
echo "📊 Case studies: $CASE_COUNT"

if [ "$BLOG_COUNT" -gt "0" ] && [ "$CASE_COUNT" -gt "0" ]; then
    echo "✅ Deployment successful\! Content is loading properly."
else
    echo "❌ Deployment issue: Content not loading properly."
    echo "🔍 Check logs: pm2 logs adaptiveedge"
    exit 1
fi

echo "🎉 AdaptiveEdge is ready\!"
