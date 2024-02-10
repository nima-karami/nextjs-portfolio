import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn: (...args: string[]) => string = (...args) => {
  return clsx(twMerge(args));
};

export default cn;
