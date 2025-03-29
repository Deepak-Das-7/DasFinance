import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { createAccount } from "@/src/controllers/accountController";
import { createTransaction } from "@/src/controllers/transactionController";
import { createBudget } from "@/src/controllers/budgetController";
import AddDataModal from "./AddDataModal";
import TransactionForm from "./TransactionForm";
import AccountForm from "./AccountForm";
import BudgetForm from "./BudgetForm";
import { IAccount, IBudget, ITransaction } from "@/src/utils/types";
import { Colors } from "@/src/utils/Colors";

type FormDataType = Partial<IAccount & ITransaction & IBudget>;

export default function AddDataScreen() {
    const [selectedForm, setSelectedForm] = useState<"accounts" | "transactions" | "budgets" | null>(null);
    const [formData, setFormData] = useState<FormDataType>({});
    const [modalVisible, setModalVisible] = useState(false);

    const handleInputChange = (key: string, value: string | number) => {
        setFormData((prev) => ({ ...prev, [key as keyof FormDataType]: value }));
    };

    const openModal = (formType: "accounts" | "transactions" | "budgets") => {
        setSelectedForm(formType);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedForm(null);
    };

    const handleSubmit = async () => {
        try {
            if (selectedForm === "accounts") {
                await createAccount(formData.account_name ?? "", Number(formData.balance) ?? 0);
            } else if (selectedForm === "transactions") {
                await createTransaction(
                    Number(formData.amount) ?? 0,
                    (formData.type as "credit" | "debit") ?? "debit",
                    Number(formData.budgetId) ?? 0,
                    Number(formData.account_id) ?? 0,
                    formData.note ?? ""
                );
            } else if (selectedForm === "budgets") {
                await createBudget(
                    Number(formData.amount) ?? 0,
                    Number(formData.account_id) ?? 0,
                    formData.budget_name ?? "Study"
                );
            }
            Alert.alert("Success", `${selectedForm} added successfully!`);
            setFormData({});
            closeModal();
        } catch (error) {
            Alert.alert("Error", "Failed to add data.");
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.openButton} onPress={() => openModal("accounts")}>
                <Text style={styles.openButtonText}>+ Add Account</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.openButton} onPress={() => openModal("transactions")}>
                <Text style={styles.openButtonText}>+ Add Transaction</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.openButton} onPress={() => openModal("budgets")}>
                <Text style={styles.openButtonText}>+ Add Budget</Text>
            </TouchableOpacity>

            <AddDataModal visible={modalVisible} onClose={closeModal} onSubmit={handleSubmit}>
                {selectedForm === "accounts" && <AccountForm onChange={handleInputChange} />}
                {selectedForm === "transactions" && <TransactionForm onChange={handleInputChange} type={formData.type} />}
                {selectedForm === "budgets" && <BudgetForm onChange={handleInputChange} />}
            </AddDataModal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.background.light,
    },
    openButton: {
        backgroundColor: Colors.button.primary,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 10,
        shadowColor: Colors.shadow.dark,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    openButtonText: {
        color: Colors.text.white,
        fontSize: 16,
        fontWeight: "bold",
    },
});
