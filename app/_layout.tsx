import { AccountInfoContextProvider } from "@/contexts/AccountInfoContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AccountInfoContextProvider>
      <Stack
        screenOptions={{
          animation: "none",
          headerBackButtonDisplayMode: "minimal",
        }}
      >
        <Stack.Screen name="index" options={{ header: () => <></> }} />
        <Stack.Screen name="about" />
        <Stack.Screen name="transfer" options={{ header: () => <></> }} />
        <Stack.Screen
          name="bank-transfer"
          options={{
            headerTitle: "Transfer",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="bank-transfer-input"
          options={{
            headerTitle: "Transfer",
            headerTitleAlign: "center",
          }}
        />
      </Stack>
    </AccountInfoContextProvider>
  );
}
