import { Theme, useTheme } from '@/contexts/theme-context';
import cn from '@/util/cn';

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

  return (
    <div
      className={cn(
        'fixed inset-0 -z-[999] transition-all duration-500',
        styles[theme]
      )}
    />
  );
};

export default DynamicBg;
