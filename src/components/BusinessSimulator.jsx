import { useState, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// ============================================================
// INDUSTRY TEMPLATES
// ============================================================

const TEMPLATES = {
  radiology: {
    label: 'Radiology / Imaging Center',
    unit: 'scans',
    unitSingular: 'scan',
    stages: [
      { id: 'referrals', name: 'Referrals', desc: 'Patients referred to your center' },
      { id: 'scheduling', name: 'Scheduling', desc: 'Referrals that become appointments' },
      { id: 'imaging', name: 'Imaging', desc: 'Appointments that become completed scans' },
      { id: 'billing', name: 'Billing', desc: 'Scans submitted as clean claims' },
      { id: 'collections', name: 'Collections', desc: 'Claims that convert to cash' },
    ],
    defaults: {
      referralsPerMonth: 1200,
      schedulingRate: 0.85,     // 85% of referrals schedule
      noShowRate: 0.12,         // 12% no-show
      cleanClaimRate: 0.93,     // 93% clean claims
      collectionYield: 0.91,    // 91% collection yield
      avgRevenuePerUnit: 439,   // $/scan collected (JAX1 benchmark)
      directCostPerUnit: 65,    // COGS per scan (reads, supplies)
      payrollMonthly: 115000,   // techs, MAs, front desk, management
      marketingMonthly: 15000,
      facilityMonthly: 28000,   // rent, utilities, equipment leases
      insuranceMonthly: 8000,   // malpractice, liability, property
      techMonthly: 5000,        // EHR, PACS, IT
      accountingMonthly: 3000,  // Benefique service line
      otherFixedMonthly: 8000,  // supplies, maintenance, misc
      dsoAvgDays: 34,           // avg days to collect
      taxRate: 0.30,
      ownerDrawMonthly: 40000,
      debtServiceMonthly: 25000,
      // Payer mix (weights must sum to 1.0)
      payerMix: [
        { name: 'Payer A', weight: 0.25, reimbursement: 580, dso: 18, grade: 'A' },
        { name: 'Payer B', weight: 0.20, reimbursement: 490, dso: 22, grade: 'A' },
        { name: 'Payer C', weight: 0.25, reimbursement: 420, dso: 30, grade: 'B' },
        { name: 'Payer D', weight: 0.15, reimbursement: 350, dso: 35, grade: 'B' },
        { name: 'Payer E', weight: 0.10, reimbursement: 280, dso: 38, grade: 'C' },
        { name: 'Payer F', weight: 0.05, reimbursement: 150, dso: 41, grade: 'F' },
      ],
    },
  },
  services: {
    label: 'Professional Services',
    unit: 'engagements',
    unitSingular: 'engagement',
    stages: [
      { id: 'leads', name: 'Leads', desc: 'Inquiries and consultations' },
      { id: 'conversion', name: 'Conversion', desc: 'Leads that become engagements' },
      { id: 'delivery', name: 'Delivery', desc: 'Work performed (billable hours)' },
      { id: 'billing', name: 'Billing', desc: 'Work invoiced to clients' },
      { id: 'collections', name: 'Collections', desc: 'Invoices converted to cash' },
    ],
    defaults: {
      referralsPerMonth: 40,
      schedulingRate: 0.50,
      noShowRate: 0.05,
      cleanClaimRate: 0.95,
      collectionYield: 0.92,
      avgRevenuePerUnit: 3500,
      directCostPerUnit: 200,
      payrollMonthly: 65000,
      marketingMonthly: 5000,
      facilityMonthly: 12000,
      insuranceMonthly: 4000,
      techMonthly: 3000,
      accountingMonthly: 3000,
      otherFixedMonthly: 4000,
      dsoAvgDays: 45,
      taxRate: 0.30,
      ownerDrawMonthly: 25000,
      debtServiceMonthly: 5000,
      payerMix: [
        { name: 'Corporate', weight: 0.40, reimbursement: 4200, dso: 35, grade: 'A' },
        { name: 'SMB', weight: 0.35, reimbursement: 3200, dso: 45, grade: 'B' },
        { name: 'Individual', weight: 0.25, reimbursement: 2800, dso: 60, grade: 'C' },
      ],
    },
  },
  construction: {
    label: 'Marine / Construction / Field Services',
    unit: 'jobs',
    unitSingular: 'job',
    stages: [
      { id: 'leads', name: 'Leads', desc: 'Estimates and bids submitted' },
      { id: 'conversion', name: 'Conversion', desc: 'Bids accepted by customers' },
      { id: 'execution', name: 'Execution', desc: 'Jobs completed (materials + labor)' },
      { id: 'billing', name: 'Billing', desc: 'Jobs invoiced' },
      { id: 'collections', name: 'Collections', desc: 'Invoices collected' },
    ],
    defaults: {
      referralsPerMonth: 30,
      schedulingRate: 0.40,
      noShowRate: 0.08,
      cleanClaimRate: 0.90,
      collectionYield: 0.88,
      avgRevenuePerUnit: 8500,
      directCostPerUnit: 3400,
      payrollMonthly: 85000,
      marketingMonthly: 4000,
      facilityMonthly: 10000,
      insuranceMonthly: 6000,
      techMonthly: 2000,
      accountingMonthly: 3000,
      otherFixedMonthly: 5000,
      dsoAvgDays: 52,
      taxRate: 0.30,
      ownerDrawMonthly: 20000,
      debtServiceMonthly: 8000,
      payerMix: [
        { name: 'Commercial', weight: 0.50, reimbursement: 9200, dso: 45, grade: 'A' },
        { name: 'Government', weight: 0.20, reimbursement: 8000, dso: 65, grade: 'B' },
        { name: 'Residential', weight: 0.30, reimbursement: 7500, dso: 40, grade: 'B' },
      ],
    },
  },
};

// ============================================================
// COLORS
// ============================================================

const C = {
  navy: '#1B365D',
  teal: '#14B8A6',
  blue: '#3B82F6',
  green: '#10B981',
  red: '#EF4444',
  orange: '#F97316',
  purple: '#8B5CF6',
  amber: '#F59E0B',
  grid: '#E5E7EB',
  gridDark: '#9CA3AF',
  stageA: '#10B981',
  stageB: '#3B82F6',
  stageC: '#F59E0B',
  stageF: '#EF4444',
};

const RELATED_ARTICLES = [
  { slug: 'assembly-line-thinking-medical-practice-profitability', title: 'The Factory That Didn\'t Know It Was Losing Money' },
  { slug: 'high-cost-procedure-economics-medical-practice', title: '$2,940 Out the Door Before You Know If You\'ll Get Paid' },
  { slug: 'toxic-payers-losing-money-medical-practice', title: '7 Payers, 41 Procedures, $80,593 Lost' },
  { slug: 'per-unit-pnl-multi-location-cost-analysis', title: 'Same Owner, Same Industry, 3x Cost Difference' },
  { slug: 'fixed-cost-breakeven-volume-problem', title: 'The Fixed-Cost Break-Even Problem' },
  { slug: 'cash-flow-breakeven-per-patient-activity-units', title: 'Cash Flow Break-Even in Activity Units' },
  { slug: 'ai-cash-flow-waterfall-explained', title: 'How AI Found $1M in Profit Left Zero Cash' },
  { slug: 'cash-flow-waterfall-why-profit-doesnt-equal-cash', title: 'Cash Flow Waterfall: $454K Profit, $147K Deficit' },
];

// ============================================================
// FINANCIAL ENGINE
// ============================================================

function simulate(params) {
  const {
    referralsPerMonth, schedulingRate, noShowRate, cleanClaimRate, collectionYield,
    avgRevenuePerUnit, directCostPerUnit,
    payrollMonthly, marketingMonthly, facilityMonthly, insuranceMonthly,
    techMonthly, accountingMonthly, otherFixedMonthly,
    taxRate, ownerDrawMonthly, debtServiceMonthly, payerMix,
  } = params;

  // Stage 1: Referrals → Scheduled
  const scheduled = Math.round(referralsPerMonth * schedulingRate);

  // Stage 2: Scheduled → Completed (minus no-shows)
  const completed = Math.round(scheduled * (1 - noShowRate));

  // Stage 3: Completed → Clean claims
  const cleanClaims = Math.round(completed * cleanClaimRate);
  const deniedClaims = completed - cleanClaims;

  // Payer-weighted revenue per unit
  const weightedRevenue = payerMix.reduce((sum, p) => sum + p.weight * p.reimbursement, 0);
  const weightedDSO = payerMix.reduce((sum, p) => sum + p.weight * p.dso, 0);

  // Stage 4: Collections
  const collectedUnits = Math.round(cleanClaims * collectionYield);
  const effectiveUnits = collectedUnits; // units that produce cash

  // Revenue
  const grossRevenue = completed * weightedRevenue;
  const collectedRevenue = collectedUnits * weightedRevenue;

  // Costs
  const directCosts = completed * directCostPerUnit; // COGS on all completed
  const totalFixed = payrollMonthly + marketingMonthly + facilityMonthly +
    insuranceMonthly + techMonthly + accountingMonthly + otherFixedMonthly;

  // P&L
  const grossProfit = collectedRevenue - directCosts;
  const ebitda = grossProfit - totalFixed;
  const netIncome = ebitda; // before tax (S-Corp / pass-through)

  // Cash Flow Waterfall
  const estimatedTaxes = netIncome > 0 ? netIncome * taxRate : 0;
  const afterTax = netIncome - estimatedTaxes;
  const afterDraws = afterTax - ownerDrawMonthly;
  const afterDebt = afterDraws - debtServiceMonthly;

  // Working capital impact (DSO-based)
  const dailyRevenue = collectedRevenue / 30;
  const arBalance = dailyRevenue * weightedDSO;

  const netCashFlow = afterDebt;

  // Break-evens (in activity units)
  const contributionMargin = weightedRevenue - directCostPerUnit;
  const opBreakeven = contributionMargin > 0 ? Math.ceil(totalFixed / contributionMargin) : Infinity;
  const plBreakeven = opBreakeven; // same for pass-through entity
  const cfBreakeven = contributionMargin > 0
    ? Math.ceil((totalFixed + ownerDrawMonthly + debtServiceMonthly) / (contributionMargin * (1 - taxRate)))
    : Infinity;

  // Conversion funnel percentages
  const funnelEfficiency = referralsPerMonth > 0 ? (collectedUnits / referralsPerMonth * 100) : 0;

  // Per-unit economics
  const revenuePerUnit = completed > 0 ? collectedRevenue / completed : 0;
  const costPerUnit = completed > 0 ? (directCosts + totalFixed) / completed : 0;
  const marginPerUnit = revenuePerUnit - costPerUnit;

  // Payer profitability analysis
  const payerAnalysis = payerMix.map(p => {
    const unitCount = Math.round(completed * p.weight);
    const unitRevenue = p.reimbursement;
    const unitMargin = unitRevenue - costPerUnit;
    const totalContribution = unitMargin * unitCount;
    const capitalAtRisk = (unitRevenue * unitCount / 30) * p.dso;
    return {
      ...p,
      unitCount,
      unitMargin,
      totalContribution,
      capitalAtRisk,
      profitable: unitMargin > 0,
    };
  });

  const toxicPayers = payerAnalysis.filter(p => !p.profitable);
  const toxicLosses = toxicPayers.reduce((s, p) => s + Math.abs(p.totalContribution), 0);

  // P&L Waterfall
  const plWaterfall = [
    { label: 'Revenue', value: collectedRevenue, type: 'start' },
    { label: 'Direct Costs', value: -directCosts, type: 'cost' },
    { label: 'Payroll', value: -payrollMonthly, type: 'cost' },
    { label: 'Marketing', value: -marketingMonthly, type: 'cost' },
    { label: 'Facility', value: -facilityMonthly, type: 'cost' },
    { label: 'Insurance', value: -insuranceMonthly, type: 'cost' },
    { label: 'Tech & IT', value: -techMonthly, type: 'cost' },
    { label: 'Acct & CFO', value: -accountingMonthly, type: 'cost' },
    { label: 'Other', value: -otherFixedMonthly, type: 'cost' },
    { label: 'EBITDA', value: ebitda, type: 'total' },
  ];

  // Cash Flow Waterfall
  const cfWaterfall = [
    { label: 'EBITDA', value: ebitda, type: 'start' },
    { label: 'Est. Taxes', value: -estimatedTaxes, type: 'cost' },
    { label: 'Owner Draws', value: -ownerDrawMonthly, type: 'draw' },
    { label: 'Debt Service', value: -debtServiceMonthly, type: 'cost' },
    { label: 'Net Cash', value: netCashFlow, type: 'total' },
  ];

  return {
    // Funnel
    referralsPerMonth, scheduled, completed, cleanClaims, deniedClaims, collectedUnits,
    funnelEfficiency,
    // Financials
    grossRevenue, collectedRevenue, directCosts, totalFixed,
    grossProfit, ebitda, netIncome, estimatedTaxes, netCashFlow,
    ownerDrawMonthly, debtServiceMonthly,
    // Per-unit
    weightedRevenue, weightedDSO, contributionMargin,
    revenuePerUnit, costPerUnit, marginPerUnit,
    // Break-evens
    opBreakeven, plBreakeven, cfBreakeven,
    // Working capital
    arBalance, dailyRevenue,
    // Payer
    payerAnalysis, toxicPayers, toxicLosses,
    // Waterfalls
    plWaterfall, cfWaterfall,
  };
}

// ============================================================
// FORMATTING
// ============================================================

function fmtDollar(val) {
  const abs = Math.abs(val);
  if (abs >= 1000000) return (val < 0 ? '-' : '') + '$' + (abs / 1000000).toFixed(1) + 'M';
  if (abs >= 1000) return (val < 0 ? '-' : '') + '$' + (abs / 1000).toFixed(abs >= 10000 ? 0 : 1) + 'K';
  return (val < 0 ? '-' : '') + '$' + Math.round(abs).toLocaleString();
}

function fmtFull(val) {
  return (val < 0 ? '-' : '') + '$' + Math.abs(Math.round(val)).toLocaleString();
}

function fmtPct(val) {
  return (val * 100).toFixed(1) + '%';
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
// FUNNEL CHART (Assembly Line Visualization)
// ============================================================

function FunnelChart({ stages, values, unit }) {
  const W = 800, H = 200;
  const margin = { top: 20, right: 20, bottom: 50, left: 20 };
  const cw = W - margin.left - margin.right;
  const stageW = cw / stages.length;
  const maxVal = Math.max(...values, 1);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      {stages.map((stage, i) => {
        const x = margin.left + i * stageW;
        const val = values[i];
        const barH = (val / maxVal) * (H - margin.top - margin.bottom - 30);
        const y = H - margin.bottom - barH;
        const pct = i > 0 ? ((val / values[i - 1]) * 100).toFixed(0) : '100';
        const fill = i === stages.length - 1 ? C.teal : C.blue;
        const opacity = 0.5 + (i / stages.length) * 0.5;

        return (
          <g key={stage.id}>
            {/* Bar */}
            <rect x={x + stageW * 0.15} y={y} width={stageW * 0.7} height={barH}
              fill={fill} opacity={opacity} rx="4" />
            {/* Value */}
            <text x={x + stageW / 2} y={y - 8} textAnchor="middle" fontSize="13"
              fill="#1B365D" fontWeight="700">{val.toLocaleString()}</text>
            {/* Stage name */}
            <text x={x + stageW / 2} y={H - margin.bottom + 16} textAnchor="middle"
              fontSize="11" fill="#6B7280" fontWeight="500">{stage.name}</text>
            {/* Conversion arrow */}
            {i > 0 && (
              <text x={x + 2} y={H - margin.bottom + 34} textAnchor="middle"
                fontSize="10" fill={val / values[i - 1] < 0.8 ? C.orange : C.green}>
                {pct}%
              </text>
            )}
            {/* Arrow between stages */}
            {i < stages.length - 1 && (
              <path d={`M${x + stageW * 0.85 + 5},${H / 2} L${x + stageW * 1.15 - 5},${H / 2}`}
                stroke={C.gridDark} strokeWidth="1.5" markerEnd="url(#arrowhead)" />
            )}
          </g>
        );
      })}
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6" fill={C.gridDark} />
        </marker>
      </defs>
    </svg>
  );
}

// ============================================================
// WATERFALL CHART (Reused pattern from ConciergeSimulator)
// ============================================================

function WaterfallChart({ items, title }) {
  const W = 440, H = 340;
  const margin = { top: 35, right: 15, bottom: 80, left: 70 };
  const cw = W - margin.left - margin.right;
  const ch = H - margin.top - margin.bottom;

  let running = 0;
  const bars = items.map((item) => {
    let y1, y2;
    if (item.type === 'start') {
      y1 = 0; y2 = item.value; running = item.value;
    } else if (item.type === 'total') {
      y1 = 0; y2 = running;
    } else {
      const prev = running;
      running += item.value;
      y1 = prev; y2 = running;
    }
    return { ...item, y1, y2, running };
  });

  const allY = bars.flatMap(b => [b.y1, b.y2, 0]);
  let yMin = Math.min(...allY);
  let yMax = Math.max(...allY);
  const pad = (yMax - yMin) * 0.12 || 1;
  yMin -= pad; yMax += pad;

  const barCount = bars.length;
  const gap = 6;
  const barW = Math.min(44, (cw - gap * (barCount - 1)) / barCount);
  const totalBarsWidth = barCount * barW + (barCount - 1) * gap;
  const startX = margin.left + (cw - totalBarsWidth) / 2;
  const yScale = (v) => margin.top + ch - ((v - yMin) / (yMax - yMin)) * ch;
  const zeroY = yScale(0);

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <text x={W / 2} y={18} textAnchor="middle" fontSize="14" fill={C.navy} fontWeight="600">{title}</text>
        <line x1={margin.left} y1={zeroY} x2={W - margin.right} y2={zeroY}
          stroke={C.gridDark} strokeWidth="1" strokeDasharray="4,4" />
        {bars.map((bar, i) => {
          const x = startX + i * (barW + gap);
          const top = yScale(Math.max(bar.y1, bar.y2));
          const bottom = yScale(Math.min(bar.y1, bar.y2));
          const height = Math.max(bottom - top, 1);
          let fill;
          if (bar.type === 'start') fill = bar.value >= 0 ? C.green : C.red;
          else if (bar.type === 'total') fill = bar.y2 >= 0 ? C.navy : C.red;
          else if (bar.type === 'draw') fill = C.purple;
          else fill = C.red;
          const connector = i < bars.length - 1 && bar.type !== 'total';
          return (
            <g key={i}>
              <rect x={x} y={top} width={barW} height={height} fill={fill} rx="2" />
              <text x={x + barW / 2} y={bar.value >= 0 || bar.type === 'start' ? top - 5 : bottom + 13}
                textAnchor="middle" fontSize="9" fill="#374151" fontWeight="500">
                {fmtDollar(bar.value)}
              </text>
              <text x={x + barW / 2} y={H - margin.bottom + 15} textAnchor="end" fontSize="9"
                fill="#6B7280" transform={`rotate(-40, ${x + barW / 2}, ${H - margin.bottom + 15})`}>
                {bar.label}
              </text>
              {connector && (
                <line x1={x + barW} y1={yScale(bar.running)}
                  x2={startX + (i + 1) * (barW + gap)} y2={yScale(bar.running)}
                  stroke={C.grid} strokeWidth="1" strokeDasharray="3,3" />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ============================================================
// PAYER SCORECARD
// ============================================================

function PayerScorecard({ payerAnalysis, costPerUnit }) {
  const gradeColor = (g) => {
    if (g === 'A') return 'bg-emerald-100 text-emerald-800';
    if (g === 'B') return 'bg-blue-100 text-blue-800';
    if (g === 'C') return 'bg-amber-100 text-amber-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 px-2 text-gray-600 font-medium">Payer</th>
            <th className="text-center py-2 px-2 text-gray-600 font-medium">Grade</th>
            <th className="text-right py-2 px-2 text-gray-600 font-medium">$/Unit</th>
            <th className="text-right py-2 px-2 text-gray-600 font-medium">Margin</th>
            <th className="text-right py-2 px-2 text-gray-600 font-medium">Volume</th>
            <th className="text-right py-2 px-2 text-gray-600 font-medium">Total</th>
            <th className="text-right py-2 px-2 text-gray-600 font-medium">DSO</th>
          </tr>
        </thead>
        <tbody>
          {payerAnalysis.map((p, i) => (
            <tr key={i} className={`border-b border-gray-50 ${!p.profitable ? 'bg-red-50' : ''}`}>
              <td className="py-2 px-2 font-medium">{p.name}</td>
              <td className="py-2 px-2 text-center">
                <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${gradeColor(p.grade)}`}>
                  {p.grade}
                </span>
              </td>
              <td className="py-2 px-2 text-right font-mono">{fmtFull(p.reimbursement)}</td>
              <td className={`py-2 px-2 text-right font-mono ${p.profitable ? 'text-emerald-600' : 'text-red-600 font-bold'}`}>
                {fmtFull(p.unitMargin)}
              </td>
              <td className="py-2 px-2 text-right font-mono">{p.unitCount}</td>
              <td className={`py-2 px-2 text-right font-mono ${p.profitable ? '' : 'text-red-600 font-bold'}`}>
                {fmtFull(p.totalContribution)}
              </td>
              <td className="py-2 px-2 text-right font-mono">{p.dso}d</td>
            </tr>
          ))}
          <tr className="font-semibold border-t-2 border-gray-300">
            <td className="py-2 px-2" colSpan="2">Cost per unit</td>
            <td className="py-2 px-2 text-right font-mono">{fmtFull(costPerUnit)}</td>
            <td colSpan="4" className="py-2 px-2 text-right text-xs text-gray-500">
              (direct + allocated overhead)
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ============================================================
// SCENARIO COMPARISON
// ============================================================

function ScenarioComparison({ baseline, current, unit }) {
  const rows = [
    { label: `Completed ${unit}/mo`, base: baseline.completed, curr: current.completed },
    { label: 'Collected Revenue', base: baseline.collectedRevenue, curr: current.collectedRevenue, dollar: true },
    { label: 'EBITDA', base: baseline.ebitda, curr: current.ebitda, dollar: true },
    { label: 'Net Cash Flow', base: baseline.netCashFlow, curr: current.netCashFlow, dollar: true },
    { label: 'P&L Break-Even', base: baseline.opBreakeven, curr: current.opBreakeven, suffix: ` ${unit}` },
    { label: 'CF Break-Even', base: baseline.cfBreakeven, curr: current.cfBreakeven, suffix: ` ${unit}` },
    { label: 'AR Balance', base: baseline.arBalance, curr: current.arBalance, dollar: true },
    { label: 'Toxic Payer Losses', base: baseline.toxicLosses, curr: current.toxicLosses, dollar: true, invert: true },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 px-2 text-gray-600 font-medium">Metric</th>
            <th className="text-right py-2 px-2 text-gray-500 font-medium">Baseline</th>
            <th className="text-right py-2 px-2 text-gray-600 font-medium">Current</th>
            <th className="text-right py-2 px-2 text-gray-600 font-medium">Impact</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const delta = r.curr - r.base;
            const improved = r.invert ? delta < 0 : delta > 0;
            const fmt = r.dollar ? fmtFull : (v) => (v === Infinity ? 'N/A' : v.toLocaleString() + (r.suffix || ''));
            const fmtDelta = r.dollar ? fmtFull : (v) => (v > 0 ? '+' : '') + v.toLocaleString() + (r.suffix || '');
            return (
              <tr key={i} className="border-b border-gray-50">
                <td className="py-2 px-2 text-gray-700">{r.label}</td>
                <td className="py-2 px-2 text-right font-mono text-gray-400">{fmt(r.base)}</td>
                <td className="py-2 px-2 text-right font-mono">{fmt(r.curr)}</td>
                <td className={`py-2 px-2 text-right font-mono font-semibold ${
                  Math.abs(delta) < 1 ? 'text-gray-400' : improved ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {Math.abs(delta) < 1 ? '—' : fmtDelta(delta)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================
// SLIDER CONTROL
// ============================================================

function SliderControl({ label, value, min, max, step, onChange, format, color, desc }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <label className="text-xs font-medium text-gray-600">{label}</label>
        <span className="text-sm font-mono font-semibold text-gray-800">
          {format ? format(value) : value}
        </span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, ${color || C.navy} ${pct}%, #E5E7EB ${pct}%)`,
          accentColor: color || C.navy,
        }}
      />
      {desc && <div className="text-xs text-gray-400 mt-0.5">{desc}</div>}
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

export default function BusinessSimulator() {
  const [templateKey, setTemplateKey] = useState('radiology');
  const template = TEMPLATES[templateKey];
  const d = template.defaults;

  // Core volume
  const [referrals, setReferrals] = useState(d.referralsPerMonth);
  const [schedulingRate, setSchedulingRate] = useState(d.schedulingRate);
  const [noShowRate, setNoShowRate] = useState(d.noShowRate);
  const [cleanClaimRate, setCleanClaimRate] = useState(d.cleanClaimRate);
  const [collectionYield, setCollectionYield] = useState(d.collectionYield);

  // Revenue per unit
  const [avgRevenue, setAvgRevenue] = useState(d.avgRevenuePerUnit);
  const [directCost, setDirectCost] = useState(d.directCostPerUnit);

  // Fixed costs
  const [payroll, setPayroll] = useState(d.payrollMonthly);
  const [marketing, setMarketing] = useState(d.marketingMonthly);
  const [facility, setFacility] = useState(d.facilityMonthly);
  const [insurance, setInsurance] = useState(d.insuranceMonthly);
  const [tech, setTech] = useState(d.techMonthly);
  const [accounting, setAccounting] = useState(d.accountingMonthly);
  const [otherFixed, setOtherFixed] = useState(d.otherFixedMonthly);

  // Cash flow
  const [taxRate, setTaxRate] = useState(d.taxRate);
  const [ownerDraw, setOwnerDraw] = useState(d.ownerDrawMonthly);
  const [debtService, setDebtService] = useState(d.debtServiceMonthly);

  // Payer mix (keep default for now — editable via weight sliders)
  const [payerMix, setPayerMix] = useState(d.payerMix);

  // UI state
  const [showCosts, setShowCosts] = useState(false);
  const [showPayers, setShowPayers] = useState(false);
  const [activeSection, setActiveSection] = useState('funnel'); // funnel | payers | scenarios

  // Template switch handler
  const handleTemplateChange = useCallback((key) => {
    const t = TEMPLATES[key];
    const dd = t.defaults;
    setTemplateKey(key);
    setReferrals(dd.referralsPerMonth);
    setSchedulingRate(dd.schedulingRate);
    setNoShowRate(dd.noShowRate);
    setCleanClaimRate(dd.cleanClaimRate);
    setCollectionYield(dd.collectionYield);
    setAvgRevenue(dd.avgRevenuePerUnit);
    setDirectCost(dd.directCostPerUnit);
    setPayroll(dd.payrollMonthly);
    setMarketing(dd.marketingMonthly);
    setFacility(dd.facilityMonthly);
    setInsurance(dd.insuranceMonthly);
    setTech(dd.techMonthly);
    setAccounting(dd.accountingMonthly);
    setOtherFixed(dd.otherFixedMonthly);
    setTaxRate(dd.taxRate);
    setOwnerDraw(dd.ownerDrawMonthly);
    setDebtService(dd.debtServiceMonthly);
    setPayerMix(dd.payerMix);
  }, []);

  // Payer weight adjustment (keeps weights summing to 1)
  const updatePayerWeight = useCallback((index, newWeight) => {
    setPayerMix(prev => {
      const updated = [...prev];
      const oldWeight = updated[index].weight;
      const diff = newWeight - oldWeight;
      if (Math.abs(diff) < 0.001) return prev;

      // Distribute the difference proportionally across other payers
      const othersTotal = 1 - oldWeight;
      updated[index] = { ...updated[index], weight: newWeight };
      if (othersTotal > 0) {
        for (let i = 0; i < updated.length; i++) {
          if (i !== index) {
            const share = prev[i].weight / othersTotal;
            updated[i] = { ...updated[i], weight: Math.max(0, prev[i].weight - diff * share) };
          }
        }
      }
      // Normalize to ensure sum = 1
      const sum = updated.reduce((s, p) => s + p.weight, 0);
      if (sum > 0) {
        for (let i = 0; i < updated.length; i++) {
          updated[i] = { ...updated[i], weight: updated[i].weight / sum };
        }
      }
      return updated;
    });
  }, []);

  // Build params
  const params = useMemo(() => ({
    referralsPerMonth: referrals, schedulingRate, noShowRate, cleanClaimRate, collectionYield,
    avgRevenuePerUnit: avgRevenue, directCostPerUnit: directCost,
    payrollMonthly: payroll, marketingMonthly: marketing, facilityMonthly: facility,
    insuranceMonthly: insurance, techMonthly: tech, accountingMonthly: accounting,
    otherFixedMonthly: otherFixed,
    taxRate, ownerDrawMonthly: ownerDraw, debtServiceMonthly: debtService,
    payerMix,
  }), [referrals, schedulingRate, noShowRate, cleanClaimRate, collectionYield,
    avgRevenue, directCost, payroll, marketing, facility, insurance, tech, accounting,
    otherFixed, taxRate, ownerDraw, debtService, payerMix]);

  const calc = useMemo(() => simulate(params), [params]);

  // Baseline = template defaults for comparison
  const baseline = useMemo(() => simulate({
    referralsPerMonth: d.referralsPerMonth, schedulingRate: d.schedulingRate,
    noShowRate: d.noShowRate, cleanClaimRate: d.cleanClaimRate, collectionYield: d.collectionYield,
    avgRevenuePerUnit: d.avgRevenuePerUnit, directCostPerUnit: d.directCostPerUnit,
    payrollMonthly: d.payrollMonthly, marketingMonthly: d.marketingMonthly,
    facilityMonthly: d.facilityMonthly, insuranceMonthly: d.insuranceMonthly,
    techMonthly: d.techMonthly, accountingMonthly: d.accountingMonthly,
    otherFixedMonthly: d.otherFixedMonthly, taxRate: d.taxRate,
    ownerDrawMonthly: d.ownerDrawMonthly, debtServiceMonthly: d.debtServiceMonthly,
    payerMix: d.payerMix,
  }), [d]);

  const hasChanges = JSON.stringify(params) !== JSON.stringify({
    referralsPerMonth: d.referralsPerMonth, schedulingRate: d.schedulingRate,
    noShowRate: d.noShowRate, cleanClaimRate: d.cleanClaimRate, collectionYield: d.collectionYield,
    avgRevenuePerUnit: d.avgRevenuePerUnit, directCostPerUnit: d.directCostPerUnit,
    payrollMonthly: d.payrollMonthly, marketingMonthly: d.marketingMonthly,
    facilityMonthly: d.facilityMonthly, insuranceMonthly: d.insuranceMonthly,
    techMonthly: d.techMonthly, accountingMonthly: d.accountingMonthly,
    otherFixedMonthly: d.otherFixedMonthly, taxRate: d.taxRate,
    ownerDrawMonthly: d.ownerDrawMonthly, debtServiceMonthly: d.debtServiceMonthly,
    payerMix: d.payerMix,
  });

  // Funnel values for chart
  const funnelValues = [
    calc.referralsPerMonth,
    calc.scheduled,
    calc.completed,
    calc.cleanClaims,
    calc.collectedUnits,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Helmet>
        <title>Business Simulator | Benefique Intelligence(TM)</title>
        <meta name="description" content="Interactive business simulator: decompose your business into an assembly line, change any input, and watch P&L and cash flow recompute in real time. See break-even in activity units, payer profitability, and scenario comparisons." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.benefique.com/tools/business-simulator" />
        <meta property="og:title" content="Business Simulator | Benefique Intelligence" />
        <meta property="og:description" content="See your business as a factory. Change any input. Watch the cash flow. The budget that updates itself." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.benefique.com/tools/business-simulator" />
      </Helmet>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-4 text-center">
        <Link to="/" className="text-sm text-blue-600 hover:underline mb-3 inline-block">&larr; Back to Benefique</Link>
        <div className="inline-block px-3 py-1 bg-teal-100 text-teal-800 text-xs font-bold rounded-full mb-3 tracking-wide">
          BENEFIQUE INTELLIGENCE
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1B365D] mb-2">
          Activity-Based Business Simulator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-base">
          Every business is a factory. Decompose yours into stages. Change any input. Watch the entire
          P&L and cash flow recompute. See which levers move profit and which move cash.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-16">

        {/* ==================== INDUSTRY SELECTOR ==================== */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {Object.entries(TEMPLATES).map(([key, t]) => (
            <button key={key} onClick={() => handleTemplateChange(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                templateKey === key
                  ? 'bg-[#1B365D] text-white border-[#1B365D]'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-[#1B365D]'
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ==================== ASSEMBLY LINE CONTROLS ==================== */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-5">
          <h2 className="text-sm font-bold text-[#1B365D] uppercase tracking-wide mb-4">
            Assembly Line Controls
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1">
            <SliderControl label={`${template.stages[0].name} / Month`}
              value={referrals} min={0} max={Math.max(3000, referrals * 2)} step={10}
              onChange={setReferrals} format={(v) => v.toLocaleString()} color={C.blue} />
            <SliderControl label="Scheduling Rate"
              value={schedulingRate} min={0.3} max={1.0} step={0.01}
              onChange={setSchedulingRate} format={fmtPct} color={C.blue} />
            <SliderControl label="No-Show Rate"
              value={noShowRate} min={0} max={0.40} step={0.01}
              onChange={setNoShowRate} format={fmtPct} color={C.orange} />
            <SliderControl label="Avg Revenue / Unit"
              value={avgRevenue} min={50} max={Math.max(15000, avgRevenue * 2)} step={10}
              onChange={setAvgRevenue} format={fmtFull} color={C.green} />
            <SliderControl label="Direct Cost / Unit"
              value={directCost} min={0} max={Math.max(5000, directCost * 3)} step={5}
              onChange={setDirectCost} format={fmtFull} color={C.red} />
            <SliderControl label="Clean Claim Rate"
              value={cleanClaimRate} min={0.6} max={1.0} step={0.01}
              onChange={setCleanClaimRate} format={fmtPct} color={C.teal} />
            <SliderControl label="Collection Yield"
              value={collectionYield} min={0.5} max={1.0} step={0.01}
              onChange={setCollectionYield} format={fmtPct} color={C.teal} />
          </div>

          {/* Expandable cost controls */}
          <button onClick={() => setShowCosts(!showCosts)}
            className="mt-3 text-sm text-gray-500 hover:text-[#1B365D] underline">
            {showCosts ? 'Hide' : 'Show'} Fixed Costs & Cash Flow Controls
          </button>
          {showCosts && (
            <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1">
              <SliderControl label="Payroll / Month" value={payroll} min={0} max={300000} step={1000}
                onChange={setPayroll} format={fmtFull} color={C.purple} />
              <SliderControl label="Marketing / Month" value={marketing} min={0} max={50000} step={500}
                onChange={setMarketing} format={fmtFull} color={C.amber} />
              <SliderControl label="Facility / Month" value={facility} min={0} max={80000} step={500}
                onChange={setFacility} format={fmtFull} color={C.red} />
              <SliderControl label="Insurance / Month" value={insurance} min={0} max={25000} step={250}
                onChange={setInsurance} format={fmtFull} color={C.red} />
              <SliderControl label="Tech & IT / Month" value={tech} min={0} max={15000} step={250}
                onChange={setTech} format={fmtFull} color={C.blue} />
              <SliderControl label="Accounting & CFO / Month" value={accounting} min={0} max={10000} step={250}
                onChange={setAccounting} format={fmtFull} color={C.teal} />
              <SliderControl label="Other Fixed / Month" value={otherFixed} min={0} max={30000} step={500}
                onChange={setOtherFixed} format={fmtFull} color={C.gridDark} />
              <div className="col-span-full border-t border-gray-100 pt-3 mt-1" />
              <SliderControl label="Owner Draws / Month" value={ownerDraw} min={0} max={100000} step={1000}
                onChange={setOwnerDraw} format={fmtFull} color={C.purple}
                desc="Distributions to owner(s)" />
              <SliderControl label="Debt Service / Month" value={debtService} min={0} max={80000} step={500}
                onChange={setDebtService} format={fmtFull} color={C.red}
                desc="Loan payments, equipment financing" />
              <SliderControl label="Estimated Tax Rate" value={taxRate} min={0} max={0.45} step={0.01}
                onChange={setTaxRate} format={fmtPct} color={C.orange} />
            </div>
          )}
        </div>

        {/* ==================== KEY METRICS ==================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          <MetricCard label={`Completed ${template.unit}/mo`}
            value={calc.completed.toLocaleString()} />
          <MetricCard label="Monthly Revenue"
            value={fmtFull(calc.collectedRevenue)}
            sub={`${fmtFull(calc.collectedRevenue * 12)}/yr`} />
          <MetricCard label="EBITDA"
            value={fmtFull(calc.ebitda)}
            sub={`${fmtFull(calc.ebitda * 12)}/yr`}
            positive={calc.ebitda >= 0} />
          <MetricCard label="Net Cash Flow"
            value={fmtFull(calc.netCashFlow)}
            sub={`${fmtFull(calc.netCashFlow * 12)}/yr`}
            positive={calc.netCashFlow >= 0} />
        </div>

        {/* Break-evens */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
            <div className="text-xs text-gray-500 uppercase tracking-wide">Operating Break-Even</div>
            <div className="text-lg font-bold text-orange-500">
              {calc.opBreakeven === Infinity ? 'N/A' : `${calc.opBreakeven} ${template.unit}`}
            </div>
            <div className="text-xs text-gray-400">Covers fixed + variable costs</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
            <div className="text-xs text-gray-500 uppercase tracking-wide">Cash Flow Break-Even</div>
            <div className="text-lg font-bold text-teal-600">
              {calc.cfBreakeven === Infinity ? 'N/A' : `${calc.cfBreakeven} ${template.unit}`}
            </div>
            <div className="text-xs text-gray-400">Covers costs + draws + debt + taxes</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
            <div className="text-xs text-gray-500 uppercase tracking-wide">The Gap</div>
            <div className="text-lg font-bold text-red-500">
              {calc.cfBreakeven === Infinity || calc.opBreakeven === Infinity
                ? 'N/A'
                : `+${calc.cfBreakeven - calc.opBreakeven} ${template.unit}`}
            </div>
            <div className="text-xs text-gray-400">Extra volume needed for real cash</div>
          </div>
        </div>

        {/* ==================== FUNNEL CHART ==================== */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-5">
          <h2 className="text-lg font-bold text-[#1B365D] text-center mb-1">
            Your Assembly Line
          </h2>
          <p className="text-sm text-gray-500 text-center mb-3">
            {calc.referralsPerMonth.toLocaleString()} {template.stages[0].name.toLowerCase()} enter
            &rarr; {calc.collectedUnits.toLocaleString()} paid {template.unit} exit
            ({calc.funnelEfficiency.toFixed(1)}% efficiency)
          </p>
          <FunnelChart stages={template.stages} values={funnelValues} unit={template.unit} />
        </div>

        {/* ==================== PER-UNIT ECONOMICS ==================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          <MetricCard label={`Revenue / ${template.unitSingular}`}
            value={fmtFull(calc.revenuePerUnit)} />
          <MetricCard label={`Cost / ${template.unitSingular}`}
            value={fmtFull(calc.costPerUnit)} />
          <MetricCard label={`Margin / ${template.unitSingular}`}
            value={fmtFull(calc.marginPerUnit)}
            positive={calc.marginPerUnit >= 0} />
          <MetricCard label="AR Balance (trapped cash)"
            value={fmtFull(calc.arBalance)}
            sub={`${Math.round(calc.weightedDSO)} day avg DSO`} />
        </div>

        {/* ==================== WATERFALL CHARTS ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <WaterfallChart items={calc.plWaterfall} title="P&L Waterfall — Where Revenue Goes" />
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <WaterfallChart items={calc.cfWaterfall} title="Cash Flow Waterfall — What Reaches the Bank" />
          </div>
        </div>

        {/* ==================== INSIGHT CALLOUTS ==================== */}
        {calc.ebitda > 0 && calc.netCashFlow < 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-5">
            <h3 className="font-bold text-amber-800 mb-2">The Profit-Cash Disconnect</h3>
            <p className="text-amber-700 text-sm">
              Your business shows <span className="font-semibold">{fmtFull(calc.ebitda)}/mo EBITDA</span> — but
              your bank account is <span className="font-semibold text-red-600">shrinking by {fmtFull(Math.abs(calc.netCashFlow))}/mo</span>.
              Taxes ({fmtFull(calc.estimatedTaxes)}), owner draws ({fmtFull(calc.ownerDrawMonthly)}),
              and debt service ({fmtFull(calc.debtServiceMonthly)}) consume more than your operating profit.
              You need <span className="font-semibold">{calc.cfBreakeven - calc.completed} more {template.unit}/mo</span> to
              reach cash flow break-even — or reduce draws/debt by{' '}
              <span className="font-semibold">{fmtFull(Math.abs(calc.netCashFlow))}/mo</span>.
            </p>
          </div>
        )}

        {calc.toxicLosses > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-5">
            <h3 className="font-bold text-red-800 mb-2">
              Toxic Payers: {fmtFull(calc.toxicLosses)}/mo in Losses
            </h3>
            <p className="text-red-700 text-sm">
              {calc.toxicPayers.length} payer{calc.toxicPayers.length > 1 ? 's' : ''} reimburse{calc.toxicPayers.length === 1 ? 's' : ''} below
              your cost per {template.unitSingular} ({fmtFull(calc.costPerUnit)}). Every {template.unitSingular} from{' '}
              {calc.toxicPayers.map(p => p.name).join(', ')} loses money.
              That is <span className="font-semibold">{fmtFull(calc.toxicLosses * 12)}/year</span> subsidized
              by your profitable payers. Eliminating these losses adds directly to cash flow.
            </p>
          </div>
        )}

        {/* ==================== TABBED SECTIONS ==================== */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-5">
          <div className="flex border-b border-gray-200">
            {[
              { key: 'payers', label: 'Payer Scorecard' },
              { key: 'scenarios', label: 'Scenario Comparison' },
            ].map(tab => (
              <button key={tab.key} onClick={() => setActiveSection(tab.key)}
                className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeSection === tab.key
                    ? 'border-[#1B365D] text-[#1B365D]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-4">
            {activeSection === 'payers' && (
              <>
                <p className="text-sm text-gray-500 mb-3">
                  Each payer graded against your all-in cost of {fmtFull(calc.costPerUnit)} per {template.unitSingular}.
                  Adjust mix below to see how shifting volume between payers changes your P&L.
                </p>
                <PayerScorecard payerAnalysis={calc.payerAnalysis} costPerUnit={calc.costPerUnit} />
                {/* Payer weight sliders */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">Adjust Payer Mix</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1">
                    {payerMix.map((p, i) => (
                      <SliderControl key={i} label={`${p.name} (${(p.weight * 100).toFixed(0)}%)`}
                        value={p.weight} min={0} max={0.80} step={0.01}
                        onChange={(v) => updatePayerWeight(i, v)}
                        format={(v) => (v * 100).toFixed(0) + '%'}
                        color={p.grade === 'A' ? C.stageA : p.grade === 'B' ? C.stageB : p.grade === 'C' ? C.stageC : C.stageF} />
                    ))}
                  </div>
                </div>
              </>
            )}
            {activeSection === 'scenarios' && (
              <>
                <p className="text-sm text-gray-500 mb-3">
                  {hasChanges
                    ? 'Comparing your current settings against the industry baseline. Every change you made is reflected below.'
                    : 'Adjust any slider above to see how it impacts your business vs. the industry baseline.'}
                </p>
                <ScenarioComparison baseline={baseline} current={calc} unit={template.unit} />
              </>
            )}
          </div>
        </div>

        {/* ==================== CTA ==================== */}
        <div className="bg-[#1B365D] rounded-xl p-8 text-center text-white mb-6">
          <h2 className="text-2xl font-bold mb-3">Want to see your actual numbers?</h2>
          <p className="text-blue-100 mb-5 max-w-xl mx-auto">
            This simulator uses industry benchmarks. A Benefique fractional CFO engagement
            connects to your actual QBO data, maps your real payer contracts, and builds a model
            specific to your business. One conversation. Your data. The answers are already in your system.
          </p>
          <Link to="/contact"
            className="inline-block bg-white text-[#1B365D] font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
            Schedule a Consultation
          </Link>
        </div>

        {/* ==================== RELATED ARTICLES ==================== */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-[#1B365D] mb-3">Related Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {RELATED_ARTICLES.map(a => (
              <Link key={a.slug} to={`/blog/${a.slug}`}
                className="bg-white rounded-lg border border-gray-200 p-3 hover:border-[#1B365D] hover:shadow-sm transition-all text-sm text-gray-700 hover:text-[#1B365D]">
                {a.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center">
          This tool is for educational purposes only and does not constitute financial or tax advice.
          Industry benchmarks are illustrative. Consult a qualified professional before making business decisions.
          &copy; {new Date().getFullYear()} Benefique Tax & Accounting, Davie, FL.
        </p>
      </div>
    </div>
  );
}
