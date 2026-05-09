import DropDown from "@/components/prayers/DropDown";
import { fonts } from "@/constants/fonts";
import { useTheme } from "@/theme/useTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  fetchPrayerLogs,
  fetchPrayerTimesForDay,
  fetchZones,
  upsertPrayerLog,
} from "@/utils/prayers/api";

import {
  getDaerahOptions,
  getJakimCode,
  getNegeriOptions,
} from "@/utils/prayers/helpers";

import type { PrayerLog, SinglePrayerTime, Zone } from "@/utils/prayers/types";

const PrayerCard = ({
  name,
  time,
  todayISO,
  isCompleted = false,
}: {
  name: string;
  time: string;
  todayISO: string;
  isCompleted?: boolean;
}) => {
  const styles = useStyles();
  const { theme } = useTheme();

  const [isChecked, setIsChecked] = useState(isCompleted);

  useEffect(() => {
    setIsChecked(isCompleted);
  }, [isCompleted]);

  const handleCheckboxPress = async () => {
    try {
      const newValue = !isChecked;

      setIsChecked(newValue);

      await upsertPrayerLog(todayISO, name.toLowerCase(), newValue);
    } catch (error) {
      console.error(error);
    }
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
            isChecked && {
              backgroundColor: theme.accent,
            },
          ]}
        />

        <Text style={styles.squareBracket}>]</Text>
      </Pressable>
    </View>
  );
};

export default function Prayers() {
  const styles = useStyles();

  const today = useMemo(() => new Date(), []);

  const todayISO = today.toISOString().split("T")[0];

  const [zones, setZones] = useState<Zone[]>([]);

  const [negeriSelected, setNegeriSelected] = useState<string | null>(null);

  const [daerahOptions, setDaerahOptions] = useState<string[]>([]);

  const [daerahSelected, setDaerahSelected] = useState<string | null>(null);

  const [jakimCode, setJakimCode] = useState<string | null>(null);

  const [prayerTimes, setPrayerTimes] = useState<SinglePrayerTime[]>([]);

  const [logs, setLogs] = useState<PrayerLog[]>([]);

  const negeriOptions = getNegeriOptions(zones);

  const mergedPrayerTimes = prayerTimes.map((p) => {
    const record = logs.find((l) => l.prayer_name === p.name.toLowerCase());

    return {
      name: p.name,
      time: p.time,
      isCompleted: record?.completed ?? false,
    };
  });

  const [isInitializing, setIsInitializing] = useState(true);

  const [savedDaerah, setSavedDaerah] = useState<string | null>(null);

  useEffect(() => {
    async function initialize() {
      try {
        const saved = await AsyncStorage.getItem("prayer-location");

        const data = await fetchZones();

        setZones(data);

        if (saved) {
          const parsed = JSON.parse(saved);

          setNegeriSelected(parsed.negeriSelected);
          setSavedDaerah(parsed.daerahSelected);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsInitializing(false);
      }
    }

    initialize();
  }, []);

  useEffect(() => {
    async function loadPrayerLogs() {
      try {
        const data = await fetchPrayerLogs(todayISO);
        setLogs(data ?? []);
      } catch (error) {
        console.error(error);
      }
    }

    loadPrayerLogs();
  }, [todayISO]);

  useEffect(() => {
    if (savedDaerah && daerahOptions.includes(savedDaerah)) {
      setDaerahSelected(savedDaerah);
    }
  }, [savedDaerah, daerahOptions]);

  useEffect(() => {
    const daerahAvailable = getDaerahOptions(zones, negeriSelected);

    setDaerahOptions(daerahAvailable);

    if (!isInitializing) {
      setDaerahSelected(null);
    }
  }, [zones, negeriSelected, isInitializing]);

  useEffect(() => {
    const fetchedJakimCode = getJakimCode(
      zones,
      negeriSelected,
      daerahSelected,
    );

    setJakimCode(fetchedJakimCode ?? null);
  }, [zones, negeriSelected, daerahSelected]);

  useEffect(() => {
    async function loadPrayerTimes() {
      if (!jakimCode) return;

      try {
        const data = await fetchPrayerTimesForDay(jakimCode, today);

        const prayerArray = Object.entries(data.prayerTime)
          .filter(([key]) =>
            ["fajr", "dhuhr", "asr", "maghrib", "isha"].includes(key),
          )
          .map(([key, value]) => ({
            name: key.charAt(0).toUpperCase() + key.slice(1),
            time: value as string,
          }));

        setPrayerTimes(prayerArray);
      } catch (error) {
        console.error(error);
      }
    }

    loadPrayerTimes();
  }, [jakimCode, today]);

  useEffect(() => {
    async function saveSelections() {
      try {
        await AsyncStorage.setItem(
          "prayer-location",
          JSON.stringify({
            negeriSelected,
            daerahSelected,
          }),
        );
      } catch (error) {
        console.error(error);
      }
    }

    saveSelections();
  }, [negeriSelected, daerahSelected]);

  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.headerText}>
        {today.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </Text>

      <DropDown
        data={negeriOptions}
        value={negeriSelected}
        onChange={setNegeriSelected}
        placeholder="Select negeri"
      />

      <DropDown
        data={daerahOptions}
        value={daerahSelected}
        onChange={setDaerahSelected}
        placeholder="Select daerah"
        isDisabled={!negeriSelected}
      />

      <View style={styles.prayerItemsOuterContainer}>
        {mergedPrayerTimes.map((prayer) => (
          <PrayerCard key={prayer.name} {...prayer} todayISO={todayISO} />
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
      gap: 16,
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
