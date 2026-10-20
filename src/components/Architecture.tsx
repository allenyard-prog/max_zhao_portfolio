import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { StripeMark } from './BrandIcon'

/* ── Diagram model (viewBox 1200 × 600) ─────────────────────────────── */

type Node = {
  id: string
  x: number
  y: number
  w: number
  title: string
  sub: string
  accent: string
  tag?: string
}

const H = 84
const ROW1 = 80
const ROW2 = 300
const CY1 = ROW1 + H / 2
const CY2 = ROW2 + H / 2

// Grid: 5 columns × 200 wide with 60 gaps → viewBox width 1300.
const VB_W = 1300
const W = 200
const GAP = 60
const col = (i: number) => 30 + i * (W + GAP)
const cx = (i: number) => col(i) + W / 2

// Every label below is taken from the resume bullets for the Stripe role — no inferred internals.
const nodes: Node[] = [
  // Row 1 — metering pipeline
  { id: 'merchants', x: col(0), y: ROW1, w: W, title: 'SaaS & AI businesses', sub: 'merchant usage events', accent: '#a1a1aa', tag: 'source' },
  { id: 'meter-api', x: col(1), y: ROW1, w: W, title: 'Meter Event Ingestion', sub: 'Go · Protobuf', accent: '#22d3ee', tag: 'ingest' },
  { id: 'kafka', x: col(2), y: ROW1, w: W, title: 'Apache Kafka', sub: 'streaming meter events', accent: '#f472b6', tag: 'stream' },
  { id: 'flink', x: col(3), y: ROW1, w: W, title: 'Flink Aggregation', sub: 'late-arriving usage · Java', accent: '#fb923c', tag: 'compute' },
  { id: 'usage', x: col(4), y: ROW1, w: W, title: 'Usage Aggregates', sub: 'accurate consumption totals', accent: '#a3e635', tag: 'output' },
  // Row 2 — pricing & billing
  { id: 'dashboard', x: col(0), y: ROW2, w: W, title: 'Rate Card Management', sub: 'React · TypeScript · GraphQL', accent: '#22d3ee', tag: 'ui' },
  { id: 'catalog', x: col(1), y: ROW2, w: W, title: 'Product Catalog', sub: 'configs · pricing versions', accent: '#7c5cff', tag: 'service' },
  { id: 'rating', x: col(2), y: ROW2, w: W, title: 'Flexible Pricing', sub: 'tiered · volume · enterprise', accent: '#7c5cff', tag: 'service' },
  { id: 'invoices', x: col(3), y: ROW2, w: W, title: 'Invoices & Subscriptions', sub: 'usage-based billing', accent: '#a3e635', tag: 'billing' },
  { id: 'agent', x: col(4), y: ROW2, w: W, title: 'Billing Ops AI Agent', sub: 'LangGraph · OpenAI · MCP', accent: '#f472b6', tag: 'ai' },
]

const right = (n: Node) => n.x + n.w
const byId = Object.fromEntries(nodes.map((n) => [n.id, n])) as Record<string, Node>
const gapMid = (i: number) => right(nodes[i]) + GAP / 2

type Edge = { id: string; d: string; label?: string; lx?: number; ly?: number; dashed?: boolean }

const edges: Edge[] = [
  { id: 'e1', d: `M${right(byId.merchants)},${CY1} H${byId['meter-api'].x}`, label: 'usage', lx: gapMid(0), ly: CY1 - 10 },
  { id: 'e2', d: `M${right(byId['meter-api'])},${CY1} H${byId.kafka.x}`, label: 'proto', lx: gapMid(1), ly: CY1 - 10 },
  { id: 'e3', d: `M${right(byId.kafka)},${CY1} H${byId.flink.x}`, label: 'events', lx: gapMid(2), ly: CY1 - 10 },
  { id: 'e4', d: `M${right(byId.flink)},${CY1} H${byId.usage.x}`, label: 'totals', lx: gapMid(3), ly: CY1 - 10 },
  // late-arriving loop above Flink
  { id: 'e5', d: `M${cx(3) - 50},80 C${cx(3) - 50},34 ${cx(3) + 50},34 ${cx(3) + 50},80`, label: 'handles late-arriving usage', lx: cx(3), ly: 36, dashed: true },
  // usage aggregates → pricing (drops to row 2)
  { id: 'e6', d: `M${cx(4)},164 V232 Q${cx(4)},240 ${cx(4) - 8},240 H${cx(2) + 8} Q${cx(2)},240 ${cx(2)},248 V300`, label: 'aggregated usage', lx: cx(3), ly: 232 },
  { id: 'e7', d: `M${right(byId.dashboard)},${CY2} H${byId.catalog.x}`, label: 'GraphQL', lx: gapMid(5), ly: CY2 - 10 },
  { id: 'e8', d: `M${right(byId.catalog)},${CY2} H${byId.rating.x}`, label: 'prices', lx: gapMid(6), ly: CY2 - 10 },
  { id: 'e9', d: `M${right(byId.rating)},${CY2} H${byId.invoices.x}`, label: 'priced', lx: gapMid(7), ly: CY2 - 10 },
  { id: 'e10', d: `M${right(byId.invoices)},${CY2} H${byId.agent.x}`, label: 'MCP', lx: gapMid(8), ly: CY2 - 10, dashed: true },
  // agent reaching back into billing APIs via MCP tool calling
  { id: 'e11', d: `M${cx(4)},384 V432 Q${cx(4)},440 ${cx(4) - 8},440 H${cx(1) + 8} Q${cx(1)},440 ${cx(1)},432 V384`, label: 'invoice investigation · subscription analysis · issue resolution', lx: (cx(1) + cx(4)) / 2, ly: 458, dashed: true },
]

