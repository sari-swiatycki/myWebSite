// import React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// const HeaderPersonalArea = () => {
//   const handleLogout = () => {
//     // לוגיקה ליציאה מהאזור האישי
//     console.log('יציאה מהאזור האישי');
//     window.location.href = '/';
//   };

//   return (
//     <AppBar position="fixed" sx={{ width: '100%' }}>
//       <Toolbar>
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>
//           אזור אישי
//         </Typography>
//         <Button 
//           color="inherit" 
//           startIcon={<ExitToAppIcon />} 
//           onClick={handleLogout}
//         >
//           יציאה
//         </Button>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default HeaderPersonalArea;




// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import Avatar from '@mui/material/Avatar';
// import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import SettingsIcon from '@mui/icons-material/Settings';
// import Divider from '@mui/material/Divider';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
// const HeaderPersonalArea = () => {
//   const isMobile = useMediaQuery('(max-width:600px)');
  
//   const handleLogout = () => {
//     // לוגיקה ליציאה מהאזור האישי
//     console.log('יציאה מהאזור האישי');
//     window.location.href = '/';
//   };

//   const theme = createTheme({
//     direction: 'rtl',
//     palette: {
//       primary: {
//         main: '#000000',
//       },
//       secondary: {
//         main: '#ffffff',
//       },
//     },
//     typography: {
//       fontFamily: '"Heebo", "Roboto", "Arial", sans-serif',
//     },
//   });
  
