import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Colors } from "@/src/utils/Colors";

interface Props {
    onChange: (key: string, value: string | number) => void;
}

const AccountForm: React.FC<Props> = ({ onChange }) => (
    <View style={styles.container}>
        <Text style={styles.label}>Account Name:</Text>
        <TextInput style={styles.input} onChangeText={(value) => onChange("account_name", value)} />

        <Text style={styles.label}>Balance:</Text>
        <TextInput style={styles.input} keyboardType="numeric" onChangeText={(value) => onChange("balance", Number(value))} />
    </View>
);

export default AccountForm;

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
