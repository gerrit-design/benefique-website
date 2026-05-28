// GA4 event tracking for funnel measurement.
// Fires gtag events with beacon transport so submissions survive navigation.

const isClient = () => typeof window !== 'undefined' && typeof window.gtag === 'function'

export function trackEvent(name, params = {}) {
  if (!isClient()) return
  window.gtag('event', name, { transport_type: 'beacon', ...params })
}

export function trackFormSubmit(formId, extra = {}) {
  return () => {
    trackEvent('form_submit', {
      form_id: formId,
      page_path: window.location.pathname,
      page_search: window.location.search || '',
      ...extra,
    })
  }
}

const CTA_DESTS = new Set(['/contact', '/demo', '/apply'])

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
