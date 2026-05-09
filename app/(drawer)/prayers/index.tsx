import PrayerChecklist from "@/components/prayers/PrayerChecklist";
import PrayerStats from "@/components/prayers/PrayerStats";
import { useTheme } from "@/theme/useTheme";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabBar,
  TabView,
} from "react-native-tab-view";

const renderScene = SceneMap({
  Checklist: PrayerChecklist,
  Statistics: PrayerStats,
});

const routes = [
  { key: "Checklist", title: "Checklist" },
  { key: "Statistics", title: "Statistics" },
];

const renderTabBar = (
  props: SceneRendererProps & {
    navigationState: NavigationState<{ key: string; title: string }>;
  },
) => {
  const { theme } = useTheme();

  return (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: theme.accent }}
      style={{
        backgroundColor: theme.background,
      }}
      activeColor={theme.accent}
      inactiveColor={theme.mutedText}
    />
  );
};

export default function PrayerIndex() {
  const { theme } = useTheme();

  const [index, setIndex] = useState(0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
}
