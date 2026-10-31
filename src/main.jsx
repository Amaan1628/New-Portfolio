import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './theme.css';
import Charminar from './Charminar';
import Projects from './Projects';
import SkillTag from './SkillTag';
import AnimatedLink from './AnimatedLink';
import ThemeToggle from './ThemeToggle';

const roles = [
  { title: 'Database Operations', date: 'Jan 2025 – Present', type: 'Full time', description: 'Maintaining the data behind an education technology platform.', details: ['Manage MongoDB records through CRUD operations, validation and timely updates.', 'Investigate login, sign-up and course enrolment issues by checking and correcting relevant data.', 'Configure online tests and coding challenges, and coordinate database and application fixes with technical teams.'] },
  { title: 'IT Operations', date: 'Jul 2024 – Dec 2024', type: 'Full time', description: 'Connecting platform operations, students and university teams.', details: ['Coordinate online mock interviews with mentors, students and internal teams.', 'Maintain attendance and assessment-result spreadsheets for multiple colleges.', 'Publish coding challenges and coordinate intern tasks and operational activities.'] },
  { title: 'Front-End Developer', date: 'May 2024 – Jul 2024', type: 'Internship', description: 'Building responsive interfaces for the company website.', details: ['Develop responsive sign-in, login and other website pages.', 'Integrate GitHub authentication and conduct basic frontend testing with Jest.', 'Work with MongoDB CRUD operations to manage website data.'] },
];
const responsibilities = ['Database CRUD operations & validation', 'Data accuracy & discrepancy resolution', 'Application troubleshooting & user support', 'Assessment configuration & live support', 'Issue investigation & technical escalation', 'Stakeholder coordination', 'Operational tracking & documentation'];
const core = ['MongoDB', 'MongoDB Compass', 'Microsoft Excel', 'Microsoft Teams', 'Calendly'];
const exposure = ['SQL', 'Python', 'JavaScript', 'HTML & CSS', 'React'];

