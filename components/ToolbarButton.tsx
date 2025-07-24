import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface ToolbarButtonProps {
  icon: string;
  onPress?: () => void;
}
const ToolbarButton = ({ icon, onPress }: ToolbarButtonProps) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable onPress={onPress}>
        <FontAwesome5 name={icon} size={20} color="#fff" />
      </Pressable>
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
});
