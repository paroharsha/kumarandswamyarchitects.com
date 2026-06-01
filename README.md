# Kumar & Swamy Architects — website

The editorial redesign of [kumarandswamyarchitects.com](https://www.kumarandswamyarchitects.com/), built as a **static site for GitHub Pages** — no framework, no bundler runtime, no JSX at serve time. The HTML in the repo root is what gets served.

**Live:** https://paroharsha.github.io/kumarandswamyarchitects.com/

## How it works

The pages are generated from a tiny zero-dependency Node script so the 24 pages stay DRY, but the **output is plain static HTML** that GitHub Pages serves directly. You only re-run the generator when content or templates change.

```
node tools/build.mjs        # regenerate all HTML
```

### Source
```
tools/
  data.mjs        # single source of truth — projects, services, team, blog meta, site config
  sketches.mjs    # the hand-drawn architectural SVG placeholders (axonometric / plan / elevation)
  build.mjs       # templates + SEO head + sitemap; writes the HTML below
content/blog/*.md # full article bodies (read at build time)
assets/
  css/site.css    # the design system, ported from the approved editorial design + responsive
  js/site.js      # nav scroll state, mobile menu, scroll-reveal, projects filter
```

### Generated output (committed, served by Pages)
```
index.html                  # Home — split hero, selected works, services, journal, about
projects.html               # filterable grid of all 16 projects
projects/<slug>.html        # one detail page per project (×16)
about.html                  # Studio — founder, partners, design approach, studio culture
blog.html  +  blog/<slug>.html   # journal index + 3 full articles
contact.html                # studio details + embedded map
apply.html                  # open roles + application form
sitemap.xml, robots.txt, .nojekyll
```

## Design system

- **Type:** Inter Tight (display, 800), Instrument Serif (the italic ampersand & drop-caps), Geist (body), Geist Mono (labels) — all via Google Fonts.
- **Palette:** paper `#F4EFE6`, ink `#1A1814`, mustard `#E8B629`, terracotta/brick `#9B3A2A`.
- Ported verbatim from the approved editorial design, with responsive layouts and a mobile nav added for real-world use.

## SEO

Per-page `<title>` + meta description, canonical URLs, Open Graph / Twitter cards, JSON-LD (Organization site-wide, CreativeWork on projects, BlogPosting on articles), semantic landmarks, a skip link, `sitemap.xml` and `robots.txt`.

## Notes / to-do

- **Imagery:** project, team and article images currently use on-brand **SVG sketches** as placeholders. Real photography from the live site will be dropped in next — swap the `sketch(...)` calls in `build.mjs` for `<img>` tags (the design already supports a photo layer).
- **Apply form:** static hosting has no backend; the form posts to a placeholder Formspree endpoint (`your-form-id`) — replace it, or use the email fallback already shown.
- The original click-through prototype is archived under `prototype/`.

## Hosting

GitHub Pages → Settings → Pages → Deploy from branch `main`, folder `/ (root)`. For the custom domain, set `www.kumarandswamyarchitects.com` and point DNS (`www` CNAME → `paroharsha.github.io`; apex A records → GitHub Pages IPs). All internal links are relative, so it works on both the project subpath and a custom domain.
