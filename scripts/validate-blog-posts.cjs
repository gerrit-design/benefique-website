#!/usr/bin/env node

/**
 * Blog Post Validation Test
 * 
 * Ensures all blog posts referenced in BlogPost.jsx have corresponding markdown files
 * Prevents "prerender warnings" where blog posts are registered but files don't exist
 * 
 * Run: npm run validate-blogs
 */

const fs = require('fs');
const path = require('path');

const BLOG_REGISTRY = path.join(__dirname, '../src/BlogPost.jsx');
const CONTENT_DIR = path.join(__dirname, '../content/blogs');

function extractBlogPostsFromRegistry() {
  const content = fs.readFileSync(BLOG_REGISTRY, 'utf8');
  const posts = {};
  
  // Match all blog post entries
  const postMatches = content.match(/'([^']+)':\s*\{[^}]*?file:\s*'([^']+)'[^}]*?\}/g);
  
  if (!postMatches) {
    console.error('❌ Could not parse blog posts from BlogPost.jsx');
    process.exit(1);
  }
  
  postMatches.forEach(match => {
    const [, slug, filePath] = match.match(/'([^']+)':\s*\{[^}]*?file:\s*'([^']+)'/);
    posts[slug] = filePath.split('/').pop();
  });
  
  return posts;
}

function validatePosts() {
  const posts = extractBlogPostsFromRegistry();
  const missing = [];
  const found = [];
  
  console.log('🔍 Validating Blog Posts\n');
  console.log(`Registry: ${Object.keys(posts).length} posts registered\n`);
  
  for (const [slug, filename] of Object.entries(posts)) {
    const fullPath = path.join(CONTENT_DIR, filename);
    if (fs.existsSync(fullPath)) {
      found.push({ slug, filename });
    } else {
      missing.push({ slug, filename });
    }
  }
  
  if (missing.length === 0) {
    console.log('✅ All blog post files exist!\n');
    console.log(`✅ Found: ${found.length}`);
    console.log(`❌ Missing: 0\n`);
    return true;
  } else {
    console.log('❌ VALIDATION FAILED\n');
    console.log(`✅ Found: ${found.length}`);
    console.log(`❌ Missing: ${missing.length}\n`);
    console.log('Missing files:\n');
    
    missing.forEach(({ slug, filename }) => {
      const expectedPath = path.join(CONTENT_DIR, filename);
      console.log(`  • ${slug}`);
      console.log(`    Expected: ${expectedPath}\n`);
    });
    
    return false;
  }
}

if (!validatePosts()) {
  process.exit(1);
}
