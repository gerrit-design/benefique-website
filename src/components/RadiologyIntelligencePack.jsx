import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  packCenterRows,
  packRailRowsWithShare,
  packTotals,
  packHeadline,
} from '../data/radiology-pack';
import { packLibrary, packFaqs, packSchema, packProse } from '../data/radiology-pack-content';

const money = (n) => `$${Math.round(n).toLocaleString('en-US')}`;
const money2 = (n) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const num = (n) => n.toLocaleString('en-US');
const pct = (n, d = 1) => `${(n * 100).toFixed(d)}%`;

/** Render a shared prose segment array, bolding the marked spans. */
const Prose = ({ segments }) =>
  segments.map((seg, i) =>
    seg.b ? <strong key={i}>{seg.t}</strong> : <React.Fragment key={i}>{seg.t}</React.Fragment>
  );

function SyntheticBadge() {
  return (
    <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold">
      <span aria-hidden="true">&#9888;</span> {packProse.badge}
    </div>
  );
}

export default function RadiologyIntelligencePack() {
  return (
    <div>
      <Helmet>
        <title>The Radiology Intelligence Pack | What a Benefique Imaging Engagement Delivers</title>
        <meta
          name="description"
          content="A worked, fully illustrative example of the reporting an independent imaging group gets from Benefique: net revenue per scan by center, DSO by payer rail, and the full report library. Synthetic data, real method."
        />
        <link rel="canonical" href="https://www.benefique.com/radiology/intelligence-pack" />
        <script type="application/ld+json">{JSON.stringify(packSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-6">
            <SyntheticBadge />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-benefique-navy leading-tight mb-4">
            {packHeadline}
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl">{packProse.lede}</p>
          <div className="bg-gray-50 border-l-4 border-benefique-orange p-6 rounded-r-xl max-w-3xl">
            <p className="text-lg text-gray-700 leading-relaxed">
              <Prose segments={packProse.disclaimer} />
            </p>
          </div>
        </div>
      </section>

      {/* The composite at a glance */}
      <section className="py-12 bg-benefique-navy text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">{packProse.bookHeading}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-benefique-orange mb-1">{packTotals.centers}</div>
              <div className="text-sm text-blue-100">Centers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-benefique-orange mb-1">{num(packTotals.scans)}</div>
              <div className="text-sm text-blue-100">Completed scans a year</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-benefique-orange mb-1">{money(packTotals.net)}</div>
              <div className="text-sm text-blue-100">Net collected</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-benefique-orange mb-1">{money2(packTotals.netPerScan)}</div>
              <div className="text-sm text-blue-100">Net per completed scan</div>
            </div>
          </div>
        </div>
      </section>

      {/* Worked example 1 */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-benefique-navy mb-3">{packProse.ex1Heading}</h2>
          <p className="text-gray-600 max-w-3xl mb-8">{packProse.ex1Intro}</p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="p-3 font-semibold text-benefique-navy border-b">Center</th>
                  <th className="p-3 font-semibold text-benefique-navy border-b text-right">Completed scans</th>
                  <th className="p-3 font-semibold text-benefique-navy border-b text-right">Net collected</th>
                  <th className="p-3 font-semibold text-benefique-navy border-b text-right">Net per scan</th>
                  <th className="p-3 font-semibold text-benefique-navy border-b text-right">Government rail share</th>
                </tr>
              </thead>
              <tbody>
                {packCenterRows.map((c) => (
                  <tr key={c.name} className="border-b border-gray-100">
                    <td className="p-3 font-medium text-benefique-navy">{c.name}</td>
                    <td className="p-3 text-right text-gray-700">{num(c.scans)}</td>
                    <td className="p-3 text-right text-gray-700">{money(c.net)}</td>
                    <td className="p-3 text-right font-semibold text-benefique-navy">{money2(c.netPerScan)}</td>
                    <td className="p-3 text-right text-gray-700">{pct(c.govShare)}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-semibold">
                  <td className="p-3 text-benefique-navy">Group</td>
                  <td className="p-3 text-right text-benefique-navy">{num(packTotals.scans)}</td>
                  <td className="p-3 text-right text-benefique-navy">{money(packTotals.net)}</td>
                  <td className="p-3 text-right text-benefique-navy">{money2(packTotals.netPerScan)}</td>
                  <td className="p-3 text-right text-benefique-navy">&mdash;</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-benefique-navy/5 border-l-4 border-benefique-navy p-6 rounded-r-xl max-w-3xl">
            <p className="text-gray-800 leading-relaxed">
              <Prose segments={packProse.ex1Callout} />
            </p>
          </div>
        </div>
      </section>

      {/* Worked example 2 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-benefique-navy mb-3">{packProse.ex2Heading}</h2>
          <p className="text-gray-600 max-w-3xl mb-8">{packProse.ex2Intro}</p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-white text-left">
                  <th className="p-3 font-semibold text-benefique-navy border-b">Payer rail</th>
                  <th className="p-3 font-semibold text-benefique-navy border-b text-right">Share of scans</th>
                  <th className="p-3 font-semibold text-benefique-navy border-b text-right">Net per scan</th>
                  <th className="p-3 font-semibold text-benefique-navy border-b text-right">Days to cash</th>
                </tr>
              </thead>
              <tbody>
                {packRailRowsWithShare.map((r) => (
                  <tr key={r.key} className="border-b border-gray-200">
                    <td className="p-3 font-medium text-benefique-navy">{r.label}</td>
                    <td className="p-3 text-right text-gray-700">{pct(r.share)}</td>
                    <td className="p-3 text-right text-gray-700">{money(r.netPerScan)}</td>
                    <td className="p-3 text-right font-semibold text-benefique-navy">{num(r.dsoDays)}</td>
                  </tr>
                ))}
                <tr className="bg-white font-semibold">
                  <td className="p-3 text-benefique-navy">Blended</td>
                  <td className="p-3 text-right text-benefique-navy">100.0%</td>
                  <td className="p-3 text-right text-benefique-navy">{money2(packTotals.netPerScan)}</td>
                  <td className="p-3 text-right text-benefique-navy">{packTotals.blendedDso.toFixed(1)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white border-l-4 border-benefique-orange p-6 rounded-r-xl max-w-3xl">
            <p className="text-gray-800 leading-relaxed">
              <Prose segments={packProse.ex2Callout} />
            </p>
          </div>
        </div>
      </section>

      {/* The report library */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-benefique-navy mb-3">{packProse.libraryHeading}</h2>
          <p className="text-gray-600 max-w-3xl mb-10">{packProse.libraryIntro}</p>

          <div className="space-y-8">
            {packLibrary.map((stage) => (
              <div key={stage.stage} className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <div className="text-xs font-bold tracking-wide text-benefique-orange uppercase mb-1">
                  {stage.stage}
                </div>
                <h3 className="text-xl font-bold text-benefique-navy mb-4">{stage.question}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {stage.reports.map((r) => (
                    <div key={r.name} className="bg-white rounded-lg border border-gray-100 p-4">
                      <div className="font-semibold text-benefique-navy text-sm mb-1">{r.name}</div>
                      <p className="text-gray-600 text-sm leading-relaxed">{r.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-benefique-navy text-center mb-12">{packProse.faqHeading}</h2>
          <div className="space-y-4">
            {packFaqs.map((faq) => (
              <details key={faq.q} className="bg-white rounded-xl border border-gray-200 p-6">
                <summary className="font-semibold text-benefique-navy cursor-pointer">{faq.q}</summary>
                <p className="text-gray-600 mt-3 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-benefique-navy text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{packProse.ctaHeading}</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">{packProse.ctaBody}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/services/radiology/intake?ref=pack"
              className="bg-benefique-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Book a Strategic Radiology Review &rarr;
            </Link>
            <Link
              to="/radiology"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-benefique-navy transition"
            >
              Back to Radiology CFO Intelligence
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
