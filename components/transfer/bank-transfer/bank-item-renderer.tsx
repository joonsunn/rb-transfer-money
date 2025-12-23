import { IconSymbol } from "@/components/ui/icon-symbol";
import { BankListOption } from "@/constants/bank-list";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useRouter } from "expo-router";
import { Platform, Pressable, Text, View } from "react-native";

type BankOptionProps = {
  bank: BankListOption | undefined | null;
  navigate?: boolean;
  iconOnly?: boolean;
};

export function BankItemRenderer({ bank, navigate }: BankOptionProps) {
  const router = useRouter();
  const primaryColor = useThemeColor({}, "primary");

  if (!bank) return null;

  if (navigate) {
    return (
      <Pressable
        android_ripple={{ color: primaryColor, foreground: true }}
        onPress={() => router.push({ pathname: "/transfer/bank-transfer/input", params: { bank: bank.value } })}
        style={{ width: "100%" }}
      >
        <BankRenderer bank={bank} navigate />
      </Pressable>
    );
  }

  return <BankRenderer bank={bank} />;
}

export function BankRenderer({ bank, navigate, iconOnly = false }: BankOptionProps) {
  const iconColor = useThemeColor({}, "icon");

  if (!bank) return null;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        ...(iconOnly
          ? {}
          : {
              width: "100%",
              padding: 16,
            }),
      }}
    >
      <View style={{ flexDirection: "row", gap: 24, alignItems: "center" }}>
        <View
          style={{
            backgroundColor: bank.backgroundColor,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
            width: Platform.select({
              ios: 36,
              default: 48,
            }),
            height: Platform.select({
              ios: 36,
              default: 48,
            }),
          }}
        >
          <Text
            style={{
              color: bank.color,
              fontWeight: 500,
              fontSize: Platform.select({
                ios: 20,
                default: 28,
              }),
            }}
          >
            {bank.label[0].toUpperCase()}
          </Text>
        </View>
        {iconOnly ? null : (
          <Text
            style={{
              fontWeight: 500,
              fontSize: 16,
            }}
          >
            {bank.label}
          </Text>
        )}
      </View>
      {navigate ? <IconSymbol name={"chevron.right"} color={iconColor} /> : null}
    </View>
  );
}
