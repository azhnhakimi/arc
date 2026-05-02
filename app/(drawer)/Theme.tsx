import { useTheme } from "@/theme/useTheme";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Theme() {
  const { theme, themeName, setTheme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Theme</Text>

      <View style={{ backgroundColor: theme.accent, height: 200 }}>
        <Text style={{ color: theme.onAccent }}>
          Current Theme: {themeName}
        </Text>
      </View>

      <View style={{ gap: 10 }}>
        <Button title="Light Theme" onPress={() => setTheme("light")} />
        <Button title="Slate Theme" onPress={() => setTheme("slate")} />
        <Button title="Warm Theme" onPress={() => setTheme("dusk")} />
        <Button title="Dark Theme" onPress={() => setTheme("forest")} />
      </View>
    </SafeAreaView>
  );
}
