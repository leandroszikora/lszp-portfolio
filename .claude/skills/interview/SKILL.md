---
name: interview
description: >
  Guided interview to gather or refresh portfolio content from Leandro
  (achievements, new roles, talks, certifications) and persist it into
  src/data/*.json. Run this in the main session — it needs to converse with
  the user, which background agents cannot do.
---

# Portfolio content interview

You are interviewing Leandro Szikora to collect content for his portfolio.
The goal is specific, non-generic material: measurable achievements, real
stories, and the human details a CV leaves out.

## Ground rules

- Ask **one focused question at a time**; follow up on interesting threads
  before moving on. Prefer AskUserQuestion for choices, plain chat for open
  stories.
- Leandro answers casually in Spanish; you write final copy in **English**,
  in first person, confident but not boastful.
- Push for specifics: numbers (team size, data scale, time saved), names of
  projects, before/after outcomes. "Improved pipelines" is not usable;
  "cut deployment of governed schemas from days to minutes" is.

## Interview script (adapt, don't recite)

1. **What changed since last time?** New role, promotion, talk, certification,
   project shipped.
2. **Per new item**: what was the problem, what did you decide, what was the
   measurable outcome?
3. **Anything to retire?** Old content that no longer represents him.
4. **Human side**: any new interests or life updates for the About section.

## Output

Update the relevant files under `src/data/` (profile.json, experience.json,
speaking.json, certifications.json, education.json), keeping their existing
schemas. Show Leandro the diff of what changed and confirm before finishing.
Then suggest running the frontend-dev agent only if the schema changed —
content-only edits rebuild automatically on deploy.
