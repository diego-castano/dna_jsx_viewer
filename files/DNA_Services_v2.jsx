import { useState } from "react";

const C = { navy: "#1B2A4A", teal: "#2E8B8B", gold: "#C4943D", warm: "#8B5E3C", light: "#F8F8F5", ltT: "#E8F4F4", ltG: "#FFF8EE", ltN: "#ECEEF2" };

const JOURNEY = [
  { step: 1, name: "Understand", color: C.navy, desc: "Strategy + positioning" },
  { step: 2, name: "Define", color: C.teal, desc: "Brand identity" },
  { step: 3, name: "Build", color: C.gold, desc: "Website + platform" },
  { step: 4, name: "Grow", color: C.warm, desc: "Content + social + PR" },
];

const SERVICES = [
  {
    id: "strategy", icon: "◎", name: "Strategy", journey: 1, color: C.navy,
    headline: "Know where you're going before you start creating.",
    intro: "Great content without strategy is just noise. We build the strategic foundation that makes every piece of content, every campaign, and every channel decision work harder.",
    packages: [
      {
        name: "Strategy Sprint", price: "From £7,000", timeline: "3-4 weeks", type: "Project",
        ideal: "Startups, new products, brands that feel scattered",
        includes: ["Half-day discovery workshop", "Brand audit + competitor landscape", "2-3 audience personas", "Positioning + messaging framework", "90-day action plan", "Strategy presentation deck"],
        outcome: "You walk away with total clarity on who you are, who you're talking to, and what to do next.",
      },
      {
        name: "Strategy Programme", price: "From £18,000", timeline: "6-10 weeks", type: "Project",
        ideal: "Growing businesses, pre-rebrand groundwork, multi-channel coordination",
        includes: ["Full-day immersive workshop", "Content + technical audit", "SEO/GEO keyword research", "Competitor benchmarking (5-8 competitors)", "4-6 audience personas", "Brand narrative + messaging house", "6-12 month content calendar", "KPI framework + measurement design", "Cross-channel integration plan", "Board-ready strategy presentation"],
        outcome: "A comprehensive 12-month roadmap with every channel, audience, and KPI mapped out. No more guessing.",
      },
    ],
  },
  {
    id: "brand", icon: "✦", name: "Brand", journey: 2, color: C.teal,
    headline: "Your brand is the reason customers choose you.",
    intro: "More than a logo. A complete identity system that captures who you are and ensures every touchpoint tells the same story. From startups finding their voice to established businesses ready for transformation.",
    packages: [
      {
        name: "Brand Foundations", price: "From £18,000", timeline: "6-8 weeks", type: "Project",
        ideal: "Startups, founders going professional, side projects going serious",
        includes: ["2-hour discovery workshop", "2-3 logo concepts (2 revision rounds)", "Colour palette + typography", "Stationery suite", "Social media kit (1 platform)", "Homepage mockup", "Brand world presentation", "Tone of voice summary + tagline", "1-2 page brand guide", "All final files (AI, PNG, JPG, SVG)"],
        outcome: "A professional brand identity you can launch with confidence.",
      },
      {
        name: "Brand Identity", price: "From £50,000", timeline: "10-14 weeks", type: "Project",
        ideal: "Growing businesses, rebrands, multi-audience brands",
        includes: ["Half-day strategy workshop", "Complete brand strategy document", "4-6 logo concepts (4 revision rounds)", "Full visual identity system", "Social kit (2 platforms)", "Website branding (4 page mockups + UX)", "20-30 page brand guidelines", "Brand narrative + messaging framework", "Elevator pitch + audience personas", "Tone of voice guide with examples"],
        outcome: "A complete brand system you can roll out consistently across every channel.",
      },
      {
        name: "Brand Transformation", price: "From £75,000", timeline: "14-20 weeks", type: "Project",
        ideal: "Complete rebrands, multi-market brands, organisations going through major change",
        includes: ["Full-day immersive workshop", "Comprehensive brand strategy + architecture", "5-6 logo concepts (unlimited revisions)", "Full visual identity system", "Social kit (4 platforms)", "Packaging design (up to 3 products)", "Website branding + UX recommendations", "40+ page brand guidelines", "Customer journey mapping", "Marketing/comms plan with timeline", "Hero campaign concept (fully art-directed)", "Motion/animated brand assets", "Brand launch plan"],
        outcome: "A complete brand transformation. Strategy, identity, collateral, digital, and a plan to bring it all to market.",
      },
    ],
  },
  {
    id: "websites", icon: "⟐", name: "Websites", journey: 3, color: C.gold,
    headline: "Your digital shopfront, built to grow with you.",
    intro: "We design and build websites that look exceptional and work harder for your business. Every build includes SEO/GEO foundations, because a beautiful site nobody can find is a beautiful waste of money. And because we're a content agency too, we can keep it alive after launch.",
    packages: [
      {
        name: "Starter Site", price: "From £12,000", timeline: "6-8 weeks", type: "Project",
        ideal: "New businesses, MVPs, professional web presence needed fast",
        includes: ["Strategy session", "Custom homepage + up to 5 pages", "Responsive design (mobile, tablet, desktop)", "CMS setup (WordPress/Webflow)", "Basic SEO + GEO foundations", "Google Analytics", "Contact forms + social integration", "1-year hosting", "2 hours post-launch training"],
        outcome: "A clean, fast, SEO-ready website that works from day one.",
      },
      {
        name: "Growth Site", price: "From £25,000", timeline: "10-14 weeks", type: "Project",
        ideal: "Scaling businesses, content-led brands, companies ready for proper digital",
        includes: ["UX/UI strategy session", "Custom homepage + up to 8 pages (3 revisions)", "Advanced SEO/GEO setup", "Blog with custom templates", "Basic e-commerce (up to 10 products)", "Newsletter + email integration", "Conversion tracking", "Animations + interactive elements", "1-year premium hosting", "4 hours post-launch training"],
        outcome: "A website that grows with your business, optimised for search and conversion.",
      },
      {
        name: "Full Build", price: "From £60,000", timeline: "4-6 months", type: "Project",
        ideal: "Enterprise, e-commerce, multi-market, complex digital platforms",
        includes: ["Full-day UX/UI strategy workshop", "Custom wireframes + prototypes", "Up to 15 pages (unlimited homepage revisions)", "Advanced e-commerce (50+ products + payments)", "CRM + marketing automation integration", "Multilingual support", "Advanced SEO/GEO programme", "Speed + security optimisation", "1-year premium technical support"],
        outcome: "A custom digital platform built for scale, performance, and growth.",
      },
      {
        name: "Website + Content Programme", price: "From £30,000 build + £5,000/mo", timeline: "Build: 10-14 weeks, then ongoing", type: "Build + Retainer",
        ideal: "ANY business that wants their website to actually work after launch day",
        includes: ["Everything in Growth Site, plus:", "SEO/GEO content strategy (pre-build)", "Launch-ready blog content (4 articles)", "Monthly content retainer (post-launch):", "  4x blog posts/articles (SEO optimised)", "  8x social posts promoting web content", "  Monthly SEO/GEO reporting", "  Quarterly content strategy reviews", "  Dedicated content team"],
        outcome: "A website that launches strong AND stays alive. Most agency sites go stale within 3 months. Yours won't.",
      },
    ],
  },
  {
    id: "content", icon: "✎", name: "Content + Social", journey: 4, color: C.warm,
    headline: "Always-on content that builds trust, audience, and revenue.",
    intro: "Consistent, quality content across every channel. Writers, designers, strategists, SEO specialists, social media managers, and PR. Your content department, without the overhead.",
    packages: [
      {
        name: "Content Essentials", price: "From £5,000/mo", timeline: "3-month minimum", type: "Monthly",
        ideal: "SMEs starting to invest in organic growth",
        includes: ["4x blog posts (SEO optimised)", "8x social posts (copy + design)", "Monthly editorial calendar", "Monthly analytics report", "Quarterly SEO health check", "Dedicated writing + design team"],
        outcome: "Consistent, quality content every month. The basics, done properly.",
      },
      {
        name: "Content Growth", price: "From £10,000/mo", timeline: "6-month minimum", type: "Monthly",
        ideal: "Brands scaling organic, 2-3 active channels",
        includes: ["8x articles (SEO/GEO optimised)", "20x social posts with bespoke creative", "Monthly newsletter", "SEO/GEO programme + monthly keyword report", "Community management (5hrs/week)", "Quarterly strategy review", "Monthly performance report"],
        outcome: "A proper content operation with strategy, SEO, social, and reporting built in.",
      },
      {
        name: "Content Studio", price: "From £18,000/mo", timeline: "6-month minimum", type: "Monthly",
        ideal: "Brands running 3+ channels, complex content needs",
        includes: ["10x articles (blog + thought leadership)", "30x social posts across 2-3 platforms", "2x PR / thought leadership pieces", "Monthly newsletter", "Full SEO/GEO strategy + reporting", "Community management (8hrs/week)", "Video content coordination", "Monthly strategy session", "Named content lead as your day-to-day"],
        outcome: "Your own content department. A named team producing high-volume, multi-channel content.",
      },
      {
        name: "Content Enterprise", price: "From £40,000/mo", timeline: "12-month minimum", type: "Monthly",
        ideal: "Enterprise, multi-market, complex stakeholder environments",
        includes: ["Fractional CMO (strategic oversight)", "12x+ articles + white papers", "40x+ social posts across all platforms", "4x press releases + media pitching", "Full SEO/GEO programme", "Full-time community management", "Campaign creative (quarterly)", "Weekly analytics + board-ready reports", "Dedicated programme manager", "Crisis comms support (on-call)"],
        outcome: "A full content, social, and comms operation. This is the ZEDRA / UpScrolled tier.",
      },
    ],
  },
  {
    id: "platform", icon: "⬡", name: "Platform", journey: 3, color: "#1ABC9C",
    headline: "Stop juggling 12 tools. One platform for everything.",
    intro: "DNA Drive replaces Brandfolder, Bynder, Frontify, Prezly, and WeTransfer. One platform, a fraction of the cost, and a team that actually runs it for you. Build fee + monthly managed service.",
    packages: [
      { name: "Studio + DAM", price: "From £15k build + £1.5k/mo", timeline: "4-6 weeks", type: "Build + Managed",
        ideal: "Brand asset management, partner access, file sharing",
        includes: ["Brand hub + asset library", "File sharing + permissions", "Partner/stakeholder portals", "Basic analytics", "Team onboarding + training"],
        outcome: "All your brand assets in one place. Accessible, controlled, professional." },
      { name: "Newsroom", price: "From £25k build + £2k/mo", timeline: "6-8 weeks", type: "Build + Managed",
        ideal: "PR-led organisations, media-facing brands",
        includes: ["Everything in DAM, plus:", "Press release publishing", "Media kit hosting", "Journalist registration + authentication", "RSS feeds + embeddable widgets"],
        outcome: "A 24/7 digital newsroom. Media self-service, always on." },
      { name: "Media Centre", price: "From £25k build + £2k/mo", timeline: "8-12 weeks", type: "Build + Managed",
        ideal: "Enterprise comms teams, multi-brand organisations",
        includes: ["Full DAM + Newsroom combined", "Media contact management", "Distribution tools", "Analytics dashboard", "Multi-brand support", "Custom domains + API access"],
        outcome: "The full DNA platform. Everything your content operation needs." },
    ],
  },
];

