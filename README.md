# Nitish Vashistha Portfolio

This is my personal portfolio, built from scratch to present my frontend work with the same
engineering standards I use on production projects. I designed and implemented the full experience:
the visual system, page sections, animation layer, performance optimizations, accessibility details,
typed content configuration, and test setup.

The goal was not just to make a portfolio page. I wanted a fast, polished, maintainable React
application that shows how I think about frontend architecture, motion, UI systems, and user
experience.

## What I Built

- A responsive portfolio for my frontend engineering profile.
- A dark premium interface with aurora backgrounds, animated text, particles, tilt cards, magnetic
  interactions, and smooth scrolling.
- Data-driven sections for About, Skills, Experience, Projects, Performance, Tech Stack, and Contact.
- A reusable UI layer with buttons, cards, badges, inputs, section headings, and layout primitives.
- A command palette with keyboard support.
- A production build setup with route/section code splitting and manual vendor chunks.
- Accessibility and reduced-motion handling across interactive and animated components.
- Unit tests for utilities, hooks, UI behavior, accessibility contracts, and the app shell.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- GSAP + ScrollTrigger
- Lenis smooth scroll
- Lucide React icons
- Vitest + React Testing Library
- ESLint

## Running The Project

```bash
npm install
npm run dev
```

The local development server starts with Vite and hot module replacement.

Useful commands:

```bash
npm run build       # typecheck and create a production build
npm run preview     # preview the production build locally
npm test            # run Vitest tests
npm run test:watch  # run tests in watch mode
npm run lint        # run ESLint
npm run typecheck   # run TypeScript checks without building
```

Requires Node 18.18 or newer.

## Project Structure

I organized the code by responsibility so every page section can evolve independently while shared
behavior stays reusable.

```text
src/
├── components/
│   ├── ui/            # reusable design-system primitives
│   ├── effects/       # animation and interaction components
│   └── layout/        # navbar, footer, command menu, preloader, shell behavior
├── features/          # portfolio sections: hero, about, skills, experience, projects, etc.
├── pages/             # route-level pages
├── hooks/             # custom hooks for forms, media queries, scroll state, count-up, etc.
├── config/            # typed content for profile, projects, skills, experience, performance
├── types/             # shared TypeScript types
├── lib/               # small utilities
└── test/              # Vitest setup
```

## Architecture Decisions

### Content Is Config-Driven

Most portfolio content lives in `src/config`. Projects, skills, experience, site metadata, and
performance highlights are defined as typed data. This keeps copy and portfolio updates separate
from component logic.

### Feature-Based Sections

Each major section lives under `src/features`. This keeps the page easy to maintain because the Hero,
About, Skills, Experience, Projects, Performance, Tech Stack, and Contact areas own their own UI and
behavior.

### Reusable UI Primitives

Common UI elements live in `src/components/ui`. The Button component uses variant-based styling, and
shared primitives keep spacing, radius, color, focus states, and interaction behavior consistent.

### Motion Without Unnecessary Re-Renders

I used Framer Motion for component-level animation, GSAP for scroll-linked timelines, and Lenis for
smooth scrolling. Expensive visual effects are isolated so animation work does not cause unnecessary
React re-renders.

### Performance-Conscious Build

The Vite build splits large dependencies into separate vendor chunks:

- `vendor-react`
- `vendor-motion`
- `vendor-gsap`

Below-the-fold sections are lazy-loaded so the initial page can render quickly.

### Accessibility

I added semantic sections, keyboard navigation, visible focus styles, command-menu keyboard support,
ARIA attributes for split text and form validation, reduced-motion handling, and decorative layers
marked as hidden from assistive technology.

## Main Features

- Animated hero section with orbiting technology labels.
- Smooth scroll and scroll progress.
- Section reveal animations.
- Interactive project cards with custom mockups.
- Skills and technology marquee.
- Performance-focused stats and highlights.
- Contact form with reusable form state handling.
- Command palette using `Ctrl+K` / `Cmd+K`.
- Konami-code easter egg for an extra visual effect.
- Custom 404 page.

## Testing

The project uses Vitest and React Testing Library. Current tests cover:

- Utility helpers.
- The reusable form hook.
- Button behavior.
- SplitText accessibility behavior.
- Command menu behavior.
- App-level rendering smoke test.

Run all tests with:

```bash
npm test
```

## Deployment

This is a static Vite app. A production build is generated in `dist/`.

```bash
npm run build
```

It can be deployed to Vercel, Netlify, GitHub Pages, or any static hosting provider.

For SPA routing, configure all routes to serve `index.html`.

## Notes

- Resume file: `public/nitish_resume.pdf`
- Site metadata: `src/config/site.ts`
- Project data: `src/config/projects.ts`
- SEO files: `public/robots.txt` and `public/sitemap.xml`

Before deploying with a custom domain, update the domain values in `src/config/site.ts`,
`public/robots.txt`, `public/sitemap.xml`, and `index.html`.
