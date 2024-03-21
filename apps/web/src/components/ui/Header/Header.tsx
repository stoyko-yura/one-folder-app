import { Container, Logo, Navbar } from '@/components/ui';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <Container>
      <header className={styles.header}>
        <Logo />

        <Navbar />

        <div />
      </header>
    </Container>
  );
};
