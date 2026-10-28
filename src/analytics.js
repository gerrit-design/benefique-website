// GA4 event tracking for funnel measurement.
// Fires gtag events with beacon transport so submissions survive navigation.
//
// GA4 itself is loaded by the inline block in index.html (copied onto every
// prerendered route by scripts/prerender.js). That block also applies the
// staff flag (?internal=1 / ?internal=0) before gtag('config').

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const isClient = () => typeof window !== 'undefined' && typeof window.gtag === 'function'

// --- storage helpers (private windows / blocked storage must never throw) ---
function store(kind) {
  try { return window[kind] } catch (e) { return null }
}
function readJSON(kind, key) {
  try { const s = store(kind); const v = s && s.getItem(key); return v ? JSON.parse(v) : null } catch (e) { return null }
}
function writeJSON(kind, key, value) {
  try { const s = store(kind); if (s) s.setItem(key, JSON.stringify(value)) } catch (e) { /* ignore */ }
}

export function trackEvent(name, params = {}) {
  if (!isClient()) return
  window.gtag('event', name, { transport_type: 'beacon', ...params })
}

// --- once-only guard: a key fires at most once per browser tab session ---
const FIRED_KEY = 'bq_ga_fired'
function firstTime(key) {
  const fired = readJSON('sessionStorage', FIRED_KEY) || []
  if (fired.includes(key)) return false
  writeJSON('sessionStorage', FIRED_KEY, [...fired, key].slice(-50))
  return true
}
export function trackOnce(key, name, params = {}) {
  if (!firstTime(key)) return
  trackEvent(name, params)
}

// --- internal (staff) traffic -------------------------------------------
// The inline GA block handles a full page load. This covers ?internal=1/0
// arriving through a client-side route change.
const INTERNAL_KEY = 'bq_internal'
export function syncInternalFlag(search) {
  if (typeof window === 'undefined') return
  let q = null
  try { q = new URLSearchParams(search).get('internal') } catch (e) { return }
  if (q !== '1' && q !== '0') return
  try {
    if (q === '1') window.localStorage.setItem(INTERNAL_KEY, '1')
    else window.localStorage.removeItem(INTERNAL_KEY)
  } catch (e) { /* ignore */ }
  try {
    document.cookie = q === '1'
      ? `${INTERNAL_KEY}=1; max-age=63072000; path=/; SameSite=Lax`
      : `${INTERNAL_KEY}=; max-age=0; path=/; SameSite=Lax`
  } catch (e) { /* ignore */ }
  // Clearing takes full effect on the next page load (gtag 'set' cannot be unset).
  if (q === '1' && isClient()) window.gtag('set', { traffic_type: 'internal' })
}

// Call once inside the router: re-applies the staff flag on client-side nav.
export function useAnalyticsRoute() {
  const { search } = useLocation()
  useEffect(() => { syncInternalFlag(search) }, [search])
}

// --- original-visit attribution ---------------------------------------------
// Captured on the first page view of a tab session (sessionStorage) and kept
// as the last non-direct touch in localStorage (90 days), so a conversion that
// GA4 records in a fresh session (reload, restored tab, new tab) still carries
// where the visitor originally came from.
const ATTR_KEY = 'bq_attr'
const ATTR_TTL_MS = 90 * 86400000
const NO_CAPTURE_PATHS = ['/thank-you']
const clip = (s) => (s || '').toString().slice(0, 100)

function currentTouch() {
  const p = new URLSearchParams(window.location.search)
  let refHost = ''
  try {
    if (document.referrer) {
      const h = new URL(document.referrer).hostname
      if (!/(^|\.)benefique\.com$/.test(h) && h !== window.location.hostname) refHost = h
    }
  } catch (e) { /* ignore */ }
  const utmSource = p.get('utm_source')
  return {
    landing: clip(window.location.pathname),
    source: clip(utmSource || refHost || '(direct)'),
    medium: clip(p.get('utm_medium') || (utmSource ? '' : refHost ? 'referral' : '(none)')),
    campaign: clip(p.get('utm_campaign')),
    content: clip(p.get('utm_content')),
    referrer: clip(refHost),
    ts: Date.now(),
  }
}

