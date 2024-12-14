import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserContext } from '../contexts/UserContext';

export default function ToDoScreen() {
  const userContext = useContext(UserContext);

  if (!userContext) {
      throw new Error('UserContext must be used within a UserProvider');
  }

  const { userProfile } = userContext;
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the To-Do List Screen!</Text>
      {/* Add to-do list logic here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});