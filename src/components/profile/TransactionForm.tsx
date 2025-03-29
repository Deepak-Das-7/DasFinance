import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Colors } from "@/src/utils/Colors";

interface Props {
    onChange: (key: string, value: string | number) => void;
    type: string | undefined;
}

const TransactionForm: React.FC<Props> = ({ onChange, type }) => (
    <View style={styles.container}>
        <Text style={styles.label}>Account ID:</Text>
        <TextInput style={styles.input} keyboardType="numeric" onChangeText={(value) => onChange("account_id", Number(value))} />

        <Text style={styles.label}>Amount:</Text>
        <TextInput style={styles.input} keyboardType="numeric" onChangeText={(value) => onChange("amount", Number(value))} />

        <Text style={styles.label}>Transaction Type:</Text>
        <Picker selectedValue={type} onValueChange={(value) => onChange("type", value)} style={styles.picker}>
            <Picker.Item label="Debit" value="debit" />
            <Picker.Item label="Credit" value="credit" />
        </Picker>

        <Text style={styles.label}>Budget ID:</Text>
        <TextInput style={styles.input} keyboardType="numeric" onChangeText={(value) => onChange("budgetId", Number(value))} />

        <Text style={styles.label}>Note (optional):</Text>
        <TextInput style={styles.input} onChangeText={(value) => onChange("note", value)} />
    </View>
);

export default TransactionForm;

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
    picker: {
        height: 50,
        backgroundColor: Colors.background.light,
        borderRadius: 8,
        marginBottom: 15,
    },
});
