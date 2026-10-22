import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// ============================================================
// RADIOLOGY PROFIT SIMULATOR (3-D: volume x price x cash timing)
// Generic, anonymized anchors: $350 rev / $132 variable floor /
// $155 fixed per scan at 100K scans / $63 margin (18%). P&L reads left to right:
// revenue / scan -> variable floor / scan -> contribution / scan
// -> fixed cost / scan -> operating profit. The third dimension
// (DSO) moves the revenue side of cash only: cash collected in
// year 1 = revenue + opening AR - closing AR. Costs are assumed
// paid as incurred.
// ============================================================

const V0 = 100000;            // baseline annual scans
const P0 = 350;               // baseline revenue per scan
const VAR0 = 132;             // baseline variable cost per scan (reads + techs + supplies) = the keep/kill floor
const FIXPS0 = 155;           // baseline fixed cost per scan at V0 volume (fixed pool = FIXPS0 x V0)
const DSO0 = 45;              // baseline days sales outstanding

const VOL_MIN = 40000, VOL_MAX = 200000;

const NAVY = '#1B365D';
const ORANGE = '#F97316';
const TEAL = '#0D9488';
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

function calculate({ volume, price, variable, fixedPerScanBase, dso }) {
  const fixed = fixedPerScanBase * V0;

  const revenue = volume * price;
  const variableTotal = volume * variable;
  const contributionTotal = revenue - variableTotal;
  const operatingProfit = contributionTotal - fixed;

  const contribPerScan = price - variable;
  const fixedPerScan = volume > 0 ? fixed / volume : Infinity;
  const flPerScan = variable + fixedPerScan;
  const marginPerScan = price - flPerScan;
  const marginPct = revenue > 0 ? operatingProfit / revenue : 0;

  const beVolume = contribPerScan > 0 ? Math.round(fixed / contribPerScan) : Infinity;

  // ---- cash timing (revenue side only) ----
  const dailyRevenue = revenue / 365;
  const openingAR = (V0 * P0 / 365) * DSO0;     // today's book: baseline revenue at baseline DSO
  const closingAR = dailyRevenue * dso;
  const arChange = closingAR - openingAR;         // + = cash absorbed into receivables
  const cashCollected = revenue - arChange;
  const cashProfit = operatingProfit - arChange;

  return {
    volume, price, variable, fixed, revenue, variableTotal, contributionTotal, operatingProfit,
    contribPerScan, fixedPerScan, flPerScan, marginPerScan, marginPct, beVolume,
    dso, dailyRevenue, openingAR, closingAR, arChange, cashCollected, cashProfit,
  };
}

// ---- chart geometry ----
const CW = 680, CH = 320, PAD_L = 52, PAD_R = 20, PAD_T = 20, PAD_B = 40;

const xOf = (vol) => PAD_L + ((vol - VOL_MIN) / (VOL_MAX - VOL_MIN)) * (CW - PAD_L - PAD_R);

function yScale(c) {
  const top = Math.max(c.price, c.variable + c.fixed / VOL_MIN) * 1.12;
  const step = top <= 500 ? 100 : top <= 1200 ? 200 : 400;
  const yMax = Math.ceil(top / step) * step;
  const yOf = (dollars) => PAD_T + (1 - Math.min(yMax, Math.max(0, dollars)) / yMax) * (CH - PAD_T - PAD_B);
  const ticks = [];
  for (let g = step; g <= yMax; g += step) ticks.push(g);
  return { yOf, ticks };
}

function costCurvePath(c, yOf) {
  const pts = [];
  for (let v = VOL_MIN; v <= VOL_MAX; v += 2000) {
    pts.push(`${xOf(v).toFixed(1)},${yOf(c.variable + c.fixed / v).toFixed(1)}`);
  }
  return 'M' + pts.join(' L');
}

const RELATED_ARTICLES = [
  { slug: 'radiology-cost-per-scan-1d-2d-3d', title: 'The Radiology P&L Lies to You (1-D / 2-D / 3-D)' },
  { slug: 'radiology-collections-dashboard-case-study', title: 'Real-Time Collections Intelligence for a Radiology Group' },
  { slug: 'fixed-cost-breakeven-volume-problem', title: 'The Fixed-Cost Break-Even Problem' },
  { slug: 'cash-flow-waterfall-why-profit-doesnt-equal-cash', title: 'Why Profit Doesn\'t Equal Cash' },
];

