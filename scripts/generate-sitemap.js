#!/usr/bin/env node
/**
 * generate-sitemap.js
 * 
 * Automatically generates sitemap.xml from:
 * 1. Static route metadata (routes, pages)
 * 2. Blog post files (/public/content/blogs/*.md)
 * 
 * Runs during: npm run build (before deployment)
 * Output: /public/sitemap.xml
 * 
 * Benefits:
 * - No manual updates needed
 * - Dates always current (from file lastmod or frontmatter)
 * - Never forgets a blog post
 * - Integrates with every deploy
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const SITE = 'https://www.benefique.com';
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const BLOGS_DIR = join(ROOT, 'public', 'content', 'blogs');
const OUTPUT_FILE = join(ROOT, 'public', 'sitemap.xml');

/**
 * Static routes (non-blog pages)
 * These are manually maintained for pages like /services, /about, /contact
 */
const staticRoutes = [
  { path: '/', priority: 1.0, changefreq: 'weekly', lastmod: new Date() },
  { path: '/services', priority: 0.9, changefreq: 'monthly', lastmod: new Date() },
  { path: '/demo', priority: 0.8, changefreq: 'monthly', lastmod: new Date() },
  { path: '/testimonials', priority: 0.8, changefreq: 'monthly', lastmod: new Date() },
  { path: '/about', priority: 0.8, changefreq: 'monthly', lastmod: new Date() },
  { path: '/contact', priority: 0.9, changefreq: 'monthly', lastmod: new Date() },
  { path: '/careers', priority: 0.7, changefreq: 'monthly', lastmod: new Date() },
  { path: '/blog', priority: 0.7, changefreq: 'weekly', lastmod: new Date() },
  
  // Location pages
  { path: '/davie-accounting', priority: 0.9, changefreq: 'monthly', lastmod: new Date() },
  { path: '/plantation-accounting', priority: 0.8, changefreq: 'monthly', lastmod: new Date() },
  { path: '/weston-accounting', priority: 0.8, changefreq: 'monthly', lastmod: new Date() },
  { path: '/weston-bookkeeping', priority: 0.8, changefreq: 'monthly', lastmod: new Date() },
  { path: '/miramar-accounting', priority: 0.8, changefreq: 'monthly', lastmod: new Date() },
  { path: '/fort-lauderdale-accounting', priority: 0.8, changefreq: 'monthly', lastmod: new Date() },
  { path: '/aventura-accounting', priority: 0.8, changefreq: 'monthly', lastmod: new Date() },
  { path: '/hollywood-accounting', priority: 0.8, changefreq: 'monthly', lastmod: new Date() },
  
  // Industry pages
  { path: '/industries/radiology', priority: 0.8, changefreq: 'monthly', lastmod: new Date() },
  { path: '/industries/dental', priority: 0.8, changefreq: 'monthly', lastmod: new Date() },
  { path: '/industries/veterinary', priority: 0.8, changefreq: 'monthly', lastmod: new Date() },
  { path: '/industries/marine-services', priority: 0.8, changefreq: 'monthly', lastmod: new Date() },
  
  // Service pages
  { path: '/services/real-time-accounting', priority: 0.9, changefreq: 'monthly', lastmod: new Date() },
  { path: '/services/fractional-cfo', priority: 0.9, changefreq: 'monthly', lastmod: new Date() },
  { path: '/radiology', priority: 0.95, changefreq: 'weekly', lastmod: new Date() },
  { path: '/radiology/intelligence-pack', priority: 0.9, changefreq: 'monthly', lastmod: new Date() },
  { path: '/knowledge', priority: 0.9, changefreq: 'weekly', lastmod: new Date() },
  { path: '/intelligence', priority: 0.95, changefreq: 'monthly', lastmod: new Date() },

  // Tool pages
  { path: '/tools/concierge-simulator', priority: 0.9, changefreq: 'monthly', lastmod: new Date() },
  { path: '/tools/radiology-profit-simulator', priority: 0.9, changefreq: 'monthly', lastmod: new Date() },
  { path: '/tools/business-simulator', priority: 0.85, changefreq: 'monthly', lastmod: new Date() },
];

/**
 * Slugs actually registered in src/BlogPost.jsx.
 *
 * A markdown file on disk is NOT a published post — the post only renders if
 * it also has an entry in the BlogPost.jsx registry. Two files
 * (dental-group-scaling-accounting, radiology-practice-real-time-visibility)
 * were being listed in the sitemap without a registry entry, so Google was
 * being sent to URLs that return 200 with an empty app shell: soft 404s.
 * Listing only registered slugs keeps the sitemap honest.
 */
