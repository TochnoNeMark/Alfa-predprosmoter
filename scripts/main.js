'use strict';

/* ════════════════════════════════════════════════════════
   main.js — Alfa-Bank landing
   ════════════════════════════════════════════════════════ */

/* ── Header: скрытие при скролле вниз ─────────────────── */
const initHeader = () => {
  const header = document.querySelector('.site-header');
  if (!header) return;
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 10);
    if (y > lastY + 40 && y > 200) header.classList.add('is-hidden');
    if (y < lastY) header.classList.remove('is-hidden');
    lastY = y;
  }, { passive: true });
};

/* ── Бургер: мобильный выдвижной drawer ──────────────── */
const initBurger = () => {
  const btn = document.getElementById('burger-btn');
  const drawer = document.getElementById('mobile-nav');
  if (!btn || !drawer) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = drawer.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(open));
    btn.classList.toggle('is-active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('is-open')
        && !drawer.contains(e.target)
        && !btn.contains(e.target)) {
      drawer.classList.remove('is-open');
      btn.classList.remove('is-active');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Закрытие по клику на ссылку
  drawer.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('is-open');
      btn.classList.remove('is-active');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
};

/* ── Табы: универсальная логика для блоков 2, 5, 6 ──── */
const initTabs = () => {
  document.querySelectorAll('[data-tabs]').forEach(wrap => {
    const buttons = wrap.querySelectorAll('[data-tab-btn]');
    const panels  = wrap.querySelectorAll('[data-tab-panel]');
    if (!buttons.length || !panels.length) return;

    const activate = (idx) => {
      buttons.forEach((b, i) => {
        const active = i === idx;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });
      panels.forEach((p, i) => {
        p.hidden = i !== idx;
        if (i === idx) {
          // Перезапуск fade-up анимаций
          p.querySelectorAll('.anim-fade-up').forEach(el => {
            el.classList.remove('is-visible');
            requestAnimationFrame(() =>
              requestAnimationFrame(() => el.classList.add('is-visible')));
          });
        }
      });
    };

    buttons.forEach((b, i) => b.addEventListener('click', () => activate(i)));

    // Активировать выбранную или первую
    const initialIdx = Array.from(buttons).findIndex(b =>
      b.getAttribute('aria-selected') === 'true');
    activate(initialIdx >= 0 ? initialIdx : 0);
  });
};

/* ── Стрелки скролла для пилюль ──────────────────────── */
const initScrollPills = () => {
  document.querySelectorAll('.tabs-pills-wrap').forEach(wrap => {
    const pills = wrap.querySelector('.tabs-pills');
    if (!pills) return;
    wrap.querySelector('.pills-prev')?.addEventListener('click',
      () => pills.scrollBy({ left: -200, behavior: 'smooth' }));
    wrap.querySelector('.pills-next')?.addEventListener('click',
      () => pills.scrollBy({ left: 200, behavior: 'smooth' }));
  });
};

/* ── Курс валют: микро-флуктуации каждые 4 сек ───────── */
const initCurrencyWidget = () => {
  const buyEls = document.querySelectorAll('.cur-buy');
  const sellEls = document.querySelectorAll('.cur-sell');
  if (!buyEls.length) return;
  const base = new Map();
  [...buyEls, ...sellEls].forEach(el => base.set(el, parseFloat(el.textContent)));

  setInterval(() => {
    base.forEach((b, el) => {
      const delta = (Math.random() - 0.5) * 0.06;
      el.textContent = (b + delta).toFixed(2);
    });
  }, 4000);
};

/* ── Анимации появления при скролле ──────────────────── */
const initScrollAnimations = () => {
  const els = document.querySelectorAll('.anim-fade-up');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const delay = parseInt(e.target.dataset.delay || '0', 10);
      setTimeout(() => e.target.classList.add('is-visible'), delay);
      io.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
  els.forEach(el => io.observe(el));
};

/* ── Анимация баров отзывов ──────────────────────────── */
const initReviewBars = () => {
  const bars = document.querySelectorAll('.reviews-bar-fill[data-width]');
  if (!bars.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.style.width = e.target.dataset.width;
      io.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  bars.forEach(b => io.observe(b));
};

/* === Init === */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initBurger();
  initTabs();
  initScrollPills();
  initCurrencyWidget();
  initScrollAnimations();
  initReviewBars();
});
