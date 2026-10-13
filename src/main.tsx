import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, BarChart3, Cpu, Globe2, Grid2X2, Layers3, Menu, MessageCircle, Network, Rocket, Sparkles, X } from 'lucide-react'
import { industries, offices, projects, services, technologies, type Project } from './content'
import './style.css'

const navItems = [
  ['About', '#about'], ['Services', '#services'], ['Industries', '#industries'], ['Projects', '#projects'], ['AI & Innovation', '#innovation'], ['Contact', '#contact'],
]

function Logo({ inverse = false }: { inverse?: boolean }) {
  return <a className={`brand-lockup${inverse ? ' brand-lockup--inverse' : ''}`} href="#home" aria-label="Dotbotics, home">
    <img src="/images/dotbotics-logo-source.png" alt="" />
    <span><b>DOTBOTICS</b><small>ADOPT&nbsp; • &nbsp;ACCELERATE&nbsp; • &nbsp;THRIVE</small></span>
  </a>
}

function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  useEffect(() => {
    const sections = ['home', 'about', 'services', 'industries', 'projects', 'innovation', 'contact'].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '-25% 0px -62% 0px' })
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => { document.body.classList.remove('menu-open'); window.removeEventListener('keydown', onKey) }
  }, [open])

  return <header className="site-header"><div className="header-inner"><Logo />
    <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-nav" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav id="primary-nav" className={`primary-nav${open ? ' is-open' : ''}`} aria-label="Primary navigation">
      {navItems.map(([label, href]) => <a key={href} className={active === href.slice(1) ? 'is-active' : ''} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>Discuss your project <ArrowUpRight size={15} /></a>
    </nav>
  </div></header>
}

function Hero() {
  return <section className="hero" id="home">
    <div className="hero-grid" aria-hidden="true"></div><div className="hero-orbit hero-orbit--one" aria-hidden="true"></div><div className="hero-orbit hero-orbit--two" aria-hidden="true"></div>
    <div className="hero-inner content-width"><div className="hero-copy">
      <div className="eyebrow eyebrow--light"><span className="eyebrow-line"></span> ERP <i /> AI & Automation <i /> Data <i /> Web & Mobile</div>
      <h1>Building intelligence<br /><em>with empathy.</em></h1>
      <p className="hero-lead">Technology partner to enterprises, governments and startups — from idea and MVP to enterprise-grade platforms.</p>
      <div className="hero-actions"><a className="button button--cyan" href="#contact">Discuss your project <ArrowUpRight size={17} /></a><a className="text-button text-button--light" href="#projects">Explore our work <ArrowDown size={16} /></a></div>
      <div className="hero-index"><span>01 / 06</span><span className="hero-index-rule"></span><span>Ideas into impact</span></div>
    </div><div className="hero-visual" aria-label="Dotbotics brand mark">
      <div className="visual-label visual-label--top"><span className="status-dot"></span> Building what moves business forward</div>
      <div className="visual-disc"><div className="disc-ring disc-ring--one"></div><div className="disc-ring disc-ring--two"></div><div className="disc-core"><span>db</span></div><span className="disc-caption">human insight<br />meets intelligent systems</span></div>
      <div className="visual-panel"><div className="panel-head"><span>CAPABILITY / 01</span><ArrowUpRight size={14} /></div><div className="panel-name">From complex problems<br />to thoughtful software.</div><div className="panel-tags"><span>ERP</span><span>AI</span><span>DATA</span></div></div>
      <div className="visual-label visual-label--bottom"><span>HYDERABAD</span><span>RAS AL KHAIMAH</span><span>ORLANDO</span></div>
    </div></div>
    <a className="hero-scroll" href="#about"><span>Scroll to explore</span><ArrowDownRight size={16} /></a>
  </section>
}

function SectionHeading({ number, eyebrow, title, copy, dark = false }: { number: string; eyebrow: string; title: React.ReactNode; copy?: string; dark?: boolean }) {
  return <div className={`section-heading${dark ? ' section-heading--dark' : ''}`}><div className="section-heading-meta"><span className="section-number">{number}</span><span className="eyebrow">{eyebrow}</span></div><div className="section-heading-main"><h2>{title}</h2>{copy && <p>{copy}</p>}</div></div>
}

function Metrics() {
  return <div className="metrics-strip"><div className="metrics-inner content-width">
    <div className="metric"><span className="metric-number">96<span>%</span></span><div><b>AI crop classification</b><small>Accuracy on field images</small></div></div>
    <div className="metric"><span className="metric-number">99.9<span>%</span></span><div><b>Data uptime</b><small>Automotive data pipeline</small></div></div>
    <div className="metric"><span className="metric-number">94<span>%</span></span><div><b>On-time renewals</b><small>Up from 78% with Insurance ERP</small></div></div>
    <div className="metric-note"><span className="tiny-cross">+</span><span>Documented outcomes<br />from featured work</span></div>
  </div></div>
}

function About() {
  return <section className="section about-section" id="about"><div className="content-width">
    <SectionHeading number="01" eyebrow="Who we are" title={<>Intelligent software,<br /><em>built around people.</em></>} copy="Technology should make work more meaningful. We design and build the systems that help organisations move forward." />
    <div className="about-layout"><div className="about-story"><div className="about-mark">01 <span>—</span> OUR APPROACH</div><p className="about-lead">Dotbotics designs and builds ERP systems, custom AI, automation and data platforms, and web and mobile applications.</p><p>Our work spans state governments, UNICEF-backed health programmes, agritech, insurance, automotive and sports businesses. We also help startups move from idea to MVP.</p><p>From an early product concept to an enterprise-grade platform, we shape the technology around the people who use it and the problems it needs to solve.</p><a className="arrow-link" href="#contact">Tell us what you're building <ArrowUpRight size={16} /></a></div>
      <div className="about-art"><div className="about-art-top"><span>THOUGHTFUL BY DESIGN</span><span>EST. SOFTWARE SYSTEMS</span></div><div className="art-path art-path--a"></div><div className="art-path art-path--b"></div><div className="art-signal"><span className="signal-orbit"></span><span className="signal-orbit signal-orbit--inner"></span><span className="signal-center">d.</span><span className="signal-dot signal-dot--1"></span><span className="signal-dot signal-dot--2"></span><span className="signal-dot signal-dot--3"></span></div><div className="art-caption"><span>THE DOTBOTICS POINT OF VIEW</span><b>Technology with<br />people at its centre.</b></div><span className="art-coordinates">17Â°26' N / 78Â°27' E</span></div></div>
    <div className="about-foot"><div><span className="foot-index">A</span><span>Enterprise platforms and<br />startup MVPs, with equal care.</span></div><div><span className="foot-index">B</span><span>One team across ERP, AI,<br />data, web and mobile.</span></div><div><span className="foot-index">C</span><span>Global offices across India,<br />UAE and the USA.</span></div></div>
  </div></section>
}

const serviceIcons = [<Grid2X2 />, <Sparkles />, <BarChart3 />, <Rocket />, <Globe2 />, <Layers3 />]
function Services() {
  return <section className="section services-section" id="services"><div className="content-width">
    <SectionHeading number="02" eyebrow="What we do" title={<>Technology to make<br /><em>ambition actionable.</em></>} copy="Connected capabilities, shaped around the opportunity in front of you." />
    <div className="services-layout"><div className="services-intro"><span className="section-side-index">CAPABILITIES / 06</span><p>From core business systems to intelligent products, the right tools make the next step possible.</p><a className="arrow-link" href="#contact">Find the right fit <ArrowUpRight size={16} /></a><div className="services-side-art"><span className="side-grid"></span><span className="side-circles"></span><span className="side-art-label">SYSTEMS<br />THAT WORK<br />FOR PEOPLE.</span></div></div>
      <div className="service-list">{services.map((service, i) => <a className="service-row" key={service.number} href="#contact"><span className="service-number">{service.number}</span><span className="service-icon">{serviceIcons[i]}</span><span className="service-text"><b>{service.title}</b><small>{service.copy}</small></span><span className="service-arrow"><ArrowUpRight size={19} /></span></a>)}</div></div>
    <div className="solutions-band"><div><span className="eyebrow eyebrow--light">Industry solutions</span><h3>Ready-to-adapt<br />platforms.</h3></div><div className="solution-tags"><span>Manufacturing Platforms</span><span>Insurance Systems</span><span>Digital HMIS</span><span>Freight Management</span><span>Multilingual AI Chatbot for Agriculture</span><span>AI Crop Classifier</span></div><a href="#projects" aria-label="Explore featured work"><ArrowUpRight /></a></div>
  </div></section>
}

function Industries() {
  return <section className="industries-section" id="industries"><div className="content-width industries-layout"><div className="industries-heading"><div className="section-heading-meta"><span className="section-number">03</span><span className="eyebrow eyebrow--light">Who we serve</span></div><h2>Different worlds.<br /><em>Shared ambition.</em></h2><p>Experience across sectors where thoughtful technology can make a meaningful difference.</p><div className="industry-footnote"><span className="tiny-cross">+</span><span>Built around the realities<br />of each industry.</span></div></div><div className="industry-matrix">{industries.map((industry, i) => <div className="industry-tile" key={industry}><span className="industry-id">{String(i + 1).padStart(2, '0')}</span><span>{industry}</span><ArrowUpRight size={15} /></div>)}</div></div></section>
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const card = <><div className={`project-image${project.image ? '' : ' project-image--abstract'}`}>
    {project.image ? <img src={project.image} alt={project.alt ?? ''} loading="lazy" /> : <div className={`abstract-art abstract-art--${index % 4}`}><span className="abstract-circle"></span><span className="abstract-word">{project.name.split(' ')[0]}</span><span className="abstract-stamp">DOTBOTICS&nbsp; / &nbsp;WEB</span></div>}
    <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
    {project.ongoing && <span className="status-badge"><span></span> In progress</span>}
    {project.url && <span className="project-visit" aria-hidden="true"><ArrowUpRight size={18} /></span>}
  </div><div className="project-info"><div className="project-eyebrow">{project.eyebrow}</div><div className="project-title-line"><h3>{project.name}</h3>{project.url && <ArrowUpRight className="title-arrow" size={17} />}</div><p>{project.description}</p><div className="project-details"><span>{project.features.length} capabilities</span><span>Project capabilities <ArrowRight size={12} /></span></div></div></>
  return project.url ? <a className="project-card" href={project.url} target="_blank" rel="noreferrer">{card}</a> : <article className="project-card">{card}</article>
}

function Projects() {
  const categories = ['All projects', 'Websites & e-commerce', 'AI & agritech', 'Government & public health', 'ERP & insurance', 'Data & analytics', 'SaaS & platforms', 'Ongoing projects']
  const [filter, setFilter] = useState('All projects')
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => projects.filter((project) => (filter === 'All projects' || project.category === filter) && `${project.name} ${project.eyebrow} ${project.description}`.toLowerCase().includes(query.toLowerCase())), [filter, query])
  const shown = filter === 'All projects' && query.length === 0 ? filtered.slice(0, 9) : filtered
  return <section className="section portfolio-section" id="projects"><div className="content-width"><SectionHeading number="04" eyebrow="Selected work" title={<>Good ideas,<br /><em>put to work.</em></>} copy="A selection of digital products and platforms, each built to solve a real challenge." />
    <div className="portfolio-toolbar"><div className="portfolio-count"><span className="count-dot"></span> {String(filtered.length).padStart(2, '0')} PROJECTS</div><label className="search-box"><span className="visually-hidden">Search projects</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects" /><span>Search</span></label></div>
    <div className="filter-row" role="group" aria-label="Filter projects by category">{categories.map((category) => <button type="button" key={category} className={filter === category ? 'filter-chip is-selected' : 'filter-chip'} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}<span>{category === 'All projects' ? projects.length : projects.filter((project) => project.category === category).length}</span></button>)}</div>
    {filter === 'Ongoing projects' && <p className="ongoing-intro">Enterprise-grade platforms currently in development for clients in the Middle East and beyond.</p>}
    <div className="project-grid">{shown.map((project, index) => <ProjectCard key={project.name} project={project} index={index} />)}</div>
    {shown.length === 0 && <p className="empty-state">No projects match that search. Try another name or category.</p>}
    {filter === 'All projects' && !query && <p className="portfolio-note">Showing 9 featured projects. Select a category to explore all 21 brochure projects, including dedicated groups for website projects and work in progress.</p>}
  </div></section>
}

