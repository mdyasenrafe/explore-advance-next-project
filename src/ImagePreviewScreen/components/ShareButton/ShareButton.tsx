import React from 'react';
import {Box} from '../../../../../../../../components/atom/Box';
import {Button} from '../../../../../../../../components/atom/Button';

interface ShareButtonProps {
  onPress: () => void;
  isLoading: boolean;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  onPress,
  isLoading,
}) => {
  return (
    <Box position="absolute" bottom={80} alignItems="center" width={'100%'}>
      <Button
        label="Share Story"
        backgroundColor="red"
        width={'80%'}
        height={48}
        variant="p3_medium_white"
        borderRadius="md"
        onPress={onPress}
        isDisabled={isLoading}
        isLoading={isLoading}
      />
    </Box>
  );
};
