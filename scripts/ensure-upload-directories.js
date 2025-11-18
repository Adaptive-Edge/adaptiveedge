#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Directories that need to exist for image uploads
const uploadDirectories = [
  path.join(projectRoot, 'dist', 'public', 'case-study-images'),
  // Add blog-images if it doesn't exist either
  path.join(projectRoot, 'dist', 'public', 'blog-images')
];

console.log('🚀 Setting up image upload directories...');

for (const dir of uploadDirectories) {
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Created directory: ${dir}`);
    } else {
      console.log(`📁 Directory already exists: ${dir}`);
    }
  } catch (error) {
    console.error(`❌ Failed to create directory ${dir}:`, error);
    process.exit(1);
  }
}

console.log('🎉 Upload directories setup complete!');