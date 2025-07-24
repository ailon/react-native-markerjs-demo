import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  variant?: "default" | "primary";
  icon?: React.ReactNode;
  disabled?: boolean;
  onPress?: () => void;
};

export default function Button({
  label,
  variant = "default",
  icon,
  onPress,
  disabled = false,
}: Props) {
  if (variant === "primary") {
    return (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: "#E60076", borderRadius: 18 },
        ]}
      >
        <Pressable
          style={[styles.button, { backgroundColor: "#fff" }]}
          onPress={onPress}
        >
          {icon}
          <Text style={[styles.buttonLabel, { color: "#25292e" }]}>
            {label}
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.buttonContainer, { width: 160 }]}>
      <Pressable style={styles.button} onPress={onPress} disabled={disabled}>
        {!disabled && icon}
        <Text
          style={disabled ? styles.buttonLabelDisabled : styles.buttonLabel}
        >
          {label}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
  buttonLabelDisabled: {
    color: "#aaa",
    fontSize: 16,
  },
});
