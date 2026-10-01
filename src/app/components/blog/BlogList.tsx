import React, { useEffect, useState } from "react";
import { Search, RefreshCw } from "lucide-react";
import { WPPost } from "../../../lib/wp-types";
import { getPosts, getPostBySlug, isWPConfigured, MOCK_BLOG_POSTS } from "../../../lib/wp";

// ─── Pinned Featured Post ────────────────────────────────────────────────────
// This slug is always loaded as the hero feature regardless of tags or date.
const PINNED_FEATURED_SLUG = "saphran-appoints-sean-lefever-as-ceo";
import { BlogCard } from "./BlogCard";
import { FeaturedHeroPost } from "./FeaturedHeroPost";

interface BlogListProps {
  onSelectPost: (slug: string) => void;
}

export const BlogList: React.FC<BlogListProps> = ({ onSelectPost }) => {
  const [featuredPost, setFeaturedPost] = useState<WPPost | null>(null);
  const [gridPosts, setGridPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const loadAllBlogData = async () => {
    setLoading(true);

    if (!isWPConfigured()) {
      // In offline / mock mode:
      const featured =
        MOCK_BLOG_POSTS.find((p) =>
          p.tags?.nodes?.some((t) => t.slug.toLowerCase() === "featured")
        ) || MOCK_BLOG_POSTS[0];

      setFeaturedPost(featured);
      setGridPosts(MOCK_BLOG_POSTS.filter((p) => p.slug !== featured?.slug));
      setLoading(false);
      return;
    }

    try {
      // 1. Always load the pinned featured post by slug, alongside the general grid
      const [pinnedPost, generalResult] = await Promise.all([
        getPostBySlug(PINNED_FEATURED_SLUG).catch(() => null),
        getPosts({
          first: 16,
          search: searchQuery || undefined,
          categoryName: selectedCategory === "All" ? undefined : selectedCategory,
        }),
      ]);

      const allFetchedNodes = generalResult?.nodes || [];

      setFeaturedPost(pinnedPost ?? (allFetchedNodes[0] || null));

      // Exclude the pinned featured post from the grid so it never appears twice
      const pinnedSlug = pinnedPost?.slug ?? PINNED_FEATURED_SLUG;
      setGridPosts(allFetchedNodes.filter((p) => p.slug !== pinnedSlug));
    } catch (err: any) {
      console.warn("WPGraphQL fetch failed, using fallback data:", err);
      const featured = MOCK_BLOG_POSTS[0];
      setFeaturedPost(featured);
      setGridPosts(MOCK_BLOG_POSTS.filter((p) => p.slug !== featured.slug));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllBlogData();
  }, [selectedCategory]);

  // Extract categories dynamically
  const categories = [
    "All",
    ...Array.from(
      new Set(
        [...(featuredPost ? [featuredPost] : []), ...gridPosts]
          .flatMap((p) => p.categories?.nodes?.map((c) => c.name) || [])
          .filter(Boolean)
      )
    ),
  ];

  return (
    <div className="pt-[62px] pb-24 min-h-screen bg-white">
      {/* 1. Large Split-Pane Featured Post Section (matching screenshot 2) */}
      {featuredPost && (
        <section className="w-full">
          <FeaturedHeroPost
            post={featuredPost}
            onSelect={(slug) => onSelectPost(slug)}
          />
        </section>
      )}

      {/* 2. All Posts Controls & Filter Header */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-8 mt-12 mb-10">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between pb-6 border-b border-slate-200">
          <div className="flex items-center gap-6">
            <h2 className="text-xl font-medium text-[#213343] font-sans">
              All Posts
            </h2>

            {/* Category Filter Pills (if multiple categories exist) */}
            {categories.length > 2 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-[#213343] text-white"
                        : "bg-[#F6F4EF] text-[#5A5F63] hover:text-[#213343]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px] w-full md:w-auto">
            <Search
              size={15}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && loadAllBlogData()}
              placeholder="Search..."
              className="w-full md:w-60 bg-white border-b border-slate-300 rounded-none pl-1 pr-8 py-1.5 text-xs text-[#213343] placeholder-slate-400 focus:outline-none focus:border-[#58A972] transition-colors"
            />
          </div>
        </div>
      </section>

      {/* 3. Grid of Remaining Posts */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-4 animate-pulse"
              >
                <div className="aspect-[16/9] w-full bg-slate-100 rounded-lg" />
                <div className="h-4 bg-slate-100 rounded w-1/3" />
                <div className="h-6 bg-slate-100 rounded w-3/4" />
                <div className="h-12 bg-slate-100 rounded w-full" />
              </div>
            ))}
          </div>
        ) : gridPosts.length === 0 ? (
          <div className="bg-[#F6F4EF]/60 rounded-xl border border-slate-200/80 p-12 text-center max-w-md mx-auto">
            <p className="text-sm font-semibold text-[#213343] mb-1">
              No additional posts
            </p>
            <p className="text-xs text-[#5A5F63] mb-6">
              Check back soon for new articles and case analyses.
            </p>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  loadAllBlogData();
                }}
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded bg-[#58A972] text-white hover:bg-[#43875a] transition-colors cursor-pointer"
              >
                <RefreshCw size={12} />
                Reset search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map((post) => (
              <BlogCard
                key={post.id || post.slug}
                post={post}
                onSelect={(slug) => onSelectPost(slug)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
