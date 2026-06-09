// Shared character-grid rendering for the games. Each game builds a 2D grid of
// glyphs, then paints it into its <pre> with an ASCII border. Box-drawing glyphs
// (─│┌) are NOT in JetBrains Mono and misalign the grid — borders are + - | only.

/** A blank `h` x `w` grid of spaces. Index as `grid[y][x]`. */
export function createGrid(w: number, h: number): string[][] {
  return Array.from({ length: h }, () => Array(w).fill(' '));
}

/** Frame the grid with a +/-/| border and write it to the <pre>. */
export function paint(pre: HTMLPreElement | null, grid: string[][]): void {
  if (!pre) return;
  const w = grid[0]?.length ?? 0;
  const edge = '+' + '-'.repeat(w) + '+';
  const body = grid.map((r) => '|' + r.join('') + '|').join('\n');
  pre.textContent = `${edge}\n${body}\n${edge}`;
}
