import React from "react";
import { WPPost } from "../../../lib/wp-types";

interface FeaturedHeroPostProps {
  post: WPPost;
  onSelect: (slug: string) => void;
}

export const FeaturedHeroPost: React.FC<FeaturedHeroPostProps> = ({ post, onSelect }) => {
  // Use post featured image if provided, or high-res architecture hero image matching reference
  const heroImage =
    post.featuredImage?.node?.sourceUrl ||
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80";

  return (
    <div className="w-full bg-[#58A972] py-14 sm:py-18 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1240px] mx-auto">
        {/* Split pane container with overlap */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center">
          
          {/* Left: Hero Image */}
          <div
            onClick={() => onSelect(post.slug)}
            className="w-full lg:w-[62%] h-[320px] sm:h-[400px] lg:h-[480px] overflow-hidden cursor-pointer shadow-2xl relative z-10"
            style={{
              boxShadow: "0 20px 45px rgba(21, 34, 46, 0.25)",
            }}
          >
            <img
              src={heroImage}
              alt={post.featuredImage?.node?.altText || post.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Dark green accent band at the top right of the image matching screenshot */}
            <div className="hidden lg:block absolute top-0 right-0 w-36 h-20 bg-[#16382B]/90" />
          </div>

          {/* Right: Overlapping White Title Card */}
          <div
            onClick={() => onSelect(post.slug)}
            className="w-full lg:w-[48%] bg-white p-8 sm:p-12 lg:p-14 shadow-2xl mt-[-40px] sm:mt-[-60px] lg:mt-0 lg:ml-[-10%] relative z-20 cursor-pointer transition-transform duration-300 hover:-translate-y-1"
            style={{
              boxShadow: "0 24px 50px rgba(0, 0, 0, 0.16)",
            }}
          >
            <h2
              className="text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#213343] leading-[1.18] tracking-tight mb-8"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 300,
              }}
              dangerouslySetInnerHTML={{ __html: post.title }}
            />

            <div className="pt-2">
              <span className="text-sm font-semibold text-[#213343] underline underline-offset-4 hover:text-[#58A972] transition-colors">
                Read More
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
