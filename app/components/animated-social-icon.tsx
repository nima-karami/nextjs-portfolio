'use client';

import { useRef } from 'react';

import Lottie, { LottieRefCurrentProps } from 'lottie-react';

import cn from '../util/cn';

interface AnimatedSocialIconProps {
  animationData: unknown;
  className?: string;
}

function AnimatedSocialIcon({
  animationData,
  className,
}: AnimatedSocialIconProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const handleMouseEnter = () => {
    lottieRef.current?.play();
  };

  const handleMouseLeave = () => {
    lottieRef.current?.stop();
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'flex h-full w-full items-center justify-center',
        className
      )}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={true}
        autoplay={false}
      />
    </div>
  );
}

export default AnimatedSocialIcon;
