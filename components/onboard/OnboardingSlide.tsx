import React from "react";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const OnboardingSlide = ({ item }: { item: { title: string; description: string; image: string } }) => (
    <View style={styles.container}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
    </View>
);

export default OnboardingSlide;

const styles = StyleSheet.create({
    container: {
        width,
        height,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        color: "#555",
    },
});
