import { BankItemRenderer } from "@/components/bank-item-renderer";
import { BankList } from "@/constants/bank-list";
import { useThemeColor } from "@/hooks/use-theme-color";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useRouter } from "expo-router/build/hooks";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TransferRequest>({
    resolver: zodResolver(schema),
    defaultValues: { accountNumber: "" },
  });

  const onSubmit = async (data: TransferRequest) => {
    router.push({
      pathname: "/bank-transfer-input-amount",
      params: { toBank: params.bank, toAccountNumber: data.accountNumber, toName: "JOHN DOE" },
    });
  };

  return (
    <View
      style={{
        padding: 18,
        gap: 32,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
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
            }}
          >
            Next
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default BankTransferInput;
