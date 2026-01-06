import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { useAccountInfoContext } from "@/contexts/AccountInfoContext";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function MainLandingPage() {
  const insets = useSafeAreaInsets();
  const primaryForegroundColor = useThemeColor({}, "primaryForeground");
  const primary = useThemeColor({}, "primary");
  const router = useRouter();

  const { accountBalance } = useAccountInfoContext();

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
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: primary,
          paddingVertical: 36,
          paddingHorizontal: 20,
          borderRadius: 24,
          gap: 18,
        }}
      >
        <View
          style={{
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
            }}
          >
            Current balance
          </Text>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
            }}
          >
            {accountBalance.toLocaleString("en-UK", { style: "currency", currency: "MYR" }).replace("MYR", "RM")}
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            gap: 12,
          }}
        >
          <Pressable style={{ gap: 8, alignItems: "center", padding: 8 }} onPress={() => router.push("/transfer")}>
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
            <Text
              style={{
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              Transfer
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
