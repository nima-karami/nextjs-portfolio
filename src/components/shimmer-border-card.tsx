import React, { PropsWithChildren, useRef } from 'react';

import clsx from 'clsx';
import { motion } from 'framer-motion';

import cn from '@/util/cn';

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
          'relative z-10 flex flex-col items-center justify-center overflow-hidden rounded-[7px] border border-slate-200 bg-slate-50/50 p-8 backdrop-blur-lg transition-colors duration-500 group-hover:bg-slate-50',
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
