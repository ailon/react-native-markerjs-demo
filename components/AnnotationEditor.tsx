import { AnnotationState, MarkerArea } from "@markerjs/react-native-markerjs";
import React from "react";
import { StyleSheet, View } from "react-native";

interface AnnotationEditorProps {
  targetImage: string;
  annotation: AnnotationState | null;
  setAnnotation: (annotation: AnnotationState) => void;
}

const AnnotationEditor = ({
  targetImage,
  annotation,
  setAnnotation,
}: AnnotationEditorProps) => {
  return (
    <>
      <View style={styles.markerAreaContainer}>
        <MarkerArea
          targetSrc={targetImage}
          annotation={annotation}
          onAnnotationChange={setAnnotation}
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
});
