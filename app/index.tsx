import { Link } from "expo-router";
import { Platform, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
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
      <Link href="/about">To about page</Link>
    </View>
  );
}