//   return (
//     <ThemeProvider theme={theme}>
//       <AppBar 
//         position="fixed" 
//         sx={{ 
//           width: '100%', 
//           bgcolor: '#000000',
//           boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
//           // Removed the borderBottom: '2px solid #333' line
//         }}
//       >
//         <Toolbar sx={{ justifyContent: 'space-between' }}>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Avatar 
//               sx={{ 
//                 width: 40, 
//                 height: 40, 
//                 bgcolor: '#ffffff', 
//                 color: '#000000',
//                 marginLeft: 2,
//                 border: '2px solid #333'
//               }}
//             >
//               PA
//             </Avatar>
//             <Typography 
//               variant="h6" 
//               sx={{ 
//                 fontWeight: 'bold',
//                 letterSpacing: 1
//               }}
//             >
//               אזור אישי
//             </Typography>
//           </Box>
          
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             {!isMobile && (
//               <>
//                 <IconButton color="secondary" size="large">
//                   <Badge badgeContent={3} color="error">
//                     <NotificationsIcon />
//                   </Badge>
//                 </IconButton>
                
//                 <IconButton color="secondary" size="large">
//                   <SettingsIcon />
//                 </IconButton>
                
//                 <Divider orientation="vertical" flexItem sx={{ mx: 1, bgcolor: 'rgba(255,255,255,0.3)' }} />
//               </>
//             )}
            
//             <Button 
//               color="secondary" 
//               variant="outlined"
//               startIcon={<ExitToAppIcon />} 
//               onClick={handleLogout}
//               sx={{
//                 borderRadius: 2,
//                 textTransform: 'none',
//                 border: '1px solid rgba(255,255,255,0.5)',
//                 '&:hover': {
//                   backgroundColor: 'rgba(255,255,255,0.1)',
//                   borderColor: '#fff'
//                 }
//               }}
//             >
//               יציאה
//             </Button>
//           </Box>
//         </Toolbar>
//       </AppBar>
//     </ThemeProvider>
    
//   );
// };

// export default HeaderPersonalArea;























// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import Avatar from '@mui/material/Avatar';
// import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import SettingsIcon from '@mui/icons-material/Settings';
// import Divider from '@mui/material/Divider';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { useLocation, useNavigate } from 'react-router-dom';

// const HeaderPersonalArea = () => {
//   const isMobile = useMediaQuery('(max-width:600px)');
//   const location = useLocation();
//   const navigate = useNavigate();

//   const isNotMainPersonalPage = location.pathname !== '/personal-area';

//   const handleLogout = () => {
//     console.log('יציאה מהאזור האישי');
//     window.location.href = '/';
//   };

//   const theme = createTheme({
//     direction: 'rtl',
//     palette: {
//       primary: {
//         main: '#000000',
//       },
//       secondary: {
//         main: '#ffffff',
//       },
//     },
//     typography: {
//       fontFamily: '"Heebo", "Roboto", "Arial", sans-serif',
//     },
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <AppBar 
//         position="fixed" 
//         sx={{ 
//           width: '100%', 
//           bgcolor: '#000000',
//           boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
//         }}
//       >
//         <Toolbar sx={{ justifyContent: 'space-between' }}>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Avatar 
//               sx={{ 
//                 width: 40, 
//                 height: 40, 
//                 bgcolor: '#ffffff', 
//                 color: '#000000',
//                 marginLeft: 2,
//                 border: '2px solid #333'
//               }}
//             >
//               PA
//             </Avatar>
//             <Typography 
//               variant="h6" 
//               sx={{ 
//                 fontWeight: 'bold',
//                 letterSpacing: 1
//               }}
//             >
//               אזור אישי
//             </Typography>

//             {isNotMainPersonalPage && (
//               <Button 
//                 color="secondary" 
//                 variant="text"
//                 onClick={() => navigate('/personal-area')}
//                 startIcon={<ArrowBackIcon />}
//                 sx={{
//                   textTransform: 'none',
//                   marginRight: 2,
//                   border: '1px solid rgba(255,255,255,0.5)',
//                   borderRadius: 2,
//                   color: '#fff',
//                   '&:hover': {
//                     backgroundColor: 'rgba(255,255,255,0.1)',
//                     borderColor: '#fff'
//                   }
//                 }}
//               >
//                 חזרה לאזור האישי
//               </Button>
//             )}
//           </Box>
          
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             {!isMobile && (
//               <>
//                 <IconButton color="secondary" size="large">
//                   <Badge badgeContent={3} color="error">
//                     <NotificationsIcon />
//                   </Badge>
//                 </IconButton>
                
//                 <IconButton color="secondary" size="large">
//                   <SettingsIcon />
//                 </IconButton>
                
//                 <Divider orientation="vertical" flexItem sx={{ mx: 1, bgcolor: 'rgba(255,255,255,0.3)' }} />
//               </>
//             )}
            
//             <Button 
//               color="secondary" 
//               variant="outlined"
//               startIcon={<ExitToAppIcon />} 
//               onClick={handleLogout}
//               sx={{
//                 borderRadius: 2,
//                 textTransform: 'none',
//                 border: '1px solid rgba(255,255,255,0.5)',
//                 '&:hover': {
//                   backgroundColor: 'rgba(255,255,255,0.1)',
//                   borderColor: '#fff'
//                 }
//               }}
//             >
//               יציאה
//             </Button>
//           </Box>
//         </Toolbar>
//       </AppBar>
//     </ThemeProvider>
//   );
// };

// export default HeaderPersonalArea;



























// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import Avatar from '@mui/material/Avatar';
// import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import SettingsIcon from '@mui/icons-material/Settings';
// import Divider from '@mui/material/Divider';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { useLocation, useNavigate } from 'react-router-dom';
// import UserAvatar from './Avatar';

// const HeaderPersonalArea = () => {
//   const isMobile = useMediaQuery('(max-width:600px)');
//   const location = useLocation();
//   const navigate = useNavigate();

//   const isNotMainPersonalPage = location.pathname !== '/personal-area';

//   const handleLogout = () => {
//     console.log('יציאה מהאזור האישי');
//     window.location.href = '/';
//   };

//   const theme = createTheme({
//     direction: 'rtl',
//     palette: {
//       primary: {
//         main: '#000000',
//       },
//       secondary: {
//         main: '#ffffff',
//       },
//     },
//     typography: {
//       fontFamily: '"Heebo", "Roboto", "Arial", sans-serif',
//     },
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <AppBar 
//         position="fixed" 
//         sx={{ 
//           width: '100%', 
//           bgcolor: '#000000',
//           boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
//         }}
//       >
//         <Toolbar sx={{ justifyContent: 'space-between' }}>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//            < UserAvatar/>
//             {/* <Avatar 
//               sx={{ 
//                 width: 40, 
//                 height: 40, 
//                 bgcolor: '#ffffff', 
//                 color: '#000000',
//                 marginLeft: 2,
//                 border: '2px solid #333'
//               }}
//             >
//               PA
//             </Avatar> */}
//             {/* <Typography 
//               variant="h6" 
//               sx={{ 
//                 fontWeight: 'bold',
//                 letterSpacing: 1
//               }}
//             >
//               אזור אישי
//             </Typography> */}

//             {isNotMainPersonalPage && (
//               <IconButton
//                 color="secondary"
//                 onClick={() => navigate('/personal-area')}
//                 sx={{
//                   ml: 2,
//                   border: '1px solid rgba(255,255,255,0.5)',
//                   borderRadius: 2,
//                   padding: '4px',
//                   '&:hover': {
//                     backgroundColor: 'rgba(255,255,255,0.1)',
//                     borderColor: '#fff'
//                   }
//                 }}
//               >
//                 <ArrowBackIcon fontSize="small" />
//               </IconButton>
//             )}
//           </Box>
          
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             {!isMobile && (
//               <>
//                 <IconButton color="secondary" size="large">
//                   <Badge badgeContent={3} color="error">
//                     <NotificationsIcon />
//                   </Badge>
//                 </IconButton>
                
//                 <IconButton color="secondary" size="large">
//                   <SettingsIcon />
//                 </IconButton>
                
//                 <Divider orientation="vertical" flexItem sx={{ mx: 1, bgcolor: 'rgba(255,255,255,0.3)' }} />
//               </>
//             )}
            
//             <Button 
//               color="secondary" 
//               variant="outlined"
//               startIcon={<ExitToAppIcon />} 
//               onClick={handleLogout}
//               sx={{
//                 borderRadius: 2,
//                 textTransform: 'none',
//                 border: '1px solid rgba(255,255,255,0.5)',
//                 '&:hover': {
//                   backgroundColor: 'rgba(255,255,255,0.1)',
//                   borderColor: '#fff'
//                 }
//               }}
//             >
//               יציאה
//             </Button>
//           </Box>
//         </Toolbar>
//       </AppBar>
//     </ThemeProvider>
//   );
// };

// export default HeaderPersonalArea;




















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