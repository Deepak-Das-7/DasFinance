import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/src/utils/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import GradientBackground from "../GradientBackground";
import { IBudget } from "@/src/utils/types";
import { getBudgets } from "@/src/controllers/budgetController";
import { useFocusEffect } from "expo-router";

const Expense = () => {
    const [totalBalance, setTotalBalance] = useState(0);
    const [loading, setLoading] = useState(false);

    const loadAccounts = async () => {
        setLoading(true);
        const budgets = await getBudgets();
        const total = budgets.reduce((sum: number, acc: IBudget) => sum + acc.amount, 0);
        setTotalBalance(total);
        setLoading(false);
    };

    useFocusEffect(
        useCallback(() => {
            loadAccounts();
        }, [])
    );

    return (
        <View style={styles.container}>
            <GradientBackground colors={[Colors.status.error, Colors.status.warning]} gradientStyle={styles.box}>
                <View style={styles.amountBox}>
                    <MaterialIcons name="currency-rupee" size={24} color="white" />
                    <Text style={styles.amount}>{totalBalance}</Text>
                </View>
                <View style={styles.titleBox}>
                    <MaterialIcons name="money-off" size={24} color={Colors.button.primary} />
                    <Text style={styles.title}>Total Expenses</Text>
                </View>
            </GradientBackground>
        </View>
    );
};

export default Expense;

const styles = StyleSheet.create({
    container: {
        flex: 4,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 5
    },
    box: {
        padding: 10,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        height: 70, // Fixed height for all cards
    },
    titleBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        marginRight: 6,
    },
    title: {
        fontSize: 12,
        fontWeight: "600",
        color: Colors.text.black,
    },
    amountBox: {
        flexDirection: "row",
        alignItems: "center",
    },
    amount: {
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.background.light,
        marginLeft: 4,
    },
});
