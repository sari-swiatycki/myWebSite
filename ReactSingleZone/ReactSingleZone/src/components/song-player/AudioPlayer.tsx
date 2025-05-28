"use client"

import type React from "react"
import { Box, IconButton, Typography } from "@mui/material"
import { Play, Pause, Activity } from "lucide-react"
import type { AudioPlayerProps } from "./types"
import { formatTime } from "./utils"
import { COLORS } from "./constants"

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  song,
  isPlaying,
  currentTime,
  duration,
  onTogglePlay,
  onSeek,
  audioRef,
}) => {
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number.parseFloat(e.target.value)
    onSeek(newTime)
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 500,
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
          onClick={onTogglePlay}
          sx={{
            color: COLORS.primary,
            mr: 1,
            "&:hover": {
              color: COLORS.primaryLight,
              bgcolor: "rgba(0,188,212,0.1)",
            },
          }}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
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
          <Activity
            size={20}
            style={{
              color: isPlaying ? COLORS.primary : COLORS.textSecondary,
              animation: isPlaying ? "equalizer 1.5s ease-in-out infinite" : "none",
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default AudioPlayer
