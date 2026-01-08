import { BankRenderer } from "@/components/transfer/bank-transfer/bank-item-renderer";
import { TransferScreenHeader } from "@/components/transfer/transfer-screen-header";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { BankList } from "@/constants/bank-list";
import { Stack, useNavigation } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

export default function BankTransferLayout() {
  const navigation = useNavigation();

  return (
    <Stack
      screenOptions={{
        animation: "ios_from_right",
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Transfer",
          headerTitleAlign: "center",
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <IconSymbol name="chevron.left" size={24} color="black" />
            </Pressable>
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
