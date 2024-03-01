import { Anchor, Flex, Title } from '@mantine/core';

import { CustomLink } from '@/components/ui';
import { FolderList } from '@/features';

interface FolderProps {
  title?: string;
  withShowMoreLink?: boolean;
}

export const FolderSection = ({ title, withShowMoreLink }: FolderProps) => {
  return (
    <Flex direction='column' gap={20}>
      <Flex align='center' justify='space-between'>
        <Title fw={500} order={2}>
          {title}
        </Title>

        {withShowMoreLink && (
          <Anchor component={CustomLink} to='/folders'>
            Show all
          </Anchor>
        )}
      </Flex>

      <FolderList />
    </Flex>
  );
};
