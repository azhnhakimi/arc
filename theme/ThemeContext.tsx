import { createContext } from "react";
import { themes } from "./theme";

export type ThemeName = keyof typeof themes;

type ThemeContextType = {
  theme: typeof themes.light;
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
