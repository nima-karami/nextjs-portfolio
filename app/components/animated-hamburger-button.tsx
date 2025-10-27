'use client';

import { useEffect, useRef } from 'react';

import Lottie, { LottieRefCurrentProps } from 'lottie-react';

import menuAnimation from '@/public/lottie/menu.json';

type LottieButtonProps = {
  isMenuOpen: boolean;
  onClick?: () => void;
  className?: string;
};

function AnimatedHamburgerButton({
  isMenuOpen,
  onClick,
  className,
}: LottieButtonProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    lottieRef.current?.stop();
    if (isMenuOpen) {
      lottieRef.current?.playSegments([0, 60], true);
    } else {
      lottieRef.current?.playSegments([60, 120], true);
    }
  }, [isMenuOpen]);

  return (
    <button onClick={onClick} className={className} aria-label="Toggle Menu">
      <Lottie
        lottieRef={lottieRef}
        animationData={menuAnimation}
        loop={false}
        autoplay={false}
      />
    </button>
  );
}

export default AnimatedHamburgerButton;
