import { fonts } from "@/constants/fonts";
import { useTheme } from "@/theme/useTheme";
import { getContrastTextColor } from "@/utils/prayers/helpers";
import Entypo from "@expo/vector-icons/Entypo";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const DAYS_OF_WEEK = ["S", "M", "T", "W", "T", "F", "S"];

type PrayerCalendarProps = {
  today: Date;
  monthName: string;
  year: number;
  goToToday: () => void;
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
  monthArray: (Date | null)[];
  gradientsArray: string[];
  countMap: Map<string, number>;
};

export default function PrayerCalendar({
  today,
  monthName,
  year,
  goToToday,
  goToPrevMonth,
  goToNextMonth,
  monthArray,
  gradientsArray,
  countMap,
}: PrayerCalendarProps) {
  const { theme } = useTheme();

  const DayCell = ({ day, today }: { day: Date | null; today: Date }) => {
    if (!day) {
      return <View style={styles.cell} />;
    }

    const isToday = day.toDateString() === today.toDateString();
    const isFuture = day > today;

    const dateKey = [
      day.getFullYear(),
      String(day.getMonth() + 1).padStart(2, "0"),
      String(day.getDate()).padStart(2, "0"),
    ].join("-");
    const count = countMap.get(dateKey) ?? 0;

    const max = gradientsArray.length;

    const gradientIndex = Math.min(max - 1, max - 1 - count);

    return (
      <View
        style={[
          styles.cell,
          {
            backgroundColor: isFuture
              ? theme.surface
              : gradientsArray[gradientIndex],
          },
          isToday && {
            borderColor: theme.accent,
          },
        ]}
      >
        <Text
          style={{
            color: isFuture
              ? theme.primaryText
              : getContrastTextColor(gradientsArray[gradientIndex]),
            fontFamily: fonts.regular,
          }}
        >
          {day.getDate()}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ gap: 16 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              color: theme.mutedText,
              fontFamily: fonts.light,
              fontSize: 18,
            }}
          >
            {year}
          </Text>
          <Text
            style={{
              color: theme.primaryText,
              fontFamily: fonts.bold,
              fontSize: 32,
            }}
          >
            {monthName}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <Pressable
            onPress={goToToday}
            style={[
              styles.todayBtn,
              { backgroundColor: theme.surface, borderColor: theme.accent },
            ]}
          >
            <Text style={{ color: theme.accent, fontFamily: fonts.bold }}>
              Today
            </Text>
          </Pressable>
          <Pressable
            onPress={goToPrevMonth}
            style={[
              styles.monthNavigator,
              { backgroundColor: theme.accent, borderColor: theme.border },
            ]}
          >
            <Entypo name="chevron-left" size={24} color={theme.onAccent} />
          </Pressable>

          <Pressable
            onPress={goToNextMonth}
            style={[
              styles.monthNavigator,
              { backgroundColor: theme.accent, borderColor: theme.border },
            ]}
          >
            <Entypo name="chevron-right" size={24} color={theme.onAccent} />
          </Pressable>
        </View>
      </View>
      <View
        style={[
          styles.calendarContainer,
          { backgroundColor: theme.surface, borderColor: theme.border },
        ]}
      >
        <View style={{ width: "100%", flexDirection: "row" }}>
          {DAYS_OF_WEEK.map((day, index) => (
            <View key={index} style={styles.cell}>
              <Text style={{ color: theme.mutedText, fontFamily: fonts.bold }}>
                {day}
              </Text>
            </View>
          ))}
        </View>
        <FlatList
          data={monthArray}
          keyExtractor={(_, index) => index.toString()}
          numColumns={7}
          scrollEnabled={false}
          renderItem={({ item }) => <DayCell day={item} today={today} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
    margin: 2,
    borderRadius: 12,
  },
  calendarContainer: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    padding: 12,
  },
  monthNavigator: {
    aspectRatio: 1,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
  },
  todayBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
});
