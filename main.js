/* ============================================================
   BILLY BOWIN — main.js  v4 (static build)
   ============================================================ */
(function () {
  'use strict';

  const nav         = document.getElementById('nav');
  const heroContent = document.querySelector('.hero-content');
  const heroSection = document.getElementById('hero');
  const navBrand    = document.querySelector('.nav-brand');

  /* ── HERO SCROLL ─────────────────────────────────────────── */
  function onScroll() {
    const scrollY = window.scrollY;
    const heroH   = heroSection ? heroSection.offsetHeight : window.innerHeight;
    const progress = Math.min(scrollY / (heroH * 0.5), 1);

    if (heroContent) {
      heroContent.style.opacity   = String(1 - progress);
      heroContent.style.transform = `translateY(${progress * -40}px)`;
    }

    if (scrollY > 80) {
      nav.classList.add('nav-visible');
      if (navBrand) navBrand.classList.add('brand-visible');
    } else {
      nav.classList.remove('nav-visible');
      if (navBrand) navBrand.classList.remove('brand-visible');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── MOBILE MENU ─────────────────────────────────────────── */
  const hamburger  = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn   = document.getElementById('mobile-close');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
      hamburger.setAttribute('aria-expanded', 'true');
    });
  }

  function closeMobile() {
    if (mobileMenu) mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeMobile);
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobile));
  }

  /* ── SMOOTH SCROLL ───────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navOffset = nav.classList.contains('nav-visible') ? 64 : 0;
      window.scrollTo({ top: target.offsetTop - navOffset, behavior: 'smooth' });
    });
  });

  /* ── SCROLL REVEAL ───────────────────────────────────────── */
  /* Use requestAnimationFrame to ensure the browser has painted
     before the IntersectionObserver checks visibility.
     Without this, elements already in the viewport on static
     pages may never receive the 'in' class.                    */
  requestAnimationFrame(function () {

    var revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            observer.unobserve(e.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

      revealEls.forEach(function (el) { observer.observe(el); });

      /* Fallback: any element already fully in viewport on load */
      requestAnimationFrame(function () {
        revealEls.forEach(function (el) {
          var r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) {
            el.classList.add('in');
          }
        });
      });

    } else {
      /* No IntersectionObserver support — show everything */
      revealEls.forEach(function (el) { el.classList.add('in'); });
    }

  });

})();
