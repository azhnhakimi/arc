import { ReactNode, useState } from "react";
import { createMMKV } from "react-native-mmkv";
import { ThemeContext, ThemeName } from "./ThemeContext";
import { themes } from "./theme";

const storage = createMMKV();
const STORAGE_KEY = "APP_THEME";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const saved = storage.getString(STORAGE_KEY) as ThemeName | undefined;
  const [themeName, setThemeName] = useState<ThemeName>(saved ?? "light");

  const setTheme = (name: ThemeName) => {
    storage.set(STORAGE_KEY, name);
    setThemeName(name);
  };

  return (
    <ThemeContext.Provider
      value={{ theme: themes[themeName], themeName, setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
