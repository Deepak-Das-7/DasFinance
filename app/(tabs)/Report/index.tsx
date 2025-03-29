import React from "react";
import { View, FlatList } from "react-native";
import AccountManager from "./AccountManager";
import BudgetManager from "./BudgetManager";
import TransactionManager from "./TransactionManager";

const components = [
    { id: "accounts", component: <AccountManager /> },
    { id: "budgets", component: <BudgetManager /> },
    { id: "transactions", component: <TransactionManager /> },
];

const AdminPanel = () => {
    return (
        <FlatList
            data={components}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <View>{item.component}</View>}
        />
    );
};

export default AdminPanel;