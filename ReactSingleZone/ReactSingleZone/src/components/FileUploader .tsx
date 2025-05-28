
"use client"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import {
  Box,
  Button,
  CircularProgress,
  Container,
  createTheme,
  CssBaseline,
  Divider,
  Grid,
  InputAdornment,
  Paper,
  Snackbar,
  TextField,
  ThemeProvider,
  Typography,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import AudiotrackIcon from "@mui/icons-material/Audiotrack"
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic"
import CategoryIcon from "@mui/icons-material/Category"

import type { AppDispatch, RootStore } from "../Stores/songStore"
import { fetchCategories, selectCategories } from "../Slices/SongSlice"
import api from "./api"

// Custom theme with black background and turquoise accents
const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#20B2AA", // Turquoise
    },
    secondary: {
      main: "#80CBC4", // Lighter turquoise
    },
    background: {
      default: "#000000", // Pure black for page background
      paper: "#121212", // Dark gray for components
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0B0",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#20B2AA",
          },
        },
        notchedOutline: {
          borderColor: "#333333",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: "100px",
          backgroundColor: "#000000",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#20B2AA",
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#121212",
          },
        },
      },
    },
  },
})

// Custom styled upload area
const UploadArea = styled("div")<{ isDragActive?: boolean }>(({ theme, isDragActive }) => ({
  border: `2px dashed ${isDragActive ? theme.palette.secondary.main : theme.palette.primary.main}`,
  borderRadius: 8,
  padding: theme.spacing(3),
  textAlign: "center",
  cursor: "pointer",
  backgroundColor: isDragActive ? "rgba(32, 178, 170, 0.15)" : "rgba(32, 178, 170, 0.05)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "rgba(32, 178, 170, 0.1)",
    transform: "scale(1.01)",
  },
}))

