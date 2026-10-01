import React from "react";
import { Calendar, User, ArrowRight } from "lucide-react";
import { WPPost } from "../../../lib/wp-types";

interface BlogCardProps {
  post: WPPost;
  onSelect: (slug: string) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, onSelect }) => {
  // Format readable publication date
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Calculate approximate reading time (avg 200 wpm)
  const textContent = (post.content || post.excerpt || "").replace(/<[^>]+>/g, "");
  const wordCount = textContent.trim().split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const primaryCategory = post.categories?.nodes?.[0]?.name;
  const authorName = post.author?.node?.name || "Saphran Insights";

  return (
    <article
      onClick={() => onSelect(post.slug)}
      className="group flex flex-col bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex-1"
      style={{
        boxShadow: "0 4px 20px rgba(33, 51, 67, 0.04)",
      }}
    >
      {/* Featured Image */}
      {post.featuredImage?.node?.sourceUrl ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F6F4EF]">
          <img
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {primaryCategory && (
            <span
              className="absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-[4px] shadow-sm backdrop-blur-md"
              style={{
                backgroundColor: "rgba(33, 51, 67, 0.88)",
                color: "#ffffff",
              }}
            >
              {primaryCategory}
            </span>
          )}
        </div>
      ) : (
        <div
          className="relative aspect-[16/9] w-full flex items-center justify-center p-6"
          style={{
            background: "linear-gradient(135deg, #213343 0%, #15222E 100%)",
          }}
        >
          <div className="text-center">
            {primaryCategory && (
              <span className="inline-block text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-[#58A972]/20 text-[#58A972] border border-[#58A972]/30 mb-2">
                {primaryCategory}
              </span>
            )}
            <p className="text-white/40 text-xs font-mono">Saphran Perspective</p>
          </div>
        </div>
      )}

      {/* Content Body */}
      <div className="p-6 flex flex-col flex-1">
        {/* Meta row */}
        <div className="flex items-center gap-4 text-xs text-[#5A5F63] mb-3">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={13} className="text-[#58A972]" />
            {formattedDate}
          </span>
          <span>•</span>
          <span>{readTime} min read</span>
        </div>

        {/* Title */}
        <h3
          className="text-lg font-semibold text-[#213343] group-hover:text-[#58A972] transition-colors line-clamp-2 mb-3 leading-snug"
          dangerouslySetInnerHTML={{ __html: post.title }}
        />

        {/* Excerpt */}
        {post.excerpt && (
          <div
            className="text-xs text-[#5A5F63] line-clamp-3 mb-5 leading-relaxed flex-1"
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />
        )}

        {/* Footer info: Author & CTA */}
        <div className="pt-4 mt-auto border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {post.author?.node?.avatar?.url ? (
              <img
                src={post.author.node.avatar.url}
                alt={authorName}
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-[#F6F4EF] flex items-center justify-center text-[#213343]">
                <User size={12} />
              </div>
            )}
            <span className="text-xs font-medium text-[#213343]">{authorName}</span>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#58A972] group-hover:translate-x-1 transition-transform">
            Read article
            <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </article>
  );
};
