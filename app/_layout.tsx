import React from 'react';
import { Stack } from 'expo-router';
import { UserProvider } from '../context/UserContext';

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="app" />
        <Stack.Screen name="cadastro" />
        <Stack.Screen name="lista" options={{ headerShown: false }} />
      </Stack>
    </UserProvider>
  );
}
