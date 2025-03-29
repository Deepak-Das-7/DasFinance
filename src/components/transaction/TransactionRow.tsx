import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "@/src/utils/Colors";
import { router } from "expo-router";

interface TransactionProps {
    id: string;
    date: Date;
    amount: number;
    note?: string;
    type: "credit" | "debit";
}

const TransactionRow: React.FC<TransactionProps> = ({ id, date, amount, note, type }) => {
    return (
        <Pressable
            style={styles.row}
            onPress={() => {
                router.push({ pathname: "/(tabs)/Transaction/[id]", params: { id } });
            }}
        >
            {/* Date */}
            <Text style={[styles.cell, styles.date]}>{new Date(date).toLocaleDateString("en-GB")}</Text>

            {/* Amount */}
            <Text style={[styles.cell, styles.amount]}>{amount}</Text>

            {/* Description (More Space Allocated) */}
            <Text style={[styles.cell, styles.note]}>
                {note ? (note.length > 33 ? note.slice(0, 30) + "..." : note) : "-"}
            </Text>

            {/* Transaction Type */}
            <View style={[styles.typeBadge, type === "credit" ? styles.incomeBadge : styles.expenseBadge]}>
                <Text style={styles.typeText}>{type}</Text>
            </View>
        </Pressable>
    );
};

export default TransactionRow;

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        // backgroundColor: Colors.background.light,
        backgroundColor: "rgba(255, 255, 255, 0.292)",
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginBottom: 3,
        borderRadius: 7,
        alignItems: "center",
    },
    cell: {
        fontSize: 12,
        color: Colors.button.secondary,
    },
    date: {
        flex: 1,
        color: Colors.button.secondary,
        fontSize: 10
    },
    amount: {
        flex: 1, // Less space for Amount
        fontWeight: "bold",
        textAlign: "center"
    },
    note: {
        flex: 2.5, // More space for Description
        fontSize: 12,
        fontStyle: "italic",
    },
    typeBadge: {
        flex: 0.5,
        paddingHorizontal: 5,
        borderRadius: 6,
        alignItems: "center",
    },
    incomeBadge: {
        backgroundColor: "rgba(56, 248, 31, 0.353)",
    },
    expenseBadge: {
        backgroundColor: "rgba(255, 13, 0, 0.223)",
    },
    typeText: {
        fontSize: 12,
        textTransform: "capitalize",
    },
});
