import { Card, Flex, Group, Image, Text } from '@mantine/core';
import type { FolderData } from '@one-folder-app/types';
import {
  IconCalendar,
  IconClock,
  IconNoteOff,
  IconPhoto,
  IconStarFilled,
  IconUser
} from '@tabler/icons-react';
import { useQuery } from 'react-query';

import { CustomLink } from '@/components/ui';
import { getUserById } from '@/services';

import styles from './FolderCard.module.css';

interface FolderCardProps {
  folder: FolderData;
}

export const FolderCard = ({ folder }: FolderCardProps) => {
  const { data } = useQuery(`folder's ${folder.id} user`, () => getUserById(folder.authorId));

  return (
    <Card
      withBorder
      className={styles['folder-card']}
      component={CustomLink}
      padding='md'
      radius='md'
      shadow='sm'
      to={`/folders/${folder.id}`}
      w={200}
    >
      <Flex direction='column' gap='sm'>
        <Flex align='center' justify='center'>
          {folder.image ? (
            <Image alt='Folder card image' h={80} src={folder.image} w={80} />
          ) : (
            <Flex align='center' c='dimmed' h={80} justify='center' w={80}>
              <IconPhoto size={80} />
            </Flex>
          )}
        </Flex>

        <Group align='center' justify='space-between'>
          <Text fw={500} maw='70%' size='md' truncate='end'>
            {folder.title}
          </Text>

          <Flex align='center' gap={4}>
            <IconStarFilled className={styles.star} size={16} />

            <Text component='span' size='sm'>
              {folder.averageRating}
            </Text>
          </Flex>
        </Group>

        <Flex direction='column' gap={4}>
          {folder.description ? (
            <Text c='dimmed' lineClamp={3} mih={60} size='sm'>
              {folder.description}
            </Text>
          ) : (
            <Flex align='center' c='dimmed' justify='center' mih={60}>
              <IconNoteOff />
            </Flex>
          )}

          <Group align='center' gap={4}>
            <IconUser size={16} />
            <Text size='sm'>{data?.user.login}</Text>
          </Group>
        </Flex>

        <Group align='center' justify='space-between'>
          <Group align='center' gap={4}>
            <IconCalendar size={16} />
            <Text size='sm'>
              {new Intl.DateTimeFormat('en-US', { dateStyle: 'short' }).format(
                new Date(folder.createdAt)
              )}
            </Text>
          </Group>

          <Group align='center' gap={4}>
            <IconClock size={16} />
            <Text size='sm'>
              {new Intl.DateTimeFormat('en-US', { timeStyle: 'short' }).format(
                new Date(folder.createdAt)
              )}
            </Text>
          </Group>
        </Group>
      </Flex>
    </Card>
  );
};
