# Autonomous build goal — Portfolio v2 (terminal/TUI)

> Contract for an unattended run. The agent works ONLY on branch
> `auto/v2-build`, ticks the checklist, commits each change atomically, and
> self-verifies in a browser (Playwright/`browse`): screenshot desktop, read it
> back, check console for errors, fix. Nima reviews the branch afterward.
>
> STATUS: **READY — awaiting Nima's final "go" + auto-accept/bypass-permissions.**

## Prime directive (read first)

**Do NOT redesign or restyle anything. The look/feel/energy is established and
approved as-is.** Keep the dark palette, the one-size mono + figlet type, the
ASCII box-drawing frames, the editorial left/right split, the stepped
transition, and the asciified portrait EXACTLY as they are. Visual
rearrangement/polish happens later, with Nima. **This run is functionality
only** — games, audio, themes, scenes, a11y/SEO, easter eggs, cleanup. If a
feature needs UI, match the existing style; don't invent a new one.

## Build order (highest value first — Nima's stated priority: games + audio)

### 1. Retro games (command-launched, terminal-styled, monochrome)
- [ ] `snake` — grow-the-snake, arrow/WASD, walls or wrap, score, game-over, ESC/q to quit back to terminal.
- [ ] `invaders` — Space-Invaders shooter: move + shoot descending enemies, dodge fire, lives, score, win/lose.
- [ ] `pong` — paddle vs simple AI, score to N, ESC/q to quit.
- [ ] Games render in the panel in the current ASCII/terminal black-and-white style; pause/quit cleanly; never trap focus.
- [ ] `games` command lists them; plus a subtle one-time hint so non-typers discover them (e.g. a dim "try `snake`" line).
- [ ] Desktop/keyboard is fine (mobile is low priority — see below).

### 2. Audio (off by default)
- [ ] 8-bit-style SFX for the games (move/shoot/score/die) via Web Audio (prefer synthesized, no heavy assets).
- [ ] Optional keystroke/typing clicks.
- [ ] Global mute toggle that STARTS MUTED (no surprise audio); `sound on|off` command + persists for the session.

### 3. Themes (`theme` command — make it playful)
- [ ] `theme` cycles/sets palettes via CSS vars on the root. Dark stays the DEFAULT.
- [ ] Add playful variants incl. CRT green and CRT amber with pure-CSS scanlines + phosphor glow (gated by reduced-motion).
- [ ] Per-theme accent (cyan on dark, green on CRT-green, amber on CRT-amber).
- [ ] `theme <name>` and `theme` (cycle/list); choice persists for the session.

### 4. ASCII scenes (swap the right panel via commands)
- [ ] `skull` — a CC0-licensed skull `.glb` (source one, keep the license note) through the existing ASCII shader, rotating.
- [ ] `ascii <scene>` — `torus`, `matrix` (rain), `portrait` (default/return).
- [ ] Portrait remains the default; scenes are extras/easter eggs.

### 5. Boot teletype (subtle)
- [ ] Intro types on character-by-character, fast/subtle, before "press any key". Skipped under reduced-motion.

### 6. A11y + SEO (both)
- [ ] Keyboard-first, ARIA live output, sane focus management.
- [ ] `prefers-reduced-motion` disables teletype, ASCII motion, scanlines, and any auto-animation.
- [ ] Lighthouse a11y ≥ 95.
- [ ] Résumé/about content emitted as crawlable static HTML behind the terminal (visible in view-source); good `<title>`/meta.

### 7. Easter eggs (tasteful)
- [ ] `sudo` (cheeky denial), `matrix`, and 1–2 more that fit. Hidden from `help`.

### 8. Polish / cleanup
- [ ] No console errors anywhere (verify via Playwright console capture on each major view).
- [ ] `type-check` + `lint` + `build` all clean.
- [ ] Remove dead deps (`lottie-react`, and `motion` if now unused) and any leftover dead files.
- [ ] Confirm the production status line isn't occluded (the bottom-left "N" is just the Next dev indicator — dev-only).

## Decisions (locked via interview 2026-06-02)

- Ambition: maximal **functionality** (NOT visual redesign).
- Games: Snake, Space Invaders, Pong. Launch: commands + subtle hint (no idle auto-launch).
- Themes: `theme` command; dark default; playful CRT variants; per-theme accent.
- Scenes: yes — skull (CC0), torus, matrix; portrait default.
- Boot intro: teletype, fast/subtle.
- Mobile: **low** — must not break/overflow and must be readable; games may be keyboard/desktop-only.
- A11y + SEO: both.
- Sound: yes, **off by default**, with mute toggle.
- 3D asset: find a free CC0 model.
- Copy: **keep résumé/about wording verbatim** — layout/reveal only, no rewrites.
- Brand bits (favicon/OG/meta): low priority; keep current/minimal terminal-style; don't spend much on it.
- Time: open-ended (4+ h) — attempt everything incl. bonus easter eggs.
- Post-run: **leave branch for review** (commit all on `auto/v2-build`, stop; no PR, no merge).

## Non-goals / hard do-nots

- Do NOT restyle/redesign the existing look (palette, type, frames, split, transition, portrait). Functionality only.
- Do NOT make a light/paper palette the default (rejected 2026-06-02). It may exist as a `theme` option.
- Do NOT change résumé/about wording or invent facts.
- Do NOT use proportional fonts for body text.
- Do NOT touch `main` or `redesign/v2` directly — only `auto/v2-build`.

## Guardrails / stop conditions

- Commit every change atomically; keep `type-check` + `build` green at each commit.
- Verify each feature in-browser (screenshot + console) before ticking its box.
- If blocked on an item after ~3 honest attempts, note it in `PROGRESS.md` and move on.
- End with a summary + screenshots in `PROGRESS.md`.
