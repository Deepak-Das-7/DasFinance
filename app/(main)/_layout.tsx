import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from '@/src/Colors';

// Screens array
const screens = [
  { name: 'Dashboard', icon: 'analytics' },
  { name: 'Transanction', icon: 'attach-money' },
  { name: 'Report', icon: 'newspaper' },
  { name: 'Setting', icon: 'settings' }
] as const;

// Custom Bottom Tab Bar
const CustomTabBar = ({ state, navigation }: BottomTabBarProps) => (
  <View style={styles.tabBarContainer}>
    {state.routes.map((route, index) => {
      const isFocused = state.index === index;
      const screen = screens.find(s => s.name === route.name);

      return (
        <TouchableOpacity
          key={route.key}
          onPress={() => navigation.navigate(route.name)}
          style={[styles.tabButton, isFocused && styles.activeTab]}
        >
          {isFocused ? (
            <LinearGradient colors={[Colors.primary, Colors.accent]} style={styles.gradientTab}>
              <MaterialIcons name={screen?.icon} size={30} color={Colors.background.light} />
            </LinearGradient>
          ) : (
            <MaterialIcons name={screen?.icon} size={30} color={Colors.icon.inactive} />
          )}
        </TouchableOpacity>
      );
    })}
  </View>
);

// Root Layout
export default function RootLayout() {
  return (
    <Tabs tabBar={CustomTabBar}>
      {screens.map(({ name }) => (
        <Tabs.Screen key={name} name={name} options={{ title: name, headerShown: false }} />
      ))}
    </Tabs>
  );
}

// Styles
const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: Colors.background.light,
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20, // Keeps it above screen bottom
    left: 15,
    right: 15,
    borderRadius: 40,
    elevation: 5,
    shadowColor: Colors.background.dark,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    zIndex: 10, // Ensures it stays on top
    paddingHorizontal: 10
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
