import { useGetAllTransactions } from "@/api/queries/useGetAllTransactions";
import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TransactionItem } from "./transaction-item";

export function TransactionsList() {
  const insets = useSafeAreaInsets();

  const { data: transactions, isLoading, isFetching } = useGetAllTransactions();
  const primaryForegroundColor = useThemeColor({}, "primaryForeground");

  return (
    <View
      style={{
        gap: 18,
        flex: 1,
        paddingBottom: insets.bottom,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: 600,
        }}
      >
        Recent Transactions
      </Text>
      <ScrollView>
        {isLoading || isFetching ? (
          <ActivityIndicator size="small" color={primaryForegroundColor} />
        ) : (
          transactions?.map((transaction) => <TransactionItem transaction={transaction} key={transaction.id} />)
        )}
      </ScrollView>
    </View>
  );
}
