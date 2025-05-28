"use client"

import type React from "react"
import { Box, Typography, Button } from "@mui/material"
import TypingAnimation from "./TypingAnimation"
import { WELCOME_TEXT, FORM_STYLES } from "./constants"

interface WelcomeSectionProps {
  onNavigateToLogin: () => void
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onNavigateToLogin }) => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #000000 0%, #1a1a1a 70%, #003d4d 100%)",
        color: "white",
        p: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        height: "100%",
      }}
    >
      {/* Animated Background Particles */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(0, 188, 212, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(0, 188, 212, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(0, 188, 212, 0.03) 0%, transparent 50%)
          `,
          animation: "float 6s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-20px)" },
          },
        }}
      />

      {/* Logo */}
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "linear-gradient(45deg, #1a1a1a, #333333)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
          zIndex: 1,
          border: "2px solid #333",
          animation: "pulse 2s ease-in-out infinite",
          "@keyframes pulse": {
            "0%, 100%": { transform: "scale(1)" },
            "50%": { transform: "scale(1.05)" },
          },
        }}
      >
        <Typography variant="h3" fontWeight="bold" color="#00bcd4">
          S
        </Typography>
      </Box>

      <Typography
        variant="h3"
        fontWeight="bold"
        gutterBottom
        sx={{
          zIndex: 1,
          color: "#ffffff",
          mb: 3,
          textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        SoundWave
      </Typography>

      {/* Continuous Typing Animation */}
      <TypingAnimation text={WELCOME_TEXT} />

      <Box sx={{ mt: 4, zIndex: 1 }}>
        <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
          Already have an account?
        </Typography>
        <Button variant="outlined" sx={FORM_STYLES.signInButton} onClick={onNavigateToLogin}>
          Sign In
        </Button>
      </Box>
    </Box>
  )
}

export default WelcomeSection