function App() {
  const [active, setActive] = useState('about');
  const [openRole, setOpenRole] = useState(0);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const target = document.getElementById(window.location.hash.slice(1));
    if (target) document.fonts.ready.then(() => target.scrollIntoView({ behavior: 'instant', block: 'start' }));
  }, []);
  useEffect(() => {
    const sections = [...document.querySelectorAll('main section[id]')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-12% 0px -62% 0px', threshold: 0 });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.animate([{ opacity: .35, transform: 'translateY(22px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 700, easing: 'cubic-bezier(.16,1,.3,1)' });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  async function copyEmail() {
    try { await navigator.clipboard.writeText('Syedamaanali30@gmail.com'); setCopied(true); setTimeout(() => setCopied(false), 2400); }
    catch { window.location.href = 'mailto:Syedamaanali30@gmail.com'; }
  }
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <header className="nav">
      <a className="wordmark" href="#top" aria-label="Syed Amaan Ali, home">amaan<span>.</span></a>
      <nav aria-label="Main navigation">
        {[['about','About'],['experience','Experience'],['projects','Projects'],['skills','Skills']].map(([id,label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>{label}</a>)}
      </nav>
      <div className="nav-actions"><a className="nav-contact" href="#contact">Get in touch <span aria-hidden="true">↗</span></a><ThemeToggle /></div>
    </header>

    <main id="main">
      <div className="split-stage">
        <aside className="identity" aria-label="Introduction">
          <Charminar />
          <div className="identity-top">
            <p className="location">Hyderabad, India</p>
            <h1>Syed<br/>Amaan Ali</h1>
            <p className="identity-role">Database Operations<br/>& IT Operations</p>
            <a className="button" href={`${import.meta.env.BASE_URL}Syed-Amaan-Ali-Resume.pdf`} download>Download résumé <span aria-hidden="true">↓</span></a>
          </div>
          <div className="identity-bottom">
            <p>Working where data<br/>meets day-to-day operations.</p>
            <div className="socials"><AnimatedLink href="https://www.linkedin.com/in/amaanali16" target="_blank" rel="noreferrer">LinkedIn</AnimatedLink><AnimatedLink href="https://github.com/Amaan1628" target="_blank" rel="noreferrer">GitHub</AnimatedLink></div>
          </div>
        </aside>

        <div className="reading-column">
          <section id="about" className="about">
            <h2 data-reveal>Good operations.<br/>Accurate data.</h2>
            <p className="intro" data-reveal>I’m Amaan, a database and IT operations professional supporting an education technology platform at Cantilever Labs.</p>
            <p data-reveal>Over the past two years, I’ve worked across frontend development, IT operations and database operations. I manage MongoDB records, configure assessments, resolve platform issues and coordinate with technical teams and university stakeholders.</p>
            <p data-reveal>My focus is practical: keep data accurate, investigate what’s going wrong, and help people get back to their work.</p>
            <a className="text-link" href="#experience">Explore my experience <span aria-hidden="true">↘</span></a>
            <div id="career-path" className="career-path" aria-label="Career progression at Cantilever Labs">
              <h3 data-reveal>My path at Cantilever Labs</h3>
              {[2, 1, 0].map((roleIndex) => <a className={`career-step career-step-${roleIndex}`} data-reveal key={roleIndex} href="#experience" onClick={() => setOpenRole(roleIndex)} aria-label={`Explore ${roles[roleIndex].title}, ${roles[roleIndex].date}`}>
                <span className="step-date">{roles[roleIndex].date}</span>
                <span className="step-name">{roleIndex === 2 ? 'Frontend Development' : roles[roleIndex].title}<span className="step-arrow" aria-hidden="true">↗</span></span>
              </a>)}
            </div>
          </section>

          <section id="experience" className="experience">
            <div className="section-heading" data-reveal><h2>Experience</h2><p>Cantilever Labs</p></div>
            <p className="section-intro" data-reveal>One team. Three roles.<br/>A growing view of how a platform works.</p>
            <div className="career-list">
              {roles.map((role,i) => <article key={role.title} className={`career-item ${openRole === i ? 'expanded' : ''}`} data-reveal>
                <button className="role-toggle" onClick={() => setOpenRole(openRole === i ? null : i)} aria-expanded={openRole === i} aria-controls={`role-${i}`}>
                  <span><span className="role-date">{role.date}</span><span className="role-title">{role.title}</span><span className="role-type">{role.type}</span></span>
                  <span className="toggle-symbol" aria-hidden="true">{openRole === i ? '−' : '+'}</span>
                </button>
                <div id={`role-${i}`} hidden={openRole !== i} className="role-details"><p>{role.description}</p><ul>{role.details.map(detail => <li key={detail}>{detail}</li>)}</ul></div>
              </article>)}
            </div>
          </section>

          <Projects />
        </div>
      </div>

      <section id="skills" className="skills full-section">
        <div className="skills-heading"><h2 data-reveal>Tools & responsibilities</h2><p data-reveal>The tools I use, the work I take care of,<br/>and the technologies I’ve explored.</p></div>
        <div className="skills-body">
          <div className="tool-lists">
            <div data-reveal><h3>Core tools</h3><ul className="tools">{core.map(skill => <SkillTag key={skill}>{skill}</SkillTag>)}</ul></div>
            <div data-reveal><h3>Technical exposure</h3><ul className="tools">{exposure.map(skill => <SkillTag key={skill}>{skill}</SkillTag>)}</ul></div>
          </div>
          <div className="responsibilities"><h3 data-reveal>What I work on</h3><ul>{responsibilities.map(item => <li data-reveal key={item}>{item}</li>)}</ul></div>
        </div>
      </section>

      <section id="contact" className="contact full-section">
        <div><h2 data-reveal>Let’s get in touch.</h2><p data-reveal>For conversations about database operations,<br/>IT operations or my work.</p><a className="button contact-button" href="mailto:Syedamaanali30@gmail.com?subject=Let%E2%80%99s%20connect">Email Amaan <span aria-hidden="true">↗</span></a></div>
        <div className="contact-details" data-reveal><a className="email" href="mailto:Syedamaanali30@gmail.com">Syedamaanali30@gmail.com</a><button className="copy-button" onClick={copyEmail}>{copied ? 'Email copied' : 'Copy email'}</button><span className="sr-only" role="status">{copied ? 'Email address copied to clipboard' : ''}</span><div className="socials"><AnimatedLink href="https://www.linkedin.com/in/amaanali16" target="_blank" rel="noreferrer">LinkedIn</AnimatedLink><AnimatedLink href="https://github.com/Amaan1628" target="_blank" rel="noreferrer">GitHub</AnimatedLink><AnimatedLink href={`${import.meta.env.BASE_URL}Syed-Amaan-Ali-Resume.pdf`} download>Résumé</AnimatedLink></div></div>
      </section>
    </main>
    <footer><a className="footer-name" href="#top">Syed Amaan Ali</a><div><p>Database & IT Operations</p><a href="#top">Back to top ↑</a></div></footer>
  </>;
}

createRoot(document.getElementById('root')).render(<App/>);


