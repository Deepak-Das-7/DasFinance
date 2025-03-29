import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '@/src/utils/Colors';

type TransactionProps = {
    transaction: {
        id: string;
        title: string;
        amount: number;
        date: string;
    };
};

const TransactionItem: React.FC<TransactionProps> = ({ transaction }) => {
    return (
        <View style={styles.item}>
            <View>
                <Text style={styles.title}>{transaction.title}</Text>
                <Text style={styles.date}>{transaction.date}</Text>
            </View>
            <Text style={[styles.amount, transaction.amount < 0 ? styles.expense : styles.income]}>
                ₹{transaction.amount}
            </Text>
        </View>
    );
};

export default TransactionItem;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: Colors.background.dark,
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.text.light,
    },
    date: {
        fontSize: 14,
        color: Colors.text.light,
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    expense: {
        color: Colors.status.error, // Red for expenses
    },
    income: {
        color: Colors.status.success, // Green for income
    },
});
