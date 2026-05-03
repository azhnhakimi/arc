import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, useEffect, useState } from "react";
import { ThemeContext, ThemeName } from "./ThemeContext";
import { themes } from "./theme";

const STORAGE_KEY = "APP_THEME";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>("light");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(STORAGE_KEY);

        if (savedTheme) {
          setThemeName(savedTheme as ThemeName);
        }
      } catch (e) {
        console.log("Failed to load theme", e);
      } finally {
        setIsLoaded(true);
      }
    };

    loadTheme();
  }, []);

  const setTheme = async (name: ThemeName) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, name);
      setThemeName(name);
    } catch (e) {
      console.log("Failed to save theme", e);
    }
  };

  const theme = themes[themeName];

  if (!isLoaded) return null;

  return (
    <ThemeContext.Provider value={{ theme, themeName, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
