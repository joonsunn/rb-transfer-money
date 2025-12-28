import { useGetAllTransactions } from "@/api/queries/useGetAllTransactions";
import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TransactionItem } from "./transaction-item";

export function TransactionsList() {
  const insets = useSafeAreaInsets();

  const { data: transactions, isLoading, isFetching, refetch } = useGetAllTransactions();
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
      {isLoading || isFetching ? (
        <ActivityIndicator size="small" color={primaryForegroundColor} />
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionItem transaction={item} />}
          refreshing={isLoading || isFetching}
          onRefresh={refetch}
        />
      )}
    </View>
  );
}
