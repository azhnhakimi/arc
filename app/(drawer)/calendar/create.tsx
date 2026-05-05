import EventForm from "@/components/calendar/EventForm";
import { fonts } from "@/constants/fonts";
import { useTheme } from "@/theme/useTheme";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateEvent() {
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
        Create Event
      </Text>
      <EventForm />
    </SafeAreaView>
  );
}
