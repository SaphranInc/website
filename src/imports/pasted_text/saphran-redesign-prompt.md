# Saphran Website Redesign — Figma Make Prompt
**Pages covered:** Home, Capabilities (feature page), Contact
**Inspiration:** salesforce.com/sales (home), salesforce.com/sales/cpq (feature page), salesforce.com/sales/demos contact flow
**Constraint:** Must use Saphran's existing brand colors and logo — but applied with intention, not slapped on as decoration.

---

## 0. How to use this document

Paste the sections below into Figma Make in this order: **Part A (brand direction) → Part B (design system) → Part C (page-by-page build spec) → Part D (copy blocks)**. Figma Make responds better to one coherent brief than to five small prompts, so you can also paste the whole thing in one shot — the structure below is written to work either way. Everywhere you see `[HEX]` or `[confirm]`, that's a value only Nina/Saphran can supply (exact brand hex codes, logo file, real customer logos) — drop those in before you generate.

---

## PART A — Brand & Design Rationale (read this before building)

### The actual problem with saphran.com today
It's not that the brand colors are wrong. It's that the site is built on generic Wix template patterns — centered stacked text, default drop shadows, stock-feeling icon sets, no distinct type personality, no signature visual motif. That template-ness is what reads as "not a real software company," not the color palette. Campfire looks more credible than Saphran right now not because of superior branding, but because Campfire uses a confident editorial grid, real product screenshots, and a consistent visual system — the classic HubSpot-template B2B SaaS look. Salesforce, several rungs up, adds motion, a distinct color system with named gradients, and a component library so consistent it reads as an operating system, not a "website."

**The fix is not "make it look like Salesforce" or "make it look like Campfire." It's giving Saphran its own signature visual system, at Salesforce's level of craft, built from Saphran's own brand DNA.**

### Why the first mockup read as "vibe coded" — and how to actually fix that
A first pass at this (dark-navy hero, blue accent CTA, floating dashboard card with a "LIVE" pill, monospace stat deltas) was well-crafted on its own terms, but that exact combination — near-black hero + saturated blue button + floating product-screenshot card — is currently the single most repeated default that AI design/coding tools (Figma Make, v0, Lovable, Linear-style templates) reach for. It's a well-executed version of *someone else's* default, not Saphran's own. Two fixes:

1. **The accent color was wrong.** Saphran's actual brand color is not blue — it's a deep navy (`#213343`) paired with a specific green (`#58A972`, tinted lighter at `#95CBA7`). Blue-accented dark dashboards are everywhere right now; a green-accented one immediately reads as a distinct, deliberate brand rather than a generated template, simply because it's rarer in the current wave of AI-built sites.
2. **The brandmark was left as a static logo instead of becoming a motif.** Saphran's mark is a rotating pinwheel/swirl — a genuinely distinctive shape no template or competitor has. Used only as a small logo in the header, it does nothing. Used as a recurring device (see below), it's what makes the site unmistakably Saphran even with the logo cropped out of a screenshot.

### Brand color strategy — use the actual Saphran palette, applied with intention
Per Saphran's brand guidelines, the real palette is: **navy `#213343`**, **green `#58A972`**, **light green `#95CBA7`**, plus black and white. That's it — no invented "sapphire blue," no invented copper accent. The design system below builds entirely from these five values plus one recommended (not official) warm-neutral addition for body backgrounds.

Concretely:
- **`#213343` is the "ink" surface** — header, footer, and one full-bleed dark section per page. It's already dark enough to do the job Stripe/Linear/Vercel-tier "ink" surfaces do; it doesn't need to be darkened further into generic near-black. Keeping it at the brand's actual navy value (rather than defaulting to a near-black `#0B0E14`) is itself a differentiator — most "premium dark SaaS" sites go nearly black, and Saphran's slightly warmer, bluer navy is recognizably its own.
- **`#58A972` is the primary accent** — CTAs, active states, key data highlights, hover states, the one color that shows up in every section. This is the color that was wrongly rendered as blue in the first pass.
- **`#95CBA7` is the secondary/tint accent** — light backgrounds behind small tags, secondary data-viz series, subtle section dividers, hover-state fills. Never the primary CTA color; it's the quieter sibling of `#58A972`.
- **Add one warm neutral (recommended, not in the official brand book)** for body backgrounds — a warm off-white so the greens and navy have somewhere to breathe, instead of stark white. Flagged as `[HEX — recommend, confirm with Nina]` in the token table below since it's a proposed addition, not an existing brand color.
- **Do not introduce a fourth brand hue** (no copper, no amber, no invented accent). The brandbook's discipline — navy, one green, one green tint, black, white — is worth preserving; most B2B software competitors run two-color palettes (brand color + gray), and Saphran already has a slightly richer, disciplined three-tone system that shouldn't be diluted with colors that aren't actually Saphran's.
- **Alternate ink / bone / white across sections** rather than tinting everything green or everything navy — same "no monotonous single-color wash" principle as before, just built from the real palette now.

