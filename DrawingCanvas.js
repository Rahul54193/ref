import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  LayoutChangeEvent,
  Modal,
  Platform,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { Canvas, Path, Skia, Group, Image as SkiaImage, useImage, SkPath } from '@shopify/react-native-skia';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {
  useSharedValue,
  runOnJS,
  useAnimatedReaction,
} from 'react-native-reanimated';
import ViewShot from 'react-native-view-shot';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const PEN_SIZES = [5, 10, 15, 20, 25];
const MIN_ZOOM = 0.8;
const MAX_ZOOM = 1.5;
const ERASER_TOLERANCE = 5;

interface PathData {
  path: SkPath;
  color: string;
  strokeWidth: number;
}

interface ColorData {
  color: string;
  svg: React.ComponentType<{ width: number; height: number }>;
}

const COLORSDATA: ColorData[] = [
  { color: '#FF3B30', svg: () => <View style={{ backgroundColor: '#FF3B30', width: 60, height: 60 }} /> },
  { color: '#4CD964', svg: () => <View style={{ backgroundColor: '#4CD964', width: 60, height: 60 }} /> },
  { color: '#007AFF', svg: () => <View style={{ backgroundColor: '#007AFF', width: 60, height: 60 }} /> },
  { color: '#FFCC00', svg: () => <View style={{ backgroundColor: '#FFCC00', width: 60, height: 60 }} /> },
  { color: '#5AC8FA', svg: () => <View style={{ backgroundColor: '#5AC8FA', width: 60, height: 60 }} /> },
  { color: '#FF9500', svg: () => <View style={{ backgroundColor: '#FF9500', width: 60, height: 60 }} /> },
  { color: '#5856D6', svg: () => <View style={{ backgroundColor: '#5856D6', width: 60, height: 60 }} /> },
];

