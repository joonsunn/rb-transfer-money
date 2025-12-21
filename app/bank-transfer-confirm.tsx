import { BankRenderer } from "@/components/bank-item-renderer";
import { Separator } from "@/components/separator";
import { BankList } from "@/constants/bank-list";
import { useAccountInfoContext } from "@/contexts/AccountInfoContext";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BankTransferConfirm() {
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { toBank, toAccountNumber, toAmount, toName } = params;
  const { addTransaction } = useAccountInfoContext();
  const router = useRouter();
  const [optionalNote, setOptionalNote] = useState<string>("");

  const primaryForegroundColor = useThemeColor({}, "primaryForeground");
  const tintColor = useThemeColor({}, "tint");

  const bank = BankList.find((bank) => bank.value === params.toBank);

  function handleApprove() {
    const now = new Date();
    const newTransaction = {
      dateTime: now.toISOString(),
      id: now.valueOf().toString(),
      toAccountNumber: String(toAccountNumber),
      toAmount: Number(toAmount),
      toBank: String(toBank),
      note: optionalNote,
    };
    addTransaction(newTransaction);
    router.push({ pathname: "/bank-transfer-success", params: { ...newTransaction, toName } });
  }

  return (
    <View
      style={{
        height: "100%",
        paddingTop: 40,
        paddingBottom: insets.bottom,
        paddingHorizontal: 18,
        gap: 40,
      }}
    >
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
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
            color: "grey",
          }}
        >
          Today
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          gap: 14,
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
                fontSize: 16,
                color: "grey",
              }}
            >
              Pay from
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Main Account
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: tintColor,
            padding: 18,
            borderRadius: 20,
            gap: 8,
          }}
        >
          <Text
            style={{
              color: "grey",
              fontSize: 16,
            }}
          >
            Receipient reference/note (optional):
          </Text>
          <TextInput
            value={optionalNote}
            onChangeText={setOptionalNote}
            placeholder="e.g. Ref no, etc"
            placeholderTextColor="grey"
            style={{
              fontSize: 16,
            }}
          />
        </View>
      </View>

      <Pressable
        style={{
          bottom: 0,
        }}
        onPress={handleApprove}
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
            Approve via Ryt Secure
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
