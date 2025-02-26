import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const Auth = () => {
    function handleNext(event: GestureResponderEvent): void {
        router.replace("/(main)/Dashboard")

    }

    return (
        <View>
            <Text>Auth</Text>
            <TouchableOpacity
                onPress={handleNext}
                style={{
                    alignSelf: "center",
                    backgroundColor: "#007AFF",
                    paddingVertical: 12,
                    paddingHorizontal: 24,
                    borderRadius: 8,
                }}
            >
                <Text style={{ color: "#ed0303", fontSize: 18 }}>Get Started</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Auth

const styles = StyleSheet.create({})