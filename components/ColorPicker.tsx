import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export const defaultColors = [
  "red",
  "#ffff00",
  "#22c55e",
  "#8b5cf6",
  "#000000",
  "#ffffff",
];

interface ColorPickerProps {
  selectedColor?: string;
  onColorSelect?: (color: string) => void;
}

const ColorPicker = ({ selectedColor, onColorSelect }: ColorPickerProps) => {
  return (
    <View style={styles.colorButtonsContainer}>
      {defaultColors.map((color) => (
        <TouchableOpacity
          key={color}
          style={[
            styles.colorButton,
            { backgroundColor: color },
            color === selectedColor && {
              width: 40,
              height: 40,
              borderWidth: 5,
              borderColor: "#fff",
            },
          ]}
          onPress={() => onColorSelect?.(color)}
        />
      ))}
    </View>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  colorButtonsContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    borderWidth: 2,
    borderColor: "#E60076",
  },
});
