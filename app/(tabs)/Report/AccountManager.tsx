import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, TextInput, Modal, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { getAccounts, createAccount, deleteAccount } from "@/src/controllers/accountController";
import { IAccount } from "@/src/utils/types";
import { Colors } from "@/src/utils/Colors";
import { Ionicons } from "@expo/vector-icons";

const AccountManager = () => {
    const [accounts, setAccounts] = useState<IAccount[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [accountName, setAccountName] = useState("");
    const [balance, setBalance] = useState("");

    useEffect(() => {
        loadAccounts();
    }, []);

    const loadAccounts = async () => setAccounts(await getAccounts());

    const handleAdd = async () => {
        if (!accountName.trim()) {
            Alert.alert("Error", "Account name cannot be empty.");
            return;
        }

        if (isNaN(Number(balance)) || Number(balance) < 0) {
            Alert.alert("Error", "Balance must be a non-negative number.");
            return;
        }

        try {
            await createAccount(accountName, Number(balance));
            Alert.alert("Success", "Account created successfully!");
            setAccountName("");
            setBalance("");
            setModalVisible(false);
            loadAccounts();
        } catch (error) {
            Alert.alert("Error", "Failed to create account.");
        }
    };


    const handleDelete = async (id: number) => {
        Alert.alert("Confirm", "Are you sure you want to delete this account?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                    await deleteAccount(id);
                    loadAccounts();
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Accounts</Text>
            <FlatList
                data={accounts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.account_name} - ₹{item.balance}</Text>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)} >
                            <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)} >
                <Text style={styles.buttonText}>Add Account</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} transparent animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.header}>
                            <Text style={styles.modalTitle}>Add Account</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                                <Ionicons name="close" size={20} color={Colors.text.dark} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.content}>
                            <Text style={styles.label}>Account Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter account name"
                                placeholderTextColor={Colors.placeholder}
                                value={accountName}
                                onChangeText={setAccountName}
                            />

                            <Text style={styles.label}>Balance</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter balance"
                                placeholderTextColor={Colors.placeholder}
                                keyboardType="numeric"
                                value={balance}
                                onChangeText={setBalance}
                            />

                            <TouchableOpacity style={styles.button} onPress={handleAdd}>
                                <Text style={styles.buttonText}>Create Account</Text>
                            </TouchableOpacity>
                        </View>
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
    deleteButton: {
        padding: 3,
        backgroundColor: Colors.status.error,
        borderRadius: 7
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
});

export default AccountManager;