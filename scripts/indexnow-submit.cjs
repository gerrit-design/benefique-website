#!/usr/bin/env node
/**
 * IndexNow URL Submission Script
 * Submits URLs to Bing, Yandex, and other IndexNow-compatible engines.
 *
 * Usage:
 *   node scripts/indexnow-submit.js                  # Submit all published blog URLs
 *   node scripts/indexnow-submit.js slug1 slug2      # Submit specific blog slugs
 *   node scripts/indexnow-submit.js --all            # Submit all site URLs (blogs + static pages)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const HOST = 'www.benefique.com';
const KEY = '18a351e44f7122004b50f257b2b63e19';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// Static pages
const STATIC_PAGES = [
  '/', '/services', '/about', '/contact', '/blog', '/demo', '/testimonials',
  '/davie-fl', '/broward-county', '/south-florida',
  '/healthcare', '/radiology', '/dental', '/veterinary',
  '/service-businesses', '/professional-services',
  '/fractional-cfo', '/tax-planning', '/bookkeeping', '/payroll'
];

function getBlogSlugs() {
  const blogsDir = path.join(__dirname, '..', 'content', 'blogs');
  return fs.readdirSync(blogsDir)
    .filter(f => f.endsWith('.md') && !f.endsWith('.docx'))
    .map(f => f.replace('.md', ''));
}

function submitToIndexNow(urls) {
  const payload = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls
  });

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.indexnow.org',
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, body: data });
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function main() {
  const args = process.argv.slice(2);
  let urls = [];

  if (args.includes('--all')) {
    // All pages: static + blogs
    urls = [
      ...STATIC_PAGES.map(p => `https://${HOST}${p}`),
      ...getBlogSlugs().map(s => `https://${HOST}/blog/${s}`)
    ];
  } else if (args.length > 0) {
    // Specific slugs
    urls = args.map(s => `https://${HOST}/blog/${s}`);
  } else {
    // All blog posts
    urls = getBlogSlugs().map(s => `https://${HOST}/blog/${s}`);
  }

  console.log(`Submitting ${urls.length} URLs to IndexNow...`);
  urls.forEach(u => console.log(`  ${u}`));

  try {
    const result = await submitToIndexNow(urls);
    // 200 = OK, 202 = Accepted (key validated later)
    if (result.statusCode === 200 || result.statusCode === 202) {
      console.log(`\nSuccess (HTTP ${result.statusCode}): ${urls.length} URLs submitted to Bing, Yandex, and IndexNow partners.`);
    } else {
      console.error(`\nFailed (HTTP ${result.statusCode}): ${result.body}`);
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();
