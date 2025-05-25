

























// "use client"

// import React, { useEffect, useState, useRef } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import type { AppDispatch, RootStore } from "../Stores/songStore"
// import { fetchPlaylistSongs } from "../Slices/playlistSlice"
// import { useParams } from "react-router-dom"
// import {
//   Box,
//   Button,
//   Typography,
//   Modal,
//   List,
//   ListItem,
//   Divider,
//   Paper,
//   IconButton,
//   Stack,
//   Fade,
//   CircularProgress,
//   styled,
//   Slide,
// } from "@mui/material"
// import PlayArrowIcon from "@mui/icons-material/PlayArrow"
// import PauseIcon from "@mui/icons-material/Pause"
// import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
// import MusicNoteIcon from "@mui/icons-material/MusicNote"
// import QueueMusicIcon from "@mui/icons-material/QueueMusic"
// import SkipNextIcon from "@mui/icons-material/SkipNext"
// import SkipPreviousIcon from "@mui/icons-material/SkipPrevious"
// import VolumeUpIcon from "@mui/icons-material/VolumeUp"
// import VolumeMuteIcon from "@mui/icons-material/VolumeMute"
// import SongListForPlaylist from "./SongListForPlaylistProps"
// import RemoveSongButton from "./RemoveSongButtonProps "

// // סטיילינג מותאם אישית
// const StyledPaper = styled(Paper)(({  }) => ({
//   background: "#111",
//   color: "#fff",
//   borderRadius: 16,
//   boxShadow: "0 8px 32px rgba(0, 206, 209, 0.15)",
//   border: "1px solid rgba(255, 255, 255, 0.05)",
//   overflow: "hidden",
//   transition: "all 0.3s ease-in-out",
//   "&:hover": {
//     boxShadow: "0 12px 48px rgba(0, 206, 209, 0.2)",
//   },
// }))

// const TurquoiseButton = styled(Button)(({  }) => ({
//   background: "rgba(0, 206, 209, 0.9)",
//   color: "#000",
//   fontWeight: "bold",
//   borderRadius: 8,
//   padding: "10px 24px",
//   "&:hover": {
//     background: "rgba(0, 206, 209, 1)",
//   },
// }))

// // const AudioControlWrapper = styled(Box)(({ theme }) => ({
// //   width: "100%",
// //   display: "flex",
// //   alignItems: "center",
// //   gap: 12,
// //   marginTop: 8,
// // }))

// // const ProgressBar = styled(Box)<{ progress: number }>(({  progress }) => ({
// //   height: 4,
// //   width: "100%",
// //   background: "#333",
// //   borderRadius: 2,
// //   position: "relative",
// //   "&:after": {
// //     content: '""',
// //     position: "absolute",
// //     height: "100%",
// //     width: `${progress}%`,
// //     background: "rgb(0, 206, 209)",
// //     borderRadius: 2,
// //     transition: "width 0.1s linear",
// //   },
// // }))

// const StyledListItem = styled(ListItem)(({  }) => ({
//   borderLeft: "3px solid transparent",
//   transition: "all 0.2s ease",
//   "&:hover": {
//     borderLeft: "3px solid rgb(0, 206, 209)",
//     background: "rgba(255, 255, 255, 0.03)",
//   },
// }))

// const ModalContent = styled(Box)(({  }) => ({
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 500,
//   maxWidth: "90vw",
//   maxHeight: "80vh",
//   overflow: "auto",
//   background: "#111",
//   color: "#fff",
//   borderRadius: 16,
//   boxShadow: "0 24px 48px rgba(0, 0, 0, 0.5)",
//   padding: 24,
//   border: "1px solid rgba(0, 206, 209, 0.3)",
// }))

// const PlayerBar = styled(Box)(({  }) => ({
//   position: "fixed",
//   bottom: 0,
//   left: 0,
//   right: 0,
//   background: "rgba(0, 0, 0, 0.9)",
//   borderTop: "1px solid rgba(0, 206, 209, 0.3)",
//   padding: "12px 24px",
//   backdropFilter: "blur(10px)",
//   zIndex: 1000,
//   display: "flex",
//   flexDirection: "column",
//   color: "#fff",
// }))

// const Visualizer = styled(Box)(({  }) => ({
//   width: "100%",
//   height: 60,
//   display: "flex",
//   alignItems: "flex-end",
//   justifyContent: "center",
//   gap: 3,
//   padding: "0 24px 8px 24px",
// }))

// const VisualizerBar = styled(Box)<{ height: number }>(({ height }) => ({
//   width: 5,
//   height: `${height}%`,
//   background: "rgb(0, 206, 209)",
//   borderRadius: "2px 2px 0 0",
//   transition: "height 0.1s ease-in-out",
// }))

// // ממשק לשיר
// interface Song {
//   id: number
//   title: string
//   artist: string
//   audioUrl: string
//   duration?: number
// }

