import { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowLeft, ChevronDown, ChevronUp, Check, BarChart2, Layers, Globe2, Cpu, Shield, TrendingUp, Clock, Database, DollarSign, Activity, FileText, AlertCircle, RefreshCw, Sparkles, HelpCircle, ArrowUpRight, TrendingDown } from "lucide-react";
import logoSrc from "../imports/image.png";
import watermarkLightSrc from "../imports/watermark_light.png";
import watermarkDarkSrc from "../imports/watermark_dark.png";
import teamSeanSrc from "../imports/team_sean.png";
import teamKennethSrc from "../imports/team_kenneth.png";
import teamAmiSrc from "../imports/team_ami.png";
import teamMeganSrc from "../imports/team_megan.png";


type Page = "home" | "capabilities" | "contact" | "startup" | "quotebase" | "partbase" | "connectbase" | "intelligencebase" | "saphranai" | "scenariopro" | "privacypolicy" | "termsofuse" | "about";

const INK = "#213343";
const GREEN = "#58A972";
const GREEN_TINT = "#95CBA7";
const BONE = "#F6F4EF";
const SLATE = "#5A5F63";
const GRAPHITE = "#1A1A1A";

// ─── Swirl Mark ───────────────────────────────────────────────────────────────

function SwirlMark({
  size = 28,
  color = GREEN,
  className = "",
  style: s = {},
  dark = false,
}: {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  dark?: boolean;
}) {
  if (size >= 100) {
    return (
      <img
        src={dark ? watermarkDarkSrc : watermarkLightSrc}
        width={size}
        height={size}
        className={className}
        style={{
          ...s,
          width: size,
          height: size,
          objectFit: "contain",
        }}
        alt=""
        aria-hidden="true"
      />
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={s}
      aria-hidden="true"
    >
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <path
          key={i}
          d="M50,50 C54,36 65,30 61,14 C57,-2 43,12 50,50"
          fill={color}
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
    </svg>
  );
}

// ─── Shared primitives ────────────────────────────────────────────────────────

function Eyebrow({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      className="text-[11px] font-semibold tracking-[0.14em] uppercase mb-4"
      style={{
        color: dark ? GREEN_TINT : GREEN,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {children}
    </p>
  );
}

function PrimaryBtn({
  children,
  onClick,
  full = false,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  full?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 text-sm font-semibold px-6 py-[11px] rounded-[5px] transition-all duration-150 active:scale-[0.98] cursor-pointer ${
        full ? "w-full" : ""
      }`}
      style={{
        background: GREEN,
        color: INK,
        fontFamily: "'Inter', sans-serif",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "#4f9e68";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = GREEN;
      }}
    >
      {children}
    </button>
  );
}

function OutlineBtn({
  children,
  onClick,
  dark = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  dark?: boolean;
}) {
  const col = dark ? "rgba(255,255,255,0.62)" : SLATE;
  const bdr = dark ? "rgba(255,255,255,0.22)" : "rgba(33,51,67,0.18)";
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 text-sm font-medium px-6 py-[11px] rounded-[5px] transition-all duration-150 cursor-pointer"
      style={{
        color: col,
        border: `1px solid ${bdr}`,
        fontFamily: "'Inter', sans-serif",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = dark ? "#fff" : GRAPHITE;
        (e.currentTarget as HTMLElement).style.borderColor = dark
          ? "rgba(255,255,255,0.44)"
          : "rgba(33,51,67,0.35)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = col;
        (e.currentTarget as HTMLElement).style.borderColor = bdr;
      }}
    >
      {children}
    </button>
  );
}

function CountUp({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const ran = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !ran.current) {
          ran.current = true;
          const steps = 48;
          let cur = 0;
          const t = setInterval(() => {
            cur += to / steps;
            if (cur >= to) {
              setVal(to);
              clearInterval(t);
            } else {
              setVal(Math.round(cur * 10) / 10);
            }
          }, 1300 / steps);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return (
    <span ref={ref} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

function FaqItem({
  q,
  a,
  dark = false,
}: {
  q: string;
  a: string;
  dark?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.09)" : "rgba(26,26,26,0.10)"}`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between py-[18px] text-left gap-8"
        style={{ color: dark ? "rgba(255,255,255,0.88)" : GRAPHITE }}
      >
        <span
          className="text-sm font-medium leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {q}
        </span>
        {open ? (
          <ChevronUp size={13} className="shrink-0 mt-0.5 opacity-40" />
        ) : (
          <ChevronDown size={13} className="shrink-0 mt-0.5 opacity-40" />
        )}
      </button>
      {open && (
        <p
          className="pb-5 text-sm leading-relaxed"
          style={{
            color: dark ? "rgba(255,255,255,0.44)" : SLATE,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {a}
        </p>
      )}
    </div>
  );
}

// ─── Hero product mockup — light ──────────────────────────────────────────────

function HeroMockup({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div
      className="w-full rounded-[8px] overflow-hidden"
      style={{
        border: "1px solid rgba(33,51,67,0.10)",
        boxShadow:
          "0 8px 40px rgba(33,51,67,0.09), 0 2px 8px rgba(33,51,67,0.05)",
        background: "#fff",
      }}
    >
      {/* App chrome */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{
          borderBottom: "1px solid rgba(33,51,67,0.07)",
          background: BONE,
        }}
      >
        <div className="flex items-center gap-2.5">
          <SwirlMark size={14} color={GREEN} />
          <span
            className="text-[10px] font-semibold tracking-wide"
            style={{ color: INK, fontFamily: "'Poppins', sans-serif" }}
          >
            Saphran
          </span>
          <span
            className="text-[10px]"
            style={{ color: "rgba(33,51,67,0.28)" }}
          >
            /
          </span>
          <span
            className="text-[10px]"
            style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}
          >
            Margin Intelligence
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {["Q4 2024", "All Plants"].map((l, i) => (
            <span
              key={l}
              className="text-[9px] px-2 py-0.5 rounded"
              style={{
                background: i === 0 ? `${GREEN}1A` : "rgba(33,51,67,0.06)",
                color: i === 0 ? GREEN : SLATE,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* KPI tiles */}
        <div className="grid grid-cols-4 gap-2.5">
          {[
            { label: "Program Margin",    val: "+12.4%", delta: "▲ 2.3 pts vs Q3", pos: true  },
            { label: "Forecast Accuracy", val: "94.7%",  delta: "▲ +10% YoY",      pos: true  },
            { label: "Open RFQs",         val: "23",     delta: "5 closing this wk", pos: true  },
            { label: "Cost Variance",     val: "−1.2%",  delta: "Within threshold",  pos: false },
          ].map((k, i) => (
            <div
              key={i}
              className="rounded-[4px] p-3"
              style={{
                border: "1px solid rgba(33,51,67,0.08)",
                background: i === 0 ? `${GREEN}0A` : "#fff",
              }}
            >
              <p
                className="text-[8px] uppercase tracking-wider mb-1.5"
                style={{
                  color: SLATE,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {k.label}
              </p>
              <p
                className="text-[17px] font-bold leading-none mb-1"
                style={{ color: INK, fontFamily: "'JetBrains Mono', monospace" }}
              >
                {k.val}
              </p>
              <p
                className="text-[8px]"
                style={{
                  color: k.pos ? GREEN : "#C4473A",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {k.delta}
              </p>
            </div>
          ))}
        </div>

        {/* Waterfall chart */}
        <div
          className="rounded-[4px] p-4"
          style={{ border: "1px solid rgba(33,51,67,0.08)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-[9px] font-medium"
              style={{ color: INK, fontFamily: "'Inter', sans-serif" }}
            >
              Margin Waterfall — Q4 2024
            </span>
            <div className="flex gap-4">
              {[
                [GREEN, "Program"],
                [GREEN_TINT, "Material"],
                ["#C4473A", "Variance"],
              ].map(([c, l]) => (
                <div key={l} className="flex items-center gap-1.5">
                  <div
                    className="w-2 h-2 rounded-[2px]"
                    style={{ background: c }}
                  />
                  <span
                    className="text-[8px]"
                    style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}
                  >
                    {l}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <svg viewBox="0 0 440 82" className="w-full" style={{ height: 70 }}>
            {[0, 20, 40, 60].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="440"
                y2={y}
                stroke="rgba(33,51,67,0.05)"
                strokeWidth="0.5"
              />
            ))}
            {[
              { x: 10,  y: 44, h: 26, c: GREEN       },
              { x: 83,  y: 34, h: 10, c: GREEN       },
              { x: 156, y: 40, h: 6,  c: GREEN_TINT  },
              { x: 229, y: 51, h: -11, c: "#C4473A"  },
              { x: 302, y: 33, h: 18, c: GREEN       },
              { x: 375, y: 26, h: 7,  c: GREEN       },
            ].map((b, i) => (
              <rect
                key={i}
                x={b.x}
                y={b.h >= 0 ? b.y - b.h : b.y}
                width="50"
                height={Math.abs(b.h)}
                fill={b.c}
                opacity="0.88"
                rx="1.5"
              />
            ))}
            {["Base", "Material", "Labor", "Freight", "Program", "Total"].map(
              (l, i) => (
                <text
                  key={l}
                  x={10 + i * 73 + 25}
                  y={80}
                  textAnchor="middle"
                  fill="rgba(33,51,67,0.26)"
                  fontSize="6.5"
                  fontFamily="monospace"
                >
                  {l}
                </text>
              )
            )}
          </svg>
        </div>

        {/* Module strip */}
        <div className="flex gap-1.5">
          {[
            ["PartBase", false, "partbase"],
            ["QuoteBase", false, "quotebase"],
            ["ConnectBase", false, "connectbase"],
            ["IntelligenceBase", true, "intelligencebase"],
            ["SaphranAI", false, "saphranai"],
          ].map(([m, active, target]) => (
            <button
              key={m as string}
              onClick={() => setPage(target as Page)}
              className="flex-1 rounded-[3px] px-2 py-2 text-center transition-all hover:scale-105"
              style={
                active
                  ? {
                      background: `${GREEN}16`,
                      border: `1px solid ${GREEN}50`,
                    }
                  : {
                      background: BONE,
                      border: "1px solid rgba(33,51,67,0.08)",
                    }
              }
            >
              <p
                className="text-[7.5px] font-semibold leading-none"
                style={{
                  color: active ? GREEN : SLATE,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {m as string}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Feature mockups ──────────────────────────────────────────────────────────

function ScenarioMockup() {
  return (
    <div
      className="w-full rounded-[8px] overflow-hidden"
      style={{
        border: "1px solid rgba(33,51,67,0.10)",
        boxShadow: "0 4px 24px rgba(33,51,67,0.07)",
        background: "#fff",
      }}
    >
      <div
        className="px-5 py-3 flex items-center justify-between"
        style={{
          borderBottom: "1px solid rgba(33,51,67,0.07)",
          background: BONE,
        }}
      >
        <span
          className="text-[10px] font-medium"
          style={{ color: INK, fontFamily: "'Inter', sans-serif" }}
        >
          ScenarioPro — What-if Analysis
        </span>
        <span
          className="text-[9px]"
          style={{ color: GREEN, fontFamily: "'JetBrains Mono', monospace" }}
        >
          3 scenarios
        </span>
      </div>
      <div className="p-5 space-y-3">
        {[
          { label: "Base Forecast",      margin: "18.4%", delta: "baseline", active: false, w: "64%" },
          { label: "Optimised Sourcing", margin: "21.7%", delta: "+3.3 pts", active: true,  w: "80%" },
          { label: "Aggressive Pricing", margin: "24.1%", delta: "+5.7 pts", active: false, w: "90%" },
        ].map((s, i) => (
          <div
            key={i}
            className="rounded-[4px] p-3.5"
            style={
              s.active
                ? { background: `${GREEN}0C`, border: `1px solid ${GREEN}35` }
                : { background: BONE, border: "1px solid rgba(33,51,67,0.07)" }
            }
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-[10px] font-medium"
                style={{ color: GRAPHITE, fontFamily: "'Inter', sans-serif" }}
              >
                {s.label}
              </span>
              <div className="flex items-center gap-2.5">
                <span
                  className="text-[9px]"
                  style={{
                    color: SLATE,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {s.delta}
                </span>
                <span
                  className="text-[13px] font-bold"
                  style={{
                    color: s.active ? GREEN : INK,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {s.margin}
                </span>
              </div>
            </div>
            <div
              className="h-[3px] rounded-full"
              style={{ background: "rgba(33,51,67,0.08)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: s.w,
                  background: s.active ? GREEN : GREEN_TINT,
                  opacity: 0.7,
                }}
              />
            </div>
          </div>
        ))}
        <p
          className="text-[8px] pt-1"
          style={{ color: SLATE, fontFamily: "'JetBrains Mono', monospace" }}
        >
          Material cost: $2,847/unit · Connected to SAP live feed
        </p>
      </div>
    </div>
  );
}

function IntegrationMockup() {
  const systems = [
    "SAP ERP",
    "Oracle ERP",
    "Salesforce CRM",
    "Aras PLM",
    "Market Feeds",
  ];
  return (
    <div
      className="w-full rounded-[8px] overflow-hidden p-6"
      style={{
        border: "1px solid rgba(33,51,67,0.10)",
        boxShadow: "0 4px 24px rgba(33,51,67,0.07)",
        background: "#fff",
      }}
    >
      <p
        className="text-[9px] uppercase tracking-wider mb-5"
        style={{ color: SLATE, fontFamily: "'JetBrains Mono', monospace" }}
      >
        ConnectBase — Enterprise Decision Layer
      </p>
      <div className="flex justify-center mb-0.5">
        <div
          className="flex items-center gap-2.5 px-5 py-3 rounded-[5px]"
          style={{
            background: INK,
            boxShadow: "0 4px 16px rgba(33,51,67,0.22)",
          }}
        >
          <SwirlMark size={16} color={GREEN} />
          <span
            className="text-[11px] font-bold text-white"
            style={{
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "0.06em",
            }}
          >
            SAPHRAN
          </span>
        </div>
      </div>
      <div className="flex justify-around mb-0">
        {systems.map((_, i) => (
          <div
            key={i}
            className="h-5 w-px"
            style={{ background: `${GREEN}28` }}
          />
        ))}
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {systems.map((s) => (
          <div
            key={s}
            className="rounded-[3px] border px-1.5 py-2.5 text-center"
            style={{ background: BONE, borderColor: "rgba(33,51,67,0.09)" }}
          >
            <p
              className="text-[7.5px] leading-tight mb-1.5"
              style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}
            >
              {s}
            </p>
            <div className="flex justify-center">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: GREEN }}
              />
            </div>
          </div>
        ))}
      </div>
      <p
        className="text-[8px] text-center mt-3"
        style={{ color: GREEN_TINT, fontFamily: "'JetBrains Mono', monospace" }}
      >
        All feeds connected · Last sync 00:42 ago
      </p>
    </div>
  );
}

function QuotingMockup() {
  return (
    <div
      className="w-full rounded-[8px] overflow-hidden"
      style={{
        border: "1px solid rgba(33,51,67,0.10)",
        boxShadow: "0 4px 24px rgba(33,51,67,0.07)",
        background: "#fff",
      }}
    >
      <div
        className="px-5 py-3"
        style={{
          borderBottom: "1px solid rgba(33,51,67,0.07)",
          background: BONE,
        }}
      >
        <span
          className="text-[10px] font-medium"
          style={{ color: INK, fontFamily: "'Inter', sans-serif" }}
        >
          QuoteBase — RFQ Response Time
        </span>
      </div>
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div
            className="p-4 rounded-[4px] text-center"
            style={{ background: BONE, border: "1px solid rgba(33,51,67,0.08)" }}
          >
            <p
              className="text-[8px] uppercase tracking-wider mb-2"
              style={{ color: SLATE, fontFamily: "'JetBrains Mono', monospace" }}
            >
              Before Saphran
            </p>
            <p
              className="text-[30px] font-bold leading-none"
              style={{ color: SLATE, fontFamily: "'JetBrains Mono', monospace" }}
            >
              14d
            </p>
            <p className="text-[8px] mt-1" style={{ color: SLATE }}>
              avg turnaround
            </p>
          </div>
          <div
            className="p-4 rounded-[4px] text-center"
            style={{
              background: `${GREEN}10`,
              border: `1px solid ${GREEN}30`,
            }}
          >
            <p
              className="text-[8px] uppercase tracking-wider mb-2"
              style={{ color: GREEN, fontFamily: "'JetBrains Mono', monospace" }}
            >
              With Saphran
            </p>
            <p
              className="text-[30px] font-bold leading-none"
              style={{ color: INK, fontFamily: "'JetBrains Mono', monospace" }}
            >
              2d
            </p>
            <p className="text-[8px] mt-1" style={{ color: GREEN }}>
              avg turnaround
            </p>
          </div>
        </div>
        <div className="space-y-2.5">
          {[
            { step: "Cost model pull from ERP",  time: "~2 min",   done: true  },
            { step: "Margin scenario modelling",  time: "~5 min",   done: true  },
            { step: "Approval routing",           time: "~1 hr",    done: true  },
            { step: "Customer delivery",          time: "same day", done: false },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: s.done ? GREEN : `${GREEN}22`,
                  border: `1px solid ${s.done ? GREEN : `${GREEN}44`}`,
                }}
              >
                {s.done ? (
                  <Check size={7} color={BONE} strokeWidth={3} />
                ) : (
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: GREEN }}
                  />
                )}
              </div>
              <span
                className="flex-1 text-[9px]"
                style={{ color: GRAPHITE, fontFamily: "'Inter', sans-serif" }}
              >
                {s.step}
              </span>
              <span
                className="text-[9px]"
                style={{
                  color: SLATE,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {s.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Lifecycle flow ────────────────────────────────────────────────────────────

function ArchFlow() {
  const stages = [
    { num: "01", label: "Pre-Target",     desc: "Market intelligence & program identification" },
    { num: "02", label: "Targeting",      desc: "Bid qualification & early cost estimation" },
    { num: "03", label: "Cost & Quoting", desc: "Margin modelling, RFQ response, scenario analysis" },
    { num: "04", label: "Pre-Production", desc: "Program lock, supplier coordination & cost lock-in" },
    { num: "05", label: "Production",     desc: "Real-time cost tracking, variance alerts & margin protection" },
  ];
  return (
    <div className="overflow-x-auto pb-1">
      <div className="flex items-stretch min-w-[720px]">
        {stages.map((s, i) => (
          <div key={i} className="flex items-center flex-1">
            <div
              className="flex-1 p-5 flex flex-col h-full"
              style={{
                border: "1px solid rgba(255,255,255,0.10)",
                borderLeft: i > 0 ? "none" : undefined,
                borderRadius:
                  i === 0
                    ? "4px 0 0 4px"
                    : i === stages.length - 1
                    ? "0 4px 4px 0"
                    : 0,
              }}
            >
              <span
                className="text-[9px] mb-3 block"
                style={{
                  color: GREEN_TINT,
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: "0.1em",
                }}
              >
                {s.num}
              </span>
              <span
                className="text-sm font-semibold text-white mb-2 block"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {s.label}
              </span>
              <span
                className="text-[11px] leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.36)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {s.desc}
              </span>
            </div>
            {i < stages.length - 1 && (
              <ArrowRight
                size={10}
                style={{ color: `${GREEN_TINT}55`, flexShrink: 0, margin: "0 2px" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header({
  page,
  setPage,
}: {
  page: Page;
  setPage: (p: Page) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [capDropdownOpen, setCapDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setScrolled(false);
    setCapDropdownOpen(false);
  }, [page]);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setCapDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setCapDropdownOpen(false);
    }, 180);
  };

  const capItems: { name: string; tag: string; page: Page }[] = [
    { name: "Capabilities Overview", tag: "Platform Summary", page: "capabilities" },
    { name: "PartBase™", tag: "Active Commercial Mgmt", page: "partbase" },
    { name: "QuoteBase™", tag: "Costing & Quoting", page: "quotebase" },
    { name: "ConnectBase™", tag: "ERP & EDI Integration", page: "connectbase" },
    { name: "IntelligenceBase™", tag: "Calculated Data Cube", page: "intelligencebase" },
    { name: "SaphranAI™", tag: "Predictive AI Core", page: "saphranai" },
    { name: "ScenarioPro™", tag: "What-If Simulations", page: "scenariopro" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
      style={
        scrolled
          ? {
              background: "rgba(246,244,239,0.95)",
              backdropFilter: "blur(12px)",
              borderBottom: "1px solid rgba(33,51,67,0.09)",
            }
          : { background: "rgba(246,244,239,0.90)", backdropFilter: "blur(8px)" }
      }
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex items-center h-[62px] gap-8">
        <button
          onClick={() => setPage("home")}
          className="flex items-center gap-2.5 mr-auto cursor-pointer"
        >
          <img src={logoSrc} alt="Saphran" style={{ height: 30, width: "auto" }} />
        </button>
        <nav className="hidden md:flex items-center gap-7">
          {/* Capabilities Dropdown Trigger */}
          <div
            className="relative py-2"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => {
                setPage("capabilities");
                setCapDropdownOpen(false);
              }}
              className="inline-flex items-center gap-1 text-sm transition-colors cursor-pointer py-1"
              style={{
                color: page === "capabilities" || capItems.some(i => i.page === page) ? INK : SLATE,
                fontWeight: page === "capabilities" || capItems.some(i => i.page === page) ? 600 : 400,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Capabilities <ChevronDown size={14} className={`transition-transform duration-200 ${capDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {capDropdownOpen && (
              <div
                className="absolute top-full left-0 w-72 bg-white rounded-lg shadow-xl border border-slate-200/80 py-2 mt-1 z-50 animate-in fade-in duration-150"
                style={{ boxShadow: "0 12px 36px rgba(33,51,67,0.14)" }}
              >
                {capItems.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => {
                      setPage(item.page);
                      setCapDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 transition-colors flex flex-col hover:bg-[#F6F4EF] cursor-pointer ${
                      page === item.page ? "bg-[#58A972]/10 border-l-2 border-[#58A972]" : ""
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-900 font-sans">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                      {item.tag}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setPage("contact")}
            className="text-sm transition-colors cursor-pointer"
            style={{
              color: page === "contact" ? INK : SLATE,
              fontWeight: page === "contact" ? 600 : 400,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Contact
          </button>
        </nav>
        <PrimaryBtn onClick={() => setPage("contact")}>
          Book a Discovery Call
        </PrimaryBtn>
      </div>
    </header>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ setPage }: { setPage: (p: Page) => void }) {
  const cols = [
    { h: "Platform",  links: ["PartBase", "QuoteBase", "ConnectBase", "IntelligenceBase", "SaphranAI", "ScenarioPro"] },
    { h: "Company",   links: ["About"] },
    { h: "Programs",  links: ["Startup Partner Program"] },
    { h: "Legal",     links: ["Privacy Policy", "Terms of Use"] },
  ];
  return (
    <footer
      style={{
        background: INK,
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
      className="pt-16 pb-8"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <button
              onClick={() => setPage("home")}
              className="flex items-center gap-2 mb-4"
            >
              <img src={logoSrc} alt="Saphran" style={{ height: 24, width: "auto", filter: "brightness(0) invert(1)" }} />
            </button>
            <p
              className="text-xs leading-relaxed max-w-[170px]"
              style={{
                color: "rgba(255,255,255,0.32)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Cost forecasting &amp; margin management for ETO manufacturers.
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.h}>
              <p
                className="text-[10px] uppercase tracking-[0.12em] mb-4"
                style={{
                  color: "rgba(255,255,255,0.28)",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {col.h}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    {l === "Startup Partner Program" ? (
                      <button
                        onClick={() => setPage("startup")}
                        className="text-xs transition-colors text-left"
                        style={{ color: "rgba(255,255,255,0.40)", fontFamily: "'Inter', sans-serif" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.72)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.40)"; }}
                      >
                        {l}
                      </button>
                    ) : l === "QuoteBase" ? (
                      <button
                        onClick={() => setPage("quotebase")}
                        className="text-xs transition-colors text-left"
                        style={{ color: "rgba(255,255,255,0.40)", fontFamily: "'Inter', sans-serif" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.72)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.40)"; }}
                      >
                        {l}
                      </button>
                    ) : l === "PartBase" ? (
                      <button
                        onClick={() => setPage("partbase")}
                        className="text-xs transition-colors text-left"
                        style={{ color: "rgba(255,255,255,0.40)", fontFamily: "'Inter', sans-serif" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.72)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.40)"; }}
                      >
                        {l}
                      </button>
                    ) : l === "ConnectBase" ? (
                      <button
                        onClick={() => setPage("connectbase")}
                        className="text-xs transition-colors text-left"
                        style={{ color: "rgba(255,255,255,0.40)", fontFamily: "'Inter', sans-serif" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.72)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.40)"; }}
                      >
                        {l}
                      </button>
                    ) : l === "IntelligenceBase" ? (
                      <button
                        onClick={() => setPage("intelligencebase")}
                        className="text-xs transition-colors text-left"
                        style={{ color: "rgba(255,255,255,0.40)", fontFamily: "'Inter', sans-serif" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.72)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.40)"; }}
                      >
                        {l}
                      </button>
                    ) : l === "SaphranAI" ? (
                      <button
                        onClick={() => setPage("saphranai")}
                        className="text-xs transition-colors text-left"
                        style={{ color: "rgba(255,255,255,0.40)", fontFamily: "'Inter', sans-serif" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.72)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.40)"; }}
                      >
                        {l}
                      </button>
                    ) : l === "ScenarioPro" ? (
                      <button
                        onClick={() => setPage("scenariopro")}
                        className="text-xs transition-colors text-left"
                        style={{ color: "rgba(255,255,255,0.40)", fontFamily: "'Inter', sans-serif" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.72)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.40)"; }}
                      >
                        {l}
                      </button>
                    ) : l === "Privacy Policy" ? (
                      <button
                        onClick={() => setPage("privacypolicy")}
                        className="text-xs transition-colors text-left"
                        style={{ color: "rgba(255,255,255,0.40)", fontFamily: "'Inter', sans-serif" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.72)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.40)"; }}
                      >
                        {l}
                      </button>
                    ) : l === "Terms of Use" ? (
                      <button
                        onClick={() => setPage("termsofuse")}
                        className="text-xs transition-colors text-left"
                        style={{ color: "rgba(255,255,255,0.40)", fontFamily: "'Inter', sans-serif" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.72)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.40)"; }}
                      >
                        {l}
                      </button>
                    ) : l === "About" ? (
                      <button
                        onClick={() => setPage("about")}
                        className="text-xs transition-colors text-left"
                        style={{ color: "rgba(255,255,255,0.40)", fontFamily: "'Inter', sans-serif" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.72)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.40)"; }}
                      >
                        {l}
                      </button>
                    ) : (
                    <a
                      href="#"
                      className="text-xs transition-colors"
                      style={{
                        color: "rgba(255,255,255,0.40)",
                        fontFamily: "'Inter', sans-serif",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          "rgba(255,255,255,0.72)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          "rgba(255,255,255,0.40)";
                      }}
                    >
                      {l}
                    </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p
            className="text-[11px]"
            style={{
              color: "rgba(255,255,255,0.22)",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            © 2024 Saphran Inc. All rights reserved.
          </p>
          <p
            className="text-[11px]"
            style={{
              color: "rgba(255,255,255,0.22)",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            Built for ETO manufacturers worldwide · 20+ countries
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── CTA Band ─────────────────────────────────────────────────────────────────

function CtaBand({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: INK }}>
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 pointer-events-none"
        style={{ opacity: 0.05 }}
      >
        <SwirlMark
          size={440}
          color={GREEN}
          className="animate-spin"
          style={{ animationDuration: "30s" }}
          dark
        />
      </div>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center relative">
        <Eyebrow dark>Get started</Eyebrow>
        <h2
          className="font-extrabold text-white mb-5 leading-[1.06]"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(36px, 4.5vw, 54px)",
            letterSpacing: "-0.022em",
          }}
        >
          Ready to protect your margins?
        </h2>
        <p
          className="max-w-lg mx-auto mb-10 text-[15px] leading-relaxed"
          style={{
            color: "rgba(255,255,255,0.44)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Join manufacturers across 20+ countries using Saphran to forecast
          costs with confidence and win bids on current numbers.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <PrimaryBtn onClick={() => setPage("contact")}>
            Book a Discovery Call <ArrowRight size={14} />
          </PrimaryBtn>
          <OutlineBtn dark onClick={() => setPage("capabilities")}>
            See the Platform
          </OutlineBtn>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ content ──────────────────────────────────────────────────────────────

const homeFaqs = [
  { q: "What is cost forecasting software for ETO manufacturers?", a: "Cost forecasting software for engineer-to-order manufacturers predicts material, labour, and program costs in volatile markets so sales, finance, and program teams can price bids and manage margin with current data instead of static spreadsheets. Saphran is built specifically for this use case." },
  { q: "How is Saphran different from spreadsheet-based cost forecasting?", a: "Spreadsheets rely on manually updated, siloed data that goes stale as soon as costs shift. Saphran connects directly to a manufacturer's ERP, PLM, and market data sources to keep cost and margin models current in real time — replacing manual updates with a single always-current source of truth." },
  { q: "Does Saphran replace our ERP or PLM system?", a: "No. Saphran is designed to sit on top of any existing ERP, CRM, or PLM system — including SAP, Oracle ERP, Salesforce CRM, Aras PLM, QAD, and proprietary internal databases — connecting their data into one decision layer without requiring a system migration or replacement." },
  { q: "What industries use Saphran?", a: "Saphran is built for engineer-to-order manufacturers, including Tier 1, Tier 2, and Tier 3 automotive suppliers and other complex manufacturing businesses managing volatile input costs, custom program bids, and multi-plant operations." },
];

const capFaqs = [
  { q: "What systems does Saphran integrate with?", a: "Saphran's ConnectBase layer connects seamlessly to any ERP, CRM, or PLM system — including SAP, Oracle ERP, Salesforce CRM, Aras PLM, QAD, and custom databases — as well as live market data feeds. Integration does not require changes to existing systems or data migration." },
  { q: "How does SaphranAI improve forecast accuracy?", a: "SaphranAI analyses historical program cost patterns, current market data, and input cost trends to identify and correct systematic forecast biases. In documented deployments this has improved forecast accuracy by +10% year-over-year." },
  { q: "Can Saphran handle multi-plant, multi-currency operations?", a: "Yes. Saphran is architected for global ETO manufacturers with operations across multiple plants, geographies, and currencies. The platform supports 20+ countries and handles currency-adjusted cost modelling natively." },
];

const contactFaqs = [
  { q: "What happens on the discovery call?", a: "A 30-minute walkthrough of your specific use case — cost forecasting, RFQ response, or margin management. We'll show how Saphran connects to your existing ERP or PLM and what a deployment looks like for your operation." },
  { q: "Do I need to prepare anything?", a: "No preparation required. It helps to share a rough description of your current cost forecasting process and which systems you run — but we can gather that on the call." },
  { q: "Is this a sales pitch or a real evaluation?", a: "It's a real evaluation. We don't run generic product demos — every call is scoped to your manufacturing context. If Saphran isn't the right fit, we'll tell you." },
  { q: "How long does a Saphran deployment take?", a: "A typical initial deployment — connecting your primary ERP and activating QuoteBase and PartBase — takes 8–12 weeks. Full platform rollout including SaphranAI depends on the number of systems and plants involved." },
];

// ─── Home Page ────────────────────────────────────────────────────────────────

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  const [activeHomeTab, setActiveHomeTab] = useState(0);
  const homeTraps = [
    {
      problem: "The Volatility Trap",
      problemDesc: "Costs that shift faster than your forecasts — steel, components, freight — leaving bids priced on last quarter's reality.",
      solution: "Forecast Cost Shifts in Real Time",
      solutionDesc: "Saphran connects live market feeds and ERP data so cost models update before a bid goes out — not after margin is already lost.",
    },
    {
      problem: "The Bid Pressure Trap",
      problemDesc: "Sales teams submit aggressive bids to win — without visibility into true program margins. You win the contract and lose the profit.",
      solution: "Win Bids Without Sacrificing Margin",
      solutionDesc: "Quote complex RFQs in days, not weeks. Every bid is modelled against current and future costs with margin thresholds that flag risk before you commit.",
    },
    {
      problem: "The Disconnected Systems Trap",
      problemDesc: "Cost data lives in separate spreadsheets, ERP exports, and email threads. One stale number cascades across an entire program.",
      solution: "One Source of Truth Across Every System",
      solutionDesc: "ConnectBase integrates with any ERP, CRM, or PLM system — including SAP, Oracle, Salesforce, Aras, and custom internal databases — into a single live decision layer with no migration required.",
    },
    {
      problem: "The Visibility Gap",
      problemDesc: "Finance, sales, and program managers work from different versions of the cost picture. By the time someone notices margin erosion, it's too late.",
      solution: "Margin Visibility Before It's a Problem",
      solutionDesc: "IntelligenceBase delivers real-time dashboards and automatic alerts the moment a cost variance crosses your defined margin threshold.",
    },
  ];

  return (
    <>
      {/* 1. Hero — white, navy headline */}
      <section
        className="relative overflow-hidden pt-32 pb-20"
        style={{ background: "#fff" }}
      >
        {/* Swirl: faint green on white, off-canvas right */}
        <div
          className="absolute pointer-events-none select-none"
          style={{
            right: "-8%",
            top: "50%",
            transform: "translateY(-50%)",
            opacity: 0.055,
          }}
        >
          <SwirlMark
            size={520}
            color={GREEN}
            className="animate-spin"
            style={{ animationDuration: "32s" }}
          />
        </div>

        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            <div>
              <h1
                className="font-extrabold leading-[1.03] mb-6"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(34px, 4.5vw, 60px)",
                  letterSpacing: "-0.024em",
                  color: INK,
                }}
              >
                Real-Time Cost &amp; Margin Management for ETO Manufacturers
              </h1>
              <p
                className="text-[15px] leading-relaxed mb-8 max-w-[500px]"
                style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}
              >
                Saphran unifies your ERP, PLM, and CRM data into one live decision layer — so every bid, forecast, and pricing call is grounded in current numbers, not last quarter&apos;s spreadsheet.
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <PrimaryBtn onClick={() => setPage("contact")}>
                  Book a Discovery Call <ArrowRight size={14} />
                </PrimaryBtn>
                <OutlineBtn onClick={() => {
                  const el = document.getElementById("margin-traps-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}>
                  See how it works
                </OutlineBtn>
              </div>
            </div>
            <div>
              <HeroMockup setPage={setPage} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stat row — plain numbers on white, thin dividers */}
      <section
        style={{
          background: "#fff",
          borderTop: "1px solid rgba(33,51,67,0.07)",
          borderBottom: "1px solid rgba(33,51,67,0.07)",
        }}
        className="py-14"
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { to: 10,  pre: "+", suf: "%",  label: "Improvement in forecasting accuracy" },
              { to: 8.2, pre: "$", suf: "M+", label: "In documented freight savings" },
              { to: 20,  pre: "",  suf: "+",  label: "Countries supported globally" },
              { to: 46,  pre: "$", suf: "M+", label: "Annual business impact, Tier 1 supplier" },
            ].map((s, i) => (
              <div
                key={i}
                className="px-8 py-4"
                style={{
                  borderLeft:
                    i > 0
                      ? "1px solid rgba(33,51,67,0.10)"
                      : undefined,
                }}
              >
                <p
                  className="text-[40px] font-bold leading-none mb-2"
                  style={{ color: INK }}
                >
                  <CountUp to={s.to} prefix={s.pre} suffix={s.suf} />
                </p>
                <p
                  className="text-[12px] leading-snug"
                  style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Integration row */}
          <div
            className="mt-10 pt-8 flex flex-col md:flex-row items-center gap-5"
            style={{ borderTop: "1px solid rgba(33,51,67,0.07)" }}
          >
            <p
              className="text-[10px] uppercase tracking-[0.14em] shrink-0"
              style={{ color: SLATE, fontFamily: "'JetBrains Mono', monospace" }}
            >
              Works with
            </p>
            <div className="flex flex-wrap items-center gap-6 md:gap-10">
              {[
                "SAP ERP",
                "Oracle ERP",
                "Salesforce CRM",
                "Aras PLM",
                "Any ERP / CRM / PLM",
                "Market Data Feeds",
              ].map((s) => (
                <span
                  key={s}
                  className="text-[12px] font-semibold cursor-default transition-colors"
                  style={{
                    color: "rgba(33,51,67,0.22)",
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(33,51,67,0.55)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(33,51,67,0.22)";
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pain → Solution (Redesigned Tab Panel) */}
      <section id="margin-traps-section" className="py-24" style={{ background: BONE }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="mb-12 max-w-lg">
            <Eyebrow>The challenge</Eyebrow>
            <h2
              className="font-bold leading-[1.12]"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(28px, 3.2vw, 40px)",
                letterSpacing: "-0.02em",
                color: INK,
              }}
            >
              ETO manufacturers face the same margin traps. Saphran closes them.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-8 items-start">
            {/* Tabs sidebar */}
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-2.5">
              {[
                "Volatility Trap",
                "Bid Pressure Trap",
                "Disconnected Silos",
                "Visibility Gap"
              ].map((name, i) => (
                <button
                  key={i}
                  onClick={() => setActiveHomeTab(i)}
                  className={`px-4 py-3.5 rounded text-left text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 border whitespace-nowrap lg:whitespace-normal ${
                    activeHomeTab === i
                      ? "bg-[#2d4356] border-emerald-500/30 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>

            {/* Comparison Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-lg shadow-sm border border-slate-100">
              {/* Challenge Panel */}
              <div className="p-6 bg-[#fcfaf7] border border-[#f5eae1] rounded-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-4 text-[#C4473A]">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "rgba(196,71,58,0.10)", border: "1px solid rgba(196,71,58,0.22)" }}
                    >
                      <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                        <path d="M1 1l5 5M6 1L1 6" stroke="#C4473A" strokeWidth="1.4" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <span className="font-bold text-[10px] uppercase tracking-wider font-mono">The Trap</span>
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-slate-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {homeTraps[activeHomeTab].problem}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-550" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {homeTraps[activeHomeTab].problemDesc}
                  </p>
                </div>
              </div>

              {/* Solution Panel */}
              <div className="p-6 bg-[#f7faf8] border border-emerald-100 rounded-lg flex flex-col justify-between" style={{ borderLeftWidth: "4px", borderLeftColor: GREEN }}>
                <div>
                  <div className="flex items-center gap-2.5 mb-4 text-[#58A972]">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${GREEN}18`, border: `1px solid ${GREEN}40` }}
                    >
                      <Check size={8} style={{ color: GREEN }} strokeWidth={3} />
                    </div>
                    <span className="font-bold text-[10px] uppercase tracking-wider font-mono">Saphran Solution</span>
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-slate-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {homeTraps[activeHomeTab].solution}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-650" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {homeTraps[activeHomeTab].solutionDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Self-qualification */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="mb-10 max-w-lg">
            <Eyebrow>Who Saphran is built for</Eyebrow>
            <h2
              className="font-bold leading-[1.12]"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(24px, 2.8vw, 36px)",
                letterSpacing: "-0.02em",
                color: INK,
              }}
            >
              Is this for you?
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                sector: "Tier 1 & Tier 2 Automotive Suppliers",
                desc: "Managing program margins across multi-plant, multi-currency operations with volatile input costs.",
              },
              {
                sector: "Custom Equipment Builders",
                desc: "Quoting complex, one-off projects where every BOM is unique and cost certainty determines profitability.",
              },
              {
                sector: "Heavy Industrial ETO Manufacturers",
                desc: "Running long-cycle programs where a 2% cost shift at bid stage can erase margin at delivery.",
              },
              {
                sector: "Engineered-to-Order OEMs",
                desc: "Coordinating cost across engineering, procurement, and finance without a single connected data layer.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-[5px] p-5 flex flex-col"
                style={{ background: BONE, border: "1px solid rgba(33,51,67,0.09)" }}
              >
                <div className="w-4 h-px mb-4" style={{ background: GREEN }} />
                <p
                  className="text-sm font-semibold mb-2 leading-snug"
                  style={{ color: INK, fontFamily: "'Inter', sans-serif" }}
                >
                  {s.sector}
                </p>
                <p
                  className="text-xs leading-relaxed flex-1"
                  style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
          <p
            className="text-xs mt-6 italic"
            style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}
          >
            If your business builds complex, configured products to customer specification and cost certainty matters to margin — Saphran is built for you.
          </p>
        </div>
      </section>

      {/* 5. Architecture — THE deliberate dark section on Home */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: INK }}
      >
        <div
          className="absolute left-0 top-0 pointer-events-none"
          style={{ opacity: 0.04 }}
        >
          <SwirlMark
            size={360}
            color={GREEN}
            className="animate-spin"
            style={{ animationDuration: "42s", marginLeft: -80, marginTop: 20 }}
            dark
          />
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative">
          <div className="mb-10">
            <Eyebrow dark>Platform lifecycle</Eyebrow>
            <h2
              className="font-bold text-white max-w-lg leading-[1.12]"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(24px, 2.8vw, 36px)",
                letterSpacing: "-0.02em",
              }}
            >
              How teams utilise Saphran across the program lifecycle.
            </h2>
          </div>
          <ArchFlow />
        </div>
      </section>

      {/* 5. Feature rows */}
      {[
        {
          eyebrow: "SaphranAI",
          headline: "How SaphranAI reduces forecasting bias in ETO manufacturing.",
          body: "SaphranAI analyses historical program data, current market feeds, and cost patterns to detect and correct systematic forecasting biases — before they influence a bid or pricing decision.",
          mockup: <ScenarioMockup />,
          flip: false,
          bg: "#fff",
        },
        {
          eyebrow: "ConnectBase",
          headline: "Unified integration across your legacy stack.",
          body: "Saphran connects to any ERP, CRM, or PLM system — including SAP, Oracle ERP, Salesforce CRM, Aras PLM, and live market data feeds — without replacing any of them, so cost, margin, and forecasting decisions are made on one current, reliable view.",
          ctaText: "Explore ConnectBase",
          page: "connectbase",
          mockup: <IntegrationMockup />,
          flip: true,
          bg: BONE,
        },
        {
          eyebrow: "QuoteBase",
          headline: "Cut RFQ response time from weeks to days.",
          body: "QuoteBase generates cost and margin models during RFQ response, pulling live data from connected systems so engineers and sales teams build quotes on current numbers — not last month's spreadsheet.",
          mockup: <QuotingMockup />,
          flip: false,
          bg: "#fff",
        },
      ].map((row, i) => (
        <section key={i} className="py-24" style={{ background: row.bg }}>
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div
              className={`grid md:grid-cols-2 gap-12 lg:gap-16 items-center ${
                row.flip ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div>
                <Eyebrow>{row.eyebrow}</Eyebrow>
                <h2
                  className="font-bold leading-[1.12] mb-5"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "clamp(22px, 2.6vw, 34px)",
                    letterSpacing: "-0.02em",
                    color: INK,
                  }}
                >
                  {row.headline}
                </h2>
                <p
                  className="text-[15px] leading-relaxed mb-7"
                  style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}
                >
                  {row.body}
                </p>
                <OutlineBtn onClick={() => setPage((row.page as Page) || "capabilities")}>
                  {row.ctaText || "Learn more"} <ArrowRight size={13} />
                </OutlineBtn>
              </div>
              <div>{row.mockup}</div>
            </div>
          </div>
        </section>
      ))}

      {/* 6. Case study */}
      <section className="py-24" style={{ background: BONE }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <Eyebrow>Impact</Eyebrow>
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">
            <h2
              className="font-extrabold leading-[1.04]"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(34px, 4.2vw, 56px)",
                letterSpacing: "-0.025em",
                color: INK,
              }}
            >
              $46M+ annual business impact at a Tier&nbsp;1 automotive supplier.
            </h2>
            <div>
              <p
                className="text-[15px] leading-relaxed mb-8"
                style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}
              >
                A Tier 1 automotive supplier managing program costs across
                disconnected spreadsheets deployed Saphran to unify cost
                forecasting, RFQ response, and margin management in a single
                decision layer across multiple plants and 20+ countries.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { to: 8.2, pre: "$", suf: "M",  label: "Freight cost savings" },
                  { to: 10,  pre: "+", suf: "%",  label: "Forecast accuracy improvement" },
                  { to: 46,  pre: "$", suf: "M+", label: "Total annual impact" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="pl-5"
                    style={{ borderLeft: `2px solid ${GREEN}45` }}
                  >
                    <p
                      className="text-[30px] font-bold mb-1"
                      style={{ color: INK }}
                    >
                      <CountUp to={s.to} prefix={s.pre} suffix={s.suf} />
                    </p>
                    <p
                      className="text-xs leading-relaxed"
                      style={{
                        color: SLATE,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-[240px_1fr] gap-16">
            <div>
              <Eyebrow>Common questions</Eyebrow>
              <h2
                className="font-bold leading-[1.18]"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(20px, 2.2vw, 28px)",
                  letterSpacing: "-0.018em",
                  color: INK,
                }}
              >
                Frequently asked questions.
              </h2>
            </div>
            <div>
              {homeFaqs.map((f, i) => (
                <FaqItem key={i} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand setPage={setPage} />
    </>
  );
}

// ─── Capabilities Page ────────────────────────────────────────────────────────

function CapabilitiesPage({ setPage }: { setPage: (p: Page) => void }) {
  const [form, setForm] = useState({
    name: "", email: "", company: "", role: "", challenge: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("done"), 1800);
  }

  const fieldBase: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    background: BONE,
    color: GRAPHITE,
    border: "1px solid rgba(33,51,67,0.13)",
    borderRadius: 4,
    fontSize: 13,
    width: "100%",
    padding: "10px 12px",
    outline: "none",
    transition: "border-color 0.15s, background 0.15s",
  };

  return (
    <>
      <section
        className="pt-32 pb-20 relative overflow-hidden"
        style={{ background: "#fff" }}
      >
        <div
          className="absolute pointer-events-none select-none"
          style={{
            right: "-8%",
            top: "50%",
            transform: "translateY(-50%)",
            opacity: 0.055,
          }}
        >
          <SwirlMark
            size={480}
            color={GREEN}
            className="animate-spin"
            style={{ animationDuration: "32s" }}
          />
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
            <div>
              <Eyebrow>Platform</Eyebrow>
              <h1
                className="font-extrabold leading-[1.03] mb-6"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(34px, 4.2vw, 56px)",
                  letterSpacing: "-0.024em",
                  color: INK,
                }}
              >
                One decision layer across every system you already run.
              </h1>
              <p
                className="text-[15px] leading-relaxed mb-8 max-w-xl"
                style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}
              >
                Saphran connects to any ERP, CRM, or PLM system — including SAP, Oracle ERP,
                Salesforce CRM, Aras PLM, and live market data feeds — without replacing any of them,
                so cost, margin, and forecasting decisions are made on one current, reliable
                view of the business.
              </p>
              <div className="flex gap-3 flex-wrap">
                <OutlineBtn onClick={() => {
                  const el = document.getElementById("platform-modules-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}>
                  Explore platform modules
                </OutlineBtn>
              </div>
            </div>

            {/* Discovery Form Card */}
            <div
              className="rounded-[6px] p-8 bg-white text-left relative z-10"
              style={{
                border: "1px solid rgba(33,51,67,0.10)",
                boxShadow: "0 2px 16px rgba(33,51,67,0.06)",
              }}
            >
              {status === "submitting" ? (
                <div className="flex flex-col items-center justify-center py-14 gap-4">
                  <SwirlMark
                    size={40}
                    color={GREEN}
                    className="animate-spin"
                    style={{ animationDuration: "1.2s" }}
                  />
                  <p
                    className="text-sm animate-pulse"
                    style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}
                  >
                    Sending your request…
                  </p>
                </div>
              ) : status === "done" ? (
                <div className="text-center py-12">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{
                      background: `${GREEN}14`,
                      border: `1px solid ${GREEN}40`,
                    }}
                  >
                    <Check size={18} style={{ color: GREEN }} />
                  </div>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      color: INK,
                    }}
                  >
                    Request received.
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: SLATE,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    We&apos;ll be in touch within one business day to schedule
                    your discovery call.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2
                    className="text-lg font-bold mb-5"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      color: INK,
                    }}
                  >
                    Book a Discovery Call
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Name",       key: "name",  placeholder: "Alex Chen",        type: "text"  },
                      { label: "Work Email", key: "email", placeholder: "alex@company.com", type: "email" },
                    ].map((f) => (
                      <div key={f.key}>
                        <label
                          className="block text-[11px] font-medium mb-1.5"
                          style={{
                            color: GRAPHITE,
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          {f.label}
                        </label>
                        <input
                          type={f.type}
                          placeholder={f.placeholder}
                          required
                          value={form[f.key as keyof typeof form]}
                          onChange={(e) =>
                            setForm({ ...form, [f.key]: e.target.value })
                          }
                          style={fieldBase}
                          onFocus={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = GREEN;
                            (e.currentTarget as HTMLElement).style.background = "#fff";
                          }}
                          onBlur={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = "rgba(33,51,67,0.13)";
                            (e.currentTarget as HTMLElement).style.background = BONE;
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  {[
                    { label: "Company", key: "company", placeholder: "Acme Manufacturing" },
                    { label: "Role",    key: "role",    placeholder: "VP Finance, Director of Program Management…" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label
                        className="block text-[11px] font-medium mb-1.5"
                        style={{
                          color: GRAPHITE,
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {f.label}
                      </label>
                      <input
                        type="text"
                        placeholder={f.placeholder}
                        value={form[f.key as keyof typeof form]}
                        onChange={(e) =>
                          setForm({ ...form, [f.key]: e.target.value })
                        }
                        style={fieldBase}
                        onFocus={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = GREEN;
                          (e.currentTarget as HTMLElement).style.background = "#fff";
                        }}
                        onBlur={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "rgba(33,51,67,0.13)";
                          (e.currentTarget as HTMLElement).style.background = BONE;
                        }}
                      />
                    </div>
                  ))}
                  <div>
                    <label
                      className="block text-[11px] font-medium mb-1.5"
                      style={{
                        color: GRAPHITE,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      What&apos;s your biggest challenge?
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Freight volatility, stale quoting data, silos..."
                      value={form.challenge}
                      onChange={(e) =>
                        setForm({ ...form, challenge: e.target.value })
                      }
                      style={{ ...fieldBase, resize: "none" }}
                      onFocus={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = GREEN;
                        (e.currentTarget as HTMLElement).style.background = "#fff";
                      }}
                      onBlur={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(33,51,67,0.13)";
                        (e.currentTarget as HTMLElement).style.background = BONE;
                      }}
                    />
                  </div>
                  <PrimaryBtn full type="submit">
                    Book a Discovery Call <ArrowRight size={14} />
                  </PrimaryBtn>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          background: BONE,
          borderTop: "1px solid rgba(33,51,67,0.07)",
          borderBottom: "1px solid rgba(33,51,67,0.07)",
        }}
        className="py-10"
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center gap-5">
          <p
            className="text-[10px] uppercase tracking-[0.14em] shrink-0"
            style={{ color: SLATE, fontFamily: "'JetBrains Mono', monospace" }}
          >
            Native integrations
          </p>
          <div className="flex flex-wrap items-center gap-6 md:gap-10">
            {[
              "SAP ERP",
              "Oracle ERP",
              "Salesforce CRM",
              "Aras PLM",
              "Any ERP / CRM / PLM",
              "Market Data Feeds",
            ].map((s) => (
              <span
                key={s}
                className="text-[12px] font-semibold cursor-default transition-colors"
                style={{
                  color: "rgba(33,51,67,0.24)",
                  fontFamily: "'Inter', sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "rgba(33,51,67,0.60)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "rgba(33,51,67,0.24)";
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="platform-modules-section" className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <Eyebrow>Saphran Cloud Platform</Eyebrow>
            <h2
              className="font-bold leading-[1.12]"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(26px, 3vw, 38px)",
                letterSpacing: "-0.02em",
                color: INK,
              }}
            >
              Five integrated modules. One coherent cost view.
            </h2>
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-px"
            style={{ background: "rgba(33,51,67,0.08)" }}
          >
            {[
              { name: "PartBase",          desc: "Single reliable source for component costs across programs and plants.", page: "partbase" },
              { name: "QuoteBase",         desc: "Generate cost and margin models during RFQ response, in days not weeks.", page: "quotebase" },
              { name: "ConnectBase",       desc: "Pull data from ERP, PLM, CRM, and market feeds into Saphran without migration.", page: "connectbase" },
              { name: "IntelligenceBase",  desc: "Executive-ready dashboards, alerts, and margin visibility across the business.", page: "intelligencebase" },
              { name: "ScenarioPro",       desc: "Run rapid what-if cost and margin scenarios before committing to any bid.", page: "scenariopro" },
            ].map((m, i) => (
              <div key={i} className="bg-white p-6 flex flex-col justify-between min-h-[200px]">
                <div>
                  <div className="w-4 h-px mb-5" style={{ background: GREEN }} />
                  <p
                    className="text-sm font-bold mb-3"
                    style={{
                      color: INK,
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {m.name}
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}
                  >
                    {m.desc}
                  </p>
                </div>
                <div className="mt-5">
                  <button
                    onClick={() => setPage(m.page as Page)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold transition-colors uppercase tracking-wider font-mono hover:underline"
                    style={{ color: GREEN }}
                  >
                    Learn More <ArrowRight size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: BONE }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-start">
            <div>
              <Eyebrow>Decision Outputs</Eyebrow>
              <h2
                className="font-bold leading-[1.12]"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(24px, 2.6vw, 34px)",
                  letterSpacing: "-0.02em",
                  color: INK,
                }}
              >
                From connected data to confident decisions.
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { icon: <BarChart2 size={15} />, name: "Scenario Analysis",     desc: "Run multiple cost and pricing scenarios side-by-side before any commitment." },
                { icon: <TrendingUp size={15} />, name: "Margin Forecasts",     desc: "Real-time margin visibility across programs, plants, and geographies." },
                { icon: <Cpu size={15} />,        name: "Cost Simulations",     desc: "Model input cost changes — steel, freight, labour — against live program margins." },
                { icon: <Layers size={15} />,     name: "Executive Dashboards", desc: "Board-ready views of margin health, forecast accuracy, and RFQ pipeline." },
                { icon: <Shield size={15} />,     name: "Alerts",               desc: "Automatic flags when cost variances exceed defined margin thresholds." },
                { icon: <Globe2 size={15} />,     name: "Global Operations",    desc: "Multi-plant, multi-currency cost management across 20+ countries." },
              ].map((o, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[4px] p-5"
                  style={{ border: "1px solid rgba(33,51,67,0.09)" }}
                >
                  <div className="mb-3" style={{ color: GREEN }}>
                    {o.icon}
                  </div>
                  <p
                    className="text-sm font-semibold mb-1.5"
                    style={{ color: INK, fontFamily: "'Inter', sans-serif" }}
                  >
                    {o.name}
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}
                  >
                    {o.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SaphranAI — dark section */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: INK }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <Eyebrow dark>SaphranAI</Eyebrow>
              <h2
                className="font-bold text-white leading-[1.12] mb-6"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(24px, 2.6vw, 34px)",
                  letterSpacing: "-0.02em",
                }}
              >
                How SaphranAI reduces forecasting bias in ETO manufacturing.
              </h2>
              <p
                className="text-[15px] leading-relaxed mb-8"
                style={{
                  color: "rgba(255,255,255,0.44)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                SaphranAI analyses historical program data, current market
                feeds, and cost patterns to detect and correct systematic
                forecasting biases — before they influence a bid or pricing
                decision.
              </p>
              <ul className="space-y-4">
                {[
                  "Detects historical bias patterns across programs and plants",
                  "Adjusts real-time cost models before RFQ submission",
                  "Flags margin risk scenarios automatically",
                  "Integrates with ScenarioPro for AI-driven what-if analysis",
                ].map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        background: `${GREEN}22`,
                        border: `1px solid ${GREEN}50`,
                      }}
                    >
                      <Check size={7} style={{ color: GREEN_TINT }} />
                    </div>
                    <span
                      className="text-sm leading-relaxed"
                      style={{
                        color: "rgba(255,255,255,0.52)",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { to: 10,   pre: "+", suf: "%",  label: "Improvement in forecast accuracy" },
                { to: 8.2,  pre: "$", suf: "M+", label: "Documented freight savings" },
                { to: 94.7, pre: "",  suf: "%",  label: "Model accuracy in pilot deployment" },
                { to: 2,    pre: "<", suf: "d",  label: "Average RFQ response with SaphranAI" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="rounded-[4px] p-5"
                  style={{ border: "1px solid rgba(255,255,255,0.10)" }}
                >
                  <p className="text-[28px] font-bold text-white mb-1">
                    <CountUp to={s.to} prefix={s.pre} suffix={s.suf} />
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{
                      color: "rgba(255,255,255,0.32)",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <Eyebrow>Case study</Eyebrow>
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">
            <div>
              <h2
                className="font-extrabold leading-[1.04] mb-3"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(32px, 4vw, 52px)",
                  letterSpacing: "-0.025em",
                  color: INK,
                }}
              >
                $46M+ annual business impact.
              </h2>
              <p
                className="text-xs uppercase tracking-wider"
                style={{
                  color: SLATE,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                Tier&nbsp;1 Automotive Supplier · Global · 20+ countries
              </p>
            </div>
            <div>
              <div className="grid grid-cols-3 gap-6 mb-10">
                {[
                  { to: 8.2, pre: "$", suf: "M",  label: "Freight cost savings" },
                  { to: 10,  pre: "+", suf: "%",  label: "Forecast accuracy improvement" },
                  { to: 46,  pre: "$", suf: "M+", label: "Total annual impact" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="pl-5"
                    style={{ borderLeft: `2px solid ${GREEN}40` }}
                  >
                    <p
                      className="text-[28px] font-bold mb-1"
                      style={{ color: INK }}
                    >
                      <CountUp to={s.to} prefix={s.pre} suffix={s.suf} />
                    </p>
                    <p
                      className="text-xs leading-relaxed"
                      style={{
                        color: SLATE,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { tag: "Challenge", text: "Managing program costs across disconnected spreadsheets and siloed ERP data, with no unified view of margin across plants and geographies." },
                  { tag: "Solution",  text: "Deployed Saphran's full platform — PartBase, QuoteBase, ConnectBase, and IntelligenceBase — connecting SAP and Oracle into a single decision layer." },
                  { tag: "Impact",    text: "$46M+ annual business impact including $8.2M in documented freight savings and +10% forecast accuracy improvement." },
                ].map((c, i) => (
                  <div key={i}>
                    <p
                      className="text-[10px] uppercase tracking-[0.13em] mb-3"
                      style={{
                        color: GREEN,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {c.tag}
                    </p>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}
                    >
                      {c.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: BONE }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-[240px_1fr] gap-16">
            <div>
              <Eyebrow>Platform FAQ</Eyebrow>
              <h2
                className="font-bold leading-[1.18]"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(20px, 2.2vw, 26px)",
                  letterSpacing: "-0.018em",
                  color: INK,
                }}
              >
                Questions about the platform.
              </h2>
            </div>
            <div>
              {capFaqs.map((f, i) => (
                <FaqItem key={i} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand setPage={setPage} />
    </>
  );
}

// ─── Reusable Discovery Call Form Component ───────────────────────────────────

function DiscoveryCallForm({ dark = false }: { dark?: boolean }) {
  const [form, setForm] = useState({
    name: "", email: "", company: "", role: "", challenge: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("done"), 1500);
  }

  const fieldBase = {
    fontFamily: "'Inter', sans-serif",
    fontSize: "13px",
    background: dark ? "rgba(255,255,255,0.06)" : BONE,
    border: dark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(33,51,67,0.13)",
    borderRadius: "4px",
    padding: "10px 12px",
    color: dark ? "#fff" : INK,
    outline: "none",
    width: "100%",
    transition: "border-color 0.15s, background 0.15s",
  };

  return (
    <div
      className={`rounded-[8px] p-6 lg:p-8 ${dark ? "bg-[#0b1623] text-white" : "bg-white text-slate-900"}`}
      style={{
        border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(33,51,67,0.10)",
        boxShadow: dark ? "0 4px 24px rgba(0,0,0,0.35)" : "0 2px 16px rgba(33,51,67,0.06)",
      }}
    >
      {status === "submitting" ? (
        <div className="flex flex-col items-center justify-center py-14 gap-4">
          <SwirlMark
            size={40}
            color={GREEN}
            className="animate-spin"
            style={{ animationDuration: "1.2s" }}
          />
          <p
            className="text-sm"
            style={{ color: dark ? "rgba(255,255,255,0.8)" : SLATE, fontFamily: "'Inter', sans-serif" }}
          >
            Sending your request…
          </p>
        </div>
      ) : status === "done" ? (
        <div className="text-center py-12">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{
              background: `${GREEN}14`,
              border: `1px solid ${GREEN}40`,
            }}
          >
            <Check size={18} style={{ color: GREEN }} />
          </div>
          <h3
            className="text-xl font-bold mb-2"
            style={{
              fontFamily: "'Poppins', sans-serif",
              color: dark ? "#fff" : INK,
            }}
          >
            Request received.
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{
              color: dark ? "rgba(255,255,255,0.7)" : SLATE,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            We&apos;ll be in touch within one business day to schedule your discovery call.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2
            className="text-lg font-bold mb-4"
            style={{
              fontFamily: "'Poppins', sans-serif",
              color: dark ? "#fff" : INK,
            }}
          >
            Book a Discovery Call
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Name",       key: "name",  placeholder: "Alex Chen",        type: "text"  },
              { label: "Work Email", key: "email", placeholder: "alex@company.com", type: "email" },
            ].map((f) => (
              <div key={f.key}>
                <label
                  className="block text-[11px] font-medium mb-1.5"
                  style={{
                    color: dark ? "rgba(255,255,255,0.8)" : GRAPHITE,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {f.label}
                </label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  required
                  value={form[f.key as keyof typeof form]}
                  onChange={(e) =>
                    setForm({ ...form, [f.key]: e.target.value })
                  }
                  style={fieldBase}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = GREEN;
                    (e.currentTarget as HTMLElement).style.background = dark ? "rgba(255,255,255,0.1)" : "#fff";
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = dark ? "rgba(255,255,255,0.15)" : "rgba(33,51,67,0.13)";
                    (e.currentTarget as HTMLElement).style.background = dark ? "rgba(255,255,255,0.06)" : BONE;
                  }}
                />
              </div>
            ))}
          </div>
          {[
            { label: "Company", key: "company", placeholder: "Acme Manufacturing" },
            { label: "Role",    key: "role",    placeholder: "VP Finance, Director of Planning…" },
          ].map((f) => (
            <div key={f.key}>
              <label
                className="block text-[11px] font-medium mb-1.5"
                style={{
                  color: dark ? "rgba(255,255,255,0.8)" : GRAPHITE,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {f.label}
              </label>
              <input
                type="text"
                placeholder={f.placeholder}
                value={form[f.key as keyof typeof form]}
                onChange={(e) =>
                  setForm({ ...form, [f.key]: e.target.value })
                }
                style={fieldBase}
                onFocus={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = GREEN;
                  (e.currentTarget as HTMLElement).style.background = dark ? "rgba(255,255,255,0.1)" : "#fff";
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = dark ? "rgba(255,255,255,0.15)" : "rgba(33,51,67,0.13)";
                  (e.currentTarget as HTMLElement).style.background = dark ? "rgba(255,255,255,0.06)" : BONE;
                }}
              />
            </div>
          ))}
          <div>
            <label
              className="block text-[11px] font-medium mb-1.5"
              style={{
                color: dark ? "rgba(255,255,255,0.8)" : GRAPHITE,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              What&apos;s your biggest cost or margin challenge right now?
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Our freight costs are unpredictable and we're pricing bids on 6-month-old data…"
              value={form.challenge}
              onChange={(e) =>
                setForm({ ...form, challenge: e.target.value })
              }
              style={{ ...fieldBase, resize: "none" }}
              onFocus={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = GREEN;
                (e.currentTarget as HTMLElement).style.background = dark ? "rgba(255,255,255,0.1)" : "#fff";
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = dark ? "rgba(255,255,255,0.15)" : "rgba(33,51,67,0.13)";
                (e.currentTarget as HTMLElement).style.background = dark ? "rgba(255,255,255,0.06)" : BONE;
              }}
            />
          </div>
          <PrimaryBtn full type="submit">
            Book a Discovery Call <ArrowRight size={14} />
          </PrimaryBtn>
          <p
            className="text-[10px] text-center"
            style={{ color: dark ? "rgba(255,255,255,0.6)" : SLATE, fontFamily: "'Inter', sans-serif" }}
          >
            We&apos;ll respond within one business day. No commitment required.
          </p>
        </form>
      )}
    </div>
  );
}

// ─── Contact Page ─────────────────────────────────────────────────────────────

type FormStatus = "idle" | "submitting" | "done";

function ContactPage({ setPage }: { setPage: (p: Page) => void }) {
  const [form, setForm] = useState({
    name: "", email: "", company: "", role: "", challenge: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("done"), 1800);
  }

  const fieldBase: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    background: BONE,
    color: GRAPHITE,
    border: "1px solid rgba(33,51,67,0.13)",
    borderRadius: 4,
    fontSize: 13,
    width: "100%",
    padding: "10px 12px",
    outline: "none",
    transition: "border-color 0.15s, background 0.15s",
  };

  return (
    <>
      <section className="pt-32 pb-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="pt-4">
              <Eyebrow>Talk to Saphran</Eyebrow>
              <h1
                className="font-bold leading-[1.1] mb-5"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(30px, 3.8vw, 50px)",
                  letterSpacing: "-0.02em",
                  color: INK,
                }}
              >
                See how Saphran fits your systems.
              </h1>
              <p
                className="text-[15px] leading-relaxed mb-10"
                style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}
              >
                No commitment. A 30-minute walkthrough scoped to your actual
                manufacturing use case — not a generic software demo.
              </p>
              <ul className="space-y-5 mb-10">
                {[
                  "A 30-minute walkthrough scoped to your actual use case",
                  "See how Saphran connects to your existing ERP and PLM without a migration",
                  "Talk to someone who understands ETO manufacturing, not a generic SDR script",
                ].map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        background: `${GREEN}12`,
                        border: `1px solid ${GREEN}38`,
                      }}
                    >
                      <Check size={8} style={{ color: GREEN }} />
                    </div>
                    <span
                      className="text-sm leading-relaxed"
                      style={{
                        color: GRAPHITE,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
              <div
                className="pl-5"
                style={{ borderLeft: `2px solid ${GREEN}38` }}
              >
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}
                >
                  <span
                    className="font-medium"
                    style={{ color: INK }}
                  >
                    Works with your existing stack.
                  </span>{" "}
                  SAP, Oracle ERP, Salesforce CRM, Aras PLM, or any legacy ERP, CRM, or PLM — Saphran connects
                  without replacing any of them.
                </p>
              </div>
            </div>

            <div
              className="rounded-[6px] p-8 bg-white"
              style={{
                border: "1px solid rgba(33,51,67,0.10)",
                boxShadow: "0 2px 16px rgba(33,51,67,0.06)",
              }}
            >
              {status === "submitting" ? (
                <div className="flex flex-col items-center justify-center py-14 gap-4">
                  <SwirlMark
                    size={40}
                    color={GREEN}
                    className="animate-spin"
                    style={{ animationDuration: "1.2s" }}
                  />
                  <p
                    className="text-sm"
                    style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}
                  >
                    Sending your request…
                  </p>
                </div>
              ) : status === "done" ? (
                <div className="text-center py-12">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{
                      background: `${GREEN}14`,
                      border: `1px solid ${GREEN}40`,
                    }}
                  >
                    <Check size={18} style={{ color: GREEN }} />
                  </div>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      color: INK,
                    }}
                  >
                    Request received.
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: SLATE,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    We&apos;ll be in touch within one business day to schedule
                    your discovery call.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2
                    className="text-lg font-bold mb-5"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      color: INK,
                    }}
                  >
                    Book a Discovery Call
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Name",       key: "name",  placeholder: "Alex Chen",        type: "text"  },
                      { label: "Work Email", key: "email", placeholder: "alex@company.com", type: "email" },
                    ].map((f) => (
                      <div key={f.key}>
                        <label
                          className="block text-[11px] font-medium mb-1.5"
                          style={{
                            color: GRAPHITE,
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          {f.label}
                        </label>
                        <input
                          type={f.type}
                          placeholder={f.placeholder}
                          required
                          value={form[f.key as keyof typeof form]}
                          onChange={(e) =>
                            setForm({ ...form, [f.key]: e.target.value })
                          }
                          style={fieldBase}
                          onFocus={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = GREEN;
                            (e.currentTarget as HTMLElement).style.background = "#fff";
                          }}
                          onBlur={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = "rgba(33,51,67,0.13)";
                            (e.currentTarget as HTMLElement).style.background = BONE;
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  {[
                    { label: "Company", key: "company", placeholder: "Acme Manufacturing" },
                    { label: "Role",    key: "role",    placeholder: "VP Finance, Director of Program Management…" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label
                        className="block text-[11px] font-medium mb-1.5"
                        style={{
                          color: GRAPHITE,
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {f.label}
                      </label>
                      <input
                        type="text"
                        placeholder={f.placeholder}
                        value={form[f.key as keyof typeof form]}
                        onChange={(e) =>
                          setForm({ ...form, [f.key]: e.target.value })
                        }
                        style={fieldBase}
                        onFocus={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = GREEN;
                          (e.currentTarget as HTMLElement).style.background = "#fff";
                        }}
                        onBlur={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "rgba(33,51,67,0.13)";
                          (e.currentTarget as HTMLElement).style.background = BONE;
                        }}
                      />
                    </div>
                  ))}
                  <div>
                    <label
                      className="block text-[11px] font-medium mb-1.5"
                      style={{
                        color: GRAPHITE,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      What&apos;s your biggest cost or margin challenge right
                      now?
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Our freight costs are unpredictable and we're pricing bids on 6-month-old data…"
                      value={form.challenge}
                      onChange={(e) =>
                        setForm({ ...form, challenge: e.target.value })
                      }
                      style={{ ...fieldBase, resize: "none" }}
                      onFocus={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = GREEN;
                        (e.currentTarget as HTMLElement).style.background = "#fff";
                      }}
                      onBlur={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(33,51,67,0.13)";
                        (e.currentTarget as HTMLElement).style.background = BONE;
                      }}
                    />
                  </div>
                  <PrimaryBtn full type="submit">
                    Book a Discovery Call <ArrowRight size={14} />
                  </PrimaryBtn>
                  <p
                    className="text-[10px] text-center"
                    style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}
                  >
                    We&apos;ll respond within one business day. No commitment
                    required.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: BONE }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-[240px_1fr] gap-16">
            <div>
              <Eyebrow>Before the call</Eyebrow>
              <h2
                className="font-bold leading-[1.18]"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(20px, 2.2vw, 26px)",
                  letterSpacing: "-0.018em",
                  color: INK,
                }}
              >
                Common questions.
              </h2>
            </div>
            <div>
              {contactFaqs.map((f, i) => (
                <FaqItem key={i} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer setPage={setPage} />
    </>
  );
}

// ─── Startup Partner Program Page ────────────────────────────────────────────

function StartupPage({ setPage }: { setPage: (p: Page) => void }) {
  const eligibility = [
    { label: "Funding Stage",       value: "Series A or beyond — minimum $5M raised" },
    { label: "Revenue Range",       value: "$5M – $40M annual revenue" },
    { label: "Business Model",      value: "Engineer-to-Order or complex configure-to-order manufacturer" },
    { label: "Current Stack",       value: "Spreadsheets or lightweight point tools — no entrenched ERP quoting module" },
    { label: "Growth Trajectory",   value: "Headcount or revenue expanding year-over-year" },
  ];

  const whatYouGet = [
    {
      title: "Full Platform Access from Day One",
      desc: "PartBase, QuoteBase, ConnectBase, SaphranAI — no feature-gating. The same platform used by $500M+ manufacturers, available to you at startup pricing.",
    },
    {
      title: "Startup Pricing — ~40% Off Standard Rate",
      desc: "Designed to match where you are today, not where you'll be in two years. Pricing that reflects your current scale without compromising on what you can access.",
    },
    {
      title: "Milestone-Based Scale — No Surprises",
      desc: "Pricing steps up automatically as you hit revenue milestones. Transparent, pre-agreed, and aligned with your growth trajectory.",
    },
    {
      title: "2-Year Partnership Term",
      desc: "Enough stability to prove ROI and build on. Long enough to matter, structured to keep both sides accountable.",
    },
  ];

  const costs = [
    {
      num: "01",
      problem: "Invisible Margin Erosion",
      problemDesc: "One customer had 40 parts silently below margin for over a year before they found out. By the time you notice, the damage is done.",
      fix: "Continuous Margin Walk",
      fixDesc: "Every cost change tracked by date, automatically. See when and why margin moved — before it becomes a crisis.",
    },
    {
      num: "02",
      problem: "Quoting Takes Weeks",
      problemDesc: "Multiple spreadsheets, no version control, no single source of truth. By the time you respond, the customer has moved on.",
      fix: "3-Week Quotes Become 3-Day Quotes",
      fixDesc: "Collaborative costing with BOM, routing, cost inflation & approvals in one place. Speed without sacrificing accuracy.",
    },
    {
      num: "03",
      problem: "Tariff & Cost Shock Is a Black Box",
      problemDesc: "When a 25% tariff hits your materials, nobody knows total exposure fast enough to build a recovery case on the spot.",
      fix: "3-Second Scenario Modelling",
      fixDesc: "Apply a tariff or cost spike, see margin impact across your entire portfolio instantly. Build the recovery case on the spot.",
    },
  ];

  const impactItems = [
    { area: "Margin Visibility",         detail: "Earlier detection of margin erosion",               range: "$200K–$400K potential annual savings" },
    { area: "Forecast Accuracy",         detail: "Reduced freight and excess inventory",              range: "$100K–$200K potential savings" },
    { area: "Eng. Change Recovery",      detail: "Improved cost recovery on design changes",          range: "$75K–$150K impact" },
    { area: "Faster Scenario Response",  detail: "Faster response to cost & volume shocks",           range: "$75K–$150K impact" },
  ];

  const timeline = [
    {
      phase: "Today",
      label: "Spreadsheet Era",
      sublabel: "Where most startups are",
      items: ["Quoting in Excel", "Margin tracked monthly at best", "No scenario modelling", "Finance rebuilds the model every time"],
      warn: false,
    },
    {
      phase: "12–24 months",
      label: "The Danger Zone",
      sublabel: "Where margin erosion begins",
      items: ["Revenue grows, deal complexity rises", "Spreadsheet errors compound", "First bad contract slips through", "A competitor gets embedded first"],
      warn: true,
    },
    {
      phase: "3+ years",
      label: "Cost of Catch-Up",
      sublabel: "Now you're playing defence",
      items: ["ERP quoting module installed", "Painful data migration", "10× more expensive to implement", "Years of margin loss already baked in"],
      warn: false,
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden" style={{ background: "#fff" }}>
        <div className="absolute pointer-events-none select-none"
          style={{ right: "-8%", top: "50%", transform: "translateY(-50%)", opacity: 0.055 }}>
          <SwirlMark size={480} color={GREEN} className="animate-spin" style={{ animationDuration: "32s" }} />
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            <div>
              <h1 className="font-extrabold leading-[1.03] mb-6"
                style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(38px, 5vw, 64px)", letterSpacing: "-0.024em", color: INK }}>
                Built for high-growth ETO manufacturers ready to manage margin from day one.
              </h1>
              <p className="text-[15px] leading-relaxed mb-8 max-w-xl" style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}>
                Purpose-built for Series A+ manufacturers between $5M and $40M in revenue — the moment when spreadsheet-era quoting stops scaling and the first bad contract can slip through undetected.
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <OutlineBtn onClick={() => setPage("capabilities")}>
                  See the Platform
                </OutlineBtn>
              </div>
            </div>

            <div>
              <DiscoveryCallForm />
            </div>
          </div>
        </div>
      </section>

      {/* Is this you? */}
      <section style={{ background: BONE, borderTop: "1px solid rgba(33,51,67,0.07)", borderBottom: "1px solid rgba(33,51,67,0.07)" }} className="py-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-[280px_1fr] gap-12 items-start">
            <div>
              <Eyebrow>Is this you?</Eyebrow>
              <h2 className="font-bold leading-[1.12]"
                style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(22px, 2.5vw, 30px)", letterSpacing: "-0.02em", color: INK }}>
                You&apos;re winning customers and scaling fast. The infrastructure needs to keep up.
              </h2>
            </div>
            <div className="space-y-2.5">
              {[
                "$5M–$40M revenue, growing year-over-year",
                "Series A or beyond, institutionally funded",
                "Engineer-to-Order or complex configure-to-order",
                "Winning enterprise contracts — quoting & forecasting still in spreadsheets",
                "No entrenched ERP/CPQ quoting module in place",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 rounded-[5px] px-4 py-3.5 bg-white"
                  style={{ border: "1px solid rgba(33,51,67,0.08)" }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: `${GREEN}18`, border: `1px solid ${GREEN}40` }}>
                    <Check size={9} style={{ color: GREEN }} strokeWidth={3} />
                  </div>
                  <span className="text-sm" style={{ color: GRAPHITE, fontFamily: "'Inter', sans-serif" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The cost of getting it wrong → and Saphran's fix */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <Eyebrow>The cost of getting it wrong</Eyebrow>
            <h2 className="font-bold leading-[1.12] max-w-xl"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(26px, 3vw, 38px)", letterSpacing: "-0.02em", color: INK }}>
              Programs get awarded at target margins — then silently erode.
            </h2>
            <p className="text-sm mt-3 max-w-lg" style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}>
              Saphran&apos;s fix for each of these is precise, not complex. Purpose-built for manufacturing — not a generic BI tool adapted to your industry.
            </p>
          </div>

          <div className="space-y-3">
            {costs.map((c, i) => (
              <div key={i} className="grid md:grid-cols-2 gap-px" style={{ background: "rgba(33,51,67,0.08)" }}>
                <div className="bg-white p-7 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-[11px] font-bold" style={{ color: GREEN }}>{c.num}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "rgba(196,71,58,0.10)", border: "1px solid rgba(196,71,58,0.22)" }}>
                        <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                          <path d="M1 1l4 4M5 1L1 5" stroke="#C4473A" strokeWidth="1.4" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#C4473A", fontFamily: "'Inter', sans-serif" }}>{c.problem}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}>{c.problemDesc}</p>
                </div>
                <div className="bg-white p-7 flex flex-col" style={{ borderLeft: `2px solid ${GREEN}30` }}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${GREEN}18`, border: `1px solid ${GREEN}40` }}>
                      <Check size={7} style={{ color: GREEN }} strokeWidth={3} />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: GREEN, fontFamily: "'Inter', sans-serif" }}>
                      {c.fix}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: GRAPHITE, fontFamily: "'Inter', sans-serif" }}>{c.fixDesc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Proof stats */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            {[
              { val: "10%+", label: "More accurate vs. customer forecast" },
              { val: "$46M+", label: "Saved annually — Tier 1 supplier" },
            ].map((s, i) => (
              <div key={i} className="rounded-[5px] px-6 py-5 flex items-center gap-4"
                style={{ background: INK }}>
                <p className="text-[26px] font-bold leading-none" style={{ color: GREEN, fontFamily: "'JetBrains Mono', monospace" }}>{s.val}</p>
                <p className="text-xs uppercase tracking-wider leading-snug" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial impact */}
      <section className="py-24" style={{ background: BONE }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-[1fr_1.6fr] gap-12 lg:gap-16 items-start">
            <div>
              <Eyebrow>Financial impact</Eyebrow>
              <h2 className="font-bold leading-[1.12] mb-4"
                style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(24px, 2.8vw, 36px)", letterSpacing: "-0.02em", color: INK }}>
                Where Saphran can deliver financial impact today.
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}>
                For a high-growth ETO manufacturer between $10M–$40M revenue — scaling fast, quoting in spreadsheets, facing material cost volatility, and without real-time margin visibility.
              </p>
              <div className="rounded-[6px] p-6" style={{ background: INK }}>
                <p className="text-[10px] uppercase tracking-[0.13em] mb-2" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'JetBrains Mono', monospace" }}>
                  Total potential annual impact
                </p>
                <p className="text-[38px] font-bold leading-none" style={{ color: GREEN, fontFamily: "'JetBrains Mono', monospace" }}>
                  ~$450K – $900K
                </p>
                <p className="text-[10px] mt-2 italic" style={{ color: "rgba(255,255,255,0.28)", fontFamily: "'Inter', sans-serif" }}>
                  Based on industry benchmarks
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {impactItems.map((item, i) => (
                <div key={i} className="bg-white rounded-[5px] p-5 flex items-start gap-4"
                  style={{ border: "1px solid rgba(33,51,67,0.09)" }}>
                  <div className="w-1 self-stretch rounded-full shrink-0" style={{ background: `${GREEN}50` }} />
                  <div className="flex-1">
                    <p className="text-sm font-semibold mb-0.5" style={{ color: INK, fontFamily: "'Inter', sans-serif" }}>{item.area}</p>
                    <p className="text-xs mb-2" style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}>{item.detail}</p>
                    <p className="text-xs font-semibold" style={{ color: GREEN, fontFamily: "'JetBrains Mono', monospace" }}>→ ~{item.range}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Longer You Wait — dark section */}
      <section className="py-24 relative overflow-hidden" style={{ background: INK }}>
        <div className="absolute right-0 top-0 bottom-0 pointer-events-none" style={{ opacity: 0.04 }}>
          <SwirlMark size={500} color={GREEN} className="animate-spin" style={{ animationDuration: "40s", marginRight: -100, marginTop: -50 }} dark />
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative">
          <div className="mb-10">
            <Eyebrow dark>Why timing matters</Eyebrow>
            <h2 className="font-bold text-white leading-[1.08] max-w-lg"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(26px, 3vw, 40px)", letterSpacing: "-0.022em" }}>
              The longer you wait, the more it costs.
            </h2>
            <p className="text-sm mt-3 max-w-lg" style={{ color: "rgba(255,255,255,0.44)", fontFamily: "'Inter', sans-serif" }}>
              Most manufacturers don&apos;t address commercial visibility until after a painful event. Getting in early — before the first bad contract — is the entire point of this program.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.07)" }}>
            {timeline.map((t, i) => (
              <div key={i} className="p-7 flex flex-col"
                style={{
                  background: t.warn ? "rgba(196,71,58,0.12)" : "rgba(255,255,255,0.03)",
                  borderTop: t.warn ? "2px solid rgba(196,71,58,0.5)" : `2px solid ${i === 0 ? `${GREEN}60` : "rgba(255,255,255,0.1)"}`,
                }}>
                <p className="text-[9px] uppercase tracking-[0.14em] mb-3 font-mono" style={{ color: t.warn ? "#E8A020" : "rgba(255,255,255,0.3)" }}>
                  {t.phase}
                </p>
                <p className="font-bold text-white text-base mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>{t.label}</p>
                <p className="text-[10px] mb-5 italic" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Inter', sans-serif" }}>{t.sublabel}</p>
                <ul className="space-y-2 flex-1">
                  {t.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full shrink-0 mt-1.5" style={{ background: t.warn ? "#E8A020" : "rgba(255,255,255,0.25)" }} />
                      <span className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', sans-serif" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <Eyebrow>What you get</Eyebrow>
            <h2 className="font-bold leading-[1.12]"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(26px, 3vw, 38px)", letterSpacing: "-0.02em", color: INK }}>
              Everything you need to manage margin from day one.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-px" style={{ background: "rgba(33,51,67,0.08)" }}>
            {whatYouGet.map((w, i) => (
              <div key={i} className="bg-white p-8 flex flex-col" style={{ borderLeft: i % 2 !== 0 ? `2px solid ${GREEN}30` : undefined }}>
                <div className="w-4 h-px mb-5" style={{ background: GREEN }} />
                <p className="text-sm font-bold mb-3" style={{ color: INK, fontFamily: "'Inter', sans-serif" }}>{w.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility criteria */}
      <section className="py-24" style={{ background: BONE }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-[280px_1fr] gap-12 items-start">
            <div>
              <Eyebrow>Eligibility criteria</Eyebrow>
              <h2 className="font-bold leading-[1.18]"
                style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(22px, 2.5vw, 30px)", letterSpacing: "-0.02em", color: INK }}>
                We keep this focused so it delivers real value to the right partners.
              </h2>
            </div>
            <div className="space-y-2">
              {eligibility.map((e, i) => (
                <div key={i} className="flex items-start gap-0 bg-white rounded-[5px] overflow-hidden"
                  style={{ border: "1px solid rgba(33,51,67,0.09)" }}>
                  <div className="w-1 self-stretch shrink-0" style={{ background: GREEN }} />
                  <div className="flex-1 px-5 py-4 md:grid md:grid-cols-[160px_1fr] gap-4">
                    <p className="text-xs font-bold mb-1 md:mb-0" style={{ color: INK, fontFamily: "'Inter', sans-serif" }}>{e.label}</p>
                    <p className="text-xs leading-relaxed" style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}>{e.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden" style={{ background: INK }}>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 pointer-events-none" style={{ opacity: 0.05 }}>
          <SwirlMark size={440} color={GREEN} className="animate-spin" style={{ animationDuration: "30s" }} dark />
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative">
          <div className="max-w-xl">
            <Eyebrow dark>Ready to apply?</Eyebrow>
            <h2 className="font-extrabold text-white mb-5 leading-[1.06]"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(30px, 4vw, 48px)", letterSpacing: "-0.022em" }}>
              Let&apos;s get started.
            </h2>
            <p className="text-[15px] leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.46)", fontFamily: "'Inter', sans-serif" }}>
              Book a discovery call to find out if you qualify and what the program looks like for your business. No commitment, no generic demo.
            </p>
            <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Inter', sans-serif" }}>
              Contact:{" "}
              <a href="mailto:atrivedi@saphran.com" className="underline"
                style={{ color: GREEN_TINT }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = GREEN; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = GREEN_TINT; }}>
                atrivedi@saphran.com
              </a>
              {" "}· Ami Trivedi, Director of Sales
            </p>
            <div className="flex gap-3 flex-wrap">
              <PrimaryBtn onClick={() => setPage("contact")}>
                Apply for the Program <ArrowRight size={14} />
              </PrimaryBtn>
              <OutlineBtn dark onClick={() => setPage("capabilities")}>
                See the Platform
              </OutlineBtn>
            </div>
          </div>
        </div>
      </section>

      <Footer setPage={setPage} />
    </>
  );
}

// ─── QuoteBase Page ────────────────────────────────────────────────────────────

function QuoteBasePage({ setPage }: { setPage: (p: Page) => void }) {
  const [activeTab, setActiveTab] = useState("sales");
  const workflowSectionRef = useRef<HTMLDivElement>(null);

  const scrollToWorkflow = () => {
    workflowSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const workflowRoles = [
    {
      id: "sales",
      name: "Sales",
      icon: <FileText size={15} />,
      title: "Initiate RFQ Response & Manage Pricing",
      tagline: "Define opportunities and link directly to market forecast subscriptions.",
      description: "Sales coordinators define the RFQ parameters, import long-range volumes, structure LTA price schedules, and kickoff cross-functional tasks.",
      bullets: [
        "Configure custom RFQ opportunities using industry-specific parameters",
        "Direct drop-down integration with market forecast subscription data for accurate program volumes",
        "Assign and manage multi-year price lists and Long-Term Agreements (LTAs)",
        "Attach customer drawings, terms, and purchase orders in one central record",
        "Orchestrate workflow tasks by assigning Design, Mfg, Tooling, and Purchasing teams"
      ]
    },
    {
      id: "design",
      name: "Design Engr",
      icon: <Layers size={15} />,
      title: "Develop BOMs & Manage Part Versions",
      tagline: "Create indented Bill of Materials and explore scenario variations.",
      description: "Design engineers construct the bill of material and operations routing sufficient for multiple versions of the quote to be evaluated downstream.",
      bullets: [
        "Build indented BOM structures with materials, components, and routings",
        "Create, copy, and compare infinite versions of a quote (e.g., local vs. offshore sourcing)",
        "Directly push approved BOMs to PLM systems at the time of award",
        "Easily reuse historical quotation models as a starting point to avoid duplicate entry",
        "Track all changes made to the design with date stamps and direct margin delta visibility"
      ]
    },
    {
      id: "industrial",
      name: "Industrial Engr",
      icon: <Cpu size={15} />,
      title: "Model Manufacturing Processes by Plant",
      tagline: "Define cycle times, labor rates, and machine allocations.",
      description: "Industrial engineers define the manufacturing steps, assign machines, and set cycle times to build accurate, site-specific cost profiles.",
      bullets: [
        "Allocate operations to specific global plants (e.g., Brazil, Detroit, Germany)",
        "Model site-specific labor rates, machine burden rates, and plant efficiencies",
        "Track cycle times, operator count, and defect rates per process step",
        "Simulate capacity utilization impacts across key assets before committing to bids",
        "Direct integration with plant equipment registries for real-time asset data"
      ]
    },
    {
      id: "purchasing",
      name: "Purchasing",
      icon: <RefreshCw size={15} />,
      title: "Source Components & Manage Supplier Data",
      tagline: "Track raw material prices, vendor parts, and buy-side processes.",
      description: "Purchasing teams maintain component cost databases, manage supplier RFQs, and input material prices to keep margins up to date.",
      bullets: [
        "Centralized material maintenance (steel, copper, resins, paints, plating)",
        "Manage supplier bids and link vendor parts directly to quote BOM items",
        "Flag components with missing cost data to automatically trigger sourcing inquiries",
        "Model price variances and currency exchange impacts across the global supply chain",
        "Track and reuse historical purchase orders to validate supplier cost estimates"
      ]
    },
    {
      id: "tooling",
      name: "Tooling",
      icon: <HelpCircle size={15} />,
      title: "Manage One-Time Costs & Tooling Assets",
      tagline: "Model jigs, mould tools, and custom pattern costs.",
      description: "Tooling engineers estimate and track the capital requirements for process tooling, moulds, and fixtures, defining how amortizations are structured.",
      bullets: [
        "Incorporate process-specific tooling costs (JIGs, Mould Tools, Patterns)",
        "Differentiate between Customer-funded (BUY) and Saphran-amortized tooling",
        "Manage tooling requests and approvals from multiple internal stakeholders",
        "Track tool development milestones from design to post-launch validation",
        "Calculate accurate tooling amortization schedules integrated with final pricing"
      ]
    },
    {
      id: "finance",
      name: "Finance",
      icon: <DollarSign size={15} />,
      title: "Govern Cost Formulas & Currency Matrices",
      tagline: "Maintain global exchange rates, fiscal calendars, and burden rates.",
      description: "Finance controls the financial parameters, including labor rates, benefits, amortization rules, exchange rate matrices, and ERP/Maximo integrations.",
      bullets: [
        "Maintain global exchange rate conversion matrices across transaction currencies",
        "Configure plant-specific burden formulas, benefits multipliers, and fiscal calendars",
        "Set standard depreciation rules and capital asset amortization variables",
        "Establish margin threshold alert rules to detect unprofitable quotes early",
        "Provide direct API integration points with enterprise ERP and asset management tools"
      ]
    },
    {
      id: "pricing",
      name: "Pricing & Margin",
      icon: <BarChart2 size={15} />,
      title: "Model Margin Strategies & Business Cases",
      tagline: "Run multi-variable sensitivity analyses and margin markups.",
      description: "Pricing analysts and executives manage client markups, select which BOM elements to expose, and evaluate NPV across different scenarios.",
      bullets: [
        "Manage markup strategies at the individual BOM element or overall quote level",
        "Determine client-facing BOM exposure (hide internal cost details on output formats)",
        "Run volume and discount rate sensitivity analysis (e.g., 100% vs. 80% demand volume)",
        "Track Net Present Value (NPV) and IRR on capital-heavy ETO business cases",
        "Instantly compile standard quoting forms (e.g., standard RFQ response sheets)"
      ]
    }
  ];

  const renderMockup = (roleId: string) => {
    switch (roleId) {
      case "sales":
        return (
          <div className="bg-[#1c2a38] text-white p-5 rounded-lg border border-slate-700 font-sans shadow-lg text-[13px] leading-relaxed">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-semibold text-slate-200">Saphran RFQ Workspace</span>
              </div>
              <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-mono">OPP_ID: 68661</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase text-slate-400 tracking-wider mb-1 font-semibold">Description of Change</label>
                <div className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded text-slate-200">Bumper - Land Rover (Modification)</div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase text-slate-400 tracking-wider mb-1 font-semibold">Business Status</label>
                  <div className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded text-emerald-400 font-semibold flex items-center justify-between">
                    <span>Quoted</span>
                    <ChevronDown size={12} className="text-slate-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-slate-400 tracking-wider mb-1 font-semibold">Customer</label>
                  <div className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded text-slate-200">Jaguar Land Rover</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase text-slate-400 tracking-wider mb-1 font-semibold">Customer Part Number</label>
                  <div className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded text-slate-200 font-mono">LR398827898</div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-slate-400 tracking-wider mb-1 font-semibold">Internal Part Number</label>
                  <div className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded text-slate-200 font-mono">120192823</div>
                </div>
              </div>
              
              <div className="border border-emerald-500/20 bg-emerald-500/5 p-3 rounded flex items-start gap-2.5">
                <Check size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-emerald-400 text-xs">Market Forecast Integration Active</span>
                  <p className="text-[11px] text-slate-300 mt-0.5">Program assignments synced with light vehicle production volume forecast Solihull &amp; Pune plants (2026–2030).</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "design":
        return (
          <div className="bg-[#1c2a38] text-white p-5 rounded-lg border border-slate-700 font-sans shadow-lg text-[12px] leading-relaxed">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700">
              <span className="font-semibold text-slate-200">BOM &amp; Routing Explorer</span>
              <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-mono">Part P-4398</span>
            </div>
            
            <div className="mb-4">
              <span className="block text-[10px] uppercase text-slate-400 tracking-wider mb-2 font-semibold">Indented Bill of Material</span>
              <div className="border border-slate-700 rounded overflow-hidden">
                <table className="w-full text-left font-mono">
                  <thead>
                    <tr className="bg-slate-800/80 text-[10px] uppercase text-slate-400 border-b border-slate-700">
                      <th className="p-2">Level / Part No</th>
                      <th className="p-2">Description</th>
                      <th className="p-2 text-right">Qty</th>
                      <th className="p-2 text-right">Unit Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-800">
                      <td className="p-2 text-slate-200">▪ 1 &gt; N12345</td>
                      <td className="p-2 text-slate-350">Nickel Chemicals</td>
                      <td className="p-2 text-right">0.697 lb</td>
                      <td className="p-2 text-right text-emerald-400">€ 7.00</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="p-2 pl-4 text-slate-300">↳ 2 &gt; F73738</td>
                      <td className="p-2 text-slate-400">Chrome Plating</td>
                      <td className="p-2 text-right">6.114 sq ft</td>
                      <td className="p-2 text-right text-emerald-400">€ 0.42</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="p-2 pl-6 text-slate-300">↳ 3 &gt; F72672</td>
                      <td className="p-2 text-slate-400">Nickel Anode</td>
                      <td className="p-2 text-right">1.100 ea</td>
                      <td className="p-2 text-right text-emerald-400">€ 1.10</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
              <span className="block text-[9px] uppercase text-slate-400 tracking-wider mb-2 font-semibold">Active Version Configurations</span>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center bg-slate-800 px-2.5 py-1.5 rounded border-l-2 border-emerald-500">
                  <span className="text-slate-200">Main: Bumper - Brazil Site Coated</span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">Active</span>
                </div>
                <div className="flex justify-between items-center bg-slate-900/50 px-2.5 py-1.5 rounded hover:bg-slate-800/40 cursor-pointer">
                  <span className="text-slate-400">Alt 1: Bumper - Detroit Site Coated</span>
                  <span className="text-[9px] text-slate-500">Compare</span>
                </div>
              </div>
            </div>
          </div>
        );
      case "industrial":
        return (
          <div className="bg-[#1c2a38] text-white p-5 rounded-lg border border-slate-700 font-sans shadow-lg text-[12px] leading-relaxed">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700">
              <span className="font-semibold text-slate-200">Mfg Routing &amp; Assets</span>
              <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-mono">Plant: Brazil</span>
            </div>
            
            <div className="space-y-4">
              <div className="border border-slate-700 rounded overflow-hidden">
                <table className="w-full text-left font-mono">
                  <thead>
                    <tr className="bg-slate-800/80 text-[10px] uppercase text-slate-400 border-b border-slate-700">
                      <th className="p-2">Process Name</th>
                      <th className="p-2">Machine Type</th>
                      <th className="p-2 text-right">Total Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-800">
                      <td className="p-2 text-slate-200">Chrome Plating</td>
                      <td className="p-2 text-slate-400">Chrome Plater A</td>
                      <td className="p-2 text-right text-emerald-400">USD 9.211</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="p-2 text-slate-200">Chrome Plate Polish</td>
                      <td className="p-2 text-slate-400">Polisher 500T</td>
                      <td className="p-2 text-right text-emerald-400">USD 3.610</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="p-2 text-slate-200">E-Coat</td>
                      <td className="p-2 text-slate-400">E-Coater Brazil</td>
                      <td className="p-2 text-right text-emerald-400">USD 14.641</td>
                    </tr>
                    <tr className="bg-slate-800/30 font-bold border-t border-slate-700">
                      <td className="p-2" colSpan={2}>BOM Processing Total:</td>
                      <td className="p-2 text-right text-emerald-400">USD 27.985</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 bg-slate-900/50 p-2.5 rounded font-mono border border-slate-800">
                <div>Cycle Time: <span className="text-slate-200">3.00 mins</span></div>
                <div>Labor Rate: <span className="text-slate-200">$22.50 / hr</span></div>
                <div>Fixed OH: <span className="text-slate-200">$3.00 / min</span></div>
                <div>Efficiency: <span className="text-slate-200">85.00 %</span></div>
              </div>
            </div>
          </div>
        );
      case "purchasing":
        return (
          <div className="bg-[#1c2a38] text-white p-5 rounded-lg border border-slate-700 font-sans shadow-lg text-[12px] leading-relaxed">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700">
              <span className="font-semibold text-slate-200">Material Cost Database</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">Buy-side Active</span>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="p-2.5 bg-slate-800/80 rounded border border-slate-700 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-200">55 TPV Black</p>
                    <p className="text-[10px] text-slate-400">Vendor: Mitsui Chemical</p>
                  </div>
                  <span className="text-[10px] text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded font-mono">INITIATED</span>
                </div>
                
                <div className="p-2.5 bg-slate-800/80 rounded border border-slate-700 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-200">ABS 25% recycled</p>
                    <p className="text-[10px] text-slate-400">Vendor: Wells Plastics</p>
                  </div>
                  <span className="font-mono text-emerald-400">$2.120 / lb</span>
                </div>
                
                <div className="p-2.5 bg-slate-800/80 rounded border border-slate-700 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-200">ABS Resin (MAGNUM)</p>
                    <p className="text-[10px] text-slate-400">Vendor: Marios Rubber</p>
                  </div>
                  <span className="font-mono text-emerald-400">$2.300 / lb</span>
                </div>
              </div>
              
              <button className="w-full border border-dashed border-slate-600 hover:border-emerald-500 py-2 rounded text-center text-slate-400 hover:text-emerald-400 transition-colors text-[11px] font-semibold">
                + ADD NEW SUPPLIER BID
              </button>
            </div>
          </div>
        );
      case "tooling":
        return (
          <div className="bg-[#1c2a38] text-white p-5 rounded-lg border border-slate-700 font-sans shadow-lg text-[12px] leading-relaxed">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700">
              <span className="font-semibold text-slate-200">Tooling Cost Analysis</span>
              <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-mono">Process Tooling</span>
            </div>
            
            <div className="space-y-4">
              <div className="border border-slate-700 rounded overflow-hidden">
                <table className="w-full text-left font-mono">
                  <thead>
                    <tr className="bg-slate-800/80 text-[10px] uppercase text-slate-400 border-b border-slate-700">
                      <th className="p-2">Type</th>
                      <th className="p-2">Est. Cost</th>
                      <th className="p-2">Fund Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-800">
                      <td className="p-2 text-slate-200 font-semibold">JIG</td>
                      <td className="p-2 text-emerald-400">MXN 14,000</td>
                      <td className="p-2 text-slate-400 text-[10px]">BUY (Customer)</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="p-2 text-slate-200 font-semibold">Mould Tool</td>
                      <td className="p-2 text-emerald-400">MXN 120,000</td>
                      <td className="p-2 text-slate-400 text-[10px]">BUY (Customer)</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="p-2 text-slate-200 font-semibold">PATTERN</td>
                      <td className="p-2 text-emerald-400">MXN 100,000</td>
                      <td className="p-2 text-slate-400 text-[10px]">AMORT (Quote)</td>
                    </tr>
                    <tr className="bg-slate-800/30 font-bold border-t border-slate-700">
                      <td className="p-2">Process Total:</td>
                      <td className="p-2 text-emerald-400" colSpan={2}>MXN 248,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p className="text-[10px] text-slate-400 italic">Amortized values automatically divide across program volumes to calculate unit markups.</p>
            </div>
          </div>
        );
      case "finance":
        return (
          <div className="bg-[#1c2a38] text-white p-5 rounded-lg border border-slate-700 font-sans shadow-lg text-[12px] leading-relaxed">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700">
              <span className="font-semibold text-slate-200">Global Financial Parameters</span>
              <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-mono">Admin Console</span>
            </div>
            
            <div className="space-y-3 font-mono text-[11px]">
              <div className="flex justify-between items-center bg-slate-800 p-2 rounded border border-slate-700">
                <span className="text-slate-350">Amortization Period</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-semibold">12</span>
                  <span className="text-slate-450 text-[9px]">/ years</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center bg-slate-800 p-2 rounded border border-slate-700">
                <span className="text-slate-350">Fringe Benefits Rate</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-semibold">USD 16,700</span>
                  <span className="text-slate-450 text-[9px]">/ emp</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center bg-slate-800 p-2 rounded border border-slate-700">
                <span className="text-slate-350">Indirect Labor Burden</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-semibold">25.00</span>
                  <span className="text-slate-450 text-[9px]">%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center bg-slate-800 p-2 rounded border border-slate-700">
                <span className="text-slate-350">Blanking Time Standard</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-semibold">5,000</span>
                  <span className="text-slate-450 text-[9px]">hrs/yr</span>
                </div>
              </div>
            </div>
          </div>
        );
      case "pricing":
        return (
          <div className="bg-[#1c2a38] text-white p-5 rounded-lg border border-slate-700 font-sans shadow-lg text-[12px] leading-relaxed">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700">
              <span className="font-semibold text-slate-200">Margin &amp; Business Case</span>
              <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-mono">NPV Projection</span>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1.5 text-[11px] font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Subtotal Price</span>
                  <span className="text-slate-200 font-semibold">USD 33.00000</span>
                </div>
                <div className="flex justify-between text-rose-400">
                  <span>SG&amp;A Markup (19.22%)</span>
                  <span>(21.56929)</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-semibold border-t border-slate-700 pt-1.5">
                  <span>Price (w/o tooling)</span>
                  <span>USD 428.06562</span>
                </div>
              </div>
              
              <div className="bg-slate-900/50 p-2.5 rounded border border-slate-800 text-[10px] font-mono">
                <span className="block text-[8px] uppercase tracking-wider text-slate-400 mb-1 font-semibold">Financial Projections</span>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="bg-slate-800 p-1.5 rounded">
                    <span className="block text-slate-450 text-[7.5px]">NPV (100% Vol)</span>
                    <span className="text-emerald-400 font-semibold text-[10.5px]">$59,252,220</span>
                  </div>
                  <div className="bg-slate-800 p-1.5 rounded">
                    <span className="block text-slate-450 text-[7.5px]">NPV (80% Vol)</span>
                    <span className="text-emerald-400 font-semibold text-[10.5px]">$47,401,776</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const currentRole = workflowRoles.find(r => r.id === activeTab) || workflowRoles[0];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden" style={{ background: "#fff" }}>
        <div className="absolute pointer-events-none select-none"
          style={{ right: "-8%", top: "50%", transform: "translateY(-50%)", opacity: 0.055 }}>
          <SwirlMark size={480} color={GREEN} className="animate-spin" style={{ animationDuration: "32s" }} />
        </div>
        
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            <div>

              <h1 className="font-extrabold leading-[1.03] mb-6"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(42px, 5.5vw, 72px)",
                  letterSpacing: "-0.024em",
                  color: INK,
                }}>
                QuoteBase™
              </h1>
              
              <p className="text-lg font-semibold leading-snug mb-5"
                style={{ color: INK, fontFamily: "'Poppins', sans-serif" }}>
                Accurate &amp; Efficient Costing &amp; Quoting, Integrated Directly in Your Rolling Business Plan.
              </p>
              
              <p className="text-[15px] leading-relaxed mb-8"
                style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}>
                Say goodbye to disconnected spreadsheets. QuoteBase is Saphran's enterprise-class costing and quoting solution, specifically designed for Tier 1, Tier 2, and Tier 3 suppliers and ETO manufacturers. Speed up RFQ response, eliminate costing and pricing errors, and connect every quote directly to your business plan.
              </p>

              <div className="border-l-4 border-emerald-500 bg-[#f9f9fb] p-5 rounded-r-[5px] mb-8 max-w-2xl"
                style={{ borderLeftColor: GREEN }}>
                <p className="text-xs italic leading-relaxed text-slate-750 mb-2">
                  &quot;QuoteBase further leaned out our already lean cost and customer quote cycle by over 30% and integrated with PartBase to expose operational BOM forecasting that was always up to date.&quot;
                </p>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                  — Custom Fastener Supplier
                </span>
              </div>
              
              <div className="flex gap-3 flex-wrap">
                <OutlineBtn onClick={scrollToWorkflow}>
                  Explore Quoting Workflow
                </OutlineBtn>
              </div>
            </div>

            <div>
              <DiscoveryCallForm />
            </div>
          </div>
        </div>
      </section>

      {/* The Dilemma vs Solution Section (Redesigned) */}
      <section className="py-24" style={{ background: BONE, borderTop: "1px solid rgba(33,51,67,0.07)", borderBottom: "1px solid rgba(33,51,67,0.07)" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Eyebrow>The Bottom Line Impact</Eyebrow>
            <h2 className="font-bold leading-[1.12] mb-4 text-slate-900"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(28px, 3.2vw, 42px)",
                letterSpacing: "-0.02em",
                color: INK
              }}>
              The Costing &amp; Quoting Dilemma
            </h2>
            <p className="text-sm text-slate-600" style={{ fontFamily: "'Inter', sans-serif" }}>
              How a tiny quoting error compounding across ETO operations causes substantial hidden profit leakage.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-10 items-stretch">
            {/* Visual Calculation Matrix Card (Dark Slate) */}
            <div className="bg-[#1c2a38] text-white p-8 rounded-lg shadow-lg border border-slate-700 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-6 text-rose-450 font-mono">
                  <AlertCircle size={18} />
                  <span className="font-bold text-xs uppercase tracking-wider">THE COMPOUNDING RISK MATRIX</span>
                </div>
                
                <h3 className="font-bold text-xl mb-6 text-slate-100" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  The Hidden Cost of Spreadsheet Quoting
                </h3>

                <div className="space-y-6">
                  {/* Compounding Calculation Highlight */}
                  <div className="p-4 bg-slate-900/60 rounded border border-slate-800 font-mono text-center">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Compounded Profit Leakage</div>
                    <div className="text-2xl font-extrabold text-rose-400 mt-1">2.5¢ error / unit → $1.0M profit leakage</div>
                    <div className="text-[9px] text-slate-500 mt-1">Based on $250K/yr loss across a 10-part family (1M units/yr over 4 yrs) when OEM applies benchmark price</div>
                  </div>

                  {/* CAR Stats Table */}
                  <div className="border border-slate-750 rounded overflow-hidden">
                    <div className="bg-slate-800 px-3 py-1.5 font-mono text-[9px] text-slate-400 border-b border-slate-750">
                      Center for Automotive Research (CAR) Survey Benchmarks
                    </div>
                    <div className="divide-y divide-slate-750 text-[11px] font-mono">
                      <div className="p-3 flex justify-between gap-4">
                        <span className="text-slate-400">Average Annual spend managing RFQs &amp; changes</span>
                        <span className="font-bold text-slate-200">$11 Million</span>
                      </div>
                      <div className="p-3 flex justify-between gap-4">
                        <span className="text-slate-400">Suppliers reporting pricing errors submitted to OEMs</span>
                        <span className="font-semibold text-rose-400">33%</span>
                      </div>
                      <div className="p-3 flex justify-between gap-4">
                        <span className="text-slate-400">BOM planned pricing variance from actual costs</span>
                        <span className="font-semibold text-slate-200">25%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-750 pt-5 mt-8">
                <p className="text-xs text-slate-400 italic">
                  &quot;Suppliers must control both their short-term profitability and their destiny through better management of their costing and quoting process.&quot;
                </p>
                <span className="block text-[8px] uppercase tracking-wide text-slate-500 font-bold mt-1">— Center for Automotive Research</span>
              </div>
            </div>

            {/* Saphran QuoteBase Resolution Card (White/Emerald) */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 flex flex-col justify-between" style={{ borderTop: `4px solid ${GREEN}` }}>
              <div>
                <div className="flex items-center gap-2.5 mb-6 text-emerald-650 font-mono">
                  <Sparkles size={18} />
                  <span className="font-bold text-xs uppercase tracking-wider">THE SAPHRAN RESOLUTION</span>
                </div>
                
                <h3 className="font-bold text-xl mb-4 text-slate-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  QuoteBase™ Database-Driven Quoting
                </h3>
                
                <p className="text-[13.5px] leading-relaxed text-slate-600 mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
                  QuoteBase replaces spreadsheet quoting with an automated, database-driven workflow. It accommodates your existing costing formulas while enforcing enterprise controls.
                </p>

                <div className="space-y-4">
                  <div className="flex gap-4 items-start p-4 bg-[#f7faf8] rounded border border-emerald-50">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center bg-emerald-50 border border-emerald-300 shrink-0 mt-0.5">
                      <Check size={9} className="text-emerald-600" strokeWidth={3} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 font-sans">90% Faster RFQ Cycles</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Reduces response turnaround time from weeks to days, allowing teams to quote more business.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start p-4 bg-[#f7faf8] rounded border border-emerald-50">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center bg-emerald-50 border border-emerald-300 shrink-0 mt-0.5">
                      <Check size={9} className="text-emerald-600" strokeWidth={3} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 font-sans">Eliminate Pricing Errors</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Ensure precision by reusing previously approved commercial models instead of copying cells manually.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start p-4 bg-[#f7faf8] rounded border border-emerald-50">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center bg-emerald-50 border border-emerald-300 shrink-0 mt-0.5">
                      <Check size={9} className="text-emerald-600" strokeWidth={3} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 font-sans">BOM Forecast Integration</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Link quotes directly with PartBase to keep operational forecast BOMs and pricing models updated.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5 mt-8">
                <p className="text-xs text-slate-500 italic">
                  &quot;Market data with Saphran&apos;s real time integration for improved part-program volumes has helped us avoid any new bad business.&quot;
                </p>
                <span className="block text-[8px] uppercase tracking-wide text-slate-400 font-bold mt-1">— Mid-Size Manufacturer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Workflow Section */}
      <section ref={workflowSectionRef} className="py-24 text-white" style={{ background: INK }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <Eyebrow dark>Collaborative Workspace</Eyebrow>
            <h2 className="font-bold leading-[1.12] mb-4"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(28px, 3.2vw, 42px)",
                letterSpacing: "-0.02em"
              }}>
              Typical Quote Workflow &amp; Roles
            </h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.44)", fontFamily: "'Inter', sans-serif" }}>
              QuoteBase coordinates inputs across sales, engineering, purchasing, tooling, operations, and finance. Click on the roles below to explore their specific workspace capabilities and interfaces.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.2fr] gap-8 items-start">
            {/* Left Tabs */}
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-2 border-b border-white/5 lg:border-b-0">
              {workflowRoles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setActiveTab(role.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded text-left text-xs font-semibold uppercase tracking-wider font-mono whitespace-nowrap transition-all duration-150 ${
                    activeTab === role.id 
                      ? "bg-[#2d4356] border-l-4 text-white" 
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                  style={activeTab === role.id ? { borderLeftColor: GREEN } : {}}
                >
                  <span style={{ color: activeTab === role.id ? GREEN_TINT : "inherit" }}>
                    {role.icon}
                  </span>
                  <span>{role.name}</span>
                </button>
              ))}
            </div>

            {/* Right Pane */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-[#16222e] p-8 rounded-lg border border-white/5">
              {/* Description & Bullets */}
              <div className="md:col-span-6">
                <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: GREEN_TINT }}>
                  {currentRole.title}
                </span>
                
                <h3 className="font-bold text-lg mb-3 mt-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {currentRole.tagline}
                </h3>
                
                <p className="text-[13px] leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.52)", fontFamily: "'Inter', sans-serif" }}>
                  {currentRole.description}
                </p>

                <ul className="space-y-3">
                  {currentRole.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                      <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-emerald-500/10 border border-emerald-500/20">
                        <Check size={7} className="text-emerald-400" />
                      </div>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Live Interactive UI Mockup */}
              <div className="md:col-span-6 flex flex-col justify-center">
                <span className="block text-[9px] uppercase tracking-wider text-slate-400 mb-2 font-mono text-center">
                  Live System Interface Mockup
                </span>
                {renderMockup(activeTab)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose QuoteBase & Fast ROI */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Features list */}
            <div className="lg:col-span-7 space-y-12">
              <div>
                <Eyebrow>Key Advantages</Eyebrow>
                <h2 className="font-bold leading-[1.12] mb-6 text-slate-900"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "clamp(26px, 2.8vw, 36px)",
                    letterSpacing: "-0.02em",
                    color: INK
                  }}>
                  Why the QuoteBase Solution?
                </h2>
                <p className="text-sm text-slate-650" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Replaces error-prone spreadsheet processes with a secure, centralized cost database.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4" style={{ color: GREEN }}>
                    <Clock size={16} />
                  </div>
                  <h4 className="font-bold text-sm mb-2 text-slate-950" style={{ fontFamily: "'Inter', sans-serif" }}>RFQ Response in Days</h4>
                  <p className="text-xs leading-relaxed text-slate-500">Reduce your RFQ preparation and design change cycle times by 50% to 90% through automated workflow orchestration.</p>
                </div>

                <div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4" style={{ color: GREEN }}>
                    <Database size={16} />
                  </div>
                  <h4 className="font-bold text-sm mb-2 text-slate-950" style={{ fontFamily: "'Inter', sans-serif" }}>Comprehensive Cost Repository</h4>
                  <p className="text-xs leading-relaxed text-slate-500">Store materials, components, tooling, labor rates, plant burden, and capacity data in one unified, auditable database.</p>
                </div>

                <div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4" style={{ color: GREEN }}>
                    <Activity size={16} />
                  </div>
                  <h4 className="font-bold text-sm mb-2 text-slate-950" style={{ fontFamily: "'Inter', sans-serif" }}>What-If Risk Simulations</h4>
                  <p className="text-xs leading-relaxed text-slate-500">Create multiple versions of quotes to run profit, currency, and resource capacity what-if analyses before submitting bids.</p>
                </div>

                <div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4" style={{ color: GREEN }}>
                    <RefreshCw size={16} />
                  </div>
                  <h4 className="font-bold text-sm mb-2 text-slate-950" style={{ fontFamily: "'Inter', sans-serif" }}>Automatic ERP &amp; PLM Sync</h4>
                  <p className="text-xs leading-relaxed text-slate-500">Directly export awarded cost models and BOMs to ERP and PLM databases, eliminating dual data entry for good.</p>
                </div>
              </div>
            </div>

            {/* Fast Payback / ROI Card */}
            <div className="lg:col-span-5 bg-[#f6f4ef] p-8 rounded-lg border border-[#e7e3d7]">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Financial Value</span>
              <h3 className="font-bold text-xl mt-1 mb-4 text-slate-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Fast Payback &amp; High ROI
              </h3>
              
              <p className="text-[13px] leading-relaxed text-slate-600 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                The Saphran value proposition is based on one clear fact: <strong>our solution is designed to save you money, quickly.</strong>
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={8} className="text-emerald-700" />
                  </div>
                  <p className="text-[12px] text-slate-650"><strong>Captures existing formulas:</strong> Accommodates your current custom algorithms for cost analysis so you can get started quickly.</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={8} className="text-emerald-700" />
                  </div>
                  <p className="text-[12px] text-slate-650"><strong>Active margin walks:</strong> Enforce margins through the entire product lifecycle with automatic price updates.</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={8} className="text-emerald-700" />
                  </div>
                  <p className="text-[12px] text-slate-650"><strong>Auto-configured customer formats:</strong> Instant exports to customer-specific formats like Tool Purchase Authorizations or Standard Quotation PDFs.</p>
                </div>
              </div>

              <div className="border-t border-[#e2decb] pt-6 mt-6 flex justify-between items-center">
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-450">Typical Payback Period</span>
                  <span className="text-lg font-bold text-slate-900 font-mono">Under 6 Months</span>
                </div>
                <div className="h-8 w-px bg-[#e2decb]" />
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-450">Average Quote Errors</span>
                  <span className="text-lg font-bold text-slate-900 font-mono">Reduced by 99%</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Decision Outputs & BUMP */}
      <section className="py-24" style={{ background: BONE, borderTop: "1px solid rgba(33,51,67,0.07)" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            <div>
              <Eyebrow>Decision Outputs</Eyebrow>
              <h2 className="font-bold leading-[1.12] mb-6 text-slate-900"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(26px, 2.8vw, 36px)",
                  letterSpacing: "-0.02em",
                  color: INK
                }}>
                Real-Time Bump Reports &amp; Margin Tracking
              </h2>
              
              <p className="text-[14px] leading-relaxed text-slate-650 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                Eliminate manual data entry to track margins. Saphran automates tracking of changes and financial effect, compiling the detailed <strong>BUMP Report</strong>. See instant business case and margin change details for every single part or opportunity.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded border border-slate-200">
                  <span className="block text-[9px] font-mono uppercase tracking-wider text-slate-400">Profit By Customer By Year</span>
                  <p className="text-[12px] text-slate-600 mt-1">Track over 100 attributes for enterprise-wide analysis and reporting, always up to date.</p>
                </div>
                <div className="bg-white p-4 rounded border border-slate-200">
                  <span className="block text-[9px] font-mono uppercase tracking-wider text-slate-400">Future BOM Prep</span>
                  <p className="text-[12px] text-slate-600 mt-1">Automatically pushes quoted and awarded business into long-range forecasts for volume planning.</p>
                </div>
              </div>
            </div>

            {/* Simulated BUMP Visual Card */}
            <div className="bg-[#1c2a38] text-white p-6 rounded-lg border border-slate-700 font-sans shadow-lg text-[12px] leading-relaxed">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-emerald-400" />
                  <span className="font-semibold text-slate-200">BUMP Report: Part Margin Delta</span>
                </div>
                <span className="text-[9px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-mono">Part No: 120192823</span>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 font-mono text-[11px] bg-slate-900/40 p-3 rounded border border-slate-700">
                  <div>
                    <span className="block text-slate-400 text-[8px] uppercase">Current Product Price</span>
                    <span className="text-slate-200 font-semibold">USD 458.50000</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[8px] uppercase">Current Product Cost</span>
                    <span className="text-slate-200 font-semibold">USD 54.55631</span>
                  </div>
                </div>

                <div className="border border-slate-700 rounded overflow-hidden">
                  <table className="w-full text-left font-mono">
                    <thead>
                      <tr className="bg-slate-800/80 text-[9px] uppercase text-slate-400 border-b border-slate-700">
                        <th className="p-2">Change Date</th>
                        <th className="p-2">Change Type</th>
                        <th className="p-2 text-right">Cost Delta</th>
                        <th className="p-2 text-right">New Margin</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-800">
                        <td className="p-2 text-[10px] text-slate-400">11 Jul 2026</td>
                        <td className="p-2 text-slate-200 font-semibold">Program Change</td>
                        <td className="p-2 text-right text-rose-400">+14.13327</td>
                        <td className="p-2 text-right text-emerald-400">403.94369</td>
                      </tr>
                      <tr className="border-b border-slate-800">
                        <td className="p-2 text-[10px] text-slate-400">30 Jun 2026</td>
                        <td className="p-2 text-slate-200 font-semibold">New Part Launch</td>
                        <td className="p-2 text-right text-emerald-450">0.00000</td>
                        <td className="p-2 text-right text-emerald-400">458.50000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <p className="text-[10px] text-slate-400 italic">Margin walks show exact dates when material rates, wages, or tooling costs shifted quote viability.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-24 relative overflow-hidden" style={{ background: INK }}>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 pointer-events-none" style={{ opacity: 0.05 }}>
          <SwirlMark size={440} color={GREEN} className="animate-spin" style={{ animationDuration: "30s" }} dark />
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative">
          <div className="max-w-xl">
            <Eyebrow dark>Costing &amp; Quoting Control</Eyebrow>
            <h2 className="font-extrabold text-white mb-5 leading-[1.06] "
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(30px, 4vw, 48px)", letterSpacing: "-0.022em" }}>
              Bring Profit Certainty to Every Bid.
            </h2>
            <p className="text-[15px] leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.46)", fontFamily: "'Inter', sans-serif" }}>
              Ready to replace spreadsheets, speed up RFQ cycles by up to 90%, and manage product margins in real time? Book a discovery call today to see QuoteBase in action.
            </p>
            <div className="flex gap-3 flex-wrap">
              <PrimaryBtn onClick={() => setPage("contact")}>
                Book a Discovery Call <ArrowRight size={14} />
              </PrimaryBtn>
              <OutlineBtn dark onClick={() => setPage("capabilities")}>
                See All Modules
              </OutlineBtn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── PartBase Page ─────────────────────────────────────────────────────────────

function PartBasePage({ setPage }: { setPage: (p: Page) => void }) {
  const [activeScenario, setActiveScenario] = useState("baseline");
  const productivityRef = useRef<HTMLDivElement>(null);

  const scrollToProductivity = () => {
    productivityRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scenarios = {
    baseline: {
      title: "Baseline Forecast",
      vol: "1,200,000 units",
      rev: "$24.0M",
      margin: "18.2%",
      status: "Optimized",
      color: "#58A972",
      desc: "Standard production volumes and contract rates synced with the latest monthly market forecast releases.",
      tip: "All active programs are aligned. Current capacity usage is at 82%."
    },
    optimistic: {
      title: "Optimistic Growth Scenario",
      vol: "1,450,000 units",
      rev: "$29.0M",
      margin: "19.5%",
      status: "High Demand",
      color: "#95CBA7",
      desc: "Simulates accelerated customer pick-up rates and additional platform launches in Q3/Q4.",
      tip: "Potential capacity bottlenecks detected at Brazil assembly plant. Amortization adjustments recommended."
    },
    strike: {
      title: "OEM Strike / Shutdown",
      vol: "950,000 units",
      rev: "$19.0M",
      margin: "15.4%",
      status: "High Risk",
      color: "#ef4444",
      desc: "Models a temporary 2-month strike/stoppage at a major customer plant, reducing order volume.",
      tip: "Immediate cost mitigation needed. Sourcing raw materials should be delayed by 45 days."
    },
    shift: {
      title: "Customer Volume Shift",
      vol: "1,100,000 units",
      rev: "$22.0M",
      margin: "16.8%",
      status: "Volatile",
      color: "#f59e0b",
      desc: "Models a 20% volume drop on domestic platforms offset by foreign expansion program gains.",
      tip: "Verify currency conversion matrices for Euro and BRL transactions in ConnectBase."
    }
  };

  const currentScen = scenarios[activeScenario as keyof typeof scenarios] || scenarios.baseline;

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden" style={{ background: "#fff" }}>
        <div className="absolute pointer-events-none select-none"
          style={{ right: "-8%", top: "50%", transform: "translateY(-50%)", opacity: 0.055 }}>
          <SwirlMark size={480} color={GREEN} className="animate-spin" style={{ animationDuration: "32s" }} />
        </div>
        
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            <div>

              <h1 className="font-extrabold leading-[1.03] mb-6"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(42px, 5.5vw, 72px)",
                  letterSpacing: "-0.024em",
                  color: INK,
                }}>
                PartBase™
              </h1>
              
              <p className="text-lg font-semibold leading-snug mb-5"
                style={{ color: INK, fontFamily: "'Poppins', sans-serif" }}>
                Active Commercial Management System &amp; Rolling Business Plan.
              </p>
              
              <p className="text-[15px] leading-relaxed mb-8 text-slate-650"
                style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}>
                Saphran PartBase is the industry's leading active commercial management system. Seamlessly merge external market intelligence (market forecast subscription data) and internal cost structure records into one live, dynamic rolling forecast. Optimize profitability, run instant risk simulations, and make strategic decisions based on accurate data.
              </p>

              <div className="border-l-4 border-emerald-500 bg-[#f9f9fb] p-5 rounded-r-[5px] mb-8 max-w-2xl"
                style={{ borderLeftColor: GREEN }}>
                <p className="text-xs italic leading-relaxed text-slate-750 mb-2">
                  &quot;Saphran PartBase turned our four-month business planning process into a 2-week process with more accurate results. We now make decisions in real time.&quot;
                </p>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                  — Mid-Size Supplier
                </span>
              </div>
              
              <div className="flex gap-3 flex-wrap">
                <OutlineBtn onClick={scrollToProductivity}>
                  Compare Productivity Gains
                </OutlineBtn>
              </div>
            </div>

            <div>
              <DiscoveryCallForm />
            </div>
          </div>
        </div>
      </section>

      {/* Challenge vs Solution Section */}
      <section className="py-24" style={{ background: BONE, borderTop: "1px solid rgba(33,51,67,0.07)", borderBottom: "1px solid rgba(33,51,67,0.07)" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Eyebrow>The Challenge &amp; Solution</Eyebrow>
            <h2 className="font-bold leading-[1.12] mb-4 text-slate-900"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(28px, 3.2vw, 42px)",
                letterSpacing: "-0.02em",
                color: INK
              }}>
              The Forecasting Challenge
            </h2>
            <p className="text-sm text-slate-600" style={{ fontFamily: "'Inter', sans-serif" }}>
              Why traditional manual reporting cycles leave automotive suppliers reacting to stale insights.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
            {/* The Traditional Dilemma Timeline */}
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-rose-600 font-mono">
                <AlertCircle size={20} />
                <span className="font-bold text-xs uppercase tracking-wider">THE TRADITIONAL 9-MONTH SNAPSHOT</span>
              </div>
              
              <p className="text-sm leading-relaxed text-slate-600 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                Automotive suppliers traditionally spend three to nine months of the year manually preparing a &quot;snapshot&quot; of future opportunities.
              </p>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="flex gap-4 items-start p-4 bg-white rounded border border-slate-100 relative shadow-sm">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-rose-50 border border-rose-200 shrink-0 font-mono text-xs font-bold text-rose-650">01</div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 font-sans">Siloed Data Gathering</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Hundreds of hours lost in manual cut-and-paste Excel workflows across global plants.</p>
                  </div>
                </div>
                {/* Arrow */}
                <div className="h-4 w-px bg-slate-200 ml-7" />
                {/* Step 2 */}
                <div className="flex gap-4 items-start p-4 bg-white rounded border border-slate-100 relative shadow-sm">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-rose-50 border border-rose-200 shrink-0 font-mono text-xs font-bold text-rose-650">02</div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 font-sans">Outdated Static Snapshot</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">A static snapshot of current and future programs that takes months to compile.</p>
                  </div>
                </div>
                {/* Arrow */}
                <div className="h-4 w-px bg-slate-200 ml-7" />
                {/* Step 3 */}
                <div className="flex gap-4 items-start p-4 bg-white rounded border border-slate-100 relative shadow-sm">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-rose-50 border border-rose-200 shrink-0 font-mono text-xs font-bold text-rose-650">03</div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 font-sans">Obsolete Within Days</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">The market shifts immediately. Capital allocation plans are based on stale facts.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* The PartBase Pathway */}
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-emerald-650 font-mono">
                <Sparkles size={20} />
                <span className="font-bold text-xs uppercase tracking-wider">THE PARTBASE LIVING FORECAST</span>
              </div>
              
              <p className="text-sm leading-relaxed text-slate-600 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                PartBase integrates external market datasets and internal records into an always-current rolling forecast.
              </p>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="flex gap-4 items-start p-4 bg-white rounded border border-emerald-100 relative shadow-sm" style={{ borderLeft: `3px solid ${GREEN}` }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-emerald-50 border border-emerald-250 shrink-0 font-mono text-xs font-bold text-emerald-650">01</div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 font-sans">Automated Ingestion</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Direct sync of market databases and internal systems in under 10 minutes.</p>
                  </div>
                </div>
                {/* Arrow */}
                <div className="h-4 w-px bg-slate-200 ml-7" />
                {/* Step 2 */}
                <div className="flex gap-4 items-start p-4 bg-white rounded border border-emerald-100 relative shadow-sm" style={{ borderLeft: `3px solid ${GREEN}` }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-emerald-50 border border-emerald-250 shrink-0 font-mono text-xs font-bold text-emerald-650">02</div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 font-sans">Knowledge Overlay</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Quickly edit subscriptions and inject local plant knowledge via clean interfaces.</p>
                  </div>
                </div>
                {/* Arrow */}
                <div className="h-4 w-px bg-slate-200 ml-7" />
                {/* Step 3 */}
                <div className="flex gap-4 items-start p-4 bg-white rounded border border-emerald-100 relative shadow-sm" style={{ borderLeft: `3px solid ${GREEN}` }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-emerald-50 border border-emerald-250 shrink-0 font-mono text-xs font-bold text-emerald-650">03</div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 font-sans">Active Decision Layer</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Run what-if simulations for strikes or tariff impacts, keeping plans current 365 days a year.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Productivity Gains Chart Section */}
      <section ref={productivityRef} className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-12 items-center">
            
            {/* Left text description */}
            <div>
              <Eyebrow>Productivity Comparison</Eyebrow>
              <h2 className="font-bold leading-[1.12] mb-6 text-slate-900"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(26px, 2.8vw, 36px)",
                  letterSpacing: "-0.02em",
                  color: INK
                }}>
                80 Hours vs. 10 Minutes
              </h2>
              <p className="text-[14px] leading-relaxed text-slate-650 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                Updating a supplier book of business conventionally takes about 80 hours of manual lookup, translation, and verification. PartBase leverages **Smart_ItemLink™** and Market Data Integration to download and align your whole subscription in under 10 minutes.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1 font-mono text-[9px] font-bold text-slate-600">A</div>
                  <p className="text-[12px] text-slate-650"><strong>Respond to Market Changes Sooner:</strong> Replace monthly manual loops with minutes of auto-updates.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1 font-mono text-[9px] font-bold text-slate-600">B</div>
                  <p className="text-[12px] text-slate-650"><strong>Spot Trends Earlier:</strong> Frequent rolling snapshots allow you to exploit positive opportunities and enact countermeasures for bad trends before they impact profits.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1 font-mono text-[9px] font-bold text-slate-600">C</div>
                  <p className="text-[12px] text-slate-650"><strong>Avert Unneeded Spending:</strong> Spotting risk early helps avert capacity over-expansion (e.g. one client saved $10M in unneeded machinery in 2007 by running PartBase what-if reviews).</p>
                </div>
              </div>
            </div>

            {/* Right Chart Visualization */}
            <div className="bg-[#f8f8fa] p-8 rounded-xl border border-slate-200">
              <span className="block text-[10px] uppercase font-mono tracking-widest text-slate-400 mb-6 text-center">
                Time required to update book of business volumes
              </span>
              
              <div className="flex justify-around items-end h-64 gap-8 pb-6 border-b border-slate-300 relative">
                {/* 80 hours bar */}
                <div className="flex flex-col items-center w-full max-w-[120px]">
                  <span className="font-mono text-xs font-bold text-slate-600 mb-2">80 Hours</span>
                  <div className="w-full bg-slate-300 rounded-t-md hover:bg-slate-400 transition-colors" style={{ height: "180px" }}></div>
                  <span className="text-[11px] font-semibold text-slate-500 mt-3 text-center">Conventional Method</span>
                </div>

                {/* 10 minutes bar */}
                <div className="flex flex-col items-center w-full max-w-[120px]">
                  <span className="font-mono text-xs font-bold text-emerald-600 mb-2">10 Mins</span>
                  <div className="w-full rounded-t-md hover:opacity-90 transition-opacity" style={{ height: "6px", background: GREEN }}></div>
                  <span className="text-[11px] font-bold mt-3 text-center" style={{ color: GREEN }}>Saphran PartBase</span>
                </div>

                {/* Visual Connector / Lightning Line */}
                <div className="absolute right-1/2 translate-x-12 top-10 flex flex-col items-center text-rose-500">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-50 border border-rose-250 px-2 py-0.5 rounded shadow">
                    99.8% Faster
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 text-[11px] text-slate-500 text-center font-mono">
                <div>Conventional Update: <strong className="text-slate-700">80 hours</strong></div>
                <div>Saphran PartBase: <strong className="text-slate-700">10 mins</strong></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Live System Interface Mockup (Market Forecast Reference & Internal Forecasts) */}
      <section className="py-24 text-white" style={{ background: INK }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-12 items-center">
            
            {/* Description of change flags */}
            <div>
              <Eyebrow dark>Data Accuracy &amp; Flags</Eyebrow>
              <h2 className="font-bold leading-[1.12] mb-6"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(26px, 2.8vw, 36px)",
                  letterSpacing: "-0.02em"
                }}>
                Automated Flags on Monthly Market Forecast Changes
              </h2>
              <p className="text-xs leading-relaxed text-slate-650 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                PartBase protects forecast integrity by highlighting monthly adjustments to the market forecast subscription database. The system automatically identifies volume changes and applies indicators.
              </p>

              <div className="space-y-3">
                <div className="p-3 bg-rose-50/50 border border-rose-100 rounded">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-rose-800">Dropped Program (Red Flag)</span>
                    <span className="text-[9px] font-mono bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded">Critical Action</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Indicates a previously assigned program has been dropped from the market forecast subscription database. Alerts account managers immediately.</p>
                </div>
                
                <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-emerald-800">Similar Program (Green Plus)</span>
                    <span className="text-[9px] font-mono bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">Suggestion</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Identifies new program entries with similar attributes to existing parts, suggesting target routing configurations.</p>
                </div>
              </div>
            </div>

            {/* High-Fidelity UI Table Mockup */}
            <div className="bg-[#1c2a38] text-white p-6 rounded-lg border border-slate-700 font-sans shadow-lg text-[11px] leading-normal">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700 font-mono text-[10px] text-slate-400">
                <span>SAPHRAN PartBase FORECAST MANAGER</span>
                <span>Role: Forecast Planner</span>
              </div>
              
              <div className="space-y-5">
                {/* Table 1: Reference Forecasts */}
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">REFERENCE FORECAST</span>
                  <div className="border border-slate-700 rounded overflow-hidden">
                    <table className="w-full text-left font-mono">
                      <thead>
                        <tr className="bg-slate-800 text-slate-400 border-b border-slate-700 text-[9px] uppercase">
                          <th className="p-2">Default</th>
                          <th className="p-2">Forecast Data Type</th>
                          <th className="p-2">Reference Forecast</th>
                          <th className="p-2 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-800">
                          <td className="p-2"><input type="radio" checked readOnly className="accent-emerald-500" /></td>
                          <td className="p-2 text-slate-200">VEHICLE</td>
                          <td className="p-2 text-slate-400 text-xs">CSM Vehicle Forecast</td>
                          <td className="p-2 text-right">
                            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[9px] font-bold cursor-default">DOWNLOADED</span>
                          </td>
                        </tr>
                        <tr className="border-b border-slate-800">
                          <td className="p-2"><input type="radio" checked={false} readOnly /></td>
                          <td className="p-2 text-slate-200">ENGINE</td>
                          <td className="p-2 text-slate-400 text-xs">CSM Engine Forecast</td>
                          <td className="p-2 text-right">
                            <button className="bg-slate-700 hover:bg-slate-650 text-white px-2 py-0.5 rounded text-[9px] font-bold transition-colors">UPDATE ENGINES</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Table 2: Internal Forecasts */}
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">INTERNAL FORECAST RUNS</span>
                  <div className="border border-slate-700 rounded overflow-hidden">
                    <table className="w-full text-left font-mono">
                      <thead>
                        <tr className="bg-slate-800 text-slate-400 border-b border-slate-700 text-[9px] uppercase">
                          <th className="p-2">Forecast Name</th>
                          <th className="p-2">Create Date</th>
                          <th className="p-2">Reference Forecast</th>
                          <th className="p-2 text-center">Active</th>
                          <th className="p-2 text-center">Locked</th>
                          <th className="p-2 text-center">Linked</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-800">
                          <td className="p-2 text-emerald-400 font-semibold cursor-pointer hover:underline">Pessimistic Run</td>
                          <td className="p-2 text-slate-400">30 Sep 2026</td>
                          <td className="p-2 text-slate-400">CSM Vehicle Forecast</td>
                          <td className="p-2 text-center"><span className="text-emerald-400">🟢</span></td>
                          <td className="p-2 text-center"><span className="text-rose-500">🔴</span></td>
                          <td className="p-2 text-center"><span className="text-emerald-400">🟢</span></td>
                        </tr>
                        <tr className="border-b border-slate-800">
                          <td className="p-2 text-emerald-400 font-semibold cursor-pointer hover:underline">Optimistic Engine</td>
                          <td className="p-2 text-slate-400">05 Nov 2026</td>
                          <td className="p-2 text-slate-400">CSM Engine Forecast</td>
                          <td className="p-2 text-center"><span className="text-emerald-400">🟢</span></td>
                          <td className="p-2 text-center"><span className="text-emerald-400">🟢</span></td>
                          <td className="p-2 text-center"><span className="text-rose-500">🔴</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Scenario Simulator Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-12 items-center">
            
            {/* Selector panel */}
            <div>
              <Eyebrow>What-If Analysis</Eyebrow>
              <h2 className="font-bold leading-[1.12] mb-6 text-slate-900"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(26px, 2.8vw, 36px)",
                  letterSpacing: "-0.02em",
                  color: INK
                }}>
                Simulate Alternative Market Scenarios
              </h2>
              <p className="text-[14px] leading-relaxed text-slate-650 mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
                Test cost, price, and volume shifts in minutes. Click below to simulate typical market risks and view the projected impact on book-of-business profitability.
              </p>

              <div className="space-y-2">
                {[
                  { id: "baseline", name: "Baseline Forecast", label: "Baseline market forecast monthly volumes" },
                  { id: "optimistic", name: "Optimistic Growth", label: "Accelerated platform launches" },
                  { id: "strike", name: "OEM Plant Strike", label: "Temporary 2-month customer halt" },
                  { id: "shift", name: "Customer Volume Shift", label: "Domestic platform consolidation" },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveScenario(s.id)}
                    className={`w-full text-left p-3.5 rounded-lg border transition-all duration-150 flex items-center justify-between ${
                      activeScenario === s.id 
                        ? "bg-[#f4f7f6] border-[#58A972] shadow-sm" 
                        : "bg-white border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div>
                      <span className="block text-xs font-bold text-slate-800">{s.name}</span>
                      <span className="block text-[10px] text-slate-500 mt-0.5">{s.label}</span>
                    </div>
                    {activeScenario === s.id && <Check size={14} style={{ color: GREEN }} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Projected Impact Panel */}
            <div className="bg-[#1c2a38] text-white p-8 rounded-xl border border-slate-700 font-sans shadow-lg">
              <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: GREEN_TINT }}>
                Active Scenario Projection
              </span>
              
              <h3 className="font-bold text-xl mb-3 mt-1 text-slate-100" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {currentScen.title}
              </h3>
              
              <p className="text-[13px] leading-relaxed text-slate-350 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                {currentScen.desc}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-900/40 p-4 rounded border border-slate-750 font-mono text-center mb-6">
                <div>
                  <span className="block text-slate-400 text-[8px] uppercase tracking-wider">Projected Vol</span>
                  <span className="text-slate-100 font-bold text-[13px]">{currentScen.vol}</span>
                </div>
                <div>
                  <span className="block text-slate-400 text-[8px] uppercase tracking-wider">Revenue</span>
                  <span className="text-slate-100 font-bold text-[13px]">{currentScen.rev}</span>
                </div>
                <div>
                  <span className="block text-slate-400 text-[8px] uppercase tracking-wider">Gross Margin</span>
                  <span className="font-bold text-[13px]" style={{ color: currentScen.color }}>{currentScen.margin}</span>
                </div>
                <div>
                  <span className="block text-slate-400 text-[8px] uppercase tracking-wider">Risk Level</span>
                  <span className="text-slate-100 font-bold text-[13px]">{currentScen.status}</span>
                </div>
              </div>

              <div className="border border-white/5 bg-white/5 p-4 rounded flex items-start gap-3">
                <Shield size={16} className="shrink-0 mt-0.5" style={{ color: currentScen.color }} />
                <div>
                  <span className="font-semibold text-slate-200 text-xs font-mono uppercase tracking-wider">Saphran AI Recommendation</span>
                  <p className="text-[11px] text-slate-400 mt-1">{currentScen.tip}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="py-24" style={{ background: BONE, borderTop: "1px solid rgba(33,51,67,0.07)" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Eyebrow>Core Platform Features</Eyebrow>
            <h2 className="font-bold leading-[1.12] mb-4 text-slate-900"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(28px, 3.2vw, 42px)",
                letterSpacing: "-0.02em",
                color: INK
              }}>
              PartBase™ Key Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4 text-emerald-600">
                <Database size={16} />
              </div>
              <h4 className="font-bold text-sm mb-2 text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>Smart_ItemLink™ Technology</h4>
              <p className="text-xs leading-relaxed text-slate-500">Align your vehicle, engine, or transmission subscriptions instantly. Synchronize SOP, EOP, and contract pricing without cut-and-paste.</p>
            </div>

            <div className="bg-white p-6 rounded border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4 text-emerald-600">
                <Shield size={16} />
              </div>
              <h4 className="font-bold text-sm mb-2 text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>Automated Monthly Change Alerts</h4>
              <p className="text-xs leading-relaxed text-slate-500">Identify Dropped (Red Flag) or Added (Green Plus) programs on monthly market forecast updates automatically to adjust pricing.</p>
            </div>

            <div className="bg-white p-6 rounded border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4 text-emerald-600">
                <BarChart2 size={16} />
              </div>
              <h4 className="font-bold text-sm mb-2 text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>Multi-Attribute Reporting</h4>
              <p className="text-xs leading-relaxed text-slate-500">Track and report over 100 attributes. Compare current business plans against last month, last quarter, or current month.</p>
            </div>

            <div className="bg-white p-6 rounded border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4 text-emerald-600">
                <Activity size={16} />
              </div>
              <h4 className="font-bold text-sm mb-2 text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>BOM &amp; Costing Integration</h4>
              <p className="text-xs leading-relaxed text-slate-500">Link directly with Saphran QuoteBase to push cost models to forward profit plans, avoiding dual sales entries.</p>
            </div>

            <div className="bg-white p-6 rounded border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4 text-emerald-600">
                <RefreshCw size={16} />
              </div>
              <h4 className="font-bold text-sm mb-2 text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>ERP Ship History Integration</h4>
              <p className="text-xs leading-relaxed text-slate-500">Connect your SAP, QAD, or other ERP systems using ConnectBase to import actual ship history and customer EDI releases.</p>
            </div>

            <div className="bg-white p-6 rounded border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4 text-emerald-600">
                <Globe2 size={16} />
              </div>
              <h4 className="font-bold text-sm mb-2 text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>Rolling Business Plan Alignment</h4>
              <p className="text-xs leading-relaxed text-slate-500">Keep rolling business plans aligned year-round for strategic pricing, outsourcing, and capital investments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-24 relative overflow-hidden" style={{ background: INK }}>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 pointer-events-none" style={{ opacity: 0.05 }}>
          <SwirlMark size={440} color={GREEN} className="animate-spin" style={{ animationDuration: "30s" }} dark />
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative">
          <div className="max-w-xl">
            <Eyebrow dark>Forecast Optimization</Eyebrow>
            <h2 className="font-extrabold text-white mb-5 leading-[1.06]"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(30px, 4vw, 48px)", letterSpacing: "-0.022em" }}>
              Make Decisions in Real Time.
            </h2>
            <p className="text-[15px] leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.46)", fontFamily: "'Inter', sans-serif" }}>
              Ready to replace manual snapshot forecasts, reduce update times by 99%, and simulate alternative scenarios? Book a discovery call today to see Saphran PartBase in action.
            </p>
            <div className="flex gap-3 flex-wrap">
              <PrimaryBtn onClick={() => setPage("contact")}>
                Book a Discovery Call <ArrowRight size={14} />
              </PrimaryBtn>
              <OutlineBtn dark onClick={() => setPage("capabilities")}>
                Explore Capabilities
              </OutlineBtn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── ConnectBase Page ──────────────────────────────────────────────────────────

function ConnectBasePage({ setPage }: { setPage: (p: Page) => void }) {
  const [alignmentStep, setAlignmentStep] = useState(1);
  const simulatorRef = useRef<HTMLDivElement>(null);

  const scrollToSimulator = () => {
    simulatorRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getStepData = (step: number) => {
    switch (step) {
      case 1:
        return {
          title: "Step 1: Automated ERP Ingestion",
          desc: "Ship history and customer EDI releases are imported directly from your ERP (SAP, QAD, Oracle) via Secure FTP (SFTP) or a database view.",
          details: [
            "Connection Setup: Supports source plant, ship-to customer, and dates",
            "Automatic Syncing: Eliminates cut-and-paste or manual Excel workbook imports",
            "In-Process Job Logs: View active jobs, imported records, and date ranges"
          ]
        };
      case 2:
        return {
          title: "Step 2: Align Unique Matches",
          desc: "Our matching algorithm automatically detects 1-to-1 relationships where a shipped part maps to exactly one forecast part based on plant, customer, and part number.",
          details: [
            "One-Click Acceptance: Process and accept all unique matches instantly",
            "Productivity Enhancement: Reduces hours of lookup work to seconds",
            "Skip or Comment: Skip and optionally record notes for later review"
          ]
        };
      case 3:
        return {
          title: "Step 3: Resolve Mismatches & Aliases",
          desc: "For shipped parts with multiple potential matches (mismatches), the system suggests best matches which you can approve or manually expand.",
          details: [
            "Customer ship-to aliases: Align customer locations to forecast names",
            "Part number matching suggestions: Expand match options based on plant attributes",
            "Historical database memory: Remember resolved alignments for future uploads"
          ]
        };
      case 4:
        return {
          title: "Step 4: Shared Opportunities & Volume Splits",
          desc: "When a single shipped part number maps to multiple forecast records (e.g. front and rear bumper opportunities), ConnectBase splits the shipped volume based on forecast ratios.",
          details: [
            "Proportional allocation: January actual ship volume is divided across program parts",
            "BOM Pricing Alignment: Check latest shipped pricing vs. forecast price",
            "Unpredicted volume flags: Catches ship volume with no active forecast assignments"
          ]
        };
      default:
        return { title: "", desc: "", details: [] };
    }
  };

  const currentStep = getStepData(alignmentStep);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden" style={{ background: "#fff" }}>
        <div className="absolute pointer-events-none select-none"
          style={{ right: "-8%", top: "50%", transform: "translateY(-50%)", opacity: 0.055 }}>
          <SwirlMark size={480} color={GREEN} className="animate-spin" style={{ animationDuration: "32s" }} />
        </div>
        
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            <div>

              <h1 className="font-extrabold leading-[1.03] mb-6"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(42px, 5.5vw, 72px)",
                  letterSpacing: "-0.024em",
                  color: INK,
                }}>
                ConnectBase™
              </h1>
              
              <p className="text-lg font-semibold leading-snug mb-5"
                style={{ color: INK, fontFamily: "'Poppins', sans-serif" }}>
                Automated ERP &amp; EDI Integration for Closed-Loop Forecasts.
              </p>
              
              <p className="text-[15px] leading-relaxed mb-8 text-slate-650"
                style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}>
                Saphran ConnectBase closes the loop between forecast planning and actual shipments. Automatically import actual ship history and customer EDI releases from your SAP, Oracle, QAD, or custom database systems. Align shipped parts, update prices based on actual transactions, and generate actual-vs-forecast comparison reports in real time.
              </p>

              <div className="border-l-4 border-emerald-500 bg-[#f9f9fb] p-5 rounded-r-[5px] mb-8 max-w-2xl"
                style={{ borderLeftColor: GREEN }}>
                <p className="text-xs italic leading-relaxed text-slate-750 mb-2">
                  &quot;ConnectBase closed the loop for our business. Aligning actual shipment data with long-range vehicle program forecasts is now completely automated, saving us weeks of manual data lookup.&quot;
                </p>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                  — Automotive Tier 1 VP of Planning
                </span>
              </div>
              
              <div className="flex gap-3 flex-wrap">
                <OutlineBtn onClick={scrollToSimulator}>
                  Explore Data Alignment Flow
                </OutlineBtn>
              </div>
            </div>

            <div>
              <DiscoveryCallForm />
            </div>
          </div>
        </div>
      </section>

      {/* Challenge vs Solution Section */}
      <section className="py-24" style={{ background: BONE, borderTop: "1px solid rgba(33,51,67,0.07)", borderBottom: "1px solid rgba(33,51,67,0.07)" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Eyebrow>The Alignment Dilemma</Eyebrow>
            <h2 className="font-bold leading-[1.12] mb-4 text-slate-900"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(28px, 3.2vw, 42px)",
                letterSpacing: "-0.02em",
                color: INK
              }}>
              The Data Reconciling Challenge
            </h2>
            <p className="text-sm text-slate-650" style={{ fontFamily: "'Inter', sans-serif" }}>
              Reconciling actual shipments against vehicle program forecasts is traditionally a massive manual effort.
            </p>
          </div>

          {/* Redesigned Systems Integration Map */}
          <div className="space-y-12 mt-12">
            {/* The Disconnected Void (Before) */}
            <div className="bg-[#fcfaf7] border border-[#f5eae1] rounded-lg p-8 relative overflow-hidden">
              <div className="flex items-center gap-2.5 mb-6 text-[#C4473A] font-mono">
                <AlertCircle size={20} />
                <span className="font-bold text-xs uppercase tracking-wider">THE DISCONNECTED VOID (CONVENTIONAL SETUP)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center relative z-10">
                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-xs text-slate-800 font-mono mb-2">ERP SHIP HISTORY</h4>
                  <p className="text-[10px] text-slate-500">Contains customer part numbers and raw shipment quantities by code.</p>
                </div>
                
                {/* Break Indicator */}
                <div className="flex flex-col items-center justify-center p-3 font-mono">
                  <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 font-bold mb-1">✕</div>
                  <span className="text-[9px] text-rose-500 uppercase font-bold tracking-wider">Manual Reconciliation Gap</span>
                  <span className="text-[8px] text-slate-400 mt-0.5">Weeks spent mapping parts on spreadsheets</span>
                </div>

                <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-xs text-slate-800 font-mono mb-2">LONG-RANGE PLANS</h4>
                  <p className="text-[10px] text-slate-500">Commercial opportunities and program volumes managed by sales.</p>
                </div>
              </div>
            </div>

            {/* The ConnectBase Loop (After) */}
            <div className="bg-[#f7faf8] border border-emerald-100 rounded-lg p-8 relative overflow-hidden" style={{ borderTopWidth: "4px", borderTopColor: GREEN }}>
              <div className="flex items-center gap-2.5 mb-6 text-emerald-650 font-mono">
                <Sparkles size={20} />
                <span className="font-bold text-xs uppercase tracking-wider">THE CONNECTBASE CLOSED-LOOP SYSTEM</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center text-center relative z-10 font-mono">
                {/* Inputs */}
                <div className="space-y-3 col-span-1 md:col-span-1">
                  <div className="bg-white p-3 rounded border border-slate-200 shadow-xs">
                    <span className="block font-bold text-[9px] text-slate-700">ERP Shipment History</span>
                  </div>
                  <div className="bg-white p-3 rounded border border-slate-200 shadow-xs">
                    <span className="block font-bold text-[9px] text-slate-700">Customer EDI Releases</span>
                  </div>
                </div>

                {/* Connector Arrow */}
                <div className="text-slate-400 text-lg hidden md:block">→</div>

                {/* ConnectBase Engine */}
                <div className="bg-slate-900 text-white p-5 rounded-lg border border-emerald-500/20 shadow-md col-span-1 md:col-span-1">
                  <span className="block font-bold text-[9px] text-emerald-400 uppercase tracking-widest mb-1.5">CONNECTBASE</span>
                  <div className="space-y-1 text-[8px] text-slate-350 text-left">
                    <div>• Automated SFTP/View ingestion</div>
                    <div>• 1-to-1 unique mapping router</div>
                    <div>• Suggested mismatch wizard</div>
                  </div>
                </div>

                {/* Connector Arrow */}
                <div className="text-slate-400 text-lg hidden md:block">→</div>

                {/* Results */}
                <div className="space-y-3 col-span-1 md:col-span-1">
                  <div className="bg-white p-3 rounded border border-emerald-300 shadow-xs" style={{ borderLeft: `3px solid ${GREEN}` }}>
                    <span className="block font-bold text-[9px] text-slate-800">Closed-Loop Forecast</span>
                  </div>
                  <div className="bg-white p-3 rounded border border-emerald-300 shadow-xs" style={{ borderLeft: `3px solid ${GREEN}` }}>
                    <span className="block font-bold text-[9px] text-slate-800">Unpredicted Shipped Flags</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Alignment Simulator */}
      <section ref={simulatorRef} className="py-24 text-white" style={{ background: INK }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <Eyebrow dark>Data Flow Simulator</Eyebrow>
            <h2 className="font-bold leading-[1.12] mb-4"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(28px, 3.2vw, 42px)",
                letterSpacing: "-0.02em"
              }}>
              Saphran ConnectBase Alignment In Action
            </h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.44)", fontFamily: "'Inter', sans-serif" }}>
              Explore how raw shipment datasets are ingested, mapped, and aligned to keep your forecasts living and accurate. Use the workflow buttons to step through the integration.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-12 items-start">
            {/* Left Steps Panel */}
            <div className="space-y-6">
              <div className="flex gap-2 flex-wrap mb-4">
                {[1, 2, 3, 4].map((stepNum) => (
                  <button
                    key={stepNum}
                    onClick={() => setAlignmentStep(stepNum)}
                    className={`px-3 py-1.5 rounded font-mono text-xs font-bold transition-all duration-150 ${
                      alignmentStep === stepNum 
                        ? "bg-[#2d4356] text-white border-b-2 border-emerald-450" 
                        : "text-slate-400 hover:text-white bg-white/5"
                    }`}
                  >
                    Step {stepNum}
                  </button>
                ))}
              </div>

              <div className="bg-[#16222e] p-6 rounded-lg border border-white/5">
                <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: GREEN_TINT }}>
                  Workflow Process
                </span>
                <h3 className="font-bold text-lg mb-3 mt-1 text-slate-100" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {currentStep.title}
                </h3>
                <p className="text-[13px] leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.52)", fontFamily: "'Inter', sans-serif" }}>
                  {currentStep.desc}
                </p>

                <ul className="space-y-3">
                  {currentStep.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                      <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-emerald-500/10 border border-emerald-500/20">
                        <Check size={7} className="text-emerald-400" />
                      </div>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {alignmentStep < 4 ? (
                <button
                  onClick={() => setAlignmentStep(alignmentStep + 1)}
                  className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded bg-emerald-600 hover:bg-emerald-500 text-slate-900 font-mono transition-colors"
                >
                  Proceed to Next Step <ArrowRight size={12} />
                </button>
              ) : (
                <button
                  onClick={() => setAlignmentStep(1)}
                  className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded border border-white/20 hover:bg-white/5 text-white font-mono transition-all"
                >
                  Restart Simulation <RefreshCw size={12} />
                </button>
              )}
            </div>

            {/* Right Live UI Mockup */}
            <div>
              <span className="block text-[9px] uppercase tracking-wider text-slate-400 mb-2 font-mono text-center">
                Simulated ConnectBase Alignment Interface
              </span>

              {alignmentStep === 1 && (
                <div className="bg-[#1c2a38] text-white p-5 rounded-lg border border-slate-700 font-sans shadow-lg text-[12px] leading-relaxed font-mono">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700">
                    <span className="font-semibold text-slate-200">System Admin: Ship History Upload</span>
                    <span className="text-[9px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">SFTP Status</span>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-slate-900/60 p-3 rounded border border-slate-800 text-[11px] space-y-2">
                      <div>External Source: <span className="text-emerald-400">POCRM</span></div>
                      <div>Latest Month/Year: <span className="text-slate-200">Q2 2026</span></div>
                      <div>Most Recent Import: <span className="text-slate-200">Thu May 18 10:02:31 EDT 2026</span></div>
                    </div>
                    <div className="p-3 bg-slate-800/80 rounded border border-slate-700">
                      <span className="block text-[8px] uppercase tracking-wider text-slate-400 mb-1 font-bold">Active Connection Stream</span>
                      <div className="flex justify-between items-center text-[10px]">
                        <span>SFTP Stream (saphran_upload_job)</span>
                        <span className="text-emerald-400 animate-pulse">● CONNECTED</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {alignmentStep === 2 && (
                <div className="bg-[#1c2a38] text-white p-5 rounded-lg border border-slate-700 font-sans shadow-lg text-[12px] leading-relaxed">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700 font-mono">
                    <span className="font-semibold text-slate-200">Unique Part Number Alignment</span>
                    <span className="text-[9px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">1-to-1 Matches</span>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-800/70 rounded border border-slate-700">
                      <div className="flex justify-between font-mono text-[10px] text-slate-400">
                        <span>Imported Part No</span>
                        <span>Matching parent Customer</span>
                      </div>
                      <div className="flex justify-between items-center mt-1.5 font-sans">
                        <span className="font-semibold text-slate-200 text-xs">Dana Holding [Dana Long]</span>
                        <span className="text-emerald-400 font-semibold font-mono text-[11px]">General Motors</span>
                      </div>
                      <div className="flex gap-2 justify-end mt-2.5 font-mono text-[9px]">
                        <button className="bg-slate-750 hover:bg-slate-700 border border-slate-700 text-slate-300 px-2 py-0.5 rounded">SKIP &amp; NOTE</button>
                        <button className="bg-emerald-500 hover:bg-emerald-450 text-slate-900 font-bold px-2 py-0.5 rounded">ALIGN PART</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {alignmentStep === 3 && (
                <div className="bg-[#1c2a38] text-white p-5 rounded-lg border border-slate-700 font-sans shadow-lg text-[11px] leading-relaxed">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700 font-mono">
                    <span className="font-semibold text-slate-200">Part Number Mismatches Console</span>
                    <span className="text-[9px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">Suggestions</span>
                  </div>
                  <div className="space-y-4">
                    <div className="border border-slate-700 rounded overflow-hidden font-mono">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-slate-800 text-slate-400 border-b border-slate-700 text-[8px] uppercase">
                            <th className="p-2">Imported Part #</th>
                            <th className="p-2">Suggested Matches</th>
                            <th className="p-2 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-800">
                            <td className="p-2 font-semibold text-slate-200">12345-a</td>
                            <td className="p-2">
                              <select className="bg-slate-850 border border-slate-700 text-slate-200 rounded px-1 text-[10px]">
                                <option>12345-C (Exhaust Manifold)</option>
                                <option>12345-Crr (Exhaust Manifold)</option>
                              </select>
                            </td>
                            <td className="p-2 text-right">
                              <button className="bg-slate-700 hover:bg-slate-650 text-white px-2 py-0.5 rounded text-[8px] font-bold">SUGGEST</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {alignmentStep === 4 && (
                <div className="bg-[#1c2a38] text-white p-5 rounded-lg border border-slate-700 font-sans shadow-lg text-[12px] leading-relaxed">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700 font-mono">
                    <span className="font-semibold text-slate-200">Proportional Volume Allocation</span>
                    <span className="text-[9px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">Shared Alignment</span>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-slate-900/60 p-3.5 rounded border border-slate-800 text-[11px] font-mono space-y-2">
                      <div className="flex justify-between border-b border-slate-750 pb-1">
                        <span>Total Shipped Volume:</span>
                        <span className="text-emerald-400 font-bold">6,000 units</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="block font-sans text-slate-200">Part A (GM-Dis1)</span>
                          <span className="block text-[8px] text-slate-500">Forecast ratio: 66.7%</span>
                        </div>
                        <span className="text-slate-100 font-semibold font-mono">4,000 units</span>
                      </div>
                      <div className="flex justify-between items-center pt-1.5 border-t border-slate-800">
                        <div>
                          <span className="block font-sans text-slate-200">Part B (GM-Dis2)</span>
                          <span className="block text-[8px] text-slate-500">Forecast ratio: 33.3%</span>
                        </div>
                        <span className="text-slate-100 font-semibold font-mono">2,000 units</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Key Features & Technology */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Eyebrow>Core Platform Features</Eyebrow>
            <h2 className="font-bold leading-[1.12] mb-4 text-slate-900"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(28px, 3.2vw, 42px)",
                letterSpacing: "-0.02em",
                color: INK
              }}>
              ConnectBase™ Key Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4 text-emerald-600">
                <Database size={16} />
              </div>
              <h4 className="font-bold text-sm mb-2 text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>ERP Ship History Integration</h4>
              <p className="text-xs leading-relaxed text-slate-500">Connect to your SAP, QAD, Oracle, or specialized databases using SFTP or database views. Automatically transfer shipped part records.</p>
            </div>

            <div className="bg-white p-6 rounded border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4 text-emerald-600">
                <Layers size={16} />
              </div>
              <h4 className="font-bold text-sm mb-2 text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>Smart Mismatch Routing</h4>
              <p className="text-xs leading-relaxed text-slate-500">Suggested alignments map customer aliases, ship-to codes, and parts automatically, letting you resolve mismatches quickly.</p>
            </div>

            <div className="bg-white p-6 rounded border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4 text-emerald-600">
                <Clock size={16} />
              </div>
              <h4 className="font-bold text-sm mb-2 text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>Proportional Volume Splits</h4>
              <p className="text-xs leading-relaxed text-slate-500">Distribute shipment volumes and revenues across multiple program assignments proportionally based on forecast ratio.</p>
            </div>

            <div className="bg-white p-6 rounded border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4 text-emerald-600">
                <DollarSign size={16} />
              </div>
              <h4 className="font-bold text-sm mb-2 text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>Automated Price Updates</h4>
              <p className="text-xs leading-relaxed text-slate-500">Update forecast unit prices automatically based on actual shipped prices. Includes a manual bypass option to use forecast rates.</p>
            </div>

            <div className="bg-white p-6 rounded border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4 text-emerald-600">
                <BarChart2 size={16} />
              </div>
              <h4 className="font-bold text-sm mb-2 text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>Actuals vs. Forecast Reporting</h4>
              <p className="text-xs leading-relaxed text-slate-500">Produce direct comparison reports comparing actual ship history with long-range plans, exposing unpredicted volumes.</p>
            </div>

            <div className="bg-white p-6 rounded border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4 text-emerald-600">
                <Sparkles size={16} />
              </div>
              <h4 className="font-bold text-sm mb-2 text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>Composite Forecast Engine</h4>
              <p className="text-xs leading-relaxed text-slate-500">Combine ship history, customer EDI releases, and third-party market forecasts into a single rolling forecast view.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-24 relative overflow-hidden" style={{ background: INK }}>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 pointer-events-none" style={{ opacity: 0.05 }}>
          <SwirlMark size={440} color={GREEN} className="animate-spin" style={{ animationDuration: "30s" }} dark />
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative">
          <div className="max-w-xl">
            <Eyebrow dark>Data Alignment Control</Eyebrow>
            <h2 className="font-extrabold text-white mb-5 leading-[1.06]"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(30px, 4vw, 48px)", letterSpacing: "-0.022em" }}>
              Close the Loop on Actuals.
            </h2>
            <p className="text-[15px] leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.46)", fontFamily: "'Inter', sans-serif" }}>
              Ready to replace manual alignment spreadsheet loops, automate ship history allocations, and report against real-time transactional pricing? Book a discovery call today to see Saphran ConnectBase in action.
            </p>
            <div className="flex gap-3 flex-wrap">
              <PrimaryBtn onClick={() => setPage("contact")}>
                Book a Discovery Call <ArrowRight size={14} />
              </PrimaryBtn>
              <OutlineBtn dark onClick={() => setPage("capabilities")}>
                Explore All Modules
              </OutlineBtn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── IntelligenceBase Page ─────────────────────────────────────────────────────

function IntelligenceBasePage({ setPage }: { setPage: (p: Page) => void }) {
  const [activeCubeDimension, setActiveCubeDimension] = useState("market_data");
  const cubeSectionRef = useRef<HTMLDivElement>(null);

  const scrollToCube = () => {
    cubeSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const cubeDimensions = [
    {
      id: "market_data",
      name: "Market Forecast Data",
      icon: <Database size={15} />,
      title: "Market Intelligence Integration",
      description: "Directly merges automotive vehicle production forecasts and powertrain details from your market forecast subscription into the Saphran data warehouse.",
      fields: ["Vehicle Platforms", "Powertrain Specs", "Engine & Transmission volumes", "OEM Launch Timelines"]
    },
    {
      id: "parts",
      name: "Parts & Program Relationships",
      icon: <Layers size={15} />,
      title: "Commercial Alignment Matrices",
      description: "Matches shipped part records and customer-specific assemblies with long-range program forecasts, creating clear relational structures.",
      fields: ["Internal Part Numbers", "Customer Part Numbers", "Plant Allocations", "Program Assignments"]
    },
    {
      id: "chronology",
      name: "Date Chronology",
      icon: <Clock size={15} />,
      title: "Temporal Dimensions",
      description: "Orders all pre-calculated metrics across uniform time frames to enable simple month-over-month or year-over-year trending.",
      fields: ["Monthly Actuals", "Quarterly Projections", "5-Year Book-of-Business Outlook", "LTA Pricing Periods"]
    },
    {
      id: "lifecycle",
      name: "Lifecycle & Statuses",
      icon: <Activity size={15} />,
      title: "Commercial Maturity Stages",
      description: "Filters and groups forecast volumes based on their probability status, helping executives identify volume risk.",
      fields: ["Production (Active)", "Awarded (BOM Locked)", "Quoted (RFQ Pending)", "Targeted (Early Stage)"]
    }
  ];

  const currentDim = cubeDimensions.find(d => d.id === activeCubeDimension) || cubeDimensions[0];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden" style={{ background: "#fff" }}>
        <div className="absolute pointer-events-none select-none"
          style={{ right: "-8%", top: "50%", transform: "translateY(-50%)", opacity: 0.055 }}>
          <SwirlMark size={480} color={GREEN} className="animate-spin" style={{ animationDuration: "32s" }} />
        </div>
        
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            <div>

              <h1 className="font-extrabold leading-[1.03] mb-6"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(42px, 5.5vw, 72px)",
                  letterSpacing: "-0.024em",
                  color: INK,
                }}>
                IntelligenceBase™
              </h1>
              
              <p className="text-lg font-semibold leading-snug mb-5"
                style={{ color: INK, fontFamily: "'Poppins', sans-serif" }}>
                Active Analytics Framework &amp; Pre-Calculated Data Cube.
              </p>
              
              <p className="text-[15px] leading-relaxed mb-8 text-slate-650"
                style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}>
                Transition from passive Excel sheets to active business intelligence. Saphran IntelligenceBase is an analytics framework that includes a calculated data warehouse, analytics cube, and a Microsoft Excel pivot user interface. Refreshed daily from the central Saphran database, it provides instant access to calculated volume, revenue, and sales-per-vehicle metrics across your entire operations.
              </p>

              <div className="border-l-4 border-emerald-500 bg-[#f9f9fb] p-5 rounded-r-[5px] mb-8 max-w-2xl"
                style={{ borderLeftColor: GREEN }}>
                <p className="text-xs italic leading-relaxed text-slate-750 mb-2">
                  &quot;IntelligenceBase completely transformed our approach to program reporting. We can now compile month-over-month volume comparisons and sales-per-vehicle metrics across 20+ countries instantly, with workbooks that are under 250KB.&quot;
                </p>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                  — Global Sales Analyst, Tier 1 Supplier
                </span>
              </div>
              
              <div className="flex gap-3 flex-wrap">
                <OutlineBtn onClick={scrollToCube}>
                  Explore the Data Cube
                </OutlineBtn>
              </div>
            </div>

            <div>
              <DiscoveryCallForm />
            </div>
          </div>
        </div>
      </section>

      {/* Redesigned Specifications Matrix Table */}
      <section className="py-24" style={{ background: BONE, borderTop: "1px solid rgba(33,51,67,0.07)", borderBottom: "1px solid rgba(33,51,67,0.07)" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Eyebrow>Active Intelligence</Eyebrow>
            <h2 className="font-bold leading-[1.12] mb-4 text-slate-900"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(28px, 3.2vw, 42px)",
                letterSpacing: "-0.02em",
                color: INK
              }}>
              The Reporting Challenge
            </h2>
            <p className="text-sm text-slate-650" style={{ fontFamily: "'Inter', sans-serif" }}>
              Reconciling large datasets across plants and platforms traditionally results in spreadsheet bloat.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden max-w-4xl mx-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-mono uppercase tracking-wider text-[10px] border-b border-slate-800">
                  <th className="p-4 md:p-5 font-bold">Evaluation Metric</th>
                  <th className="p-4 md:p-5 font-bold text-rose-400">Conventional Spreadsheet Approach</th>
                  <th className="p-4 md:p-5 font-bold text-emerald-450">Saphran IntelligenceBase™</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans text-slate-700">
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 md:p-5 font-bold text-slate-900 font-sans">Workbook File Size</td>
                  <td className="p-4 md:p-5 text-slate-500">
                    <span className="font-semibold text-rose-700">50MB+</span>
                    <p className="text-[10px] text-slate-400 mt-1">Slow load times, frequently crashes under historical data weight.</p>
                  </td>
                  <td className="p-4 md:p-5 text-slate-800 bg-emerald-50/10 font-medium" style={{ borderLeft: `2px solid ${GREEN}40` }}>
                    <span className="font-semibold text-emerald-700">&lt;250KB</span>
                    <p className="text-[10px] text-slate-500 mt-1">Lightweight link that queries the remote pre-calculated cube.</p>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 md:p-5 font-bold text-slate-900 font-sans">Data Refresh Speed</td>
                  <td className="p-4 md:p-5 text-slate-500">
                    <span className="font-semibold text-rose-700">Minutes to Hours</span>
                    <p className="text-[10px] text-slate-400 mt-1">Manual pivot cache rebuilding that stops strategic planning workflow.</p>
                  </td>
                  <td className="p-4 md:p-5 text-slate-800 bg-emerald-50/10 font-medium" style={{ borderLeft: `2px solid ${GREEN}40` }}>
                    <span className="font-semibold text-emerald-700">Milliseconds</span>
                    <p className="text-[10px] text-slate-500 mt-1">Instant updates of pivot tables from high-performance servers.</p>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 md:p-5 font-bold text-slate-900 font-sans">Market Data Updates</td>
                  <td className="p-4 md:p-5 text-slate-500">
                    <span className="font-semibold text-rose-700">Manual Ingestion</span>
                    <p className="text-[10px] text-slate-400 mt-1">Logging into portal to download, translate, and copy volume updates.</p>
                  </td>
                  <td className="p-4 md:p-5 text-slate-800 bg-emerald-50/10 font-medium" style={{ borderLeft: `2px solid ${GREEN}40` }}>
                    <span className="font-semibold text-emerald-700">Daily Sync</span>
                    <p className="text-[10px] text-slate-500 mt-1">Automated background imports of market subscriptions into the cube.</p>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 md:p-5 font-bold text-slate-900 font-sans">Team Collaboration</td>
                  <td className="p-4 md:p-5 text-slate-500">
                    <span className="font-semibold text-rose-700">Siloed Sheets</span>
                    <p className="text-[10px] text-slate-400 mt-1">Duplicate files emailed across plants, leading to version confusion.</p>
                  </td>
                  <td className="p-4 md:p-5 text-slate-800 bg-emerald-50/10 font-medium" style={{ borderLeft: `2px solid ${GREEN}40` }}>
                    <span className="font-semibold text-emerald-700">Unified Consensus</span>
                    <p className="text-[10px] text-slate-500 mt-1">Central database ensures all global sites view the same numbers.</p>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 md:p-5 font-bold text-slate-900 font-sans">Formulas &amp; Logic</td>
                  <td className="p-4 md:p-5 text-slate-500">
                    <span className="font-semibold text-rose-700">Broken Links</span>
                    <p className="text-[10px] text-slate-400 mt-1">High risk of custom equations breaking or duplicate pricing links.</p>
                  </td>
                  <td className="p-4 md:p-5 text-slate-800 bg-emerald-50/10 font-medium" style={{ borderLeft: `2px solid ${GREEN}40` }}>
                    <span className="font-semibold text-emerald-700">Pre-Calculated Cube</span>
                    <p className="text-[10px] text-slate-500 mt-1">Calculations are defined on the enterprise cube, preventing mistakes.</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Saphran Data Cube Explorer Section */}
      <section ref={cubeSectionRef} className="py-24 text-white" style={{ background: INK }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <Eyebrow dark>Calculated Data Cube</Eyebrow>
            <h2 className="font-bold leading-[1.12] mb-4"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(28px, 3.2vw, 42px)",
                letterSpacing: "-0.02em"
              }}>
              Saphran IntelligenceBase Cube Explorer
            </h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.44)", fontFamily: "'Inter', sans-serif" }}>
              Our multi-dimensional analytics cube groups and pre-calculates your ETO data. Click on the dimensions below to see the pre-compiled fields and preview the pivot table structure.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.2fr] gap-8 items-start">
            {/* Left Tabs */}
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-2 border-b border-white/5 lg:border-b-0">
              {cubeDimensions.map((dim) => (
                <button
                  key={dim.id}
                  onClick={() => setActiveCubeDimension(dim.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded text-left text-xs font-semibold uppercase tracking-wider font-mono whitespace-nowrap transition-all duration-150 ${
                    activeCubeDimension === dim.id 
                      ? "bg-[#2d4356] border-l-4 text-white" 
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                  style={activeCubeDimension === dim.id ? { borderLeftColor: GREEN } : {}}
                >
                  <span style={{ color: activeCubeDimension === dim.id ? GREEN_TINT : "inherit" }}>
                    {dim.icon}
                  </span>
                  <span>{dim.name}</span>
                </button>
              ))}
            </div>

            {/* Right Pane */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-[#16222e] p-8 rounded-lg border border-white/5">
              {/* Description & Bullets */}
              <div className="md:col-span-5">
                <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: GREEN_TINT }}>
                  {currentDim.title}
                </span>
                
                <h3 className="font-bold text-lg mb-3 mt-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Cube Grouping
                </h3>
                
                <p className="text-[13px] leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.52)", fontFamily: "'Inter', sans-serif" }}>
                  {currentDim.description}
                </p>

                <div className="space-y-2">
                  <span className="block text-[9px] uppercase font-bold text-slate-400 font-mono tracking-wider">Calculated Cube Fields</span>
                  <div className="grid grid-cols-1 gap-2">
                    {currentDim.fields.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-slate-200 text-xs font-mono bg-slate-800/50 p-2 rounded border border-slate-750">
                        <Check size={10} className="text-emerald-400" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Interactive UI Mockup */}
              <div className="md:col-span-7 flex flex-col justify-center">
                <span className="block text-[9px] uppercase tracking-wider text-slate-400 mb-2 font-mono text-center">
                  Excel Pivot Table Field &amp; Table Preview
                </span>
                
                <div className="bg-white text-slate-900 p-4 rounded-lg border border-slate-200 font-sans shadow-lg text-[10px] leading-normal">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
                    <span className="font-bold text-slate-700 font-mono">PivotTable Workspace (Saphran.xlsx)</span>
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold">IB CUBE SYNCED</span>
                  </div>
                  
                  <div className="grid grid-cols-12 gap-3">
                    {/* Table View */}
                    <div className="col-span-8 border border-slate-200 rounded overflow-hidden">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-[8px] font-mono">
                            <th className="p-1.5">Row Labels</th>
                            <th className="p-1.5 text-right">2024</th>
                            <th className="p-1.5 text-right">2025</th>
                            <th className="p-1.5 text-right">Total</th>
                          </tr>
                        </thead>
                        <tbody className="font-mono text-[9px]">
                          <tr className="border-b border-slate-100 bg-slate-50/20 font-bold">
                            <td className="p-1.5">Alpha Div.</td>
                            <td className="p-1.5 text-right">555,981</td>
                            <td className="p-1.5 text-right">528,893</td>
                            <td className="p-1.5 text-right">1,084,874</td>
                          </tr>
                          <tr className="border-b border-slate-100 text-slate-600">
                            <td className="p-1.5 pl-3">↳ GM Program</td>
                            <td className="p-1.5 text-right">340,922</td>
                            <td className="p-1.5 text-right">322,165</td>
                            <td className="p-1.5 text-right">663,087</td>
                          </tr>
                          <tr className="border-b border-slate-100 font-bold bg-slate-50/40">
                            <td className="p-1.5">Grand Total</td>
                            <td className="p-1.5 text-right">894,159</td>
                            <td className="p-1.5 text-right">852,951</td>
                            <td className="p-1.5 text-right">1,747,110</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Field List Selector */}
                    <div className="col-span-4 bg-slate-50 p-2 rounded border border-slate-200 flex flex-col justify-between text-[8px]">
                      <div>
                        <span className="block font-bold text-slate-500 uppercase tracking-wide mb-1.5">Pivot Field List</span>
                        <div className="space-y-1">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input type="checkbox" defaultChecked readOnly className="accent-emerald-500" />
                            <span className="text-slate-700">Forecast Name</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input type="checkbox" defaultChecked readOnly className="accent-emerald-500" />
                            <span className="text-slate-700">Currency</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input type="checkbox" defaultChecked={currentDim.id === "market_data"} readOnly className="accent-emerald-500" />
                            <span className={currentDim.id === "market_data" ? "text-emerald-600 font-bold" : "text-slate-600"}>Market Volume</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input type="checkbox" defaultChecked={currentDim.id === "parts"} readOnly className="accent-emerald-500" />
                            <span className={currentDim.id === "parts" ? "text-emerald-600 font-bold" : "text-slate-600"}>Part Cost</span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="border-t border-slate-200 pt-1.5 mt-2 text-[7px] text-slate-400 text-center font-mono">
                        Workbook: <span className="font-bold text-slate-600">45 KB</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Eyebrow>Key Advantages</Eyebrow>
            <h2 className="font-bold leading-[1.12] mb-4 text-slate-900"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(28px, 3.2vw, 42px)",
                letterSpacing: "-0.02em",
                color: INK
              }}>
              IntelligenceBase™ Benefits
            </h2>
            <p className="text-sm text-slate-650" style={{ fontFamily: "'Inter', sans-serif" }}>
              Providing the power of advanced data warehouse analytics through your familiar Excel workspace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4 text-emerald-600">
                <Database size={16} />
              </div>
              <h4 className="font-bold text-sm mb-2 text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>Unified Data Warehouse</h4>
              <p className="text-xs leading-relaxed text-slate-500">Automatically aggregates your sales inputs, internal costing structures, and market forecast databases in a pre-compiled warehouse.</p>
            </div>

            <div className="bg-white p-6 rounded border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4 text-emerald-600">
                <Clock size={16} />
              </div>
              <h4 className="font-bold text-sm mb-2 text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>Daily Auto-Refresh</h4>
              <p className="text-xs leading-relaxed text-slate-500">The entire analytics cube is compiled and refreshed every single night from your central Saphran database runs.</p>
            </div>

            <div className="bg-white p-6 rounded border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4 text-emerald-600">
                <Layers size={16} />
              </div>
              <h4 className="font-bold text-sm mb-2 text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>Micro-Weight Excel Workbooks</h4>
              <p className="text-xs leading-relaxed text-slate-500">Keep workbook files extremely small (often under 250KB, as low as 20KB) by querying Saphran's calculations remotely.</p>
            </div>

            <div className="bg-white p-6 rounded border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4 text-emerald-600">
                <Sparkles size={16} />
              </div>
              <h4 className="font-bold text-sm mb-2 text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>Instantaneous Refresh Rates</h4>
              <p className="text-xs leading-relaxed text-slate-500">After the initial layout load, pivoting columns, filtering, and compiling calculations is nearly instantaneous.</p>
            </div>

            <div className="bg-white p-6 rounded border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4 text-emerald-600">
                <Globe2 size={16} />
              </div>
              <h4 className="font-bold text-sm mb-2 text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>Direct Market Data Pulls</h4>
              <p className="text-xs leading-relaxed text-slate-500">Retrieve regional vehicle production volumes and powertrain data directly inside Excel tabs without logging into third-party portals.</p>
            </div>

            <div className="bg-white p-6 rounded border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4 text-emerald-600">
                <Activity size={16} />
              </div>
              <h4 className="font-bold text-sm mb-2 text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>Pre-Calculated Cube Fields</h4>
              <p className="text-xs leading-relaxed text-slate-500">Directly analyze complex calculated relationships like Sales per Vehicle, total revenue matrices, and program volumes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-24 relative overflow-hidden" style={{ background: INK }}>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 pointer-events-none" style={{ opacity: 0.05 }}>
          <SwirlMark size={440} color={GREEN} className="animate-spin" style={{ animationDuration: "30s" }} dark />
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative">
          <div className="max-w-xl">
            <Eyebrow dark>Active Analytics Framework</Eyebrow>
            <h2 className="font-extrabold text-white mb-5 leading-[1.06]"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(30px, 4vw, 48px)", letterSpacing: "-0.022em" }}>
              Active Business Intelligence Awaits.
            </h2>
            <p className="text-[15px] leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.46)", fontFamily: "'Inter', sans-serif" }}>
              Ready to replace slow, heavy spreadsheets, automate market forecast reporting, and query a pre-calculated data warehouse in milliseconds? Book a discovery call today to see Saphran IntelligenceBase in action.
            </p>
            <div className="flex gap-3 flex-wrap">
              <PrimaryBtn onClick={() => setPage("contact")}>
                Book a Discovery Call <ArrowRight size={14} />
              </PrimaryBtn>
              <OutlineBtn dark onClick={() => setPage("capabilities")}>
                Explore Capabilities
              </OutlineBtn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── SaphranAI Page ───────────────────────────────────────────────────────────

function SaphranAIPage({ setPage }: { setPage: (p: Page) => void }) {
  const [revenue, setRevenue] = useState(4); // In billions
  const [volatility, setVolatility] = useState<"low" | "high">("low");
  const [selectedPart, setSelectedPart] = useState("manifold");
  const agenticRef = useRef<HTMLDivElement>(null);

  const scrollToAgentic = () => {
    agenticRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Calculator formulas based on the Page 3 stats scaled proportionally
  const freightSavings = revenue * 3.0; // ~$12M for $4B revenue
  const carryingSavings = revenue * 3.6; // ~$14.4M for $4B revenue
  const marginSavings = revenue * 5.0; // ~$20.0M for $4B revenue
  const totalImpact = freightSavings + carryingSavings + marginSavings;

  return (
    <>
      {/* Hero Section (Deep slate dark styling for AI focus) */}
      <section className="pt-32 pb-24 relative overflow-hidden text-white" style={{ background: INK }}>
        <div className="absolute pointer-events-none select-none"
          style={{ right: "-8%", top: "50%", transform: "translateY(-50%)", opacity: 0.08 }}>
          <SwirlMark size={520} color={GREEN} className="animate-spin" style={{ animationDuration: "35s" }} dark />
        </div>

        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            <div>


              <h1 className="font-extrabold leading-[1.03] mb-6"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(42px, 5.5vw, 72px)",
                  letterSpacing: "-0.024em",
                  color: "#fff",
                }}>
                SaphranAI™
              </h1>

              <p className="text-lg font-semibold leading-snug mb-5 text-emerald-400"
                style={{ fontFamily: "'Poppins', sans-serif" }}>
                Significantly improve your gross and net margins.
              </p>

              <p className="text-[15px] leading-relaxed mb-8"
                style={{ color: "rgba(255,255,255,0.72)", fontFamily: "'Inter', sans-serif" }}>
                SaphranAI enhances your existing forecast sources by learning from historical shipment performance and part-level data. Rather than replacing your forecast inputs, SaphranAI adds an intelligent layer that creates volume predictions that are <strong>~10%+ more accurate</strong> than standard customer forecasts.
              </p>

              <div className="border-l-4 border-emerald-500 bg-white/5 p-5 rounded-r-[5px] mb-8 max-w-2xl">
                <p className="text-xs italic leading-relaxed mb-2 text-slate-200">
                  &quot;SaphranAI solved the OEM schedule volatility problem for us. Our forecast accuracy improved by 11.5% in the first quarter, giving us the visibility needed to avoid premium freight charges and prevent margin leakage.&quot;
                </p>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  — Tier 1 Automotive Supplier VP of Operations
                </span>
              </div>

              <div className="flex gap-3 flex-wrap">
                <OutlineBtn dark onClick={scrollToAgentic}>
                  Explore Agentic Architecture
                </OutlineBtn>
              </div>
            </div>

            <div>
              <DiscoveryCallForm dark />
            </div>
          </div>
        </div>
      </section>

      {/* ROI Case Study Section */}
      <section className="py-24 bg-white" style={{ borderBottom: "1px solid rgba(33,51,67,0.07)" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Case Study Details */}
            <div className="lg:col-span-5">
              <Eyebrow>Case Study ROI</Eyebrow>
              <h2 className="font-bold leading-[1.12] mb-6 text-slate-900"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(28px, 3.2vw, 42px)",
                  letterSpacing: "-0.02em",
                  color: INK
                }}>
                What 10% More Accurate Forecasting Means
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                A typical Tier 1 Automotive Supplier with <strong>$4B in annual revenue</strong> faces tight margins, complex multi-plant operations, exposure to OEM schedule volatility, and regular premium freight and inventory swings.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-[#f9f9fb] rounded border border-slate-100">
                  <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">Premium Freight</span>
                  <span className="text-sm font-bold text-slate-800">Reduced Volatility = Fewer Emergency Expedited Shipments</span>
                </div>
                <div className="p-4 bg-[#f9f9fb] rounded border border-slate-100">
                  <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">Inventory Carrying Costs</span>
                  <span className="text-sm font-bold text-slate-800">Better Volume Alignment = Drastically Reduced Excess Material</span>
                </div>
              </div>
            </div>

            {/* Interactive Calculator */}
            <div className="lg:col-span-7 bg-[#1c2a38] text-white p-8 rounded-lg shadow-xl border border-slate-700">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-450">
                Interactive ROI Calculator
              </span>
              <h3 className="font-bold text-xl mb-6 text-slate-100" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Estimate Your Annual Savings
              </h3>

              <div className="space-y-6 mb-8">
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-350 mb-2">
                    <span>Your Annual Revenue:</span>
                    <span className="font-bold text-white">${revenue} Billion USD</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={revenue}
                    onChange={(e) => setRevenue(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500 font-mono mt-1">
                    <span>$1 Billion</span>
                    <span>$10 Billion</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-750 pt-6">
                  <div>
                    <span className="block text-[9px] font-mono text-slate-400 uppercase">Premium Freight</span>
                    <span className="text-lg font-bold text-white font-mono">${freightSavings.toFixed(1)}M</span>
                    <span className="block text-[8px] text-slate-500">Savings opportunity</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono text-slate-400 uppercase">Inventory Carrying</span>
                    <span className="text-lg font-bold text-white font-mono">${carryingSavings.toFixed(1)}M</span>
                    <span className="block text-[8px] text-slate-500">Capital unlocked</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono text-slate-400 uppercase">0.5% Margin Protection</span>
                    <span className="text-lg font-bold text-white font-mono">${marginSavings.toFixed(1)}M</span>
                    <span className="block text-[8px] text-slate-500">Gross margin lift</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/60 p-4 rounded border border-slate-850 text-center">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">Total Potential Annual Impact</span>
                <span className="text-3xl font-extrabold text-emerald-400 font-mono block mt-1">
                  ${totalImpact.toFixed(1)}M Saved
                </span>
                <span className="text-[9px] text-slate-500 block mt-1">*Based on scaled industry benchmark statistics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Prediction bounds Simulator */}
      <section className="py-24 text-white" style={{ background: INK }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <Eyebrow dark>Confidence &amp; Transparency</Eyebrow>
            <h2 className="font-bold leading-[1.12] mb-4"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(28px, 3.2vw, 42px)",
                letterSpacing: "-0.02em"
              }}>
              See the Prediction — and the Confidence
            </h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.44)", fontFamily: "'Inter', sans-serif" }}>
              Every monthly forecast generated by SaphranAI comes with predicted volumes and upper/lower confidence bounds.Planners can immediately tell where uncertainties exist and apply human judgement.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-12 items-start">
            {/* Left Controls */}
            <div className="space-y-6">
              <div className="bg-[#16222e] p-6 rounded-lg border border-white/5 space-y-5">
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2.5">
                    Select Opportunity / Program
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      onClick={() => setSelectedPart("manifold")}
                      className={`px-3 py-2 rounded text-xs text-left font-mono font-bold transition-all border ${
                        selectedPart === "manifold" 
                          ? "bg-slate-800 border-emerald-500/30 text-white" 
                          : "border-white/5 bg-white/5 text-slate-450 hover:text-white"
                      }`}
                    >
                      Brose Exhaust Manifold B-2025
                    </button>
                    <button
                      onClick={() => setSelectedPart("sensor")}
                      className={`px-3 py-2 rounded text-xs text-left font-mono font-bold transition-all border ${
                        selectedPart === "sensor" 
                          ? "bg-slate-800 border-emerald-500/30 text-white" 
                          : "border-white/5 bg-white/5 text-slate-450 hover:text-white"
                      }`}
                    >
                      Denso Powertrain Sensor X1
                    </button>
                  </div>
                </div>

                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2">
                    Adjust Market Volatility
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setVolatility("low")}
                      className={`flex-1 px-3 py-1.5 rounded text-xs font-semibold font-mono transition-all ${
                        volatility === "low" 
                          ? "bg-emerald-500 text-slate-950 font-bold" 
                          : "bg-white/5 text-slate-400 hover:text-white"
                      }`}
                    >
                      Low Volatility
                    </button>
                    <button
                      onClick={() => setVolatility("high")}
                      className={`flex-1 px-3 py-1.5 rounded text-xs font-semibold font-mono transition-all ${
                        volatility === "high" 
                          ? "bg-rose-500 text-white font-bold" 
                          : "bg-white/5 text-slate-400 hover:text-white"
                      }`}
                    >
                      High Volatility
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-900/60 rounded border border-slate-850 text-xs leading-relaxed text-slate-400">
                <span className="block font-bold text-white mb-1">Interpretation:</span>
                {volatility === "low" ? (
                  <span><strong>Tight Bounds:</strong> SaphranAI displays a narrow variance band indicating High Confidence. Planner overrides are typically not required here.</span>
                ) : (
                  <span><strong>Wider Bounds:</strong> Indicates High Uncertainty in the OEM scheduling database. Finance teams should apply manual hedging filters to protect margin.</span>
                )}
              </div>
            </div>

            {/* Right Live Volume Grid Preview */}
            <div className="bg-[#1c2a38] text-white p-6 rounded-lg border border-slate-700 font-sans shadow-lg text-[11px] leading-relaxed">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700">
                <span className="font-semibold text-slate-200 font-mono">Monthly Forecast - Confidence Grid</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold ${
                  volatility === "low" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                }`}>
                  {volatility === "low" ? "HIGH CONFIDENCE" : "HIGH VOLATILITY RISK"}
                </span>
              </div>

              <div className="border border-slate-700 rounded overflow-hidden font-mono">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-800 text-slate-450 border-b border-slate-700 text-[8px] uppercase">
                      <th className="p-2">Month</th>
                      <th className="p-2 text-right">Customer FC</th>
                      <th className="p-2 text-right">SaphranAI Pred</th>
                      <th className="p-2 text-right">Lower Bound</th>
                      <th className="p-2 text-right">Upper Bound</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-800">
                      <td className="p-2 font-semibold text-slate-200">Month 7</td>
                      <td className="p-2 text-right text-slate-400">12,500</td>
                      <td className="p-2 text-right text-slate-100 font-bold">14,200</td>
                      <td className="p-2 text-right text-emerald-450">
                        {volatility === "low" ? "13,800" : "11,500"}
                      </td>
                      <td className="p-2 text-right text-emerald-450">
                        {volatility === "low" ? "14,600" : "16,900"}
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="p-2 font-semibold text-slate-200">Month 8</td>
                      <td className="p-2 text-right text-slate-400">12,500</td>
                      <td className="p-2 text-right text-slate-100 font-bold">13,900</td>
                      <td className="p-2 text-right text-emerald-450">
                        {volatility === "low" ? "13,500" : "10,800"}
                      </td>
                      <td className="p-2 text-right text-emerald-450">
                        {volatility === "low" ? "14,300" : "17,000"}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold text-slate-200">Month 9</td>
                      <td className="p-2 text-right text-slate-400">12,500</td>
                      <td className="p-2 text-right text-slate-100 font-bold">13,850</td>
                      <td className="p-2 text-right text-emerald-450">
                        {volatility === "low" ? "13,400" : "10,200"}
                      </td>
                      <td className="p-2 text-right text-emerald-450">
                        {volatility === "low" ? "14,250" : "17,500"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Saphran Agentic Framework Section */}
      <section ref={agenticRef} className="py-24 bg-white" style={{ borderBottom: "1px solid rgba(33,51,67,0.07)" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Eyebrow>Autonomous Intelligence</Eyebrow>
            <h2 className="font-bold leading-[1.12] mb-4 text-slate-900"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(28px, 3.2vw, 42px)",
                letterSpacing: "-0.02em",
                color: INK
              }}>
              Introducing Saphran’s Agentic Solution
            </h2>
            <p className="text-sm text-slate-650" style={{ fontFamily: "'Inter', sans-serif" }}>
              Multi-role autonomous agents working continuously to optimize and secure your commercial business cases.
            </p>
          </div>

          {/* CSS Agentic Diagram Representation */}
          <div className="bg-[#1c2a38] text-white p-8 rounded-lg border border-slate-750 shadow-xl max-w-5xl mx-auto">
            <div className="flex justify-between items-center border-b border-slate-700 pb-4 mb-8">
              <span className="font-bold text-slate-200 text-xs font-mono tracking-wider">Saphran Agentic Framework</span>
              <span className="text-[9px] bg-slate-800 text-emerald-400 border border-slate-700 px-2 py-0.5 rounded font-mono font-bold">INTEGRATED LAYER</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Column 1: Users */}
              <div className="lg:col-span-3 flex flex-col justify-center items-center p-5 bg-[#16222e] rounded border border-slate-750 text-center">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-3 border border-slate-700">
                  <Globe2 size={20} className="text-emerald-450" />
                </div>
                <span className="block font-bold text-xs">Planners &amp; Analysts</span>
                <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">System users override bounds &amp; request consensus audits.</p>
              </div>

              {/* Column 2: Agents Stack */}
              <div className="lg:col-span-6 space-y-3">
                <span className="block text-[9px] uppercase text-slate-450 font-bold font-mono tracking-wider mb-1">Active Agent Stack</span>
                
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded hover:bg-emerald-500/15 transition-all">
                  <div className="flex justify-between text-xs font-bold text-emerald-400 font-mono">
                    <span>Volume Agents</span>
                    <span className="text-[9px] font-normal text-slate-400">Forecast Draft &amp; Demand</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded hover:bg-emerald-500/15 transition-all">
                  <div className="flex justify-between text-xs font-bold text-emerald-400 font-mono">
                    <span>Cost Agents</span>
                    <span className="text-[9px] font-normal text-slate-400">Anomaly &amp; Cost Variance Detection</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded hover:bg-emerald-500/15 transition-all">
                  <div className="flex justify-between text-xs font-bold text-emerald-400 font-mono">
                    <span>Margin Agents</span>
                    <span className="text-[9px] font-normal text-slate-400">Price Optimization &amp; Margin Risk</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded hover:bg-emerald-500/15 transition-all">
                  <div className="flex justify-between text-xs font-bold text-emerald-400 font-mono">
                    <span>Quote Quality Agents</span>
                    <span className="text-[9px] font-normal text-slate-400">Fraud Detection &amp; Quote Conversion</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded hover:bg-emerald-500/15 transition-all">
                  <div className="flex justify-between text-xs font-bold text-emerald-400 font-mono">
                    <span>Revenue Agents</span>
                    <span className="text-[9px] font-normal text-slate-400">Trend Analysis &amp; Customer Segmentation</span>
                  </div>
                </div>
              </div>

              {/* Column 3: Platform Integration */}
              <div className="lg:col-span-3 flex flex-col justify-center items-center p-5 bg-[#16222e] rounded border border-slate-750 text-center">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-3 border border-slate-700">
                  <Cpu size={20} className="text-emerald-450" />
                </div>
                <span className="block font-bold text-xs">Saphran Platform</span>
                <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">PartBase, QuoteBase, ConnectBase, IntelligenceBase</p>
                <div className="mt-3.5 border-t border-slate-750 pt-3 w-full">
                  <span className="block text-[8px] font-mono text-emerald-400 uppercase tracking-widest">Data Integrity Layer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SaphranAI Readiness Ladder */}
      <section className="py-24 bg-white" style={{ borderBottom: "1px solid rgba(33,51,67,0.07)" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Eyebrow>Implementation Readiness</Eyebrow>
            <h2 className="font-bold leading-[1.12] mb-4 text-slate-900"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(28px, 3.2vw, 42px)",
                letterSpacing: "-0.02em",
                color: INK
              }}>
              SaphranAI Readiness Ladder
            </h2>
            <p className="text-sm text-slate-650" style={{ fontFamily: "'Inter', sans-serif" }}>
              More integrated database connections trigger higher forecasting accuracy and greater financial returns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="bg-[#f9f9fb] p-6 rounded border border-slate-200 relative flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-emerald-650 bg-emerald-50 px-2 py-0.5 rounded">Step 1</span>
                <h4 className="font-bold text-sm mb-2 mt-4 text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>Rolling Forecast Link</h4>
                <p className="text-xs leading-relaxed text-slate-500">Your core forecast opportunity database is linked directly with third-party automotive market volume forecast data.</p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-200 text-[10px] text-slate-400 uppercase font-mono">
                *Minimum Requirement
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#f9f9fb] p-6 rounded border border-slate-200 relative flex flex-col justify-between" style={{ borderLeft: `3px solid ${GREEN}` }}>
              <div>
                <span className="font-mono text-xs font-bold text-emerald-650 bg-emerald-50 px-2 py-0.5 rounded">Step 2</span>
                <h4 className="font-bold text-sm mb-2 mt-4 text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>ConnectBase Integration</h4>
                <p className="text-xs leading-relaxed text-slate-500">Import actual ship history from your ERP. ConnectBase maps parts to close the actuals loop, enabling AI to learn from deviations.</p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-200 text-[10px] text-slate-450 uppercase font-mono font-bold">
                *Recommended Setup
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#f9f9fb] p-6 rounded border border-slate-200 relative flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-emerald-650 bg-emerald-50 px-2 py-0.5 rounded">Step 3</span>
                <h4 className="font-bold text-sm mb-2 mt-4 text-slate-900" style={{ fontFamily: "'Inter', sans-serif" }}>Weekly EDI Streams</h4>
                <p className="text-xs leading-relaxed text-slate-500">Integrate customer weekly EDI releases. Provides immediate, automated volatility response tracking on early demand swings.</p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-200 text-[10px] text-emerald-650 uppercase font-mono font-bold">
                Maximum Financial ROI
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-24 relative overflow-hidden" style={{ background: INK }}>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 pointer-events-none" style={{ opacity: 0.05 }}>
          <SwirlMark size={440} color={GREEN} className="animate-spin" style={{ animationDuration: "30s" }} dark />
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative">
          <div className="max-w-xl">
            <Eyebrow dark>Forecast Certainty</Eyebrow>
            <h2 className="font-extrabold text-white mb-5 leading-[1.06]"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(30px, 4vw, 48px)", letterSpacing: "-0.022em" }}>
              Unlock Predictive Forecasts.
            </h2>
            <p className="text-[15px] leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.46)", fontFamily: "'Inter', sans-serif" }}>
              Ready to reduce deviations, identify OEM volatility risk in real time, and protect gross margin performance? Book a discovery call today to see SaphranAI in action.
            </p>
            <div className="flex gap-3 flex-wrap">
              <PrimaryBtn onClick={() => setPage("contact")}>
                Book a Discovery Call <ArrowRight size={14} />
              </PrimaryBtn>
              <OutlineBtn dark onClick={() => setPage("capabilities")}>
                See All Platforms
              </OutlineBtn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── ScenarioPro Page ──────────────────────────────────────────────────────────

function ScenarioProPage({ setPage }: { setPage: (p: Page) => void }) {
  const [simType, setSimType] = useState<"volume" | "exchange">("volume");
  const [volPercent, setVolPercent] = useState(0); // -30% to +30%
  const [jpyRate, setJpyRate] = useState(150); // 100 to 200 JPY per USD
  const simulatorRef = useRef<HTMLDivElement>(null);

  const scrollToSimulator = () => {
    simulatorRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Dynamic values based on inputs
  const getVolumeChartData = () => {
    const baseVolume = [25000, 25200, 25400, 24800, 23000, 23000, 23000, 23000, 23200, 24500, 25600, 25600];
    const baseRevenue = [320, 318, 332, 345, 305, 308, 324, 312, 318, 326, 335, 320];
    
    const factor = 1 + volPercent / 100;
    const simulatedVolume = baseVolume.map(v => Math.round(v * factor));
    const simulatedRevenue = baseRevenue.map(r => Math.round(r * factor));

    return {
      months: ["Jan 26", "Feb 26", "Mar 26", "Apr 26", "May 26", "Jun 26", "Jul 26", "Aug 26", "Sep 26", "Oct 26", "Nov 26", "Dec 26"],
      baseVolume,
      simulatedVolume,
      baseRevenue,
      simulatedRevenue
    };
  };

  const getExchangeChartData = () => {
    const baseRate = [150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150];
    const baseRevenue = [320, 318, 332, 345, 305, 308, 324, 312, 318, 326, 335, 320];
    
    // Revenue conversion impact
    const factor = 150 / jpyRate; 
    const simulatedRevenue = baseRevenue.map(r => Math.round(r * factor));

    return {
      months: ["Jan 26", "Feb 26", "Mar 26", "Apr 26", "May 26", "Jun 26", "Jul 26", "Aug 26", "Sep 26", "Oct 26", "Nov 26", "Dec 26"],
      rates: baseRate.map(() => jpyRate),
      baseRevenue,
      simulatedRevenue
    };
  };

  const volData = getVolumeChartData();
  const exData = getExchangeChartData();

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden" style={{ background: "#fff" }}>
        <div className="absolute pointer-events-none select-none"
          style={{ right: "-8%", top: "50%", transform: "translateY(-50%)", opacity: 0.055 }}>
          <SwirlMark size={480} color={GREEN} className="animate-spin" style={{ animationDuration: "32s" }} />
        </div>
        
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            <div>

              
              <h1 className="font-extrabold leading-[1.03] mb-6"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "clamp(42px, 5.5vw, 72px)",
                  letterSpacing: "-0.024em",
                  color: INK,
                }}>
                ScenarioPro™
              </h1>
              
              <p className="text-lg font-semibold leading-snug mb-5"
                style={{ color: INK, fontFamily: "'Poppins', sans-serif" }}>
                Quickly model various scenarios between linked factors in real time.
              </p>
              
              <p className="text-[15px] leading-relaxed mb-8 text-slate-650"
                style={{ color: SLATE, fontFamily: "'Inter', sans-serif" }}>
                ScenarioPro enables manufacturers to intuitively understand and react to the impact of dynamic market and pricing changes on their business. Run exogenous (market volumes, exchange rates) and endogenous (win rates, long-term agreements) scenario analyses instantly, replacing time-consuming workbook builds with clean visual simulations.
              </p>

              <div className="border-l-4 border-emerald-500 bg-[#f9f9fb] p-5 rounded-r-[5px] mb-8 max-w-2xl"
                style={{ borderLeftColor: GREEN }}>
                <p className="text-xs italic leading-relaxed text-slate-750 mb-2">
                  &quot;ScenarioPro changed our forecasting paradigm. Rather than spending weeks trying to compile one single forecast that would be wrong anyway, we now model 20+ contingency scenarios in minutes, giving us a major competitive edge.&quot;
                </p>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                  — Executive Director of Strategy, Tier 1 Automotive Supplier
                </span>
              </div>
              
              <div className="flex gap-3 flex-wrap">
                <OutlineBtn onClick={scrollToSimulator}>
                  Explore Scenario Sandbox
                </OutlineBtn>
              </div>
            </div>

            <div>
              <DiscoveryCallForm />
            </div>
          </div>
        </div>
      </section>

      {/* The Forecasting Evolution (Redesigned Quote Spotlight Layout) */}
      <section className="py-24" style={{ background: BONE, borderTop: "1px solid rgba(33,51,67,0.07)", borderBottom: "1px solid rgba(33,51,67,0.07)" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Eyebrow>The Forecasting Evolution</Eyebrow>
            <h2 className="font-bold leading-[1.12] mb-4 text-slate-900"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(28px, 3.2vw, 42px)",
                letterSpacing: "-0.02em",
                color: INK
              }}>
              ScenarioPro Contingency Planning & Simulation
            </h2>
            <p className="text-sm text-slate-650" style={{ fontFamily: "'Inter', sans-serif" }}>
              Changing the industry paradigm: Be wrong many times to prepare contingency plans.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* The Old Way Quote */}
            <div className="bg-[#fcfaf7] border border-[#f5eae1] rounded-lg p-8 relative flex flex-col justify-between shadow-xs">
              <div className="absolute top-4 right-6 text-rose-250 font-serif text-7xl leading-none pointer-events-none select-none opacity-40">&ldquo;</div>
              <div className="relative z-10">
                <span className="font-mono text-[9px] uppercase tracking-wider text-rose-650 block mb-4">THE CONVENTIONAL GOAL</span>
                <blockquote className="text-lg font-bold text-slate-900 leading-snug mb-5" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Spend all of your time being right once.
                </blockquote>
                <p className="text-[12.5px] leading-relaxed text-slate-650 font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Traditional forecasting forces planning teams to spend months compiling a single consensus plan. However, because data points shift daily, this report becomes obsolete within days, leaving teams in a constant cycle of manual rebuilding.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#f2ded0] text-[10px] font-mono text-slate-450 uppercase tracking-widest">
                Paradigm Status: Obsolete
              </div>
            </div>

            {/* The New Way Quote */}
            <div className="bg-[#f7faf8] border border-emerald-100 rounded-lg p-8 relative flex flex-col justify-between shadow-xs" style={{ borderTopWidth: "4px", borderTopColor: GREEN }}>
              <div className="absolute top-4 right-6 text-emerald-200 font-serif text-7xl leading-none pointer-events-none select-none opacity-45">&ldquo;</div>
              <div className="relative z-10">
                <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-650 block mb-4">THE SCENARIOPRO METHOD</span>
                <blockquote className="text-lg font-bold text-slate-900 leading-snug mb-5" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Be wrong many times to help prepare contingency plans.
                </blockquote>
                <p className="text-[12.5px] leading-relaxed text-slate-650 font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
                  ScenarioPro adds an instantaneous visual overlay. Run 20+ dynamic simulation rules to prepare pricing, sourcing, and contract contingencies ahead of market volatility or strikes.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-emerald-150 text-[10px] font-mono text-emerald-650 uppercase tracking-widest font-bold">
                Paradigm Status: Active
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Scenario Sandbox */}
      <section ref={simulatorRef} className="py-24 text-white" style={{ background: INK }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <Eyebrow dark>Scenario Simulator</Eyebrow>
            <h2 className="font-bold leading-[1.12] mb-4"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(28px, 3.2vw, 42px)",
                letterSpacing: "-0.02em"
              }}>
              Saphran ScenarioPro Sandbox
            </h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.44)", fontFamily: "'Inter', sans-serif" }}>
              Test linked factors to map out their impact on product revenue. Select a simulation type and adjust the sliders below to run calculations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-12 items-start">
            {/* Left Controls */}
            <div className="space-y-6">
              <div className="bg-[#16222e] p-6 rounded-lg border border-white/5 space-y-6">
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-3">
                    Select Linked Simulation Type
                  </span>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setSimType("volume")}
                      className={`px-3 py-2 rounded text-xs text-left font-mono font-bold transition-all border ${
                        simType === "volume" 
                          ? "bg-slate-800 border-emerald-500/30 text-white" 
                          : "border-white/5 bg-white/5 text-slate-450 hover:text-white"
                      }`}
                    >
                      1. Program Volume vs. Product Revenue
                    </button>
                    <button
                      onClick={() => setSimType("exchange")}
                      className={`px-3 py-2 rounded text-xs text-left font-mono font-bold transition-all border ${
                        simType === "exchange" 
                          ? "bg-slate-800 border-emerald-500/30 text-white" 
                          : "border-white/5 bg-white/5 text-slate-450 hover:text-white"
                      }`}
                    >
                      2. Exchange Rate shifts vs. Revenue
                    </button>
                  </div>
                </div>

                {simType === "volume" ? (
                  <div className="space-y-4">
                    <div>
                      <span className="block text-[10px] text-slate-500 mb-1">Target Plant:</span>
                      <span className="text-xs font-bold text-slate-200">BMW Plant Munich (Germany)</span>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
                        <span>Simulation Volume Adjustment:</span>
                        <span className="font-bold text-emerald-400">{volPercent > 0 ? `+${volPercent}` : volPercent}%</span>
                      </div>
                      <input
                        type="range"
                        min="-30"
                        max="30"
                        step="5"
                        value={volPercent}
                        onChange={(e) => setVolPercent(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <span className="block text-[10px] text-slate-500 mb-1">Currency Pair:</span>
                      <span className="text-xs font-bold text-slate-200">JPY to USD Rate</span>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
                        <span>Exchange Rate:</span>
                        <span className="font-bold text-emerald-400">{jpyRate} JPY/USD</span>
                      </div>
                      <input
                        type="range"
                        min="100"
                        max="200"
                        step="5"
                        value={jpyRate}
                        onChange={(e) => setJpyRate(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Chart Preview */}
            <div className="bg-[#1c2a38] text-white p-6 rounded-lg border border-slate-700 font-sans shadow-lg text-[11px] leading-relaxed">
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-700">
                <span className="font-semibold text-slate-200 font-mono">
                  {simType === "volume" ? "BMW Plant Munich vs. Revenue" : "JPY to USD Rate vs. Revenue"}
                </span>
                <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-mono font-bold">
                  SIMULATING
                </span>
              </div>

              {/* Mock Chart displaying simulation results */}
              <div className="space-y-4">
                <div className="h-44 flex items-end gap-1.5 border-b border-l border-slate-700 pb-2 pl-2">
                  {(simType === "volume" ? volData.simulatedRevenue : exData.simulatedRevenue).map((val, idx) => {
                    const baseVal = simType === "volume" ? volData.baseRevenue[idx] : exData.baseRevenue[idx];
                    const heightPercent = (val / 500) * 100;
                    const baseHeightPercent = (baseVal / 500) * 100;
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1 justify-end h-full">
                        <div className="w-full flex gap-[2px] items-end h-full">
                          {/* Base Bar (grey/rose) */}
                          <div className="w-1/2 bg-slate-600 rounded-t-[2px] transition-all duration-300" 
                            style={{ height: `${baseHeightPercent}%` }} 
                            title={`Base: $${baseVal}M`} />
                          {/* Simulated Bar (green/emerald) */}
                          <div className={`w-1/2 rounded-t-[2px] transition-all duration-300 ${val >= baseVal ? "bg-emerald-500" : "bg-rose-500"}`}
                            style={{ height: `${heightPercent}%` }} 
                            title={`Simulated: $${val}M`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-[8px] text-slate-400 font-mono">
                  <span>Jan 26</span>
                  <span>Jun 26</span>
                  <span>Dec 26</span>
                </div>
                <div className="flex gap-4 justify-center pt-2 border-t border-slate-800 text-[9px] font-mono">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 bg-slate-600 rounded-[2px]" />
                    <span>Base Revenue</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-[2px]" />
                    <span>Simulated Revenue</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suggested Scenarios Matrix */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Eyebrow>Versatility by Design</Eyebrow>
            <h2 className="font-bold leading-[1.12] mb-4 text-slate-900"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(28px, 3.2vw, 42px)",
                letterSpacing: "-0.02em",
                color: INK
              }}>
              Scenario Pro Model Scope
            </h2>
            <p className="text-sm text-slate-600" style={{ fontFamily: "'Inter', sans-serif" }}>
              Covering both external market shifts and internal commercial success metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Exogenous */}
            <div className="bg-[#f9f9fb] p-8 rounded border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="font-semibold text-sm uppercase tracking-wider text-slate-500 font-mono">Exogenous (External Factors)</span>
                <h3 className="font-bold text-lg mb-4 mt-2 text-slate-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Market-Driven Volatility
                </h3>
                <p className="text-xs leading-relaxed text-slate-500 mb-6">
                  Simulate conditions completely outside your operational control, immediately highlighting cost and volume risk profiles.
                </p>

                <ul className="space-y-3.5">
                  <li className="flex items-start gap-2.5 text-xs text-slate-650">
                    <Check size={12} className="text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Market Volume Shifts:</strong> Scale OEM program volumes (e.g. BMW, GM, Stellantis) to see product line revenue drops.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-slate-650">
                    <Check size={12} className="text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Exchange Rate Shifts:</strong> Revalue monthly program sales across plants dynamically based on JPY, EUR, or USD shifts.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-slate-650">
                    <Check size={12} className="text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Unforeseen Disruptions:</strong> Model tariff impacts, plant downtimes due to strikes, natural disasters, or EV market swings.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Endogenous */}
            <div className="bg-[#f9f9fb] p-8 rounded border border-slate-200 flex flex-col justify-between" style={{ borderLeft: `3px solid ${GREEN}` }}>
              <div>
                <span className="font-semibold text-sm uppercase tracking-wider text-slate-500 font-mono">Endogenous (Internal Factors)</span>
                <h3 className="font-bold text-lg mb-4 mt-2 text-slate-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Commercial Negotiations
                </h3>
                <p className="text-xs leading-relaxed text-slate-500 mb-6">
                  Model internal variables to simulate conversion probabilities and help negotiators prepare long-term pricing paths.
                </p>

                <ul className="space-y-3.5">
                  <li className="flex items-start gap-2.5 text-xs text-slate-650">
                    <Check size={12} className="text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Conversion of Quoted Bids:</strong> Simulate winning 20%, 50%, or 80% of &quot;very likely&quot; quotes to adjust capacity limits.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-slate-650">
                    <Check size={12} className="text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>LTA Pricing Steps:</strong> Step down pricing over 3-5 year cycles to identify where material costs threaten margins.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-slate-650">
                    <Check size={12} className="text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Material Cost Sensitivity:</strong> Compare rising resin or steel input rates against quote price adjustment clauses.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-24 relative overflow-hidden" style={{ background: INK }}>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 pointer-events-none" style={{ opacity: 0.05 }}>
          <SwirlMark size={440} color={GREEN} className="animate-spin" style={{ animationDuration: "30s" }} dark />
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative">
          <div className="max-w-xl">
            <Eyebrow dark>Contingency Strategy</Eyebrow>
            <h2 className="font-extrabold text-white mb-5 leading-[1.06]"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(30px, 4vw, 48px)", letterSpacing: "-0.022em" }}>
              Be Wrong Many Times. Model Contingencies.
            </h2>
            <p className="text-[15px] leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.46)", fontFamily: "'Inter', sans-serif" }}>
              Ready to replace heavy single-point forecasts with rapid visual simulation? Book a discovery call today to see Saphran ScenarioPro in action.
            </p>
            <div className="flex gap-3 flex-wrap">
              <PrimaryBtn onClick={() => setPage("contact")}>
                Book a Discovery Call <ArrowRight size={14} />
              </PrimaryBtn>
              <OutlineBtn dark onClick={() => setPage("capabilities")}>
                See All Platforms
              </OutlineBtn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Privacy Policy & Terms of Use Pages ──────────────────────────────────────

function PrivacyPolicyPage({ setPage }: { setPage: (p: Page) => void }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="pt-32 pb-24 bg-white min-h-screen text-slate-800">
      <div className="max-w-[800px] mx-auto px-6 font-sans">
        <button
          onClick={() => setPage("home")}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 transition-colors mb-8 font-semibold uppercase tracking-wider"
        >
          <ArrowLeft size={12} /> Back to Home
        </button>

        <h1 className="font-bold text-4xl mb-4 text-slate-900" style={{ fontFamily: "'Poppins', sans-serif" }}>Privacy Policy</h1>
        <p className="text-xs text-slate-400 font-mono mb-8">Last Updated: November 2024</p>

        <div className="space-y-8 text-[13.5px] leading-relaxed text-slate-600 font-sans">
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>1. Introduction</h2>
            <p>
              Saphran, Inc. (&quot;Saphran,&quot; &quot;we,&quot; &quot;us,&quot; and &quot;our&quot;) respects your privacy and is committed to protecting it through our compliance with this policy. We have adopted this policy to explain our privacy practices with respect to information that we may collect about you when you access our website, www.saphran.com (the &quot;Site&quot;).
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>2. Children Under the Age of 13</h2>
            <p>
              Our Site is not intended for children under 13 years of age. No one under age 13 may provide any personal information to or through the Site. We do not knowingly collect personal information from children under 13. If you believe we might have any information from or about a child under 13, please contact us at info@saphran.com.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>3. Information We Collect About You</h2>
            <p className="mb-3">
              We may collect, use, store and transfer different kinds of personal information about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-slate-500">
              <li><strong>Identity or Contact Data:</strong> Includes name, email address, telephone number, or similar identifier.</li>
              <li><strong>Technical Data:</strong> Includes IP address, browser type and version, time zone setting, operating system, and platform.</li>
              <li><strong>Transaction Data:</strong> Includes details about products or services you have purchased from us, if applicable.</li>
              <li><strong>Profile Data:</strong> Includes interests, preferences, feedback, and survey responses.</li>
              <li><strong>Usage Data or Navigation Data:</strong> Includes information about how you use the Site.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>4. Cookies and Automatic Data Collection</h2>
            <p>
              Our Site uses automatic data collection technologies (like cookies, server logs, and web beacons) to distinguish you from other users. We use Google Analytics to help us evaluate statistics on website activity, personalize your experience, and improve overall Site performance. You can configure your browser settings to refuse cookies if you prefer.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>5. How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-500">
              <li>Present our Site and its contents to you.</li>
              <li>Fulfill any other purpose for which you provide it.</li>
              <li>Respond to your inquiries, concerns, or feedback.</li>
              <li>Enforce our rights arising from any contracts entered into between you and us.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>6. Disclosure of Your Information</h2>
            <p>
              We may disclose personal information that we collect to third-party service providers (such as datacenter providers, storage hosts, email service hosts, and software contractors) to assist us in making the Site available. All such third parties are obligated to keep the data confidential and use it only for approved purposes.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-8 mt-12">
            <h2 className="text-base font-bold text-slate-900 mb-2">Contact Information</h2>
            <p className="text-xs text-slate-500">
              Saphran, Inc.<br />
              Email: info@saphran.com<br />
              Phone: 248.522.7000
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TermsOfUsePage({ setPage }: { setPage: (p: Page) => void }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="pt-32 pb-24 bg-white min-h-screen text-slate-800">
      <div className="max-w-[800px] mx-auto px-6 font-sans">
        <button
          onClick={() => setPage("home")}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 transition-colors mb-8 font-semibold uppercase tracking-wider"
        >
          <ArrowLeft size={12} /> Back to Home
        </button>

        <h1 className="font-bold text-4xl mb-4 text-slate-900" style={{ fontFamily: "'Poppins', sans-serif" }}>Terms of Use</h1>
        <p className="text-xs text-slate-400 font-mono mb-8">Effective Date: November 2024</p>

        <div className="space-y-8 text-[13.5px] leading-relaxed text-slate-650 font-sans">
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>1. Acceptance of the Terms of Use</h2>
            <p>
              These terms of use are entered into by and between you and Saphran, Inc. (&quot;Saphran,&quot; &quot;we,&quot; or &quot;us&quot;). The following terms and conditions (&quot;Terms of Use&quot;) govern your access to and use of Saphran.com, including any content, functionality, and services offered on or through Saphran.com (the &quot;Site&quot;). By using the Site, you agree to comply with and be bound by these Terms of Use.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>2. Changes to the Terms of Use</h2>
            <p>
              We may revise and update these Terms of Use from time to time in our sole discretion. All changes are effective immediately when we post them. Your continued use of the Site following the posting of revised Terms of Use means that you accept and agree to the changes.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>3. Accessing the Site &amp; Account Security</h2>
            <p>
              We reserve the right to withdraw or amend the Site, and any service or material we provide, in our sole discretion without notice. We will not be liable if for any reason all or any part of the Site is unavailable at any time or for any period.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>4. Intellectual Property Rights</h2>
            <p>
              The Site and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by Saphran, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, and trade secret laws.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>5. Prohibited Uses</h2>
            <p className="mb-3">You agree not to use the Site:</p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-slate-500">
              <li>In any way that violates applicable federal, state, local, or international law.</li>
              <li>To transmit or procure the sending of any advertising or promotional material, including &quot;junk mail&quot; or &quot;spam.&quot;</li>
              <li>To engage in any conduct that restricts or inhibits anyone&apos;s use or enjoyment of the Site.</li>
              <li>To attempt to interfere with the proper working of the Site via denial-of-service (DDoS) attacks.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>6. Disclaimer of Warranties &amp; Limitation of Liability</h2>
            <p>
              YOUR USE OF THE SITE, ITS CONTENT, AND ANY SERVICES OBTAINED THROUGH THE SITE IS AT YOUR OWN RISK. THE SITE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS, WITHOUT WARRANTIES OF ANY KIND. IN NO EVENT WILL SAPHRAN, ITS AFFILIATES, OR THEIR LICENSORS BE LIABLE FOR DAMAGES OF ANY KIND ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE SITE.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>7. Governing Law</h2>
            <p>
              All matters relating to the Site and these Terms of Use shall be governed by and construed in accordance with the internal laws of the State of Michigan, without giving effect to any choice or conflict of law provision. Any legal action shall be instituted exclusively in the federal or state courts located in Oakland County, Michigan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── About Page ───────────────────────────────────────────────────────────────

function AboutPage({ setPage }: { setPage: (p: Page) => void }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const leadership = [
    {
      name: "Sean Lefever",
      role: "Chief Executive Officer",
      linkedin: "https://www.linkedin.com/in/seanlefever/",
      img: teamSeanSrc,
    },
    {
      name: "Kenneth Bassey",
      role: "Founder & President of Customer Success",
      linkedin: "https://www.linkedin.com/in/kenneth-bassey-130393/",
      img: teamKennethSrc,
    },
    {
      name: "Ami Trivedi",
      role: "Director of Sales",
      linkedin: "https://www.linkedin.com/in/amitrivedi1997/",
      img: teamAmiSrc,
    },
    {
      name: "Megan Mills",
      role: "Senior Director Customer Success",
      linkedin: "https://www.linkedin.com/in/megan-m-108270b0/",
      img: teamMeganSrc,
    },
  ];

  return (
    <section className="pt-32 pb-24 bg-white min-h-screen text-slate-800 relative overflow-hidden">
      {/* Background Watermark */}
      <div 
        className="absolute top-1/4 right-0 pointer-events-none opacity-[0.03] select-none"
        style={{ width: 600, height: 600 }}
      >
        <img src={watermarkLightSrc} alt="" className="w-full h-full object-contain" />
      </div>

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        <button
          onClick={() => setPage("home")}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 transition-colors mb-8 font-semibold uppercase tracking-wider cursor-pointer"
        >
          <ArrowLeft size={12} /> Back to Home
        </button>

        <div className="max-w-3xl mb-16">
          <Eyebrow>OUR STORY</Eyebrow>
          <h1 className="font-extrabold text-slate-900 mb-6 leading-[1.08]" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(32px, 4vw, 56px)", letterSpacing: "-0.025em" }}>
            About Saphran
          </h1>
          <p className="text-lg leading-relaxed text-slate-650 font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
            Founded in 2004, Saphran is recognized as a leader in forecasting and cost estimating cloud software, built on years of experience and a commitment to delivering dependable solutions for modern manufacturers. Everything we do is focused on helping our customers plan with accuracy, control costs, and stay competitive.
          </p>
          <p className="text-base leading-relaxed text-slate-500 mt-4 font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
            As markets continue to change, we continue to adapt, ensuring our platform and approach evolve alongside our customers&apos; needs.
          </p>
        </div>

        {/* Our Leadership */}
        <div className="border-t border-slate-200/80 pt-16 mt-16">
          <div className="mb-12 max-w-3xl">
            <h2 className="font-bold text-slate-900 mb-4" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-0.025em" }}>
              Our Leadership
            </h2>
            <p className="text-[15px] leading-relaxed text-slate-600 font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
              Saphran’s leadership team brings together experience across engineering, manufacturing, and commercial strategy. With a deep understanding of the pressures manufacturers face, the team focuses on building practical solutions that reduce uncertainty, improve costing accuracy, and support more confident decision-making at every stage of the business.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((member, i) => (
              <div 
                key={i} 
                className="bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-full aspect-square bg-slate-100 overflow-hidden relative">
                    <img 
                      src={member.img} 
                      alt={member.name}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-slate-900 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {member.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-snug font-sans mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {member.role}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-0">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#0a66c2] hover:text-[#004182] font-semibold transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── App root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPageInternal] = useState<Page>(() => {
    const hash = window.location.hash.replace("#", "") as Page;
    const validPages: Page[] = [
      "home", "capabilities", "contact", "startup", 
      "quotebase", "partbase", "connectbase", 
      "intelligencebase", "saphranai", "scenariopro",
      "privacypolicy", "termsofuse", "about"
    ];
    return validPages.includes(hash) ? hash : "home";
  });

  const setPage = (newPage: Page) => {
    setPageInternal(newPage);
    window.location.hash = newPage;
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "") as Page;
      const validPages: Page[] = [
        "home", "capabilities", "contact", "startup", 
        "quotebase", "partbase", "connectbase", 
        "intelligencebase", "saphranai", "scenariopro",
        "privacypolicy", "termsofuse", "about"
      ];
      if (validPages.includes(hash)) {
        setPageInternal(hash);
      } else {
        setPageInternal("home");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#fff",
        fontFamily: "'Inter', sans-serif",
        color: GRAPHITE,
      }}
    >
      <Header page={page} setPage={setPage} />
      {page === "home"         && <HomePage setPage={setPage} />}
      {page === "capabilities" && <CapabilitiesPage setPage={setPage} />}
      {page === "contact"      && <ContactPage setPage={setPage} />}
      {page === "startup"      && <StartupPage setPage={setPage} />}
      {page === "quotebase"    && <QuoteBasePage setPage={setPage} />}
      {page === "partbase"     && <PartBasePage setPage={setPage} />}
      {page === "connectbase"  && <ConnectBasePage setPage={setPage} />}
      {page === "intelligencebase" && <IntelligenceBasePage setPage={setPage} />}
      {page === "saphranai"    && <SaphranAIPage setPage={setPage} />}
      {page === "scenariopro"  && <ScenarioProPage setPage={setPage} />}
      {page === "privacypolicy" && <PrivacyPolicyPage setPage={setPage} />}
      {page === "termsofuse"    && <TermsOfUsePage setPage={setPage} />}
      {page === "about"         && <AboutPage setPage={setPage} />}
      {page !== "contact" && page !== "startup" && <Footer setPage={setPage} />}
    </div>
  );
}
