import { Box } from '@mantine/core';

import { CustomNavLink } from '@/components/ui';

import styles from './Navbar.module.css';

const items = [
  {
    label: 'Home',
    url: '/'
  },
  {
    label: 'Folders',
    url: '/folders'
  },
  {
    label: 'Software',
    url: '/software'
  },
  {
    label: 'Users',
    url: '/users'
  }
];

export const Navbar = () => {
  const links = items.map((link, index) => {
    return (
      <CustomNavLink key={index} to={link.url}>
        {link.label}
      </CustomNavLink>
    );
  });

  return (
    <Box className={styles.navbar} h='100%'>
      {links}
    </Box>
  );
};
