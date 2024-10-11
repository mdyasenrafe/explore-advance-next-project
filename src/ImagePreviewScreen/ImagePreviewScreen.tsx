import React, {useState, useRef, useCallback} from 'react';
import {Box} from '../../../../../../components/atom/Box';
import {
  TouchableWithoutFeedback,
  Keyboard,
  PanResponder,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {RemoteImage} from '../../../../../../components/atom/RemoteImage';
import {useSharePhotoAsStory} from '../../../../../../hooks/mutations/useSharePhotoStory';
import {useGlobalSnackbars} from '../../../../../../context/SnackbarContext';
import {getMessageFromError} from '../../../../../../utils/error';
import {useNavigation} from '@react-navigation/native';
import {MainStackScreenProps} from '../../../../../../navigation/types/types';
import {SharePhotoStoryInput} from '../../../../../../gql/graphql';
import {getScreenDimensions} from '../../../../../../utils/screenDimensions';
import {HeaderBar} from './components/HeaderBar';
import {DraggableTextInput} from './components/DraggableTextInput';
import {ColorPicker} from './components/ColorPicker';
import {ShareButton} from './components/ShareButton';

const {screenWidth, screenHeight} = getScreenDimensions();

interface ImagePreviewScreenProps {
  uploadedImageUri: string;
  onClose: () => void;
}

export const ImagePreviewScreen: React.FC<ImagePreviewScreenProps> = ({
  uploadedImageUri,
  onClose,
}) => {
  const [sharePhoto, {loading}] = useSharePhotoAsStory();
  const {addSuccessSnackbar, addErrorSnackbar} = useGlobalSnackbars();
  const navigation =
    useNavigation<MainStackScreenProps<'StoryStack'>['navigation']>();

  const [isTextInputVisible, setIsTextInputVisible] = useState(false);
  const [text, setText] = useState('');
  const [position, setPosition] = useState({x: screenWidth / 2 - 50, y: 150});
  const [isTextEditable, setIsTextEditable] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        setPosition({
          x: gestureState.moveX - 50,
          y: gestureState.moveY - 20,
        });
      },
      onPanResponderRelease: () => {},
    }),
  ).current;

  const shareAsStory = useCallback(async () => {
    try {
      const bodyData: SharePhotoStoryInput = {
        photoUrl: uploadedImageUri,
        caption: text,
        textHexCode: selectedColor,
        textPosX: position?.x?.toString(),
        textPosY: position?.y?.toString(),
      };
      await sharePhoto({variables: {input: bodyData}});
      addSuccessSnackbar({message: 'Post Added to story'});
      navigation.goBack();
    } catch (err: any) {
      addErrorSnackbar({message: getMessageFromError(err)});
    }
  }, [
    uploadedImageUri,
    text,
    selectedColor,
    position,
    sharePhoto,
    addSuccessSnackbar,
    addErrorSnackbar,
    navigation,
  ]);

  return (
    <Box style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <Box justifyContent="center" alignItems="center" flex={1}>
            <HeaderBar
              onClose={onClose}
              toggleColorPicker={() => setShowColorPicker(!showColorPicker)}
              toggleTextInput={() => {
                setIsTextInputVisible(!isTextInputVisible);
                setIsTextEditable(true);
              }}
              isTextInputVisible={isTextInputVisible}
            />

            <RemoteImage
              url={uploadedImageUri}
              style={{width: screenWidth, height: screenHeight}}
              shouldShowLoader={true}
            />

            <DraggableTextInput
              text={text}
              position={position}
              setText={setText}
              isTextEditable={isTextEditable}
              setIsTextEditable={setIsTextEditable}
              panHandlers={panResponder.panHandlers}
              selectedColor={selectedColor}
            />

            {showColorPicker && (
              <ColorPicker
                selectedColor={selectedColor}
                onSelectColor={setSelectedColor}
              />
            )}
          </Box>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <ShareButton onPress={shareAsStory} isLoading={loading} />
    </Box>
  );
};
