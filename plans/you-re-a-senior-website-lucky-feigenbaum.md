# Saphran Website Redesign — Implementation Plan

## Context
saphran.com currently runs on a generic Wix template: center-stacked text, stock icon sets,
no distinct type personality, no dark moments, no visual system. The brief calls for a
"precision instrument for margin decisions" aesthetic — engineering/blueprint clarity,
not generic SaaS-cloud friendliness — built on Saphran's existing sapphire gemstone
brand identity applied with intention.

Three pages: **Home**, **Capabilities**, **Contact**. Delivered as a single-page React app
with `useState` page routing (no router needed). The previous session's edits to fonts.css
and theme.css did not persist — all three files are at their defaults and need to be written.

---

## Files to Write

| File | Action |
|---|---|
| `src/styles/fonts.css` | Add Google Fonts import |
| `src/styles/theme.css` | Update `:root` tokens only (preserve `.dark` block + `@theme inline` + `@layer base`) |
| `src/app/App.tsx` | Write complete 3-page implementation |

---

## Design System

### Color Tokens (`:root` values to set in `theme.css`)
```
--background:       #F5F3EE   (bone — warm off-white, primary light ground)
--foreground:       #1C1E22   (graphite — body text on light)
--card:             #FFFFFF
--card-foreground:  #1C1E22
--popover:          #FFFFFF
--popover-foreground: #1C1E22
--primary:          #1B5FCC   (sapphire — CTAs, active states, data-viz)
--primary-foreground: #FFFFFF
--secondary:        #E8E5DF
--secondary-foreground: #1C1E22
--muted:            #E8E5DF
--muted-foreground: #5B6270   (slate — secondary text)
--accent:           #B8763E   (copper — eyebrows, tags, one data series)
--accent-foreground: #FFFFFF
--destructive:      #C4473A
--destructive-foreground: #FFFFFF
--border:           rgba(28, 30, 34, 0.1)
--input:            transparent
--input-background: #EDEBE5
--switch-background: #B8B5AE
--ring:             #1B5FCC
--chart-1..5:       #1B5FCC, #2D7A4F, #B8763E, #3578E5, #C4473A
--radius:           0.375rem  (6px — minimal, precision feel)
```
Leave `.dark` block and `@theme inline` mappings unchanged.

### Typography
- **Display headlines**: `Barlow Condensed` 700, tight tracking (-0.03em), sizes 56–80px
- **Section headlines**: `Barlow` 700, tracking -0.025em
- **Body**: `Inter` 400/500, 16px, 1.6 line-height
- **Stats/data**: `JetBrains Mono` 400/500, tabular-nums — applied via `font-mono` class

`fonts.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Barlow:wght@400;500;600;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');
```

Add to `@theme inline` block in `theme.css`:
```css
--font-mono: "JetBrains Mono", ui-monospace, monospace;
--font-sans: "Inter", ui-sans-serif, sans-serif;
```

### Layout
- Max content width: 1280px, `mx-auto px-6 lg:px-8`
- Section vertical rhythm: `py-24` (light sections) / `pt-36 pb-24` (dark heroes)
- Card radius: `rounded-[4px]` to `rounded-[6px]` — minimal, not bubbly
- Borders: 1px hairline `border-[#1C1E22]/10` on light, `border-white/10` on dark
- Shadows: only for true elevation on the form card (`shadow-sm`)

### Ink (dark) sections
Background: `bg-[#0B1220]` with faint blueprint grid overlay:
```css
background-image: linear-gradient(rgba(27,95,204,0.04) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(27,95,204,0.04) 1px, transparent 1px);
background-size: 80px 80px;
```

---

## Component Architecture (all in `App.tsx`)

### Utility Components
| Component | Purpose |
|---|---|
| `Eyebrow` | Uppercase 11px copper label above section headlines |
| `PrimaryBtn` | Sapphire fill, 6px radius, brighten on hover |
| `GhostBtn` | Outline, light/dark variant |
| `CountUp` | IntersectionObserver stat counter with JetBrains Mono |
| `FaqItem` | Accordion: chevron toggle, question + expandable answer |

### Product UI Mockups (CSS/SVG — no real screenshots)
| Component | Represents | Used in |
|---|---|---|
| `DashboardMockup` | Margin waterfall chart + KPI tiles + module pills (dark theme) | Home hero (right column) |
| `ScenarioMockup` | 3-scenario what-if comparison panel | Feature row 1 |
| `IntegrationMockup` | 5 source systems → Saphran connection diagram | Feature row 2 |
| `QuotingMockup` | RFQ before/after turnaround + step pipeline | Feature row 3 |

### Layout Components
| Component | Notes |
|---|---|
| `ArchFlow` | Horizontal 5-stage flow with arrow connectors between stages |
| `Header` | Sticky; transparent on ink hero, bone/blurred on scroll. `useEffect` resets scroll on page change |
| `Footer` | 4-column on `#0B1220`; product / company / resources / legal |
| `CtaBand` | Shared dark CTA band; reused at bottom of Home and Capabilities |

