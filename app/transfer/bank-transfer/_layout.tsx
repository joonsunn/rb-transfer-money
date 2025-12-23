import { BankRenderer } from "@/components/transfer/bank-transfer/bank-item-renderer";
import { TransferScreenHeader } from "@/components/transfer/transfer-screen-header";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { BankList } from "@/constants/bank-list";
import { Link, Stack } from "expo-router";
import React from "react";

export default function BankTransferLayout() {
  return (
    <Stack
      screenOptions={{
        animation: "none",
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Transfer",
          headerTitleAlign: "center",
          headerLeft: () => (
            <Link href="/transfer">
              <IconSymbol name="chevron.left" size={24} color="black" />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="input"
        options={{
          headerTitle: "Transfer",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="amount"
        options={({ route }) => ({
          headerTitleAlign: "center",
          headerTitle: () => <TransferScreenHeader route={route as any} />,
          headerRight: () => (
            <BankRenderer bank={BankList.find((b) => b.value === (route.params as any)?.toBank)} iconOnly />
          ),
        })}
      />
      <Stack.Screen
        name="confirm"
        options={{
          headerTitle: "Confirmation",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen name="success" options={{ headerShown: false }} />
    </Stack>
  );
}
