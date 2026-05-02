import { ReactNode, useState } from "react";
import { ThemeContext, ThemeName } from "./ThemeContext";
import { themes } from "./theme";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>("light");

  const setTheme = (name: ThemeName) => {
    setThemeName(name);
  };

  const theme = themes[themeName];

  return (
    <ThemeContext.Provider value={{ theme, themeName, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
