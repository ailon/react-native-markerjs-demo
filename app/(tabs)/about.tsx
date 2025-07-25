import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>marker.js for React Native Demo</Text>
      <Pressable
        onPress={() =>
          Linking.openURL(
            "https://markerjs.com/react-native?utm_source=markerjsrn-demo&utm_medium=about"
          )
        }
        style={{ padding: 8 }}
      >
        <Text style={styles.linkText}>Learn more</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  linkText: {
    color: "#E60076",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
