import { fonts } from "@/constants/fonts";
import { getContrastTextColor } from "@/utils/prayers/helpers";
import { Text, View } from "react-native";

type IntensityGuidProps = {
  gradientsArray: string[];
};

export default function IntensityGuide({ gradientsArray }: IntensityGuidProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        borderRadius: 14,
        overflow: "hidden",
      }}
    >
      {gradientsArray.map((gradient, index) => {
        const reversedIndex = gradientsArray.length - 1 - index;

        return (
          <View
            key={index}
            style={{
              backgroundColor: gradient,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 5,
            }}
          >
            <Text
              style={{
                fontFamily: fonts.light,
                color: getContrastTextColor(gradient),
              }}
            >
              {reversedIndex}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
