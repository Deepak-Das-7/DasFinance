import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/src/utils/Colors";

const TransactionTableHeader = () => {
    return (
        <View style={styles.header}>
            <Text style={[styles.headerCell, styles.date]}>Date</Text>
            <Text style={[styles.headerCell, styles.amount]}>Amount</Text>
            <Text style={[styles.headerCell, styles.description]}>Description</Text>
            <Text style={[styles.headerCell, styles.type]}>Type</Text>
        </View>
    );
};

export default TransactionTableHeader;

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        backgroundColor: Colors.button.secondary,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginBottom: 6,
    },
    headerCell: {
        fontSize: 12,
        fontWeight: "bold",
        color: Colors.background.light,
    },
    date: {
        flex: 1, // Matches TransactionRow
    },
    amount: {
        flex: 1, // Matches TransactionRow
    },
    description: {
        flex: 2.5, // More space for description
    },
    type: {
        flex: 0.5, // Matches TransactionRow
    },
});
