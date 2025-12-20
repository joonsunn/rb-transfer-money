import { IconSymbol, IconSymbolName } from "@/components/ui/icon-symbol";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Href, Link } from "expo-router";
import { Platform, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Transfer() {
  const insets = useSafeAreaInsets();
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
        <TransferOption label="Bank/eWallet" href={"/about"} iconName="house.fill" />
        <TransferOption label="Mobile" href={"/about"} iconName="phone" />
        <TransferOption label="Others" href={"/about"} iconName="square.grid.2x2" />
      </View>
      <Link href="/about">Go to About page</Link>
    </View>
  );
}

type TransferOptionProps = {
  label: string;
  href: Href;
  iconName: IconSymbolName;
};

function TransferOption({ label, href, iconName }: TransferOptionProps) {
  const primaryColor = useThemeColor({}, "primary");
  const primaryForegroundColor = useThemeColor({}, "primaryForeground");
  const tintColor = useThemeColor({}, "tint");

  return (
    <Link href={href}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 120,
          width: 120,
          gap: 12,
          backgroundColor: tintColor,
          borderRadius: 8,
          padding: 12,
        }}
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
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          {label}
        </Text>
      </View>
    </Link>
  );
}
