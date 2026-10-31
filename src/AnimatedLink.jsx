import React, { useEffect, useRef } from 'react';

export default function AnimatedLink({ children, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;
    const link = ref.current;
    const label = link.querySelector('.animated-link-label');
    const base = link.querySelector('.link-line-base');
    const accent = link.querySelector('.link-line-accent');
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      let timeline;
      let hovered = false;
      const animate = () => {
        const active = hovered || link.matches(':focus-visible');
        timeline?.kill();
        timeline = gsap.timeline();
        if (active) {
          timeline.to(label, { y: -2, duration: .22, ease: 'power2.out' }, 0)
            .to(base, { scaleX: 0, duration: .12, ease: 'power2.in' }, 0)
            .fromTo(accent, { scaleX: 0 }, { scaleX: 1, duration: .24, ease: 'power2.out' }, .12);
        } else {
          timeline.to(label, { y: 0, duration: .25, ease: 'power2.out' }, 0)
            .to(accent, { scaleX: 0, duration: .18, ease: 'power2.in' }, 0)
            .to(base, { scaleX: 1, duration: .24, ease: 'power2.out' }, .08);
        }
      };
      const enter = event => {
        if (event.pointerType === 'touch') return;
        hovered = true;
        animate();
      };
      const leave = () => { hovered = false; animate(); };
      const focus = () => { if (link.matches(':focus-visible')) animate(); };
      link.addEventListener('pointerenter', enter);
      link.addEventListener('pointerleave', leave);
      link.addEventListener('pointercancel', leave);
      link.addEventListener('focus', focus);
      link.addEventListener('blur', animate);
      return () => {
        link.removeEventListener('pointerenter', enter);
        link.removeEventListener('pointerleave', leave);
        link.removeEventListener('pointercancel', leave);
        link.removeEventListener('focus', focus);
        link.removeEventListener('blur', animate);
        timeline?.kill();
        gsap.set([label, base, accent], { clearProps: 'transform,color' });
      };
    });
    return () => media.revert();
  }, []);

  return <a {...props} className="animated-link" ref={ref}>
    <span className="animated-link-label">{children}</span>
    <span className="link-line link-line-base" aria-hidden="true" />
    <span className="link-line link-line-accent" aria-hidden="true" />
  </a>;
}
