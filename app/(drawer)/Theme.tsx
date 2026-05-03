import { fonts } from "@/constants/fonts";
import { themes as themeList } from "@/theme/theme";
import { useTheme } from "@/theme/useTheme";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Theme() {
  const { theme, themeName, setTheme } = useTheme();

  const themeEntries = Object.entries(themeList) as [
    keyof typeof themeList,
    (typeof themeList)[keyof typeof themeList],
  ][];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 12,
          paddingHorizontal: 16,
          gap: 12,
        }}
      >
        <Text style={[styles.headerText, { color: theme.primaryText }]}>
          Theme
        </Text>
        <Text style={[styles.subHeaderText, { color: theme.mutedText }]}>
          Select your preferred theme here.
        </Text>

        <View style={{ gap: 12 }}>
          {themeEntries.map(([name, themeObj]) => (
            <Pressable
              key={name}
              style={{
                padding: 12,
                borderWidth: 1,
                borderColor:
                  themeName === name ? themeObj.accent : themeObj.border,
                backgroundColor: themeObj.surface,
              }}
              onPress={() => setTheme(name)}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  marginBottom: 8,
                  color: themeObj.primaryText,
                }}
              >
                {name}
              </Text>

              {Object.entries(themeObj).map(([key, value]) => (
                <View
                  key={key}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 4,
                  }}
                >
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: value,
                      borderWidth: 1,
                      borderColor: "#ccc",
                    }}
                  />

                  <Text
                    style={{
                      color: themeObj.primaryText,
                    }}
                  >
                    {key}: {value}
                  </Text>
                </View>
              ))}
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontFamily: fonts.medium,
    fontSize: 26,
  },
  subHeaderText: {
    fontFamily: fonts.light,
    fontSize: 14,
    marginBottom: 20,
  },
});
