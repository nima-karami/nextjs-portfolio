# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal portfolio for Nima Karami built as a **terminal / TUI experience**: visitors
type commands to reveal content, with a live ASCII-art renderer and playable retro games
filling the other half of the screen. Single-page client app; Next.js is the build/SSG/SEO
layer, not a router. Branch `redesign/v2` is the active rebuild (`main` is the old site).

## Commands

```bash
npm run dev          # Next dev server with Turbopack (http://localhost:3000)
npm run build        # production build — also the real gate for the R3F/lazy-chunk split
npm run type-check   # tsc --noEmit
npm run lint         # eslint (next core-web-vitals + the React Compiler plugin)
npm run format       # prettier --write . (import sorting + tailwind class sorting)
```

There is **no test runner** in this project — verification is `type-check` + `lint` + `build`,
then visual checking on the dev server. Do not add a test framework unasked.

The lint config runs the **React Compiler ESLint rules**, which are strict and the most common
source of failures here (see "React Compiler constraints" below). Always run `lint` before
considering work done.

## Big-picture architecture

The whole app is one client experience mounted from `app/page.tsx`, which renders
`<SeoContent/>` (server-rendered, screen-reader-only résumé for SEO/crawlers) alongside
`<ShellProvider><Experience/></ShellProvider>`. The runtime splits into four cooperating
subsystems:

### 1. Shell state — the spine (`app/shell/`)
`ShellProvider` (`shell-context.tsx`) holds the single source of truth: the **stage** (what
the right panel shows), the **theme**, and **sound** on/off. It exposes `ShellControls`
(`shell/types.ts`) via `useShell()`. Everything else reads/drives state through this.

- `Stage = { kind: 'scene'; scene } | { kind: 'game'; game }` — drives the right panel.
- Theme is applied by setting `document.documentElement.dataset.theme`; CSS does the rest
  (see Theming). Sound is muted by default; `playSound` is a no-op unless enabled.
- `experience.tsx` owns the **boot → split** layout: pre-enter the portrait fills the frame
  with an intro overlay; the first key/pointer event flips `entered` and the CSS grid splits
  (terminal left, panel right on desktop; stacked on mobile). The split uses
  `transition: grid-template-* steps(16)` so it snaps column-by-column like a redrawing
  terminal instead of gliding — keep that stepped feel if you touch it.

### 2. Terminal engine (`app/terminal/`)
`useTerminal()` (`use-terminal.tsx`) owns the scrollback buffer and history, parses input
(`name args...`), fires a PostHog `command_run` event, and dispatches to the command registry.
Commands are the extension point:

- A `Command` is `{ name, description, usage?, hidden?, run(ctx) }` (`commands/registry.ts`).
- `run` receives `CommandContext`: `args`, `print(node)` (append a ReactNode to output),
  `clear`, the `registry`, and **`shell`** (the `ShellControls` above — this is how a command
  changes the panel/theme/sound, e.g. `snake` calls `ctx.shell.setStage({kind:'game',game:'snake'})`).
- **To add a command:** create `commands/<name>.tsx` exporting a default `Command`, then
  register it in `commands/index.ts`. Mark `hidden: true` for easter eggs. Content commands
  (`resume`, `projects`, …) read from `app/data/*`. `ls`/`cat` read a virtual filesystem in
  `commands/fs.ts`. Output is rich JSX, styled with the `text-term-*` utilities — never
  hardcode colors.

### 3. ASCII renderer (`app/ascii/`)
The right panel's centerpiece, lazy-loaded client-only (`right-panel.tsx` dynamic-imports it
with `ssr:false` so `three`/R3F stay out of the base bundle). An R3F `<Canvas>` renders a 3D
scene, then a **custom post-processing Effect** (`ascii-effect.ts`) asciifies it: the GLSL pass
splits the frame into character cells, reads each cell's luminance, and stamps the matching
glyph from a canvas-built atlas (`glyph-atlas.ts`). It uses `EffectAttribute.CONVOLUTION` to
sample `inputBuffer` at the cell center, and derives `uRows` from the viewport aspect to keep
cells square. `ascii-canvas.tsx` picks the active scene and computes `columns` so cells read at
roughly the terminal's character size. Scenes live in `ascii/scenes/` (`portrait`, `skull` from
a CC0 `.glb` in `public/models/`, `torus`). `matrix` is a separate 2D-canvas effect
(`matrix-rain.tsx`), not an R3F scene — `right-panel.tsx` branches to it specially.

### 4. Games (`app/games/`)
Character-grid games (`snake`, `invaders`, `pong`) rendered by writing strings to a `<pre>`'s
`textContent` on each `requestAnimationFrame` tick (`use-raf.ts`) — not React re-renders.
Key design points:

- `game-panel.tsx` measures its container with a **callback ref** (not an effect — see React
  Compiler constraints) and computes `cols`/`rows` so the **board fills the panel at the
  terminal character size** (more cells, not bigger glyphs). Games receive `cols`/`rows` props
  and derive `W = cols - 2; H = rows - 2`.
