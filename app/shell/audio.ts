// Tiny chiptune engine — synthesized blips via Web Audio, no asset files. The
// AudioContext is created lazily on first play (after a user gesture, since
// sound only turns on via the `sound on` command).
import type { SoundName } from './types';

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  return ctx;
}

type Tone = {
  freq: number;
  dur: number;
  type?: OscillatorType;
  vol?: number;
  sweep?: number; // Hz to ramp toward over the duration
};

const SOUNDS: Record<SoundName, Tone> = {
  move: { freq: 180, dur: 0.04, type: 'square', vol: 0.04 },
  shoot: { freq: 720, dur: 0.09, type: 'square', vol: 0.05, sweep: -360 },
  hit: { freq: 150, dur: 0.12, type: 'sawtooth', vol: 0.07, sweep: -70 },
  score: { freq: 740, dur: 0.1, type: 'square', vol: 0.06, sweep: 240 },
  die: { freq: 220, dur: 0.45, type: 'sawtooth', vol: 0.08, sweep: -180 },
  key: { freq: 1300, dur: 0.012, type: 'square', vol: 0.015 },
  select: { freq: 520, dur: 0.05, type: 'square', vol: 0.05 },
};

export function playTone(name: SoundName) {
  const ac = getCtx();
  if (!ac) return;
  if (ac.state === 'suspended') void ac.resume();

  const t = SOUNDS[name];
  const now = ac.currentTime;
  const osc = ac.createOscillator();
  const gain = ac.createGain();

  osc.type = t.type ?? 'square';
  osc.frequency.setValueAtTime(t.freq, now);
  if (t.sweep) {
    osc.frequency.linearRampToValueAtTime(
      Math.max(40, t.freq + t.sweep),
      now + t.dur
    );
  }
  gain.gain.setValueAtTime(t.vol ?? 0.05, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + t.dur);

  osc.connect(gain).connect(ac.destination);
  osc.start(now);
  osc.stop(now + t.dur);
}
