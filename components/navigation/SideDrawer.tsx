import { fonts } from "@/constants/fonts";
import { useTheme } from "@/theme/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

type DrawerItem = {
  url: string;
  label: string;
  icon: IoniconsName;
  iconActive: IoniconsName;
};

const DRAWER_ITEMS: DrawerItem[] = [
  {
    url: "Calendar",
    label: "Calendar",
    icon: "calendar-outline",
    iconActive: "calendar",
  },
];

const CONTROL_DRAWER_ITEMS: DrawerItem[] = [
  {
    url: "Theme",
    label: "Themes",
    icon: "color-palette-outline",
    iconActive: "color-palette",
  },
];

export function SideDrawer({ state, navigation }: DrawerContentComponentProps) {
  const { theme } = useTheme();

  const activeRouteName = state.routes[state.index].name;

  const renderDrawerItem = (item: DrawerItem) => {
    const isActive = activeRouteName === item.url;

    return (
      <Pressable
        key={item.url}
        onPress={() => navigation.navigate(item.url)}
        style={[
          styles.drawerItemPressable,
          { backgroundColor: theme.surface },
          !isActive && { opacity: 0.7 },
          isActive && { backgroundColor: theme.surface },
        ]}
      >
        <View
          style={[
            styles.verticalBar,
            isActive && { backgroundColor: theme.accent },
          ]}
        />
        <Ionicons
          name={isActive ? item.iconActive : item.icon}
          size={24}
          color={isActive ? theme.accent : "#000000"}
        />
        <Text
          style={[
            styles.drawerItemText,
            isActive && { fontFamily: fonts.semibold, color: theme.accent },
          ]}
        >
          {item.label}
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: theme.background,
      }}
    >
      <Image
        source={require("@/assets/icon/arc-icon.png")}
        style={{ width: 50, height: 50, borderRadius: 8 }}
      />

      <View style={{ marginTop: 32 }}>
        <Text style={[styles.navSectionTitle, { color: theme.mutedText }]}>
          MODULES
        </Text>
        <View style={styles.drawerItemContainer}>
          {DRAWER_ITEMS.map(renderDrawerItem)}
        </View>
      </View>

      <View style={{ marginTop: 32 }}>
        <Text style={[styles.navSectionTitle, { color: theme.mutedText }]}>
          CONTROLS
        </Text>
        <View style={styles.drawerItemContainer}>
          {CONTROL_DRAWER_ITEMS.map(renderDrawerItem)}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  drawerItemContainer: {
    paddingVertical: 8,
    gap: 8,
  },
  drawerItemPressable: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    borderRadius: 4,
    overflow: "hidden",
  },
  drawerItemText: {
    paddingVertical: 14,
    fontFamily: fonts.light,
    fontSize: 16,
  },
  verticalBar: {
    backgroundColor: "transparent",
    height: "100%",
    width: 4,
    alignSelf: "stretch",
  },
  navSectionTitle: {
    fontFamily: fonts.light,
  },
});
