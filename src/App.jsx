import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

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
          <span className="text-2xl md:text-3xl font-bold text-benefique-navy tracking-tight">BENEFIQUE</span>
          <span className="text-xs text-gray-600">Tax & Accounting</span>
          <span className="text-[10px] md:text-xs text-benefique-orange font-medium mt-0.5">Real-time accounting. Tax-ready any day.</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            ['/services', 'Services'],
            ['/demo', 'Sample Reports'],
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
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight">BENEFIQUE</span>
              <span className="text-xs text-gray-400">Tax & Accounting</span>
              <span className="text-[10px] text-orange-400 mt-0.5">Real-time accounting. Tax-ready any day.</span>
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
            <a href="https://app.benefique.com/terms" target="_blank" rel="noopener noreferrer" className="hover:text-white">Terms of Service</a>
            <a href="https://app.benefique.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-white">Privacy Policy</a>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
        <div className="text-center text-sm text-gray-400 mt-8">
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
  return (
    <div>
      {/* Hero */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-2xl">
            {/* Location Badge */}
            <div className="inline-flex items-center gap-2 bg-benefique-orange/10 text-benefique-orange px-3 py-1 rounded-full text-sm font-medium mb-6">
              <span>📍</span> Serving South Florida
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-benefique-navy leading-tight mb-6">
              Stop Drowning in<br />Your Own Books
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Full-service accounting for businesses that want to grow — not drown in spreadsheets.
            </p>
            <p className="text-gray-600 mb-8">
              You didn't go into business to become an accountant. We take over your entire accounting 
              function — books, taxes, payroll, reporting — so you can focus on what actually makes you money.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <Link
                to="/contact"
                className="bg-benefique-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition inline-flex items-center gap-2"
              >
                See If We're a Fit <span>→</span>
              </Link>
              <Link
                to="/services"
                className="border-2 border-benefique-navy text-benefique-navy px-6 py-3 rounded-lg font-semibold hover:bg-benefique-navy hover:text-white transition"
              >
                See What's Included
              </Link>
            </div>
            
            <p className="text-sm text-gray-500">
              No obligation. We'll tell you honestly if we're the right fit.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Why businesses choose Benefique
          </p>
          <div className="flex flex-wrap gap-4">
            {[
              'Books closed by the 10th — every month',
              '24-hour response guarantee',
              'Healthcare & service business specialists',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 bg-benefique-orange/10 text-benefique-orange px-4 py-2 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-benefique-orange rounded-full"></span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sound Familiar? */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-benefique-navy mb-4">Sound Familiar?</h2>
          <p className="text-gray-600 mb-10">Most business owners we talk to are dealing with at least one of these:</p>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              { emoji: '😩', text: "You're doing your own books nights and weekends — and still behind" },
              { emoji: '😤', text: 'Your bookkeeper keeps making mistakes you have to fix' },
              { emoji: '🤷', text: "You don't actually know if you're profitable until tax time" },
              { emoji: '💸', text: "The business is showing a profit — but where's the cash?" },
              { emoji: '😰', text: 'Tax season is a scramble every single year' },
              { emoji: '📊', text: "You've outgrown DIY but aren't sure what \"real\" accounting looks like" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-gray-50 rounded-xl p-4">
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide text-center mb-2">What You Get</p>
          <h2 className="text-3xl font-bold text-benefique-navy text-center mb-4">A Complete Accounting Department</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Not just a bookkeeper. Not just a tax preparer. A full team handling everything — so you never have to think about it.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '📚', title: 'Full Bookkeeping', desc: 'Bank reconciliation, credit cards, all transactions categorized accurately — every month, without fail.' },
              { icon: '📅', title: 'Monthly Close by the 10th', desc: 'Financial statements ready by the 10th of every month. You always know where you stand.' },
              { icon: '💰', title: 'Payroll Processing', desc: 'Employee and contractor payroll handled. On time, every time, with all the filings done.' },
              { icon: '📋', title: 'AP Management', desc: 'Bills tracked, approved, and paid on schedule. No more missed payments or late fees.' },
              { icon: '📊', title: 'Financial Reporting', desc: 'P&L, Balance Sheet, Cash Flow — clean, accurate, and actually useful for decisions.' },
              { icon: '🎯', title: 'Tax Preparation & Planning', desc: 'Not just filing — proactive planning throughout the year to minimize what you owe.' },
              { icon: '📱', title: 'Real-Time Dashboard', desc: 'See your numbers anytime you want. No waiting. No asking. Just log in and know.' },
              { icon: '📞', title: 'Monthly Review Call', desc: 'Walk through your numbers together. Ask questions. Get advice. Stay informed.' },
              { icon: '✅', title: 'Sales Tax & 1099s', desc: 'All compliance handled. Sales tax filed. 1099s sent. No surprises, no penalties.' },
            ].map((service) => (
              <div key={service.title} className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="text-lg font-bold text-benefique-navy mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
          
          <p className="text-center text-benefique-navy font-semibold mt-10">
            This is what a real accounting department looks like.
          </p>
          <div className="text-center mt-6">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-benefique-orange font-semibold hover:underline"
            >
              See If We're a Fit <span>→</span>
            </Link>
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

      {/* CTA / Application */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-benefique-navy mb-6">Let's See If We're the Right Fit</h2>
              <p className="text-gray-600 mb-6">
                We're not the cheapest option — and we're not trying to be. We work with established businesses 
                that want reliable, proactive accounting without the headaches.
              </p>
              
              <ul className="space-y-3">
                {[
                  'Full-service accounting — books, payroll, taxes, all handled',
                  'Monthly close by the 10th — you always know where you stand',
                  'Proactive tax planning — not just compliance, actual savings',
                  'Real-time dashboards — see your numbers anytime, no asking',
                  'One team, one relationship — no handoffs, no runaround',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-benefique-orange">●</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-benefique-navy mb-2">Quick Application</h3>
              <p className="text-gray-600 text-sm mb-6">Takes 60 seconds. We'll reach out within 24 hours.</p>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    placeholder="John Smith"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-benefique-orange focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-benefique-orange focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                  <input
                    type="text"
                    placeholder="Acme Medical Group"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-benefique-orange focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Annual Revenue</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-benefique-orange focus:border-transparent text-gray-600">
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
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-benefique-orange focus:border-transparent text-gray-600">
                    <option>Select one...</option>
                    <option>Doing it myself</option>
                    <option>Have a bookkeeper</option>
                    <option>Have an accountant/CPA</option>
                    <option>Nothing in place</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Biggest Financial Headache Right Now?</label>
                  <textarea
                    rows={3}
                    placeholder="What's keeping you up at night?"
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
                  No spam. No sales pressure. Just an honest conversation.
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
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-benefique-orange/10 text-benefique-orange px-3 py-1 rounded-full text-sm font-medium mb-6">
            <span>📋</span> Our Services
          </div>
          <h1 className="text-4xl font-bold text-benefique-navy mb-4">Everything Your Business Needs</h1>
          <p className="text-xl text-gray-600 max-w-2xl">Comprehensive financial solutions for healthcare and service-based businesses</p>
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
            <div className="grid md:grid-cols-2 gap-8">
              <ul className="space-y-3">
                {[
                  'Monthly financial closes by the 7th business day',
                  'Custom CFO dashboards with real-time metrics',
                  'Cash flow forecasting and management',
                  'Strategic planning and budgeting',
                  'Bank and investor relations support',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-benefique-orange">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-sm text-benefique-orange uppercase tracking-wide font-semibold mb-2">Featured</div>
                <h3 className="text-lg font-bold text-benefique-navy mb-2">The Benefique Financial Times™</h3>
                <p className="text-gray-600 text-sm">
                  A weekly CFO report about your business — written in owner terms, not accountant-speak. 
                  See your numbers clearly. Make decisions confidently.
                </p>
                <Link to="/demo" className="text-benefique-orange text-sm font-semibold hover:underline mt-2 inline-block">
                  See a sample report →
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
            <div className="grid md:grid-cols-2 gap-8">
              <ul className="space-y-3">
                {[
                  'Bookkeeping and transaction coding',
                  'Accounts payable management',
                  'Payroll processing and compliance',
                  'Bank and credit card reconciliations',
                  'Month-end and year-end close',
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
            <div className="grid md:grid-cols-2 gap-8">
              <ul className="space-y-3">
                {[
                  'Entity structure optimization',
                  'R&D tax credit identification',
                  'Retirement and benefit planning',
                  'State and local tax compliance',
                  'Quarterly estimates and projections',
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
                  businesses. We understand your industry's unique challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-benefique-navy text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-blue-100 mb-8">
            Let's talk about your business and see if we're the right fit.
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
// TESTIMONIALS PAGE - Grouped by Healthcare & Services
// ============================================================
function Testimonials() {
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
    { name: 'Natasha', industry: 'Restaurant Group', quote: "Multiple locations, different concepts, one clear financial picture. That's what Benefique built for us." },
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
              <p className="text-gray-600">IT, marine, hospitality, and professional services</p>
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
      {/* Header */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-benefique-orange/10 text-benefique-orange px-3 py-1 rounded-full text-sm font-medium mb-6">
            <span>👋</span> About Us
          </div>
          <h1 className="text-4xl font-bold text-benefique-navy mb-4">About Benefique</h1>
          <p className="text-xl text-gray-600">History matters, but preparation wins.</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          {/* Philosophy */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
            <h2 className="text-2xl font-bold text-benefique-navy mb-4">Our Philosophy</h2>
            <p className="text-gray-600 mb-4">
              Most accounting firms look backward. They tell you what happened last year, last quarter, 
              last month. That's history. Important, but not enough.
            </p>
            <p className="text-gray-600 mb-4">
              At Benefique, we believe financial data should drive decisions, not just document them. 
              Real-time books. Monthly closes by the 7th. Dashboards that answer questions before you ask them.
            </p>
            <p className="text-gray-600">
              We specialize in <Link to="/testimonials" className="text-benefique-orange hover:underline font-medium">healthcare and service-based SMBs</Link> because 
              we understand the unique challenges—complex billing, multi-location operations, seasonal fluctuations, regulatory requirements.
            </p>
          </div>

          {/* What Makes Us Different */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
            <h2 className="text-2xl font-bold text-benefique-navy mb-6">What Makes Us Different</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: '7th Business Day Close', desc: 'Your books are closed and reviewed by the 7th of every month. No waiting.' },
                { title: '24-Hour Response', desc: 'Questions get answers within one business day. Always.' },
                { title: 'Decision-Ready Dashboards', desc: 'Not just numbers—insights you can act on immediately.' },
                { title: 'Proactive Planning', desc: 'We find opportunities before they become emergencies.' },
              ].map(item => (
                <div key={item.title} className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-benefique-navy mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Decision-Ready Dashboards Section - NEW */}
          <div className="bg-gradient-to-br from-benefique-navy to-slate-800 rounded-2xl p-8 mb-8 text-white">
            <h2 className="text-2xl font-bold mb-4">📊 Decision-Ready Dashboards</h2>
            <p className="text-blue-100 mb-6">
              Every Fractional CFO client receives custom financial reports that make complex data simple. 
              See your business health at a glance, understand trends, and know exactly what actions to take.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 rounded-xl p-5 hover:bg-white/20 transition">
                <div className="text-2xl mb-2">📊</div>
                <h3 className="font-bold text-lg mb-2">CFO Report</h3>
                <p className="text-blue-100 text-sm mb-3">
                  Visual dashboard showing cash health, revenue trends, profitability metrics, and debt coverage. 
                  Everything you need to know in one view.
                </p>
                <Link to="/demo" className="text-benefique-orange font-semibold text-sm hover:underline">
                  View Sample →
                </Link>
              </div>
              
              <div className="bg-white/10 rounded-xl p-5 hover:bg-white/20 transition">
                <div className="text-2xl mb-2">📰</div>
                <h3 className="font-bold text-lg mb-2">The Benefique Financial Times™</h3>
                <p className="text-blue-100 text-sm mb-3">
                  A newspaper-style report that tells your financial story. Lead articles, trend analysis, 
                  and action items written in owner terms.
                </p>
                <Link to="/demo" className="text-benefique-orange font-semibold text-sm hover:underline">
                  View Sample →
                </Link>
              </div>
            </div>
            
            <div className="text-center">
              <Link
                to="/demo"
                className="inline-flex items-center gap-2 bg-benefique-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                See All Sample Reports
              </Link>
            </div>
          </div>

          {/* Who We Serve */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
            <h2 className="text-2xl font-bold text-benefique-navy mb-4">Who We Serve</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-benefique-navy mb-2 flex items-center gap-2">
                  <span>🏥</span> Healthcare Practices
                </h3>
                <ul className="text-gray-600 text-sm space-y-1 ml-6">
                  <li>• Radiology & diagnostic imaging</li>
                  <li>• Dental practices & DSOs</li>
                  <li>• Veterinary clinics</li>
                  <li>• Medical practices</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-benefique-navy mb-2 flex items-center gap-2">
                  <span>🏢</span> Service-Based Businesses
                </h3>
                <ul className="text-gray-600 text-sm space-y-1 ml-6">
                  <li>• IT & technology services</li>
                  <li>• Marine & industrial services</li>
                  <li>• Restaurant & hospitality groups</li>
                  <li>• Professional services firms</li>
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
            <h2 className="text-2xl font-bold text-benefique-navy mb-4">Location</h2>
            <p className="text-gray-600 mb-4">
              Based in <strong>Davie, Florida</strong>, we serve clients throughout South Florida and beyond. 
              Our technology-forward approach means location is never a barrier to great service.
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
          <h2 className="text-2xl font-bold mb-4">Ready to see what we can do for you?</h2>
          <p className="text-blue-100 mb-8">
            Let's talk about your business and see if we're the right fit.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/demo"
              className="inline-flex items-center gap-2 bg-white text-benefique-navy px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              📊 View Sample Reports
            </Link>
            <Link
              to="/contact"
              className="inline-block bg-benefique-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Apply to Work With Us
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
  const posts = [
    { title: 'December Financials: What to Review Before Year-End', excerpt: 'Key financial checkpoints every business owner should review before closing the books on the year.', date: '2025-12-15', slug: 'december-financials' },
    { title: 'S-Corp Election: Is It Right for Your Business?', excerpt: 'Understanding the tax implications and benefits of S-Corp status for small business owners.', date: '2025-11-20', slug: 's-corp-election' },
    { title: 'R&D Tax Credits: Hidden Money for Healthcare Practices', excerpt: "Many healthcare businesses miss out on significant R&D credits. Here's how to identify and claim them.", date: '2025-10-15', slug: 'rd-tax-credits' },
    { title: 'Cash Flow Forecasting 101', excerpt: 'A practical guide to predicting and managing your business cash flow.', date: '2025-09-10', slug: 'cash-flow-forecasting' },
    { title: 'Multi-Location Financial Management', excerpt: 'Best practices for businesses operating across multiple locations or entities.', date: '2025-08-05', slug: 'multi-location-management' },
  ];

  return (
    <div>
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-benefique-orange/10 text-benefique-orange px-3 py-1 rounded-full text-sm font-medium mb-6">
            <span>📝</span> Blog
          </div>
          <h1 className="text-4xl font-bold text-benefique-navy mb-4">Insights & Resources</h1>
          <p className="text-xl text-gray-600">Practical advice on accounting, tax, and financial strategy</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-6">
            {posts.map(post => (
              <article key={post.slug} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition">
                <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                <h2 className="text-xl font-bold text-benefique-navy mb-2 hover:text-benefique-orange cursor-pointer transition">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <span className="text-benefique-orange font-medium hover:underline cursor-pointer">
                  Read more →
                </span>
              </article>
            ))}
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
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input type="text" placeholder="John Smith" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-benefique-orange focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" placeholder="john@company.com" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-benefique-orange focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                  <input type="text" placeholder="Acme Medical Group" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-benefique-orange focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Annual Revenue</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-benefique-orange focus:border-transparent text-gray-600">
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
                  <textarea rows={3} placeholder="What's keeping you up at night?" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-benefique-orange focus:border-transparent" />
                </div>
                <button type="submit" className="w-full bg-benefique-orange text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                  Submit Application
                </button>
                <p className="text-xs text-gray-500 text-center">
                  No spam. No sales pressure. Just an honest conversation.
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
  const [activeTab, setActiveTab] = React.useState('cfo');
  
  return (
    <div>
      {/* Hero */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-benefique-orange/10 text-benefique-orange px-3 py-1 rounded-full text-sm font-medium mb-6">
            <span>📊</span> Sample Reports
          </div>
          <h1 className="text-4xl font-bold text-benefique-navy mb-4">See What You'll Get</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Every Fractional CFO client receives custom financial reports — clear insights in owner terms, not accountant-speak.
          </p>
        </div>
      </section>

      {/* Report Selector */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-4 py-4">
            <button
              onClick={() => setActiveTab('cfo')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'cfo'
                  ? 'bg-benefique-navy text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              📊 CFO Report
            </button>
            <button
              onClick={() => setActiveTab('bft')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'bft'
                  ? 'bg-benefique-navy text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              📰 The Benefique Financial Times™
            </button>
          </div>
        </div>
      </section>

      {/* Report Description */}
      <section className="bg-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          {activeTab === 'cfo' ? (
            <div className="flex items-start gap-6">
              <div className="text-4xl">📊</div>
              <div>
                <h2 className="text-2xl font-bold text-benefique-navy mb-2">CFO Report</h2>
                <p className="text-gray-600">
                  A visual dashboard showing your business health at a glance. Cash position, revenue trends, 
                  profitability metrics, debt coverage, and action items — all in one place. Updated weekly.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-6">
              <div className="text-4xl">📰</div>
              <div>
                <h2 className="text-2xl font-bold text-benefique-navy mb-2">The Benefique Financial Times™</h2>
                <p className="text-gray-600">
                  A newspaper-style report that tells the story of your business. Lead articles explain what's happening 
                  and why it matters. Financial tables, trend analysis, and action items — written like a CFO briefing.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Embedded Report */}
      <section className="bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            {/* Demo Notice */}
            <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center">
              <p className="text-sm text-amber-800">
                <span className="font-semibold">📋 Demo Report</span> — Sample data shown. Your reports will reflect your actual business.
              </p>
            </div>
            
            {/* Iframe */}
            <div className="relative" style={{ height: '800px' }}>
              <iframe
                src={activeTab === 'cfo' 
                  ? 'https://bft-demo-seven.vercel.app' 
                  : 'https://bft-newspaper-demo.vercel.app'
                }
                className="w-full h-full border-0"
                title={activeTab === 'cfo' ? 'CFO Report Demo' : 'Benefique Financial Times Demo'}
              />
            </div>
            
            {/* Open in New Tab */}
            <div className="bg-gray-50 border-t border-gray-200 px-4 py-3 text-center">
              <a
                href={activeTab === 'cfo' 
                  ? 'https://bft-demo-seven.vercel.app' 
                  : 'https://bft-newspaper-demo.vercel.app'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-benefique-orange font-semibold hover:underline inline-flex items-center gap-2"
              >
                Open full report in new tab <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-benefique-navy text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Want reports like this for your business?</h2>
          <p className="text-blue-100 mb-8">
            Every Fractional CFO client gets custom weekly reports. Let's talk about what insights would help you most.
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
// MAIN APP
// ============================================================
export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Nav />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
