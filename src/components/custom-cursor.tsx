import React, { useEffect, useState } from 'react';

import clsx from 'clsx';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [hover, setHover] = useState(false);

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
    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
      el.classList.add('cursor-none');
    });

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
      className={clsx(
        'absolute z-[999] w-8 h-8 bg-transparent border-2 border-white rounded-full shadow-lg pointer-events-none '
      )}
      style={{ translateX: -15, translateY: -15, x: position.x, y: position.y }}
      animate={{
        scale: hover ? 2 : 1,
      }}
    />
  );
};

export default CustomCursor;