### The swirl mark as a motif, not a sticker
The pinwheel/swirl brandmark (five curved blades rotating around a center point) is Saphran's most distinctive, underused asset — used correctly, it's what makes this site read as "obviously Saphran" rather than "a nice template with a Saphran logo in the corner." Concrete, non-decorative uses:
- **Hero background device:** an extremely low-opacity (5-8%), oversized single swirl — not the literal dense repeating tile from the brand deck — positioned off-canvas-right in the dark hero section. Same "one big signature shape" move Stripe/Linear make with gradient meshes, except built from an asset that's actually Saphran's own.
- **Loading/transition state:** the swirl as an actual loading spinner — it's already a five-blade rotational shape, so it animates as a spinner with zero redesign — for any interactive dashboard demo or form-submission state.
- **Section-break device:** a small single-color swirl icon used sparingly as a divider or bullet marker in the FAQ/module-definition lists, instead of generic dot or chevron bullets.
- **Favicon and OG image**, obviously — confirm the current favicon is actually built from the swirl mark rather than a cropped wordmark.
- **What to avoid:** do not use the dense all-over repeating pattern (the brand deck's "Brand Pattern" page) as a literal tiled background behind text or forms — at that density it reads busy and dated, closer to a mid-2010s pattern-background trend than a precision-software aesthetic. If used at all, keep it to one very large, very faint single or double swirl — never a repeating tile, never behind readable text.

### Typography — keep Poppins, but stop using it the way every other Poppins site uses it
Saphran's brand guide specifies **Poppins** for headings. Poppins is genuinely overused across low-effort SaaS/startup sites (it's a top-3 default in Wix, Squarespace, and most no-code builders), which is part of why the current site feels templated — but the fix isn't abandoning the brand's actual established typeface, it's using it with more restraint and confidence than the default treatment:
- **Push weight and scale further than typical Poppins usage.** Most Poppins sites sit at Medium/SemiBold around 40-48px. Use Poppins **Bold/ExtraBold at 72-96px** for hero headlines, with tighter tracking (-1 to -2%) than default — Poppins' rounded geometry reads distinctive and confident at that scale and weight; it reads generic at the smaller, lighter weights most templates default to.
- **Counterbalance Poppins' natural roundness** with sharp, thin structural elements elsewhere on the page — hairline 1px rules, minimal-radius cards, monospaced data — so the softness of the wordmark doesn't extend into a soft, bubbly page overall. This contrast (round headline face + sharp structural chrome) is what will make Poppins feel like a deliberate brand choice rather than a template default.
- **Pair with a genuinely neutral body face** — Inter or IBM Plex Sans — at 16-18px, 1.5-1.6 line height, so paragraphs stay highly legible at enterprise-buyer scanning speed while Poppins is reserved for headlines, eyebrows, and the logo lockup only. Never set body paragraphs in Poppins; that's the single most common "budget template" tell.
- Set headline type **large, tight-leading, and asymmetric** — not center-stacked. Center-aligned hero text over a bland background is the single most "template" visual pattern; left-aligned, oversized, slightly overlapping-with-imagery headline treatments are what separate Salesforce/Stripe-tier sites from template sites, regardless of which typeface is doing the work.
- Use **tabular/monospaced numerals for stats and dashboard-style data** (the $8.2M, +10%, $46M+ figures Saphran already has) — a small detail that reads as "real data product" rather than "marketing site with numbers pasted in," and one more sharp counterpoint to Poppins' roundness.

