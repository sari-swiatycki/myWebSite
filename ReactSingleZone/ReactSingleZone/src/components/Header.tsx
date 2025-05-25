
// import React, { useState, useEffect } from 'react';
// import { 
//   AppBar, 
//   Toolbar, 
//   Typography, 
//   Button, 
//   Box, 
//   Container,
//   useMediaQuery,
//   useTheme,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
  
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import LoginIcon from '@mui/icons-material/Login';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import LogoutIcon from '@mui/icons-material/Logout';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChatIcon from '@mui/icons-material/Chat';

// // import LoginModal from './Login';
// import RegisterModal from './Register';
// import { Outlet } from 'react-router-dom';
// import UserAvatar from './Avatar';
// import ChatBox from './ChatBox';

// const Header: React.FC = () => {
//   // const [openLogin, setOpenLogin] = useState(false);
//   const [openRegister, setOpenRegister] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [chatOpen, setChatOpen] = useState(false);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const navigate = useNavigate();

//   // Check if user is authenticated based on sessionStorage
//   useEffect(() => {
//     const user = sessionStorage.getItem('user');
//     setIsAuthenticated(!!user);
//   }, []);

//   // Modal handlers
//   // const handleOpenLogin = () => setOpenLogin(true);
//   // const handleCloseLogin = () => setOpenLogin(false);
//   // const handleOpenRegister = () => setOpenRegister(true);
//   // const handleCloseRegister = () => setOpenRegister(false);
//   const handleMobileMenuToggle = () => setMobileMenuOpen(!mobileMenuOpen);
  
//   // Chat toggle function
//   const toggleChat = () => {
//     setChatOpen(!chatOpen);
//   };

//   // Navigation function
//   const goToPersonalArea = () => {
//     navigate('/personal-area');
//   };

//   // Logout function
//   const handleLogout = () => {
//     sessionStorage.removeItem('user');
//     setIsAuthenticated(false);
//     navigate('/');
//   };

//   const renderDesktopMenu = () => (
//     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//       <Button 
//         startIcon={<ChatIcon />} 
//         onClick={toggleChat}
//         sx={{ 
//           mr: 2, 
//           color: chatOpen ? '#00BFFF' : '#fff', 
//           border: chatOpen ? '1px solid #00BFFF' : 'none',
//           '&:hover': { 
//             backgroundColor: 'rgba(0, 191, 255, 0.1)' 
//           } 
//         }}
//       >
//         Chat with Alex
//       </Button>
      
//       {isAuthenticated ? (
//         <>
//           <UserAvatar />
//           <Button 
//             startIcon={<AccountCircleIcon />} 
//             sx={{ backgroundColor: '#fff', color: '#000', '&:hover': { backgroundColor: '#ddd' } }}
//             onClick={goToPersonalArea}
//           >
//             Personal Area
//           </Button>
//           <Button 
//             startIcon={<LogoutIcon />} 
//             sx={{ ml: 2, color: '#fff', border: '1px solid #fff', '&:hover': { backgroundColor: '#fff', color: '#000' } }}
//             onClick={handleLogout}
//           >
//             Logout
//           </Button>
//         </>
//       ) : (
//         <>
//           <Button 
//             startIcon={<LoginIcon />} 
//             onClick={() => navigate('/login')}
//             // onClick={handleOpenLogin}
//             sx={{ mr: 2, color: '#fff', border: '1px solid #fff', '&:hover': { backgroundColor: '#fff', color: '#000' } }}
//           >
//             Login
//           </Button>
//           <Button 
//             startIcon={<PersonAddIcon />} 
//             //  onClick={handleOpenRegister}
//             onClick={() => navigate('/register')}
           
//             sx={{ backgroundColor: '#fff', color: '#000', '&:hover': { backgroundColor: '#ddd' } }}
//           >
//             Register
//           </Button>
//         </>
//       )}
//     </Box>
//   );