function Innovation() {
  return <section className="innovation-section" id="innovation"><div className="innovation-lines" aria-hidden="true"></div><div className="content-width"><SectionHeading number="05" eyebrow="AI & innovation" title={<>Make complexity<br /><em>work for you.</em></>} copy="From multilingual guidance to satellite intelligence, we apply emerging technology where it can solve a real problem." dark />
    <div className="innovation-layout"><div className="innovation-feature"><div className="innovation-visual"><div className="ai-orbit ai-orbit--one"></div><div className="ai-orbit ai-orbit--two"></div><div className="ai-nodes"><span className="ai-node ai-node--main"><Cpu size={29} /></span><span className="ai-node ai-node--small node-a"><Network size={15} /></span><span className="ai-node ai-node--small node-b"><Sparkles size={15} /></span><span className="ai-node ai-node--small node-c"><BarChart3 size={15} /></span></div><span className="ai-coordinate">INTELLIGENCE / APPLIED</span></div><div className="innovation-feature-copy"><span className="eyebrow eyebrow--light">A practical point of view</span><p>Good AI starts with the right question, the right information and a clear outcome for the people using it.</p></div></div>
      <div className="technology-list"><div className="technology-head"><span>CAPABILITY INDEX</span><span>01 - 14</span></div><p>Tools selected for the problem at hand, with the care to make them useful.</p><div className="technology-tags">{technologies.map((technology, i) => <span className={i < 5 ? 'technology-tag technology-tag--active' : 'technology-tag'} key={technology}><i>{String(i + 1).padStart(2, '0')}</i>{technology}</span>)}</div><div className="technology-note"><span className="note-mark">↗</span><span>Capabilities reflect brochure-listed technologies. Use varies by project.</span></div></div></div>
  </div></section>
}

