import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Colors } from '@/src/Colors';
import GradientBackground from '@/components/GradientBackground';

const transactions = [
    { id: '1', type: 'Debit', title: 'Grocery Shopping', amount: -2500, date: 'Feb 20, 2025' },
    { id: '2', type: 'Credit', title: 'Salary', amount: 50000, date: 'Feb 18, 2025' },
    { id: '3', type: 'Debit', title: 'Electricity Bill', amount: -1200, date: 'Feb 15, 2025' },
    { id: '4', type: 'Debit', title: 'Internet Bill', amount: -1000, date: 'Feb 10, 2025' },
    { id: '5', type: 'Credit', title: 'Freelancing', amount: 12000, date: 'Feb 5, 2025' },
    { id: '6', type: 'Debit', title: 'Gym Membership', amount: -2000, date: 'Feb 1, 2025' },
    { id: '7', type: 'Credit', title: 'Stock Dividend', amount: 3000, date: 'Jan 28, 2025' },
    { id: '8', type: 'Debit', title: 'Movie Ticket', amount: -500, date: 'Jan 25, 2025' },
];

const Transactions = () => {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const itemsPerPage = 15;

    const paginatedData = transactions.slice(0, page * itemsPerPage);

    const loadMoreData = () => {
        if (paginatedData.length < transactions.length && !loading) {
            setLoading(true);
            setTimeout(() => {
                setPage(page + 1);
                setLoading(false);
            }, 1000);
        }
    };

    return (
        <GradientBackground>

            <Text style={styles.header}>Transactions</Text>

            {/* Table Header */}
            <View style={styles.tableHeader}>
                <Text style={styles.headerCell}>Date</Text>
                <Text style={styles.headerCell}>Amount</Text>
                <Text style={styles.headerCell}>Description</Text>
                <Text style={styles.headerCell}>Type</Text>
            </View>

            {/* Table Rows */}
            <FlatList
                data={paginatedData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.tableRow}>
                        <Text style={[styles.cell, styles.date]}>{item.date}</Text>
                        <Text style={styles.cell}>{item.amount}</Text>
                        <Text style={styles.cell}>{item.title}</Text>
                        <Text style={[styles.cell, item.type === 'Credit' ? styles.income : styles.expense]}>
                            {item.type}
                        </Text>
                    </View>
                )}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading ? <ActivityIndicator size="small" color={Colors.primary} /> : null}
            />
        </GradientBackground>
    );
};

export default Transactions;

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.button.danger,
        textAlign: 'center',
        marginBottom: 16,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: Colors.button.secondary,
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 8,
        marginBottom: 5,
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        color: Colors.background.light,
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        backgroundColor: Colors.background.light,
        paddingVertical: 8,
        paddingHorizontal: 5,
        marginBottom: 2,
        borderRadius: 8,
        elevation: 2,
    },
    cell: {
        flex: 1,
        paddingHorizontal: 2,
        color: Colors.button.secondary,
        fontSize: 12,
    },
    date: {
        fontSize: 12,
    },
    income: {
        color: Colors.status.success,
    },
    expense: {
        color: Colors.status.error,
    },
    listContent: {
        paddingBottom: 100,
    },
});
