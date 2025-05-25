

// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../Stores/songStore";
// import { searchSongs } from "../Slices/actionSongSlice";

// import { Box, TextField } from "@mui/material";
// import { useState } from "react";

// const SearchBar: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [query, setQuery] = useState<string>("");

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setQuery(value);

//     if (value.trim().length > 2) {
//       dispatch(searchSongs(value));
//     }
//   };

//   return (
//     <Box sx={{ p: 2 }}>
//       <TextField
//         label="חפש שיר..."
//         variant="outlined"
//         fullWidth
//         value={query}
//         onChange={handleSearch}
//       />
//     </Box>
//   );
// };

// export default SearchBar;
















///עובד נהדר לבן בהיר



// import React, { useState } from 'react';
// import { 
//   Box, 
//   TextField, 
//   InputAdornment, 
//   IconButton,
//   useTheme,
//   useMediaQuery
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../Stores/songStore';
// import { searchSongs } from '../Slices/actionSongSlice';

// const SearchBar: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [query, setQuery] = useState<string>('');
  
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setQuery(value);

//     if (value.trim().length > 2) {
//       dispatch(searchSongs(value));
//     }
//   };

//   const handleSearchSubmit = () => {
//     if (query.trim().length > 2) {
//       dispatch(searchSongs(query));
//     }
//   };

//   return (
// <Box 
//   sx={{ 
//     width: '100%', 
//     maxWidth: isMobile ? '95%' : '80%', 
//     mx: 'auto',
//     mt: 3,
//   }}
// >
//   <TextField
//     fullWidth
//     variant="outlined"
//     placeholder="Search for songs, artists, albums..."
//     value={query}
//     onChange={handleSearch}
//     InputProps={{
//       startAdornment: (
//         <InputAdornment position="start">
//           <SearchIcon sx={{ color: '#888' }} />
//         </InputAdornment>
//       ),
//       sx: {
//         borderRadius: 4,
//         backgroundColor: '#E0E0E0',  // רקע בהיר יותר
//         color: '#000',  // טקסט כהה כדי ליצור ניגודיות
//         border: '1px solid #888',  // גבול אפור בהיר
//         '& .MuiOutlinedInput-notchedOutline': {
//           borderColor: '#888',
//         },
//         '&:hover .MuiOutlinedInput-notchedOutline': {
//           borderColor: '#555',
//         },
//         '& input': {
//           color: '#000',  // טקסט שחור על רקע בהיר
//         },
//       }
//     }}
//   />
// </Box>

//   );
// };

// export default SearchBar;























































// import React, { useState } from 'react';
// import { 
//   Box, 
//   TextField, 
//   InputAdornment, 
//   IconButton,
//   useTheme,
//   useMediaQuery
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../Stores/songStore';
// import { searchSongs } from '../Slices/actionSongSlice';

// const SearchBar: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [query, setQuery] = useState<string>('');
  
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setQuery(value);

//     if (value.trim().length > 2) {
//       dispatch(searchSongs(value));
//     }
//   };

//   const handleSearchSubmit = () => {
//     if (query.trim().length > 2) {
//       dispatch(searchSongs(query));
//     }
//   };

//   return (
//     <Box 
//       sx={{ 
//         width: '100%', 
//         maxWidth: isMobile ? '95%' : '80%', 
//         mx: 'auto',
//         mt: 3,
//         backgroundColor: '#fff',
//         borderRadius: 3,
//         padding: 1.5,
//         boxShadow: 3,
//         border: '1px solid #ddd'
//       }}
//     >
//       <TextField
//         fullWidth
//         variant="outlined"
//         placeholder="Search for songs, artists, albums..."
//         value={query}
//         onChange={handleSearch}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <SearchIcon sx={{ color: '#1DB954' }} />
//             </InputAdornment>
//           ),
//           sx: {
//             borderRadius: 3,
//             backgroundColor: '#fff',
//             color: '#000',
//             border: '1px solid #ddd',
//             '& .MuiOutlinedInput-notchedOutline': {
//               borderColor: '#ddd',
//             },
//             '&:hover .MuiOutlinedInput-notchedOutline': {
//               borderColor: '#1DB954',
//             },
//             '& input': {
//               color: '#000',
//             },
//           }
//         }}
//       />
//     </Box>
//   );
// };

