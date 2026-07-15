import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// ============================================================
// RADIOLOGY CONTRIBUTION SIMULATOR (2-D: volume x price)
// Generic, anonymized network anchors. Per-scan story reconciles
// to the article: $305 rev / $116 variable floor / $253 fully-loaded
// / $137 fixed per scan / $52 margin (17%). 3-D (cash timing / DSO)
// is the promised next build -> waitlist capture below.
// ============================================================

const V0 = 100000;            // baseline annual scans
const P0 = 305;               // revenue per scan
const VARIABLE = 116;         // variable cost per scan (reads + techs + supplies) = the keep/kill floor
const FIXED = 13700000;       // fixed cost pool ($137 / scan at baseline volume)

const NAVY = '#1B365D';
const ORANGE = '#F97316';
const GREEN = '#10B981';
const RED = '#EF4444';
const GRID = '#E5E7EB';

function money(v) {
  const abs = Math.abs(v);
  const sign = v < 0 ? '-' : '';
  if (abs >= 1000000) return sign + '$' + (abs / 1000000).toFixed(2) + 'M';
  if (abs >= 1000) return sign + '$' + (abs / 1000).toFixed(0) + 'K';
  return sign + '$' + Math.round(abs).toLocaleString();
}
const perScan = (v) => (v < 0 ? '-' : '') + '$' + Math.abs(Math.round(v));
const pct = (v) => (v * 100).toFixed(1) + '%';

function calculate(volPct, pricePct) {
  const volume = Math.round(V0 * volPct);
  const price = P0 * pricePct;

  const revenue = volume * price;
  const variableTotal = volume * VARIABLE;
  const contributionTotal = revenue - variableTotal;
  const operatingProfit = contributionTotal - FIXED;

  const contribPerScan = price - VARIABLE;
  const fixedPerScan = volume > 0 ? FIXED / volume : Infinity;
  const flPerScan = VARIABLE + fixedPerScan;
  const marginPerScan = price - flPerScan;
  const marginPct = revenue > 0 ? operatingProfit / revenue : 0;

  const beVolume = contribPerScan > 0 ? Math.round(FIXED / contribPerScan) : Infinity;

  return {
    volume, price, revenue, variableTotal, contributionTotal, operatingProfit,
    contribPerScan, fixedPerScan, flPerScan, marginPerScan, marginPct, beVolume,
  };
}

// ---- chart geometry ----
const CW = 680, CH = 320, PAD_L = 52, PAD_R = 20, PAD_T = 20, PAD_B = 40;
const VOL_MIN = 0.60, VOL_MAX = 1.20;   // x: % of baseline volume
const Y_MIN = 80, Y_MAX = 420;          // y: $ per scan

const xOf = (volPct) => PAD_L + ((volPct - VOL_MIN) / (VOL_MAX - VOL_MIN)) * (CW - PAD_L - PAD_R);
const yOf = (dollars) => PAD_T + (1 - (dollars - Y_MIN) / (Y_MAX - Y_MIN)) * (CH - PAD_T - PAD_B);

function costCurvePath() {
  const pts = [];
  for (let v = VOL_MIN; v <= VOL_MAX + 0.0001; v += 0.02) {
    const fl = VARIABLE + FIXED / (V0 * v);
    pts.push(`${xOf(v).toFixed(1)},${yOf(fl).toFixed(1)}`);
  }
  return 'M' + pts.join(' L');
}

const RELATED_ARTICLES = [
  { slug: 'radiology-cost-per-scan-1d-2d-3d', title: 'The Radiology P&L Lies to You (1-D / 2-D / 3-D)' },
  { slug: 'radiology-collections-dashboard-case-study', title: 'Real-Time Collections Intelligence for a Radiology Group' },
  { slug: 'fixed-cost-breakeven-volume-problem', title: 'The Fixed-Cost Break-Even Problem' },
  { slug: 'cash-flow-waterfall-why-profit-doesnt-equal-cash', title: 'Why Profit Doesn\'t Equal Cash' },
];

