# Website UI Kit — Kumar & Swamy Architects

A high-fidelity recreation of the K&SA marketing site, rebuilt as modular React components so any page can be composed from a small set of primitives.

## Structure

- `index.html` — interactive click-through prototype. Lands on Home, links go to About and Projects (rendered on the same page via a tiny router).
- `Header.jsx` — top nav + services ribbon
- `Footer.jsx` — phone + email + social icons
- `Hero.jsx` — the typographic wordmark hero
- `ProjectsBand.jsx` — mustard-band row of project cards (signature overlap-caption layout)
- `BlogSection.jsx` — three blog preview cards on white
- `GetToKnowUs.jsx` — cream-gradient band with CTA
- `AboutPage.jsx` — founder story, team grid, design-approach copy
- `ProjectsPage.jsx` — filtered project grid with featured hero tile
- `components.jsx` — shared primitives (Button, Card, Eyebrow, Band)

## Notes

- All typography uses Manrope (Google Fonts) as a substitute for Avenir LT / DIN Next.
- Project imagery is represented by tinted placeholder tiles (no licensed photography was provided). Swap the `<ProjectImage/>` component's backgrounds for real photos.
- Icons: Lucide via CDN (Facebook, Instagram, Mail, Phone, ArrowRight).
