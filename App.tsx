import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HabitTrackerScreen from './screens/HabitTrackerScreen';
import ExpensesScreen from './screens/ExpensesScreen';
import CalendarScreen from './screens/CalendarScreen';
import ToDoScreen from './screens/ToDoScreen';
import TransactionsScreen from './screens/TransactionsScreen';
import { UserProvider } from './contexts/UserContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ExpensesStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Expenses">
      <Stack.Screen 
        name="Expenses" 
        component={ExpensesScreen} 
        options={{ headerShown: false }} // Hides the header for the Expenses screen
      />
      <Stack.Screen 
        name="Transactions" 
        component={TransactionsScreen} 
        options={{ title: 'All Transactions' }} // Title for Transactions screen
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen 
            name="Expenses" 
            component={ExpensesStackNavigator} 
            options={{ headerShown: false }} // Ensure the header stays hidden for the stack
          />
          <Tab.Screen name="Habits" component={HabitTrackerScreen} />
          <Tab.Screen name="To-Do" component={ToDoScreen} />
          <Tab.Screen name="Calendar" component={CalendarScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
