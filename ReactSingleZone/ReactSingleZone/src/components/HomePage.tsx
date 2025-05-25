

// import { useEffect, useState } from "react";
// import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Divider, Chip, Button } from "@mui/material";
// import { styled } from "@mui/system";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootStore } from "../Stores/songStore";
// import { fetchAllSongs } from "../Slices/actionSongSlice";
// import { parseBlob } from "music-metadata-browser";
// // import Header from "./Header";
// import CategoryList from "./CategoryList";
// import SongsList from "./SongsList";
// import SearchBar from "./SearchBar";
// import { motion } from "framer-motion";
// import MusicNoteIcon from "@mui/icons-material/MusicNote";
// import HeadphonesIcon from "@mui/icons-material/Headphones";
// import AlbumIcon from "@mui/icons-material/Album";
// import FavoriteIcon from "@mui/icons-material/Favorite";

// // Enhanced styled components with teal instead of green
// const FeatureCard = styled(Card)(() => ({
//   backgroundColor: "#222",
//   color: "white",
//   borderRadius: 16,
//   transition: "all 0.4s ease",
//   cursor: "pointer",
//   overflow: "hidden",
//   boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
//   '&:hover': {
//     transform: "scale(1.05)",
//     boxShadow: "0 12px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 188, 212, 0.3)"
//   },
// }));

// const InfoCard = styled(Card)(() => ({
//   backgroundColor: "#222",
//   color: "white",
//   borderRadius: 16,
//   padding: "20px",
//   textAlign: "center",
//   boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
//   height: "100%",
//   transition: "all 0.4s ease",
//   '&:hover': {
//     transform: "translateY(-10px)",
//     boxShadow: "0 12px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 188, 212, 0.3)",
//     backgroundColor: "#282828"
//   },
// }));

// const DiscoverButton = styled(Button)(() => ({
//   backgroundColor: "#00BCD4",
//   color: "white",
//   borderRadius: 50,
//   padding: "10px 20px",
//   fontWeight: "bold",
//   marginTop: 20,
//   transition: "all 0.3s ease",
//   '&:hover': {
//     backgroundColor: "#26C6DA",
//     transform: "scale(1.05)",
//     boxShadow: "0 5px 15px rgba(0, 188, 212, 0.4)"
//   },
// }));

// const HeroSection = styled(Box)(() => ({
//   background: "linear-gradient(180deg, #000000 0%, #121212 100%)",
//   padding: "80px 0 40px 0",
//   position: "relative",
//   overflow: "hidden",
//   "&::before": {
//     content: '""',
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     backgroundImage: "radial-gradient(circle at 30% 50%, rgba(0, 188, 212, 0.1) 0%, transparent 60%)",
//     zIndex: 0,
//   }
// }));

// const DEFAULT_COVER = "https://via.placeholder.com/300?text=No+Cover";

// // Array of taglines for the rotating text
// const taglines = [
//   "Discover Music Without Limits",
//   "Your Sound, Your World",
//   "Unleash Your Musical Journey",
//   "Every Beat Matters",
//   "Music That Moves You"
// ];

// const HomePage = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { songs  } = useSelector((state: RootStore) => state.actionSongs);
//   const [coverArts, setCoverArts] = useState<Record<string, string>>({});
//   const [currentTagline, setCurrentTagline] = useState(0);

//   // Extract cover art from audio files
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

//   // Rotate taglines every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTagline((prev) => (prev + 1) % taglines.length);
//     }, 5000);
    
//     return () => clearInterval(interval);
//   }, []);

//   // Get the most recent songs (last 3 added)
//   const recentSongs = songs
//     .slice()
//     .reverse()
//     .slice(0, 3);

//   // Fetch cover arts for the recent songs
//   useEffect(() => {
//     const fetchCoverArts = async () => {
//       const newCovers: Record<string, string> = {};
//       for (const song of recentSongs) {
//         if (song.audioUrl) {
//           newCovers[song.audioUrl] = await extractCoverArt(song.audioUrl);
//         }
//       }
//       setCoverArts(newCovers);
//     };
//     if (recentSongs.length > 0) {
//       fetchCoverArts();
//     }
//   }, [recentSongs]);

//   // Fetch all songs when component mounts
//   useEffect(() => {
//     dispatch(fetchAllSongs());
//   }, [dispatch]);

