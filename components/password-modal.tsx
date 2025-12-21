import { useThemeColor } from "@/hooks/use-theme-color";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type PasswordModalProps = {
  openPasswordModal: boolean;
  setOpenPasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  submitTransactionAfterApproval: () => void;
};

export function PasswordModal({
  openPasswordModal,
  setOpenPasswordModal,
  password,
  setPassword,
  submitTransactionAfterApproval,
}: PasswordModalProps) {
  const primaryForegroundColor = useThemeColor({}, "primaryForeground");
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={openPasswordModal} onRequestClose={() => setOpenPasswordModal(false)}>
      <View
        style={{
          height: "100%",
          paddingTop: insets.top + 42,
          paddingBottom: insets.bottom + 10,
          paddingHorizontal: 18,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Enter your password to approve the transaction:
          </Text>
          <TextInput
            placeholder=""
            secureTextEntry
            placeholderTextColor="lightgrey"
            onChangeText={(value) => setPassword(value)}
            style={{
              padding: 10,
              fontSize: 48,
              fontWeight: 600,
              borderBottomColor: "black",
              borderBottomWidth: 2,
              color: "black",
            }}
          />
        </View>
        <View
          style={{
            gap: 8,
          }}
        >
          <Pressable
            style={{
              bottom: 0,
            }}
            onPress={() => {
              if (password) {
                submitTransactionAfterApproval();
              }
            }}
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
                Approve Transaction
              </Text>
            </View>
          </Pressable>
          <Pressable
            style={{
              bottom: 0,
            }}
            onPress={() => setOpenPasswordModal(false)}
          >
            <View
              style={{
                borderRadius: 100,
                paddingVertical: 18,
                justifyContent: "center",
                alignItems: "center",
                borderColor: primaryForegroundColor,
                borderWidth: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                Cancel
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
