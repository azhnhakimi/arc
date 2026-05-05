import { fonts } from "@/constants/fonts";
import { useTheme } from "@/theme/useTheme";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const DAYS_OF_WEEK = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function buildMonthArray(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from(
      { length: daysInMonth },
      (_, i) => new Date(year, month, i + 1),
    ),
  ];

  while (cells.length < 42) cells.push(null);

  return cells;
}

type DatePickerProps = {
  value: Date;
  onChange: (date: Date) => void;
};

export function DatePicker({ value, onChange }: DatePickerProps) {
  const { theme } = useTheme();
  const today = new Date();

  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(value.getMonth());
  const [viewYear, setViewYear] = useState(value.getFullYear());
  const [selected, setSelected] = useState(value);

  const monthArray = buildMonthArray(viewYear, viewMonth);

  const formatDate = (date: Date) => {
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    return `${d}-${m}-${date.getFullYear()}`;
  };

  const handleOpen = () => {
    setSelected(value);
    setViewMonth(value.getMonth());
    setViewYear(value.getFullYear());
    setOpen(true);
  };

  const handleConfirm = () => {
    onChange(selected);
    setOpen(false);
  };

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  const DayCell = ({ day }: { day: Date | null }) => {
    const isToday = day?.toDateString() === today.toDateString();
    const isSelected = day?.toDateString() === selected.toDateString();

    return (
      <Pressable
        onPress={() => day && setSelected(day)}
        style={[
          styles.cell,
          isToday && { backgroundColor: theme.accent, borderRadius: 12 },
          isSelected &&
            !isToday && {
              backgroundColor: theme.background,
              borderRadius: 12,
              borderColor: theme.accent,
            },
        ]}
      >
        {day && (
          <Text style={{ color: isToday ? theme.onAccent : theme.primaryText }}>
            {day.getDate()}
          </Text>
        )}
      </Pressable>
    );
  };

  return (
    <>
      <Pressable
        onPress={handleOpen}
        style={[
          styles.trigger,
          { backgroundColor: theme.background, borderColor: theme.border },
        ]}
      >
        <Text
          style={{
            color: theme.primaryText,
            fontFamily: fonts.semibold,
            fontSize: 16,
          }}
        >
          {formatDate(value)}
        </Text>
      </Pressable>

      <Modal
        transparent
        animationType="fade"
        visible={open}
        statusBarTranslucent
      >
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable
            style={[
              styles.sheet,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <View style={styles.header}>
              <View>
                <Text
                  style={{
                    color: theme.mutedText,
                    fontFamily: fonts.light,
                    fontSize: 18,
                  }}
                >
                  {viewYear}
                </Text>
                <Text
                  style={{
                    color: theme.primaryText,
                    fontFamily: fonts.bold,
                    fontSize: 32,
                  }}
                >
                  {MONTHS[viewMonth]}
                </Text>
              </View>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <Pressable
                  onPress={prevMonth}
                  style={[
                    styles.monthNavigator,
                    {
                      backgroundColor: theme.accent,
                      borderColor: theme.border,
                    },
                  ]}
                >
                  <Entypo
                    name="chevron-left"
                    size={24}
                    color={theme.onAccent}
                  />
                </Pressable>
                <Pressable
                  onPress={nextMonth}
                  style={[
                    styles.monthNavigator,
                    {
                      backgroundColor: theme.accent,
                      borderColor: theme.border,
                    },
                  ]}
                >
                  <Entypo
                    name="chevron-right"
                    size={24}
                    color={theme.onAccent}
                  />
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
                    <Text
                      style={{ color: theme.mutedText, fontFamily: fonts.bold }}
                    >
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
                renderItem={({ item }) => <DayCell day={item} />}
              />
            </View>

            <View style={{ flexDirection: "row", gap: 12 }}>
              <Pressable
                onPress={() => setOpen(false)}
                style={[
                  styles.actionBtn,
                  { backgroundColor: theme.surface, borderColor: theme.border },
                ]}
              >
                <Text
                  style={{ color: theme.primaryText, fontFamily: fonts.bold }}
                >
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                onPress={handleConfirm}
                style={[
                  styles.actionBtn,
                  { backgroundColor: theme.accent, borderColor: theme.border },
                ]}
              >
                <Text style={{ color: theme.onAccent, fontFamily: fonts.bold }}>
                  Confirm
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  sheet: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    padding: 20,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  calendarContainer: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    padding: 12,
  },
  cell: {
    flex: 1,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
    margin: 2,
  },
  monthNavigator: {
    aspectRatio: 1,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
});
