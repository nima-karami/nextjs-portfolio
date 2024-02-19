import { PropsWithChildren } from 'react';

import { motion } from 'framer-motion';
import { FaForwardStep, FaRotateLeft } from 'react-icons/fa6';
import { IoPause, IoPlay } from 'react-icons/io5';

import { useTheme } from '@/contexts/theme-context';
import cn from '@/util/cn';
import { ThemeStyles } from '@/util/types';

import ShimmerBorderCard from './shimmer-border-card';

const ThemeController: React.FC = () => {
  const {
    theme,
    handleNextTheme,
    handleToggleAutoplayTheme,
    handleResetTheme,
    autoplay,
  } = useTheme();

  return (
    <ShimmerBorderCard className="fixed bottom-4 left-4 flex flex-row justify-between gap-2 p-4 max-sm:bottom-8 max-sm:left-8 max-sm:right-8 max-sm:px-16">
      <ControllerButton onClick={handleToggleAutoplayTheme}>
        {autoplay ? <IoPause /> : <IoPlay />}
      </ControllerButton>
      <ControllerButton onClick={handleNextTheme}>
        <FaForwardStep />
      </ControllerButton>
      <ControllerButton onClick={handleResetTheme}>
        <FaRotateLeft />
      </ControllerButton>
    </ShimmerBorderCard>
  );
};

export default ThemeController;

type ControllerButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};

const ControllerButton: React.FC<ControllerButtonProps> = ({
  children,
  onClick,
}) => {
  const { theme } = useTheme();
  const styles: ThemeStyles = {
    light: 'text-slate-400',
    dark: 'text-neutral-300',
    candy: 'text-teal-500',
  };
  return (
    <button
      className={cn(
        'rounded-full p-2 text-sm transition-colors duration-500 hover:bg-white hover:text-slate-800',
        styles[theme]
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
