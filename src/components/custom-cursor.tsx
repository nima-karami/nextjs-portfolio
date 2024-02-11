import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import clsx from 'clsx';
import { motion } from 'framer-motion';

import { Theme, useTheme } from '@/contexts/theme-context';
import cn from '@/util/cn';

type ThemeStyles = {
  [key in Theme]: string;
};
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [hover, setHover] = useState(false);
  const router = useRouter();

  const { theme } = useTheme();
  const styles: ThemeStyles = {
    light: 'border-white',
    dark: 'border-black',
    candy: 'border-teal-500',
  };

  const onMouseMove = (event: MouseEvent) => {
    setPosition({ x: event.clientX, y: event.clientY });
  };

  const onMouseEnter = () => {
    console.log('enter');
    setHidden(false);
    setHover(true);
  };

  const onMouseLeave = () => {
    console.log('leave');
    setHidden(true);
    setHover(false);
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

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

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
      }}
    />
  );
};

export default CustomCursor;
