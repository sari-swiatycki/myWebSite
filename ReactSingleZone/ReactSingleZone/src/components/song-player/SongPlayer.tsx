"use client";

import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { parseBlob } from "music-metadata-browser";
import { Box, Typography, Button, useMediaQuery, useTheme } from "@mui/material";
import { FileText } from 'lucide-react';

import AudioPlayer from "./AudioPlayer";
import SongInfo from "./SongInfo";
import LyricsPanel from "./LyricsPanel";
import { Song } from "./types";
import { COLORS, DEFAULT_COVER } from "./constants";

interface RootStore {
  actionSongs: {
    filteredSongs: Song[];
    songs: Song[];
  };
}

const SongPlayer: React.FC = () => {
  const { id } = useParams();
  const { filteredSongs, songs } = useSelector((state: RootStore) => state.actionSongs);
  const song = filteredSongs.find((s) => s.id === Number(id)) || songs.find((s) => s.id === Number(id));

  const [coverArt, setCoverArt] = useState<string>(DEFAULT_COVER);
  const [transcription, setTranscription] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string>("");
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [showLyrics, setShowLyrics] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("original");
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const audioRef = useRef<HTMLAudioElement>(null);

  // Extract cover art from audio file
  useEffect(() => {
    const extractCoverArt = async () => {
      if (!song || !song.audioUrl) return;
      try {
        const response = await fetch(song.audioUrl);
        const blob = await response.blob();
        const metadata = await parseBlob(blob);
        if (metadata.common.picture && metadata.common.picture.length > 0) {
          const cover = metadata.common.picture[0];
          setCoverArt(
            `data:${cover.format};base64,${btoa(
              new Uint8Array(cover.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
            )}`
          );
        }
      } catch (error) {
        console.error("Error extracting cover art:", error);
      }
    };

    extractCoverArt();
    // Reset state when changing songs
    setTranscription("");
    setTranslatedText("");
    setShowLyrics(false);
    setLanguage("original");
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [song]);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const handleTogglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const handleSeek = (newTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleDownload = async () => {
    if (!song || !song.audioUrl) return;

    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      const response = await fetch(song.audioUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const contentLength = response.headers.get("Content-Length");
      const total = contentLength ? parseInt(contentLength, 10) : 0;
      const reader = response.body?.getReader();
      if (!reader) throw new Error("Failed to get reader from response");

      let receivedLength = 0;
      const chunks = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
        receivedLength += value.length;

        if (total) {
          setDownloadProgress(Math.round((receivedLength / total) * 100));
        }
      }

      const blob = new Blob(chunks);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${song.title || "song"}.mp3`;
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      setDownloadProgress(100);
      setTimeout(() => {
        setIsDownloading(false);
        setDownloadProgress(0);
      }, 1500);
    } catch (error) {
      console.error("Error downloading song:", error);
      alert("Error downloading the song. Please try again later.");
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  const handleTranscribe = async () => {
    if (!song || !song.audioUrl) return;

    if (transcription) {
      setShowLyrics(!showLyrics);
      return;
    }

    setIsTranscribing(true);
    setShowLyrics(true);

    try {
      const response = await fetch(song.audioUrl);
      const audioBlob = await response.blob();
      const formData = new FormData();
      formData.append("file", audioBlob, `${song.title}.mp3`);

      const transcriptionResponse = await fetch("http://localhost:5120/api/transcription/transcribe-full", {
        method: "POST",
        body: formData,
      });

      if (!transcriptionResponse.ok) {
        throw new Error(`Transcription error: ${transcriptionResponse.statusText}`);
      }

      const result = await transcriptionResponse.json();
      setTranscription(result.text);
    } catch (error) {
      console.error("Error transcribing song:", error);
      alert("Error transcribing the song. Please try again later.");
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleTranslate = async (targetLanguage: string) => {
    if (!transcription || targetLanguage === "original") {
      setLanguage("original");
      return;
    }

    setIsTranslating(true);
    setLanguage(targetLanguage);

    // TODO: Implement translation service
    // try {
    //   const result = await translateText(transcription, targetLanguage);
    //   setTranslatedText(result.translatedText);
    // } catch (error) {
    //   console.error("Translation error:", error);
    //   alert("Error translating lyrics. Please try again later.");
    //   setLanguage("original");
    // } finally {
    //   setIsTranslating(false);
    // }

    // Temporary mock implementation
    setTimeout(() => {
      setTranslatedText(`[Translated to ${targetLanguage}]\n\n${transcription}`);
      setIsTranslating(false);
    }, 2000);
  };

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
    );
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
      {/* Lyrics Panel */}
      {showLyrics && (
        <LyricsPanel
          song={song}
          transcription={transcription}
          translatedText={translatedText}
          isTranscribing={isTranscribing}
          isTranslating={isTranslating}
          language={language}
          showLyrics={showLyrics}
          onTranscribe={handleTranscribe}
          onTranslate={handleTranslate}
          onToggleLyrics={() => setShowLyrics(!showLyrics)}
        />
      )}

      {/* Main Player */}
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
        <SongInfo
          song={song}
          coverArt={coverArt}
          onDownload={handleDownload}
          isDownloading={isDownloading}
          downloadProgress={downloadProgress}
        />

        <AudioPlayer
          song={song}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          onTogglePlay={handleTogglePlay}
          onSeek={handleSeek}
          audioRef={audioRef}
        />

        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            startIcon={<FileText size={20} />}
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
  );
};

export default SongPlayer;
