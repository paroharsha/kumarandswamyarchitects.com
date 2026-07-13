// Static site generator for Kumar & Swamy Architects.
// Emits plain HTML to the repo root so GitHub Pages can serve it with no build.
//   node tools/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, nav, categories, projects, projectIndex, specialties, services, founder, team, approach, studio, roles, posts } from './data.mjs';
import { sketch } from './sketches.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const w = (rel, html) => { const p = path.join(ROOT, rel); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, html); };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const exists = (rel) => fs.existsSync(path.join(ROOT, rel));
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Render a real photo when present, else fall back to the on-brand SVG sketch.
function media(src, { ratio = '4/3', alt = '', label = '', depth = 0, eager = false, fallback = 'linear' } = {}) {
  const lab = label
    ? `<div style="position:absolute;top:14px;left:16px;font-family:var(--font-mono);font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#F4EFE6;text-shadow:0 1px 6px rgba(0,0,0,0.6);z-index:2">${esc(label)}</div>`
    : '';
  if (src && exists(src)) {
    return `<div class="ks-sketch" style="aspect-ratio:${ratio};position:relative;background:#EFE8DB;overflow:hidden">`
      + `<img src="${rel(depth, src)}" alt="${esc(alt)}"${eager ? '' : ' loading="lazy"'} decoding="async" style="width:100%;height:100%;object-fit:cover;display:block">`
      + lab + `</div>`;
  }
  return sketch(fallback, { ratio, label });
}
const projPhoto = `assets/img/projects/`;
const proj = (p, o = {}) => media(`${projPhoto}${p.slug}.jpg`, { alt: `${p.name} — ${p.category.toLowerCase()} architecture in ${p.location} by Kumar & Swamy Architects`, fallback: p.sketch, ...o });

// Gallery photos for a project: any images dropped in assets/img/projects/<slug>/
// are auto-detected at build time, sorted naturally (1.jpg, 2.jpg, 10.jpg…).
function galleryImages(slug) {
  const dir = path.join(ROOT, projPhoto, slug);
  try {
    return fs.readdirSync(dir)
      .filter(f => /\.(jpe?g|png|webp|avif)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
      .map(f => `${projPhoto}${slug}/${f}`);
  } catch { return []; }
}

// ---------- tiny markdown -> html (for blog bodies) ----------
function md(src) {
  src = src.replace(/^---[\s\S]*?---\s*/, '');           // strip frontmatter
  const lines = src.split('\n');
  let out = '', listType = null, para = [];
  const inline = (t) => esc(t)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*(?!\s)([^*]+?)\*/g, '$1<em>$2</em>');
  const flushP = () => { if (para.length) { out += `<p>${inline(para.join(' '))}</p>\n`; para = []; } };
  const flushL = () => { if (listType) { out += `</${listType}>\n`; listType = null; } };
  const openL = (type) => { if (listType !== type) { flushL(); out += `<${type}>\n`; listType = type; } };
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { flushP(); flushL(); continue; }
    const ordered = line.match(/^\d+\.\s+(.*)$/);
    if (line.startsWith('### ')) { flushP(); flushL(); out += `<h3>${inline(line.slice(4))}</h3>\n`; }
    else if (line.startsWith('## ')) { flushP(); flushL(); out += `<h2>${inline(line.slice(3))}</h2>\n`; }
    else if (line.startsWith('> ')) { flushP(); flushL(); out += `<blockquote>${inline(line.slice(2))}</blockquote>\n`; }
    else if (line.startsWith('- ')) { flushP(); openL('ul'); out += `<li>${inline(line.slice(2))}</li>\n`; }
    else if (ordered) { flushP(); openL('ol'); out += `<li>${inline(ordered[1])}</li>\n`; }
    else { para.push(line); }
  }
  flushP(); flushL();
  return out;
}

// ---------- shared chrome ----------
const rel = (depth, href) => (depth ? '../'.repeat(depth) : '') + href;
// Clean (extensionless) link to the home page — './' at root, '../…' when nested.
const homeHref = (depth) => rel(depth, '') || './';

function navHtml(current, depth) {
  const links = nav.map(it =>
    `<a href="${rel(depth, it.href)}"${it.id === current ? ' class="is-current" aria-current="page"' : ''}><span class="ks-nav__dot"></span>${it.label}</a>`
  ).join('');
  return `<header class="ks-nav">
  <a href="${homeHref(depth)}" class="ks-nav__mark" aria-label="Kumar &amp; Swamy Architects — home">
    <img class="ks-nav__logo" src="${rel(depth, 'assets/img/logo-mark.png')}" alt="Kumar &amp; Swamy Architects" width="256" height="256">
    <span class="ks-nav__full">Kumar &amp; Swamy</span>
  </a>
  <nav class="ks-nav__links" aria-label="Primary">${links}</nav>
  <button class="ks-nav__toggle" type="button" aria-label="Menu" aria-expanded="false"><span></span></button>
</header>`;
}

