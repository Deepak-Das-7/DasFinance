import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/src/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import GradientBackground from "../GradientBackground";

const BudgetFinanceOverview = () => {
    const data: {
        title: string;
        amount: number;
        colors: [string, string, ...string[]];
        icon: JSX.Element;
    }[] = [
            {
                title: "Total Expenses",
                amount: 2000,
                colors: [Colors.status.error, Colors.status.warning], // Tuple
                icon: <MaterialIcons name="money-off" size={24} color={Colors.button.primary} />,
            },
            {
                title: "NET Budget",
                amount: 22000,
                colors: [Colors.status.success, Colors.status.success, Colors.status.warning], // Tuple
                icon: <Ionicons name="wallet" size={24} color={Colors.button.primary} />,
            },
        ];


    return (
        <View style={styles.container}>
            {data.map((item, index) => (
                <GradientBackground key={index} colors={item.colors} gradientStyle={styles.box}>
                    <View style={styles.titleBox}>
                        {item.icon}
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                    <View style={styles.amountBox}>
                        <MaterialIcons name="currency-rupee" size={24} color="white" />
                        <Text style={styles.amount}>{item.amount}</Text>
                    </View>
                </GradientBackground>
            ))}
        </View>
    );
};

export default BudgetFinanceOverview;

const styles = StyleSheet.create({
    container: {
        flex: 9,
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
