import { WPPost, WPPostsResponse, WPSinglePostResponse } from "./wp-types";

// Reads the endpoint from Vite env variables
export const WORDPRESS_API_URL =
  import.meta.env.VITE_WORDPRESS_API_URL || "https://[YOUR_WP_DOMAIN_HERE]/graphql";

export function isWPConfigured(): boolean {
  return (
    Boolean(WORDPRESS_API_URL) &&
    !WORDPRESS_API_URL.includes("[YOUR_WP_DOMAIN_HERE]") &&
    WORDPRESS_API_URL.startsWith("http")
  );
}

/**
 * Execute a GraphQL query against headless WordPress
 */
export async function fetchWPGraphQL<T = any>(
  query: string,
  variables: Record<string, any> = {}
): Promise<T> {
  if (!isWPConfigured()) {
    throw new Error(
      `WordPress API URL is not configured. Please set VITE_WORDPRESS_API_URL in your .env file.`
    );
  }

  const response = await fetch(WORDPRESS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`WordPress GraphQL network error (${response.status}): ${errorText}`);
  }

  const json = await response.json();
  if (json.errors && json.errors.length > 0) {
    throw new Error(json.errors[0]?.message || "WordPress GraphQL query failed");
  }

  return json.data;
}

// ─── GraphQL Queries ─────────────────────────────────────────────────────────

export const GET_POSTS_QUERY = `
  query GetPosts($first: Int = 10, $after: String, $categoryName: String, $search: String) {
    posts(
      first: $first
      after: $after
      where: {
        categoryName: $categoryName
        search: $search
        orderby: { field: DATE, order: DESC }
        status: PUBLISH
      }
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        id
        databaseId
        title
        slug
        date
        excerpt
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
        tags {
          nodes {
            id
            name
            slug
          }
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG_QUERY = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      databaseId
      title
      slug
      date
      content
      excerpt
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      categories {
        nodes {
          id
          name
          slug
        }
      }
      tags {
        nodes {
          id
          name
          slug
        }
      }
    }
  }
`;

// ─── Client Fetch API ─────────────────────────────────────────────────────────

export async function getPosts(options: {
  first?: number;
  after?: string | null;
  categoryName?: string;
  search?: string;
} = {}): Promise<WPPostsResponse["posts"]> {
  const data = await fetchWPGraphQL<WPPostsResponse>(GET_POSTS_QUERY, {
    first: options.first ?? 9,
    after: options.after || null,
    categoryName: options.categoryName || undefined,
    search: options.search || undefined,
  });

  return data.posts;
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const data = await fetchWPGraphQL<WPSinglePostResponse>(GET_POST_BY_SLUG_QUERY, {
    slug,
  });
  return data.post;
}

// ─── Fallback Sample Posts for Development Preview ────────────────────────────
// Displayed gracefully when VITE_WORDPRESS_API_URL is pending real credentials

