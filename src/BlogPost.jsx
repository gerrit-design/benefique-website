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
    categories: ['Tax Planning', 'Entity Structure', 'S-Corporation']
  },
  'cash-flow-forecasting': {
    file: '/content/blogs/cash-flow-forecasting-101-REVISED.md',
    title: 'Cash Flow Forecasting 101: A Practical Guide for Business Owners',
    date: '2026-01-30',
    author: 'Gerrit Disbergen, EA',
    excerpt: 'Learn cash flow forecasting for your small business with this practical guide.',
    categories: ['Cash Flow', 'Financial Management', 'Planning']
  }
};

function BlogPost() {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const post = blogPosts[slug];

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
      }
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
      {/* Header */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <a href="/blog" className="text-benefique-orange hover:underline mb-4 inline-block">
            ← Back to Blog
          </a>
          
          <div className="inline-flex items-center gap-2 bg-benefique-orange/10 text-benefique-orange px-3 py-1 rounded-full text-sm font-medium mb-6">
            {post.categories[0]}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-benefique-navy mb-4 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-4 text-gray-600">
            <span>{post.author}</span>
            <span>•</span>
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</time>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg prose-benefique max-w-none
            prose-headings:text-benefique-navy 
            prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-benefique-orange prose-a:no-underline hover:prose-a:underline
            prose-strong:text-benefique-navy prose-strong:font-semibold
            prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
            prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
            prose-li:text-gray-700 prose-li:my-2
            prose-blockquote:border-l-4 prose-blockquote:border-benefique-orange 
            prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
            prose-code:text-benefique-orange prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-table:border-collapse prose-table:w-full
            prose-th:bg-benefique-navy prose-th:text-white prose-th:p-3 prose-th:text-left
            prose-td:border prose-td:border-gray-300 prose-td:p-3
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-br from-benefique-navy to-blue-900 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to talk about your situation?</h3>
            <p className="text-lg mb-6 text-blue-100">
              Let's discuss how these strategies apply to your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/apply"
                className="inline-flex items-center justify-center px-6 py-3 bg-benefique-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition"
              >
                Apply Now →
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition backdrop-blur-sm"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default BlogPost;
