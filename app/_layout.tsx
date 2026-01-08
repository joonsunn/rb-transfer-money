import TanstackQueryClientProvider from "@/api/TanstackQueryClientProvider";
import { AccountInfoContextProvider } from "@/contexts/AccountInfoContext";
import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <TanstackQueryClientProvider>
      <AccountInfoContextProvider>
        <Stack
          screenOptions={{
            animation: "ios_from_right",
            headerBackButtonDisplayMode: "minimal",
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="about" />
          <Stack.Screen name="transfer" options={{ headerShown: false }} />
        </Stack>
      </AccountInfoContextProvider>
    </TanstackQueryClientProvider>
  );
}
