import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '@/src/utils/Colors';

const transactions = [
    { id: '1', title: 'Grocery Shopping', amount: -2500, date: 'Feb 20' },
    { id: '2', title: 'Salary', amount: 50000, date: 'Feb 18' },
    { id: '3', title: 'Electricity Bill', amount: -1200, date: 'Feb 15' },
];

// Format currency properly
const formatAmount = (amount: number) =>
    `${amount < 0 ? '-' : '+'}₹${Math.abs(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

const RecentTransactions = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={transactions}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<Text style={styles.title}>Recent Transactions</Text>}
                nestedScrollEnabled={true}
                renderItem={({ item }) => (
                    <View style={styles.transactionItem}>
                        <Text style={styles.transactionTitle}>{item.title}</Text>
                        <Text style={[styles.transactionAmount, item.amount > 0 ? styles.income : styles.expense]}>
                            {formatAmount(item.amount)}
                        </Text>
                    </View>
                )}
                ItemSeparatorComponent={() => <View style={styles.divider} />}
            />
        </View>
    );
};

export default RecentTransactions;

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background.dark,
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.background.light,
        marginBottom: 10,
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    transactionTitle: {
        fontSize: 16,
        color: Colors.background.light,
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    income: {
        color: Colors.status.success,
    },
    expense: {
        color: Colors.status.error,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.background.light,
        opacity: 0.2,
        marginVertical: 4,
    },
});
