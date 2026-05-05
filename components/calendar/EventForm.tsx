import { fonts } from "@/constants/fonts";
import { useTheme } from "@/theme/useTheme";
import { useState } from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { DatePicker } from "./DatePicker";
import { TimePicker } from "./TimePicker";

import { Event } from "@/utils/event";

export default function EventForm({ event }: { event?: Event }) {
  const { theme } = useTheme();
  const styles = useStyles();

  const [form, setForm] = useState({
    title: event?.title || "",
    description: event?.description || "",
    date: new Date(event?.starts_at || new Date()),
    time: new Date(event?.starts_at || new Date()),
    location: event?.location || "",
  });

  const updateField = (field: keyof typeof form, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = () => {
    const starts_at = new Date(form.date);
    starts_at.setHours(form.time.getHours(), form.time.getMinutes(), 0, 0);

    const payload = {
      title: form.title,
      description: form.description,
      location: form.location,
      starts_at,
    };

    console.log(payload);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.surface,
          paddingHorizontal: 12,
          paddingVertical: 8,
          paddingBottom: 16,
          borderRadius: 8,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={styles.label}>Title</Text>
          <TextInput
            value={form.title}
            onChangeText={(value) => updateField("title", value)}
            placeholder="Something meaningful..."
            style={styles.inputfield}
            placeholderTextColor={theme.mutedText}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            value={form.description}
            onChangeText={(value) => updateField("description", value)}
            placeholder="Description (optional)"
            style={[styles.inputfield, { height: 100 }]}
            placeholderTextColor={theme.mutedText}
            multiline
          />

          <Text style={styles.label}>Date</Text>
          <DatePicker
            value={form.date}
            onChange={(date) => updateField("date", date)}
          />

          <Text style={styles.label}>Time</Text>
          <TimePicker
            value={form.time}
            onChange={(time) => updateField("time", time)}
          />

          <Text style={styles.label}>Location</Text>
          <TextInput
            value={form.location}
            onChangeText={(value) => updateField("location", value)}
            placeholder="Edge of the universe..."
            style={styles.inputfield}
            placeholderTextColor={theme.mutedText}
          />
        </View>

        <Pressable onPress={handleSubmit} style={styles.submitBtn}>
          <Text
            style={{
              color: theme.onAccent,
              fontFamily: fonts.semibold,
              fontSize: 18,
            }}
          >
            Create
          </Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
}

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    inputfield: {
      borderWidth: 1,
      backgroundColor: theme.background,
      borderColor: theme.border,
      color: theme.primaryText,
      paddingHorizontal: 12,
      paddingVertical: 18,
      borderRadius: 6,
      fontFamily: fonts.regular,
      fontSize: 16,
    },
    label: {
      color: theme.primaryText,
      fontFamily: fonts.light,
      fontSize: 18,
      marginBottom: 8,
      marginTop: 18,
    },
    submitBtn: {
      backgroundColor: theme.accent,
      paddingHorizontal: 16,
      paddingVertical: 14,
      alignItems: "center",
      borderRadius: 6,
    },
  });
};
