import cn from 'classnames';
import type { LinkProps as RouterLinkProps } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

import styles from './Link.module.scss';

interface LinkProps extends RouterLinkProps {
  classNames: string[];
}

export const Link = ({ classNames, children, ...props }: LinkProps) => {
  return (
    <RouterLink className={cn(styles.link, ...classNames)} {...props}>
      {children}
    </RouterLink>
  );
};