//   return (
//     <Box sx={{ backgroundColor: "#000", minHeight: "100vh", color: "white", pb: 10 }}>
//       {/* Hero Section */}
//       <HeroSection>
//         <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
//           <motion.div
//             initial={{ opacity: 0, y: -30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <Typography 
//               variant="h2" 
//               fontWeight="bold" 
//               textAlign="left" 
//               sx={{ 
//                 mb: 1,
//                 background: "linear-gradient(90deg, #00BCD4, #4fc3f7)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent"
//               }}
//             >
//               {taglines[currentTagline]}
//             </Typography>
            
//             <Typography 
//               variant="h6" 
//               color="#aaa" 
//               sx={{ mb: 4, maxWidth: "700px", textAlign: "left" }}
//             >
//               Explore a world of sounds, create playlists, and share your music taste with friends. Your perfect soundtrack awaits.
//             </Typography>
            
//             <DiscoverButton 
//               startIcon={<HeadphonesIcon />}
//               size="large"
//             >
//               Start Exploring
//             </DiscoverButton>
//           </motion.div>
//         </Container>
//       </HeroSection>

//       {/* Search Section */}
//       <Container maxWidth="lg" sx={{ mt: -5, position: "relative", zIndex: 2 }}>
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.6 }}
//         >
//           <SearchBar />
//         </motion.div>
//       </Container>

//       {/* Category List */}
//       <Container maxWidth="lg" sx={{ mt: 6 }}>
//         <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, textAlign: "left" }}>
//           Browse Categories
//         </Typography>
//         <motion.div 
//           initial={{ opacity: 0 }} 
//           animate={{ opacity: 1 }} 
//           transition={{ delay: 0.5 }}
//         >
//           <CategoryList />
//         </motion.div>
//       </Container>

//       {/* Songs List */}
//       <Container maxWidth="lg" sx={{ mt: 6 }}>
//         <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, textAlign: "left" }}>
//           All Songs
//         </Typography>
//         <SongsList />
//       </Container>

//       {/* Latest Releases Section */}
//       <Container maxWidth="lg" sx={{ mt: 8 }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//           <Typography variant="h4" fontWeight="bold" color="white">
//             Latest Releases
//           </Typography>
//           <Chip 
//             label="Hot & Fresh" 
//             color="error" 
//             size="medium" 
//             icon={<FavoriteIcon />} 
//             sx={{ fontWeight: "bold" }} 
//           />
//         </Box>
        
//         <Divider sx={{ mb: 4, backgroundColor: "#333" }} />
        
//         <Grid container spacing={4} justifyContent="flex-start">
//           {recentSongs.map((song, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <FeatureCard>
//                 <CardMedia
//                   component="img"
//                   height="280"
//                   image={coverArts[song.audioUrl] || DEFAULT_COVER}
//                   alt={song.title}
//                   sx={{ 
//                     transition: "all 0.5s ease",
//                     "&:hover": { 
//                       transform: "scale(1.1)", 
//                       filter: "brightness(0.7)" 
//                     }
//                   }}
//                 />
//                 <CardContent sx={{ textAlign: "left", p: 3 }}>
//                   <Typography variant="h5" fontWeight="bold" gutterBottom>
//                     {song.title}
//                   </Typography>
//                   <Typography variant="subtitle1" color="#00BCD4" gutterBottom>
//                     {song.artist}
//                   </Typography>
//                   {/* <Typography variant="body2" color="#aaa" sx={{ mb: 2 }}>
//                     {song.album || "Single Release"} • {new Date().getFullYear()}
//                   </Typography> */}
//                   <Button 
//                     variant="outlined" 
//                     startIcon={<MusicNoteIcon />} 
//                     fullWidth
//                     sx={{ 
//                       borderColor: "#00BCD4", 
//                       color: "#00BCD4",
//                       borderRadius: 50,
//                       "&:hover": {
//                         backgroundColor: "#00BCD4",
//                         color: "white",
//                         borderColor: "#00BCD4"
//                       }
//                     }}
//                   >
//                     Play Now
//                   </Button>
//                 </CardContent>
//               </FeatureCard>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>

//       {/* Features Section */}
//       <Container maxWidth="lg" sx={{ mt: 8 }}>
//         <Typography variant="h4" fontWeight="bold" color="white" textAlign="left" sx={{ mb: 4 }}>
//           Everything You Need
//         </Typography>
        
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6} md={3}>
//             <InfoCard>
//               <AlbumIcon sx={{ fontSize: 50, color: "#00BCD4", mb: 2 }} />
//               <Typography variant="h6" fontWeight="bold" gutterBottom>
//                 Upload Songs
//               </Typography>
//               <Typography variant="body2" color="#aaa" sx={{ mb: 2 }}>
//                 Share your music with the world. Upload high-quality audio files in seconds with our streamlined process.
//               </Typography>
//               <Chip label="Easy Upload" size="small" sx={{ backgroundColor: "#333", color: "white" }} />
//             </InfoCard>
//           </Grid>
          