function footerHtml(depth) {
  return `<footer class="ks-footer">
  <div class="ks-footer__top">
    <div class="ks-footer__mark">
      <div class="ks-footer__logo">K&amp;S</div>
      <div class="ks-footer__tag">Architecture &amp; Masterplanning — Est. 1969, Bangalore</div>
    </div>
    <div class="ks-footer__cols">
      <div><div class="ks-footer__label">Studio</div><div class="ks-footer__addr">${site.name}<br/>${esc(site.address)}</div></div>
      <div><div class="ks-footer__label">Write</div><a href="mailto:${site.email}">${site.email}</a></div>
      <div><div class="ks-footer__label">Call</div>${site.phones.slice(0,3).map(p => `<a href="${p.href}">${p.label}</a>`).join('<br/>')}</div>
      <div><div class="ks-footer__label">Elsewhere</div>
        <a href="${site.social.instagram}" target="_blank" rel="noopener">Instagram ↗</a><br/>
        <a href="${site.social.facebook}" target="_blank" rel="noopener">Facebook ↗</a><br/>
        <a href="${rel(depth, 'blog')}">Journal ↗</a>
      </div>
    </div>
  </div>
  <div class="ks-footer__bar"><div class="ks-footer__wordmark-track">
    <span class="ks-footer__wordmark">KUMAR &amp; SWAMY</span>
    <span class="ks-footer__wordmark" aria-hidden="true">KUMAR &amp; SWAMY</span>
    <span class="ks-footer__wordmark" aria-hidden="true">KUMAR &amp; SWAMY</span>
    <span class="ks-footer__wordmark" aria-hidden="true">KUMAR &amp; SWAMY</span>
  </div></div>
  <div class="ks-footer__bot">
    <span>© 1969–2026 ${site.name}</span>
    <span>Three generations · Fifty-seven years · Sixty-plus institutions</span>
    <span>Bangalore, India</span>
  </div>
</footer>`;
}

// Site identity node — a ProfessionalService (architecture firm) with strong
// local-SEO signals: geo, areaServed, knowsAbout, NAP. Reused on every page.
const PRO_ID = site.domain + '/#practice';
const proServiceLd = {
  '@type': ['ProfessionalService', 'Organization'], '@id': PRO_ID,
  name: site.name, alternateName: site.shortName, url: site.domain + '/',
  description: site.description, foundingDate: '1969', slogan: 'Listen first, draw second.',
  email: site.email, telephone: '+91-63624-28416',
  image: site.domain + '/assets/img/projects/amaatra-academy.jpg',
  founder: { '@type': 'Person', name: 'C R Shivakumar' },
  address: { '@type': 'PostalAddress', streetAddress: 'MF 2/8 BDA Building, Cambridge Layout', addressLocality: 'Bengaluru', addressRegion: 'Karnataka', postalCode: '560008', addressCountry: 'IN' },
  geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
  hasMap: site.google,
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:00', closes: '19:00' }],
  areaServed: [{ '@type': 'City', name: 'Bengaluru' }, { '@type': 'AdministrativeArea', name: 'Karnataka' }, { '@type': 'Country', name: 'India' }],
  knowsAbout: site.knowsAbout,
  sameAs: site.sameAs,
  makesOffer: services.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, description: s.blurb } }))
};
const websiteLd = { '@type': 'WebSite', '@id': site.domain + '/#website', url: site.domain + '/', name: site.name, publisher: { '@id': PRO_ID }, inLanguage: 'en' };