// export default SearchBar;










// import React, { useState, useEffect } from 'react';
// import { 
//   Box, 
//   TextField, 
//   InputAdornment, 
//   IconButton,
//   Typography,
//   Fade,
//   Chip,
//   useTheme,
//   useMediaQuery,
//   Paper
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import SearchIcon from '@mui/icons-material/Search';
// import MicIcon from '@mui/icons-material/Mic';
// import ClearIcon from '@mui/icons-material/Clear';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../Stores/songStore';
// import { searchSongs } from '../Slices/actionSongSlice';

// // Sample trending searches
// const trendingSearches = [
//   "Top Hits 2024", 
//   "Classic Rock", 
//   "Hip Hop Essentials", 
//   "Chill Vibes",
//   "Ambient Dreams",
//   "Summer Playlist"
// ];

// // Styled search container
// const SearchContainer = styled(Paper)(({  }) => ({
//   width: '100%', 
//   padding: '20px 24px',
//   borderRadius: 16,
//   backgroundColor: '#1a1a1a',
//   boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
//   transition: 'all 0.3s ease',
//   border: '1px solid #333',
//   '&:hover': {
//     boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3), 0 0 15px rgba(41, 182, 246, 0.1)',
//     transform: 'translateY(-5px)'
//   }
// }));

// // Styled search field
// const SearchField = styled(TextField)({
//   '& .MuiOutlinedInput-root': {
//     borderRadius: 50,
//     backgroundColor: '#fff',
//     overflow: 'hidden',
//     transition: 'all 0.3s ease',
//     '& fieldset': {
//       borderColor: '#ddd',
//       transition: 'all 0.3s ease',
//     },
//     '&:hover fieldset': {
//       borderColor: '#29B6F6',
//     },
//     '&.Mui-focused fieldset': {
//       borderColor: '#29B6F6',
//       borderWidth: 2,
//     }
//   },
//   '& .MuiInputBase-input': {
//     padding: '14px 20px',
//     fontSize: '1rem',
//     color: '#000',
//   }
// });

// // Styled trend chip
// const TrendChip = styled(Chip)(({  }) => ({
//   margin: '8px 8px 0 0',
//   borderRadius: 20,
//   fontWeight: 'medium',
//   backgroundColor: '#2a2a2a',
//   color: '#ccc',
//   cursor: 'pointer',
//   transition: 'all 0.2s ease',
//   '&:hover': {
//     backgroundColor: '#29B6F6',
//     color: '#fff',
//     transform: 'scale(1.05)'
//   }
// }));

// const SearchBar = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [query, setQuery] = useState<string>('');
//   const [isFocused, setIsFocused] = useState<boolean>(false);
//   const [showTrending, setShowTrending] = useState<boolean>(false);
  
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   // Handle showing trending searches when search is empty and focused
//   useEffect(() => {
//     if (isFocused && query.length === 0) {
//       setShowTrending(true);
//     } else {
//       setShowTrending(false);
//     }
//   }, [isFocused, query]);

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setQuery(value);

//     if (value.trim().length > 2) {
//       dispatch(searchSongs(value));
//     }
//   };

//   const handleSearchSubmit = () => {
//     if (query.trim().length > 2) {
//       dispatch(searchSongs(query));
//     }
//   };
  
//   const handleClear = () => {
//     setQuery('');
//   };
  
//   const handleTrendingClick = (trend: string) => {
//     setQuery(trend);
//     dispatch(searchSongs(trend));
//   };

