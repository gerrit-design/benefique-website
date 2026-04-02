#!/usr/bin/env node
// prerender.js — Generate per-route HTML files after vite build
// Gives Google correct <title>, <meta>, <link canonical>, OG tags, schema,
// and (for blog posts) pre-rendered article HTML.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { marked } from 'marked';
import { routes, SITE, DEFAULT_OG_IMAGE } from './route-metadata.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = join(ROOT, 'dist');

// ---------------------------------------------------------------------------
// 1. Read the built index.html to extract asset tags
// ---------------------------------------------------------------------------
const indexHtml = readFileSync(join(DIST, 'index.html'), 'utf-8');

// Extract all <link> stylesheet tags and <script> module tags from <head> and <body>
const cssLinkMatches = indexHtml.match(/<link[^>]+rel="stylesheet"[^>]*>/g) || [];
const moduleScriptMatches = indexHtml.match(/<script[^>]+type="module"[^>]*>[\s\S]*?<\/script>/g) || [];

// Also grab any preload/modulepreload links
const preloadMatches = indexHtml.match(/<link[^>]+rel="modulepreload"[^>]*>/g) || [];

const cssLinks = cssLinkMatches.join('\n    ');
const preloadLinks = preloadMatches.join('\n    ');
const moduleScripts = moduleScriptMatches
  // Filter out the Google Analytics inline scripts
  .filter(s => !s.includes('googletagmanager') && !s.includes('dataLayer'))
  .join('\n    ');

// Google Analytics snippet (preserve from original)
const gaSnippet = `<script async src="https://www.googletagmanager.com/gtag/js?id=G-9LNR3JCNWS"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-9LNR3JCNWS');
    </script>`;

