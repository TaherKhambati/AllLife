import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ToDoScreen() {
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