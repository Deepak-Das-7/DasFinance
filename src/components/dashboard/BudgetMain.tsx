import { StyleSheet, View } from "react-native";
import React from "react";
import Budget from "./Budget";
import Expense from "./Expense";

const BudgetMain = () => {

    return (
        <View style={styles.container}>
            <Expense />
            <Budget />
        </View>
    );
};

export default BudgetMain;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
    }
});
