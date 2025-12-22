import { useThemeColor } from "@/hooks/use-theme-color";
import { Href, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { IconSymbol, IconSymbolName } from "../ui/icon-symbol";

type TransferOptionProps = {
  label: string;
  href: Href;
  iconName: IconSymbolName;
  disabled?: boolean;
};

export function TransferOption({ label, href, iconName, disabled = false }: TransferOptionProps) {
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
