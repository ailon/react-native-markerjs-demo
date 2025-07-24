import {
  AnnotationState,
  MarkerArea,
  MarkerAreaHandle,
  MarkerBaseState,
} from "@markerjs/react-native-markerjs";
import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import Toolbar from "./Toolbar";

interface AnnotationEditorProps {
  targetImage: string;
  annotation: AnnotationState | null;
  setAnnotation: (annotation: AnnotationState) => void;
  doneEditing?: () => void;
}

const AnnotationEditor = ({
  targetImage,
  annotation,
  setAnnotation,
  doneEditing,
}: AnnotationEditorProps) => {
  const markerAreaRef = useRef<MarkerAreaHandle>(null);

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
          onAnnotationChange={setAnnotation}
        />
      </View>
      <View style={styles.toolbarContainer}>
        <Toolbar
          onDoneEditing={doneEditing}
          onCreateMarkerClick={handleCreateMarkerClick}
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
