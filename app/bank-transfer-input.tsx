import { useGetRecipientInfo } from "@/api/queries/useGetRecipientInfo";
import { BankItemRenderer } from "@/components/transfer/bank-transfer/bank-item-renderer";
import { BankList } from "@/constants/bank-list";
import { useThemeColor } from "@/hooks/use-theme-color";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useRouter } from "expo-router/build/hooks";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "zod";

type TransferRequest = {
  accountNumber: string;
};

const schema = z.object({
  accountNumber: z
    .string()
    .nonempty({ message: "Account number is required" })
    .regex(/^\d{9,18}$/, { message: "Please check that the account number provided is valid" }),
});

function BankTransferInput() {
  const params = useLocalSearchParams<{ bank: string }>();
  const tintColor = useThemeColor({}, "tint");
  const primaryForegroundColor = useThemeColor({}, "primaryForeground");
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [submitCount, setSubmitCount] = useState<number>(0);
  const { data: recipient, isLoading: recipientIsLoading } = useGetRecipientInfo({ accountNumber, bank: params.bank });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TransferRequest>({
    resolver: zodResolver(schema),
    defaultValues: { accountNumber },
  });

  const onSubmit = async (data: TransferRequest) => {
    setAccountNumber(data.accountNumber);
    setSubmitCount((c) => c + 1);
  };

  useEffect(() => {
    if (!recipientIsLoading && recipient?.name && submitCount > 0) {
      router.push({
        pathname: "/bank-transfer-input-amount",
        params: { toBank: params.bank, toAccountNumber: recipient.accountNumber },
      });
      setSubmitCount(0);
    }
  }, [submitCount, recipient, recipientIsLoading, params.bank, router]);

  useEffect(() => {
    reset({ accountNumber });
  }, [accountNumber, reset]);

  return (
    <View
      style={{
        padding: 18,
        gap: 32,
        paddingTop: insets.top,
        paddingBottom: insets.bottom + 10,
        height: "100%",
      }}
    >
      <View style={{ backgroundColor: tintColor, borderRadius: 12 }}>
        <BankItemRenderer bank={BankList.find((bankOption) => bankOption.value === params.bank)} />
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            gap: 8,
          }}
        >
          <Text
            style={{
              fontSize: 18,
            }}
          >
            Account number
          </Text>
          <Controller
            control={control}
            name="accountNumber"
            render={({ field: { value, onChange } }) => (
              <>
                <TextInput
                  keyboardType="number-pad"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter account number"
                  placeholderTextColor="grey"
                  style={{
                    padding: 10,
                    fontSize: 18,
                    borderBottomColor: primaryForegroundColor,
                    borderBottomWidth: 3,
                  }}
                />
                {errors.accountNumber && (
                  <Text style={{ color: "red", marginTop: 4 }}>{errors.accountNumber.message}</Text>
                )}
              </>
            )}
          />
        </View>
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
            {recipientIsLoading ? <ActivityIndicator size="small" color="white" /> : "Next"}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default BankTransferInput;
