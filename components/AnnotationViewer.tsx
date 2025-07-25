import { AnnotationState, MarkerView } from "@markerjs/react-native-markerjs";

interface AnnotationViewerProps {
  targetSrc: string;
  annotation: AnnotationState | null;
}

const AnnotationViewer = ({ targetSrc, annotation }: AnnotationViewerProps) => {
  return <MarkerView targetSrc={targetSrc} annotation={annotation} />;
};

export default AnnotationViewer;
