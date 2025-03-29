import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '@/src/utils/Colors';

const Profile = () => {
    return (
        <View>
            <Image source={{ uri: 'https://picsum.photos/302' }} style={styles.profileImage} />
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.email}>johndoe@example.com</Text>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.logout]}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>

    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.light,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    email: {
        fontSize: 16,
        color: Colors.text.dark,
        marginBottom: 20,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10,
    },
    logout: {
        backgroundColor: Colors.status.error,
    },
    buttonText: {
        color: Colors.background.light,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
