import useCreateTransaction from "@/api/mutations/useCreateTransaction";
import { Separator } from "@/components/separator";
import { BankRenderer } from "@/components/transfer/bank-transfer/bank-item-renderer";
import { PasswordModal } from "@/components/transfer/password-modal";
import { BankList } from "@/constants/bank-list";
import { useAccountInfoContext } from "@/contexts/AccountInfoContext";
import { useThemeColor } from "@/hooks/use-theme-color";
import * as LocalAuthentication from "expo-local-authentication";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BankTransferConfirm() {
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { toBank, toAccountNumber, toAmount, toName } = params;
  const { addTransaction } = useAccountInfoContext();
  const router = useRouter();
  const [optionalNote, setOptionalNote] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [openPasswordModal, setOpenPasswordModal] = useState<boolean>(false);

  const primaryForegroundColor = useThemeColor({}, "primaryForeground");
  const tintColor = useThemeColor({}, "tint");

  const bank = BankList.find((bank) => bank.value === params.toBank);

  async function handleApprove() {
    const isBiometricsAvailable = await LocalAuthentication.hasHardwareAsync();

    const hasSavedBiometrics = await LocalAuthentication.isEnrolledAsync();

    if (!hasSavedBiometrics || !isBiometricsAvailable) {
      setOpenPasswordModal(true);
      return;
    }

    let authenticated = false;

    if (hasSavedBiometrics) {
      const result = await LocalAuthentication.authenticateAsync({ promptMessage: "Approval is required" });

      if (result.success) {
        authenticated = true;
      }
    }

    if (authenticated) {
      submitTransactionAfterApproval();
    }
  }

  const createTransaction = useCreateTransaction({ addTransaction });

  async function submitTransactionAfterApproval() {
    const now = new Date();
    const newTransaction = {
      dateTime: now.toISOString(),
      id: now.valueOf().toString(),
      toAccountNumber: String(toAccountNumber),
      toAmount: Number(toAmount),
      toBank: String(toBank),
      note: optionalNote,
    };

    createTransaction.mutate(newTransaction, {
      onSuccess: () => {
        router.push({ pathname: "/bank-transfer-success", params: { ...newTransaction, toName } });
      },
    });
  }

  return (
    <View
      style={{
        height: "100%",
        paddingTop: 40,
        paddingBottom: insets.bottom + 10,
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
            {createTransaction.isPending ? <ActivityIndicator size="small" color="white" /> : `Approve via Ryt Secure`}
          </Text>
        </View>
      </Pressable>
      <PasswordModal
        openPasswordModal={openPasswordModal}
        setOpenPasswordModal={setOpenPasswordModal}
        password={password}
        setPassword={setPassword}
        submitTransactionAfterApproval={submitTransactionAfterApproval}
      />
    </View>
  );
}
