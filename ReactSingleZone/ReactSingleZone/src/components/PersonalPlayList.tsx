// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootStore } from "../Stores/songStore";
// import { fetchUserPlaylists } from "../Slices/playlistSlice";
// import { Link, useParams } from "react-router-dom";
// import { Button, Grid, Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
// import AddPlaylist from "./AddPlaylist";  // import the AddPlaylist component
// const Playlists: React.FC = () => {
//   const { userId } = useParams();
//   console.log(userId, "fcghj");
//   const dispatch = useDispatch<AppDispatch>();
//   const { playlists, loading, error } = useSelector((state: RootStore) => state.playlists);

//   const [open, setOpen] = useState(false);  // state to control the modal

//   useEffect(() => {
//     dispatch(fetchUserPlaylists(userId));
//   }, [dispatch, userId]);

//   const handleOpenModal = () => {
//     setOpen(true);  // Open the modal
//   };

//   const handleCloseModal = () => {
//     setOpen(false);  // Close the modal
//   };

//   if (loading) return <Typography variant="h6">Loading playlists...</Typography>;
//   if (error) return <Typography variant="h6" color="error">Error: {error}</Typography>;

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
//       <Typography variant="h4" gutterBottom>My Playlists</Typography>
      
//       {/* כפתור ADD PLAYLIST */}
//       <Button
//         sx={{
//           position: 'fixed',
//           top: 16,
//           right: 16,
//           backgroundColor: 'blue',
//           color: 'white',
//           '&:hover': { backgroundColor: 'darkblue' },
//           zIndex: 9999,  // לוודא שהכפתור לא מוסתר על ידי אלמנטים אחרים
//         }}
//         onClick={handleOpenModal}  // Open modal when clicked
//       >
//         ADD PLAYLIST
//       </Button>

//       {/* כאן תמיד תוצג, אפילו אם אין פלייליסטים */}
//       {playlists.length > 0 ? (
//         <Grid container spacing={3} justifyContent="center">
//           {playlists.map((playlist) => (
//             <Grid item key={playlist.id}>
//               <Link to={`/personal-area/playlist/${playlist.id}`} style={{ textDecoration: 'none' }}>
//                 <Button
//                   variant="contained"
//                   sx={{
//                     width: 150,
//                     height: 150,
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     backgroundColor: '#333',
//                     color: 'white',
//                     fontSize: '16px',
//                     borderRadius: 2,
//                     '&:hover': {
//                       backgroundColor: '#555',
//                       transform: 'scale(1.05)',
//                     },
//                     '&:active': {
//                       transform: 'scale(1)',
//                     },
//                   }}
//                 >
//                   <Typography variant="body2" align="center">{playlist.name}</Typography>
//                 </Button>
//               </Link>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         <Typography variant="h6" color="textSecondary">אין לך פלייליסטים עדיין</Typography>
//       )}

//       {/* Modal for adding playlist */}
//       <Dialog open={open} onClose={handleCloseModal}>
//         <DialogTitle>Create New Playlist</DialogTitle>
//         <DialogContent>
//           <AddPlaylist />  {/* This will render the AddPlaylist component inside the modal */}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseModal} color="primary">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Playlists;











// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootStore } from "../Stores/songStore";
// import { fetchUserPlaylists } from "../Slices/playlistSlice";
// import { Link, useParams } from "react-router-dom";
// import { 
//   Button, 
//   Grid, 
//   Box, 
//   Typography, 
//   Dialog, 
//   DialogActions, 
//   DialogContent, 
//   DialogTitle, 
//   Card, 
//   CardContent, 
//   IconButton, 
//   Menu, 
//   MenuItem,
//   useTheme,
//   useMediaQuery
// } from "@mui/material";
// import { motion, AnimatePresence } from 'framer-motion';
// import AddIcon from '@mui/icons-material/Add';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
// import MusicNoteIcon from '@mui/icons-material/MusicNote';
// import AddPlaylist from "./AddPlaylist";

