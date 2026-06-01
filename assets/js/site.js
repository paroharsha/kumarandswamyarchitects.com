/* Kumar & Swamy Architects — progressive enhancement.
   The site is fully readable without JS; this adds nav state,
   scroll-reveal, the mobile menu, and the projects filter. */
(function () {
  'use strict';

  // ---- Nav: solid background after scroll + mobile toggle ----
  var nav = document.querySelector('.ks-nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 20); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    var toggle = nav.querySelector('.ks-nav__toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.style.overflow = open ? 'hidden' : '';
      });
      nav.querySelectorAll('.ks-nav__links a').forEach(function (a) {
        a.addEventListener('click', function () {
          nav.classList.remove('is-open'); document.body.style.overflow = '';
        });
      });
    }
  }

  // ---- Scroll reveal ----
  var reveals = document.querySelectorAll('.ks-reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  // ---- Projects filter ----
  var filters = document.querySelectorAll('.projects__filter');
  if (filters.length) {
    var cards = document.querySelectorAll('.projects__card');
    var count = document.querySelector('.projects__count');
    var apply = function (cat) {
      var shown = 0;
      cards.forEach(function (c) {
        var match = cat === 'All' || c.getAttribute('data-category') === cat;
        c.style.display = match ? '' : 'none';
        if (match) shown++;
      });
      if (count) count.textContent = String(shown).padStart(2, '0') + ' / ' + String(cards.length).padStart(2, '0');
    };
    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filters.forEach(function (b) { b.classList.toggle('is-active', b === btn); });
        apply(btn.getAttribute('data-filter'));
      });
    });
  }
})();
