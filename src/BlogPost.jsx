import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Blog post metadata and content mapping
const blogPosts = {
  's-corp-election': {
    file: '/content/blogs/s-corp-election-guide-V3.md',
    title: 'S-Corp Election: Is It Right for Your Florida Business?',
    date: '2026-01-30',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'S-Corp election can save Florida business owners $5K-$20K yearly in self-employment taxes—but only if your profit exceeds $100K.',
    categories: ['Tax Planning', 'Entity Structure', 'S-Corporation'],
    readTime: '15 min read',
    featuredImage: '/images/blog/s-corp-hero.svg'
  },
  'cash-flow-forecasting': {
    file: '/content/blogs/cash-flow-forecasting-101-REVISED.md',
    title: 'Cash Flow Forecasting 101: A Practical Guide for Business Owners',
    date: '2026-01-30',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'Learn cash flow forecasting for your small business with this practical guide.',
    categories: ['Cash Flow', 'Financial Management', 'Planning'],
    readTime: '12 min read',
    featuredImage: '/images/blog/cash-flow-hero.svg'
  }
};

// Custom components for enhanced markdown rendering
const MarkdownComponents = {
  // Enhanced H2 with anchor links
  h2: ({node, children, ...props}) => {
    const id = children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return (
      <h2 
        id={id}
        className="text-3xl font-bold text-benefique-navy mb-6 mt-16 pt-8 border-t-2 border-gray-200 scroll-mt-20"
        {...props}
      >
        {children}
      </h2>
    );
  },

  // Enhanced H3
  h3: ({node, children, ...props}) => {
    const id = children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return (
      <h3 
        id={id}
        className="text-2xl font-bold text-benefique-navy mb-4 mt-10 scroll-mt-20"
        {...props}
      >
        {children}
      </h3>
    );
  },

  // Enhanced paragraphs
  p: ({node, children, ...props}) => {
    return (
      <p className="text-gray-800 text-lg leading-relaxed mb-6" {...props}>
        {children}
      </p>
    );
  },

  // Enhanced blockquotes (for callout boxes)
  blockquote: ({node, children, ...props}) => {
    // Check if it's a special callout
    const text = node?.children?.[0]?.children?.[0]?.value || '';
    
    // Info box (starts with ℹ️ or "Note:")
    if (text.includes('ℹ️') || text.startsWith('Note:')) {
      return (
        <div className="my-8 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-2xl">ℹ️</span>
            <div className="flex-1 text-gray-700">
              {children}
            </div>
          </div>
        </div>
      );
    }
    
    // Warning box (starts with ⚠️ or "Warning:")
    if (text.includes('⚠️') || text.startsWith('Warning:')) {
      return (
        <div className="my-8 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div className="flex-1 text-gray-700">
              {children}
            </div>
          </div>
        </div>
      );
    }
    
    // Success/tip box (starts with ✅ or "Tip:")
    if (text.includes('✅') || text.startsWith('Tip:')) {
      return (
        <div className="my-8 bg-green-50 border-l-4 border-green-500 rounded-r-lg p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-2xl">✅</span>
            <div className="flex-1 text-gray-700">
              {children}
            </div>
          </div>
        </div>
      );
    }
    
    // Default: Pull quote
    return (
      <blockquote className="my-8 border-l-4 border-benefique-orange bg-orange-50 pl-6 py-4 italic text-xl text-gray-700 font-medium rounded-r-lg">
        {children}
      </blockquote>
    );
  },

  // Enhanced tables with proper spacing
  table: ({node, ...props}) => (
    <div className="my-8 overflow-x-auto rounded-lg shadow-md border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200" {...props} />
    </div>
  ),

  thead: ({node, ...props}) => (
    <thead className="bg-benefique-navy" {...props} />
  ),

  th: ({node, ...props}) => (
    <th 
      className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider"
      {...props}
    />
  ),

  tbody: ({node, ...props}) => (
    <tbody className="bg-white divide-y divide-gray-200" {...props} />
  ),

  td: ({node, ...props}) => (
    <td className="px-6 py-4 text-gray-800 text-base" {...props} />
  ),

  // Enhanced lists
  ul: ({node, ...props}) => (
    <ul className="my-6 space-y-3 pl-6" {...props} />
  ),

  ol: ({node, ...props}) => (
    <ol className="my-6 space-y-3 pl-6" {...props} />
  ),

  li: ({node, ...props}) => (
    <li className="text-gray-800 text-lg leading-relaxed" {...props} />
  ),

  // Enhanced links
  a: ({node, href, children, ...props}) => {
    const isExternal = href?.startsWith('http');
    return (
      <a
        href={href}
        className="text-benefique-orange font-medium hover:underline transition-all"
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
        {isExternal && <span className="ml-1">↗</span>}
      </a>
    );
  },

  // Enhanced code blocks
  code: ({node, inline, className, children, ...props}) => {
    if (inline) {
      return (
        <code 
          className="bg-gray-100 text-benefique-orange px-2 py-1 rounded text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code 
        className="block bg-gray-900 text-gray-100 p-6 rounded-lg my-6 overflow-x-auto text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    );
  },

  // Horizontal rules
  hr: ({node, ...props}) => (
    <hr className="my-12 border-t-2 border-gray-300" {...props} />
  ),

  // Strong/bold text
  strong: ({node, ...props}) => (
    <strong className="font-bold text-benefique-navy" {...props} />
  ),
};

// Social share buttons
const SocialShare = ({ title, url }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-4 py-6 border-y border-gray-200 my-8">
      <span className="text-gray-600 font-medium">Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-benefique-orange transition"
        aria-label="Share on Twitter"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-benefique-orange transition"
        aria-label="Share on LinkedIn"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </a>
      <a
        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
        className="text-gray-600 hover:text-benefique-orange transition"
        aria-label="Share via Email"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </a>
    </div>
  );
};

function BlogPost() {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const post = blogPosts[slug];
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    if (!post) {
      setError('Post not found');
      setLoading(false);
      return;
    }

    // Fetch the markdown file
    fetch(post.file)
      .then(response => {
        if (!response.ok) throw new Error('Failed to load post');
        return response.text();
      })
      .then(text => {
        // Remove frontmatter (everything between --- and ---)
        const withoutFrontmatter = text.replace(/^---[\s\S]*?---\n/, '');
        setContent(withoutFrontmatter);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading blog post:', err);
        setError('Failed to load post');
        setLoading(false);
      });
  }, [slug, post]);

  // Update page title and meta tags
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Benefique Tax & Accounting`;
      
      // Update meta description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', post.excerpt);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = post.excerpt;
        document.head.appendChild(meta);
      }

      // Add structured data for SEO
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        author: {
          '@type': 'Person',
          name: post.author
        },
        datePublished: post.date,
        description: post.excerpt,
        keywords: post.categories.join(', ')
      });
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Post</h1>
          <p className="text-gray-600">{error}</p>
          <a href="/blog" className="text-benefique-orange hover:underline mt-4 inline-block">
            ← Back to Blog
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs for SEO */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="text-sm text-gray-600">
            <a href="/" className="hover:text-benefique-orange transition">Home</a>
            <span className="mx-2">/</span>
            <a href="/blog" className="hover:text-benefique-orange transition">Blog</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Featured Image */}
      <div className="bg-benefique-navy">
        <div className="max-w-6xl mx-auto">
          <div className="aspect-[21/9] bg-gradient-to-br from-benefique-navy to-blue-900 flex items-center justify-center relative overflow-hidden">
            {/* Placeholder gradient background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-br from-benefique-orange to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Featured image title overlay */}
            <div className="relative z-10 text-center px-4 max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-benefique-orange/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
                {post.categories[0]}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                {post.title}
              </h1>
              <p className="text-xl text-blue-100 mb-6 drop-shadow">{post.excerpt}</p>
              <div className="flex items-center justify-center gap-4 text-blue-200 text-sm">
                <span>{post.author}</span>
                <span>•</span>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </time>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          {/* Article meta bar */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
            <a 
              href="/blog" 
              className="text-benefique-orange hover:underline font-medium transition"
            >
              ← Back to Blog
            </a>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{post.readTime}</span>
            </div>
          </div>

          {/* Main content */}
          <div className="prose prose-lg max-w-none blog-content">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={MarkdownComponents}
            >
              {content}
            </ReactMarkdown>
          </div>

          {/* Social share */}
          <SocialShare title={post.title} url={currentUrl} />

          {/* Author bio */}
          <div className="mt-12 bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-benefique-navy flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                GD
              </div>
              <div>
                <h3 className="text-xl font-bold text-benefique-navy mb-2">{post.author}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Gerrit is an Enrolled Agent and founder of Benefique Tax & Accounting, specializing in helping South Florida business owners with tax strategy, CFO services, and financial clarity.
                </p>
                <a 
                  href="/about" 
                  className="text-benefique-orange font-medium hover:underline transition"
                >
                  Learn more about Gerrit →
                </a>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-br from-benefique-navy to-blue-900 rounded-2xl p-8 md:p-12 text-white shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to talk about your situation?</h3>
            <p className="text-lg mb-6 text-blue-100">
              Let's discuss how these strategies apply to your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/apply"
                className="inline-flex items-center justify-center px-6 py-3 bg-benefique-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition shadow-lg hover:shadow-xl"
              >
                Apply Now →
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition backdrop-blur-sm border border-white/20"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Related categories */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">Topics:</h4>
            <div className="flex flex-wrap gap-2">
              {post.categories.map(category => (
                <span 
                  key={category}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default BlogPost;
