export interface WPAuthor {
  node: {
    name: string;
    avatar?: {
      url: string;
    };
  };
}

export interface WPCategory {
  node: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface WPTag {
  node: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface WPFeaturedImage {
  node: {
    sourceUrl: string;
    altText?: string;
    mediaDetails?: {
      width?: number;
      height?: number;
    };
  };
}

export interface WPPost {
  id: string;
  databaseId?: number;
  title: string;
  slug: string;
  date: string;
  excerpt?: string;
  content?: string;
  readingTime?: number;
  author?: WPAuthor;
  featuredImage?: WPFeaturedImage;
  categories?: {
    nodes: Array<{
      id: string;
      name: string;
      slug: string;
    }>;
  };
  tags?: {
    nodes: Array<{
      id: string;
      name: string;
      slug: string;
    }>;
  };
}

export interface WPPageInfo {
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
}

export interface WPPostsResponse {
  posts: {
    pageInfo: WPPageInfo;
    nodes: WPPost[];
  };
}

export interface WPSinglePostResponse {
  post: WPPost | null;
}
