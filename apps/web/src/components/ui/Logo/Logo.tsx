import { Link } from '@/components/ui';

import styles from './Logo.module.scss';

export const Logo = () => {
  return (
    <Link classNames={[styles.logo]} to='/'>
      One<span>Folder</span>
    </Link>
  );
};