### Imagery direction — the biggest giveaway of "AI-generated" or template feel
- **No stock photography of people in hard hats pointing at tablets, no generic abstract 3D blob renders, no obviously-AI-generated illustrations** (watch for: melting hands, nonsensical UI screenshots, overly smooth "corporate metaverse" renders). Saphran's current site already has one AI-generated dashboard image (the SaphranAI section) — replace with an actual product screenshot or a custom, restrained data-visualization graphic.
- Favor **real (or realistic mocked) product UI screenshots** in clean device frames — this is exactly why the Salesforce and Campfire pages feel credible: you're looking at the actual software, not an illustration of a concept of the software.
- Where illustration is unavoidable (no screenshots available yet), commission or design **flat, geometric, line-based diagrams** in the brand palette — cost flow diagrams, margin waterfall charts, a simplified BOM/quote pipeline — rather than photographic-style AI renders. This also directly supports the ETO-manufacturing subject matter (precision, systems, engineering) far better than lifestyle photography does.
- Manufacturing-relevant photography, if used at all, should be **real facility/floor photography**, desaturated and graded toward navy/green to match the palette — not generic factory stock, and not blue-graded (that was the earlier mistake).

### The overall design language to brief Figma Make on
"Precision instrument for margin decisions" — think less "friendly SaaS dashboard," more **cockpit/control-room clarity**: high information density handled with restraint, hairline rules, generous negative space around dense data, confident dark mode moments, monospaced data typography, sharp corners or very minimal radius (not the bubbly 24px-radius-everything look), subtle grid lines evoking engineering drawings/blueprints. This single metaphor — engineering precision, not generic "friendly cloud SaaS" — is what will make Saphran look distinct from both Salesforce (consumer-friendly cloud abstraction) and Campfire (generic HubSpot template), while living inside Saphran's actual navy-and-green identity rather than a generic blue.

---

## PART B — Design System (paste this into Figma Make as the system spec)

```
DESIGN SYSTEM: Saphran

COLOR TOKENS (source: Saphran brand guidelines — do not substitute or invent new hues)
- ink (primary dark surface — header, footer, one full-bleed section per page): #213343
- ink-deep (optional slightly darker variant for layering cards/panels ON TOP of ink, e.g. the margin-waterfall dashboard card): #1A2836 (derived from ink, ~15% darker — not a new brand color, just a shade of it)
- brand-green (primary accent — CTAs, active states, key data highlights, hover states): #58A972
- brand-green-tint (secondary accent — tag backgrounds, secondary data-viz series, dividers, subtle hover fills): #95CBA7
- bone (primary light background, NOT pure white): [HEX — recommend warm off-white e.g. #F6F4EF — this is a proposed addition, confirm with Nina since it's not in the official brand book]
- paper (secondary light surface / cards on bone): #FFFFFF
- graphite (body text on light): #1A1A1A (near-black, per brand book)
- slate (secondary text / captions — derived tint, not a new brand color): a ~60%-opacity tint of graphite, e.g. #5A5F63
- hairline/border: 8-10% opacity of graphite on light, 10% opacity of white on ink
- Data-viz-within-screenshots exception: product screenshots (e.g. a margin waterfall chart) can use additional functional colors (amber for a cost-variance bar, red for a negative delta) since that's data communication, not brand chrome — but the marketing site's own UI (buttons, tags, section accents, nav) stays within navy / green / green-tint / neutral only.

TYPOGRAPHY
- Display/Headline face: Poppins (Saphran's established brand typeface) — Bold/ExtraBold, tight tracking (-1 to -2%), large scale (72-96px desktop H1). Push weight and size further than typical Poppins usage elsewhere on the web so it reads as a deliberate brand choice, not a default template font.
- Body face: Inter or IBM Plex Sans, weight 400-500, 16-18px base, 1.5-1.6 line height. Never set body paragraphs in Poppins.
- Data/stat face: a tabular-figure monospace or monospaced-numeral variant (e.g. IBM Plex Mono for numerals only) — used exclusively for stats, percentages, dollar figures, dashboard mockups. This sharp/structural counterpoint to Poppins' roundness is intentional.
- Eyebrow/label style: uppercase, 12-13px, letter-spacing +8-10%, slate or brand-green color, used above section headlines (small label -> big headline -> supporting copy)

LAYOUT & SPACING
- 12-column grid, 1280px max content width, generous 96-160px vertical rhythm between major sections
- Headlines left-aligned and often overlapping/breaking the grid slightly with imagery (asymmetric hero layouts, not center-stacked)
- Border-radius: minimal — 4-8px on cards/buttons, NOT the bubbly 20px+ rounded look. This reinforces the "precision instrument" metaphor.
- Hairline 1px borders instead of heavy drop shadows for card separation; use shadow only for true elevation (dropdowns, modals)
- One full-bleed "ink" dark section per major page (hero on home, one mid-page section on Capabilities, none needed on Contact) to give the palette gravity

COMPONENTS TO DEFINE
- Primary button: brand-green fill, white text, 6px radius, subtle scale/brighten on hover
- Secondary button: ghost/outline, ink or graphite border, fills with brand-green-tint on hover
- Eyebrow + headline + subhead block (reusable hero/section-intro pattern)
- Stat callout tile: large monospaced figure + small slate label underneath, used in groups of 3-5 (mirrors Saphran's existing $46M+/10%/etc. stats and Campfire's 2-5x ROI / 20-40% pattern — but typeset with the new system instead of generic icon+number cards)
- Feature row: alternating text-left/image-right and image-left/text-right blocks with product screenshot in a minimal device frame (direct structural borrow from the Salesforce CPQ page — see Part C)
- Logo bar: grayscale/monochrome logo treatment on bone background, color-on-hover (standard enterprise trust-bar pattern)
- Quote/testimonial card: large pull-quote typography, attribution in slate, no stock headshot required if none exist — a colored initial badge works fine
- FAQ accordion: for GEO/LLM optimization (see Part D) — plain-text question as visible header, answer expands, marked up so it's crawlable as FAQ schema; use a small swirl-mark glyph instead of a generic chevron/plus icon
- Swirl motif: a single large, low-opacity (5-8%) swirl-linework graphic for the dark hero background, and the same shape as an actual loading/transition spinner — reusable across pages, not redrawn per-page
- Dark CTA band (ink background, brand-green accents) for page-end conversion moments

MOTION (subtle, not decorative)
- Section reveal: 200-300ms fade-up on scroll, no bouncy easing
- Stat counters: numbers count up once on first viewport entry
- Feature row images: slight parallax or scale-in, not carousel auto-rotation
- Swirl motif: slow (20-30s) continuous rotation when used as a background hero device — subtle enough to read as ambient, not attention-grabbing
- Avoid: gradient blobs that slowly morph in the background (overused "AI startup" cliché), floating 3D shapes, glassmorphism panels
```

