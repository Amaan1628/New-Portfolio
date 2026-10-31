import React, { useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark');

  const toggle = () => {
    const next = dark ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]').content = next === 'dark' ? '#211A16' : '#FAF6ED';
    try { localStorage.setItem('portfolio-theme', next); } catch { /* The toggle still works without storage. */ }
    setDark(!dark);
  };

  return <button className="theme-toggle" type="button" aria-label="Dark mode" aria-pressed={dark}
    title={`Switch to ${dark ? 'light' : 'dark'} mode`} onClick={toggle}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      {dark ? <path d="M20.6 13.1A8.6 8.6 0 0 1 10.9 3.4 8.7 8.7 0 1 0 20.6 13.1Z" /> : <>
        <circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>}
    </svg>
  </button>;
}
