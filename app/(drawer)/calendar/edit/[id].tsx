import EventForm from "@/components/calendar/EventForm";
import { fonts } from "@/constants/fonts";
import { useEvent } from "@/hooks/useEvents";
import { useTheme } from "@/theme/useTheme";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditEvent() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { event, loading, error } = useEvent(id);

  const { theme } = useTheme();

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
        Edit Event
      </Text>
      <EventForm event={event ?? undefined} />
    </SafeAreaView>
  );
}
