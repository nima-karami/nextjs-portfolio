import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/router';

import useLocalStorage from 'use-local-storage';

import { Theme, ThemeType } from '@/util/types';

type ThemeContextType = {
  theme: ThemeType;
  handleThemeChange: (theme: Theme) => void;
  handleNextTheme: () => void;
  handleResetTheme: () => void;
  handleToggleAutoplayTheme: () => void;
  autoplay: boolean;
};

const ThemeContext = createContext({} as ThemeContextType);

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(Theme.Light);
  const [autoplay, setAutoplay] = useLocalStorage<boolean>('autoplay', true);

  const router = useRouter();
  const handleThemeChange = (theme: ThemeType) => {
    setTheme(theme);
  };

  const handleNextTheme = () => {
    const themes = [Theme.Dark, Theme.Light, Theme.Stripes];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const handleResetTheme = () => {
    setTheme(Theme.Light);
  };

  const handleToggleAutoplayTheme = () => {
    setAutoplay(!autoplay);
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        handleNextTheme();
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [autoplay, theme]);

  useEffect(() => {
    if (router.pathname === '/') {
      setAutoplay(true);
    } else {
      setAutoplay(false);
    }
  }, [router.pathname]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        handleThemeChange,
        handleNextTheme,
        handleResetTheme,
        handleToggleAutoplayTheme,
        autoplay,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { ThemeProvider, useTheme };
