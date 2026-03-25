'use client'

import { useEffect } from 'react'

export default function Animations() {
  useEffect(() => {
    /* ---- Splash ---- */
    const splash = document.getElementById('splash')
    let splashDone = false

    function hideSplash() {
      if (splashDone) return
      splashDone = true
      splash?.classList.add('hidden')
      document.body.classList.add('splash-gone')
    }

    window.addEventListener('scroll', () => { if (window.scrollY > 20) hideSplash() }, { passive: true })
    setTimeout(hideSplash, 3500)

    /* ---- Scroll-scrub white bar ---- */
    function initScrub() {
      document.querySelectorAll<HTMLElement>('.scrub-section').forEach(section => {
        const textEl = section.querySelector<HTMLElement>('.scrub-text')
        if (!textEl) return

        const fullText = (textEl.dataset.text || textEl.textContent || '').trim()
        textEl.innerHTML = ''
        textEl.textContent = fullText
        textEl.style.setProperty('--fill', '0%')

        const bar = document.createElement('span')
        bar.className = 'scrub-bar'
        bar.style.opacity = '0'
        textEl.appendChild(bar)

        function update() {
          const rect      = section.getBoundingClientRect()
          const sectionH  = section.offsetHeight
          const vpH       = window.innerHeight
          const scrolled  = -rect.top
          const maxScroll = sectionH - vpH
          const progress  = Math.max(0, Math.min(1, scrolled / maxScroll))
          const pct       = progress * 100

          textEl!.style.setProperty('--fill', `${pct}%`)
          bar.style.left    = `${pct}%`
          bar.style.opacity = progress > 0.01 && progress < 0.99 ? '1' : '0'
        }

        window.addEventListener('scroll', update, { passive: true })
        update()
      })
    }
    initScrub()

    /* ---- Animated Counters ---- */
    function animateCounter(el: HTMLElement) {
      const target = parseInt(el.dataset.target || '0', 10)
      const dur    = 1800
      const start  = performance.now()
      function tick(now: number) {
        const p     = Math.min((now - start) / dur, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        el.textContent = String(Math.floor(eased * target))
        if (p < 1) requestAnimationFrame(tick)
        else el.textContent = String(target)
      }
      requestAnimationFrame(tick)
    }

    const counterObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !(entry.target as HTMLElement).dataset.counted) {
          ;(entry.target as HTMLElement).dataset.counted = '1'
          animateCounter(entry.target as HTMLElement)
        }
      })
    }, { threshold: 0.5 })
    document.querySelectorAll<HTMLElement>('.counter').forEach(el => counterObs.observe(el))

    /* ---- Scroll Reveal ---- */
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          revealObs.unobserve(entry.target)
        }
      })
    }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el))

    /* ---- Contact Form ---- */
    const contactForm = document.getElementById('contactForm') as HTMLFormElement | null
    if (contactForm) {
      contactForm.addEventListener('submit', e => {
        e.preventDefault()
        const btn  = contactForm.querySelector<HTMLButtonElement>('button[type="submit"]')!
        const orig = btn.textContent!
        btn.textContent  = 'Message sent \u2713'
        btn.style.cssText = 'background:#00c97a; box-shadow:0 8px 24px rgba(0,201,122,0.25);'
        btn.disabled = true
        setTimeout(() => {
          btn.textContent  = orig
          btn.style.cssText = ''
          btn.disabled = false
          contactForm.reset()
        }, 3500)
      })
    }

    /* ---- Active nav highlight ---- */
    const sections   = document.querySelectorAll('section[id]')
    const navAnchors = document.querySelectorAll<HTMLAnchorElement>('.nav-links a[href^="#"]')
    const sectionObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => {
            a.style.color = a.getAttribute('href') === `#${entry.target.id}` ? 'var(--orange)' : ''
          })
        }
      })
    }, { threshold: 0.35 })
    sections.forEach(s => sectionObs.observe(s))

    return () => {
      counterObs.disconnect()
      revealObs.disconnect()
      sectionObs.disconnect()
    }
  }, [])

  return null
}
