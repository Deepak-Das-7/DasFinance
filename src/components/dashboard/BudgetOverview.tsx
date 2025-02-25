// components/BudgetOverview.tsx
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '@/src/Colors';

const BudgetOverview = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Budget Remaining</Text>
            <Text style={styles.amount}>₹25,000</Text>
        </View>
    );
};

export default BudgetOverview;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.status.success,
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
