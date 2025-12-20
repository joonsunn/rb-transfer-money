import { Link } from "expo-router";
import { Platform, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function Index() {
  const insets = useSafeAreaInsets();
  const primaryForegroundColor = useThemeColor({}, "primaryForeground");

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
      <Text
        style={{
          fontSize: 32,
          fontFamily: Platform.select({
            ios: "ui-serif",
            android: "serif",
          }),
        }}
      >
        Total Balance
      </Text>
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
        }}
      >
        RM 10,000.00
      </Text>
      <Link href="/transfer">
        <View style={{ gap: 12 }}>
          <View
            style={{
              backgroundColor: primaryForegroundColor,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 100,
              width: 52,
              height: 52,
            }}
          >
            <IconSymbol name="arrow.up.right" color="white" />
          </View>
          <Text>Transfer</Text>
        </View>
      </Link>
    </View>
  );
}
