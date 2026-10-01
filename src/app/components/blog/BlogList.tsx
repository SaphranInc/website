import React, { useEffect, useRef, useState } from "react";
import { Search, RefreshCw, X } from "lucide-react";
import { WPPost } from "../../../lib/wp-types";
import { getPosts, getPostBySlug, isWPConfigured, MOCK_BLOG_POSTS } from "../../../lib/wp";
import { BlogCard } from "./BlogCard";
import { FeaturedHeroPost } from "./FeaturedHeroPost";

// ─── Pinned Featured Post ────────────────────────────────────────────────────
// This slug is always loaded as the hero feature regardless of tags or date.
const PINNED_FEATURED_SLUG = "saphran-appoints-sean-lefever-as-ceo";

// ─── Client-Side Post Matcher ────────────────────────────────────────────────
// WordPress's native search only indexes title and body — it doesn't search
// author names, tags, or categories. This function runs an additional local
// pass against the full post cache so searches like "sean" or "DRAM" surface
// the right results even when WP's search returns nothing.
function matchesQuery(post: WPPost, q: string): boolean {
  if (!q.trim()) return true;
  const lower = q.toLowerCase();
  const fields = [
    post.title,
    post.excerpt ?? "",
    post.author?.node?.name ?? "",
    ...(post.categories?.nodes?.map((c) => c.name) ?? []),
    ...(post.tags?.nodes?.map((t) => t.name) ?? []),
  ];
  return fields.some((f) => f.toLowerCase().includes(lower));
}

interface BlogListProps {
  onSelectPost: (slug: string) => void;
}

export const BlogList: React.FC<BlogListProps> = ({ onSelectPost }) => {
  // All posts fetched from WP (unpaged, used as the local search index)
  const [allPosts, setAllPosts] = useState<WPPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<WPPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── Initial data fetch ─────────────────────────────────────────────────────
  const loadAllBlogData = async () => {
    setLoading(true);

    if (!isWPConfigured()) {
      const featured = MOCK_BLOG_POSTS[0];
      setFeaturedPost(featured);
      setAllPosts(MOCK_BLOG_POSTS);
      setLoading(false);
      return;
    }

    try {
      const [pinnedPost, generalResult] = await Promise.all([
        getPostBySlug(PINNED_FEATURED_SLUG).catch(() => null),
        // Fetch a large page to power the local search index
        getPosts({ first: 50 }),
      ]);

      const nodes = generalResult?.nodes || [];
      setFeaturedPost(pinnedPost ?? nodes[0] ?? null);
      setAllPosts(nodes);
    } catch (err: any) {
      console.warn("WPGraphQL fetch failed, using fallback data:", err);
      setFeaturedPost(MOCK_BLOG_POSTS[0]);
      setAllPosts(MOCK_BLOG_POSTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllBlogData();
  }, []);

  // ─── Debounced local search ─────────────────────────────────────────────────
  // Runs a local filter against the cached post list 300ms after the user
  // stops typing. This covers author names, tags, categories, and title —
  // everything WP's native search misses.
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    // Debounce is a no-op here since we filter locally; kept for future WP search calls
    debounceRef.current = setTimeout(() => {}, 300);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  // ─── Derived filtered lists ─────────────────────────────────────────────────
  const isSearching = searchQuery.trim().length > 0;

  // When searching, show ALL matching posts (including featured — they need to be findable).
  // When browsing normally, exclude pinned from grid (it's in the hero).
  const filteredPosts = allPosts.filter((p) => {
    const passesCategory =
      selectedCategory === "All" ||
      p.categories?.nodes?.some((c) => c.name === selectedCategory);
    const passesSearch = matchesQuery(p, searchQuery);

    if (isSearching) {
      // Include everything that matches including the pinned post
      return passesCategory && passesSearch;
    } else {
      // Normal browsing: exclude pinned hero from grid
      return passesCategory && p.slug !== PINNED_FEATURED_SLUG;
    }
  });

  // Dynamic category list from full post set
  const categories = [
    "All",
    ...Array.from(
      new Set(
        allPosts
          .flatMap((p) => p.categories?.nodes?.map((c) => c.name) ?? [])
          .filter(Boolean)
      )
    ),
  ];

  return (
    <div className="pt-[62px] pb-24 min-h-screen bg-white">
      {/* 1. Pinned Featured Hero — hidden during an active search */}
      {featuredPost && !isSearching && (
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
          <div className="flex items-center gap-6 flex-wrap">
            <h2 className="text-xl font-medium text-[#213343] font-sans">
              {isSearching ? (
                <>
                  Results for{" "}
                  <span className="text-[#58A972]">"{searchQuery}"</span>
                  <span className="ml-3 text-xs font-normal text-[#5A5F63]">
                    {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}
                  </span>
                </>
              ) : (
                "All Posts"
              )}
            </h2>

            {/* Category Filter Pills */}
            {!isSearching && categories.length > 2 && (
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search posts, authors, topics..."
              className="w-full md:w-72 bg-white border-b border-slate-300 rounded-none pl-1 pr-10 py-1.5 text-xs text-[#213343] placeholder-slate-400 focus:outline-none focus:border-[#58A972] transition-colors"
            />
            {isSearching && (
              <button
                onClick={clearSearch}
                className="absolute right-7 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#213343] cursor-pointer transition-colors"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. Post Grid */}
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
        ) : filteredPosts.length === 0 ? (
          <div className="bg-[#F6F4EF]/60 rounded-xl border border-slate-200/80 p-12 text-center max-w-md mx-auto">
            <p className="text-sm font-semibold text-[#213343] mb-1">
              No posts found
            </p>
            <p className="text-xs text-[#5A5F63] mb-6">
              {isSearching
                ? `No articles match "${searchQuery}". Try a different term.`
                : "Check back soon for new articles and case analyses."}
            </p>
            {(isSearching || selectedCategory !== "All") && (
              <button
                onClick={clearSearch}
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded bg-[#58A972] text-white hover:bg-[#43875a] transition-colors cursor-pointer"
              >
                <RefreshCw size={12} />
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
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
