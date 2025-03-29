import { setupAllDatabases } from '@/src/database/databaseManager';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import 'react-native-reanimated';

export default function RootLayout() {
  useEffect(() => {
    const setupDB = async () => {
      await setupAllDatabases();
    };
    setupDB();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
    >
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}
