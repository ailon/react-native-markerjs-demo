import { useState } from "react";
import { StyleSheet, View } from "react-native";

import HomeScreen from "@/components/HomeScreen";
import { AnnotationState } from "@markerjs/react-native-markerjs";

const PlaceholderImage = require("@/assets/images/sample-portrait.jpg");

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  const [annotation, setAnnotation] = useState<AnnotationState | undefined>(
    undefined
  );

  return (
    <View style={styles.container}>
      <HomeScreen
        selectedImage={selectedImage || PlaceholderImage}
        annotation={annotation}
        setSelectedImage={setSelectedImage}
      />
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
