import { prisma } from '@/lib/db'
import Splash from '@/components/Splash'
import Nav from '@/components/Nav'
import Animations from '@/components/Animations'
import ProjectsSection from '@/components/ProjectsSection'

export const dynamic = 'force-dynamic'

const FALLBACK_PROJECTS = [
  { id: 1, name: 'PayFlow',   category: 'Fintech',   description: 'Next-gen payment infrastructure for global businesses.',        status: 'live'    as const, metric: '2.1M txns/day',    icon: '💳', sortOrder: 1 },
  { id: 2, name: 'Nexus AI',  category: 'AI',        description: 'Enterprise AI assistant that integrates into your workflow.',   status: 'live'    as const, metric: '40K teams',        icon: '🤖', sortOrder: 2 },
  { id: 3, name: 'ShipKit',   category: 'Dev Tools', description: 'The deployment toolkit that cuts release time by 80%.',        status: 'live'    as const, metric: '120K deploys/mo',  icon: '🚀', sortOrder: 3 },
  { id: 4, name: 'FormCraft', category: 'SaaS',      description: 'Beautiful, conversion-optimised forms with zero code.',        status: 'live'    as const, metric: '8.4M submissions', icon: '📋', sortOrder: 4 },
  { id: 5, name: 'Vault',     category: 'Fintech',   description: 'Secure multi-currency treasury management for startups.',      status: 'beta'    as const, metric: 'Invite only',      icon: '🏦', sortOrder: 5 },
  { id: 6, name: 'Scope',     category: 'Dev Tools', description: 'Full-stack observability platform with AI-powered alerts.',    status: 'live'    as const, metric: '18K monitors',     icon: '🔭', sortOrder: 6 },
  { id: 7, name: 'Collab',    category: 'SaaS',      description: 'Real-time async collaboration built for distributed teams.',   status: 'beta'    as const, metric: 'Early access',     icon: '🤝', sortOrder: 7 },
  { id: 8, name: 'Horizon',   category: 'Consumer',  description: 'Personal finance dashboard trusted by a million households.', status: 'live'    as const, metric: '1.2M users',       icon: '🌅', sortOrder: 8 },
  { id: 9, name: 'Studio',    category: 'AI',        description: 'AI-powered creative suite for product and marketing teams.',   status: 'stealth' as const, metric: null,               icon: '🎨', sortOrder: 9 },
]

