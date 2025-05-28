import type React from "react"
export interface Song {
  id: number
  title: string
  artist: string
  audioUrl: string
}

export interface AudioPlayerProps {
  song: Song
  isPlaying: boolean
  currentTime: number
  duration: number
  onTogglePlay: () => void
  onSeek: (time: number) => void
  audioRef: React.RefObject<HTMLAudioElement | null>
}

export interface LyricsPanelProps {
  song: Song
  transcription: string
  translatedText: string
  isTranscribing: boolean
  isTranslating: boolean
  language: string
  showLyrics: boolean
  onTranscribe: () => void
  onTranslate: (language: string) => void
  onToggleLyrics: () => void
}

export interface SongInfoProps {
  song: Song
  coverArt: string
  onDownload: () => void
  isDownloading: boolean
  downloadProgress: number
}
