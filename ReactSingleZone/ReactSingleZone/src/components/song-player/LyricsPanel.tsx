"use client";

import React from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Fade,
  Slide,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FileText, Languages, X } from 'lucide-react';
import { LyricsPanelProps } from "./types";
import { COLORS, LANGUAGE_OPTIONS } from "./constants";
import { formatLyrics } from "./utils";

const LyricsPanel: React.FC<LyricsPanelProps> = ({
  song,
  transcription,
  translatedText,
  isTranscribing,
  isTranslating,
  language,
  showLyrics,
  onTranscribe,
  onTranslate,
  onToggleLyrics,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const renderFormattedLyrics = (text: string) => {
    if (!text) return "No lyrics found for this song.";

    const formattedText = formatLyrics(text);
    const lines = formattedText.split("\n");

    return lines.map((line, index) => {
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
        );
      }

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
        );
      }

      return <Box key={index} sx={{ height: "0.5rem" }} />;
    });
  };

  return (
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
            <FileText size={20} style={{ marginRight: 8, color: COLORS.primary }} />
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
                  onChange={(e) => onTranslate(e.target.value)}
                  label="Language"
                  startAdornment={<Languages size={16} style={{ marginRight: 8, color: COLORS.primary }} />}
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
                  {LANGUAGE_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Tooltip>

            {isMobile && (
              <IconButton
                onClick={onToggleLyrics}
                sx={{
                  color: COLORS.textSecondary,
                  "&:hover": { color: COLORS.primary },
                }}
              >
                <X size={20} />
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

        <Box sx={{ p: 2, borderTop: `1px solid ${COLORS.border}` }}>
          <Button
            variant="contained"
            startIcon={isTranscribing ? <CircularProgress size={20} color="inherit" /> : <FileText size={20} />}
            onClick={onTranscribe}
            disabled={isTranscribing}
            fullWidth
            sx={{
              bgcolor: COLORS.primary,
              "&:hover": {
                bgcolor: COLORS.primaryDark,
              },
              borderRadius: 2,
            }}
          >
            {isTranscribing
              ? "Transcribing..."
              : transcription
              ? "Refresh Lyrics"
              : "Transcribe Lyrics"}
          </Button>
        </Box>
      </Box>
    </Slide>
  );
};

export default LyricsPanel;
