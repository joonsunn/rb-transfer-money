import { Stack } from "expo-router";
import React from "react";

export default function TransferLayout() {
  return (
    <Stack
      screenOptions={{
        animation: "none",
        headerBackButtonDisplayMode: "minimal",
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="bank-transfer" />
    </Stack>
  );
}
