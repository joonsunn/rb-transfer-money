import { useGetRecipientInfo } from "@/api/queries/useGetRecipientInfo";
import { BankRenderer } from "@/components/transfer/bank-transfer/bank-item-renderer";
import { BankList } from "@/constants/bank-list";
import { useAccountInfoContext } from "@/contexts/AccountInfoContext";
import { useThemeColor } from "@/hooks/use-theme-color";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useRouter } from "expo-router/build/hooks";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "zod";

const schema = z.object({
  amount: z
    .string()
    .regex(/^\d+(\.\d{0,2})?$/, "Invalid amount")
    .transform(Number),
});

export default function BankTransferInputAmount() {
  const primaryForegroundColor = useThemeColor({}, "primaryForeground");
  const tintColor = useThemeColor({}, "tint");
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ toAccountNumber: string; toBank: string; toName: string }>();
  const { toAccountNumber, toBank, toName } = params;
  const router = useRouter();

  const { accountBalance } = useAccountInfoContext();

  const { data: recipient, isLoading: recipientIsLoading } = useGetRecipientInfo({
    accountNumber: toAccountNumber,
    bank: toBank,
  });

  useEffect(() => {
    router.setParams({ toName: recipient?.name });
  }, [router, recipient?.name]);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: z.infer<typeof schema>) {
    const insufficientBalance = accountBalance < data.amount;

    if (insufficientBalance) {
      setError("amount", { message: "Insufficent account balance" });
      return;
    }
    const newTransaction = {
      toAccountNumber,
      toAmount: data.amount,
      toBank,
      toName,
    };
    router.push({ pathname: "/bank-transfer-confirm", params: newTransaction });
  }

  if (recipientIsLoading) {
    return (
      <View>
        <ActivityIndicator size="small" color="primaryForegroundColor" />
      </View>
    );
  }

  return (
    <View
      style={{
        gap: 32,
        paddingTop: insets.top,
        height: "100%",
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <Controller
          control={control}
          name="amount"
          render={({ field: { value, onChange } }) => (
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: 600,
                  }}
                >
                  RM
                </Text>
                <TextInput
                  keyboardType="decimal-pad"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={String(value || "")}
                  onChangeText={(text) => {
                    let sanitized = text.replace(/[^0-9.]/g, "");
                    if (sanitized === "") {
                      onChange("");
                      return;
                    }
                    const firstDot = sanitized.indexOf(".");
                    if (firstDot !== -1) {
                      sanitized = sanitized.slice(0, firstDot + 1) + sanitized.slice(firstDot + 1).replace(/\./g, "");
                    }
                    let [integer, decimals] = sanitized.split(".");
                    if (integer.length > 1 && integer.startsWith("0")) {
                      integer = integer.replace(/^0+(?=\d)/, "");
                    }
                    if (decimals?.length > 2) {
                      decimals = decimals.slice(0, 2);
                    }
                    const value = decimals !== undefined ? `${integer}.${decimals}` : integer;
                    onChange(value);
                  }}
                  placeholderTextColor="grey"
                  style={{
                    padding: 10,
                    fontSize: 48,
                    fontWeight: 600,
                    width: 200,
                  }}
                />
              </View>
              {errors.amount && <Text style={{ color: "red", marginTop: 4 }}>{errors.amount.message}</Text>}
            </>
          )}
        />
      </View>
      <View
        style={{
          paddingBottom: insets.bottom + 10,
          backgroundColor: tintColor,
          padding: 18,
          gap: 24,
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
            }}
          >
            <BankRenderer bank={BankList.find((bank) => bank.value === "ryt-bank")} iconOnly />
            <Text
              style={{
                fontSize: 16,
                color: "grey",
              }}
            >
              Main Account
            </Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {accountBalance.toLocaleString("en-UK", { style: "currency", currency: "MYR" }).replace("MYR", "RM")}
          </Text>
        </View>

        <Pressable
          style={{
            bottom: 0,
          }}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          <View
            style={{
              backgroundColor: primaryForegroundColor,
              borderRadius: 100,
              paddingVertical: 18,
              justifyContent: "center",
              alignItems: "center",
              ...(!isValid ? { opacity: 0.7 } : {}),
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Next
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
