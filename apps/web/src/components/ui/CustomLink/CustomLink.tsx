import type { LinkProps } from 'react-router-dom';
import { Link } from 'react-router-dom';

import styles from './CustomLink.module.css';

interface CustomLinkProps extends LinkProps {}

export const CustomLink = ({ children, ...props }: CustomLinkProps) => {
  return (
    <Link className={styles['custom-link']} {...props}>
      {children}
    </Link>
  );
};
