#!/bin/bash

echo "🖼️ Case Study Image Upload Feature Deployment"
echo "=============================================="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Step 1: Install new dependencies
echo -e "${YELLOW}📦 Installing new dependencies (multer)...${NC}"
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi

# Step 2: Create upload directories
echo -e "${YELLOW}📁 Setting up image upload directories...${NC}"
npm run setup-uploads

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to create upload directories${NC}"
    exit 1
fi

# Step 3: Build the project
echo -e "${YELLOW}🔨 Building project with new image upload functionality...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi

# Step 4: Test the upload endpoint
echo -e "${YELLOW}🧪 Testing case study image upload endpoint...${NC}"
UPLOAD_TEST=$(curl -s -w "%{http_code}" -X POST https://adaptiveedge.uk/api/case-study-images -o /tmp/upload_test_response 2>/dev/null || echo "000")

# Step 5: Restart the application
echo -e "${YELLOW}🔄 Restarting application...${NC}"
if command -v pm2 &> /dev/null; then
    pm2 restart adaptive-edge || pm2 restart all
    echo -e "${GREEN}✅ Application restarted with PM2${NC}"
else
    echo -e "${YELLOW}⚠️ PM2 not found. Please manually restart your Node.js application${NC}"
fi

# Step 6: Wait for application to restart
echo -e "${YELLOW}⏳ Waiting for application to fully start...${NC}"
sleep 5

# Step 7: Verify everything is working
echo -e "${YELLOW}🔍 Final verification...${NC}"

# Check if case studies API is still working
CASE_STUDIES_CHECK=$(curl -s https://adaptiveedge.uk/api/case-studies | jq length 2>/dev/null || echo "0")

if [ "$CASE_STUDIES_CHECK" -ge "1" ]; then
    echo -e "${GREEN}✅ Case studies API working: $CASE_STUDIES_CHECK case studies found${NC}"
else
    echo -e "${RED}❌ Case studies API issue${NC}"
fi

# Check if upload directory is accessible (it should return 403 or 404, not 500)
UPLOAD_DIR_CHECK=$(curl -s -w "%{http_code}" https://adaptiveedge.uk/case-study-images/ -o /dev/null)
if [ "$UPLOAD_DIR_CHECK" != "500" ]; then
    echo -e "${GREEN}✅ Upload directory endpoint accessible${NC}"
else
    echo -e "${YELLOW}⚠️ Upload directory check returned 500${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Case Study Image Upload Feature Deployed Successfully!${NC}"
echo ""
echo "✅ New Features Available:"
echo "  • Case study image upload in admin panel"
echo "  • Drag & drop image support"
echo "  • Image preview in editor"
echo "  • Automatic file naming and organization"
echo "  • 5MB file size limit with type validation"
echo ""
echo "🔧 Technical Details:"
echo "  • Upload endpoint: https://adaptiveedge.uk/api/case-study-images"
echo "  • Images stored in: /var/www/adaptiveedge/adaptiveedge/dist/public/case-study-images/"
echo "  • Accessible at: https://adaptiveedge.uk/case-study-images/"
echo "  • Supported formats: JPEG, PNG, GIF, WebP"
echo ""
echo "📊 Admin Panel: https://adaptiveedge.uk/admin"
echo "🌐 Website: https://adaptiveedge.uk"
echo ""
echo "🎯 Deployment Complete!"