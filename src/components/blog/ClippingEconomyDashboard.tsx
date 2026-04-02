import { ExternalLink, ArrowRight, TrendingUp, Users, DollarSign, Eye, Shield, AlertTriangle, CheckCircle, Zap, Globe, Music, Gamepad2, Podcast, Building2 } from 'lucide-react';

// ── Data ────────────────────────────────────────────────────────────────────

const cpmData = [
  { channel: 'Clipping (best case)', cpm: 0.10 },
  { channel: 'Clipping (average)', cpm: 2.50 },
  { channel: 'Influencer deal', cpm: 8.00 },
  { channel: 'YouTube Ads', cpm: 12.00 },
  { channel: 'Meta Ads', cpm: 17.50 },
  { channel: 'Google Ads', cpm: 20.00 },
  { channel: 'Traditional TV', cpm: 35.00 },
];

const adoptionData = [
  { industry: 'Music & Entertainment', pct: 38, icon: Music, example: 'bbno$, Lady Gaga, Harry Styles' },
  { industry: 'Streamers & Content', pct: 26, icon: Gamepad2, example: 'Kai Cenat, Asmongold, MrBeast' },
  { industry: 'Fintech & Crypto', pct: 18, icon: TrendingUp, example: 'Cluely, Autopilot, Robinhood' },
  { industry: 'Consumer Brands', pct: 10, icon: Building2, example: 'Netflix, Salesforce, Red Bull' },
  { industry: 'Podcasts & Media', pct: 8, icon: Podcast, example: 'Joe Rogan clips, news outlets' },
];

