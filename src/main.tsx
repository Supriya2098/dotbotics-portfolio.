import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowDownRight, ArrowUpRight, BarChart3, Cpu, Globe2, Grid2X2, Layers3, Menu, MessageCircle, Network, Rocket, Sparkles, X } from 'lucide-react'
import { industries, offices, projects, services, technologies, type Project } from './content'
import './style.css'

const navItems = [
  ['About', '#about'], ['Services', '#services'], ['Industries', '#industries'], ['Projects', '#projects'], ['AI & Innovation', '#innovation'], ['Contact', '#contact'],
]

function Logo({ inverse = false }: { inverse?: boolean }) {
  return <a className={`brand-lockup${inverse ? ' brand-lockup--inverse' : ''}`} href="#home" aria-label="Dotbotics, home">
    <img src="/images/dotbotics-logo-source.png" alt="" />
    <span><b>DOTBOTICS</b><small>ADOPT&nbsp;&nbsp; ACCELERATE&nbsp;&nbsp; THRIVE</small></span>
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
      <p className="hero-lead">Technology partner to enterprises, governments and startups. From idea and MVP to enterprise-grade platforms.</p>
      <div className="hero-actions"><a className="button button--cyan" href="#contact">Discuss your project <ArrowUpRight size={17} /></a><a className="text-button text-button--light" href="#projects">Explore our work <ArrowDown size={16} /></a></div>
      <div className="hero-index"><span>01 / 06</span><span className="hero-index-rule"></span><span>Ideas into impact</span></div>
    </div><div className="hero-visual" aria-label="Dotbotics brand mark">
      <div className="visual-label visual-label--top"><span className="status-dot"></span> Building what moves business forward</div>
      <div className="visual-disc"><div className="disc-ring disc-ring--one"></div><div className="disc-ring disc-ring--two"></div><div className="disc-core disc-core--photo"><img src="/images/ai-interface.jpg" alt="AI interface with a person interacting with a digital system" /></div><span className="disc-caption">human insight<br />meets intelligent systems</span></div>
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
      <div className="about-art"><img className="about-art-image" src="/images/neural-network.jpg" alt="Neural network connections on a digital circuit board" /><div className="about-art-top"><span>THOUGHTFUL BY DESIGN</span><span>EST. SOFTWARE SYSTEMS</span></div><div className="art-caption"><span>THE DOTBOTICS POINT OF VIEW</span><b>Technology with<br />people at its centre.</b></div><span className="art-coordinates">17 degrees 26 minutes N / 78 degrees 27 minutes E</span></div></div>
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

function projectMarkets(project: Project) {
  if (project.markets) return project.markets
  if (/US RV|USA|United States/i.test(`${project.name} ${project.description}`)) return ['United States']
  if (/Meghalaya|NFHS|Indian farmers|India/i.test(`${project.name} ${project.description}`)) return ['India']
  return []
}

function projectIndustry(project: Project) {
  if (project.industries) return project.industries
  const text = `${project.name} ${project.eyebrow} ${project.description}`.toLowerCase()
  const tags = [
    [/agri|crop|khet|krishi|remote sensing/.test(text), 'Agriculture'],
    [/government|public health|hmis|nutrition/.test(text), 'Health'],
    [/insurance/.test(text), 'Insurance'], [/manufactur/.test(text), 'Manufacturing'],
    [/education|edtech|vinlab/.test(text), 'EdTech'],
    [/sport|learning|skill suburb/.test(text), 'Sports & Learning'],
    [/signage|media/.test(text), 'Media & Signage'], [/finance|budget|invoic/.test(text), 'Finance'],
    [/e-commerce|e-commerce|cosmetic|grocery|body cream|retail/.test(text), 'Retail & E-commerce'],
    [/saas|platform|index|portal|erp|software|it services/.test(text), 'IT Services & SaaS / Enterprise Software'],
    [/automotive|vehicle registration|transport|logistics/.test(text), 'Transportation & Logistics'],
    [/telecom|telecommunication/.test(text), 'Telecommunication'],
    [/professional services|consultancy|consulting/.test(text), 'Professional Services'],
  ].filter(([match]) => match).map(([, value]) => value as string)
  return [...new Set(tags)]
}

function projectServices(project: Project) {
  if (project.services) return project.services
  const text = `${project.name} ${project.eyebrow} ${project.description}`.toLowerCase()
  const tags = [
    [/e-commerce|cosmetic|grocery|body cream|retail/.test(text), 'E-commerce Development'],
    [/website|web design|cafe|coffee|property|portal/.test(text), 'Website Design & Development'],
    [/erp|crm|insurance|cms|platform|saas|dashboard|index/.test(text), 'Web Application Development'],
    [/ai|khet|crop|flash|future index/.test(text), 'AI & Machine Learning Solutions'],
    [/data|analytics|dashboard|sensing|nutrition|hmis|budget/.test(text), 'Data Analytics & Business Intelligence'],
    [/automation|pipeline|erp/.test(text), 'Business Process Automation'],
  ].filter(([match]) => match).map(([, value]) => value as string)
  return [...new Set(tags)]
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [flipped, setFlipped] = useState(false)
  const industriesForProject = projectIndustry(project)
  const marketsForProject = projectMarkets(project)
  const servicesForProject = projectServices(project)
  return <article className={`project-card${flipped ? ' is-flipped' : ''}`}>
    <button className="project-card-toggle" type="button" aria-expanded={flipped} onClick={() => setFlipped(!flipped)} aria-label={`${flipped ? 'Show image for' : 'Show details for'} ${project.name}`}>
      <span className={`project-image${project.image ? '' : ' project-image--interface'}`}>
        {project.image ? <img src={project.image} alt={project.alt ?? `${project.name} project preview`} loading="lazy" /> : <span className="interface-preview" aria-label={`${project.name} website preview`}>
          <span className="interface-browser"><i></i><i></i><i></i><b>{new URL(project.url ?? 'https://dotbotics.com').hostname.replace(/^www\./, '')}</b><span>Search</span></span>
          <span className="interface-content"><span className="interface-nav"><b>{project.name}</b><i></i><i></i><i></i><em></em></span><span className="interface-hero"><small>{project.eyebrow}</small><b>{project.name}</b><span>{project.description}</span><i></i><i></i></span><span className="interface-cards"><i><b></b><em></em><small></small></i><i><b></b><em></em><small></small></i><i><b></b><em></em><small></small></i></span></span>
          <span className="interface-caption">WEBSITE UI CONCEPT</span>
        </span>}
        <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
        {project.ongoing && <span className="status-badge"><span></span> In progress</span>}
        <span className="project-flip-hint">{flipped ? 'BACK TO IMAGE' : 'VIEW DETAILS'} <ArrowUpRight size={13} /></span>
      </span>
      <span className="project-back" aria-hidden={!flipped}>
        <span className="project-eyebrow">{project.eyebrow}</span><b className="project-back-title">{project.name}</b>
        <span className="project-back-description">{project.description}</span>
        {industriesForProject.length > 0 && <span className="project-back-meta"><i>INDUSTRY</i>{industriesForProject.join(', ')}</span>}
        {marketsForProject.length > 0 && <span className="project-back-meta"><i>MARKET</i>{marketsForProject.join(', ')}</span>}
        {servicesForProject.length > 0 && <span className="project-back-tags">{servicesForProject.slice(0, 3).map((tag) => <i key={tag}>{tag}</i>)}</span>}
      </span>
    </button>
    {(project.url || project.links?.length) && <div className="project-card-links">{project.url && <a className="project-card-link" href={project.url} target="_blank" rel="noopener noreferrer">Open website <ArrowUpRight size={14} /></a>}{project.links?.map((link) => <a className="project-card-link" href={link.url} target="_blank" rel="noopener noreferrer" key={link.url}>{link.label} <ArrowUpRight size={14} /></a>)}</div>}
  </article>
}

function Projects() {
  const [market, setMarket] = useState('')
  const [industry, setIndustry] = useState('')
  const [service, setService] = useState('')
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => projects.filter((project) => {
    const search = `${project.name} ${project.eyebrow} ${project.description} ${project.features.join(' ')} ${project.category}`.toLowerCase()
    return (!market || projectMarkets(project).includes(market)) && (!industry || projectIndustry(project).includes(industry)) && (!service || projectServices(project).includes(service)) && search.includes(query.toLowerCase())
  }), [market, industry, service, query])
  const shown = filtered
  const reset = () => { setMarket(''); setIndustry(''); setService(''); setQuery('') }
  const marketOptions = ['India', 'UAE', 'United States']
  const industryOptions = ['Manufacturing', 'Insurance', 'EdTech', 'Health', 'Retail & E-commerce', 'Sports & Learning', 'Media & Signage', 'Finance', 'Agriculture', 'Telecommunication', 'Transportation & Logistics', 'Professional Services', 'IT Services & SaaS / Enterprise Software']
  const serviceOptions = ['Website Design & Development', 'E-commerce Development', 'Multi-Vendor Marketplace Development', 'Web Application Development', 'ERP & Enterprise Solutions', 'Business Process Automation', 'AI & Machine Learning Solutions', 'Data Analytics & Business Intelligence']
  return <section className="section portfolio-section" id="projects"><div className="content-width"><SectionHeading number="04" eyebrow="Portfolio" title={<>Good ideas,<br /><em>put to work.</em></>} copy="Browse brochure projects and the website links supplied for this portfolio. Search and combine filters to find relevant work." />
    <div className="portfolio-toolbar"><div className="portfolio-count"><span className="count-dot"></span> {String(filtered.length).padStart(2, '0')} PROJECTS</div><label className="search-box"><span className="visually-hidden">Search projects</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects" /><span>Search</span></label></div>
    <div className="catalogue-filters"><label>Market<select value={market} onChange={(event) => setMarket(event.target.value)}><option value="">All markets</option>{marketOptions.map((option) => <option key={option}>{option}</option>)}</select></label><label>Industry<select value={industry} onChange={(event) => setIndustry(event.target.value)}><option value="">All industries</option>{industryOptions.map((option) => <option key={option}>{option}</option>)}</select></label><label>Service<select value={service} onChange={(event) => setService(event.target.value)}><option value="">All services</option>{serviceOptions.map((option) => <option key={option}>{option}</option>)}</select></label><button type="button" className="filter-reset" onClick={reset}>Reset filters</button></div>
    <div className="project-grid">{shown.map((project, index) => <ProjectCard key={project.name} project={project} index={index} />)}</div>
    {shown.length === 0 && <p className="empty-state">No projects match those filters. Try changing a filter or reset to see all work.</p>}
  </div></section>
}