function Process() {
  const steps = [['01', 'Discover', 'Understand the business problem and goals.'], ['02', 'Define', 'Agree on scope, requirements and priorities.'], ['03', 'Build', 'Develop and validate the solution.'], ['04', 'Deploy', 'Prepare and release the solution.'], ['05', 'Improve', 'Iterate based on feedback and requirements.']]
  return <section className="section process-section"><div className="content-width"><SectionHeading number="06" eyebrow="How we work" title={<>A clear path from<br /><em>question to impact.</em></>} copy="A proposed engagement framework that keeps teams aligned, from first conversation to what comes next." /><div className="process-track">{steps.map(([number, name, description], i) => <div className="process-step" key={name}><div className="process-step-top"><span>{number}</span>{i < steps.length - 1 && <span className="process-step-line"></span>}</div><h3>{name}</h3><p>{description}</p></div>)}</div><div className="process-editable"><span className="tiny-cross">+</span> A proposed framework for collaboration, open to your needs.</div></div></section>
}

function WhyDotbotics() {
  return <section className="why-section"><div className="content-width why-layout"><div className="why-title"><span className="eyebrow eyebrow--light">Why Dotbotics</span><h2>Built for the<br /><em>long view.</em></h2><p>Grounded in real project experience, designed around your next challenge.</p><a className="button button--outline-light" href="#contact">Start a conversation <ArrowUpRight size={16} /></a></div><div className="why-points"><div className="why-point"><span>01</span><div><h3>Connected expertise</h3><p>ERP, AI, data, web and mobile capabilities that work together.</p></div><ArrowUpRight size={17} /></div><div className="why-point"><span>02</span><div><h3>Built for varied realities</h3><p>Experience across public service, industry, agriculture and commerce.</p></div><ArrowUpRight size={17} /></div><div className="why-point"><span>03</span><div><h3>From first idea to full platform</h3><p>Support for startup MVPs and enterprise-grade systems.</p></div><ArrowUpRight size={17} /></div><div className="why-point"><span>04</span><div><h3>Evidence in the work</h3><p>Documented outcomes across crop classification, automotive data and insurance renewals.</p></div><ArrowUpRight size={17} /></div><div className="why-point"><span>05</span><div><h3>Global presence</h3><p>Offices in India, the UAE and the USA.</p></div><ArrowUpRight size={17} /></div></div></div></section>
}

