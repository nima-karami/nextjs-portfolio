import { PropsWithChildren, createContext, useContext, useEffect } from 'react';

import useLocalStorage from 'use-local-storage';

type ThemeContextType = {
  theme: Theme;
  handleThemeChange: (theme: Theme) => void;
  handleNextTheme: () => void;
  handleResetTheme: () => void;
  handleToggleAutoplayTheme: () => void;
  autoplay: boolean;
};

export enum Theme {
  Light = 'light',
  Dark = 'dark',
  Candy = 'candy',
}

const ThemeContext = createContext({} as ThemeContextType);

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', Theme.Light);
  const [autoplay, setAutoplay] = useLocalStorage<boolean>('autoplay', false);

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
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [autoplay, theme]);

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
