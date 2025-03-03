import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const NonContactDeliveryModal = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text>Show Bottom Sheet</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image
                            source={require('@/src/pngs/das.png')} // Replace with your icon path
                            style={styles.icon}
                        />
                        <Text style={styles.title}>Non-Contact Deliveries</Text>
                        <Text style={styles.description}>
                            When placing an order, please select the option "Non-contact-delivery" and the courier will leave your order at the door.
                        </Text>
                        <TouchableOpacity style={styles.orderButton} onPress={() => { router.replace("/(main)/Dashboard") }}>
                            <Text style={styles.orderButtonText}>ORDER NOW</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.dismissText}>DISMISS</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end", // Align to bottom
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalView: {
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%', // Take full width
    },
    icon: {
        width: 50, // Adjust size as needed
        height: 50, // Adjust size as needed
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    orderButton: {
        backgroundColor: '#32CD32', // Green
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        marginBottom: 10,
    },
    orderButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dismissText: {
        color: '#808080', // Gray
        fontSize: 16,
    },
});

export default NonContactDeliveryModal;