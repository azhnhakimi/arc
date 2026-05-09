import { useTheme } from "@/theme/useTheme";
import { getDailyPrayerCounts, getGradients } from "@/utils/prayers/helpers";
import { useMemo, useState } from "react";
import { View } from "react-native";
import IntensityGuide from "./IntensityGuide";
import PrayerCalendar from "./PrayerCalendar";

type PrayerStatsProps = {
  logs: any[];
};

export default function PrayerStats({ logs }: PrayerStatsProps) {
  const { theme } = useTheme();

  const gradients = getGradients(theme.accent);

  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date());

  const monthName = viewDate.toLocaleString("en-US", {
    month: "long",
  });
  const year = viewDate.getFullYear();

  function generateMonth(year: number, month: number) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: (Date | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      days.push(new Date(year, month, d));
    }

    while (days.length < 42) {
      days.push(null);
    }

    return days;
  }

  const monthArray = generateMonth(viewDate.getFullYear(), viewDate.getMonth());

  const goToPrevMonth = () => {
    setViewDate((prev) => {
      const date = new Date(prev);
      date.setMonth(date.getMonth() - 1);
      return date;
    });
  };

  const goToNextMonth = () => {
    setViewDate((prev) => {
      const date = new Date(prev);
      date.setMonth(date.getMonth() + 1);
      return date;
    });
  };

  const goToToday = () => {
    setViewDate(new Date());
  };

  const dailyCounts = getDailyPrayerCounts(logs);

  const countMap = useMemo(() => {
    if (!dailyCounts) return new Map();

    return new Map(dailyCounts.map((d) => [d.date, d.count]));
  }, [dailyCounts]);

  return (
    <View
      style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24, gap: 16 }}
    >
      <PrayerCalendar
        today={today}
        monthName={monthName}
        year={year}
        goToToday={goToToday}
        goToPrevMonth={goToPrevMonth}
        goToNextMonth={goToNextMonth}
        monthArray={monthArray}
        gradientsArray={gradients}
        countMap={countMap}
      />
      <IntensityGuide gradientsArray={gradients} />
    </View>
  );
}
