import PrayerChecklist from "@/components/prayers/PrayerChecklist";
import PrayerStats from "@/components/prayers/PrayerStats";
import { useTheme } from "@/theme/useTheme";
import { fetchMonthlyPrayerLogs } from "@/utils/prayers/api";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  NavigationState,
  SceneRendererProps,
  TabBar,
  TabView,
} from "react-native-tab-view";

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
  const [logs, setLogs] = useState<any[]>([]);

  async function refreshLogs() {
    const today = new Date();

    const data = await fetchMonthlyPrayerLogs(
      today.getFullYear(),
      today.getMonth() + 1,
    );

    setLogs(data);
  }

  useEffect(() => {
    refreshLogs();
  }, []);

  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case "Checklist":
        return <PrayerChecklist logs={logs} refreshLogs={refreshLogs} />;

      case "Statistics":
        return <PrayerStats logs={logs} />;

      default:
        return null;
    }
  };

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
