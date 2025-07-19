
// import React, { useState } from 'react';
// import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
// import StarIcon from '@mui/icons-material/Star';
// import CloseIcon from '@mui/icons-material/Close';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../Stores/songStore';
// import { addRating } from '../Slices/actionSongSlice';


// interface RatingModalProps {
//   open: boolean;
//   onClose: () => void;
//   songId: number;
//   songTitle: string;
// }

// const RatingModal: React.FC<RatingModalProps> = ({ open, onClose, songId, songTitle }) => {
//     const dispatch = useDispatch<AppDispatch>();

//   const [rating, setRating] = useState<number>(0);
//   const [hoveredRating, setHoveredRating] = useState<number>(0);
//   const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

//   // אימוג'ים ומשפטים לפי דירוג
//   const emojis = ['😞','😕','😊','😃','🤩'];
//   const ratingTexts = [
//     'מצטערים לשמוע. אנא ספרו לנו איך נוכל להשתפר.',
//     'יש מקום לשיפור. תודה על המשוב.',
//     'תודה על הדירוג החיובי!',
//     'נהדר! שמחים שנהניתם.',
//     'מושלם! אנחנו שמחים שאהבתם!'
//   ];

//   const handleRatingChange = (newRating: number) => {
//     setRating(newRating);
//   };

//   const handleMouseEnter = (index: number) => {
//     setHoveredRating(index);
//   };

//   const handleMouseLeave = () => {
//     setHoveredRating(0);
//   };

//   const handleSubmitRating =async () => {
//    await dispatch(addRating({ songId, value: rating }));
//     // כאן יש להוסיף את הלוגיקה לשליחת הדירוג לשרת
//     console.log(`Submitting rating ${rating} for drawing ID ${songId}`);
//     setIsSubmitted(true);
    
//     // לאחר 2 שניות סוגרים את המודל
//     setTimeout(() => {
//       handleReset();
//       onClose();
//     }, 2000);
//   };

//   const handleReset = () => {
//     setRating(0);
//     setHoveredRating(0);
//     setIsSubmitted(false);
//   };

//   return (
//     <Modal
//       open={open}
//       onClose={() => {
//         if (!isSubmitted) {
//           handleReset();
//           onClose();
//         }
//       }}
//       aria-labelledby="rating-modal-title"
//     >
//       <Box sx={{
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         width: { xs: '90%', sm: 450 },
//         maxWidth: '95vw',
//         bgcolor: 'background.paper',
//         borderRadius: 4,
//         boxShadow: 24,
//         overflow: 'hidden',
//         animation: 'float 6s ease-in-out infinite, fadeIn 0.7s ease-out',
//         '@keyframes float': {
//           '0%': { transform: 'translate(-50%, -50%)' },
//           '50%': { transform: 'translate(-50%, -53%)' },
//           '100%': { transform: 'translate(-50%, -50%)' }
//         },
//         '@keyframes fadeIn': {
//           from: { opacity: 0, transform: 'translate(-50%, -40%)' },
//           to: { opacity: 1, transform: 'translate(-50%, -50%)' }
//         }
//       }}>
//         {isSubmitted ? (
//           // תצוגת הצלחה
//           <Box sx={{
//             p: 4,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             textAlign: 'center'
//           }}>
//             <Box sx={{
//               width: 80,
//               height: 80,
//               borderRadius: '50%',
//               bgcolor: 'primary.main',
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               color: 'white',
//               mb: 2,
//               animation: 'pulse 2s infinite',
//               '@keyframes pulse': {
//                 '0%': { transform: 'scale(1)' },
//                 '50%': { transform: 'scale(1.05)' },
//                 '100%': { transform: 'scale(1)' }
//               }
//             }}>
//               <CheckCircleIcon fontSize="large" />
//             </Box>
//             <Typography variant="h5" component="h2" fontWeight="bold" mb={1}>
//               תודה על המשוב שלך!
//             </Typography>
//             <Typography color="text.secondary">
//               המשוב שלך התקבל בהצלחה.<br />אנו מעריכים את הזמן שהקדשת לנו.
//             </Typography>
//           </Box>
//         ) : (
//           <>
//             {/* כותרת */}
//             <Box sx={{
//               p: 3,
//               background: 'linear-gradient(135deg, #5e60ce, #6930c3)',
//               color: 'white',
//               position: 'relative',
//               overflow: 'hidden'
//             }}>
//               <IconButton
//                 onClick={() => {
//                   handleReset();
//                   onClose();
//                 }}
//                 sx={{
//                   position: 'absolute',
//                   top: 8,
//                   right: 8,
//                   color: 'white'
//                 }}
//               >
//                 <CloseIcon />
//               </IconButton>
              