const BASE_LEVERS = { volume: V0, price: P0, variable: VAR0, fixedPerScanBase: FIXPS0, dso: DSO0 };

export default function RadiologySimulator() {
  const [levers, setLevers] = useState(BASE_LEVERS);
  const [viewMode, setViewMode] = useState('perScan');

  const set = (key) => (value) => setLevers((l) => ({ ...l, [key]: value }));
  const calc = useMemo(() => calculate(levers), [levers]);
  const base = useMemo(() => calculate(BASE_LEVERS), []);

  const { yOf, ticks } = yScale(calc);
  const youX = xOf(calc.volume);
  const youCostY = yOf(calc.flPerScan);
  const priceY = yOf(calc.price);
  const beX = calc.beVolume !== Infinity && calc.beVolume >= VOL_MIN && calc.beVolume <= VOL_MAX ? xOf(calc.beVolume) : null;

  const profitPositive = calc.operatingProfit >= 0;
  const fullyLoadedAtBase = levers.variable + levers.fixedPerScanBase;
  const exampleScan = Math.round((levers.variable + fullyLoadedAtBase) / 2 / 10) * 10;
  const arUnchanged = Math.abs(calc.arChange) < 500;
  const arAbsorbs = !arUnchanged && calc.arChange > 0;

  const view = (perScanV, absV, ratioV) => (viewMode === 'perScan' ? perScanV : viewMode === 'ratio' ? ratioV : absV);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Helmet>
        <title>Radiology Profit Simulator | Benefique Tax & Accounting</title>
        <meta name="description" content="Interactive contribution-margin and cash-timing simulator for outpatient imaging centers. Move volume, price, variable and fixed cost per scan, and DSO to see what drives profit — and whether it turns into cash." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.benefique.com/tools/radiology-profit-simulator" />
        <meta property="og:title" content="Radiology Profit Simulator — Contribution Margin & Cash Timing, Live" />
        <meta property="og:description" content="Drag volume, price, cost per scan and DSO and watch contribution, operating profit and cash collected recompute in real time." />
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
          Most imaging operators read a scan in one dimension: its average cost. Move volume and price to see the
          second dimension, contribution, where keep-or-cut decisions are made. Then move DSO to see the third:
          whether that profit turns into cash.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-16">

        {/* ==================== P&L CONTROLS ==================== */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-x-8">
            <Slider
              label="Scan Volume"
              display={<>{calc.volume.toLocaleString()} <Unit>scans/yr</Unit></>}
              min={VOL_MIN} max={VOL_MAX} step={1000} value={levers.volume} onChange={set('volume')} color={NAVY}
              ticks={['40K', '200K']} baseline={V0} baselineLabel="baseline 100K"
            />
            <Slider
              label="Revenue per Scan (payer mix & rates)"
              display={<>${calc.price} <Unit>/scan</Unit></>}
              min={250} max={1200} step={5} value={levers.price} onChange={set('price')} color={NAVY}
              ticks={['$250', '$1,200']} baseline={P0} baselineLabel={`baseline $${P0}`}
            />
            <Slider
              label="Variable Floor per Scan (reads · techs · supplies)"
              display={<>${levers.variable} <Unit>/scan</Unit></>}
              min={25} max={600} step={1} value={levers.variable} onChange={set('variable')} color={ORANGE}
              ticks={['$25', '$600']} baseline={VAR0} baselineLabel={`baseline $${VAR0}`}
            />
            <Slider
              label="Fixed Cost per Scan (at 100K baseline volume)"
              display={<>${levers.fixedPerScanBase} <Unit>/scan · {money(calc.fixed)}/yr</Unit></>}
              min={25} max={600} step={1} value={levers.fixedPerScanBase} onChange={set('fixedPerScanBase')} color="#6B7280"
              ticks={['$25', '$600']} baseline={FIXPS0} baselineLabel={`baseline $${FIXPS0}`}
            />
          </div>

          {/* Scenario buttons + view toggle */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setLevers({ ...BASE_LEVERS, volume: 85000 })}
              className="px-3 py-1.5 rounded-md text-sm font-medium bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
            >
              Try: cut 15% of "below-cost" volume
            </button>
            <button
              onClick={() => setLevers({ ...BASE_LEVERS, price: Math.round(P0 * 1.05 / 5) * 5 })}
              className="px-3 py-1.5 rounded-md text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
            >
              Try: +5% better payer mix
            </button>
            <button
              onClick={() => setLevers(BASE_LEVERS)}
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

        {/* ==================== P&L TILES ==================== */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <Tile label="Revenue / scan" value={view(perScan(calc.price), money(calc.revenue), '100%')} sub={viewMode === 'perScan' ? 'what a scan collects' : 'top line'} color={NAVY} />
          <Tile label="Variable floor / scan" value={view(perScan(calc.variable), money(calc.variableTotal), pct(calc.variableTotal / calc.revenue))} sub="reads · techs · supplies" color={ORANGE} highlight />
          <Tile label="Contribution / scan" value={view(perScan(calc.contribPerScan), money(calc.contributionTotal), pct(calc.contributionTotal / calc.revenue))} sub="revenue − variable" color={TEAL} highlight />
          <Tile label="Fixed cost / scan" value={view(perScan(calc.fixedPerScan), money(calc.fixed), pct(calc.fixed / calc.revenue))} sub="paid regardless of volume" color="#6B7280" />
          <div className="col-span-2 md:col-span-1">
            <Tile
              label="Operating profit"
              value={view(perScan(calc.marginPerScan), money(calc.operatingProfit), pct(calc.marginPct))}
              sub={viewMode === 'perScan' ? 'margin / scan' : 'after every cost'}
              color={profitPositive ? GREEN : RED}
            />
          </div>
        </div>

        {/* keep/kill callout */}
        <div className="rounded-xl border-2 p-5 mb-6" style={{ borderColor: ORANGE, background: '#FFF7ED' }}>
          <p className="text-sm text-gray-800">
            <strong style={{ color: NAVY }}>The keep-or-cut floor is ${levers.variable}, not ${fullyLoadedAtBase}.</strong>{' '}
            A scan collecting <strong>${exampleScan}</strong> looks "below the ${fullyLoadedAtBase} average cost", but it still hands you{' '}
            <strong style={{ color: GREEN }}>${exampleScan - levers.variable}</strong> toward fixed costs you pay whether the magnet runs or not.
            Cut it, and that ${exampleScan - levers.variable} doesn't vanish. The fixed cost it carried reloads onto every scan that's left,
            making <em>those</em> look more expensive too.
          </p>
        </div>

        {/* ==================== THE TRAP CHART ==================== */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <h2 className="text-lg font-bold mb-1 text-center" style={{ color: NAVY }}>The Trap: cost per scan vs. volume</h2>
          <p className="text-xs text-gray-500 text-center mb-3">
            Fixed cost per scan <strong>rises as volume falls</strong>. Drop volume and the whole cost line climbs, even though nothing got more expensive to produce.
          </p>
          <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full h-auto" role="img" aria-label="Cost per scan versus volume">
            {/* y gridlines */}
            {ticks.map(g => (
              <g key={g}>
                <line x1={PAD_L} y1={yOf(g)} x2={CW - PAD_R} y2={yOf(g)} stroke={GRID} strokeWidth="1" />
                <text x={PAD_L - 8} y={yOf(g) + 4} textAnchor="end" fontSize="11" fill="#9CA3AF">${g.toLocaleString()}</text>
              </g>
            ))}
            {/* x labels */}
            {[40000, 80000, 120000, 160000, 200000].map(v => (
              <text key={v} x={xOf(v)} y={CH - PAD_B + 20} textAnchor="middle" fontSize="11" fill="#9CA3AF">{v / 1000}K</text>
            ))}
            {/* variable floor line */}
            <line x1={PAD_L} y1={yOf(calc.variable)} x2={CW - PAD_R} y2={yOf(calc.variable)} stroke={ORANGE} strokeWidth="1.5" strokeDasharray="5 4" />
            <text x={CW - PAD_R} y={yOf(calc.variable) - 6} textAnchor="end" fontSize="11" fill={ORANGE} fontWeight="600">Variable floor ${calc.variable}</text>
            {/* fully-loaded cost curve */}
            <path d={costCurvePath(calc, yOf)} fill="none" stroke={NAVY} strokeWidth="2.5" />
            <text x={xOf(46000)} y={yOf(calc.variable + calc.fixed / 46000) - 8} fontSize="11" fill={NAVY} fontWeight="600">Fully-loaded cost</text>
            {/* current price line */}
            <line x1={PAD_L} y1={priceY} x2={CW - PAD_R} y2={priceY} stroke={GREEN} strokeWidth="2" />
            <text x={CW - PAD_R} y={priceY - 6} textAnchor="end" fontSize="11" fill={GREEN} fontWeight="600">Revenue ${calc.price}/scan</text>
            {/* break-even marker */}
            {beX && (
              <g>
                <line x1={beX} y1={PAD_T} x2={beX} y2={CH - PAD_B} stroke="#9CA3AF" strokeWidth="1" strokeDasharray="3 3" />
                <text x={beX} y={PAD_T + 4} textAnchor="middle" fontSize="10" fill="#6B7280">break-even</text>
              </g>
            )}
            {/* you are here */}
            <circle cx={youX} cy={youCostY} r="6" fill={NAVY} stroke="#fff" strokeWidth="2" />
            <rect x={Math.min(CW - PAD_R - 92, Math.max(PAD_L, youX - 46))} y={youCostY - 40} width="92" height="26" rx="4" fill={profitPositive ? GREEN : RED} />
            <text x={Math.min(CW - PAD_R - 46, Math.max(PAD_L + 46, youX))} y={youCostY - 22} textAnchor="middle" fontSize="12" fill="#fff" fontWeight="700">
              {calc.marginPerScan >= 0 ? '+' : ''}{perScan(calc.marginPerScan)}/scan
            </text>
          </svg>
          <p className="text-center text-sm text-gray-600 mt-3">
            At <strong>{calc.volume.toLocaleString()}</strong> scans and <strong>${calc.price}</strong>/scan, operating profit is{' '}
            <strong style={{ color: profitPositive ? GREEN : RED }}>{money(calc.operatingProfit)}</strong>
            {' '}({perScan(calc.marginPerScan)}/scan). Baseline is {money(base.operatingProfit)}.
            {calc.beVolume === Infinity
              ? ' Revenue per scan is at or below the variable floor, so no volume breaks even.'
              : ` Break-even volume: ${calc.beVolume.toLocaleString()} scans.`}
          </p>
        </div>

        {/* ==================== THIRD DIMENSION: CASH TIMING ==================== */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-2" style={{ background: '#F0FDFA', color: TEAL }}>
            THE THIRD DIMENSION · CASH TIMING
          </div>
          <h2 className="text-lg font-bold mb-1" style={{ color: NAVY }}>Does the profit turn into cash?</h2>
          <p className="text-sm text-gray-600 mb-5">
            The P&amp;L books revenue when the scan is read. Cash arrives when the payer pays. Days sales outstanding (DSO)
            is the gap. Every day it lengthens parks another day of revenue in receivables. Today's book is assumed to carry
            baseline revenue at {DSO0} days, so the year-1 figures below show the cash effect of moving any of the levers.
          </p>

          <Slider
            label="DSO (days to collect)"
            display={<>{calc.dso} <Unit>days</Unit></>}
            min={15} max={240} step={1} value={levers.dso} onChange={set('dso')} color={TEAL}
            ticks={['15', '240']} baseline={DSO0} baselineLabel={`baseline ${DSO0}`}
          />
          <div className="flex flex-wrap gap-3 mb-6">
            {[30, 45, 90, 180].map(d => (
              <button
                key={d}
                onClick={() => set('dso')(d)}
                className="px-3 py-1.5 rounded-md text-sm font-medium border transition-colors"
                style={levers.dso === d ? { background: TEAL, color: '#fff', borderColor: TEAL } : { background: '#fff', color: '#4B5563', borderColor: GRID }}
              >
                {d} days
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <Tile label="Revenue (P&L)" value={money(calc.revenue)} sub="booked this year" color={NAVY} />
            <Tile label="Cash in receivables" value={money(calc.closingAR)} sub={`${calc.dso} days × ${money(calc.dailyRevenue)}/day`} color={TEAL} />
            <Tile
              label={arUnchanged ? 'Receivables change' : arAbsorbs ? 'Cash tied up (one-time)' : 'Cash released (one-time)'}
              value={arUnchanged ? 'None' : money(Math.abs(calc.arChange))}
              sub={`vs. ${money(calc.openingAR)} today`}
              color={arUnchanged ? '#6B7280' : arAbsorbs ? RED : GREEN}
            />
            <Tile label="Cash collected, year 1" value={money(calc.cashCollected)} sub={`${pct(calc.cashCollected / calc.revenue)} of revenue`} color={arAbsorbs ? RED : GREEN} highlight />
          </div>

          {/* revenue -> cash bars */}
          <div className="space-y-2 mb-4">
            {[
              { label: 'Revenue booked', value: calc.revenue, color: NAVY },
              { label: 'Cash collected, year 1', value: calc.cashCollected, color: arAbsorbs ? RED : GREEN },
              { label: 'Operating profit', value: calc.operatingProfit, color: GREEN },
              { label: 'Profit after cash timing', value: calc.cashProfit, color: calc.cashProfit >= 0 ? TEAL : RED },
            ].map((b, i, all) => {
              const maxV = Math.max(...all.map(x => Math.abs(x.value)), 1);
              return (
                <div key={b.label} className="flex items-center gap-3">
                  <div className="w-44 shrink-0 text-xs text-gray-600">{b.label}</div>
                  <div className="flex-1 h-5 rounded" style={{ background: '#F3F4F6' }}>
                    <div className="h-5 rounded" style={{ width: `${(Math.abs(b.value) / maxV) * 100}%`, background: b.color, opacity: b.value < 0 ? 0.5 : 1 }} />
                  </div>
                  <div className="w-20 shrink-0 text-right text-sm font-semibold" style={{ color: b.color }}>{money(b.value)}</div>
                </div>
              );
            })}
          </div>

          <p className="text-sm text-gray-700">
            Each day of DSO is worth <strong>{money(calc.dailyRevenue)}</strong> of cash.{' '}
            {arUnchanged
              ? 'At these settings receivables are unchanged, so cash collected equals revenue.'
              : arAbsorbs
                ? <>At these settings <strong style={{ color: RED }}>{money(calc.arChange)}</strong> of this year's revenue is still sitting with payers at year-end. It is earned, it is on the P&amp;L, and it is not in the bank.</>
                : <>At these settings receivables shrink and <strong style={{ color: GREEN }}>{money(-calc.arChange)}</strong> more cash comes in than revenue is booked.</>}
            {' '}This is a one-time shift: once DSO holds steady, cash collected each year matches revenue again, but the
            receivables balance stays tied up for as long as DSO stays where it is.
          </p>
          <p className="text-xs text-gray-400 mt-3">
            Revenue side only. Costs are assumed to be paid as incurred. Bad debt, payer denials and the financing cost of carrying receivables are not modelled.
          </p>
        </div>

        {/* ==================== CTA ==================== */}
        <div className="rounded-xl p-8 text-center text-white mb-8" style={{ background: NAVY }}>
          <h2 className="text-2xl font-bold mb-3">Want this on your actual numbers?</h2>
          <p className="text-blue-100 mb-5 max-w-xl mx-auto">
            This simulator uses generic industry anchors. A Benefique engagement rebuilds it on your books — real cost per
            scan by center, the true variable floor by payer, DSO by payer class, reconciled to your general ledger to the dollar.
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

function Unit({ children }) {
  return <span className="text-sm text-gray-400 font-medium">{children}</span>;
}

function Slider({ label, display, min, max, step, value, onChange, color, ticks, baseline, baselineLabel }) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-3 mb-2">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <span className="text-2xl font-bold whitespace-nowrap" style={{ color }}>{display}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-3 rounded-lg appearance-none cursor-pointer"
        style={{ background: `linear-gradient(to right, ${color} ${fill}%, ${GRID} ${fill}%)` }}
      />
      <div className="relative flex justify-between text-xs text-gray-400 mt-1">
        {ticks.map(t => <span key={t}>{t}</span>)}
        <span className="absolute -translate-x-1/2 whitespace-nowrap" style={{ left: `${((baseline - min) / (max - min)) * 100}%` }}>
          &#9650; {baselineLabel}
        </span>
      </div>
    </div>
  );
}

function Tile({ label, value, sub, color, highlight }) {
  return (
    <div className={`bg-white rounded-lg border p-4 h-full ${highlight ? 'ring-2' : ''}`} style={highlight ? { borderColor: color, boxShadow: `0 0 0 1px ${color}` } : { borderColor: GRID }}>
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-2xl font-bold" style={{ color }}>{value}</div>
      <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
    </div>
  );
}
