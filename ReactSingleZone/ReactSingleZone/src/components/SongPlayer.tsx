// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Box, Typography, Button } from "@mui/material";
// import { useParams } from "react-router-dom";
// import { parseBlob } from "music-metadata-browser";
// import { RootStore } from "../Stores/songStore";
// import FileDownloadIcon from '@mui/icons-material/FileDownload';

// const DEFAULT_COVER = "https://via.placeholder.com/300?text=No+Cover";

// const SongPlayer: React.FC = () => {
//   const { id } = useParams();
//   const { filteredSongs } = useSelector((state: RootStore) => state.actionSongs);
//   const song = filteredSongs.find((s) => s.id === Number(id));
//   const [coverArt, setCoverArt] = useState<string>(DEFAULT_COVER);
//   // const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);

//   useEffect(() => {
//     const extractCoverArt = async () => {
//       if (!song || !song.audioUrl) return;
//       try {
//         const response = await fetch(song.audioUrl);
//         const blob = await response.blob();
//         const metadata = await parseBlob(blob);
//         if (metadata.common.picture && metadata.common.picture.length > 0) {
//           const cover = metadata.common.picture[0];
//           setCoverArt(
//             `data:${cover.format};base64,${btoa(
//               new Uint8Array(cover.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
//             )}`
//           );
//         }
//       } catch (error) {
//         console.error("Error extracting cover art:", error);
//       }
//     };

//     extractCoverArt();
//   }, [song]);

//   const handleDownload = () => {
//     if (song && song.audioUrl) {
//       const link = document.createElement('a');
//       link.href = song.audioUrl;
//       link.download = `${song.title}.mp3`;
//       link.click();
//     }
//   };

//   if (!song) {
//     return <Typography>שיר לא נמצא</Typography>;
//   }

//   return (
//     <Box 
//       sx={{ 
//         display: "flex", 
//         flexDirection: "column", 
//         alignItems: "center", 
//         p: 4, 
//         height: "100vh", 
//         justifyContent: "center", 
//         backgroundColor:"black",
//       }}
//     >
//       <Box sx={{ textAlign: "center", mb: 3 }}>
//         <Typography variant="h4"  color="white" >{song.title}</Typography>
//         <Typography variant="h6" color="white">
//         {song.artist}
//         </Typography>
//       </Box>

//       <Box 
//         sx={{ 
//           width: "100%", 
//           maxWidth: 500, 
//           mb: 3,
//           boxShadow: 3,
//           borderRadius: 2,
//           overflow: "hidden"
//         }}
//       >
//         <img
//           src={coverArt}
//           alt="עטיפת השיר"
//           style={{ 
//             width: "100%", 
//             height: "auto", 
//             objectFit: "cover" 
//           }}
//         />
//       </Box>

//       <Box 
//         sx={{ 
//           width: "100%", 
//           display: "flex", 
//           flexDirection: "column", 
//           alignItems: "center" 
//         }}
//       >
//         <audio 
//           controls 
//           style={{ 
//             width: "100%", 
//             maxWidth: 600 
//           }}
//         >
//           <source src={song.audioUrl} type="audio/mp3" />
//           הדפדפן שלך לא תומך בניגון שמע.
//         </audio>

//         <Button 
//           variant="contained" 
//           startIcon={<FileDownloadIcon />}
//           onClick={handleDownload}
//           sx={{ mt: 2 }}
//         >
//           הורד שיר
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default SongPlayer;


"use client"

import { useRef } from "react"

import type React from "react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { parseBlob } from "music-metadata-browser"
import type { RootStore } from "../Stores/songStore"
import FileDownloadIcon from "@mui/icons-material/FileDownload"
import DescriptionIcon from "@mui/icons-material/Description"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import LyricsIcon from "@mui/icons-material/Lyrics"
import EqualizerIcon from "@mui/icons-material/Equalizer"
import TranslateIcon from "@mui/icons-material/Translate"
// Import the translation service
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Fade,
  Slide,
  useMediaQuery,
  useTheme,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
} from "@mui/material"
// import { translateText } from "../Slices/translation-service"

const DEFAULT_COVER = "https://via.placeholder.com/300?text=No+Cover"

