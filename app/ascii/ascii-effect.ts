import { wrapEffect } from '@react-three/postprocessing';
import { Effect, EffectAttribute } from 'postprocessing';
import { Color, Uniform } from 'three';

import { buildGlyphAtlas } from './glyph-atlas';

// Post pass: split the rendered frame into character cells, read each cell's
// luminance, and stamp the matching glyph from the atlas. CONVOLUTION lets us
// sample inputBuffer away from the current fragment (at the cell center).
const fragment = /* glsl */ `
  uniform sampler2D uGlyphs;
  uniform float uColumns;
  uniform float uRows;
  uniform float uCharCount;
  uniform vec3 uColor;
  uniform vec3 uBg;

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 cells = vec2(uColumns, uRows);
    vec2 cell = floor(uv * cells);
    vec2 center = (cell + 0.5) / cells;

    vec3 scene = texture(inputBuffer, center).rgb;
    float lum = clamp(dot(scene, vec3(0.299, 0.587, 0.114)), 0.0, 1.0);
    float idx = floor(lum * (uCharCount - 0.001));

    vec2 local = fract(uv * cells);
    vec2 g = vec2((idx + local.x) / uCharCount, local.y);
    float mask = texture(uGlyphs, g).r;

    outputColor = vec4(mix(uBg, uColor, mask), 1.0);
  }
`;

type AsciiOptions = {
  columns?: number;
  color?: string;
  background?: string;
};

class AsciiEffectImpl extends Effect {
  constructor({
    columns = 110,
    color = '#59c2ff',
    background = '#0a0e14',
  }: AsciiOptions = {}) {
    const { texture, count } = buildGlyphAtlas();
    super('AsciiEffect', fragment, {
      attributes: EffectAttribute.CONVOLUTION,
      uniforms: new Map<string, Uniform>([
        ['uGlyphs', new Uniform(texture)],
        ['uColumns', new Uniform(columns)],
        ['uRows', new Uniform(columns)],
        ['uCharCount', new Uniform(count)],
        ['uColor', new Uniform(new Color(color))],
        ['uBg', new Uniform(new Color(background))],
      ]),
    });
  }

  // Keep cells square by deriving the row count from the viewport aspect.
  override setSize(width: number, height: number) {
    const columns = this.uniforms.get('uColumns')!.value as number;
    this.uniforms.get('uRows')!.value = Math.max(
      1,
      Math.round((columns * height) / width)
    );
  }
}

export const AsciiEffect = wrapEffect(AsciiEffectImpl);
