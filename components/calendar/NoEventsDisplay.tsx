import { fonts } from "@/constants/fonts";
import { useTheme } from "@/theme/useTheme";
import { Text, View } from "react-native";

export default function NoEventsDisplay() {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        borderStyle: "dashed",
        borderWidth: 2,
        borderColor: theme.mutedText,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 32,
      }}
    >
      <Text
        style={{
          fontFamily: fonts.light,
          color: theme.mutedText,
          fontSize: 16,
        }}
      >
        No events for this day.
      </Text>
    </View>
  );
}
