import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface ToolbarButtonProps {
  icon: string;
  pressed?: boolean;
  onPress?: () => void;
}
const ToolbarButton = ({
  icon,
  onPress,
  pressed = false,
}: ToolbarButtonProps) => {
  return (
    <View
      style={[styles.buttonContainer, pressed && styles.buttonContainerPressed]}
    >
      <TouchableOpacity onPress={onPress}>
        <FontAwesome5 name={icon} size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default ToolbarButton;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainerPressed: {
    backgroundColor: "#E60076",
    borderRadius: "50%",
  },
});