// const PlaylistCard: React.FC<{ 
//   playlist: any, 
//   onMoreOptions: (event: React.MouseEvent<HTMLButtonElement>, playlist: any) => void 
// }> = ({ playlist, onMoreOptions }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <Card 
//       component={motion.div}
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       whileHover={{ 
//         scale: 1.05,
//         transition: { duration: 0.3 }
//       }}
//       sx={{
//         width: 250,
//         height: 300,
//         display: 'flex',
//         flexDirection: 'column',
//         position: 'relative',
//         borderRadius: 3,
//         overflow: 'hidden',
//         boxShadow: 2,
//         backgroundColor: '#1C1C1C',
//         border: '1px solid #333',
//         transition: 'all 0.3s ease',
//         perspective: '1000px',
//         '&:hover': {
//           boxShadow: 4,
//           border: '1px solid #20B2AA', // Turquoise border on hover
//           transform: 'rotateY(10deg)',
//           transition: 'all 0.3s ease'
//         }
//       }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <AnimatePresence>
//         <Box
//           component={motion.div}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: isHovered ? 0.7 : 1 }}
//           sx={{
//             height: 200,
//             backgroundColor: '#2C2C2C',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             position: 'relative',
//             overflow: 'hidden'
//           }}
//         >
//           <PlaylistPlayIcon 
//             sx={{ 
//               fontSize: 100, 
//               color: '#888',
//               transition: 'all 0.3s ease',
//               transform: isHovered ? 'scale(1.2)' : 'scale(1)'
//             }} 
//           />
//           {isHovered && (
//             <Box
//               sx={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 width: '100%',
//                 height: '100%',
//                 backgroundColor: 'rgba(32, 178, 170, 0.2)', // Turquoise overlay
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center'
//               }}
//             />
//           )}
//         </Box>
//       </AnimatePresence>
      
//       <CardContent 
//         sx={{ 
//           flexGrow: 1, 
//           position: 'relative', 
//           backgroundColor: '#1C1C1C',
//           transition: 'background-color 0.3s ease',
//           '&:hover': {
//             backgroundColor: '#20B2AA1A' // Subtle turquoise tint
//           }
//         }}
//       >
//         <Typography 
//           gutterBottom 
//           variant="h6" 
//           component="div" 
//           color="white"
//           sx={{
//             transition: 'color 0.3s ease',
//             ...(isHovered && { color: '#20B2AA' })
//           }}
//         >
//           {playlist.name}
//         </Typography>
//         <Typography 
//           variant="body2" 
//           color="gray"
//           sx={{
//             transition: 'color 0.3s ease',
//             ...(isHovered && { color: '#20B2AA' })
//           }}
//         >
//           {playlist.songsCount || 0} Songs
//         </Typography>
        
//         <IconButton
//           onClick={(e) => onMoreOptions(e, playlist)}
//           sx={{
//             position: 'absolute',
//             top: 0,
//             right: 0,
//             color: 'gray',
//             transition: 'color 0.3s ease',
//             '&:hover': {
//               color: '#20B2AA'
//             }
//           }}
//         >
//           <MoreVertIcon />
//         </IconButton>
//       </CardContent>
//     </Card>
//   );
// };

// const Playlists: React.FC = () => {
//   const { userId } = useParams();
//   const dispatch = useDispatch<AppDispatch>();
//   const { playlists, loading, error } = useSelector((state: RootStore) => state.playlists);

//   const [open, setOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [selectedPlaylist, setSelectedPlaylist] = useState<any>(null);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   useEffect(() => {
//     dispatch(fetchUserPlaylists(userId));
//   }, [dispatch, userId]);

//   const handleOpenModal = () => setOpen(true);
//   console.log("setOpen",setOpen);
  
//   const handleCloseModal = () => setOpen(false);

//   const handleMoreOptions = (event: React.MouseEvent<HTMLButtonElement>, playlist: any) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedPlaylist(playlist);
//   };

//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//     setSelectedPlaylist(null);
//   };

//   if (loading) return (
//     <Box sx={{ 
//       display: 'flex', 
//       justifyContent: 'center', 
//       alignItems: 'center', 
//       height: '100vh',
//       backgroundColor: '#121212'
//     }}>
//       <Typography variant="h6" color="white">Loading playlists...</Typography>
//     </Box>
//   );

//   if (error) return (
//     <Box sx={{ 
//       display: 'flex', 
//       justifyContent: 'center', 
//       alignItems: 'center', 
//       height: '100vh',
//       backgroundColor: '#121212'
//     }}>
//       <Typography variant="h6" color="error">Error: {error}</Typography>
//     </Box>
//   );

//   return (
//     <Box 
//       sx={{ 
//         display: 'flex', 
//         flexDirection: 'column', 
//         alignItems: 'center', 
//         p: { xs: 2, sm: 4 },
//         minHeight: '100vh',
//         backgroundColor: '#121212'
//       }}
//     >
//       <Box 
//         sx={{ 
//           width: '100%', 
//           display: 'flex', 
//           justifyContent: 'space-between', 
//           alignItems: 'center',
//           mb: 4 
//         }}
//       >
//         <Typography 
//           variant="h4" 
//           color="white" 
//           gutterBottom
//           sx={{
//             position: 'relative',
//             '&::after': {
//               content: '""',
//               position: 'absolute',
//               bottom: -5,
//               left: 0,
//               width: '50%',
//               height: '3px',
//               backgroundColor: '#20B2AA'
//             }
//           }}
//         >
//           My Playlists
//         </Typography>
        
//         <Button
//           variant="outlined"
//           startIcon={<AddIcon />}
//           onClick={handleOpenModal}
//           sx={{
//             borderRadius: 2,
//             textTransform: 'none',
//             color: 'white',
//             borderColor: '#20B2AA',
//             transition: 'all 0.3s ease',
//             '&:hover': {
//               backgroundColor: 'rgba(32, 178, 170, 0.1)',
//               borderColor: '#20B2AA'
//             }
//           }}
//         >
//           Create Playlist
//         </Button>
//       </Box>

//       {playlists.length > 0 ? (
//         <Grid 
//           container 
//           spacing={3} 
//           justifyContent="center"
//           sx={{ 
//             width: '100%', 
//             maxWidth: 1200 
//           }}
//         >
//           {playlists.map((playlist) => (
//             <Grid item key={playlist.id} xs={12} sm={6} md={4} lg={3}>
//               <Link 
//                 to={`/personal-area/playlist/${playlist.id}`} 
//                 style={{ textDecoration: 'none' }}
//               >
//                 <PlaylistCard 
//                   playlist={playlist} 
//                   onMoreOptions={handleMoreOptions} 
//                 />
//               </Link>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         <Box 
//           sx={{ 
//             display: 'flex', 
//             flexDirection: 'column', 
//             alignItems: 'center', 
//             justifyContent: 'center',
//             height: '50vh' 
//           }}
//         >
//           <MusicNoteIcon sx={{ 
//             fontSize: 100, 
//             color: '#20B2AA', 
//             mb: 2,
//             transition: 'transform 0.3s ease',
//             '&:hover': {
//               transform: 'scale(1.2) rotate(360deg)'
//             }
//           }} />
//           <Typography variant="h6" color="gray">
//             You don't have any playlists yet
//           </Typography>
//         </Box>
//       )}

//       {/* Rest of the code remains the same as previous version */}
//     </Box>
//   );
// };

// export default Playlists;




















import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStore } from "../Stores/songStore";
import { fetchUserPlaylists } from "../Slices/playlistSlice";
import { Link, useParams } from "react-router-dom";
import { 
  Button, 
  Grid, 
  Box, 
  Typography, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Card, 
  CardContent, 
  IconButton, 
} from "@mui/material";
import { motion, AnimatePresence } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AddPlaylist from "./AddPlaylist"; // Import the AddPlaylist component

const PlaylistCard: React.FC<{ 
  playlist: any, 
  onMoreOptions: (event: React.MouseEvent<HTMLButtonElement>, playlist: any) => void 
}> = ({ playlist, onMoreOptions }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      component={motion.div}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      sx={{
        width: 250,
        height: 300,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: 2,
        backgroundColor: '#1C1C1C',
        border: '1px solid #333',
        transition: 'all 0.3s ease',
        perspective: '1000px',
        '&:hover': {
          boxShadow: 4,
          border: '1px solid #20B2AA', // Turquoise border on hover
          transform: 'rotateY(10deg)',
          transition: 'all 0.3s ease'
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.7 : 1 }}
          sx={{
            height: 200,
            backgroundColor: '#2C2C2C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <PlaylistPlayIcon 
            sx={{ 
              fontSize: 100, 
              color: '#888',
              transition: 'all 0.3s ease',
              transform: isHovered ? 'scale(1.2)' : 'scale(1)'
            }} 
          />
          {isHovered && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(32, 178, 170, 0.2)', // Turquoise overlay
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
          )}
        </Box>
      </AnimatePresence>
      
      <CardContent 
        sx={{ 
          flexGrow: 1, 
          position: 'relative', 
          backgroundColor: '#1C1C1C',
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: '#20B2AA1A' // Subtle turquoise tint
          }
        }}
      >
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div" 
          color="white"
          sx={{
            transition: 'color 0.3s ease',
            ...(isHovered && { color: '#20B2AA' })
          }}
        >
          {playlist.name}
        </Typography>
        <Typography 
          variant="body2" 
          color="gray"
          sx={{
            transition: 'color 0.3s ease',
            ...(isHovered && { color: '#20B2AA' })
          }}
        >
          {playlist.songsCount || 0} Songs
        </Typography>
        
        <IconButton
          onClick={(e) => onMoreOptions(e, playlist)}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            color: 'gray',
            transition: 'color 0.3s ease',
            '&:hover': {
              color: '#20B2AA'
            }
          }}
        >
          <MoreVertIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

const Playlists: React.FC = () => {
  const { userId } = useParams();

 
  const dispatch = useDispatch<AppDispatch>();
  const { playlists, loading } = useSelector((state: RootStore) => state.playlists);

  const [open, setOpen] = useState(false);
  const [, setAnchorEl] = useState<null | HTMLElement>(null);
  const [ setSelectedPlaylist] = useState<any>(null);



  useEffect(() => {
    
    if (userId) {
      dispatch(fetchUserPlaylists(Number(userId)));
    }
  }, [dispatch, userId]);

  const handleOpenModal = () => setOpen(true);  // Open the modal
  const handleCloseModal = () => setOpen(false); // Close the modal

  const handleMoreOptions = (event: React.MouseEvent<HTMLButtonElement>, playlist: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedPlaylist(playlist);
  };

  // const handleCloseMenu = () => {
  //   setAnchorEl(null);
  //   setSelectedPlaylist(null);
  // };

  if (loading) return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      backgroundColor: '#121212'
    }}>
      <Typography variant="h6" color="white">Loading playlists...</Typography>
    </Box>
  );

  // if (error) return (
  //   <Box sx={{ 
  //     display: 'flex', 
  //     justifyContent: 'center', 
  //     alignItems: 'center', 
  //     height: '100vh',
  //     backgroundColor: '#121212'
  //   }}>
  //     <Typography variant="h6" color="error">Error: {error}</Typography>
  //   </Box>
  // );

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        p: { xs: 2, sm: 4 },
        minHeight: '100vh',
        backgroundColor: '#121212'
      }}
    >
      <Box 
        sx={{ 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4 
          
        }}
      >
        <Typography 
          variant="h4" 
          color="white" 
          margin={"50px"}
          gutterBottom
          sx={{
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -5,
              left: 0,
              width: '50%',
              height: '3px',
              backgroundColor: '#20B2AA',
            }
          }}
        >
          My Playlists
        </Typography>
        
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleOpenModal}  // Open the modal
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            color: 'white',
            borderColor: '#20B2AA',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(32, 178, 170, 0.1)',
              borderColor: '#20B2AA',

            
            }
          }}
        >
          Create Playlist
        </Button>
      </Box>

      {/* Your playlists */}
      {playlists.length > 0 ? (
        <Grid 
          container 
          spacing={3} 
          justifyContent="center"
          sx={{ 
            width: '100%', 
            maxWidth: 1200 
          }}
        >
          {playlists.map((playlist) => (
            <Grid item key={playlist.id} xs={12} sm={6} md={4} lg={3}>
              <Link 
                to={`/personal-area/playlist/${playlist.id}`} 
                style={{ textDecoration: 'none' }}
              >
                <PlaylistCard 
                  playlist={playlist} 
                  onMoreOptions={handleMoreOptions} 
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: '50vh' 
          }}
        >
          <MusicNoteIcon sx={{ 
            fontSize: 100, 
            color: '#20B2AA', 
            mb: 2,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.2) rotate(360deg)'
            }
          }} />
          <Typography variant="h6" color="gray">
            You don't have any playlists yet
          </Typography>
        </Box>
      )}

      {/* Modal for Add Playlist */}
      <Dialog open={open} onClose={handleCloseModal} >
        <DialogTitle>Create New Playlist</DialogTitle>
        <DialogContent>
          <AddPlaylist />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Playlists;
