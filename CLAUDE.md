# lszp-portfolio

Personal portfolio of Leandro Szikora Panaia (Data/ML Engineer, Barcelona),
built with Astro and deployed to GitHub Pages at
https://leandroszikora.github.io/lszp-portfolio (EN) and `/es/` (Spanish).

## Architecture

- **Content lives in `src/data/{en,es}/*.json`** — the only files to edit for
  content updates. One folder per locale, same schemas: `profile`,
  `experience`, `education`, `certifications`, `speaking`, plus `ui.json`
  holding every interface string (nav labels, section titles, "watch",
  "upcoming", CTA…). Components never hardcode user-visible strings and never
  import JSON directly — they receive `data`/`ui` via props from the pages.
- **Pages**: `src/pages/index.astro` (EN) and `src/pages/es/index.astro` (ES)
  load their locale's data and compose the components. `Base.astro` takes a
  `locale` prop driving `<html lang>`, `og:locale`, per-page canonical and
  crossed hreflang alternates (x-default → EN).
- **Design source of truth is `design/mockup.html`** — the approved mockup.
  Design tokens are mirrored in `src/styles/global.css` as CSS custom
  properties, with dark theme via both `prefers-color-scheme` and
  `data-theme` overrides.
- **Dark mode toggle**: pre-paint `is:inline` script in `Base.astro` head
  (reads `localStorage.theme`); sun/moon button in `Nav` persists the choice.
  No stored choice → follows the system.
- **Micro-interactions**: reveal-on-scroll via IntersectionObserver, gated on
  `prefers-reduced-motion`; hidden states are added by JS only so content is
  always visible without JS.
- **Print**: `@media print` in `global.css` produces a clean CV-like document
  (light tokens forced, nav/toggle/watch links hidden, `break-inside: avoid`).
- **Social card**: `public/og-image.png` is generated from `design/og.html`
  (regeneration command in that file's header comment). Regenerate whenever
  name, role, or headline change.
- Static site, minimal inline JS only (theme + reveal). System font stacks.
- GitHub Pages serves from a subpath: always build URLs with Astro's `base`
  (`import.meta.env.BASE_URL`); note BASE_URL may lack a trailing slash —
  normalize before joining.

## Multi-agent system (learning project)

This repo doubles as a playground for multi-agent development:

| Piece | Kind | Model | Responsibility |
|---|---|---|---|
| `frontend-dev` | agent (`.claude/agents/`) | opus | Components, styles, layouts, SEO — anything visual |
| `cicd-engineer` | agent (`.claude/agents/`) | sonnet | GitHub Actions + Pages deployment |
| `interview` | skill (`.claude/skills/`) | — | Content-gathering conversation, updates `src/data/` |

Why the split: **agents** run in the background and can't talk to the user, so
they get self-contained build tasks; the **interview is a skill** because it
must converse with Leandro in the main session. Delegate UI work to
`frontend-dev` and workflow/deploy work to `cicd-engineer` instead of doing it
in the main loop; keep content edits, translations and interviews in the main
session. When a review finds a bug in agent work, send it back to the same
agent (its context is intact) rather than fixing it in the main loop.

## Content conventions

- Site copy is first person, confident but not boastful. English is the
  primary locale; Spanish mirrors it in Leandro's own voice (voseo casual in
  conversation, neutral in site copy).
- The Oscar Pulido recommendation quote stays in English in both locales —
  it's a verbatim quote.
- Talk titles keep their original language; descriptions are localized.

## Commands

- `npm run dev` — local dev server
- `npm run build` — production build into `dist/` (both locales + sitemap)
- `npm run preview` — serve the built site locally

## Deployment

Push to `main` triggers `.github/workflows/deploy.yml` (checkout@v7,
withastro/action@v6, deploy-pages@v5 — Node 24 majors; build + deploy to
Pages). Repo Pages source is "GitHub Actions". GitHub account:
`leandroszikora` (personal account only — never a work account).
