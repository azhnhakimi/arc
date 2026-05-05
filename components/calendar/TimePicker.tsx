import { fonts } from "@/constants/fonts";
import { useTheme } from "@/theme/useTheme";
import { useRef, useState } from "react";
import {
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);
const PERIODS = ["AM", "PM"];

const ITEM_HEIGHT = 48;
const VISIBLE_ITEMS = 5;
const COLUMN_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

function ScrollColumn({
  data,
  selected,
  onSelect,
  format = (v: any) => (typeof v === "number" ? String(v).padStart(2, "0") : v),
}: {
  data: (number | string)[];
  selected: number | string;
  onSelect: (val: any) => void;
  format?: (v: any) => string;
}) {
  const { theme } = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const selectedIndex = data.indexOf(selected as never);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
    const clamped = Math.max(0, Math.min(index, data.length - 1));
    onSelect(data[clamped]);
    scrollRef.current?.scrollTo({ y: clamped * ITEM_HEIGHT, animated: true });
  };

  return (
    <View style={styles.columnContainer}>
      <View
        pointerEvents="none"
        style={[
          styles.selectionHighlight,
          { borderColor: theme.accent, backgroundColor: theme.background },
        ]}
      />
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onMomentumScrollEnd={handleScrollEnd}
        contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 2 }}
        onLayout={() => {
          scrollRef.current?.scrollTo({
            y: selectedIndex * ITEM_HEIGHT,
            animated: false,
          });
        }}
      >
        {data.map((item, i) => {
          const isSelected = item === selected;
          return (
            <Pressable
              key={i}
              onPress={() => {
                onSelect(item);
                scrollRef.current?.scrollTo({
                  y: i * ITEM_HEIGHT,
                  animated: true,
                });
              }}
              style={styles.columnItem}
            >
              <Text
                style={[
                  styles.columnItemText,
                  { fontFamily: fonts.light, color: theme.mutedText },
                  isSelected && {
                    fontFamily: fonts.bold,
                    color: theme.primaryText,
                    fontSize: 20,
                  },
                ]}
              >
                {format(item)}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

type TimePickerProps = {
  value: Date;
  onChange: (date: Date) => void;
};

export function TimePicker({ value, onChange }: TimePickerProps) {
  const { theme } = useTheme();

  const [open, setOpen] = useState(false);

  const initialHour = value.getHours() % 12 || 12;
  const initialMinute = value.getMinutes();
  const initialPeriod = value.getHours() >= 12 ? "PM" : "AM";

  const [selectedHour, setSelectedHour] = useState(initialHour);
  const [selectedMinute, setSelectedMinute] = useState(initialMinute);
  const [selectedPeriod, setSelectedPeriod] = useState(initialPeriod);

  const formatTime = (date: Date) => {
    const h = date.getHours() % 12 || 12;
    const m = String(date.getMinutes()).padStart(2, "0");
    const period = date.getHours() >= 12 ? "PM" : "AM";
    return `${h}:${m} ${period}`;
  };

  const handleOpen = () => {
    setSelectedHour(initialHour);
    setSelectedMinute(initialMinute);
    setSelectedPeriod(initialPeriod);
    setOpen(true);
  };

  const handleConfirm = () => {
    const newDate = new Date(value);
    let hours = selectedHour % 12;
    if (selectedPeriod === "PM") hours += 12;
    newDate.setHours(hours, selectedMinute, 0, 0);
    onChange(newDate);
    setOpen(false);
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
          {formatTime(value)}
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
            {/* Header */}
            <View>
              <Text
                style={{
                  color: theme.mutedText,
                  fontFamily: fonts.light,
                  fontSize: 18,
                }}
              >
                Select
              </Text>
              <Text
                style={{
                  color: theme.primaryText,
                  fontFamily: fonts.bold,
                  fontSize: 32,
                }}
              >
                Time
              </Text>
            </View>

            {/* Scroll columns */}
            <View
              style={[
                styles.columnsContainer,
                { backgroundColor: theme.surface, borderColor: theme.border },
              ]}
            >
              <ScrollColumn
                data={HOURS}
                selected={selectedHour}
                onSelect={setSelectedHour}
              />
              <Text
                style={[
                  styles.separator,
                  { color: theme.primaryText, fontFamily: fonts.bold },
                ]}
              >
                :
              </Text>
              <ScrollColumn
                data={MINUTES}
                selected={selectedMinute}
                onSelect={setSelectedMinute}
              />
              <ScrollColumn
                data={PERIODS}
                selected={selectedPeriod}
                onSelect={setSelectedPeriod}
                format={(v) => v}
              />
            </View>

            {/* Actions */}
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
  columnsContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    padding: 12,
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
  },
  columnContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
  },
  selectionHighlight: {
    position: "absolute",
    left: 4,
    right: 4,
    height: ITEM_HEIGHT,
    top: (COLUMN_HEIGHT - ITEM_HEIGHT) / 2,
    borderWidth: 1,
    borderRadius: 8,
  },
  columnItem: {
    height: ITEM_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  columnItemText: {
    fontSize: 16,
  },
  separator: {
    fontSize: 24,
    paddingHorizontal: 4,
    marginBottom: 4,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
});
