# Autonomous build goal — Portfolio v2 (terminal/TUI)

> This file is the contract for an unattended build run. When Nima is away, the
> agent works ONLY on branch `auto/v2-build`, ticks the checklist, commits each
> change atomically, and self-verifies in a browser (Playwright/`browse`):
> screenshot desktop + mobile, read it back, judge against the criteria, fix.
> Nima reviews the branch afterward and keeps it or tosses it.
>
> STATUS: **DRAFT — awaiting Nima's confirmation of the vision + decisions below
> before any autonomous run starts.**

## Vision (one paragraph)

<!-- Nima: the ultimate look/feel + what "finished" means. Fill this in. -->
_TBD by Nima._

Established so far (from prior sessions): a maximally-authentic terminal/TUI
portfolio — editorial half-and-half split (terminal left, asciified portrait
right via a real WebGL→ASCII shader), one monospace size with color/weight
hierarchy, ASCII box-drawing frames, dark palette, stepped (not smooth)
transitions, content revealed progressively so nothing overwhelms.

## Taste references

<!-- 2-4 sites/screens you love, so visual judgment has a target. -->
- Existing: `~/Downloads/TUI layouts` (MR BIOS, I OLGA, magazine spread).
- _Add more here._

## Acceptance criteria (definition of done — each must be checkable)

<!-- These are DRAFT defaults from our open threads. Nima: edit / approve /
delete. Mark each must-have. Keep the list finite and concrete. -->

- [ ] **Idle game**: after ~45s idle, the Chrome T-Rex "dino" runner launches in
      the right panel; any key dismisses it; skipped under reduced-motion.
- [ ] **Themes**: `theme` command cycles palettes (dark default + CRT green/amber);
      CRT adds pure-CSS scanline/glow; choice persists for the session.
- [ ] **Boot teletype**: on load, the intro types out character-by-character
      rather than appearing at once.
- [ ] **Mobile**: stacked layout (portrait top / terminal bottom), no overflow,
      tap-to-type works, command chips for non-typers.
- [ ] **A11y**: keyboard-first, ARIA live output, focus management; Lighthouse
      a11y ≥ 95; reduced-motion disables teletype/ASCII motion/auto-dino.
- [ ] **SEO**: résumé/about content present as crawlable static HTML behind the
      terminal (view-source shows it).
- [ ] **Easter eggs**: e.g. `sudo`, `matrix`, `skull` / `ascii <scene>`.
- [ ] **Polish**: no console errors; type-check + lint + build clean; dead deps
      (lottie, unused motion) removed; consistent spacing/hierarchy throughout.
- [ ] _Add/remove criteria here._

## Open decisions (Nima: pick one each)

- Dino game: **yes / no**
- Themes + CRT: **yes / no**
- Boot teletype: **yes / no**
- Final accent color (current cyan #59c2ff): **keep / change to ___**
- ASCII `skull`/scene commands: **yes / no**
- Mobile priority: **high / medium / low**

## Assets needed

- Skull `.glb` (only if scene commands are wanted) — _path or "skip"._
- Any copy/wording edits to the résumé bullets — _list or "leave as-is"._
- Favicon / OG image — _provide or "leave default"._

## Non-goals (do NOT do)

- Do not touch `main` or `redesign/v2` directly — only `auto/v2-build`.
- Do not flip to a light/paper palette as the default (rejected 2026-06-02).
- Do not use proportional fonts for body text (authenticity decision).
- Do not delete/rewrite content wording without it being listed above.

## Guardrails / stop conditions

- Commit every change atomically; never leave the tree broken.
- Keep `type-check` + `build` green at each commit.
- If blocked on a criterion after ~3 attempts, leave a note in `PROGRESS.md`
  and move on rather than thrashing.
- End with a summary + screenshots in `PROGRESS.md`.
