import { useGetAllTransactions } from "@/api/queries/useGetAllTransactions";
import { BankRenderer } from "@/components/bank-item-renderer";
import { IconSymbol, IconSymbolName } from "@/components/ui/icon-symbol";
import { BankList } from "@/constants/bank-list";
import { AccountTransaction } from "@/contexts/AccountInfoContext";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Href, Link, useRouter } from "expo-router";
import { ActivityIndicator, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Transfer() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 14,
        paddingTop: insets.top,
        gap: 16,
      }}
    >
      <Link href="/">
        <IconSymbol
          name="chevron.left"
          color={"black"}
          size={Platform.select({
            ios: undefined,
            android: 48,
          })}
        />
      </Link>
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
        <TransferOption label="Bank/eWallet" href={"/bank-transfer"} iconName="house.fill" />
        <TransferOption label="Mobile" href={"/about"} iconName="phone" disabled />
        <TransferOption label="Others" href={"/about"} iconName="square.grid.2x2" disabled />
      </View>
      <TransactionsList />
    </View>
  );
}

type TransferOptionProps = {
  label: string;
  href: Href;
  iconName: IconSymbolName;
  disabled?: boolean;
};

function TransferOption({ label, href, iconName, disabled = false }: TransferOptionProps) {
  const primaryColor = useThemeColor({}, "primary");
  const primaryForegroundColor = useThemeColor({}, "primaryForeground");
  const tintColor = useThemeColor({}, "tint");
  const router = useRouter();

  return (
    <Pressable
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: "30%",
        aspectRatio: 1,
        gap: 12,
        backgroundColor: tintColor,
        borderRadius: 8,
        padding: 4,
        ...(disabled ? { opacity: 0.3 } : {}),
      }}
      onPress={() => router.push(href)}
    >
      <View
        style={{
          borderRadius: "100%",
          backgroundColor: primaryColor,
          height: 60,
          width: 60,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconSymbol color={primaryForegroundColor} name={iconName} size={30} />
      </View>
      <Text
        style={{
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function TransactionsList() {
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

type TransactionItemProps = {
  transaction: AccountTransaction;
};

function TransactionItem({ transaction }: TransactionItemProps) {
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
            }}
          >
            {bank?.label}
          </Text>
          <Text
            style={{
              fontSize: 16,
            }}
          >
            {transaction.toAccountNumber}
          </Text>
        </View>
      </View>
      <Text>
        {transaction.toAmount.toLocaleString("en-UK", { style: "currency", currency: "MYR" }).replace("MYR", "RM")}
      </Text>
    </View>
  );
}