// ---------------------------------------------------------------------------
// 2. Extract blog post slugs from BlogPost.jsx
// ---------------------------------------------------------------------------
const blogPostJsx = readFileSync(join(ROOT, 'src', 'BlogPost.jsx'), 'utf-8');
// Extract just the blogPosts object block (between `const blogPosts = {` and `};`)
const blogPostsBlockMatch = blogPostJsx.match(/const blogPosts\s*=\s*\{([\s\S]*?)\n\};/);
const blogPostsBlock = blogPostsBlockMatch ? blogPostsBlockMatch[1] : '';
// Match the top-level keys: 'slug-name': { (must contain a hyphen to avoid matching schema keys)
const slugRegex = /^\s+'([a-z0-9]+-[a-z0-9-]+)':\s*\{/gm;
const blogSlugs = [];
let m;
while ((m = slugRegex.exec(blogPostsBlock)) !== null) {
  blogSlugs.push(m[1]);
}

// Also extract the blogPosts metadata for each slug
function extractBlogMeta(slug) {
  // Find the block for this slug — match up to the next top-level slug key or end of blogPosts
  const blockRegex = new RegExp(
    `'${slug}':\\s*\\{([\\s\\S]*?)\\n  \\}`,
    'm'
  );
  const match = blogPostJsx.match(blockRegex);
  if (!match) return null;
  const block = match[1];

  const get = (key) => {
    const re = new RegExp(`${key}:\\s*'([^']*(?:\\\\.[^']*)*)'`);
    const m = block.match(re);
    return m ? m[1].replace(/\\'/g, "'") : '';
  };

  // Extract categories array: categories: ['Cat1', 'Cat2']
  const catMatch = block.match(/categories:\s*\[([^\]]*)\]/);
  const categories = catMatch
    ? catMatch[1].match(/'([^']*)'/g)?.map(s => s.replace(/'/g, '')) || []
    : [];

  // Extract faqs array from BlogPost.jsx (source of truth for FAQ schema)
  const faqs = [];
  const faqRegex = /\{\s*q:\s*'([^']*(?:\\.[^']*)*)'\s*,\s*a:\s*'([^']*(?:\\.[^']*)*)'\s*\}/g;
  let faqMatch;
  while ((faqMatch = faqRegex.exec(block)) !== null) {
    faqs.push({
      q: faqMatch[1].replace(/\\'/g, "'"),
      a: faqMatch[2].replace(/\\'/g, "'"),
    });
  }

  return {
    file: get('file'),
    title: get('title'),
    date: get('date'),
    author: get('author'),
    excerpt: get('excerpt'),
    readTime: get('readTime'),
    featuredImage: get('featuredImage'),
    categories: categories.join(', '),
    faqs,
  };
}

// ---------------------------------------------------------------------------
// 3. Parse FAQ from markdown content
// ---------------------------------------------------------------------------
function parseFAQ(rawMarkdown) {
  // Normalize line endings (Windows \r\n → \n)
  const markdown = rawMarkdown.replace(/\r\n/g, '\n');
  // Find the FAQ section: H2 containing "Frequently Asked" or "FAQ"
  const faqHeaderRegex = /^## .*(?:Frequently Asked|FAQ).*$/m;
  const headerMatch = markdown.match(faqHeaderRegex);
  if (!headerMatch) return [];

  const faqStart = markdown.indexOf(headerMatch[0]) + headerMatch[0].length;
  // FAQ section ends at the next non-FAQ H2 or end of file
  const rest = markdown.slice(faqStart);
  const nextH2 = rest.search(/\n## (?!.*(?:Frequently Asked|FAQ))/);
  const faqContent = nextH2 > -1 ? rest.slice(0, nextH2) : rest;

  const faqs = [];

  // Pattern 1: **Question?**\nAnswer (with or without blank line between)
  const boldQRegex = /\*\*(.+?\?)\*\*\s*\n\n?([\s\S]*?)(?=\n\n?\*\*[A-Z]|\n---|\n## |\n### |$)/g;
  let qm;
  while ((qm = boldQRegex.exec(faqContent)) !== null) {
    const question = qm[1].trim();
    const answer = qm[2].trim().replace(/\n/g, ' ');
    if (question && answer) {
      faqs.push({ q: question, a: answer });
    }
  }

  // Pattern 2: ### Question?\n\nAnswer (H3 format, used in some posts)
  if (faqs.length === 0) {
    const h3QRegex = /### (.+?\?)\s*\n\n([\s\S]*?)(?=\n### |\n## |\n---|\n\n---\n|$)/g;
    while ((qm = h3QRegex.exec(faqContent)) !== null) {
      const question = qm[1].trim();
      const answer = qm[2].trim().replace(/\n/g, ' ');
      if (question && answer) {
        faqs.push({ q: question, a: answer });
      }
    }
  }

  return faqs;
}

// ---------------------------------------------------------------------------
// 4. HTML generation helpers
// ---------------------------------------------------------------------------
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildSchemaScript(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
}

function buildFAQSchema(faqs) {
  if (!faqs || faqs.length === 0) return '';
  return buildSchemaScript({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  });
}

function buildArticleSchema(slug, meta) {
  return buildSchemaScript({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.excerpt,
    author: {
      '@type': 'Organization',
      name: 'Benefique Tax & Accounting',
      url: SITE,
    },
    datePublished: meta.date,
    dateModified: meta.date,
    publisher: {
      '@type': 'Organization',
      name: 'Benefique Tax & Accounting',
      logo: { '@type': 'ImageObject', url: `${SITE}/images/logo-full.jpg` },
    },
    image: `${SITE}${meta.featuredImage}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/blog/${slug}` },
    keywords: meta.categories || '',
  });
}

function generateHTML({ title, description, canonical, ogType, ogImage, schemas, rootContent }) {
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description);
  const safeCanonical = escapeHtml(canonical);
  const safeOgImage = escapeHtml(ogImage || DEFAULT_OG_IMAGE);

  const schemaBlocks = (schemas || []).map(s =>
    typeof s === 'string' ? s : buildSchemaScript(s)
  ).join('\n    ');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    ${gaSnippet}
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDesc}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${safeCanonical}">
    <meta property="og:type" content="${ogType || 'website'}">
    <meta property="og:url" content="${safeCanonical}">
    <meta property="og:title" content="${safeTitle}">
    <meta property="og:description" content="${safeDesc}">
    <meta property="og:image" content="${safeOgImage}">
    <meta property="og:locale" content="en_US">
    <meta property="og:site_name" content="Benefique Tax & Accounting">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${safeTitle}">
    <meta name="twitter:description" content="${safeDesc}">
    <meta name="twitter:image" content="${safeOgImage}">
    ${schemaBlocks}
    ${preloadLinks}
    ${cssLinks}
  </head>
  <body>
    <div id="root">${rootContent || ''}</div>
    ${moduleScripts}
  </body>
</html>`;
}

// ---------------------------------------------------------------------------
// 5. Generate non-blog route pages
// ---------------------------------------------------------------------------
let pageCount = 0;

for (const route of routes) {
  const canonical = `${SITE}${route.path}`;
  const schemas = [];
  if (route.schema) schemas.push(route.schema);
  if (route.faq) schemas.push(buildFAQSchema(route.faq));

  // Extract a clean h1 from the title (strip " | Benefique..." suffix)
  const h1Text = route.title.replace(/\s*[\|–—].*$/, '').trim();
  const rootContent = `<h1>${escapeHtml(h1Text)}</h1><p>${escapeHtml(route.description)}</p>`;

  const html = generateHTML({
    title: route.title,
    description: route.description,
    canonical,
    ogImage: route.ogImage || DEFAULT_OG_IMAGE,
    schemas,
    rootContent,
  });

  if (route.path === '/') {
    // Overwrite the homepage dist/index.html with proper SEO content
    writeFileSync(join(DIST, 'index.html'), html, 'utf-8');
  } else {
    const outDir = join(DIST, route.path);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), html, 'utf-8');
  }
  pageCount++;
}

console.log(`[prerender] ${pageCount} non-blog pages generated`);

// ---------------------------------------------------------------------------
// 6. Generate blog post pages
// ---------------------------------------------------------------------------
let blogCount = 0;
const errors = [];

for (const slug of blogSlugs) {
  const meta = extractBlogMeta(slug);
  if (!meta || !meta.file) {
    errors.push(`  SKIP ${slug}: could not extract metadata from BlogPost.jsx`);
    continue;
  }

  // Resolve the markdown file path. The file field looks like '/content/blogs/foo.md'
  const mdPath = join(ROOT, meta.file.replace(/^\//, ''));
  if (!existsSync(mdPath)) {
    errors.push(`  SKIP ${slug}: markdown file not found at ${mdPath}`);
    continue;
  }

  const raw = readFileSync(mdPath, 'utf-8');
  const { content: mdContent, data: frontmatter } = matter(raw);

  // Use frontmatter description/metaDescription if available, fallback to excerpt
  const description = frontmatter.metaDescription
    || frontmatter.meta_description
    || frontmatter.description
    || meta.excerpt;

  // Use FAQs from BlogPost.jsx (source of truth), fallback to markdown parsing
  const faqs = meta.faqs && meta.faqs.length > 0 ? meta.faqs : parseFAQ(raw);

  // Convert markdown to HTML for pre-rendering
  const articleHtml = marked.parse(mdContent);

  // Build schemas
  const schemas = [];
  schemas.push(buildArticleSchema(slug, meta));
  if (faqs.length > 0) {
    schemas.push(buildFAQSchema(faqs));
  }

  const ogImage = meta.featuredImage ? `${SITE}${meta.featuredImage}` : DEFAULT_OG_IMAGE;
  const pageTitle = `${meta.title} - Benefique Tax & Accounting`;

  const html = generateHTML({
    title: pageTitle,
    description,
    canonical: `${SITE}/blog/${slug}`,
    ogType: 'article',
    ogImage,
    schemas,
    rootContent: `<article>${articleHtml}</article>`,
  });

  const outDir = join(DIST, 'blog', slug);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html, 'utf-8');
  blogCount++;
}

console.log(`[prerender] ${blogCount} blog posts generated`);

if (errors.length > 0) {
  console.warn('[prerender] warnings:');
  errors.forEach(e => console.warn(e));
}

console.log(`[prerender] Total: ${pageCount + blogCount} HTML files written to dist/`);
