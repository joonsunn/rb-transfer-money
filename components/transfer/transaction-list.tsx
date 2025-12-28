import { useGetAllTransactions } from "@/api/queries/useGetAllTransactions";
import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TransactionItem } from "./transaction-item";

export function TransactionsList() {
  const insets = useSafeAreaInsets();

  const { data: transactions, isLoading, isFetching, refetch, error } = useGetAllTransactions();
  const primaryForegroundColor = useThemeColor({}, "primaryForeground");

  if (error) {
    return (
      <View
        style={{
          gap: 18,
          flex: 1,
          paddingBottom: insets.bottom,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, color: "red" }}>Failed to load transactions.</Text>
      </View>
    );
  }

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
      ) : transactions && transactions.length > 0 ? (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionItem transaction={item} />}
          refreshing={isLoading || isFetching}
          onRefresh={refetch}
        />
      ) : (
        <View style={{ height: 240, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 16 }}>No transactions found.</Text>
        </View>
      )}
    </View>
  );
}
