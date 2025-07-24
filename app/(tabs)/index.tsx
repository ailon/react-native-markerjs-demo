import { useState } from "react";
import { StyleSheet, View } from "react-native";

import AnnotationEditor from "@/components/AnnotationEditor";
import HomeScreen from "@/components/HomeScreen";
import { AnnotationState } from "@markerjs/react-native-markerjs";

const PlaceholderImage = require("@/assets/images/sample-portrait.jpg");

export default function Index() {
  const [mode, setMode] = useState<"view" | "annotate">("view");

  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  const [annotation, setAnnotation] = useState<AnnotationState | null>(null);

  return (
    <View style={styles.container}>
      {mode === "view" && (
        <HomeScreen
          selectedImage={selectedImage || PlaceholderImage}
          annotation={annotation}
          setSelectedImage={setSelectedImage}
          setAnnotation={setAnnotation}
          startAnnotating={() => setMode("annotate")}
        />
      )}
      {mode === "annotate" && (
        <AnnotationEditor
          targetImage={selectedImage || PlaceholderImage}
          annotation={annotation || null}
          setAnnotation={setAnnotation}
          doneEditing={() => setMode("view")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
});
