
// import { useEffect, useState } from 'react';
// import {  useSelector } from 'react-redux';
// import {  RootStore } from '../Stores/songStore';
// import RatingStars from './RatingStars';




// import { parseBlob } from "music-metadata-browser";
// import { Buffer } from "buffer";
// import { Box, Typography, Card, CardMedia, CardContent, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import RatingModalProps from './RatingModalProps ';

// (window as any).Buffer = Buffer;

// const DEFAULT_COVER = "https://via.placeholder.com/200?text=No+Cover";

// const SongsList = () => {
//   const { filteredSongs, loading } = useSelector((state: RootStore) => state.actionSongs);
//   const navigate = useNavigate();
//   const [coverArts, setCoverArts] = useState<{ [key: string]: string | null }>({});
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedSongId, setSelectedSongId] = useState<number | null>(null);
//   const [selectedSongTitle, setSelectedSongTitle] = useState("");

//   const extractCoverArt = async (fileUrl: string) => {
//     try {
//       const response = await fetch(fileUrl);
//       const blob = await response.blob();
//       const metadata = await parseBlob(blob);

//       if (metadata.common.picture?.length) {
//         const cover = metadata.common.picture[0];
//         return `data:${cover.format};base64,${btoa(
//           new Uint8Array(cover.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
//         )}`;
//       }
//     } catch (error) {
//       console.error("Error extracting cover art:", error);
//     }
//     return DEFAULT_COVER;
//   };

//   useEffect(() => {
//     const fetchCoverArts = async () => {
//       const newCovers: { [key: string]: string | null } = {};
//       for (const song of filteredSongs) {
//         if (song.audioUrl) {
//           newCovers[song.audioUrl] = await extractCoverArt(song.audioUrl);
//         }
//       }
//       setCoverArts(newCovers);
//     };
//     if (filteredSongs.length > 0) {
//       fetchCoverArts();
//     }
//   }, [filteredSongs]);

//   const handleOpenModal = (songId: number, songTitle: string) => {
//     setSelectedSongId(songId);
//     setSelectedSongTitle(songTitle);
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setSelectedSongId(null);
//     setSelectedSongTitle("");
//   };

//   if (loading) return <Typography>טוען שירים...</Typography>;

//   return (
//     <>
//       <Box
//         sx={{
//           p: 2,
//           width: "100%",
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
//           gap: 3,
//         }}
//       >
//         {filteredSongs.map((song, index) => (
//           <Card
//             key={index}
//             sx={{
//               cursor: "pointer",
//               transition: "transform 0.3s, box-shadow 0.3s",
//               '&:hover': {
//                 transform: "scale(1.05)",
//                 boxShadow: 6,
//               },
//             }}
//             onClick={() => navigate(`/${song.id}`)}
//           >
//             <CardMedia
//               component="img"
//               height="160"
//               image={coverArts[song.audioUrl] || DEFAULT_COVER}
//               alt="עטיפת השיר"
//             />
//             <CardContent sx={{ textAlign: "center" }}>
//               <Typography variant="h6" fontWeight={600} gutterBottom>
//                 {song.title}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {song.artist}
//               </Typography>
//               <Box mt={1}>
//                 {/* Assuming RatingStars is another component */}
//                 <RatingStars rating={song.avgRating || 0} />
//               </Box>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 sx={{ mt: 2 }}
//                 onClick={(e) => {
//                   e.stopPropagation(); // Prevent Card click
//                   handleOpenModal(song.id, song.title);
//                 }}
//               >
//                 דרג שיר
//               </Button>
//             </CardContent>
//           </Card>
//         ))}
//       </Box>
//       {/* Rating Modal */}
//       {selectedSongId && (
//         <RatingModalProps
//           open={openModal}
//           onClose={handleCloseModal}
//           songId={selectedSongId}
//           songTitle={selectedSongTitle}
//         />
//       )}
//     </>
//   );
// };
// export default SongsList;






//נסיון תמלול

// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { RootStore } from '../Stores/songStore';
// import RatingStars from './RatingStars';
// import { parseBlob } from "music-metadata-browser";
// import { Buffer } from "buffer";
// import {
//   Box,
//   Typography,
//   Card,
//   CardMedia,
//   CardContent,
//   IconButton,
//   Grid,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import RatingModalProps from './RatingModalProps ';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import StarBorderIcon from '@mui/icons-material/StarBorder';

