import React, { useEffect, useRef } from 'react';
import artwork from './charminar-inline.svg?raw';

export default function Charminar() {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    const gsap = window.gsap;
    if (!node || !gsap || !window.DrawSVGPlugin) return;
    gsap.registerPlugin(window.DrawSVGPlugin);
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let tween;
    const paths = [...node.querySelectorAll('path')].filter(path => getComputedStyle(path).stroke !== 'none');
    const context = gsap.context(() => {}, node);
    context.add('draw', () => {
      if (media.matches) return;
      tween?.kill();
      tween = gsap.fromTo(paths, { drawSVG: '0%' }, {
        drawSVG: '100%', duration: 1.6, stagger: .09, ease: 'power1.inOut',
        onComplete: () => gsap.set(paths, { clearProps: 'strokeDasharray,strokeDashoffset' }),
      });
    });
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      context.draw();
    }, { threshold: .35 });
    const replay = () => context.draw();
    node.addEventListener('pointerenter', replay);
    const reduce = () => { if (media.matches) { tween?.kill(); gsap.set(paths, { clearProps: 'strokeDasharray,strokeDashoffset' }); } };
    media.addEventListener('change', reduce);
    observer.observe(node);
    return () => { observer.disconnect(); node.removeEventListener('pointerenter', replay); context.revert(); media.removeEventListener('change', reduce); };
  }, []);
  return <div ref={ref} className="identity-art" aria-hidden="true" dangerouslySetInnerHTML={{ __html: artwork }} />;
}
