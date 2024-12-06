import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function ExpensesScreen(): JSX.Element {
  // State to determine if the user is a first-time user
  const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean>(true);

  return (
    <View style={styles.container}>
      {isFirstTimeUser ? (
        // Placeholder for the onboarding flow
        <OnboardingFlow setIsFirstTimeUser={setIsFirstTimeUser} />
      ) : (
        // Placeholder for the returning user dashboard
        <ReturningUserDashboard />
      )}
    </View>
  );
}

// Onboarding Flow Component
function OnboardingFlow({ setIsFirstTimeUser }: { setIsFirstTimeUser: (isFirstTimeUser: boolean) => void }): JSX.Element {
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
        return <ReturningUserDashboard />;
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
function ReturningUserDashboard(): JSX.Element {
  return (
    <View style={styles.dashboardContainer}>
      <Text style={styles.text}>Welcome Back! This is your dashboard.</Text>
      {/* Add main dashboard components here, such as DailyAllowanceOverview, TransactionFeed, etc. */}
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
  onboardingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashboardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
