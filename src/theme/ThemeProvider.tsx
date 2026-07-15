import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import getTheme from "../mui/theme";
import { getItem, storeItem } from "../services/secureLocalStorage";

type ThemeMode = "light" | "dark";

type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
};

const THEME_STORAGE_KEY = "themeMode";
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const isThemeMode = (value: unknown): value is ThemeMode => {
  return value === "light" || value === "dark";
};

const getSystemMode = (): ThemeMode => {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const hasStoredMode = (): boolean => isThemeMode(getItem(THEME_STORAGE_KEY));

// First-visit default follows the OS preference; an explicit choice (once stored) wins.
const readStoredMode = (): ThemeMode => {
  const storedMode = getItem(THEME_STORAGE_KEY);
  return isThemeMode(storedMode) ? storedMode : getSystemMode();
};

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setModeState] = useState<ThemeMode>(readStoredMode);

  const setMode = useCallback((nextMode: ThemeMode) => {
    setModeState(nextMode);
    storeItem(THEME_STORAGE_KEY, nextMode);
  }, []);

  const toggleMode = useCallback(() => {
    setMode(mode === "light" ? "dark" : "light");
  }, [mode, setMode]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", mode === "dark");
    root.dataset.theme = mode;
  }, [mode]);

  // Follow OS changes only while the user has not made an explicit choice.
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
    }
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (!hasStoredMode()) {
        setModeState(event.matches ? "dark" : "light");
      }
    };
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  const contextValue = useMemo(
    () => ({
      mode,
      setMode,
      toggleMode,
    }),
    [mode, setMode, toggleMode],
  );

  const muiTheme = useMemo(() => getTheme(mode, toggleMode), [mode, toggleMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used inside AppThemeProvider");
  }

  return context;
};
