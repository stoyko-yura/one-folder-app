import {
  ActionIcon,
  Box,
  Burger,
  Button,
  Container,
  Divider,
  Drawer,
  Flex,
  Group,
  ScrollArea,
  rem,
  useMantineColorScheme
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSun } from '@tabler/icons-react';

import { Logo, Navbar } from '@/components/ui';

import styles from './Header.module.css';

export const Header = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { toggleColorScheme } = useMantineColorScheme();

  return (
    <Box>
      <header className={styles.header}>
        <Container h='100%' size='xl'>
          <Group h='100%' justify='space-between'>
            <Logo />

            <Box h='100%' visibleFrom='xs'>
              <Navbar />
            </Box>

            <Flex align='center' gap={10} visibleFrom='xs'>
              <Flex>
                <ActionIcon size={36} variant='default' onClick={toggleColorScheme}>
                  <IconSun />
                </ActionIcon>
              </Flex>

              <Flex gap={6}>
                <Button variant='default'>Sign In</Button>
                <Button>Sign Up</Button>
              </Flex>
            </Flex>

            <Flex align='center' gap={10} hiddenFrom='xs'>
              <ActionIcon size={36} variant='default' onClick={toggleColorScheme}>
                <IconSun />
              </ActionIcon>

              <Burger opened={opened} size='sm' onClick={toggle} />
            </Flex>
          </Group>
        </Container>
      </header>

      <Drawer
        hiddenFrom='sm'
        opened={opened}
        padding='md'
        size='100%'
        title={<Logo />}
        zIndex={10000}
        onClose={close}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx='-md'>
          <Divider />

          <Navbar />

          <Divider />

          <Group grow justify='center' p='md'>
            <Button variant='default'>Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};
