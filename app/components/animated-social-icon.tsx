'use client';

import { useEffect, useRef, useState } from 'react';

import Lottie, { LottieRefCurrentProps } from 'lottie-react';

import cn from '../util/cn';

interface AnimatedSocialIconProps {
  animationUrl: string;
  size?: number;
  className?: string;
}

function AnimatedSocialIcon({
  animationUrl,
  size = 40,
  className,
}: AnimatedSocialIconProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animationJSON, setAnimationJSON] = useState<unknown>(null);

  useEffect(() => {
    fetch(animationUrl)
      .then((res) => res.json())
      .then((data) => setAnimationJSON(data))
      .catch((err) => console.error('Failed to load animation:', err));
  }, [animationUrl]);

  const handleMouseEnter = () => {
    lottieRef.current?.play();
  };

  const handleMouseLeave = () => {
    lottieRef.current?.stop();
  };

  if (!animationJSON) return null;

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
        animationData={animationJSON}
        loop={true}
        autoplay={false}
      />
    </div>
  );
}

export default AnimatedSocialIcon;
