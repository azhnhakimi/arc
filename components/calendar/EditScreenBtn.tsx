import { fonts } from "@/constants/fonts";
import { useTheme } from "@/theme/useTheme";
import Feather from "@expo/vector-icons/Feather";
import { Pressable, Text } from "react-native";

export default function EditScreenBtn({ onPress }: { onPress: () => void }) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: theme.accent,
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        flexDirection: "row",
        gap: 12,
      }}
    >
      <Feather name="edit-2" size={18} color={theme.onAccent} />
      <Text
        style={{
          fontFamily: fonts.medium,
          color: theme.onAccent,
          fontSize: 18,
        }}
      >
        Edit
      </Text>
    </Pressable>
  );
}
