// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../Stores/songStore";  
// import { addPlaylist } from "../Slices/playlistSlice";  // import the function for adding playlist
// import { Box, Button, TextField, Typography } from "@mui/material";
// const user = JSON.parse(sessionStorage.getItem("user") || "null");
// const userId = user?.id;
// const AddPlaylist: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [playlistName, setPlaylistName] = useState<string>("");
//   const [error, setError] = useState<string | null>(null);
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setPlaylistName(event.target.value);
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     if (playlistName.trim() === "") {
//       setError("Playlist name is required");
//       return;
//     }
//     try {
//       console.log("Sending playlist:", { name: playlistName, userId:userId});

//       await dispatch(addPlaylist({ name: playlistName, userId: userId }));  // assuming userId is 1 for now
//       setPlaylistName("");  // Clear input field after successful addition
//       setError(null);  // Reset error if successful
//     } catch (err) {
//       setError("Failed to add playlist. Please try again.");
//     }
//   };

//   return (
//     <Box sx={{ padding: 3, maxWidth: 400, margin: "0 auto", backgroundColor: "#f4f4f4", borderRadius: 2 }}>
//       <Typography variant="h6" gutterBottom>Add a New Playlist</Typography>
//       {error && <Typography variant="body2" color="error">{error}</Typography>}
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Playlist Name"
//           variant="outlined"
//           fullWidth
//           value={playlistName}
//           onChange={handleChange}
//           sx={{ marginBottom: 2 }}
//         />
//         <Button variant="contained" type="submit" fullWidth>
//           Add Playlist
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default AddPlaylist;








"use client"

import type React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"

import { Box, Button, TextField, Typography } from "@mui/material"
import { AppDispatch } from "../Stores/songStore"
import { addPlaylist } from "../Slices/playlistSlice"

const user = JSON.parse(sessionStorage.getItem("user") || "null")
const userId = user?.id

const AddPlaylist: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [playlistName, setPlaylistName] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (playlistName.trim() === "") {
      setError("Playlist name is required")
      return
    }
    try {
      console.log("Sending playlist:", { name: playlistName, userId: userId })

      await dispatch(addPlaylist({ name: playlistName, userId: userId }))
      setPlaylistName("")
      setError(null)
    } catch (err) {
      setError("Failed to add playlist. Please try again.")
    }
  }

  return (
    <Box
      sx={{
        padding: 3,
        maxWidth: 400,
        margin: "0 auto",
        backgroundColor: "#000000",
        borderRadius: 2,
        border: "2px solid #00bcd4",
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ color: "#00bcd4" }}>
        Add a New Playlist
      </Typography>
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Playlist Name"
          variant="outlined"
          fullWidth
          value={playlistName}
          onChange={handleChange}
          sx={{
            marginBottom: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#00bcd4",
              },
              "&:hover fieldset": {
                borderColor: "#00bcd4",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#00bcd4",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#00bcd4",
            },
            "& .MuiOutlinedInput-input": {
              color: "#00bcd4",
            },
          }}
        />
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            backgroundColor: "#00bcd4",
            color: "#000000",
            "&:hover": {
              backgroundColor: "#00acc1",
            },
          }}
        >
          Add Playlist
        </Button>
      </form>
    </Box>
  )
}

export default AddPlaylist