// const PlaylistSongs: React.FC = () => {
//   const { id } = useParams()
//   const dispatch = useDispatch<AppDispatch>()
//   const { playlistSongs, loading } = useSelector((state: RootStore) => state.playlists)
//   const [showSongList, setShowSongList] = useState<boolean>(false)
//   const [playingIndex, setPlayingIndex] = useState<number | null>(null)
//   const [playingAll, setPlayingAll] = useState<boolean>(false)
//   const [audioProgress, setAudioProgress] = useState<number[]>([])
//   const [currentTime, setCurrentTime] = useState<number>(0)
//   const [duration, setDuration] = useState<number>(0)
//   const [volume, setVolume] = useState<number>(1)
//   const [muted, setMuted] = useState<boolean>(false)
//   const [visualizerData, setVisualizerData] = useState<number[]>(Array(30).fill(10))
//   const [showPlayer, setShowPlayer] = useState<boolean>(false)

//   const audioRefs = useRef<(HTMLAudioElement | null)[]>([])
//   const audioContextRef = useRef<AudioContext | null>(null)
//   const analyserRef = useRef<AnalyserNode | null>(null)
//   const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
//   const animationFrameRef = useRef<number | null>(null)

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchPlaylistSongs(Number(id)))
//     }
//   }, [dispatch, id])

//   useEffect(() => {
//     // איתחול מערך ההתקדמות
//     setAudioProgress(playlistSongs.map(() => 0))

//     // ניקוי אובייקטי אודיו ישנים
//     return () => {
//       audioRefs.current.forEach((audio) => {
//         if (audio) {
//           audio.pause()
//           audio.currentTime = 0
//         }
//       })

//       // ניקוי של Web Audio API
//       if (audioContextRef.current) {
//         audioContextRef.current.close()
//       }

//       if (animationFrameRef.current) {
//         cancelAnimationFrame(animationFrameRef.current)
//       }
//     }
//   }, [playlistSongs])

//   // יצירת אנלייזר לויזואליזציה
//   const setupAudioAnalyser = (audioElement: HTMLAudioElement) => {
//     if (!audioContextRef.current) {
//       audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
//     }

//     // נקה מקורות קודמים
//     if (sourceRef.current) {
//       sourceRef.current.disconnect()
//     }

//     analyserRef.current = audioContextRef.current.createAnalyser()
//     analyserRef.current.fftSize = 64

//     // Check if we already have a source for this element to avoid duplicate connections
//     if (!sourceRef.current) {
//       sourceRef.current = audioContextRef.current.createMediaElementSource(audioElement)
//       sourceRef.current.connect(analyserRef.current)
//       analyserRef.current.connect(audioContextRef.current.destination)
//     } else {
//       // If we already have a source, just reconnect it
//       sourceRef.current.disconnect()
//       sourceRef.current.connect(analyserRef.current)
//       analyserRef.current.connect(audioContextRef.current.destination)
//     }

//     // התחל לעדכן את נתוני הויזואליזציה
//     updateVisualizer()
//   }

//   // פונקציה לעדכון הויזואליזציה
//   const updateVisualizer = () => {
//     if (!analyserRef.current) return

//     const bufferLength = analyserRef.current.frequencyBinCount
//     const dataArray = new Uint8Array(bufferLength)

//     const updateData = () => {
//       analyserRef.current?.getByteFrequencyData(dataArray)

//       // הפחתת כמות הפסים לכמות שאנחנו רוצים להציג
//       const bars = 30
//       const step = Math.floor(bufferLength / bars)
//       const reducedData = Array(bars)
//         .fill(0)
//         .map((_, i) => {
//           const start = i * step
//           const end = start + step
//           let sum = 0
//           for (let j = start; j < end; j++) {
//             sum += dataArray[j]
//           }
//           return Math.max(10, (sum / step) * 0.4) // מינימום 10% גובה, מקסימום 100%
//         })

//       setVisualizerData(reducedData)
//       animationFrameRef.current = requestAnimationFrame(updateData)
//     }

//     animationFrameRef.current = requestAnimationFrame(updateData)
//   }

//   // תוספת של מאזינים לכל אלמנט אודיו
//   useEffect(() => {
//     audioRefs.current.forEach((audio, index) => {
//       if (!audio) return

//       // עדכון ההתקדמות
//       const updateProgress = () => {
//         if (audio) {
//           const newProgress = [...audioProgress]
//           newProgress[index] = (audio.currentTime / audio.duration) * 100 || 0
//           setAudioProgress(newProgress)

//           // עדכון הזמן הנוכחי והמשך לנגן קבוע
//           if (playingIndex === index) {
//             setCurrentTime(audio.currentTime)
//             setDuration(audio.duration)
//           }
//         }
//       }

//       // האזנה לסיום השיר
//       const handleEnded = () => {
//         if (playingAll && index < playlistSongs.length - 1) {
//           setPlayingIndex(index + 1)
//           if (audioRefs.current[index + 1]) {
//             audioRefs.current[index + 1]?.play()

