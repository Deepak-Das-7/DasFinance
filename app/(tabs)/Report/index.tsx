import React, { useState, useCallback } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AccountManager from "./AccountManager";
import BudgetManager from "./BudgetManager";
import TransactionManager from "./TransactionManager";

const components = [
    { id: "accounts", component: <AccountManager /> },
    { id: "budgets", component: <BudgetManager /> },
    { id: "transactions", component: <TransactionManager /> },
];

const AdminPanel = () => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    };

    useFocusEffect(
        useCallback(() => {
            onRefresh();
        }, [])
    );

    return (
        <FlatList
            data={components}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <View>{item.component}</View>}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
    );
};

export default AdminPanel;