export const MOCK_BLOG_POSTS: WPPost[] = [
  {
    id: "mock-1",
    databaseId: 101,
    title: "Navigating Cost Volatility: Why ETO Manufacturers Need Predictive Pricing",
    slug: "navigating-cost-volatility-eto-manufacturers",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    excerpt:
      "<p>Engineer-to-order manufacturing faces unprecedented variance in materials, specialized labor, and logistical surcharges. Here is how modern margin governance solves it.</p>",
    content: `
      <p class="lead">Engineer-to-order (ETO) manufacturers operate in one of the most intellectually demanding and commercially volatile environments in industry. Unlike high-volume repetitive production, every single quote involves distinct engineering parameters, custom tooling specifications, and fluctuating raw material spot prices.</p>
      
      <h2>The Flaw of Static Margin Estimates</h2>
      <p>Historically, commercial teams relied on standard cost markups and historical BOM extrapolation. When macroeconomic headwinds or raw material escalations occur, quotes issued 90 days earlier erode downstream gross margins before fabrication even initiates.</p>

      <blockquote>
        "Predictive margin intelligence bridges the critical divide between engineering fidelity and executive financial targets."
      </blockquote>

      <h2>How ScenarioPro™ and QuoteBase™ Transform Estimating</h2>
      <p>By connecting historical engineering BOM costs directly with live index forecasts, engineering and commercial teams can evaluate multiple project variations in seconds rather than weeks:</p>
      <ul>
        <li><strong>Continuous Index Ingestion:</strong> Dynamic tracking of commodities (steel, nickel, energy indices).</li>
        <li><strong>Rule-Based Escalation Formulas:</strong> Automated contractual pass-through calculations for multi-year ETO contracts.</li>
        <li><strong>Executive Visibility:</strong> Real-time risk scoring on enterprise bids before sign-off.</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Manufacturers who modernize their quoting infrastructure don't just protect margins—they win quotes faster and command higher trust from global OEMs.</p>
    `,
    author: {
      node: {
        name: "Kenneth Peterson",
      },
    },
    categories: {
      nodes: [
        { id: "c1", name: "Market Intelligence", slug: "market-intelligence" },
        { id: "c2", name: "Commercial Strategy", slug: "commercial-strategy" },
      ],
    },
    tags: {
      nodes: [
        { id: "t1", name: "Predictive Costing", slug: "predictive-costing" },
        { id: "t2", name: "ETO Manufacturing", slug: "eto-manufacturing" },
      ],
    },
  },
  {
    id: "mock-2",
    databaseId: 102,
    title: "The Shift from Legacy Spreadsheets to Centralized Commercial Intelligence",
    slug: "shift-from-legacy-spreadsheets-centralized-intelligence",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    excerpt:
      "<p>Spreadsheet decay poses existential risks to complex industrial quoting. Discover how unified commercial data architectures eradicate version silos.</p>",
    content: `
      <p class="lead">Across thousands of manufacturing operations, hundreds of mission-critical quoting formulas sit stored within detached Excel spreadsheets maintained by individual lead estimators.</p>
      
      <h2>The Hidden Cost of Disconnected Costing</h2>
      <p>When an estimator retires or transfers departments, institutional engineering knowledge is often trapped in cell macros and undocumented formula overrides. Furthermore, updating corporate overhead multipliers requires manually editing dozens of disparate workbooks.</p>

      <h2>A Unified Commercial Single-Source of Truth</h2>
      <p>Modern platforms like Saphran unify quoting parameters, active part geometries, and supplier quote revisions into a standardized, audited data model accessible across estimating, finance, and executive leadership.</p>
    `,
    author: {
      node: {
        name: "Sean O'Reilly",
      },
    },
    categories: {
      nodes: [{ id: "c3", name: "Digital Transformation", slug: "digital-transformation" }],
    },
    tags: {
      nodes: [{ id: "t3", name: "Automation", slug: "automation" }],
    },
  },
  {
    id: "mock-3",
    databaseId: 103,
    title: "AI in Heavy Industry: Practical Predictive Modeling for Long-Cycle Bids",
    slug: "ai-in-heavy-industry-predictive-modeling",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 18).toISOString(),
    excerpt:
      "<p>Demystifying AI for custom equipment producers: how machine learning models spot cost outliers and highlight win probabilities.</p>",
    content: `
      <p class="lead">Artificial intelligence is moving beyond generic conversational interfaces into high-dimensional regression and classification algorithms built specifically for industrial supply chains.</p>
      
      <h2>Anomaly Detection in Complex BOMs</h2>
      <p>With thousands of components in a single heavy equipment quotation, human review can easily miss an understated subcontracting cost or an anomalous labor allocation. SaphranAI flags statistical deviations against millions of historical assembly operations, providing estimator guardrails in real time.</p>
    `,
    author: {
      node: {
        name: "Ami Patel",
      },
    },
    categories: {
      nodes: [{ id: "c4", name: "AI & Innovation", slug: "ai-innovation" }],
    },
    tags: {
      nodes: [{ id: "t4", name: "SaphranAI", slug: "saphran-ai" }],
    },
  },
];
