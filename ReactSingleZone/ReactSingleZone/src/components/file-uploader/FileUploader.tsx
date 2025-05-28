"use client"

import type React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import {
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Divider,
  Grid,
  Paper,
  Snackbar,
  ThemeProvider,
  Typography,
  Alert,
} from "@mui/material"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"

import type { AppDispatch, RootStore } from "../../Stores/songStore"
import { fetchCategories, selectCategories } from "../../Slices/SongSlice"
import api from "../api"
import FileUploadArea from "./FileUploadArea"
import SongDetailsForm from "./SongDetailsForm"
import { fileUploaderTheme } from "./theme"

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

  // Load categories when component mounts
  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile)
  }

  const handleError = (errorMessage: string) => {
    setError(errorMessage)
    setOpenSnackbar(true)
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
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
    } catch (err: any) {
      setError(err.response?.data || err.message || "Upload failed.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <ThemeProvider theme={fileUploaderTheme}>
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
              <FileUploadArea
                file={file}
                onFileSelect={handleFileSelect}
                onError={handleError}
                progress={progress}
                isUploading={isUploading}
              />
            </Grid>

            {/* Song Details Form */}
            <Grid item xs={12}>
              <SongDetailsForm
                title={title}
                artist={artist}
                genere={genere}
                tags={tags}
                category={category}
                categories={categories}
                loading={loading}
                categoriesError={categoriesError}
                onTitleChange={setTitle}
                onArtistChange={setArtist}
                onGenereChange={setGenere}
                onTagsChange={setTags}
                onCategoryChange={setCategory}
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