//               {/* אפקט ריפל */}
//               {[1, 2, 3].map((i) => (
//                 <Box
//                   key={i}
//                   sx={{
//                     position: 'absolute',
//                     borderRadius: '50%',
//                     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//                     width: i === 1 ? 200 : i === 2 ? 150 : 100,
//                     height: i === 1 ? 200 : i === 2 ? 150 : 100,
//                     right: i === 1 ? -100 : i === 2 ? 50 : 'auto',
//                     left: i === 3 ? -50 : 'auto',
//                     top: i === 1 ? -100 : i === 3 ? 10 : 'auto',
//                     bottom: i === 2 ? -70 : 'auto',
//                     animation: `ripple 2s linear infinite ${0.5 * (i - 1)}s`,
//                     '@keyframes ripple': {
//                       '0%': { transform: 'scale(0.8)', opacity: 1 },
//                       '100%': { transform: 'scale(1.5)', opacity: 0 }
//                     }
//                   }}
//                 />
//               ))}
              
//               <Typography variant="h5" component="h2" fontWeight="bold" textAlign="center">
//                 דרגו את הציור
//               </Typography>
//               <Typography textAlign="center" fontSize="1rem" mt={1}>
//                 {songTitle}
//               </Typography>
//             </Box>
            
//             {/* תוכן */}
//             <Box sx={{ p: 3, textAlign: 'center' }}>
//               <Typography sx={{ mb: 3, fontWeight: 500, fontSize: '1.1rem' }}>
//                 כמה אהבתם את הציור?
//               </Typography>
              
//               {/* כוכבים לדירוג */}
//               <Box sx={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 gap: 1.5,
//                 my: 3
//               }}>
//                 {[1, 2, 3, 4, 5].map((index) => (
//                   <Box
//                     key={index}
//                     onClick={() => handleRatingChange(index)}
//                     onMouseEnter={() => handleMouseEnter(index)}
//                     onMouseLeave={handleMouseLeave}
//                     sx={{
//                       position: 'relative',
//                       display: 'flex',
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                       cursor: 'pointer'
//                     }}
//                   >
//                     <Box sx={{
//                       position: 'absolute',
//                       width: 55,
//                       height: 55,
//                       borderRadius: '50%',
//                       bgcolor: 'white',
//                       boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
//                       opacity: hoveredRating >= index || rating >= index ? 1 : 0,
//                       transform: hoveredRating >= index || rating >= index ? 'scale(1)' : 'scale(0.7)',
//                       transition: 'all 0.3s'
//                     }} />
//                     <StarIcon 
//                       fontSize="large"
//                       sx={{
//                         color: hoveredRating >= index || rating >= index ? '#FFD700' : '#e0e0e0',
//                         zIndex: 2,
//                         transition: 'color 0.3s'
//                       }}
//                     />
//                   </Box>
//                 ))}
//               </Box>
              
//               {/* אימוג'י ומשפט */}
//               <Box sx={{ minHeight: 80, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                 {rating > 0 && (
//                   <>
//                     <Typography sx={{
//                       fontSize: '2.5rem',
//                       mt: 1,
//                       mb: 1,
//                       animation: 'fadeIn 0.3s'
//                     }}>
//                       {emojis[rating - 1]}
//                     </Typography>
//                     <Typography sx={{
//                       color: 'primary.main',
//                       fontWeight: 500,
//                       animation: 'fadeIn 0.3s'
//                     }}>
//                       {ratingTexts[rating - 1]}
//                     </Typography>
//                   </>
//                 )}
//               </Box>
              
