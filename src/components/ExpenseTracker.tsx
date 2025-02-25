// components/ExpenseTracker.tsx
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '@/src/Colors';

const ExpenseTracker = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Total Expenses</Text>
            <Text style={styles.amount}>₹12,350</Text>
        </View>
    );
};

export default ExpenseTracker;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.status.error,
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.background.light,
    },
    amount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.background.light,
    },
});
