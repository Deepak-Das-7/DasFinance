import { View, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from '@/src/utils/Colors';

// Custom Bottom Tab Bar
const CustomTabBar = ({ state, navigation }: BottomTabBarProps) => (
  <View style={styles.tabBarContainer}>
    <TouchableOpacity
      onPress={() => navigation.navigate("index")}
      style={[styles.tabButton, state.index === 0 && styles.activeTab]}
    >
      {state.index === 0 ? (
        <LinearGradient colors={[Colors.primary, Colors.accent]} style={styles.gradientTab}>
          <MaterialIcons name="analytics" size={30} color={Colors.background.light} />
        </LinearGradient>
      ) : (
        <MaterialIcons name="analytics" size={30} color={Colors.icon.inactive} />
      )}
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => navigation.navigate("Transaction")}
      style={[styles.tabButton, state.index === 1 && styles.activeTab]}
    >
      {state.index === 1 ? (
        <LinearGradient colors={[Colors.primary, Colors.accent]} style={styles.gradientTab}>
          <FontAwesome6 name="money-bill-transfer" size={30} color={Colors.background.light} />
        </LinearGradient>
      ) : (
        <FontAwesome6 name="money-bill-transfer" size={30} color={Colors.icon.inactive} />

      )}
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => navigation.navigate("Report")}
      style={[styles.tabButton, state.index === 2 && styles.activeTab]}
    >
      {state.index === 2 ? (
        <LinearGradient colors={[Colors.primary, Colors.accent]} style={styles.gradientTab}>
          <MaterialIcons name="newspaper" size={30} color={Colors.background.light} />
        </LinearGradient>
      ) : (
        <MaterialIcons name="newspaper" size={30} color={Colors.icon.inactive} />
      )}
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => navigation.navigate("Setting")}
      style={[styles.tabButton, state.index === 3 && styles.activeTab]}
    >
      {state.index === 3 ? (
        <LinearGradient colors={[Colors.primary, Colors.accent]} style={styles.gradientTab}>
          <MaterialIcons name="settings" size={30} color={Colors.background.light} />
        </LinearGradient>
      ) : (
        <MaterialIcons name="settings" size={30} color={Colors.icon.inactive} />
      )}
    </TouchableOpacity>
  </View>
);

export default function RootLayout() {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <Tabs tabBar={CustomTabBar}>
        <Tabs.Screen name="index" options={{ title: "Dashboard", headerShown: false }} />
        <Tabs.Screen name="Transaction" options={{ title: "Transaction", headerShown: false }} />
        <Tabs.Screen name="Report" options={{ title: "Report", headerShown: false }} />
        <Tabs.Screen name="Setting" options={{ title: "Setting", headerShown: false }} />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    height: 65,
    backgroundColor: "rgba(184, 247, 251, 0.45)",
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    borderRadius: 40,
    paddingHorizontal: 10,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  activeTab: {
    borderRadius: 25,
  },
  gradientTab: {
    width: 70,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  }
});