//             // הגדרת אנלייזר לשיר הבא
//             if (audioRefs.current[index + 1]) {
//               setupAudioAnalyser(audioRefs.current[index + 1]!)
//             }
//           }
//         } else {
//           setPlayingIndex(null)
//           setPlayingAll(false)
//           setShowPlayer(false)
//         }
//       }

//       // האזנה לתחילת ניגון
//       const handlePlay = () => {
//         // Resume audio context if it's suspended (required by browsers)
//         if (audioContextRef.current && audioContextRef.current.state === "suspended") {
//           audioContextRef.current.resume()
//         }

//         // Only set up analyzer if not already done
//         if (!analyserRef.current) {
//           setupAudioAnalyser(audio)
//         }
//       }

//       audio.addEventListener("timeupdate", updateProgress)
//       audio.addEventListener("ended", handleEnded)
//       audio.addEventListener("play", handlePlay)

//       return () => {
//         audio.removeEventListener("timeupdate", updateProgress)
//         audio.removeEventListener("ended", handleEnded)
//         audio.removeEventListener("play", handlePlay)
//       }
//     })
//   }, [audioRefs.current, playingAll, playlistSongs.length, audioProgress, playingIndex])

//   // הגדרת ווליום לכל השירים
//   useEffect(() => {
//     audioRefs.current.forEach((audio) => {
//       if (audio) {
//         audio.volume = muted ? 0 : volume
//       }
//     })
//   }, [volume, muted])

//   // עדכון נראות הנגן
//   useEffect(() => {
//     setShowPlayer(playingIndex !== null)
//   }, [playingIndex])

//   const playSong = (index: number) => {
//     // עצירת השיר הנוכחי אם יש
//     if (playingIndex !== null && audioRefs.current[playingIndex]) {
//       audioRefs.current[playingIndex]?.pause()
//     }

//     // הפעלת השיר החדש
//     if (index === playingIndex) {
//       setPlayingIndex(null)
//       setShowPlayer(false)
//     } else {
//       setPlayingIndex(index)
//       if (audioRefs.current[index]) {
//         audioRefs.current[index]?.play()
//         setupAudioAnalyser(audioRefs.current[index]!)
//       }
//       setShowPlayer(true)
//     }
//     setPlayingAll(false)
//   }

//   const playAllSongs = () => {
//     if (playlistSongs.length === 0) return

//     if (playingAll) {
//       // עצירת כל השירים
//       if (playingIndex !== null && audioRefs.current[playingIndex]) {
//         audioRefs.current[playingIndex]?.pause()
//       }
//       setPlayingIndex(null)
//       setPlayingAll(false)
//       setShowPlayer(false)
//     } else {
//       // התחלת ניגון מהשיר הראשון
//       setPlayingIndex(0)
//       if (audioRefs.current[0]) {
//         audioRefs.current[0]?.play()
//         setupAudioAnalyser(audioRefs.current[0]!)
//       }
//       setPlayingAll(true)
//       setShowPlayer(true)
//     }
//   }

//   const playNext = () => {
//     if (playingIndex !== null && playingIndex < playlistSongs.length - 1) {
//       const nextIndex = playingIndex + 1

//       // עצירת השיר הנוכחי
//       if (audioRefs.current[playingIndex]) {
//         audioRefs.current[playingIndex]?.pause()
//       }

//       // הפעלת השיר הבא
//       setPlayingIndex(nextIndex)
//       if (audioRefs.current[nextIndex]) {
//         audioRefs.current[nextIndex]?.play()
//         setupAudioAnalyser(audioRefs.current[nextIndex]!)
//       }
//     }
//   }

//   const playPrevious = () => {
//     if (playingIndex !== null && playingIndex > 0) {
//       const prevIndex = playingIndex - 1

//       // עצירת השיר הנוכחי
//       if (audioRefs.current[playingIndex]) {
//         audioRefs.current[playingIndex]?.pause()
//       }

//       // הפעלת השיר הקודם
//       setPlayingIndex(prevIndex)
//       if (audioRefs.current[prevIndex]) {
//         audioRefs.current[prevIndex]?.play()
//         setupAudioAnalyser(audioRefs.current[prevIndex]!)
//       }
//     }
//   }

//   const togglePlayPause = () => {
//     if (playingIndex === null) return

//     if (audioRefs.current[playingIndex]?.paused) {
//       audioRefs.current[playingIndex]?.play()
//     } else {
//       audioRefs.current[playingIndex]?.pause()
//     }
//   }

//   const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (playingIndex === null) return

//     const progressBar = e.currentTarget
//     const rect = progressBar.getBoundingClientRect()
//     const clickPositionRatio = (e.clientX - rect.left) / rect.width

//     const audio = audioRefs.current[playingIndex]
//     if (audio && audio.duration) {
//       audio.currentTime = audio.duration * clickPositionRatio
//     }
//   }

//   const toggleMute = () => {
//     setMuted(!muted)
//   }

