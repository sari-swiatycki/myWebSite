

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
import UserAvatar from './Avatar';

const HeaderPersonalArea = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const location = useLocation();
  const navigate = useNavigate();

  const isNotMainPersonalPage = location.pathname !== '/personal-area';

  const handleLogout = () => {
    console.log('יציאה מהאזור האישי');
    window.location.href = '/';
  };

  const theme = createTheme({
    direction: 'ltr', // Changed to LTR for English-style layout
    palette: {
      primary: {
        main: '#000000',
      },
      secondary: {
        main: '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Heebo", "Roboto", "Arial", sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar 
        position="fixed" 
        sx={{ 
          width: '100%', 
          bgcolor: '#000000',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Left side - Logout button */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button 
              color="secondary" 
              variant="outlined"
              startIcon={<ExitToAppIcon />} 
              onClick={handleLogout}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                border: '1px solid rgba(255,255,255,0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: '#fff'
                }
              }}
            >
              Logout
            </Button>
          </Box>
          
          {/* Right side - Avatar, navigation and other controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {!isMobile && (
              <>
                <IconButton color="secondary" size="large">
                  <Badge badgeContent={3} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                
                <IconButton color="secondary" size="large">
                  <SettingsIcon />
                </IconButton>
                
                <Divider orientation="vertical" flexItem sx={{ mx: 1, bgcolor: 'rgba(255,255,255,0.3)' }} />
              </>
            )}

            {isNotMainPersonalPage && (
              <IconButton
                color="secondary"
                onClick={() => navigate('/personal-area')}
                sx={{
                  ml: 2,
                  border: '1px solid rgba(255,255,255,0.5)',
                  borderRadius: 2,
                  padding: '4px',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderColor: '#fff'
                  }
                }}
              >
                <ArrowBackIcon fontSize="small" />
              </IconButton>
            )}
            
            <UserAvatar/>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default HeaderPersonalArea;