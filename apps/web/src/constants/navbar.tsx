import FolderIcon from '@mui/icons-material/Folder';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';

import type { NavbarLink } from '@/types';

export const LINKS: NavbarLink[] = [
  {
    icon: HomeIcon,
    label: 'Home',
    path: '/'
  },
  {
    icon: FolderIcon,
    label: 'Folders',
    path: '/folders'
  },
  {
    icon: GroupIcon,
    label: 'Users',
    path: '/users'
  }
];