//               {/* כפתורים */}
//               <Box sx={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 mt: 4
//               }}>
//                 <Button
//                   variant="outlined"
//                   onClick={() => {
//                     handleReset();
//                     onClose();
//                   }}
//                   sx={{
//                     borderRadius: 50,
//                     px: 3,
//                     py: 1,
//                     color: '#777',
//                     borderColor: '#ddd',
//                     '&:hover': {
//                       bgcolor: '#f5f5f5',
//                       borderColor: '#ddd'
//                     }
//                   }}
//                 >
//                   סגור
//                 </Button>
//                 <Button
//                   variant="contained"
//                   onClick={handleSubmitRating}
//                   disabled={rating === 0}
//                   sx={{
//                     borderRadius: 50,
//                     px: 3,
//                     py: 1,
//                     background: 'linear-gradient(135deg, #5e60ce, #6930c3)',
//                     boxShadow: '0 5px 15px rgba(94, 96, 206, 0.3)',
//                     '&:hover': {
//                       background: 'linear-gradient(135deg, #5e60ce, #6930c3)',
//                       boxShadow: '0 8px 25px rgba(94, 96, 206, 0.4)',
//                       transform: 'translateY(-3px)'
//                     },
//                     '&:disabled': {
//                       background: 'linear-gradient(135deg, #9d9fc7, #a594d2)',
//                       boxShadow: 'none'
//                     },
//                     transition: 'all 0.4s'
//                   }}
//                 >
//                   שלח דירוג
//                 </Button>
//               </Box>
//             </Box>
//           </>
//         )}
//       </Box>
//     </Modal>
//   );
// };

// export default RatingModal;



"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { Modal, Box, Typography, Button, IconButton } from "@mui/material"
import StarIcon from "@mui/icons-material/Star"
import CloseIcon from "@mui/icons-material/Close"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

import { addRating } from "../Slices/actionSongSlice"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import HeadphonesIcon from "@mui/icons-material/Headphones"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../Stores/songStore"

// import { AppDispatch } from "../Stores/songStore"
// import { useDispatch } from "react-redux"

interface RatingModalProps {
  open: boolean
  onClose: () => void
  songId: number
  songTitle: string
}

