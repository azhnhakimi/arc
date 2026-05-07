import DeleteEventBtn from "@/components/calendar/DeleteEventBtn";
import EditScreenBtn from "@/components/calendar/EditScreenBtn";
import { fonts } from "@/constants/fonts";
import { useDeleteEvent } from "@/hooks/useDeleteEvent";
import { useEvent } from "@/hooks/useEvents";
import { useTheme } from "@/theme/useTheme";
import { type Event } from "@/utils/events/types";
import { extractTimeInfo, formatDateTime } from "@/utils/helpers";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CalendarDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { event, loading, error } = useEvent(id);
  const {
    remove,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteEvent();

  const { theme } = useTheme();
  const styles = useStyles();

  const { date } = formatDateTime(event?.starts_at) || {};
  const { period, time } = extractTimeInfo(event?.starts_at) || {};

  const handleDelete = async (event: Event | null) => {
    if (!event?.id) return;
    const success = await remove(event.id);
    if (success) router.back();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
        padding: 16,
        gap: 16,
      }}
    >
      <Text
        style={{
          color: theme.primaryText,
          fontFamily: fonts.bold,
          fontSize: 32,
        }}
      >
        Event Details
      </Text>

      <View
        style={{
          backgroundColor: theme.surface,
          padding: 12,
          borderRadius: 8,
          flex: 1,
          gap: 18,
        }}
      >
        <View>
          <Text style={styles.fieldHeader}>Title</Text>
          <Text style={styles.fieldContent}>{event?.title}</Text>
        </View>

        <View>
          <Text style={styles.fieldHeader}>Description</Text>
          <Text style={styles.fieldContent}>
            {event?.description && event.description.length > 0
              ? event.description
              : "No description"}
          </Text>
        </View>

        <View>
          <Text style={styles.fieldHeader}>Date</Text>
          <Text style={styles.fieldContent}>{date}</Text>
        </View>

        <View>
          <Text style={styles.fieldHeader}>Time</Text>
          <Text style={styles.fieldContent}>
            {time + " "}
            {period}
          </Text>
        </View>

        <View>
          <Text style={styles.fieldHeader}>Location</Text>
          <Text style={styles.fieldContent}>
            {event?.location && event.location.length > 0
              ? event.location
              : "No location"}
          </Text>
        </View>
      </View>

      <View style={{ gap: 12 }}>
        <EditScreenBtn
          onPress={() =>
            router.push({
              pathname: "/calendar/edit/[id]",
              params: { id: event?.id },
            })
          }
        />
        <DeleteEventBtn onPress={() => handleDelete(event)} />
      </View>
    </SafeAreaView>
  );
}

const useStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    fieldHeader: {
      color: theme.mutedText,
      fontFamily: fonts.light,
      fontSize: 18,
    },
    fieldContent: {
      color: theme.primaryText,
      fontFamily: fonts.regular,
      fontSize: 22,
    },
  });
};
