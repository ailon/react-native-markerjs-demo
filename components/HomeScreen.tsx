import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  AnnotationState,
  MarkerView,
  MarkerViewHandle,
} from "@markerjs/react-native-markerjs";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import React, { useRef } from "react";
import { PixelRatio, Platform, StyleSheet, View } from "react-native";
import { captureRef } from "react-native-view-shot";

import Button from "./Button";

const ImageIcon = () => (
  <FontAwesome name="picture-o" size={18} style={styles.buttonIcon} />
);
const SaveIcon = () => (
  <FontAwesome name="save" size={18} style={styles.buttonIcon} />
);
const EditIcon = () => (
  <FontAwesome name="edit" size={18} style={styles.buttonIconPrimary} />
);

interface HomeScreenProps {
  selectedImage: string;
  annotation: AnnotationState | null;
  setSelectedImage: (uri: string) => void;
  setAnnotation?: (annotation: AnnotationState | null) => void;
  startAnnotating?: () => void;
}

const HomeScreen = ({
  selectedImage,
  annotation,
  setSelectedImage,
  setAnnotation,
  startAnnotating,
}: HomeScreenProps) => {
  const markerViewRef = useRef<MarkerViewHandle>(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setAnnotation?.(null);
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const handleRenderClick = async () => {
    if (annotation && markerViewRef.current?.visualRef.current) {
      try {
        // react-native-view-shot renders with pixel ratio in mind on iOS, but not on Android.
        const pixelRatio = Platform.OS === "ios" ? PixelRatio.get() : 1;

        const localUri = await captureRef(
          markerViewRef.current.visualRef.current,
          {
            width: annotation.width / pixelRatio,
            height: annotation.height / pixelRatio,
            quality: 1,
          }
        );

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Image saved to your device's photo library.");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <View style={styles.imageContainer}>
        <MarkerView
          ref={markerViewRef}
          targetSrc={selectedImage}
          annotation={annotation}
        />
      </View>
      <View style={styles.footerContainer}>
        <Button
          variant="primary"
          icon={<EditIcon />}
          label="Annotate this image"
          onPress={startAnnotating}
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
            onPress={handleRenderClick}
          />
        </View>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
