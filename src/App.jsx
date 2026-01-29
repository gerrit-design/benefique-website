import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

// ============================================================
// BENEFIQUE WEBSITE
// Built: 2026-01-28
// ============================================================

// Navigation Component
function Nav() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-benefique-blue rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <span className="text-xl font-bold text-benefique-blue">Benefique</span>
        </Link>
        <div className="hidden md:flex gap-6">
          {[
            ['/', 'Home'],
            ['/services', 'Services'],
            ['/about', 'About'],
            ['/testimonials', 'Testimonials'],
            ['/blog', 'Blog'],
            ['/contact', 'Contact'],
          ].map(([path, label]) => (
            <Link
              key={path}
              to={path}
              className={`text-sm font-medium transition-colors ${
                isActive(path) ? 'text-benefique-blue' : 'text-gray-600 hover:text-benefique-blue'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
        <Link
          to="/contact"
          className="bg-benefique-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-benefique-blue font-bold">B</span>
              </div>
              <span className="font-bold">Benefique</span>
            </div>
            <p className="text-gray-400 text-sm">
              History matters, but preparation wins.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/services" className="hover:text-white">Fractional CFO</Link></li>
              <li><Link to="/services" className="hover:text-white">Full-Service Accounting</Link></li>
              <li><Link to="/services" className="hover:text-white">Tax Planning</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/testimonials" className="hover:text-white">Testimonials</Link></li>
              <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Davie, Florida</li>
              <li>info@benefique.com</li>
              <li>(954) 903-1AX</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Benefique Tax & Accounting. All rights reserved.
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
      <section className="bg-gradient-to-br from-benefique-blue to-blue-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              You didn't go into business to become an accountant.
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              We handle your books, taxes, and financial strategy so you can focus on what you do best. 
              Real-time insights. Proactive planning. Results you can see.
            </p>
            <div className="flex gap-4">
              <Link
                to="/contact"
                className="bg-white text-benefique-blue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Schedule a Call
              </Link>
              <Link
                to="/services"
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-benefique-blue transition"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              ['30+', 'Active Clients'],
              ['17', 'Fractional CFO Engagements'],
              ['7th', 'Business Day Close'],
              ['24hr', 'Response Time'],
            ].map(([stat, label]) => (
              <div key={label}>
                <div className="text-3xl font-bold text-benefique-blue">{stat}</div>
                <div className="text-gray-600 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How We Help</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '📊',
                title: 'Fractional CFO',
                desc: 'Strategic financial leadership without the full-time cost. Monthly closes, cash flow forecasting, and decision-ready dashboards.',
              },
              {
                icon: '📚',
                title: 'Full-Service Accounting',
                desc: 'Real-time books, not year-old history. We manage your day-to-day accounting so you always know where you stand.',
              },
              {
                icon: '🎯',
                title: 'Proactive Tax Planning',
                desc: 'Why wait until April? Year-round strategies to minimize tax burden and maximize opportunities.',
              },
            ].map((service) => (
              <div key={service.title} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-benefique-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to see what's possible?</h2>
          <p className="text-blue-100 mb-8">
            Let's talk about your business and how we can help you gain clarity, control, and confidence in your finances.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-benefique-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Schedule Your Free Consultation
          </Link>
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
      <section className="bg-benefique-blue text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-blue-100">Comprehensive financial solutions for growing businesses</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 space-y-16">
          {/* Fractional CFO */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-5xl mb-4">📊</div>
              <h2 className="text-2xl font-bold mb-4">Fractional CFO Services</h2>
              <p className="text-gray-600 mb-4">
                Get C-suite financial expertise at a fraction of the cost. Our CFO services include:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  Monthly financial closes by the 7th business day
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  Custom CFO dashboards with real-time metrics
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  Cash flow forecasting and management
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  Strategic planning and budgeting
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  Bank and investor relations support
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 rounded-xl p-8">
              <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">Featured</div>
              <h3 className="text-xl font-bold mb-4">The Benefique Financial Times</h3>
              <p className="text-gray-600 mb-4">
                Your monthly financial newspaper. We present your numbers so you don't need accounting 
                expertise to understand what's happening in your business.
              </p>
              <Link to="/contact" className="text-benefique-blue font-semibold hover:underline">
                See a Demo →
              </Link>
            </div>
          </div>

          {/* Full-Service Accounting */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="md:order-2">
              <div className="text-5xl mb-4">📚</div>
              <h2 className="text-2xl font-bold mb-4">Full-Service Accounting</h2>
              <p className="text-gray-600 mb-4">
                Real-time books, not year-old history. We handle everything:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  Bookkeeping and transaction coding
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  Accounts payable management
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  Payroll processing and compliance
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  Bank and credit card reconciliations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  Month-end and year-end close
                </li>
              </ul>
            </div>
            <div className="md:order-1 bg-gray-100 rounded-xl p-8">
              <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">Our Promise</div>
              <h3 className="text-xl font-bold mb-4">24-Hour Response Time</h3>
              <p className="text-gray-600">
                Questions don't wait. Neither do we. Every client inquiry gets a response 
                within one business day, guaranteed.
              </p>
            </div>
          </div>

          {/* Tax Planning */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-5xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold mb-4">Proactive Tax Planning</h2>
              <p className="text-gray-600 mb-4">
                Year-round strategies, not April surprises:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  Entity structure optimization
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  R&D tax credit identification
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  Retirement and benefit planning
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  State and local tax compliance
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  Quarterly estimates and projections
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 rounded-xl p-8">
              <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">Focus Areas</div>
              <h3 className="text-xl font-bold mb-4">Healthcare & Service SMBs</h3>
              <p className="text-gray-600">
                We specialize in healthcare practices, professional services, and service-based 
                businesses. We understand your industry's unique challenges.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// TESTIMONIALS PAGE
// ============================================================
function Testimonials() {
  const testimonials = [
    {
      name: 'Mark',
      industry: 'Multi-Location Radiology',
      quote: 'Benefique gives us visibility across all our locations. We finally know which centers are performing and which need attention.',
      category: 'Healthcare',
    },
    {
      name: 'Daryl',
      industry: 'Diagnostic Imaging',
      quote: 'They showed us the levers we could pull to improve profitability. Not just reports—actionable insights.',
      category: 'Healthcare',
    },
    {
      name: 'Humberto',
      industry: 'Radiology Operations',
      quote: 'The monthly CFO dashboard changed how we run the business. We make decisions based on data now, not gut feel.',
      category: 'Healthcare',
    },
    {
      name: 'Flavio',
      industry: 'Remote Radiology',
      quote: 'As a remote practice, having a team that truly understands healthcare billing was crucial. Benefique delivers.',
      category: 'Healthcare',
    },
    {
      name: 'Brandon',
      industry: 'Veterinary',
      quote: 'They handle everything—books, taxes, payroll. I can focus on my patients instead of spreadsheets.',
      category: 'Healthcare',
    },
    {
      name: 'Eddie',
      industry: 'Dental Brokerage',
      quote: 'Complex multi-entity structure, and they keep it all organized. Tax planning alone has saved us significantly.',
      category: 'Professional Services',
    },
    {
      name: 'Jamel',
      industry: 'IT Services',
      quote: 'Fast, responsive, and actually understands tech businesses. The monthly close is always on time.',
      category: 'Professional Services',
    },
    {
      name: 'Kobus',
      industry: 'Marine HVAC',
      quote: 'We went from chaos to clarity. Now I know exactly where we stand financially at any moment.',
      category: 'Marine',
    },
    {
      name: 'Natasha',
      industry: 'Restaurant Group',
      quote: 'Multiple locations, different concepts, one clear financial picture. That\'s what Benefique built for us.',
      category: 'Food Service',
    },
  ];

  const categories = ['All', 'Healthcare', 'Professional Services', 'Marine', 'Food Service'];
  const [filter, setFilter] = React.useState('All');
  
  const filtered = filter === 'All' ? testimonials : testimonials.filter(t => t.category === filter);

  return (
    <div>
      <section className="bg-benefique-blue text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Client Testimonials</h1>
          <p className="text-xl text-blue-100">Hear from the businesses we serve</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  filter === cat
                    ? 'bg-benefique-blue text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="text-4xl mb-4">"</div>
                <p className="text-gray-700 mb-4">{t.quote}</p>
                <div className="border-t pt-4">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.industry}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">The Team Behind the Numbers</h2>
          <p className="text-gray-600 mb-8">
            Our team combines Big 4 experience with entrepreneurial agility. We've worked with 
            businesses from startups to $50M+ enterprises, and we bring that expertise to every client.
          </p>
          <Link
            to="/about"
            className="inline-block bg-benefique-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            Meet the Team
          </Link>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// ABOUT PAGE
// ============================================================
function About() {
  return (
    <div>
      <section className="bg-benefique-blue text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">About Benefique</h1>
          <p className="text-xl text-blue-100">History matters, but preparation wins.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold mb-4">Our Philosophy</h2>
            <p className="text-gray-600 mb-6">
              Most accounting firms look backward. They tell you what happened last year, last quarter, 
              last month. That's history. Important, but not enough.
            </p>
            <p className="text-gray-600 mb-6">
              At Benefique, we believe financial data should drive decisions, not just document them. 
              Real-time books. Monthly closes by the 7th. Dashboards that answer questions before you ask them.
            </p>
            <p className="text-gray-600 mb-8">
              We specialize in healthcare and service-based SMBs because we understand the unique 
              challenges—complex billing, multi-location operations, seasonal fluctuations, regulatory requirements.
            </p>

            <h2 className="text-2xl font-bold mb-4">What Makes Us Different</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                { title: '7th Business Day Close', desc: 'Your books are closed and reviewed by the 7th of every month. No waiting.' },
                { title: '24-Hour Response', desc: 'Questions get answers within one business day. Always.' },
                { title: 'Decision-Ready Dashboards', desc: 'Not just numbers—insights you can act on immediately.' },
                { title: 'Proactive Planning', desc: 'We find opportunities before they become emergencies.' },
              ].map(item => (
                <div key={item.title} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-4">Location</h2>
            <p className="text-gray-600">
              Based in Davie, Florida, we serve clients throughout South Florida and beyond. 
              Our technology-forward approach means location is never a barrier to great service.
            </p>
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
    {
      title: 'December Financials: What to Review Before Year-End',
      excerpt: 'Key financial checkpoints every business owner should review before closing the books on the year.',
      date: '2025-12-15',
      slug: 'december-financials',
    },
    {
      title: 'S-Corp Election: Is It Right for Your Business?',
      excerpt: 'Understanding the tax implications and benefits of S-Corp status for small business owners.',
      date: '2025-11-20',
      slug: 's-corp-election',
    },
    {
      title: 'R&D Tax Credits: Hidden Money for Healthcare Practices',
      excerpt: 'Many healthcare businesses miss out on significant R&D credits. Here\'s how to identify and claim them.',
      date: '2025-10-15',
      slug: 'rd-tax-credits',
    },
    {
      title: 'Cash Flow Forecasting 101',
      excerpt: 'A practical guide to predicting and managing your business cash flow.',
      date: '2025-09-10',
      slug: 'cash-flow-forecasting',
    },
    {
      title: 'Multi-Location Financial Management',
      excerpt: 'Best practices for businesses operating across multiple locations or entities.',
      date: '2025-08-05',
      slug: 'multi-location-management',
    },
  ];

  return (
    <div>
      <section className="bg-benefique-blue text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-blue-100">Insights on accounting, tax, and financial strategy</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-8">
            {posts.map(post => (
              <article key={post.slug} className="border-b border-gray-200 pb-8">
                <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                <h2 className="text-xl font-bold mb-2 hover:text-benefique-blue cursor-pointer">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <span className="text-benefique-blue font-medium hover:underline cursor-pointer">
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
      <section className="bg-benefique-blue text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100">Let's talk about your business</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
              <p className="text-gray-600 mb-6">
                Ready to gain clarity in your finances? Schedule a free consultation and let's 
                discuss how we can help your business thrive.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <div className="font-semibold">Location</div>
                    <div className="text-gray-600">Davie, Florida</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📧</span>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-gray-600">info@benefique.com</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🌐</span>
                  <div>
                    <div className="font-semibold">Website</div>
                    <div className="text-gray-600">www.benefique.com</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Send a Message</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-benefique-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-benefique-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Company</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-benefique-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-benefique-blue"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-benefique-blue text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
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
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
