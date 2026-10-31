import React, { useEffect, useRef } from 'react';

export default function SkillTag({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;
    const media = gsap.matchMedia();
    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const area = ref.current;
      const surface = area.querySelector('.skill-surface');
      const label = area.querySelector('.skill-label');
      const xTo = gsap.quickTo(surface, 'x', { duration: .35, ease: 'power3.out' });
      const yTo = gsap.quickTo(surface, 'y', { duration: .35, ease: 'power3.out' });
      const textX = gsap.quickTo(label, 'x', { duration: .4, ease: 'power3.out' });
      const textY = gsap.quickTo(label, 'y', { duration: .4, ease: 'power3.out' });
      const enter = () => gsap.to(surface, {
        '--skill-tint': '100%', '--skill-shadow': '5px',
        duration: .25, overwrite: 'auto',
      });
      const move = event => {
        // Measure the stationary hit area, never the moving visual surface.
        const bounds = area.getBoundingClientRect();
        const x = gsap.utils.clamp(-1, 1, (event.clientX - bounds.left) / bounds.width * 2 - 1);
        const y = gsap.utils.clamp(-1, 1, (event.clientY - bounds.top) / bounds.height * 2 - 1);
        xTo(x * 6); yTo(y * 4); textX(x * 2); textY(y);
      };
      const leave = () => {
        xTo(0); yTo(0); textX(0); textY(0);
        gsap.to(surface, { '--skill-tint': '0%', '--skill-shadow': '3px', duration: .35, overwrite: 'auto' });
      };
      area.addEventListener('pointerenter', enter);
      area.addEventListener('pointermove', move);
      area.addEventListener('pointerleave', leave);
      area.addEventListener('pointercancel', leave);
      return () => {
        gsap.killTweensOf([surface, label]);
        gsap.set(surface, { clearProps: 'transform,backgroundColor,boxShadow' });
        surface.style.removeProperty('--skill-tint');
        surface.style.removeProperty('--skill-shadow');
        gsap.set(label, { clearProps: 'transform' });
        area.removeEventListener('pointerenter', enter);
        area.removeEventListener('pointermove', move);
        area.removeEventListener('pointerleave', leave);
        area.removeEventListener('pointercancel', leave);
      };
    });
    return () => media.revert();
  }, []);

  return <li ref={ref}><span className="skill-surface"><span className="skill-label">{children}</span></span></li>;
}
