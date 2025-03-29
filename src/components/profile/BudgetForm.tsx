import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Colors } from "@/src/utils/Colors";

interface Props {
    onChange: (key: string, value: string | number) => void;
}

const BudgetForm: React.FC<Props> = ({ onChange }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Budget Name:</Text>
            <TextInput style={styles.input} onChangeText={(value) => onChange("budget_name", value)} />
            <Text style={styles.label}>Amount:</Text>
            <TextInput style={styles.input} keyboardType="numeric" onChangeText={(value) => onChange("amount", Number(value))} />

            <Text style={styles.label}>Account ID:</Text>
            <TextInput style={styles.input} keyboardType="numeric" onChangeText={(value) => onChange("account_id", Number(value))} />


        </View>
    );
};

export default BudgetForm;

const styles = StyleSheet.create({
    container: { padding: 10 },
    label: { fontSize: 12, marginBottom: 5 },
    input: {
        borderWidth: 1,
        borderColor: Colors.border.light,
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: Colors.background.light,
    },
});
