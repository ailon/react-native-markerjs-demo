import { MarkerBaseState } from "@markerjs/react-native-markerjs";
import React from "react";
import { StyleSheet, View } from "react-native";
import ColorPicker from "./ColorPicker";
import ToolbarButton from "./ToolbarButton";

const markers = {
  FrameMarker: {
    icon: "square",
  },
  ArrowMarker: {
    icon: "long-arrow-alt-right",
  },
  FreehandMarker: {
    icon: "pencil-alt",
  },
  TextMarker: {
    icon: "font",
  },
};

interface ToolbarProps {
  selectedMarker?: MarkerBaseState | null;
  onSwitchToSelectMode?: () => void;
  onDoneEditing?: () => void;
  onCreateMarkerClick?: <T extends MarkerBaseState>(
    markerType: string,
    params?: Partial<T>
  ) => void;
  onMarkerPropertiesChange?: (marker: Partial<MarkerBaseState>) => void;
}

const Toolbar = ({
  selectedMarker,
  onSwitchToSelectMode,
  onDoneEditing,
  onCreateMarkerClick,
  onMarkerPropertiesChange,
}: ToolbarProps) => {
  const [pressedButton, setPressedButton] = React.useState<string | null>(null);

  const handleMarkerButtonPress = (markerType: string) => {
    setPressedButton(markerType);
    onCreateMarkerClick?.(markerType);
  };

  return (
    <View style={styles.toolbarContainer}>
      <ToolbarButton
        icon="plus"
        onPress={() => {
          setPressedButton(null);
          onSwitchToSelectMode?.();
        }}
      />

      {!selectedMarker && (
        <View style={styles.markerButtonsContainer}>
          {Object.entries(markers).map(([key, { icon }]) => (
            <ToolbarButton
              key={key}
              icon={icon}
              pressed={pressedButton === key}
              onPress={() => handleMarkerButtonPress(key)}
            />
          ))}
        </View>
      )}

      {selectedMarker && (
        <ColorPicker
          selectedColor={selectedMarker.strokeColor}
          onColorSelect={(color) => {
            onMarkerPropertiesChange?.({
              strokeColor: color,
            });
          }}
        />
      )}

      <ToolbarButton icon="check" onPress={onDoneEditing} />
    </View>
  );
};

export default Toolbar;

const styles = StyleSheet.create({
  toolbarContainer: {
    width: "100%",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#E60076",
    backgroundColor: "#25292eaa",
  },
  markerButtonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
});
