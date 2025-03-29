import { View, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '@/src/utils/Colors';
import GradientBackground from '@/src/components/GradientBackground';
import Profile from '@/src/components/profile/Profile';
import DatabaseScreen from '@/src/components/profile/GetAllDBS';
import AddDataScreen from '@/src/components/profile/AddData';

const Settings = () => {

    const settingsComponents = [
        { id: '0', component: <Profile /> },
        { id: '1', component: <DatabaseScreen /> },
        { id: '2', component: <AddDataScreen /> },
    ];

    return (
        <GradientBackground>
            <FlatList
                data={settingsComponents}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <View style={styles.componentWrapper}>{item.component}</View>}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </GradientBackground>
    );
};

export default Settings;

const styles = StyleSheet.create({
    listContent: {
        paddingBottom: 100,
    },
    componentWrapper: {
        marginBottom: 10,
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.background.dark,
    },
    settingLabel: {
        fontSize: 18,
        color: Colors.text.dark,
    },
});