function Contact() {
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    const fields = new FormData(form)
    const body = ['Project inquiry from Dotbotics website', '', `Name: ${fields.get('name')}`, `Work email: ${fields.get('email')}`, `Company: ${fields.get('company')}`, `Phone: ${fields.get('phone') || 'Not provided'}`, `Service interested in: ${fields.get('service') || 'Not specified'}`, `Project budget: ${fields.get('budget') || 'Not provided'}`, '', 'Project details:', `${fields.get('details')}`].join('\n')
    const subject = `Project inquiry — ${fields.get('company')}`
    setError(''); setMessage('Your email app is opening with this inquiry. Please review it and send the message there; this website does not submit or store form data.')
    window.location.href = `mailto:info@dotbotics.io?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }
  return <section className="contact-section" id="contact"><div className="content-width"><SectionHeading number="07" eyebrow="Get in touch" title={<>Let's build something<br /><em>intelligent together.</em></>} copy="Have a question, an idea or a complex challenge? We'd be glad to hear about it." />
    <div className="contact-layout"><div className="contact-details"><div className="contact-direct"><span className="eyebrow">A direct line</span><a href="mailto:info@dotbotics.io">info@dotbotics.io <ArrowUpRight size={17} /></a><a href="https://www.dotbotics.io" target="_blank" rel="noreferrer">www.dotbotics.io <ArrowUpRight size={17} /></a></div><div className="office-grid">{offices.map((office) => <article className="office-card" key={office.country}><div className="office-label"><span className="office-pin"></span>{office.country}</div><h3>{office.city}</h3><a className="office-phone" href={`tel:${office.tel}`}>{office.phone}</a><p>{office.address}</p></article>)}</div><p className="contact-footnote"><MessageCircle size={15} /> Prefer email? Share a little about what you're working on and we'll take it from there.</p></div>
      <form className="contact-form" onSubmit={submit} noValidate><div className="form-heading"><span className="eyebrow">Project inquiry</span><h3>Tell us about it.</h3><p>We'll open a prefilled email draft for you to review and send.</p></div><div className="form-grid"><label>Name <span>*</span><input name="name" autoComplete="name" required maxLength={120} placeholder="Your name" /></label><label>Work email <span>*</span><input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" /></label><label>Company <span>*</span><input name="company" autoComplete="organization" required maxLength={160} placeholder="Your organisation" /></label><label>Phone <small>(optional)</small><input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="+1 555 000 0000" /></label><label>Service interested in<select name="service" defaultValue=""><option value="">Select a service</option>{services.map((service) => <option key={service.number}>{service.title}</option>)}</select></label><label>Project budget <small>(optional)</small><select name="budget" defaultValue=""><option value="">Select a range</option><option>Prefer to discuss</option><option>Under ₹5 lakh</option><option>₹5 lakh–₹25 lakh</option><option>₹25 lakh–₹50 lakh</option><option>Over ₹50 lakh</option></select></label><label className="form-full">Project details <span>*</span><textarea name="details" required minLength={15} maxLength={3000} rows={4} placeholder="What are you hoping to build or improve?" /></label></div><div className="form-submit-row"><p>Your details stay in your email app until you choose to send.</p><button className="button button--navy" type="submit">Prepare email <ArrowUpRight size={16} /></button></div>{error && <p className="form-status form-status--error" role="alert">{error}</p>}{message && <p className="form-status" role="status">{message}</p>}</form></div>
  </div></section>
}

function Footer() {
  return <footer className="site-footer"><div className="content-width"><div className="footer-main"><div className="footer-brand"><Logo inverse /><p>Technology partner to enterprises, governments and startups — from idea and MVP to enterprise-grade platforms.</p><span className="footer-motto">Building Intelligence with Empathy</span></div><div className="footer-column"><span>EXPLORE</span><a href="#about">About</a><a href="#services">Services</a><a href="#industries">Industries</a><a href="#projects">Projects</a><a href="#innovation">AI & Innovation</a></div><div className="footer-column"><span>CAPABILITIES</span>{services.map((service) => <a href="#contact" key={service.number}>{service.title}</a>)}</div><div className="footer-column footer-contact"><span>GET IN TOUCH</span><a href="mailto:info@dotbotics.io">info@dotbotics.io</a><a href="https://www.dotbotics.io" target="_blank" rel="noreferrer">www.dotbotics.io</a>{offices.map((office) => <a className="footer-office" href={`tel:${office.tel}`} key={office.country}>{office.city} • {office.phone}</a>)}</div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Dotbotics. All rights reserved.</span><a href="#home">Back to top <ArrowUpRight size={14} /></a><span className="footer-signoff">ADOPT&nbsp; • &nbsp;ACCELERATE&nbsp; • &nbsp;THRIVE</span></div></div></footer>
}

function App() {
  return <><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main"><Hero /><Metrics /><About /><Services /><Industries /><Projects /><Innovation /><Process /><WhyDotbotics /><Contact /></main><Footer /></>
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>)