// Path the "events" travel along — hidden, used by MotionPathPlugin.
const FLOW_PATH = `M${cx(0)},122 H${cx(4)} V232 Q${cx(4)},240 ${cx(4) - 8},240 H${cx(2) + 8} Q${cx(2)},240 ${cx(2)},248 V342 H${cx(3)}`

// Text safety: if a visitor's font renders wider than ours, squeeze the glyphs rather than overflow the box.
const fitSvgText = (root: HTMLElement) => {
  root.querySelectorAll<SVGTextElement>('text[data-max]').forEach((t) => {
    const max = Number(t.dataset.max)
    t.removeAttribute('textLength')
    if (t.getComputedTextLength() > max) {
      t.setAttribute('textLength', String(max))
      t.setAttribute('lengthAdjust', 'spacingAndGlyphs')
    }
  })
}

const legend = [
  { color: '#22d3ee', label: 'Ingestion' },
  { color: '#fb923c', label: 'Streaming compute' },
  { color: '#7c5cff', label: 'Pricing & catalog' },
  { color: '#a3e635', label: 'State & output' },
  { color: '#f472b6', label: 'AI operations' },
]

/* ── Component ──────────────────────────────────────────────────────── */

export default function Architecture() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      fitSvgText(root.current!)
      document.fonts?.ready.then(() => root.current && fitSvgText(root.current))

      const mm = gsap.matchMedia()
      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduce: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const { reduce } = ctx.conditions!
          const d = (n: number) => (reduce ? 0 : n)

          gsap.from('.arch .section-head > *, .arch__intro > *', {
            y: 30,
            autoAlpha: 0,
            stagger: 0.08,
            duration: d(1.2),
            ease: 'expo.out',
            scrollTrigger: { trigger: '.arch .section-head', start: 'top 85%' },
          })

          // Build sequence: nodes pop in row by row, edges draw, labels fade, then flow starts.
          const tl = gsap.timeline({
            defaults: { ease: 'expo.out' },
            scrollTrigger: { trigger: '.arch__board', start: 'top 70%' },
          })

          tl.from('.arch__board', { autoAlpha: 0, y: 40, duration: d(1) })
            .from('.arch__node', {
              autoAlpha: 0,
              scale: 0.85,
              transformOrigin: '50% 50%',
              stagger: { each: 0.07, from: 'start' },
              duration: d(0.9),
              ease: 'back.out(1.6)',
            }, '-=0.5')
            .from('.arch__edge:not(.arch__edge--dashed)', {
              drawSVG: '0%',
              stagger: 0.08,
              duration: d(0.8),
              ease: 'power2.inOut',
            }, '-=0.6')
            .from('.arch__edge--dashed', { autoAlpha: 0, stagger: 0.1, duration: d(0.8) }, '-=0.6')
            .from('.arch__edge-label', { autoAlpha: 0, stagger: 0.04, duration: d(0.5) }, '-=0.5')
            .from('.arch__obs', { autoAlpha: 0, y: 12, duration: d(0.8) }, '-=0.3')
            .from('.arch__legend li', { autoAlpha: 0, y: 10, stagger: 0.06, duration: d(0.6) }, '<')

          if (reduce) return

          // Continuous flow: packets travel the pipeline, nodes pulse as they pass.
          const packets = gsap.utils.toArray<SVGCircleElement>('.arch__packet')
          packets.forEach((p, i) => {
            gsap.to(p, {
              motionPath: { path: '#arch-flow', align: '#arch-flow', alignOrigin: [0.5, 0.5] },
              duration: 9,
              ease: 'none',
              repeat: -1,
              delay: i * 3,
              scrollTrigger: { trigger: '.arch__board', start: 'top 70%', toggleActions: 'play pause resume pause' },
            })
          })

          // Gentle halo breathing on the two "hot" nodes.
          gsap.to('.arch__node--flink .arch__halo, .arch__node--kafka .arch__halo', {
            opacity: 0.6,
            scale: 1.03,
            transformOrigin: '50% 50%',
            duration: 1.8,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
            stagger: 0.6,
          })

          // Dashed edges crawl.
          gsap.to('.arch__edge--dashed', {
            strokeDashoffset: -24,
            duration: 2,
            ease: 'none',
            repeat: -1,
          })
        },
      )
    },
    { scope: root },
  )

  return (
    <section className="section arch" id="architecture" ref={root}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">03 — Architecture</span>
          <h2 className="h2">
            Usage-based billing, <em className="grad-text">end to end</em>
          </h2>
        </div>

        <div className="arch__intro">
          <div className="arch__badge">
            <StripeMark size={28} />
            <span>Stripe · Product Catalog, Pricing &amp; Usage-Based Billing</span>
          </div>
          <p>
            How a meter event becomes revenue. Merchants emit usage; Go and Java services ingest meter events
            through Kafka and Flink, handling late-arriving usage so consumption is billed accurately; the
            Product Catalog and Flexible Pricing services (Ruby, FastAPI, PostgreSQL, with a React/GraphQL rate
            card UI) turn aggregated usage into tiered, volume-based, and enterprise pricing; and a LangGraph
            agent automates billing operations through MCP tool calling.
          </p>
        </div>

        <div className="arch__board" data-cursor>
          <span className="arch__hint" aria-hidden="true">Swipe to explore →</span>
          <div className="arch__scroll">
            <svg className="arch__svg" viewBox={`0 0 ${VB_W} 600`} role="img" aria-labelledby="arch-title">
              <title id="arch-title">
                Architecture of the usage-based billing platform: meter events flow from merchant apps through Go
                ingestion, Kafka and Flink aggregation into usage totals, then through the product catalog and
                flexible pricing into invoices, with a billing operations AI agent attached via MCP.
              </title>
              <defs>
                <linearGradient id="arch-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#7c5cff" />
                  <stop offset="0.55" stopColor="#22d3ee" />
                  <stop offset="1" stopColor="#a3e635" />
                </linearGradient>
                <radialGradient id="arch-packet">
                  <stop offset="0" stopColor="#fff" />
                  <stop offset="0.4" stopColor="#22d3ee" />
                  <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
                </radialGradient>
                <marker id="arch-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M0,0 L10,5 L0,10 z" fill="rgba(255,255,255,0.55)" />
                </marker>
                <pattern id="arch-dots" width="24" height="24" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.07)" />
                </pattern>
              </defs>

              <rect width={VB_W} height="600" fill="url(#arch-dots)" />

              {/* Row labels */}
              <text className="arch__row" x="30" y={ROW1 - 22}>01 · METERING PIPELINE</text>
              <text className="arch__row" x="30" y={ROW2 - 22}>02 · PRICING &amp; BILLING</text>

              {/* Flow path (invisible) + packets, drawn under nodes */}
              <path id="arch-flow" d={FLOW_PATH} fill="none" stroke="none" />
              {[0, 1, 2].map((i) => (
                <circle key={i} className="arch__packet" r="9" fill="url(#arch-packet)" />
              ))}

              {/* Edges */}
              {edges.map((e) => (
                <g key={e.id}>
                  <path
                    className={`arch__edge ${e.dashed ? 'arch__edge--dashed' : ''}`}
                    d={e.d}
                    fill="none"
                    markerEnd={e.id === 'e5' || e.id === 'e11' ? undefined : 'url(#arch-head)'}
                  />
                  {e.label && (
                    <text className="arch__edge-label" x={e.lx} y={e.ly} textAnchor="middle">
                      {e.label}
                    </text>
                  )}
                </g>
              ))}

              {/* Nodes */}
              {nodes.map((n) => (
                <g key={n.id} className={`arch__node arch__node--${n.id}`}>
                  <rect className="arch__halo" x={n.x - 6} y={n.y - 6} width={n.w + 12} height={H + 12} rx="18" fill={n.accent} opacity="0.12" />
                  <rect className="arch__box" x={n.x} y={n.y} width={n.w} height={H} rx="12" />
                  <rect x={n.x} y={n.y + 14} width="3" height={H - 28} rx="1.5" fill={n.accent} />
                  <text className="arch__title" x={n.x + 18} y={n.y + 34} data-max={n.w - 36}>{n.title}</text>
                  <text className="arch__sub" x={n.x + 18} y={n.y + 56} data-max={n.w - 30}>{n.sub}</text>
                  {n.tag && (
                    <text className="arch__tag" x={n.x + n.w - 12} y={n.y + 18} textAnchor="end" fill={n.accent}>
                      {n.tag}
                    </text>
                  )}
                </g>
              ))}

              {/* Observability strip */}
              <g className="arch__obs">
                <rect x="30" y="500" width={VB_W - 60} height="60" rx="12" />
                <text className="arch__title" x="48" y="536" data-max="230">Reliability &amp; observability</text>
                <text className="arch__sub" x="300" y="536" data-max={VB_W - 340}>
                  OpenTelemetry · Datadog · ELK Stack · billing anomaly detection · automated testing with RSpec, JUnit 5 and Playwright
                </text>
                <rect x="30" y="500" width={VB_W - 60} height="2" fill="url(#arch-grad)" opacity="0.8" />
              </g>
            </svg>
          </div>

          <ul className="arch__legend">
            {legend.map((l) => (
              <li key={l.label}>
                <span style={{ background: l.color }} />
                {l.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