const BUNDLES = [
  { name: "Launch Bundle", desc: "Brand + Website + 6 months content", price: "From £55,000 + £5k/mo", ideal: "Startups and new ventures going to market", saves: "~15% vs buying separately" },
  { name: "Rebrand Bundle", desc: "Strategy + Brand Identity + Website rebuild", price: "From £85,000", ideal: "Established businesses needing transformation", saves: "~12% vs buying separately" },
  { name: "Growth Bundle", desc: "Website + Content Growth + Platform", price: "From £30k build + £12k/mo", ideal: "Scaling brands investing in organic", saves: "~10% + platform included" },
  { name: "Full Service", desc: "Strategy + Brand + Website + Content + Platform", price: "From £100k+ build + £20k/mo", ideal: "Enterprise. ZEDRA / UpScrolled tier.", saves: "Custom scoping. One partner for everything." },
];

export default function DNAServices() {
  const [view, setView] = useState("journey");
  const [activeService, setActiveService] = useState(null);
  const [expandedPkg, setExpandedPkg] = useState(null);

  const svc = SERVICES.find(s => s.id === activeService);

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", background: C.light, minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: C.navy, padding: "24px 28px 18px" }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,0.5)", marginBottom: 2 }}>DNA</div>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "white" }}>How We Work With You</h1>
        <p style={{ margin: "4px 0 0", fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Every brand has a story. We help you tell it, from strategy through to execution and beyond.</p>
      </div>

      {/* Journey bar */}
      <div style={{ background: "white", borderBottom: "1px solid #E4E4E0", padding: "12px 28px", display: "flex", gap: 8, overflowX: "auto" }}>
        <button onClick={() => { setView("journey"); setActiveService(null); setExpandedPkg(null); }}
          style={{ padding: "6px 14px", borderRadius: 20, border: view === "journey" ? `2px solid ${C.navy}` : "1px solid #DDD", background: view === "journey" ? C.navy : "white", color: view === "journey" ? "white" : "#666", fontSize: 11, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
          The Journey
        </button>
        {SERVICES.map(s => (
          <button key={s.id} onClick={() => { setView("detail"); setActiveService(s.id); setExpandedPkg(null); }}
            style={{ padding: "6px 14px", borderRadius: 20, border: activeService === s.id ? `2px solid ${s.color}` : "1px solid #DDD", background: activeService === s.id ? s.color : "white", color: activeService === s.id ? "white" : "#666", fontSize: 11, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
            {s.icon} {s.name}
          </button>
        ))}
        <button onClick={() => { setView("bundles"); setActiveService(null); setExpandedPkg(null); }}
          style={{ padding: "6px 14px", borderRadius: 20, border: view === "bundles" ? `2px solid ${C.gold}` : "1px solid #DDD", background: view === "bundles" ? C.gold : "white", color: view === "bundles" ? "white" : "#666", fontSize: 11, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
          ★ Bundles
        </button>
      </div>

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "24px 20px" }}>

        {/* JOURNEY VIEW */}
        {view === "journey" && (
          <div>
            <h2 style={{ fontSize: 20, color: C.navy, margin: "0 0 6px" }}>The DNA Journey</h2>
            <p style={{ fontSize: 13, color: "#666", margin: "0 0 20px", lineHeight: 1.6 }}>Most agencies sell services. We sell a journey. You can start anywhere, but the best results come from following the path. Each step builds on the last.</p>

            {JOURNEY.map((j, i) => (
              <div key={j.step} style={{ display: "flex", gap: 16, marginBottom: 16, alignItems: "flex-start" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: j.color, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, flexShrink: 0 }}>{j.step}</div>
                <div style={{ flex: 1, background: "white", borderRadius: 10, padding: "16px 20px", borderLeft: `4px solid ${j.color}` }}>
                  <h3 style={{ margin: "0 0 4px", fontSize: 16, color: j.color, fontWeight: 700 }}>{j.name}</h3>
                  <p style={{ margin: "0 0 10px", fontSize: 13, color: "#555" }}>{j.desc}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {SERVICES.filter(s => s.journey === j.step).map(s => (
                      <button key={s.id} onClick={() => { setView("detail"); setActiveService(s.id); }}
                        style={{ padding: "5px 12px", borderRadius: 6, border: `1px solid ${s.color}`, background: "white", color: s.color, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                        {s.icon} {s.name} →
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div style={{ background: C.navy, borderRadius: 10, padding: "20px 24px", color: "white", marginTop: 20 }}>
              <h3 style={{ margin: "0 0 6px", fontSize: 15 }}>The smartest way to work with us?</h3>
              <p style={{ margin: "0 0 12px", fontSize: 13, opacity: 0.8, lineHeight: 1.5 }}>Our bundled programmes combine multiple stages into a single, streamlined engagement. You get a better price, a cohesive result, and one team that knows your brand inside out.</p>
              <button onClick={() => setView("bundles")} style={{ padding: "8px 20px", background: C.gold, border: "none", borderRadius: 6, color: "white", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>View Bundles →</button>
            </div>
          </div>
        )}

        {/* DETAIL VIEW */}
        {view === "detail" && svc && (
          <div>
            <h2 style={{ fontSize: 20, color: svc.color, margin: "0 0 4px" }}>{svc.icon} {svc.name}</h2>
            <p style={{ fontSize: 15, color: C.navy, fontWeight: 600, margin: "0 0 8px", fontStyle: "italic" }}>{svc.headline}</p>
            <p style={{ fontSize: 13, color: "#555", margin: "0 0 20px", lineHeight: 1.6 }}>{svc.intro}</p>

            {svc.packages.map((pkg, i) => (
              <div key={pkg.name} style={{ background: "white", borderRadius: 10, marginBottom: 10, overflow: "hidden", border: expandedPkg === i ? `2px solid ${svc.color}` : "1px solid #E4E4E0" }}>
                <button onClick={() => setExpandedPkg(expandedPkg === i ? null : i)}
                  style={{ width: "100%", padding: "14px 18px", background: expandedPkg === i ? C.light : "white", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.navy }}>{pkg.name}</div>
                    <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{pkg.type} · {pkg.timeline}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: svc.color }}>{pkg.price}</div>
                    <div style={{ fontSize: 18, color: "#CCC", transform: expandedPkg === i ? "rotate(180deg)" : "none", transition: "0.2s" }}>▾</div>
                  </div>
                </button>

                {expandedPkg === i && (
                  <div style={{ padding: "0 18px 16px" }}>
                    <div style={{ padding: "10px 14px", background: C.ltT, borderRadius: 6, marginBottom: 10 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: svc.color, letterSpacing: 1, textTransform: "uppercase" }}>Ideal for</div>
                      <div style={{ fontSize: 12, color: "#444", marginTop: 2 }}>{pkg.ideal}</div>
                    </div>

                    <div style={{ fontSize: 10, fontWeight: 700, color: C.gold, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>What's included</div>
                    {pkg.includes.map((item, j) => (
                      <div key={j} style={{ padding: "5px 0", fontSize: 12, color: item.startsWith("Everything") || item.startsWith("  ") ? svc.color : "#555", fontWeight: item.startsWith("Everything") ? 600 : 400, borderBottom: j < pkg.includes.length - 1 ? "1px solid #F2F2EE" : "none" }}>
                        {!item.startsWith("Everything") && !item.startsWith("  ") && "✓ "}{item}
                      </div>
                    ))}

                    <div style={{ padding: "12px 14px", background: C.ltG, borderRadius: 6, marginTop: 12 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: C.warm, letterSpacing: 1, textTransform: "uppercase" }}>The outcome</div>
                      <div style={{ fontSize: 12, color: "#444", marginTop: 2, fontStyle: "italic" }}>{pkg.outcome}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* BUNDLES VIEW */}
        {view === "bundles" && (
          <div>
            <h2 style={{ fontSize: 20, color: C.gold, margin: "0 0 4px" }}>★ Programme Bundles</h2>
            <p style={{ fontSize: 13, color: "#555", margin: "0 0 6px", lineHeight: 1.6 }}>The smartest way to work with DNA. Combine stages into a single programme: one team, one relationship, one cohesive result. And a better price than buying each piece separately.</p>
            <p style={{ fontSize: 12, color: C.teal, fontWeight: 600, margin: "0 0 20px" }}>Why bundle? Because your brand, website, content, and platform should all be telling the same story. Different agencies mean different interpretations. One DNA team means one clear voice.</p>

            {BUNDLES.map((b, i) => (
              <div key={b.name} style={{ background: "white", borderRadius: 10, padding: "18px 20px", marginBottom: 10, borderLeft: `4px solid ${C.gold}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 15, color: C.navy, fontWeight: 700 }}>{b.name}</h3>
                    <p style={{ margin: "2px 0 0", fontSize: 12, color: "#666" }}>{b.desc}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.teal }}>{b.price}</div>
                    <div style={{ fontSize: 11, color: C.gold, fontWeight: 600 }}>{b.saves}</div>
                  </div>
                </div>
                <div style={{ marginTop: 8, fontSize: 11, color: "#888" }}>Ideal for: {b.ideal}</div>
              </div>
            ))}

            <div style={{ background: C.navy, borderRadius: 10, padding: "20px 24px", color: "white", marginTop: 16 }}>
              <p style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 700 }}>Not sure which bundle fits?</p>
              <p style={{ margin: "0 0 12px", fontSize: 12, opacity: 0.8 }}>Book a discovery call. We'll map out exactly what you need and build a programme around it.</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <div style={{ padding: "8px 20px", background: C.teal, borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Book a Discovery Call</div>
                <div style={{ padding: "8px 20px", background: "transparent", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 6, fontSize: 12, cursor: "pointer" }}>Request a Proposal</div>
              </div>
            </div>
          </div>
        )}

        {/* What Happens Next - always visible */}
        {(view === "detail" || view === "bundles") && (
          <div style={{ background: "white", borderRadius: 10, padding: "18px 20px", marginTop: 20, border: "1px solid #E4E4E0" }}>
            <h3 style={{ margin: "0 0 10px", fontSize: 13, color: C.navy, fontWeight: 700 }}>What happens next?</h3>
            {[
              { n: "1", t: "Feedback", d: "Share your thoughts on our proposal. We'll revise and tailor." },
              { n: "2", t: "Align", d: "We finalise the scope and make sure we're on the same page." },
              { n: "3", t: "Contract", d: "We deliver a detailed scope of work with terms and payment schedule." },
              { n: "4", t: "Kick-off", d: "Project set up, timeline confirmed, and we hit the ground running." },
            ].map(s => (
              <div key={s.n} style={{ display: "flex", gap: 10, marginBottom: 6, alignItems: "center" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: C.teal, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
                <div><span style={{ fontSize: 12, fontWeight: 600, color: C.navy }}>{s.t}: </span><span style={{ fontSize: 12, color: "#666" }}>{s.d}</span></div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ background: C.navy, padding: "14px 28px", textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 10, marginTop: 16 }}>
        © 2026 Digital News Agency Ltd | hello@dna.online | dna.online
      </div>
    </div>
  );
}
