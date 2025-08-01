# Quick GitHub Update Instructions

## Direct Links for Easy Updates

Since Git push is restricted, here's the fastest way to update your repository with the new database connection:

### Method 1: Direct File Editing (Recommended)

**1. Update FINAL_DEPLOYMENT_COMMANDS.md:**
- Go to: https://github.com/natcrypto/adaptiveedge/blob/main/FINAL_DEPLOYMENT_COMMANDS.md
- Click the pencil icon (Edit)
- Find line 39 with the old database URL
- Replace with: `DATABASE_URL=postgresql://neondb_owner:npg_jdUDQE71gJMp@ep-fragrant-bird-abgfwjpo-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
- Commit changes

**2. Update UPLOAD_TO_NATCRYPTO_REPO.md:**
- Go to: https://github.com/natcrypto/adaptiveedge/blob/main/UPLOAD_TO_NATCRYPTO_REPO.md
- Click the pencil icon (Edit)
- Find line 119 with the old database URL
- Replace with the new connection string above
- Commit changes

**3. Add NEW_SERVER_SETUP.md:**
- Go to: https://github.com/natcrypto/adaptiveedge
- Click "Add file" > "Create new file"
- Name: `NEW_SERVER_SETUP.md`
- Copy content from this Replit project's NEW_SERVER_SETUP.md
- Commit changes

### Method 2: Bulk Upload (Alternative)

If you prefer to upload all files at once:
1. Go to https://github.com/natcrypto/adaptiveedge
2. Click "Add file" > "Upload files"
3. Upload these 3 files from this Replit project:
   - FINAL_DEPLOYMENT_COMMANDS.md
   - UPLOAD_TO_NATCRYPTO_REPO.md  
   - NEW_SERVER_SETUP.md
4. Commit with message: "Update database connection for new server"

## What This Updates

Your GitHub repository will have:
- Correct database connection string for your new server
- Complete deployment documentation with pooled connection
- Enhanced security configuration (channel_binding=require)
- EU West 2 region configuration for better UK performance

## After GitHub Update

Your deployment process becomes:
```bash
cd /var/www
git clone https://github.com/natcrypto/adaptiveedge.git
cd adaptiveedge
# Follow NEW_SERVER_SETUP.md
```

The contact form will work immediately with your new database connection.