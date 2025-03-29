import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/src/utils/Colors';
import TransactionModal from './TransactionModal';
// import { TransactionType } from '@/src/utils/types';

const AddTransactionButton = () => {
    const [modalVisible, setModalVisible] = useState(false);

    // const handleAddTransaction = (transaction: {
    //     amount: number;
    //     type: TransactionType;
    //     category: string;
    //     account: string;
    //     note?: string;
    // }) => {
    //     console.log('Transaction Data:', transaction);
    //     setModalVisible(false);
    // };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.addButton}
            >
                <MaterialIcons name="add" size={24} color={Colors.background.light} />
                <Text style={styles.buttonText}>Add Transaction</Text>
            </TouchableOpacity>

            <TransactionModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            // onSubmit={handleAddTransaction}
            />
        </View>
    );
};

export default AddTransactionButton;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 100,
        right: 20,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.status.error,
        padding: 12,
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        color: Colors.background.light,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});
