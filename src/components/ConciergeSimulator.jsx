import { useState, useMemo, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// ============================================================
// CONSTANTS
// ============================================================

const FIXED_COSTS = {
  'Office Lease': 4500,              // Premium South FL medical office, ~1,500 sq ft @ $36/sq ft
  'Medical Assistant': 4200,          // Full-time MA, South FL market rate + benefits loading
  'Front Desk / Admin': 2800,         // Part-time receptionist/scheduler, South FL
  'Malpractice Insurance': 850,       // Internal medicine, Florida (high-malpractice state)
  'Staff Benefits': 1200,             // Health insurance contribution for 2 staff
  'EHR & Technology': 600,            // Concierge EHR + patient portal + telehealth platform
  'Marketing': 1500,                  // Digital, print, community events (premium market)
  'Accounting, Tax & CFO': 3000,      // Outsourced: bookkeeping, tax compliance, controller/CFO advisory, legal
  'Office Operations': 750,           // Utilities, AC, cleaning, medical waste, office supplies
  'Licenses & CME': 350,              // Professional memberships (AAPP), continuing education
};

const TOTAL_FIXED = Object.values(FIXED_COSTS).reduce((a, b) => a + b, 0); // $19,750

const VARIABLE_PER_MEMBER = 23; // supplies $8 + labs $12 + portal $3
const PROCESSING_RATE = 0.029; // 2.9%
const PROCESSING_FIXED = 0.30; // per transaction
const TAX_RATE = 0.30;
const PAYROLL_TAX_RATE = 0.0765;

const FEE_PRESETS = [
  { label: 'DPC', fee: 175, desc: '$2,100/yr' },
  { label: 'Standard', fee: 350, desc: '$4,200/yr' },
  { label: 'Premium', fee: 650, desc: '$7,800/yr' },
  { label: 'Executive', fee: 1000, desc: '$12,000/yr' },
];

const COLORS = {
  revenue: '#10B981',
  cost: '#EF4444',
  costLight: '#FCA5A5',
  physician: '#8B5CF6',
  total: '#1B365D',
  totalNeg: '#DC2626',
  plLine: '#3B82F6',
  cfLine: '#14B8A6',
  breakeven: '#F97316',
  grid: '#E5E7EB',
  gridDark: '#9CA3AF',
  bg: '#F8FAFC',
  marker: '#1B365D',
};

const RELATED_ARTICLES = [
  { slug: 'cost-starting-concierge-medical-practice', title: 'Cost of Starting a Concierge Medical Practice' },
  { slug: 'concierge-medical-fees-tax-deductible', title: 'Are Concierge Medical Fees Tax Deductible?' },
  { slug: 'how-to-start-concierge-medical-practice', title: 'How to Start a Concierge Medical Practice' },
  { slug: 'concierge-medicine-income-south-florida', title: 'Concierge Medicine Income: South Florida' },
  { slug: 'cash-flow-waterfall-why-profit-doesnt-equal-cash', title: 'Why Profit Doesn\'t Equal Cash' },
  { slug: 'fixed-cost-breakeven-volume-problem', title: 'The Fixed-Cost Break-Even Problem' },
  { slug: 'tax-strategies-concierge-physicians', title: 'Tax Strategies for Concierge Physicians' },
  { slug: 'cash-flow-breakeven-per-patient-activity-units', title: 'Cash Flow Break-Even in Activity Units' },
];

// ============================================================
// FINANCIAL ENGINE
// ============================================================

function calculate(members, monthlyFee, annualSalary, loanPayment) {
  const revenue = members * monthlyFee;
  const variableTotal = members * (VARIABLE_PER_MEMBER + monthlyFee * PROCESSING_RATE + PROCESSING_FIXED);
  const totalOperating = TOTAL_FIXED + variableTotal;
  const operatingIncome = revenue - totalOperating;

  const monthlySalary = annualSalary / 12;
  const payrollTaxes = monthlySalary * PAYROLL_TAX_RATE;
  const physicianCost = monthlySalary + payrollTaxes;

  const netIncome = operatingIncome - physicianCost;
  const taxes = netIncome > 0 ? netIncome * TAX_RATE : 0;
  const netCashFlow = netIncome - taxes - loanPayment;

  const totalPhysicianComp = monthlySalary + Math.max(0, netIncome - taxes);

  const cm = monthlyFee - VARIABLE_PER_MEMBER - monthlyFee * PROCESSING_RATE - PROCESSING_FIXED;
  const opBreakeven = cm > 0 ? Math.ceil(TOTAL_FIXED / cm) : Infinity;
  const fullBreakeven = cm > 0 ? Math.ceil((TOTAL_FIXED + physicianCost) / cm) : Infinity;

  // Cash flow breakeven: NI × (1 - taxRate) = loanPayment
  // (n×CM - FC - physicianCost) × (1-taxRate) = loanPayment
  // n = (FC + physicianCost + loanPayment/(1-taxRate)) / CM
  const cfBreakeven = cm > 0
    ? Math.ceil((TOTAL_FIXED + physicianCost + loanPayment / (1 - TAX_RATE)) / cm)
    : Infinity;

  // P&L waterfall items (grouped for clarity)
  const facilities = FIXED_COSTS['Office Lease'] + FIXED_COSTS['Office Operations'];
  const staff = FIXED_COSTS['Medical Assistant'] + FIXED_COSTS['Front Desk / Admin'] + FIXED_COSTS['Staff Benefits'];
  const compliance = FIXED_COSTS['Malpractice Insurance'] + FIXED_COSTS['Licenses & CME'];
  const techMktg = FIXED_COSTS['EHR & Technology'] + FIXED_COSTS['Marketing'];
  const financial = FIXED_COSTS['Accounting, Tax & CFO'];

  const plWaterfall = [
    { label: 'Revenue', value: revenue, type: 'start' },
    { label: 'Facilities', value: -facilities, type: 'cost' },
    { label: 'Staff', value: -staff, type: 'cost' },
    { label: 'Compliance', value: -compliance, type: 'cost' },
    { label: 'Tech & Mktg', value: -techMktg, type: 'cost' },
    { label: 'Acct & CFO', value: -financial, type: 'cost' },
    { label: 'Supplies', value: -variableTotal, type: 'cost' },
    { label: 'Dr. Salary', value: -physicianCost, type: 'physician' },
    { label: 'Net Income', value: netIncome, type: 'total' },
  ];

  const cfWaterfall = [
    { label: 'Net Income', value: netIncome, type: 'start' },
    { label: 'Est. Taxes', value: -taxes, type: 'cost' },
    { label: 'Loan Pmts', value: -loanPayment, type: 'cost' },
    { label: 'Net Cash', value: netCashFlow, type: 'total' },
  ];

  return {
    revenue, variableTotal, totalOperating, operatingIncome,
    physicianCost, netIncome, taxes, netCashFlow,
    totalPhysicianComp, cm,
    opBreakeven, fullBreakeven, cfBreakeven,
    plWaterfall, cfWaterfall,
  };
}

// ============================================================
// FORMATTING HELPERS
// ============================================================

function fmt(val, mode, revenue, members) {
  if (mode === 'ratio') {
    if (revenue === 0) return '0%';
    return ((val / revenue) * 100).toFixed(1) + '%';
  }
  if (mode === 'perMember') {
    if (members === 0) return '$0';
    return fmtDollar(val / members);
  }
  return fmtDollar(val);
}

function fmtDollar(val) {
  const abs = Math.abs(val);
  if (abs >= 1000000) return (val < 0 ? '-' : '') + '$' + (abs / 1000000).toFixed(1) + 'M';
  if (abs >= 1000) return (val < 0 ? '-' : '') + '$' + (abs / 1000).toFixed(abs >= 10000 ? 0 : 1) + 'K';
  return (val < 0 ? '-' : '') + '$' + Math.round(abs).toLocaleString();
}

function fmtFull(val) {
  return (val < 0 ? '-' : '') + '$' + Math.abs(Math.round(val)).toLocaleString();
}

function transformVal(val, mode, revenue, members) {
  if (mode === 'ratio') return revenue > 0 ? (val / revenue) * 100 : 0;
  if (mode === 'perMember') return members > 0 ? val / members : 0;
  return val;
}

function yLabel(mode) {
  if (mode === 'ratio') return '% of Revenue';
  if (mode === 'perMember') return '$ per Member';
  return 'Monthly $';
}

// ============================================================
// GROWTH CHART — Dual-line P&L vs Cash Flow
// ============================================================

function GrowthChart({ members, monthlyFee, annualSalary, loanPayment, viewMode, maxMembers = 600 }) {
  const W = 800, H = 340;
  const margin = { top: 30, right: 30, bottom: 55, left: 75 };
  const cw = W - margin.left - margin.right;
  const ch = H - margin.top - margin.bottom;

  const data = useMemo(() => {
    const pts = [];
    for (let n = 0; n <= maxMembers; n += 2) {
      const c = calculate(n, monthlyFee, annualSalary, loanPayment);
      pts.push({ n, ni: c.netIncome, cf: c.netCashFlow, rev: c.revenue });
    }
    return pts;
  }, [monthlyFee, annualSalary, loanPayment, maxMembers]);

  const calc = useMemo(() => calculate(members, monthlyFee, annualSalary, loanPayment), [members, monthlyFee, annualSalary, loanPayment]);

  // Compute Y range
  const allVals = data.flatMap(d => {
    const rev = d.rev;
    const m = d.n;
    return [transformVal(d.ni, viewMode, rev, m), transformVal(d.cf, viewMode, rev, m)];
  });
  let yMin = Math.min(0, ...allVals);
  let yMax = Math.max(0, ...allVals);
  const pad = (yMax - yMin) * 0.15 || 1;
  yMin -= pad; yMax += pad;

  const xScale = (n) => margin.left + (n / maxMembers) * cw;
  const yScale = (v) => margin.top + ch - ((v - yMin) / (yMax - yMin)) * ch;

  const makePath = (key) => {
    return data.map((d, i) => {
      const v = transformVal(key === 'ni' ? d.ni : d.cf, viewMode, d.rev, d.n);
      const x = xScale(d.n);
      const y = yScale(v);
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    }).join(' ');
  };

  const zeroY = yScale(0);
  const markerX = xScale(members);

  // Break-even markers
  const bePL = calc.fullBreakeven;
  const beCF = calc.cfBreakeven;

  // Y-axis ticks
  const ticks = [];
  const step = niceStep(yMax - yMin);
  for (let v = Math.ceil(yMin / step) * step; v <= yMax; v += step) {
    ticks.push(v);
  }

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        {/* Grid */}
        {ticks.map((v, i) => (
          <g key={i}>
            <line x1={margin.left} y1={yScale(v)} x2={W - margin.right} y2={yScale(v)} stroke={COLORS.grid} strokeWidth="1" />
            <text x={margin.left - 8} y={yScale(v) + 4} textAnchor="end" fontSize="11" fill="#6B7280">
              {viewMode === 'ratio' ? `${v.toFixed(0)}%` : fmtDollar(v)}
            </text>
          </g>
        ))}

        {/* Zero line */}
        <line x1={margin.left} y1={zeroY} x2={W - margin.right} y2={zeroY} stroke={COLORS.gridDark} strokeWidth="1.5" strokeDasharray="4,4" />

        {/* Break-even markers */}
        {bePL <= maxMembers && (
          <g>
            <line x1={xScale(bePL)} y1={margin.top} x2={xScale(bePL)} y2={H - margin.bottom} stroke={COLORS.breakeven} strokeWidth="1.5" strokeDasharray="6,4" />
            <text x={xScale(bePL)} y={margin.top - 5} textAnchor="middle" fontSize="10" fill={COLORS.breakeven} fontWeight="600">
              P&L BE: {bePL}
            </text>
          </g>
        )}
        {beCF <= maxMembers && beCF !== bePL && (
          <g>
            <line x1={xScale(beCF)} y1={margin.top} x2={xScale(beCF)} y2={H - margin.bottom} stroke={COLORS.cfLine} strokeWidth="1.5" strokeDasharray="6,4" />
            <text x={xScale(beCF)} y={margin.top - 5} textAnchor="middle" fontSize="10" fill={COLORS.cfLine} fontWeight="600">
              CF BE: {beCF}
            </text>
          </g>
        )}

        {/* Negative region shading */}
        {zeroY < H - margin.bottom && (
          <rect x={margin.left} y={zeroY} width={cw} height={Math.min(H - margin.bottom - zeroY, ch)} fill="#FEE2E2" opacity="0.4" />
        )}

        {/* Lines */}
        <path d={makePath('ni')} fill="none" stroke={COLORS.plLine} strokeWidth="2.5" />
        <path d={makePath('cf')} fill="none" stroke={COLORS.cfLine} strokeWidth="2.5" />

        {/* Current position marker */}
        <line x1={markerX} y1={margin.top} x2={markerX} y2={H - margin.bottom} stroke={COLORS.marker} strokeWidth="2" opacity="0.6" />
        <circle cx={markerX} cy={yScale(transformVal(calc.netIncome, viewMode, calc.revenue, members))} r="5" fill={COLORS.plLine} stroke="white" strokeWidth="2" />
        <circle cx={markerX} cy={yScale(transformVal(calc.netCashFlow, viewMode, calc.revenue, members))} r="5" fill={COLORS.cfLine} stroke="white" strokeWidth="2" />

        {/* X-axis labels */}
        {[0, 100, 200, 300, 400, 500, 600].filter(n => n <= maxMembers).map(n => (
          <text key={n} x={xScale(n)} y={H - margin.bottom + 20} textAnchor="middle" fontSize="11" fill="#6B7280">
            {n}
          </text>
        ))}
        <text x={margin.left + cw / 2} y={H - 5} textAnchor="middle" fontSize="12" fill="#374151" fontWeight="500">
          Number of Members
        </text>

        {/* Y-axis label */}
        <text x={15} y={margin.top + ch / 2} textAnchor="middle" fontSize="12" fill="#374151" fontWeight="500" transform={`rotate(-90, 15, ${margin.top + ch / 2})`}>
          {yLabel(viewMode)}
        </text>

        {/* Legend */}
        <rect x={W - 200} y={margin.top + 5} width="12" height="3" fill={COLORS.plLine} rx="1" />
        <text x={W - 183} y={margin.top + 11} fontSize="11" fill="#374151">Net Income (P&L)</text>
        <rect x={W - 200} y={margin.top + 22} width="12" height="3" fill={COLORS.cfLine} rx="1" />
        <text x={W - 183} y={margin.top + 28} fontSize="11" fill="#374151">Net Cash Flow</text>
      </svg>
    </div>
  );
}