// (window as any).Buffer = Buffer;

// const DEFAULT_COVER = "https://via.placeholder.com/200?text=No+Cover";

// const SongsList = () => {
//   const { filteredSongs, loading } = useSelector((state: RootStore) => state.actionSongs);
//   const navigate = useNavigate();
//   const [coverArts, setCoverArts] = useState<{ [key: string]: string | null }>({});
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedSongId, setSelectedSongId] = useState<number | null>(null);
//   const [selectedSongTitle, setSelectedSongTitle] = useState("");

//   const extractCoverArt = async (fileUrl: string) => {
//     try {
//       const response = await fetch(fileUrl);
//       const blob = await response.blob();
//       const metadata = await parseBlob(blob);

//       if (metadata.common.picture?.length) {
//         const cover = metadata.common.picture[0];
//         return `data:${cover.format};base64,${btoa(
//           new Uint8Array(cover.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
//         )}`;
//       }
//     } catch (error) {
//       console.error("Error extracting cover art:", error);
//     }
//     return DEFAULT_COVER;
//   };

//   useEffect(() => {
//     const fetchCoverArts = async () => {
//       const newCovers: { [key: string]: string | null } = {};
//       for (const song of filteredSongs) {
//         if (song.audioUrl) {
//           newCovers[song.audioUrl] = await extractCoverArt(song.audioUrl);
//         }
//       }
//       setCoverArts(newCovers);
//     };
//     if (filteredSongs.length > 0) {
//       fetchCoverArts();
//     }
//   }, [filteredSongs]);

//   const handleOpenModal = (songId: number, songTitle: string) => {
//     setSelectedSongId(songId);
//     setSelectedSongTitle(songTitle);
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setSelectedSongId(null);
//     setSelectedSongTitle("");
//   };

//   if (loading) return <Typography>טוען שירים...</Typography>;

//   return (
//     <>
//       <Box
//         sx={{
//           p: 2,
//           width: "100%",
//         }}
//       >
//         <Grid container spacing={4}>
//           {filteredSongs.map((song, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Card
//                 sx={{
//                   backgroundColor: "#1a1a1a",
//                   color: "#fff",
//                   cursor: "pointer",
//                   transition: "transform 0.3s, box-shadow 0.3s",
//                   position: "relative",
//                   height: "100%",
//                   '&:hover': {
//                     transform: "scale(1.05)",
//                     boxShadow: 6,
//                   },
//                   '&:hover .play-overlay': {
//                     opacity: 1,
//                   },
//                 }}
//                 onClick={() => navigate(`/${song.id}`)}
//               >
//                 <Box sx={{ position: "relative" }}>
//                   <CardMedia
//                     component="img"
//                     image={coverArts[song.audioUrl] || DEFAULT_COVER}
//                     alt="עטיפת השיר"
//                     sx={{ height: 200 }}
//                   />
//                   <Box
//                     className="play-overlay"
//                     sx={{
//                       position: "absolute",
//                       top: "50%",
//                       left: "50%",
//                       transform: "translate(-50%, -50%)",
//                       backgroundColor: "rgba(0, 0, 0, 0.6)",
//                       borderRadius: "50%",
//                       p: 1.5,
//                       opacity: 0,
//                       transition: "opacity 0.3s",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <PlayArrowIcon sx={{ color: "#fff", fontSize: 36 }} />
//                   </Box>
//                 </Box>

//                 <CardContent sx={{ textAlign: "center" }}>
//                   <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: "#fff" }}>
//                     {song.title}
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: "#ccc" }}>
//                     {song.artist}
//                   </Typography>
//                   <Box mt={2}>
//                     <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
//                       <RatingStars rating={song.avgRating || 0} />
//                       <IconButton
//                         sx={{ ml: 2 }}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleOpenModal(song.id, song.title);
//                         }}
//                       >
//                         <StarBorderIcon sx={{ color: '#ffc107', fontSize: 30 }} />
//                       </IconButton>
//                     </Box>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>

//       {selectedSongId && (
//         <RatingModalProps
//           open={openModal}
//           onClose={handleCloseModal}
//           songId={selectedSongId}
//           songTitle={selectedSongTitle}
//         />
//       )}
//     </>
//   );
// };

// export default SongsList;








