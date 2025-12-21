import { IconSymbol, IconSymbolName } from "@/components/ui/icon-symbol";
import { useAccountInfoContext } from "@/contexts/AccountInfoContext";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Href, Link, useRouter } from "expo-router";
import { Platform, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Transfer() {
  const insets = useSafeAreaInsets();
  const { transactions } = useAccountInfoContext();

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 14,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
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
      <Link href="/about">Go to About page</Link>
      <Text>{JSON.stringify(transactions, null, 2)}</Text>
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
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
