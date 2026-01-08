import { TransactionsList } from "@/components/transfer/transaction-list";
import { TransferOption } from "@/components/transfer/transfer-option";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useNavigation } from "expo-router";
import { Platform, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TransferMain() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 14,
        paddingTop: insets.top,
        gap: 16,
      }}
    >
      <Pressable onPress={() => navigation.goBack()}>
        <IconSymbol
          name="chevron.left"
          color={"black"}
          size={Platform.select({
            ios: undefined,
            android: 48,
          })}
        />
      </Pressable>
      <Text
        style={{
          fontSize: 32,
          fontFamily: Platform.select({
            ios: "ui-serif",
            android: "serif",
          }),
        }}
      >
        Transfer
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <TransferOption label="Bank/eWallet" href={"/transfer/bank-transfer"} iconName="house.fill" />
        <TransferOption label="Mobile" href={"/"} iconName="phone" disabled />
        <TransferOption label="Others" href={"/"} iconName="square.grid.2x2" disabled />
      </View>
      <TransactionsList />
    </View>
  );
}
