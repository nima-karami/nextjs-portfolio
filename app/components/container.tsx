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
        'border-secondary container mx-auto border-r border-l',
        className
      )}
    >
      {children}
    </Component>
  );
}

export default Container;
