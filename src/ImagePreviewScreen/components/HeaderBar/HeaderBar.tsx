import React, {useCallback} from 'react';
import CloseIcon from '../../../../../../../../assets/icons/closeIcon.svg';
import {Box} from '../../../../../../../../components/atom/Box';
import {TouchableOpacity} from '../../../../../../../../components/atom/TouchableOpacity';
import {RemoteImage} from '../../../../../../../../components/atom/RemoteImage';
import {Text} from '../../../../../../../../components/atom/Text';

type HeaderBarProps = {
  onClose: () => void;
  toggleColorPicker: () => void;
  toggleTextInput: () => void;
  isTextInputVisible: boolean;
};

export const HeaderBar: React.FC<HeaderBarProps> = ({
  onClose,
  toggleColorPicker,
  toggleTextInput,
  isTextInputVisible,
}) => {
  const handleTextInputPress = useCallback(() => {
    toggleTextInput();
  }, [toggleTextInput]);

  const handleColorPickerPress = useCallback(() => {
    toggleColorPicker();
  }, [toggleColorPicker]);

  return (
    <Box
      position="absolute"
      top={50}
      zIndex={100}
      width={'100%'}
      justifyContent="space-between"
      flexDirection="row"
      paddingHorizontal="lg">
      <Box>
        <TouchableOpacity
          onPress={onClose}
          bg="grey"
          width={40}
          height={40}
          borderRadius="full"
          justifyContent="center"
          alignItems="center">
          <CloseIcon width={16} height={16} />
        </TouchableOpacity>
      </Box>
      <Box flexDirection="row">
        <TouchableOpacity
          onPress={handleColorPickerPress}
          bg="grey"
          width={40}
          height={40}
          borderRadius="full"
          justifyContent="center"
          alignItems="center">
          <RemoteImage
            source={require('../../../../../../../../assets/images/colorWheelIcon.png')}
            style={{width: 35, height: 35}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleTextInputPress}
          bg="grey"
          width={40}
          height={40}
          borderRadius="full"
          justifyContent="center"
          alignItems="center"
          marginLeft="md">
          <Text variant="buttonLabel">Aa</Text>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};
