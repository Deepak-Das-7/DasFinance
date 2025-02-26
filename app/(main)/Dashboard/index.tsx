import { View, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '@/src/Colors';
import FinancialChart from '@/components/dashboard/FinancialChart';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import Footer from '@/components/dashboard/Footer';
import GradientBackground from '@/components/GradientBackground';
import BudgetMain from '@/components/dashboard/BudgetMain';
import Header from '@/components/Header';

const dashboardComponents = [
    { id: '0', component: <Header title="Finance Dashboard" /> }, // Header at the top
    { id: '1', component: <BudgetMain /> },
    { id: '3', component: <FinancialChart /> },
    { id: '4', component: <RecentTransactions /> },
    { id: '5', component: <QuickActions /> },
    { id: '6', component: <Footer /> },
];

const Dashboard = () => {
    return (
        <GradientBackground>
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
    listContent: {
        paddingBottom: 100,
    },
    componentWrapper: {
        marginBottom: 5,
    },
});
