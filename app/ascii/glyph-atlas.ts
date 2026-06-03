import { CanvasTexture, LinearFilter, type Texture } from 'three';

// Dark -> dense brightness ramp. Index 0 (space) maps to empty cells.
const RAMP = ' .:-=+*#%@';

// Draws the ramp as a horizontal strip of square cells into a canvas texture.
// The ASCII shader indexes into it by luminance.
export function buildGlyphAtlas(cell = 64): { texture: Texture; count: number } {
  const count = RAMP.length;
  const canvas = document.createElement('canvas');
  canvas.width = cell * count;
  canvas.height = cell;

  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  ctx.font = `${Math.floor(cell * 0.95)}px ui-monospace, "JetBrains Mono", monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let i = 0; i < count; i++) {
    ctx.fillText(RAMP[i], i * cell + cell / 2, cell / 2 + cell * 0.04);
  }

  const texture = new CanvasTexture(canvas);
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.generateMipmaps = false;
  return { texture, count };
}
