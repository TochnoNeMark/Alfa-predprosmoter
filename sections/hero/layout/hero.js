/* Block 1 — Hero: local interactivity */
'use strict';

// Параллакс цифры 22%
const initHeroParallax = () => {
  const pct = document.querySelector('.hero-percent');
  if (!pct || window.matchMedia('(max-width: 767px)').matches) return;

  document.addEventListener('mousemove', (e) => {
    const xRatio = (e.clientX / window.innerWidth  - 0.5) * 0.03;
    const yRatio = (e.clientY / window.innerHeight - 0.5) * 0.03;
    pct.style.transform = `translateY(-50%) translate(${xRatio * 40}px, ${yRatio * 30}px)`;
  });
};

document.addEventListener('DOMContentLoaded', initHeroParallax);
