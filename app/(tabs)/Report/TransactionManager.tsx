import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    Button,
    TextInput,
    Modal,
    StyleSheet,
    TouchableOpacity,
    Alert
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getTransactions, createTransaction, deleteTransaction } from "@/src/controllers/transactionController";
import { getBudgets } from "@/src/controllers/budgetController";
import { getAccounts } from "@/src/controllers/accountController";
import { ITransaction, IBudget, IAccount } from "@/src/utils/types";
import { Colors } from "@/src/utils/Colors";
import { Ionicons } from "@expo/vector-icons";

const TransactionManager = () => {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);
    const [budgets, setBudgets] = useState<IBudget[]>([]);
    const [accounts, setAccounts] = useState<IAccount[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [amount, setAmount] = useState("");
    const [selectedBudget, setSelectedBudget] = useState<number | null>(null);
    const [selectedAccount, setSelectedAccount] = useState<number | null>(null);
    const [type, setType] = useState<"credit" | "debit">("debit");
    const [note, setNote] = useState("");

    useEffect(() => {
        loadTransactions();
        loadBudgets();
        loadAccounts();
    }, []);

    const loadTransactions = async () => setTransactions(await getTransactions());
    const loadBudgets = async () => setBudgets(await getBudgets());
    const loadAccounts = async () => setAccounts(await getAccounts());

    const handleAdd = async () => {
        if (!selectedBudget || !selectedAccount || !amount.trim()) {
            Alert.alert("Error", "Please fill all fields.");
            return;
        }
        try {
            await createTransaction(Number(amount), type, selectedBudget, selectedAccount, note);
            Alert.alert("Success", "Transaction added successfully!");
            setAmount("");
            setType("debit");
            setNote("");
            setModalVisible(false);
            loadTransactions();
        } catch (error) {
            Alert.alert("Error", "Failed to add transaction.");
        }
    };
    const handleDelete = async (id: number) => {
        Alert.alert("Confirm", "Are you sure you want to delete this entry?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => { deleteTransaction(id); loadTransactions() }
            },
        ]);
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Transactions</Text>
            <FlatList
                data={transactions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.type.toUpperCase()} - ₹{item.amount}</Text>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)} >
                            <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)} >
                <Text style={styles.buttonText}>Add Transanction</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} transparent>
                <View style={styles.overlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.header}>
                            <Text style={styles.modalTitle}>Add Transanction</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                                <Ionicons name="close" size={20} color={Colors.text.dark} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.label}>Amount</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter amount"
                            placeholderTextColor={Colors.placeholder}
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={setAmount}
                        />

                        <Text style={styles.label}>Transaction Type</Text>
                        <View style={styles.pickerContainer}>
                            <Picker selectedValue={type} onValueChange={setType} style={styles.picker}>
                                <Picker.Item label="Debit" value="debit" />
                                <Picker.Item label="Credit" value="credit" />
                            </Picker>
                        </View>

                        <Text style={styles.label}>Select Budget</Text>
                        <View style={styles.pickerContainer}>
                            <Picker selectedValue={selectedBudget} onValueChange={setSelectedBudget} style={styles.picker}>
                                {budgets.map((budget) => (
                                    <Picker.Item key={budget.id} label={budget.budget_name} value={budget.id} />
                                ))}
                            </Picker>
                        </View>

                        <Text style={styles.label}>Select Account</Text>
                        <View style={styles.pickerContainer}>
                            <Picker selectedValue={selectedAccount} onValueChange={setSelectedAccount} style={styles.picker}>
                                {accounts.map((account) => (
                                    <Picker.Item key={account.id} label={account.account_name} value={account.id} />
                                ))}
                            </Picker>
                        </View>

                        <Text style={styles.label}>Note (optional)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter a note"
                            placeholderTextColor={Colors.placeholder}
                            value={note}
                            onChangeText={setNote}
                        />

                        <TouchableOpacity style={styles.button} onPress={handleAdd}>
                            <Text style={styles.buttonText}>Submit Transaction</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: Colors.background.light,
        marginBottom: 12,
        borderRadius: 12,
        shadowColor: Colors.shadow.dark,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
    },
    deleteButton: {
        padding: 3,
        backgroundColor: Colors.status.error,
        borderRadius: 7
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 12,
        color: Colors.text.black,
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border.light,
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.overlay
    },
    modalContainer: {
        width: "90%",
        maxWidth: 400,
        backgroundColor: Colors.background.light,
        padding: 20,
        borderRadius: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    closeButton: {
        padding: 5,
        borderRadius: 20,
        backgroundColor: Colors.background.dark,
    },
    content: {
        marginTop: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 5,
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: Colors.border.light,
        padding: 12,
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: Colors.background.light,
    },
    button: {
        backgroundColor: Colors.button.primary,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },

    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: 350,
        backgroundColor: Colors.background.light,
        padding: 20,
        borderRadius: 12,
        shadowColor: Colors.shadow.dark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },

    pickerContainer: {
        borderWidth: 1,
        borderColor: Colors.border.light,
        borderRadius: 10,
        backgroundColor: Colors.background.light,
        marginBottom: 15,
    },
    picker: {
        height: 50,
        color: Colors.text.black,
    },

    cancelButton: {
        backgroundColor: Colors.button.secondary,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    cancelButtonText: {
        color: Colors.text.light,
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default TransactionManager;