//   const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
//     const volumeBar = e.currentTarget
//     const rect = volumeBar.getBoundingClientRect()
//     const newVolume = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))

//     setVolume(newVolume)
//     setMuted(newVolume === 0)
//   }

//   const formatTime = (seconds: number): string => {
//     if (!seconds) return "0:00"
//     const mins = Math.floor(seconds / 60)
//     const secs = Math.floor(seconds % 60)
//     return `${mins}:${secs < 10 ? "0" + secs : secs}`
//   }

//   if (loading)
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
//         <CircularProgress sx={{ color: "rgb(0, 206, 209)" }} />
//       </Box>
//     )

//   // if (error)
//   //   return (
//   //     <Box sx={{ textAlign: "center", p: 3 }}>
//   //       <Typography variant="h6" color="error">
//   //         שגיאה: {error}
//   //       </Typography>
//   //     </Box>
//   //   )

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         minHeight: "100vh",
//         padding: 3,
//         paddingBottom: showPlayer ? 16 : 3,
//         background: "#000",
//         color: "#fff",
//       }}
//     >
//       <Typography
//         variant="h4"
//         gutterBottom
//         sx={{
//           fontWeight: 700,
//           marginBottom: 4,
//           textAlign: "center",
//           color: "#fff",
//           textShadow: "0 0 10px rgba(0, 206, 209, 0.5)",
//         }}
//       >
//         <QueueMusicIcon sx={{ margin: "30px", mr: 1, color: "rgb(0, 206, 209)" }} />
//         my playlists
//       </Typography>

//       {playlistSongs.length >= 0 ? (
//         <StyledPaper sx={{ width: "100%", maxWidth: 700, mb: 4 }}>
//           <List sx={{ width: "100%", padding: 0 }}>
//             {playlistSongs.map((song: Song, index: number) => (
//               <React.Fragment key={song.id}>
//                 <StyledListItem
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "stretch",
//                     p: 2,
//                     backgroundColor: playingIndex === index ? "rgba(0, 206, 209, 0.05)" : "transparent",
//                   }}
//                 >
//                   <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <IconButton
//                         onClick={() => playSong(index)}
//                         sx={{
//                           color: "rgb(0, 206, 209)",
//                           mr: 1,
//                           backgroundColor: "rgba(0, 206, 209, 0.1)",
//                           "&:hover": {
//                             backgroundColor: "rgba(0, 206, 209, 0.2)",
//                           },
//                         }}
//                       >
//                         {playingIndex === index && !audioRefs.current[index]?.paused ? (
//                           <PauseIcon />
//                         ) : (
//                           <PlayArrowIcon />
//                         )}
//                       </IconButton>
//                       <Box>
//                         <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
//                           {song.title}
//                         </Typography>
//                         <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
//                           {song.artist}
//                         </Typography>
//                       </Box>
//                     </Box>

//                     <RemoveSongButton playlistId={Number(id)} songId={song.id} />
//                   </Box>

//                   <audio
//                     ref={(el) => {
//                       audioRefs.current[index] = el;
//                     }}
//                     src={song.audioUrl}
//                     style={{ display: "none" }}
//                   />
//                 </StyledListItem>
//                 {index < playlistSongs.length - 1 && <Divider sx={{ background: "rgba(255, 255, 255, 0.05)" }} />}
//               </React.Fragment>
//             ))}
//           </List>
//         </StyledPaper>
//       ) : (
//         <StyledPaper sx={{ p: 4, textAlign: "center", mb: 4 }}>
//           <MusicNoteIcon sx={{ fontSize: 60, color: "rgba(255, 255, 255, 0.2)", mb: 2 }} />
//           <Typography variant="h6" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
//             no songs is in the playlist
//           </Typography>
//           <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.5)", mt: 1 }}>
//             add songs to start listening
//           </Typography>
//         </StyledPaper>
//       )}

//       <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
//         <TurquoiseButton
//           onClick={playAllSongs}
//           variant="contained"
//           startIcon={playingAll ? <PauseIcon /> : <PlayArrowIcon />}
//           disabled={playlistSongs.length === 0}
//         >
//           {playingAll ? "stop" : "play all songs"}
//         </TurquoiseButton>

//         <TurquoiseButton onClick={() => setShowSongList(true)} variant="contained" startIcon={<PlaylistAddIcon />}>
//          add songs to the playlist
//         </TurquoiseButton>
//       </Stack>

//       {/* נגן קבוע בתחתית העמוד */}
//       <Slide direction="up" in={showPlayer} mountOnEnter unmountOnExit>
//         <PlayerBar>
//           {/* ויזואליזציה */}
//           <Visualizer>
//             {visualizerData.map((height, i) => (
//               <VisualizerBar key={i} height={height} />
//             ))}
//           </Visualizer>

