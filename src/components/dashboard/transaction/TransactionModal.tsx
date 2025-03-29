import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '@/src/utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import CustomDropdown from './CustomDropdown';
// import { addTransaction } from '@/api/transaction';

type TransactionModalProps = {
    visible: boolean;
    onClose: () => void;
};

const TransactionModal: React.FC<TransactionModalProps> = ({ visible, onClose }) => {
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('credit');
    const [category, setCategory] = useState('');
    const [account, setAccount] = useState('');
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false);

    const categoryItems = [
        { label: 'Food', value: 'food', icon: () => <Ionicons name="fast-food-outline" size={20} color="black" /> },
        { label: 'Transport', value: 'transport', icon: () => <Ionicons name="car-outline" size={20} color="black" /> },
        { label: 'Shopping', value: 'shopping', icon: () => <Ionicons name="cart-outline" size={20} color="black" /> },
        { label: 'Other', value: 'other', icon: () => <Ionicons name="ellipsis-horizontal-outline" size={20} color="black" /> },
    ];

    const accountItems = [
        { label: 'Cash', value: 'cash', icon: () => <Ionicons name="cash-outline" size={20} color="black" /> },
        { label: 'Bank', value: 'bank', icon: () => <Ionicons name="wallet-outline" size={20} color="black" /> },
        { label: 'Credit Card', value: 'credit-card', icon: () => <Ionicons name="card-outline" size={20} color="black" /> },
        { label: 'Other', value: 'other', icon: () => <Ionicons name="ellipsis-horizontal-outline" size={20} color="black" /> },
    ];

    useEffect(() => { if (!visible) setAmount(''), setType('credit'), setCategory(''), setAccount(''), setNote(''); }, [visible]);

    const handleAddTransaction = useCallback(async () => {
        const parsedAmount = parseFloat(amount);
        if (!parsedAmount || !category || !account) return;

        setLoading(true);
        try {
            const userId = "67c6ce131631f48812d64d35";
            // const data = await addTransaction(userId, parsedAmount, type, category, account, new Date().toISOString(), note);
            onClose();
        } catch (error) {
            console.error("Transaction submission failed", error);
        } finally {
            setLoading(false);
        }
    }, [amount, type, category, account, note, onClose]);

    return (
        <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Enter Transaction Details</Text>

                    <TextInput style={styles.input} placeholder="Amount" keyboardType="numeric" value={amount} onChangeText={setAmount} placeholderTextColor={Colors.text.muted} />

                    <View style={styles.typeContainer}>
                        {['credit', 'debit'].map((t) => (
                            <TouchableOpacity key={t} onPress={() => setType(t)} style={styles.typeButton}>
                                <Ionicons name={type === t ? 'radio-button-on' : 'radio-button-off'} size={20} color={type === t ? 'blue' : 'gray'} />
                                <Text style={[styles.typeText, { color: type === t ? 'red' : 'gray' }]}>{t.charAt(0).toUpperCase() + t.slice(1)}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <CustomDropdown items={categoryItems} value={category} setValue={setCategory} placeholder="Choose a category" />
                        <CustomDropdown items={accountItems} value={account} setValue={setAccount} placeholder="Select an Account" />
                    </View>

                    <TextInput style={styles.input} placeholder="Note (Optional)" value={note} onChangeText={setNote} placeholderTextColor={Colors.text.muted} />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose} disabled={loading}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.addButton]} onPress={handleAddTransaction} disabled={loading}>
                            {loading ? <ActivityIndicator color={Colors.background.light} /> : <Text style={styles.buttonText}>Add</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default TransactionModal;

const styles = StyleSheet.create({
    overlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    modalContainer: { backgroundColor: Colors.background.dark, borderRadius: 15, padding: 20, width: '95%', alignItems: 'center' },
    title: { fontSize: 20, fontWeight: 'bold', color: Colors.primary, marginBottom: 15 },
    input: { width: '100%', borderColor: Colors.border.primary, borderWidth: 0.5, borderRadius: 10, paddingHorizontal: 12, marginBottom: 15, backgroundColor: Colors.background.light, color: Colors.primary, fontSize: 20, fontWeight: "bold" },
    typeContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 15 },
    typeButton: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 },
    typeText: { marginLeft: 8, fontSize: 20, fontWeight: "bold" },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 15 },
    button: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginHorizontal: 5 },
    cancelButton: { backgroundColor: Colors.status.warning },
    addButton: { backgroundColor: Colors.status.success },
    buttonText: { color: Colors.background.light, fontWeight: 'bold' },
});