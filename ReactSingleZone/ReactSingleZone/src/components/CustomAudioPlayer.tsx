"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Box, IconButton, Slider, Typography, Tooltip } from "@mui/material"
import { PlayArrow, Pause, VolumeUp, VolumeOff } from "@mui/icons-material"

interface CustomAudioPlayerProps {
  src: string
  title?: string
  artist?: string
  primaryColor?: string
  secondaryColor?: string
}

const CustomAudioPlayer: React.FC<CustomAudioPlayerProps> = ({
  src,
  title,
  artist,
  primaryColor = "#00bcd4",
  // secondaryColor = "#008ba3",
}) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
      setIsLoaded(true)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [audioRef])

  useEffect(() => {
    // Reset player when src changes
    setIsPlaying(false)
    setCurrentTime(0)
    setIsLoaded(false)
  }, [src])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (_: Event, newValue: number | number[]) => {
    if (!audioRef.current) return
    const newTime = newValue as number
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (_: Event, newValue: number | number[]) => {
    if (!audioRef.current) return
    const newVolume = newValue as number
    audioRef.current.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    const newMuteState = !isMuted
    audioRef.current.muted = newMuteState
    setIsMuted(newMuteState)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "rgba(0,0,0,0.3)",
        borderRadius: 2,
        p: 2,
        border: `1px solid rgba(${Number.parseInt(primaryColor.slice(1, 3), 16)}, ${Number.parseInt(
          primaryColor.slice(3, 5),
          16,
        )}, ${Number.parseInt(primaryColor.slice(5, 7), 16)}, 0.3)`,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      <audio ref={audioRef} src={src} preload="metadata" />

      {title && (
        <Box sx={{ mb: 1, textAlign: "center" }}>
          <Typography
            variant="subtitle1"
            sx={{
              color: "white",
              fontWeight: "bold",
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            {title}
          </Typography>
          {artist && (
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>
              {artist}
            </Typography>
          )}
        </Box>
      )}

      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <IconButton
          onClick={togglePlay}
          disabled={!isLoaded}
          sx={{
            color: primaryColor,
            "&:hover": {
              bgcolor: `rgba(${Number.parseInt(primaryColor.slice(1, 3), 16)}, ${Number.parseInt(
                primaryColor.slice(3, 5),
                16,
              )}, ${Number.parseInt(primaryColor.slice(5, 7), 16)}, 0.1)`,
            },
          }}
        >
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>

        <Typography sx={{ color: "rgba(255,255,255,0.7)", minWidth: 40, fontSize: "0.75rem" }}>
          {formatTime(currentTime)}
        </Typography>

        <Box sx={{ flex: 1, mx: 1 }}>
          <Slider
            value={currentTime}
            max={duration || 100}
            onChange={handleSeek}
            disabled={!isLoaded}
            sx={{
              color: primaryColor,
              height: 4,
              "& .MuiSlider-thumb": {
                width: 12,
                height: 12,
                transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                "&:before": {
                  boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                },
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: `0px 0px 0px 8px rgba(${Number.parseInt(primaryColor.slice(1, 3), 16)}, ${Number.parseInt(
                    primaryColor.slice(3, 5),
                    16,
                  )}, ${Number.parseInt(primaryColor.slice(5, 7), 16)}, 0.16)`,
                },
                "&.Mui-active": {
                  width: 16,
                  height: 16,
                },
              },
              "& .MuiSlider-rail": {
                opacity: 0.28,
              },
            }}
          />
        </Box>

        <Typography sx={{ color: "rgba(255,255,255,0.7)", minWidth: 40, fontSize: "0.75rem", textAlign: "right" }}>
          {formatTime(duration)}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
          <IconButton
            onClick={toggleMute}
            sx={{
              color: isMuted ? "rgba(255,255,255,0.5)" : primaryColor,
              "&:hover": {
                bgcolor: `rgba(${Number.parseInt(primaryColor.slice(1, 3), 16)}, ${Number.parseInt(
                  primaryColor.slice(3, 5),
                  16,
                )}, ${Number.parseInt(primaryColor.slice(5, 7), 16)}, 0.1)`,
              },
            }}
          >
            {isMuted ? <VolumeOff /> : <VolumeUp />}
          </IconButton>

          <Tooltip title={`עוצמת קול: ${Math.round(volume * 100)}%`}>
            <Box sx={{ width: 70, mr: 1, display: { xs: "none", sm: "block" } }}>
              <Slider
                value={isMuted ? 0 : volume}
                min={0}
                max={1}
                step={0.01}
                onChange={handleVolumeChange}
                sx={{
                  color: primaryColor,
                  height: 4,
                  "& .MuiSlider-thumb": {
                    width: 10,
                    height: 10,
                  },
                }}
              />
            </Box>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  )
}

export default CustomAudioPlayer
