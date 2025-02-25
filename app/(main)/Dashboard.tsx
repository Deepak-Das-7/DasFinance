import { View, FlatList, StyleSheet, Text } from 'react-native';
import React from 'react';
import { Colors } from '@/src/Colors';
import BudgetOverview from '@/src/components/dashboard/BudgetOverview';
import ExpenseTracker from '@/src/components/ExpenseTracker';
import FinancialChart from '@/src/components/dashboard/FinancialChart';
import QuickActions from '@/src/components/dashboard/QuickActions';
import RecentTransactions from '@/src/components/dashboard/RecentTransactions';
import Footer from '@/src/components/dashboard/Footer';
import GradientBackground from '@/src/components/GradientBackground'; // Import the reusable background component

const dashboardComponents = [
    { id: '1', component: <ExpenseTracker /> },
    { id: '2', component: <BudgetOverview /> },
    { id: '3', component: <FinancialChart /> },
    { id: '4', component: <RecentTransactions /> },
    { id: '5', component: <QuickActions /> },
    { id: '6', component: <Footer /> },
];

const Dashboard = () => {
    return (
        <GradientBackground>
            <Text style={styles.header}>Finance Dashboard</Text>
            <FlatList
                data={dashboardComponents}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <View style={styles.componentWrapper}>{item.component}</View>}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </GradientBackground>
    );
};

export default Dashboard;

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.background.light,
        textAlign: 'center',
        marginBottom: 16,
    },
    listContent: {
        paddingBottom: 100,
    },
    componentWrapper: {
        marginBottom: 16,
    },
});