const platforms = [
  {
    name: 'Vyro',
    url: 'https://www.vyro.com',
    logo: '/lovable-uploads/logo-vyro.png',
    tagline: 'Founded by MrBeast & Mark Rober',
    description: 'The creator economy marketplace where fans get paid to spread content. Campaign-based model with creator approval, hourly payouts via PayPal, crypto, or bank.',
    payout: '~$3 / 1K views',
    highlight: 'MrBeast\'s Salesforce Super Bowl campaign ran here — $10K budget, $1.00 CPM',
    facts: ['Campaign budgets: $10K–$30K typical', 'Hourly payouts — PayPal, crypto, or bank', 'Beast Games Episode 6: $30K budget at $0.50 CPM'],
    clients: ['MrBeast', 'Mark Rober', 'Lil Yachty', 'Logan Paul'],
  },
  {
    name: 'Clipping.net',
    url: 'https://clipping.net',
    logo: '/lovable-uploads/logo-clipping-net.png',
    tagline: 'Enterprise-grade clipping platform',
    description: 'Review-gated quality control with real-time brand dashboards. Used by Netflix for the Marcello Hernandez "American Boy" campaign that peaked #3 on Netflix US + Canada.',
    payout: '$1–3 / 1K views',
    highlight: 'Netflix campaign: 41.3M views, 79% over target, peaked #3 Netflix US+CA',
    facts: ['Review-gated quality control', 'TikTok / Instagram / YouTube / X distribution', 'Real-time brand campaign dashboard'],
    clients: ['Netflix', 'Asmongold', 'Kai Cenat', 'Drake'],
  },
  {
    name: 'Whop',
    url: 'https://whop.com',
    logo: '/lovable-uploads/logo-whop.png',
    tagline: '3.5B total views, 100M+ views/day',
    description: 'The largest clipping marketplace with built-in bot detection and 10% platform commission. Hosts campaigns for major music artists and consumer brands.',
    payout: 'Custom CPM',
    highlight: 'One clipper earned $60K over 7 months on the platform (Digiday)',
    facts: ['Bot-detection built in', '10% platform commission', '3.5 billion total views generated'],
    clients: ['Mumford & Sons', 'Harry Styles', 'All-American Rejects'],
  },
  {
    name: 'Clipping Culture',
    url: 'https://clippingculture.com',
    logo: '/lovable-uploads/logo-clipping-culture.png',
    tagline: 'Full-service agency for major labels',
    description: 'Founded March 2025 by Stanfield & Peil. Works with "top labels in the world" including campaigns for Lady Gaga, Selena Gomez, and the Rolling Stones.',
    payout: 'Agency-managed',
    highlight: 'Operator under 18 earning five figures monthly (Variety)',
    facts: ['Lady Gaga, Selena Gomez, Rolling Stones', 'Founded March 2025', 'Full agency model — handles everything'],
    clients: ['Lady Gaga', 'Selena Gomez', 'Rolling Stones'],
  },
  {
    name: 'Clip.tech',
    url: 'https://www.clip.tech',
    logo: '/lovable-uploads/logo-cliptech.png',
    tagline: '"#1 clipping community on the internet"',
    description: 'Community-driven distribution platform that positions itself as the largest clipping community. Curated network of digital marketers delivering short-form media at scale at a fraction of traditional costs.',
    payout: '$1–5 / 1K views',
    highlight: 'Strong Discord community — value proposition is network effect, not just ad tech',
    facts: ['Campaign launching for content exposure', 'Curated distribution network', 'Active Discord, X, and Instagram communities'],
    clients: [],
  },
  {
    name: 'Clipster',
    url: 'https://www.clipster.gg',
    logo: '/lovable-uploads/logo-clipster.png',
    tagline: '120B+ total views, $4.5M+ paid to creators',
    description: 'Performance-based creator marketing platform with 100,000+ active creators and 200+ brand partners. Supports UGC, video clipping, music edits, and logo placements across TikTok, Instagram, and YouTube.',
    payout: '$0.06–2.00 / 1K views',
    highlight: '46 active campaigns with $331K+ in potential earnings available at any time',
    facts: ['120.7 billion total views generated', '100,000+ active creators', 'CPM ranges: $0.06–$2.00 depending on campaign'],
    clients: ['PrizePicks', 'MyNetDiary', 'Zing Coach', 'Bitz.io'],
  },
  {
    name: 'OpusClip',
    url: 'https://opus.pro',
    logo: '/lovable-uploads/logo-opusclip.png',
    tagline: 'AI-powered clip generation',
    description: 'Uses AI to automatically identify viral moments in long-form content and generate optimized short clips. Creators report 10M+ views in a single month using the tool.',
    payout: 'Tool (not marketplace)',
    highlight: 'AI finds the best moments — creators hit 10M views in 1 month',
    facts: ['AI viral moment detection', 'Auto-captioning and formatting', 'One-click multi-platform publishing'],
    clients: [],
  },
];

