# Nitish Vashistha — Portfolio

A premium, award-grade personal portfolio for a Frontend Software Engineer. Dark luxury theme,
aurora gradients, cinematic scroll storytelling — and the engineering to back it up.

**Stack:** React 19 · TypeScript (strict) · Vite · React Router · Tailwind CSS · Framer Motion · GSAP (ScrollTrigger) · Lenis · Lucide

---

## Quick start

```bash
npm install
npm run dev        # local dev server with HMR
npm run build      # typecheck (tsc -b) + production build
npm run preview    # serve the production build locally
npm test           # vitest + React Testing Library
npm run lint       # eslint (typescript-eslint, react-hooks rules)
```

> Requires Node 18.18+ (Vite 6 / ESLint 9 are pinned for Node 18 compatibility).

---

## Architecture

Feature-based structure: shared primitives live under `components/`, every page section is a
self-contained feature, and all content is data-driven from `config/` so copy changes never touch
component code.

```
src/
├── components/
│   ├── ui/            # design-system primitives (Button via cva, Card, Badge, Input, …)
│   ├── effects/       # motion system (SplitText, TiltCard, Magnetic, Particles, Marquee, …)
│   └── layout/        # app shell (Navbar, Footer, Preloader, CommandMenu, SmoothScroll, ErrorBoundary)
├── features/          # one folder per page section (hero, about, skills, experience,
│                      #   projects, performance, techstack, contact)
├── pages/             # route components (HomePage, NotFoundPage) — route-level code splitting
├── hooks/             # typed custom hooks (useForm, useMagnetic, useCountUp, useMediaQuery,
│                      #   useActiveSection, useKonami)
├── config/            # all content as typed data (site, skills, projects, experience, performance)
├── types/             # shared domain types
├── lib/               # utilities (cn, debounce, throttle, clamp)
└── test/              # vitest setup (jsdom polyfills)
```

### Design system

Tokens live in `tailwind.config.ts` (semantic colors `ink/snow/primary/accent`, the house
`out-expo` ease, glow shadows, keyframes) and `src/index.css` (CSS custom properties, glass and
spotlight utilities). Components never use raw hex values.

### Motion system

- **Lenis + GSAP**: Lenis drives smooth scroll through GSAP's ticker so ScrollTrigger never
  drifts (`components/layout/SmoothScroll.tsx`). The About timeline is scroll-scrubbed GSAP.
- **Framer Motion**: reveals, split-text, layout animations (nav pill), morphing hero headline,
  spring-based tilt/magnetic/cursor effects — all via motion values, zero re-renders per frame.
- **Pure CSS where possible**: orbit rings, marquee, aurora drift run on the compositor.
- **Reduced motion**: every effect checks `prefers-reduced-motion`; Lenis, particles and the
  custom cursor disable entirely, reveals fall back to fades.

### Performance budget

- Route- and section-level code splitting: the initial bundle pays for the hero only; every
  section below the fold is a `lazy()` chunk (see the build output — ~1–10 kB per section).
- Manual vendor chunks (`react`, `framer-motion`, `gsap+lenis`) for long-lived caching.
- Particles: one canvas, one rAF loop, DPR-capped, paused off-screen and on hidden tabs.
- Hover/cursor effects write CSS custom properties or motion values — no React renders.
- Self-hosted variable fonts (no third-party requests), `tabular-nums` to avoid metric shift,
  fixed headline min-height to prevent CLS during the morph.

### Accessibility (WCAG AA targets)

Semantic landmarks, skip-link, focus-visible rings, full keyboard support in the ⌘K palette
(listbox semantics, arrow keys, focus management), split-text exposes whole sentences via
`aria-label`, decorative layers are `aria-hidden`, the preloader marks the page `inert` until
revealed, and forms wire `aria-invalid`/`aria-describedby`/`role="alert"`.

### Testing

Vitest + React Testing Library (`npm test`): unit tests for utilities (the throttle test caught a
real leading-edge bug), the generic `useForm` hook lifecycle, Button behavior, the SplitText
accessibility contract, and an App-level smoke test that mounts the entire shell.

---

## Easter eggs

- `⌘K` / `Ctrl+K` — command palette
- Konami code (`↑↑↓↓←→←→BA`) — particle burst + aurora boost

---

## Deployment

Static output in `dist/` — deploy anywhere:

**Vercel** — `vercel` (framework preset: Vite). Add a SPA rewrite for the 404 route:
`{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`

**Netlify** — build `npm run build`, publish `dist`, redirect `/* /index.html 200`.

**GitHub Pages** — `npm run build && npx gh-pages -d dist` (set Vite `base` if not at root).

Before going live: replace `https://nitishvashistha.dev` in `index.html`, `robots.txt` and
`sitemap.xml` with the real domain, and drop the latest resume PDF into `public/nitish_resume.pdf`.
