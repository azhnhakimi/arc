import { fonts } from "@/constants/fonts";
import { useTheme } from "@/theme/useTheme";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
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

import { useCreateEvent } from "@/hooks/useCreateEvent";
import { type Event } from "@/utils/events/types";

const defaultForm = {
  title: "",
  description: "",
  date: new Date(),
  time: new Date(),
  location: "",
};

export default function EventForm({ event }: { event?: Event }) {
  const { theme } = useTheme();
  const styles = useStyles();

  const { submit, loading, error } = useCreateEvent();
  const [errors, setErrors] = useState({ title: "" });

  const [form, setForm] = useState(defaultForm);

  useFocusEffect(
    useCallback(() => {
      setForm(
        event
          ? {
              title: event.title,
              description: event.description ?? "",
              date: new Date(event.starts_at),
              time: new Date(event.starts_at),
              location: event.location ?? "",
            }
          : defaultForm,
      );
      setErrors({ title: "" });
    }, [event]),
  );

  const updateField = (field: keyof typeof form, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      setErrors({ title: "Title is required" });
      return;
    }

    const starts_at = new Date(form.date);
    starts_at.setHours(form.time.getHours(), form.time.getMinutes(), 0, 0);

    const payload = {
      title: form.title,
      description: form.description,
      location: form.location,
      starts_at: starts_at.toISOString(),
    };

    const data = await submit(payload);

    if (data) {
      setErrors({ title: "" });
      router.replace("/(drawer)/calendar");
    }
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
          {errors.title && (
            <Text
              style={{
                color: "red",
                fontFamily: fonts.regular,
                fontSize: 13,
                marginTop: 4,
              }}
            >
              {errors.title}
            </Text>
          )}

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
            placeholder="Location (optional)"
            style={styles.inputfield}
            placeholderTextColor={theme.mutedText}
          />
        </View>

        <View>
          {error && (
            <Text
              style={{
                color: "red",
                fontFamily: fonts.regular,
                marginBottom: 8,
              }}
            >
              {error}
            </Text>
          )}
          <Pressable onPress={handleSubmit} style={styles.submitBtn}>
            <Text
              style={{
                color: theme.onAccent,
                fontFamily: fonts.semibold,
                fontSize: 18,
              }}
            >
              {loading ? "Creating..." : "Create"}
            </Text>
          </Pressable>
        </View>
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