### Pages
| Component | Props |
|---|---|
| `HomePage` | `{ setPage }` |
| `CapabilitiesPage` | `{ setPage }` |
| `ContactPage` | `{ setPage }` — includes form with `useState`, success state |

### Root `App`
```tsx
const [page, setPage] = useState<"home"|"capabilities"|"contact">("home");
// renders Header + active page + Footer (Contact renders its own Footer)
```

---

## Page Section Breakdown

### HOME
1. **Hero** (ink) — Eyebrow + 72px Barlow Condensed headline + subhead + 2 CTAs + `DashboardMockup` right column
2. **Stat bar** (bone) — 4 `CountUp` tiles (`+10%`, `$8.2M+`, `20+`, `$46M+`) + integration logo row (SAP / Oracle / Salesforce / Aras)
3. **Problem framing** (white) — 3-column grid; each cell: copper eyebrow + italic pain quote + check + Saphran counter
4. **Architecture** (ink) — `ArchFlow` horizontal diagram; 5 stages numbered 01–05
5. **Feature rows** (bone / white alternating) — 3 rows, text left/right alternating, product mockup opposite:
   - Row A: SaphranAI + `ScenarioMockup`
   - Row B: ConnectBase + `IntegrationMockup` (text right, mockup left)
   - Row C: QuoteBase + `QuotingMockup`
6. **Case study** (ink) — `$46M+` large headline + 3 stat tiles + brief context copy
7. **FAQ** (bone) — 4 questions via `FaqItem` in two-column layout (label column left, questions right)
8. **CTA band** (ink) — `CtaBand` component

### CAPABILITIES
1. **Hero** (ink) — Platform eyebrow + "One decision layer..." headline + 2 CTAs
2. **Integration bar** (bone) — 5 system names as styled text logos
3. **Module definitions** (white) — 5 `PartBase` / `QuoteBase` / `ConnectBase` / `IntelligenceBase` / `ScenarioPro` cards with one-sentence definitions from the brief
4. **Decision outputs** (bone) — 6 output cards (Scenario Analysis, Margin Forecasts, Cost Simulations, Executive Dashboards, Alerts, Global Ops) with lucide icons
5. **SaphranAI** (ink) — Headline + 4 capability bullets + 4 stat tiles grid
6. **Case study** (white) — `$46M+` dominant headline + 3 stat tiles + 3-column challenge/solution/impact
7. **Cross-link row** (bone) — 3 cards linking to Customer Success / Book a Call / Resources
8. **FAQ** (white) — 3 questions
9. **CTA band** (ink)

### CONTACT
1. **Two-column** (bone) — Left: Eyebrow + headline + 3 reassurance bullets + integration note. Right: white form card with name/email/company/role/challenge fields + submit
2. **Success state** — replaces form with confirmation message on submit
3. **FAQ** (white) — 4 pre-call questions
4. **Footer** (same component, simplified)

---

## Copy (verbatim from brief)

**Hero headline**: "Deliver margin certainty in markets that won't hold still."

**Hero subhead**: "Saphran is the cost forecasting and margin management platform built for engineer-to-order manufacturers — unifying your existing ERP, PLM, and CRM data into one real-time decision layer, so every bid, forecast, and pricing call is grounded in current numbers instead of last quarter's spreadsheet."

**Capabilities headline**: "One decision layer across every system you already run."

**Module definitions**: Verbatim from Part D of the brief (PartBase / QuoteBase / ConnectBase / IntelligenceBase / ScenarioPro).

**FAQ blocks**: Verbatim Q&A pairs from Part D of the brief.

---

## Implementation Notes

- Use Tailwind arbitrary values for brand-specific colors: `bg-[#0B1220]`, `text-[#1B5FCC]`, `border-white/10`, etc.
- Use `style={{ fontFamily: "'Barlow Condensed', sans-serif" }}` for display headlines; `style={{ fontFamily: "'Barlow', sans-serif" }}` for section titles (Tailwind arbitrary font-family with multi-word names is unreliable)
- `font-mono` class covers JetBrains Mono for all stat numbers once `--font-mono` is set in `@theme inline`
- `CountUp` uses `IntersectionObserver` with `threshold: 0.3`; decimal-aware (rounds to 1 decimal place)
- SVG waterfall chart in `DashboardMockup`: 6 bars within `viewBox="0 0 440 90"`, all within bounds
- `ArchFlow` uses flexbox with `ArrowRight` icon connectors between stage cards; `overflow-x-auto` for mobile
- Header `scrolled` state resets when page changes (scroll reset via `window.scrollTo(0,0)`)

---

## Verification
- Navigate all three pages via header nav and inline CTAs
- Stat counters animate when sections scroll into view
- FAQ accordions open/close correctly
- Contact form shows success state on submit
- Header transitions correctly: transparent on home hero, bone on scroll / other pages
- Responsive: grid collapses to single column at `md` breakpoint (~768px)
- Blueprint grid overlay visible on all ink sections
- JetBrains Mono applied to all stat numbers (KPI tiles, case study, dashboard mockup)