function layout({ title, description, pathRel, depth = 0, bodyClass = '', main, extraLd = null, ogType = 'website', image = 'assets/img/projects/amaatra-academy.jpg', breadcrumbs = null }) {
  const canonical = site.domain + '/' + pathRel;
  const imgAbs = /^https?:/.test(image) ? image : site.domain + '/' + image;
  const graph = [proServiceLd, websiteLd];
  if (breadcrumbs) graph.push({ '@type': 'BreadcrumbList', itemListElement: breadcrumbs.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: site.domain + '/' + b.path })) });
  if (extraLd) { const e = { ...extraLd }; delete e._cur; graph.push(e); }
  const ld = { '@context': 'https://schema.org', '@graph': graph };
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="geo.region" content="${site.region}">
<meta name="geo.placename" content="${esc(site.placename)}">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${imgAbs}">
<meta property="og:locale" content="en_IN">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${imgAbs}">
<meta name="theme-color" content="#F4EFE6">
<link rel="icon" type="image/png" sizes="32x32" href="${rel(depth, 'assets/img/favicon-32x32.png')}">
<link rel="icon" type="image/png" sizes="16x16" href="${rel(depth, 'assets/img/favicon-16x16.png')}">
<link rel="apple-touch-icon" sizes="180x180" href="${rel(depth, 'assets/img/apple-touch-icon.png')}">
<link rel="manifest" href="${rel(depth, 'site.webmanifest')}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,300;0,400;0,500;0,600;0,800;1,400&family=Geist:wght@300;400;500;600&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${rel(depth, 'assets/css/site.css')}">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body class="${bodyClass}">
<a class="ks-skip" href="#main">Skip to content</a>
${navHtml(bodyClass.includes('home') ? 'home' : (extraLd && extraLd._cur) || pageCurrent(pathRel), depth)}
<main id="main">
${main}
</main>
${footerHtml(depth)}
<script src="${rel(depth, 'assets/js/site.js')}"></script>
</body>
</html>`;
}
function pageCurrent(p) {
  if (p.startsWith('index-of-works')) return 'index';
  if (p.startsWith('projects')) return 'projects';
  if (p.startsWith('about')) return 'about';
  if (p.startsWith('blog') || p.startsWith('post')) return 'blog';
  if (p.startsWith('contact')) return 'contact';
  if (p.startsWith('applytowork')) return 'apply';
  return 'home';
}

// ---------- HOME ----------
function buildHome() {
  const feat = projects.find(p => p.slug === 'mallya-aditi-international-school');
  const featNo = String(projects.indexOf(feat) + 1).padStart(3, '0');
  const works = projects.slice(0, 10).map(p => `
    <a href="projects/${p.slug}" class="home-c__scroll-card">
      ${proj(p, { ratio: '4/3' })}
      <div class="meta"><span>${esc(p.location)}</span><span>${p.year}</span></div>
      <div class="name">${esc(p.name)}</div>
    </a>`).join('');
  const svc = services.map(s => `
    <div class="home-c__svc-item"><div><span class="n">${s.n} / 06</span><div class="name">${esc(s.name)}</div></div><div class="blurb">${esc(s.blurb)}</div></div>`).join('');
  const journal = posts.map(p => `
    <a class="journal-card" href="post/${p.slug}">
      ${media(`assets/img/blog/${p.slug}.jpg`, { ratio: '3/2', alt: p.title, fallback: p.sketch })}
      <div class="kicker"><span>${esc(p.author)}</span><span>${esc(p.date)}</span></div>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.excerpt)}</p>
    </a>`).join('');

  const main = `<div class="ks-page home-c home-c--c1" id="home-c1">
  <section class="home-c__hero">
    <div class="home-c__hero-l">
      <div>
        <h1 class="home-c__hero-title" style="font-size:clamp(38px,5.2vw,92px)">Kumar<br/><span class="ampersand">&amp;</span> Swamy<br/><em>architects.</em></h1>
        <p style="font-family:'Inter Tight',sans-serif;font-weight:300;font-size:clamp(17px,1.5vw,21px);line-height:1.32;color:var(--ink-2);max-width:540px;margin:clamp(12px,2vh,22px) 0 0;letter-spacing:-0.01em">${esc(site.tagline)}</p>
        <div class="home-c__hero-specialties">
          <div class="home-c__hero-specialties-track">
            <div class="ticker-set">${specialties.map(s => `<span>${esc(s)}</span>`).join('')}</div>
            <div class="ticker-set" aria-hidden="true">${specialties.map(s => `<span>${esc(s)}</span>`).join('')}</div>
          </div>
        </div>
      </div>
      <div class="home-c__hero-meta">
        <div class="item"><div class="lbl">Founded</div><div class="val">Bangalore, 1969</div></div>
        <div class="item"><div class="lbl">Practice</div><div class="val">Institutional</div></div>
        <div class="item"><div class="lbl">Built work</div><div class="val">60+ projects</div></div>
      </div>
    </div>
    <div class="home-c__hero-r">
      <a href="projects/${feat.slug}" class="home-c__hero-feat" style="text-decoration:none;color:inherit">
        <div class="home-c__hero-feat-parallax" style="position:absolute;inset:0;z-index:0">${proj(feat, { ratio: 'auto', eager: true })}</div>
        <div class="home-c__hero-feat-top"><span>Currently featured</span><span>Ref. ${featNo}</span></div>
        <div class="home-c__hero-feat-bot"><div class="name">${esc(feat.name)}</div><div class="meta"><span>${esc(feat.location)}</span><span>${feat.year}</span></div></div>
      </a>
    </div>
  </section>

  <section class="home-c__scroll" id="works">
    <div class="home-c__scroll-head">
      <h2 class="ks-reveal">Selected works.</h2>
      <a href="projects" style="font-family:var(--font-mono);font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(244,239,230,0.7);border-bottom:1px solid currentColor;padding-bottom:3px">Featured projects →</a>
    </div>
    <div class="home-c__scroll-wrap">
      <button class="home-c__scroll-arrow is-prev" type="button" aria-label="Scroll to previous works">&#8592;</button>
      <div class="home-c__scroll-track">${works}</div>
      <button class="home-c__scroll-arrow is-next" type="button" aria-label="Scroll to next works">&#8594;</button>
    </div>
  </section>

  <section class="home-c__services" id="services">
    <div class="home-c__services-head"><h2 class="ks-reveal">Six briefs,<br/><em>one practice.</em></h2><p class="ks-reveal">Interpret the philosophy of the institution. Build for the climate. Last beyond the client.</p></div>
    <div class="home-c__svc-grid">${svc}</div>
  </section>

  <section class="home-c__journal" id="journal">
    <div class="home-c__journal-head"><h2 class="ks-reveal">From the journal.</h2><a href="blog" style="font-family:var(--font-mono);font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:var(--ink-3);border-bottom:1px solid currentColor;padding-bottom:3px">All writing →</a></div>
    <div class="home-c__journal-grid">${journal}</div>
  </section>

  <section style="padding:84px 32px;background:var(--mustard);display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center" id="about">
    <div class="ks-reveal"><span class="ks-label" style="color:var(--ink-2);display:block;margin-bottom:30px">About</span><h2 style="font-size:clamp(56px,8vw,128px);line-height:0.88;letter-spacing:-0.04em;margin:0;font-weight:800;font-family:'Inter Tight',sans-serif">A practice<br/>in its <em>fifth</em><br/>decade.</h2></div>
    <div class="ks-reveal">
      <p style="font-family:'Inter Tight',sans-serif;font-weight:300;font-size:24px;line-height:1.35;color:var(--ink-2);margin:0 0 1em;max-width:520px;letter-spacing:-0.01em">Founded by C R Shivakumar in Bangalore, the studio has grown across three generations — carrying one ethic: listen first, draw second.</p>
      <p style="font-family:var(--font-sans);font-size:16px;line-height:1.65;color:var(--ink-2);margin:0 0 40px;max-width:520px">Today a small team of architects and interns work out of a studio that does not limit itself to the office. We travel, read, listen to music, watch film — because you cannot design for people without first knowing them.</p>
      <a href="about" class="ks-btn-primary">Meet the studio <span>→</span></a>
    </div>
  </section>
