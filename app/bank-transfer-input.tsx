import { BankItemRenderer } from "@/components/bank-item-renderer";
import { BankList } from "@/constants/bank-list";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

function BankTransferInput() {
  const params = useLocalSearchParams<{ bank: string }>();
  const tintColor = useThemeColor({}, "tint");
  const primaryForegroundColor = useThemeColor({}, "primaryForeground");
  const [accountNumber, setAccountNumber] = useState<string>("");

  return (
    <View
      style={{
        padding: 18,
        gap: 32,
        paddingTop: 18,
        height: "100%",
      }}
    >
      <View style={{ backgroundColor: tintColor, borderRadius: 12 }}>
        <BankItemRenderer bank={BankList.find((bankOption) => bankOption.value === params.bank)} />
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            gap: 8,
          }}
        >
          <Text
            style={{
              fontSize: 18,
            }}
          >
            Account number
          </Text>
          <TextInput
            value={accountNumber}
            onChangeText={setAccountNumber}
            placeholder="Enter account number"
            placeholderTextColor="grey"
            style={{
              padding: 10,
              fontSize: 18,
              borderBottomColor: primaryForegroundColor,
              borderBottomWidth: 3,
            }}
          />
        </View>
      </View>

      <Pressable
        style={{
          bottom: 0,
        }}
        // onPress={() => console.log("hello button")}
      >
        <View
          style={{
            backgroundColor: primaryForegroundColor,
            borderRadius: 100,
            paddingVertical: 24,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
            }}
          >
            Next
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default BankTransferInput;
