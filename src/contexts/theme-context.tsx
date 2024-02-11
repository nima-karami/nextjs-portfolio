import { PropsWithChildren, createContext, useContext } from 'react';

import useLocalStorage from 'use-local-storage';

type ThemeContextType = {
  theme: Theme;
  handleThemeChange: (theme: Theme) => void;
};

export type Theme = 'light' | 'dark' | 'candy';

const ThemeContext = createContext({} as ThemeContextType);

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');
  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, handleThemeChange }}>
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
