# CLAUDE.md

Guidance for working in this repo.

## What this is

The website for **Kumar & Swamy Architects** (a Bangalore architecture practice, est. 1969), replacing their old Wix site. It's a **static site hosted on GitHub Pages** at the repo root.

- **Repo:** https://github.com/paroharsha/kumarandswamyarchitects.com
- **Live:** https://paroharsha.github.io/kumarandswamyarchitects.com/
- **Eventual custom domain:** www.kumarandswamyarchitects.com

The design is an editorial split-screen layout (Inter Tight wordmark, Instrument Serif italic ampersand, mustard `#E8B629` / terracotta `#9B3A2A` on paper `#F4EFE6`). It was reverse-engineered from an approved single-file React bundle; the original lives at `_design.html` (gitignored, ~6 MB) for reference only.

## Architecture: generator → static HTML

The committed `.html` files **are the deployed site** — GitHub Pages serves them directly, no build step runs on deploy. But do **not hand-edit the generated HTML**; it is produced by a tiny zero-dependency Node generator. Edit the source, then regenerate:

```bash
node tools/build.mjs        # regenerates all HTML + sitemap.xml + robots.txt
```

### Source of truth
- `tools/data.mjs` — all content/data: projects (16), services, team, founder, approach, studio, roles, blog post metadata, site config (contact, nav, social).
- `content/blog/*.md` — full article bodies (frontmatter + Markdown), read at build time.
- `tools/sketches.mjs` — hand-drawn architectural SVGs (axonometric/plan/elevation), used as image fallbacks.
- `tools/build.mjs` — templates (layout, nav, footer), the page builders, SEO `<head>`, JSON-LD, sitemap/robots. A tiny inline Markdown converter (`md()`) handles article bodies.
  - **The Journal (`/blog` + every `/post/<slug>`) is a "drawing sheet" zine takeover**, not the standard page chrome: `buildBlog()` passes `layout({ bare: true, bodyClass: 'jz', headExtra: ZINE_FONTS })`, so those pages drop the site nav/footer and render their own fixed drawing-sheet frame (blueprint grid, ruled border, header rule with the site nav folded in, bottom title block) via `jzChrome()`. They load their own Google Fonts (Saira Condensed, IBM Plex Mono, Newsreader, Caveat) and are styled by the `.jz-*` block at the end of `site.css` (self-scoped palette + fonts under `body.jz`). The sheet is viewport-locked (`body.jz { height:100dvh; overflow:hidden }`) and only the inner `.jz-scroll` region scrolls — do **not** switch this to document-level scroll under the fixed frame (it triggers a compositor repaint/blank-frame bug). Margin-note copy per post lives in `journalNotes` (data.mjs). Zine interactions (ball hop, random-sheet jump, the "plotting" transition on plate click) are in the `body.jz` block of `assets/js/site.js`.
- `assets/css/site.css` — the design system, ported verbatim from the bundle + responsive/mobile-nav additions appended at the end.
- `assets/js/site.js` — progressive enhancement only (nav scroll state, mobile menu, scroll-reveal via IntersectionObserver, projects filter). The site is fully readable without JS.

### Generated output (committed; don't edit by hand)
`index.html`, `projects.html`, `projects/<slug>.html` (×16), `about.html` (Studio), `blog.html`, `post/<slug>.html` (×3), `contact-kumar-swamy-architect.html`, `applytowork.html`, `index-of-works.html`, redirect stubs (4 team + 7 posts), `404.html`, `sitemap.xml`, `robots.txt`, `.nojekyll`. (Served extensionless — see Conventions.)

## Images

`assets/img/{projects,blog,team}/` + `assets/img/founder.jpg` — real photography pulled from the live Wix site (each page's `og:image`, resized through the Wix CDN). Filenames match slugs (projects/posts) or `slugify(name)` (team).

`media(src, opts)` in `build.mjs` renders a real `<img>` when the file exists, else falls back to a `sketch()`. So adding/removing an image file is enough — re-run the build. To add more photos (e.g. project galleries), download into `assets/img/...` and extend the relevant builder.

## Conventions

- **URLs mirror the old Wix site and are extensionless** (to retain SEO after the domain cutover). The generator still emits flat `<name>.html` files, but every internal link, canonical, OG url and sitemap entry is written **without `.html`** — GitHub Pages serves `/about` from `about.html`. So the physical file and the public path differ:
  - Pages: `contact-kumar-swamy-architect.html` → `/contact-kumar-swamy-architect`, `applytowork.html` → `/applytowork`, plus `projects`, `about`, `blog`, `index-of-works`.
  - Projects use the **Wix long slugs** (`amaatra-academy`, `pes-group-of-institutions`, `sri-kumarans-children's-home`, `national-public-school-` (trailing hyphen), `good-shepherds-intl.-school-revitalisation` (dot) — matched verbatim; image folders under `assets/img/projects/` are named to match).
  - **Blog posts live at `/post/<slug>`** (not `/blog/`), with the full Wix slugs; the `/blog` listing stays.
  - In builders: `w('<file>.html', layout({ pathRel: '<extensionless>', … }))` and breadcrumb `path` values are extensionless. Home links use `homeHref(depth)`.
- **Legacy Wix URLs we have no page for** get meta-refresh **redirect stubs** (`buildRedirects()` in build.mjs): 4 team pages → `/about`, 7 not-yet-migrated posts → `/blog`. Add to the `redirects` array when a Wix URL is retired.
- **Links are relative.** Root pages use `assets/...` and the extensionless page name; sub-pages (`projects/`, `post/`) pass `depth: 1` so the generator prefixes `../`. Keep this when adding pages.
- **SEO matters here** (explicit client priority): every page gets a unique `<title>` + meta description, canonical URL, OG/Twitter tags, and JSON-LD (Organization site-wide, CreativeWork per project, BlogPosting per article). Maintain these for any new page.
- Fonts load from Google Fonts (Inter Tight, Instrument Serif, Geist, Geist Mono).
- Local preview: `node .claude/serve.js` → http://localhost:4173/ (the sandbox blocks `python -m http.server`). The dev server mirrors GitHub Pages "pretty URLs" (serves `/about` from `about.html`, preferring the `.html` sibling over a same-named dir).

## Deploy

GitHub Pages serves `main` branch root. Just commit + push generated output:
```bash
node tools/build.mjs && git add -A && git commit -m "..." && git push
```
If a push fails with an HTTP 400 / RPC error (image payloads), retry — `git config http.postBuffer 524288000` is already set.

## Known follow-ups
- Project detail pages show one hero each; galleries (3–4 more shots per project) can be added from the Wix galleries.
- The "Work with us" form (`applytowork.html`) submits via **Web3Forms** (`api.web3forms.com/submit`), delivering entries by email to `site.email`. The access key is `site.applyFormKey` in `tools/data.mjs` (public client-side config; safe to commit). Resumés are submitted as a link, not a file upload — Web3Forms' free tier takes no attachments.
- The old mustard-band prototype is archived in `prototype/`; `content/*.json` from that era is superseded by `tools/data.mjs` (only `content/blog/*.md` is still used).