function Innovation() {
  return <section className="innovation-section" id="innovation"><div className="innovation-lines" aria-hidden="true"></div><div className="content-width"><SectionHeading number="05" eyebrow="AI & innovation" title={<>Make complexity<br /><em>work for you.</em></>} copy="From multilingual guidance to satellite intelligence, we apply emerging technology where it can solve a real problem." dark />
    <div className="innovation-layout"><div className="innovation-feature"><div className="innovation-visual"><div className="ai-orbit ai-orbit--one"></div><div className="ai-orbit ai-orbit--two"></div><div className="ai-nodes"><span className="ai-node ai-node--main"><Cpu size={29} /></span><span className="ai-node ai-node--small node-a"><Network size={15} /></span><span className="ai-node ai-node--small node-b"><Sparkles size={15} /></span><span className="ai-node ai-node--small node-c"><BarChart3 size={15} /></span></div><span className="ai-coordinate">INTELLIGENCE / APPLIED</span></div><div className="innovation-feature-copy"><span className="eyebrow eyebrow--light">A practical point of view</span><p>Good AI starts with the right question, the right information and a clear outcome for the people using it.</p></div></div>
      <div className="technology-list"><div className="technology-head"><span>CAPABILITY INDEX</span><span>01 - 14</span></div><p>Tools selected for the problem at hand, with the care to make them useful.</p><div className="technology-tags">{technologies.map((technology, i) => <span className={i < 5 ? 'technology-tag technology-tag--active' : 'technology-tag'} key={technology}><i>{String(i + 1).padStart(2, '0')}</i>{technology}</span>)}</div><div className="technology-note"><span className="note-mark">?</span><span>Capabilities reflect brochure-listed technologies. Use varies by project.</span></div></div></div>
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
  const [review, setReview] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    setError('')
    if (selectedServices.length === 0) { setError('Choose at least one service, or select Other / unsure.'); return }
    if (!review) { setError(''); setReview(true); return }
    const fields = new FormData(form)
    const servicesSelected = fields.getAll('services').join(', ') || 'Not specified'
    const body = [
      'Project inquiry from Dotbotics website', '',
      `Name: ${fields.get('name')}`, `Company: ${fields.get('company')}`, `Business email: ${fields.get('email')}`,
      `Phone: ${fields.get('phone') || 'Not provided'}`, `Target market: ${fields.get('market') || 'Not specified'}`,
      `Industry: ${fields.get('industry') || 'Not specified'}`, `Company website: ${fields.get('website') || 'Not provided'}`,
      `Preferred contact: ${fields.get('contactMethod') || 'Email'}`, `Services: ${servicesSelected}`,
      `Project type: ${fields.get('projectType') || 'Not specified'}`, `Project title: ${fields.get('title') || 'Not provided'}`,
      `Launch timeline: ${fields.get('timeline') || 'Not specified'}`, `Budget: ${fields.get('budget') || 'Prefer to discuss'}`,
      '', 'Project requirements:', `${fields.get('details')}`, '',
      `Features or modules: ${fields.get('features') || 'Not provided'}`,
      `Audience: ${fields.get('audience') || 'Not provided'}`, `Existing product URL: ${fields.get('existingUrl') || 'Not provided'}`,
      `Additional notes: ${fields.get('notes') || 'None'}`,
      fields.get('serviceFollowup') ? `Service details: ${fields.get('serviceFollowup')}` : '',
    ].filter(Boolean).join('\n')
    const subject = `Project inquiry - ${fields.get('title') || fields.get('company')}`
    setError('')
    window.location.href = `mailto:info@dotbotics.io?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }
  const serviceOptions = ['Website Design & Development', 'E-commerce Development', 'ERP Solutions', 'Custom AI & Automations', 'Data-Driven Solutions', 'MVP Development', 'Web Applications', 'Mobile Apps', 'Other / unsure']
  const followupNeeded = selectedServices.some((value) => /Website|E-commerce|ERP|AI|Data-Driven/.test(value))
  return <section className="contact-section" id="contact"><div className="content-width"><SectionHeading number="07" eyebrow="Get in touch" title={<>Let's build something<br /><em>intelligent together.</em></>} copy="Share your requirements and request an initial conversation about scope and cost." />
    <div className="contact-layout"><div className="contact-details"><div className="contact-direct"><span className="eyebrow">A direct line</span><a href="mailto:info@dotbotics.io">info@dotbotics.io <ArrowUpRight size={17} /></a><a href="https://www.dotbotics.io" target="_blank" rel="noreferrer">www.dotbotics.io <ArrowUpRight size={17} /></a></div><div className="office-grid">{offices.map((office) => <article className="office-card" key={office.country}><div className="office-label"><span className="office-pin"></span>{office.country}</div><h3>{office.city}</h3><a className="office-phone" href={`tel:${office.tel}`}>{office.phone}</a><p>{office.address}</p></article>)}</div><p className="contact-footnote"><MessageCircle size={15} /> A Dotbotics representative will review the scope before preparing any formal quotation.</p></div>
      <form className="contact-form" onSubmit={submit} noValidate><div className="form-heading"><span className="eyebrow">Project inquiry | {review ? 'Review' : 'Requirements'}</span><h3>{review ? 'Review your request.' : 'Tell us what you need.'}</h3><p>{review ? 'Check the details below, then prepare an email draft to review and send.' : 'Share the essentials first. No estimate is generated until Dotbotics reviews your requirements.'}</p></div>
        <div className="form-grid">
          <label>Full name <span>*</span><input name="name" autoComplete="name" required maxLength={120} placeholder="Your name" /></label>
          <label>Company or organisation <span>*</span><input name="company" autoComplete="organization" required maxLength={160} placeholder="Your organisation" /></label>
          <label>Business email <span>*</span><input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" /></label>
          <label>Phone <small>(optional)</small><input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="+1 555 000 0000" /></label>
          <label>Country or target market<select name="market" defaultValue=""><option value="">Select if known</option><option>India</option><option>UAE</option><option>United States</option><option>Other / multiple</option></select></label>
          <label>Industry<select name="industry" defaultValue=""><option value="">Select if known</option><option>Manufacturing</option><option>Insurance</option><option>EdTech</option><option>Health</option><option>Retail & E-commerce</option><option>Sports & Learning</option><option>Finance</option><option>Agriculture</option><option>Public & Social Sector</option><option>Other</option></select></label>
          <label>Company website <small>(optional)</small><input name="website" type="url" placeholder="https://" /></label>
          <label>Preferred contact<select name="contactMethod" defaultValue="Email"><option>Email</option><option>Phone</option><option>WhatsApp</option></select></label>
          <fieldset className="form-full service-choice"><legend>Services required <span>*</span></legend>{serviceOptions.map((option) => <label key={option}><input type="checkbox" name="services" value={option} checked={selectedServices.includes(option)} onChange={(event) => setSelectedServices((current) => event.target.checked ? [...current, option] : current.filter((item) => item !== option))} />{option}</label>)}</fieldset>
          <label>Project type<select name="projectType" defaultValue=""><option value="">Select if known</option><option>New development</option><option>Redesign</option><option>Integration</option><option>Automation</option><option>Maintenance</option><option>Other</option></select></label>
          <label>Short project title<input name="title" maxLength={160} placeholder="A few words about the project" /></label>
          <label className="form-full">Project requirements <span>*</span><textarea name="details" required minLength={15} maxLength={3000} rows={4} placeholder="What are you hoping to build or improve?" /></label>
          <label className="form-full">Expected features or modules<textarea name="features" maxLength={2000} rows={2} placeholder="Key functions, integrations, or workflows" /></label>
          <label>Target audience or users<input name="audience" maxLength={250} placeholder="Who will use this?" /></label>
          <label>Existing website or app<input name="existingUrl" type="url" placeholder="https://" /></label>
          <label>Desired launch timeline<select name="timeline" defaultValue=""><option value="">Select if known</option><option>As soon as practical</option><option>Within 1 to 3 months</option><option>Within 3 to 6 months</option><option>More than 6 months</option><option>Flexible</option></select></label>
          <label>Budget range<select name="budget" defaultValue=""><option value="">Prefer to discuss</option><option>Under INR 5 lakh</option><option>INR 5 to 25 lakh</option><option>INR 25 to 50 lakh</option><option>Over INR 50 lakh</option><option>Not sure yet</option></select></label>
          {followupNeeded && <label className="form-full">Service-specific details<textarea name="serviceFollowup" maxLength={1500} rows={3} placeholder="For example: page or product count, required modules, data sources, integrations, or expected outcomes" /></label>}
          <label className="form-full">Additional notes<textarea name="notes" maxLength={1500} rows={2} placeholder="Anything else we should know?" /></label>
          <label className="form-full consent-field"><input type="checkbox" name="consent" required />I agree that Dotbotics may use these details to respond to this enquiry. <span>*</span></label>
        </div>
        {review && <div className="request-review"><b>Request summary</b><p>{selectedServices.join(', ')}</p><p>Indicative estimate: custom review required. Final pricing is prepared by Dotbotics after scope review.</p><button type="button" className="review-edit" onClick={() => setReview(false)}>Edit request</button></div>}
        <div className="form-submit-row"><p>Your details are not stored by this website. {review ? 'The next step opens an email draft; you must review and send it.' : 'Review your requirements before preparing an email.'}</p><button className="button button--navy" type="submit">{review ? 'Prepare email' : 'Review request'} <ArrowUpRight size={16} /></button></div>{error && <p className="form-status form-status--error" role="alert">{error}</p>}</form></div>
  </div></section>
}
function Footer() {
  return <footer className="site-footer"><div className="content-width"><div className="footer-main"><div className="footer-brand"><Logo inverse /><p>Technology partner to enterprises, governments and startups. From idea and MVP to enterprise-grade platforms.</p><span className="footer-motto">Building Intelligence with Empathy</span></div><div className="footer-column"><span>EXPLORE</span><a href="#about">About</a><a href="#services">Services</a><a href="#industries">Industries</a><a href="#projects">Projects</a><a href="#innovation">AI & Innovation</a></div><div className="footer-column"><span>CAPABILITIES</span>{services.map((service) => <a href="#contact" key={service.number}>{service.title}</a>)}</div><div className="footer-column footer-contact"><span>GET IN TOUCH</span><a href="mailto:info@dotbotics.io">info@dotbotics.io</a><a href="https://www.dotbotics.io" target="_blank" rel="noreferrer">www.dotbotics.io</a>{offices.map((office) => <a className="footer-office" href={`tel:${office.tel}`} key={office.country}>{office.city}, {office.phone}</a>)}</div></div><div className="footer-bottom"><span>Copyright {new Date().getFullYear()} Dotbotics. All rights reserved.</span><a href="#home">Back to top <ArrowUpRight size={14} /></a><span className="footer-signoff">ADOPT&nbsp;&nbsp; ACCELERATE&nbsp;&nbsp; THRIVE</span></div></div></footer>
}

function App() {
  return <><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main"><Hero /><Metrics /><About /><Services /><Industries /><Projects /><Innovation /><Process /><WhyDotbotics /><Contact /></main><Footer /></>
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>)


