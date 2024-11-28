import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { CalendarProvider, Timeline, Agenda } from "react-native-calendars";

const DetailScheduleDate = () => {
  // Sample data for events
  const initialEvents = {
    "2024-11-06": [
      {
        start: "2024-11-06T03:00:00",
        end: "2024-11-06T04:00:00",
        title: "Meeting D",
        summary: "Summary for meeting D",
      },
      {
        start: "2024-11-06T04:30:00",
        end: "2024-11-06T05:30:00",
        title: "Meeting F",
        summary: "Summary for meeting F",
      },
    ],
    "2024-11-07": [
      {
        start: "2024-11-07T09:00:00",
        end: "2024-11-07T10:00:00",
        title: "Meeting G",
        summary: "Summary for meeting G",
      },
    ],
  };

  const [selectedDate, setSelectedDate] = useState("2024-11-06");
  const events = initialEvents[selectedDate] || [];

  return (
    <View style={styles.container}>
      <CalendarProvider date={selectedDate}>
        <Agenda
          selected={selectedDate}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          theme={{
            selectedDayBackgroundColor: "#b39ddb",
            selectedDayTextColor: "#ffffff",
          }}
          hideExtraDays={true}
          style={styles.agenda}
        />

        <Timeline
          date={selectedDate}
          events={events}
          format24h={true} // Use 24-hour format
          scrollToFirst={true} // Scroll to the first event
          overlapEvents={false} // Prevent overlap of events
          eventContainerStyle={styles.eventContainer}
          renderEvent={(event) => (
            <View style={styles.event}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventSummary}>{event.summary}</Text>
              <Text style={styles.eventTime}>
                {new Date(event.start).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                -{" "}
                {new Date(event.end).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
          )}
          style={{ paddingLeft: 60 }} // Add padding to avoid overlapping with time labels
        />
      </CalendarProvider>
    </View>
  );
};

export default DetailScheduleDate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  agenda: {
    height: 100, // Height for the agenda strip
  },
  eventContainer: {
    paddingHorizontal: 10,
  },
  event: {
    backgroundColor: "#b39ddb",
    width: "50%",
    borderRadius: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  eventSummary: {
    fontSize: 14,
    color: "#ffffff",
  },
  eventTime: {
    fontSize: 12,
    color: "#e0e0e0",
    marginTop: 5,
  },
});
