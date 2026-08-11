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

  // ---- Seamless looping horizontal carousels (Selected works + Practices) ----
  function setupLoopCarousel(track, prevBtn, nextBtn) {
    if (!track || track.children.length <= 1) return;
    var originals = Array.prototype.slice.call(track.children);

    // Clone one full set before and after so scrolling wraps seamlessly.
    originals.slice().reverse().forEach(function (c) {
      var cl = c.cloneNode(true); cl.setAttribute('aria-hidden', 'true'); cl.tabIndex = -1;
      track.insertBefore(cl, track.firstChild);
    });
    var appended = originals.map(function (c) {
      var cl = c.cloneNode(true); cl.setAttribute('aria-hidden', 'true'); cl.tabIndex = -1;
      track.appendChild(cl); return cl;
    });

    var setWidth = 1;
    var padL = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    var center = function () {
      setWidth = appended[0].offsetLeft - originals[0].offsetLeft;
      track.scrollLeft = originals[0].offsetLeft - padL; // == setWidth: park on the real set
    };
    var normalize = function () {
      if (setWidth < 2) return;
      if (track.scrollLeft >= setWidth * 2) track.scrollLeft -= setWidth;
      else if (track.scrollLeft < setWidth) track.scrollLeft += setWidth;
    };
    var step = function () {
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      var unit = originals[0] ? originals[0].getBoundingClientRect().width + gap : Math.round(track.clientWidth * 0.4);
      var s = Math.max(280, Math.round(unit * 2)); // advance ~2 cards per press
      return setWidth > 2 ? Math.min(s, Math.round(setWidth * 0.9)) : s;
    };

    if (prevBtn) prevBtn.addEventListener('click', function () { normalize(); track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (nextBtn) nextBtn.addEventListener('click', function () { normalize(); track.scrollBy({ left: step(), behavior: 'smooth' }); });

    // Re-park onto the real set once a scroll settles (seamless because clones are identical).
    var settle;
    track.addEventListener('scroll', function () { clearTimeout(settle); settle = setTimeout(normalize, 130); }, { passive: true });
    window.addEventListener('resize', center);
    center();
    window.addEventListener('load', center);
  }

  setupLoopCarousel(
    document.querySelector('.home-c__scroll-track'),
    document.querySelector('.home-c__scroll-arrow.is-prev'),
    document.querySelector('.home-c__scroll-arrow.is-next')
  );

  // ---- The Journal zine (/blog + /post) ----
  if (document.body.classList.contains('jz')) {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Ball full stop — replay the hop on click.
    var ball = document.querySelector('.jz-ball');
    if (ball) {
      ball.addEventListener('click', function () {
        if (reduce) return;
        ball.style.animation = 'none';
        void ball.offsetWidth;               // force reflow so the animation restarts
        ball.style.animation = 'jz-hop .8s cubic-bezier(.3,.7,.4,1) both';
      });
    }

    // Content scrolls inside .jz-scroll (the sheet frame stays put), so animate
    // that container's scrollTop with an ease-in-out-quad — reliable under reduced-motion.
    var scroller = document.querySelector('.jz-scroll');
    function scrollBoxTo(target, dur) {
      if (!scroller) return;
      target = Math.max(0, Math.min(target, scroller.scrollHeight - scroller.clientHeight));
      if (reduce) { scroller.scrollTop = target; return; }
      var start = scroller.scrollTop, dist = target - start, t0 = 0;
      function step(now) {
        if (!t0) t0 = now;
        var k = Math.min(1, (now - t0) / dur);
        var e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        scroller.scrollTop = start + dist * e;
        if (k < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    // Random sheet — jump to a random plate (excluding the last pick) and flash it.
    var plates = Array.prototype.slice.call(document.querySelectorAll('.jz-feature, .jz-plate'));
    var randomBtn = document.querySelector('.jz-random');
    var lastPlate = null, flashTimer;
    if (randomBtn && plates.length && scroller) {
      randomBtn.addEventListener('click', function () {
        var pool = plates.filter(function (p) { return p !== lastPlate; });
        var pick = pool[Math.floor(Math.random() * pool.length)];
        lastPlate = pick;
        var top = pick.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - 24;
        scrollBoxTo(top, 480);
        plates.forEach(function (p) { p.style.boxShadow = ''; });
        pick.style.transition = 'box-shadow .2s';
        pick.style.boxShadow = '8px 8px 0 #F2B705';
        clearTimeout(flashTimer);
        flashTimer = setTimeout(function () { pick.style.boxShadow = ''; }, 2200);
      });
    }

    // Plotting transition — play the plotter sweep, then follow the link.
    var overlay = document.querySelector('.jz-plot');
    var label = overlay && overlay.querySelector('.jz-plot__label');
    if (overlay) {
      plates.forEach(function (a) {
        a.addEventListener('click', function (e) {
          if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          var href = a.getAttribute('href');
          if (!href) return;
          e.preventDefault();
          if (reduce) { window.location.href = href; return; }
          if (label) label.textContent = 'Plotting sheet ' + (a.getAttribute('data-sheet') || '') + ' …';
          overlay.classList.add('is-on');
          setTimeout(function () { window.location.href = href; }, 900);
        });
      });
    }
  }
})();
