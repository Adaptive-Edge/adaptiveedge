#!/usr/bin/env node

/**
 * Case Studies Migration Script
 * 
 * This script reads the backup case study data and inserts it into the database
 * using the API endpoints. It handles field mapping between the backup data
 * structure and the database schema.
 */

import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const API_BASE_URL = process.env.API_BASE_URL || 'https://adaptiveedge.uk';
const BACKUP_FILE_PATH = join(__dirname, '../shared/caseStudiesData.ts.backup');

// Helper function to convert TypeScript file to importable data
async function loadBackupData() {
  try {
    const backupContent = await readFile(BACKUP_FILE_PATH, 'utf-8');
    
    // Extract the array data from the TypeScript file
    const arrayMatch = backupContent.match(/export const caseStudiesBackupData[^=]*=\s*(\[[\s\S]*?\]);/);
    if (!arrayMatch) {
      throw new Error('Could not find case studies data array in backup file');
    }
    
    // Convert TypeScript array to JSON format
    let jsonString = arrayMatch[1];
    // Convert unquoted object keys to quoted keys
    jsonString = jsonString.replace(/(\w+):/g, '"$1":');
    // Handle trailing commas in objects
    jsonString = jsonString.replace(/,(\s*[}\]])/g, '$1');
    
    const data = JSON.parse(jsonString);
    console.log(`✅ Loaded ${data.length} case studies from backup file`);
    return data;
  } catch (error) {
    console.error('❌ Error loading backup data:', error.message);
    throw error;
  }
}

// Helper function to map backup data to API schema
function mapCaseStudyData(backupItem) {
  return {
    slug: backupItem.slug,
    title: backupItem.title,
    client: backupItem.client,
    category: backupItem.category,
    challenge: backupItem.challenge,
    approach: backupItem.approach,
    impact: backupItem.impact,
    role: backupItem.role,
    featured: backupItem.featured,
    treeHouseAttribution: backupItem.treeHouseAttribution,
    image: backupItem.image
  };
}

// Helper function to make API requests
async function apiRequest(endpoint, method = 'GET', data = null) {
  const url = `${API_BASE_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    }
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  console.log(`🔄 ${method} ${endpoint}`);
  
  try {
    const response = await fetch(url, options);
    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}\n${JSON.stringify(responseData, null, 2)}`);
    }
    
    return responseData;
  } catch (error) {
    console.error(`❌ API request failed for ${method} ${endpoint}:`, error.message);
    throw error;
  }
}

// Check if the server is running
async function checkServerHealth() {
  try {
    console.log('🔍 Checking server health...');
    await fetch(`${API_BASE_URL}/api/case-studies`);
    console.log('✅ Server is running and responding');
    return true;
  } catch (error) {
    console.error('❌ Server health check failed:', error.message);
    console.log('📝 Please make sure the server is running with: npm run dev');
    return false;
  }
}

// Get existing case studies to check for duplicates
async function getExistingCaseStudies() {
  try {
    const response = await apiRequest('/api/case-studies');
    return response;
  } catch (error) {
    console.log('ℹ️  No existing case studies found or API not available');
    return [];
  }
}

// Create a case study via API
async function createCaseStudy(caseStudyData) {
  try {
    const response = await apiRequest('/api/case-studies', 'POST', caseStudyData);
    console.log(`✅ Created case study: "${caseStudyData.title}"`);
    return response;
  } catch (error) {
    console.error(`❌ Failed to create case study "${caseStudyData.title}":`, error.message);
    throw error;
  }
}

// Main migration function
async function migrateCaseStudies() {
  console.log('🚀 Starting case studies migration...\n');

  try {
    // Check if server is running
    const serverHealthy = await checkServerHealth();
    if (!serverHealthy) {
      process.exit(1);
    }

    // Load backup data
    const backupData = await loadBackupData();

    // Get existing case studies
    console.log('\n🔍 Checking for existing case studies...');
    const existingStudies = await getExistingCaseStudies();
    const existingSlugs = new Set(existingStudies.map(study => study.slug));

    console.log(`📊 Found ${existingStudies.length} existing case studies in database`);

    // Filter out duplicates
    const newCaseStudies = backupData.filter(item => !existingSlugs.has(item.slug));
    console.log(`📥 ${newCaseStudies.length} new case studies to migrate`);

    if (newCaseStudies.length === 0) {
      console.log('✅ No new case studies to migrate - all data is already in the database');
      return;
    }

    // Migrate each case study
    console.log('\n📝 Starting migration...');
    let successCount = 0;
    let errorCount = 0;

    for (const [index, backupItem] of newCaseStudies.entries()) {
      try {
        console.log(`\n📄 Migrating (${index + 1}/${newCaseStudies.length}): ${backupItem.title}`);
        
        const mappedData = mapCaseStudyData(backupItem);
        await createCaseStudy(mappedData);
        successCount++;
        
        // Small delay to be gentle on the API
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`❌ Failed to migrate case study "${backupItem.title}":`, error.message);
        errorCount++;
        
        // Continue with other migrations even if one fails
        continue;
      }
    }

    // Summary
    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully migrated: ${successCount} case studies`);
    if (errorCount > 0) {
      console.log(`❌ Failed migrations: ${errorCount} case studies`);
    }
    console.log(`📁 Total in database: ${existingStudies.length + successCount} case studies`);

    if (successCount > 0) {
      console.log('\n🎉 Migration completed successfully!');
      console.log('🌐 You can now view the case studies on the website');
    }

  } catch (error) {
    console.error('💥 Migration failed with error:', error.message);
    process.exit(1);
  }
}

// Handle command line arguments
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
📖 Case Studies Migration Script

Usage: node scripts/migrate-case-studies.js [options]

Options:
  --help, -h          Show this help message
  --api-url <url>     Set custom API base URL (default: http://localhost:5000)

Environment Variables:
  API_BASE_URL        Base URL for the API (default: http://localhost:5000)

Examples:
  npm run migrate-case-studies
  node scripts/migrate-case-studies.js --api-url http://localhost:3000
  API_BASE_URL=https://adaptiveedge.uk node scripts/migrate-case-studies.js

Prerequisites:
  1. Server must be running (npm run dev or npm start)
  2. Database must be set up (npm run db:push)
  3. Backup file must exist at shared/caseStudiesData.ts.backup
`);
  process.exit(0);
}

// Parse command line arguments
const apiUrlIndex = process.argv.findIndex(arg => arg === '--api-url');
if (apiUrlIndex !== -1 && process.argv[apiUrlIndex + 1]) {
  process.env.API_BASE_URL = process.argv[apiUrlIndex + 1];
}

// Run the migration
migrateCaseStudies().catch(error => {
  console.error('💥 Unexpected error:', error);
  process.exit(1);
});