/* Kumar & Swamy Architects — progressive enhancement only.
   The site is fully readable without JS; this adds nav + filtering. */
(function () {
  'use strict';

  // ---- Active nav link (by current filename) ----
  var path = location.pathname.replace(/\/$/, '');
  var file = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  document.querySelectorAll('.nav a').forEach(function (a) {
    var href = a.getAttribute('href') || '';
    var target = href.substring(href.lastIndexOf('/') + 1);
    if (target === file || (file === 'index.html' && (href === '/' || target === 'index.html'))) {
      a.classList.add('active');
    }
  });

  // ---- Mobile nav toggle ----
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // ---- Projects category filter ----
  var filters = document.querySelectorAll('.filter');
  if (filters.length) {
    var items = document.querySelectorAll('[data-category]');
    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cat = btn.getAttribute('data-filter');
        filters.forEach(function (b) { b.classList.toggle('active', b === btn); });
        items.forEach(function (item) {
          var match = cat === 'All' || item.getAttribute('data-category') === cat;
          item.classList.toggle('hidden', !match);
        });
      });
    });
  }
})();