import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../Stores/songStore';
import RatingStars from './RatingStars';
import { parseBlob } from "music-metadata-browser";
import { Buffer } from "buffer";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import RatingModalProps from './RatingModalProps ';
import { deleteSong } from '../Slices/musiSlice';
import { AppDispatch } from "../Stores/songStore";  

(window as any).Buffer = Buffer;

const DEFAULT_COVER = "https://via.placeholder.com/200?text=No+Cover";

const SongsList = () => {
  const { filteredSongs, loading } = useSelector((state: RootStore) => state.actionSongs);
  const navigate = useNavigate();
  const [coverArts, setCoverArts] = useState<{ [key: string]: string | null }>({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState<number | null>(null);
  const [selectedSongTitle, setSelectedSongTitle] = useState("");


   const dispatch = useDispatch<AppDispatch>();
  
  const roleName = sessionStorage.getItem('userRole');

  const extractCoverArt = async (fileUrl: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const metadata = await parseBlob(blob);

      if (metadata.common.picture?.length) {
        const cover = metadata.common.picture[0];
        return `data:${cover.format};base64,${btoa(
          new Uint8Array(cover.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
        )}`;
      }
    } catch (error) {
      console.error("Error extracting cover art:", error);
    }
    return DEFAULT_COVER;
  };

  useEffect(() => {
    const fetchCoverArts = async () => {
      const newCovers: { [key: string]: string | null } = {};
      for (const song of filteredSongs) {
        if (song.audioUrl) {
          newCovers[song.audioUrl] = await extractCoverArt(song.audioUrl);
        }
      }
      setCoverArts(newCovers);
    };
    if (filteredSongs.length > 0) {
      fetchCoverArts();
    }
  }, [filteredSongs]);

  const handleOpenModal = (songId: number, songTitle: string) => {
    setSelectedSongId(songId);
    setSelectedSongTitle(songTitle);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedSongId(null);
    setSelectedSongTitle("");
  };

  // const handleDeleteSong = (e: React.MouseEvent, songId: number) => {
  //   e.stopPropagation();
  //   console.log("מוחק שיר עם ID:", songId);
  //    };



  const handleDeleteSong = (e: React.MouseEvent, songId: number) => {
    e.stopPropagation();
    if (confirm("האם את בטוחה שברצונך למחוק את השיר?")) {
      console.log("מוחק שיר עם ID:", songId);
      dispatch(deleteSong(songId));
    }
  };

  if (loading) return <Typography>טוען שירים...</Typography>;

  return (
    <>
      <Box sx={{ p: 2, width: "100%" }}>
        <Grid container spacing={4}>
          {filteredSongs.map((song, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  backgroundColor: "#1a1a1a",
                  color: "#fff",
                  cursor: "pointer",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  position: "relative",
                  height: "100%",
                  '&:hover': {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                  '&:hover .play-overlay': {
                    opacity: 1,
                  },
                }}
                onClick={() => navigate(`/${song.id}`)}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    image={coverArts[song.audioUrl] || DEFAULT_COVER}
                    alt="עטיפת השיר"
                    sx={{ height: 200 }}
                  />
                  <Box
                    className="play-overlay"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      borderRadius: "50%",
                      p: 1.5,
                      opacity: 0,
                      transition: "opacity 0.3s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PlayArrowIcon sx={{ color: "#fff", fontSize: 36 }} />
                  </Box>

                  {/* כפתור מחיקה רק אם המשתמש Admin */}
                  {roleName == "Admin" && (
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        backgroundColor: "rgba(255,255,255,0.1)",
                        '&:hover': { backgroundColor: "rgba(255,0,0,0.4)" },
                      }}
                      onClick={(e) => handleDeleteSong(e, song.id)}
                    >
                      <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                  )}
                </Box>

                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: "#fff" }}>
                    {song.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#ccc" }}>
                    {song.artist}
                  </Typography>
                  <Box mt={2}>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <RatingStars rating={song.avgRating || 0} />
                      <IconButton
                        sx={{ ml: 2 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(song.id, song.title);
                        }}
                      >
                        <StarBorderIcon sx={{ color: '#ffc107', fontSize: 30 }} />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {selectedSongId && (
        <RatingModalProps
          open={openModal}
          onClose={handleCloseModal}
          songId={selectedSongId}
          songTitle={selectedSongTitle}
        />
      )}
    </>
  );
};

export default SongsList;
// // function jwtDecode(token: string) {
// //   throw new Error('Function not implemented.');
// }

