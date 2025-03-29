import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { getBudgets } from "@/src/controllers/budgetController";
import { getAccounts } from "@/src/controllers/accountController";
import { getTransactions } from "@/src/controllers/transactionController";

export default function DatabaseScreen() {
    const fetchAccounts = async () => {
        const accounts = await getAccounts();
        console.log("Accounts:", accounts);
    };

    const fetchTransactions = async () => {
        const transactions = await getTransactions();
        console.log("Transactions:", transactions);
    };

    const fetchBudgets = async () => {
        const budgets = await getBudgets();
        console.log("Budgets:", budgets);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={fetchAccounts}>
                <Text style={styles.buttonText}>Get Accounts</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={fetchTransactions}>
                <Text style={styles.buttonText}>Get Transactions</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={fetchBudgets}>
                <Text style={styles.buttonText}>Get Budgets</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    button: {
        backgroundColor: "#007bff91",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10,
        width: "80%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
