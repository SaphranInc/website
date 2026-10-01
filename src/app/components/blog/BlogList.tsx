import React, { useEffect, useState } from "react";
import { Search, Sparkles, RefreshCw, AlertCircle } from "lucide-react";
import { WPPost } from "../../../lib/wp-types";
import { getPosts, isWPConfigured, MOCK_BLOG_POSTS, WORDPRESS_API_URL } from "../../../lib/wp";
import { BlogCard } from "./BlogCard";

interface BlogListProps {
  onSelectPost: (slug: string) => void;
}

export const BlogList: React.FC<BlogListProps> = ({ onSelectPost }) => {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMock, setUsingMock] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const loadPosts = async () => {
    setLoading(true);
    setError(null);

    // If WordPress API is not configured yet or has placeholder URL, use graceful fallback preview
    if (!isWPConfigured()) {
      setPosts(MOCK_BLOG_POSTS);
      setUsingMock(true);
      setLoading(false);
      return;
    }

    try {
      const data = await getPosts({
        first: 12,
        search: searchQuery || undefined,
        categoryName: selectedCategory === "All" ? undefined : selectedCategory,
      });
      setPosts(data.nodes || []);
      setUsingMock(false);
    } catch (err: any) {
      console.warn("WPGraphQL fetch failed, using fallback demonstration data:", err);
      setError(err?.message || "Failed to load articles from WordPress");
      // Still show fallback data so UI remains fully testable & functional
      setPosts(MOCK_BLOG_POSTS);
      setUsingMock(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [selectedCategory]);

  // Extract categories dynamically
  const categories = ["All", ...Array.from(new Set(
    (usingMock ? MOCK_BLOG_POSTS : posts)
      .flatMap((p) => p.categories?.nodes?.map((c) => c.name) || [])
      .filter(Boolean)
  ))];

  // Filter posts locally when searching in mock mode
  const displayedPosts = usingMock && searchQuery
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts;

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#F6F4EF]/50">
      {/* Hero Header */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-8 mb-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#58A972]/10 border border-[#58A972]/20 mb-4">
            <Sparkles size={14} className="text-[#58A972]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#213343]">
              Saphran Insights &amp; Perspectives
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-[#213343] tracking-tight mb-4">
            Costing, Quoting &amp; Margin Engineering
          </h1>
          <p className="text-base sm:text-lg text-[#5A5F63] leading-relaxed">
            Market analysis, predictive cost models, and executive strategies for engineer-to-order manufacturers navigating macroeconomic volatility.
          </p>
        </div>

        {/* WP Connection Status Banner */}
        {usingMock && (
          <div className="mt-8 p-4 rounded-xl bg-amber-50/90 border border-amber-200/80 flex items-start gap-3">
            <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <span className="font-semibold">Headless WordPress Endpoint Pending:</span> Currently displaying local demo articles. Once you update <code className="bg-amber-100/80 px-1 py-0.5 rounded text-amber-950 font-mono text-[11px]">VITE_WORDPRESS_API_URL</code> with your live WP Engine endpoint, this page will automatically stream your published posts via WPGraphQL.
              {error && (
                <div className="mt-1.5 text-amber-800 text-[11px] font-mono">
                  GraphQL query notice: {error}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Search & Filter Controls */}
        <div className="mt-10 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pb-6 border-b border-slate-200">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#213343] text-white shadow-sm"
                    : "bg-white text-[#5A5F63] hover:text-[#213343] border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative min-w-[260px]">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && loadPosts()}
              placeholder="Search articles..."
              className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-xs text-[#213343] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#58A972] focus:border-transparent transition-all"
            />
          </div>
        </div>
      </section>

      {/* Grid of Articles */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
        ) : displayedPosts.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-md mx-auto">
            <p className="text-sm font-semibold text-[#213343] mb-1">No articles found</p>
            <p className="text-xs text-[#5A5F63] mb-6">
              Try adjusting your search terms or selecting a different category.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                loadPosts();
              }}
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded bg-[#58A972] text-white hover:bg-[#43875a] transition-colors"
            >
              <RefreshCw size={12} />
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedPosts.map((post) => (
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
