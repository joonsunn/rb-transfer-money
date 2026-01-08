import { Stack } from "expo-router";
import React from "react";

export default function TransferLayout() {
  return (
    <Stack
      screenOptions={{
        animation: "ios_from_right",
        headerBackButtonDisplayMode: "minimal",
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="bank-transfer" />
    </Stack>
  );
}
