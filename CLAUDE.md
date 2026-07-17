# lszp-portfolio

Personal portfolio of Leandro Szikora (Data/ML Engineer, Barcelona), built with
Astro and deployed to GitHub Pages at
https://leandroszikora.github.io/lszp-portfolio.

## Architecture

- **Content lives in `src/data/*.json`** — the only files to edit for content
  updates (experience, talks, certifications, about). Components never
  hardcode user-visible strings.
- **Design source of truth is `design/mockup.html`** — the approved mockup.
  Design tokens (colors, type, spacing) are mirrored in
  `src/styles/global.css` as CSS custom properties.
- Components: one per section in `src/components/`, composed in
  `src/pages/index.astro`, SEO handled in `src/layouts/Base.astro`.
- Static site, zero client-side JS by default. System font stacks only.
- GitHub Pages serves from a subpath: always build URLs with Astro's `base`
  (`import.meta.env.BASE_URL`).

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
in the main loop; keep content edits and interviews in the main session.

## Commands

- `npm run dev` — local dev server
- `npm run build` — production build into `dist/`
- `npm run preview` — serve the built site locally

## Deployment

Push to `main` triggers `.github/workflows/deploy.yml` (build + deploy to
Pages). Repo Pages source must be "GitHub Actions". GitHub account:
`leandroszikora`.