const RatingModal: React.FC<RatingModalProps> = ({ open, onClose, songId, songTitle }) => {
  const dispatch = useDispatch<AppDispatch>()

  // Get songs from Redux store to update UI immediately
  // const songs = useSelector((state: RootStore) => state.songs.songs)

  const [rating, setRating] = useState<number>(0)
  const [hoveredRating, setHoveredRating] = useState<number>(0)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setRating(0)
      setHoveredRating(0)
      setIsSubmitted(false)
    }
  }, [open])

  // Emojis and texts based on rating
  const emojis = ["😞", "😕", "😊", "😃", "🤩"]
  const ratingTexts = [
    "Sorry to hear that. Please tell us how we can improve.",
    "There's room for improvement. Thanks for your feedback.",
    "Thank you for the positive rating!",
    "Great! We're glad you enjoyed it.",
    "Perfect! We're thrilled you loved the song!",
  ]

  const handleRatingChange = (newRating: number) => {
    setRating(newRating)
  }

  const handleMouseEnter = (index: number) => {
    setHoveredRating(index)
  }

  const handleMouseLeave = () => {
    setHoveredRating(0)
  }

  const handleSubmitRating = async () => {
    // Send rating to server
    await dispatch(addRating({ songId, value: rating }))

    // Update local state immediately for UI refresh
    // This ensures the rating is visible immediately without needing to search again

    console.log(`Submitting rating ${rating} for song ID ${songId}`)
    setIsSubmitted(true)

    // Close modal after 2 seconds
    setTimeout(() => {
      handleReset()
      onClose()
    }, 2000)
  }

  const handleReset = () => {
    setRating(0)
    setHoveredRating(0)
    setIsSubmitted(false)
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        if (!isSubmitted) {
          handleReset()
          onClose()
        }
      }}
      aria-labelledby="rating-modal-title"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 450 },
          maxWidth: "95vw",
          bgcolor: "#0f0f0f",
          color: "white",
          borderRadius: 2,
          boxShadow: "0 10px 40px rgba(0, 204, 255, 0.25)",
          overflow: "hidden",
          border: "1px solid rgba(0, 204, 255, 0.1)",
          animation: "fadeIn 0.5s ease-out",
          "@keyframes fadeIn": {
            from: { opacity: 0, transform: "translate(-50%, -45%)" },
            to: { opacity: 1, transform: "translate(-50%, -50%)" },
          },
        }}
      >
        {isSubmitted ? (
          // Success view
          <Box
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              background: "linear-gradient(to bottom, #0f0f0f, #001620)",
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #00ccff, #0088cc)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#0f0f0f",
                mb: 2,
                boxShadow: "0 0 25px rgba(0, 204, 255, 0.4)",
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%": { transform: "scale(1)", boxShadow: "0 0 25px rgba(0, 204, 255, 0.4)" },
                  "50%": { transform: "scale(1.05)", boxShadow: "0 0 30px rgba(0, 204, 255, 0.6)" },
                  "100%": { transform: "scale(1)", boxShadow: "0 0 25px rgba(0, 204, 255, 0.4)" },
                },
              }}
            >
              <CheckCircleIcon fontSize="large" />
            </Box>
            <Typography
              variant="h5"
              component="h2"
              fontWeight="bold"
              mb={1}
              sx={{
                background: "linear-gradient(90deg, #ffffff, #00ccff)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Thank you for your feedback!
            </Typography>
            <Typography color="rgba(255,255,255,0.8)">
              Your rating has been successfully received.
              <br />
              We appreciate your time.
            </Typography>

            {/* Display the submitted rating */}
            <Box sx={{ mt: 3, display: "flex", alignItems: "center", gap: 1 }}>
              <Typography sx={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}>Your rating:</Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    sx={{
                      color: i < rating ? "#00ccff" : "rgba(255,255,255,0.2)",
                      fontSize: "1.2rem",
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        ) : (
          <>
            {/* Header */}
            <Box
              sx={{
                p: 3,
                background: "linear-gradient(to bottom, #0f0f0f, #001620)",
                color: "white",
                position: "relative",
                overflow: "hidden",
                borderBottom: "1px solid rgba(0, 204, 255, 0.1)",
              }}
            >
              <IconButton
                onClick={() => {
                  handleReset()
                  onClose()
                }}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  color: "rgba(255,255,255,0.8)",
                  "&:hover": {
                    color: "#00ccff",
                    background: "rgba(0, 204, 255, 0.1)",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>

              {/* Ambient glow effect */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "radial-gradient(circle at 50% 10%, rgba(0, 204, 255, 0.08) 0%, rgba(0, 0, 0, 0) 70%)",
                  zIndex: 0,
                }}
              />

              {/* Ripple effect */}
              {[1, 2, 3].map((i) => (
                <Box
                  key={i}
                  sx={{
                    position: "absolute",
                    borderRadius: "50%",
                    backgroundColor: "rgba(0, 204, 255, 0.1)",
                    width: i === 1 ? 200 : i === 2 ? 150 : 100,
                    height: i === 1 ? 200 : i === 2 ? 150 : 100,
                    right: i === 1 ? -100 : i === 2 ? 50 : "auto",
                    left: i === 3 ? -50 : "auto",
                    top: i === 1 ? -100 : i === 3 ? 10 : "auto",
                    bottom: i === 2 ? -70 : "auto",
                    animation: `ripple 3s linear infinite ${0.5 * (i - 1)}s`,
                    "@keyframes ripple": {
                      "0%": { transform: "scale(0.8)", opacity: 0.5 },
                      "100%": { transform: "scale(1.5)", opacity: 0 },
                    },
                  }}
                />
              ))}

              <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <HeadphonesIcon
                    sx={{
                      fontSize: 40,
                      color: "#00ccff",
                      filter: "drop-shadow(0 0 8px rgba(0, 204, 255, 0.5))",
                    }}
                  />
                </Box>

                {/* Equalizer effect */}
                <Box
                  sx={{
                    display: "flex",
                    gap: "3px",
                    height: 20,
                    alignItems: "flex-end",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  {[...Array(9)].map((_, i) => {
                    const barHeight = Math.floor(Math.random() * 15) + 5
                    const animationDuration = (Math.random() * 0.8 + 0.5).toFixed(1)

                    return (
                      <Box
                        key={i}
                        sx={{
                          width: "3px",
                          height: `${barHeight}px`,
                          backgroundColor: "#00ccff",
                          borderRadius: "1px",
                          animation: `equalizer ${animationDuration}s ease-in-out infinite alternate`,
                          "@keyframes equalizer": {
                            "0%": { height: `${barHeight}px` },
                            "100%": { height: `${Math.floor(Math.random() * 20) + 5}px` },
                          },
                        }}
                      />
                    )
                  })}
                </Box>

                <Typography
                  variant="h5"
                  component="h2"
                  fontWeight="600"
                  textAlign="center"
                  sx={{
                    fontSize: "1.4rem",
                    letterSpacing: "0.5px",
                    textShadow: "0 2px 10px rgba(0, 204, 255, 0.3)",
                  }}
                >
                  Rate This Song
                </Typography>
                <Typography
                  textAlign="center"
                  fontSize="0.95rem"
                  mt={1}
                  sx={{
                    color: "rgba(255,255,255,0.8)",
                    fontWeight: 500,
                    maxWidth: "90%",
                    margin: "8px auto 0",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {songTitle}
                </Typography>
              </Box>
            </Box>

            {/* Content */}
            <Box
              sx={{
                p: 3,
                textAlign: "center",
                background: "linear-gradient(to top, #0f0f0f, #001620)",
              }}
            >
              <Typography
                sx={{
                  mb: 3,
                  fontWeight: 500,
                  fontSize: "1rem",
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                How much did you enjoy this song?
              </Typography>

              {/* Stars for rating */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 1.5,
                  my: 3,
                }}
              >
                {[1, 2, 3, 4, 5].map((index) => (
                  <Box
                    key={index}
                    onClick={() => handleRatingChange(index)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    sx={{
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        background:
                          hoveredRating >= index || rating >= index
                            ? "radial-gradient(circle, rgba(0, 204, 255, 0.15) 0%, rgba(0, 204, 255, 0) 70%)"
                            : "transparent",
                        boxShadow:
                          hoveredRating >= index || rating >= index ? "0 0 15px rgba(0, 204, 255, 0.3)" : "none",
                        opacity: hoveredRating >= index || rating >= index ? 1 : 0,
                        transform: hoveredRating >= index || rating >= index ? "scale(1)" : "scale(0.7)",
                        transition: "all 0.2s",
                      }}
                    />
                    <StarIcon
                      fontSize="large"
                      sx={{
                        color: hoveredRating >= index || rating >= index ? "#00ccff" : "rgba(255,255,255,0.3)",
                        filter:
                          hoveredRating >= index || rating >= index
                            ? "drop-shadow(0 0 3px rgba(0, 204, 255, 0.7))"
                            : "none",
                        zIndex: 2,
                        transition: "all 0.2s",
                      }}
                    />
                  </Box>
                ))}
              </Box>

              {/* Emoji and text */}
              <Box sx={{ minHeight: 80, display: "flex", flexDirection: "column", alignItems: "center" }}>
                {rating > 0 && (
                  <>
                    <Typography
                      sx={{
                        fontSize: "2.5rem",
                        mt: 1,
                        mb: 1,
                        animation: "fadeIn 0.3s",
                      }}
                    >
                      {emojis[rating - 1]}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#00ccff",
                        fontWeight: 500,
                        animation: "fadeIn 0.3s",
                        textShadow: "0 0 10px rgba(0, 204, 255, 0.3)",
                      }}
                    >
                      {ratingTexts[rating - 1]}
                    </Typography>
                  </>
                )}
              </Box>

              {/* Music notes animation */}
              {rating > 0 && (
                <Box sx={{ position: "relative", height: 40 }}>
                  {[1, 2, 3, 4].map((i) => (
                    <MusicNoteIcon
                      key={i}
                      sx={{
                        position: "absolute",
                        color: "#00ccff",
                        opacity: 0.7,
                        fontSize: 20,
                        left: `${20 * i}%`,
                        animation: `floatNote ${1 + i * 0.5}s ease-in-out infinite ${i * 0.2}s`,
                        "@keyframes floatNote": {
                          "0%": { transform: "translateY(0) rotate(0deg)", opacity: 0 },
                          "50%": { opacity: 0.7 },
                          "100%": { transform: "translateY(-20px) rotate(10deg)", opacity: 0 },
                        },
                      }}
                    />
                  ))}
                </Box>
              )}

              {/* Buttons */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 4,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => {
                    handleReset()
                    onClose()
                  }}
                  sx={{
                    borderRadius: 1.5,
                    px: 3,
                    py: 1,
                    color: "rgba(255,255,255,0.8)",
                    borderColor: "rgba(255,255,255,0.15)",
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.05)",
                      borderColor: "rgba(255,255,255,0.25)",
                    },
                  }}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSubmitRating}
                  disabled={rating === 0}
                  sx={{
                    borderRadius: 1.5,
                    px: 3,
                    py: 1,
                    background: "linear-gradient(90deg, #00ccff, #0088cc)",
                    boxShadow: "0 4px 12px rgba(0, 204, 255, 0.3)",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      background: "linear-gradient(90deg, #00d8ff, #0099dd)",
                      boxShadow: "0 6px 15px rgba(0, 204, 255, 0.4)",
                    },
                    "&:disabled": {
                      background: "linear-gradient(90deg, #004455, #006677)",
                      boxShadow: "none",
                      opacity: 0.5,
                    },
                    transition: "all 0.3s",
                  }}
                >
                  Submit Rating
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  )
}

export default RatingModal
