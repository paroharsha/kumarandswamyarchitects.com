// Static site generator for Kumar & Swamy Architects.
// Emits plain HTML to the repo root so GitHub Pages can serve it with no build.
//   node tools/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, nav, categories, projects, projectIndex, specialties, services, founder, team, approach, studio, roles, posts, journalNotes } from './data.mjs';
import { sketch } from './sketches.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const w = (rel, html) => { const p = path.join(ROOT, rel); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, html); };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const exists = (rel) => fs.existsSync(path.join(ROOT, rel));
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// Cache-busting stamp keyed to a file's last-modified time. Replacing an image
// (same filename) changes its URL, so browsers/CDNs fetch the new one instead of
// serving a stale cached copy. Unchanged files keep the same URL.
const imgVer = (rel) => { try { return '?v=' + Math.floor(fs.statSync(path.join(ROOT, rel)).mtimeMs / 1000); } catch { return ''; } };

// Render a real photo when present, else fall back to the on-brand SVG sketch.
function media(src, { ratio = '4/3', alt = '', label = '', depth = 0, eager = false, fallback = 'linear' } = {}) {
  const lab = label
    ? `<div style="position:absolute;top:14px;left:16px;font-family:var(--font-mono);font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#F4EFE6;text-shadow:0 1px 6px rgba(0,0,0,0.6);z-index:2">${esc(label)}</div>`
    : '';
  if (src && exists(src)) {
    return `<div class="ks-sketch" style="aspect-ratio:${ratio};position:relative;background:#EFE8DB;overflow:hidden">`
      + `<img src="${rel(depth, src)}${imgVer(src)}" alt="${esc(alt)}"${eager ? '' : ' loading="lazy"'} decoding="async" style="width:100%;height:100%;object-fit:cover;display:block">`
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

function layout({ title, description, pathRel, depth = 0, bodyClass = '', main, extraLd = null, ogType = 'website', image = 'assets/img/projects/amaatra-academy.jpg', breadcrumbs = null, bare = false, headExtra = '' }) {
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
<link href="https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@400;500;600;700;900&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${rel(depth, 'assets/css/site.css')}">${headExtra}
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body class="${bodyClass}">
${bare ? '' : `<a class="ks-skip" href="#main">Skip to content</a>
${navHtml(bodyClass.includes('home') ? 'home' : (extraLd && extraLd._cur) || pageCurrent(pathRel), depth)}`}
<main id="main">
${main}
</main>
${bare ? '' : footerHtml(depth)}
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
  // "On the board" rotates daily, client-side (static site — can't pick per-request
  // server-side). Pool = every project that has a real hero photo, kept in the
  // canonical project order so the day-based pick is deterministic for all visitors.
  const featPool = projects.filter(p => exists(`assets/img/projects/${p.slug}.jpg`));
  const featData = featPool.map(p => ({
    slug: p.slug, name: p.name, location: p.location, year: p.year, category: p.category,
    ref: String(projects.indexOf(p) + 1).padStart(3, '0'),
    img: `assets/img/projects/${p.slug}.jpg${imgVer(`assets/img/projects/${p.slug}.jpg`)}`,
    alt: `${p.name} — ${p.category.toLowerCase()} architecture in ${p.location} by Kumar & Swamy Architects`
  }));
  // Server default = today's pick (UTC day count), so no-JS/first paint already
  // shows the current day's project and JS agrees on the same day (no flash).
  const featDayIdx = featPool.length ? Math.floor(Date.now() / 86400000) % featPool.length : 0;
  const feat = featPool[featDayIdx] || projects[0];
  const featNo = String(projects.indexOf(feat) + 1).padStart(3, '0');
  const featJson = JSON.stringify(featData).replace(/</g, '\\u003c');
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

  const workCards = projects.slice(0, 8).map(p => `
      <a class="jz-work" href="projects/${p.slug}">
        <div class="jz-work__img">${projFill(p)}</div>
        <div class="jz-work__body">
          <div class="jz-work__meta"><span>P-${String(projects.indexOf(p) + 1).padStart(2, '0')}</span><span class="dim">${esc(p.category)}</span></div>
          <div class="jz-work__name">${esc(p.name)}</div>
          <div class="jz-work__meta"><span class="dim">${esc(p.location)}</span><span class="dim">${p.year}</span></div>
        </div>
      </a>`).join('');
  const rt = (p) => esc(p.readTime.replace(/\s*read$/, ''));
  const jLead = posts[0];
  const journalLead = `
      <a class="jz-photoplate jz-photoplate--wide jz-jlead" href="post/${jLead.slug}">
        <span class="jz-jlead__tag">Latest ✦</span>
        <div class="jz-jlead__img">${heroFill(jLead, { eager: true })}</div>
        <div class="jz-photoplate__top"><span></span><span>${dwg(0)} · ${rt(jLead)} read</span></div>
        <div class="jz-photoplate__bot">
          <div class="jz-photoplate__name">${esc(jLead.title)}</div>
          <div class="jz-photoplate__meta"><span>${esc(jLead.author)}</span><span>${esc(jLead.date)}</span><span class="jz-jlead__cta">Read &amp; comment →</span></div>
        </div>
      </a>`;
  const journalSide = posts.slice(1, 4).map((p, i) => `
      <a class="jz-jrow" href="post/${p.slug}">
        <div class="jz-jrow__img">${heroFill(p, { eager: true })}</div>
        <div class="jz-jrow__txt">
          <div class="jz-jrow__meta"><span>${dwg(i + 1)}</span><span class="dim">${esc(p.date)}</span><span class="jz-rbadge">${rt(p)}</span></div>
          <h3>${esc(p.title)}</h3>
          <span class="jz-jrow__read">Read the article →</span>
        </div>
      </a>`).join('');
  const igHandle = site.social.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, '').replace(/\/+$/, '');
  const igSection = `
      <section class="jz-sec">
        <div class="jz-sec__head">
          <div>
            <div class="jz-eyebrow jz-eyebrow--sec">Field feed · @${esc(igHandle)}</div>
            <h2 class="jz-h2">On <em>Instagram.</em></h2>
          </div>
          <a class="jz-morelink" href="${site.social.instagram}" target="_blank" rel="noopener">Follow ↗</a>
        </div>
        ${site.social.instagramEmbed
          ? `<div class="jz-ig">${site.social.instagramEmbed}</div>`
          : `<a class="jz-igfallback" href="${site.social.instagram}" target="_blank" rel="noopener">
          <div class="jz-igfallback__mark" aria-hidden="true">◎</div>
          <div class="jz-igfallback__txt">
            <div class="jz-igfallback__handle">@${esc(igHandle)}</div>
            <p>Site photographs, drawings and studio notes, posted as the work happens. Follow the practice on Instagram.</p>
          </div>
          <span class="jz-btn jz-btn--blue">Follow on Instagram ↗</span>
        </a>`}
      </section>`;
  const specSet = specialties.map(s => `<span>${esc(s)}</span>`).join('');
  const marqueeText = 'Kumar &amp; Swamy — Three generations · Fifty-seven years · Sixty-plus institutions —';
  const marquee = Array.from({ length: 4 }, () => `<span>${marqueeText}</span>`).join('');

  const main = `${jzChrome('General arrangement', 'GA-00', 'home', 0)}
  <div class="jz-scroll">
    <div class="jz-wrap jz-wrap--wide">
      <section class="jz-hero">
        <div class="jz-hero__head">
          <div>
            <div class="jz-eyebrow">Sheet 00 · General arrangement · Est. 1969</div>
            <h1 class="jz-wordmark jz-wordmark--logo"><img src="assets/img/logo-full.png" alt="Kumar &amp; Swamy Architects · Est. 1969 · Bangalore" width="3000" height="2553"></h1>
          </div>
          <div class="jz-hero__note">
            <p class="jz-hero__lede">${esc(site.tagline)}</p>
            <div class="jz-mast__hand">sixty years on file ↓</div>
          </div>
        </div>
        <div class="jz-ticker"><div class="jz-ticker__row">${specSet}${specSet}</div></div>
        <div class="jz-metacells">
          <div><span class="k">Founded</span><span class="v">Bangalore, 1969</span></div>
          <div><span class="k">Practice</span><span class="v">Multidisciplinary</span></div>
          <div><span class="k">Built work</span><span class="v">60+ projects</span></div>
          <div><span class="k">Bengaluru</span><span class="v">Cambridge Layout</span></div>
        </div>
      </section>

      <section class="jz-sec" id="jz-board">
        <div class="jz-sec__head">
          <div>
            <div class="jz-eyebrow jz-eyebrow--sec">Currently featured · Ref. <span data-board="ref">${featNo}</span></div>
            <h2 class="jz-h2">On the <em>board.</em></h2>
          </div>
          <a class="jz-morelink" data-board="open" href="projects/${feat.slug}">Open sheet →</a>
        </div>
        <a class="jz-photoplate jz-photoplate--wide" data-board="plate" href="projects/${feat.slug}">
          ${projFill(feat, { eager: true })}
          <div class="jz-photoplate__top"><span data-board="cat">${esc(feat.category)} · ${esc(feat.location)}</span><span data-board="ref2">Ref. ${featNo}</span></div>
          <div class="jz-photoplate__bot">
            <div class="jz-photoplate__name" data-board="name">${esc(feat.name)}</div>
            <div class="jz-photoplate__meta"><span data-board="loc">${esc(feat.location)}</span><span data-board="year">${feat.year}</span><span>Built</span></div>
          </div>
        </a>
        <script type="application/json" id="jz-board-data">${featJson}</script>
      </section>

      <section class="jz-sec">
        <div class="jz-sec__head">
          <div>
            <div class="jz-eyebrow jz-eyebrow--sec">Drawing set · The Journal</div>
            <h2 class="jz-h2">From the <em>journal.</em> <span class="jz-jhand">start a conversation&nbsp;↓</span></h2>
          </div>
          <a class="jz-morelink" href="blog">All writing →</a>
        </div>
        <div class="jz-jfeat">
          ${journalLead}
          <div class="jz-jfeat__side">${journalSide}</div>
        </div>
      </section>
${igSection}

      <section class="jz-sec">
        <div class="jz-sec__head">
          <div>
            <div class="jz-eyebrow jz-eyebrow--sec">Sheet index · Selected works</div>
            <h2 class="jz-h2">Selected <em>works.</em></h2>
          </div>
          <a class="jz-morelink" href="projects">All projects →</a>
        </div>
        <div class="jz-works">${workCards}</div>
      </section>

      <section class="jz-sec">
        <div class="jz-band">
          <div>
            <div class="jz-eyebrow jz-eyebrow--sec">General notes · The studio</div>
            <h2 class="jz-h2">A practice in its <em>fifth</em> decade.</h2>
          </div>
          <div class="jz-band__side">
            <div class="jz-body-copy">
              <p>Founded by C R Shivakumar in Bangalore, the studio has grown across three generations — carrying one ethic: listen first, draw second.</p>
              <p>A small team of architects and interns work out of a studio that does not limit itself to the office. We travel, read, listen to music, watch film — because you cannot design for people without first knowing them.</p>
            </div>
            <a class="jz-btn jz-btn--blue" href="about">Meet the studio →</a>
          </div>
        </div>
      </section>

      <div class="jz-marquee" aria-hidden="true"><div class="jz-marquee__row">${marquee}</div></div>
      <div class="jz-foot">
        <div>${esc(site.address).replace(', Bengaluru', '<br>Bengaluru')}</div>
        <div>${esc(site.email)}<br>${esc(site.phones[0].label)}</div>
        <div><a href="${site.social.instagram}" target="_blank" rel="noopener">Instagram ↗</a><br><a href="${site.social.facebook}" target="_blank" rel="noopener">Facebook ↗</a></div>
        <div>© 1969–2026 ${esc(site.name)}</div>
      </div>
    </div>
  </div>`;
  w('index.html', layout({ title: `School & Institutional Architecture in Bangalore | ${site.name}`, description: site.description, pathRel: '', bodyClass: 'jz', bare: true, main }));
}

// ---------- PROJECTS ----------
function buildProjects() {
  const filters = categories.map((c, i) => `<button class="jz-filter projects__filter${i === 0 ? ' is-active' : ''}" data-filter="${esc(c)}">${esc(c)}</button>`).join('');
  const cards = projects.map((p, i) => `
        <a class="jz-work projects__card" href="projects/${p.slug}" data-category="${esc(p.category)}">
          <div class="jz-work__img">${projFill(p)}</div>
          <div class="jz-work__body">
            <div class="jz-work__meta"><span>P-${String(i + 1).padStart(2, '0')}</span><span class="dim">${esc(p.category)}</span></div>
            <div class="jz-work__name">${esc(p.name)}</div>
            <div class="jz-work__meta"><span class="dim">${esc(p.location)}</span><span class="dim">${p.year}</span></div>
          </div>
        </a>`).join('');
  const cnt = String(projects.length).padStart(2, '0');
  const main = `${jzChrome('Project index', 'P-00', 'projects', 0)}
  <div class="jz-scroll">
    <div class="jz-wrap jz-wrap--wide">
      <header class="jz-phead">
        <div>
          <div class="jz-eyebrow">Sheet index · Built work</div>
          <h1 class="jz-h1">Our <em>work.</em></h1>
        </div>
        <p class="jz-lede jz-phead__intro">Over 60 schools and institutions across the country, alongside our sporting infrastructure and commercial projects — a selection of featured work.</p>
      </header>
      <div class="jz-filters">
        <span class="jz-filters__label">Filter</span>${filters}
        <span class="jz-count projects__count">${cnt} / ${cnt}</span>
      </div>
      <div class="jz-works" style="margin-top:30px">${cards}</div>
    </div>
  </div>`;
  w('projects.html', layout({ title: `School, Campus & Institutional Projects in Bangalore | ${site.shortName}`, description: 'Selected work by Kumar & Swamy Architects — 16 featured projects across Bangalore and India: schools, campuses and institutions, sports infrastructure, healthcare, residential, resorts and interiors, since 1969.', pathRel: 'projects', bodyClass: 'jz', bare: true, main, breadcrumbs: [{ name: 'Home', path: '' }, { name: 'Projects', path: 'projects' }] }));
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
  const no = 'P-' + String(i + 1).padStart(2, '0');
  const overviewHtml = p.overview
    ? p.overview.trim().split(/\n\s*\n/).map(para => `<p>${esc(para.trim())}</p>`).join('')
    : `<p>${esc(p.brief)}</p><p>${esc(overview2)}</p>`;
  const main = `${jzChrome(clip(p.name, 30), no, 'projects', 1)}
  <div class="jz-scroll">
    <div class="jz-wrap jz-wrap--wide">
      <div class="jz-detail__top">
        <a class="jz-back" href="../projects">← Project index</a>
        <span class="jz-detail__crumbs">${esc(p.location)} · ${esc(p.category)}</span>
        <span class="sp"></span>
        <span>Dwg ${no} · Built</span>
      </div>
      <div class="jz-detail__title"><h1 class="jz-h1">${esc(p.name)}</h1></div>
      <div class="jz-metacells">
        <div><span class="k">Location</span><span class="v">${esc(p.location)}</span></div>
        <div><span class="k">Year</span><span class="v">${p.year}</span></div>
        <div><span class="k">Typology</span><span class="v">${esc(p.category)}</span></div>
        <div><span class="k">Status</span><span class="v">Built</span></div>
      </div>
      <div class="jz-detail__hero">${projFill(p, { depth: 1, eager: true })}</div>
      ${p.stats && p.stats.length ? `<div class="jz-metacells" style="margin-top:22px">${p.stats.map(s => `<div><span class="k">${esc(s.label)}</span><span class="v">${esc(s.value)}</span></div>`).join('')}</div>` : ''}
      <section class="jz-sec" style="margin-top:34px">
        <div class="jz-overview">
          <div class="jz-eyebrow">Overview</div>
          <div class="jz-overview__body jz-body-copy">${overviewHtml}</div>
        </div>
      </section>
      ${gallery.length ? `<section class="jz-sec">
        <div class="jz-eyebrow" style="margin-bottom:16px">Gallery · ${String(gallery.length).padStart(2, '0')} plates</div>
        <div class="jz-gallery">
          ${gallery.map((src, n) => `<div class="tile"><img src="${rel(1, src)}" alt="${esc(p.name)} — view ${n + 1}" loading="lazy" decoding="async"></div>`).join('')}
        </div>
      </section>` : ''}
      <div class="jz-flip">
        <a class="prev" href="../projects">← Project index</a>
        <a class="next" href="${next.slug}">Next: ${esc(clip(next.name, 22))} →</a>
        <span class="sp"></span>
        <span class="lab">Dwg ${no} — ${esc(clip(p.name, 24))}</span>
      </div>
    </div>
  </div>`;
  w(`projects/${p.slug}.html`, layout({ title: `${p.name} — ${p.category} Architecture, ${p.location} | ${site.shortName}`, description: `${p.name}, ${p.location} (${p.year}) — ${p.category.toLowerCase()} architecture by Kumar & Swamy Architects. ${p.brief}`, pathRel: `projects/${p.slug}`, depth: 1, bodyClass: 'jz', bare: true, main, extraLd: ld, ogType: 'article', image: `assets/img/projects/${p.slug}.jpg`, breadcrumbs: [{ name: 'Home', path: '' }, { name: 'Projects', path: 'projects' }, { name: p.name, path: `projects/${p.slug}` }] }));
}

// ---------- ABOUT / STUDIO ----------
function buildAbout() {
  const teamCards = team.map((m, i) => `
        <div class="jz-work">
          <div class="jz-work__img">${media(`assets/img/team/${slugify(m.name)}.jpg`, { ratio: '1/1', alt: m.name })}</div>
          <div class="jz-work__body">
            <div class="jz-work__meta"><span>T-${String(i + 1).padStart(2, '0')}</span><span class="dim">Partner</span></div>
            <div class="jz-work__name">${esc(m.name)}</div>
            <div class="jz-work__role">${esc(m.role)}</div>
          </div>
        </div>`).join('');
  const appRows = approach.items.map(a => `
        <div class="jz-row">
          <div class="jz-row__n">${a.n} / 06</div>
          <div class="jz-row__name">${esc(a.h)}</div>
          <div class="jz-row__blurb">${esc(a.p)}</div>
        </div>`).join('');
  const svcTotal = String(services.length).padStart(2, '0');
  const svcRows = services.map(s => `
        <div class="jz-row">
          <div class="jz-row__n">${s.n} / ${svcTotal}</div>
          <div class="jz-row__name">${esc(s.name)}</div>
          <div class="jz-row__blurb">${esc(s.blurb)}</div>
        </div>`).join('');
  const main = `${jzChrome('About us', 'S-01', 'about', 0)}
  <div class="jz-scroll">
    <div class="jz-wrap jz-wrap--wide">
      <header class="jz-phead">
        <div>
          <div class="jz-eyebrow">General notes · The practice</div>
          <h1 class="jz-h1">About <em>us.</em></h1>
        </div>
        <p class="jz-lede jz-phead__intro">A family-owned practice in its third generation — a legacy of over fifty-five years and more than sixty institutions built across India. <em>Listen first, draw second.</em></p>
      </header>

      <section class="jz-sec">
        <div class="jz-band jz-band--top">
          <div class="jz-portrait">${media('assets/img/founder.jpg', { ratio: '3/4', alt: 'C R Shivakumar, founder', fallback: 'tower' })}</div>
          <div class="jz-band__side">
            <div class="jz-eyebrow jz-eyebrow--sec">Our founder</div>
            <h2 class="jz-h2">${esc(founder.name)}</h2>
            <div class="jz-body-copy">${founder.body.map(t => `<p>${esc(t)}</p>`).join('')}</div>
          </div>
        </div>
      </section>

      <section class="jz-sec">
        <div class="jz-sec__head">
          <div><div class="jz-eyebrow jz-eyebrow--sec">Partners &amp; family</div><h2 class="jz-h2">The <em>team.</em></h2></div>
        </div>
        <div class="jz-works">${teamCards}</div>
      </section>

      <section class="jz-sec">
        <div class="jz-sec__head">
          <div><div class="jz-eyebrow jz-eyebrow--sec">Method · 01–06</div><h2 class="jz-h2">Our design <em>approach.</em></h2></div>
        </div>
        <div class="jz-rows">${appRows}</div>
      </section>

      <section class="jz-sec">
        <div class="jz-sec__head">
          <div><div class="jz-eyebrow jz-eyebrow--sec">Scope of services · 01–${svcTotal}</div><h2 class="jz-h2">Eight briefs,<br><em>one practice.</em></h2></div>
        </div>
        <div class="jz-rows">${svcRows}</div>
      </section>

      <section class="jz-sec">
        <div class="jz-band">
          <div><div class="jz-eyebrow jz-eyebrow--sec">The studio</div><h2 class="jz-h2">More than <em>an office.</em></h2></div>
          <div class="jz-band__side">
            <div class="jz-body-copy">${studio.body.map(t => `<p>${esc(t)}</p>`).join('')}</div>
            <a href="applytowork" class="jz-btn jz-btn--blue">Work with us →</a>
          </div>
        </div>
      </section>
    </div>
  </div>`;
  w('about.html', layout({ title: `About Us — Multidisciplinary Architects in Bangalore since 1969 | ${site.shortName}`, description: 'Meet Kumar & Swamy Architects — founder C R Shivakumar, the partners, and the multidisciplinary approach behind a Bangalore practice in its fifth decade, spanning institutions, infrastructure, healthcare, sport, homes, interiors and product design.', pathRel: 'about', bodyClass: 'jz', bare: true, main, image: 'assets/img/founder.jpg', breadcrumbs: [{ name: 'Home', path: '' }, { name: 'About Us', path: 'about' }] }));
}

// ---------- CONTACT ----------
function buildContact() {
  // Pin the verified business by name + full address so Google geocodes the exact
  // office in Cambridge Layout (≈12.9699, 77.6336), zoomed to street level.
  const mapSrc = 'https://maps.google.com/maps?q=Kumar+%26+Swamy+Architects,+MF+2%2F8+BDA+Building,+Cambridge+Layout,+Bengaluru,+Karnataka+560008&z=17&output=embed';
  const main = `${jzChrome('Location plan', 'C-01', 'contact', 0)}
  <div class="jz-scroll">
    <div class="jz-wrap jz-wrap--wide">
      <header class="jz-phead">
        <div>
          <div class="jz-eyebrow">General notes · Contact</div>
          <h1 class="jz-h1">Get in <em>touch.</em></h1>
        </div>
        <p class="jz-lede jz-phead__intro">Tell us about your institution and what you’re hoping to build. We’d love to hear from you.</p>
      </header>
      <section class="jz-sec" style="border-bottom:0">
        <div class="jz-contact">
          <div class="jz-dl">
            <div class="jz-dl__row"><div class="jz-dl__k">Studio</div><div class="jz-dl__v">${esc(site.address)}<br><a href="${site.google}" target="_blank" rel="noopener">Find us on Google ↗</a></div></div>
            <div class="jz-dl__row"><div class="jz-dl__k">Hours</div><div class="jz-dl__v">${esc(site.hours)}</div></div>
            <div class="jz-dl__row"><div class="jz-dl__k">Write</div><div class="jz-dl__v"><a href="mailto:${site.email}">${site.email}</a></div></div>
            <div class="jz-dl__row"><div class="jz-dl__k">Call</div><div class="jz-dl__v">${site.phones.map(p => `<a href="${p.href}">${esc(p.label)}</a>`).join('')}</div></div>
            <div class="jz-dl__row"><div class="jz-dl__k">Elsewhere</div><div class="jz-dl__v"><a href="${site.social.instagram}" target="_blank" rel="noopener">Instagram ↗</a><a href="${site.social.facebook}" target="_blank" rel="noopener">Facebook ↗</a></div></div>
          </div>
          <div><iframe class="jz-map" title="Map to Kumar &amp; Swamy Architects, Cambridge Layout, Bengaluru" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${mapSrc}"></iframe></div>
        </div>
      </section>
    </div>
  </div>`;
  w('contact-kumar-swamy-architect.html', layout({ title: `Contact — School & Campus Architects in Bangalore | ${site.shortName}`, description: `Contact Kumar & Swamy Architects, school and institutional architects in Bangalore — ${site.address}. ${site.email}.`, pathRel: 'contact-kumar-swamy-architect', bodyClass: 'jz', bare: true, main, breadcrumbs: [{ name: 'Home', path: '' }, { name: 'Contact', path: 'contact-kumar-swamy-architect' }] }));
}

// ---------- APPLY ----------
function buildApply() {
  const roleRows = roles.map(r => `
        <div class="jz-row">
          <div class="jz-row__n">${r.n} / 03</div>
          <div class="jz-row__name">${esc(r.title)}</div>
          <div class="jz-row__blurb">${esc(r.blurb)}</div>
        </div>`).join('');
  const opts = roles.map(r => `<option value="${esc(r.title)}">${esc(r.title)}</option>`).join('');
  const main = `${jzChrome('Recruitment', 'R-01', 'apply', 0)}
  <div class="jz-scroll">
    <div class="jz-wrap jz-wrap--wide">
      <header class="jz-phead">
        <div>
          <div class="jz-eyebrow">General notes · Recruitment</div>
          <h1 class="jz-h1">Work with <em>us.</em></h1>
        </div>
        <p class="jz-lede jz-phead__intro">We’re looking for passionate people who share our commitment to institutional and educational architecture.</p>
      </header>

      <section class="jz-sec">
        <div class="jz-sec__head">
          <div><div class="jz-eyebrow jz-eyebrow--sec">Open roles · 01–03</div><h2 class="jz-h2">Where you <em>fit.</em></h2></div>
        </div>
        <div class="jz-rows">${roleRows}</div>
      </section>

      <section class="jz-sec" style="border-bottom:0">
        <div class="jz-sec__head">
          <div><div class="jz-eyebrow jz-eyebrow--sec">Application</div><h2 class="jz-h2">Apply to <em>join.</em></h2></div>
          <a class="jz-morelink" href="mailto:${site.email}?subject=Application">Prefer email? →</a>
        </div>
        <form class="jz-form" action="https://api.web3forms.com/submit" method="POST">
          <input type="hidden" name="access_key" value="${site.applyFormKey}">
          <input type="hidden" name="subject" value="New application — Work with us (${site.shortName})">
          <input type="hidden" name="from_name" value="${site.name} website">
          <input type="checkbox" name="botcheck" class="jz-form__botcheck" tabindex="-1" autocomplete="off" aria-hidden="true">
          <div class="jz-field jz-field--full"><label for="role">Position</label><select id="role" name="position">${opts}</select></div>
          <div class="jz-field"><label for="first">First name</label><input id="first" name="first_name" type="text" required></div>
          <div class="jz-field"><label for="last">Last name</label><input id="last" name="last_name" type="text" required></div>
          <div class="jz-field"><label for="email">Email address</label><input id="email" name="email" type="email" required></div>
          <div class="jz-field"><label for="phone">Phone</label><input id="phone" name="phone" type="tel"></div>
          <div class="jz-field"><label for="dob">Date of birth</label><input id="dob" name="dob" type="date"></div>
          <div class="jz-field"><label for="resume">Link to your resumé</label><input id="resume" name="resume" type="url" placeholder="https://…"></div>
          <div class="jz-field jz-field--full"><label for="about">Why do you want to work with us?</label><textarea id="about" name="about" rows="5" required placeholder="Tell us what draws you to our work — a thought, a reason, anything you'd like us to know."></textarea></div>
          <div class="jz-form__foot">
            <button type="submit" class="jz-btn jz-btn--blue">Submit application →</button>
            <p class="jz-form__note">Applications are delivered by email. Prefer to write directly? Use the address above.</p>
          </div>
        </form>
      </section>
    </div>
  </div>`;
  w('applytowork.html', layout({ title: `Careers — Architecture Jobs in Bangalore | ${site.shortName}`, description: 'Work with Kumar & Swamy Architects in Bangalore. Open roles: Junior Architect, Internship, Interiors Architect — apply to join our institutional architecture studio.', pathRel: 'applytowork', bodyClass: 'jz', bare: true, main, breadcrumbs: [{ name: 'Home', path: '' }, { name: 'Apply', path: 'applytowork' }] }));
}

// ---------- BLOG INDEX + ARTICLES (the "drawing sheet" Journal zine) ----------
// A full-screen takeover: the site nav/footer are dropped (bare layout) and the
// zine renders its own fixed drawing-sheet chrome (blueprint grid, ruled border,
// header rule with folded-in site nav, and a title block pinned to the bottom).
const dwg = (i) => 'A-' + String(i + 1).padStart(2, '0');
const clip = (s, n) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);
// A hero image that fills its frame (bare <img>), falling back to the SVG sketch.
function heroFill(p, { depth = 0, eager = false } = {}) {
  const src = `assets/img/blog/${p.slug}.jpg`;
  if (exists(src)) return `<img src="${rel(depth, src)}${imgVer(src)}" alt="${esc(p.title)}"${eager ? '' : ' loading="lazy"'} decoding="async">`;
  return sketch(p.sketch, { ratio: '4/3' });
}
// A project photo that fills its frame (bare <img>), falling back to the sketch.
function projFill(p, { depth = 0, eager = false } = {}) {
  const src = `assets/img/projects/${p.slug}.jpg`;
  const alt = `${p.name} — ${p.category.toLowerCase()} architecture in ${p.location} by Kumar & Swamy Architects`;
  if (exists(src)) return `<img src="${rel(depth, src)}${imgVer(src)}" alt="${esc(alt)}"${eager ? '' : ' loading="lazy"'} decoding="async">`;
  return sketch(p.sketch, { ratio: '4/3' });
}
// Comments + reactions on a post, via giscus (GitHub Discussions). Renders the
// live widget once site.giscus is fully configured; otherwise a tasteful
// placeholder so the section still reads as intentional. See site.giscus in data.mjs.
function giscusBlock() {
  const g = site.giscus || {};
  const live = g.repo && g.repoId && g.categoryId;
  const head = `<div class="jz-comments__head">
        <div class="jz-eyebrow jz-eyebrow--sec">Margin notes · Discussion</div>
        <h2 class="jz-h2">Join the <em>conversation.</em></h2>
        <p class="jz-comments__sub">React and leave a comment — ${live ? 'sign in with GitHub to add yours.' : 'the discussion board is switching on shortly.'}</p>
      </div>`;
  if (!live) {
    return `<section class="jz-comments">
      ${head}
      <div class="jz-comments__soon">Comments &amp; reactions are being set up. Check back soon to leave your note in the margin.</div>
    </section>`;
  }
  return `<section class="jz-comments">
      ${head}
      <div class="jz-comments__mount giscus"></div>
      <script src="https://giscus.app/client.js"
        data-repo="${g.repo}"
        data-repo-id="${g.repoId}"
        data-category="${esc(g.category || 'Announcements')}"
        data-category-id="${g.categoryId}"
        data-mapping="${g.mapping || 'pathname'}"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="${g.theme || 'light'}"
        data-lang="en"
        crossorigin="anonymous"
        async>
      </script>
    </section>`;
}
// Fixed drawing-sheet chrome shared by the index and every article sheet.
function jzChrome(sheetTitle, dwgNo, current, depth) {
  const links = nav.map(it => `<a href="${rel(depth, it.href)}"${it.id === current ? ' aria-current="page"' : ''}>${esc(it.label)}</a>`).join('');
  return `<div class="jz-grid" aria-hidden="true"></div>
  <div class="jz-frame" aria-hidden="true"></div>
  <div class="jz-frame2" aria-hidden="true"></div>
  <div class="jz-head">
    <a class="jz-head__brand" href="${homeHref(depth)}"><img class="jz-head__logo" src="${rel(depth, 'assets/img/logo-mark.png')}" alt="" width="256" height="256"><span>Kumar &amp; Swamy Architects · Est. 1969 · Bangalore</span></a>
    <nav class="jz-head__nav" aria-label="Primary">${links}</nav>
  </div>
  <div class="jz-title" aria-hidden="true">
    <div class="jz-title__mark"><img src="${rel(depth, 'assets/img/logo-mark.png')}" alt="Kumar &amp; Swamy" width="256" height="256"></div>
    <div class="jz-title__cell jz-title__cell--hide">Sheet title — ${esc(sheetTitle)}</div>
    <div class="jz-title__cell jz-title__cell--hide">Scale — N.T.S.</div>
    <div class="jz-title__spacer"></div>
    <div class="jz-title__dwg">Dwg no. ${esc(dwgNo)}</div>
  </div>`;
}
function buildBlog() {
  const [lead, ...rest] = posts;
  const noteHtml = (p, cls) => {
    const n = journalNotes[p.slug];
    return n ? `<div class="${cls}"><span>${n.split('\n').map(esc).join('<br>')}</span></div>` : '';
  };

  // Featured plate (A-01)
  const feature = `<a class="jz-feature" href="post/${lead.slug}" data-sheet="${dwg(0)}">
    <div class="jz-feature__main">
      <div class="jz-feature__meta"><span>${dwg(0)}</span><span class="dim">${esc(lead.date)}</span><span class="dim">${esc(lead.readTime)}</span><span class="jz-badge">Latest</span></div>
      <h2>${esc(lead.title)}</h2>
      <p class="jz-feature__blurb">${esc(lead.excerpt)}</p>
      <div class="jz-feature__read"><span>Read the article</span><span class="ar">→</span></div>
    </div>
    <div class="jz-feature__fig">
      <div class="jz-feature__img">${heroFill(lead, { eager: true })}</div>
      ${noteHtml(lead, 'jz-feature__note')}
    </div>
  </a>`;

  // Plate grid (A-02 → A-10)
  const plates = rest.map((p, idx) => `<a class="jz-plate" href="post/${p.slug}" data-sheet="${dwg(idx + 1)}">
      <div class="jz-plate__meta"><span>${dwg(idx + 1)}</span><span class="dim">${esc(p.date)}</span><span class="dim">${esc(p.readTime.replace(/\s*read$/, ''))}</span></div>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.excerpt)}</p>
      ${noteHtml(p, 'jz-plate__note')}
    </a>`).join('');

  const marqueeText = 'Kumar &amp; Swamy — Three generations · Fifty-seven years · Sixty-plus institutions —';
  const marquee = Array.from({ length: 4 }, () => `<span>${marqueeText}</span>`).join('');

  const main = `${jzChrome('Journal index', 'A-00', 'blog', 0)}
  <div class="jz-scroll">
    <div class="jz-wrap">
      <div class="jz-mast">
        <div class="jz-mast__title">
          <div class="jz-eyebrow">Sheet 00 · General notes</div>
          <h1>The<br>journal<span class="jz-ball" title="click me" aria-hidden="true"></span></h1>
        </div>
        <div class="jz-mast__side">
          <p>Writing from the studio — on architecture, education, and the ideas that shape the places we build.</p>
          <div class="jz-mast__hand">ten sheets on file ↓</div>
        </div>
      </div>
      <div class="jz-hint">
        <span class="dot">●</span><span>Ten entries, plotted newest first</span><span class="sp"></span>
        <span class="jz-hint__tip">Hover the right margin of any plate for margin notes</span>
        <button type="button" class="jz-random" aria-label="Jump to a random sheet">↯ Random sheet</button>
      </div>
      ${feature}
      <div class="jz-idxrule"><span>Sheet index</span><span class="ln"></span><span class="bl">A-02 → A-10</span></div>
      <div class="jz-plates">${plates}</div>
      <div class="jz-marquee" aria-hidden="true"><div class="jz-marquee__row">${marquee}</div></div>
      <div class="jz-foot">
        <div>${esc(site.address).replace(', Bengaluru', '<br>Bengaluru')}</div>
        <div>${esc(site.email)}<br>${esc(site.phones[0].label)}</div>
        <div>© 1969–2026 ${esc(site.name)}</div>
      </div>
    </div>
  </div>
  <div class="jz-plot" aria-hidden="true"><div class="jz-plot__grid"></div><div class="jz-plot__bar"></div><div class="jz-plot__label">Plotting sheet A-01 …</div></div>`;
  w('blog.html', layout({ title: `Journal — Notes on School & Institutional Architecture | ${site.shortName}`, description: 'Writing from Kumar & Swamy Architects on India’s building code, designing modern educational spaces, and inclusive institutional architecture.', pathRel: 'blog', bodyClass: 'jz', bare: true, main, breadcrumbs: [{ name: 'Home', path: '' }, { name: 'Journal', path: 'blog' }] }));

  const n = posts.length;
  posts.forEach((p, i) => {
    const body = md(fs.readFileSync(path.join(ROOT, 'content/blog', p.file), 'utf8'));
    const prev = posts[(i - 1 + n) % n];
    const next = posts[(i + 1) % n];
    const ld = { '@type': 'BlogPosting', headline: p.title, author: { '@type': 'Person', name: p.author }, publisher: { '@id': PRO_ID }, description: p.excerpt, image: `${site.domain}/assets/img/blog/${p.slug}.jpg`, mainEntityOfPage: `${site.domain}/post/${p.slug}` };
    ld._cur = 'blog';
    const main2 = `${jzChrome(clip(p.title, 30), dwg(i), 'blog', 1)}
  <div class="jz-scroll">
    <article class="jz-article">
      <div class="jz-article__top">
        <a class="jz-back" href="../blog">← Sheet index</a>
        <span class="jz-article__byline">${esc(p.author)} · ${esc(p.date)} · ${esc(p.readTime)}</span>
        <span class="sp"></span>
        <span class="jz-article__no">Dwg ${dwg(i)} of ${n}</span>
      </div>
      <div class="jz-article__head"><h1>${esc(p.title)}</h1></div>
      <div class="jz-article__hero">${heroFill(p, { depth: 1, eager: true })}</div>
      <div class="jz-article__body">${body}</div>
      <div class="jz-flip">
        <a class="prev" href="${prev.slug}">← ${esc(clip(prev.title, 24))}</a>
        <a class="next" href="${next.slug}">${esc(clip(next.title, 24))} →</a>
        <span class="sp"></span>
        <span class="lab">Dwg ${dwg(i)} — The Journal</span>
      </div>
      ${giscusBlock()}
    </article>
  </div>`;
    w(`post/${p.slug}.html`, layout({ title: `${p.title} | ${site.shortName} Journal`, description: p.excerpt, pathRel: `post/${p.slug}`, depth: 1, bodyClass: 'jz', bare: true, main: main2, extraLd: ld, ogType: 'article', image: `assets/img/blog/${p.slug}.jpg`, breadcrumbs: [{ name: 'Home', path: '' }, { name: 'Journal', path: 'blog' }, { name: p.title, path: `post/${p.slug}` }] }));
  });
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
  const main = `${jzChrome('Sheet not found', 'X-404', '', 0)}
  <div class="jz-scroll">
    <div class="jz-wrap jz-wrap--wide">
      <header class="jz-phead" style="border-bottom:0">
        <div>
          <div class="jz-eyebrow">Error · Missing sheet</div>
          <h1 class="jz-h1">404.</h1>
        </div>
        <p class="jz-lede jz-phead__intro">That sheet has moved or was never plotted. Find your way back below.</p>
      </header>
      <div style="display:flex;flex-wrap:wrap;gap:16px;padding-top:6px">
        <a class="jz-btn jz-btn--blue" href="./">Back to home →</a>
        <a class="jz-btn" href="projects">See the projects →</a>
      </div>
    </div>
  </div>`;
  w('404.html', layout({ title: `Page not found — ${site.name}`, description: 'The page you were looking for could not be found.', pathRel: '404', bodyClass: 'jz', bare: true, main }));
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
