import { useTheme } from "@/theme/useTheme";
import Entypo from "@expo/vector-icons/Entypo";
import { Pressable, View } from "react-native";

export default function NewEventCta() {
  const { theme } = useTheme();

  return (
    <View
      style={{ flexDirection: "row", justifyContent: "flex-end", padding: 12 }}
    >
      <Pressable
        style={{
          backgroundColor: theme.accent,
          width: 56,
          height: 56,
          borderRadius: 16,
          alignItems: "center",
          justifyContent: "center",
          aspectRatio: 1,
        }}
      >
        <Entypo name="plus" size={28} color={theme.onAccent} />
      </Pressable>
    </View>
  );
}