---

## PART C — Page-by-Page Build Spec

For each page, the structural pattern is borrowed from the named Salesforce reference, but every section is rebuilt with Saphran's actual product architecture (PartBase, QuoteBase, ConnectBase, IntelligenceBase, ScenarioPro, SaphranAI) and its real proof points (SAP/Oracle/Salesforce/Aras integrations, $46M+ impact case study, +10% forecasting improvement).

### 1. HOME PAGE (structural reference: salesforce.com/sales)

```
1. Header: logo left, nav center-right (Capabilities, Customer Success, Resources, Blog, About), 
   primary CTA button top-right ("Book a Discovery Call"). Sticky on scroll, background shifts 
   from transparent-on-ink-hero to bone/blurred on scroll.

2. HERO (ink/dark full-bleed section):
   - Eyebrow label: "Cost Forecasting & Margin Management for ETO Manufacturers"
   - Large asymmetric headline (left-aligned, ~72-88px)
   - Subhead: 1-2 sentences, direct value statement
   - Two CTAs: primary "Book a Discovery Call", secondary "See how it works" (scrolls to product) 
     or "Watch a 2-min overview" if a demo video/GIF exists
   - Right or lower-right: real product screenshot (dashboard/margin view) in a minimal frame, 
     NOT an abstract illustration — mirrors the Salesforce CPQ hero pattern of "product screenshot 
     as hero visual, not stock photo." Dashboard chrome should use brand-green (not blue) for its 
     accent/active states, and the hero's dark background should carry a single large, faint (5-8%) 
     swirl-linework device off to one side rather than a plain flat ink fill.

3. TRUST/STAT BAR (bone background, directly under hero):
   - 3-4 stat tiles using the monospaced stat-tile component: e.g. "+10% forecasting accuracy", 
     "Up to $8.2M in freight savings", "20+ countries supported", "Multi-tenant enterprise scale"
   - Optional: grayscale logo row of integration partners (SAP, Oracle, Salesforce, Aras) — 
     reframed as "Works with the systems you already run" rather than customer logos, since 
     Saphran doesn't yet have a public customer-logo wall to draw from [confirm if customer 
     logos can be used publicly — if not, keep this as integration-partner logos only]

4. PROBLEM FRAMING (bone/paper, editorial two-column):
   Rebuild the existing "5 pain points" section as a tighter, scannable pairing rather than 
   five near-identical repeating blocks — pick the 3 strongest pain points 
   (cost volatility, bid pressure vs. margin, spreadsheet fragility) and give each a 
   pain-statement + Saphran's direct counter, set in larger type with more white space 
   than the current stacked-icon-card treatment.

5. PRODUCT ARCHITECTURE / "HOW TEAMS UTILIZE SAPHRAN" (ink section):
   Rebuild the existing 5-stage lifecycle (Pre-Target -> Targeting -> Cost & Quoting -> 
   Pre-Production -> Production) as a horizontal connected-flow diagram rather than five 
   disconnected icon cards — this is a direct opportunity to show "engineering precision" 
   visual language (a clean pipeline/flow diagram, blueprint-style connecting lines) instead 
   of generic rounded icon tiles.

6. FEATURE ROWS (paper/bone, alternating layout — direct structural borrow from Salesforce CPQ page):
   3 feature rows, each: eyebrow + headline + 2-3 sentence description + real product 
   screenshot, alternating left/right. Suggested three: 
     (a) SaphranAI scenario forecasting 
     (b) Enterprise Decision Layer / integrations 
     (c) Cost & Quoting speed (RFQ response time)

7. CASE STUDY / IMPACT (ink, full-bleed, high-contrast stat presentation):
   Rebuild the existing $46M+ impact case study as a single strong visual moment — 
   large headline stat, 3 supporting stat tiles (freight savings, inventory reduction, 
   margin protection), one sentence of context. This is Saphran's strongest existing 
   proof point and currently the most buried; it deserves prime real estate.

8. FINAL CTA (ink background, brand-green accents):
   "Join the top leaders in your industry" headline, single clear "Book a Discovery Call" CTA, 
   optionally a secondary "Talk to Sales" or calendar embed pattern (see Contact page)

9. Footer: standard four-column (Product, Company, Resources, Legal), logo, social, 
   copyright — keep close to current footer structure, just restyle to the new system.
```

