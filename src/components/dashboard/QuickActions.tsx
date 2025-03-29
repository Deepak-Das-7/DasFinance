// components/QuickActions.tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/src/utils/Colors';

const QuickActions = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <MaterialIcons name="add" size={24} color={Colors.background.light} />
                <Text style={styles.buttonText}>Add Transaction</Text>
            </TouchableOpacity>
        </View>
    );
};

export default QuickActions;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        padding: 12,
        borderRadius: 8,
    },
    buttonText: {
        marginLeft: 8,
        color: Colors.background.light,
        fontWeight: 'bold',
    },
});
