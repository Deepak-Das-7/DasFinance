import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Colors } from "@/src/utils/Colors";
import { IAccount, IBudget } from "@/src/utils/types";
import { getAccounts } from "@/src/controllers/accountController";
import { getBudgets } from "@/src/controllers/budgetController";

interface Props {
    onChange: (key: string, value: string | number) => void;
}

const TransactionForm: React.FC<Props> = ({ onChange }) => {
    const [selectedAccount, setSelectedAccount] = useState<number | undefined>();
    const [selectedBudget, setSelectedBudget] = useState<number | undefined>();
    const [accounts, setAccounts] = useState<IAccount[]>([]);
    const [budgets, setBudgets] = useState<IBudget[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accountsData = await getAccounts();
                const budgetsData = await getBudgets();
                setAccounts(accountsData);
                setBudgets(budgetsData);

                // Set default selections if data is available
                if (accountsData.length > 0) {
                    setSelectedAccount(accountsData[0].id);
                    onChange("account_id", accountsData[0].id);
                }
                if (budgetsData.length > 0) {
                    setSelectedBudget(budgetsData[0].id);
                    onChange("budgetId", budgetsData[0].id);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Select Account:</Text>
            <Picker
                selectedValue={selectedAccount}
                onValueChange={(value) => {
                    setSelectedAccount(value);
                    onChange("account_id", value);
                }}
                style={styles.picker}
            >
                {accounts.map((account) => (
                    <Picker.Item key={account.id} label={account.account_name} value={account.id} />
                ))}
            </Picker>

            <Text style={styles.label}>Amount:</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(value) => onChange("amount", Number(value))}
            />

            <Text style={styles.label}>Transaction Type:</Text>
            <Picker
                selectedValue={"debit"}
                onValueChange={(value) => onChange("type", value)}
                style={styles.picker}
            >
                <Picker.Item label="Debit" value="debit" />
                <Picker.Item label="Credit" value="credit" />
            </Picker>

            <Text style={styles.label}>Select Budget:</Text>
            <Picker
                selectedValue={selectedBudget}
                onValueChange={(value) => {
                    setSelectedBudget(value);
                    onChange("budgetId", value);
                }}
                style={styles.picker}
            >
                {budgets.map((budget) => (
                    <Picker.Item key={budget.id} label={budget.budget_name} value={budget.id} />
                ))}
            </Picker>

            <Text style={styles.label}>Note (optional):</Text>
            <TextInput style={styles.input} onChangeText={(value) => onChange("note", value)} />
        </View>
    );
};

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
