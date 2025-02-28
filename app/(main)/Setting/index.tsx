import { View, Text, Switch, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@/src/Colors';
import GradientBackground from '@/components/GradientBackground';
import Profile from '@/components/profile/Profile';

const Settings = () => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <GradientBackground>
            <Profile />
            <Text style={styles.header}>Settings</Text>

            <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Dark Mode</Text>
                <Switch
                    value={darkMode}
                    onValueChange={(value) => setDarkMode(value)}
                    thumbColor={darkMode ? Colors.primary : Colors.background.light}
                />
            </View>
        </GradientBackground>

    );
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.light,
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primary,
        textAlign: 'center',
        marginBottom: 16,
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.background.dark,
    },
    settingLabel: {
        fontSize: 18,
        color: Colors.text.dark,
    },
});
