import { BankItemRenderer } from "@/components/transfer/bank-transfer/bank-item-renderer";
import { BankList } from "@/constants/bank-list";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Platform, TextInput, View } from "react-native";

export default function BankTransferMain() {
  const [searchText, setSearchText] = useState("");
  const tintColor = useThemeColor({}, "tint");
  const filteredBanksList = searchText
    ? BankList.filter((bank) => bank.label.trim().toLowerCase().includes(searchText.trim().toLowerCase()))
    : BankList;

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 14,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#ccc",
          margin: 12,
          paddingHorizontal: 16,
          paddingVertical: Platform.select({
            ios: 10,
            android: undefined,
          }),
          borderRadius: 100,
          backgroundColor: tintColor,
        }}
      >
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search bank/eWallet"
          placeholderTextColor="grey"
          style={{ flex: 1 }}
        />
        <Feather name="search" size={20} color="black" />
      </View>
      <FlatList
        style={{
          backgroundColor: tintColor,
        }}
        data={filteredBanksList}
        keyExtractor={(item) => item.value}
        renderItem={({ item }) => <BankItemRenderer bank={item} navigate />}
      />
    </View>
  );
}