export default async function Home() {
  let projects = FALLBACK_PROJECTS
  try {
    const rows = await prisma.project.findMany({
      orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
    })
    if (rows.length > 0) projects = rows as any
  } catch {
    // DB not connected — using fallback projects
  }

  const totalProj  = projects.length
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))] as string[]

  return (
    <>
      <Splash />
      <Nav />
      <Animations />

      {/* ===== HERO ===== */}
      <section className="hero" id="hero">
        <div className="hero-inner">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot"></span>
            Technology company &nbsp;&middot;&nbsp; {totalProj}+ products
          </div>
          <h1 className="hero-title">
            WE BUILD PRODUCTS<br />
            <span className="hero-orange">THE WORLD USES.</span>
          </h1>
          <p className="hero-sub">
            Rayl is a technology company behind dozens of ambitious digital products.
            From fintech infrastructure to AI tools &mdash; we ship, scale, and obsess over quality.
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn-primary">Explore our work</a>
            <a href="#about"    className="btn-ghost">Learn about us</a>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span>SCROLL</span>
          <div className="hsline"></div>
        </div>
      </section>

      {/* ===== SCRUB 1 ===== */}
      <section className="scrub-section" id="scrub1">
        <div className="scrub-sticky">
          <div className="scrub-inner">
            <p className="scrub-label">Mission</p>
            <p className="scrub-text" data-text="WE BUILD TECHNOLOGY THAT DEFINES WHAT IS POSSIBLE.">
              <span>WE BUILD TECHNOLOGY THAT DEFINES WHAT IS POSSIBLE.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ===== STATS STRIP ===== */}
      <section className="stats-strip" id="about">
        <div className="container">
          <div className="stats-strip-grid">
            <div className="ss-item">
              <div className="ss-num"><span className="counter" data-target={totalProj}>0</span>+</div>
              <div className="ss-label">Products shipped</div>
            </div>
            <div className="ss-item">
              <div className="ss-num"><span className="counter" data-target="12">0</span>M+</div>
              <div className="ss-label">End users</div>
            </div>
            <div className="ss-item">
              <div className="ss-num"><span className="counter" data-target="7">0</span>yrs</div>
              <div className="ss-label">Of building</div>
            </div>
            <div className="ss-item">
              <div className="ss-num">99.97%</div>
              <div className="ss-label">Avg. uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SCRUB 2 ===== */}
      <section className="scrub-section" id="scrub2">
        <div className="scrub-sticky">
          <div className="scrub-inner">
            <p className="scrub-label">Portfolio</p>
            <p className="scrub-text" data-text={`${totalProj} PRODUCTS. MILLIONS OF USERS. ZERO COMPROMISES.`}>
              <span>{totalProj} PRODUCTS. MILLIONS OF USERS. ZERO COMPROMISES.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ===== ABOUT CARDS ===== */}
      <section className="about-section">
        <div className="container">
          <div className="about-header">
            <p className="section-eyebrow">Who we are</p>
            <h2 className="section-heading">Not an agency.<br />A builder.</h2>
          </div>
          <div className="about-grid">
            <div className="about-card ac-featured reveal">
              <div className="ac-icon">&#9889;</div>
              <h3>Fast by default</h3>
              <p>We ship in weeks, not quarters. Speed is culture, not an exception.</p>
            </div>
            <div className="about-card reveal reveal-d1">
              <div className="ac-icon">&#128297;</div>
              <h3>Full ownership</h3>
              <p>We don&apos;t hand off. We build, maintain, and iterate on everything we create.</p>
            </div>
            <div className="about-card reveal reveal-d2">
              <div className="ac-icon">&#128200;</div>
              <h3>Built to scale</h3>
              <p>Architecture decisions made at day one that hold up at day ten thousand.</p>
            </div>
            <div className="about-card reveal reveal-d3">
              <div className="ac-icon">&#127757;</div>
              <h3>Global reach</h3>
              <p>Our products serve users across 60+ countries without breaking a sweat.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SCRUB 3 ===== */}
      <section className="scrub-section" id="scrub3">
        <div className="scrub-sticky">
          <div className="scrub-inner">
            <p className="scrub-label">Operators</p>
            <p className="scrub-text" data-text="WE ARE OPERATORS, NOT CONSULTANTS. WE BUILD AND WE STAY.">
              <span>WE ARE OPERATORS, NOT CONSULTANTS. WE BUILD AND WE STAY.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <ProjectsSection projects={projects} categories={categories} totalProj={totalProj} />

      {/* ===== WHY RAYL ===== */}
      <section className="why-section" id="why">
        <div className="container">
          <div className="why-inner">
            <div className="why-left reveal">
              <p className="section-eyebrow">Why choose Rayl</p>
              <h2 className="section-heading">The Rayl<br />difference.</h2>
              <p className="section-sub">We&apos;re not consultants. We&apos;re not agencies. We&apos;re operators who&apos;ve been building real products for real users for seven years straight.</p>
              <a href="#contact" className="btn-primary">Work with us &rarr;</a>
            </div>
            <div className="why-right">
              <div className="why-item reveal">
                <div className="why-num">01</div>
                <div className="why-content">
                  <h3>We eat our own cooking</h3>
                  <p>Every tool we build, we use internally first. Real-world pressure before it ships to you.</p>
                </div>
              </div>
              <div className="why-item reveal reveal-d1">
                <div className="why-num">02</div>
                <div className="why-content">
                  <h3>Portfolio thinking</h3>
                  <p>Cross-pollination across {totalProj}+ products means breakthroughs in one flow into all the others.</p>
                </div>
              </div>
              <div className="why-item reveal reveal-d2">
                <div className="why-num">03</div>
                <div className="why-content">
                  <h3>Long-term operators</h3>
                  <p>We don&apos;t flip. We maintain. Our oldest products are still actively developed and supported.</p>
                </div>
              </div>
              <div className="why-item reveal reveal-d3">
                <div className="why-num">04</div>
                <div className="why-content">
                  <h3>Design is engineering</h3>
                  <p>Great UX isn&apos;t a layer &mdash; it&apos;s baked into architecture. Rayl products are built beautiful by default.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-glow"></div>
            <p className="section-eyebrow light">Ready to build?</p>
            <h2>Let&apos;s make something<br />great together.</h2>
            <p>Whether you want to use one of our products, partner with us, or just say hello &mdash; we&apos;re listening.</p>
            <div className="cta-btns">
              <a href="#contact"  className="btn-white">Start a conversation</a>
              <a href="#projects" className="btn-ghost-white">Browse projects</a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="contact-layout">
            <div className="contact-left reveal">
              <p className="section-eyebrow">Get in touch</p>
              <h2 className="section-heading">Let&apos;s talk.</h2>
              <p className="section-sub">We work with teams of all sizes &mdash; from solo founders to global enterprises.</p>
              <div className="contact-links">
                <a href="mailto:hello@rayl.co" className="contact-link-row">
                  <div className="clr-icon">&#128231;</div>
                  <div className="clr-text"><strong>Email us</strong><span>hello@rayl.co</span></div>
                  <span className="clr-arrow">&rarr;</span>
                </a>
                <a href="#" className="contact-link-row">
                  <div className="clr-icon">&#120143;</div>
                  <div className="clr-text"><strong>Twitter / X</strong><span>@raylhq</span></div>
                  <span className="clr-arrow">&rarr;</span>
                </a>
                <a href="#" className="contact-link-row">
                  <div className="clr-icon">in</div>
                  <div className="clr-text"><strong>LinkedIn</strong><span>Rayl Technologies</span></div>
                  <span className="clr-arrow">&rarr;</span>
                </a>
              </div>
            </div>
            <div className="contact-right reveal reveal-d1">
              <form className="contact-form" id="contactForm">
                <div className="form-row">
                  <div className="form-group">
                    <label>Your name</label>
                    <input type="text" placeholder="Jane Smith" required />
                  </div>
                  <div className="form-group">
                    <label>Work email</label>
                    <input type="email" placeholder="jane@company.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>What are you building?</label>
                  <textarea placeholder="Tell us about your project..." rows={5} required></textarea>
                </div>
                <button type="submit" className="btn-primary full-w">Send message &rarr;</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <span className="footer-logo">Rayl</span>
              <p>Technology that moves.</p>
            </div>
            <div className="footer-cols">
              <div className="footer-col">
                <strong>Company</strong>
                <a href="#about">About</a>
                <a href="#">Careers</a>
                <a href="#">Press</a>
              </div>
              <div className="footer-col">
                <strong>Products</strong>
                <a href="#projects">All projects</a>
                <a href="#">Open source</a>
                <a href="#">API docs</a>
              </div>
              <div className="footer-col">
                <strong>Contact</strong>
                <a href="mailto:hello@rayl.co">hello@rayl.co</a>
                <a href="#">Twitter / X</a>
                <a href="#">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; {new Date().getFullYear()} Rayl Technologies. All rights reserved.</span>
            <div className="footer-legal">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
