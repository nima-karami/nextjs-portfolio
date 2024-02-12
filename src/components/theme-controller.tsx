import { PropsWithChildren } from 'react';

import { motion } from 'framer-motion';
import { FaForwardStep, FaRotateLeft } from 'react-icons/fa6';
import { IoPause, IoPlay } from 'react-icons/io5';

import { useTheme } from '@/contexts/theme-context';

import ShimmerBorderCard from './shimmer-border-card';

const ThemeController: React.FC = () => {
  const {
    theme,
    handleNextTheme,
    handleThemeChange,
    handleToggleAutoplayTheme,
    handleResetTheme,
    autoplay,
  } = useTheme();

  return (
    <ShimmerBorderCard className="fixed bottom-4 left-4 flex flex-row justify-between gap-2 p-3">
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
  return (
    <button
      className="rounded-full p-2 text-sm text-slate-400 transition-colors duration-500 hover:bg-white hover:text-slate-800"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
