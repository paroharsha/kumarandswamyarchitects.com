# Kumar & Swamy Architects — website

A static rebuild of [kumarandswamyarchitects.com](https://www.kumarandswamyarchitects.com/), designed to be hosted for free on **GitHub Pages**. No build step, no framework, no JSX — just HTML, CSS and a little vanilla JS, so GitHub Pages can serve it directly.

## Pages

| File | Page |
|------|------|
| `index.html` | Home — hero wordmark, featured projects, blog teasers, "Get to Know Us" |
| `about.html` | Founder story, partners & family, design approach, the studio |
| `projects.html` | Filterable grid of 16 projects (Education / Sports / Commercial) |
| `blog.html` | Blog index |
| `blog/*.html` | The three full articles |
| `contact.html` | Address, hours, phones, email, embedded map |
| `apply.html` | Open roles + application form |

## Structure

```
.
├── index.html, about.html, projects.html, blog.html, contact.html, apply.html
├── blog/                     # individual article pages
├── assets/
│   ├── css/styles.css        # the whole design system
│   └── js/site.js            # nav toggle, active link, project filter
├── content/                  # the site copy, pulled from the live site (source of truth)
│   ├── site.json             # nav, services, contact, social
│   ├── home.json, about.json, projects.json, contact.json, apply.json
│   └── blog/                 # posts.json + one .md file per article
├── prototype/                # the original React/JSX click-through prototype (archived)
└── .nojekyll                 # tell GitHub Pages to serve files as-is
```

The `content/` folder is the editable catalogue of all copy (JSON + Markdown). The HTML pages render that content directly so the site is fast and works without JavaScript. When you change copy, update both the `content/` source and the matching HTML (or wire up a generator).

## Hosting on GitHub Pages

1. Create a repo on GitHub and push this folder.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source: Deploy from a branch**, branch **`main`**, folder **`/ (root)`**, then **Save**.
4. The site goes live at `https://<username>.github.io/<repo>/` within a minute or two.

### Custom domain (kumarandswamyarchitects.com)

In **Settings → Pages → Custom domain**, enter `www.kumarandswamyarchitects.com`, then add these DNS records at your registrar:

- A `CNAME` record for `www` → `<username>.github.io`
- (For the apex `kumarandswamyarchitects.com`) four `A` records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

GitHub will write a `CNAME` file into the repo. All internal links are relative, so the site works on both the `github.io` subpath and a custom domain.

## Notes

- **Typography:** Manrope (Google Fonts), a stand-in for the original Avenir LT / DIN Next.
- **Imagery:** project and article images are tinted placeholder tiles — no licensed photography was provided. Swap the `.tile` elements for real `<img>` tags when photos are available.
- **Application form:** GitHub Pages is static and can't process form posts. The form on `apply.html` points to a placeholder [Formspree](https://formspree.io) endpoint (`action="https://formspree.io/f/your-form-id"`) — create a free Formspree form and replace `your-form-id`, or rely on the "email us directly" fallback already in place.
- **Map:** the contact page embeds a Google Maps iframe centred on Cambridge Layout, Bengaluru.
