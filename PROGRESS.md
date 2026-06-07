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

### Nima feedback addressed (2026-06-02): games were too small
- GameScreen now measures its container (ResizeObserver) and scales the grid
  font-size so the board FILLS the right panel. Verified: snake board now spans
  the whole panel.