//           <Grid item xs={12} sm={6} md={3}>
//             <InfoCard>
//               <FavoriteIcon sx={{ fontSize: 50, color: "#00BCD4", mb: 2 }} />
//               <Typography variant="h6" fontWeight="bold" gutterBottom>
//                 Save Favorites
//               </Typography>
//               <Typography variant="body2" color="#aaa" sx={{ mb: 2 }}>
//                 Create your personal collection. Save tracks that move you and access them anytime, anywhere.
//               </Typography>
//               <Chip label="One Click" size="small" sx={{ backgroundColor: "#333", color: "white" }} />
//             </InfoCard>
//           </Grid>
          
//           <Grid item xs={12} sm={6} md={3}>
//             <InfoCard>
//               <MusicNoteIcon sx={{ fontSize: 50, color: "#00BCD4", mb: 2 }} />
//               <Typography variant="h6" fontWeight="bold" gutterBottom>
//                 Manage Library
//               </Typography>
//               <Typography variant="body2" color="#aaa" sx={{ mb: 2 }}>
//                 Full control over your music. Edit metadata, organize by genre, and keep your collection pristine.
//               </Typography>
//               <Chip label="Total Control" size="small" sx={{ backgroundColor: "#333", color: "white" }} />
//             </InfoCard>
//           </Grid>
          
//           <Grid item xs={12} sm={6} md={3}>
//             <InfoCard>
//               <HeadphonesIcon sx={{ fontSize: 50, color: "#00BCD4", mb: 2 }} />
//               <Typography variant="h6" fontWeight="bold" gutterBottom>
//                 Create Playlists
//               </Typography>
//               <Typography variant="body2" color="#aaa" sx={{ mb: 2 }}>
//                 Curate the perfect soundtrack for any mood or occasion. Build and share custom playlists with friends.
//               </Typography>
//               <Chip label="Share Music" size="small" sx={{ backgroundColor: "#333", color: "white" }} />
//             </InfoCard>
//           </Grid>
//         </Grid>
//       </Container>
      
//       {/* Call to Action */}
//       <Container maxWidth="md" sx={{ mt: 10, textAlign: "center" }}>
//         <Box sx={{ 
//           backgroundColor: "#111", 
//           borderRadius: 4, 
//           p: 6, 
//           backgroundImage: "linear-gradient(135deg, rgba(0, 188, 212, 0.1) 0%, rgba(0, 0, 0, 0) 100%)",
//           boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)"
//         }}>
//           <Typography variant="h3" fontWeight="bold" gutterBottom>
//             Ready to Dive In?
//           </Typography>
//           <Typography variant="body1" color="#aaa" sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
//             Join thousands of music lovers discovering new sounds every day. 
//             Upload your first track or create your first playlist in seconds.
//           </Typography>
//           <DiscoverButton 
//             size="large" 
//             sx={{ px: 4, py: 1.5, fontSize: 18 }}
//           >
//             Get Started Now
//           </DiscoverButton>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default HomePage;





"use client"
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react"
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Divider, Chip, Button } from "@mui/material"
import { styled } from "@mui/system"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootStore } from "../Stores/songStore"
import { fetchAllSongs } from "../Slices/actionSongSlice"
import { parseBlob } from "music-metadata-browser"
// import Header from "./Header";
import CategoryList from "./CategoryList"
import SongsList from "./SongsList"
import SearchBar from "./SearchBar"
import { motion } from "framer-motion"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import HeadphonesIcon from "@mui/icons-material/Headphones"
import AlbumIcon from "@mui/icons-material/Album"
import FavoriteIcon from "@mui/icons-material/Favorite"

// Enhanced styled components with teal instead of green
const FeatureCard = styled(Card)(() => ({
  backgroundColor: "#222",
  color: "white",
  borderRadius: 16,
  transition: "all 0.4s ease",
  cursor: "pointer",
  overflow: "hidden",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 188, 212, 0.3)",
  },
}))

const InfoCard = styled(Card)(() => ({
  backgroundColor: "#222",
  color: "white",
  borderRadius: 16,
  padding: "20px",
  textAlign: "center",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
  height: "100%",
  transition: "all 0.4s ease",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 188, 212, 0.3)",
    backgroundColor: "#282828",
  },
}))

