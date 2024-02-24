import { useTheme } from '@/contexts/theme-context';
import cn from '@/util/cn';
import { Theme, ThemeStyles } from '@/util/types';

import GradientBg from './gradient-bg';
import MovingStripesBg from './moving-stripes-bg';

const DynamicBg: React.FC = () => {
  const { theme } = useTheme();
  const styles: ThemeStyles = {
    light: 'bg-gradient-to-b from-slate-100 via-slate-200 to-slate-100',
    dark: 'bg-neutral-900',
    candy: 'bg-gradient-to-b from-teal-100 via-teal-200 to-teal-100',
    stripes: 'bg-transparent',
  };

  return (
    <div
      className={cn(
        'fixed inset-0 -z-[999] transition-all duration-500',
        styles[theme]
      )}
    >
      {theme !== Theme.Stripes && backgrounds[theme]}

      <MovingStripesBg isVisible={theme === Theme.Stripes} />
    </div>
  );
};

export default DynamicBg;

const backgrounds: { [key in Theme]: React.ReactNode } = {
  light: <GradientBg />,
  dark: <GradientBg />,
  candy: <GradientBg />,
  stripes: null,
};
