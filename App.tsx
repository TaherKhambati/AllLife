import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HabitTrackerScreen from './screens/HabitTrackerScreen';
import ExpensesScreen from './screens/ExpensesScreen';
import CalendarScreen from './screens/CalendarScreen';
import ToDoScreen from './screens/ToDoScreen';
import { UserProvider } from './UserContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Expenses" component={ExpensesScreen} />
          <Tab.Screen name="Habits" component={HabitTrackerScreen} />
          <Tab.Screen name="To-Do" component={ToDoScreen} />
          <Tab.Screen name="Calendar" component={CalendarScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}