import { Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link
      color='text.primary'
      component={RouterLink}
      to='/'
      sx={{
        '&:hover': {
          span: {
            color: 'primary.light'
          }
        },
        alignItems: 'center',
        display: 'flex',
        fontSize: '24px',
        height: 'fit-content',
        justifyContent: 'center',
        span: {
          fontWeight: 'bold'
        },
        textDecoration: 'none',
        width: 'fit-content'
      }}
    >
      One<Box component='span'>Folder</Box>
    </Link>
  );
};
