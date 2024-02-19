import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/router';

import useLocalStorage from 'use-local-storage';

import { Theme } from '@/util/types';

type ThemeContextType = {
  theme: Theme;
  handleThemeChange: (theme: Theme) => void;
  handleNextTheme: () => void;
  handleResetTheme: () => void;
  handleToggleAutoplayTheme: () => void;
  autoplay: boolean;
};

const ThemeContext = createContext({} as ThemeContextType);

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Theme.Light);
  const [autoplay, setAutoplay] = useLocalStorage<boolean>('autoplay', true);
  const router = useRouter();
  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
  };

  const handleNextTheme = () => {
    const themes = [Theme.Light, Theme.Dark, Theme.Candy];
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
      }, 5000);
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
