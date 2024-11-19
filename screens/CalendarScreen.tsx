import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text} from 'react-native'
import { Calendar } from 'react-native-calendars';
import { authorizeAppleCalendar, fetchAppleCalendarEvents } from '../cal_integrations/appleCalendarIntegration';
import { authorizeGmailCalendar, fetchGmailCalendarEvents } from '../cal_integrations/gmailCalendarIntegration';
import { authorizeOutlookCalendar, fetchOutlookCalendarEvents } from '../cal_integrations/outlookCalendarIntegration';

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

const CalendarScreen: React.FC = () => {
  const [viewMode, setViewMode] = useState<'calendar' | 'day'>('calendar');
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');


  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        // Authorize and fetch Apple Calendar events
        await authorizeAppleCalendar();
        const appleEvents = await fetchAppleCalendarEvents();

        // Authorize and fetch Gmail Calendar events
        await authorizeGmailCalendar();
        const gmailEvents = await fetchGmailCalendarEvents();

        // Authorize and fetch Outlook Calendar events
        await authorizeOutlookCalendar();
        const outlookEvents = await fetchOutlookCalendarEvents();

        // Combine all events and set state
        setEvents([...appleEvents, ...gmailEvents, ...outlookEvents]);
      } catch (error) {
        console.error('Error fetching calendar events:', error);
      }
    };

    fetchAllEvents();
  }, []);

  const handleDayPress = (day: { dateString: string }) => {
    console.log('Day pressed:', day.dateString);
    setSelectedDate(day.dateString);
    setViewMode('day');
};


return (
  <View style={styles.container}>
    {viewMode === 'calendar' ? (
      <>
        <Text style={styles.selectedDateText}>Selected Date: {selectedDate || 'None'}</Text>
        <Calendar
          onDayPress={handleDayPress}
          theme={calendarTheme}
        />
      </>
    ) : (
      <View style={styles.dayContainer}>
        <Text style={styles.dayViewText}>Detailed View for: {selectedDate}</Text>
        <Text style={styles.backButton} onPress={() => setViewMode('calendar')}>Go Back to Calendar</Text>
      </View>
    )}
  </View>
);
};

// Theme object for the calendar
const calendarTheme = {
  backgroundColor: '#1e1e1e',
  calendarBackground: '#1e1e1e',
  textSectionTitleColor: '#a9a9a9',
  dayTextColor: '#ffffff',
  todayTextColor: '#00ffcc',
  monthTextColor: '#ffffff',
  arrowColor: '#00ffcc',
};

const styles = StyleSheet.create({
  dayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  dayViewText: {
    color: '#ffffff',
    fontSize: 18,
    marginBottom: 20,
  },
  backButton: {
    color: '#00ffcc',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 20,
  },
  selectedDateText: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  }
});

export default CalendarScreen;

// Note: 
// - You would need to implement the logic for `authorizeAppleCalendar`, `authorizeGmailCalendar`, and `authorizeOutlookCalendar` to handle OAuth or API tokens.
// - Similarly, `fetchAppleCalendarEvents`, `fetchGmailCalendarEvents`, and `fetchOutlookCalendarEvents` need to interact with their respective APIs.
// - These implementations would require API keys and proper handling for user permissions, along with utilizing the corresponding calendar APIs to fetch events.
// - The "react-native-calendar-component" is used as an example. Replace it with an appropriate calendar component that fits your UI needs.
// - Make sure to handle permission requests and OAuth properly to maintain user privacy and security.
