'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [state, setState] = useState<'hidden' | 'top' | 'pill'>('hidden')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const updateState = () => {
      if (document.body.classList.contains('splash-gone')) {
        setState(window.scrollY > 80 ? 'pill' : 'top')
      }
    }

    const observer = new MutationObserver(updateState)
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    window.addEventListener('scroll', updateState, { passive: true })
    updateState()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', updateState)
    }
  }, [])

  const cls = `nav-wrap${state === 'top' ? ' top' : state === 'pill' ? ' pill' : ''}`

  return (
    <header className={cls} id="navWrap">
      <nav className="nav" id="nav">
        <Link href="/" className="nav-logo">Rayl</Link>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks">
          <li><a href="#about"    onClick={() => setMenuOpen(false)}>About</a></li>
          <li><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a></li>
          <li><a href="#why"      onClick={() => setMenuOpen(false)}>Why Rayl</a></li>
          <li><a href="#contact"  onClick={() => setMenuOpen(false)}>Contact</a></li>
        </ul>

        <div className="nav-right">
          <a href="#contact" className="nav-btn-solid">Get in touch</a>
        </div>

        <button
          className="nav-burger"
          id="navBurger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(v => !v)}
        >
          <span /><span /><span />
        </button>
      </nav>
    </header>
  )
}
