import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DRAWER_ITEMS: {
  url: string;
  label: string;
}[] = [
  {
    url: "Calendar",
    label: "Calendar",
  },
  {
    url: "Theme",
    label: "Theme",
  },
];

export function SideDrawer({ state, navigation }: DrawerContentComponentProps) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {DRAWER_ITEMS.map((item, index) => {
        return (
          <Pressable
            key={item.url}
            onPress={() => navigation.navigate(item.url)}
          >
            <Text>{item.label}</Text>
          </Pressable>
        );
      })}
    </SafeAreaView>
  );
}
