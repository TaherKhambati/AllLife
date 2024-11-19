import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform, Keyboard} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import uuid from 'react-native-uuid';

function HabitTrackerScreen() {
  interface Habit {
    id: string;
    name: string;
    completed: boolean; // This line is critical to avoid type errors
  }
  
  const [habit,setHabit] = useState('');
  const [habits, setHabits] = useState<Habit[]> ([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const handleAddHabit = () => { 
    if (habit.trim()) {
      const newHabit: Habit = { 
        id:uuid.v4() as string, 
        name: habit,
        completed: false,
      };
      setHabits((prevHabits) => [...prevHabits, newHabit]); 
      setHabit('');
    }
  }

  const toggleCheckbox = (id: string) => {
    setHabits(
      habits.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };
  
   // Keyboard visibility listener
   useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
 
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
      keyboardVerticalOffset={100}
    >

    <View style={styles.container}>
      {habits.length == 0 && (<Text style={styles.title}> What habits would you like to track? </Text> )}

       {/* ScrollView for displaying habits */}
       {habits.length > 0 && (
      <ScrollView style={[styles.habitsContainer, isKeyboardVisible && { marginBottom: 100 }]}>
        {habits.map((item) => (
        <Pressable key={item.id} style={styles.habitItem} onPress={() => toggleCheckbox(item.id)}>
        <Ionicons
          name={item.completed ? "checkmark-circle" : "ellipse-outline"}
          size={20} // Make the checkbox smaller
          color={item.completed ? "#10a37f" : "#ccc"}
          style={styles.checkboxIcon}
        />
        <Text style={styles.habitText}>{item.name}</Text>
        </Pressable>
        ))}
      </ScrollView> )}

     {/* TextInput container - Positioned differently based on whether habits are present */}
     <View style={[styles.textinputcontainer, 
      habits.length > 0 && styles.bottomInputContainer,
      isKeyboardVisible && {marginBottom: 10}]}>
        
        <TextInput
          style={[styles.textinput, habit === "" && { backgroundColor: 'transparent' }]}
          placeholder={habits.length > 0 ? 'Enter another habit here...' : 'Enter your first habit here...'}
          placeholderTextColor="#D9D9D9"
          onChangeText={setHabit}
          value={habit}
        />


        {/* below is code for submit button, remember that color is in-line*/}
        <Pressable style={styles.submitButton} onPress={handleAddHabit}> 
            <Ionicons name="arrow-forward-circle-outline" size={28} color='#D9D9D9' />
        </Pressable>
    </View>
  </View>
  </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: '600',
    color: '#D9D9D9', // Light color for contrast against dark background
    marginTop: 30,
    marginBottom: 20,
    textAlign: 'center', // Align title to center
  }, 
  text: {
    fontSize: 20,
  },
  textinputcontainer: { 
    width: '85%',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textinput: {
    flex: 1, 
    height: 50,
    borderColor: '#3A3A3C',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    width: '100%',
    backgroundColor: '#2C2C2E',
    fontSize: 18,
    fontWeight: '500',
    fontStyle: 'italic',
    color: '#FFF',
    marginBottom: 30,
  },
  bottomInputContainer: {
    marginTop: 'auto', 
    marginBottom: 30,
  },
  // Style for the custom placeholder
  placeholder: {
    position: 'absolute', // Keep placeholder positioned over TextInput
    left: 15, // Align with the padding of TextInput
    top: 15, // Vertical alignment inside TextInput
    fontSize: 18,
    fontWeight: '500',
    fontStyle: 'italic',
    color: 'rgba(255, 255, 255, 0.6)',
    textShadowColor: '#000', // Add shadow to placeholder text
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
}, 
submitButton: {
  marginBottom: 30,
  marginLeft: 10,
}, 
habitsContainer: {
  marginTop: 20,
  flexGrow: 1,
  width: '85%'
},
habitItem: {
  flexDirection: 'row', // Align checkbox and text horizontally
  alignItems: 'center', // Make sure checkbox and text align properly vertically
  backgroundColor: '#2C2C2E',
  padding: 15,
  marginVertical: 5,
  borderRadius: 8,
  justifyContent: 'flex-start',
},
habitText: {
  color: '#fff',
  fontSize: 16,
  textAlign: 'left',
}, 
checkboxIcon: {
  marginRight: 15, // Add space between the checkbox and the text
},
});

export default HabitTrackerScreen;