// Custom colors
const COLORS = {
  primary: "#00bcd4", // Cyan
  primaryDark: "#008ba3",
  primaryLight: "#62efff",
  secondary: "#00838f", // Darker cyan
  background: "#121212", // Black
  backgroundLight: "#1e1e1e",
  text: "#ffffff",
  textSecondary: "rgba(255,255,255,0.7)",
  border: "rgba(0,188,212,0.3)",
}

const SongPlayer: React.FC = () => {
  const { id } = useParams()
  const { filteredSongs, songs } = useSelector((state: RootStore) => state.actionSongs)
  // חפש תחילה ב-filteredSongs, ואז ב-songs הרגיל אם לא נמצא
  const song = filteredSongs.find((s) => s.id === Number(id)) || songs.find((s) => s.id === Number(id))
  // const { filteredSongs } = useSelector((state: RootStore) => state.actionSongs)
  // const song = filteredSongs.find((s) => s.id === Number(id))
  const [coverArt, setCoverArt] = useState<string>(DEFAULT_COVER)
  const [transcription, setTranscription] = useState<string>("")
  const [translatedText, setTranslatedText] = useState<string>("")
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false)
  const [isTranslating, setIsTranslating] = useState<boolean>(false)
  const [showLyrics, setShowLyrics] = useState<boolean>(false)
  const [language, setLanguage] = useState<string>("original")
  const [downloadProgress, setDownloadProgress] = useState<number>(0)
  const [isDownloading, setIsDownloading] = useState<boolean>(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)

  const formatLyrics = (text: string) => {
    if (!text) return ""
    
    // First, let's try to identify and structure the song better
    const formattedText = text

    // Split by double line breaks first to identify major sections
    const sections = formattedText.split(/\n\s*\n/)

    const processedSections = sections.map((section, index) => {
      // Check if this section already has structure markers
      if (section.includes("[Verse") || section.includes("[Chorus") || section.includes("[Bridge")) {
        return section
      }

      // Try to identify if this is likely a chorus (repeated content)
      const isLikelyChorus =
        sections.filter((s) => s.toLowerCase().replace(/\s+/g, "") === section.toLowerCase().replace(/\s+/g, ""))
          .length > 1

      // Add structure markers
      let sectionHeader = ""
      if (isLikelyChorus && !section.includes("[Chorus]")) {
        sectionHeader = "[Chorus]\n"
      } else if (index === 0) {
        sectionHeader = "[Verse 1]\n"
      } else if (!isLikelyChorus) {
        sectionHeader = `[Verse ${Math.floor(index / 2) + 1}]\n`
      }

      // Process lines within the section
      const lines = section.split("\n")
      const processedLines = lines.map((line) => {
        // If line is already good length, return as is
        if (line.length <= 50) return line

        // Try to split at natural break points for song lyrics
        const breakPoints = [",", ";", ".", ":", " and ", " or ", " but ", " so ", " when ", " where "]

        for (const breakPoint of breakPoints) {
          const breakIndex = line.indexOf(breakPoint)
          if (breakIndex > 15 && breakIndex < 45) {
            const firstPart = line.substring(0, breakIndex + breakPoint.length).trim()
            const secondPart = line.substring(breakIndex + breakPoint.length).trim()
            return firstPart + "\n" + secondPart
          }
        }

        // If no natural break, split at a good word boundary
        const words = line.split(" ")
        let firstHalf = ""
        let secondHalf = ""
        let charCount = 0

        for (let i = 0; i < words.length; i++) {
          if (charCount + words[i].length > 40 && i > 0) {
            secondHalf = words.slice(i).join(" ")
            break
          }
          firstHalf += (i > 0 ? " " : "") + words[i]
          charCount += words[i].length + 1
        }

        return secondHalf ? firstHalf + "\n" + secondHalf : line
      })

      return sectionHeader + processedLines.join("\n")
    })

    return processedSections.join("\n\n")
  }

  const renderFormattedLyrics = (text: string) => {
    if (!text) return "No lyrics found for this song."

    const formattedText = formatLyrics(text)
    const lines = formattedText.split("\n")

    return lines.map((line, index) => {
      // Check if this line is a section header
      if (line.match(/^\[.*\]$/)) {
        return (
          <Typography
            key={index}
            sx={{
              color: COLORS.primary,
              fontWeight: "bold",
              fontSize: "1.2rem",
              mt: index > 0 ? 3 : 0,
              mb: 1,
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              borderBottom: `1px solid ${COLORS.border}`,
              pb: 0.5,
            }}
          >
            {line}
          </Typography>
        )
      }

      // Regular lyric line
      if (line.trim()) {
        return (
          <Typography
            key={index}
            sx={{
              color: COLORS.text,
              fontSize: "1.1rem",
              lineHeight: 1.6,
              mb: 0.5,
              pl: 2,
              position: "relative",
              "&:before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: "50%",
                width: "4px",
                height: "4px",
                bgcolor: COLORS.primary,
                borderRadius: "50%",
                opacity: 0.3,
                transform: "translateY(-50%)",
              },
            }}
          >
            {line}
          </Typography>
        )
      }

      // Empty line for spacing
      return <Box key={index} sx={{ height: "0.5rem" }} />
    })
  }

  const handleTranslate = async (targetLanguage: string) => {
    if (!transcription || targetLanguage === "original") {
      setLanguage("original")
      return
    }

    setIsTranslating(true)
    setLanguage(targetLanguage)

    // try {
    //   // Use the imported translation service directly
    //   // const result = await translateText(transcription, targetLanguage)
    //   setTranslatedText(result.translatedText)
    // } catch (error) {
    //   console.error("Translation error:", error)
    //   alert("Error translating lyrics. Please try again later.")
    //   setLanguage("original")
    // } finally {
    //   setIsTranslating(false)
    // }
  }

  useEffect(() => {
    const extractCoverArt = async () => {
      if (!song || !song.audioUrl) return
      try {
        const response = await fetch(song.audioUrl)
        const blob = await response.blob()
        const metadata = await parseBlob(blob)
        if (metadata.common.picture && metadata.common.picture.length > 0) {
          const cover = metadata.common.picture[0]
          setCoverArt(
            `data:${cover.format};base64,${btoa(
              new Uint8Array(cover.data).reduce((data, byte) => data + String.fromCharCode(byte), ""),
            )}`,
          )
        }
      } catch (error) {
        console.error("Error extracting cover art:", error)
      }
    }

    extractCoverArt()
    // Reset transcription when changing songs
    setTranscription("")
    setTranslatedText("")
    setShowLyrics(false)
    setLanguage("original")
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
  }, [song])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleDurationChange = () => {
      setDuration(audio.duration)
    }

    const handlePlay = () => {
      setIsPlaying(true)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("durationchange", handleDurationChange)
    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("durationchange", handleDurationChange)
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
    }
  }, [audioRef])

  const handleDownload = async () => {
    if (!song || !song.audioUrl) return



    setIsDownloading(true)
    setDownloadProgress(0)

    try {
      // Create fetch request with progress tracking
      const response = await fetch(song.audioUrl)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Get file size
      const contentLength = response.headers.get("Content-Length")
      const total = contentLength ? Number.parseInt(contentLength, 10) : 0

      // Create stream reader
      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error("Failed to get reader from response")
      }

      // Read data
      let receivedLength = 0
      const chunks = []

      while (true) {
        const { done, value } = await reader.read()

        if (done) {
          break
        }

        chunks.push(value)
        receivedLength += value.length

        if (total) {
          setDownloadProgress(Math.round((receivedLength / total) * 100))
        }
      }

      // Combine all chunks into a single blob
      const blob = new Blob(chunks)

      // Create URL for the blob
      const url = window.URL.createObjectURL(blob)

      // Create download link and trigger it
      const link = document.createElement("a")
      link.href = url
      link.download = `${song.title || "song"}.mp3`
      document.body.appendChild(link)
      link.click()

      // Cleanup
      window.URL.revokeObjectURL(url)
      document.body.removeChild(link)

      setDownloadProgress(100)

      // Show success message
      setTimeout(() => {
        setIsDownloading(false)
        setDownloadProgress(0)
      }, 1500)
    } catch (error) {
      console.error("Error downloading song:", error)
      alert("Error downloading the song. Please try again later.")
      setIsDownloading(false)
      setDownloadProgress(0)
    }
  }

  const handleTranscribe = async () => {
    if (!song || !song.audioUrl) return

    if (transcription) {
      // If we already have transcription, just toggle the display
      setShowLyrics(!showLyrics)
      return
    }

    setIsTranscribing(true)
    setShowLyrics(true)

    try {
      // Download the audio file
      const response = await fetch(song.audioUrl)
      const audioBlob = await response.blob()


      // Create FormData to send to server
      const formData = new FormData()
      formData.append("file", audioBlob, `${song.title}.mp3`)

      // Send the file to the server for transcription
      const transcriptionResponse = await fetch("http://localhost:5120/api/transcription/transcribe-full", {
        method: "POST",
        body: formData,
      })

      if (!transcriptionResponse.ok) {
        throw new Error(`Transcription error: ${transcriptionResponse.statusText}`)
      }

      const result = await transcriptionResponse.json()
      setTranscription(result.text)
    } catch (error) {
      console.error("Error transcribing song:", error)
      alert("Error transcribing the song. Please try again later.")
    } finally {
      setIsTranscribing(false)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number.parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
    }
  }
  console.log("song",song);


  if (!song) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: COLORS.background,
        }}
      >
        <Typography color={COLORS.text}>Song not found</Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        bgcolor: COLORS.background,
        backgroundImage: "radial-gradient(circle at 10% 20%, rgba(0, 188, 212, 0.05) 0%, rgba(0, 0, 0, 0) 80%)",
      }}
    >
      {/* Left side - Lyrics */}
      <Slide direction="right" in={showLyrics} mountOnEnter unmountOnExit>
        <Box
          sx={{
            width: isMobile ? "100%" : "45%",
            height: isMobile ? "50%" : "100%",
            display: "flex",
            flexDirection: "column",
            borderRight: isMobile ? "none" : `1px solid ${COLORS.border}`,
            borderBottom: isMobile ? `1px solid ${COLORS.border}` : "none",
            overflow: "hidden",
            order: isMobile ? 2 : 1,
            bgcolor: COLORS.backgroundLight,
            boxShadow: "inset 0 0 30px rgba(0, 188, 212, 0.05)",
            borderRadius: showLyrics ? (isMobile ? "0" : "20px 0 0 20px") : 0,
            m: showLyrics ? (isMobile ? 0 : 2) : 0,
            ml: showLyrics ? (isMobile ? 0 : 2) : 0,
            mb: showLyrics ? (isMobile ? 0 : 2) : 0,
            mt: showLyrics ? (isMobile ? 0 : 2) : 0,
            transition: "all 0.3s ease-in-out",
            background: `linear-gradient(135deg, ${COLORS.backgroundLight} 0%, rgba(30, 30, 30, 0.9) 100%)`,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
              bgcolor: "rgba(0, 131, 143, 0.2)",
              borderBottom: `1px solid ${COLORS.border}`,
              backdropFilter: "blur(10px)",
              borderRadius: "20px 0 0 0",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LyricsIcon sx={{ mr: 1, color: COLORS.primary }} />
              <Typography variant="h6" color={COLORS.text}>
                Lyrics: {song.title}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Tooltip title="Translate lyrics">
                <FormControl size="small" variant="outlined" sx={{ minWidth: 120 }}>
                  <InputLabel id="language-select-label" sx={{ color: COLORS.textSecondary }}>
                    Language
                  </InputLabel>
                  <Select
                    labelId="language-select-label"
                    value={language}
                    onChange={(e) => handleTranslate(e.target.value)}
                    label="Language"
                    startAdornment={<TranslateIcon sx={{ mr: 1, color: COLORS.primary, fontSize: 16 }} />}
                    sx={{
                      color: COLORS.text,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: COLORS.border,
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: COLORS.primary,
                      },
                      "& .MuiSvgIcon-root": {
                        color: COLORS.primary,
                      },
                    }}
                  >
                    <MenuItem value="original">Original</MenuItem>
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Spanish</MenuItem>
                    <MenuItem value="fr">French</MenuItem>
                    <MenuItem value="de">German</MenuItem>
                  </Select>
                </FormControl>
              </Tooltip>

              {isMobile && (
                <IconButton
                  onClick={() => setShowLyrics(false)}
                  sx={{
                    color: COLORS.textSecondary,
                    "&:hover": { color: COLORS.primary },
                  }}
                >
                  <DescriptionIcon />
                </IconButton>
              )}
            </Box>
          </Paper>

          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              p: 3,
              bgcolor: "transparent",
              display: "flex",
              flexDirection: "column",
              justifyContent: isTranscribing || isTranslating ? "center" : "flex-start",
              alignItems: isTranscribing || isTranslating ? "center" : "stretch",
              backgroundImage: "linear-gradient(to bottom, rgba(0, 188, 212, 0.03), rgba(0, 0, 0, 0))",
            }}
          >
            {isTranscribing ? (
              <Box sx={{ textAlign: "center" }}>
                <CircularProgress
                  size={70}
                  thickness={3}
                  sx={{
                    color: COLORS.primary,
                    mb: 2,
                    animation: "pulse 1.5s ease-in-out infinite",
                    "@keyframes pulse": {
                      "0%": { opacity: 0.6, transform: "scale(0.95)" },
                      "50%": { opacity: 1, transform: "scale(1.05)" },
                      "100%": { opacity: 0.6, transform: "scale(0.95)" },
                    },
                    "& .MuiCircularProgress-circle": {
                      strokeLinecap: "round",
                    },
                  }}
                />
                <Typography color={COLORS.text} variant="h6" sx={{ mt: 2 }}>
                  Transcribing...
                </Typography>
                <Typography color={COLORS.textSecondary} variant="body2" sx={{ mt: 1 }}>
                  Please wait while we process the song
                </Typography>
              </Box>
            ) : isTranslating ? (
              <Box sx={{ textAlign: "center" }}>
                <CircularProgress
                  size={60}
                  thickness={3}
                  sx={{
                    color: COLORS.primary,
                    mb: 2,
                  }}
                />
                <Typography color={COLORS.text} variant="h6" sx={{ mt: 2 }}>
                  Translating...
                </Typography>
              </Box>
            ) : (
              <Fade in={!!(language === "original" ? transcription : translatedText)}>
                <Box
                  sx={{
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundImage:
                        "radial-gradient(circle at 50% 30%, rgba(0, 188, 212, 0.03) 0%, rgba(0, 0, 0, 0) 70%)",
                      pointerEvents: "none",
                    },
                  }}
                >
                  <Box sx={{ position: "relative", zIndex: 1 }}>
                    {renderFormattedLyrics(language === "original" ? transcription : translatedText)}
                  </Box>
                </Box>
              </Fade>
            )}
          </Box>
        </Box>
      </Slide>

      {/* Right side - Song player */}
      <Box
        sx={{
          width: showLyrics ? (isMobile ? "100%" : "55%") : "100%",
          height: isMobile ? "50%" : "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
          transition: "width 0.3s ease-in-out",
          bgcolor: COLORS.background,
          order: isMobile ? 1 : 2,
          backgroundImage: "radial-gradient(circle at 70% 50%, rgba(0, 188, 212, 0.08) 0%, rgba(0, 0, 0, 0) 70%)",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2,
            mb: 3,
            bgcolor: "transparent",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <MusicNoteIcon sx={{ mr: 1, color: COLORS.primary }} />
          <Typography variant="h6" color={COLORS.text} align="center">
            Now Playing
          </Typography>
        </Paper>

        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography
            variant="h4"
            color={COLORS.text}
            sx={{
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
              fontWeight: "bold",
              background: `linear-gradient(45deg, ${COLORS.text} 30%, ${COLORS.primary} 90%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {song.title}
          </Typography>
          <Typography variant="h6" color={COLORS.textSecondary}>
            {song.artist}
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            mb: 3,
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: `0 10px 30px rgba(0,0,0,0.3), 0 0 0 1px ${COLORS.border}, 0 0 15px ${COLORS.primaryDark}20`,
            position: "relative",
            "&:hover": {
              "& .album-image": {
                transform: "scale(1.03)",
              },
              "& .album-overlay": {
                opacity: 1,
              },
            },
          }}
        >
          <img
            src={coverArt || DEFAULT_COVER}
            alt="Album cover"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.5s ease",
            }}
            className="album-image"
          />
          <Box
            className="album-overlay"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(to top, ${COLORS.background}CC, transparent 50%)`,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              opacity: 0,
              transition: "opacity 0.3s ease",
              padding: 2,
            }}
          >
            <Typography variant="h5" color={COLORS.text} sx={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
              {song.title}
            </Typography>
          </Box>
        </Box>

        {/* Custom audio player */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 500,
            mb: 3,
            bgcolor: "rgba(0,0,0,0.3)",
            borderRadius: 2,
            p: 2,
            border: `1px solid ${COLORS.border}`,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <audio ref={audioRef} src={song.audioUrl} style={{ display: "none" }} />

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <IconButton
              onClick={togglePlay}
              sx={{
                color: COLORS.primary,
                mr: 1,
                "&:hover": {
                  color: COLORS.primaryLight,
                  bgcolor: "rgba(0,188,212,0.1)",
                },
              }}
            >
              {isPlaying ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" />
                  <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6 4.75C6 4.04777 6.71634 3.55609 7.33079 3.9047L18.3308 10.1547C18.9236 10.4899 18.9236 11.3601 18.3308 11.6953L7.33079 17.9453C6.71634 18.2939 6 17.8022 6 17.1V4.75Z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </IconButton>

            <Typography sx={{ color: COLORS.textSecondary, minWidth: 45, fontSize: "0.875rem" }}>
              {formatTime(currentTime)}
            </Typography>

            <Box sx={{ flex: 1, mx: 1, position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  right: 0,
                  height: 3,
                  bgcolor: "rgba(255,255,255,0.1)",
                  borderRadius: 1,
                  transform: "translateY(-50%)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  width: `${(currentTime / duration) * 100}%`,
                  height: 3,
                  bgcolor: COLORS.primary,
                  borderRadius: 1,
                  transform: "translateY(-50%)",
                  transition: "width 0.1s linear",
                }}
              />
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                style={{
                  width: "100%",
                  margin: 0,
                  height: 20,
                  appearance: "none",
                  background: "transparent",
                  position: "relative",
                  zIndex: 2,
                  cursor: "pointer",
                }}
              />
            </Box>

            <Typography sx={{ color: COLORS.textSecondary, minWidth: 45, fontSize: "0.875rem", textAlign: "right" }}>
              {formatTime(duration)}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
              <EqualizerIcon
                sx={{
                  color: isPlaying ? COLORS.primary : COLORS.textSecondary,
                  animation: isPlaying ? "equalizer 1.5s ease-in-out infinite" : "none",
                  "@keyframes equalizer": {
                    "0%": { transform: "scaleY(0.6)" },
                    "50%": { transform: "scaleY(1)" },
                    "100%": { transform: "scaleY(0.6)" },
                  },
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button
            variant="contained"
            startIcon={isDownloading ? null : <FileDownloadIcon />}
            onClick={handleDownload}
            disabled={isDownloading}
            sx={{
              bgcolor: COLORS.primary,
              "&:hover": {
                bgcolor: COLORS.primaryDark,
              },
              borderRadius: 2,
              px: 3,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {isDownloading ? (
              <>
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: `${downloadProgress}%`,
                    bgcolor: COLORS.primaryDark,
                    transition: "width 0.3s ease",
                  }}
                />
                <Box sx={{ position: "relative", zIndex: 1 }}>{downloadProgress}%</Box>
              </>
            ) : (
              "Download"
            )}
          </Button>

          <Button
            variant="contained"
            startIcon={isTranscribing ? <CircularProgress size={20} color="inherit" /> : <DescriptionIcon />}
            onClick={handleTranscribe}
            disabled={isTranscribing}
            sx={{
              bgcolor: showLyrics ? COLORS.secondary : COLORS.primary,
              "&:hover": {
                bgcolor: COLORS.secondary,
              },
              borderRadius: 2,
              px: 3,
            }}
          >
            {isTranscribing
              ? "Transcribing..."
              : transcription
                ? showLyrics
                  ? "Hide Lyrics"
                  : "Show Lyrics"
                : "Transcribe Lyrics"}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default SongPlayer
