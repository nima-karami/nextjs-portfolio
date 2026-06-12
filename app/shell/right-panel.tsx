'use client';

import dynamic from 'next/dynamic';

import IntroOverlay from './intro-overlay';
import { useShell } from './shell-context';

// Both heavy: the R3F canvas and the games are client-only + lazy.
const AsciiCanvas = dynamic(() => import('../ascii/ascii-canvas'), {
  ssr: false,
  loading: () => null,
});
const GamePanel = dynamic(() => import('../games/game-panel'), {
  ssr: false,
  loading: () => null,
});
const MatrixRain = dynamic(() => import('../ascii/matrix-rain'), {
  ssr: false,
  loading: () => null,
});

export default function RightPanel({
  entered,
  reduced,
}: {
  entered: boolean;
  reduced: boolean;
}) {
  const { stage } = useShell();
  const isGame = stage.kind === 'game';
  // `matrix` is a 2D-canvas effect, not an R3F scene, so it's rendered here
  // rather than through AsciiCanvas's SCENES map.
  const isMatrix = stage.kind === 'scene' && stage.scene === 'matrix';

  return (
    <div
      className="relative h-full w-full"
      aria-hidden={isGame ? undefined : true}
    >
      {isGame ? (
        <GamePanel game={stage.game} />
      ) : isMatrix ? (
        <MatrixRain />
      ) : (
        <AsciiCanvas
          scene={stage.kind === 'scene' ? stage.scene : 'portrait'}
        />
      )}
      {!entered && <IntroOverlay reduced={reduced} />}
    </div>
  );
}
