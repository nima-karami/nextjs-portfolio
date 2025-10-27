import React, { JSX } from 'react';

import cn from '../util/cn';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

function Container({ children, className = '', as = 'div' }: ContainerProps) {
  const Component = as;
  return (
    <Component
      className={cn(
        'border-secondary mx-auto md:max-w-4xl md:border-r md:border-l lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl',
        className
      )}
    >
      {children}
    </Component>
  );
}

export default Container;