function WaitlistCapture() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append('email', email);
      fd.append('role', role);
      fd.append('form_name', 'radiology-3d-waitlist');
      fd.append('_subject', '3-D Radiology Simulator waitlist signup');
      const resp = await fetch('https://formspree.io/f/mzdjjprp', {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' },
      });
      if (!resp.ok) throw new Error('Formspree ' + resp.status);
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'generate_lead', { event_category: 'radiology-3d-waitlist' });
      }
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please email hello@benefique.com and we'll add you.");
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white/10 rounded-lg p-6 text-center">
        <div className="text-3xl mb-2">✓</div>
        <p className="text-white font-semibold">You're on the list.</p>
        <p className="text-blue-100 text-sm mt-1">
          We'll email you the moment the third dimension — payer cash timing — goes live in the simulator.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@yourpractice.com"
          className="flex-1 px-4 py-3 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="px-4 py-3 rounded-lg text-gray-700 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
          aria-label="Your role"
        >
          <option value="">I am a…</option>
          <option value="owner-operator">Owner / operator</option>
          <option value="pe-investor">PE / investor</option>
          <option value="cfo-finance">CFO / finance</option>
          <option value="advisor-other">Advisor / other</option>
        </select>
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3 rounded-lg font-semibold text-white transition-colors disabled:opacity-60"
          style={{ background: ORANGE }}
        >
          {submitting ? 'Adding…' : 'Notify me'}
        </button>
      </div>
      {error && <p className="text-orange-200 text-xs mt-2">{error}</p>}
      <p className="text-blue-200 text-xs mt-2">
        No spam. One email when the 3-D (cash-timing) version ships. Unsubscribe anytime.
      </p>
    </form>
  );
}

