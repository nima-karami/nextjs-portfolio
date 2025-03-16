import React from 'react';

import { motion } from 'framer-motion';

import { useTheme } from '@/contexts/theme-context';
import cn from '@/util/cn';
import { ThemeStyles } from '@/util/types';

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
    light:
      'border-slate-200 bg-slate-50/20 group-hover:bg-slate-50 text-slate-400',
    dark: 'border-neutral-800 bg-neutral-900/80 group-hover:bg-neutral-900 text-neutral-200',
    candy: 'border-teal-50 bg-slate-50/20',
    stripes: `backdrop-blur-sm border-white bg-transparent text-white/80 group-hover:bg-black/80 `,
  };

  const shimmerStyles: ThemeStyles = {
    light: 'bg-gradient-to-br from-slate-50 to-slate-100',
    dark: 'bg-gradient-to-br from-neutral-800 to-neutral-900',
    candy: 'bg-gradient-to-br from-teal-50 via-teal-200/0 to-teal-50 ',
    stripes: 'bg-transparent ',
  };

  return (
    <div
      id="shimmer-card"
      className={cn(
        ' group relative w-full overflow-hidden rounded-lg p-0.5 transition-all duration-500',
        scaleOnHover ? 'hover:scale-[1.01]' : '',
        shimmerStyles[theme]
      )}
    >
      <div
        className={cn(
          'relative z-10 flex flex-col items-center justify-center overflow-hidden rounded-[7px] border border-slate-200 p-8 backdrop-blur-2xl transition-colors duration-500 ',
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
        className={cn(
          'absolute inset-0 z-0 bg-gradient-to-br  opacity-0 transition-opacity duration-500 group-hover:opacity-100',
          shimmerStyles[theme]
        )}
      />
    </div>
  );
};

export default ShimmerBorderCard;
