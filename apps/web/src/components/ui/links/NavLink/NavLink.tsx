import cn from 'classnames';
import type { NavLinkProps as RouterNavLinkProps } from 'react-router-dom';
import { NavLink as RouterNavLink } from 'react-router-dom';

import styles from './NavLink.module.scss';

interface NavLinkProps extends RouterNavLinkProps {
  classNames?: string[];
}

export const NavLink = ({ classNames = [], children, ...props }: NavLinkProps) => {
  return (
    <RouterNavLink
      className={({ isActive }) =>
        cn(styles.nav_link, { [styles.is_active]: isActive }, ...classNames)
      }
      {...props}
    >
      {children}
    </RouterNavLink>
  );
};
