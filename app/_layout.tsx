import { ThemeProvider } from "@/theme/ThemeProvider";
import { useTheme } from "@/theme/useTheme";
import { getStatusBarStyle } from "@/utils/statusbar";
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Slot, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    if (fontsLoaded && themeLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, themeLoaded]);

  return (
    <ThemeProvider onLoaded={() => setThemeLoaded(true)}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppContent />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

function AppContent() {
  const { theme } = useTheme();
  const statusBarStyle = getStatusBarStyle(theme.background);

  return (
    <>
      <Slot />
      <StatusBar style={statusBarStyle} />
    </>
  );
}
