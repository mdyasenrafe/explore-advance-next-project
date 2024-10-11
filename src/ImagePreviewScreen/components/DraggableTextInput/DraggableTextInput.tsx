import React, {useCallback} from 'react';
import {TextInput, Text} from 'react-native';
import {TouchableOpacity} from '../../../../../../../../components/atom/TouchableOpacity';
import {Box} from '../../../../../../../../components/atom/Box';

type DraggableTextInputProps = {
  text: string;
  position: {x: number; y: number};
  setText: (text: string) => void;
  isTextEditable: boolean;
  setIsTextEditable: (isEditable: boolean) => void;
  panHandlers: any;
  selectedColor: string;
};

export const DraggableTextInput: React.FC<DraggableTextInputProps> = ({
  text,
  position,
  setText,
  isTextEditable,
  setIsTextEditable,
  panHandlers,
  selectedColor,
}) => {
  const handleTextPress = useCallback(() => {
    setIsTextEditable(true);
  }, [setIsTextEditable]);

  return (
    (text || isTextEditable) && (
      <Box
        position="absolute"
        left={position.x}
        top={position.y}
        {...panHandlers}
        zIndex={1000}
        bg="grey"
        borderRadius="md"
        minWidth={100}
        minHeight={50}
        justifyContent="center"
        px="sm">
        {isTextEditable ? (
          <TextInput
            style={{
              height: 40,
              fontSize: 24,
              color: selectedColor,
              fontWeight: 'bold',
            }}
            autoFocus={true}
            onChangeText={setText}
            value={text}
            onSubmitEditing={() => setIsTextEditable(false)}
          />
        ) : (
          <TouchableOpacity onPress={handleTextPress}>
            <Text
              style={{
                fontSize: 24,
                color: selectedColor,
                fontWeight: 'bold',
              }}>
              {text}
            </Text>
          </TouchableOpacity>
        )}
      </Box>
    )
  );
};
