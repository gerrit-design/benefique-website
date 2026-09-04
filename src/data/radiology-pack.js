// radiology-pack.js — data behind /radiology/intelligence-pack
//
// EVERY FIGURE ON THAT PAGE IS ILLUSTRATIVE AND SYNTHETIC.
// "Meridian Imaging Partners" is a fictional composite. No client data, no
// payer names, no patient data and no tracer brand names appear here or on
// the rendered page. What is real is the METHOD: the report library, the
// metric definitions, and the way the cuts reconcile to one another.
//
// The whole model is driven off ONE matrix — scans by center by payer rail —
// so every total, average, share and spread on the page is COMPUTED from it.
// Nothing is typed twice, so no figure can be edited into disagreement with
// the table beside it.

export const PACK_GROUP_NAME = 'Meridian Imaging Partners';

// A rail is a way money travels, not a company. Net $ is collected dollars per
// completed scan; DSO is days from date of service to cash.
export const packRails = [
  { key: 'pi', label: 'PI / letter-of-protection rail', netPerScan: 551, dsoDays: 412 },
  { key: 'commA', label: 'Commercial rail A', netPerScan: 441, dsoDays: 44 },
  { key: 'commB', label: 'Commercial rail B', netPerScan: 421, dsoDays: 39 },
  { key: 'wc', label: 'Workers compensation rail', netPerScan: 392, dsoDays: 71 },
  { key: 'gov', label: 'Government rail', netPerScan: 213, dsoDays: 22 },
  { key: 'sp', label: 'Self-pay / time-of-service', netPerScan: 206, dsoDays: 3 },
];

// Completed scans, one year, by center by rail. The only hand-entered volumes.
export const packCenters = [
  { name: 'Northgate', scans: { pi: 4600, commA: 6100, commB: 3300, wc: 1200, gov: 2500, sp: 700 } },
  { name: 'Riverside', scans: { pi: 2400, commA: 4900, commB: 2900, wc: 900, gov: 3100, sp: 700 } },
  { name: 'Parkview', scans: { pi: 1100, commA: 3000, commB: 2100, wc: 600, gov: 3800, sp: 600 } },
  { name: 'Lakeside', scans: { pi: 500, commA: 1900, commB: 1500, wc: 400, gov: 4800, sp: 500 } },
];

const railByKey = Object.fromEntries(packRails.map((r) => [r.key, r]));

function centerTotals(center) {
  let scans = 0;
  let net = 0;
  for (const [key, n] of Object.entries(center.scans)) {
    scans += n;
    net += n * railByKey[key].netPerScan;
  }
  return { scans, net, netPerScan: net / scans, govShare: center.scans.gov / scans };
}

export const packCenterRows = packCenters
  .map((c) => ({ name: c.name, ...centerTotals(c) }))
  .sort((a, b) => b.netPerScan - a.netPerScan);

export const packRailRows = packRails.map((rail) => {
  const scans = packCenters.reduce((sum, c) => sum + c.scans[rail.key], 0);
  return { ...rail, scans, net: scans * rail.netPerScan };
});

const totalScans = packRailRows.reduce((s, r) => s + r.scans, 0);
const totalNet = packRailRows.reduce((s, r) => s + r.net, 0);

export const packTotals = {
  centers: packCenters.length,
  scans: totalScans,
  net: totalNet,
  netPerScan: totalNet / totalScans,
  blendedDso: packRailRows.reduce((s, r) => s + r.scans * r.dsoDays, 0) / totalScans,
};

export const packRailRowsWithShare = packRailRows.map((r) => ({
  ...r,
  share: r.scans / totalScans,
}));

// Rails ordered fastest-to-slowest, accumulated until they cover at least half
// the group's scans. NOTE what this is and is not: these are rail-level AVERAGE
// days to cash, so this supports "the rails carrying N% of scans average D days
// or less" — it is NOT a percentile of a payment-time distribution and must
// never be worded as "half the scans are cash within D days". The model has no
// per-claim payment dates and cannot support that claim.
export const packFastRails = (() => {
  const bySpeed = [...packRailRows].sort((a, b) => a.dsoDays - b.dsoDays);
  let cumulative = 0;
  for (const rail of bySpeed) {
    cumulative += rail.scans;
    if (cumulative >= totalScans / 2) {
      return { avgDays: rail.dsoDays, share: cumulative / totalScans };
    }
  }
  const last = bySpeed[bySpeed.length - 1];
  return { avgDays: last.dsoDays, share: 1 };
})();

const best = packCenterRows[0];
const worst = packCenterRows[packCenterRows.length - 1];

export const packSpread = {
  bestName: best.name,
  worstName: worst.name,
  bestNetPerScan: best.netPerScan,
  worstNetPerScan: worst.netPerScan,
  worstScans: worst.scans,
  gapPerScan: best.netPerScan - worst.netPerScan,
  multiple: best.netPerScan / worst.netPerScan,
  bestGovShare: best.govShare,
  worstGovShare: worst.govShare,
  // What the weakest center's own volume would have produced on the strongest
  // center's mix, at identical rail economics. Mix, not billing performance.
  mixGapAnnual: (best.netPerScan - worst.netPerScan) * worst.scans,
};

// Shared formatter + headline so the page H1 and the prerendered H1 are the
// same string. A crawler and a reader must never see different headlines.
export const packMoney2 = (n) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const packHeadline = `Four Centers. Identical Payer Terms. $${Math.round(
  packSpread.mixGapAnnual
).toLocaleString('en-US')} a Year Between Two of Them.`;
