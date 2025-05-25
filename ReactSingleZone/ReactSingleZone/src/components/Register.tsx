// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, CircularProgress } from '@mui/material';
// import { AppDispatch, RootStore } from '../Stores/songStore';
// import { registerUser } from '../Slices/authSlice ';

// interface RegisterModalProps {
//   open: boolean;
//   handleClose: () => void;
// }

// const RegisterModal: React.FC<RegisterModalProps> = ({ open, handleClose }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const { isLoading, error } = useSelector((state: RootStore) => state.auth);

//   const [formData, setFormData] = useState({
//     UserName: '',
//     email: '',
//     password: '',
//     roleName: '', // הוספת השדה החדש
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const result = await dispatch(registerUser(formData));
//     console.log("result",result);
    
//     if (registerUser.fulfilled.match(result)) {
//       handleClose();
//       navigate('/personal-area');
//     }
//   };

//   return (
//     <Dialog open={open} onClose={handleClose}>
//       <DialogTitle>Register</DialogTitle>
//       <DialogContent>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         <TextField
//           label="Username"
//           name="UserName"
//           value={formData.UserName}
//           onChange={handleChange}
//           fullWidth
//           margin="dense"
//         />
//         <TextField
//           label="Email"
//           name="email"
//           type="email"
//           value={formData.email}
//           onChange={handleChange}
//           fullWidth
//           margin="dense"
//         />
//         <TextField
//           label="Password"
//           name="password"
//           type="password"
//           value={formData.password}
//           onChange={handleChange}
//           fullWidth
//           margin="dense"
//         />
//         <TextField
//           label="Role Name"
//           name="roleName"
//           value={formData.roleName}
//           onChange={handleChange}
//           fullWidth
//           margin="dense"
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose} color="secondary">
//           Cancel
//         </Button>
//         <Button onClick={handleSubmit} color="primary" variant="contained" disabled={isLoading}>
//           {isLoading ? <CircularProgress size={24} /> : 'Register'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default RegisterModal;



// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   CircularProgress,
//   Paper
// } from '@mui/material';
// import { AppDispatch, RootStore } from '../Stores/songStore';
// import { registerUser } from '../Slices/authSlice ';

// const RegisterForm: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const { isLoading, error } = useSelector((state: RootStore) => state.auth);

//   const [formData, setFormData] = useState({
//     UserName: '',
//     email: '',
//     password: '',
//     roleName: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const result = await dispatch(registerUser(formData));
//     if (registerUser.fulfilled.match(result)) {
//       navigate('/personal-area');
//     }
//   };

//   return (
//     <Box
//       minHeight="100vh"
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       sx={{ backgroundColor: '#121212', p: 2 }}
//     >
//       <Paper elevation={6} sx={{ p: 4, maxWidth: 400, width: '100%', borderRadius: 4, backgroundColor: '#1e1e1e', color: 'white' }}>
//         <Typography variant="h5" textAlign="center" gutterBottom>
//           Register
//         </Typography>
//         {error && (
//           <Typography color="error" textAlign="center" fontSize="0.9rem" mb={2}>
//             {error}
//           </Typography>
//         )}
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Username"
//             name="UserName"
//             value={formData.UserName}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             variant="filled"
//             InputProps={{ style: { color: 'white' } }}
//             InputLabelProps={{ style: { color: '#aaa' } }}
//           />
//           <TextField
//             label="Email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             variant="filled"
//             InputProps={{ style: { color: 'white' } }}
//             InputLabelProps={{ style: { color: '#aaa' } }}
//           />
//           <TextField
//             label="Password"
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             variant="filled"
//             InputProps={{ style: { color: 'white' } }}
//             InputLabelProps={{ style: { color: '#aaa' } }}
//           />
//           <TextField
//             label="Role Name"
//             name="roleName"
//             value={formData.roleName}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             variant="filled"
//             InputProps={{ style: { color: 'white' } }}
//             InputLabelProps={{ style: { color: '#aaa' } }}
//           />

//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}
//             disabled={isLoading}
//           >
//             {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
//           </Button>
//         </form>
//       </Paper>
//     </Box>
//   );
// };

