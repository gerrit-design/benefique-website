import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

/**
 * RelatedPosts Component
 * 
 * Intelligent recommendation engine for blog posts based on:
 * - Category overlap (primary signal)
 * - Keywords from title/excerpt (secondary signal)
 * - Read time similarity (tertiary signal)
 * 
 * Scoring algorithm:
 * - Category match: +30 points per category match
 * - Keyword match: +5 points per matching word
 * - Content length similarity: +10 points if within 5 minutes read time
 * - Exclude current post: filtered out
 * 
 * Returns top 3 related posts ranked by relevance score
 */
function RelatedPosts({ currentSlug, currentPost, allPosts, maxRelated = 3 }) {
  const relatedPostsList = useMemo(() => {
    if (!currentPost || !allPosts) return [];

    // Extract keywords from title and excerpt for matching
    const extractKeywords = (text) => {
      if (!text) return [];
      // Remove common stop words and split
      const stopWords = new Set([
        'the', 'a', 'an', 'and', 'or', 'in', 'for', 'of', 'to', 'is', 'with',
        'your', 'how', 'why', 'what', 'when', 'where', 'real', 'time', 'day',
        'business', 'you', 'guide', 'case', 'study', 'learn', 'everything'
      ]);
      
      return text
        .toLowerCase()
        .split(/[\s\-,.:;!?"'()]+/)
        .filter(word => word.length > 3 && !stopWords.has(word));
    };

    const currentKeywords = new Set([
      ...extractKeywords(currentPost.title),
      ...extractKeywords(currentPost.excerpt)
    ]);

    // Score each post
    const scored = Object.entries(allPosts)
      .filter(([slug]) => slug !== currentSlug) // Exclude current post
      .map(([slug, post]) => {
        let score = 0;

        // Category matching (primary signal - highest weight)
        const categoryOverlap = (post.categories || []).filter(cat =>
          (currentPost.categories || []).includes(cat)
        );
        score += categoryOverlap.length * 30;

        // Keyword matching (secondary signal)
        const postKeywords = new Set([
          ...extractKeywords(post.title),
          ...extractKeywords(post.excerpt)
        ]);
        const keywordMatches = [...currentKeywords].filter(kw => postKeywords.has(kw)).length;
        score += keywordMatches * 5;

        // Read time similarity (tertiary signal - for cohesive reading experience)
        const currentReadMin = parseInt(currentPost.readTime || '10');
        const postReadMin = parseInt(post.readTime || '10');
        if (Math.abs(currentReadMin - postReadMin) <= 5) {
          score += 10;
        }

        return { slug, post, score };
      })
      .filter(item => item.score > 0) // Only include posts with at least 1 match
      .sort((a, b) => b.score - a.score)
      .slice(0, maxRelated);

    return scored;
  }, [currentSlug, currentPost, allPosts, maxRelated]);

  if (relatedPostsList.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-12 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-benefique-navy mb-8">
        Related Articles
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPostsList.map(({ slug, post, score }) => (
          <Link
            key={slug}
            to={`/blog/${slug}`}
            className="group h-full bg-white rounded-lg border border-gray-200 hover:border-benefique-orange hover:shadow-md transition-all duration-300 overflow-hidden hover:bg-orange-50/30"
          >
            {/* Featured Image */}
            {post.featuredImage && (
              <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Content */}
            <div className="p-5 flex flex-col h-full">
              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-3">
                {(post.categories || []).slice(0, 2).map(cat => (
                  <span
                    key={cat}
                    className="inline-block px-2.5 py-0.5 bg-benefique-orange/10 text-benefique-orange text-xs font-semibold rounded"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="font-bold text-base text-gray-900 mb-2 group-hover:text-benefique-orange transition-colors line-clamp-3">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                {post.excerpt}
              </p>

              {/* Footer: Date and Read Time */}
              <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
                <span>{post.readTime || '8 min read'}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Relevance Note (debug only - remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <details className="mt-6 p-4 bg-gray-50 rounded text-xs text-gray-600">
          <summary className="cursor-pointer font-semibold">Debug: Relevance Scores</summary>
          <ul className="mt-3 space-y-1">
            {relatedPostsList.map(({ slug, score }) => (
              <li key={slug}>{slug}: {score} points</li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
}

export default RelatedPosts;
