import React from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import BlogPost from './BlogPost';

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
              'Books closed by the 7th, review call by the 10th',
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
              { icon: '📅', title: 'Monthly Close by the 7th', desc: 'Books closed by the 7th, review call by the 10th. You always know where you stand.' },
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
                  'Books closed by the 7th, review call by the 10th',
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
                <div className="text-sm text-benefique-orange uppercase tracking-wide font-semibold mb-2">Featured</div>
                <h3 className="text-lg font-bold text-benefique-navy mb-2">The Benefique Financial Times™</h3>
                <p className="text-gray-600 text-sm">
                  A weekly CFO report about your business — written in owner terms, not accountant-speak.
                  See your numbers clearly. Make decisions confidently.
                </p>
                <Link to="/demo" className="text-benefique-orange text-sm font-semibold hover:underline mt-2 inline-block">
                  See a sample report →
                </Link>
                <br />
                <Link to="/blog/ai-cfo-analysis" className="text-gray-500 text-sm hover:text-benefique-orange hover:underline mt-1 inline-block">
                  Read: What AI-Assisted CFO Analysis Actually Looks Like →
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
                <Link to="/blog/s-corp-election" className="text-gray-500 text-sm hover:text-benefique-orange hover:underline mt-2 inline-block">
                  Read: Is S-Corp Election Right for Your Business? →
                </Link>
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
      <Helmet>
        <title>About Gerrit Disbergen, EA | Benefique Tax & Accounting | Davie, FL</title>
        <meta name="description" content="Institutional-grade financial intelligence for SMBs. Founded by Gerrit Disbergen, EA — Ernst & Young and Merrill Lynch alumni — Benefique combines AI-powered analysis with hands-on tax and CFO advisory." />
        <link rel="canonical" href="https://www.benefique.com/about" />
      </Helmet>
      {/* Header */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-benefique-orange/10 text-benefique-orange px-3 py-1 rounded-full text-sm font-medium mb-6">
            About Us
          </div>
          <h1 className="text-4xl font-bold text-benefique-navy mb-4">Institutional-Grade Financial Intelligence. Built for SMBs.</h1>
          <p className="text-xl text-gray-600 max-w-3xl">We don't just record what happened. We show you what's happening, what it means, and what to do about it — in real time.</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          {/* The Founder */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
            <h2 className="text-2xl font-bold text-benefique-navy mb-4">The Founder</h2>
            <p className="text-gray-600 mb-4">
              <strong className="text-benefique-navy">Gerrit Disbergen, EA</strong> spent the early part of his career at
              Ernst & Young and Merrill Lynch before founding a public financial services company that executed
              technology IPOs, mergers, and acquisitions. That world — institutional finance, capital markets,
              complex deal structures — shaped how he thinks about business numbers.
            </p>
            <p className="text-gray-600 mb-4">
              After emigrating to the United States, Gerrit made a deliberate choice: apply that institutional-grade
              financial expertise to the businesses that need it most but have never had access to it — small and
              mid-sized companies run by founders who wear every hat.
            </p>
            <p className="text-gray-600 mb-4">
              The financial function is always one of the most important — and always the most neglected.
              Founders build the product, close the deals, manage the team. The books fall behind. Tax strategy
              becomes an afterthought. Cash decisions get made on gut feel because the data arrives weeks too late.
            </p>
            <p className="text-gray-600">
              Benefique was built to fix that.
            </p>
          </div>

          {/* The Problem We Saw */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
            <h2 className="text-2xl font-bold text-benefique-navy mb-4">The Problem We Saw</h2>
            <p className="text-gray-600 mb-4">
              Traditional accounting firms that serve SMBs are volume-driven. They manage hundreds of clients.
              Your monthly P&L arrives 3-4 weeks after the month ends. Tax "strategy" is a sentence in a cover letter.
              The relationship is transactional: you send documents, they file returns, you hear from them next year.
            </p>
            <p className="text-gray-600 mb-4">
              That model made sense when financial data was hard to access, slow to process, and expensive to analyze.
              It doesn't make sense anymore.
            </p>
            <p className="text-gray-600">
              AI and direct API integration have changed what's possible. The same depth of financial analysis
              that a Fortune 500 company gets from a dedicated FP&A department — trailing twelve-month ratios,
              breakeven modeling, expense benchmarking, cash flow forecasting, balance sheet trend analysis — is
              now possible for a practice doing $1.5M in revenue. Benefique was designed from the ground up
              around this shift.
            </p>
          </div>

          {/* How We're Different */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
            <h2 className="text-2xl font-bold text-benefique-navy mb-6">How We're Different</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-benefique-orange pl-6">
                <h3 className="font-bold text-benefique-navy text-lg mb-2">We analyze, not just record</h3>
                <p className="text-gray-600 text-sm">
                  We pull your data directly from QuickBooks via API, run AI-powered analysis across
                  multiple dimensions — profitability, cash flow, cost structure, benchmarking — and deliver
                  CFO-level intelligence through interactive dashboards. Not PDFs. Not spreadsheets.
                  Real-time visibility into what's actually driving your business.
                </p>
              </div>
              <div className="border-l-4 border-benefique-orange pl-6">
                <h3 className="font-bold text-benefique-navy text-lg mb-2">Tax + cash flow under one roof</h3>
                <p className="text-gray-600 text-sm">
                  Most fractional CFOs don't do tax. Most tax professionals don't build real-time dashboards.
                  We do both — which means every cash decision considers the tax consequence, and every tax
                  strategy considers whether you actually have the cash to execute it. "Should you fund that
                  solo 401(k) before year-end?" depends on both your tax position and your cash runway. We see
                  both sides simultaneously.
                </p>
              </div>
              <div className="border-l-4 border-benefique-orange pl-6">
                <h3 className="font-bold text-benefique-navy text-lg mb-2">AI does the monitoring. Humans do the interpreting.</h3>
                <p className="text-gray-600 text-sm">
                  AI spots that your marketing spend is running at 9% of revenue. The human knows the industry
                  benchmark is 3-5% and that $256K in annual savings is sitting in a vendor audit. AI calculates
                  a 3.8% operating margin on $7M in revenue. The human knows that means the owner earned nothing
                  despite a seven-figure capital investment. The machine monitors continuously. The Enrolled Agent
                  interprets and acts. Neither works alone.
                </p>
              </div>
              <div className="border-l-4 border-benefique-orange pl-6">
                <h3 className="font-bold text-benefique-navy text-lg mb-2">Continuous communication, not annual check-ins</h3>
                <p className="text-gray-600 text-sm">
                  Your books are closed by the 7th. Review calls by the 10th. Questions answered within 24 hours.
                  Always. Our client churn is near zero — not because we lock anyone in, but because when your
                  financial team is always available and always ahead of the problem, you don't look for a replacement.
                </p>
              </div>
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
            <p className="text-gray-600 mb-6">
              We work with founders and practice owners who have outgrown their bookkeeper but aren't ready
              for a full-time CFO. Most of our clients are in the $1M-$10M revenue range, growing, and making
              financial decisions that deserve better data than a quarterly P&L.
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
                  <li>- IT & technology services</li>
                  <li>- Marine & industrial services</li>
                  <li>- Restaurant & hospitality groups</li>
                  <li>- Professional services firms</li>
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
          <h2 className="text-2xl font-bold mb-4">See the difference before you commit.</h2>
          <p className="text-blue-100 mb-8">
            Explore our sample reports to see what institutional-grade analysis looks like — or apply to start a conversation about your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/demo"
              className="inline-flex items-center gap-2 bg-white text-benefique-navy px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              View Sample Reports
            </Link>
            <Link
              to="/apply"
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
  const [activeCategory, setActiveCategory] = React.useState('All');

  const posts = [
    { title: 'Why Your Banker Asked for Your Personal Tax Return (And What They\'re Really Looking For)', excerpt: 'You applied for a business loan. The bank asked for your personal tax return, your personal financial statement, and two years of K-1s. Here\'s what they\'re actually evaluating \u2014 and the three personal risks that kill business loan applications.', date: '2026-03-13', slug: 'why-banker-asks-personal-tax-return', published: true, category: 'Cash Flow', readTime: '11 min' },
    { title: 'What Your Banker Sees That You Don\'t \u2014 From the Accountant Who Builds the Package', excerpt: 'Banks don\'t just review your P&L. They review three financial pictures \u2014 your business, your personal balance sheet, and a normalized version they rebuild themselves. Most owners only prepare for one.', date: '2026-03-13', slug: 'what-your-banker-sees-that-you-dont', published: true, category: 'Cash Flow', readTime: '14 min' },
    { title: 'The Cash Flow Waterfall: Why $454K in Profit Left a Business With a $147K Cash Deficit', excerpt: 'A $6M business earned $454K in operating profit. After partner draws, debt service, and working capital, they were $147K in the hole. The P&L never showed it. The waterfall did.', date: '2026-03-13', slug: 'cash-flow-waterfall-why-profit-doesnt-equal-cash', published: true, category: 'Cash Flow', readTime: '10 min' },
    { title: 'What AI-Assisted CFO Analysis Actually Looks Like', excerpt: 'Most people think AI financial analysis means plugging data into ChatGPT. It doesn\'t. Here\'s what actually happens when an AI-assisted CFO engagement turns 7 months of QuickBooks data into a 28-page report with 14 charts — and finds $353K in trapped cash nobody knew about.', date: '2026-03-12', slug: 'ai-cfo-analysis', published: true, category: 'Technology & Automation', readTime: '12 min' },
    { title: 'How AI Found $353,000 in Trapped Cash — Using Data Already in QuickBooks', excerpt: 'A professional services firm had $353,000 trapped in slow-paying receivables, a bank balance that overstated actual cash by $900K, and partner draws that exceeded a $1.58M windfall. All of this was sitting in their QuickBooks data. Nobody had mined it until AI did.', date: '2026-03-12', slug: 'ai-found-353k-trapped-cash', published: true, category: 'Cash Flow', readTime: '11 min' },
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
    { title: 'Concierge Medicine vs Insurance-Based Practice: A Financial Comparison', excerpt: 'Side-by-side financial comparison of traditional, concierge, DPC, and hybrid practice models. Revenue, overhead, take-home pay, quality of life metrics, and transition planning for South Florida physicians.', date: '2026-03-09', slug: 'concierge-medicine-vs-insurance-practice-financial-comparison', published: true, category: 'Concierge Medicine', readTime: '17 min' },
    { title: 'The Real Cost of Starting a Concierge Medical Practice', excerpt: 'A concierge practice can launch for $100K-$175K in Broward County. Here\'s every startup cost, monthly recurring expense, South Florida lease benchmark, entity structure decision, and pre-launch checklist you need.', date: '2026-03-08', slug: 'cost-starting-concierge-medical-practice', published: true, category: 'Concierge Medicine', readTime: '16 min' },
    { title: 'How Much Does a Concierge Medical Practice Make in South Florida?', excerpt: 'Concierge physicians in South Florida earn $500K-$1M+ while seeing fewer patients and working fewer hours. Here\'s the complete revenue model, income comparison, overhead analysis, and tax strategy breakdown for Broward County practices.', date: '2026-03-07', slug: 'concierge-medicine-income-south-florida', published: true, category: 'Concierge Medicine', readTime: '18 min' },
    { title: '1099 vs. W-2 in Your Healthcare or Service Practice: The Classification Mistake That Could Cost You $50,000+', excerpt: 'The IRS and DOL are cracking down on worker misclassification in healthcare and professional services. Dental hygienists, associate physicians, therapists, IT contractors\u2014if you\'re paying them on a 1099, you might owe back taxes, penalties, and benefits.', date: '2026-03-06', slug: '1099-vs-w2-worker-classification-healthcare-service-businesses-broward-county', published: true, category: 'Tax Strategy', readTime: '24 min' },
    { title: 'The Hidden Cost of Not Tracking Work-in-Progress', excerpt: 'A service business bills $80K/month. But $45K in labor and materials sits unbilled and invisible \u2014 not on the P&L, not on the balance sheet. Without WIP tracking, your financials are fiction.', date: '2026-03-08', slug: 'hidden-cost-not-tracking-wip', published: true, category: 'Accounting', readTime: '10 min' },
    { title: 'Stop Doing Your Own Books: The Real Cost of DIY Bookkeeping', excerpt: 'DIY bookkeeping looks free until you count your time, missed deductions, and IRS penalties. Here\'s the real math for SE Florida business owners \u2014 and when it makes sense to hand it off.', date: '2026-03-04', slug: 'stop-doing-your-own-books', published: true, category: 'Accounting', readTime: '10 min' },
    { title: 'Real-Time Financial Dashboards for Healthcare Practices', excerpt: 'A real-time financial dashboard gives healthcare practice owners instant visibility into collection rates, AR aging, overhead ratio, DSO, and cash runway. Here are the 10 KPIs every practice should track, with benchmarks by specialty.', date: '2026-03-05', slug: 'real-time-financial-dashboards-healthcare-practices', published: true, category: 'Healthcare Finance', readTime: '15 min' },
    { title: 'How to Calculate Your Cash Conversion Cycle (Service Business & Healthcare Guide)', excerpt: 'The Cash Conversion Cycle measures how many days it takes to turn money you spend into cash you collect. For service businesses with no inventory, it simplifies to CCC = DSO - DPO. Lower is better.', date: '2026-03-04', slug: 'how-to-calculate-cash-conversion-cycle', published: true, category: 'Cash Flow', readTime: '12 min' },
    { title: 'How AI Cash Flow Forecasting Helps Small Businesses Stay 30 Days Ahead', excerpt: 'AI cash flow forecasting uses machine learning to analyze your transaction data, client payment patterns, and expenses to project your cash position 30-60 days forward. Here\'s how it works and why your accountant matters more than the software.', date: '2026-03-04', slug: 'ai-cash-flow-forecasting-small-business', published: true, category: 'Cash Flow', readTime: '14 min' },
    { title: '5 Ways to Improve Your DSO Without Sacrificing Relationships', excerpt: 'The average small business has $84,000 in unpaid invoices. Here are 5 proven strategies to collect faster without damaging client relationships -- from clear terms to smart segmentation.', date: '2026-03-03', slug: 'improve-dso-without-sacrificing-relationships', published: true, category: 'Cash Flow', readTime: '10 min' },
    { title: 'Why Monthly Reports Are Too Late for Cash Decisions', excerpt: 'Your monthly P&L arrives 3-4 weeks after the month ends. By then, you\'ve already made the decisions it should have informed. Here\'s what real-time visibility looks like.', date: '2026-03-03', slug: 'why-monthly-reports-too-late', published: true, category: 'Accounting', readTime: '8 min' },
    { title: 'AI-Powered Cash Flow Intelligence: How Real-Time Data Fixes Your Biggest Business Problem', excerpt: 'Your biggest business problem isn\'t profit. It\'s cash flow. Discover how AI-powered data synthesis and real-time financial intelligence give SMB owners Fortune 500-level visibility into cash conversion cycles, working capital, and the metrics that actually control their cash position.', date: '2026-03-01', slug: 'ai-powered-cash-flow-intelligence', published: true, category: 'Cash Flow', readTime: '12 min' },
    { title: 'S-Corp Reasonable Compensation: How Much Should You Pay Yourself (And Why Getting It Wrong Costs More Than You Think)', excerpt: '73% of S-Corp audits focus on reasonable compensation. Pay yourself too little and the IRS reclassifies your distributions as wages. Pay yourself too much and you\'re overpaying FICA by thousands. Here\'s the definitive guide to finding your optimal salary.', date: '2026-02-27', slug: 's-corp-reasonable-compensation-healthcare-service-businesses-broward-county', published: true, category: 'Tax Strategy', readTime: '18 min' },
    { title: '7 Tax Deductions Your Broward County Practice Is Probably Missing (And the Dollar Amount of Each)', excerpt: 'The average medical practice overpays $15,000-$50,000 annually in taxes from missed deductions. From accountable plans to the Augusta Rule to retirement plan stacking\u2014here are 7 deductions most Broward County practice owners don\'t know about.', date: '2026-02-26', slug: 'missed-tax-deductions-healthcare-service-businesses-broward-county', published: true, category: 'Tax Strategy', readTime: '22 min' },
    { title: '2026 Tax Law Changes: What Every Broward County Practice Owner Needs to Know', excerpt: 'The One Big Beautiful Bill Act changed everything: 100% bonus depreciation is back, Section 179 jumped to $2.56M, QBI is permanent, and the dependent care FSA doubled to $7,500. Here\'s what Broward County practice owners and service business operators need to do before year-end.', date: '2026-02-26', slug: '2026-tax-law-changes-broward-county-healthcare-service-businesses', published: true, category: 'Tax Strategy', readTime: '26 min' },
    { title: 'Why Your Broward County Practice Is Profitable on Paper but Can\'t Make Payroll', excerpt: 'Medical practices wait 30-90 days for insurance reimbursement. Service firms chase invoices for months. Learn how Davie-based Benefique helps healthcare and professional services businesses across Broward County fix cash flow, collect faster, and stop running out of money.', date: '2026-02-26', slug: 'cash-flow-management-healthcare-service-businesses-broward-county', published: true, category: 'Healthcare Finance', readTime: '22 min' },
    { title: 'Case Study: Real-Time Collections Intelligence System for Multi-Center Radiology Group', excerpt: 'How we built interactive dashboards that identified a 30% revenue decline, eliminated the \'seasonality excuse,\' and quantified a multi-million dollar A/R crisis for a six-center diagnostic imaging group.', date: '2026-02-23', slug: 'radiology-collections-dashboard-case-study', published: true, category: 'Healthcare Finance', readTime: '15 min' },
    { title: 'Davie Accounting Services for Healthcare Practices & Service-Based Businesses', excerpt: 'Expert accounting services in Davie, FL for healthcare practices (radiology, surgery, dental, vet, pain clinics) and service businesses (law, marine, IT). Real-time reporting, monthly closes, 24-hour response.', date: '2026-02-12', slug: 'davie-accounting-services', published: true, category: 'Accounting', readTime: '12 min' },
    { title: 'R&D Tax Credits: Hidden Money for Healthcare Practices', excerpt: "Many healthcare businesses miss out on significant R&D credits. Here's how to identify and claim them.", date: '2026-02-05', slug: 'rd-tax-credits-healthcare', published: true, category: 'Tax Strategy', readTime: '10 min' },
    { title: 'Real-Time Dashboards That Actually Get Used', excerpt: 'Most business owners ignore their financial reports because they\'re boring PDFs full of numbers. Here\'s how we designed dashboards that clients check daily\u2014and why it matters.', date: '2026-01-31', slug: 'dashboards-that-get-used', published: true, category: 'Accounting', readTime: '10 min' },
    { title: 'S-Corp Election: Is It Right for Your Florida Business?', excerpt: 'S-Corp election can save Florida business owners $5K-$20K yearly in self-employment taxes\u2014but only if your profit exceeds $100K. Learn when it makes sense and when it doesn\'t.', date: '2026-01-30', slug: 's-corp-election', published: true, category: 'Tax Strategy', readTime: '15 min' },
    { title: 'Cash Flow Forecasting 101', excerpt: 'Learn cash flow forecasting for your small business with this practical guide. Get step-by-step instructions, free templates, and expert CFO guidance to predict and manage your cash flow.', date: '2026-01-30', slug: 'cash-flow-forecasting', published: true, category: 'Cash Flow', readTime: '12 min' },
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
      <Helmet>
        <title>Sample CFO Reports & Financial Dashboards | Benefique Tax & Accounting</title>
        <meta name="description" content="See real examples of Benefique's fractional CFO reports and financial dashboards. Clear insights in owner terms, not accountant-speak." />
        <link rel="canonical" href="https://www.benefique.com/demo" />
      </Helmet>
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
      a: `We focus on healthcare practices (radiology, dental, veterinary) and service-based businesses including marine services, IT companies, restaurants, and professional services firms in ${city}.`
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
  weston: { city: 'Weston', nearby: ['Davie', 'Plantation', 'Miramar', 'Southwest Ranches'], description: 'Accounting and fractional CFO services for Weston\'s growing healthcare and service business community.' },
  miramar: { city: 'Miramar', nearby: ['Hollywood', 'Pembroke Pines', 'Weston', 'Miami Gardens'], description: 'Real-time accounting and tax planning for Miramar businesses — healthcare, marine services, and more.' },
  'fort-lauderdale': { city: 'Fort Lauderdale', nearby: ['Davie', 'Plantation', 'Hollywood', 'Oakland Park'], description: 'Fort Lauderdale\'s trusted accounting firm for healthcare practices, marine services, and professional services.' },
  aventura: { city: 'Aventura', nearby: ['North Miami Beach', 'Sunny Isles', 'Hallandale', 'Miami'], description: 'Accounting and CFO services for Aventura businesses — medical practices, professional services, and hospitality.' },
  hollywood: { city: 'Hollywood', nearby: ['Fort Lauderdale', 'Davie', 'Hallandale', 'Miramar'], description: 'Full-service accounting for Hollywood, FL businesses — from healthcare to marine and hospitality services.' },
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
          </Routes>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}
/* Cache bust: 1772812726 */
