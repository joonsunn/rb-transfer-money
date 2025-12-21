import { BankList } from "@/constants/bank-list";
import { AccountTransaction } from "@/contexts/AccountInfoContext";
import { Text, View } from "react-native";
import { BankRenderer } from "./bank-item-renderer";

type TransactionItemProps = {
  transaction: AccountTransaction;
};

export function TransactionItem({ transaction }: TransactionItemProps) {
  const bank = BankList.find((bank) => bank.value === transaction.toBank);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 18,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 18,
        }}
      >
        <BankRenderer bank={bank} iconOnly />
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            To {bank?.label}
          </Text>
          <Text
            style={{
              fontSize: 16,
            }}
          >
            {new Date(transaction.dateTime).toLocaleString("en-MY", { dateStyle: "medium", timeStyle: "short" })}
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontWeight: 600,
        }}
      >
        {(-transaction.toAmount).toLocaleString("en-UK", { style: "currency", currency: "MYR" }).replace("MYR", "RM")}
      </Text>
    </View>
  );
}