### 2. CAPABILITIES PAGE — feature page (structural reference: salesforce.com/sales/cpq)

```
1. Header (same as home)

2. HERO (bone or ink — recommend ink for consistency with home):
   - Eyebrow: "Platform"
   - Headline: reframe from generic "Capabilities" to a benefit-forward headline 
     (Salesforce pattern: never labels a feature page just with the feature name — 
     always a value statement, e.g. their CPQ page headline is 
     "Configure, price, & quote with an integrated CPQ solution," not "CPQ")
     Suggested Saphran equivalent: "One decision layer across every system you already run."
   - Subhead + two CTAs (Watch demo / Book a Discovery Call)
   - Hero visual: the Enterprise Decision Layer diagram, cleaned up

3. INTEGRATION ROW (logo bar, bone background):
   SAP, Oracle ERP, Salesforce CRM, Aras PLM, market data feeds — direct carry-over from 
   current content, restyled as a proper logo bar rather than stacked images with captions.

4. MODULAR PLATFORM FEATURE ROWS (direct structural borrow from Salesforce CPQ "Accelerate 
   the sales cycle" / "Launch products and pricing fast" pattern — headline + 3 sub-feature 
   cards + supporting screenshot, repeated per platform pillar):

   Row A — "Saphran Cloud Platform" 
     Sub-features as 3 cards: PartBase, QuoteBase, ConnectBase (each gets its own 
     2-sentence description — currently these are just a bare word list with no 
     explanation, which is a missed GEO/LLM opportunity, see Part D)

   Row B — "Decision Outputs"
     Sub-features: Scenario Analysis, Margin Forecasts, Cost Simulations, Executive 
     Dashboards, Alerts — same treatment, each needs its own short description.

   Row C — "SaphranAI"
     Keep as its own elevated section (ink background) given it's the AI differentiator — 
     rebuild the description into scannable capability bullets rather than a solid paragraph, 
     paired with the +10% and $8.2M stats as inline stat tiles rather than separate boxes.

5. CASE STUDY (full detail version of the Tier 1 automotive supplier story):
   Restructure into the Challenge / Solution / Impact 3-column pattern already present, 
   but give it real visual hierarchy: large "$46M+ annual business impact" as the section's 
   dominant element, three supporting stat tiles below, challenge/solution copy condensed 
   to the left in a narrower column so it doesn't compete with the stats for attention.

6. RELATED / CROSS-LINK ROW (bone, 3-4 cards — direct borrow from Salesforce's 
   "Extend the power of..." pattern):
   Link to Customer Success, Resources/whitepaper, Blog, About — gives the feature page 
   an exit path deeper into the site instead of dead-ending at a single CTA.

7. FINAL CTA band (same component as home page)

8. Footer (same as home page)
```

