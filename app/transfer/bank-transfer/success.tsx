import { Separator } from "@/components/separator";
import { BankRenderer } from "@/components/transfer/bank-transfer/bank-item-renderer";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { BankList } from "@/constants/bank-list";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BankTransferSuccess() {
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const primaryForegroundColor = useThemeColor({}, "primaryForeground");
  const tintColor = useThemeColor({}, "tint");
  const successColor = useThemeColor({}, "success");
  const { toAmount, toAccountNumber, toBank, toName, dateTime, id, note } = params;
  const router = useRouter();

  const bank = BankList.find((bank) => bank.value === toBank);

  return (
    <View
      style={{
        gap: 32,
        paddingTop: insets.top + 40,
        paddingBottom: insets.bottom + 10,
        height: "100%",
        paddingHorizontal: 18,
      }}
    >
      <View
        style={{
          flex: 1,
          width: "100%",
          gap: 56,
        }}
      >
        <View
          style={{
            width: "100%",
            alignItems: "center",
            gap: 8,
          }}
        >
          <IconSymbol name="checkmark" color={successColor} size={100} />
          <Text
            style={{
              color: successColor,
              fontSize: 28,
              fontWeight: "bold",
            }}
          >
            Successful
          </Text>
          <Text
            style={{
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            {Number(toAmount).toLocaleString("en-UK", { style: "currency", currency: "MYR" }).replace("MYR", "RM")}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "grey",
            }}
          >
            {new Date(String(dateTime)).toLocaleString("en-MY", { dateStyle: "medium", timeStyle: "short" })}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            width: "100%",
            gap: 18,
          }}
        >
          <View
            style={{
              backgroundColor: tintColor,
              padding: 18,
              borderRadius: 20,
              gap: 8,
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
              <View
                style={{
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {toName}
                </Text>
                <Text
                  style={{
                    color: "grey",
                    fontWeight: 600,
                  }}
                >
                  {toAccountNumber}
                </Text>
              </View>
            </View>
            <Separator />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  color: "grey",
                }}
              >
                Reference ID
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                {id}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  color: "grey",
                }}
              >
                Recipient reference
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                {note}
              </Text>
            </View>
          </View>
        </View>
        <Pressable
          style={{
            bottom: 0,
          }}
          onPress={() => router.push("/")}
        >
          <View
            style={{
              backgroundColor: primaryForegroundColor,
              borderRadius: 100,
              paddingVertical: 18,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Done
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
