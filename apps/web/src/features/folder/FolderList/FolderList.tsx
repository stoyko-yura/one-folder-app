import { Carousel } from '@mantine/carousel';
import { Button, Flex, Skeleton, Text, Title } from '@mantine/core';
import type { FoldersResponse } from '@one-folder-app/types';
import { IconFoldersOff } from '@tabler/icons-react';
import type { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import { CustomLink } from '@/components/ui';
import { FolderCard } from '@/features';
import { getFolders } from '@/services';

export const FolderList = () => {
  const { data, isLoading, isError, error } = useQuery<
    FoldersResponse,
    AxiosError<FoldersResponse>
  >({
    queryFn: () => getFolders({ limit: 5, orderBy: { title: 'asc' }, pageIndex: 0 }),
    queryKey: ['folders'],
    retry: 2
  });

  if (isLoading) {
    return (
      <Flex direction='column' rowGap={20}>
        <Flex align='center' justify='space-between'>
          <Skeleton h={35} />
        </Flex>

        <Flex align='center' gap={20}>
          {new Array(3).fill(1).map((_, index) => {
            return <Skeleton key={index} h={280} radius='md' w={250} />;
          })}
        </Flex>
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex align='center' gap={20} h={240} justify='center'>
        <IconFoldersOff size={128} />

        <Flex align='center' direction='column' gap={20}>
          <Flex align='center' direction='column'>
            <Title order={2}>{error.response?.data.message}</Title>

            <Text c='dimmed' component='p'>
              Be the first to create a folder
            </Text>
          </Flex>

          <Button component={CustomLink} to='/create-folder'>
            Create your folder
          </Button>
        </Flex>
      </Flex>
    );
  }

  const folders = data?.folders.map((folder, index) => {
    return <FolderCard key={index} folder={folder} />;
  });

  return (
    <>
      <Flex gap={20} visibleFrom='md'>
        {folders}
      </Flex>

      <Carousel align='start' hiddenFrom='md' slideGap='md' slideSize='30%' withControls={false}>
        {folders?.map((folder) => {
          return <Carousel.Slide key={folder.key}>{folder}</Carousel.Slide>;
        })}
      </Carousel>
    </>
  );
};