//   return (
//     <SearchContainer elevation={5}>
//       <Box sx={{ position: 'relative' }}>
//         <SearchField
//           fullWidth
//           variant="outlined"
//           placeholder="Search for songs, artists, albums..."
//           value={query}
//           onChange={handleSearch}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setTimeout(() => setIsFocused(false), 200)}
//           onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon sx={{ 
//                   color: query.length > 0 ? '#29B6F6' : '#777',
//                   fontSize: 24,
//                   mx: 1
//                 }} />
//               </InputAdornment>
//             ),
//             endAdornment: (
//               <InputAdornment position="end">
//                 {query.length > 0 ? (
//                   <IconButton 
//                     onClick={handleClear}
//                     sx={{ color: '#777' }}
//                   >
//                     <ClearIcon />
//                   </IconButton>
//                 ) : (
//                   <IconButton 
//                     sx={{ 
//                       color: '#29B6F6',
//                       '&:hover': {
//                         backgroundColor: 'rgba(41, 182, 246, 0.1)'
//                       }
//                     }}
//                   >
//                     <MicIcon />
//                   </IconButton>
//                 )}
//               </InputAdornment>
//             )
//           }}
//         />
        
//         {!isMobile && (
//           <Fade in={showTrending} timeout={300}>
//             <Box 
//               sx={{ 
//                 display: showTrending ? 'block' : 'none',
//                 mt: 2
//               }}
//             >
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                 <TrendingUpIcon sx={{ color: '#999', mr: 1, fontSize: 18 }} />
//                 <Typography variant="body2" color="#999" fontWeight="medium">
//                   Trending Searches
//                 </Typography>
//               </Box>
              
//               <Box>
//                 {trendingSearches.map((trend, index) => (
//                   <TrendChip 
//                     key={index}
//                     label={trend}
//                     onClick={() => handleTrendingClick(trend)}
//                     size="medium"
//                   />
//                 ))}
//               </Box>
//             </Box>
//           </Fade>
//         )}
//       </Box>
      
//       <Typography 
//         variant="body2" 
//         color="#666" 
//         sx={{ 
//           mt: 2, 
//           textAlign: isMobile ? 'center' : 'left',
//           fontSize: '0.8rem'
//         }}
//       >
//         {isMobile ? 
//           "Try searching for songs, artists or genres" : 
//           "Pro tip: Use quotes for exact matches, add '-' to exclude terms, or '+' to prioritize. Example: \"Summer Hits\" -remix +2024"
//         }
//       </Typography>
      
//       <Typography 
//         variant="body2" 
//         color="#29B6F6" 
//         sx={{ 
//           mt: 1,
//           textAlign: 'right',
//           fontSize: '0.8rem',
//           fontStyle: 'italic'
//         }}
//       >
//         Discover your next favorite track from our constantly updated library
//       </Typography>
//     </SearchContainer>
//   );
// };

// export default SearchBar;




"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Fade,
  Chip,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import SearchIcon from "@mui/icons-material/Search"
import MicIcon from "@mui/icons-material/Mic"
import ClearIcon from "@mui/icons-material/Clear"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../Stores/songStore"
import { searchSongs } from "../Slices/actionSongSlice"

// Sample trending searches
const trendingSearches = [
  "Top Hits 2024",
  "Classic Rock",
  "Hip Hop Essentials",
  "Chill Vibes",
  "Ambient Dreams",
  "Summer Playlist",
]

// Styled search container
const SearchContainer = styled(Paper)(({}) => ({
  width: "100%",
  padding: "20px 24px",
  borderRadius: 16,
  backgroundColor: "#1a1a1a",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
  transition: "all 0.3s ease",
  border: "1px solid #333",
  "&:hover": {
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3), 0 0 15px rgba(41, 182, 246, 0.1)",
    transform: "translateY(-5px)",
  },
}))

// Styled search field
const SearchField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: 50,
    backgroundColor: "#fff",
    overflow: "hidden",
    transition: "all 0.3s ease",
    "& fieldset": {
      borderColor: "#ddd",
      transition: "all 0.3s ease",
    },
    "&:hover fieldset": {
      borderColor: "#29B6F6",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#29B6F6",
      borderWidth: 2,
    },
  },
  "& .MuiInputBase-input": {
    padding: "14px 20px",
    fontSize: "1rem",
    color: "#000",
  },
})

