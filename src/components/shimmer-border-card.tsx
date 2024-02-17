import React from 'react';

import clsx from 'clsx';
import { motion } from 'framer-motion';

import { Theme, useTheme } from '@/contexts/theme-context';
import cn from '@/util/cn';

type ThemeStyles = {
  [key in Theme]: string;
};

type ShimmerBorderCardProps = {
  children: React.ReactNode;
  scaleOnHover?: boolean;
  className?: string;
};

const ShimmerBorderCard: React.FC<ShimmerBorderCardProps> = ({
  children,
  scaleOnHover = false,
  className = '',
}) => {
  const { theme } = useTheme();
  const styles: ThemeStyles = {
    light: 'border-slate-200 bg-slate-50/20',
    dark: 'border-slate-800 bg-slate-900/30',
    candy: 'border-teal-500 bg-slate-50/20',
  };

  return (
    <div
      id="shimmer-card"
      className={clsx(
        ' group relative w-full overflow-hidden rounded-lg  p-0.5 transition-all duration-500  ',
        scaleOnHover && 'hover:scale-[1.01]'
      )}
    >
      <div
        className={cn(
          'relative z-10 flex flex-col items-center justify-center overflow-hidden rounded-[7px] border border-slate-200  p-8 backdrop-blur-2xl transition-colors duration-500 group-hover:bg-slate-50',
          styles[theme],
          className
        )}
      >
        {children}
      </div>

      <motion.div
        initial={{ rotate: '0deg' }}
        animate={{ rotate: '360deg' }}
        style={{ scale: 1.75 }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: 'linear',
        }}
        className="absolute inset-0 z-0 bg-gradient-to-br from-teal-200 via-teal-200/0 to-teal-200 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
    </div>
  );
};

export default ShimmerBorderCard;
