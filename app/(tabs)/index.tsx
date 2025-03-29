import { View, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import FinancialChart from '@/src/components/dashboard/FinancialChart';
import QuickActions from '@/src/components/dashboard/QuickActions';
import RecentTransactions from '@/src/components/dashboard/RecentTransactions';
import Footer from '@/src/components/dashboard/Footer';
import GradientBackground from '@/src/components/GradientBackground';
import BudgetMain from '@/src/components/dashboard/BudgetMain';
import Header from '@/src/components/Header';

const dashboardComponents = [
    { id: '0', component: <Header title="Finance Dashboard" /> },
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
