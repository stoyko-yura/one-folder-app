import { NavLink } from '@/components/ui';
import { NAVBAR_LINKS } from '@/constants';

import styles from './Navbar.module.scss';

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        {NAVBAR_LINKS.map((link, index) => (
          <li key={index}>
            <NavLink to={link.path}>{link.title}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
