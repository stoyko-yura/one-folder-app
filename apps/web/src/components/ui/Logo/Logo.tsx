import { Text } from '@mantine/core';
import { Link } from 'react-router-dom';

import styles from './Logo.module.css';

export const Logo = () => {
  return (
    <Link className={styles.logo} to='/'>
      <Text size='xl'>OneFolder</Text>
    </Link>
  );
};
