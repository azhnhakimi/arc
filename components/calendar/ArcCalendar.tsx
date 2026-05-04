import { useTheme } from "@/theme/useTheme";
import { useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CalendarDisplay from "./CalendarDisplay";
import EventsDisplay from "./EventsDisplay";

export default function ArcCalendar() {
  const { theme } = useTheme();

  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthName = currentDate.toLocaleString("en-US", {
    month: "long",
  });
  const year = currentDate.getFullYear();

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

  const monthArray = generateMonth(
    currentDate.getFullYear(),
    currentDate.getMonth(),
  );

  const goToPrevMonth = () => {
    setCurrentDate((prev) => {
      const date = new Date(prev);
      date.setMonth(date.getMonth() - 1);
      return date;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate((prev) => {
      const date = new Date(prev);
      date.setMonth(date.getMonth() + 1);
      return date;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.background, padding: 16 }}
    >
      <FlatList
        data={[]}
        renderItem={null}
        ListHeaderComponent={() => (
          <CalendarDisplay
            today={today}
            monthName={monthName}
            year={year}
            goToToday={goToToday}
            goToPrevMonth={goToPrevMonth}
            goToNextMonth={goToNextMonth}
            monthArray={monthArray}
          />
        )}
        ListFooterComponent={() => <EventsDisplay />}
        contentContainerStyle={{
          gap: 18,
        }}
      />
    </SafeAreaView>
  );
}