export function captureAttribution() {
  if (typeof window === 'undefined') return
  if (readJSON('sessionStorage', ATTR_KEY)) return
  const touch = currentTouch()
  const stored = readJSON('localStorage', ATTR_KEY)
  const storedValid = stored && Date.now() - (stored.ts || 0) < ATTR_TTL_MS
  // A tab that opens straight onto /thank-you is not a real landing: inherit.
  if (NO_CAPTURE_PATHS.includes(touch.landing)) {
    writeJSON('sessionStorage', ATTR_KEY, storedValid ? stored : touch)
    return
  }
  writeJSON('sessionStorage', ATTR_KEY, touch)
  if (!storedValid || touch.source !== '(direct)') writeJSON('localStorage', ATTR_KEY, touch)
}

export function attributionParams() {
  if (typeof window === 'undefined') return {}
  const a = readJSON('sessionStorage', ATTR_KEY) || readJSON('localStorage', ATTR_KEY)
  if (!a) return {}
  return {
    orig_landing: a.landing,
    orig_source: a.source,
    orig_medium: a.medium,
    orig_campaign: a.campaign || '(not set)',
    orig_content: a.content || '(not set)',
  }
}

// --- forms -------------------------------------------------------------------
// form_start: once per form per page view (caller holds the per-mount guard).
export function trackFormStart(formId, extra = {}) {
  trackEvent('form_start', {
    form_id: formId,
    page_path: window.location.pathname,
    ...attributionParams(),
    ...extra,
  })
}

export function trackFormSubmit(formId, extra = {}) {
  return () => {
    trackEvent('form_submit', {
      form_id: formId,
      page_path: window.location.pathname,
      page_search: window.location.search || '',
      ...attributionParams(),
      ...extra,
    })
  }
}

export function newSubmissionId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

const CTA_DESTS = new Set(['/contact', '/demo', '/radiology/intelligence-pack', '/apply'])

function isCTADest(href) {
  if (!href) return false
  const path = href.split('?')[0].split('#')[0]
  return CTA_DESTS.has(path)
}

export function initCTATracking() {
  if (typeof document === 'undefined') return
  document.addEventListener(
    'click',
    (e) => {
      const link = e.target.closest && e.target.closest('a')
      if (!link) return
      const href = link.getAttribute('href') || ''
      if (!isCTADest(href)) return
      const label = ((link.textContent || '').replace(/\s+/g, ' ').trim() || '(no-text)').slice(0, 80)
      trackEvent('cta_click', {
        cta_label: label,
        cta_destination: href,
        cta_page: window.location.pathname,
        cta_search: window.location.search || '',
      })
    },
    true
  )
}

export function initScrollDepthTracking() {
  if (typeof window === 'undefined') return
  const milestones = [25, 50, 75, 100]
  let lastPath = window.location.pathname
  let fired = new Set()

  const reset = () => {
    if (window.location.pathname !== lastPath) {
      lastPath = window.location.pathname
      fired = new Set()
    }
  }

  const check = () => {
    reset()
    const doc = document.documentElement
    const scrolled = window.scrollY + window.innerHeight
    const height = doc.scrollHeight
    if (height <= window.innerHeight + 50) return
    const pct = Math.min(100, Math.round((scrolled / height) * 100))
    for (const m of milestones) {
      if (pct >= m && !fired.has(m)) {
        fired.add(m)
        trackEvent('scroll_depth', {
          depth_pct: m,
          page_path: window.location.pathname,
        })
      }
    }
  }

  let ticking = false
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        check()
        ticking = false
      })
    },
    { passive: true }
  )
}
