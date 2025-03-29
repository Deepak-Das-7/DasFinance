import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Colors } from "@/src/utils/Colors";
import { IAccount } from "@/src/utils/types";
import { getAccounts } from "@/src/controllers/accountController";

interface Props {
    onChange: (key: string, value: string | number) => void;
}

const BudgetForm: React.FC<Props> = ({ onChange }) => {
    const [selectedAccount, setSelectedAccount] = useState<number | undefined>(undefined);
    const [accounts, setAccounts] = useState<IAccount[]>([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const data = await getAccounts();
                setAccounts(data);
                console.log(data)
                if (data.length > 0) {
                    setSelectedAccount(data[0].id);
                    onChange("account_id", data[0].id);
                }
            } catch (error) {
                console.error("Error fetching accounts:", error);
            }
        };

        fetchAccounts();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Budget Name:</Text>
            <TextInput style={styles.input} onChangeText={(value) => onChange("budget_name", value)} />

            <Text style={styles.label}>Amount:</Text>
            <TextInput style={styles.input} keyboardType="numeric" onChangeText={(value) => onChange("amount", Number(value))} />

            <Text style={styles.label}>Select Account:</Text>
            <Picker
                selectedValue={selectedAccount}
                onValueChange={(value) => {
                    if (value !== null) {
                        setSelectedAccount(value);
                        onChange("account_id", value);
                    }
                }}
                style={styles.picker}
            >
                {accounts.map((account) => (
                    <Picker.Item key={account.id} label={account.account_name} value={account.id} />
                ))}
            </Picker>
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
    picker: {
        height: 60,
        backgroundColor: Colors.background.light,
        borderRadius: 8,
        marginBottom: 10,
    },
});