</div>`;
  w('index.html', layout({ title: `School & Institutional Architecture in Bangalore | ${site.name}`, description: site.description, pathRel: '', bodyClass: 'home', main }));
}

// ---------- PROJECTS ----------
function buildProjects() {
  const filters = categories.map((c, i) => `<button class="projects__filter${i === 0 ? ' is-active' : ''}" data-filter="${c}">${c}</button>`).join('');
  const cards = projects.map(p => `
    <a class="projects__card" href="projects/${p.slug}" data-category="${p.category}">
      ${proj(p, { ratio: '4/3' })}
      <div class="meta-row"><span>${esc(p.location)}</span><span>${esc(p.category)}</span></div>
      <div class="name">${esc(p.name)}</div>
      <div class="meta-row" style="margin-top:6px"><span>${p.year}</span></div>
    </a>`).join('');
  const main = `<div class="subp">
  <div class="subp__head"><h1>Our<br/>work.</h1><p>Over 60 schools and institutions across the country, alongside our sporting infrastructure and commercial projects. A selection of featured work.</p></div>
  <div class="projects__filters"><span class="projects__filter-label">Filter</span>${filters}<span class="projects__count">${String(projects.length).padStart(2,'0')} / ${String(projects.length).padStart(2,'0')}</span></div>
  <div class="projects__grid">${cards}</div>
</div>`;
  w('projects.html', layout({ title: `School, Campus & Institutional Projects in Bangalore | ${site.shortName}`, description: 'Selected school, campus and institutional architecture by Kumar & Swamy Architects — 16 featured projects across Bangalore and India, plus sports infrastructure since 1969.', pathRel: 'projects', main, breadcrumbs: [{ name: 'Home', path: '' }, { name: 'Projects', path: 'projects' }] }));
}

// ---------- INDEX OF WORKS (full chronological record) ----------
function buildIndexPage() {
  const rows = projectIndex.map((p, i) => `
      <li class="ks-index__row">
        <span class="ks-index__num">${String(i + 1).padStart(2, '0')}</span>
        <span class="ks-index__name">${esc(p.name)}</span>
        <span class="ks-index__cat">${esc(p.category)}</span>
        <span class="ks-index__loc">${esc(p.location)}</span>
        <span class="ks-index__year">${esc(p.yearLabel)}</span>
      </li>`).join('');
  const main = `<div class="subp">
  <div class="subp__head"><h1>Index.</h1><p>Every school, campus, stadium and institution we’ve drawn since 1969 — ${projectIndex.length} projects, in the order they were built.</p></div>
  <div class="subp__index">
    <ol class="ks-index">
      <li class="ks-index__row ks-index__row--head" aria-hidden="true">
        <span class="ks-index__num">№</span>
        <span class="ks-index__name">Project</span>
        <span class="ks-index__cat">Type</span>
        <span class="ks-index__loc">Location</span>
        <span class="ks-index__year">Year</span>
      </li>${rows}
    </ol>
  </div>
