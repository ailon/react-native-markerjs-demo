import {
  AnnotationState,
  MarkerArea,
  MarkerAreaHandle,
  MarkerBaseState,
} from "@markerjs/react-native-markerjs";
import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Toolbar from "./Toolbar";

interface AnnotationEditorProps {
  targetImage: string;
  annotation: AnnotationState | null;
  setAnnotation: (annotation: AnnotationState) => void;
  onMarkerPropertiesChange?: (marker: MarkerBaseState) => void;
  doneEditing?: () => void;
}

const AnnotationEditor = ({
  targetImage,
  annotation,
  setAnnotation,
  onMarkerPropertiesChange,
  doneEditing,
}: AnnotationEditorProps) => {
  const markerAreaRef = useRef<MarkerAreaHandle>(null);

  const [selectedMarker, setSelectedMarker] = useState<MarkerBaseState | null>(
    null
  );

  const handleCreateMarkerClick = <T extends MarkerBaseState>(
    markerType: string,
    params?: Partial<T>
  ) => {
    markerAreaRef.current?.createMarker(markerType, params);
  };

  return (
    <>
      <View style={styles.markerAreaContainer}>
        <MarkerArea
          targetSrc={targetImage}
          annotation={annotation}
          ref={markerAreaRef}
          onSelectedMarkerChange={setSelectedMarker}
          onAnnotationChange={setAnnotation}
        />
      </View>
      <View style={styles.toolbarContainer}>
        <Toolbar
          selectedMarker={selectedMarker}
          onSwitchToSelectMode={() => setSelectedMarker(null)}
          onDoneEditing={doneEditing}
          onCreateMarkerClick={handleCreateMarkerClick}
          onMarkerPropertiesChange={(marker) => {
            onMarkerPropertiesChange?.({
              ...selectedMarker,
              ...marker,
            } as MarkerBaseState);
          }}
        />
      </View>
    </>
  );
};

export default AnnotationEditor;

const styles = StyleSheet.create({
  markerAreaContainer: {
    flex: 1,
    width: "100%",
    padding: 20,
    paddingTop: 28,
  },
  toolbarContainer: {
    flex: 1 / 3,
    width: "100%",
    padding: 20,
    paddingBottom: 32,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