// export default RegisterForm;

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import {
//   Grid,
//   Box,
//   Button,
//   TextField,
//   Typography,
//   CircularProgress,
//   Paper,
//   IconButton,
//   InputAdornment,
// } from "@mui/material"
// import { Visibility, VisibilityOff, Person, Email, Lock, Work } from "@mui/icons-material"
// import type { AppDispatch, RootStore } from "../Stores/songStore"
// import { registerUser } from "../Slices/authSlice "

// const RegisterForm: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>()
//   const navigate = useNavigate()
//   const { isLoading, error } = useSelector((state: RootStore) => state.auth)
//   const [showPassword, setShowPassword] = useState(false)
//   const [typedText, setTypedText] = useState("")
//   const [isDeleting, setIsDeleting] = useState(false)

//   const fullText = "Join the ultimate music experience. Create personalized playlists and discover new sounds."

//   const [formData, setFormData] = useState({
//     UserName: "",
//     email: "",
//     password: "",
//     roleName: "",
//   })

//   // Continuous typing animation effect
//   useEffect(() => {
//     let index = 0
//     let timer: NodeJS.Timeout

//     const typeText = () => {
//       if (!isDeleting && index < fullText.length) {
//         setTypedText(fullText.slice(0, index + 1))
//         index++
//         timer = setTimeout(typeText, 50)
//       } else if (!isDeleting && index === fullText.length) {
//         timer = setTimeout(() => setIsDeleting(true), 2000)
//       } else if (isDeleting && index > 0) {
//         setTypedText(fullText.slice(0, index - 1))
//         index--
//         timer = setTimeout(typeText, 30)
//       } else if (isDeleting && index === 0) {
//         setIsDeleting(false)
//         timer = setTimeout(typeText, 500)
//       }
//     }

//     typeText()

//     return () => clearTimeout(timer)
//   }, [isDeleting])

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     const result = await dispatch(registerUser(formData))
//     if (registerUser.fulfilled.match(result)) {
//       navigate("/personal-area")
//     }
//   }

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword)
//   }

