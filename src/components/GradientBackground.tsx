import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/src/Colors';

type GradientBackgroundProps = {
    children: React.ReactNode;
};

const GradientBackground: React.FC<GradientBackgroundProps> = ({ children }) => {
    return (
        <LinearGradient colors={[Colors.primary, Colors.accent]} style={styles.gradient}>
            <View style={styles.container}>{children}</View>
        </LinearGradient>
    );
};

export default GradientBackground;

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
});
