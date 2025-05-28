"use client"

import type React from "react"
import { Box, Typography, Button } from "@mui/material"
import { Music } from "lucide-react"
import StarRating from "./StarRating"
import type { StarRatingProps } from "./types"
import { EMOJIS, RATING_TEXTS, MODAL_STYLES } from "./constants"

interface RatingContentProps extends StarRatingProps {
  onSubmit: () => void
  onClose: () => void
}

const RatingContent: React.FC<RatingContentProps> = ({
  rating,
  hoveredRating,
  onRatingChange,
  onMouseEnter,
  onMouseLeave,
  onSubmit,
  onClose,
}) => {
  return (
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
      <StarRating
        rating={rating}
        hoveredRating={hoveredRating}
        onRatingChange={onRatingChange}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />

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
              {EMOJIS[rating - 1]}
            </Typography>
            <Typography
              sx={{
                color: "#00ccff",
                fontWeight: 500,
                animation: "fadeIn 0.3s",
                textShadow: "0 0 10px rgba(0, 204, 255, 0.3)",
              }}
            >
              {RATING_TEXTS[rating - 1]}
            </Typography>
          </>
        )}
      </Box>

      {/* Music notes animation */}
      {rating > 0 && (
        <Box sx={{ position: "relative", height: 40 }}>
          {[1, 2, 3, 4].map((i) => (
            <Music
              key={i}
              size={20}
              style={{
                position: "absolute",
                color: "#00ccff",
                opacity: 0.7,
                left: `${20 * i}%`,
                animation: `floatNote ${1 + i * 0.5}s ease-in-out infinite ${i * 0.2}s`,
              }}
            />
          ))}
          <style>
            {`
              @keyframes floatNote {
                0% { transform: translateY(0) rotate(0deg); opacity: 0; }
                50% { opacity: 0.7; }
                100% { transform: translateY(-20px) rotate(10deg); opacity: 0; }
              }
            `}
          </style>
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
        <Button variant="outlined" onClick={onClose} sx={MODAL_STYLES.cancelButton}>
          Close
        </Button>
        <Button variant="contained" onClick={onSubmit} disabled={rating === 0} sx={MODAL_STYLES.submitButton}>
          Submit Rating
        </Button>
      </Box>
    </Box>
  )
}

export default RatingContent
