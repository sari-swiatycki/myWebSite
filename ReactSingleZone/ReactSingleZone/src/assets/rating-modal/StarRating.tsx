"use client"

import type React from "react"
import { Box } from "@mui/material"
import { Star } from "lucide-react"
import type { StarRatingProps } from "./types"

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  hoveredRating,
  onRatingChange,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
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
          onClick={() => onRatingChange(index)}
          onMouseEnter={() => onMouseEnter(index)}
          onMouseLeave={onMouseLeave}
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
              boxShadow: hoveredRating >= index || rating >= index ? "0 0 15px rgba(0, 204, 255, 0.3)" : "none",
              opacity: hoveredRating >= index || rating >= index ? 1 : 0,
              transform: hoveredRating >= index || rating >= index ? "scale(1)" : "scale(0.7)",
              transition: "all 0.2s",
            }}
          />
          <Star
            size={32}
            fill={hoveredRating >= index || rating >= index ? "#00ccff" : "transparent"}
            style={{
              color: hoveredRating >= index || rating >= index ? "#00ccff" : "rgba(255,255,255,0.3)",
              filter:
                hoveredRating >= index || rating >= index ? "drop-shadow(0 0 3px rgba(0, 204, 255, 0.7))" : "none",
              zIndex: 2,
              transition: "all 0.2s",
            }}
          />
        </Box>
      ))}
    </Box>
  )
}

export default StarRating