//   return (
//     <Box
//       minHeight="100vh"
//       maxHeight="100vh"
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       sx={{
//         background: "#000000",
//         p: 0,
//         overflow: "hidden",
//       }}
//     >
//       <Paper
//         elevation={0}
//         sx={{
//           width: "100%",
//           height: "100vh",
//           borderRadius: 0,
//           overflow: "hidden",
//           display: "flex",
//           backgroundColor: "#000000",
//         }}
//       >
//         <Grid container sx={{ height: "100%" }}>
//           {/* Left Side - Welcome Section */}
//           <Grid
//             item
//             xs={12}
//             md={6}
//             sx={{
//               background: "linear-gradient(135deg, #000000 0%, #1a1a1a 70%, #003d4d 100%)",
//               color: "white",
//               p: 4,
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               textAlign: "center",
//               position: "relative",
//               overflow: "hidden",
//             }}
//           >
//             {/* Animated Background Particles */}
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 background: `
//                   radial-gradient(circle at 20% 20%, rgba(0, 188, 212, 0.05) 0%, transparent 50%),
//                   radial-gradient(circle at 80% 80%, rgba(0, 188, 212, 0.05) 0%, transparent 50%),
//                   radial-gradient(circle at 40% 60%, rgba(0, 188, 212, 0.03) 0%, transparent 50%)
//                 `,
//                 animation: "float 6s ease-in-out infinite",
//                 "@keyframes float": {
//                   "0%, 100%": { transform: "translateY(0px)" },
//                   "50%": { transform: "translateY(-20px)" },
//                 },
//               }}
//             />

//             {/* Logo */}
//             <Box
//               sx={{
//                 width: 80,
//                 height: 80,
//                 borderRadius: "50%",
//                 background: "linear-gradient(45deg, #1a1a1a, #333333)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 mb: 3,
//                 boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
//                 zIndex: 1,
//                 border: "2px solid #333",
//                 animation: "pulse 2s ease-in-out infinite",
//                 "@keyframes pulse": {
//                   "0%, 100%": { transform: "scale(1)" },
//                   "50%": { transform: "scale(1.05)" },
//                 },
//               }}
//             >
//               <Typography variant="h3" fontWeight="bold" color="#00bcd4">
//                 S
//               </Typography>
//             </Box>

//             <Typography
//               variant="h3"
//               fontWeight="bold"
//               gutterBottom
//               sx={{
//                 zIndex: 1,
//                 color: "#ffffff",
//                 mb: 3,
//                 textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
//               }}
//             >
//               SoundWave
//             </Typography>

//             {/* Continuous Typing Animation */}
//             <Typography
//               variant="h6"
//               sx={{
//                 maxWidth: 350,
//                 zIndex: 1,
//                 lineHeight: 1.6,
//                 color: "#cccccc",
//                 minHeight: "4em",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               {typedText}
//               <Box
//                 component="span"
//                 sx={{
//                   display: "inline-block",
//                   width: "2px",
//                   height: "1.2em",
//                   backgroundColor: "#00bcd4",
//                   ml: 1,
//                   animation: "blink 1s infinite",
//                   "@keyframes blink": {
//                     "0%, 50%": { opacity: 1 },
//                     "51%, 100%": { opacity: 0 },
//                   },
//                 }}
//               />
//             </Typography>

//             <Box sx={{ mt: 4, zIndex: 1 }}>
//               <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
//                 Already have an account?
//               </Typography>
//               <Button
//                 variant="outlined"
//                 sx={{
//                   borderColor: "#333",
//                   color: "#cccccc",
//                   px: 3,
//                   py: 1,
//                   "&:hover": {
//                     borderColor: "#00bcd4",
//                     color: "#00bcd4",
//                     backgroundColor: "rgba(0, 188, 212, 0.1)",
//                   },
//                 }}
//                 onClick={() => navigate("/login")}
//               >
//                 Sign In
//               </Button>
//             </Box>
//           </Grid>

//           {/* Right Side - Registration Form */}
//           <Grid
//             item
//             xs={12}
//             md={6}
//             sx={{
//               backgroundColor: "#000000",
//               p: 4,
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//             }}
//           >
//             <Box sx={{ maxWidth: 400, mx: "auto", width: "100%" }}>
//               <Typography
//                 variant="h4"
//                 textAlign="center"
//                 gutterBottom
//                 sx={{
//                   fontWeight: "bold",
//                   color: "#ffffff",
//                   mb: 1,
//                 }}
//               >
//                 Create Account
//               </Typography>

//               <Typography
//                 variant="body2"
//                 textAlign="center"
//                 sx={{
//                   color: "#888888",
//                   mb: 3,
//                 }}
//               >
//                 Get started with your musical journey
//               </Typography>

//               {error && (
//                 <Box
//                   sx={{
//                     p: 2,
//                     mb: 3,
//                     backgroundColor: "#1a0000",
//                     borderRadius: 2,
//                     border: "1px solid #ff3333",
//                   }}
//                 >
//                   <Typography color="error" fontSize="0.9rem" textAlign="center">
//                     {error}
//                   </Typography>
//                 </Box>
//               )}

//               <form onSubmit={handleSubmit}>
//                 <TextField
//                   label="Username"
//                   name="UserName"
//                   value={formData.UserName}
//                   onChange={handleChange}
//                   fullWidth
//                   margin="dense"
//                   variant="outlined"
//                   size="small"
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <Person sx={{ color: "#666" }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{
//                     mb: 2,
//                     "& .MuiOutlinedInput-root": {
//                       backgroundColor: "#111111",
//                       "&:hover fieldset": {
//                         borderColor: "#333",
//                       },
//                       "&.Mui-focused fieldset": {
//                         borderColor: "#00bcd4",
//                       },
//                     },
//                     input: {
//                       color: "#ffffff",
//                     },
//                     "& .MuiOutlinedInput-notchedOutline": {
//                       borderColor: "#333",
//                     },
//                     "& .MuiInputLabel-root": {
//                       color: "#888",
//                     },
//                     "& .Mui-focused .MuiInputLabel-root": {
//                       color: "#00bcd4",
//                     },
//                   }}
//                 />

//                 <TextField
//                   label="Email"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   fullWidth
//                   margin="dense"
//                   variant="outlined"
//                   size="small"
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <Email sx={{ color: "#666" }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{
//                     mb: 2,
//                     "& .MuiOutlinedInput-root": {
//                       backgroundColor: "#111111",
//                       "&:hover fieldset": {
//                         borderColor: "#333",
//                       },
//                       "&.Mui-focused fieldset": {
//                         borderColor: "#00bcd4",
//                       },
//                     },
//                     input: {
//                       color: "#ffffff",
//                     },
//                     "& .MuiOutlinedInput-notchedOutline": {
//                       borderColor: "#333",
//                     },
//                     "& .MuiInputLabel-root": {
//                       color: "#888",
//                     },
//                     "& .Mui-focused .MuiInputLabel-root": {
//                       color: "#00bcd4",
//                     },
//                   }}
//                 />

//                 <TextField
//                   label="Password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   value={formData.password}
//                   onChange={handleChange}
//                   fullWidth
//                   margin="dense"
//                   variant="outlined"
//                   size="small"
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <Lock sx={{ color: "#666" }} />
//                       </InputAdornment>
//                     ),
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton onClick={togglePasswordVisibility} edge="end" sx={{ color: "#666" }}>
//                           {showPassword ? <VisibilityOff /> : <Visibility />}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{
//                     mb: 2,
//                     "& .MuiOutlinedInput-root": {
//                       backgroundColor: "#111111",
//                       "&:hover fieldset": {
//                         borderColor: "#333",
//                       },
//                       "&.Mui-focused fieldset": {
//                         borderColor: "#00bcd4",
//                       },
//                     },
//                     input: {
//                       color: "#ffffff",
//                     },
//                     "& .MuiOutlinedInput-notchedOutline": {
//                       borderColor: "#333",
//                     },
//                     "& .MuiInputLabel-root": {
//                       color: "#888",
//                     },
//                     "& .Mui-focused .MuiInputLabel-root": {
//                       color: "#00bcd4",
//                     },
//                   }}
//                 />

//                 <TextField
//                   label="Role Name"
//                   name="roleName"
//                   value={formData.roleName}
//                   onChange={handleChange}
//                   fullWidth
//                   margin="dense"
//                   variant="outlined"
//                   size="small"
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <Work sx={{ color: "#666" }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{
//                     mb: 3,
//                     "& .MuiOutlinedInput-root": {
//                       backgroundColor: "#111111",
//                       "&:hover fieldset": {
//                         borderColor: "#333",
//                       },
//                       "&.Mui-focused fieldset": {
//                         borderColor: "#00bcd4",
//                       },
//                     },
//                     input: {
//                       color: "#ffffff",
//                     },
//                     "& .MuiOutlinedInput-notchedOutline": {
//                       borderColor: "#333",
//                     },
//                     "& .MuiInputLabel-root": {
//                       color: "#888",
//                     },
//                     "& .Mui-focused .MuiInputLabel-root": {
//                       color: "#00bcd4",
//                     },
//                   }}
//                 />

//                 <Button
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   sx={{
//                     py: 1.5,
//                     fontWeight: "bold",
//                     fontSize: "1.1rem",
//                     borderRadius: 2,
//                     background: "linear-gradient(45deg, #1a1a1a 30%, #333333 90%)",
//                     color: "#ffffff",
//                     border: "1px solid #00bcd4",
//                     "&:hover": {
//                       background: "linear-gradient(45deg, #333333 30%, #1a1a1a 90%)",
//                       boxShadow: "0 8px 25px rgba(0, 188, 212, 0.3)",
//                     },
//                     "&:disabled": {
//                       background: "#333",
//                       color: "#666",
//                       border: "1px solid #333",
//                     },
//                   }}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
//                 </Button>
//               </form>

//               <Typography
//                 variant="body2"
//                 textAlign="center"
//                 sx={{
//                   mt: 2,
//                   color: "#666",
//                   fontSize: "0.8rem",
//                 }}
//               >
//                 By creating an account, you agree to our{" "}
//                 <Button
//                   variant="text"
//                   size="small"
//                   sx={{
//                     p: 0,
//                     minWidth: "auto",
//                     color: "#00bcd4",
//                     textDecoration: "underline",
//                     fontSize: "0.8rem",
//                   }}
//                 >
//                   Terms
//                 </Button>{" "}
//                 and{" "}
//                 <Button
//                   variant="text"
//                   size="small"
//                   sx={{
//                     p: 0,
//                     minWidth: "auto",
//                     color: "#00bcd4",
//                     textDecoration: "underline",
//                     fontSize: "0.8rem",
//                   }}
//                 >
//                   Privacy Policy
//                 </Button>
//               </Typography>
//             </Box>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Box>
//   )
// }

// export default RegisterForm

















"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  Grid,
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material"
import { Visibility, VisibilityOff, Person, Email, Lock, Work } from "@mui/icons-material"
import type { AppDispatch, RootStore } from "../Stores/songStore"
import { registerUser } from "../Slices/authSlice "

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { isLoading, error } = useSelector((state: RootStore) => state.auth)
  const [showPassword, setShowPassword] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  const fullText = "Join the ultimate music experience. Create personalized playlists and discover new sounds."

  const [formData, setFormData] = useState({
    UserName: "",
    email: "",
    password: "",
    roleName: "",
  })

  // Continuous typing animation effect
  useEffect(() => {
    let index = 0
    let timer: NodeJS.Timeout

    const typeText = () => {
      if (!isDeleting && index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1))
        index++
        timer = setTimeout(typeText, 50)
      } else if (!isDeleting && index === fullText.length) {
        timer = setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && index > 0) {
        setTypedText(fullText.slice(0, index - 1))
        index--
        timer = setTimeout(typeText, 30)
      } else if (isDeleting && index === 0) {
        setIsDeleting(false)
        timer = setTimeout(typeText, 500)
      }
    }

    typeText()

    return () => clearTimeout(timer)
  }, [isDeleting])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await dispatch(registerUser(formData))
    if (registerUser.fulfilled.match(result)) {
      navigate("/personal-area")
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Box
      minHeight="100vh"
      maxHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: "#000000",
        p: 0,
        overflow: "hidden",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          height: "100vh",
          borderRadius: 0,
          overflow: "hidden",
          display: "flex",
          backgroundColor: "#000000",
        }}
      >
        <Grid container sx={{ height: "100%" }}>
          {/* Left Side - Registration Form */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              backgroundColor: "#000000",
              p: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box sx={{ maxWidth: 400, mx: "auto", width: "100%" }}>
              <Typography
                variant="h4"
                textAlign="center"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: "#ffffff",
                  mb: 1,
                }}
              >
                Create Account
              </Typography>

              <Typography
                variant="body2"
                textAlign="center"
                sx={{
                  color: "#888888",
                  mb: 3,
                }}
              >
                Get started with your musical journey
              </Typography>

              {error && (
                <Box
                  sx={{
                    p: 2,
                    mb: 3,
                    backgroundColor: "#1a0000",
                    borderRadius: 2,
                    border: "1px solid #ff3333",
                  }}
                >
                  <Typography color="error" fontSize="0.9rem" textAlign="center">
                    {error}
                  </Typography>
                </Box>
              )}

              <form onSubmit={handleSubmit}>
                <TextField
                  label="Username"
                  name="UserName"
                  value={formData.UserName}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: "#666" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#111111",
                      "&:hover fieldset": {
                        borderColor: "#333",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#00bcd4",
                      },
                    },
                    input: {
                      color: "#ffffff",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#333",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#888",
                    },
                    "& .Mui-focused .MuiInputLabel-root": {
                      color: "#00bcd4",
                    },
                  }}
                />

                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: "#666" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#111111",
                      "&:hover fieldset": {
                        borderColor: "#333",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#00bcd4",
                      },
                    },
                    input: {
                      color: "#ffffff",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#333",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#888",
                    },
                    "& .Mui-focused .MuiInputLabel-root": {
                      color: "#00bcd4",
                    },
                  }}
                />

                <TextField
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: "#666" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility} edge="end" sx={{ color: "#666" }}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#111111",
                      "&:hover fieldset": {
                        borderColor: "#333",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#00bcd4",
                      },
                    },
                    input: {
                      color: "#ffffff",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#333",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#888",
                    },
                    "& .Mui-focused .MuiInputLabel-root": {
                      color: "#00bcd4",
                    },
                  }}
                />

                <TextField
                  label="Role Name"
                  name="roleName"
                  value={formData.roleName}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Work sx={{ color: "#666" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mb: 3,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#111111",
                      "&:hover fieldset": {
                        borderColor: "#333",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#00bcd4",
                      },
                    },
                    input: {
                      color: "#ffffff",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#333",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#888",
                    },
                    "& .Mui-focused .MuiInputLabel-root": {
                      color: "#00bcd4",
                    },
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    py: 1.5,
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    borderRadius: 2,
                    background: "linear-gradient(45deg, #1a1a1a 30%, #333333 90%)",
                    color: "#ffffff",
                    border: "1px solid #00bcd4",
                    "&:hover": {
                      background: "linear-gradient(45deg, #333333 30%, #1a1a1a 90%)",
                      boxShadow: "0 8px 25px rgba(0, 188, 212, 0.3)",
                    },
                    "&:disabled": {
                      background: "#333",
                      color: "#666",
                      border: "1px solid #333",
                    },
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
                </Button>
              </form>

              <Typography
                variant="body2"
                textAlign="center"
                sx={{
                  mt: 2,
                  color: "#666",
                  fontSize: "0.8rem",
                }}
              >
                By creating an account, you agree to our{" "}
                <Button
                  variant="text"
                  size="small"
                  sx={{
                    p: 0,
                    minWidth: "auto",
                    color: "#00bcd4",
                    textDecoration: "underline",
                    fontSize: "0.8rem",
                  }}
                >
                  Terms
                </Button>{" "}
                and{" "}
                <Button
                  variant="text"
                  size="small"
                  sx={{
                    p: 0,
                    minWidth: "auto",
                    color: "#00bcd4",
                    textDecoration: "underline",
                    fontSize: "0.8rem",
                  }}
                >
                  Privacy Policy
                </Button>
              </Typography>
            </Box>
          </Grid>

          {/* Right Side - Welcome Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              background: "linear-gradient(135deg, #000000 0%, #1a1a1a 70%, #003d4d 100%)",
              color: "white",
              p: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Animated Background Particles */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `
                  radial-gradient(circle at 20% 20%, rgba(0, 188, 212, 0.05) 0%, transparent 50%),
                  radial-gradient(circle at 80% 80%, rgba(0, 188, 212, 0.05) 0%, transparent 50%),
                  radial-gradient(circle at 40% 60%, rgba(0, 188, 212, 0.03) 0%, transparent 50%)
                `,
                animation: "float 6s ease-in-out infinite",
                "@keyframes float": {
                  "0%, 100%": { transform: "translateY(0px)" },
                  "50%": { transform: "translateY(-20px)" },
                },
              }}
            />

            {/* Logo */}
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(45deg, #1a1a1a, #333333)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 3,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                zIndex: 1,
                border: "2px solid #333",
                animation: "pulse 2s ease-in-out infinite",
                "@keyframes pulse": {
                  "0%, 100%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.05)" },
                },
              }}
            >
              <Typography variant="h3" fontWeight="bold" color="#00bcd4">
                S
              </Typography>
            </Box>

            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{
                zIndex: 1,
                color: "#ffffff",
                mb: 3,
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
              }}
            >
              SoundWave
            </Typography>

            {/* Continuous Typing Animation */}
            <Typography
              variant="h6"
              sx={{
                maxWidth: 350,
                zIndex: 1,
                lineHeight: 1.6,
                color: "#cccccc",
                minHeight: "4em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {typedText}
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  width: "2px",
                  height: "1.2em",
                  backgroundColor: "#00bcd4",
                  ml: 1,
                  animation: "blink 1s infinite",
                  "@keyframes blink": {
                    "0%, 50%": { opacity: 1 },
                    "51%, 100%": { opacity: 0 },
                  },
                }}
              />
            </Typography>

            <Box sx={{ mt: 4, zIndex: 1 }}>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
                Already have an account?
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#333",
                  color: "#cccccc",
                  px: 3,
                  py: 1,
                  "&:hover": {
                    borderColor: "#00bcd4",
                    color: "#00bcd4",
                    backgroundColor: "rgba(0, 188, 212, 0.1)",
                  },
                }}
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default RegisterForm