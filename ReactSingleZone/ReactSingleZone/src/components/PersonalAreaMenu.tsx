

"use client"

import React, { useState, useEffect } from "react"
import { Box, Container, Typography, Card, CardContent, Grid, ThemeProvider, createTheme, alpha } from "@mui/material"
import {
  CloudUpload as UploadIcon,
  Headphones as PlaylistIcon,
  AccountCircle as ProfileIcon,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
// import { useDispatch } from "react-redux"
// import type { AppDispatch } from "../Stores/songStore"

// Custom monochromatic theme with turquoise accents
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212", // Darker black background
      paper: "#1E1E1E", // Dark gray for cards
    },
    primary: {
      main: "#22d3ee", // Turquoise accent color
    },
    secondary: {
      main: "#a1a1aa", // Gray for secondary elements
    },
    text: {
      primary: "#ffffff",
      secondary: "#a1a1aa",
    },
  },
  typography: {
    fontFamily: "Rubik, Arial, sans-serif",
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.5px",
    },
    h4: {
      fontWeight: 600,
      letterSpacing: "-0.25px",
    },
    subtitle1: {
      fontWeight: 400,
      opacity: 0.8,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
        },
      },
    },
  },
})

const PersonalAreaMenu = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeCardIndex, setActiveCardIndex] = useState(-1)
  const navigate = useNavigate()
  // const dispatch = useDispatch<AppDispatch>()
  const user = JSON.parse(sessionStorage.getItem("user") || "null")

  useEffect(() => {
    // Trigger the page load animation
    setIsLoaded(true)

    // Cycle through cards for initial animation
    const interval = setInterval(() => {
      setActiveCardIndex((prev) => {
        if (prev >= 2) {
          clearInterval(interval)
          return -1
        }
        return prev + 1
      })
    }, 300)

    return () => clearInterval(interval)
  }, [])

  const handleNavigation = (cardId: string) => {
    switch (cardId) {
      case "upload":
        navigate("/personal-area/upload-song")
        break
      case "playlists":
        // Check if user exists before navigating
        if (user) {
          navigate("/personal-area/playlists/" + user.id)
        } else {
          // Optional: Show error or redirect to login
          console.error("User not found")
        }
        break
      case "profile":
        navigate("/personal-area/profile-update")
        break
      default:
        console.error("Invalid navigation")
    }
  }

  const cardData = [
    {
      id: "upload",
      icon: <UploadIcon sx={{ fontSize: 80 }} />,
      title: "Upload Files",
      description: "Upload videos and images",
      iconColor: "#22d3ee", // Turquoise
      bgGradient: "linear-gradient(135deg, #1a1a1a, #2a2a2a)",
    },
    {
      id: "playlists",
      icon: <PlaylistIcon sx={{ fontSize: 80 }} />,
      title: "Playlists",
      description: "Play and edit playlists",
      iconColor: "#22d3ee", // Turquoise
      bgGradient: "linear-gradient(135deg, #1a1a1a, #2a2a2a)",
    },
    {
      id: "profile",
      icon: <ProfileIcon sx={{ fontSize: 80 }} />,
      title: "User Profile",
      description: "Edit personal details",
      iconColor: "#22d3ee", // Turquoise
      bgGradient: "linear-gradient(135deg, #1a1a1a, #2a2a2a)",
    },
  ]

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          backgroundColor: "background.default",
          backgroundImage: "radial-gradient(circle at 25% 25%, #1a1a1a 0%, #121212 100%)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 6,
          px: 2,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "30%",
            background: "radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.08), transparent 70%)",
            pointerEvents: "none",
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 1.5s ease-in-out",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "radial-gradient(circle at 75% 75%, rgba(34, 211, 238, 0.05), transparent 50%)",
            pointerEvents: "none",
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 1.5s ease-in-out 0.3s",
          },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h1"
            align="center"
            sx={{
              mb: 5,
              color: "white",
              position: "relative",
              display: "inline-block",
              left: "50%",
              transform: `translateX(-50%) ${isLoaded ? "translateY(0)" : "translateY(-20px)"}`,
              opacity: isLoaded ? 1 : 0,
              transition: "transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.8s ease",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -10,
                left: "30%",
                width: isLoaded ? "40%" : "0%",
                height: 4,
                backgroundColor: "primary.main",
                borderRadius: 2,
                transition: "width 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s",
              },
            }}
          >
            Personal Area
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {cardData.map((card, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={card.id}
                sx={{
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(40px)",
                  transition: `opacity 0.6s ease ${0.3 + index * 0.15}s, transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) ${0.3 + index * 0.15}s`,
                }}
              >
                <Card
                  onClick={() => handleNavigation(card.id)}
                  sx={{
                    background: card.bgGradient,
                    height: 320,
                    transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
                    transform:
                      hoveredCard === card.id || activeCardIndex === index ? "translateY(-12px)" : "translateY(0)",
                    boxShadow:
                      hoveredCard === card.id || activeCardIndex === index
                        ? `0 20px 30px rgba(0,0,0,0.3), 0 0 0 2px ${alpha("#22d3ee", 0.3)}`
                        : "0 10px 20px rgba(0,0,0,0.2)",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-12px)",
                      boxShadow: `0 20px 30px rgba(0,0,0,0.3), 0 0 0 2px ${alpha("#22d3ee", 0.3)}`,
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background:
                        hoveredCard === card.id || activeCardIndex === index
                          ? `radial-gradient(circle at center, ${alpha("#22d3ee", 0.1)} 0%, transparent 70%)`
                          : "transparent",
                      opacity: 0.7,
                      transition: "all 0.3s ease",
                      zIndex: 0,
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: "-100%",
                      left: "-100%",
                      width: "120%",
                      height: "120%",
                      background: `linear-gradient(225deg, transparent 30%, ${alpha("#22d3ee", 0.1)} 50%, transparent 70%)`,
                      opacity: hoveredCard === card.id ? 1 : 0,
                      transition: "all 0.8s ease",
                      transform: "rotate(45deg)",
                      animation: hoveredCard === card.id ? "shine 2s infinite" : "none",
                      "@keyframes shine": {
                        from: {
                          top: "-100%",
                          left: "-100%",
                        },
                        to: {
                          top: "100%",
                          left: "100%",
                        },
                      },
                      zIndex: 0,
                    },
                  }}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      textAlign: "center",
                      position: "relative",
                      zIndex: 1,
                      p: 4,
                    }}
                  >
                    <Box
                      sx={{
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                        background: alpha(card.iconColor, 0.1),
                        border: `1px solid ${alpha(card.iconColor, 0.2)}`,
                        transition: "all 0.3s ease",
                        transform: hoveredCard === card.id || activeCardIndex === index ? "scale(1.05)" : "scale(1)",
                        boxShadow:
                          hoveredCard === card.id || activeCardIndex === index
                            ? `0 0 20px ${alpha(card.iconColor, 0.3)}`
                            : "none",
                        animation: hoveredCard === card.id ? "pulse 2s infinite" : "none",
                        "@keyframes pulse": {
                          "0%": {
                            boxShadow: `0 0 0 0 ${alpha(card.iconColor, 0.4)}`,
                          },
                          "70%": {
                            boxShadow: `0 0 0 10px ${alpha(card.iconColor, 0)}`,
                          },
                          "100%": {
                            boxShadow: `0 0 0 0 ${alpha(card.iconColor, 0)}`,
                          },
                        },
                      }}
                    >
                      {React.cloneElement(card.icon, {
                        sx: {
                          fontSize: 64,
                          color: card.iconColor,
                          transition: "all 0.3s ease",
                          transform:
                            hoveredCard === card.id || activeCardIndex === index
                              ? "scale(1.1) rotate(5deg)"
                              : "scale(1) rotate(0deg)",
                          animation: hoveredCard === card.id ? "float 3s ease-in-out infinite" : "none",
                          "@keyframes float": {
                            "0%": {
                              transform: "scale(1.1) translateY(0px) rotate(0deg)",
                            },
                            "50%": {
                              transform: "scale(1.15) translateY(-5px) rotate(5deg)",
                            },
                            "100%": {
                              transform: "scale(1.1) translateY(0px) rotate(0deg)",
                            },
                          },
                        },
                      })}
                    </Box>
                    <Typography
                      variant="h4"
                      sx={{
                        mb: 1.5,
                        color: "white",
                        transition: "all 0.3s ease",
                        transform:
                          hoveredCard === card.id || activeCardIndex === index ? "translateY(-4px)" : "translateY(0)",
                        textShadow:
                          hoveredCard === card.id || activeCardIndex === index
                            ? "0 0 8px rgba(34, 211, 238, 0.3)"
                            : "none",
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: alpha("#ffffff", 0.7),
                        transition: "all 0.3s ease",
                        transform:
                          hoveredCard === card.id || activeCardIndex === index ? "translateY(-2px)" : "translateY(0)",
                        opacity: hoveredCard === card.id || activeCardIndex === index ? 1 : 0.7,
                      }}
                    >
                      {card.description}
                    </Typography>

                    {/* Animated indicator line */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 24,
                        width: hoveredCard === card.id || activeCardIndex === index ? 60 : 40,
                        height: 3,
                        backgroundColor: card.iconColor,
                        borderRadius: 4,
                        transition: "all 0.3s ease",
                        opacity: hoveredCard === card.id || activeCardIndex === index ? 1 : 0.6,
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          background: card.iconColor,
                          borderRadius: 4,
                          filter: "blur(3px)",
                          opacity: hoveredCard === card.id ? 0.6 : 0,
                          transition: "opacity 0.3s ease",
                        },
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default PersonalAreaMenu