- `game-screen.tsx` exports `GAME_FONT`/`GAME_CHAR_W`/`GAME_LINE_H` — the shared metrics that
  keep games the same character size as the terminal and ASCII panels. Changing the font there
  changes the whole cohesion story.
- Borders are **ASCII `+ - |` only**. Box-drawing glyphs (`─│┌`) are NOT in JetBrains Mono and
  fall back to a wider font, which misaligns the grid — do not use them.

## Theming (important, non-obvious)

Colors are **never** hardcoded. Tailwind v4 `@theme` tokens in `app/globals.css` define
`--color-term-bg/fg/dim/accent/green/amber/red/selection`, exposed as `text-term-*` /
`bg-term-*` utilities. The `theme` command sets `html[data-theme]`, and `globals.css` overrides
those same tokens per theme (`dark`, `crt-green`, `crt-amber`, `paper`), so every utility recolors
automatically. CRT themes add a pure-CSS scanline/glow overlay (`.crt-overlay`, gated by
`prefers-reduced-motion`). When adding UI, use the `term-*` utilities and it will theme for free.

## React Compiler constraints (the #1 cause of lint failures)

The React Compiler ESLint plugin is enabled and strict. Patterns it rejects, with the fixes
used throughout this codebase:

- **No `setState` synchronously inside a mount effect.** Split ref-only init (callable from an
  effect) from state-setting reset (callable from a handler), or measure via a **callback ref**
  instead of `useEffect` (see `game-panel.tsx`).
- **No mutating a `for...of` loop variable's properties** (e.g. `for (const b of shots) b.y--`).
  Rebuild arrays immutably instead (`invaders.tsx` pushes into `nextShots`).
- **No writing a ref during render.** Assign `ref.current` inside an effect (see `use-raf.ts`).

When in doubt, mirror an existing game/scene rather than inventing a new pattern.

## Project structure rules

Code is organized by **feature folder under `app/`** — things that change together live
together. Keep it that way; the rules below are how both humans and agents decide where new
code goes. When unsure, the answer is almost always "the existing folder that owns this
concern," not a new folder.

### Where things go (each folder owns one concern)

| Folder | Owns | Add here when… |
| --- | --- | --- |
| `app/shell/` | Global state (`ShellProvider`), the boot→split layout, status line, CRT/frame chrome | You're touching app-wide state, the stage/theme/sound surface, or the overall layout |
| `app/terminal/` | The terminal engine, input/output, history | You're changing how input is parsed, rendered, or dispatched |
| `app/terminal/commands/` | One file per command | You're adding or editing a command (the main extension point) |
| `app/ascii/` | The R3F canvas + ASCII post-pass + glyph atlas; `scenes/` holds individual scenes | You're adding a scene or touching the renderer |
| `app/games/` | The character-grid games and their shared screen/metrics/rAF helpers | You're adding or editing a game |
| `app/data/` | Plain content data (profile, experience, projects, skills, socials) | You're changing portfolio *content* — never mix data into components |
| `app/util/` | Cross-feature helpers (`cn`, analytics, generic hooks) | A helper is used by **two or more** features. Single-feature helpers stay in that feature |

### Rules for adding code

- **Pick the owning folder, don't invent one.** A new top-level folder under `app/` needs a
  genuinely new concern (a new panel mode, a new subsystem) — not just a new file. If you think
  you need one, say why first.
- **Co-locate by feature.** A feature's component, its hook, and its types live in the same
  folder (e.g. games keep `use-raf.ts`, `types.ts`, `game-screen.tsx` together). Don't scatter
  a feature across `util/` or a global types file.
- **Shared only when actually shared.** Promote a helper/type to `app/util/` or a feature's
  `types.ts` only once a second caller exists. Don't pre-generalize.
- **One unit per file, named for the unit.** Commands export a single default `Command`
  (`commands/<name>.tsx`); scenes a single default scene component (`scenes/<name>.tsx`); games
  a single default component (`games/<name>.tsx`). Filenames are `kebab-case`. The registry/
  index files (`commands/index.ts`) are the *only* place that wires units together.
- **Content lives in `app/data/`, behavior reads it.** Commands and components import from
  `app/data/*`; never hardcode résumé/profile text inline.
- **Registration is explicit.** New command → also add it to `commands/index.ts`. New scene/game
  → also add it to the `SceneName`/`GameName` union in `shell/types.ts` and the relevant
  `SCENES`/`GAMES` map. Adding the file alone does nothing.

## Conventions & hygiene

- **`'use client'`** on anything interactive; keep `three`/R3F and games behind the lazy dynamic
  imports in `right-panel.tsx` so the base bundle stays small (the `build` output is the check).
- **Imports** are auto-sorted by prettier (`@trivago/prettier-plugin-sort-imports`); run
  `npm run format` rather than hand-ordering.
- **No scratch artifacts in the repo.** Screenshots, logs, scratch scripts → OS temp, never the
  tree. Agent working docs (plans/goals/logs) belong under `.claude/` (gitignored), not committed.
  Run `git status` before any commit and confirm only intended files are staged.
- Résumé/profile wording in `app/data/*` is treated as **verbatim** — don't paraphrase content.
