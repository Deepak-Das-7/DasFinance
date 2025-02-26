// components/FinancialChart.tsx
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Colors } from '@/src/Colors';

const FinancialChart = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Expense Trends</Text>
            <LineChart
                data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                    datasets: [{ data: [5000, 7000, 6500, 4000, 8500] }],
                }}
                width={Dimensions.get('window').width - 40}
                height={220}
                chartConfig={{
                    backgroundColor: Colors.background.light,
                    color: () => Colors.primary,
                    labelColor: () => Colors.icon.inactive,
                }}
                bezier
            />
        </View>
    );
};

export default FinancialChart;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background.light,
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 10,
    },
});
