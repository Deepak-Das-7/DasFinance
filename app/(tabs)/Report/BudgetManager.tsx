import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, TextInput, Modal, StyleSheet } from "react-native";
import { getBudgets, createBudget, deleteBudget } from "@/src/controllers/budgetController";
import { IBudget } from "@/src/utils/types";
import { Colors } from "@/src/utils/Colors";

const BudgetManager = () => {
    const [budgets, setBudgets] = useState<IBudget[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [budgetName, setBudgetName] = useState("");
    const [amount, setAmount] = useState("");

    useEffect(() => {
        loadBudgets();
    }, []);

    const loadBudgets = async () => setBudgets(await getBudgets());

    const handleAdd = async () => {
        await createBudget(budgetName, 1, Number(amount));
        setModalVisible(false);
        loadBudgets();
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
                        <Button title="Delete" color="red" onPress={async () => { await deleteBudget(item.id); loadBudgets(); }} />
                    </View>
                )}
            />
            <Button title="Add Budget" onPress={() => setModalVisible(true)} />

            <Modal visible={modalVisible} transparent>
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <TextInput style={styles.input} placeholder="Budget Name" onChangeText={setBudgetName} />
                        <TextInput style={styles.input} placeholder="Amount" keyboardType="numeric" onChangeText={setAmount} />
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

export default BudgetManager;
