import { NavLink, type NavLinkProps } from 'react-router-dom';

import { clsx } from '@/utills';

import styles from './CustomNavLink.module.css';

interface CustomNavLinkProps extends NavLinkProps {
  isActiveLink?: boolean;
}

export const CustomNavLink = ({ isActiveLink = false, children, ...props }: CustomNavLinkProps) => {
  return (
    <NavLink
      className={({ isActive }) =>
        clsx(styles['custom-nav-link'], { [styles['is-active']]: isActiveLink || isActive })
      }
      {...props}
    >
      {children}
    </NavLink>
  );
};
