// ConnectedIntelligence.jsx — reusable sections for the Nov 2026 positioning.
// Copy lives in src/data/connected-intelligence.js (shared with the prerender).
import React from 'react';
import { Link } from 'react-router-dom';
import {
  layerSection,
  differenceSection,
  journeySection,
  decisionSection,
} from '../data/connected-intelligence';

const TM = <span className="align-super text-[0.6em]">™</span>;

/* Down-pointing connector between diagram levels. Pure SVG, no animation. */
function Connector({ label }) {
  return (
    <div className="flex flex-col items-center py-3" aria-hidden="true">
      <svg width="24" height="36" viewBox="0 0 24 36" className="text-benefique-orange">
        <line x1="12" y1="0" x2="12" y2="26" stroke="currentColor" strokeWidth="2" />
        <path d="M4 24 L12 34 L20 24" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
      {label && <span className="sr-only">{label}</span>}
    </div>
  );
}

/**
 * The three-level diagram: sources → Benefique Intelligence → outcomes.
 * Built as semantic HTML lists so screen readers and crawlers read it as text.
 * `compact` drops the intro and closing copy (used on /radiology).
 */
export function IntelligenceLayerDiagram({ compact = false }) {
  const s = layerSection;
  return (
    <figure className="max-w-6xl mx-auto" aria-label="How Benefique Intelligence connects operational and financial information to management outcomes">
      {/* Level 1 */}
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 text-center mb-3">
        Level 1 &middot; {s.sourcesLabel}
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        {s.sources.map((src) => (
          <li key={src} className="bg-white border border-gray-200 rounded-lg px-3 py-4 text-center text-sm font-semibold text-gray-700">
            {src}
          </li>
        ))}
      </ul>

      <Connector label="feeds into" />

      {/* Level 2 */}
      <div className="bg-benefique-navy text-white rounded-2xl px-6 py-8 border-b-4 border-benefique-orange">
        <p className="text-xs font-semibold uppercase tracking-wider text-orange-300 text-center mb-2">Level 2</p>
        <p className="text-2xl md:text-3xl font-bold text-center">{s.coreName}{TM}</p>
        <p className="text-blue-100 text-center mt-2 mb-6">{s.coreSub}</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {s.capabilities.map((c, i) => (
            <li key={c} className="bg-white/10 rounded-lg px-3 py-3 text-sm text-center">
              <span className="block text-orange-300 font-bold text-xs mb-1">{String(i + 1).padStart(2, '0')}</span>
              {c}
            </li>
          ))}
        </ul>
      </div>

      <Connector label="produces" />

      {/* Level 3 */}
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 text-center mb-3">
        Level 3 &middot; {s.outcomesLabel}
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {s.outcomes.map((o) => (
          <li key={o} className="bg-benefique-orange/10 border border-benefique-orange/30 rounded-lg px-3 py-4 text-center text-sm font-semibold text-benefique-navy">
            {o}
          </li>
        ))}
      </ul>
      {!compact && (
        <figcaption className="max-w-3xl mx-auto text-center text-gray-600 mt-8 space-y-2">
          {s.closing.map((p) => <p key={p}>{p}</p>)}
        </figcaption>
      )}
    </figure>
  );
}

export function IntelligenceLayerSection() {
  const s = layerSection;
  return (
    <section id="intelligence-layer" className="py-16 bg-gray-50 border-y border-gray-200 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-benefique-navy text-center leading-tight mb-6">
          {s.headingLines[0]}<br />{s.headingLines[1]}
        </h2>
        <div className="max-w-3xl mx-auto text-center text-gray-600 space-y-3 mb-12">
          {s.intro.map((p, i) => (
            <p key={p} className={i === s.intro.length - 1 ? 'font-semibold text-benefique-navy' : ''}>{p}</p>
          ))}
        </div>
        <IntelligenceLayerDiagram />
      </div>
    </section>
  );
}

export function BeyondDashboardsSection() {
  const s = differenceSection;
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-benefique-navy text-center mb-4">{s.heading}</h2>
        <div className="max-w-2xl mx-auto text-center text-gray-600 space-y-2 mb-10">
          {s.intro.map((p) => <p key={p}>{p}</p>)}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {s.cards.map((c) => (
            <div
              key={c.title}
              className={c.highlight
                ? 'rounded-xl p-6 bg-benefique-navy text-white border-b-4 border-benefique-orange'
                : 'rounded-xl p-6 bg-gray-50 border border-gray-200'}
            >
              <h3 className={`text-lg font-bold mb-3 ${c.highlight ? 'text-white' : 'text-benefique-navy'}`}>
                {c.title}{c.highlight ? TM : null}
              </h3>
              <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${c.highlight ? 'text-orange-300' : 'text-gray-500'}`}>Question answered</p>
              <p className={`font-semibold mb-3 ${c.highlight ? 'text-white' : 'text-gray-800'}`}>{c.question}</p>
              <p className={`text-sm ${c.highlight ? 'text-blue-100' : 'text-gray-600'}`}>{c.body}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-xl font-semibold text-benefique-navy mt-10">{s.line}</p>
      </div>
    </section>
  );
}

export function ExamJourneySection() {
  const s = journeySection;
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-benefique-navy text-center mb-4">{s.heading}</h2>
        <div className="max-w-3xl mx-auto text-center text-gray-600 space-y-2 mb-10">
          {s.intro.map((p) => <p key={p}>{p}</p>)}
        </div>

        <ol className="flex flex-wrap justify-center items-center gap-y-3 mb-12" aria-label="The journey of one MRI examination">
          {s.steps.map((step, i) => (
            <li key={step} className="flex items-center">
              <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${i < 6 ? 'bg-benefique-navy/10 text-benefique-navy' : 'bg-benefique-orange/10 text-benefique-orange'}`}>
                {step}
              </span>
              {i < s.steps.length - 1 && <span className="mx-1.5 text-gray-400" aria-hidden="true">&rarr;</span>}
            </li>
          ))}
        </ol>

        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 text-center mb-4">{s.questionsLabel}</h3>
        <dl className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {s.questions.map((item) => (
            <div key={item.stage} className="bg-white rounded-xl p-5 border border-gray-100">
              <dt className="text-xs font-semibold uppercase tracking-wide text-benefique-orange mb-1">{item.stage}</dt>
              <dd className="text-gray-700">{item.q}</dd>
            </div>
          ))}
        </dl>

        <p className="text-center text-lg font-semibold text-benefique-navy mt-10 mb-6">{s.closing}</p>
        <div className="text-center">
          <Link to={s.cta.href} className="inline-flex items-center gap-2 bg-benefique-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition">
            {s.cta.label} <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function DecisionToActionSection({ showExample = true }) {
  const s = decisionSection;
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-benefique-navy text-center mb-10">{s.heading}</h2>
        <ol className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {s.steps.map((step, i) => (
            <li key={step.title} className="relative bg-gray-50 rounded-xl p-5 border border-gray-200">
              <span className="w-9 h-9 rounded-full bg-benefique-orange text-white font-bold flex items-center justify-center mb-3">{i + 1}</span>
              <h3 className="text-lg font-bold text-benefique-navy mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="text-center text-xl font-semibold text-benefique-navy mt-10">{s.closing}</p>
        {showExample && (
          <div className="max-w-3xl mx-auto mt-6 space-y-3 text-center">
            <p className="text-gray-600">{s.example}</p>
            <p className="text-xs text-gray-500">{s.honesty}</p>
          </div>
        )}
      </div>
    </section>
  );
}