const caseStudies = [
  {
    brand: 'Netflix',
    logo: '/lovable-uploads/logo-netflix.png',
    campaign: 'Marcello Hernandez "American Boy" special',
    cpm: '$0.65',
    views: '41.3M',
    budget: '~$27K',
    over: '+79%',
    result: 'Peaked #3 on Netflix US + Canada. 23M view target reached in just 4 days. Clipping.net ran the campaign — 50–90% cheaper than comparable influencer deals.',
    source: { url: 'https://clipping.net', label: 'Clipping.net' },
    featured: true,
  },
  {
    brand: 'bbno$',
    logo: null,
    campaign: '"Diamonds Are Forever" — music clipping',
    cpm: '$0.10',
    views: '190M',
    budget: '$9K',
    over: '~1B total',
    result: 'Nearly 1 billion views across all campaigns. The $9K budget produced 190M views at $0.10 CPM — the lowest CPM on record in the clipping economy. 316× cheaper than Meta.',
    source: { url: 'https://variety.com/2026/music/news/clipping-marketing-tool-took-over-music-industry-1236699705/', label: 'Variety' },
    featured: false,
  },
  {
    brand: 'Cluely',
    logo: null,
    campaign: 'AI coaching overlay — grassroots growth',
    cpm: 'Custom',
    views: 'Tens of millions',
    budget: 'Undisclosed',
    over: '$7M ARR',
    result: '700+ clippers hired to distribute product demos. Raised $15M from a16z. Reached $7M ARR through clipper-driven organic growth — no paid social needed.',
    source: { url: 'https://www.forbes.com/sites/boazsobrado/2026/02/11/inside-the-clipping-farms-driving-fintechs-marketing-boom/', label: 'Forbes' },
    featured: false,
  },
  {
    brand: 'MrBeast × Salesforce',
    logo: '/lovable-uploads/logo-vyro.png',
    campaign: 'Super Bowl commercial clip campaign',
    cpm: '$1.00',
    views: '10M+',
    budget: '$10K',
    over: 'Days',
    result: 'MrBeast launched Vyro and used his own platform to distribute Salesforce Super Bowl ad clips. $10K budget with $1.00 CPM. Results delivered in days, not months.',
    source: { url: 'https://influencermarketinghub.com/mrbeast-launches-vyro/', label: 'Influencer Marketing Hub' },
    featured: false,
  },
  {
    brand: 'Autopilot',
    logo: null,
    campaign: 'Investment app — ongoing Whop distribution',
    cpm: '$1–3',
    views: '12M+',
    budget: '$12K+',
    over: '12+ months',
    result: 'Consistent organic reach without paid social. Running 12+ months on Whop. Proves the model works for long-running always-on campaigns, not just spikes.',
    source: { url: 'https://digiday.com/media/wtf-is-clipping-the-low-lift-creator-strategy-grabbing-advertisers-attention/', label: 'Digiday' },
    featured: false,
  },
];