//   const renderMobileMenu = () => (
//     <Drawer
//       anchor="right"
//       open={mobileMenuOpen}
//       onClose={handleMobileMenuToggle}
//     >
//       <List sx={{ width: 250, backgroundColor: '#000', height: '100%', color: '#fff' }}>
//         <ListItem>
//           <Button 
//             fullWidth 
//             startIcon={<ChatIcon />} 
//             onClick={() => {
//               toggleChat();
//               handleMobileMenuToggle();
//             }} 
//             sx={{ 
              
//               border: chatOpen ? '1px solid #00BFFF' : 'none',
//               color: chatOpen ? '#00BFFF' : '#fff',
//             }}
//           >
//             Chat with Alex
//           </Button>
//         </ListItem>
        
//         {isAuthenticated ? (
//           <>
//             <ListItem>
//               <UserAvatar />
//             </ListItem>
//             <ListItem>
//               <Button 
//                 fullWidth 
//                 startIcon={<AccountCircleIcon />} 
//                 sx={{ backgroundColor: '#fff', color: '#000' }} 
//                 onClick={goToPersonalArea}
//               >
//                 Personal Area
//               </Button>
//             </ListItem>
//             <ListItem>
//               <Button 
//                 fullWidth 
//                 startIcon={<LogoutIcon />} 
//                 sx={{ color: '#fff', border: '1px solid #fff' }} 
//                 onClick={handleLogout}
//               >
//                 Logout
//               </Button>
//             </ListItem>
//           </>
//         ) : (
//           <>
//             <ListItem>
//               <Button fullWidth startIcon={<LoginIcon />} 
//               // onClick={handleOpenLogin} 
//               sx={{ color: '#fff' }}>Login
//               </Button>
//             </ListItem>
//             <ListItem>
//               {/* <Button fullWidth startIcon={<PersonAddIcon />} onClick={handleOpenRegister} sx={{ backgroundColor: '#fff', color: '#000' }}>Register</Button> */}
//             </ListItem>
//           </>
//         )}
//       </List>
//     </Drawer>
//   );

//   return (
//     <>
//       <AppBar position="static" sx={{ backgroundColor: '#000', padding: '10px 0' }}>
//         <Container maxWidth="lg">
//           <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <img src="/logo.png" alt="logo" style={{ width: 40, marginRight: 8 }} />
//               <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>
//                 SoundWave
//               </Typography>
//             </Box>
//             {isMobile ? (
//               <IconButton onClick={handleMobileMenuToggle} sx={{ color: '#fff' }}>
//                 <MenuIcon />
//               </IconButton>
//             ) : (
//               renderDesktopMenu()
//             )}
//           </Toolbar>
//         </Container>
//       </AppBar>

//       {renderMobileMenu()}
//       <Outlet />
//       {chatOpen && <ChatBox onClose={() => setChatOpen(false)} />}
//       {/* <LoginModal open={openLogin} handleClose={handleCloseLogin} /> */}
//       {/* <RegisterModal open={openRegister} handleClose={handleCloseRegister} /> */}
//     </>
//   );
// }
// ;

// export default Header;
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useMediaQuery,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import LoginIcon from "@mui/icons-material/Login"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import LogoutIcon from "@mui/icons-material/Logout"
import MenuIcon from "@mui/icons-material/Menu"
import ChatIcon from "@mui/icons-material/Chat"
import { Outlet } from "react-router-dom"
import UserAvatar from "./Avatar"
import ChatBox from "./ChatBox"

