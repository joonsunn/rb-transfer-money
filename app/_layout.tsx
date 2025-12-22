import TanstackQueryClientProvider from "@/api/TanstackQueryClientProvider";
import { BankRenderer } from "@/components/transfer/bank-transfer/bank-item-renderer";
import { TransferScreenHeader } from "@/components/transfer/transfer-screen-header";
import { BankList } from "@/constants/bank-list";
import { AccountInfoContextProvider } from "@/contexts/AccountInfoContext";
import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <TanstackQueryClientProvider>
      <AccountInfoContextProvider>
        <Stack
          screenOptions={{
            animation: "none",
            headerBackButtonDisplayMode: "minimal",
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="about" />
          <Stack.Screen name="transfer" options={{ headerShown: false }} />
          <Stack.Screen
            name="bank-transfer"
            options={{
              headerTitle: "Transfer",
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="bank-transfer-input"
            options={{
              headerTitle: "Transfer",
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="bank-transfer-input-amount"
            options={({ route }) => ({
              headerTitleAlign: "center",
              headerTitle: () => (
                <TransferScreenHeader
                  route={route as { params: { toName: string; toAccountNumber: string; toBank: string } }}
                />
              ),
              headerRight: () => (
                <BankRenderer
                  bank={BankList.find((bank) => bank.value === (route.params as { toBank: string })?.toBank)}
                  iconOnly
                />
              ),
            })}
          />
          <Stack.Screen
            name="bank-transfer-confirm"
            options={{
              headerTitle: "Confirmation",
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen name="bank-transfer-success" options={{ headerShown: false }} />
        </Stack>
      </AccountInfoContextProvider>
    </TanstackQueryClientProvider>
  );
}
