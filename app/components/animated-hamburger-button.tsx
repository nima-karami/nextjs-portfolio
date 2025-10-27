'use client';

import { useEffect, useRef, useState } from 'react';

import Lottie, { LottieRefCurrentProps } from 'lottie-react';

type LottieButtonProps = {
  isMenuOpen: boolean;
  onClick?: () => void;
  className?: string;
};

const ANIMATION_URL = '/lottie/menu.json';

function AnimatedHamburgerButton({
  isMenuOpen,
  onClick,
  className,
}: LottieButtonProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animationJSON, setAnimationJSON] = useState<unknown>(null);

  useEffect(() => {
    lottieRef.current?.stop();
    if (isMenuOpen) {
      lottieRef.current?.playSegments([0, 60], true);
    } else {
      lottieRef.current?.playSegments([60, 120], true);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    fetch(ANIMATION_URL)
      .then((res) => res.json())
      .then((data) => setAnimationJSON(data))
      .catch((err) => console.error('Failed to load animation:', err));
  }, []);

  if (!animationJSON) return null;

  return (
    <button onClick={onClick} className={className} aria-label="Toggle Menu">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationJSON}
        loop={false}
        autoplay={false}
      />
    </button>
  );
}

export default AnimatedHamburgerButton;
