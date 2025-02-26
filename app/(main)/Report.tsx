import GradientBackground from '@/components/GradientBackground';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Report = () => {
    return (
        <GradientBackground>
            <Text style={styles.title}>Financial Report</Text>
            <Text style={styles.content}>This is where the financial report details will be displayed.</Text>
        </GradientBackground >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    content: {
        fontSize: 16,
    },
});

export default Report;