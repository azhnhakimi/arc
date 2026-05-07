import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Pressable, Text } from "react-native";

type DeleteEventBtnProps = {
  onPress: () => void;
};

export default function DeleteEventBtn({ onPress }: DeleteEventBtnProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: colors.danger,
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        flexDirection: "row",
        gap: 12,
      }}
    >
      <FontAwesome5 name="trash" size={18} color={colors.dangerSubtle} />
      <Text
        style={{
          fontFamily: fonts.medium,
          color: colors.dangerSubtle,
          fontSize: 18,
        }}
      >
        Delete
      </Text>
    </Pressable>
  );
}
