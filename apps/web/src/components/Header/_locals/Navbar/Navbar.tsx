import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { LINKS } from '@/constants';

export const Navbar = () => {
  const navigate = useNavigate();

  const onNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: { md: 'flex', xs: 'none' }, flexGrow: 1 }}>
      {LINKS.map((link, index) => (
        <Button
          key={index}
          sx={{ color: 'text.primary', display: 'block', my: 2 }}
          onClick={() => onNavigate(link.path)}
        >
          {link.label}
        </Button>
      ))}
    </Box>
  );
};
