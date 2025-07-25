import {
  AnnotationState,
  MarkerArea,
  MarkerAreaHandle,
  MarkerBaseState,
  markerIdSymbol,
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

  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);

  const handleCreateMarkerClick = <T extends MarkerBaseState>(
    markerType: string,
    params?: Partial<T>
  ) => {
    markerAreaRef.current?.createMarker(markerType, params);
  };

  const selectedMarker = annotation?.markers.find(
    (m) => m[markerIdSymbol] === selectedMarkerId
  );

  return (
    <>
      <View style={styles.markerAreaContainer}>
        <MarkerArea
          targetSrc={targetImage}
          annotation={annotation}
          ref={markerAreaRef}
          onSelectedMarkerChange={(marker) =>
            setSelectedMarkerId(marker?.[markerIdSymbol] || null)
          }
          onAnnotationChange={setAnnotation}
        />
      </View>
      <View style={styles.toolbarContainer}>
        <Toolbar
          selectedMarker={selectedMarker}
          onSwitchToSelectMode={() => setSelectedMarkerId(null)}
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
