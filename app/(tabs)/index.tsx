import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import AnnotationViewer from "@/components/AnnotationViewer";
import Button from "@/components/Button";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AnnotationState } from "@markerjs/react-native-markerjs";

const PlaceholderImage = require("@/assets/images/sample-portrait.jpg");

const ImageIcon = () => (
  <FontAwesome name="picture-o" size={18} style={styles.buttonIcon} />
);
const SaveIcon = () => (
  <FontAwesome name="save" size={18} style={styles.buttonIcon} />
);
const EditIcon = () => (
  <FontAwesome name="edit" size={18} style={styles.buttonIconPrimary} />
);

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  const [annotation, setAnnotation] = useState<AnnotationState | undefined>(
    undefined
  );

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <AnnotationViewer
          targetSrc={selectedImage ? selectedImage : PlaceholderImage}
          annotation={annotation}
        />
      </View>
      <View style={styles.footerContainer}>
        <Button
          variant="primary"
          icon={<EditIcon />}
          label="Annotate this image"
        />
        <View style={styles.secondaryButtonContainer}>
          <Button
            label="Pick an image"
            icon={<ImageIcon />}
            onPress={pickImageAsync}
          />
          <Button
            label="Save annotated"
            icon={<SaveIcon />}
            disabled={annotation === undefined}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    padding: 20,
    paddingTop: 28,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  secondaryButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
  },
  buttonIcon: {
    paddingRight: 8,
    color: "#fff",
  },
  buttonIconPrimary: {
    paddingRight: 8,
    color: "#25292e",
  },
});
