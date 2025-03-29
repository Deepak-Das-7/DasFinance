import React, { useState, useCallback } from "react";
import { StyleSheet, FlatList, ActivityIndicator, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Colors } from "@/src/utils/Colors";
import GradientBackground from "@/src/components/GradientBackground";
import Header from "@/src/components/Header";
import TransactionTableHeader from "@/src/components/transaction/TransactionTableHeader";
import TransactionRow from "@/src/components/transaction/TransactionRow";
import { ITransaction } from "@/src/utils/types";
import { getTransactions } from "@/src/controllers/transactionController";

const Transactions = () => {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);
    const [loading, setLoading] = useState(true);

    const loadTransactions = async () => {
        setLoading(true);
        try {
            const data = await getTransactions();
            setTransactions(data);
        } catch (error) {
            console.error("Failed to fetch transactions:", error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadTransactions();
        }, [])
    );

    return (
        <GradientBackground>
            <Header title="Transactions" />
            <TransactionTableHeader />

            {loading ? (
                <ActivityIndicator size="small" color={Colors.primary} style={styles.loader} />
            ) : transactions.length === 0 ? (
                <Text style={styles.emptyText}>No transactions available</Text>
            ) : (
                <FlatList
                    data={transactions}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TransactionRow
                            id={item.id.toString()}
                            date={item.created_at}
                            amount={item.amount}
                            note={item.note}
                            type={item.type}
                        />
                    )}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </GradientBackground>
    );
};

export default Transactions;

const styles = StyleSheet.create({
    listContent: {
        paddingBottom: 100,
    },
    loader: {
        marginTop: 20,
    },
    emptyText: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
        color: Colors.text.muted,
    },
});