### 3. CONTACT PAGE (structural reference: salesforce.com/sales/demos contact/scheduling flow)

```
1. Header (simplified — nav can collapse to just logo + "Back to site" or keep full nav)

2. TWO-COLUMN LAYOUT (bone background, no dark hero needed here — contact pages should 
   reduce friction, not add a heavy visual moment):
   
   LEFT COLUMN (context, not sales copy):
   - Eyebrow: "Talk to Saphran"
   - Headline: direct and low-pressure, e.g. "See how Saphran fits your systems." 
     (avoid generic "Contact Us" — Salesforce's demo/contact flow always frames it as 
     seeing the product, not filling out a form)
   - 3 short reassurance bullets addressing real buyer hesitations: 
     "No commitment — a 30-minute walkthrough of your actual use case," 
     "See how Saphran connects to your existing ERP and PLM," 
     "Talk to someone who understands ETO manufacturing, not a generic SDR script"
   - Optional: small named-contact card (photo + name + title) for whoever owns 
     discovery calls, e.g. Ami Trivedi as Director of Sales — this single human-presence 
     detail does more for credibility than any amount of stock photography 
     [confirm before including a named team member/photo]

   RIGHT COLUMN (the actual form, in a clean card on paper/white surface):
   - Minimal required fields: Name, Work Email, Company, Role, 
     "What's your biggest cost/margin challenge right now?" (open text — this single 
     qualifying question does the enrichment work without needing to expose 
     firmographic screening on the form itself, consistent with the ZoomInfo/Apollo 
     enrichment approach already in use elsewhere)
   - Single clear submit button: "Book a Discovery Call" or embed a scheduling widget 
     (Calendly-style) directly if Saphran uses one, styled to match the design system 
     rather than left as a default embed

3. BELOW THE FOLD (bone/paper): 
   Optional lightweight FAQ block (3-4 questions) addressing common pre-call hesitations 
   — "What happens on the call," "Do I need to prepare anything," "Is this a sales pitch 
   or a real evaluation" — this also GEO-optimizes the contact page itself (see Part D).

4. Footer (same as home page, can be simplified to just legal + social)
```

---

## PART D — GEO / LLM-Optimized Copywriting Guidance

The existing Saphran copy is product-accurate but written purely for human scanning and traditional SEO (keyword-adjacent phrasing, marketing-voice claims with no structural anchoring). To actually surface in AI Overviews, ChatGPT/Claude/Perplexity answers, and LLM-mediated research (which is increasingly how ETO manufacturing buyers research vendors before ever visiting a site directly), the copy needs to change in *structure*, not just wording:

### What to change and why

1. **Answer the question in the first sentence of every section, then elaborate.**
   LLMs extract the most citable, self-contained sentence from a page — usually the first one after a heading. Right now Saphran's sections often build up to the point ("Manufacturers need more than forecasting tools, they need real-time clarity...") rather than stating it. Rewrite so the first sentence under every H2/H3 is a complete, standalone, quotable definition or claim. Example: instead of "Costs that shift faster than forecasts can keep up," open with "Saphran forecasts manufacturing costs in real time so ETO suppliers can reprice bids before margin erodes" — a sentence that works even if it's the only thing an LLM extracts.

2. **Name the product modules and define them, don't just list them.**
   Right now PartBase, QuoteBase, ConnectBase, IntelligenceBase, and ScenarioPro appear as a bare word list with zero definition anywhere on the site. That's invisible to both human readers and LLMs — there's nothing to cite. Every module needs its own one-sentence, entity-clear definition (e.g., "QuoteBase is Saphran's module for generating cost and margin models during RFQ response, cutting quote turnaround from weeks to days.") so that if someone asks an AI assistant "what does Saphran's QuoteBase do," there's an actual answer living on the site to surface.

3. **Use explicit comparison and category language.**
   LLMs are frequently asked "best cost forecasting software for ETO manufacturers" or "Saphran vs Campfire" style questions. The site currently never states its category plainly in body copy (only in the meta title). Add clear, factual category-anchoring sentences: "Saphran is a cost forecasting and margin management platform built specifically for engineer-to-order (ETO) manufacturers" should appear, near-verbatim, in the first paragraph of the homepage, the capabilities page, and the meta description — consistency across the page and the metadata helps LLMs and search engines converge on the same entity summary.

