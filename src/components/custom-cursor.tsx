import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { motion } from 'framer-motion';

import { useTheme } from '@/contexts/theme-context';
import cn from '@/util/cn';
import { ThemeStyles } from '@/util/types';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [hover, setHover] = useState(false);
  const router = useRouter();

  const { theme } = useTheme();
  const styles: ThemeStyles = {
    light: 'border-white',
    dark: 'border-teal-500',
    candy: 'border-teal-800',
    stripes: 'border-white',
  };

  const onMouseMove = (event: MouseEvent) => {
    setPosition({ x: event.clientX, y: event.clientY });
    if (hidden) setHidden(false);
  };

  const onMouseEnter = () => {
    console.log('enter');
    setHidden(false);
    setHover(true);
  };

  const onMouseLeave = () => {
    console.log('leave');
    setHidden(false);
    setHover(false);
  };

  const onTouchStart = (event: TouchEvent) => {
    console.log('touch');
    setPosition({ x: event.touches[0].clientX, y: event.touches[0].clientY });
    setHidden(false);
  };

  const onTouchEnd = () => {
    console.log('touch end');
    if (!hidden) setHidden(true);
    if (hover) setHover(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.querySelectorAll('a, button').forEach(
      (el) => {
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
        el.classList.add('cursor-none');
      },
      [router.route]
    );

    document
      .querySelector('html')
      ?.classList.add('cursor-none', 'overflow-hidden');

    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchend', onTouchEnd);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.querySelectorAll('a, button').forEach(
        (el) => {
          el.removeEventListener('mouseenter', onMouseEnter);
          el.removeEventListener('mouseleave', onMouseLeave);
          el.classList.remove('cursor-none');
        },
        [router.route]
      );
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [theme, router.route]);

  return (
    <motion.div
      id="custom-cursor"
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute z-[999] rounded-full border-2  bg-transparent shadow-lg ',
        styles[theme]
      )}
      style={{
        translateX: '-50%',
        translateY: '-50%',
        x: position.x,
        y: position.y,
      }}
      animate={{
        width: hover ? 40 : 20,
        height: hover ? 40 : 20,
        opacity: hidden ? 0 : 1,
      }}
    />
  );
};

export default CustomCursor;