// ── Component ────────────────────────────────────────────────────────────────
export default function ClippingEconomyDashboard() {
  const maxCpm = Math.max(...cpmData.map(d => d.cpm));

  return (
    <div className="space-y-24">

      {/* ── 1. Hero Stats ─────────────────────────────────────────────────── */}
      <section id="overview">
        <div className="rounded-3xl bg-foreground text-background overflow-hidden">
          <div className="px-8 pt-10 pb-4">
            <p className="text-xs font-semibold tracking-widest uppercase text-background/40 mb-1">By the numbers</p>
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-background">The Clipping Economy at a Glance</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-background/10 border-t border-background/10">
            {[
              { value: '3.5B', label: 'Views generated on Whop', sub: '100M+ per day', icon: Eye },
              { value: '~1B', label: 'Views for bbno$ via clipping', sub: 'Variety, 2026', icon: TrendingUp },
              { value: '41.3M', label: 'Netflix "American Boy"', sub: '79% over target', icon: Zap },
              { value: '700+', label: 'Clippers hired by Cluely', sub: 'a16z-backed, $7M ARR', icon: Users },
            ].map((s) => (
              <div key={s.label} className="px-6 py-7">
                <s.icon className="w-4 h-4 text-background/30 mb-3" />
                <div className="text-3xl md:text-4xl font-bold text-background tracking-tight mb-1.5">{s.value}</div>
                <div className="text-xs text-background/60 leading-snug">{s.label}</div>
                <div className="text-xs text-background/35 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 1b. What Is Clipping ──────────────────────────────────────────── */}
      <section>
        <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">The basics</p>
        <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-4">How Clipping Works</h2>
        <p className="text-base text-muted-foreground mb-10 max-w-2xl">
          Clippers aren't influencers. They're normal kids and young adults who take short clips from brands and creators, post them on TikTok, Reels, and Shorts — and get paid per 1,000 views. The brand sets the CPM, the clipper does the distribution.
        </p>
        <div className="grid md:grid-cols-5 gap-4">
          {[
            { step: '01', title: 'Brand creates campaign', desc: 'Sets budget, CPM rate, and content guidelines on a clipping platform' },
            { step: '02', title: 'Clippers see it', desc: 'Browse available campaigns and pick ones they want to promote' },
            { step: '03', title: 'Make a 15–60s clip', desc: 'Create short-form content using the brand\'s assets or footage' },
            { step: '04', title: 'Post to socials', desc: 'Upload to their own TikTok, Instagram Reels, or YouTube Shorts' },
            { step: '05', title: 'Get paid per view', desc: 'Platform tracks verified views, clipper earns CPM-based payout' },
          ].map((s) => (
            <div key={s.step} className="relative">
              <div className="text-4xl font-bold text-primary/10 mb-3 tracking-tighter">{s.step}</div>
              <h3 className="text-sm font-semibold text-foreground mb-1.5">{s.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 2. CPM Comparison ─────────────────────────────────────────────── */}
      <section id="cpm">
        <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">Cost per 1,000 views</p>
        <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-2">Clipping vs Every Other Channel</h2>
        <p className="text-base text-muted-foreground mb-10 max-w-xl">
          At its best, clipping delivers impressions for <strong className="text-foreground">$0.10 CPM</strong> — 100–350× cheaper than Meta or Google. Even average campaigns run at $1–3 CPM, outperforming every traditional digital channel.
        </p>

        <div className="space-y-3">
          {cpmData.map((d) => {
            const isClipping = d.channel.startsWith('Clipping');
            const pct = (d.cpm / maxCpm) * 100;
            return (
              <div key={d.channel} className="flex items-center gap-4">
                <div className="w-40 shrink-0 text-right">
                  <span className={`text-sm ${isClipping ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                    {d.channel}
                  </span>
                </div>
                <div className="flex-1 flex items-center gap-3">
                  <div className="flex-1 h-8 rounded-full bg-muted/30 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${Math.max(pct, 2)}%`,
                        backgroundColor: isClipping ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                      }}
                    />
                  </div>
                  <span className={`text-sm font-semibold tabular-nums w-14 ${isClipping ? 'text-primary' : 'text-muted-foreground'}`}>
                    ${d.cpm.toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-6">
          Sources: Variety (bbno$ campaign), Forbes, Digiday, Meta Ads benchmarks 2026
        </p>
      </section>

      {/* ── 3. The $9K Math ───────────────────────────────────────────────── */}
      <section id="roi">
        <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">Same budget. Radically different reach.</p>
        <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-2">What $9,000 Buys You</h2>
        <p className="text-base text-muted-foreground mb-10 max-w-xl">
          bbno$'s $9,000 campaign delivered 190 million views at $0.10 CPM. The same $9,000 on Meta at $15 CPM buys 600,000 views. That's a <strong className="text-foreground">316× difference</strong>.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { platform: 'Clipping', cpm: '$0.10', views: '190,000,000', multiplier: '316×', highlight: true },
            { platform: 'Meta Ads', cpm: '$15.00', views: '600,000', multiplier: '1×', highlight: false },
            { platform: 'Google Ads', cpm: '$20.00', views: '450,000', multiplier: '0.75×', highlight: false },
          ].map((r) => (
            <div
              key={r.platform}
              className={`rounded-2xl p-6 ${r.highlight
                ? 'bg-foreground text-background'
                : 'bg-muted/20 border border-border/40'
              }`}
            >
              <div className={`text-xs font-semibold tracking-widest uppercase mb-4 ${r.highlight ? 'text-background/50' : 'text-muted-foreground'}`}>
                {r.platform}
              </div>
              <div className={`text-3xl md:text-4xl font-bold tracking-tight mb-1 ${r.highlight ? 'text-background' : 'text-foreground'}`}>
                {r.highlight ? '190M' : r.views}
              </div>
              <div className={`text-sm mb-3 ${r.highlight ? 'text-background/60' : 'text-muted-foreground'}`}>
                views for $9,000
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs ${r.highlight ? 'text-background/40' : 'text-muted-foreground/60'}`}>
                  CPM: {r.cpm}
                </span>
                {r.highlight && (
                  <span className="text-xs font-bold text-primary bg-primary/20 px-2 py-0.5 rounded-full">
                    {r.multiplier} more reach
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Case Studies ───────────────────────────────────────────────── */}
      <section id="case-studies">
        <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">Proven results</p>
        <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-8">Real Campaign Results</h2>

        {/* Featured: Netflix */}
        {caseStudies.filter(cs => cs.featured).map((cs) => (
          <div key={cs.brand} className="rounded-3xl bg-foreground text-background overflow-hidden mb-6">
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                {cs.logo && (
                  <img src={cs.logo} alt={cs.brand} className="w-10 h-10 rounded-lg object-contain" />
                )}
                <div>
                  <div className="text-xl font-bold text-background">{cs.brand}</div>
                  <div className="text-sm text-background/50">{cs.campaign}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div>
                  <div className="text-3xl font-bold text-background tracking-tight">{cs.views}</div>
                  <div className="text-xs text-background/50">total views</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-background tracking-tight">{cs.cpm}</div>
                  <div className="text-xs text-background/50">CPM</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-background tracking-tight">{cs.budget}</div>
                  <div className="text-xs text-background/50">budget</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary tracking-tight">{cs.over}</div>
                  <div className="text-xs text-background/50">over target</div>
                </div>
              </div>
              <p className="text-base text-background/70 leading-relaxed max-w-2xl mb-4">{cs.result}</p>
              <a href={cs.source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors">
                Source: {cs.source.label} <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}

        {/* Other case studies */}
        <div className="grid md:grid-cols-2 gap-4">
          {caseStudies.filter(cs => !cs.featured).map((cs) => (
            <div key={cs.brand} className="rounded-2xl border border-border/40 bg-card/20 p-6">
              <div className="flex items-center gap-3 mb-5">
                {cs.logo ? (
                  <img src={cs.logo} alt={cs.brand} className="w-8 h-8 rounded-lg object-contain" />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-muted/40 flex items-center justify-center text-xs font-bold text-muted-foreground">
                    {cs.brand.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="text-base font-bold text-foreground">{cs.brand}</div>
                  <div className="text-xs text-muted-foreground">{cs.campaign}</div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 mb-5">
                <div>
                  <div className="text-lg font-bold text-foreground">{cs.views}</div>
                  <div className="text-xs text-muted-foreground">views</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">{cs.cpm}</div>
                  <div className="text-xs text-muted-foreground">CPM</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">{cs.budget}</div>
                  <div className="text-xs text-muted-foreground">budget</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-primary">{cs.over}</div>
                  <div className="text-xs text-muted-foreground">result</div>
                </div>
              </div>
              <p className="text-sm text-foreground/70 leading-relaxed mb-3">{cs.result}</p>
              <a href={cs.source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors">
                Source: {cs.source.label} <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Platform Landscape ─────────────────────────────────────────── */}
      <section id="platforms">
        <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">Where campaigns run</p>
        <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-3">Key Platforms & Agencies</h2>
        <p className="text-base text-muted-foreground mb-10 max-w-2xl">
          The clipping ecosystem has matured rapidly. Eight major platforms now compete for brand budgets — from MrBeast's Vyro to Netflix-trusted Clipping.net. Each has a different model, CPM range, and target market.
        </p>

        <div className="space-y-4">
          {platforms.map((p) => (
            <div key={p.name} className="rounded-2xl border border-border/40 bg-card/20 overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Left: brand identity */}
                <div className="md:w-72 shrink-0 p-6 border-b md:border-b-0 md:border-r border-border/40">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={p.logo}
                      alt={p.name}
                      className="w-10 h-10 rounded-xl object-contain bg-muted/20 p-1"
                    />
                    <div>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-bold text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5 group"
                      >
                        {p.name}
                        <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity" />
                      </a>
                      <p className="text-xs text-muted-foreground">{p.tagline}</p>
                    </div>
                  </div>
                  <span className="inline-block text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                    {p.payout}
                  </span>
                  {p.clients.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {p.clients.map(c => (
                        <span key={c} className="text-xs bg-muted/30 text-muted-foreground px-2 py-0.5 rounded-full">{c}</span>
                      ))}
                    </div>
                  )}
                </div>
                {/* Right: details */}
                <div className="flex-1 p-6">
                  <p className="text-sm text-foreground/80 leading-relaxed mb-4">{p.description}</p>
                  <div className="bg-muted/15 rounded-xl p-4 mb-4">
                    <p className="text-sm text-foreground/90 font-medium">{p.highlight}</p>
                  </div>
                  <ul className="space-y-1.5">
                    {p.facts.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-foreground/60">
                        <span className="w-1 h-1 rounded-full bg-primary/40 shrink-0 mt-1.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. Who's Already Using This ───────────────────────────────────── */}
      <section id="adoption">
        <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">Who's using it</p>
        <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-3">Industry Adoption</h2>
        <p className="text-base text-muted-foreground mb-10 max-w-xl">
          Music and entertainment led the charge. Streamers followed. Now fintech, consumer brands, and podcasts are adopting clipping as a core distribution channel. Regular brands are next.
        </p>
        <div className="space-y-5 max-w-2xl">
          {adoptionData.map((d, i) => {
            const colors = [
              'hsl(var(--primary))',
              '#f97316',
              '#8b5cf6',
              '#06b6d4',
              'hsl(var(--muted-foreground))',
            ];
            return (
              <div key={d.industry}>
                <div className="flex items-center gap-3 mb-2">
                  <d.icon className="w-4 h-4 shrink-0" style={{ color: colors[i] }} />
                  <span className="text-sm font-medium text-foreground">{d.industry}</span>
                  <span className="text-sm font-bold tabular-nums ml-auto" style={{ color: colors[i] }}>{d.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted/30 overflow-hidden mb-1.5">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${d.pct}%`, backgroundColor: colors[i] }}
                  />
                </div>
                <p className="text-xs text-muted-foreground/60 pl-7">{d.example}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 7. Brand Safety ───────────────────────────────────────────────── */}
      <section id="risks">
        <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">Brand safety</p>
        <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-3">The Dark Side — and How to Avoid It</h2>
        <p className="text-base text-muted-foreground mb-8 max-w-xl">
          Clipping isn't all upside. Gambling sites run campaigns using creator clips without consent. Fake endorsements proliferate. Here's the risk landscape — and the playbook for doing it right.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-foreground text-background p-6">
            <div className="flex items-center gap-2 mb-5">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <p className="text-sm font-semibold text-background">The risks</p>
            </div>
            <ul className="space-y-4">
              {[
                { title: 'Unauthorized use', desc: 'Gambling/crypto running campaigns using creator clips without consent. Brands like Stake and Rainbet appear in clips of Kai Cenat and IShowSpeed without permission.' },
                { title: 'False endorsements', desc: 'Original creators find their content promoting products they never agreed to. No consent, no payment, no control.' },
                { title: 'FTC non-compliance', desc: 'Disclosures are widely ignored. One IP lawyer told Digiday that smaller brands face "minimal enforcement risk" because the FTC lacks resources.' },
                { title: 'Bot inflation', desc: 'View-count fraud is a persistent concern. Platforms without bot detection can waste brand budgets on fake impressions.' },
              ].map((item) => (
                <li key={item.title} className="text-sm">
                  <span className="text-background font-medium">{item.title}</span>
                  <p className="text-background/50 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <div className="flex items-center gap-2 mb-5">
              <Shield className="w-4 h-4 text-primary" />
              <p className="text-sm font-semibold text-foreground">How to do it right</p>
            </div>
            <ul className="space-y-4">
              {[
                { title: 'Use consent-based platforms', desc: 'Vyro, Clipping.net, and Whop all require creator opt-in. This protects both the brand and the original content creator.' },
                { title: 'Require FTC disclosures', desc: 'Include disclosure requirements in every campaign brief. Make #ad or #sponsored mandatory in all clip captions.' },
                { title: 'Set content review gates', desc: 'No auto-approval. Clipping.net\'s review-gated model is the gold standard — every clip is checked before going live.' },
                { title: 'Track verified views only', desc: 'All major platforms (Whop, Vyro) have bot detection built in. Avoid platforms that don\'t verify view authenticity.' },
                { title: 'Clear brand guidelines', desc: 'Specify what can and cannot appear in clips. Set explicit do/don\'t lists for brand safety.' },
              ].map((item) => (
                <li key={item.title} className="text-sm">
                  <span className="text-foreground font-medium">{item.title}</span>
                  <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 8. Earner Spotlight ───────────────────────────────────────────── */}
      <section id="earners">
        <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">The clipper perspective</p>
        <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-2">What Clippers Actually Earn</h2>
        <p className="text-base text-muted-foreground mb-8 max-w-xl">
          The ceiling is real — but so is the competition. Most clippers in large open campaigns earn under $3 total. Niche campaigns with fewer participants yield far more consistent returns.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { value: '$60K', period: 'over 7 months', note: 'One active Whop clipper reported to Digiday', source: 'Digiday, 2026', icon: DollarSign },
            { value: '$15–20K', period: 'per month', note: 'Professional clipper ceiling for consistent earners', source: 'Industry est.', icon: TrendingUp },
            { value: '5 figures', period: 'monthly', note: 'Clipping Culture operator, under 18 years old', source: 'Variety, 2026', icon: Users },
          ].map((e) => (
            <div key={e.value} className="rounded-2xl border border-border/40 bg-card/20 p-6">
              <e.icon className="w-4 h-4 text-primary mb-3" />
              <div className="text-3xl font-bold text-foreground tracking-tight mb-1">{e.value}</div>
              <div className="text-sm text-muted-foreground">{e.period}</div>
              <div className="mt-4 pt-4 border-t border-border/30">
                <p className="text-sm text-foreground/70">{e.note}</p>
                <p className="text-xs text-muted-foreground/60 mt-1">{e.source}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-xl bg-muted/15 p-5 max-w-2xl">
          <p className="text-sm text-foreground/70 leading-relaxed">
            <strong className="text-foreground">Reality check:</strong> Most participants in open campaigns earn very little. The economics favor early movers and dedicated clippers who build distribution networks. Think of it like ride-share — a few full-time drivers earn well, most casual participants make pocket money.
          </p>
        </div>
      </section>

      {/* ── 9. FTC / Legal ────────────────────────────────────────────────── */}
      <section id="regulation">
        <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">Legal context</p>
        <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-4">The Regulatory Gray Area</h2>
        <div className="rounded-2xl border border-border/40 bg-card/20 p-6 md:p-8 max-w-2xl">
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The FTC requires disclosure for all paid social media posts — clipping campaigns are no exception. But enforcement has been minimal. One IP lawyer told Digiday that smaller brands face "minimal enforcement risk" because the FTC lacks resources to monitor at scale.
          </p>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            That won't last. X (formerly Twitter) Product Head Nikita Bier has already publicly flagged suspected clipping activity, stating "the brand is likely paying a clipping agency to take over Timeline for a day." Platforms are becoming aware.
          </p>
          <p className="text-base text-foreground/80 leading-relaxed">
            Brands running consent-based campaigns with clear disclosure requirements will be both the most legally sound and the most trusted by audiences. The compliance moat is real.
          </p>
          <div className="flex flex-wrap gap-3 mt-6 pt-5 border-t border-border/30">
            {[
              { label: 'Digiday', url: 'https://digiday.com/media/wtf-is-clipping-the-low-lift-creator-strategy-grabbing-advertisers-attention/' },
              { label: 'Gupta Media', url: 'https://thread.guptamedia.com/p/clipping-creator-economy-newest-hit-job' },
              { label: 'Forbes', url: 'https://www.forbes.com/sites/boazsobrado/2026/02/11/inside-the-clipping-farms-driving-fintechs-marketing-boom/' },
            ].map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors border border-primary/20 rounded-full px-3 py-1"
              >
                {s.label} <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. The Full Loop ─────────────────────────────────────────────── */}
      <section id="live-streaming">
        <div className="rounded-3xl bg-foreground text-background overflow-hidden">
          <div className="px-8 pt-10 pb-6 border-b border-background/10">
            <p className="text-xs font-semibold tracking-widest uppercase text-background/40 mb-1">The full picture</p>
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-background">Live Streaming + Clipping = Full Funnel</h2>
            <p className="text-background/50 text-sm mt-2 max-w-lg">
              Live streaming creates the authentic moment. Clipping multiplies the reach. Together, they deliver what paid social can't — genuine organic distribution at scale.
            </p>
          </div>
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-background/10">
            {[
              { step: '01', title: 'Brand Goes Live', desc: 'Native overlay ad runs on Twitch, YouTube, or Kick. Reaches Gen Z audiences that skip every other ad format. 39,000+ Nordic streamers on Beta Ads.' },
              { step: '02', title: 'AI Finds the Moment', desc: 'Beta Ads AI clipping detects peak engagement in real time — chat velocity spikes, reaction bursts, voice recognition confirming the brand mention landed.' },
              { step: '03', title: 'Clippers Distribute It', desc: 'The highest-performing clip hits TikTok, Reels, and Shorts through a paid clipper network. One live moment becomes indefinite organic reach.' },
            ].map((s) => (
              <div key={s.step} className="px-8 py-8">
                <div className="text-5xl font-bold text-background/10 mb-4 tracking-tighter">{s.step}</div>
                <h3 className="text-base font-semibold text-background mb-2">{s.title}</h3>
                <p className="text-sm text-background/55 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sources ───────────────────────────────────────────────────────── */}
      <div className="pt-8 border-t border-border/30">
        <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-widest mb-4">Sources & Further Reading</p>
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-2">
          {[
            { label: 'Variety — "How Clipping Took Over the Music Biz"', url: 'https://variety.com/2026/music/news/clipping-marketing-tool-took-over-music-industry-1236699705/' },
            { label: 'Forbes — "Inside The Clipping Farms" (Feb 2026)', url: 'https://www.forbes.com/sites/boazsobrado/2026/02/11/inside-the-clipping-farms-driving-fintechs-marketing-boom/' },
            { label: 'Digiday — "WTF is clipping?"', url: 'https://digiday.com/media/wtf-is-clipping-the-low-lift-creator-strategy-grabbing-advertisers-attention/' },
            { label: 'Business Insider — "Clipping Creators Have Arrived"', url: 'https://www.businessinsider.com/clipping-creators-arrived-discord-money-earning-big-2026-3' },
            { label: 'Influencer Marketing Hub — MrBeast Launches Vyro', url: 'https://influencermarketinghub.com/mrbeast-launches-vyro/' },
            { label: 'Whop Blog — What Is Content Clipping?', url: 'https://whop.com/blog/what-is-content-clipping/' },
            { label: 'Gupta Media — Clipping: Creator Economy\'s Newest Hit Job', url: 'https://thread.guptamedia.com/p/clipping-creator-economy-newest-hit-job' },
            { label: 'OpusClip — 10M Views in 1 Month', url: 'https://www.opus.pro/how-creators-are-earning-10m-views-in-1-month' },
            { label: 'Marketing Agent — Why Clipping Is Exploding in 2026', url: 'https://marketingagent.blog/2026/01/02/what-is-clipping-and-why-its-exploding-in-2026/' },
            { label: 'Yahoo Finance — Clipping Agency Launches', url: 'https://finance.yahoo.com/news/clipping-agency-launches-scalable-clipping-001100690.html' },
          ].map((s) => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors py-1 group"
            >
              <ExternalLink className="w-3 h-3 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
              {s.label}
            </a>
          ))}
        </div>
        <p className="text-xs text-muted-foreground/40 mt-4">CPM benchmarks: Meta Ads Manager 2026, Google Ads industry averages · Campaign data: Clipping.net, Whop, Vyro, Forbes, Variety</p>
      </div>

    </div>
  );
}
