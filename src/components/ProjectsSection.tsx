'use client'

import { useState } from 'react'

interface Project {
  id: number
  name: string
  category: string
  description: string
  status: 'live' | 'beta' | 'stealth'
  metric: string | null
  icon: string
  sortOrder: number
}

interface Props {
  projects: Project[]
  categories: string[]
  totalProj: number
}

export default function ProjectsSection({ projects, categories, totalProj }: Props) {
  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? projects
    : projects.filter(p => p.category.toLowerCase().replace(/\s+/g, '-') === active)

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <div className="projects-header">
          <p className="section-eyebrow">Our portfolio</p>
          <h2 className="section-heading">A lot of projects.<br />All of them real.</h2>
          <p className="section-sub">From side bets to market leaders — this is what we&apos;ve been building.</p>
        </div>

        <div className="filter-row">
          {categories.map(cat => {
            const val = cat === 'All' ? 'all' : cat.toLowerCase().replace(/\s+/g, '-')
            return (
              <button
                key={cat}
                className={`filter-btn${active === val ? ' active' : ''}`}
                onClick={() => setActive(val)}
              >
                {cat}
              </button>
            )
          })}
        </div>

        <div className="projects-grid" id="projectsGrid">
          {filtered.map((p, i) => {
            const isFeatured = i === 1 && active === 'all'
            const catSlug    = p.category.toLowerCase().replace(/\s+/g, '-')
            return (
              <article
                key={p.id}
                className={`project-card${isFeatured ? ' pc-featured' : ''} reveal visible`}
                data-cat={catSlug}
              >
                {isFeatured && <div className="pc-featured-tag">Featured</div>}
                <div className="pc-top">
                  <div className="pc-icon">{p.icon}</div>
                  <span className="pc-cat">{p.category}</span>
                </div>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <div className="pc-foot">
                  <div className="pc-pills">
                    {p.metric && <span className="pc-pill">{p.metric}</span>}
                    <span className={`pc-pill pc-status-${p.status}`}>
                      {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                    </span>
                  </div>
                  <span className="pc-arrow">&rarr;</span>
                </div>
              </article>
            )
          })}
        </div>

        {totalProj > 0 && (
          <div className="projects-more">
            <div className="pm-card">
              <span className="pm-num">30+</span>
              <span className="pm-text">more products in stealth, beta, and active development.</span>
              <a href="#contact" className="btn-primary">Partner with us &rarr;</a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