4. **Add a real FAQ section to Home, Capabilities, and Contact — written as direct Q&A, not marketing copy.**
   This is the single highest-leverage GEO move available and Saphran currently has zero FAQ content anywhere on the site (Campfire has an entire FAQ/Answers content hub, and Salesforce's CPQ page ends in a 10-question FAQ block — this is a proven, deliberate pattern precisely because FAQ-formatted content is disproportionately surfaced in AI answers). Structure: 
   - Question phrased exactly how a buyer or an LLM user would ask it ("What is cost forecasting software for ETO manufacturers?", "How is Saphran different from spreadsheet-based forecasting?", "Does Saphran replace our ERP?", "What systems does Saphran integrate with?")
   - Answer: 2-4 sentences, direct, self-contained, no hedging language
   - Mark these up as FAQ-schema-eligible in the actual build (Figma Make/dev handoff should use a semantic `<dl>`/FAQ pattern or structured data, not just styled accordion divs)

5. **Replace vague superlatives with specific, verifiable claims.**
   "Superior performance," "an array of possibilities" — this kind of copy has no factual content an LLM can extract or trust. Every claim should be tied to a number, a named integration, or a specific mechanism already proven elsewhere on the site (Saphran has genuinely strong specifics — the $46M+ case study, +10% forecasting improvement, 20+ country support — the copy should lean much harder into these and drop the abstract language entirely).

6. **Write section headings as natural-language questions or clear statements, not fragments.**
   "SaphranAI for the Future" is a marketing fragment with no informational content. "How SaphranAI Reduces Forecasting Bias" both reads better for humans and gives an LLM a clean heading-to-answer pair to extract.

7. **Keep one consistent entity description across the whole site and metadata.**
   Pick one precise, factual one-sentence description of what Saphran is, and repeat it verbatim (not paraphrased differently every time) in: the page title tag, the meta description, the homepage first paragraph, and the About page. Entity consistency across a domain is one of the stronger signals for how LLMs resolve "what is X company" queries.

### Rewritten copy blocks (ready to drop in)

**Homepage hero (replacing current hero copy):**
> Eyebrow: Cost Forecasting & Margin Management for ETO Manufacturers
> Headline: Deliver margin certainty in markets that won't hold still.
> Subhead: Saphran is the cost forecasting and margin management platform built for engineer-to-order manufacturers — unifying your existing ERP, PLM, and CRM data into one real-time decision layer, so every bid, forecast, and pricing call is grounded in current numbers instead of last quarter's spreadsheet.

**Capabilities hero (replacing current "Capabilities" label):**
> Eyebrow: Platform
> Headline: One decision layer across every system you already run.
> Subhead: Saphran connects to SAP, Oracle ERP, Salesforce CRM, Aras PLM, and live market data feeds — without replacing any of them — so cost, margin, and forecasting decisions are made on one current, reliable view of the business.

**Module definitions (new content — currently missing entirely):**
> **PartBase** — Saphran's part-level cost and specification database, giving teams a single reliable source for component costs across programs and plants.
> **QuoteBase** — Generates cost and margin models during RFQ response, cutting quote turnaround from weeks to days.
> **ConnectBase** — The integration layer that pulls data from ERP, PLM, CRM, and market feeds into Saphran without requiring changes to those systems.
> **IntelligenceBase** — Turns connected data into executive-ready dashboards, alerts, and margin visibility across the business.
> **ScenarioPro** — Runs rapid what-if cost and margin scenarios so teams can evaluate pricing and bid decisions before committing.

**Sample FAQ block (Homepage/Capabilities — add 6-8 of these, this is a starter set):**
> **What is cost forecasting software for ETO manufacturers?**
> Cost forecasting software for engineer-to-order (ETO) manufacturers is a platform that predicts material, labor, and program costs in volatile markets so sales, finance, and program teams can price bids and manage margin with current data instead of static spreadsheets. Saphran is built specifically for this use case.
>
> **How is Saphran different from spreadsheet-based cost forecasting?**
> Spreadsheets rely on manually updated, siloed data that goes stale as soon as costs shift. Saphran connects directly to a manufacturer's ERP, PLM, and market data sources to keep cost and margin models current in real time, replacing manual spreadsheet updates with a single always-current source of truth.
>
> **Does Saphran replace our ERP or PLM system?**
> No. Saphran is designed to sit on top of existing systems — including SAP, Oracle ERP, Salesforce CRM, and Aras PLM — connecting their data into one decision layer without requiring a system migration or replacement.
>
> **What industries use Saphran?**
> Saphran is built for engineer-to-order (ETO) manufacturers, including Tier 1 and Tier 2 automotive suppliers and other complex manufacturing businesses managing volatile input costs, custom program bids, and multi-plant operations.

---

## PART E — Final instructions to paste directly into Figma Make

```
Build a complete redesign of the Saphran website (saphran.com) — three pages: Home, 
Capabilities, and Contact.

BRAND: Use Saphran's ACTUAL brand palette exactly — navy #213343 (primary dark "ink" 
surface for header, footer, and one full-bleed dark section per page), green #58A972 
(primary accent — CTAs, active states, hover, key data highlights), light green #95CBA7 
(secondary accent — tag backgrounds, secondary data-viz series, dividers), plus black/white. 
Do NOT use blue as an accent color anywhere and do NOT invent additional brand hues (no 
copper, no amber, no purple). A warm off-white "bone" background (not pure white, proposed 
addition — confirm exact value) carries the light sections. Never tint every section the 
same color — alternate ink/bone/white across the page.

BRANDMARK: Saphran's mark is a five-blade rotating swirl/pinwheel icon. Use it as a real 
motif, not just a static header logo: one large, very low-opacity (5-8%) swirl-linework 
graphic in the dark hero background (never the dense repeating tile pattern, never behind 
readable text), and the same shape doubling as a loading/transition spinner on any 
interactive demo or form-submit state.

DESIGN LANGUAGE: "Precision instrument for margin decisions" — engineering/blueprint 
clarity rather than generic friendly-SaaS-cloud aesthetic, and explicitly NOT the 
"dark hero + blue button + floating dashboard card" look that most AI-generated SaaS 
sites default to — that look is achieved here instead through Saphran's own navy/green, 
not blue. Minimal border radius (4-8px, not bubbly), hairline 1px borders over heavy 
shadows, asymmetric left-aligned oversized headlines (not center-stacked), tabular/
monospaced numerals for every stat and dollar figure, generous vertical rhythm (96-160px 
between sections), and one confident full-bleed dark section per page.

TYPOGRAPHY: Poppins (Saphran's established brand typeface) for headlines — Bold/ExtraBold 
weight, large scale (72-96px), tight tracking, used with more confidence/restraint than 
typical Poppins-template sites (never at the small, light-weight default most Wix/Squarespace 
sites use it at). Body copy in a neutral face (Inter or IBM Plex Sans) — never Poppins for 
paragraphs. Uppercase tracked-out eyebrow labels above every section headline. Tabular/
monospaced numerals for all stats and dollar figures, as a deliberate sharp counterpoint 
to Poppins' rounded letterforms.

STRUCTURE: Follow the section-by-section build spec below for each page [paste Part C here]. 
Use real product-screenshot-style imagery in minimal device frames for every feature 
row — no abstract 3D blob renders, no generic stock photography of people pointing at 
tablets, no AI-generated-looking illustrations.

COPY: Use the GEO-optimized copy blocks below [paste relevant Part D blocks here], 
including the FAQ sections on Home, Capabilities, and Contact — write these as direct, 
self-contained Q&A pairs suitable for structured/FAQ markup, not as marketing copy.

COMPONENTS: Build a small reusable component set first (button primary/secondary, stat 
tile, feature row, logo bar, FAQ accordion, dark CTA band, quote card) per the design 
system spec below [paste Part B here], then assemble the three pages from those components 
so the system stays consistent across pages.
```

---

### Before you generate — three things to confirm
1. **The one proposed color that isn't in the official brand book** — the warm off-white "bone" background. Everything else (navy `#213343`, green `#58A972`, light green `#95CBA7`, black, white) is pulled directly from Saphran's brand guidelines, so it's locked in; bone is a recommended addition worth a quick sign-off.
2. **Whether any customer logos can be shown publicly** on the homepage trust bar — if not, the integration-partner logos (SAP/Oracle/Salesforce/Aras) carry that role instead, as drafted above.
3. **Who (if anyone) should appear as a named contact on the Contact page** — a real name/title/photo tied to discovery calls (e.g., Ami Trivedi) is a small addition with outsized credibility impact, but only if you're comfortable featuring someone specifically.

### One more note on avoiding "vibe coded" going forward
If you regenerate in Figma Make and it still defaults to blue anywhere, or defaults to the generic near-black-plus-blue-button combo, explicitly call it out in your follow-up prompt and point it back to the exact hex values above — AI design tools will drift back toward their trained defaults if the brand constraint isn't repeated. It's worth pasting the COLOR TOKENS block from Part B verbatim into any follow-up correction prompt rather than describing the colors in your own words.