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

export default function RightPanel({
  entered,
  reduced,
}: {
  entered: boolean;
  reduced: boolean;
}) {
  const { stage } = useShell();
  const isGame = stage.kind === 'game';

  return (
    <div className="relative h-full w-full" aria-hidden={isGame ? undefined : true}>
      {isGame ? (
        <GamePanel game={stage.game} />
      ) : (
        <AsciiCanvas scene={stage.scene} />
      )}
      {!entered && <IntroOverlay reduced={reduced} />}
    </div>
  );
}