function readRegisteredSlugs() {
  try {
    const registry = readFileSync(resolve(__dirname, '..', 'src', 'BlogPost.jsx'), 'utf-8');
    // Same extraction scripts/prerender.js uses: scope to the blogPosts object,
    // then take top-level keys containing a hyphen. Keeping these identical is
    // the point — if the sitemap and the prerenderer disagreed about which posts
    // exist, one of them would be wrong and nothing would say so.
    const block = registry.match(/const blogPosts\s*=\s*\{([\s\S]*?)\n\};/);
    if (!block) return null;
    const slugRegex = /^\s+['"]([a-z0-9]+-[a-z0-9-]+)['"]:\s*\{/gm;
    const slugs = new Set();
    let m;
    while ((m = slugRegex.exec(block[1])) !== null) slugs.add(m[1]);
    return slugs.size > 0 ? slugs : null;
  } catch (err) {
    console.warn(`⚠️  Could not read BlogPost.jsx registry (${err.message}); listing all markdown files.`);
    return null;
  }
}

/**
 * Parse blog post metadata from frontmatter
 */
function parseBlogPost(filePath, file) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const { data, content: body } = matter(content);
    
    // Derive slug from frontmatter or filename
    const slug = data.slug || file.replace(/\.md$/, '');
    if (!slug) {
      console.warn(`⚠️  No slug in ${filePath}, skipping`);
      return null;
    }
    
    // Use frontmatter date, or file mtime if not specified
    const fileStats = statSync(filePath);
    const lastmod = data.date ? new Date(data.date) : new Date(fileStats.mtime);
    
    return {
      slug: slug,
      path: `/blog/${slug}`,
      lastmod,
      priority: 0.8,
      changefreq: 'monthly',
    };
  } catch (err) {
    console.error(`❌ Error parsing ${filePath}: ${err.message}`);
    return null;
  }
}

/**
 * Format date as YYYY-MM-DD (Google sitemap standard)
 */
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Build XML entry for a single URL
 */
function buildUrlEntry(path, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${SITE}${path}</loc>
    <lastmod>${formatDate(lastmod)}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

/**
 * Main: Generate sitemap
 */
function generateSitemap() {
  console.log('[sitemap] Generating sitemap.xml...');
  
  const entries = [];
  
  // 1. Add static routes
  console.log(`[sitemap] Adding ${staticRoutes.length} static routes`);
  for (const route of staticRoutes) {
    entries.push(buildUrlEntry(route.path, route.lastmod, route.changefreq, route.priority));
  }
  
  // 2. Scan blog posts directory (with deduplication by slug)
  let blogCount = 0;
  const seenSlugs = new Set();
  try {
    const allBlogFiles = readdirSync(BLOGS_DIR).filter(f => f.endsWith('.md'));
    const registeredSlugs = readRegisteredSlugs();
    const blogFiles = registeredSlugs
      ? allBlogFiles.filter((f) => registeredSlugs.has(f.replace(/\.md$/, '')))
      : allBlogFiles;
    const skipped = allBlogFiles.length - blogFiles.length;
    console.log(`[sitemap] Found ${allBlogFiles.length} blog post files`);
    if (skipped > 0) {
      const names = allBlogFiles
        .filter((f) => !blogFiles.includes(f))
        .map((f) => f.replace(/\.md$/, ''))
        .join(', ');
      console.log(`[sitemap] Skipping ${skipped} unregistered (not in BlogPost.jsx): ${names}`);
    }

    for (const file of blogFiles) {
      const filePath = join(BLOGS_DIR, file);
      const post = parseBlogPost(filePath, file);

      if (post) {
        if (seenSlugs.has(post.slug)) {
          console.warn(`⚠️  Duplicate slug "${post.slug}" from ${file}, skipping`);
          continue;
        }
        seenSlugs.add(post.slug);
        entries.push(buildUrlEntry(post.path, post.lastmod, post.changefreq, post.priority));
        blogCount++;
      }
    }

    console.log(`[sitemap] Added ${blogCount} blog posts`);
  } catch (err) {
    console.error(`❌ Error scanning blog directory: ${err.message}`);
  }
  
  // 3. Build XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;
  
  // 4. Write to file
  try {
    writeFileSync(OUTPUT_FILE, xml, 'utf-8');
    console.log(`✅ Sitemap generated: ${OUTPUT_FILE}`);
    console.log(`   Total URLs: ${entries.length} (${staticRoutes.length} static + ${blogCount} blogs)`);
  } catch (err) {
    console.error(`❌ Error writing sitemap: ${err.message}`);
    process.exit(1);
  }
}

// Run if executed directly
generateSitemap();