//           {/* פרטי השיר המתנגן */}
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
//             <Box sx={{ flex: 1, minWidth: 0 }}>
//               {playingIndex !== null && (
//                 <>
//                   <Typography variant="subtitle1" noWrap sx={{ fontWeight: 600 }}>
//                     {playlistSongs[playingIndex]?.title}
//                   </Typography>
//                   <Typography variant="body2" noWrap sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
//                     {playlistSongs[playingIndex]?.artist}
//                   </Typography>
//                 </>
//               )}
//             </Box>

//             {/* כפתורי שליטה */}
//             <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
//               <IconButton
//                 onClick={playPrevious}
//                 disabled={playingIndex === 0 || playingIndex === null}
//                 sx={{ color: "rgba(255, 255, 255, 0.7)" }}
//               >
//                 <SkipPreviousIcon />
//               </IconButton>

//               <IconButton
//                 onClick={togglePlayPause}
//                 sx={{
//                   color: "rgb(0, 206, 209)",
//                   backgroundColor: "rgba(0, 206, 209, 0.1)",
//                   padding: "12px",
//                   "&:hover": {
//                     backgroundColor: "rgba(0, 206, 209, 0.2)",
//                   },
//                 }}
//               >
//                 {playingIndex !== null && !audioRefs.current[playingIndex]?.paused ? <PauseIcon /> : <PlayArrowIcon />}
//               </IconButton>

//               <IconButton
//                 onClick={playNext}
//                 disabled={playingIndex === null || playingIndex === playlistSongs.length - 1}
//                 sx={{ color: "rgba(255, 255, 255, 0.7)" }}
//               >
//                 <SkipNextIcon />
//               </IconButton>

//               <Box sx={{ display: "flex", alignItems: "center", mr: 2, ml: 2 }}>
//                 <IconButton onClick={toggleMute} sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
//                   {muted ? <VolumeMuteIcon /> : <VolumeUpIcon />}
//                 </IconButton>

//                 <Box
//                   sx={{
//                     width: 60,
//                     height: 4,
//                     background: "#333",
//                     borderRadius: 2,
//                     cursor: "pointer",
//                     position: "relative",
//                   }}
//                   onClick={handleVolumeChange}
//                 >
//                   <Box
//                     sx={{
//                       position: "absolute",
//                       height: "100%",
//                       width: `${volume * 100}%`,
//                       background: "rgb(0, 206, 209)",
//                       borderRadius: 2,
//                     }}
//                   />
//                 </Box>
//               </Box>
//             </Box>
//           </Box>

//           {/* סרגל התקדמות */}
//           <Box sx={{ display: "flex", alignItems: "center", width: "100%", gap: 2 }}>
//             <Typography variant="caption">{formatTime(currentTime)}</Typography>

//             <Box
//               sx={{
//                 flex: 1,
//                 height: 4,
//                 background: "#333",
//                 borderRadius: 2,
//                 cursor: "pointer",
//                 position: "relative",
//               }}
//               onClick={handleProgressBarClick}
//             >
//               <Box
//                 sx={{
//                   position: "absolute",
//                   height: "100%",
//                   width: `${(currentTime / duration) * 100 || 0}%`,
//                   background: "rgb(0, 206, 209)",
//                   borderRadius: 2,
//                 }}
//               />
//             </Box>

//             <Typography variant="caption">{formatTime(duration)}</Typography>
//           </Box>
//         </PlayerBar>
//       </Slide>

//       <Modal open={showSongList} onClose={() => setShowSongList(false)} closeAfterTransition>
//         <Fade in={showSongList}>
//           <ModalContent>
//             <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
//               <PlaylistAddIcon sx={{ verticalAlign: "middle", mr: 1, color: "rgb(0, 206, 209)" }} />
//               ADD SONGS
//             </Typography>
//             <SongListForPlaylist playlistId={Number(id)} onClose={() => setShowSongList(false)} />
//           </ModalContent>
//         </Fade>
//       </Modal>
//     </Box>
//   )
// }

// export default PlaylistSongs















































"use client"

import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootStore } from "../Stores/songStore"
import { fetchPlaylistSongs } from "../Slices/playlistSlice"
import { useParams } from "react-router-dom"
import {
  Box,
  Button,
  Typography,
  Modal,
  List,
  ListItem,
  Divider,
  Paper,
  IconButton,
  Stack,
  Fade,
  CircularProgress,
  styled,
  Slide,
} from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import QueueMusicIcon from "@mui/icons-material/QueueMusic"
import SkipNextIcon from "@mui/icons-material/SkipNext"
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import VolumeMuteIcon from "@mui/icons-material/VolumeMute"
import SongListForPlaylist from "./SongListForPlaylistProps"
import RemoveSongButton from "./RemoveSongButtonProps "

// סטיילינג מותאם אישית
const StyledPaper = styled(Paper)(({  }) => ({
  background: "#111",
  color: "#fff",
  borderRadius: 16,
  boxShadow: "0 8px 32px rgba(0, 206, 209, 0.15)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  overflow: "hidden",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 12px 48px rgba(0, 206, 209, 0.2)",
  },
}))