const FileUploader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  // Fetch categories from Redux store
  const songsState = useSelector((state: RootStore) => selectCategories(state))
  const { categories, loading, error: categoriesError } = songsState

  // Form states
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [title, setTitle] = useState<string>("")
  const [artist, setArtist] = useState<string>("")
  const [genere, setGenere] = useState<string>("")
  const [tags, setTags] = useState<string>("")
  const [category, setCategory] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDragActive, setIsDragActive] = useState<boolean>(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const uploadAreaRef = useRef<HTMLDivElement>(null)

  // Load categories when component mounts
  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  // Clean up URL object when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  // Set up drag and drop event listeners
  useEffect(() => {
    const uploadArea = uploadAreaRef.current

    if (!uploadArea) return

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragActive(true)
    }

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragActive(true)
    }

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragActive(false)
    }

    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragActive(false)

      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        const droppedFile = e.dataTransfer.files[0]

        // Check if file is audio type
        if (!droppedFile.type.startsWith("audio/")) {
          setError("Please select a valid audio file")
          setOpenSnackbar(true)
          return
        }

        setFile(droppedFile)

        // Create preview URL for audio
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl)
        }

        const newPreviewUrl = URL.createObjectURL(droppedFile)
        setPreviewUrl(newPreviewUrl)

        // Reset any previously set volume issues
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.volume = 1.0

            // Force a reload of the audio element
            audioRef.current.load()
          }
        }, 100)
      }
    }

    uploadArea.addEventListener("dragover", handleDragOver)
    uploadArea.addEventListener("dragenter", handleDragEnter)
    uploadArea.addEventListener("dragleave", handleDragLeave)
    uploadArea.addEventListener("drop", handleDrop)

    return () => {
      uploadArea.removeEventListener("dragover", handleDragOver)
      uploadArea.removeEventListener("dragenter", handleDragEnter)
      uploadArea.removeEventListener("dragleave", handleDragLeave)
      uploadArea.removeEventListener("drop", handleDrop)
    }
  }, [previewUrl])

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]

      // Check if file is audio type
      if (!selectedFile.type.startsWith("audio/")) {
        setError("Please select a valid audio file")
        setOpenSnackbar(true)
        return
      }

      setFile(selectedFile)

      // Create preview URL for audio
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }

      const newPreviewUrl = URL.createObjectURL(selectedFile)
      setPreviewUrl(newPreviewUrl)

      // Reset any previously set volume issues
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.volume = 1.0

          // Force a reload of the audio element
          audioRef.current.load()
        }
      }, 100)
    }
  }

  // Open file selector when clicking upload area
  const handleUploadAreaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Close notification
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  // Handle audio play event
  const handleAudioPlay = () => {
    // Ensure audio is played with volume
    if (audioRef.current) {
      audioRef.current.volume = 1.0

      // This is a workaround for some browsers that might require user interaction
      const playPromise = audioRef.current.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Playback started successfully
          })
          .catch((err) => {
            console.error("Audio playback failed:", err)
            setError("Audio playback failed. Please try again.")
            setOpenSnackbar(true)
          })
      }
    }
  }

  // Upload file and data to server
  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.")
      setOpenSnackbar(true)
      return
    }

    if (!category) {
      setError("Please select a category for the song.")
      setOpenSnackbar(true)
      return
    }

    setError(null)
    setSuccess(null)
    setProgress(0)
    setIsUploading(true)
    setOpenSnackbar(true)

    try {
      // Get presigned URL from server
      const presignedResponse = await api.get("api/upload/presigned-url", {
        params: { fileName: file.name },
      })
      const presignedUrl = presignedResponse.data.url

      // Upload file to server
      await axios.put(presignedUrl, file, {
        headers: { "Content-Type": file.type },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))
          setProgress(percent)
        },
      })
      // Get download URL from server
      const downloadResponse = await api.get(`api/upload/download-url/${file.name}`)
      const audioUrl = downloadResponse.data

      // Save song details to server using original variable names
      await api.post("api/upload/save-song", {
        title,
        artist,
        genere,
        audioUrl,
        tags,
        category,
      })

      setSuccess("Song uploaded successfully!")

      // Reset form
      setTitle("")
      setArtist("")
      setGenere("")
      setTags("")
      setCategory(0)
      setFile(null)
      setProgress(0)

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl(null)
      }
    } catch (err: any) {
      setError(err.response?.data || err.message || "Upload failed.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container maxWidth="md" sx={{ py: 4, minHeight: "100vh" }}>
        <Paper
          elevation={3}
          sx={{
            margin: "30px",
            p: 4,
            borderRadius: 2,
            background: "linear-gradient(145deg, #121212 0%, #1A1A1A 100%)",
            border: "1px solid #333333",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
            <MusicNoteIcon color="primary" fontSize="large" />
            <Typography variant="h4" component="h1" fontWeight="bold" color="text.primary">
              Upload New Song
            </Typography>
          </Box>

          <Divider sx={{ mb: 4, borderColor: "rgba(255, 255, 255, 0.1)" }} />

          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert onClose={handleCloseSnackbar} severity={error ? "error" : "success"} sx={{ width: "100%" }}>
              {error || success}
            </Alert>
          </Snackbar>

          <Grid container spacing={3}>
            {/* File Upload Area */}
            <Grid item xs={12}>
              <UploadArea ref={uploadAreaRef} onClick={handleUploadAreaClick} isDragActive={isDragActive}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <CloudUploadIcon
                    color="primary"
                    sx={{
                      fontSize: 64,
                      mb: 2,
                      animation: isDragActive ? "pulse 1.5s infinite" : "none",
                      "@keyframes pulse": {
                        "0%": {
                          transform: "scale(1)",
                          opacity: 1,
                        },
                        "50%": {
                          transform: "scale(1.1)",
                          opacity: 0.8,
                        },
                        "100%": {
                          transform: "scale(1)",
                          opacity: 1,
                        },
                      },
                    }}
                  />
                  <Typography variant="h6" color="primary" gutterBottom>
                    {file ? `Selected: ${file.name}` : "Drag and drop or click here to select an audio file"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Allowed formats: MP3, WAV, FLAC, or AAC only
                  </Typography>
                </Box>
              </UploadArea>

              {/* Audio preview */}
              {previewUrl && (
                <Box sx={{ mt: 2, p: 2, bgcolor: "rgba(32, 178, 170, 0.05)", borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Preview:
                  </Typography>
                  <audio
                    ref={audioRef}
                    controls
                    src={previewUrl}
                    style={{ width: "100%" }}
                    onPlay={handleAudioPlay}
                    preload="metadata"
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => {
                      if (audioRef.current) {
                        audioRef.current.volume = 1.0
                        audioRef.current.play()
                      }
                    }}
                    sx={{ mt: 1 }}
                  >
                    Play Audio (Force)
                  </Button>
                </Box>
              )}

              {/* Progress bar */}
              {isUploading && (
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <Box sx={{ width: "100%", mr: 1 }}>
                    <Box
                      sx={{
                        width: "100%",
                        backgroundColor: "rgba(255,255,255,0.1)",
                        borderRadius: 1,
                        height: 8,
                        position: "relative",
                      }}
                    >
                      <Box
                        sx={{
                          width: `${progress}%`,
                          backgroundColor: theme.palette.primary.main,
                          position: "absolute",
                          height: "100%",
                          borderRadius: 1,
                          transition: "width 0.3s ease",
                        }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">{`${progress}%`}</Typography>
                  </Box>
                </Box>
              )}
            </Grid>

            {/* Title */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Song Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AudiotrackIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Artist */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MusicNoteIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Genre - Simple TextField instead of Select */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Genre"
                value={genere}
                onChange={(e) => setGenere(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LibraryMusicIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Category - Changed to Select dropdown with real categories from Redux */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Category</InputLabel>
                <Select
                  value={category || ""}
                  onChange={(e) => setCategory(Number(e.target.value))}
                  label="Category"
                  disabled={loading}
                  startAdornment={
                    <InputAdornment position="start">
                      <CategoryIcon color="primary" />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="" disabled>
                    <em>Select a category</em>
                  </MenuItem>
                  {loading ? (
                    <MenuItem disabled>
                      <CircularProgress size={20} />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        Loading categories...
                      </Typography>
                    </MenuItem>
                  ) : categoriesError ? (
                    <MenuItem disabled>
                      <Typography variant="body2" color="error">
                        Error loading categories
                      </Typography>
                    </MenuItem>
                  ) : (
                    categories.map((cat) => (
                      <MenuItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>

            {/* Tags */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Enter tags separated by commas"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LibraryMusicIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Upload Button */}
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleUpload}
                  disabled={isUploading || loading}
                  startIcon={isUploading ? <CircularProgress size={20} color="inherit" /> : <CloudUploadIcon />}
                  sx={{
                    px: 6,
                    py: 1.5,
                    fontSize: "1rem",
                    boxShadow: "0 4px 20px rgba(32, 178, 170, 0.3)",
                    "&:hover": {
                      boxShadow: "0 6px 25px rgba(32, 178, 170, 0.5)",
                    },
                  }}
                >
                  {isUploading ? "Uploading..." : "Upload Song"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  )
}

export default FileUploader
