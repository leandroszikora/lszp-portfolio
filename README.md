# lszp-portfolio

Personal portfolio of **Leandro Szikora Panaia** — Data/ML Engineer, Barcelona.

**Live:** [English](https://leandroszikora.github.io/lszp-portfolio/) · [Español](https://leandroszikora.github.io/lszp-portfolio/es/)

Static site built with [Astro](https://astro.build), deployed to GitHub Pages. No frameworks, no trackers, system fonts, ~zero JavaScript (only a pre-paint theme script and an IntersectionObserver for reveal animations).

## Built with AI — on purpose

This repo is also a working example of AI-assisted development with [Claude Code](https://claude.com/claude-code). Rather than one big prompt, the project runs as a small multi-agent system:

| Piece | Kind | Responsibility |
|---|---|---|
| `frontend-dev` | agent ([`.claude/agents/`](.claude/agents/)) | Components, styles, layouts, SEO — anything visual |
| `cicd-engineer` | agent ([`.claude/agents/`](.claude/agents/)) | GitHub Actions + Pages deployment, repo protection |
| `interview` | skill ([`.claude/skills/`](.claude/skills/)) | Guided conversation that gathers content and writes it into `src/data/` |

The split follows a simple rule: **agents** get self-contained build tasks they can run in the background; the **interview is a skill** because it needs to talk to me in the main session. When a review finds a bug in an agent's work, the fix goes back to the same agent — its context is intact — instead of being patched in the main loop. Project conventions live in [`CLAUDE.md`](CLAUDE.md).

## Architecture

- **Content and presentation are fully separated.** All copy lives in `src/data/{en,es}/*.json` — one folder per locale, same schemas. Components never hardcode user-visible strings and never import JSON; they receive `data`/`ui` via props from the pages.
- **i18n without a framework**: `src/pages/index.astro` (EN) and `src/pages/es/index.astro` (ES) compose the same components with their locale's data. `Base.astro` drives `<html lang>`, `og:locale`, canonicals and crossed hreflang alternates from a `locale` prop.
- **Dark mode** via `prefers-color-scheme` *and* a persisted toggle (`data-theme` + `localStorage`), with a pre-paint inline script so there's no flash.
- **Accessible by default**: semantic landmarks, skip-to-content link, localized `aria-label`s, decorative glyphs hidden from screen readers, `prefers-reduced-motion` respected, content visible without JavaScript.
- **Print stylesheet** turns the page into a clean one-page CV (`⌘P` → PDF).
- **Design source of truth** is [`design/mockup.html`](design/mockup.html); tokens are mirrored as CSS custom properties in `src/styles/global.css`.

## Commands

```sh
npm run dev       # local dev server
npm run build     # production build (both locales + sitemap) into dist/
npm run preview   # serve the built site locally
```

## Deployment

Every push to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site and deploys it to GitHub Pages. `main` is protected against force-pushes and deletion.
