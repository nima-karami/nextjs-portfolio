import { Theme, useTheme } from '@/contexts/theme-context';
import cn from '@/util/cn';

import BackgroundWave from './background-wave';
import Background_1 from './gradient-bg';
import GradientBg from './gradient-bg';

type ThemeStyles = {
  [key in Theme]: string;
};

const DynamicBg: React.FC = () => {
  const { theme } = useTheme();
  const styles: ThemeStyles = {
    light: 'bg-gradient-to-b from-slate-100 via-slate-200 to-slate-100',
    dark: 'bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900',
    candy: 'bg-gradient-to-b from-teal-500 via-teal-400 to-teal-500',
  };

  const backgrounds: { [key in Theme]: React.ReactNode } = {
    light: <GradientBg />,
    dark: <Background_1 />,
    candy: <Background_1 />,
  };

  return (
    <div
      className={cn(
        'fixed inset-0 -z-[999] transition-all duration-500',
        styles[theme]
      )}
    >
      {backgrounds[theme]}
    </div>
  );
};

export default DynamicBg;
