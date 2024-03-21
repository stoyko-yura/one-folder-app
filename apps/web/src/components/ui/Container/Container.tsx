import type { PropsWithChildren } from 'react';

import styles from './Container.module.scss';

interface ContainerProps extends PropsWithChildren {}

export const Container = ({ children }: ContainerProps) => {
  return <div className={styles.container}>{children}</div>;
};
