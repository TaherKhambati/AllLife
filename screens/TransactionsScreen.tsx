import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { dummyTransactions } from '../data/transactions'; // Adjust the path if necessary

function TransactionsScreen(): JSX.Element {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>All Transactions</Text>
      {dummyTransactions.map((transaction) => (
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  transactionDetails: {
    fontSize: 14,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default TransactionsScreen;
