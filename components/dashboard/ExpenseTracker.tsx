import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/src/Colors";

type FinanceCardProps = {
    title: string;
    amount: string;
    type: "success" | "error"; // success for budget, error for expenses
};

const FinanceCard = ({ title, amount, type }: FinanceCardProps) => {
    return (
        <View style={[styles.container, { backgroundColor: type === "success" ? Colors.status.success : Colors.status.error }]}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.amount}>₹{amount}</Text>
        </View>
    );
};

export default FinanceCard;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.background.light,
    },
    amount: {
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.background.light,
    },
});
