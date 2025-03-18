import { useEffect, useRef, useState } from 'react';

import { motion } from 'framer-motion';

import cn from '@/util/cn';

interface ScrollShadowProps {
  children: React.ReactNode;
  className?: string;
  shadowSize?: 'sm' | 'md' | 'lg';
  direction?: 'horizontal' | 'vertical' | 'both';
}

/**
 * A container component that adds a shadow to indicate scrollable content
 *
 * @param children - The content to be scrollable
 * @param className - Additional classes for the container
 * @param shadowSize - Size of the shadow effect (default: 'md')
 * @param direction - Direction of the scroll shadow effect (default: 'vertical')
 */
const ScrollShadow: React.FC<ScrollShadowProps> = ({
  children,
  className,
  shadowSize = 'md',
  direction = 'vertical',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(false);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);

  const shadowSizes = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-8',
  };

  const checkScroll = () => {
    if (!containerRef.current) return;

    const {
      scrollTop,
      scrollHeight,
      clientHeight,
      scrollLeft,
      scrollWidth,
      clientWidth,
    } = containerRef.current;

    // Vertical scroll detection
    if (direction === 'vertical' || direction === 'both') {
      setShowTopShadow(scrollTop > 10);
      setShowBottomShadow(scrollHeight - scrollTop - clientHeight > 10);
    }

    // Horizontal scroll detection
    if (direction === 'horizontal' || direction === 'both') {
      setShowLeftShadow(scrollLeft > 10);
      setShowRightShadow(scrollWidth - scrollLeft - clientWidth > 10);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      checkScroll();
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);

      // Check once after a short delay to account for content loading
      const timer = setTimeout(checkScroll, 100);

      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
        clearTimeout(timer);
      };
    }
  }, []);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Top shadow */}
      {(direction === 'vertical' || direction === 'both') && (
        <motion.div
          className={cn(
            'from-background pointer-events-none absolute left-0 right-0 top-0 z-10 w-full bg-gradient-to-b to-transparent',
            shadowSizes[shadowSize]
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: showTopShadow ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Bottom shadow */}
      {(direction === 'vertical' || direction === 'both') && (
        <motion.div
          className={cn(
            'from-background pointer-events-none absolute bottom-0 left-0 right-0 z-10 w-full bg-gradient-to-t to-transparent',
            shadowSizes[shadowSize]
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: showBottomShadow ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Left shadow */}
      {(direction === 'horizontal' || direction === 'both') && (
        <motion.div
          className={cn(
            'from-background pointer-events-none absolute bottom-0 left-0 top-0 z-10 h-full w-4 bg-gradient-to-r to-transparent'
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: showLeftShadow ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Right shadow */}
      {(direction === 'horizontal' || direction === 'both') && (
        <motion.div
          className={cn(
            'from-background pointer-events-none absolute bottom-0 right-0 top-0 z-10 h-full w-4 bg-gradient-to-l to-transparent'
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: showRightShadow ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Scrollable content */}
      <div
        ref={containerRef}
        className={cn(
          'h-full w-full overflow-auto',
          direction === 'horizontal' ? 'overflow-y-hidden' : '',
          direction === 'vertical' ? 'overflow-x-hidden' : ''
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default ScrollShadow;
