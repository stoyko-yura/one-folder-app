import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { NAVBAR_LINKS } from '@/constants';

export const MobileNavbar = () => {
  const [opened, setOpen] = useState<boolean>(false);

  const onOpenMobileNavbar = () => {
    setOpen(true);
  };

  const onCloseMobileNavbar = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: { md: 'none', xs: 'block' } }}>
      <IconButton onClick={onOpenMobileNavbar}>
        <MenuIcon />
      </IconButton>
      <Drawer open={opened} role='presentation' onClose={onCloseMobileNavbar}>
        <Box sx={{ width: '300px' }}>
          <List>
            {NAVBAR_LINKS.map((link, index) => {
              const LinkIcon = link.icon;

              return (
                <ListItem
                  key={index}
                  disablePadding
                  component={RouterLink}
                  to={link.path}
                  onClick={onCloseMobileNavbar}
                >
                  <ListItemButton>
                    {LinkIcon && (
                      <ListItemIcon>
                        <LinkIcon />
                      </ListItemIcon>
                    )}
                    <ListItemText primary={link.label} sx={{ color: 'text.primary' }} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};