const TurquoiseButton = styled(Button)(({  }) => ({
  background: "rgba(0, 206, 209, 0.9)",
  color: "#000",
  fontWeight: "bold",
  borderRadius: 8,
  padding: "10px 24px",
  "&:hover": {
    background: "rgba(0, 206, 209, 1)",
  },
}))

const StyledListItem = styled(ListItem)(({  }) => ({
  borderLeft: "3px solid transparent",
  transition: "all 0.2s ease",
  "&:hover": {
    borderLeft: "3px solid rgb(0, 206, 209)",
    background: "rgba(255, 255, 255, 0.03)",
  },
}))

const ModalContent = styled(Box)(({  }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxWidth: "90vw",
  maxHeight: "80vh",
  overflow: "auto",
  background: "#111",
  color: "#fff",
  borderRadius: 16,
  boxShadow: "0 24px 48px rgba(0, 0, 0, 0.5)",
  padding: 24,
  border: "1px solid rgba(0, 206, 209, 0.3)",
}))

const PlayerBar = styled(Box)(({  }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  background: "rgba(0, 0, 0, 0.9)",
  borderTop: "1px solid rgba(0, 206, 209, 0.3)",
  padding: "12px 24px",
  backdropFilter: "blur(10px)",
  zIndex: 1000,
  display: "flex",
  flexDirection: "column",
  color: "#fff",
}))

const Visualizer = styled(Box)(({  }) => ({
  width: "100%",
  height: 60,
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  gap: 3,
  padding: "0 24px 8px 24px",
}))

const VisualizerBar = styled(Box)<{ height: number }>(({ height }) => ({
  width: 5,
  height: `${height}%`,
  background: "rgb(0, 206, 209)",
  borderRadius: "2px 2px 0 0",
  transition: "height 0.1s ease-in-out",
}))

// ממשק לשיר
interface Song {
  id: number
  title: string
  artist: string
  audioUrl: string
  duration?: number
}

