"use client";

import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { Download, Music } from 'lucide-react';
import { SongInfoProps } from "./types";
import { COLORS, DEFAULT_COVER } from "./constants";

const SongInfo: React.FC<SongInfoProps> = ({
  song,
  coverArt,
  onDownload,
  isDownloading,
  downloadProgress,
}) => {
  return (
    <Box sx={{ textAlign: "center", width: "100%" }}>
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
        <Music size={24} style={{ marginRight: 8, color: COLORS.primary }} />
        <Typography variant="h6" color={COLORS.text} align="center">
          Now Playing
        </Typography>
      </Paper>

      <Box sx={{ mb: 3 }}>
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
          mx: "auto",
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

      <Button
        variant="contained"
        startIcon={isDownloading ? null : <Download size={20} />}
        onClick={onDownload}
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
    </Box>
  );
};

export default SongInfo;
