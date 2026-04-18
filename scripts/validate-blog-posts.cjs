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

/**
 * Check for redirect conflicts: any 301 redirect that shadows a live blog post slug
 * This prevents the bug where a redirect eats a valid post's URL
 */
function checkRedirectConflicts() {
  const posts = extractBlogPostsFromRegistry();
  const vercelConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../vercel.json'), 'utf8'));
  const redirects = vercelConfig.redirects || [];
  const conflicts = [];

  for (const redirect of redirects) {
    if (redirect.statusCode !== 301) continue;
    // Extract the slug from the redirect source (e.g., "/blog/some-slug" → "some-slug")
    const match = redirect.source.match(/^\/blog\/(.+)$/);
    if (!match) continue;
    const slug = match[1];
    if (posts[slug]) {
      conflicts.push({
        slug,
        redirectTo: redirect.destination,
        postTitle: slug
      });
    }
  }

  if (conflicts.length > 0) {
    console.log('\n⚠️  REDIRECT CONFLICTS DETECTED\n');
    console.log('These 301 redirects shadow live blog posts:\n');
    conflicts.forEach(({ slug, redirectTo }) => {
      console.log(`  ❌ /blog/${slug}`);
      console.log(`     301 → ${redirectTo}`);
      console.log(`     But "${slug}" exists in BlogPost.jsx!\n`);
    });
    console.log('Fix: Remove the redirect or remove the blog post entry.\n');
    return false;
  }

  console.log(`✅ No redirect conflicts (checked ${redirects.filter(r => r.statusCode === 301).length} redirects against ${Object.keys(posts).length} posts)`);
  return true;
}

/**
 * Check for orphan markdown files — .md files in content/blogs/ or public/content/blogs/
 * that are NOT registered in BlogPost.jsx. These get picked up by generate-sitemap.js
 * and submitted to Google, but redirect or don't render correctly, triggering GSC
 * "Page with redirect" coverage issues.
 *
 * Temporary allowlist holds posts pending a re-register-or-delete decision.
 */
const ORPHAN_ALLOWLIST = new Set([
  // TODO: decide to re-register in BlogPost.jsx or delete. Live URLs return 200 OK
  // but the posts aren't registered, causing sitemap pollution.
  'dental-group-scaling-accounting',
  'radiology-practice-real-time-visibility',
]);

function checkOrphanFiles() {
  const posts = extractBlogPostsFromRegistry();
  const registered = new Set(Object.keys(posts));
  const dirs = [
    path.join(__dirname, '../content/blogs'),
    path.join(__dirname, '../public/content/blogs'),
  ];
  const orphans = [];

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const slug = file.replace(/\.md$/, '');
      if (!registered.has(slug) && !ORPHAN_ALLOWLIST.has(slug)) {
        orphans.push({ slug, path: path.join(dir, file) });
      }
    }
  }

  if (orphans.length > 0) {
    console.log('\n⚠️  ORPHAN MARKDOWN FILES DETECTED\n');
    console.log('These .md files exist but are NOT registered in BlogPost.jsx.');
    console.log('They will be added to sitemap.xml and submitted to Google, but redirect');
    console.log('or fail to render, causing "Page with redirect" GSC coverage issues.\n');
    orphans.forEach(({ slug, path: p }) => {
      console.log(`  ❌ ${p}`);
    });
    console.log('\nFix: delete the orphan .md files, or add them to BlogPost.jsx, or');
    console.log('add them to ORPHAN_ALLOWLIST in this script (pending-decision only).\n');
    return false;
  }

  console.log(`✅ No orphan .md files (checked ${dirs.length} content dirs)`);
  return true;
}

const postsValid = validatePosts();
const redirectsClean = checkRedirectConflicts();
const orphansClean = checkOrphanFiles();

if (!postsValid || !redirectsClean || !orphansClean) {
  process.exit(1);
}