</div>`;
  const ld = {
    '@type': 'CollectionPage', '@id': site.domain + '/index-of-works',
    name: 'Index of Works — Kumar & Swamy Architects',
    description: 'The complete chronological record of projects by Kumar & Swamy Architects since 1969.',
    isPartOf: { '@id': site.domain + '/#website' },
    about: { '@id': PRO_ID },
    mainEntity: {
      '@type': 'ItemList', numberOfItems: projectIndex.length,
      itemListElement: projectIndex.map((p, i) => ({
        '@type': 'ListItem', position: i + 1,
        item: { '@type': 'CreativeWork', name: p.name, dateCreated: String(p.year), locationCreated: { '@type': 'Place', name: p.location } }
      }))
    },
    _cur: 'index'
  };
  w('index-of-works.html', layout({ title: `Index of Works — Every Project Since 1969 | ${site.shortName}`, description: `The complete record of Kumar & Swamy Architects — ${projectIndex.length} schools, campuses, stadiums and institutions across India, built since 1969.`, pathRel: 'index-of-works', main, extraLd: ld, breadcrumbs: [{ name: 'Home', path: '' }, { name: 'Index', path: 'index-of-works' }] }));
}

// ---------- PROJECT DETAIL ----------
function buildProjectDetail(p, i) {
  const next = projects[(i + 1) % projects.length];
  const gallery = galleryImages(p.slug);
  const overview2 = 'Like all our work, the design begins with the institution — its philosophy, its climate and the way its people actually move through a day — rather than with a fixed style of our own.';
  const ld = { '@type': 'CreativeWork', name: p.name, dateCreated: String(p.year),
    locationCreated: { '@type': 'Place', name: p.location }, creator: { '@id': PRO_ID }, description: p.brief,
    about: `${p.category} architecture`, keywords: `${p.category} architecture, ${p.location}, Kumar & Swamy Architects` };
  ld._cur = 'projects';
  const main = `<div class="subp detail">
  <section class="detail__hero">
    <div class="detail__crumbs"><a href="../">Index</a> / <a href="../projects">Projects</a> / <span>${esc(p.name)}</span></div>
    <div class="detail__title"><h1>${esc(p.name)}</h1></div>
    <div class="detail__hero-meta">
      <div class="item"><div class="lbl">Location</div><div class="val">${esc(p.location)}</div></div>
      <div class="item"><div class="lbl">Year</div><div class="val">${p.year}</div></div>
      <div class="item"><div class="lbl">Typology</div><div class="val">${esc(p.category)}</div></div>
      <div class="item"><div class="lbl">Status</div><div class="val">Built</div></div>
    </div>
  </section>
  <div class="detail__bigimg">${proj(p, { ratio: '16/7', label: p.category, depth: 1, eager: true })}</div>
  ${p.stats && p.stats.length ? `<section class="detail__stats">
    <div class="detail__stats-head"><span class="ks-label">Project numbers</span></div>
    <div class="detail__stats-grid">
      ${p.stats.map(s => `<div class="item"><div class="val">${esc(s.value)}</div><div class="lbl">${esc(s.label)}</div></div>`).join('')}
    </div>
  </section>` : ''}
  <section class="detail__overview">
    <div><span class="ks-label">Overview</span></div>
    <div>${p.overview ? p.overview.trim().split(/\n\s*\n/).map(para => `<p>${esc(para.trim())}</p>`).join('') : `<p>${esc(p.brief)}</p><p>${esc(overview2)}</p>`}</div>
  </section>
  ${gallery.length ? `<section class="detail__gallery-sec">
    <span class="ks-label">Gallery</span>
    <div class="detail__gallery">
      ${gallery.map((src, n) => `<div class="tile"><img src="${rel(1, src)}" alt="${esc(p.name)} — view ${n + 1}" loading="lazy" decoding="async"></div>`).join('')}
    </div>
  </section>` : ''}
  <a class="detail__next" href="${next.slug}">
    <span class="ks-label">Next project</span>
    <h3>${esc(next.name)} <em>→</em></h3>
  </a>
