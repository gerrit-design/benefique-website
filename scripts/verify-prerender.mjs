// Asserts the prerendered HTML says the same things the React page says.
import { readFileSync, readdirSync, existsSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = (p) => join(ROOT, p);
import { packProse, packFlatten } from '../src/data/radiology-pack-content.js';
import { packHeadline } from '../src/data/radiology-pack.js';
import {
  radiologyHero,
  radiologyIntroText,
  radiologyPackPromo,
  radiologyProof,
} from '../src/data/radiology.js';
import { industries } from '../src/data/industries.js';
import { locations } from '../src/data/locations.js';
import { intelligenceIntro, intelligenceMethods } from '../src/data/intelligence.js';
import { REVENUE_BAND, REVENUE_FLOOR, whoWeServe } from '../src/data/positioning.js';

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
   .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&mdash;/g, '—');

function rootText(path) {
  const html = readFileSync(dist(path), 'utf-8');
  const m = html.match(/<div id="root">([\s\S]*?)(?=<script)/);
  const frag = m ? m[1] : '';
  return { frag, text: decode(frag.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim() };
}

let failures = 0;
const check = (name, ok, detail = '') => {
  if (!ok) { failures++; console.log(`FAIL  ${name}${detail ? ' :: ' + detail : ''}`); }
  else console.log(`ok    ${name}`);
};

const pack = rootText('dist/radiology/intelligence-pack/index.html');
const rad = rootText('dist/radiology/index.html');
const norm = (s) => decode(s).replace(/\s+/g, ' ').trim();

// H1 parity — the page H1 and the prerendered H1 come from one constant
const packH1 = (pack.frag.match(/<h1>(.*?)<\/h1>/) || [])[1];
check('pack H1 == packHeadline', norm(packH1) === norm(packHeadline), `${packH1} vs ${packHeadline}`);

// Every sentence the component renders must be present in the prerender
const mustAppear = [
  ['lede', packProse.lede],
  ['disclaimer', packFlatten(packProse.disclaimer)],
  ['bookHeading', packProse.bookHeading],
  ['ex1Heading', packProse.ex1Heading],
  ['ex1Intro', packProse.ex1Intro],
  ['ex1Callout', packFlatten(packProse.ex1Callout)],
  ['ex2Heading', packProse.ex2Heading],
  ['ex2Intro', packProse.ex2Intro],
  ['ex2Callout', packFlatten(packProse.ex2Callout)],
  ['libraryHeading', packProse.libraryHeading],
  ['libraryIntro', packProse.libraryIntro],
  ['faqHeading', packProse.faqHeading],
  ['ctaHeading', packProse.ctaHeading],
  ['ctaBody', packProse.ctaBody],
];
for (const [name, sentence] of mustAppear) {
  check(`pack prerender contains ${name}`, pack.text.includes(norm(sentence)), norm(sentence).slice(0, 60));
}

// /radiology: hero + promo copy must match the shared source
check('radiology contains hero lede', rad.text.includes(norm(radiologyHero.lede)));
check('radiology contains hero intro', rad.text.includes(norm(radiologyIntroText)));
check('radiology contains promo heading', rad.text.includes(norm(radiologyPackPromo.heading)));
check('radiology contains promo body', rad.text.includes(norm(radiologyPackPromo.body)));
check('radiology contains promo link text', rad.text.includes(norm(radiologyPackPromo.linkText)));

// The meta description must NOT be duplicated as body copy on a route with a body
const packHtml = readFileSync(dist('dist/radiology/intelligence-pack/index.html'), 'utf-8');
const metaDesc = (packHtml.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
check('meta description not repeated in body', !pack.text.includes(norm(metaDesc).slice(0, 80)));

// Leak scan across the whole dist output for the NEW pages only
const banned = ['Vizamyl', 'Neuraceq', 'Amyvid', 'POSLUMA', 'Cigna', 'Aetna', 'Humana', 'UnitedHealth', 'FL Blue', 'Longhorn', 'Insite', 'Eber'];
for (const page of ['dist/radiology/index.html', 'dist/radiology/intelligence-pack/index.html']) {
  const h = readFileSync(dist(page), 'utf-8');
  const hits = banned.filter((b) => h.toLowerCase().includes(b.toLowerCase()));
  check(`no banned terms in ${page}`, hits.length === 0, hits.join(', '));
}

// --- safeHref: test the ACTUAL shipped function, not a copy of it ------------
// Extract the function source straight out of scripts/prerender.js and evaluate
// it, so this cannot pass against a stale reimplementation.
{
  const src = readFileSync(join(ROOT, 'scripts', 'prerender.js'), 'utf-8');
  const start = src.indexOf('function safeHref(href) {');
  const endAt = src.indexOf(String.fromCharCode(10) + '}', start);
  check('safeHref located in prerender.js', start !== -1 && endAt !== -1);
  const fnSource = src.slice(start, endAt + 2);
  // eslint-disable-next-line no-new-func
  const safeHref = new Function(fnSource + '; return safeHref;')();

  const BS = String.fromCharCode(92);
  const cases = [
    ['/radiology', '/radiology'],
    ['#anchor', '#anchor'],
    ['https://example.com', 'https://example.com'],
    ['mailto:hello@benefique.com', 'mailto:hello@benefique.com'],
    ['javascript:alert(1)', '#'],
    ['JaVaScript:alert(1)', '#'],
    ['   javascript:alert(1)', '#'],
    ['data:text/html,x', '#'],
    ['//evil.example.com', '#'],
    ['/' + BS + 'evil.example.com', '#'],
    ['vbscript:msgbox(1)', '#'],
    ['', '#'],
  ];
  for (const [input, expected] of cases) {
    const actual = safeHref(input);
    check(
      'safeHref(' + JSON.stringify(input) + ')',
      actual === expected,
      'got ' + JSON.stringify(actual) + ', want ' + JSON.stringify(expected)
    );
  }
}

// --- sitemap must list exactly the pages that were actually prerendered -------
// A false negative in the registry filter would silently DELIST a live post,
// which is worse than the soft-404 bug the filter fixes. Compare both sets.
{
  const sitemap = readFileSync(join(ROOT, 'public', 'sitemap.xml'), 'utf-8');
  const sitemapBlogSlugs = new Set(
    [...sitemap.matchAll(/<loc>[^<]*\/blog\/([^<\/]+)<\/loc>/g)].map((m) => m[1])
  );
  const distBlogDir = join(ROOT, 'dist', 'blog');
  const builtSlugs = new Set(
    existsSync(distBlogDir)
      ? readdirSync(distBlogDir, { withFileTypes: true })
          .filter((d) => d.isDirectory() && existsSync(join(distBlogDir, d.name, 'index.html')))
          .map((d) => d.name)
      : []
  );
  const listedNotBuilt = [...sitemapBlogSlugs].filter((s) => !builtSlugs.has(s));
  const builtNotListed = [...builtSlugs].filter((s) => !sitemapBlogSlugs.has(s));
  check('no sitemap URL without a prerendered page (soft 404)', listedNotBuilt.length === 0, listedNotBuilt.join(', '));
  check('no prerendered post missing from sitemap (delisted)', builtNotListed.length === 0, builtNotListed.join(', '));
  console.log(`      blog pages: ${builtSlugs.size} built, ${sitemapBlogSlugs.size} listed`);
}


// --- the H1 a crawler sees must equal the H1 a visitor sees ------------------
// prerender.js derives an H1 from route.title unless the route sets `h1`, which
// silently gave crawlers a different headline on every industry and location
// page. Assert the exact string the React page builds.
{
  const h1Of = (page) => {
    const html = readFileSync(dist(page), 'utf-8');
    const m = html.match(/<h1>([\s\S]*?)<\/h1>/);
    return m ? decode(m[1]).replace(/\s+/g, ' ').trim() : null;
  };
  for (const [key, path] of Object.entries({
    radiology: 'dist/industries/radiology/index.html',
    dental: 'dist/industries/dental/index.html',
    veterinary: 'dist/industries/veterinary/index.html',
    'marine-services': 'dist/industries/marine-services/index.html',
  })) {
    const want = `${industries[key].industry} Accounting & Fractional CFO Services`;
    check(`H1 matches page on /industries/${key}`, h1Of(path) === want, `got "${h1Of(path)}", want "${want}"`);
  }
  for (const [key, path] of Object.entries({
    davie: 'dist/davie-accounting/index.html',
    plantation: 'dist/plantation-accounting/index.html',
    weston: 'dist/weston-accounting/index.html',
    miramar: 'dist/miramar-accounting/index.html',
    'fort-lauderdale': 'dist/fort-lauderdale-accounting/index.html',
    aventura: 'dist/aventura-accounting/index.html',
    hollywood: 'dist/hollywood-accounting/index.html',
  })) {
    const want = `${locations[key].city} Accounting & Fractional CFO Services`;
    check(`H1 matches page on /${key}-accounting`, h1Of(path) === want, `got "${h1Of(path)}", want "${want}"`);
  }
}

// --- sections the React pages render must also reach a crawler --------------
{
  const packBadge = readFileSync(dist('dist/radiology/intelligence-pack/index.html'), 'utf-8');
  const packText = decode(packBadge.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
  for (const label of ['Book a Strategic Radiology Review', 'Back to Radiology CFO Intelligence']) {
    check(`pack prerender carries CTA "${label}"`, packText.includes(label));
  }
  check('pack prerender carries the illustrative-data badge', pack.text.includes(norm(packProse.badge)));

  for (const stat of radiologyProof.stats) {
    check(`radiology prerender carries proof stat ${stat.value}`, rad.text.includes(norm(stat.value)) && rad.text.includes(norm(stat.label)));
  }
  check('radiology prerender carries proof caption', rad.text.includes(norm(radiologyProof.caption)));

  const intel = rootText('dist/intelligence/index.html');
  check('intelligence prerender carries the page intro', intel.text.includes(norm(intelligenceIntro.body)));
  for (const m of intelligenceMethods) {
    check(`intelligence prerender carries "${m.name}"`, intel.text.includes(norm(m.name)));
  }
}

// --- a registry key that neither generator can see is a silent delisting -----
// Parse BlogPost.jsx loosely, then assert the strict parse both generators use
// did not miss anything that has a markdown file behind it.
{
  const registry = readFileSync(join(ROOT, 'src', 'BlogPost.jsx'), 'utf-8');
  const block = registry.match(/const blogPosts\s*=\s*\{([\s\S]*?)\n\};/);
  check('blogPosts registry block located', Boolean(block));
  if (block) {
    const loose = new Set(
      [...block[1].matchAll(/^\s+["']?([A-Za-z0-9_-]+)["']?\s*:\s*\{/gm)].map((m) => m[1])
    );
    const built = new Set(
      readdirSync(join(ROOT, 'dist', 'blog'), { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
    );
    const contentDir = join(ROOT, 'content', 'blogs');
    const missed = [...loose].filter(
      (slug) => !built.has(slug) && existsSync(join(contentDir, `${slug}.md`))
    );
    check(
      'no registry entry with a markdown file was missed by the strict parser',
      missed.length === 0,
      missed.join(', ')
    );
  }
}


// --- the retired $500K floor must not survive anywhere --------------------
// This text lived on ten surfaces and had already drifted three ways
// ("$500K-$10M+", "$500K to $40M", "$500K+"). One source now, and a check that
// the old floor cannot reappear in a positioning statement.
{
  const positioningFiles = [
    join(ROOT, 'src', 'App.jsx'),
    join(ROOT, 'scripts', 'route-metadata.js'),
    join(ROOT, 'public', 'llms.txt'),
  ];
  // Blog titles, excerpts and tax examples legitimately mention $500K.
  const allowed = /blog|excerpt|title:|slug:|concierge|S-Corp|net income|salary|prescriptive|retired on/i;
  for (const file of positioningFiles) {
    const offenders = readFileSync(file, 'utf-8')
      .split('\n')
      .map((line, n) => [n + 1, line])
      .filter(([, line]) => /\$500K|\$500,000/.test(line) && !allowed.test(line));
    check(
      `no retired $500K positioning left in ${file.split(/[\/]/).pop()}`,
      offenders.length === 0,
      offenders.map(([n]) => `line ${n}`).join(', ')
    );
  }

  // The homepage must state the new band, and state the closed book.
  const home = rootText('dist/index.html');
  check('homepage meta states the new revenue band', home.text.includes(norm(REVENUE_BAND)), REVENUE_BAND);
  const about = rootText('dist/about/index.html');
  check('/about carries the Who We Serve heading', about.text.includes(norm(whoWeServe.heading)));
  check('/about states the new revenue band', about.text.includes(norm(REVENUE_BAND)), REVENUE_BAND);
  check('/about says the established book is closed', about.text.includes(norm(whoWeServe.legacy)));
  const cfo = rootText('dist/services/fractional-cfo/index.html');
  check('/services/fractional-cfo states the new revenue band', cfo.text.includes(norm(REVENUE_BAND)), REVENUE_BAND);
  check('REVENUE_FLOOR is inside REVENUE_BAND', REVENUE_BAND.startsWith(REVENUE_FLOOR));
  check('legacy book is described as closed', /closed to new generalist engagements/i.test(whoWeServe.legacy));
}


console.log(`\nwords: /radiology ${rad.text.split(' ').length}, pack ${pack.text.split(' ').length}`);
console.log(failures === 0 ? '\nALL CHECKS PASSED' : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
