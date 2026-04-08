# CLAUDE.md - Project Rules for Benefique Website

## Project Context
- **Framework:** React + Vite + Tailwind CSS
- **Deployment:** Vercel project `benefique-website-382f` (auto-deploy on push to main)
- **Vercel Project ID:** `prj_jEfadKsZUAeYMzTPECTOZaXg9O6z`
- **Domain:** www.benefique.com, benefique.com, app.benefique.com
- **GitHub Repo:** `gerrit-design/benefique-website`
- **Purpose:** Marketing site + blog for Benefique Tax & Accounting
- **IMPORTANT:** This is the ONLY Vercel project. See `VERCEL-PROJECTS.md` for details.

## Coding Standards

### React Components
- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use descriptive component and prop names

### Styling
- Tailwind CSS for all styling
- Maintain consistent spacing (use Tailwind's spacing scale)
- Mobile-first responsive design
- Match existing color scheme (brand blues, professional grays)

### File Organization
- Components in `src/components/`
- Pages in `src/` (App.jsx, etc.)
- Blog content in `content/blogs/` AND `public/content/blogs/` (must exist in both!)
- Static assets in `public/`

### Blog Posts
**CRITICAL:** Every blog post requires ALL FOUR:
1. Markdown file in `/content/blogs/[slug].md`
2. **COPY to `/public/content/blogs/[slug].md`** (Vercel needs this!)
3. Entry in `src/BlogPost.jsx` in the `blogPosts` object
4. **Entry in `src/App.jsx` in the `Blog()` function `posts` array** (controls /blog listing page!)

Blog post entry format:
```javascript
'slug-here': {
  file: '/content/blogs/slug-here.md',
  title: 'Post Title',
  date: 'YYYY-MM-DD',
  author: 'Benefique Tax & Accounting',
  excerpt: 'Description here (ESCAPE APOSTROPHES: they\'re not they're)',
  categories: ['Category One', 'Category Two'],
  readTime: 'X min read',
  featuredImage: '/images/blog/filename.jpg'
}
```

## Redirect Safety (CRITICAL — Read This)
- **NEVER add a 301 redirect where the source matches a live blog slug in BlogPost.jsx** — this silently kills the post. The build validator (`validate-blog-posts.cjs`) will catch this and fail the build, but check manually too.
- **After ANY git rebase or merge**, verify `vercel.json` redirects survived intact. A rebase in April 2026 silently dropped all 301 redirects.
- **When replacing a post**, add a 301 from the OLD slug to the NEW slug — never the reverse.
- **`/go/` redirects** (302s for LinkedIn UTM tracking) are safe — they use 302 not 301 and point to `/blog/[slug]?utm_...` params.
- The build validator checks: (1) every BlogPost.jsx slug has a markdown file, (2) no 301 redirect shadows a live slug.

## What NOT to Change
- **Never modify:** `vite.config.js` without explicit approval
- **Never modify:** Package versions without testing
- **Never delete:** Existing blog posts without approval
- **Never push:** Without running `npm run build` locally first

## Pre-Deploy Checklist (MANDATORY)
Before ANY deploy:
1. ✅ Run `npm run build` - must pass
2. ✅ Test on mobile (Chrome DevTools responsive mode)
3. ✅ Test on desktop
4. ✅ Verify all links work
5. ✅ Check images load
6. ✅ Git commit + push
7. ✅ Wait for Vercel deploy (~2 min)
8. ✅ Test live site on mobile again

## Common Pitfalls to Avoid
- Forgetting to copy blog markdown to `/public/content/blogs/`
- Forgetting to add entry to `App.jsx` Blog() `posts` array (post URL works but won't appear on /blog)
- Unescaped apostrophes in BlogPost.jsx excerpts AND App.jsx excerpts
- Testing only on desktop (mobile catches 80% of issues)
- Deploying without running build locally first
- Creating duplicate Vercel projects (consolidated to ONE on March 6, 2026)
- **Adding a 301 redirect that shadows a live blog post** (build validator catches this — see Redirect Safety above)
- **Not verifying vercel.json after git rebase/merge** (redirects can silently disappear)
- **Using `question`/`answer` keys in FAQ arrays** — must use `q`/`a` for prerender.js FAQ schema generation to work

## Token Usage Guidelines
- Use Haiku 4.5 for: Small text edits, simple component updates
- Use Sonnet 4.5 for: New features, complex components, debugging
- Use Opus 4.5 for: Major architecture changes (rare)

## Communication
- Always confirm changes before deploying
- Report any build errors immediately
- Document any workarounds in this file