</div>`;
  w(`projects/${p.slug}.html`, layout({ title: `${p.name} — ${p.category} Architecture, ${p.location} | ${site.shortName}`, description: `${p.name}, ${p.location} (${p.year}) — ${p.category.toLowerCase()} architecture by Kumar & Swamy Architects. ${p.brief}`, pathRel: `projects/${p.slug}`, depth: 1, main, extraLd: ld, ogType: 'article', image: `assets/img/projects/${p.slug}.jpg`, breadcrumbs: [{ name: 'Home', path: '' }, { name: 'Projects', path: 'projects' }, { name: p.name, path: `projects/${p.slug}` }] }));
}

// ---------- ABOUT / STUDIO ----------
function buildAbout() {
  const teamCards = team.map(m => `
    <div class="about__team-card">
      <div class="img">${media(`assets/img/team/${slugify(m.name)}.jpg`, { ratio: '1/1', alt: m.name })}</div>
      <div class="name">${esc(m.name)}</div><div class="role">${esc(m.role)}</div>
    </div>`).join('');
  const appItems = approach.items.map(a => `
    <div class="about__approach-item"><div class="n">${a.n}</div><h3>${esc(a.h)}</h3><p>${esc(a.p)}</p></div>`).join('');
  const main = `<div class="subp">
  <section class="about__hero">
    <div class="about__hero-left"><h1>Studio</h1><p class="about__hero-motto">Listen first, draw second.</p></div>
    <div class="about__hero-right"><p>A family-owned practice in its third generation, with a legacy of over fifty-five years and more than sixty institutions built across India.</p></div>
  </section>
  <section class="about__founder">
    <div class="about__founder-img">${media('assets/img/founder.jpg', { ratio: '3/4', alt: 'C R Shivakumar, founder', fallback: 'tower' })}</div>
    <div class="about__founder-content"><span class="ks-label">Our founder</span><h2>${esc(founder.name)}</h2>${founder.body.map(t => `<p>${esc(t)}</p>`).join('')}</div>
  </section>
  <section class="about__team">
    <div class="about__team-head"><h2>Partners &amp; family.</h2></div>
    <div class="about__team-grid">${teamCards}</div>
  </section>
  <section class="about__approach">
    <h2>Our design<br/>approach.</h2>
    <div class="about__approach-list">${appItems}</div>
  </section>
  <section class="about__studio">
    <div><span class="ks-label">The studio</span><h2>More than<br/>an office.</h2></div>
    <div>${studio.body.map(t => `<p>${esc(t)}</p>`).join('')}<a href="applytowork" class="ks-cta-link">Work with us <span class="arrow">→</span></a></div>
  </section>
</div>`;
  w('about.html', layout({ title: `Studio — Institutional & School Architects in Bangalore since 1969 | ${site.shortName}`, description: 'Meet Kumar & Swamy Architects: founder C R Shivakumar, the partners, and the design approach behind a Bangalore school and institutional architecture practice in its fifth decade.', pathRel: 'about', main, image: 'assets/img/founder.jpg', breadcrumbs: [{ name: 'Home', path: '' }, { name: 'Studio', path: 'about' }] }));
}

// ---------- CONTACT ----------
function buildContact() {
  // Pin the verified business by name + full address so Google geocodes the exact
  // office in Cambridge Layout (≈12.9699, 77.6336), zoomed to street level.
  const mapSrc = 'https://maps.google.com/maps?q=Kumar+%26+Swamy+Architects,+MF+2%2F8+BDA+Building,+Cambridge+Layout,+Bengaluru,+Karnataka+560008&z=17&output=embed';
  const main = `<div class="subp">
  <div class="subp__head"><h1>Get in<br/>touch.</h1><p>Tell us about your institution and what you’re hoping to build. We’d love to hear from you.</p></div>
  <section class="contact__grid">
    <div>
      <div class="contact__block"><span class="ks-label">Studio</span><p>${esc(site.address)}</p><a href="${site.google}" target="_blank" rel="noopener">Find us on Google ↗</a></div>
      <div class="contact__block"><span class="ks-label">Hours</span><p class="sub">${esc(site.hours)}</p></div>
      <div class="contact__block"><span class="ks-label">Write</span><a href="mailto:${site.email}">${site.email}</a></div>
      <div class="contact__block"><span class="ks-label">Call</span>${site.phones.map(p => `<a href="${p.href}">${p.label}</a>`).join('')}</div>
      <div class="contact__block"><span class="ks-label">Elsewhere</span><a href="${site.social.instagram}" target="_blank" rel="noopener">Instagram ↗</a><a href="${site.social.facebook}" target="_blank" rel="noopener">Facebook ↗</a></div>
    </div>
    <div><iframe class="contact__map" title="Map to Kumar &amp; Swamy Architects, Cambridge Layout, Bengaluru" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${mapSrc}"></iframe></div>
  </section>
