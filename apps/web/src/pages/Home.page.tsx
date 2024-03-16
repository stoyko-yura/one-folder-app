import { Box } from '@mantine/core';

import { FolderSection } from '@/features';

export const HomePage = () => {
  return (
    <Box>
      <FolderSection withShowMoreLink title='Newest folders' />
    </Box>
  );
};