const PlaylistSongs: React.FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { playlistSongs, loading } = useSelector((state: RootStore) => state.playlists)
  const [showSongList, setShowSongList] = useState<boolean>(false)
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const [playingAll, setPlayingAll] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const [volume, setVolume] = useState<number>(1)
  const [muted, setMuted] = useState<boolean>(false)
  const [visualizerData, setVisualizerData] = useState<number[]>(Array(30).fill(10))
  const [showPlayer, setShowPlayer] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const audioRefs = useRef<(HTMLAudioElement | null)[]>([])
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (id) {
      dispatch(fetchPlaylistSongs(Number(id)))
    }
  }, [dispatch, id])

  // פונקציה פשוטה לויזואליזציה
  const startSimpleVisualizer = () => {
    const updateVisualizer = () => {
      if (isPlaying) {
        const newData = Array(30).fill(0).map(() => 
          Math.max(10, Math.random() * 80 + 20)
        )
        setVisualizerData(newData)
      }
      animationFrameRef.current = requestAnimationFrame(updateVisualizer)
    }
    updateVisualizer()
  }

  const stopVisualizer = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    setVisualizerData(Array(30).fill(10))
  }

  useEffect(() => {
    if (isPlaying) {
      startSimpleVisualizer()
    } else {
      stopVisualizer()
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPlaying])

  // הגדרת ווליום לכל השירים
  useEffect(() => {
    audioRefs.current.forEach((audio) => {
      if (audio) {
        audio.volume = muted ? 0 : volume
      }
    })
  }, [volume, muted])

  // עדכון נראות הנגן
  useEffect(() => {
    setShowPlayer(playingIndex !== null)
  }, [playingIndex])

  const playSong = (index: number) => {
    console.log(`🎵 Trying to play song at index ${index}`)
    
    // עצירת השיר הנוכחי אם יש
    if (playingIndex !== null && audioRefs.current[playingIndex]) {
      audioRefs.current[playingIndex]?.pause()
      setIsPlaying(false)
    }

    // אם זה אותו שיר - עצור
    if (index === playingIndex) {
      setPlayingIndex(null)
      setShowPlayer(false)
      setIsPlaying(false)
      return
    }

    // בדיקה שהאלמנט קיים
    const audioElement = audioRefs.current[index]
    if (!audioElement) {
      console.error(`❌ No audio element at index ${index}`)
      return
    }

    console.log(`✅ Audio element found, src: ${audioElement.src}`)

    // הפעלת השיר החדש
    setPlayingIndex(index)
    setShowPlayer(true)
    setPlayingAll(false)
    
    audioElement.play()
      .then(() => {
        console.log(`✅ Successfully playing song ${index}`)
        setIsPlaying(true)
      })
      .catch((error) => {
        console.error(`❌ Error playing song ${index}:`, error)
        setIsPlaying(false)
      })
  }

  const playAllSongs = () => {
    if (playlistSongs.length === 0) return

    if (playingAll) {
      // עצירת כל השירים
      if (playingIndex !== null && audioRefs.current[playingIndex]) {
        audioRefs.current[playingIndex]?.pause()
      }
      setPlayingIndex(null)
      setPlayingAll(false)
      setShowPlayer(false)
      setIsPlaying(false)
    } else {
      // התחלת ניגון מהשיר הראשון
      const firstAudio = audioRefs.current[0]
      if (!firstAudio) {
        console.error('❌ No first audio element')
        return
      }

      setPlayingIndex(0)
      setPlayingAll(true)
      setShowPlayer(true)
      
      firstAudio.play()
        .then(() => {
          console.log('✅ Successfully started playing all songs')
          setIsPlaying(true)
        })
        .catch((error) => {
          console.error('❌ Error playing first song:', error)
          setIsPlaying(false)
        })
    }
  }

  const playNext = () => {
    if (playingIndex !== null && playingIndex < playlistSongs.length - 1) {
      const nextIndex = playingIndex + 1
      playSong(nextIndex)
    }
  }

  const playPrevious = () => {
    if (playingIndex !== null && playingIndex > 0) {
      const prevIndex = playingIndex - 1
      playSong(prevIndex)
    }
  }

  const togglePlayPause = () => {
    if (playingIndex === null) return

    const currentAudio = audioRefs.current[playingIndex]
    if (!currentAudio) return

    if (currentAudio.paused) {
      currentAudio.play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.error('Error resuming playback:', error))
    } else {
      currentAudio.pause()
      setIsPlaying(false)
    }
  }

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (playingIndex === null) return

    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const clickPositionRatio = (e.clientX - rect.left) / rect.width

    const audio = audioRefs.current[playingIndex]
    if (audio && audio.duration) {
      audio.currentTime = audio.duration * clickPositionRatio
    }
  }

  const toggleMute = () => {
    setMuted(!muted)
  }

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const volumeBar = e.currentTarget
    const rect = volumeBar.getBoundingClientRect()
    const newVolume = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))

    setVolume(newVolume)
    setMuted(newVolume === 0)
  }

  const formatTime = (seconds: number): string => {
    if (!seconds) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" + secs : secs}`
  }

  // Event handlers for audio elements
  const handleTimeUpdate = (index: number) => (e: React.SyntheticEvent<HTMLAudioElement>) => {
    const audio = e.currentTarget
    if (playingIndex === index) {
      setCurrentTime(audio.currentTime)
      setDuration(audio.duration || 0)
    }
  }

  const handleEnded = (index: number) => () => {
    console.log(`🏁 Song ${index} ended`)
    if (playingAll && index < playlistSongs.length - 1) {
      const nextIndex = index + 1
      playSong(nextIndex)
    } else {
      setPlayingIndex(null)
      setPlayingAll(false)
      setShowPlayer(false)
      setIsPlaying(false)
    }
  }

  const handlePlay = (index: number) => () => {
    if (playingIndex === index) {
      setIsPlaying(true)
    }
  }

  const handlePause = (index: number) => () => {
    if (playingIndex === index) {
      setIsPlaying(false)
    }
  }

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
        <CircularProgress sx={{ color: "rgb(0, 206, 209)" }} />
      </Box>
    )

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        padding: 3,
        paddingBottom: showPlayer ? 16 : 3,
        background: "#000",
        color: "#fff",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 700,
          marginBottom: 4,
          textAlign: "center",
          color: "#fff",
          textShadow: "0 0 10px rgba(0, 206, 209, 0.5)",
        }}
      >
        <QueueMusicIcon sx={{ margin: "30px", mr: 1, color: "rgb(0, 206, 209)" }} />
        my playlists
      </Typography>

      {playlistSongs.length > 0 ? (
        <StyledPaper sx={{ width: "100%", maxWidth: 700, mb: 4 }}>
          <List sx={{ width: "100%", padding: 0 }}>
            {playlistSongs.map((song: Song, index: number) => (
              <React.Fragment key={song.id}>
                <StyledListItem
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    p: 2,
                    backgroundColor: playingIndex === index ? "rgba(0, 206, 209, 0.05)" : "transparent",
                  }}
                >
                  <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        onClick={() => playSong(index)}
                        sx={{
                          color: "rgb(0, 206, 209)",
                          mr: 1,
                          backgroundColor: "rgba(0, 206, 209, 0.1)",
                          "&:hover": {
                            backgroundColor: "rgba(0, 206, 209, 0.2)",
                          },
                        }}
                      >
                        {playingIndex === index && isPlaying ? (
                          <PauseIcon />
                        ) : (
                          <PlayArrowIcon />
                        )}
                      </IconButton>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          {song.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                          {song.artist}
                        </Typography>
                      </Box>
                    </Box>

                    <RemoveSongButton playlistId={Number(id)} songId={song.id} />
                  </Box>

                  <audio
                    ref={(el) => {
                      audioRefs.current[index] = el
                      if (el) {
                        console.log(`🎧 Audio ref set for index ${index}`)
                      }
                    }}
                    src={song.audioUrl}
                    preload="metadata"
                    onTimeUpdate={handleTimeUpdate(index)}
                    onEnded={handleEnded(index)}
                    onPlay={handlePlay(index)}
                    onPause={handlePause(index)}
                    style={{ display: "none" }}
                  />
                </StyledListItem>
                {index < playlistSongs.length - 1 && <Divider sx={{ background: "rgba(255, 255, 255, 0.05)" }} />}
              </React.Fragment>
            ))}
          </List>
        </StyledPaper>
      ) : (
        <StyledPaper sx={{ p: 4, textAlign: "center", mb: 4 }}>
          <MusicNoteIcon sx={{ fontSize: 60, color: "rgba(255, 255, 255, 0.2)", mb: 2 }} />
          <Typography variant="h6" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
            no songs is in the playlist
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.5)", mt: 1 }}>
            add songs to start listening
          </Typography>
        </StyledPaper>
      )}

      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <TurquoiseButton
          onClick={playAllSongs}
          variant="contained"
          startIcon={playingAll ? <PauseIcon /> : <PlayArrowIcon />}
          disabled={playlistSongs.length === 0}
        >
          {playingAll ? "stop" : "play all songs"}
        </TurquoiseButton>

        <TurquoiseButton onClick={() => setShowSongList(true)} variant="contained" startIcon={<PlaylistAddIcon />}>
         add songs to the playlist
        </TurquoiseButton>
      </Stack>

      {/* נגן קבוע בתחתית העמוד */}
      <Slide direction="up" in={showPlayer} mountOnEnter unmountOnExit>
        <PlayerBar>
          {/* ויזואליזציה */}
          <Visualizer>
            {visualizerData.map((height, i) => (
              <VisualizerBar key={i} height={height} />
            ))}
          </Visualizer>

          {/* פרטי השיר המתנגן */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {playingIndex !== null && (
                <>
                  <Typography variant="subtitle1" noWrap sx={{ fontWeight: 600 }}>
                    {playlistSongs[playingIndex]?.title}
                  </Typography>
                  <Typography variant="body2" noWrap sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    {playlistSongs[playingIndex]?.artist}
                  </Typography>
                </>
              )}
            </Box>

            {/* כפתורי שליטה */}
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <IconButton
                onClick={playPrevious}
                disabled={playingIndex === 0 || playingIndex === null}
                sx={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                <SkipPreviousIcon />
              </IconButton>

              <IconButton
                onClick={togglePlayPause}
                sx={{
                  color: "rgb(0, 206, 209)",
                  backgroundColor: "rgba(0, 206, 209, 0.1)",
                  padding: "12px",
                  "&:hover": {
                    backgroundColor: "rgba(0, 206, 209, 0.2)",
                  },
                }}
              >
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>

              <IconButton
                onClick={playNext}
                disabled={playingIndex === null || playingIndex === playlistSongs.length - 1}
                sx={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                <SkipNextIcon />
              </IconButton>

              <Box sx={{ display: "flex", alignItems: "center", mr: 2, ml: 2 }}>
                <IconButton onClick={toggleMute} sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  {muted ? <VolumeMuteIcon /> : <VolumeUpIcon />}
                </IconButton>

                <Box
                  sx={{
                    width: 60,
                    height: 4,
                    background: "#333",
                    borderRadius: 2,
                    cursor: "pointer",
                    position: "relative",
                  }}
                  onClick={handleVolumeChange}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      height: "100%",
                      width: `${volume * 100}%`,
                      background: "rgb(0, 206, 209)",
                      borderRadius: 2,
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* סרגל התקדמות */}
          <Box sx={{ display: "flex", alignItems: "center", width: "100%", gap: 2 }}>
            <Typography variant="caption">{formatTime(currentTime)}</Typography>

            <Box
              sx={{
                flex: 1,
                height: 4,
                background: "#333",
                borderRadius: 2,
                cursor: "pointer",
                position: "relative",
              }}
              onClick={handleProgressBarClick}
            >
              <Box
                sx={{
                  position: "absolute",
                  height: "100%",
                  width: `${(currentTime / duration) * 100 || 0}%`,
                  background: "rgb(0, 206, 209)",
                  borderRadius: 2,
                }}
              />
            </Box>

            <Typography variant="caption">{formatTime(duration)}</Typography>
          </Box>
        </PlayerBar>
      </Slide>

      <Modal open={showSongList} onClose={() => setShowSongList(false)} closeAfterTransition>
        <Fade in={showSongList}>
          <ModalContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              <PlaylistAddIcon sx={{ verticalAlign: "middle", mr: 1, color: "rgb(0, 206, 209)" }} />
              ADD SONGS
            </Typography>
            <SongListForPlaylist playlistId={Number(id)} onClose={() => setShowSongList(false)} />
          </ModalContent>
        </Fade>
      </Modal>
    </Box>
  )
}

export default PlaylistSongs