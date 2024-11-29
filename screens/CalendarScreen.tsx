import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native'
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

  const renderDateItem = (item: string) => {
    const isSelected = item === selectedDate;
    return (
      <TouchableOpacity onPress={() => setSelectedDate(item)} style={styles.dateTouchable}>
        <View style={[styles.dateItem, isSelected && styles.selectedDateItem]}>
          <Text style={[styles.dateText]}>
            {new Date(item).getDate()}
          </Text>
          <Text style={[styles.dayText]}>
            {new Date(item).toLocaleString('default', { weekday: 'short' })}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  

  const getEventsforSelectedDate = () => { 
    return events.filter(event => {
      const eventDate = event.start.toISOString().split('T')[0]; 
      return eventDate === selectedDate;
    });
  };
  
return (
  <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setViewMode('calendar')}>
        <Text style={styles.headerTitle}>November</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.headerIcon}>{"🔍"}</Text>
        </TouchableOpacity>
      </View>

    
      {/* Main Content - Calendar or Day View */}
      {viewMode === 'calendar' ? (
        <>
          
          <Calendar
            onDayPress={handleDayPress}
            theme={calendarTheme}
          />
        </>
      ) : (
        <>
        <FlatList
          horizontal
          data={Array.from({ length: 31 }).map((_, i) =>
          new Date(new Date().getFullYear(), new Date().getMonth(), i + 1).toISOString().split('T')[0]
          )}
          renderItem={({ item }) => renderDateItem(item)}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalDatePicker}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {Array.from({ length: 24 }).map((_, index) => (
            <View key={index} style={styles.hourRow}>
              <Text style={styles.hourText}>{`${index % 12 === 0 ? 12 : index % 12} ${index < 12 ? 'AM' : 'PM'}`}</Text>
              <View style={styles.eventSlot}>
                {getEventsforSelectedDate().map(event => {
                  const eventStartHour = new Date(event.start).getHours();
                  if (eventStartHour === index) {
                    return (
                      <Text key={event.id} style={styles.eventText}>
                        {event.title} ({event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
                      </Text>
                    );
                  }
                  return null;
                })}
              </View>
            </View>
          ))}
        </ScrollView>
        </>
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
    backgroundColor: '#121212',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  }, 
  hourRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
    paddingVertical: 10,
  },
  hourText: {
    color: '#a9a9a9',
    width: 50,
    textAlign: 'center',
  },
  eventSlot: {
    flex: 1,
    paddingLeft: 10,
  },
  eventText: {
    color: '#ffffff',
    fontSize: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1e1e1e',
  },
  headerTitle: {
    fontSize: 24,
    color: '#ffffff',
  },
  headerIcon: {
    fontSize: 24,
    color: '#ffffff',
  },
  horizontalDatePicker: {
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingVertical: 10,
  },
  dateItem: {
    alignItems: 'center',
    paddingVertical: 5,  // Consistent vertical padding
    paddingHorizontal: 10,
    minWidth: 50,  // Set a minimum width to ensure all items are consistent
  },
  selectedDateItem: {
    backgroundColor: '#00ffcc',
    borderRadius: 10,
  },
  dateText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',  // Ensure text is aligned center
  },
  dayText: {
    color: '#a9a9a9',
    fontSize: 12,
    textAlign: 'center',
  },
  dateTouchable: {
    marginHorizontal: 5,  // Spacing between items in the horizontal list
  },
});

export default CalendarScreen;

// Note: 
// - You would need to implement the logic for `authorizeAppleCalendar`, `authorizeGmailCalendar`, and `authorizeOutlookCalendar` to handle OAuth or API tokens.
// - Similarly, `fetchAppleCalendarEvents`, `fetchGmailCalendarEvents`, and `fetchOutlookCalendarEvents` need to interact with their respective APIs.
// - These implementations would require API keys and proper handling for user permissions, along with utilizing the corresponding calendar APIs to fetch events.
// - The "react-native-calendar-component" is used as an example. Replace it with an appropriate calendar component that fits your UI needs.
// - Make sure to handle permission requests and OAuth properly to maintain user privacy and security.