function niceStep(range) {
  const rough = range / 6;
  const mag = Math.pow(10, Math.floor(Math.log10(rough)));
  const residual = rough / mag;
  if (residual <= 1.5) return mag;
  if (residual <= 3) return 2 * mag;
  if (residual <= 7) return 5 * mag;
  return 10 * mag;
}

// ============================================================
// WATERFALL CHART
// ============================================================

function WaterfallChart({ items, title, viewMode, revenue, members }) {
  const W = 400, H = 340;
  const margin = { top: 35, right: 15, bottom: 70, left: 70 };
  const cw = W - margin.left - margin.right;
  const ch = H - margin.top - margin.bottom;

  const transformed = items.map(item => ({
    ...item,
    tValue: transformVal(item.value, viewMode, revenue, members),
  }));

  // Compute running totals for bar positioning
  let running = 0;
  const bars = transformed.map((item) => {
    let y1, y2;
    if (item.type === 'start') {
      y1 = 0;
      y2 = item.tValue;
      running = item.tValue;
    } else if (item.type === 'total') {
      y1 = 0;
      y2 = running; // running already reflects the value
    } else {
      const prev = running;
      running += item.tValue;
      y1 = prev;
      y2 = running;
    }
    return { ...item, y1, y2, running };
  });

  const allY = bars.flatMap(b => [b.y1, b.y2, 0]);
  let yMin = Math.min(...allY);
  let yMax = Math.max(...allY);
  const pad = (yMax - yMin) * 0.12 || 1;
  yMin -= pad; yMax += pad;

  const barCount = bars.length;
  const gap = 8;
  const barW = Math.min(50, (cw - gap * (barCount - 1)) / barCount);
  const totalBarsWidth = barCount * barW + (barCount - 1) * gap;
  const startX = margin.left + (cw - totalBarsWidth) / 2;

  const yScale = (v) => margin.top + ch - ((v - yMin) / (yMax - yMin)) * ch;
  const zeroY = yScale(0);

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        {/* Title */}
        <text x={W / 2} y={18} textAnchor="middle" fontSize="14" fill="#1B365D" fontWeight="600">{title}</text>

        {/* Zero line */}
        <line x1={margin.left} y1={zeroY} x2={W - margin.right} y2={zeroY} stroke={COLORS.gridDark} strokeWidth="1" strokeDasharray="4,4" />

        {/* Bars */}
        {bars.map((bar, i) => {
          const x = startX + i * (barW + gap);
          const top = yScale(Math.max(bar.y1, bar.y2));
          const bottom = yScale(Math.min(bar.y1, bar.y2));
          const height = Math.max(bottom - top, 1);

          let fill;
          if (bar.type === 'start') fill = bar.tValue >= 0 ? COLORS.revenue : COLORS.totalNeg;
          else if (bar.type === 'total') fill = bar.y2 >= 0 ? COLORS.total : COLORS.totalNeg;
          else if (bar.type === 'physician') fill = COLORS.physician;
          else fill = COLORS.cost;

          // Connector line to next bar
          const connector = i < bars.length - 1 && bar.type !== 'total';

          return (
            <g key={i}>
              <rect x={x} y={top} width={barW} height={height} fill={fill} rx="2" />

              {/* Value label */}
              <text
                x={x + barW / 2}
                y={bar.tValue >= 0 ? top - 5 : bottom + 13}
                textAnchor="middle"
                fontSize="10"
                fill="#374151"
                fontWeight="500"
              >
                {fmt(bar.value, viewMode, revenue, members)}
              </text>

              {/* Category label */}
              <text
                x={x + barW / 2}
                y={H - margin.bottom + 15}
                textAnchor="end"
                fontSize="10"
                fill="#6B7280"
                transform={`rotate(-35, ${x + barW / 2}, ${H - margin.bottom + 15})`}
              >
                {bar.label}
              </text>

              {/* Connector */}
              {connector && (
                <line
                  x1={x + barW}
                  y1={yScale(bar.running)}
                  x2={startX + (i + 1) * (barW + gap)}
                  y2={yScale(bar.running)}
                  stroke={COLORS.grid}
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ============================================================
// METRIC CARD
// ============================================================

function MetricCard({ label, value, sub, positive }) {
  const color = positive === undefined ? 'text-gray-900' : positive ? 'text-emerald-600' : 'text-red-600';
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{label}</div>
      <div className={`text-xl font-bold ${color}`}>{value}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function ConciergeSimulator() {
  const [members, setMembers] = useState(200);
  const [monthlyFee, setMonthlyFee] = useState(350);
  const [customFee, setCustomFee] = useState('');
  const [viewMode, setViewMode] = useState('absolute');
  const [annualSalary, setAnnualSalary] = useState(250000);
  const [loanPayment, setLoanPayment] = useState(2000);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showAssumptions, setShowAssumptions] = useState(false);
  const sliderRef = useRef(null);

  const calc = useMemo(
    () => calculate(members, monthlyFee, annualSalary, loanPayment),
    [members, monthlyFee, annualSalary, loanPayment]
  );

  const handleFeePreset = useCallback((fee) => {
    setMonthlyFee(fee);
    setCustomFee('');
  }, []);

  const handleCustomFee = useCallback((e) => {
    const v = e.target.value;
    setCustomFee(v);
    const parsed = parseInt(v);
    if (parsed >= 50 && parsed <= 2500) setMonthlyFee(parsed);
  }, []);

  const isPreset = FEE_PRESETS.some(p => p.fee === monthlyFee) && !customFee;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Helmet>
        <title>Concierge Medicine Financial Simulator | Benefique Tax & Accounting</title>
        <meta name="description" content="Interactive financial model for concierge medical practices. See how your P&L and cash flow change as you grow your patient panel. Adjust membership fees, costs, and physician salary to model your practice." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.benefique.com/tools/concierge-simulator" />
        <meta property="og:title" content="Concierge Medicine Financial Simulator" />
        <meta property="og:description" content="Interactive P&L and cash flow model for concierge practices. Slide to see how profitability changes as you add members." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.benefique.com/tools/concierge-simulator" />
      </Helmet>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-4 pt-12 pb-6 text-center">
        <Link to="/" className="text-sm text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Benefique</Link>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1B365D] mb-3">
          Concierge Medicine Financial Simulator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Slide to see how your P&L and cash flow change as you grow your patient panel.
          Two charts. One slider. The financial picture most consultants charge $15,000 to build.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-16">

        {/* ==================== CONTROLS ==================== */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">

          {/* Main slider */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700">Number of Members</label>
              <span className="text-2xl font-bold text-[#1B365D]">{members}</span>
            </div>
            <input
              ref={sliderRef}
              type="range"
              min="0"
              max="600"
              step="5"
              value={members}
              onChange={(e) => setMembers(Number(e.target.value))}
              className="w-full h-3 rounded-lg appearance-none cursor-pointer accent-[#1B365D]"
              style={{
                background: `linear-gradient(to right, #1B365D ${(members / 600) * 100}%, #E5E7EB ${(members / 600) * 100}%)`,
              }}
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0</span>
              {calc.opBreakeven <= 600 && (
                <span className="text-orange-500 font-medium" style={{ marginLeft: `${(calc.opBreakeven / 600) * 100 - 5}%` }}>
                  Op. BE: {calc.opBreakeven}
                </span>
              )}
              <span>600</span>
            </div>
          </div>

          {/* Fee presets + custom */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Monthly Membership Fee</label>
            <div className="flex flex-wrap gap-2">
              {FEE_PRESETS.map(p => (
                <button
                  key={p.fee}
                  onClick={() => handleFeePreset(p.fee)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    monthlyFee === p.fee && !customFee
                      ? 'bg-[#1B365D] text-white border-[#1B365D]'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#1B365D]'
                  }`}
                >
                  {p.label}: ${p.fee}/mo
                  <span className="block text-xs opacity-70">{p.desc}</span>
                </button>
              ))}
              <div className="relative">
                <input
                  type="number"
                  placeholder="Custom"
                  value={customFee}
                  onChange={handleCustomFee}
                  className={`w-28 px-3 py-2 rounded-lg border text-sm ${
                    customFee ? 'border-[#1B365D] bg-blue-50' : 'border-gray-300'
                  }`}
                />
                <span className="absolute right-3 top-2.5 text-xs text-gray-400">/mo</span>
              </div>
            </div>
          </div>

          {/* View mode toggle */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-semibold text-gray-700">View:</span>
            {[
              { key: 'absolute', label: 'Absolute $' },
              { key: 'ratio', label: '% of Revenue' },
              { key: 'perMember', label: '$ per Member' },
            ].map(v => (
              <button
                key={v.key}
                onClick={() => setViewMode(v.key)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === v.key
                    ? 'bg-[#1B365D] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {v.label}
              </button>
            ))}

            {/* Advanced toggle */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="ml-auto text-sm text-gray-500 hover:text-[#1B365D] underline"
            >
              {showAdvanced ? 'Hide' : 'Show'} Advanced
            </button>
          </div>

          {/* Advanced controls */}
          {showAdvanced && (
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">
                  Physician Annual Salary (Reasonable Comp)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="100000"
                    max="500000"
                    step="10000"
                    value={annualSalary}
                    onChange={(e) => setAnnualSalary(Number(e.target.value))}
                    className="flex-1 h-2 rounded-lg appearance-none cursor-pointer accent-[#8B5CF6]"
                    style={{
                      background: `linear-gradient(to right, #8B5CF6 ${((annualSalary - 100000) / 400000) * 100}%, #E5E7EB ${((annualSalary - 100000) / 400000) * 100}%)`,
                    }}
                  />
                  <span className="text-sm font-mono font-semibold w-20 text-right">{fmtFull(annualSalary)}</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">
                  Monthly Startup Loan Payment
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={loanPayment}
                    onChange={(e) => setLoanPayment(Number(e.target.value))}
                    className="flex-1 h-2 rounded-lg appearance-none cursor-pointer accent-red-500"
                    style={{
                      background: `linear-gradient(to right, #EF4444 ${(loanPayment / 5000) * 100}%, #E5E7EB ${(loanPayment / 5000) * 100}%)`,
                    }}
                  />
                  <span className="text-sm font-mono font-semibold w-20 text-right">{fmtFull(loanPayment)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ==================== KEY METRICS ==================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <MetricCard
            label="Monthly Revenue"
            value={fmtFull(calc.revenue)}
            sub={`${fmtFull(calc.revenue * 12)}/yr`}
          />
          <MetricCard
            label="Net Income"
            value={fmtFull(calc.netIncome)}
            sub={`${fmtFull(calc.netIncome * 12)}/yr`}
            positive={calc.netIncome >= 0}
          />
          <MetricCard
            label="Net Cash Flow"
            value={fmtFull(calc.netCashFlow)}
            sub={`${fmtFull(calc.netCashFlow * 12)}/yr`}
            positive={calc.netCashFlow >= 0}
          />
          <MetricCard
            label="Total Physician Comp"
            value={fmtFull(calc.totalPhysicianComp)}
            sub={`${fmtFull(calc.totalPhysicianComp * 12)}/yr`}
            positive={calc.totalPhysicianComp > 0}
          />
        </div>

        {/* Break-even row */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
            <div className="text-xs text-gray-500 uppercase tracking-wide">Operating Break-Even</div>
            <div className="text-lg font-bold text-orange-500">{calc.opBreakeven <= 600 ? `${calc.opBreakeven} members` : 'N/A'}</div>
            <div className="text-xs text-gray-400">Covers practice costs (no salary)</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
            <div className="text-xs text-gray-500 uppercase tracking-wide">Full P&L Break-Even</div>
            <div className="text-lg font-bold text-blue-600">{calc.fullBreakeven <= 600 ? `${calc.fullBreakeven} members` : 'N/A'}</div>
            <div className="text-xs text-gray-400">Covers costs + physician salary</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
            <div className="text-xs text-gray-500 uppercase tracking-wide">Cash Flow Break-Even</div>
            <div className="text-lg font-bold text-teal-600">{calc.cfBreakeven <= 600 ? `${calc.cfBreakeven} members` : 'N/A'}</div>
            <div className="text-xs text-gray-400">Covers everything + taxes + loan</div>
          </div>
        </div>

        {/* ==================== GROWTH CHART ==================== */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
          <h2 className="text-lg font-bold text-[#1B365D] mb-1 text-center">
            How Profitability & Cash Flow Change With Each New Member
          </h2>
          <p className="text-sm text-gray-500 text-center mb-4">
            The gap between the blue line (P&L) and teal line (cash flow) is where taxes and debt consume your profit.
          </p>
          <GrowthChart
            members={members}
            monthlyFee={monthlyFee}
            annualSalary={annualSalary}
            loanPayment={loanPayment}
            viewMode={viewMode}
          />
        </div>

        {/* ==================== WATERFALL CHARTS ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <WaterfallChart
              items={calc.plWaterfall}
              title="P&L Waterfall — Where Revenue Goes"
              viewMode={viewMode}
              revenue={calc.revenue}
              members={members}
            />
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <WaterfallChart
              items={calc.cfWaterfall}
              title="Cash Flow Waterfall — What's Left"
              viewMode={viewMode}
              revenue={calc.revenue}
              members={members}
            />
          </div>
        </div>

        {/* ==================== INSIGHT CALLOUT ==================== */}
        {members > 0 && calc.netIncome > 0 && calc.netCashFlow < 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
            <h3 className="font-bold text-amber-800 mb-2">
              The Profit-Cash Disconnect
            </h3>
            <p className="text-amber-700 text-sm">
              At {members} members, your practice shows <span className="font-semibold">{fmtFull(calc.netIncome)}/mo net income</span> on
              the P&L — but your bank account is actually <span className="font-semibold text-red-600">shrinking by {fmtFull(Math.abs(calc.netCashFlow))}/mo</span>.
              {' '}Estimated taxes ({fmtFull(calc.taxes)}) and loan payments ({fmtFull(loanPayment)}) consume more than your profit.
              You need <span className="font-semibold">{calc.cfBreakeven - members} more members</span> to reach cash flow break-even.
            </p>
          </div>
        )}

        {members > 0 && calc.netIncome > 0 && calc.netCashFlow > 0 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
            <h3 className="font-bold text-emerald-800 mb-2">
              Practice is Cash Flow Positive
            </h3>
            <p className="text-emerald-700 text-sm">
              At {members} members, your practice generates <span className="font-semibold">{fmtFull(calc.netCashFlow)}/mo</span> in
              free cash flow after taxes, salary, and loan payments. Your total physician compensation
              is <span className="font-semibold">{fmtFull(calc.totalPhysicianComp * 12)}/yr</span>.
              Each new member adds approximately <span className="font-semibold">{fmtFull(calc.cm * (1 - TAX_RATE))}/mo</span> in after-tax cash flow.
            </p>
          </div>
        )}

        {/* ==================== ASSUMPTIONS ==================== */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-8">
          <button
            onClick={() => setShowAssumptions(!showAssumptions)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-[#1B365D]">Model Assumptions</span>
            <svg className={`w-5 h-5 text-gray-400 transition-transform ${showAssumptions ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showAssumptions && (
            <div className="px-6 pb-6 border-t border-gray-100 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Fixed Monthly Operating Costs</h4>
                  <table className="w-full text-sm">
                    <tbody>
                      {Object.entries(FIXED_COSTS).map(([k, v]) => (
                        <tr key={k} className="border-b border-gray-50">
                          <td className="py-1 text-gray-600">{k}</td>
                          <td className="py-1 text-right font-mono">{fmtFull(v)}</td>
                        </tr>
                      ))}
                      <tr className="font-semibold">
                        <td className="py-1 text-gray-800">Total Fixed</td>
                        <td className="py-1 text-right font-mono">{fmtFull(TOTAL_FIXED)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Accounting, Tax & CFO — $3,000/mo Breakdown</h4>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-gray-50"><td className="py-1 text-gray-600">Monthly bookkeeping & close</td><td className="py-1 text-right font-mono">$1,200</td></tr>
                      <tr className="border-b border-gray-50"><td className="py-1 text-gray-600">Tax planning & compliance</td><td className="py-1 text-right font-mono">$800</td></tr>
                      <tr className="border-b border-gray-50"><td className="py-1 text-gray-600">Controller / CFO advisory</td><td className="py-1 text-right font-mono">$600</td></tr>
                      <tr className="border-b border-gray-50"><td className="py-1 text-gray-600">Legal & regulatory</td><td className="py-1 text-right font-mono">$400</td></tr>
                    </tbody>
                  </table>
                  <p className="text-xs text-gray-400 mt-1 mb-4">
                    A $1M+ practice needs a full outsourced accounting department — not just a tax preparer.
                    This includes monthly closes, S-Corp payroll, quarterly estimates, and cash flow advisory.
                  </p>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Variable Costs per Member/Month</h4>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-gray-50"><td className="py-1 text-gray-600">Medical Supplies</td><td className="py-1 text-right font-mono">$8</td></tr>
                      <tr className="border-b border-gray-50"><td className="py-1 text-gray-600">Lab / POC Testing</td><td className="py-1 text-right font-mono">$12</td></tr>
                      <tr className="border-b border-gray-50"><td className="py-1 text-gray-600">Patient Portal / Comms</td><td className="py-1 text-right font-mono">$3</td></tr>
                      <tr className="border-b border-gray-50"><td className="py-1 text-gray-600">Payment Processing</td><td className="py-1 text-right font-mono">2.9% + $0.30</td></tr>
                    </tbody>
                  </table>
                  <h4 className="font-semibold text-sm text-gray-700 mt-4 mb-2">Other Assumptions</h4>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-gray-50"><td className="py-1 text-gray-600">Estimated Tax Rate</td><td className="py-1 text-right font-mono">30%</td></tr>
                      <tr className="border-b border-gray-50"><td className="py-1 text-gray-600">Payroll Tax Rate (employer)</td><td className="py-1 text-right font-mono">7.65%</td></tr>
                      <tr className="border-b border-gray-50"><td className="py-1 text-gray-600">Contribution Margin</td><td className="py-1 text-right font-mono">{fmtFull(calc.cm)}/member</td></tr>
                      <tr className="border-b border-gray-50"><td className="py-1 text-gray-600">Location Basis</td><td className="py-1 text-right font-mono">South Florida</td></tr>
                    </tbody>
                  </table>
                  <p className="text-xs text-gray-400 mt-3">
                    Based on South Florida concierge practice benchmarks (Broward/Palm Beach/Miami-Dade).
                    Costs reflect premium medical office markets. Individual results vary by location,
                    specialty, and practice scope. See our{' '}
                    <Link to="/blog/cost-starting-concierge-medical-practice" className="text-blue-600 hover:underline">
                      startup cost guide
                    </Link>{' '}for detailed breakdowns.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ==================== CTA ==================== */}
        <div className="bg-[#1B365D] rounded-xl p-8 text-center text-white mb-8">
          <h2 className="text-2xl font-bold mb-3">Want to see your actual numbers?</h2>
          <p className="text-blue-100 mb-5 max-w-xl mx-auto">
            This simulator uses industry benchmarks. A Benefique fractional CFO engagement uses your actual
            QBO data, lease terms, staffing plan, and tax situation to build a model specific to your practice.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-[#1B365D] font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Schedule a Consultation
          </Link>
        </div>

        {/* ==================== RELATED ARTICLES ==================== */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-[#1B365D] mb-4">Related Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {RELATED_ARTICLES.map(a => (
              <Link
                key={a.slug}
                to={`/blog/${a.slug}`}
                className="bg-white rounded-lg border border-gray-200 p-3 hover:border-[#1B365D] hover:shadow-sm transition-all text-sm text-gray-700 hover:text-[#1B365D]"
              >
                {a.title}
              </Link>
            ))}
          </div>
        </div>

        {/* ==================== FOOTER NOTE ==================== */}
        <p className="text-xs text-gray-400 text-center">
          This tool is for educational purposes only and does not constitute financial or tax advice.
          Consult a qualified professional before making business decisions.
          &copy; {new Date().getFullYear()} Benefique Tax & Accounting, Davie, FL.
        </p>
      </div>
    </div>
  );
}