const Header: React.FC = () => {
  // const [openRegister, setOpenRegister] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const navigate = useNavigate()

  // Check if user is authenticated based on sessionStorage
  useEffect(() => {
    const user = sessionStorage.getItem("user")
    setIsAuthenticated(!!user)
  }, [])

  const handleMobileMenuToggle = () => setMobileMenuOpen(!mobileMenuOpen)

  // Chat toggle function
  const toggleChat = () => {
    setChatOpen(!chatOpen)
  }

  // Navigation function
  const goToPersonalArea = () => {
    navigate("/personal-area")
  }

  // Logout function
  const handleLogout = () => {
    sessionStorage.removeItem("user")
    setIsAuthenticated(false)
    navigate("/")
  }

  const renderLeftButtons = () => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {/* Chat button - always visible */}
      <Button
        startIcon={<ChatIcon />}
        onClick={toggleChat}
        sx={{
          color: chatOpen ? "#00BFFF" : "#fff",
          border: chatOpen ? "1px solid #00BFFF" : "none",
          "&:hover": {
            backgroundColor: "rgba(0, 191, 255, 0.1)",
          },
        }}
      >
        Chat with Alex
      </Button>

      {/* Authentication-dependent buttons */}
      {isAuthenticated ? (
        <>
          <UserAvatar />
          <Button
            startIcon={<AccountCircleIcon />}
            sx={{ backgroundColor: "#fff", color: "#000", "&:hover": { backgroundColor: "#ddd" } }}
            onClick={goToPersonalArea}
          >
            Personal Area
          </Button>
          <Button
            startIcon={<LogoutIcon />}
            sx={{ color: "#fff", border: "1px solid #fff", "&:hover": { backgroundColor: "#fff", color: "#000" } }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button
            startIcon={<LoginIcon />}
            onClick={() => navigate("/login")}
            sx={{ color: "#fff", border: "1px solid #fff", "&:hover": { backgroundColor: "#fff", color: "#000" } }}
          >
            Login
          </Button>
          <Button
            startIcon={<PersonAddIcon />}
            onClick={() => navigate("register/")}
            sx={{ backgroundColor: "#fff", color: "#000", "&:hover": { backgroundColor: "#ddd" } }}
          >
            Register
          </Button>
        </>
      )}
    </Box>
  )

  const renderRightLogo = () => (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <img src="/logo.png" alt="logo" style={{ width: 40, marginRight: 8 }} />
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
        SoundWave
      </Typography>
    </Box>
  )

  const renderMobileMenu = () => (
    <Drawer anchor="right" open={mobileMenuOpen} onClose={handleMobileMenuToggle}>
      <List sx={{ width: 250, backgroundColor: "#000", height: "100%", color: "#fff" }}>
        <ListItem>
          <Button
            fullWidth
            startIcon={<ChatIcon />}
            onClick={() => {
              toggleChat()
              handleMobileMenuToggle()
            }}
            sx={{
              border: chatOpen ? "1px solid #00BFFF" : "none",
              color: chatOpen ? "#00BFFF" : "#fff",
            }}
          >
            Chat with Alex
          </Button>
        </ListItem>

        {isAuthenticated ? (
          <>
            <ListItem>
              <UserAvatar />
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                startIcon={<AccountCircleIcon />}
                sx={{ backgroundColor: "#fff", color: "#000" }}
                onClick={goToPersonalArea}
              >
                Personal Area
              </Button>
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                startIcon={<LogoutIcon />}
                sx={{ color: "#fff", border: "1px solid #fff" }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem>
              <Button
                fullWidth
                startIcon={<LoginIcon />}
                onClick={() => navigate("/login")}
                sx={{ color: "#fff", border: "1px solid #fff" }}
              >
                Login
              </Button>
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                startIcon={<PersonAddIcon />}
                onClick={() => navigate("/register")}
                sx={{ backgroundColor: "#fff", color: "#000" }}
              >
                Register
              </Button>
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  )

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#000", padding: "10px 0" }}>
        <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2 } }}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              minHeight: "64px",
              px: { xs: 1, sm: 2 },
            }}
          >
            {/* Left side - Login/Register buttons */}
            {!isMobile && renderLeftButtons()}

            {/* Mobile menu button (left side on mobile) */}
            {isMobile && (
              <IconButton onClick={handleMobileMenuToggle} sx={{ color: "#fff" }}>
                <MenuIcon />
              </IconButton>
            )}

            {/* Right side - Logo */}
            {renderRightLogo()}
          </Toolbar>
        </Container>
      </AppBar>

      {renderMobileMenu()}
      <Outlet />
      {chatOpen && <ChatBox onClose={() => setChatOpen(false)} />}
    </>
  )
}

export default Header
