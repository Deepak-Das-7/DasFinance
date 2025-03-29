import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, TextInput, Modal, StyleSheet } from "react-native";
import { getAccounts, createAccount, deleteAccount } from "@/src/controllers/accountController";
import { IAccount } from "@/src/utils/types";
import { Colors } from "@/src/utils/Colors";

const AccountManager = () => {
    const [accounts, setAccounts] = useState<IAccount[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [accountName, setAccountName] = useState("");

    useEffect(() => {
        loadAccounts();
    }, []);

    const loadAccounts = async () => setAccounts(await getAccounts());

    const handleAdd = async () => {
        await createAccount(accountName, 0);
        setModalVisible(false);
        loadAccounts();
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
                        <Button title="Delete" color="red" onPress={async () => { await deleteAccount(item.id); loadAccounts(); }} />
                    </View>
                )}
            />
            <Button title="Add Account" onPress={() => setModalVisible(true)} />

            <Modal visible={modalVisible} transparent>
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <TextInput style={styles.input} placeholder="Account Name" onChangeText={setAccountName} />
                        <View style={styles.buttonContainer}>
                            <Button title="Create" onPress={handleAdd} />
                            <Button title="Close" color="gray" onPress={() => setModalVisible(false)} />
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
        color: Colors.text.dark,
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border.light,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 12,
    },
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.overlay,
    },
    modalContent: {
        width: 320,
        backgroundColor: Colors.background.light,
        padding: 20,
        borderRadius: 12,
        alignItems: "center",
        shadowColor: Colors.shadow.dark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: Colors.border.light,
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
        backgroundColor: Colors.background.light,
        color: Colors.text.dark,
        fontSize: 16,
    },
});

export default AccountManager;
