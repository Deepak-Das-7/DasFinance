import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Colors } from "@/src/utils/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import GradientBackground from "../GradientBackground";
import { IAccount } from "@/src/utils/types";
import { getAccounts } from "@/src/controllers/accountController";

const Budget = () => {
    const [totalBalance, setTotalBalance] = useState(0);
    const [loading, setLoading] = useState(false);

    const loadAccounts = async () => {
        setLoading(true);
        const accounts = await getAccounts();
        const total = accounts.reduce((sum: number, acc: IAccount) => sum + acc.balance, 0);
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
            <GradientBackground colors={[Colors.status.success, Colors.status.success, Colors.status.warning]} gradientStyle={styles.box}>
                <View style={styles.titleBox}>
                    <Ionicons name="wallet" size={24} color={Colors.button.primary} />
                    <Text style={styles.title}>NET Budget</Text>
                </View>
                <View style={styles.amountBox}>
                    <MaterialIcons name="currency-rupee" size={24} color="white" />
                    <Text style={styles.amount}>{totalBalance}</Text>
                </View>
            </GradientBackground>
        </View>
    );
};

export default Budget;

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
        height: 70,
    },
    titleBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
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
