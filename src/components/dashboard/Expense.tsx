import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/src/utils/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import GradientBackground from "../GradientBackground";
import { IAccount } from "@/src/utils/types";

const Expense = () => {
    const [account, setAccount] = useState<IAccount>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAccount();
    }, []);

    const loadAccount = async () => {
        setLoading(true);
        // const data = await fetchDefaultAccount(userId);
        // setAccount(data);
        setLoading(false);
    };


    return (
        <View style={styles.container}>
            <GradientBackground colors={[Colors.status.error, Colors.status.warning]} gradientStyle={styles.box}>
                <View style={styles.titleBox}>
                    <MaterialIcons name="money-off" size={24} color={Colors.button.primary} />
                    <Text style={styles.title}>Total Expenses</Text>
                </View>
                <View style={styles.amountBox}>
                    <MaterialIcons name="currency-rupee" size={24} color="white" />
                    <Text style={styles.amount}>{account?.balance}</Text>
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
