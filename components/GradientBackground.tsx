import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/src/Colors";

type GradientBackgroundProps = {
    children: React.ReactNode;
    colors?: [string, string, ...string[]];
    gradientStyle?: ViewStyle; // Custom gradient style
    containerStyle?: ViewStyle; // Custom container style
};

const GradientBackground: React.FC<GradientBackgroundProps> = ({
    children,
    colors = [Colors.primary, Colors.accent],
    gradientStyle,
}) => {
    return (
        <LinearGradient colors={colors} style={[styles.gradient, gradientStyle]}>
            {children}
        </LinearGradient>
    );
};

export default GradientBackground;

const styles = StyleSheet.create({
    gradient: {
        paddingHorizontal: 10,
        flex: 1
    }
});
