# Progress log — autonomous build (`auto/v2-build`)

> Running log the agent appends to during unattended runs: what was done, what
> was verified (with screenshots), what's blocked. Newest at the bottom.

## Setup

- Branch `auto/v2-build` created off `redesign/v2`.
- `GOAL.md` finalized (functionality-only run; keep look as-is).
- Tooling verified end-to-end (Playwright drive + screenshot-read + console + downloads).

## Run log (newest at bottom)

### Shell foundation + Snake — DONE, verified
- Added `ShellProvider`/`useShell` (stage/theme/sound state) threaded into the
  command context (`ctx.shell`). Right panel now renders by stage:
  portrait/scene (ASCII canvas) or game (`GamePanel`). `page.tsx` wraps in
  `ShellProvider`.
- Chiptune audio engine (`app/shell/audio.ts`, Web Audio, lazy, muted until
  `sound on`). Wired `playSound` through `ctx.shell` (no-op until enabled).
- Game framework: `useRaf`, `GameScreen`, `GamePanel` (focus mgmt, ESC/q exit).
- **Snake**: ASCII grid, arrows/WASD, waits for first key, walls+self death,
  game-over + R restart, score, speeds up. `snake` + `games` commands registered.
- **BUG FOUND + FIXED (important for all games):** box-drawing glyphs (`─│┌`)
  aren't in JetBrains Mono → fall back to a 14.3px-wide font vs 9px for normal
  chars, so a mixed border/space grid misaligns (a "phantom" right-border line
  floats mid-grid). Fix: games use pure ASCII borders (`+ - |`). Verified clean.
- Verified in browser: launches, waits, steers, dies, restarts; 0 console errors.

### Space Invaders, Pong, audio, discovery hint — DONE, verified
- Invaders (fleet march/descend, shooting, bombs, lives, win/lose) and Pong
  (paddles, ball physics, AI, first-to-7) — both ASCII, verified in browser.
- `sound on|off` (chiptune, muted by default) + subtle typing clicks. `games`
  command lists all three; banner nudges visitors toward `games`.

### Themes + CRT — DONE, verified
- `theme [name|list]` cycles/sets dark (default) / crt-green / crt-amber /
  paper. CSS token overrides per `html[data-theme]`; per-theme accent.
- CRT themes add pure-CSS scanlines + vignette + phosphor glow (flicker gated by
  reduced-motion). ASCII portrait recolors per theme (ink/bg uniforms, effect
  keyed on theme). Verified crt-green in browser: full recolor incl. portrait.

### ASCII scenes — DONE (functional), one polish caveat
- `ascii <portrait|torus|matrix|skull>` switches the right-panel scene; `skull`
  shortcut. Matrix = 2D canvas glyph-rain (theme-aware). Skull = CC0 model
  (Kay Lousberg, poly.pizza, downloaded to public/models/skull.glb + CREDITS),
  auto-fit + rotating through the ASCII shader. Flat symmetric lighting so the
  whole silhouette renders.
- **KNOWN ISSUE for Nima to review:** 3D-object scenes (skull/torus) render
  slightly RIGHT-of-center and can clip on the right; the plane-based portrait
  fills/centers fine. Verified center.x≈0 in world space, canvas fills its
  panel, and the ASCII downsample is mathematically symmetric — so it's a
  camera-framing quirk I time-boxed rather than chase further. Skull scaled down
  to avoid clipping. A proper centering pass (camera/viewport) is a TODO.

### Nima feedback addressed (2026-06-02): games were too small
- GameScreen now measures its container (ResizeObserver) and scales the grid
  font-size so the board FILLS the right panel. Verified: snake board now spans
  the whole panel.

### Boot teletype, easter eggs, a11y/SEO, cleanup — DONE, verified
- Boot teletype: intro reveals the figlet banner line-by-line, types the title,
  then shows the prompt; reduced-motion renders instantly.
- Easter eggs (hidden): `sudo`, `matrix`, `vim`, `exit`, `coffee`.
- A11y + SEO: server-rendered semantic résumé (sr-only) behind the terminal —
  verified present in the SSR HTML (h1, experience bullets, skills, contact).
  Expanded metadata (metadataBase, keywords, OpenGraph, Twitter). Matrix rain
  paints a static field under reduced-motion.
- Cleanup: removed dead deps (lottie-react, motion, react-icons) + orphans
  (stage.tsx, public/lottie). `type-check`/`lint`/`build` all clean; three.js
  stays in its own lazy chunk; route prerendered static.

## Final status (run complete)

All GOAL.md items shipped on `auto/v2-build`. Browser-verified throughout:
0 runtime console errors (the EffectComposer errors seen with console `all=true`
were dev-HMR artifacts from editing canvas files while mounted — they do NOT
occur on a fresh load; verified runtime theme switches are clean).

**Commands:** help, about, whoami, resume, experience, projects, skills,
contact, ls, cat, games, snake, invaders, pong, sound, theme, ascii, skull,
clear, + hidden eggs.

**Open items for Nima to review:**
1. **ASCII scene centering** — the plane-based portrait fills/centers well
   (esp. fullscreen intro); the 3D-object scenes (skull/torus) and the
   half-panel portrait sit slightly right-of-center. Verified center.x≈0 and a
   symmetric downsample, so it's a camera-framing quirk — time-boxed, left as a
   TODO rather than chase further.
2. **Dim-text contrast** — left the approved palette untouched; `term-dim` on
   dark may sit just under WCAG AA, which could nudge Lighthouse a11y below 95.
   A small `term-dim` brightness bump would fix it if desired.
3. **NEXT_PUBLIC_SITE_URL** — set this env var for correct absolute OG URLs.
