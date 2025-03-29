// components/FinancialChart.tsx
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Colors } from '@/src/utils/Colors';

const FinancialChart = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Expense Trends</Text>
            <View style={styles.chartContainer}>
                <LineChart
                    data={{
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                        datasets: [{ data: [5000, 7000, 6500, 4000, 8500] }],
                    }}
                    width={Dimensions.get('window').width - 20}
                    height={250}
                    chartConfig={{
                        backgroundGradientFrom: Colors.background.dark,
                        backgroundGradientTo: Colors.background.gray,
                        color: (opacity = 0.5) => `rgba(255, 99, 132, ${opacity})`,
                        labelColor: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
                        propsForDots: {
                            r: '7',
                            strokeWidth: '1',
                            stroke: Colors.primary,
                        },
                    }}
                    bezier
                    style={styles.chartStyle}
                />
            </View>
        </View>
    );
};

export default FinancialChart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
        color: Colors.text.black,
        fontStyle: "italic"
    },
    chartContainer: {
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
    },
    chartStyle: {
        borderRadius: 10,
    },
});