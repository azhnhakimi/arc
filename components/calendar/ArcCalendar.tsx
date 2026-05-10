import { useTheme } from "@/theme/useTheme";
import { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CalendarDisplay from "./CalendarDisplay";
import EventsDisplay from "./EventsDisplay";

export default function ArcCalendar() {
  const { theme } = useTheme();

  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthIndex = viewDate.getMonth();
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
    setSelectedDate(new Date());
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: 18,
          padding: 16,
        }}
      >
        <CalendarDisplay
          today={today}
          monthName={monthName}
          monthIndex={monthIndex}
          year={year}
          goToToday={goToToday}
          goToPrevMonth={goToPrevMonth}
          goToNextMonth={goToNextMonth}
          monthArray={monthArray}
          selectedDate={selectedDate}
          onDatePressed={setSelectedDate}
        />
        <EventsDisplay selectedDate={selectedDate} />
      </ScrollView>
    </SafeAreaView>
  );
}
