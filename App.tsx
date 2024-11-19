import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HabitTrackerScreen from './screens/HabitTrackerScreen';
import ExpensesScreen from './screens/ExpensesScreen';
import CalendarScreen from './screens/CalendarScreen';
import TodoScreen from './screens/ToDoScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="To-Do" component={TodoScreen} />
        <Tab.Screen name="Habits" component={HabitTrackerScreen} />
        <Tab.Screen name="Expenses" component={ExpensesScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}