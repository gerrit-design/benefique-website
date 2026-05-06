import React from 'react';
import { Link } from 'react-router-dom';

// ============================================================
// ENHANCED HOME PAGE - "GO LOUD" VERSION
// Positioning: The First AI-Native Accounting Firm
// Created: 2026-02-27 (Proactive Coder)
// Status: READY FOR REVIEW - Do not deploy without approval
// ============================================================

export default function HomePageEnhanced() {
  return (
    <div>
      {/* HERO - AI-Native Positioning */}
      <section className="bg-gradient-to-br from-benefique-navy via-slate-800 to-benefique-navy text-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-benefique-orange/20 text-benefique-orange px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-benefique-orange/30">
              <span className="w-2 h-2 bg-benefique-orange rounded-full animate-pulse"></span>
              The First AI-Native Accounting Firm
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              We Built an AI Accounting<br />
              Firm from the Ground Up
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-6 font-light">
              While other firms talk about "leveraging AI," we rebuilt our entire operation with AI at the core.
            </p>
            
            <p className="text-lg text-blue-200 mb-8 leading-relaxed">
              The result: <span className="text-white font-semibold">70+ custom dashboards</span> deployed, 
              <span className="text-white font-semibold"> $409K/year</span> in automation savings, 
              and <span className="text-white font-semibold">24-hour response times</span> maintained at scale.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="bg-benefique-orange text-white px-8 py-4 rounded-lg font-bold hover:bg-orange-600 transition inline-flex items-center gap-2 text-lg shadow-xl shadow-orange-900/50"
              >
                See Our AI-Powered Dashboards <span>→</span>
              </Link>
              <Link
                to="#proof"
                className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition backdrop-blur"
              >
                Show Me the Proof
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-benefique-orange py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            <div>
              <div className="text-3xl md:text-4xl font-black">70+</div>
              <div className="text-sm md:text-base opacity-90">Custom Dashboards</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black">98%</div>
              <div className="text-sm md:text-base opacity-90">Client Retention</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black">24hr</div>
              <div className="text-sm md:text-base opacity-90">Response Time</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black">2-3yr</div>
              <div className="text-sm md:text-base opacity-90">Technical Lead</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF SECTION */}
      <section id="proof" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-benefique-orange uppercase tracking-wide mb-2">
              Not Just Talk. Actual Results.
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-benefique-navy mb-4">
              70+ Dashboards Deployed and Running
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We don't pitch AI services. We've been building and deploying AI-powered dashboards for 2+ years.
              Here's what we've actually delivered:
            </p>
          </div>

          {/* Proof Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 border-2 border-emerald-200">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-xl font-bold text-benefique-navy mb-2">Real-Time Financial Dashboards</h3>
              <p className="text-gray-600 mb-4">
                Every client gets a custom dashboard that updates automatically. 
                No PDFs. No waiting. Just log in and see your numbers.
              </p>
              <div className="text-sm text-gray-500">
                <span className="font-semibold text-emerald-600">✓</span> Updates nightly at 2am<br />
                <span className="font-semibold text-emerald-600">✓</span> Mobile + desktop optimized<br />
                <span className="font-semibold text-emerald-600">✓</span> AI-generated insights included
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-blue-200">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="text-xl font-bold text-benefique-navy mb-2">AI-Powered Analysis</h3>
              <p className="text-gray-600 mb-4">
                Our AI reviews your books nightly, generates insights, and flags issues before they become problems.
              </p>
              <div className="text-sm text-gray-500">
                <span className="font-semibold text-blue-600">✓</span> Catches errors humans miss<br />
                <span className="font-semibold text-blue-600">✓</span> Predicts cash flow issues<br />
                <span className="font-semibold text-blue-600">✓</span> Recommends tax strategies
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-orange-200">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-xl font-bold text-benefique-navy mb-2">Built in 48 Hours</h3>
              <p className="text-gray-600 mb-4">
                What used to take 80 hours manually now takes 2 hours. 
                We can spin up a custom dashboard for a new client in 48 hours.
              </p>
              <div className="text-sm text-gray-500">
                <span className="font-semibold text-orange-600">✓</span> Automated build system<br />
                <span className="font-semibold text-orange-600">✓</span> Proven 70+ times<br />
                <span className="font-semibold text-orange-600">✓</span> Scales infinitely
              </div>
            </div>
          </div>

          {/* Case Study Teasers */}
          <div className="bg-white rounded-xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-benefique-navy mb-6 text-center">Featured Deployments</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-sm text-benefique-orange font-semibold mb-1">Healthcare Group</div>
                <h4 className="font-bold text-benefique-navy mb-2">Multi-Location Radiology Practice</h4>
                <p className="text-gray-600 text-sm mb-3">
                  4 locations, 2 entities, consolidated reporting. Dashboard shows location-level P&L, 
                  AR aging, and physician compensation tracking.
                </p>
                <div className="text-xs text-gray-500">
                  <span className="font-semibold">Deployed:</span> January 2025<br />
                  <span className="font-semibold">Client since:</span> 2019
                </div>
              </div>

              <div>
                <div className="text-sm text-benefique-orange font-semibold mb-1">Healthcare Group</div>
                <h4 className="font-bold text-benefique-navy mb-2">Behavioral Health Network</h4>
                <p className="text-gray-600 text-sm mb-3">
                  3 therapy centers, insurance billing complexity. Dashboard tracks payer mix, 
                  collections by location, and therapist productivity.
                </p>
                <div className="text-xs text-gray-500">
                  <span className="font-semibold">Deployed:</span> December 2024<br />
                  <span className="font-semibold">Client since:</span> 2018
                </div>
              </div>

              <div>
                <div className="text-sm text-benefique-orange font-semibold mb-1">Professional Services</div>
                <h4 className="font-bold text-benefique-navy mb-2">Engineering Firm</h4>
                <p className="text-gray-600 text-sm mb-3">
                  Project-based revenue, contractor management. Dashboard shows project profitability, 
                  WIP tracking, and cash flow forecasting.
                </p>
                <div className="text-xs text-gray-500">
                  <span className="font-semibold">Deployed:</span> November 2024<br />
                  <span className="font-semibold">Client since:</span> 2020
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY NOW MATTERS */}
      <section className="py-16 bg-benefique-navy text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why This Matters Right Now</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            In 12-18 months, every CPA firm will claim to be "AI-powered." But right now, 
            we're one of maybe <span className="text-benefique-orange font-bold">5 firms worldwide</span> actually doing this at scale.
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur">
              <h3 className="font-bold text-lg mb-3">❌ What Most Firms Do</h3>
              <ul className="space-y-2 text-blue-100">
                <li>• Send monthly PDFs (2 weeks late)</li>
                <li>• Manual data entry and reconciliation</li>
                <li>• Reactive problem-solving</li>
                <li>• Generic reports and templates</li>
                <li>• Talk about "exploring AI"</li>
              </ul>
            </div>
            <div className="bg-benefique-orange/20 rounded-xl p-6 backdrop-blur border-2 border-benefique-orange/50">
              <h3 className="font-bold text-lg mb-3 text-benefique-orange">✓ What We Actually Do</h3>
              <ul className="space-y-2">
                <li>• Real-time dashboards (updates nightly)</li>
                <li>• Automated data processing and validation</li>
                <li>• Proactive issue detection</li>
                <li>• Custom-built for each client</li>
                <li>• <span className="font-semibold">Been doing it for 2+ years</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* THE INVESTMENT */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-benefique-navy text-center mb-6">
            The 2-Year Build Nobody Else Made
          </h2>
          <p className="text-gray-600 text-center mb-12 text-lg max-w-2xl mx-auto">
            We didn't just adopt AI tools. We rebuilt our entire firm from scratch with AI at the core.
            Here's what that took:
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-xl text-benefique-navy mb-4">Time Investment</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">First dashboard build:</span>
                  <span className="font-semibold">80 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">System refinement:</span>
                  <span className="font-semibold">18 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Now (per dashboard):</span>
                  <span className="font-semibold text-emerald-600">2 hours</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-benefique-orange font-bold">
                    <span>Efficiency gain:</span>
                    <span>40x faster</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-xl text-benefique-navy mb-4">Technology Investment</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Standalone infrastructure:</span>
                  <span className="font-semibold">$22K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual automation savings:</span>
                  <span className="font-semibold text-emerald-600">$409K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ROI:</span>
                  <span className="font-semibold">1,850%</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-benefique-orange font-bold">
                    <span>Payback period:</span>
                    <span>20 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-benefique-navy text-white rounded-xl p-6 text-center">
            <p className="text-lg mb-2">
              <span className="font-bold text-benefique-orange">Competitors starting today:</span> 
              18-24 months + $200K+ to replicate
            </p>
            <p className="text-blue-100">
              We're not just ahead. We're unreachable.
            </p>
          </div>
        </div>
      </section>

      {/* TRADITIONAL SERVICES (KEEP FROM ORIGINAL) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">What You Get</p>
            <h2 className="text-3xl font-bold text-benefique-navy mb-4">Everything a CPA Firm Does — Plus AI</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're not replacing traditional accounting. We're supercharging it with automation and intelligence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '📚', title: 'Full Bookkeeping', desc: 'Bank reconciliation, categorization, month-end close — automated and accurate.' },
              { icon: '💰', title: 'Payroll Processing', desc: 'Employee and contractor payroll, on time, with all filings handled.' },
              { icon: '🎯', title: 'Tax Prep & Planning', desc: 'Not just filing — proactive planning throughout the year.' },
              { icon: '📊', title: 'AI-Powered Dashboards', desc: 'Real-time financials that update automatically. See your numbers anytime.' },
              { icon: '📋', title: 'AP/AR Management', desc: 'Bills tracked, paid on schedule. No missed payments or late fees.' },
              { icon: '📞', title: 'Monthly Review Calls', desc: 'Walk through your numbers. Ask questions. Get strategic advice.' },
              { icon: '🤖', title: 'Automated Insights', desc: 'AI reviews your books nightly and flags issues before they become problems.' },
              { icon: '⚡', title: '24-Hour Response', desc: 'Email, text, call — you get answers within 24 hours. Guaranteed.' },
              { icon: '✅', title: 'Full Compliance', desc: 'Sales tax, 1099s, all filings handled. No surprises, no penalties.' },
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

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-br from-benefique-orange via-orange-600 to-benefique-orange text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            See What an AI-Powered<br />Accounting Firm Looks Like
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Book a 15-minute demo. We'll show you a live dashboard, explain how it works, 
            and tell you honestly if we're the right fit.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-benefique-orange px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-2xl"
          >
            Book Your Demo →
          </Link>
          <p className="text-sm mt-6 opacity-75">
            No obligation. No pressure. Just a straight conversation.
          </p>
        </div>
      </section>
    </div>
  );
}
