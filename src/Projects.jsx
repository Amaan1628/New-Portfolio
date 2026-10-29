import React, { useLayoutEffect, useRef, useState } from 'react';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Share the GSAP instance already used by the landmark's DrawSVG animation.
const gsap = window.gsap;
gsap.registerPlugin(ScrollTrigger);

const projects = [
  { style: 'project-data', image: '/projects/chef-codex.png', alt: 'Chef Codex app with an ingredient input and Add ingredient button.', title: 'Chef Codex', description: 'AI-generated recipes from the ingredients you have.', technologies: ['React', 'Hooks', 'JavaScript', 'AI integration', 'Codex'], github: 'https://github.com/Amaan1628/chef-claude-app' },
  { style: 'project-web', image: '/projects/layoff-data-cleaning.png', alt: 'MySQL Workbench showing SQL queries for finding duplicate layoff records and a results table.', title: 'Layoff data cleaning', description: 'Prepared layoffs data for analysis in MySQL by removing duplicates, standardizing values and dates, and handling missing data.', technologies: ['MySQL', 'SQL'], github: 'https://github.com/Amaan1628/layoffs-data-cleaning', imageWidth: 1515, imageHeight: 817 },
  { style: 'project-eda', image: '/projects/layoffs-eda.png', alt: 'MySQL query grouping total layoffs by company, with results ordered from highest to lowest.', title: 'Data manipulation of laid off employees', description: 'Explored layoffs data in MySQL to identify trends over time and the companies with the highest layoffs across different years.', technologies: ['MySQL', 'SQL', 'Exploratory data analysis'], github: 'https://github.com/Amaan1628/Data_Manipulation_Laid_off', imageWidth: 1556, imageHeight: 482 },
  { style: 'project-keeper', image: '/projects/keepers-app.png', alt: 'Keeper notes app with a yellow header, a note editor, and two example notes with delete buttons.', title: 'Keepers App', description: 'A notes app clone built with React, JavaScript, and CSS.', technologies: ['React', 'JavaScript', 'CSS'], github: 'https://github.com/Amaan1628/Keeper-App', imageWidth: 1915, imageHeight: 582 },
];

export default function Projects() {
  const section = useRef(null);
  const [current, setCurrent] = useState(0);

  useLayoutEffect(() => {
    const node = section.current;
    const media = gsap.matchMedia();
    // Short viewports and reduced motion retain the complete, readable list.
    media.add('(prefers-reduced-motion: no-preference) and (min-height: 680px)', () => {
      const panels = [...node.querySelectorAll('.project-placeholder')];
      node.classList.add('projects-pinned');
      gsap.set(panels.slice(1), { autoAlpha: 0, y: 28 });
      const timeline = gsap.timeline({
        scrollTrigger: {
          id: 'portfolio-projects',
          trigger: node,
          start: () => `top ${document.querySelector('.nav').getBoundingClientRect().bottom + 12}px`,
          end: () => `+=${window.innerHeight * projects.length * 0.85}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: self => {
            // Each entry holds for 0.7 timeline units; transitions take 0.3.
            const index = Math.min(projects.length - 1, Math.floor(self.progress * (self.animation?.duration() || 0) + 0.15));
            setCurrent(index);
            panels.forEach((panel, i) => { panel.inert = i !== index; });
          },
        },
      });
      panels.forEach((panel, i) => { panel.inert = i !== 0; });
      timeline.to({}, { duration: 0.7 });
      panels.slice(1).forEach((panel, i) => {
        timeline.to(panels[i], { autoAlpha: 0, y: -28, duration: 0.3 })
          .to(panel, { autoAlpha: 1, y: 0, duration: 0.3 }, '<')
          .to({}, { duration: 0.7 });
      });
      const refresh = () => ScrollTrigger.refresh();
      document.fonts.ready.then(() => { if (node.isConnected) refresh(); });
      // Accordion changes above Projects move its pin position.
      const resize = new ResizeObserver(refresh);
      resize.observe(document.querySelector('.career-list'));
      return () => {
        resize.disconnect();
        node.classList.remove('projects-pinned');
        panels.forEach(panel => { panel.inert = false; });
      };
    });
    return () => media.revert();
  }, []);

  return <section id="projects" className="projects" ref={section}>
    <h2>Projects</h2>
    <p>Selected projects and work highlights.</p>
    <p className="project-scroll-hint">Scroll to explore <span aria-hidden="true">↓</span> <span>{String(current + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span></p>
    <div className="project-stage">
      {projects.map(project => <article key={project.style} className={`project-placeholder ${project.style}`}>
        {project.image ? <div className="project-cover project-screenshot"><img src={project.image} alt={project.alt} width={project.imageWidth || 1111} height={project.imageHeight || 451} /></div> : <div className="project-cover"><p>{project.headline}</p><span>Project placeholder</span></div>}
        <div className="project-caption">
          <h3>{project.title}</h3><p>{project.description}</p>
          {project.technologies && <ul className="project-technologies" aria-label="Technologies used">{project.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>}
          {project.github && <a className="text-link project-source" href={project.github} target="_blank" rel="noreferrer">View on GitHub <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>}
        </div>
      </article>)}
    </div>
  </section>;
}





