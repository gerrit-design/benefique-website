import React from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import BlogPost from './BlogPost';
import ConciergeSimulator from './components/ConciergeSimulator';
import BusinessSimulator from './components/BusinessSimulator';

// ============================================================
// BENEFIQUE WEBSITE - Davie Design Style
// Built: 2026-01-28 | Restyled: 2026-01-29
// ============================================================

// Navigation Component
function Nav() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex flex-col">
          <span className="text-2xl md:text-3xl font-black text-benefique-navy tracking-wider" style={{ fontFamily: 'Georgia, Times, serif' }}>BENEFIQUE</span>
          <span className="text-xs text-gray-500 tracking-wide font-medium">Tax & Accounting</span>
          <span className="text-[10px] md:text-xs text-benefique-orange font-semibold italic mt-0.5">Real-time accounting. Tax-ready any day.</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            ['/services', 'Services'],
            ['/demo', 'Sample Reports'],
            ['/blog', 'Blog'],
            ['/testimonials', 'Testimonials'],
            ['/about', 'About'],
          ].map(([path, label]) => (
            <Link
              key={path}
              to={path}
              className={`text-sm font-medium transition-colors ${
                isActive(path) ? 'text-benefique-navy' : 'text-gray-600 hover:text-benefique-navy'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="bg-benefique-orange text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-orange-600 transition"
          >
            Apply to Work With Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-600"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-4">
          <Link to="/services" className="block text-gray-600">Services</Link>
          <Link to="/demo" className="block text-gray-600">Sample Reports</Link>
          <Link to="/blog" className="block text-gray-600">Blog</Link>
          <Link to="/testimonials" className="block text-gray-600">Testimonials</Link>
          <Link to="/about" className="block text-gray-600">About</Link>
          <Link to="/contact" className="block bg-benefique-orange text-white px-4 py-2 rounded-lg text-center font-semibold">
            Apply to Work With Us
          </Link>
        </div>
      )}
    </nav>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-benefique-navy text-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-white/10">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider" style={{ fontFamily: 'Georgia, Times, serif' }}>BENEFIQUE</span>
              <span className="text-xs text-gray-400 tracking-wide">Tax & Accounting</span>
              <span className="text-[10px] text-orange-400 font-semibold italic mt-0.5">Real-time accounting. Tax-ready any day.</span>
            </div>
            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/company/benefique-tax-accounting/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
              aria-label="Follow us on LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
          <div className="flex gap-6 text-sm text-gray-300">
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
        
        {/* SEO Links Section */}
        <div className="py-6 grid md:grid-cols-2 gap-6 text-sm border-b border-white/10">
          {/* Locations */}
          <div>
            <span className="text-gray-500 text-xs uppercase tracking-wider">Locations</span>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              <Link to="/davie-accounting" className="text-gray-400 hover:text-white transition">Davie</Link>
              <Link to="/fort-lauderdale-accounting" className="text-gray-400 hover:text-white transition">Fort Lauderdale</Link>
              <Link to="/weston-accounting" className="text-gray-400 hover:text-white transition">Weston</Link>
              <Link to="/plantation-accounting" className="text-gray-400 hover:text-white transition">Plantation</Link>
              <Link to="/miramar-accounting" className="text-gray-400 hover:text-white transition">Miramar</Link>
              <Link to="/hollywood-accounting" className="text-gray-400 hover:text-white transition">Hollywood</Link>
              <Link to="/aventura-accounting" className="text-gray-400 hover:text-white transition">Aventura</Link>
            </div>
          </div>
          
          {/* Industries */}
          <div>
            <span className="text-gray-500 text-xs uppercase tracking-wider">Industries</span>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              <Link to="/industries/radiology" className="text-gray-400 hover:text-white transition">Radiology</Link>
              <Link to="/industries/dental" className="text-gray-400 hover:text-white transition">Dental</Link>
              <Link to="/industries/veterinary" className="text-gray-400 hover:text-white transition">Veterinary</Link>
              <Link to="/industries/marine-services" className="text-gray-400 hover:text-white transition">Marine Services</Link>
              <Link to="/services/real-time-accounting" className="text-gray-400 hover:text-white transition">Real-Time Accounting</Link>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-sm text-gray-400 pt-6">
          © {new Date().getFullYear()} Benefique Capital LLC. All rights reserved. | Davie, Florida
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// HOME PAGE
// ============================================================
function Home() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    'name': 'Benefique Tax & Accounting',
    'description': 'Full-service accounting, tax planning, and fractional CFO services for healthcare practices and service businesses in South Florida.',
    'url': 'https://www.benefique.com',
    'logo': 'https://www.benefique.com/images/logo-full.jpg',
    'image': 'https://www.benefique.com/images/logo-full.jpg',
    'email': 'hello@benefique.com',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Davie',
      'addressRegion': 'FL',
      'postalCode': '33328',
      'addressCountry': 'US'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 26.0629,
      'longitude': -80.2331
    },
    'areaServed': [
      { '@type': 'City', 'name': 'Davie' },
      { '@type': 'City', 'name': 'Fort Lauderdale' },
      { '@type': 'City', 'name': 'Weston' },
      { '@type': 'City', 'name': 'Plantation' },
      { '@type': 'City', 'name': 'Miramar' },
      { '@type': 'City', 'name': 'Hollywood' },
      { '@type': 'City', 'name': 'Aventura' }
    ],
    'priceRange': '$$',
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      'opens': '09:00',
      'closes': '17:00'
    },
    'sameAs': [
      'https://www.linkedin.com/company/benefique-tax-accounting/'
    ],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Accounting Services',
      'itemListElement': [
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Full-Service Bookkeeping' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Tax Preparation & Planning' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Fractional CFO Services' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Payroll Processing' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Real-Time Financial Dashboards' } }
      ]
    }
  };

  return (
    <div>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>
      {/* Hero */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl">
            {/* Location Badge */}
            <div className="inline-flex items-center gap-2 bg-benefique-orange/10 text-benefique-orange px-3 py-1 rounded-full text-sm font-medium mb-6">
              <span>📍</span> Serving South Florida
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-benefique-navy leading-tight mb-6">
              Your Accounting Should Tell You<br />What to Do &mdash; Not Just What Happened
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              We turn your accounting function from a cost center into an ROI center. Clean books are the foundation. AI-powered financial intelligence is the product.
            </p>
            <p className="text-gray-600 mb-8">
              One client had $1M in profit and zero cash growth. Another had $353K trapped in receivables nobody was tracking. A third had $961K in hidden debt the balance sheet never showed. All of it was sitting in their QuickBooks. Nobody was mining it.
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <Link
                to="/contact"
                className="bg-benefique-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition inline-flex items-center gap-2"
              >
                See What Your Data Is Hiding <span>→</span>
              </Link>
              <Link
                to="/demo"
                className="border-2 border-benefique-navy text-benefique-navy px-6 py-3 rounded-lg font-semibold hover:bg-benefique-navy hover:text-white transition"
              >
                View Sample Reports
              </Link>
            </div>

            <p className="text-sm text-gray-500">
              No obligation. We&apos;ll tell you honestly if we can help &mdash; and how.
            </p>

            {/* Trust Bar */}
            <div className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-benefique-navy">33</span>
                <span className="text-sm text-gray-500 leading-tight">active client<br/>groups</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-benefique-navy">73</span>
                <span className="text-sm text-gray-500 leading-tight">QBO entities<br/>managed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-benefique-navy">~0%</span>
                <span className="text-sm text-gray-500 leading-tight">client<br/>churn</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-benefique-navy">7th</span>
                <span className="text-sm text-gray-500 leading-tight">books closed<br/>each month</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Strip — Real Findings */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Real findings from client engagements
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { number: '$353K', finding: 'in trapped cash freed by reducing collections from 61 to 46 days' },
              { number: '$337K/yr', finding: 'in retained cash flow from 3 actions that cost $3K to implement' },
              { number: '$961K', finding: 'in hidden debt the balance sheet never showed — found by comparing 12 months of snapshots' },
            ].map((item) => (
              <div key={item.number} className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="text-2xl font-bold text-benefique-orange mb-1">{item.number}</div>
                <p className="text-gray-600 text-sm">{item.finding}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sound Familiar? */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-benefique-navy mb-4">Sound Familiar?</h2>
          <p className="text-gray-600 mb-10">Most business owners we work with are dealing with at least one of these:</p>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              { emoji: '💸', text: "Your P&L shows profit — but the bank account doesn't agree" },
              { emoji: '📊', text: "Your accountant sends reports. Nobody tells you what to do about them" },
              { emoji: '😰', text: "You found out what you owed in taxes in April — not in January" },
              { emoji: '🤷', text: "You've never seen a cash flow waterfall of your own business" },
              { emoji: '🏦', text: "Your banker sees a different business than you do — and you don't know why" },
              { emoji: '📉', text: "Revenue is growing but cash keeps getting tighter" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-gray-50 rounded-xl p-4">
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Not Just a Regular CPA? */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-benefique-navy text-center mb-6">Why Not Just a Regular CPA?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="font-bold text-benefique-navy mb-2">A CPA files your taxes.</h3>
              <p className="text-gray-600 text-sm">We do that too &mdash; but we also find $20K-$350K in trapped cash, hidden debt, and missed savings before they become problems.</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="font-bold text-benefique-navy mb-2">A bookkeeper records history.</h3>
              <p className="text-gray-600 text-sm">We close books by the 7th, then run AI analysis on your QuickBooks data to show what to do next &mdash; not just what happened.</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="font-bold text-benefique-navy mb-2">A fractional CFO costs $5K-$15K/mo.</h3>
              <p className="text-gray-600 text-sm">You get the same caliber of cash flow analysis, prescriptive actions, and banker-ready reporting &mdash; bundled into your accounting fee.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Shift — Cost Center → ROI Center */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide text-center mb-2">The Benefique Difference</p>
          <h2 className="text-3xl font-bold text-benefique-navy text-center mb-4">From Cost Center to ROI Center</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Most accounting firms sit at the end of the business &mdash; reporting on history, filing returns. We start there too. Then we keep going.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold mb-4 uppercase tracking-wide">What you have now</div>
              <h3 className="text-xl font-bold text-gray-400 mb-4">Cost Center</h3>
              <ul className="space-y-3 text-gray-500 text-sm">
                <li className="flex items-start gap-2"><span>&mdash;</span> P&amp;L arrives 3-4 weeks after month-end</li>
                <li className="flex items-start gap-2"><span>&mdash;</span> Tax strategy is a sentence in a cover letter</li>
                <li className="flex items-start gap-2"><span>&mdash;</span> Cash decisions made on gut feel</li>
                <li className="flex items-start gap-2"><span>&mdash;</span> Accounting feels like a bill you pay to stay compliant</li>
                <li className="flex items-start gap-2"><span>&mdash;</span> Reports describe what happened &mdash; never what to do</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-benefique-navy to-slate-800 rounded-2xl p-6 text-white">
              <div className="inline-block bg-benefique-orange/20 text-benefique-orange px-3 py-1 rounded-full text-xs font-semibold mb-4 uppercase tracking-wide">What we build</div>
              <h3 className="text-xl font-bold mb-4">ROI Center</h3>
              <ul className="space-y-3 text-blue-100 text-sm">
                <li className="flex items-start gap-2"><span className="text-benefique-orange">✓</span> Books closed by the 7th, review call by the 10th</li>
                <li className="flex items-start gap-2"><span className="text-benefique-orange">✓</span> Tax savings found proactively &mdash; not at year-end</li>
                <li className="flex items-start gap-2"><span className="text-benefique-orange">✓</span> AI mines your QuickBooks for cash insights you didn&apos;t know existed</li>
                <li className="flex items-start gap-2"><span className="text-benefique-orange">✓</span> Every report comes with 3 prescriptive actions, backed by math</li>
                <li className="flex items-start gap-2"><span className="text-benefique-orange">✓</span> Accounting pays for itself &mdash; and then some</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/about" className="text-benefique-orange font-semibold hover:underline">
              Read how we got here →
            </Link>
          </div>
        </div>
      </section>

      {/* Proof — Case Studies */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-benefique-navy mb-8 text-center">We publish exactly what our AI finds. Proof over promise.</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/blog/ai-cash-flow-waterfall-explained" className="block bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-benefique-orange/30 hover:shadow-sm transition">
              <p className="text-2xl font-bold text-benefique-orange mb-2">$1M → $0</p>
              <h3 className="font-bold text-benefique-navy mb-2">$1M Profit, Zero Cash Growth</h3>
              <p className="text-gray-500 text-sm">Distributions + debt consumed 100.9% of EBITDA. The owner didn&apos;t know until we built the waterfall.</p>
            </Link>
            <Link to="/blog/ai-cfo-three-actions" className="block bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-benefique-orange/30 hover:shadow-sm transition">
              <p className="text-2xl font-bold text-benefique-orange mb-2">+$337K/yr</p>
              <h3 className="font-bold text-benefique-navy mb-2">3 Actions, $3K to Implement</h3>
              <p className="text-gray-500 text-sm">An appraisal, a payroll decomposition, and a distribution cap turned -$41K into +$294K retained.</p>
            </Link>
            <Link to="/blog/stealth-debt-balance-sheet-hidden" className="block bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-benefique-orange/30 hover:shadow-sm transition">
              <p className="text-2xl font-bold text-benefique-orange mb-2">$961K Hidden</p>
              <h3 className="font-bold text-benefique-navy mb-2">The Debt That Didn&apos;t Look Like Debt</h3>
              <p className="text-gray-500 text-sm">Formal debt shrank. AP and credit cards exploded. Total leverage grew $410K while the balance sheet said it shrank.</p>
            </Link>
            <Link to="/blog/three-views-one-business" className="block bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-benefique-orange/30 hover:shadow-sm transition">
              <p className="text-2xl font-bold text-benefique-orange mb-2">3 Verdicts</p>
              <h3 className="font-bold text-benefique-navy mb-2">Same Business, Three Answers</h3>
              <p className="text-gray-500 text-sm">&quot;Doing fine&quot; to the operator. &quot;Fragile&quot; to a banker. &quot;Distressed asset&quot; to a buyer. Same data.</p>
            </Link>
          </div>
          <div className="text-center mt-8">
            <Link to="/blog" className="text-benefique-orange font-semibold hover:underline">
              Read all case studies on our blog →
            </Link>
          </div>
        </div>
      </section>

      {/* The Foundation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide text-center mb-2">The Foundation That Makes It Possible</p>
          <h2 className="text-3xl font-bold text-benefique-navy text-center mb-4">A Complete Accounting Department</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Intelligence requires clean data. That starts with bulletproof accounting &mdash; books, taxes, payroll, all handled, so the AI has something real to analyze.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '📚', title: 'Real-Time Bookkeeping', desc: 'Every transaction categorized. Bank recs done. Books closed by the 7th — not the 30th.' },
              { icon: '🎯', title: 'Proactive Tax Planning', desc: 'Year-round strategy, not April surprises. S-Corp timing, R&D credits, retirement plan stacking.' },
              { icon: '💰', title: 'Payroll & Compliance', desc: 'Employee and contractor payroll, 1099s, sales tax — on time, every time, no exceptions.' },
              { icon: '📊', title: 'CFO-Grade Reporting', desc: 'Cash flow waterfalls, per-unit economics, and prescriptive actions — not just P&Ls.' },
              { icon: '📱', title: 'Real-Time Dashboard', desc: 'See your numbers anytime. No waiting. No asking. Just log in and know.' },
              { icon: '📞', title: '24-Hour Response', desc: 'Questions answered within one business day. Always. Our client churn is near zero.' },
            ].map((service) => (
              <div key={service.title} className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="text-lg font-bold text-benefique-navy mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-benefique-navy text-white">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-sm font-semibold text-orange-300 uppercase tracking-wide text-center mb-2">How It Works</p>
          <h2 className="text-3xl font-bold text-center mb-4">Simple Process. No Runaround.</h2>
          <p className="text-blue-100 text-center mb-12 max-w-2xl mx-auto">
            We make it easy to get started. No lengthy sales pitches. No pressure. Just a straightforward conversation to see if we're the right fit.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '1', title: 'Quick Application', desc: 'Fill out the short form below. Takes 60 seconds. Tells us about your business and what you\'re dealing with.' },
              { num: '2', title: 'Discovery Call', desc: 'We\'ll schedule a 20-minute call. You\'ll tell us about your situation. We\'ll tell you honestly if we can help — and how.' },
              { num: '3', title: 'Custom Proposal', desc: 'If we\'re a fit, you\'ll get a clear proposal with exactly what\'s included. No surprises. No hidden fees. Decide on your timeline.' },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-16 h-16 bg-benefique-orange rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-blue-100 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — AI-Citation Ready */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-benefique-navy text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="font-bold text-benefique-navy mb-2">What does Benefique do?</h3>
              <p className="text-gray-600 text-sm">Benefique is a full-service accounting firm that uses AI to turn QuickBooks data into financial intelligence. We handle bookkeeping, tax planning, payroll, and fractional CFO reporting for established South Florida businesses doing $500K&ndash;$10M+ in annual revenue. Every client gets clean books, proactive tax strategy, and prescriptive cash flow analysis &mdash; not just backward-looking reports.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="font-bold text-benefique-navy mb-2">How does AI improve accounting?</h3>
              <p className="text-gray-600 text-sm">Most small businesses have enough data in QuickBooks to make Fortune 500-level decisions &mdash; nobody is mining it. Our AI reads 12&ndash;36 months of transactions to build cash flow waterfalls, detect hidden debt, calculate per-unit economics, and generate the three highest-ROI actions for your business each quarter. The data was always there. We just extract it.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="font-bold text-benefique-navy mb-2">What industries do you specialize in?</h3>
              <p className="text-gray-600 text-sm">We serve healthcare practices (radiology, concierge medicine, medical groups), marine services, legal firms, and service-based businesses across South Florida. Our AI models include industry-specific benchmarks so your metrics are compared to peers, not generic averages.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="font-bold text-benefique-navy mb-2">How much does it cost?</h3>
              <p className="text-gray-600 text-sm">Pricing depends on entity count and complexity, but most clients pay a flat monthly fee that covers bookkeeping, tax planning, payroll, and CFO-grade reporting. There are no hourly surprises. Clients typically discover $20K&ndash;$350K in trapped cash, tax savings, or operational improvements in the first 90 days &mdash; the service pays for itself.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Application */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-benefique-navy mb-6">Let&apos;s See What Your Numbers Are Hiding</h2>
              <p className="text-gray-600 mb-6">
                We work with established businesses doing $500K-$10M+ in revenue &mdash; owners who are tired of backward-looking reports and want financial intelligence that actually moves the needle.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  'Books, payroll, taxes — the entire accounting function, handled',
                  'AI-powered cash flow intelligence from your existing QuickBooks data',
                  'Proactive tax planning that finds savings before year-end',
                  '"If We Were the CEO" — 3 actions, backed by math, every quarter',
                  'One team, one relationship — no handoffs, no runaround',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-benefique-orange">●</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide mb-3">What clients typically discover in the first 90 days</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>→ $20K-$350K in trapped cash, tax savings, or operational improvements</p>
                  <p>→ The gap between their P&amp;L break-even and their cash flow break-even</p>
                  <p>→ What their banker sees &mdash; before they sit down across from them</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-benefique-navy mb-2">Quick Application</h3>
              <p className="text-gray-600 text-sm mb-6">Takes 60 seconds. We'll reach out within 24 hours.</p>
              
              <form action="https://formspree.io/f/mzdjjprp" method="POST" className="space-y-4">
                <input type="hidden" name="_subject" value="New Benefique Application" />
                <input type="text" name="_gotcha" style={{display: 'none'}} />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Smith"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-benefique-orange focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="john@company.com"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-benefique-orange focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                  <input
                    type="text"
                    name="business"
                    required
                    placeholder="Acme Medical Group"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-benefique-orange focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Annual Revenue</label>
                  <select name="revenue" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-benefique-orange focus:border-transparent text-gray-600">
                    <option>Select range...</option>
                    <option>Under $500K</option>
                    <option>$500K - $1M</option>
                    <option>$1M - $5M</option>
                    <option>$5M - $10M</option>
                    <option>$10M+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Accounting Situation</label>
                  <select name="current_situation" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-benefique-orange focus:border-transparent text-gray-600">
                    <option>Select one...</option>
                    <option>Doing it myself</option>
                    <option>Have a bookkeeper</option>
                    <option>Have an accountant/CPA</option>
                    <option>Nothing in place</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">What would change if you knew exactly where your cash is going?</label>
                  <textarea
                    rows={3}
                    name="headache"
                    placeholder="Tell us what you'd do differently..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-benefique-orange focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-benefique-orange text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                >
                  Submit Application
                </button>
                <p className="text-xs text-gray-500 text-center">
                  No spam. No sales pressure. Just an honest conversation about your numbers.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// SERVICES PAGE
// ============================================================
function Services() {
  return (
    <div>
      <Helmet>
        <title>Fractional CFO, Tax Planning & Bookkeeping for Healthcare Practices | Benefique</title>
        <meta name="description" content="Fractional CFO services, tax planning, and real-time bookkeeping for healthcare practices and service businesses in South Florida. Based in Davie, FL." />
        <link rel="canonical" href="https://www.benefique.com/services" />
      </Helmet>
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-benefique-orange/10 text-benefique-orange px-3 py-1 rounded-full text-sm font-medium mb-6">
            <span>📋</span> Our Services
          </div>
          <h1 className="text-4xl font-bold text-benefique-navy mb-4">Fractional CFO, Tax Planning &amp; Accounting for South Florida Businesses</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            AI-powered financial intelligence for healthcare practices and service businesses ($500K&ndash;$10M+ revenue).
            Real-time books, proactive tax strategy, and CFO-grade analysis &mdash; designed to work together as a single data intelligence system.
          </p>
        </div>
      </section>

      {/* How They Connect */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-center">
            <div className="bg-gray-100 rounded-lg px-5 py-3">
              <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Foundation</div>
              <div className="font-bold text-benefique-navy text-sm">Real-Time Accounting</div>
            </div>
            <div className="text-gray-300 text-xl hidden md:block">&rarr;</div>
            <div className="bg-gray-100 rounded-lg px-5 py-3">
              <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Multiplier</div>
              <div className="font-bold text-benefique-navy text-sm">Proactive Tax Planning</div>
            </div>
            <div className="text-gray-300 text-xl hidden md:block">&rarr;</div>
            <div className="bg-benefique-navy rounded-lg px-5 py-3">
              <div className="text-xs text-benefique-orange uppercase tracking-wide font-semibold">Intelligence</div>
              <div className="font-bold text-white text-sm">Fractional CFO</div>
            </div>
          </div>
          <p className="text-gray-500 text-sm text-center mt-4 max-w-xl mx-auto">
            Each layer feeds the next. Clean real-time books enable proactive tax strategy. Tax-ready data powers AI-driven financial intelligence. The result: an accounting function that pays for itself — and then some.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 space-y-16">
          {/* Fractional CFO */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-4xl">📊</div>
              <div>
                <h2 className="text-2xl font-bold text-benefique-navy">Fractional CFO Services</h2>
                <p className="text-gray-600">C-suite financial leadership at a fraction of the cost</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              Most small businesses generate enough data in QuickBooks to make Fortune 500-level financial decisions — they just don't have anyone mining it. Our fractional CFO service uses AI-assisted analysis to turn your existing accounting data into cash flow forecasts, working capital insights, and actionable financial intelligence. We close your books by the 7th, deliver a CFO-grade report by the 10th, and meet with you to discuss what the numbers mean for your business. Clients typically discover $20K-$350K in trapped cash, tax savings, or operational improvements within the first 90 days.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <ul className="space-y-3">
                {[
                  'Monthly financial closes by the 7th business day',
                  'Custom CFO dashboards with real-time metrics',
                  'AI-assisted cash flow forecasting and management',
                  'Strategic planning and budgeting',
                  'Bank and investor relations support',
                  'DSO tracking and accounts receivable optimization',
                  'Owner draw sustainability analysis',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-benefique-orange">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-sm text-benefique-orange uppercase tracking-wide font-semibold mb-2">Every CFO Client Gets</div>
                <div className="space-y-3 mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-benefique-navy">CFO Deep Dive</h3>
                    <p className="text-gray-500 text-xs">Monthly/quarterly — 13-section analysis with cash waterfall, 3-lens framework, and prescriptive actions.</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-benefique-navy">CFO Weekly Pulse</h3>
                    <p className="text-gray-500 text-xs">Every Monday — key metrics, alerts, and trends at a glance.</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-benefique-navy">The Benefique Financial Times&trade;</h3>
                    <p className="text-gray-500 text-xs">Monthly — your financial story told as news, in owner terms.</p>
                  </div>
                </div>
                <Link to="/demo" className="text-benefique-orange text-sm font-semibold hover:underline inline-block">
                  See all three sample reports →
                </Link>
                <br />
                <Link to="/blog/accountant-cost-center-roi-center" className="text-gray-500 text-sm hover:text-benefique-orange hover:underline mt-1 inline-block">
                  Read: Cost Center vs. ROI Center →
                </Link>
              </div>
            </div>
          </div>

          {/* Full-Service Accounting */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-4xl">📚</div>
              <div>
                <h2 className="text-2xl font-bold text-benefique-navy">Full-Service Accounting</h2>
                <p className="text-gray-600">Real-time books, not year-old history</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              Your books should tell you what's happening in your business right now — not what happened six months ago. We handle everything from daily transaction coding and bank reconciliations to payroll processing and month-end close. Every client gets books closed by the 7th business day of the following month, with a 24-hour response guarantee on all questions. We work inside QuickBooks Online so your data is always accessible, always current, and always tax-ready. No more scrambling at year-end. No more surprises from your tax preparer.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <ul className="space-y-3">
                {[
                  'Bookkeeping and transaction coding',
                  'Accounts payable and receivable management',
                  'Payroll processing and compliance',
                  'Bank and credit card reconciliations',
                  'Month-end and year-end close',
                  'Financial statement preparation',
                  '1099 preparation and vendor compliance',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-benefique-orange">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-sm text-benefique-orange uppercase tracking-wide font-semibold mb-2">Our Promise</div>
                <h3 className="text-lg font-bold text-benefique-navy mb-2">24-Hour Response Time</h3>
                <p className="text-gray-600 text-sm">
                  Questions don't wait. Neither do we. Every client inquiry gets a response
                  within one business day, guaranteed.
                </p>
                <Link to="/blog/stop-doing-your-own-books" className="text-gray-500 text-sm hover:text-benefique-orange hover:underline mt-2 inline-block">
                  Read: The Real Cost of DIY Bookkeeping →
                </Link>
                <br />
                <Link to="/testimonials" className="text-gray-500 text-sm hover:text-benefique-orange hover:underline mt-1 inline-block">
                  Hear from our clients →
                </Link>
              </div>
            </div>
          </div>

          {/* Tax Planning */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-4xl">🎯</div>
              <div>
                <h2 className="text-2xl font-bold text-benefique-navy">Proactive Tax Planning</h2>
                <p className="text-gray-600">Year-round strategies, not April surprises</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              The average small business overpays $15,000-$50,000 in taxes annually because their accountant is reactive instead of proactive. We build tax strategy into your monthly financial rhythm — not as a once-a-year scramble. That means entity structure reviews (S-Corp election timing alone can save $5K-$20K/year), R&D tax credit identification for healthcare and tech businesses, retirement plan optimization that can shelter $200K+ annually, and quarterly estimate projections so you never face a surprise tax bill. Because we do your books, we see the tax implications in real time — not after the year is over.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <ul className="space-y-3">
                {[
                  'Entity structure optimization (S-Corp, LLC, partnership)',
                  'R&D tax credit identification and documentation',
                  'Retirement plan stacking (401k + Cash Balance)',
                  'State and local tax compliance',
                  'Quarterly estimates and projections',
                  'Year-end tax planning and acceleration strategies',
                  'Multi-entity tax coordination',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-benefique-orange">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-sm text-benefique-orange uppercase tracking-wide font-semibold mb-2">Focus Areas</div>
                <h3 className="text-lg font-bold text-benefique-navy mb-2">Healthcare & Service SMBs</h3>
                <p className="text-gray-600 text-sm">
                  We specialize in healthcare practices, professional services, and service-based
                  businesses. We understand your industry's unique tax challenges — from physician compensation structuring to R&D credits for clinical workflows.
                </p>
                <Link to="/blog/s-corp-election-guide" className="text-gray-500 text-sm hover:text-benefique-orange hover:underline mt-2 inline-block">
                  Read: Is S-Corp Election Right for Your Business? →
                </Link>
                <br />
                <Link to="/tools/concierge-simulator" className="text-gray-500 text-sm hover:text-benefique-orange hover:underline mt-1 inline-block">
                  Try: Concierge Medicine Tax Simulator →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Result */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-benefique-navy to-slate-800 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">The Result: Financial Intelligence, Not Just Financial Reporting</h2>
            <p className="text-blue-100 mb-4">
              Most accounting firms deliver compliance — books closed, taxes filed. That&apos;s necessary work. But when your books are real-time, your tax strategy is proactive, and AI is mining the operational data in your QuickBooks, your accounting function stops being a cost center and starts generating ROI.
            </p>
            <p className="text-blue-100 mb-6">
              Our clients typically discover $20K–$350K in trapped cash, tax savings, or operational improvements within the first 90 days. Not because the data wasn&apos;t there — because nobody was looking.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/about" className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition inline-flex items-center gap-2">
                Read our story &rarr;
              </Link>
              <Link to="/blog/three-views-one-business" className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition inline-flex items-center gap-2">
                Same data, three verdicts &rarr;
              </Link>
              <Link to="/demo" className="bg-benefique-orange hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition inline-flex items-center gap-2">
                See sample reports &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-benefique-navy">33+</div>
              <div className="text-sm text-gray-500">Businesses Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-benefique-navy">73</div>
              <div className="text-sm text-gray-500">QBO Entities Managed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-benefique-navy">7th</div>
              <div className="text-sm text-gray-500">Books Closed by Day 7</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-benefique-navy">$350K</div>
              <div className="text-sm text-gray-500">Largest Cash Finding (90 Days)</div>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            Based in Davie, FL &middot; Serving healthcare practices and service businesses across South Florida &middot; QuickBooks Online ProAdvisor
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-benefique-navy mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: 'How quickly can I get started?', a: 'Most onboardings take 5\u201310 business days. We connect to your QuickBooks Online, review your chart of accounts, and deliver your first clean monthly close within 30 days.' },
              { q: 'What if I already have a bookkeeper?', a: 'Many CFO-only clients keep their existing bookkeeper. We layer analysis, tax strategy, and advisory on top of their work. If the books need cleanup first, we handle that during onboarding.' },
              { q: 'Do you work with businesses outside of healthcare?', a: 'Yes. About half our clients are service-based businesses \u2014 marine services, IT, law firms, and professional services. Healthcare is our largest vertical, but the CFO methodology works across industries.' },
              { q: 'What does "AI-assisted" actually mean?', a: 'We connect directly to your QuickBooks via API and run automated financial diagnostics \u2014 cash flow waterfalls, working capital analysis, DSO tracking, break-even modeling. It means you get Fortune 500-level analysis at a fraction of the cost, delivered in plain English.' },
              { q: 'Is there a minimum contract term?', a: 'Month-to-month. We earn your business every month. Most clients stay 3+ years because the value compounds \u2014 the longer we have your data, the better the insights.' },
              { q: 'How is Benefique different from my current CPA?', a: 'Most CPAs are reactive \u2014 they file your taxes after the year ends. We build tax strategy into your monthly rhythm and use AI to mine your operational data for cash flow improvements, tax savings, and growth insights in real time.' },
            ].map((faq, i) => (
              <div key={i} className="border-b border-gray-100 pb-4">
                <h3 className="font-semibold text-benefique-navy mb-1">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-benefique-navy text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Find Out What Your QuickBooks Data Is Hiding</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Most businesses have $20K&ndash;$350K in trapped cash, missed tax savings, or operational improvements sitting in their existing data. A 15-minute call tells us if we can find yours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-block bg-benefique-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Book a Free 15-Minute Call
            </Link>
            <Link
              to="/demo"
              className="inline-block bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              See Sample Reports First
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// TESTIMONIALS PAGE - Grouped by Healthcare & Services
// ============================================================
function Testimonials() {
  const helmet = (
    <Helmet>
      <title>Client Testimonials | Healthcare & Service Business Owners | Benefique</title>
      <meta name="description" content="See what healthcare practice owners and service business operators say about working with Benefique Tax & Accounting in Davie, FL." />
      <link rel="canonical" href="https://www.benefique.com/testimonials" />
    </Helmet>
  );
  const healthcareTestimonials = [
    { name: 'Mark', industry: 'Multi-Location Radiology', quote: 'Benefique gives us visibility across all our locations. We finally know which centers are performing and which need attention.' },
    { name: 'Daryl', industry: 'Diagnostic Imaging', quote: 'They showed us the levers we could pull to improve profitability. Not just reports—actionable insights.' },
    { name: 'Humberto', industry: 'Radiology Operations', quote: 'The monthly CFO dashboard changed how we run the business. We make decisions based on data now, not gut feel.' },
    { name: 'Flavio', industry: 'Remote Radiology', quote: 'As a remote practice, having a team that truly understands healthcare billing was crucial. Benefique delivers.' },
    { name: 'Brandon', industry: 'Veterinary Practice', quote: 'They handle everything—books, taxes, payroll. I can focus on my patients instead of spreadsheets.' },
    { name: 'Eddie', industry: 'Dental Brokerage', quote: 'Complex multi-entity structure, and they keep it all organized. Tax planning alone has saved us significantly.' },
  ];

  const servicesTestimonials = [
    { name: 'Jamel', industry: 'IT Services', quote: 'Fast, responsive, and actually understands tech businesses. The monthly close is always on time.' },
    { name: 'Kobus', industry: 'Marine Services', quote: 'We went from chaos to clarity. Now I know exactly where we stand financially at any moment.' },
    { name: 'Natasha', industry: 'Healthcare Group', quote: "Multiple locations, different specialties, one clear financial picture. That's what Benefique built for us." },
  ];

  const TestimonialCard = ({ t }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition">
      <div className="text-benefique-orange text-4xl mb-4">"</div>
      <p className="text-gray-700 mb-6 leading-relaxed">{t.quote}</p>
      <div className="border-t border-gray-100 pt-4">
        <div className="font-semibold text-benefique-navy">{t.name}</div>
        <div className="text-sm text-gray-500">{t.industry}</div>
      </div>
    </div>
  );

  return (
    <div>
      {helmet}
      {/* Header */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-benefique-orange/10 text-benefique-orange px-3 py-1 rounded-full text-sm font-medium mb-6">
            <span>⭐</span> Client Success Stories
          </div>
          <h1 className="text-4xl font-bold text-benefique-navy mb-4">What Our Clients Say</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            We specialize in <strong>healthcare practices</strong> and <strong>service-based businesses</strong>. 
            Here's what they say about working with us.
          </p>
        </div>
      </section>

      {/* Healthcare Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">🏥</span>
            <div>
              <h2 className="text-2xl font-bold text-benefique-navy">Healthcare Practices</h2>
              <p className="text-gray-600">Radiology, dental, veterinary, and medical practices</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {healthcareTestimonials.map((t, i) => <TestimonialCard key={i} t={t} />)}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">🏢</span>
            <div>
              <h2 className="text-2xl font-bold text-benefique-navy">Service-Based Businesses</h2>
              <p className="text-gray-600">IT, marine, legal, and professional services</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesTestimonials.map((t, i) => <TestimonialCard key={i} t={t} />)}
          </div>
        </div>
      </section>

      {/* See Our Reports CTA */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-xl font-bold text-benefique-navy mb-4">See the reports our clients love</h3>
          <p className="text-gray-600 mb-6">
            Our CFO dashboards and Benefique Financial Times™ give owners clarity they've never had before.
          </p>
          <Link
            to="/demo"
            className="inline-flex items-center gap-2 bg-white text-benefique-navy border-2 border-benefique-navy px-6 py-3 rounded-lg font-semibold hover:bg-benefique-navy hover:text-white transition"
          >
            📊 View Sample Reports
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-benefique-navy text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to join them?</h2>
          <p className="text-blue-100 mb-8">
            Let's talk about your business and see how we can help.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-benefique-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Apply to Work With Us
          </Link>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// ABOUT PAGE - With Dashboard Links
// ============================================================
function About() {
  return (
    <div>
      <Helmet>
        <title>From Tax Returns to Data Intelligence | About Benefique Tax & Accounting</title>
        <meta name="description" content="We started with your tax return. Then we built real-time accounting, AI-powered cash flow intelligence, and a data platform that turns your accounting function from a cost center into an ROI center." />
        <link rel="canonical" href="https://www.benefique.com/about" />
      </Helmet>

      {/* Hero — Pain + Promise */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-benefique-orange/10 text-benefique-orange px-3 py-1 rounded-full text-sm font-medium mb-6">
            About Benefique
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-benefique-navy mb-4">We didn&apos;t set out to become a data intelligence firm.</h1>
          <p className="text-xl text-gray-600 max-w-3xl mb-4">
            We just kept solving the next problem.
          </p>
          <p className="text-lg text-gray-500 max-w-3xl">
            Every business runs on five phases: marketing, selling, operations, financial reporting, and taxes.
            Most accounting firms sit at the end of that chain — reporting on history and filing returns. They never leave.
            We started there too. But we kept walking forward.
          </p>
        </div>
      </section>

      {/* The Progression — Cost Center → Break-Even → ROI Center */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-benefique-navy mb-3 text-center">The Accounting Evolution</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            We started at the end of the business — taxes — and worked backward through financial reporting,
            into operations, and all the way to the decisions owners make every day. Most accounting firms never leave Stage 1.
          </p>

          <div className="space-y-0">
            {/* Stage 1 */}
            <div className="relative pl-12 pb-12 border-l-2 border-gray-200 ml-4">
              <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-sm">1</div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold mb-3 uppercase tracking-wide">Before Benefique</div>
                <h3 className="text-xl font-bold text-benefique-navy mb-2">Cost Center</h3>
                <p className="text-gray-600 text-sm">
                  You pay someone to record what already happened. Your P&L arrives 3-4 weeks after the month ends.
                  Tax strategy is a sentence in a cover letter. You make cash decisions on gut feel because the data
                  arrives too late. Accounting feels like a bill you pay to stay compliant.
                </p>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="relative pl-12 pb-12 border-l-2 border-benefique-orange/30 ml-4">
              <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-benefique-orange/60 flex items-center justify-center text-white font-bold text-sm">2</div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="inline-block bg-benefique-orange/10 text-benefique-orange px-3 py-1 rounded-full text-xs font-semibold mb-3 uppercase tracking-wide">Month 1-3</div>
                <h3 className="text-xl font-bold text-benefique-navy mb-2">Break-Even Center</h3>
                <p className="text-gray-600 text-sm">
                  We take over the accounting function and build a real-time foundation. Books closed by the 7th.
                  Review calls by the 10th. Your QuickBooks data flows through our AI analysis engine via direct API
                  integration. Proactive tax planning begins immediately — because when your books are clean in real time,
                  tax savings become visible any day of the year. The tax savings alone offset the cost of the engagement.
                </p>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="relative pl-12 pb-12 border-l-2 border-benefique-orange/60 ml-4">
              <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-benefique-orange flex items-center justify-center text-white font-bold text-sm">3</div>
              <div className="bg-white rounded-2xl p-6 border-2 border-benefique-orange/30 shadow-sm">
                <div className="inline-block bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold mb-3 uppercase tracking-wide">Ongoing</div>
                <h3 className="text-xl font-bold text-benefique-navy mb-2">ROI Center</h3>
                <p className="text-gray-600 text-sm mb-4">
                  This is where it gets interesting. AI analyzes the operational data already sitting in your QuickBooks
                  that you don&apos;t have time to mine. We find cash trapped in receivables, identify where profit disappears
                  between the P&amp;L and the bank account, and surface insights that directly improve operations and profitability.
                  The accounting function isn&apos;t just paying for itself — it&apos;s generating returns.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">Real findings from client engagements</p>
                  <ul className="text-sm text-gray-600 space-y-1.5">
                    <li className="flex items-start gap-2"><span className="text-benefique-orange font-bold mt-0.5">-</span> $353K in cash trapped in slow-paying receivables — freeable by reducing DSO 15 days</li>
                    <li className="flex items-start gap-2"><span className="text-benefique-orange font-bold mt-0.5">-</span> $900K bank balance that was actually trust funds, not firm cash — real cash was $493K</li>
                    <li className="flex items-start gap-2"><span className="text-benefique-orange font-bold mt-0.5">-</span> $1M in EBITDA that left zero cash in the bank — the waterfall showed exactly where it went</li>
                    <li className="flex items-start gap-2"><span className="text-benefique-orange font-bold mt-0.5">-</span> 30% revenue decline masked as "seasonality" — collections dashboard exposed the real trend</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Stage 4 */}
            <div className="relative pl-12 ml-4">
              <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-benefique-navy flex items-center justify-center text-white font-bold text-sm">4</div>
              <div className="bg-gradient-to-br from-benefique-navy to-slate-800 rounded-2xl p-6 text-white">
                <div className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3 uppercase tracking-wide">Where We Are Now</div>
                <h3 className="text-xl font-bold mb-2">Data Intelligence Center</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Accounting is our entry point. Intelligence is our product. We followed the cash forward — past financial
                  reporting, into operations, volume, payer mix, distribution habits, breakeven gaps, and collection cycles.
                  We pointed AI at the front of the business and found what no one else was looking for: the operational
                  decisions that create &mdash; or destroy &mdash; enterprise value.
                </p>
                <p className="text-white font-medium text-sm">
                  We&apos;ve become a data intelligence center for SMBs. To our knowledge, this does not exist
                  in the accounting space &mdash; and especially not for small and mid-sized businesses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Do It */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-benefique-navy mb-8">How it works</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-benefique-orange pl-6">
              <h3 className="font-bold text-benefique-navy text-lg mb-2">Real-time books = proactive tax planning</h3>
              <p className="text-gray-600 text-sm">
                Our accounting base is exceptionally strong — and that&apos;s by design. When your books are clean and
                current every day, not just at quarter-end, tax planning becomes proactive instead of reactive.
                We don&apos;t wait for year-end to find deductions. We see them as they happen.
                That&apos;s why our motto is &quot;Real-time accounting. Tax-ready any day.&quot;
              </p>
            </div>
            <div className="border-l-4 border-benefique-orange pl-6">
              <h3 className="font-bold text-benefique-navy text-lg mb-2">AI does the monitoring. Humans do the interpreting.</h3>
              <p className="text-gray-600 text-sm">
                AI spots that your cash position dropped 22% while revenue grew 8%. The Enrolled Agent
                knows that means your collections process broke down and $353K is recoverable.
                AI calculates a 3.8% operating margin on $7M in revenue. The human knows that means the owner
                earned nothing despite a seven-figure capital investment. The machine monitors continuously.
                The human interprets and acts.
              </p>
            </div>
            <div className="border-l-4 border-benefique-orange pl-6">
              <h3 className="font-bold text-benefique-navy text-lg mb-2">Tax + cash flow under one roof</h3>
              <p className="text-gray-600 text-sm">
                Most fractional CFOs don&apos;t do tax. Most tax professionals don&apos;t build cash flow models.
                We do both — which means every cash decision considers the tax consequence, and every tax
                strategy considers whether you actually have the cash to execute it. That dual lens is how
                accounting stops being a cost and starts generating ROI.
              </p>
            </div>
            <div className="border-l-4 border-benefique-orange pl-6">
              <h3 className="font-bold text-benefique-navy text-lg mb-2">Books closed by the 7th. Review calls by the 10th.</h3>
              <p className="text-gray-600 text-sm">
                Questions answered within 24 hours. Always. Our client churn is near zero — not because
                we lock anyone in, but because when your financial team is always available and always ahead
                of the problem, you stop looking for alternatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Building in Public */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-benefique-navy mb-3">We build in public. Proof over promise.</h2>
            <p className="text-gray-600 mb-6">
              We don&apos;t ask you to take our word for it. We publish exactly what our AI finds, how we analyze it,
              and the dollar impact it has — using real client data (anonymized). These are the case studies:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/blog/accountant-cost-center-roi-center" className="block bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-benefique-orange/30 hover:shadow-sm transition">
                <p className="text-xs text-benefique-orange font-semibold uppercase tracking-wide mb-2">The Full Arc</p>
                <h3 className="font-bold text-benefique-navy text-sm mb-1">Cost Center vs. ROI Center</h3>
                <p className="text-gray-500 text-xs">We found $1.5M in actionable findings across a multi-location healthcare group — from the same QuickBooks data their previous accountant had for years.</p>
              </Link>
              <Link to="/blog/three-views-one-business" className="block bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-benefique-orange/30 hover:shadow-sm transition">
                <p className="text-xs text-benefique-orange font-semibold uppercase tracking-wide mb-2">Three Lenses</p>
                <h3 className="font-bold text-benefique-navy text-sm mb-1">Same Business, Three Verdicts</h3>
                <p className="text-gray-500 text-xs">A $3.8M practice was &quot;doing fine&quot; to the operator, &quot;fragile&quot; to a banker, and a &quot;distressed asset&quot; to a PE buyer. Same data, three conclusions.</p>
              </Link>
              <Link to="/blog/fixer-upper-or-walk-in-ready" className="block bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-benefique-orange/30 hover:shadow-sm transition">
                <p className="text-xs text-benefique-orange font-semibold uppercase tracking-wide mb-2">Exit Readiness</p>
                <h3 className="font-bold text-benefique-navy text-sm mb-1">Fixer Upper or Walk-In Ready?</h3>
                <p className="text-gray-500 text-xs">A $5.2M offer became $1.8M after due diligence. We show clients the buyer&apos;s inspection report before the buyer does.</p>
              </Link>
              <Link to="/blog/ai-cash-flow-waterfall-explained" className="block bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-benefique-orange/30 hover:shadow-sm transition">
                <p className="text-xs text-benefique-orange font-semibold uppercase tracking-wide mb-2">Case Study</p>
                <h3 className="font-bold text-benefique-navy text-sm mb-1">$1M Profit, Zero Cash</h3>
                <p className="text-gray-500 text-xs">A $5M imaging center earned $1.07M in EBITDA but its bank account shrank. The AI-powered waterfall showed exactly where every dollar went.</p>
              </Link>
              <Link to="/blog/ai-found-353k-trapped-cash" className="block bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-benefique-orange/30 hover:shadow-sm transition">
                <p className="text-xs text-benefique-orange font-semibold uppercase tracking-wide mb-2">Case Study</p>
                <h3 className="font-bold text-benefique-navy text-sm mb-1">AI Found $353K in Trapped Cash</h3>
                <p className="text-gray-500 text-xs">A professional services firm had $353K stuck in receivables and a bank balance that overstated real cash by $900K. All found in QuickBooks data.</p>
              </Link>
              <Link to="/blog/stealth-debt-balance-sheet-hidden" className="block bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-benefique-orange/30 hover:shadow-sm transition">
                <p className="text-xs text-benefique-orange font-semibold uppercase tracking-wide mb-2">Case Study</p>
                <h3 className="font-bold text-benefique-navy text-sm mb-1">$961K in Hidden Debt</h3>
                <p className="text-gray-500 text-xs">The balance sheet showed $399K in debt. Our AI pulled 12 months of snapshots and found $961K more — vendor credit quietly replacing formal loans.</p>
              </Link>
            </div>
            <div className="mt-6 text-center">
              <Link to="/blog" className="text-benefique-orange font-semibold hover:underline">
                Read all insights on our blog →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Decision-Ready Dashboards */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-benefique-navy to-slate-800 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Decision-Ready Dashboards</h2>
            <p className="text-blue-100 mb-6">
              Every Fractional CFO client receives reports that make complex data simple.
              See your business health at a glance, understand trends, and know exactly what to do next.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 rounded-xl p-5 hover:bg-white/20 transition">
                <h3 className="font-bold text-lg mb-2">CFO Report</h3>
                <p className="text-blue-100 text-sm mb-3">
                  Cash health, revenue trends, profitability metrics, cash waterfall, and action items with dollar impact.
                  Written in owner terms, not accountant-speak.
                </p>
                <Link to="/demo" className="text-benefique-orange font-semibold text-sm hover:underline">
                  View Sample →
                </Link>
              </div>
              <div className="bg-white/10 rounded-xl p-5 hover:bg-white/20 transition">
                <h3 className="font-bold text-lg mb-2">The Benefique Financial Times&trade;</h3>
                <p className="text-blue-100 text-sm mb-3">
                  A newspaper-style report that tells your financial story. Lead articles, trend analysis,
                  and action items — because numbers without narrative are just noise.
                </p>
                <Link to="/demo" className="text-benefique-orange font-semibold text-sm hover:underline">
                  View Sample →
                </Link>
              </div>
            </div>
            <div className="text-center">
              <Link to="/demo" className="inline-flex items-center gap-2 bg-benefique-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                See All Sample Reports
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Founder — Credibility (shorter) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
            <h2 className="text-2xl font-bold text-benefique-navy mb-4">The Founder</h2>
            <p className="text-gray-600 mb-4">
              <strong className="text-benefique-navy">Gerrit Disbergen, EA</strong> started his career at
              Ernst & Young and Merrill Lynch, then founded a public financial services company that executed
              technology IPOs and M&A transactions. That world — institutional finance, capital markets,
              complex deal structures — shaped how he reads business numbers.
            </p>
            <p className="text-gray-600 mb-4">
              After emigrating to the United States, Gerrit made a deliberate choice: apply institutional-grade
              financial expertise to the businesses that need it most — small and mid-sized companies where
              the founder wears every hat and the financial function is always the most neglected.
            </p>
            <p className="text-gray-600">
              Benefique was built on a simple belief: accounting should take pain away, not create it.
              When your books are strong and your data flows in real time, proactive tax planning pays for
              the entire engagement — and the insights that come out of it improve operations well beyond the books.
            </p>
          </div>

          {/* Who We Serve */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
            <h2 className="text-2xl font-bold text-benefique-navy mb-4">Who We Serve</h2>
            <p className="text-gray-600 mb-6">
              Established businesses doing $500K-$10M+ in revenue who have outgrown their bookkeeper but aren&apos;t
              ready for a full-time CFO. Owners who are tired of backward-looking reports and want financial
              intelligence that actually moves the needle.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-benefique-navy mb-2">Healthcare Practices</h3>
                <ul className="text-gray-600 text-sm space-y-1 ml-4">
                  <li>- Radiology & diagnostic imaging</li>
                  <li>- Dental practices & DSOs</li>
                  <li>- Veterinary clinics</li>
                  <li>- Medical practices & concierge medicine</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-benefique-navy mb-2">Service-Based Businesses</h3>
                <ul className="text-gray-600 text-sm space-y-1 ml-4">
                  <li>- Professional services & law firms</li>
                  <li>- Marine & industrial services</li>
                  <li>- IT & technology services</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link to="/testimonials" className="text-benefique-orange font-semibold hover:underline">
                Read what our clients say →
              </Link>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-benefique-navy mb-4">Based in Davie, FL. Built for Anywhere.</h2>
            <p className="text-gray-600 mb-4">
              Our office is in Davie, Florida, and we serve clients throughout South Florida and across the country.
              Because our system is built on direct API integration and real-time dashboards, geography
              is never a barrier. Your data is where we are — always.
            </p>
            <Link to="/contact" className="text-benefique-orange font-semibold hover:underline">
              Get in touch →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-benefique-navy text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Your accounting should do more than document history.</h2>
          <p className="text-blue-100 mb-8">
            Let&apos;s talk about turning yours into an ROI center.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/demo"
              className="inline-flex items-center gap-2 bg-white text-benefique-navy px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              View Sample Reports
            </Link>
            <Link
              to="/contact"
              className="inline-block bg-benefique-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// BLOG PAGE
// ============================================================
function Blog() {
  const [activeCategory, setActiveCategory] = React.useState('All');

  const posts = [
    { title: 'Your Billing Company Costs 6%. Slow Collections Cost 10x That.', excerpt: 'Every practice owner negotiates billing fees down. The math says you should probably pay more. A South Florida imaging center discovered that $66K per year in invisible carrying costs dwarfed the billing fee savings they were chasing.', date: '2026-04-17', slug: 'medical-billing-fees-vs-collections-dso', published: true, category: 'Healthcare Finance', readTime: '10 min read' },
    { title: 'The Intercompany Markup Dial Nobody Tells You About', excerpt: 'A multi-entity business has a dial its owner usually doesn\'t know exists. At 10% it makes one entity look profitable and the other look structurally broken. At 20% it rebalances them. Group profit doesn\'t change by a dollar \u2014 but the banker, the buyer, and the tax return all see different stories.', date: '2026-04-16', slug: 'intercompany-markup-dial-multi-entity', published: true, category: 'Tax Strategy', readTime: '10 min read' },
    { title: 'When “It’s Just Seasonal” Isn’t', excerpt: 'One month last quarter, a multi-entity distributor posted a negative gross profit month \u2014 $200K in revenue, $201K in COGS, the first time in three years. Before the owners restructured anything, we ran a 60-minute test that told us the cause was isolated to three external customer invoices.', date: '2026-04-15', slug: 'margin-drop-test-trend-vs-accident', published: true, category: 'Cash Flow', readTime: '8 min read' },
    { title: 'Your Blended P&L Is Lying to You', excerpt: 'A $3M distribution business showed a 15% gross margin and looked distressed. We split it into internal and external divisions and found a healthy 50%+ external business sitting next to a subsidized 9% internal transfer operation. The owner had been trying to fix the wrong problem for two quarters.', date: '2026-04-14', slug: 'blended-pl-lying-multi-entity-business', published: true, category: 'Cash Flow', readTime: '10 min read' },
    { title: 'Radiology Accounts Receivable: How Banks Misread Your Aging Report', excerpt: 'Your banker sees 58% of your A/R sitting in the 120+ bucket and thinks your practice is a disaster. It isn\'t. Here\'s the three-number framework that translates a radiology aging report into language a commercial credit team understands — and the template we send when a bank asks for A/R.', date: '2026-04-14', slug: 'radiology-accounts-receivable-line-of-credit', published: true, category: 'Healthcare Finance', readTime: '11 min read' },
    { title: 'Quarterly KPI Scorecards: How 90-Day Reviews Catch the $5,000/Month Problem Annual Reviews Miss', excerpt: 'A COO\'s cost per claim rose 78% over four quarters. The annual review caught it in January \u2014 six months after intervention should have started. A quarterly scorecard would have flagged it in Q2. Here\'s the framework, the backtest, and the dollar cost of waiting.', date: '2026-04-10', slug: 'quarterly-kpi-scorecards-ai-performance-decline', published: true, category: 'Healthcare Finance', readTime: '10 min' },
    { title: 'How Concierge Doctors Clear $400K+ With a 300-Patient Panel', excerpt: '300 patients. $350/month. $1.26M in annual revenue. After $19,750/month in overhead, S-Corp tax savings, and a Cash Balance Plan sheltering $200K \u2014 your take-home clears $430K. Here is every dollar, step by step.', date: '2026-04-08', slug: 'concierge-doctor-300-patient-panel-income', published: true, category: 'Concierge Medicine', readTime: '14 min' },
    { title: 'The Most Expensive 2-Minute Decision in Your Medical Practice', excerpt: 'A radiology network identified its toxic payers. Warned the team. Then watched 24 more scans go through anyway \u2014 $55,832 in drug costs, $3,773 collected. The fix takes 10 minutes a day and costs nothing to implement.', date: '2026-04-08', slug: 'expensive-2-minute-decision-medical-practice', published: true, category: 'Healthcare Finance', readTime: '8 min' },
    { title: 'Your DSO Is Lying to You \u2014 Why Averages Hide Your Real Cash Flow Problem', excerpt: 'One radiology center reported a 49-day DSO. Looked like a slow-payment problem. It wasn\'t. The median was 35 days. Two distinct payment populations were hiding inside one average \u2014 and the centers with the worst DSO had the worst data entry.', date: '2026-04-08', slug: 'dso-lying-medical-practice-cash-flow', published: true, category: 'Healthcare Finance', readTime: '9 min' },
    { title: 'The Relationship Myth: When Taking One For The Team Costs $142,000', excerpt: 'Every multi-location imaging center has a sacred cow: the high-volume referring doctor whose toxic-payer patients you absorb because you can\'t afford to lose the relationship. We tested that assumption with 433 encounters and $142,000 in data. Zero out of 21 doctors justified the losses.', date: '2026-04-05', slug: 'referring-doctor-relationship-myth-medical-imaging', published: true, category: 'Healthcare Finance', readTime: '12 min' },
    { title: 'EBITDA Positive, Cash Flow Negative \u2014 A $16M Case Study', excerpt: 'Five locations. $16.7M in revenue. $332K in EBITDA. Looks like a functional business \u2014 until you subtract the $365K in annual interest. The group literally cannot pay its lenders from operations.', date: '2026-04-03', slug: 'ebitda-positive-cash-flow-negative-debt-service', published: true, category: 'Cash Flow', readTime: '16 min' },
    { title: '$2,940 Out the Door Before You Know If You\'ll Get Paid', excerpt: 'We analyzed 418 high-cost procedures across five imaging centers. The drug costs $2,940 per dose. One payer reimbursed 239% of that. Another reimbursed 26%. Same drug, same scan, same staff. Twenty-one percent of paid encounters still lost money.', date: '2026-03-29', slug: 'high-cost-procedure-economics-medical-practice', published: true, category: 'Healthcare Finance', readTime: '9 min read' },
    { title: 'The Factory That Didn\'t Know It Was Losing Money', excerpt: 'We put a sign on the dashboard: Days Since Last Money-Losing Procedure. The number was 1. They had been warned 31 days earlier. Here is the framework we built to make it impossible to hide.', date: '2026-03-29', slug: 'assembly-line-thinking-medical-practice-profitability', published: true, category: 'Healthcare Finance', readTime: '7 min read' },
    { title: '7 Payers, 41 Procedures, $80,593 Lost', excerpt: 'We graded every insurance payer A through F. Seven got F. They had been paid on 41 procedures and lost money on every single one. Your practice probably has the same problem — you just have not looked.', date: '2026-03-29', slug: 'toxic-payers-losing-money-medical-practice', published: true, category: 'Healthcare Finance', readTime: '6 min read' },
    { title: 'Concierge Medicine Financial Model: P&L vs Cash Flow as You Grow', excerpt: 'A 200-member concierge practice shows $253K in net income. The bank account tells a different story. We built an interactive simulator that shows exactly where the money goes — and why you need 143 members to break even on cash, not 134.', date: '2026-03-26', slug: 'concierge-medicine-financial-model', published: true, category: 'Concierge Medicine', readTime: '14 min read' },
    { title: 'Your Practice Is Profitable — So Why Do You Need 922 Patients Just to Break Even on Cash?', excerpt: 'An imaging center earned over $1M in EBITDA. P&L break-even: 702 claims. Cash flow break-even: 922 claims. The 220-claim gap is where the money vanishes — consumed by debt service and distributions that never appear on the income statement.', date: '2026-03-24', slug: 'cash-flow-breakeven-per-patient-activity-units', published: true, category: 'Cash Flow', readTime: '14 min read' },
    { title: 'Same Owner, Same Industry, 3x Cost Difference — What the P&L Can\'t Tell You', excerpt: 'Three imaging centers. Same owner. Same industry. One costs $109 per scan. Another costs $309. Their P&L couldn\'t explain the difference. A per-unit analysis exposed the gap in 20 minutes.', date: '2026-03-24', slug: 'per-unit-pnl-multi-location-cost-analysis', published: true, category: 'Healthcare Finance', readTime: '16 min' },
    { title: 'Your Practice Doesn\'t Have a Profit Problem — It Has a Volume Problem', excerpt: 'Your accountant said you lost money. We said you need 70 more patients to never lose money again. Same QuickBooks data — different analysis. Here\'s how marrying financial and operational data reveals the exact volume threshold between loss and profit.', date: '2026-03-24', slug: 'fixed-cost-breakeven-volume-problem', published: true, category: 'Healthcare Finance', readTime: '14 min' },
    { title: 'Same Business, Three Verdicts: What Operators, Bankers, and Buyers See in Your Financials', excerpt: 'A $3.8M imaging center was \'doing fine\' to the operator, \'fragile\' to a banker, and a \'distressed asset\' to a PE buyer. Same QuickBooks data, three verdicts.', date: '2026-03-22', slug: 'three-views-one-business', published: true, category: 'Cash Flow Advisory', readTime: '15 min read' },
    { title: 'Your Accountant Is a Cost Center. Here\'s What an ROI Center Looks Like.', excerpt: 'We analyzed a multi-location healthcare group. Every location was extracting more cash than it could sustain. Two were \'profitable.\' All were bleeding cash.', date: '2026-03-22', slug: 'accountant-cost-center-roi-center', published: true, category: 'Cash Flow Advisory', readTime: '16 min read' },
    { title: 'Fixer Upper or Walk-In Ready? How to Prepare Your Business for Sale', excerpt: 'Every business owner thinks their company is walk-in ready. Then the buyer shows up with a home inspector. Here\'s what they find — and how a $5M asking price becomes a $1.5M offer.', date: '2026-03-22', slug: 'fixer-upper-or-walk-in-ready', published: true, category: 'Cash Flow Advisory', readTime: '14 min read' },
    { title: 'The Debt That Doesn\'t Look Like Debt: How AI Found $961K Your Balance Sheet Hid', excerpt: 'A $4.7M imaging center showed $399K in debt on the balance sheet. Our AI pulled 12 months of snapshots and found $961K more \u2014 vendor credit and credit cards quietly replacing formal loans while nobody noticed.', date: '2026-03-18', slug: 'stealth-debt-balance-sheet-hidden', published: true, category: 'Cash Flow', readTime: '11 min' },
    { title: 'If We Were the CEO: How AI Turns a CFO Report Into 3 Actions Worth $500K', excerpt: 'Your CFO report has 40 metrics and 13 sections. Here are the 3 actions that actually move the needle \u2014 each with a calculation table, a dollar impact, and a timeline. Combined: +$337K/year.', date: '2026-03-18', slug: 'ai-cfo-three-actions', published: true, category: 'Cash Flow', readTime: '14 min' },
    { title: 'How Bonus Depreciation Is Hiding Your Real Net Worth', excerpt: 'A business with $1.46M in equipment loans showed equity of just $150K and a debt-to-equity ratio of 9.8x. The real equity was $930K. Bonus depreciation was hiding it.', date: '2026-03-18', slug: 'bonus-depreciation-hiding-net-worth', published: true, category: 'Cash Flow', readTime: '10 min' },
    { title: 'How AI Found That $1M in Profit Left Zero Cash in the Bank', excerpt: 'A $5M imaging center earned $1.07M in EBITDA but its bank account shrank by $41K. Here is exactly where that million dollars went \u2014 broken down by the AI that found it.', date: '2026-03-18', slug: 'ai-cash-flow-waterfall-explained', published: true, category: 'Cash Flow', readTime: '12 min' },
    { title: 'Are Concierge Medicine Fees Tax Deductible? IRS Rules for 2026', excerpt: 'Short answer: partially. The annual retainer is not deductible, but the medical services portion is \u2014 subject to the 7.5% AGI floor. We cover patients, self-employed, HSA eligibility, MDVIP/DPC plans, and the corporate concierge strategy that makes 100% deductible.', date: '2026-03-17', slug: 'concierge-medical-fees-tax-deductible', published: true, category: 'Tax Strategy', readTime: '18 min' },
    { title: 'How to Start a Concierge Medical Practice: The Financial Roadmap (2026)', excerpt: 'Entity formation, S-Corp election, 200-patient panel \u2014 every step from $0 to $500K+ net income. Includes the corporate B2B concierge play worth $50K\u2013$200K/year that most physician consultants skip entirely.', date: '2026-03-17', slug: 'how-to-start-concierge-medical-practice', published: true, category: 'Concierge Medicine', readTime: '24 min' },
    { title: 'Why Your Banker Asked for Your Personal Tax Return (And What They\'re Really Looking For)', excerpt: 'You applied for a business loan. The bank asked for your personal tax return, your personal financial statement, and two years of K-1s. Here\'s what they\'re actually evaluating \u2014 and the three personal risks that kill business loan applications.', date: '2026-03-13', slug: 'why-banker-asks-personal-tax-return', published: true, category: 'Cash Flow', readTime: '11 min' },
    { title: 'What Your Banker Sees That You Don\'t \u2014 From the Accountant Who Builds the Package', excerpt: 'Banks don\'t just review your P&L. They review three financial pictures \u2014 your business, your personal balance sheet, and a normalized version they rebuild themselves. Most owners only prepare for one.', date: '2026-03-13', slug: 'what-your-banker-sees-that-you-dont', published: true, category: 'Cash Flow', readTime: '14 min' },
    { title: '$454K Profit, $147K Cash Deficit: The Waterfall That Explains Everything', excerpt: 'A $6M business earned $454K in profit but ended up $147K in the hole. Partner draws, debt service, and working capital consumed it all. The P&L never showed it. The cash flow waterfall did.', date: '2026-03-13', slug: 'cash-flow-waterfall-why-profit-doesnt-equal-cash', published: true, category: 'Cash Flow', readTime: '10 min' },
    { title: 'What AI CFO Analysis Actually Looks Like (28 Pages, 14 Charts, 30 Seconds)', excerpt: 'Not ChatGPT. Here\'s what happens when AI turns 7 months of QuickBooks data into a 28-page CFO report with 14 charts \u2014 and finds $353K in trapped cash nobody knew about. The full process, step by step.', date: '2026-03-12', slug: 'ai-cfo-analysis', published: true, category: 'Technology & Automation', readTime: '12 min' },
    { title: 'AI Found $353K Trapped in This Firm\'s QuickBooks \u2014 Here\'s How', excerpt: '$353K in slow-paying receivables, a bank balance overstating real cash by $900K, and partner draws exceeding a $1.58M windfall. All hiding in plain sight in QuickBooks. Nobody found it until AI did.', date: '2026-03-12', slug: 'ai-found-353k-trapped-cash', published: true, category: 'Cash Flow', readTime: '11 min' },
    { title: 'DSO: The $350,000 Number Most Business Owners Have Never Heard Of', excerpt: 'Days Sales Outstanding measures how long clients take to pay after you invoice them. One firm\'s AI-assisted analysis showed that reducing DSO by just 15 days would free $353,000 in cash — without earning a single new dollar. Here\'s the formula, the benchmarks, and 5 ways to cut your DSO this quarter.', date: '2026-03-12', slug: 'dso-350k-number-business-owners', published: true, category: 'Cash Flow', readTime: '12 min' },
    { title: 'Why Your Business Bank Balance Is Lying to You', excerpt: 'A professional services firm thought they had $1.4 million in the bank. AI-assisted analysis revealed that $903K was client trust funds — not their money. Actual available cash: $493K. Here\'s how to calculate your real cash position and why most business owners overstate theirs by 40-65%.', date: '2026-03-12', slug: 'bank-balance-lying-trust-accounts', published: true, category: 'Cash Flow', readTime: '10 min' },
    { title: 'The 20-Minute Monthly Cash Review That Changes Everything', excerpt: 'Most business owners skip monthly financial reviews because they take too long and cover too much. This one takes 20 minutes, tracks 5 metrics, and catches cash flow problems before they become crises. Print the dashboard. Tape it to your monitor. Use it Monday.', date: '2026-03-12', slug: 'monthly-cash-review-20-minutes', published: true, category: 'Cash Flow', readTime: '9 min' },
    { title: 'The S-Corp Tax Trap: Why Your Service Business Makes Money But You\'re Always Broke', excerpt: 'A $4M service business showed $250K in profit. The owner had $49K in the bank and a $75K personal tax bill she didn\'t know about. The S-Corp flow-through that saves you SE taxes can also drain your cash if you don\'t provision for it monthly.', date: '2026-03-12', slug: 's-corp-tax-trap-service-business', published: true, category: 'Tax Strategy', readTime: '12 min' },
    { title: 'When Fixing Your Fleet Costs More Than Replacing It', excerpt: 'A service business spent $122K on truck repairs in two months on a fully depreciated fleet \u2014 zero tax benefit, unpredictable costs, rising downtime. A new truck at $1,500/month with a full Section 179 deduction would have been cheaper.', date: '2026-03-12', slug: 'fleet-replacement-vs-repair-service-business', published: true, category: 'Business Strategy', readTime: '12 min' },
    { title: 'They Undercut Your Price and Stole Your Client. Here\'s Why You Win Them Back.', excerpt: 'A 35-year service company lost a major institutional client to a fly-by-night operator quoting 30% below market. She held her pricing. Eighteen months later, the contracts came back. Here\'s the playbook for when lowball competitors steal your clients.', date: '2026-03-12', slug: 'competing-on-value-not-price-service-business', published: true, category: 'Business Strategy', readTime: '12 min' },
    { title: 'The $29,000 Your Practice Loses Every Year to Idle Cash', excerpt: 'A veterinary practice had $737K in cash \u2014 10.5 months of operating expenses \u2014 sitting in a checking account earning $50/year. Inflation was silently eroding $29,000/year in purchasing power. One phone call and a high-yield money market fixes most of it.', date: '2026-03-12', slug: 'idle-cash-costing-practice', published: true, category: 'Cash Flow', readTime: '10 min' },
    { title: 'Why Your December Financials Are Lying to You', excerpt: 'A veterinary practice showed consistent monthly profits of $17K-$74K \u2014 until December hit negative $110,000. The loss was entirely a bookkeeping artifact: $190K in annual expenses dumped into one month.', date: '2026-03-11', slug: 'december-financials-lying', published: true, category: 'Healthcare Finance', readTime: '10 min' },
    { title: 'Low Payroll Isn\'t a Win \u2014 It\'s You Working for Free', excerpt: 'A veterinary practice doing $1.6M showed payroll at 27% \u2014 well below the 40-45% benchmark. That 13-point gap isn\'t efficiency. It\'s the owner doing $25/hour work when her surgical time is worth $300-$500/hour.', date: '2026-03-10', slug: 'low-payroll-owner-working-free', published: true, category: 'Healthcare Finance', readTime: '12 min' },
    { title: 'The 5 Cash Leaks Hiding in Every Service Business', excerpt: 'We analyzed a multi-entity service business doing $6.4M/year. Profitable by every measure. But $370K was trapped in five places the owners never thought to look. Here are the five leaks \u2014 and how to plug each one in 90 days.', date: '2026-03-08', slug: '5-cash-leaks-service-business', published: true, category: 'Cash Flow', readTime: '12 min' },
    { title: 'Your P&L Says You\'re Profitable \u2014 So Why Is Your Bank Account Empty?', excerpt: 'A $6.4M service business showed $454K in EBITDA. Healthy, right? But the owners were pulling $402K in distributions and paying $199K in debt service. That\'s $601K in obligations against $454K in earnings \u2014 a $147K annual cash deficit hidden behind a profitable P&L.', date: '2026-03-08', slug: 'pl-says-profitable-bank-account-empty', published: true, category: 'Cash Flow', readTime: '12 min' },
    { title: 'The 6 Financial Blockers Killing Healthcare Practices', excerpt: 'A radiology group doing $7.36M in gross revenue generated zero real profit. A veterinary practice doing $1.75M had a 34% margin and zero debt. Same industry. Wildly different outcomes. The difference comes down to six financial blockers.', date: '2026-03-08', slug: '6-financial-blockers-killing-healthcare-practices', published: true, category: 'Healthcare Finance', readTime: '18 min' },
    { title: 'Which Financial Phase Is Your Healthcare Business In?', excerpt: 'A startup with 23 days of cash. A radiology group doing $7M but losing money. A vet practice with $651K in reserves and zero debt. These are three different financial phases \u2014 and the advice each one needs is completely different.', date: '2026-03-08', slug: 'which-financial-phase-healthcare-business', published: true, category: 'Healthcare Finance', readTime: '20 min' },
    { title: 'How Concierge Physicians Can Build Wealth Beyond Their Practice', excerpt: 'A concierge physician earning $600K/year can accumulate $15-25M over 20 years with disciplined deployment across retirement plans, real estate, practice equity, and tax-efficient investments. Here\'s the complete wealth-building framework.', date: '2026-03-11', slug: 'concierge-physicians-build-wealth-beyond-practice', published: true, category: 'Concierge Medicine', readTime: '16 min' },
    { title: 'Tax Strategies for Concierge Physicians', excerpt: 'Eight tax strategies that save concierge physicians $50K-$150K per year: S-Corp optimization, retirement plan stacking, accountable plans, Augusta Rule, Section 179, family employment, entity structuring, and QBI planning.', date: '2026-03-10', slug: 'tax-strategies-concierge-physicians', published: true, category: 'Tax Strategy', readTime: '20 min' },
    { title: 'Concierge vs Insurance Practice: $550K\u2013$1.2M vs $240K\u2013$400K (Full Comparison)', excerpt: 'Solo concierge: $550K\u2013$1.2M net, 6\u201312 patients/day. Insurance-based: $240K\u2013$400K, 20\u201330 patients/day. Side-by-side comparison of revenue, overhead, quality of life, transition costs, and tax implications for all four models.', date: '2026-03-09', slug: 'concierge-medicine-vs-insurance-practice-financial-comparison', published: true, category: 'Concierge Medicine', readTime: '18 min' },
    { title: 'Concierge Medicine Average Cost (2026): $75K\u2013$200K to Start in South Florida', excerpt: 'The average cost to start a concierge medical practice in 2026 is $75K\u2013$200K, with most Broward County physicians landing at $100K\u2013$175K. Full breakdown: entity setup, buildout, EHR, marketing, $19,750/mo fixed costs, and the S-Corp election timing most consultants forget.', date: '2026-03-08', slug: 'cost-starting-concierge-medical-practice', published: true, category: 'Concierge Medicine', readTime: '22 min' },
    { title: 'How Much Do Concierge Doctors Make in South Florida? (2026 Data)', excerpt: 'Concierge physicians in South Florida net $500K\u2013$1M+ with 200\u2013500 patients instead of 2,500. We break down revenue models, overhead, S-Corp tax savings of $17K\u2013$35K/year, and retirement strategies sheltering $200K\u2013$400K annually.', date: '2026-03-07', slug: 'concierge-medicine-income-south-florida', published: true, category: 'Concierge Medicine', readTime: '16 min' },
    { title: '1099 vs. W-2 in Your Healthcare or Service Practice: The Classification Mistake That Could Cost You $50,000+', excerpt: 'The IRS and DOL are cracking down on worker misclassification in healthcare and professional services. Dental hygienists, associate physicians, therapists, IT contractors\u2014if you\'re paying them on a 1099, you might owe back taxes, penalties, and benefits.', date: '2026-03-06', slug: '1099-vs-w2-worker-classification-healthcare-service-businesses-broward-county', published: true, category: 'Tax Strategy', readTime: '24 min' },
    { title: 'Not Tracking WIP? Your P&L Is Lying to You', excerpt: '$45K in labor sitting unbilled and invisible \u2014 not on the P&L, not on the balance sheet. Here\'s why service businesses that skip WIP tracking make decisions on fictional numbers.', date: '2026-03-08', slug: 'hidden-cost-not-tracking-wip', published: true, category: 'Accounting', readTime: '10 min' },
    { title: 'Stop Doing Your Own Books: The Real Cost of DIY Bookkeeping', excerpt: 'DIY bookkeeping looks free until you count your time, missed deductions, and IRS penalties. Here\'s the real math for SE Florida business owners \u2014 and when it makes sense to hand it off.', date: '2026-03-04', slug: 'stop-doing-your-own-books', published: true, category: 'Accounting', readTime: '10 min' },
    { title: '10 KPIs Every Healthcare Practice Should Track Daily (Not Monthly)', excerpt: 'Collection rate, AR aging, overhead ratio, DSO, cash runway \u2014 these 10 KPIs should update daily, not monthly. With specific benchmarks for dental, radiology, and physician practices so you know exactly where your numbers should be.', date: '2026-03-05', slug: 'real-time-financial-dashboards-healthcare-practices', published: true, category: 'Healthcare Finance', readTime: '11 min' },
    { title: 'Cash Conversion Cycle: How to Calculate CCC for Service Businesses', excerpt: 'The Cash Conversion Cycle tells you how many days cash is trapped between paying expenses and collecting revenue. For service businesses: CCC = DSO - DPO. Calculate yours in 5 minutes from QuickBooks.', date: '2026-03-04', slug: 'how-to-calculate-cash-conversion-cycle', published: true, category: 'Cash Flow', readTime: '9 min' },
    { title: 'AI Cash Flow Forecasting for Small Business: How It Actually Works', excerpt: 'We ran AI on real QuickBooks data and found $353K trapped in receivables and a $147K cash deficit hiding behind a profitable P&L. Here\'s how AI cash flow forecasting works for small businesses, what it catches that spreadsheets miss, and whether it\'s worth it.', date: '2026-03-14', slug: 'ai-cash-flow-forecasting-small-business', published: true, category: 'Cash Flow', readTime: '18 min' },
    { title: '5 Ways to Reduce DSO in 30 Days Without Losing Clients', excerpt: 'The average small business has $84,000 in unpaid invoices. These 5 strategies cut collection time without damaging relationships \u2014 most see results within 30 days. Includes the email template that works.', date: '2026-03-03', slug: 'improve-dso-without-sacrificing-relationships', published: true, category: 'Cash Flow', readTime: '10 min' },
    { title: 'Why Monthly Financial Reports Are Already Too Late', excerpt: 'By the time your accountant sends last month\'s P&L, the cash problem it reveals has been compounding for 30 days. One client discovered a $41K cash drain that a monthly report caught 3 weeks too late. Here\'s what real-time visibility looks like instead.', date: '2026-03-03', slug: 'why-monthly-reports-too-late', published: true, category: 'Cash Flow', readTime: '10 min' },
    { title: 'AI-Powered Cash Flow Intelligence: How Real-Time Data Fixes Your Biggest Business Problem', excerpt: 'Your biggest business problem isn\'t profit. It\'s cash flow. Discover how AI-powered data synthesis and real-time financial intelligence give SMB owners Fortune 500-level visibility into cash conversion cycles, working capital, and the metrics that actually control their cash position.', date: '2026-03-01', slug: 'ai-powered-cash-flow-intelligence', published: true, category: 'Cash Flow', readTime: '12 min' },
    { title: 'S-Corp Reasonable Compensation: How Much Should You Pay Yourself (And Why Getting It Wrong Costs More Than You Think)', excerpt: '73% of S-Corp audits focus on reasonable compensation. Pay yourself too little and the IRS reclassifies your distributions as wages. Pay yourself too much and you\'re overpaying FICA by thousands. Here\'s the definitive guide to finding your optimal salary.', date: '2026-02-27', slug: 's-corp-reasonable-compensation-healthcare-service-businesses-broward-county', published: true, category: 'Tax Strategy', readTime: '18 min' },
    { title: '7 Tax Deductions Your Broward County Practice Is Probably Missing (And the Dollar Amount of Each)', excerpt: 'The average medical practice overpays $15,000-$50,000 annually in taxes from missed deductions. From accountable plans to the Augusta Rule to retirement plan stacking\u2014here are 7 deductions most Broward County practice owners don\'t know about.', date: '2026-02-26', slug: 'missed-tax-deductions-healthcare-service-businesses-broward-county', published: true, category: 'Tax Strategy', readTime: '22 min' },
    { title: '2026 Tax Law Changes: What Every Broward County Practice Owner Needs to Know', excerpt: 'The One Big Beautiful Bill Act changed everything: 100% bonus depreciation is back, Section 179 jumped to $2.56M, QBI is permanent, and the dependent care FSA doubled to $7,500. Here\'s what Broward County practice owners and service business operators need to do before year-end.', date: '2026-02-26', slug: '2026-tax-law-changes-broward-county-healthcare-service-businesses', published: true, category: 'Tax Strategy', readTime: '26 min' },
    { title: 'Why Your Broward County Practice Is Profitable on Paper but Can\'t Make Payroll', excerpt: 'Medical practices wait 30-90 days for insurance reimbursement. Service firms chase invoices for months. Learn how Davie-based Benefique helps healthcare and professional services businesses across Broward County fix cash flow, collect faster, and stop running out of money.', date: '2026-02-26', slug: 'cash-flow-management-healthcare-service-businesses-broward-county', published: true, category: 'Healthcare Finance', readTime: '22 min' },
    { title: 'Case Study: Real-Time Collections Intelligence System for Multi-Center Radiology Group', excerpt: 'How we built interactive dashboards that identified a 30% revenue decline, eliminated the \'seasonality excuse,\' and quantified a multi-million dollar A/R crisis for a six-center diagnostic imaging group.', date: '2026-02-23', slug: 'radiology-collections-dashboard-case-study', published: true, category: 'Healthcare Finance', readTime: '15 min' },
    { title: 'Davie Accounting Services for Healthcare Practices & Service-Based Businesses', excerpt: 'Expert accounting services in Davie, FL for healthcare practices (radiology, surgery, dental, vet, pain clinics) and service businesses (law, marine, IT). Real-time reporting, monthly closes, 24-hour response.', date: '2026-02-12', slug: 'davie-accounting-services', published: true, category: 'Accounting', readTime: '12 min' },
    { title: 'R&D Tax Credits: Hidden Money for Healthcare Practices', excerpt: "Many healthcare businesses miss out on significant R&D credits. Here's how to identify and claim them.", date: '2026-02-05', slug: 'rd-tax-credits-healthcare', published: true, category: 'Tax Strategy', readTime: '10 min' },
    { title: 'Real-Time Dashboards That Actually Get Used', excerpt: 'Most business owners ignore their financial reports because they\'re boring PDFs full of numbers. Here\'s how we designed dashboards that clients check daily\u2014and why it matters.', date: '2026-01-31', slug: 'dashboards-that-get-used', published: true, category: 'Accounting', readTime: '10 min' },
    { title: 'December Financials: What to Review Before Year-End', excerpt: 'Key financial checkpoints every business owner should review before closing the books on the year.', date: '2026-10-15', slug: 'december-financials', published: false, category: 'Accounting', readTime: '8 min' },
    { title: 'Multi-Location Financial Management', excerpt: 'Best practices for businesses operating across multiple locations or entities.', date: '2025-08-05', slug: 'multi-location-management', published: false, category: 'Accounting', readTime: '10 min' },
  ];

  const publishedPosts = posts.filter(post => post.published);
  const categories = ['All', ...Array.from(new Set(publishedPosts.map(p => p.category)))];
  const filteredPosts = activeCategory === 'All' ? publishedPosts : publishedPosts.filter(p => p.category === activeCategory);
  const [heroPost, ...remainingPosts] = filteredPosts;

  const categoryColors = {
    'Concierge Medicine': 'bg-purple-100 text-purple-700',
    'Tax Strategy': 'bg-emerald-100 text-emerald-700',
    'Cash Flow': 'bg-blue-100 text-blue-700',
    'Healthcare Finance': 'bg-rose-100 text-rose-700',
    'Accounting': 'bg-amber-100 text-amber-700',
    'Business Strategy': 'bg-indigo-100 text-indigo-700',
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div>
      <Helmet>
        <title>Blog | Tax Tips & Financial Insights for South Florida Businesses | Benefique</title>
        <meta name="description" content="Practical tax planning, bookkeeping, and financial strategy advice for healthcare practices and service businesses in Broward County and South Florida." />
        <link rel="canonical" href="https://www.benefique.com/blog" />
      </Helmet>

      {/* Header */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-benefique-orange/10 text-benefique-orange px-3 py-1 rounded-full text-sm font-medium mb-6">
            Blog
          </div>
          <h1 className="text-4xl font-bold text-benefique-navy mb-3">Insights & Resources</h1>
          <p className="text-xl text-gray-600 mb-8">Practical advice on tax strategy, cash flow, and healthcare finance for South Florida business owners.</p>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeCategory === cat
                    ? 'bg-benefique-navy text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}{cat !== 'All' && ` (${publishedPosts.filter(p => p.category === cat).length})`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tool */}
      <section className="bg-gradient-to-r from-[#1B365D] to-[#2D4A6F] py-6">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/tools/concierge-simulator" className="flex flex-col md:flex-row items-center justify-between gap-4 group">
            <div className="text-white">
              <span className="inline-block bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2 py-0.5 rounded mb-2">INTERACTIVE TOOL</span>
              <h2 className="text-xl font-bold group-hover:text-blue-200 transition">Concierge Medicine Financial Simulator</h2>
              <p className="text-blue-200 text-sm">Slide to see how your P&L and cash flow change as you grow your patient panel. Three views: Absolute $, % Revenue, $ per Member.</p>
            </div>
            <span className="bg-white text-[#1B365D] font-semibold px-6 py-2.5 rounded-lg whitespace-nowrap hover:bg-blue-50 transition text-sm">
              Try the Simulator &rarr;
            </span>
          </Link>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          {/* Hero Post */}
          {heroPost && (
            <Link to={`/blog/${heroPost.slug}`} className="block mb-10 group">
              <article className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition md:flex">
                <div className="md:w-2/5 bg-benefique-navy/5 flex items-center justify-center p-8 md:p-12">
                  <div className="text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${categoryColors[heroPost.category] || 'bg-gray-100 text-gray-700'}`}>
                      {heroPost.category}
                    </span>
                    <div className="text-5xl md:text-6xl font-bold text-benefique-navy/10">
                      {heroPost.readTime}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">read</div>
                  </div>
                </div>
                <div className="md:w-3/5 p-6 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <span>{formatDate(heroPost.date)}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>{heroPost.readTime} read</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-benefique-navy mb-4 group-hover:text-benefique-orange transition">
                    {heroPost.title}
                  </h2>
                  <p className="text-gray-600 mb-6 line-clamp-3">{heroPost.excerpt}</p>
                  <span className="text-benefique-orange font-semibold group-hover:underline">
                    Read article →
                  </span>
                </div>
              </article>
            </Link>
          )}

          {/* Remaining Posts Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {remainingPosts.map(post => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="block group">
                <article className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition h-full flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400">{post.readTime} read</span>
                  </div>
                  <h2 className="text-lg font-bold text-benefique-navy mb-2 group-hover:text-benefique-orange transition leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{formatDate(post.date)}</span>
                    <span className="text-benefique-orange font-medium text-sm group-hover:underline">
                      Read →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center bg-white rounded-2xl p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-benefique-navy mb-2">Want advice specific to your business?</h3>
            <p className="text-gray-600 mb-4">We help healthcare practices and service businesses across Broward County with tax strategy, cash flow, and financial clarity.</p>
            <Link to="/contact" className="inline-block bg-benefique-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
              Schedule a Consultation →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// CONTACT PAGE
// ============================================================
function Contact() {
  return (
    <div>
      <Helmet>
        <title>Schedule a Consultation | Benefique Tax & Accounting | Davie, FL</title>
        <meta name="description" content="Ready to get clarity on your finances? Schedule a free consultation with Benefique Tax & Accounting in Davie, FL. Serving Broward, Miami-Dade, and Palm Beach." />
        <link rel="canonical" href="https://www.benefique.com/contact" />
      </Helmet>
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-benefique-orange/10 text-benefique-orange px-3 py-1 rounded-full text-sm font-medium mb-6">
            <span>✉️</span> Contact
          </div>
          <h1 className="text-4xl font-bold text-benefique-navy mb-4">Let's Talk</h1>
          <p className="text-xl text-gray-600">See if we're the right fit for your business</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold text-benefique-navy mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Ready to gain clarity in your finances? Fill out the application and we'll 
                reach out within 24 hours to schedule a discovery call.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-benefique-orange/10 rounded-lg flex items-center justify-center text-2xl">📍</div>
                  <div>
                    <div className="font-semibold text-benefique-navy">Location</div>
                    <div className="text-gray-600">Davie, Florida</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-benefique-orange/10 rounded-lg flex items-center justify-center text-2xl">📧</div>
                  <div>
                    <div className="font-semibold text-benefique-navy">Email</div>
                    <div className="text-gray-600">hello@benefique.com</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-benefique-orange/10 rounded-lg flex items-center justify-center text-2xl">🌐</div>
                  <div>
                    <div className="font-semibold text-benefique-navy">Website</div>
                    <div className="text-gray-600">www.benefique.com</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-benefique-navy mb-2">Quick Application</h3>
              <p className="text-gray-600 text-sm mb-6">Takes 60 seconds. We'll reach out within 24 hours.</p>
              
              <form action="https://formspree.io/f/mzdjjprp" method="POST" className="space-y-4">
                <input type="hidden" name="_subject" value="New Benefique Contact Application" />
                <input type="text" name="_gotcha" style={{display: 'none'}} />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input type="text" name="name" required placeholder="John Smith" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-benefique-orange focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" name="email" required placeholder="john@company.com" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-benefique-orange focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                  <input type="text" name="business" required placeholder="Acme Medical Group" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-benefique-orange focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Annual Revenue</label>
                  <select name="revenue" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-benefique-orange focus:border-transparent text-gray-600">
                    <option>Select range...</option>
                    <option>Under $500K</option>
                    <option>$500K - $1M</option>
                    <option>$1M - $5M</option>
                    <option>$5M - $10M</option>
                    <option>$10M+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Biggest Financial Headache Right Now?</label>
                  <textarea rows={3} name="headache" placeholder="What's keeping you up at night?" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-benefique-orange focus:border-transparent" />
                </div>
                <button type="submit" className="w-full bg-benefique-orange text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                  Submit Application
                </button>
                <p className="text-xs text-gray-500 text-center">
                  No spam. No sales pressure. Just an honest conversation about your numbers.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// DEMO PAGE - CFO Report & BFT Samples
// ============================================================
function Demo() {
  const [activeTab, setActiveTab] = React.useState('deepdive');

  const reports = {
    deepdive: {
      name: 'CFO Deep Dive',
      icon: '📊',
      frequency: 'Monthly / Quarterly',
      tagline: 'The full financial analysis — 13 sections, cash waterfall, 3-lens framework, scorecard, and prescriptive actions with dollar values.',
      description: 'This is the flagship report. Your entire business through three lenses: what the operator sees, what a banker sees, and what a buyer sees. Includes cash flow waterfall, collections intelligence, balance sheet analysis with FMV adjustments, trend analysis, and an "If We Were the CEO" section with three quantified actions. Real data from QBO, analyzed by AI, interpreted by an Enrolled Agent.',
      src: '/sample-cfo-report.html',
      openLabel: 'Open full 13-section report in new tab',
    },
    pulse: {
      name: 'CFO Weekly Pulse',
      icon: '⚡',
      frequency: 'Weekly',
      tagline: 'The dashboard check-in — key metrics, alerts, and trends at a glance. Designed to be scanned in 2 minutes.',
      description: 'Every Monday morning, this lands in your inbox. Cash position, revenue vs. target, margin alerts, and anything that moved more than 5% since last week. No 13-page analysis needed mid-week — just the vital signs. If something is off, the Deep Dive investigates why.',
      src: 'https://bft-demo-seven.vercel.app',
      openLabel: 'Open weekly pulse in new tab',
    },
    bft: {
      name: 'The Benefique Financial Times\u2122',
      icon: '📰',
      frequency: 'Monthly',
      tagline: 'Your financial story told as news — lead articles, trend analysis, and action items written in owner terms.',
      description: 'Numbers without narrative are noise. This newspaper-style report translates your financial data into stories your team can understand: what happened, why it matters, and what to do about it. Lead articles, financial tables, and trend analysis — written like a CFO briefing, not an accounting report.',
      src: 'https://bft-newspaper-demo.vercel.app',
      openLabel: 'Open Financial Times in new tab',
    },
  };

  const report = reports[activeTab];

  return (
    <div>
      <Helmet>
        <title>Sample Reports | CFO Deep Dive, Weekly Pulse, Financial Times | Benefique</title>
        <meta name="description" content="See what Benefique delivers: a quarterly CFO Deep Dive with cash waterfall and prescriptive actions, a weekly dashboard pulse, and a monthly Financial Times narrative. All from your QuickBooks data." />
        <link rel="canonical" href="https://www.benefique.com/demo" />
      </Helmet>

      {/* Hero */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-benefique-orange/10 text-benefique-orange px-3 py-1 rounded-full text-sm font-medium mb-6">
            Sample Reports
          </div>
          <h1 className="text-4xl font-bold text-benefique-navy mb-4">Three Reports. One Data Source. Complete Visibility.</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Every Fractional CFO client receives all three: a deep quarterly analysis, a weekly dashboard, and a monthly financial narrative. All generated from the same QuickBooks connection.
          </p>
        </div>
      </section>

      {/* Report Selector — 3 Tabs */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 py-4">
            {Object.entries(reports).map(([key, r]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-5 py-3 rounded-lg font-semibold transition text-sm ${
                  activeTab === key
                    ? 'bg-benefique-navy text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span className="mr-1.5">{r.icon}</span> {r.name}
                <span className={`ml-2 text-xs font-normal ${activeTab === key ? 'text-blue-200' : 'text-gray-400'}`}>
                  {r.frequency}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Report Description */}
      <section className="bg-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-start gap-6">
            <div className="text-4xl hidden sm:block">{report.icon}</div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-benefique-navy">{report.name}</h2>
                <span className="bg-benefique-orange/10 text-benefique-orange px-2.5 py-0.5 rounded-full text-xs font-semibold">{report.frequency}</span>
              </div>
              <p className="text-gray-800 font-medium mb-2">{report.tagline}</p>
              <p className="text-gray-600 text-sm">{report.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Report */}
      <section className="bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            {/* Demo Notice */}
            <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center">
              <p className="text-sm text-amber-800">
                <span className="font-semibold">Sample Report</span> — Anonymized client data. Your reports reflect your actual business.
              </p>
            </div>

            {/* Iframe */}
            <div className="relative" style={{ height: '800px' }}>
              <iframe
                src={report.src}
                className="w-full h-full border-0"
                title={report.name + ' Sample'}
              />
            </div>

            {/* Open in New Tab */}
            <div className="bg-gray-50 border-t border-gray-200 px-4 py-3 text-center">
              <a
                href={report.src}
                target="_blank"
                rel="noopener noreferrer"
                className="text-benefique-orange font-semibold hover:underline inline-flex items-center gap-2"
              >
                {report.openLabel} <span>&#8599;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Summary */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-benefique-navy mb-6 text-center">Every CFO Client Receives All Three</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl border border-gray-100 bg-gray-50">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-bold text-benefique-navy mb-1">CFO Deep Dive</h3>
              <p className="text-xs text-benefique-orange font-semibold mb-2">Monthly / Quarterly</p>
              <p className="text-gray-600 text-sm">The strategy document. Cash waterfall, 3-lens analysis, scorecard, and prescriptive actions with dollar values.</p>
            </div>
            <div className="text-center p-6 rounded-xl border border-gray-100 bg-gray-50">
              <div className="text-3xl mb-3">&#9889;</div>
              <h3 className="font-bold text-benefique-navy mb-1">CFO Weekly Pulse</h3>
              <p className="text-xs text-benefique-orange font-semibold mb-2">Every Monday</p>
              <p className="text-gray-600 text-sm">The vital signs check. Key metrics, alerts, and trends — scanned in 2 minutes.</p>
            </div>
            <div className="text-center p-6 rounded-xl border border-gray-100 bg-gray-50">
              <div className="text-3xl mb-3">📰</div>
              <h3 className="font-bold text-benefique-navy mb-1">Financial Times&trade;</h3>
              <p className="text-xs text-benefique-orange font-semibold mb-2">Monthly</p>
              <p className="text-gray-600 text-sm">The narrative layer. Your financial story told as news — for you and your team.</p>
            </div>
          </div>

          {/* Interactive Tool */}
          <div className="mt-10 bg-gradient-to-r from-[#1B365D] to-[#2D4A6F] rounded-xl p-6 text-center">
            <span className="inline-block bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2 py-0.5 rounded mb-2">INTERACTIVE TOOL</span>
            <h3 className="text-xl font-bold text-white mb-2">Concierge Medicine Financial Simulator</h3>
            <p className="text-blue-200 text-sm mb-4 max-w-lg mx-auto">
              Model a concierge practice from scratch. Adjust membership fees, staff costs, and physician salary — see P&L and cash flow waterfalls update in real time.
            </p>
            <Link to="/tools/concierge-simulator" className="inline-block bg-white text-[#1B365D] font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-50 transition text-sm">
              Try the Simulator &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-benefique-navy text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Want reports like this for your business?</h2>
          <p className="text-blue-100 mb-8">
            All three reports are included with every Fractional CFO engagement. Same QuickBooks data. Three formats. Complete financial visibility.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-benefique-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Schedule a Discovery Call
          </Link>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// OAUTH CALLBACK PAGE (QuickBooks Authorization)
// ============================================================
function OAuthCallback() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get('code');
  const realmId = params.get('realmId');
  const state = params.get('state');
  const error = params.get('error');

  return (
    <div>
      <section className="bg-white py-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-benefique-navy mb-4">QuickBooks Authorization</h1>
          
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-red-800 mb-2">❌ Authorization Failed</h2>
              <p className="text-red-700">Error: {error}</p>
              <p className="text-red-600 mt-2">Please contact hello@benefique.com</p>
            </div>
          ) : code && realmId ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-green-800 mb-4">✅ Authorization Successful!</h2>
              <p className="text-green-700 mb-6">
                QuickBooks has authorized Benefique Client Monitor to access your company data.
              </p>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-bold text-benefique-navy mb-3">📋 Copy These Values:</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Authorization Code:</label>
                  <div className="bg-gray-50 border border-gray-300 rounded p-3 font-mono text-sm break-all">
                    {code}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Realm ID (Company ID):</label>
                  <div className="bg-gray-50 border border-gray-300 rounded p-3 font-mono text-sm break-all">
                    {realmId}
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-bold text-blue-800 mb-2">🔧 Next Steps:</h3>
                <p className="text-blue-700 mb-3">
                  Send the code and realm ID to your Benefique contact. They will complete the setup.
                </p>
                <p className="text-sm text-blue-600">
                  You can close this window once you've copied the values above.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-yellow-800 mb-2">⚠️ Invalid Callback</h2>
              <p className="text-yellow-700">Missing authorization parameters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ============================================================
// TERMS OF SERVICE PAGE (for Benefique Client Monitor / QBO API)
// ============================================================
function Terms() {
  return (
    <div>
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-benefique-navy mb-4">Terms of Service</h1>
          <h2 className="text-xl text-gray-600 mb-2">Benefique Client Monitor</h2>
          <p className="text-gray-600 mb-8">Effective Date: January 23, 2026</p>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-6">
              These Terms of Service ("Terms") govern access to and use of <strong>Benefique Client Monitor</strong> (the "Service"), 
              operated by <strong>Benefique Capital LLC</strong> ("Benefique," "we," "us," or "our").
            </p>
            <p className="mb-8">
              By accessing or using the Service, you agree to these Terms.
            </p>

            <h2 className="text-2xl font-bold text-benefique-navy mt-8 mb-4">1. Intended users</h2>
            <p className="mb-6">
              The Service is intended <strong>solely for existing clients of Benefique</strong> and authorized users designated by those clients. 
              You represent that you have the authority to connect your organization's QuickBooks Online account and to permit Benefique 
              to access and use the data as described in these Terms and the Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold text-benefique-navy mt-8 mb-4">2. Description of the Service</h2>
            <p className="mb-4">
              The Service provides <strong>read-only monitoring, reporting, and analytics</strong> based on data retrieved from 
              <strong> QuickBooks Online ("QBO")</strong> and other data sources you authorize.
            </p>
            <p className="mb-6">
              The Service does <strong>not</strong> create, modify, or delete transactions in QBO, initiate payments, or perform any write-back actions.
            </p>

            <h2 className="text-2xl font-bold text-benefique-navy mt-8 mb-4">3. Client responsibilities</h2>
            <p className="mb-2">You agree to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Use the Service only for lawful business purposes</li>
              <li>Ensure you have the right to provide and authorize access to connected data</li>
              <li>Review outputs and reports for accuracy and appropriateness for your business</li>
              <li>Maintain appropriate internal controls over who is authorized to view the Service</li>
            </ul>

            <h2 className="text-2xl font-bold text-benefique-navy mt-8 mb-4">4. No professional advice through the Service</h2>
            <p className="mb-6">
              Information displayed in the Service is provided for <strong>informational and monitoring purposes only</strong>. 
              While Benefique may provide accounting, tax, or advisory services under separate engagement agreements, 
              the Service itself does not constitute professional advice or replace formal reports, filings, or consultations.
            </p>

            <h2 className="text-2xl font-bold text-benefique-navy mt-8 mb-4">5. Availability and changes</h2>
            <p className="mb-6">
              We may modify, suspend, or discontinue the Service (in whole or in part) at any time. 
              We do not guarantee uninterrupted or error-free availability.
            </p>

            <h2 className="text-2xl font-bold text-benefique-navy mt-8 mb-4">6. Data handling and security</h2>
            <p className="mb-6">
              We use reasonable safeguards to protect data handled through the Service. Details regarding data collection, storage, 
              and retention are described in the Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold text-benefique-navy mt-8 mb-4">7. Intellectual property</h2>
            <p className="mb-6">
              All rights, title, and interest in the Service (excluding client data) are owned by Benefique or its licensors. 
              You are granted a limited, revocable, non-transferable right to use the Service solely as permitted under these Terms.
            </p>

            <h2 className="text-2xl font-bold text-benefique-navy mt-8 mb-4">8. Termination</h2>
            <p className="mb-2">Access to the Service may be suspended or terminated if:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>You are no longer an active Benefique client</li>
              <li>These Terms are violated</li>
              <li>Continued access poses legal, security, or operational risk</li>
            </ul>
            <p className="mb-6">
              Upon termination, access may be removed and data handling will follow the Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold text-benefique-navy mt-8 mb-4">9. Disclaimers</h2>
            <p className="mb-6">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE." TO THE MAXIMUM EXTENT PERMITTED BY LAW, BENEFIQUE DISCLAIMS 
              ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, 
              AND NON-INFRINGEMENT.
            </p>

            <h2 className="text-2xl font-bold text-benefique-navy mt-8 mb-4">10. Limitation of liability</h2>
            <p className="mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, BENEFIQUE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, 
              SPECIAL, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, DATA, OR BUSINESS INTERRUPTION ARISING OUT OF OR 
              RELATING TO THE SERVICE.
            </p>
            <p className="mb-6">
              BENEFIQUE'S TOTAL LIABILITY FOR ANY CLAIM RELATING TO THE SERVICE SHALL NOT EXCEED THE FEES PAID FOR THE SERVICE 
              DURING THE <strong>THREE (3) MONTHS</strong> PRECEDING THE EVENT GIVING RISE TO THE CLAIM.
            </p>

            <h2 className="text-2xl font-bold text-benefique-navy mt-8 mb-4">11. Third-party services</h2>
            <p className="mb-6">
              The Service integrates with third-party platforms, including QuickBooks Online. Such platforms are governed by their own 
              terms and policies, and Benefique is not responsible for third-party services.
            </p>

            <h2 className="text-2xl font-bold text-benefique-navy mt-8 mb-4">12. Governing law</h2>
            <p className="mb-6">
              These Terms are governed by the laws of the State of Florida, without regard to conflict-of-law principles. 
              Venue shall lie in Florida courts with appropriate jurisdiction.
            </p>

            <h2 className="text-2xl font-bold text-benefique-navy mt-8 mb-4">13. Contact</h2>
            <p className="mb-4">Questions regarding these Terms may be directed to:</p>
            <p className="mb-2"><strong>Benefique Capital LLC</strong></p>
            <p className="mb-6">Email: <a href="mailto:hello@benefique.com" className="text-benefique-orange hover:underline">hello@benefique.com</a></p>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// PRIVACY POLICY PAGE (for Benefique Client Monitor / QBO API)
// ============================================================
function Privacy() {
  return (
    <div>
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-benefique-navy mb-4">Privacy Policy</h1>
          <h2 className="text-xl text-gray-600 mb-2">Benefique Client Monitor</h2>
          <p className="text-gray-600 mb-8">Effective Date: January 23, 2026</p>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-6">
              This Privacy Policy explains how <strong>Benefique Capital LLC</strong> ("Benefique," "we," "us," or "our") 
              collects, uses, stores, and protects information in connection with <strong>Benefique Client Monitor</strong> (the "Service").
            </p>

            <h2 className="text-2xl font-bold text-benefique-navy mt-8 mb-4">1. Scope</h2>
            <p className="mb-6">
              This Policy applies to the Service and related web pages. It does not apply to third-party platforms you connect, 
              including QuickBooks Online, which are governed by their own privacy policies.
            </p>

            <h2 className="text-2xl font-bold text-benefique-navy mt-8 mb-4">2. Information we collect</h2>
            
            <h3 className="text-xl font-semibold text-benefique-navy mt-6 mb-3">A. QuickBooks Online data</h3>
            <p className="mb-3">
              With your authorization, the Service accesses <strong>read-only</strong> data from QBO, which may include:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Company and account metadata</li>
              <li>Chart of accounts</li>
              <li>Transaction data and summaries (e.g., invoices, bills, payments, deposits, journal entries)</li>
              <li>Customer and vendor information</li>
              <li>Financial reports (e.g., Profit & Loss, Balance Sheet, A/R and A/P aging)</li>
            </ul>
            <p className="mb-6">
              We access only data necessary to provide monitoring, reporting, and analytics.
            </p>

            <h3 className="text-xl font-semibold text-benefique-navy mt-6 mb-3">B. User-provided information</h3>
            <p className="mb-6">
              We may collect contact and account information such as name, email address, role, and configuration settings 
              related to your use of the Service.
            </p>

            <h3 className="text-xl font-semibold text-benefique-navy mt-6 mb-3">C. Technical information</h3>
            <p className="mb-6">
              We may collect limited technical data (e.g., IP address, device type, usage logs) for security, diagnostics, 
              and performance optimization.
            </p>

            <h2 className="text-2xl font-bold text-benefique-navy mt-8 mb-4">3. How information is used</h2>
            <p className="mb-2">Information is used to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Provide dashboards, reports, and analytics</li>
              <li>Maintain and improve Service reliability and performance</li>
              <li>Support client service and troubleshooting</li>
              <li>Comply with legal and regulatory obligations</li>
            </ul>

            <h2 className="text-2xl font-bold text-benefique-navy mt-8 mb-4">4. Data storage and retention</h2>
            <p className="mb-3">
              Certain QBO data may be <strong>stored in a database</strong> to support:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Historical trend analysis</li>
              <li>Performance optimization and reliability</li>
              <li>Consistency of reporting outputs</li>
            </ul>
            <p className="mb-6">
              Data is retained only as long as reasonably necessary to provide the Service, meet client support needs, 
              or comply with legal or operational requirements.
            </p>

            <h2 className="text-2xl font-bold text-benefique-navy mt-8 mb-4">5. Data sharing</h2>
            <p className="mb-4">
              Benefique does <strong>not</strong> sell client data or personal information.
            </p>
            <p className="mb-2">Data may be shared only with:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Service providers acting on our behalf under confidentiality obligations</li>
              <li>Authorized users within your organization</li>
              <li>Legal or regulatory authorities when required by law</li>
              <li>Other parties with your explicit instruction or consent</li>
            </ul>

            <h2 className="text-2xl font-bold text-benefique-navy mt-8 mb-4">6. Security</h2>
            <p className="mb-6">
              We employ reasonable administrative, technical, and organizational safeguards to protect information. 
              No system can guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold text-benefique-navy mt-8 mb-4">7. Your rights and choices</h2>
            <p className="mb-2">You may request:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Information about data associated with your account</li>
              <li>Deletion of stored data associated with your organization, subject to legal or operational retention requirements</li>
            </ul>
            <p className="mb-6">
              Requests can be made by contacting <a href="mailto:hello@benefique.com" className="text-benefique-orange hover:underline">hello@benefique.com</a>.
            </p>

            <h2 className="text-2xl font-bold text-benefique-navy mt-8 mb-4">8. Disconnecting QuickBooks Online</h2>
            <p className="mb-6">
              If QBO access is disconnected, the Service will stop retrieving new data. Previously stored data may remain 
              for the retention period described above unless deletion is requested.
            </p>

            <h2 className="text-2xl font-bold text-benefique-navy mt-8 mb-4">9. Children's privacy</h2>
            <p className="mb-6">
              The Service is not intended for children under the age of 13.
            </p>

            <h2 className="text-2xl font-bold text-benefique-navy mt-8 mb-4">10. Updates to this Policy</h2>
            <p className="mb-6">
              We may update this Policy periodically. The "Effective Date" reflects the most current version.
            </p>

            <h2 className="text-2xl font-bold text-benefique-navy mt-8 mb-4">11. Contact</h2>
            <p className="mb-2">Privacy questions or requests:</p>
            <p className="mb-2"><strong>Benefique Capital LLC</strong></p>
            <p className="mb-6">Email: <a href="mailto:hello@benefique.com" className="text-benefique-orange hover:underline">hello@benefique.com</a></p>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// WESTON BOOKKEEPING LANDING PAGE
// ============================================================
function WestonBookkeeping() {
  return (
    <div>
      <Helmet>
        <title>Bookkeeping Services in Weston, FL | Benefique Tax & Accounting</title>
        <meta name="description" content="Professional bookkeeping services for Weston, FL businesses. Real-time books in QuickBooks Online, monthly closes by the 7th, payroll, tax planning. Based 10 minutes away in Davie." />
        <link rel="canonical" href="https://www.benefique.com/weston-bookkeeping" />
      </Helmet>

      {/* Hero */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-benefique-orange/10 text-benefique-orange px-3 py-1 rounded-full text-sm font-medium mb-6">
            <span>📍</span> Weston, Florida
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-benefique-navy leading-tight mb-6">
            Bookkeeping Services in Weston, FL
          </h1>

          <div className="bg-gray-50 border-l-4 border-benefique-orange p-6 rounded-r-xl mb-8 max-w-3xl">
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Benefique Tax & Accounting</strong> provides bookkeeping and full-service accounting
              for Weston businesses from our office in Davie — 10 minutes down I-75. We work exclusively
              in QuickBooks Online, close your books by the 7th of every month, and respond within 24 hours.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <Link
              to="/contact"
              className="bg-benefique-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition inline-flex items-center gap-2"
            >
              Get a Free Consultation <span>&rarr;</span>
            </Link>
            <Link
              to="/services"
              className="border-2 border-benefique-navy text-benefique-navy px-6 py-3 rounded-lg font-semibold hover:bg-benefique-navy hover:text-white transition"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-gray-50 py-6 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              '✓ Books Closed by the 7th',
              '✓ 24-Hour Response Time',
              '✓ QuickBooks Online Experts',
              '✓ Real-Time Dashboards'
            ].map((item, i) => (
              <span key={i} className="text-gray-700 font-medium">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-benefique-navy mb-8">
            What Weston Business Owners Get
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="font-bold text-benefique-navy mb-2">Real-Time Bookkeeping</h3>
              <p className="text-gray-600 text-sm">
                Transactions categorized daily in QBO. Your books are always current — not 60 days behind.
                Monthly close by the 7th, review call by the 10th.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="font-bold text-benefique-navy mb-2">Payroll Processing</h3>
              <p className="text-gray-600 text-sm">
                We handle payroll runs, quarterly filings, W-2s, and 1099s. Integrated with your books so
                labor costs hit your P&L automatically.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="font-bold text-benefique-navy mb-2">Proactive Tax Planning</h3>
              <p className="text-gray-600 text-sm">
                Tax-ready any day of the year. We run quarterly projections, catch entity structure
                issues early, and coordinate with your CPA or handle your returns directly.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="font-bold text-benefique-navy mb-2">Fractional CFO</h3>
              <p className="text-gray-600 text-sm">
                Cash flow forecasting, KPI dashboards, and financial strategy for Weston businesses
                doing $500K to $10M+ in revenue. A full finance department without the full-time cost.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-benefique-navy mb-6">
            Why Weston Businesses Work with Us
          </h2>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              Weston has one of the highest concentrations of professional services firms and healthcare
              practices in Broward County — from offices along Weston Road and Indian Trace to practices
              near Cleveland Clinic Florida. These are businesses generating real revenue that need more
              than a part-time bookkeeper filing bank statements into a shoebox.
            </p>
            <p>
              We serve Weston business owners who want their books done right, on time, every month. Our
              team of four full-time accountants works inside your QuickBooks Online file daily. You get a
              dedicated point of contact, not a rotating cast of juniors.
            </p>
            <p>
              Our Davie office is 10 minutes from Weston Town Center via I-75 or Weston Road. We meet
              in person when it matters, and everything else runs through real-time dashboards and same-day
              responses. We also serve businesses throughout Broward County including Pembroke Pines,
              Southwest Ranches, and Plantation.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-benefique-navy text-center mb-4">
            Bookkeeping Questions from Weston Business Owners
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Common questions about our bookkeeping services
          </p>

          <div className="space-y-4">
            {[
              {
                q: 'How much do bookkeeping services cost in Weston?',
                a: 'It depends on transaction volume, payroll complexity, and whether you need tax planning or CFO services. Most of our Weston clients are in the $1,500-$4,000/month range for full-service accounting — which replaces a bookkeeper, payroll service, and tax preparer.'
              },
              {
                q: 'Do you only work with healthcare practices?',
                a: 'Healthcare is our specialty, but we serve any established service business in Weston doing $500K+ in revenue — law firms, IT companies, marine services, and professional services.'
              },
              {
                q: 'Can you take over my existing QuickBooks file?',
                a: 'Yes. We onboard into your existing QBO file, clean up any prior-period issues, and have your books current within 30 days. No migration to a different platform required.'
              },
              {
                q: 'What\'s the difference between bookkeeping and what Benefique does?',
                a: 'A bookkeeper records transactions. We do that plus monthly closes by the 7th, payroll, quarterly tax projections, real-time dashboards, and proactive financial advice. It\'s a complete accounting department.'
              },
              {
                q: 'Are you located in Weston?',
                a: 'Our office is in Davie, FL — about 10 minutes from Weston via I-75. We serve Weston, Pembroke Pines, Southwest Ranches, Plantation, and all of western Broward County.'
              }
            ].map((faq, i) => (
              <details key={i} className="bg-white rounded-xl border border-gray-200 group">
                <summary className="px-6 py-4 cursor-pointer font-semibold text-benefique-navy hover:text-benefique-orange transition list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                </summary>
                <div className="px-6 pb-4 text-gray-600">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Areas */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-lg font-bold text-benefique-navy mb-4 text-center">Also Serving Nearby Areas</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['Davie', 'Plantation', 'Pembroke Pines', 'Southwest Ranches', 'Miramar'].map((area) => (
              <Link
                key={area}
                to={`/${area.toLowerCase().replace(/\s+/g, '-')}-accounting`}
                className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-benefique-orange/10 hover:text-benefique-orange transition"
              >
                {area}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-benefique-navy text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Talk Bookkeeping?</h2>
          <p className="text-blue-100 mb-8">
            Schedule a free call. We&apos;ll look at your current setup and tell you exactly what we can do.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-benefique-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Schedule Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// LOCATION PAGE COMPONENT - SEO Optimized (Jesse Cunningham Style)
// ============================================================
function LocationPage({ city, nearby, zipCodes, description }) {
  const citySlug = city.toLowerCase().replace(/\s+/g, '-');
  
  const faqs = [
    {
      q: `What accounting services does Benefique offer in ${city}?`,
      a: `Benefique provides full-service accounting, fractional CFO services, bookkeeping, payroll processing, tax planning, and real-time financial reporting for businesses in ${city} and throughout South Florida.`
    },
    {
      q: `How quickly can Benefique close my books each month?`,
      a: `We close books by the 7th business day of each month, with a review call by the 10th. This gives you timely financial data to make informed decisions.`
    },
    {
      q: `Does Benefique work with healthcare practices in ${city}?`,
      a: `Yes! We specialize in healthcare practices including radiology centers, dental practices, veterinary clinics, and medical offices throughout ${city} and Broward County.`
    },
    {
      q: `What industries does Benefique serve in ${city}?`,
      a: `We focus on healthcare practices (radiology, dental, veterinary) and service-based businesses including marine services, IT companies, law firms, and professional services firms in ${city}.`
    },
    {
      q: `How is Benefique different from other accountants in ${city}?`,
      a: `We provide real-time accounting with 24-hour response times, decision-ready dashboards, and proactive tax planning — not just year-end compliance. We're a complete accounting department, not just a bookkeeper.`
    }
  ];

  return (
    <div>
      {/* Hero with Direct Answer Block */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-benefique-orange/10 text-benefique-orange px-3 py-1 rounded-full text-sm font-medium mb-6">
            <span>📍</span> {city}, Florida
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-benefique-navy leading-tight mb-6">
            {city} Accounting &<br />Fractional CFO Services
          </h1>
          
          {/* Direct Answer Block for AI/Featured Snippets */}
          <div className="bg-gray-50 border-l-4 border-benefique-orange p-6 rounded-r-xl mb-8 max-w-3xl">
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Benefique Tax & Accounting</strong> provides full-service accounting and fractional CFO services 
              for businesses in {city}, FL. We specialize in healthcare practices and service-based businesses, 
              offering real-time books, monthly closes by the 7th, and 24-hour response times.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <Link
              to="/contact"
              className="bg-benefique-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition inline-flex items-center gap-2"
            >
              Get a Free Consultation <span>→</span>
            </Link>
            <Link
              to="/services"
              className="border-2 border-benefique-navy text-benefique-navy px-6 py-3 rounded-lg font-semibold hover:bg-benefique-navy hover:text-white transition"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-gray-50 py-6 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              '✓ Books Closed by the 7th',
              '✓ 24-Hour Response Time',
              '✓ Healthcare Specialists',
              '✓ Real-Time Dashboards'
            ].map((item, i) => (
              <span key={i} className="text-gray-700 font-medium">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Services for Location */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-benefique-navy text-center mb-4">
            Accounting Services in {city}
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            {description || `Comprehensive financial services for ${city} businesses — from startups to established practices.`}
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '📊', title: 'Fractional CFO', desc: `Strategic financial leadership for ${city} businesses. Monthly dashboards, cash flow forecasting, and growth planning.`, link: '/services/fractional-cfo' },
              { icon: '📚', title: 'Full-Service Accounting', desc: 'Bookkeeping, payroll, AP management, and monthly closes — a complete accounting department.', link: '/services/real-time-accounting' },
              { icon: '🎯', title: 'Tax Planning', desc: `Proactive tax strategies for ${city} businesses. R&D credits, entity optimization, and year-round planning.`, link: '/services' },
              { icon: '🏥', title: 'Healthcare Accounting', desc: 'Specialized services for radiology, dental, veterinary, and medical practices.', link: '/industries/radiology' },
              { icon: '⚓', title: 'Marine Services', desc: 'Financial management for marine and industrial service companies.', link: '/industries/marine-services' },
              { icon: '📱', title: 'Real-Time Dashboards', desc: 'See your numbers anytime. Decision-ready reports updated continuously.', link: '/demo' },
            ].map((service) => (
              <Link key={service.title} to={service.link} className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:border-benefique-orange/30 transition group">
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="text-lg font-bold text-benefique-navy mb-2 group-hover:text-benefique-orange transition">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blog Post - Davie Only */}
      {city === 'Davie' && (
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-benefique-navy mb-3">From Our Blog</h2>
            <p className="text-gray-600 mb-4">Learn more about accounting services in Davie, FL</p>
            <Link to="/blog/davie-accounting-services" className="text-benefique-orange font-semibold hover:underline">
              Davie Accounting Services: What Local Businesses Need to Know →
            </Link>
          </div>
        </section>
      )}

      {/* Weston-Specific Content */}
      {city === 'Weston' && (
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-benefique-navy mb-6">Why Weston Businesses Choose Benefique</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-benefique-navy mb-2">Healthcare Hub</h3>
                <p className="text-gray-600 text-sm">
                  Weston is home to Cleveland Clinic Florida, dozens of specialist practices, and a concentration
                  of healthcare professionals who need accounting that understands payer mix, collections cycles,
                  and multi-provider compensation. We serve radiology, dental, veterinary, and concierge medicine
                  practices across Weston.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-benefique-navy mb-2">15 Minutes from Our Office</h3>
                <p className="text-gray-600 text-sm">
                  Our Davie headquarters is a short drive from Weston via I-75 or Weston Road. Close enough
                  for in-person meetings when you need them, with real-time digital dashboards so you never
                  have to wait for a report.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-benefique-navy mb-2">Not Just Bookkeeping</h3>
                <p className="text-gray-600 text-sm">
                  Weston businesses generating $500K-$10M+ in revenue have outgrown basic bookkeeping.
                  We provide a complete accounting department: real-time books, proactive tax planning, payroll,
                  and AI-powered financial intelligence that turns your QuickBooks data into an ROI center.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-benefique-navy mb-2">Cash Flow Intelligence</h3>
                <p className="text-gray-600 text-sm">
                  Our AI-powered cash flow analysis finds what your P&amp;L is hiding. Clients typically discover
                  $20K-$350K in trapped cash, tax savings, or operational improvements within the first 90 days.
                </p>
                <Link to="/blog/accountant-cost-center-roi-center" className="text-benefique-orange text-sm font-semibold hover:underline mt-2 inline-block">
                  See a real case study &rarr;
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="font-bold text-benefique-navy mb-3">Weston ZIP Codes We Serve</h3>
              <div className="flex flex-wrap gap-2">
                {['33326', '33327', '33331', '33332'].map(z => (
                  <span key={z} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">{z}</span>
                ))}
              </div>
              <p className="text-gray-500 text-xs mt-2">Including Weston Town Center, Weston Hills, The Ridges, Savanna, and all Weston communities.</p>
            </div>
          </div>
        </section>
      )}

      {/* ZIP Codes for non-Weston cities that have them */}
      {city !== 'Weston' && zipCodes && zipCodes.length > 0 && (
        <section className="py-8 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h3 className="font-bold text-benefique-navy mb-3">{city} ZIP Codes We Serve</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {zipCodes.map(z => (
                <span key={z} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">{z}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section with Schema-Ready Structure */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-benefique-navy text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Common questions about accounting services in {city}
          </p>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl border border-gray-200 group">
                <summary className="px-6 py-4 cursor-pointer font-semibold text-benefique-navy hover:text-benefique-orange transition list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-4 text-gray-600">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Areas */}
      {nearby && nearby.length > 0 && (
        <section className="py-12 bg-white border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-lg font-bold text-benefique-navy mb-4 text-center">Also Serving Nearby Areas</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {nearby.map((area) => (
                <Link
                  key={area}
                  to={`/${area.toLowerCase().replace(/\s+/g, '-')}-accounting`}
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-benefique-orange/10 hover:text-benefique-orange transition"
                >
                  {area}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-benefique-navy text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started in {city}?</h2>
          <p className="text-blue-100 mb-8">
            Schedule a free consultation to see how we can help your {city} business grow.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-benefique-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Schedule Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// INDUSTRY PAGE COMPONENT - SEO Optimized (Jesse Cunningham Style)
// ============================================================
function IndustryPage({ industry, icon, services, challenges, testimonial }) {
  const industrySlug = industry.toLowerCase().replace(/\s+/g, '-');
  
  const faqs = [
    {
      q: `What accounting services does Benefique offer for ${industry}?`,
      a: `Benefique provides full-service accounting, fractional CFO services, bookkeeping, payroll, tax planning, and industry-specific financial reporting for ${industry} businesses throughout South Florida.`
    },
    {
      q: `Does Benefique understand the unique needs of ${industry}?`,
      a: `Yes! We specialize in ${industry} and understand the specific challenges including ${challenges?.slice(0, 2).join(', ') || 'complex billing, cash flow management, and compliance requirements'}.`
    },
    {
      q: `How can a fractional CFO help my ${industry} business?`,
      a: `A fractional CFO provides strategic financial leadership — cash flow forecasting, profitability analysis, KPI dashboards, and growth planning — at a fraction of the cost of a full-time CFO.`
    },
    {
      q: `What makes Benefique different for ${industry}?`,
      a: `We offer real-time accounting (not year-old history), books closed by the 7th, 24-hour response times, and decision-ready dashboards specifically designed for ${industry} operations.`
    }
  ];

  return (
    <div>
      {/* Hero with Direct Answer Block */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-benefique-orange/10 text-benefique-orange px-3 py-1 rounded-full text-sm font-medium mb-6">
            <span>{icon || '🏢'}</span> {industry}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-benefique-navy leading-tight mb-6">
            {industry} Accounting &<br />Fractional CFO Services
          </h1>
          
          {/* Direct Answer Block for AI/Featured Snippets */}
          <div className="bg-gray-50 border-l-4 border-benefique-orange p-6 rounded-r-xl mb-8 max-w-3xl">
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Benefique Tax & Accounting</strong> specializes in accounting and fractional CFO services 
              for {industry} businesses in South Florida. We provide real-time financial reporting, 
              monthly closes by the 7th, and industry-specific KPI dashboards to help you grow.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <Link
              to="/contact"
              className="bg-benefique-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition inline-flex items-center gap-2"
            >
              Get a Free Consultation <span>→</span>
            </Link>
            <Link
              to="/demo"
              className="border-2 border-benefique-navy text-benefique-navy px-6 py-3 rounded-lg font-semibold hover:bg-benefique-navy hover:text-white transition"
            >
              See Sample Reports
            </Link>
          </div>
        </div>
      </section>

      {/* Industry Challenges */}
      {challenges && challenges.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-benefique-navy text-center mb-4">
              {industry} Financial Challenges We Solve
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Running a {industry.toLowerCase()} business comes with unique financial complexities. We get it.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((challenge, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-gray-100">
                  <div className="w-10 h-10 bg-benefique-orange/10 rounded-lg flex items-center justify-center text-benefique-orange font-bold mb-4">
                    {i + 1}
                  </div>
                  <p className="text-gray-700">{challenge}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services for Industry */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-benefique-navy text-center mb-4">
            Our Services for {industry}
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Comprehensive financial solutions tailored for {industry.toLowerCase()} operations
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {(services || [
              { title: 'Fractional CFO', desc: 'Strategic financial leadership with industry-specific KPIs and dashboards' },
              { title: 'Full-Service Bookkeeping', desc: 'Accurate books closed by the 7th of every month' },
              { title: 'Payroll & HR Support', desc: 'Payroll processing, benefits tracking, and compliance' },
              { title: 'Tax Planning & Preparation', desc: 'Proactive strategies to minimize tax burden' },
              { title: 'Cash Flow Management', desc: 'Forecasting and optimization for healthy cash positions' },
              { title: 'Financial Reporting', desc: 'Decision-ready dashboards and owner-friendly reports' },
            ]).map((service, i) => (
              <div key={i} className="flex items-start gap-4 bg-gray-50 rounded-xl p-6">
                <div className="text-benefique-orange text-2xl">✓</div>
                <div>
                  <h3 className="font-bold text-benefique-navy mb-1">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {testimonial && (
        <section className="py-16 bg-benefique-navy text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="text-5xl text-benefique-orange mb-6">"</div>
            <blockquote className="text-2xl font-light mb-6 leading-relaxed">
              {testimonial.quote}
            </blockquote>
            <div className="text-blue-200">
              <span className="font-semibold text-white">{testimonial.name}</span>
              {testimonial.business && <span> — {testimonial.business}</span>}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-benefique-navy text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Common questions about accounting for {industry.toLowerCase()}
          </p>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl border border-gray-200 group">
                <summary className="px-6 py-4 cursor-pointer font-semibold text-benefique-navy hover:text-benefique-orange transition list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-4 text-gray-600">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Industries */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-lg font-bold text-benefique-navy mb-4 text-center">Other Industries We Serve</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: 'Radiology & Imaging', path: '/industries/radiology' },
              { name: 'Dental Practices', path: '/industries/dental' },
              { name: 'Veterinary Clinics', path: '/industries/veterinary' },
              { name: 'Marine Services', path: '/industries/marine-services' },
            ].filter(ind => ind.name !== industry).map((ind) => (
              <Link
                key={ind.name}
                to={ind.path}
                className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-benefique-orange/10 hover:text-benefique-orange transition"
              >
                {ind.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-benefique-navy text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Grow Your {industry} Business?</h2>
          <p className="text-blue-100 mb-8">
            Schedule a free consultation to see how we can help.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-benefique-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Schedule Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// SERVICE PAGE COMPONENT - Real-Time Accounting
// ============================================================
function RealTimeAccountingPage() {
  const faqs = [
    {
      q: 'What is real-time accounting?',
      a: 'Real-time accounting means your books are updated continuously throughout the month, not just at year-end. You always know your exact financial position — cash, revenue, expenses, profitability — without waiting or asking.'
    },
    {
      q: 'How is this different from traditional bookkeeping?',
      a: 'Traditional bookkeeping often runs 30-90 days behind. Real-time accounting keeps you current. Books are closed by the 7th of each month, with a review call by the 10th. You make decisions based on current data, not history.'
    },
    {
      q: 'What technology do you use for real-time accounting?',
      a: 'We use cloud-based accounting platforms (QuickBooks Online, Xero) with bank feeds, automated categorization, and custom dashboards. You can see your numbers anytime from any device.'
    },
    {
      q: 'Is real-time accounting more expensive?',
      a: 'Our full-service accounting includes real-time capabilities at no extra cost. You get bookkeeping, payroll, tax preparation, and dashboards — a complete accounting department for one predictable monthly fee.'
    },
    {
      q: 'How quickly can you get my books current?',
      a: 'Most clients are fully onboarded and current within 30-60 days. We handle the cleanup and catch-up work, then maintain real-time accuracy going forward.'
    }
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-benefique-orange/10 text-benefique-orange px-3 py-1 rounded-full text-sm font-medium mb-6">
            <span>⚡</span> Core Service
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-benefique-navy leading-tight mb-6">
            Real-Time Accounting<br />for South Florida Businesses
          </h1>
          
          {/* Direct Answer Block */}
          <div className="bg-gray-50 border-l-4 border-benefique-orange p-6 rounded-r-xl mb-8 max-w-3xl">
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Real-time accounting</strong> means your books are always current — not 30, 60, or 90 days behind. 
              At Benefique, we close books by the 7th of every month, provide decision-ready dashboards, and guarantee 
              24-hour response times. Know your numbers today, not next quarter.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <Link
              to="/contact"
              className="bg-benefique-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition inline-flex items-center gap-2"
            >
              Get Real-Time Books <span>→</span>
            </Link>
            <Link
              to="/demo"
              className="border-2 border-benefique-navy text-benefique-navy px-6 py-3 rounded-lg font-semibold hover:bg-benefique-navy hover:text-white transition"
            >
              See Sample Dashboards
            </Link>
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-red-600 mb-6">❌ The Old Way</h2>
              <ul className="space-y-4">
                {[
                  'Books are 2-3 months behind',
                  'No idea if you\'re actually profitable',
                  'Tax time is a scramble',
                  'Cash flow surprises',
                  'Decisions based on gut, not data',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <span className="text-red-500">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-600 mb-6">✓ The Benefique Way</h2>
              <ul className="space-y-4">
                {[
                  'Books closed by the 7th every month',
                  'Real-time profitability visibility',
                  'Tax-ready any day of the year',
                  'Cash flow forecasting & alerts',
                  'Decisions backed by current data',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <span className="text-green-500">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-benefique-navy text-center mb-12">What's Included</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '📚', title: 'Full Bookkeeping', desc: 'All transactions categorized, bank accounts reconciled, credit cards matched — every month.' },
              { icon: '💰', title: 'Payroll Processing', desc: 'Employees and contractors paid on time, all filings handled, year-end W-2s and 1099s included.' },
              { icon: '📋', title: 'AP Management', desc: 'Bills tracked, approved, and paid. No missed payments, no late fees.' },
              { icon: '📊', title: 'Monthly Close by 7th', desc: 'Complete financial statements ready by the 7th business day. Review call by the 10th.' },
              { icon: '📱', title: 'Real-Time Dashboard', desc: 'See cash, revenue, expenses, and KPIs anytime from your phone or computer.' },
              { icon: '🎯', title: 'Tax Preparation', desc: 'Business and personal tax returns included. Quarterly estimates. Year-round planning.' },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-benefique-navy mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-benefique-navy text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl border border-gray-200 group">
                <summary className="px-6 py-4 cursor-pointer font-semibold text-benefique-navy hover:text-benefique-orange transition list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-4 text-gray-600">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-benefique-navy text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Real-Time Financial Clarity?</h2>
          <p className="text-blue-100 mb-8">
            Stop flying blind. Get books that are always current and dashboards that answer your questions.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-benefique-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Schedule Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// LOCATION DATA
// ============================================================
const locations = {
  davie: { city: 'Davie', nearby: ['Plantation', 'Weston', 'Fort Lauderdale', 'Hollywood'], description: 'Benefique is headquartered in Davie, FL — providing accounting and CFO services to local healthcare practices and service businesses.' },
  plantation: { city: 'Plantation', nearby: ['Davie', 'Fort Lauderdale', 'Weston', 'Sunrise'], description: 'Full-service accounting for Plantation businesses — from medical practices to professional services firms.' },
  weston: { city: 'Weston', nearby: ['Davie', 'Plantation', 'Miramar', 'Southwest Ranches', 'Pembroke Pines'], zipCodes: ['33326', '33327', '33331', '33332'], description: 'Weston is home to a concentration of healthcare practices, professional services firms, and high-growth service businesses. We serve Weston business owners who have outgrown their bookkeeper but aren\'t ready for a full-time CFO — providing real-time books, proactive tax planning, and AI-powered cash flow intelligence from our office 15 minutes away in Davie.' },
  miramar: { city: 'Miramar', nearby: ['Hollywood', 'Pembroke Pines', 'Weston', 'Miami Gardens'], description: 'Real-time accounting and tax planning for Miramar businesses — healthcare, marine services, and more.' },
  'fort-lauderdale': { city: 'Fort Lauderdale', nearby: ['Davie', 'Plantation', 'Hollywood', 'Oakland Park'], description: 'Fort Lauderdale\'s trusted accounting firm for healthcare practices, marine services, and professional services.' },
  aventura: { city: 'Aventura', nearby: ['North Miami Beach', 'Sunny Isles', 'Hallandale', 'Miami'], description: 'Accounting and CFO services for Aventura businesses — medical practices, professional services, and law firms.' },
  hollywood: { city: 'Hollywood', nearby: ['Fort Lauderdale', 'Davie', 'Hallandale', 'Miramar'], description: 'Full-service accounting for Hollywood, FL businesses — from healthcare to marine and professional services.' },
};

// ============================================================
// INDUSTRY DATA
// ============================================================
const industries = {
  radiology: {
    industry: 'Radiology & Imaging Centers',
    icon: '🏥',
    challenges: [
      'Multi-location financial consolidation',
      'Complex insurance reimbursement tracking',
      'Equipment depreciation and financing',
      'Radiologist compensation structures',
      'HIPAA-compliant financial reporting',
      'Cash flow variability from insurance delays',
    ],
    testimonial: {
      quote: 'Benefique gives us visibility across all our locations. We finally know which centers are performing and which need attention.',
      name: 'Mark',
      business: 'Multi-Location Radiology',
    },
  },
  dental: {
    industry: 'Dental Practices',
    icon: '🦷',
    challenges: [
      'Insurance vs. cash pay revenue tracking',
      'Multi-provider compensation models',
      'Equipment purchases and financing',
      'Associate and hygienist productivity',
      'Practice acquisition accounting',
      'DSO financial reporting requirements',
    ],
    testimonial: {
      quote: 'Complex multi-entity structure, and they keep it all organized. Tax planning alone has saved us significantly.',
      name: 'Eddie',
      business: 'Dental Brokerage',
    },
  },
  veterinary: {
    industry: 'Veterinary Practices',
    icon: '🐾',
    challenges: [
      'Inventory management for pharmaceuticals',
      'Multi-location or mobile practice accounting',
      'Equipment and facility costs',
      'Staff scheduling and payroll complexity',
      'Client payment plans and collections',
      'Emergency vs. routine service profitability',
    ],
    testimonial: {
      quote: 'They handle everything—books, taxes, payroll. I can focus on my patients instead of spreadsheets.',
      name: 'Brandon',
      business: 'Veterinary Practice',
    },
  },
  'marine-services': {
    industry: 'Marine Services',
    icon: '⚓',
    challenges: [
      'Project-based revenue recognition',
      'Seasonal cash flow fluctuations',
      'Large equipment and dock costs',
      'Subcontractor management',
      'Parts inventory tracking',
      'Multi-vessel or multi-location operations',
    ],
    testimonial: {
      quote: 'We went from chaos to clarity. Now I know exactly where we stand financially at any moment.',
      name: 'Kobus',
      business: 'Marine Services',
    },
  },
};

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <Nav />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/apply" element={<Navigate to="/contact" replace />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/oauth/callback" element={<OAuthCallback />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            
            {/* Location Pages */}
            <Route path="/davie-accounting" element={<LocationPage {...locations.davie} />} />
            <Route path="/plantation-accounting" element={<LocationPage {...locations.plantation} />} />
            <Route path="/weston-accounting" element={<LocationPage {...locations.weston} />} />
            <Route path="/weston-bookkeeping" element={<WestonBookkeeping />} />
            <Route path="/miramar-accounting" element={<LocationPage {...locations.miramar} />} />
            <Route path="/fort-lauderdale-accounting" element={<LocationPage {...locations['fort-lauderdale']} />} />
            <Route path="/aventura-accounting" element={<LocationPage {...locations.aventura} />} />
            <Route path="/hollywood-accounting" element={<LocationPage {...locations.hollywood} />} />
            
            {/* Industry Pages */}
            <Route path="/industries/radiology" element={<IndustryPage {...industries.radiology} />} />
            <Route path="/industries/dental" element={<IndustryPage {...industries.dental} />} />
            <Route path="/industries/veterinary" element={<IndustryPage {...industries.veterinary} />} />
            <Route path="/industries/marine-services" element={<IndustryPage {...industries['marine-services']} />} />
            
            {/* Service Pages */}
            <Route path="/services/real-time-accounting" element={<RealTimeAccountingPage />} />
            <Route path="/services/fractional-cfo" element={<Services />} />
            <Route path="/tools/concierge-simulator" element={<ConciergeSimulator />} />
            <Route path="/tools/business-simulator" element={<BusinessSimulator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}
/* Cache bust: 1772812726 */
