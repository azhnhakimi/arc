import { fonts } from "@/constants/fonts";
import { useTheme } from "@/theme/useTheme";
import { extractTimeInfo } from "@/utils/helpers";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { useEvents } from "@/hooks/useEvents";
import { type Event } from "@/utils/events/types";
import NewEventCta from "./NewEventCta";
import NoEventsDisplay from "./NoEventsDisplay";

type EventsDisplayProps = {
  selectedDate: Date;
};

export default function EventsDisplay({ selectedDate }: EventsDisplayProps) {
  const { theme } = useTheme();
  const { events, loading, error } = useEvents(selectedDate);

  const EventCard = ({ event }: { event: Event }) => {
    const { time, period } = extractTimeInfo(event.starts_at) || {};

    return (
      <Pressable
        onPress={() =>
          router.push({ pathname: "/calendar/[id]", params: { id: event.id } })
        }
        style={{
          flexDirection: "row",
          padding: 12,
          backgroundColor: theme.surface,
          borderRadius: 8,
        }}
      >
        <View style={{ alignItems: "flex-start", flex: 1 }}>
          <Text
            style={{
              fontFamily: fonts.semibold,
              color: theme.primaryText,
              fontSize: 20,
            }}
          >
            {time}
          </Text>
          <Text
            style={{
              fontFamily: fonts.bold,
              color: theme.mutedText,
              fontSize: 14,
            }}
          >
            {period}
          </Text>
        </View>

        <View
          style={{
            width: 2,
            backgroundColor: theme.border,
            marginHorizontal: 12,
          }}
        />

        <View style={{ gap: 6, flex: 4 }}>
          <Text
            style={{
              fontFamily: fonts.bold,
              color: theme.primaryText,
              fontSize: 16,
            }}
          >
            {event.title}
          </Text>
          <Text
            style={{
              fontFamily: fonts.light,
              color: theme.mutedText,
              fontSize: 16,
            }}
          >
            {event?.description}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            {event.location && (
              <Entypo name="location-pin" size={22} color={theme.accent} />
            )}
            <Text
              style={{
                fontFamily: fonts.semibold,
                color: theme.accent,
                fontSize: 14,
              }}
            >
              {event?.location}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            color: theme.primaryText,
            fontFamily: fonts.semibold,
            fontSize: 20,
          }}
        >
          Upcoming Events
        </Text>
        <Text
          style={{
            color: theme.mutedText,
            // fontFamily: fonts.light,
            fontSize: 16,
            textAlign: "center",
            paddingRight: 8,
          }}
          textBreakStrategy="simple"
          numberOfLines={2}
        >
          {selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </Text>
      </View>

      <View
        style={{
          gap: 12,
          marginVertical: 32,
        }}
      >
        {loading ? (
          <View
            style={{
              flex: 1,
              borderStyle: "dashed",
              borderWidth: 2,
              borderColor: theme.mutedText,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 32,
            }}
          >
            <ActivityIndicator size={20} color={theme.accent} />
          </View>
        ) : events.length > 0 ? (
          events.map((calendarEvent, index) => (
            <EventCard key={index} event={calendarEvent} />
          ))
        ) : (
          <NoEventsDisplay />
        )}

        <NewEventCta />
      </View>
    </View>
  );
}
