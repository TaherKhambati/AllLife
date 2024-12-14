import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { dummyTransactions } from '../data/transactions'; // Adjust the path as needed
import { useNavigation } from '@react-navigation/native';


export default function ExpensesScreen(): JSX.Element {
  const navigation = useNavigation();
  const userContext = useContext(UserContext);

  if (!userContext) {
      throw new Error('UserContext must be used within a UserProvider');
  }

  const { userProfile } = userContext;

  // State to determine if the user is a first-time user
  const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean>(true);

  return (
    <View style={styles.container}>
      {isFirstTimeUser ? (
        // Placeholder for the onboarding flow
        <OnboardingFlow setIsFirstTimeUser={setIsFirstTimeUser} navigation={navigation} />
      ) : (
        // Placeholder for the returning user dashboard
        <ReturningUserDashboard navigation={navigation} />
      )}
    </View>
  );
}

// Onboarding Flow Component
function OnboardingFlow({ setIsFirstTimeUser, navigation }: { setIsFirstTimeUser: (isFirstTimeUser: boolean) => void; navigation: any }): JSX.Element {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const renderCurrentStep = (): JSX.Element => {
    switch (currentStep) {
      case 0:
        return <WelcomeScreen onNext={() => setCurrentStep(1)} />;
      case 1:
        return <LinkAccountsScreen onNext={() => setCurrentStep(2)} />;
      case 2:
        return <GatherFinancialInfoScreen onNext={() => setCurrentStep(3)} />;
      case 3:
        return <SetPreferencesScreen onNext={() => setCurrentStep(4)} />;
      case 4:
        return <ConfirmationScreen onFinish={() => setIsFirstTimeUser(false)} />;
      default:
        return <ReturningUserDashboard navigation={navigation} />
        ;
    }
  };

  return <>{renderCurrentStep()}</>;
}

// Placeholder Components for Onboarding Steps
function WelcomeScreen({ onNext }: { onNext: () => void }): JSX.Element {
  return (
    <View style={styles.onboardingContainer}>
      <Text style={styles.text}>Welcome to the Expense Tracker!</Text>
      <Button title="Next" onPress={onNext} />
    </View>
  );
}

// Updated LinkAccountsScreen with Plaid Integration Placeholder
function LinkAccountsScreen({ onNext }: { onNext: () => void }): JSX.Element {
  // Placeholder for Plaid Link integration
  const handleLinkAccounts = () => {
    console.log('Placeholder: Plaid Link flow would be initiated here.');
    onNext();
  };

  return (
    <View style={styles.onboardingContainer}>
      <Text style={styles.text}>Link your financial accounts here.</Text>
      <Button title="Link Accounts" onPress={handleLinkAccounts} />
    </View>
  );
}

function GatherFinancialInfoScreen({ onNext }: { onNext: () => void }): JSX.Element {
  return (
    <View style={styles.onboardingContainer}>
      <Text style={styles.text}>Provide your financial information.</Text>
      <Button title="Next" onPress={onNext} />
    </View>
  );
}

function SetPreferencesScreen({ onNext }: { onNext: () => void }): JSX.Element {
  return (
    <View style={styles.onboardingContainer}>
      <Text style={styles.text}>Set your preferences.</Text>
      <Button title="Next" onPress={onNext} />
    </View>
  );
}

function ConfirmationScreen({ onFinish }: { onFinish: () => void }): JSX.Element {
  return (
    <View style={styles.onboardingContainer}>
      <Text style={styles.text}>You are all set! Welcome aboard.</Text>
      <Button title="Finish" onPress={onFinish} />
    </View>
  );
}

// Returning User Dashboard Component Placeholder
function ReturningUserDashboard({ navigation }: { navigation: any }): JSX.Element {
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  const recentTransactions = dummyTransactions.slice(0, 5); // Always showing the top 5 here

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Welcome Back! This is your dashboard.</Text>

      {/* Remaining Budget Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Remaining Monthly Budget</Text>
        <Text style={styles.cardValue}>$1,250</Text>
      </View>

      {/* Daily Allowance Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Dynamic Daily Allowance</Text>
        <Text style={styles.cardValue}>$50</Text>
      </View>

      {/* Recent Transactions Section */}
      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      {recentTransactions.map((transaction) => (
        <View key={transaction.id} style={styles.transactionItem}>
          <View>
            <Text style={styles.transactionTitle}>{transaction.title}</Text>
            <Text style={styles.transactionDetails}>
              {transaction.status} | {transaction.date}
            </Text>
          </View>
          <Text style={styles.transactionAmount}>${transaction.amount.toFixed(2)}</Text>
        </View>
      ))}
      <Button
        title="See All Transactions"
        onPress={() => navigation.navigate('Transactions')}
      />
    </ScrollView>
  );
}





const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 16, // Add padding to ensure the content doesn’t touch screen edges
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  onboardingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashboardContainer: {
    flex: 1,
    justifyContent: 'flex-start', // Align content to the top
    alignItems: 'center',
    paddingTop: 20, // Add padding at the top
    paddingHorizontal: 20, // Optional: Add horizontal padding for a cleaner look
    backgroundColor: '#f9f9f9', // Optional: Background color for the dashboard
  },
  title: {
    fontSize: 25, // Slightly larger for emphasis
    fontWeight: 'bold',
    marginBottom: 20, // Space below the title
    textAlign: 'center',
    color: '#007bff', // Optional: Blue color for the title
  },
  card: {
    backgroundColor: '#e6f7ff',
    padding: 20, // Keep inner padding
    marginBottom: 20, // Spacing between cards
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    width: 300, // Set card width to a percentage of the container width
    height: 80, // Fix the height to ensure both cards are equal
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
  },
  
  cardTitle: {
    fontSize: 18,
    color: '#007bff',
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 24, // Slightly larger for better readability
    fontWeight: 'bold',
    color: '#333',
  },
  placeholderText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '90%',
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  transactionDetails: {
    fontSize: 14,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  
});