// Styled trend chip
const TrendChip = styled(Chip)(({}) => ({
  margin: "8px 8px 0 0",
  borderRadius: 20,
  fontWeight: "medium",
  backgroundColor: "#2a2a2a",
  color: "#ccc",
  cursor: "pointer",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "#29B6F6",
    color: "#fff",
    transform: "scale(1.05)",
  },
}))

interface SearchBarProps {
  onSearchComplete?: () => void
}

const SearchBar = ({ onSearchComplete }: SearchBarProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const [query, setQuery] = useState<string>("")
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [showTrending, setShowTrending] = useState<boolean>(false)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  // Handle showing trending searches when search is empty and focused
  useEffect(() => {
    if (isFocused && query.length === 0) {
      setShowTrending(true)
    } else {
      setShowTrending(false)
    }
  }, [isFocused, query])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setQuery(value)

    if (value.trim().length > 2) {
      dispatch(searchSongs(value))
      // Scroll to songs list after search
      if (onSearchComplete) {
        onSearchComplete()
      }
    }
  }

  const handleSearchSubmit = () => {
    if (query.trim().length > 2) {
      dispatch(searchSongs(query))
      // Scroll to songs list after search
      if (onSearchComplete) {
        onSearchComplete()
      }
    }
  }

  const handleClear = () => {
    setQuery("")
  }

  const handleTrendingClick = (trend: string) => {
    setQuery(trend)
    dispatch(searchSongs(trend))
    // Scroll to songs list after clicking a trending search
    if (onSearchComplete) {
      onSearchComplete()
    }
  }

  return (
    <SearchContainer elevation={5}>
      <Box sx={{ position: "relative" }}>
        <SearchField
          fullWidth
          variant="outlined"
          placeholder="Search for songs, artists, albums..."
          value={query}
          onChange={handleSearch}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyPress={(e) => e.key === "Enter" && handleSearchSubmit()}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{
                    color: query.length > 0 ? "#29B6F6" : "#777",
                    fontSize: 24,
                    mx: 1,
                  }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {query.length > 0 ? (
                  <IconButton onClick={handleClear} sx={{ color: "#777" }}>
                    <ClearIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    sx={{
                      color: "#29B6F6",
                      "&:hover": {
                        backgroundColor: "rgba(41, 182, 246, 0.1)",
                      },
                    }}
                  >
                    <MicIcon />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />

        {!isMobile && (
          <Fade in={showTrending} timeout={300}>
            <Box
              sx={{
                display: showTrending ? "block" : "none",
                mt: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <TrendingUpIcon sx={{ color: "#999", mr: 1, fontSize: 18 }} />
                <Typography variant="body2" color="#999" fontWeight="medium">
                  Trending Searches
                </Typography>
              </Box>

              <Box>
                {trendingSearches.map((trend, index) => (
                  <TrendChip key={index} label={trend} onClick={() => handleTrendingClick(trend)} size="medium" />
                ))}
              </Box>
            </Box>
          </Fade>
        )}
      </Box>

      <Typography
        variant="body2"
        color="#666"
        sx={{
          mt: 2,
          textAlign: isMobile ? "center" : "left",
          fontSize: "0.8rem",
        }}
      >
        {isMobile
          ? "Try searching for songs, artists or genres"
          : "Pro tip: Use quotes for exact matches, add '-' to exclude terms, or '+' to prioritize. Example: \"Summer Hits\" -remix +2024"}
      </Typography>

      <Typography
        variant="body2"
        color="#29B6F6"
        sx={{
          mt: 1,
          textAlign: "right",
          fontSize: "0.8rem",
          fontStyle: "italic",
        }}
      >
        Discover your next favorite track from our constantly updated library
      </Typography>
    </SearchContainer>
  )
}

export default SearchBar