export default function RadiologySimulator() {
  const [volPct, setVolPct] = useState(1.0);
  const [pricePct, setPricePct] = useState(1.0);
  const [viewMode, setViewMode] = useState('perScan');

  const calc = useMemo(() => calculate(volPct, pricePct), [volPct, pricePct]);
  const base = useMemo(() => calculate(1.0, 1.0), []);

  const youX = xOf(Math.min(VOL_MAX, Math.max(VOL_MIN, volPct)));
  const youCostY = yOf(Math.min(Y_MAX, Math.max(Y_MIN, calc.flPerScan)));
  const priceY = yOf(Math.min(Y_MAX, Math.max(Y_MIN, calc.price)));
  const beX = calc.beVolume !== Infinity ? xOf(Math.min(VOL_MAX, Math.max(VOL_MIN, calc.beVolume / V0))) : null;

  const profitPositive = calc.operatingProfit >= 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Helmet>
        <title>Radiology Profit Simulator | Benefique Tax & Accounting</title>
        <meta name="description" content="Interactive contribution-margin simulator for outpatient imaging centers. Slide volume and price to see why cutting 'below-cost' scans can halve your profit — and what the real keep-or-cut floor is." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.benefique.com/tools/radiology-profit-simulator" />
        <meta property="og:title" content="Radiology Profit Simulator — Contribution Margin, Live" />
        <meta property="og:description" content="Drag volume and price and watch fixed cost per scan, contribution, and operating profit recompute in real time." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.benefique.com/tools/radiology-profit-simulator" />
      </Helmet>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-4 pt-12 pb-6 text-center">
        <Link to="/" className="text-sm text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Benefique</Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: NAVY }}>
          The Radiology Profit Simulator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Most imaging operators read a scan in one dimension: its average cost. Slide volume and price
          and watch the second dimension appear — where every keep-or-cut decision actually lives.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-16">

        {/* ==================== CONTROLS ==================== */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">

          {/* Volume slider */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700">Scan Volume</label>
              <span className="text-2xl font-bold" style={{ color: NAVY }}>
                {calc.volume.toLocaleString()} <span className="text-sm text-gray-400 font-medium">scans/yr ({Math.round(volPct * 100)}%)</span>
              </span>
            </div>
            <input
              type="range" min="60" max="120" step="1"
              value={Math.round(volPct * 100)}
              onChange={(e) => setVolPct(Number(e.target.value) / 100)}
              className="w-full h-3 rounded-lg appearance-none cursor-pointer"
              style={{ background: `linear-gradient(to right, ${NAVY} ${((volPct * 100 - 60) / 60) * 100}%, ${GRID} ${((volPct * 100 - 60) / 60) * 100}%)` }}
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>60%</span><span>baseline 100%</span><span>120%</span>
            </div>
          </div>

          {/* Price slider */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700">Revenue per Scan (payer mix &amp; rates)</label>
              <span className="text-2xl font-bold" style={{ color: NAVY }}>
                ${Math.round(calc.price)} <span className="text-sm text-gray-400 font-medium">/scan ({Math.round(pricePct * 100)}%)</span>
              </span>
            </div>
            <input
              type="range" min="85" max="115" step="1"
              value={Math.round(pricePct * 100)}
              onChange={(e) => setPricePct(Number(e.target.value) / 100)}
              className="w-full h-3 rounded-lg appearance-none cursor-pointer"
              style={{ background: `linear-gradient(to right, ${ORANGE} ${((pricePct * 100 - 85) / 30) * 100}%, ${GRID} ${((pricePct * 100 - 85) / 30) * 100}%)` }}
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>-15%</span><span>as-is</span><span>+15%</span>
            </div>
          </div>

          {/* Scenario buttons + view toggle */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => { setVolPct(0.85); setPricePct(1.0); }}
              className="px-3 py-1.5 rounded-md text-sm font-medium bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
            >
              Try: cut 15% of "below-cost" volume
            </button>
            <button
              onClick={() => { setVolPct(1.0); setPricePct(1.05); }}
              className="px-3 py-1.5 rounded-md text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
            >
              Try: +5% better payer mix
            </button>
            <button
              onClick={() => { setVolPct(1.0); setPricePct(1.0); }}
              className="px-3 py-1.5 rounded-md text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              Reset
            </button>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700">View:</span>
              {[
                { key: 'perScan', label: '$ / Scan' },
                { key: 'absolute', label: 'Absolute $' },
                { key: 'ratio', label: '% of Revenue' },
              ].map(v => (
                <button
                  key={v.key}
                  onClick={() => setViewMode(v.key)}
                  className="px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                  style={viewMode === v.key ? { background: NAVY, color: '#fff' } : { background: '#F3F4F6', color: '#4B5563' }}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ==================== RESULT TILES ==================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Tile label="Revenue / scan" value={viewMode === 'perScan' ? perScan(calc.price) : viewMode === 'ratio' ? '100%' : money(calc.revenue)} sub={viewMode === 'perScan' ? 'what a scan collects' : 'top line'} color={NAVY} />
          <Tile label="Variable floor / scan" value={viewMode === 'perScan' ? perScan(VARIABLE) : viewMode === 'ratio' ? pct(calc.variableTotal / calc.revenue) : money(calc.variableTotal)} sub="reads · techs · supplies" color={ORANGE} highlight />
          <Tile label="Fixed cost / scan" value={viewMode === 'perScan' ? perScan(calc.fixedPerScan) : viewMode === 'ratio' ? pct(FIXED / calc.revenue) : money(FIXED)} sub="paid regardless of volume" color="#6B7280" />
          <Tile
            label="Operating profit"
            value={viewMode === 'perScan' ? perScan(calc.marginPerScan) : viewMode === 'ratio' ? pct(calc.marginPct) : money(calc.operatingProfit)}
            sub={viewMode === 'perScan' ? 'margin / scan' : 'after every cost'}
            color={profitPositive ? GREEN : RED}
          />
        </div>

        {/* keep/kill callout */}
        <div className="rounded-xl border-2 p-5 mb-6" style={{ borderColor: ORANGE, background: '#FFF7ED' }}>
          <p className="text-sm text-gray-800">
            <strong style={{ color: NAVY }}>The keep-or-cut floor is ${VARIABLE}, not ${Math.round(base.flPerScan)}.</strong>{' '}
            A scan collecting <strong>$150</strong> looks "below the ${Math.round(base.flPerScan)} average cost" — but it still hands you{' '}
            <strong style={{ color: GREEN }}>${150 - VARIABLE}</strong> toward fixed costs you pay whether the magnet runs or not.
            Cut it, and that ${150 - VARIABLE} doesn't vanish — the fixed cost it carried reloads onto every scan that's left,
            making <em>those</em> look more expensive too.
          </p>
        </div>

        {/* ==================== THE TRAP CHART ==================== */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <h2 className="text-lg font-bold mb-1 text-center" style={{ color: NAVY }}>The Trap: cost per scan vs. volume</h2>
          <p className="text-xs text-gray-500 text-center mb-3">
            Fixed cost per scan <strong>rises as volume falls</strong>. Drop volume and the whole cost line climbs — even though nothing got more expensive to produce.
          </p>
          <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full h-auto" role="img" aria-label="Cost per scan versus volume">
            {/* y gridlines */}
            {[100, 200, 300, 400].map(g => (
              <g key={g}>
                <line x1={PAD_L} y1={yOf(g)} x2={CW - PAD_R} y2={yOf(g)} stroke={GRID} strokeWidth="1" />
                <text x={PAD_L - 8} y={yOf(g) + 4} textAnchor="end" fontSize="11" fill="#9CA3AF">${g}</text>
              </g>
            ))}
            {/* x labels */}
            {[0.6, 0.8, 1.0, 1.2].map(v => (
              <text key={v} x={xOf(v)} y={CH - PAD_B + 20} textAnchor="middle" fontSize="11" fill="#9CA3AF">{Math.round(v * 100)}%</text>
            ))}
            {/* variable floor line */}
            <line x1={PAD_L} y1={yOf(VARIABLE)} x2={CW - PAD_R} y2={yOf(VARIABLE)} stroke={ORANGE} strokeWidth="1.5" strokeDasharray="5 4" />
            <text x={CW - PAD_R} y={yOf(VARIABLE) - 6} textAnchor="end" fontSize="11" fill={ORANGE} fontWeight="600">Variable floor ${VARIABLE}</text>
            {/* fully-loaded cost curve */}
            <path d={costCurvePath()} fill="none" stroke={NAVY} strokeWidth="2.5" />
            <text x={xOf(0.63)} y={yOf(VARIABLE + FIXED / (V0 * 0.63)) - 8} fontSize="11" fill={NAVY} fontWeight="600">Fully-loaded cost</text>
            {/* current price line */}
            <line x1={PAD_L} y1={priceY} x2={CW - PAD_R} y2={priceY} stroke={GREEN} strokeWidth="2" />
            <text x={PAD_L + 4} y={priceY - 6} fontSize="11" fill={GREEN} fontWeight="600">Revenue ${Math.round(calc.price)}/scan</text>
            {/* break-even marker */}
            {beX && (
              <g>
                <line x1={beX} y1={PAD_T} x2={beX} y2={CH - PAD_B} stroke="#9CA3AF" strokeWidth="1" strokeDasharray="3 3" />
                <text x={beX} y={PAD_T + 4} textAnchor="middle" fontSize="10" fill="#6B7280">break-even</text>
              </g>
            )}
            {/* you are here */}
            <circle cx={youX} cy={youCostY} r="6" fill={NAVY} stroke="#fff" strokeWidth="2" />
            <rect x={youX - 46} y={youCostY - 40} width="92" height="26" rx="4" fill={profitPositive ? GREEN : RED} />
            <text x={youX} y={youCostY - 22} textAnchor="middle" fontSize="12" fill="#fff" fontWeight="700">
              {calc.marginPerScan >= 0 ? '+' : ''}{perScan(calc.marginPerScan)}/scan
            </text>
          </svg>
          <p className="text-center text-sm text-gray-600 mt-3">
            At <strong>{Math.round(volPct * 100)}%</strong> volume and <strong>${Math.round(calc.price)}</strong>/scan, operating profit is{' '}
            <strong style={{ color: profitPositive ? GREEN : RED }}>{money(calc.operatingProfit)}</strong>
            {' '}({perScan(calc.marginPerScan)}/scan). Baseline is {money(base.operatingProfit)}.
          </p>
        </div>

        {/* ==================== 3-D WAITLIST (LEAD MAGNET) ==================== */}
        <div className="rounded-xl p-8 mb-8 text-center" style={{ background: NAVY }}>
          <div className="inline-flex items-center gap-2 bg-white/10 text-orange-300 px-3 py-1 rounded-full text-xs font-semibold mb-3">
            COMING NEXT · THE THIRD DIMENSION
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Add the dimension that decides whether profit becomes cash</h2>
          <p className="text-blue-100 mb-5 max-w-2xl mx-auto text-sm">
            This tool works in two dimensions — volume and price. The next version adds the third:
            <strong className="text-white"> payer cash timing</strong>. A high-margin scan that collects in 400 days behind a
            lien is not the same asset as a thinner one that pays in 30. Be first to see it.
          </p>
          <WaitlistCapture />
        </div>

        {/* ==================== CTA ==================== */}
        <div className="rounded-xl p-8 text-center text-white mb-8" style={{ background: NAVY }}>
          <h2 className="text-2xl font-bold mb-3">Want this on your actual numbers?</h2>
          <p className="text-blue-100 mb-5 max-w-xl mx-auto">
            This simulator uses generic industry anchors. A Benefique engagement rebuilds it on your books — real cost per
            scan by center, the true variable floor by payer, reconciled to your general ledger to the dollar.
          </p>
          <Link to="/contact" className="inline-block bg-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors" style={{ color: NAVY }}>
            Schedule a Consultation
          </Link>
          <p className="text-blue-200 text-xs mt-4">
            See how accounting becomes an <Link to="/about" className="underline hover:text-white">ROI center</Link>.
          </p>
        </div>

        {/* ==================== RELATED ARTICLES ==================== */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4" style={{ color: NAVY }}>Related Reading</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {RELATED_ARTICLES.map(a => (
              <Link
                key={a.slug}
                to={`/blog/${a.slug}`}
                className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-sm transition-all text-sm text-gray-700"
                style={{ borderColor: GRID }}
              >
                {a.title}
              </Link>
            ))}
          </div>
        </div>

        {/* ==================== FOOTER NOTE ==================== */}
        <p className="text-xs text-gray-400 text-center">
          This tool is for educational purposes only and uses generic, anonymized industry anchors — not any single practice's data.
          It does not constitute financial or tax advice. &copy; {new Date().getFullYear()} Benefique Tax &amp; Accounting, Davie, FL.
        </p>
      </div>
    </div>
  );
}

function Tile({ label, value, sub, color, highlight }) {
  return (
    <div className={`bg-white rounded-lg border p-4 ${highlight ? 'ring-2' : ''}`} style={highlight ? { borderColor: color, boxShadow: `0 0 0 1px ${color}` } : { borderColor: GRID }}>
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-2xl font-bold" style={{ color }}>{value}</div>
      <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
    </div>
  );
}
