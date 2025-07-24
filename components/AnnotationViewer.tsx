import {
  AnnotationState,
  createNewAnnotationState,
  MarkerView,
} from "@markerjs/react-native-markerjs";

interface AnnotationViewerProps {
  targetSrc: string;
  annotation: AnnotationState | null;
}

const AnnotationViewer = ({ targetSrc, annotation }: AnnotationViewerProps) => {
  return (
    <MarkerView
      targetSrc={targetSrc}
      // @todo: once support for undefined annotation is added, update this
      annotation={annotation ? annotation : createNewAnnotationState(100, 100)}
    />
  );
};

export default AnnotationViewer;
