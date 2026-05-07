import { fonts } from "@/constants/fonts";
import { useTheme } from "@/theme/useTheme";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PRAYER_TIMES = [
  {
    name: "Subuh",
    time: "04:30",
    isCompleted: true,
  },
  {
    name: "Dzuhur",
    time: "12:00",
    isCompleted: true,
  },
  {
    name: "Ashar",
    time: "15:30",
    isCompleted: false,
  },
  {
    name: "Maghrib",
    time: "18:00",
    isCompleted: true,
  },

  {
    name: "Isya",
    time: "19:30",
    isCompleted: false,
  },
];

const PrayerCard = ({
  name,
  time,
  isCompleted,
}: {
  name: string;
  time: string;
  isCompleted: boolean;
}) => {
  const styles = useStyles();
  const { theme } = useTheme();

  const [isChecked, setIsChecked] = useState(isCompleted);

  const handleCheckboxPress = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View style={styles.prayerItemsInnerContainer}>
      <View>
        <Text style={styles.prayerNameText}>{name}</Text>
        <Text style={styles.prayerTimeText}>{time}</Text>
      </View>

      <Pressable style={styles.checkbox} onPress={handleCheckboxPress}>
        <Text style={styles.squareBracket}>[</Text>
        <View
          style={[
            styles.checkboxIndicator,
            isChecked && { backgroundColor: theme.accent },
          ]}
        />
        <Text style={styles.squareBracket}>]</Text>
      </Pressable>
    </View>
  );
};

export default function Prayers() {
  const styles = useStyles();

  const today = new Date();

  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.headerText}>
        {today.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </Text>

      <View style={styles.prayerItemsOuterContainer}>
        {PRAYER_TIMES.map((prayer) => (
          <PrayerCard key={prayer.name} {...prayer} />
        ))}
      </View>
    </SafeAreaView>
  );
}

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 16,
    },
    headerText: {
      color: theme.primaryText,
      fontFamily: fonts.bold,
      fontSize: 32,
    },
    prayerNameText: {
      color: theme.primaryText,
      fontFamily: fonts.bold,
      fontSize: 20,
    },
    prayerTimeText: {
      color: theme.mutedText,
      fontFamily: fonts.light,
      fontSize: 16,
    },
    prayerItemsOuterContainer: {
      gap: 24,
      marginVertical: 16,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      padding: 16,
      paddingVertical: 20,
      borderRadius: 8,
    },
    prayerItemsInnerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 16,
    },
    checkbox: {
      flexDirection: "row",
      gap: 4,
      justifyContent: "center",
      alignItems: "center",
    },
    checkboxIndicator: {
      backgroundColor: "transparent",
      width: 14,
      height: 14,
    },
    squareBracket: {
      fontSize: 24,
      color: theme.accent,
    },
  });
};
