import { useState, useMemo } from 'react';
import { createTheme, Theme } from '@mui/material';

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme: Theme = useMemo(() =>
    createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
      },
    }),
    [darkMode]
  );

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return { darkMode, theme, toggleDarkMode };
};