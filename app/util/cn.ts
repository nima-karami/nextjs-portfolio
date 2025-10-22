import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn: (...args: (string | boolean | undefined)[]) => string = (...args) => {
  return twMerge(clsx(args));
};

export default cn;
