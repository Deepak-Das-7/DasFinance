import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Colors } from "@/src/utils/Colors";

interface Props {
    visible: boolean;
    onClose: () => void;
    onSubmit: () => void;
    children: React.ReactNode;
}


const AddDataModal: React.FC<Props> = ({ visible, onClose, onSubmit, children }) => {
    return (
        <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {children}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={onSubmit}>
                            <Text style={styles.buttonText}>Add Data</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default AddDataModal;

const styles = StyleSheet.create({
    modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.overlay },
    modalContent: { width: "90%", backgroundColor: Colors.background.light, padding: 20, borderRadius: 10, elevation: 5 },
    label: { fontSize: 18, fontWeight: "bold", marginBottom: 10, color: Colors.text.dark },
    picker: { height: 60, backgroundColor: Colors.background.light, borderRadius: 8, marginBottom: 15 },
    buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
    button: {
        flex: 1,
        backgroundColor: Colors.button.primary,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginHorizontal: 5,
    },
    cancelButton: { backgroundColor: Colors.button.danger },
    buttonText: { color: Colors.text.white, fontSize: 16, fontWeight: "bold" },
});