</div>`;
  w('contact-kumar-swamy-architect.html', layout({ title: `Contact — School & Campus Architects in Bangalore | ${site.shortName}`, description: `Contact Kumar & Swamy Architects, school and institutional architects in Bangalore — ${site.address}. ${site.email}.`, pathRel: 'contact-kumar-swamy-architect', main, breadcrumbs: [{ name: 'Home', path: '' }, { name: 'Contact', path: 'contact-kumar-swamy-architect' }] }));
}

// ---------- APPLY ----------
function buildApply() {
  const roleCards = roles.map(r => `<div class="apply__role"><div class="n">${r.n} / 03</div><h3>${esc(r.title)}</h3><p>${esc(r.blurb)}</p></div>`).join('');
  const opts = roles.map(r => `<option value="${esc(r.title)}">${esc(r.title)}</option>`).join('');
  const main = `<div class="subp">
  <div class="subp__head"><h1>Work<br/>with us.</h1><p>We’re looking for passionate people who share our commitment to institutional and educational architecture.</p></div>
  <section class="apply__roles">${roleCards}</section>
  <section class="apply__form-wrap">
    <div class="apply__form-intro"><h2>Apply to<br/>join us.</h2><p>Complete the form to apply for a position. Prefer email? Write to <a href="mailto:${site.email}?subject=Application">${site.email}</a>.</p></div>
    <form class="apply__form" action="https://formspree.io/f/your-form-id" method="POST">
      <div class="apply__field"><label for="role">Position</label><select id="role" name="position">${opts}</select></div>
      <div class="apply__field"><label for="first">First name</label><input id="first" name="first_name" type="text" required></div>
      <div class="apply__field"><label for="last">Last name</label><input id="last" name="last_name" type="text" required></div>
      <div class="apply__field"><label for="dob">Date of birth</label><input id="dob" name="dob" type="date"></div>
      <div class="apply__field"><label for="email">Email address</label><input id="email" name="email" type="email" required></div>
      <div class="apply__field"><label for="phone">Phone</label><input id="phone" name="phone" type="tel"></div>
      <div class="apply__field"><label for="resume">Link to your resumé</label><input id="resume" name="resume" type="url" placeholder="https://…"></div>
      <button type="submit" class="ks-btn-primary">Submit application <span>→</span></button>
      <p class="apply__note">This static site has no server; the form posts to a placeholder Formspree endpoint — replace <code>your-form-id</code>, or use the email above.</p>
    </form>
  </section>
</div>`;
  w('applytowork.html', layout({ title: `Careers — Architecture Jobs in Bangalore | ${site.shortName}`, description: 'Work with Kumar & Swamy Architects in Bangalore. Open roles: Junior Architect, Internship, Interiors Architect — apply to join our institutional architecture studio.', pathRel: 'applytowork', main, breadcrumbs: [{ name: 'Home', path: '' }, { name: 'Apply', path: 'applytowork' }] }));
}

// ---------- BLOG INDEX + ARTICLES ----------
function buildBlog() {
  const [lead, ...rest] = posts;
  const card = (p) => `
    <a class="journal-card" href="post/${p.slug}">
      ${media(`assets/img/blog/${p.slug}.jpg`, { ratio: '3/2', alt: p.title, fallback: p.sketch })}
      <div class="kicker"><span>${esc(p.date)}</span><span>${esc(p.readTime)}</span></div>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.excerpt)}</p>
    </a>`;
  const grid = rest.map(card).join('');
  const main = `<div class="subp">
  <div class="subp__head subp__head--blog"><h1>The<br/>journal.</h1><p>Writing from the studio — on architecture, education, and the ideas that shape the places we build.</p></div>
  <a class="journal-feature" href="post/${lead.slug}">
    <div class="journal-feature__img">${media(`assets/img/blog/${lead.slug}.jpg`, { ratio: '16/9', alt: lead.title, fallback: lead.sketch, eager: true })}</div>
    <div class="journal-feature__body">
      <span class="ks-label">Latest</span>
      <div class="kicker"><span>${esc(lead.date)}</span><span>${esc(lead.readTime)}</span></div>
      <h2>${esc(lead.title)}</h2>
      <p>${esc(lead.excerpt)}</p>
      <span class="journal-feature__more">Read the article →</span>
    </div>
  </a>
  <div class="blog__grid">${grid}</div>
</div>`;
  w('blog.html', layout({ title: `Journal — Notes on School & Institutional Architecture | ${site.shortName}`, description: 'Writing from Kumar & Swamy Architects on India’s building code, designing modern educational spaces, and inclusive institutional architecture.', pathRel: 'blog', main, breadcrumbs: [{ name: 'Home', path: '' }, { name: 'Journal', path: 'blog' }] }));

  for (const p of posts) {
    const body = md(fs.readFileSync(path.join(ROOT, 'content/blog', p.file), 'utf8'));
    const ld = { '@type': 'BlogPosting', headline: p.title, author: { '@type': 'Person', name: p.author }, publisher: { '@id': PRO_ID }, description: p.excerpt, image: `${site.domain}/assets/img/blog/${p.slug}.jpg`, mainEntityOfPage: `${site.domain}/post/${p.slug}` };
    ld._cur = 'blog';
    const main2 = `<article class="article">
  <div class="article__crumbs"><a href="../">Index</a> / <a href="../blog">Journal</a></div>
  <h1>${esc(p.title)}</h1>
  <div class="article__byline"><span>${esc(p.author)}</span><span>${esc(p.date)}</span><span>${esc(p.readTime)}</span></div>
  <div class="article__hero">${media(`assets/img/blog/${p.slug}.jpg`, { ratio: '16/8', alt: p.title, depth: 1, eager: true, fallback: p.sketch })}</div>
  <div class="article__body">${body}</div>
  <p style="margin-top:48px"><a href="../blog" class="ks-cta-link">Back to the journal <span class="arrow">→</span></a></p>
