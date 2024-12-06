import React, { createContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define UserProfile interface
interface UserProfile {
  userId: string;
  name: string;
  email: string;
  hasCompletedOnboarding: boolean;
  linkedAccounts?: boolean;
  income?: number;
  savingsGoal?: number;
  // Add other fields as needed
}

// Define UserContextType interface for context value
interface UserContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
}

// Create UserContext
export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Function to load user profile from AsyncStorage
    const loadUserProfile = async () => {
      try {
        const profileString = await AsyncStorage.getItem('userProfile');
        if (profileString) {
          setUserProfile(JSON.parse(profileString));
        }
      } catch (error) {
        console.error('Failed to load user profile:', error);
      }
    };

    loadUserProfile();
  }, []);

  // Function to save user profile to AsyncStorage
  const saveUserProfile = async (profile: UserProfile) => {
    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
      setUserProfile(profile);
    } catch (error) {
      console.error('Failed to save user profile:', error);
    }
  };

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile: saveUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