interface DrawingCanvasProps {
  imageUri: string;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ imageUri }) => {
  const viewShotRef = useRef<ViewShot>(null);
  const [pathsState, setPathsState] = useState<PathData[]>([]);
  const [selectedColorState, setSelectedColorState] = useState<string>('#aa002f');
  const [isErasing, setIsErasing] = useState<boolean>(false);
  const [canvasLayoutMeta, setCanvasLayoutMeta] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [load, setLoading] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [selectedPenSize, setSelectedPenSize] = useState<number>(10);
  const [forceRender, setForceRender] = useState<number>(0);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);

  const paths = useSharedValue<PathData[]>([]);
  const selectedColor = useSharedValue<string>('#aa002f');
  const scale = useSharedValue<number>(1);
  const translateX = useSharedValue<number>(0);
  const translateY = useSharedValue<number>(0);
  const focalX = useSharedValue<number>(0);
  const focalY = useSharedValue<number>(0);
  const isPinching = useSharedValue<boolean>(false);
  const prevScale = useSharedValue<number>(1);
  const displayDimensions = useSharedValue({
    displayWidth: 0,
    displayHeight: 0,
    offsetX: 0,
    offsetY: 0,
    imageWidth: 0,
    imageHeight: 0,
  });

  const canvasImage = useImage(imageUri, (error) => {
    console.error('Image load failed:', error, { imageUri });
    setImageError(true);
  });

  useAnimatedReaction(
    () => scale.value,
    () => {
      runOnJS(setForceRender)(Math.random());
    },
    [scale],
  );

  useAnimatedReaction(
    () => paths.value,
    (currentPaths) => runOnJS(setPathsState)(currentPaths),
    [paths],
  );

  const handleCanvasLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setCanvasLayoutMeta({ width, height });
  }, []);

  const updateDisplayDimensions = useCallback(() => {
    if (!canvasImage || canvasLayoutMeta.width === 0 || canvasLayoutMeta.height === 0) {
      displayDimensions.value = {
        displayWidth: 0,
        displayHeight: 0,
        offsetX: 0,
        offsetY: 0,
        imageWidth: 0,
        imageHeight: 0,
      };
      return;
    }

    const imageWidth = canvasImage.width();
    const imageHeight = canvasImage.height();
    const canvasWidth = canvasLayoutMeta.width;
    const canvasHeight = canvasLayoutMeta.height;

    const canvasAspect = canvasWidth / canvasHeight;
    const imageAspect = imageWidth / imageHeight;
    let displayWidth: number, displayHeight: number, offsetX: number, offsetY: number;

    if (imageAspect > canvasAspect) {
      displayWidth = canvasWidth;
      displayHeight = canvasWidth / imageAspect;
      offsetX = 0;
      offsetY = (canvasHeight - displayHeight) / 2;
    } else {
      displayWidth = canvasHeight * imageAspect;
      displayHeight = canvasHeight;
      offsetX = (canvasWidth - displayWidth) / 2;
      offsetY = 0;
    }

    displayDimensions.value = {
      displayWidth,
      displayHeight,
      offsetX,
      offsetY,
      imageWidth,
      imageHeight,
    };
  }, [canvasImage, canvasLayoutMeta, displayDimensions]);

  useEffect(() => {
    updateDisplayDimensions();
  }, [canvasImage, canvasLayoutMeta]);

  const screenToImageCoordinates = (
    screenX: number,
    screenY: number,
    dimensions: typeof displayDimensions.value,
    currentScale: number,
    currentTranslateX: number,
    currentTranslateY: number,
  ) => {
    'worklet';
    const { displayWidth, displayHeight, offsetX, offsetY, imageWidth, imageHeight } = dimensions;

    if (displayWidth === 0 || displayHeight === 0) return null;

    // Convert screen coordinates to canvas coordinates
    const canvasX = screenX - offsetX - currentTranslateX;
    const canvasY = screenY - offsetY - currentTranslateY;

    // Apply inverse scaling
    const scaledX = canvasX / currentScale;
    const scaledY = canvasY / currentScale;

    // Check if point is within display bounds
    if (scaledX < 0 || scaledX > displayWidth || scaledY < 0 || scaledY > displayHeight) {
      return null;
    }

    // Convert to image coordinates (normalize to image dimensions)
    const imageX = (scaledX / displayWidth) * imageWidth;
    const imageY = (scaledY / displayHeight) * imageHeight;

    if (imageX < 0 || imageX > imageWidth || imageY < 0 || imageY > imageHeight) {
      return null;
    }

    return { x: imageX, y: imageY };
  };

  const isPointNearPath = (
    pointX: number,
    pointY: number,
    path: SkPath,
    tolerance: number,
    scale: number,
  ) => {
    'worklet';
    const bounds = path.getBounds();
    const scaledTolerance = tolerance / scale;
    const expandedBounds = {
      x: bounds.x - scaledTolerance,
      y: bounds.y - scaledTolerance,
      width: bounds.width + 2 * scaledTolerance,
      height: bounds.height + 2 * scaledTolerance,
    };

    return (
      pointX >= expandedBounds.x &&
      pointX <= expandedBounds.x + expandedBounds.width &&
      pointY >= expandedBounds.y &&
      pointY <= expandedBounds.y + expandedBounds.height
    );
  };

  const pan = Gesture.Pan()
    .maxPointers(1)
    .onStart((g) => {
      'worklet';
      if (isPinching.value) return;

      const dims = displayDimensions.value;
      if (dims.displayWidth === 0) return;

      if (!isErasing) {
        const path = Skia.Path.Make();
        const imageCoords = screenToImageCoordinates(
          g.x,
          g.y,
          dims,
          scale.value,
          translateX.value,
          translateY.value,
        );

        if (imageCoords) {
          path.moveTo(imageCoords.x, imageCoords.y);
          paths.value = [
            ...paths.value,
            { path, color: selectedColor.value, strokeWidth: selectedPenSize },
          ];
        }
      }
    })
    .onUpdate((g) => {
      'worklet';
      if (isPinching.value) return;

      const dims = displayDimensions.value;
      if (dims.displayWidth === 0) return;

      const imageCoords = screenToImageCoordinates(
        g.x,
        g.y,
        dims,
        scale.value,
        translateX.value,
        translateY.value,
      );

      if (imageCoords) {
        if (isErasing) {
          const eraserRadius = selectedPenSize + ERASER_TOLERANCE;
          const newPaths = paths.value.filter((pathData) => {
            return !isPointNearPath(
              imageCoords.x,
              imageCoords.y,
              pathData.path,
              eraserRadius,
              scale.value,
            );
          });
          paths.value = newPaths;
        } else {
          const lastIndex = paths.value.length - 1;
          const pathData = paths.value[lastIndex];
          if (pathData) {
            pathData.path.lineTo(imageCoords.x, imageCoords.y);
            paths.value = [...paths.value];
          }
        }
      }
    })
    .onEnd(() => {
      'worklet';
      if (isPinching.value) return;
      runOnJS(setPathsState)(paths.value);
    });

  const pinch = Gesture.Pinch()
    .onStart((event) => {
      'worklet';
      isPinching.value = true;
      const dims = displayDimensions.value;
      if (dims.displayWidth === 0) return;

      focalX.value = event.focalX - dims.offsetX;
      focalY.value = event.focalY - dims.offsetY;
      prevScale.value = scale.value;
    })
    .onUpdate((event) => {
      'worklet';
      const dims = displayDimensions.value;
      if (dims.displayWidth === 0) return;

      const newScale = Math.min(
        Math.max(prevScale.value * event.scale, MIN_ZOOM),
        MAX_ZOOM,
      );

      const focalPointX = focalX.value / scale.value - translateX.value / scale.value;
      const focalPointY = focalY.value / scale.value - translateY.value / scale.value;

      scale.value = newScale;
      translateX.value = focalX.value - focalPointX * newScale;
      translateY.value = focalY.value - focalPointY * newScale;

      const scaledWidth = dims.displayWidth * newScale;
      const scaledHeight = dims.displayHeight * newScale;

      if (scaledWidth > dims.displayWidth) {
        const minTranslateX = dims.displayWidth - scaledWidth;
        translateX.value = Math.min(Math.max(translateX.value, minTranslateX), 0);
      } else {
        translateX.value = (dims.displayWidth - scaledWidth) / 2;
      }

      if (scaledHeight > dims.displayHeight) {
        const minTranslateY = dims.displayHeight - scaledHeight;
        translateY.value = Math.min(Math.max(translateY.value, minTranslateY), 0);
      } else {
        translateY.value = (dims.displayHeight - scaledHeight) / 2;
      }
    })
    .onEnd(() => {
      'worklet';
      isPinching.value = false;
      prevScale.value = scale.value;
    });

  const twoFingerPan = Gesture.Pan()
    .minPointers(2)
    .maxPointers(2)
    .onStart(() => {
      'worklet';
      if (scale.value <= 1) return;
    })
    .onUpdate((g) => {
      'worklet';
      if (scale.value <= 1 || isPinching.value) return;

      const dims = displayDimensions.value;
      if (dims.displayWidth === 0) return;

      translateX.value += g.velocityX;
      translateY.value += g.velocityY;

      const scaledWidth = dims.displayWidth * scale.value;
      const scaledHeight = dims.displayHeight * scale.value;

      if (scaledWidth > dims.displayWidth) {
        const minTranslateX = dims.displayWidth - scaledWidth;
        translateX.value = Math.min(Math.max(translateX.value, minTranslateX), 0);
      } else {
        translateX.value = (dims.displayWidth - scaledWidth) / 2;
      }

      if (scaledHeight > dims.displayHeight) {
        const minTranslateY = dims.displayHeight - scaledHeight;
        translateY.value = Math.min(Math.max(translateY.value, minTranslateY), 0);
      } else {
        translateY.value = (dims.displayHeight - scaledHeight) / 2;
      }
    });

  const gesture = Gesture.Simultaneous(pan, pinch, twoFingerPan);

  const selectColor = useCallback(
    (color: string) => {
      selectedColor.value = color;
      setSelectedColorState(color);
      setIsErasing(false);
    },
    [selectedColor],
  );

  const selectPenSize = useCallback((size: number) => {
    setSelectedPenSize(size);
    setIsErasing(false);
  }, []);

  const toggleEraser = useCallback(() => {
    setIsErasing((prev) => !prev);
  }, []);

  const getScreen = useCallback(
    async (action: 'save') => {
      if (!viewShotRef.current) {
        console.error('ViewShot ref is not available');
        setLoading(false);
        return;
      }
      setLoading(true);
      setIsCapturing(true);
      try {
        const originalScale = scale.value;
        const originalTranslateX = translateX.value;
        const originalTranslateY = translateY.value;

        scale.value = 1;
        translateX.value = 0;
        translateY.value = 0;

        setForceRender(Math.random());

        await new Promise((resolve) =>
          setTimeout(resolve, Platform.OS === 'android' ? 500 : 200),
        );

        const image = await viewShotRef.current.capture();
        const img = Platform.OS === 'ios' ? `file://${image}` : image;

        scale.value = originalScale;
        translateX.value = originalTranslateX;
        translateY.value = originalTranslateY;

        setForceRender(Math.random());

        if (action === 'save') {
          console.log('Image saved:', img);
          setIsModalVisible(false);
        }
      } catch (error) {
        console.error(`Action "${action}" failed:`, error);
      } finally {
        setLoading(false);
        setIsCapturing(false);
      }
    },
    [scale, translateX, translateY],
  );

  // Fixed: Use proper display dimensions for canvas
  const canvasWidth = canvasLayoutMeta.width || screenWidth;
  const canvasHeight = canvasLayoutMeta.height || screenHeight * 0.7;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.canvasContainer}>
        <GestureHandlerRootView style={styles.gestureContainer}>
          <GestureDetector gesture={gesture}>
            <ViewShot
              ref={viewShotRef}
              options={{
                format: 'jpg',
                quality: 0.9,
                result: 'tmpfile',
                width: displayDimensions.value.imageWidth,
                height: displayDimensions.value.imageHeight,
              }}
              style={styles.viewShotContainer}>
              <Canvas
                style={[
                  styles.canvas,
                  {
                    width: canvasWidth,
                    height: canvasHeight,
                  }
                ]}
                onLayout={handleCanvasLayout}>
                <Group
                  transform={[
                    { translateX: displayDimensions.value.offsetX },
                    { translateY: displayDimensions.value.offsetY },
                  ]}>
                  <Group
                    transform={[
                      { translateX: translateX.value },
                      { translateY: translateY.value },
                      { scale: scale.value },
                    ]}>
                    {canvasImage && (
                      <SkiaImage
                        image={canvasImage}
                        fit="contain"
                        width={displayDimensions.value.displayWidth || canvasWidth}
                        height={displayDimensions.value.displayHeight || canvasHeight}
                        x={0}
                        y={0}
                      />
                    )}
                    <Group
                      transform={[
                        { scaleX: displayDimensions.value.displayWidth / displayDimensions.value.imageWidth },
                        { scaleY: displayDimensions.value.displayHeight / displayDimensions.value.imageHeight },
                      ]}>
                      {pathsState.map((p, index) => (
                        <Path
                          key={`path-${index}`}
                          path={p.path}
                          strokeWidth={p.strokeWidth}
                          style="stroke"
                          strokeJoin="round"
                          strokeCap="round"
                          antiAlias
                          color={p.color}
                        />
                      ))}
                    </Group>
                  </Group>
                </Group>
              </Canvas>
            </ViewShot>
          </GestureDetector>
        </GestureHandlerRootView>
      </View>

      <View style={styles.penSizeContainer}>
        {PEN_SIZES.map((size) => (
          <TouchableOpacity
            key={`pen-size-${size}`}
            style={[
              styles.penSizeButton,
              {
                backgroundColor: selectedPenSize === size ? '#aa002f' : 'white',
              },
            ]}
            onPress={() => selectPenSize(size)}>
            <View
              style={[
                styles.penSizeIndicator,
                {
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  backgroundColor: selectedColorState,
                },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.controlsContainer}>
        <View style={styles.listContainer}>
          <FlatList
            data={COLORSDATA}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
            keyExtractor={(_, index) => index.toString()}
            extraData={selectedColorState}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.colorButtonWrapper,
                  {
                    borderColor: selectedColorState === item.color ? '#aa002f' : 'white',
                  },
                ]}
                onPress={() => selectColor(item.color)}>
                <item.svg width={20} height={60} />
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.eraserButton,
              { backgroundColor: isErasing ? '#aa002f' : 'white' },
            ]}
            onPress={toggleEraser}>
            <Text style={[styles.buttonText, { color: isErasing ? 'white' : '#aa002f' }]}>
              Eraser
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: '#aa002f',
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}
            onPress={() => setIsModalVisible(true)}>
            <Text style={[styles.buttonText, { color: 'white' }]}>Done</Text>
            <View style={styles.checkIcon}>
              <Text style={[styles.buttonText, { color: '#aa002f' }]}>✓</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={styles.closeButtonIcon}>
              <Text style={styles.closeIcon}>×</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Your Drawing</Text>
            <View style={styles.mainView}>
              <TouchableOpacity
                onPress={() => getScreen('save')}
                style={[styles.result, { backgroundColor: 'white' }]}>
                <Text style={[styles.brag, { color: '#aa002f' }]}>Save to Photos</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={load} transparent>
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#aa002f" />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  canvasContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  gestureContainer: {
    flex: 1,
  },
  viewShotContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  canvas: {
    backgroundColor: 'transparent',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  flatListContent: {
    alignItems: 'center',
    paddingVertical: 5,
  },
  colorButtonWrapper: {
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 5,
    padding: 1,
  },
  listContainer: {
    flex: 1,
    marginRight: 10,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  eraserButton: {
    padding: 15,
    borderColor: '#aa002f',
    borderWidth: 2,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    minWidth: 80,
  },
  actionButton: {
    padding: 15,
    borderColor: '#aa002f',
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    minWidth: 80,
  },
  buttonText: {
    fontSize: 12,
    color: '#aa002f',
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    height: 300,
    width: 300,
    alignItems: 'center',
  },
  closeButtonIcon: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  closeIcon: {
    fontSize: 24,
    color: 'black'
  },
  modalTitle: {
    fontSize: 20,
    color: '#aa002f',
    fontWeight: 'bold',
    margin: 15,
  },
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 30,
  },
  result: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 15,
    borderColor: '#aa002f',
    borderWidth: 1,
    width: '100%',
  },
  brag: {
    fontSize: 14,
    textAlign: 'center'
  },
  errorText: {
    fontSize: 14,
    color: '#aa002f',
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    width: 22,
    height: 22,
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  penSizeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  penSizeButton: {
    marginHorizontal: 10,
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#aa002f',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 40,
    minHeight: 40,
  },
  penSizeIndicator: {
    backgroundColor: 'black',
  },
});
export default DrawingCanvas;
