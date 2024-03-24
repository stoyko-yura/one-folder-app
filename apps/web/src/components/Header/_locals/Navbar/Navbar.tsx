import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { NAVBAR_LINKS } from '@/constants';

export const Navbar = () => {
  const navigate = useNavigate();

  const onNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: { md: 'flex', xs: 'none' }, flexGrow: 1 }}>
      {NAVBAR_LINKS.map((link, index) => (
        <Button
          key={index}
          color='inherit'
          sx={{ display: 'block', my: 2 }}
          variant='text'
          onClick={() => onNavigate(link.path)}
        >
          <Typography color='text.primary'>{link.label}</Typography>
        </Button>
      ))}
    </Box>
  );
};
