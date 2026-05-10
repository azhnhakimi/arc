import { ThemeProvider } from "@/theme/ThemeProvider";
import { useTheme } from "@/theme/useTheme";
import { getStatusBarStyle } from "@/utils/statusbar";
import {
  SpaceGrotesk_300Light,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
  useFonts,
} from "@expo-google-fonts/space-grotesk";
import { Slot, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceGrotesk_300Light,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  return (
    <ThemeProvider>
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