</article>`;
    w(`post/${p.slug}.html`, layout({ title: `${p.title} | ${site.shortName} Journal`, description: p.excerpt, pathRel: `post/${p.slug}`, depth: 1, main: main2, extraLd: ld, ogType: 'article', image: `assets/img/blog/${p.slug}.jpg`, breadcrumbs: [{ name: 'Home', path: '' }, { name: 'Journal', path: 'blog' }, { name: p.title, path: `post/${p.slug}` }] }));
  }
}

// ---------- SITEMAP + ROBOTS ----------
function buildSeoFiles() {
  const today = '2026-06-01';
  const entries = [
    { u: '', p: '1.0', f: 'monthly' },
    { u: 'projects', p: '0.9', f: 'monthly' },
    { u: 'about', p: '0.7', f: 'yearly' },
    { u: 'blog', p: '0.7', f: 'weekly' },
    { u: 'contact-kumar-swamy-architect', p: '0.6', f: 'yearly' },
    { u: 'applytowork', p: '0.5', f: 'monthly' },
    ...projects.map(p => ({ u: `projects/${p.slug}`, p: '0.8', f: 'yearly', img: `assets/img/projects/${p.slug}.jpg`, cap: `${p.name} — ${p.category} architecture, ${p.location}` })),
    ...posts.map(p => ({ u: `post/${p.slug}`, p: '0.6', f: 'yearly', img: `assets/img/blog/${p.slug}.jpg`, cap: p.title }))
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.map(e => `  <url><loc>${site.domain}/${e.u}</loc><lastmod>${today}</lastmod><changefreq>${e.f}</changefreq><priority>${e.p}</priority>${e.img ? `<image:image><image:loc>${site.domain}/${e.img}</image:loc><image:caption>${esc(e.cap)}</image:caption></image:image>` : ''}</url>`).join('\n')}
</urlset>`;
  w('sitemap.xml', xml);
  w('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site.domain}/sitemap.xml\n`);
  w('.nojekyll', '');

  // Web app manifest (icon srcs are relative to the manifest at the site root)
  w('site.webmanifest', JSON.stringify({
    name: site.name, short_name: site.shortName,
    icons: [
      { src: 'assets/img/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: 'assets/img/favicon-512x512.png', sizes: '512x512', type: 'image/png' }
    ],
    theme_color: '#E8B629', background_color: '#F4EFE6', display: 'standalone'
  }, null, 2));

  // Branded 404 (GitHub Pages serves /404.html on not-found)
  const main = `<div class="subp"><div class="subp__head"><h1>404.</h1><p>That page has moved or never existed. Find your way back below.</p></div>
  <div style="padding:0 32px 140px"><a href="./" class="ks-btn-primary">Back to home <span>→</span></a> &nbsp; <a href="projects" class="ks-cta-link" style="margin-left:16px">See the projects <span class="arrow">→</span></a></div></div>`;
  w('404.html', layout({ title: `Page not found — ${site.name}`, description: 'The page you were looking for could not be found.', pathRel: '404', main }));
}

// Redirect stubs for legacy Wix URLs we have no native page for yet — a
// meta-refresh plus a canonical to the closest live page so their existing
// SEO/link-equity consolidates instead of 404ing after the domain cutover.
const redirects = [
  // Index of Works taken down for now → Projects (remove this line + restore buildIndexPage() to bring it back)
  { from: 'index-of-works.html', to: 'projects', depth: 0 },
  // Team profile pages → Studio
  { from: 'suchitraharsha.html', to: 'about', depth: 0 },
  { from: 'sanchaliharsha.html', to: 'about', depth: 0 },
  { from: 'harshashivakumar.html', to: 'about', depth: 0 },
  { from: 'paromitaharsha.html', to: 'about', depth: 0 },
];
function buildRedirects() {
  for (const r of redirects) {
    const target = rel(r.depth, r.to);
    w(r.from, `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Redirecting… — ${esc(site.name)}</title>
<link rel="canonical" href="${site.domain}/${r.to}">
<meta name="robots" content="noindex, follow">
<meta http-equiv="refresh" content="0; url=${target}">
</head><body style="font-family:system-ui,sans-serif;padding:2rem">
<p>This page has moved. <a href="${target}">Continue →</a></p>
</body></html>`);
  }
}

// ---------- run ----------
buildHome();
buildProjects();
// buildIndexPage();  // Index of Works taken down for now; index-of-works.html redirects to /projects (see redirects)
projects.forEach((p, i) => buildProjectDetail(p, i));
buildAbout();
buildContact();
buildApply();
buildBlog();
buildRedirects();
buildSeoFiles();
console.log('Built: index, projects (+%d details), about, contact, apply, blog (+%d posts), %d redirect stubs, sitemap, robots', projects.length, posts.length, redirects.length);
