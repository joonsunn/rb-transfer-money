import { Text, View } from "react-native";

type TransferScreenHeaderProps = {
  route: { params?: { toName: string; toAccountNumber: string; toBank: string } };
};

export function TransferScreenHeader({ route }: TransferScreenHeaderProps) {
  const { toName = "", toAccountNumber = "" } = route.params || {};
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <View>
        <Text
          style={{
            fontWeight: 600,
            fontSize: 18,
          }}
        >
          {toName}
        </Text>
      </View>
      <View>
        <Text>{toAccountNumber}</Text>
      </View>
    </View>
  );
}
