import React, { useEffect, useState } from "react";
import { ArrowLeft, Calendar, User, Clock, Share2, Check, Tag } from "lucide-react";
import { WPPost } from "../../../lib/wp-types";
import { getPostBySlug, isWPConfigured, MOCK_BLOG_POSTS } from "../../../lib/wp";
import { BlogContentRenderer } from "./BlogContentRenderer";

interface BlogPostTemplateProps {
  slug: string;
  onBack: () => void;
  onSelectCategory?: (category: string) => void;
}

export const BlogPostTemplate: React.FC<BlogPostTemplateProps> = ({
  slug,
  onBack,
}) => {
  const [post, setPost] = useState<WPPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const loadPost = async () => {
      setLoading(true);
      setError(null);

      // If WP GraphQL is not configured yet or has placeholder URL, find in mock data
      if (!isWPConfigured()) {
        const found = MOCK_BLOG_POSTS.find((p) => p.slug === slug);
        if (isMounted) {
          setPost(found || MOCK_BLOG_POSTS[0]);
          setLoading(false);
        }
        return;
      }

      try {
        const data = await getPostBySlug(slug);
        if (isMounted) {
          if (data) {
            setPost(data);
          } else {
            // Check fallback if not in remote WP
            const fallback = MOCK_BLOG_POSTS.find((p) => p.slug === slug);
            setPost(fallback || null);
          }
        }
      } catch (err: any) {
        console.warn("Failed fetching post from WPGraphQL, falling back:", err);
        if (isMounted) {
          setError(err?.message || "Failed to load post");
          const fallback = MOCK_BLOG_POSTS.find((p) => p.slug === slug);
          setPost(fallback || MOCK_BLOG_POSTS[0]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadPost();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-24 max-w-[840px] mx-auto px-6 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-24 mb-8" />
        <div className="h-10 bg-slate-200 rounded w-3/4 mb-4" />
        <div className="h-4 bg-slate-200 rounded w-1/2 mb-12" />
        <div className="aspect-[16/9] bg-slate-200 rounded-xl mb-12" />
        <div className="space-y-4">
          <div className="h-4 bg-slate-200 rounded w-full" />
          <div className="h-4 bg-slate-200 rounded w-5/6" />
          <div className="h-4 bg-slate-200 rounded w-4/6" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-36 pb-24 max-w-lg mx-auto px-6 text-center">
        <h2 className="text-2xl font-bold text-[#213343] mb-3">Article Not Found</h2>
        <p className="text-sm text-[#5A5F63] mb-6">
          The requested article may have been moved or unpublished.
        </p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#58A972] text-white text-xs font-semibold hover:bg-[#43875a] transition-all cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to all articles
        </button>
      </div>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const textContent = (post.content || "").replace(/<[^>]+>/g, "");
  const wordCount = textContent.trim().split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="pt-28 pb-24 min-h-screen bg-white">
      {/* Top Breadcrumb & Navigation */}
      <div className="max-w-[840px] mx-auto px-6 mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-medium text-[#5A5F63] hover:text-[#213343] transition-colors cursor-pointer group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to all articles
        </button>
      </div>

      {/* Article Header */}
      <header className="max-w-[840px] mx-auto px-6 mb-10">
        {/* Categories */}
        {post.categories?.nodes && post.categories.nodes.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.nodes.map((cat) => (
              <span
                key={cat.id || cat.slug}
                className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-[#58A972]/10 text-[#58A972] border border-[#58A972]/20"
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}

        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#213343] tracking-tight leading-[1.2] mb-6"
          dangerouslySetInnerHTML={{ __html: post.title }}
        />

        {/* Author / Metadata bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-100 text-xs text-[#5A5F63]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              {post.author?.node?.avatar?.url ? (
                <img
                  src={post.author.node.avatar.url}
                  alt={post.author.node.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#F6F4EF] flex items-center justify-center text-[#213343]">
                  <User size={14} />
                </div>
              )}
              <span className="font-semibold text-[#213343]">
                {post.author?.node?.name || "Saphran Insights"}
              </span>
            </div>

            <span>•</span>

            <span className="inline-flex items-center gap-1.5">
              <Calendar size={13} className="text-[#58A972]" />
              {formattedDate}
            </span>

            <span>•</span>

            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} className="text-[#58A972]" />
              {readTime} min read
            </span>
          </div>

          {/* Share button */}
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 text-slate-600 hover:text-[#213343] hover:border-slate-300 transition-colors text-xs font-medium cursor-pointer"
          >
            {copied ? <Check size={13} className="text-[#58A972]" /> : <Share2 size={13} />}
            {copied ? "Link Copied" : "Share"}
          </button>
        </div>
      </header>

      {/* Featured Image */}
      {post.featuredImage?.node?.sourceUrl && (
        <div className="max-w-[1000px] mx-auto px-6 mb-12">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100">
            <img
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || post.title}
              className="w-full h-auto max-h-[520px] object-cover"
            />
          </div>
        </div>
      )}

      {/* Gutenberg Post Content */}
      <div className="max-w-[840px] mx-auto px-6">
        <BlogContentRenderer content={post.content || post.excerpt || ""} />

        {/* Tags */}
        {post.tags?.nodes && post.tags.nodes.length > 0 && (
          <div className="mt-12 pt-6 border-t border-slate-100 flex items-center gap-2 flex-wrap">
            <Tag size={14} className="text-[#58A972]" />
            <span className="text-xs font-medium text-[#5A5F63] mr-1">Tags:</span>
            {post.tags.nodes.map((t) => (
              <span
                key={t.id || t.slug}
                className="text-xs bg-[#F6F4EF] text-[#213343] px-2.5 py-1 rounded-md"
              >
                #{t.name}
              </span>
            ))}
          </div>
        )}

        {/* Bottom CTA Box */}
        <div
          className="mt-14 p-8 rounded-2xl text-white relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #213343 0%, #15222E 100%)",
          }}
        >
          <div className="relative z-10 max-w-lg">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#58A972]">
              Elevate Your Margin Engineering
            </span>
            <h3 className="text-xl sm:text-2xl font-bold mt-2 mb-3">
              Ready to eliminate cost variance from your ETO quotations?
            </h3>
            <p className="text-xs text-white/70 leading-relaxed mb-6">
              Connect with our industrial costing specialists to see how QuoteBase™ and SaphranAI™ integrate with your existing ERP and CAD/BOM workflows.
            </p>
            <button
              onClick={() => {
                window.location.hash = "contact";
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[5px] bg-[#58A972] text-white text-xs font-semibold hover:bg-[#43875a] transition-all cursor-pointer"
            >
              Book a Discovery Call
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
