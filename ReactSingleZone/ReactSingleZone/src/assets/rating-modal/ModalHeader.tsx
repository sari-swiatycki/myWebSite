"use client"

import type React from "react"
import { Box, Typography, IconButton } from "@mui/material"
import { DoorClosedIcon as Close, Headphones } from "lucide-react"
import type { ModalHeaderProps } from "./types"
import { MODAL_STYLES } from "./constants"

const ModalHeader: React.FC<ModalHeaderProps> = ({ songTitle, onClose }) => {
  return (
    <Box
      sx={{
        p: 3,
        ...MODAL_STYLES.gradientBackground,
        color: "white",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid rgba(0, 204, 255, 0.1)",
      }}
    >
      <IconButton onClick={onClose} sx={MODAL_STYLES.closeButton}>
        <Close />
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
          <Headphones
            size={40}
            style={{
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
  )
}

export default ModalHeader
