import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import BudgetFinanceOverview from "./BudgetFinanceOverview";
import GradientBackground from "../GradientBackground";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/src/Colors";
import { router } from "expo-router";

const BudgetMain = () => {
    const BudgetPageOpen = () => {
        console.log("going")
        router.push("/Dashboard/Budget")
    };


    return (
        <View style={styles.container}>
            <BudgetFinanceOverview />
            <GradientBackground colors={["pink", "blue"]} gradientStyle={styles.gradientBox}>
                <TouchableOpacity style={styles.button} onPress={BudgetPageOpen} activeOpacity={0.7}>
                    <Ionicons name="eye" size={28} color={Colors.background.light} />
                    <Text style={styles.buttonText}>Explore</Text>
                </TouchableOpacity>
            </GradientBackground>
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
        gap: 5,
    },
    gradientBox: {
        flex: 1,
        height: 70,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 6,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
    },
    buttonText: {
        color: Colors.background.light,
        fontSize: 9,
    },
});
