import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function About() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This is the about page</Text>
      <Pressable>
        <Link href={"/"}>
          <Text>Go Back</Text>
        </Link>
      </Pressable>
    </View>
  );
}
