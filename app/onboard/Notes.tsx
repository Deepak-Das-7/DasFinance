import React, { useRef, useState } from "react";
import { View, Text, FlatList, Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import OnboardingSlide from "@/components/onboard/OnboardingSlide";
import { slides } from "@/src/contants/Slide";

const { width } = Dimensions.get("window");

const Onboarding = () => {
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
            setCurrentIndex(currentIndex + 1);
        } else {
            router.replace("/onboard/Auth");
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={slides}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                    const index = Math.floor(event.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(index);
                }}
                renderItem={({ item }) => <OnboardingSlide item={item} />}
            />

            {/* Pagination Dots */}
            <View style={styles.pagination}>
                {slides.map((_, index) => (
                    <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
                ))}
            </View>

            {/* Next Button */}
            <TouchableOpacity onPress={handleNext} style={styles.button}>
                <Text style={styles.buttonText}>{currentIndex === slides.length - 1 ? "Get Started" : "Next"}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Onboarding;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    pagination: { flexDirection: "row", justifyContent: "center", marginBottom: 20 },
    dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#ccc", marginHorizontal: 5 },
    activeDot: { backgroundColor: "#007AFF" },
    button: {
        position: "absolute",
        bottom: 50,
        alignSelf: "center",
        backgroundColor: "#007AFF",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: { color: "#fff", fontSize: 18 },
});
