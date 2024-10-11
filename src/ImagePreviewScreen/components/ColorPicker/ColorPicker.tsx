import React, {useMemo} from 'react';
import {ScrollView} from 'react-native';
import {TouchableOpacity} from '../../../../../../../../components/atom/TouchableOpacity';
import {Box} from '../../../../../../../../components/atom/Box';
import {storyViewerColors} from '../../../../../../../../utils/storyViewerColors';

interface ColorPickerProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onSelectColor,
}) => {
  const renderedColors = useMemo(() => {
    return storyViewerColors.map((color, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => onSelectColor(color)}
        style={{
          backgroundColor: color,
        }}
        zIndex={100}
        borderColor="white"
        borderRadius="full"
        mx="md"
        width={35}
        height={35}
        borderWidth={selectedColor === color ? 4 : 0}
      />
    ));
  }, [storyViewerColors, selectedColor, onSelectColor]);

  return (
    <Box position="absolute" bottom={150} width="100%" paddingHorizontal="lg">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {renderedColors}
      </ScrollView>
    </Box>
  );
};
