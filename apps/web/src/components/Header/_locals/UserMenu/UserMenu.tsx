import Folder from '@mui/icons-material/Folder';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import type { UserData } from '@one-folder-app/types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserMenuProps {
  user: UserData;
}

export const UserMenu = ({ user }: UserMenuProps) => {
  const [userMenuEl, setUserMenuEl] = useState<null | HTMLElement>(null);
  const [settingsMenuEl, setSettingsMenuEl] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  const onNavigate = (path: string) => {
    navigate(path);
  };

  const onOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUserMenuEl(event.currentTarget);
  };

  const onCloseUserMenu = () => {
    setUserMenuEl(null);
  };

  const onOpenSettingsMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSettingsMenuEl(event.currentTarget);
  };

  const onCloseSettingsMenu = () => {
    setSettingsMenuEl(null);
  };

  return (
    <>
      <Box>
        <IconButton
          aria-controls={userMenuEl ? 'user-menu' : undefined}
          aria-expanded={userMenuEl ? 'true' : undefined}
          aria-haspopup='true'
          color='inherit'
          onClick={onOpenUserMenu}
        >
          <PersonIcon />
        </IconButton>

        <IconButton
          aria-controls={settingsMenuEl ? 'settings-menu' : undefined}
          aria-expanded={settingsMenuEl ? 'true' : undefined}
          aria-haspopup='true'
          color='inherit'
          onClick={onOpenSettingsMenu}
        >
          <SettingsOutlinedIcon />
        </IconButton>
      </Box>

      <Menu
        anchorEl={userMenuEl}
        id='user-menu'
        open={!!userMenuEl}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        onClose={onCloseUserMenu}
      >
        <MenuItem onClick={() => onNavigate('/profile')}>
          <Box alignItems='center' columnGap={2} display='flex'>
            <PersonIcon /> Profile
          </Box>
        </MenuItem>
        <MenuItem onClick={() => onNavigate(`/user/${user.id}/folders`)}>
          <Box alignItems='center' columnGap={2} display='flex'>
            <Folder /> Folders
          </Box>
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={settingsMenuEl}
        id='settings-menu'
        open={!!settingsMenuEl}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        onClose={onCloseSettingsMenu}
      >
        <MenuItem onClick={() => onNavigate('/settings')}>
          <Box alignItems='center' columnGap={2} display='flex'>
            <SettingsOutlinedIcon /> Settings
          </Box>
        </MenuItem>
        <MenuItem onClick={() => console.log('@log-out')}>
          <Box alignItems='center' columnGap={2} display='flex'>
            <LogoutIcon /> Log out
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
};
