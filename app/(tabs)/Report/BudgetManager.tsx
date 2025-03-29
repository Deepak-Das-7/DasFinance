import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, TextInput, Modal, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { getBudgets, createBudget, deleteBudget } from "@/src/controllers/budgetController";
import { IBudget, IAccount } from "@/src/utils/types";
import { Colors } from "@/src/utils/Colors";
import { getAccounts } from "@/src/controllers/accountController";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

const BudgetManager = () => {
    const [budgets, setBudgets] = useState<IBudget[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [budgetName, setBudgetName] = useState("");
    const [amount, setAmount] = useState("");
    const [selectedAccount, setSelectedAccount] = useState<number | undefined>(undefined);
    const [accounts, setAccounts] = useState<IAccount[]>([]);

    useEffect(() => {
        loadBudgets();
        fetchAccounts();
    }, []);

    const loadBudgets = async () => setBudgets(await getBudgets());

    const fetchAccounts = async () => {
        try {
            const data = await getAccounts();
            setAccounts(data);
            if (data.length > 0) {
                setSelectedAccount(data[0].id);
            }
        } catch (error) {
            console.error("Error fetching accounts:", error);
        }
    };

    const handleAdd = async () => {
        if (!budgetName.trim() || !amount.trim() || !selectedAccount) {
            Alert.alert("Error", "All fields are required.");
            return;
        }
        await createBudget(budgetName, selectedAccount, Number(amount));
        setModalVisible(false);
        loadBudgets();
        setBudgetName("");
        setAmount("");
    };
    const handleDelete = async (id: number) => {
        Alert.alert("Confirm", "Are you sure you want to delete this budget?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => { await deleteBudget(id); loadBudgets(); },
            },
        ]);
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Budgets</Text>
            <FlatList
                data={budgets}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.budget_name} - ₹{item.amount}</Text>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)} >
                            <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)} >
                <Text style={styles.buttonText}>Add Budget</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} transparent animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.header}>
                            <Text style={styles.modalTitle}>Add Budget</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                                <Ionicons name="close" size={20} color={Colors.text.dark} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.label}>Budget Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter budget name"
                            placeholderTextColor={Colors.placeholder}
                            value={budgetName}
                            onChangeText={setBudgetName}
                        />

                        <Text style={styles.label}>Amount</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter amount"
                            placeholderTextColor={Colors.placeholder}
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={setAmount}
                        />

                        <Text style={styles.label}>Select Account</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={selectedAccount}
                                onValueChange={(value) => setSelectedAccount(value)}
                                style={styles.picker}
                            >
                                {accounts.map((account) => (
                                    <Picker.Item key={account.id} label={account.account_name} value={account.id} />
                                ))}
                            </Picker>
                        </View>

                        <TouchableOpacity style={styles.button} onPress={handleAdd}>
                            <Text style={styles.buttonText}>Create Budget</Text>
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
        backgroundColor: Colors.overlay,
    },
    modalContent: {
        width: "90%",
        maxWidth: 400,
        backgroundColor: Colors.background.light,
        padding: 20,
        borderRadius: 16,
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
    }
});

export default BudgetManager;