const DiscoverButton = styled(Button)(() => ({
  backgroundColor: "#00BCD4",
  color: "white",
  borderRadius: 50,
  padding: "10px 20px",
  fontWeight: "bold",
  marginTop: 20,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#26C6DA",
    transform: "scale(1.05)",
    boxShadow: "0 5px 15px rgba(0, 188, 212, 0.4)",
  },
}))

const HeroSection = styled(Box)(() => ({
  background: "linear-gradient(180deg, #000000 0%, #121212 100%)",
  padding: "80px 0 40px 0",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: "radial-gradient(circle at 30% 50%, rgba(0, 188, 212, 0.1) 0%, transparent 60%)",
    zIndex: 0,
  },
}))

const DEFAULT_COVER = "https://via.placeholder.com/300?text=No+Cover"

// Array of taglines for the rotating text
const taglines = [
  "Discover Music Without Limits",
  "Your Sound, Your World",
  "Unleash Your Musical Journey",
  "Every Beat Matters",
  "Music That Moves You",
]
const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { songs } = useSelector((state: RootStore) => state.actionSongs)
  const [coverArts, setCoverArts] = useState<Record<string, string>>({})
  const [currentTagline, setCurrentTagline] = useState(0)

  // Reference to the songs list section for scrolling
  const songsListRef = useRef<HTMLDivElement>(null)

  // Function to scroll to songs list
  const scrollToSongsList = () => {
    setTimeout(() => {
      if (songsListRef.current) {
        songsListRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }, 300)
  }

  // Extract cover art from audio files
  const extractCoverArt = async (fileUrl: string) => {
    try {
      const response = await fetch(fileUrl)
      const blob = await response.blob()
      const metadata = await parseBlob(blob)

      if (metadata.common.picture?.length) {
        const cover = metadata.common.picture[0]
        return `data:${cover.format};base64,${btoa(
          new Uint8Array(cover.data).reduce((data, byte) => data + String.fromCharCode(byte), ""),
        )}`
      }
    } catch (error) {
      console.error("Error extracting cover art:", error)
    }
    return DEFAULT_COVER
  }

  // Rotate taglines every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Get the most recent songs (last 3 added)
  const recentSongs = songs.slice().reverse().slice(0, 3)

  // Fetch cover arts for the recent songs
  useEffect(() => {
    const fetchCoverArts = async () => {
      const newCovers: Record<string, string> = {}
      for (const song of recentSongs) {
        if (song.audioUrl) {
          newCovers[song.audioUrl] = await extractCoverArt(song.audioUrl)
        }
      }
      setCoverArts(newCovers)
    }
    if (recentSongs.length > 0) {
      fetchCoverArts()
    }
  }, [recentSongs])

  // Fetch all songs when component mounts
  useEffect(() => {
    dispatch(fetchAllSongs())
  }, [dispatch])

  return (
    <Box sx={{ backgroundColor: "#000", minHeight: "100vh", color: "white", pb: 10 }}>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Typography
              variant="h2"
              fontWeight="bold"
              textAlign="left"
              sx={{
                mb: 1,
                background: "linear-gradient(90deg, #00BCD4, #4fc3f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {taglines[currentTagline]}
            </Typography>

            <Typography variant="h6" color="#aaa" sx={{ mb: 4, maxWidth: "700px", textAlign: "left" }}>
              Explore a world of sounds, create playlists, and share your music taste with friends. Your perfect
              soundtrack awaits.
            </Typography>

            <DiscoverButton startIcon={<HeadphonesIcon />} size="large"  onClick={() => navigate("register/")}
            >
              Start Exploring
            </DiscoverButton>
          </motion.div>
        </Container>
      </HeroSection>

      {/* Search Section */}
      <Container maxWidth="lg" sx={{ mt: -5, position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <SearchBar onSearchComplete={scrollToSongsList} />
        </motion.div>
      </Container>

      {/* Category List */}
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, textAlign: "left" }}>
          Browse Categories
        </Typography>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <CategoryList onCategorySelect={scrollToSongsList} />
        </motion.div>
      </Container>

      {/* Songs List */}
      <Container maxWidth="lg" sx={{ mt: 6 }} ref={songsListRef}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, textAlign: "left" }}>
          All Songs
        </Typography>
        <SongsList />
      </Container>

      {/* Latest Releases Section */}
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h4" fontWeight="bold" color="white">
            Latest Releases
          </Typography>
          <Chip label="Hot & Fresh" color="error" size="medium" icon={<FavoriteIcon />} sx={{ fontWeight: "bold" }} />
        </Box>

        <Divider sx={{ mb: 4, backgroundColor: "#333" }} />

        <Grid container spacing={4} justifyContent="flex-start">
          {recentSongs.map((song, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <FeatureCard>
                <CardMedia
                  component="img"
                  height="280"
                  image={coverArts[song.audioUrl] || DEFAULT_COVER}
                  alt={song.title}
                  sx={{
                    transition: "all 0.5s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                      filter: "brightness(0.7)",
                    },
                  }}
                  onClick={() => navigate(`/${song.id}`)}
                />
                <CardContent sx={{ textAlign: "left", p: 3 }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {song.title}
                  </Typography>
                  <Typography variant="subtitle1" color="#00BCD4" gutterBottom>
                    {song.artist}
                  </Typography>
                  {/* <Typography variant="body2" color="#aaa" sx={{ mb: 2 }}>
                    {song.album || "Single Release"} • {new Date().getFullYear()}
                  </Typography> */}
                  <Button
                    //  onClick={() => navigate(`/player/${song.id}`)}
                   
                     
                    variant="outlined"
                    startIcon={<MusicNoteIcon />}
                    fullWidth
                    sx={{
                      borderColor: "#00BCD4",
                      color: "#00BCD4",
                      borderRadius: 50,
                      "&:hover": {
                        backgroundColor: "#00BCD4",
                        color: "white",
                        borderColor: "#00BCD4",
                      },
                    }}
                  >
                    Play Now
                    
                  </Button>
                </CardContent>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography variant="h4" fontWeight="bold" color="white" textAlign="left" sx={{ mb: 4 }}>
          Everything You Need
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <InfoCard>
              <AlbumIcon sx={{ fontSize: 50, color: "#00BCD4", mb: 2 }} />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Upload Songs
              </Typography>
              <Typography variant="body2" color="#aaa" sx={{ mb: 2 }}>
                Share your music with the world. Upload high-quality audio files in seconds with our streamlined
                process.
              </Typography>
              <Chip label="Easy Upload" size="small" sx={{ backgroundColor: "#333", color: "white" }} />
            </InfoCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <InfoCard>
              <FavoriteIcon sx={{ fontSize: 50, color: "#00BCD4", mb: 2 }} />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Save Favorites
              </Typography>
              <Typography variant="body2" color="#aaa" sx={{ mb: 2 }}>
                Create your personal collection. Save tracks that move you and access them anytime, anywhere.
              </Typography>
              <Chip label="One Click" size="small" sx={{ backgroundColor: "#333", color: "white" }} />
            </InfoCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <InfoCard>
              <MusicNoteIcon sx={{ fontSize: 50, color: "#00BCD4", mb: 2 }} />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Manage Library
              </Typography>
              <Typography variant="body2" color="#aaa" sx={{ mb: 2 }}>
                Full control over your music. Edit metadata, organize by genre, and keep your collection pristine.
              </Typography>
              <Chip label="Total Control" size="small" sx={{ backgroundColor: "#333", color: "white" }} />
            </InfoCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <InfoCard>
              <HeadphonesIcon sx={{ fontSize: 50, color: "#00BCD4", mb: 2 }} />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Create Playlists
              </Typography>
              <Typography variant="body2" color="#aaa" sx={{ mb: 2 }}>
                Curate the perfect soundtrack for any mood or occasion. Build and share custom playlists with friends.
              </Typography>
              <Chip label="Share Music" size="small" sx={{ backgroundColor: "#333", color: "white" }} />
            </InfoCard>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action */}
      <Container maxWidth="md" sx={{ mt: 10, textAlign: "center" }}>
        <Box
          sx={{
            backgroundColor: "#111",
            borderRadius: 4,
            p: 6,
            backgroundImage: "linear-gradient(135deg, rgba(0, 188, 212, 0.1) 0%, rgba(0, 0, 0, 0) 100%)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Ready to Dive In?
          </Typography>
          <Typography variant="body1" color="#aaa" sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
            Join thousands of music lovers discovering new sounds every day. Upload your first track or create your
            first playlist in seconds.
          </Typography>
          <DiscoverButton size="large" sx={{ px: 4, py: 1.5, fontSize: 18 }}  onClick={() => navigate("register/")}>
            Get Started Now
            
          </DiscoverButton>
        </Box>
      </Container>
    </Box>
  )
}

export default HomePage






























