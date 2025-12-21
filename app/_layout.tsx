import { BankRenderer } from "@/components/bank-item-renderer";
import { BankList } from "@/constants/bank-list";
import { AccountInfoContextProvider } from "@/contexts/AccountInfoContext";
import { Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function RootLayout() {
  return (
    <AccountInfoContextProvider>
      <Stack
        screenOptions={{
          animation: "none",
          headerBackButtonDisplayMode: "minimal",
        }}
      >
        <Stack.Screen name="index" options={{ header: () => <></> }} />
        <Stack.Screen name="about" />
        <Stack.Screen name="transfer" options={{ header: () => <></> }} />
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
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <View>
                  <Text
                    style={{
                      fontWeight: 600,
                      fontSize: 18,
                    }}
                  >
                    {(route.params as { toName: string })?.toName || ""}
                  </Text>
                </View>
                <View>
                  <Text>{(route.params as { toAccountNumber: string })?.toAccountNumber || ""}</Text>
                </View>
              </View>
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
      </Stack>
    </AccountInfoContextProvider>
  );
}
