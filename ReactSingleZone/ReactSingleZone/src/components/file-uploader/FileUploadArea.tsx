"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Box, Button, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"

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

interface FileUploadAreaProps {
  file: File | null
  onFileSelect: (file: File) => void
  onError: (error: string) => void
  progress: number
  isUploading: boolean
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({ file, onFileSelect, onError, progress, isUploading }) => {
  const [isDragActive, setIsDragActive] = useState<boolean>(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const uploadAreaRef = useRef<HTMLDivElement>(null)

  // Clean up URL object when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  // Update preview when file changes
  useEffect(() => {
    if (file) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
      const newPreviewUrl = URL.createObjectURL(file)
      setPreviewUrl(newPreviewUrl)

      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.volume = 1.0
          audioRef.current.load()
        }
      }, 100)
    } else {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl(null)
      }
    }
  }, [file])

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
        handleFileValidation(droppedFile)
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
  }, [])

  const handleFileValidation = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("audio/")) {
      onError("Please select a valid audio file")
      return
    }
    onFileSelect(selectedFile)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      handleFileValidation(selectedFile)
    }
  }

  const handleUploadAreaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleAudioPlay = () => {
    if (audioRef.current) {
      audioRef.current.volume = 1.0
      const playPromise = audioRef.current.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Playback started successfully
          })
          .catch((err) => {
            console.error("Audio playback failed:", err)
            onError("Audio playback failed. Please try again.")
          })
      }
    }
  }

  return (
    <>
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
                  backgroundColor: "#20B2AA",
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
    </>
  )
}

export default FileUploadArea
