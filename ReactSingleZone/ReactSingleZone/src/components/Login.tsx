

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  Grid,
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material"
import { Visibility, VisibilityOff, Person, Lock } from "@mui/icons-material"
import type { AppDispatch, RootStore } from "../Stores/songStore"
import { loginUser } from "../Slices/authSlice "

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { isLoading, error } = useSelector((state: RootStore) => state.auth)
  const [showPassword, setShowPassword] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  const fullText = "Welcome back to your musical journey. Sign in to access your personalized playlists."

  const [formData, setFormData] = useState({
    Id: 0,
    UserName: "",
    password: "",
  })

  // Continuous typing animation effect
  useEffect(() => {
    let index = 0
    let timer: NodeJS.Timeout

    const typeText = () => {
      if (!isDeleting && index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1))
        index++
        timer = setTimeout(typeText, 50)
      } else if (!isDeleting && index === fullText.length) {
        timer = setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && index > 0) {
        setTypedText(fullText.slice(0, index - 1))
        index--
        timer = setTimeout(typeText, 30)
      } else if (isDeleting && index === 0) {
        setIsDeleting(false)
        timer = setTimeout(typeText, 500)
      }
    }

    typeText()

    return () => clearTimeout(timer)
  }, [isDeleting])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await dispatch(loginUser({ ...formData, Id: 1 }))
    console.log("result", result)

    if (loginUser.fulfilled.match(result)) {
      navigate("/personal-area")
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Box
      minHeight="100vh"
      maxHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: "#000000",
        p: 0,
        overflow: "hidden",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          height: "100vh",
          borderRadius: 0,
          overflow: "hidden",
          display: "flex",
          backgroundColor: "#000000",
        }}
      >
        <Grid container sx={{ height: "100%" }}>
          {/* Left Side - Login Form */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              backgroundColor: "#000000",
              p: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box sx={{ maxWidth: 380, mx: "auto", width: "100%" }}>
              <Typography
                variant="h4"
                textAlign="center"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: "#ffffff",
                  mb: 0.5,
                }}
              >
                Welcome Back
              </Typography>

              <Typography
                variant="body2"
                textAlign="center"
                sx={{
                  color: "#888888",
                  mb: 3,
                  fontSize: "0.9rem",
                }}
              >
                Sign in to continue your musical journey
              </Typography>

              {error && (
                <Box
                  sx={{
                    p: 1.5,
                    mb: 2,
                    backgroundColor: "#1a0000",
                    borderRadius: 2,
                    border: "1px solid #ff3333",
                  }}
                >
                  <Typography color="error" fontSize="0.85rem" textAlign="center">
                    {error}
                  </Typography>
                </Box>
              )}

              <form onSubmit={handleSubmit}>
                <TextField
                  label="Username"
                  name="UserName"
                  value={formData.UserName}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: "#666" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#111111",
                      "&:hover fieldset": {
                        borderColor: "#333",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#00bcd4",
                      },
                    },
                    input: {
                      color: "#ffffff",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#333",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#888",
                    },
                    "& .Mui-focused .MuiInputLabel-root": {
                      color: "#00bcd4",
                    },
                  }}
                />

                <TextField
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: "#666" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility} edge="end" sx={{ color: "#666" }}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#111111",
                      "&:hover fieldset": {
                        borderColor: "#333",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#00bcd4",
                      },
                    },
                    input: {
                      color: "#ffffff",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#333",
                    },
                    "& .MuiInputLabel-root": {
                      color: "#888",
                    },
                    "& .Mui-focused .MuiInputLabel-root": {
                      color: "#00bcd4",
                    },
                  }}
                />

                <Box sx={{ mb: 2, textAlign: "right" }}>
                  <Button
                    variant="text"
                    size="small"
                    sx={{
                      color: "#00bcd4",
                      textDecoration: "underline",
                      fontSize: "0.8rem",
                      "&:hover": {
                        backgroundColor: "rgba(0, 188, 212, 0.1)",
                      },
                    }}
                  >
                    Forgot Password?
                  </Button>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    py: 1.3,
                    fontWeight: "bold",
                    fontSize: "1rem",
                    borderRadius: 2,
                    background: "linear-gradient(45deg, #1a1a1a 30%, #333333 90%)",
                    color: "#ffffff",
                    border: "1px solid #00bcd4",
                    "&:hover": {
                      background: "linear-gradient(45deg, #333333 30%, #1a1a1a 90%)",
                      boxShadow: "0 8px 25px rgba(0, 188, 212, 0.3)",
                    },
                    "&:disabled": {
                      background: "#333",
                      color: "#666",
                      border: "1px solid #333",
                    },
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={22} color="inherit" onClick={() => navigate("register/")}/> : "Sign In"}
                </Button>
              </form>

              <Typography
                variant="body2"
                textAlign="center"
                sx={{
                  mt: 2,
                  color: "#666",
                  fontSize: "0.75rem",
                }}
              >
                By signing in, you agree to our{" "}
                <Button
                  variant="text"
                  size="small"
                  sx={{
                    p: 0,
                    minWidth: "auto",
                    color: "#00bcd4",
                    textDecoration: "underline",
                    fontSize: "0.75rem",
                  }}
                >
                  Terms
                </Button>{" "}
                and{" "}
                <Button
                  variant="text"
                  size="small"
                  sx={{
                    p: 0,
                    minWidth: "auto",
                    color: "#00bcd4",
                    textDecoration: "underline",
                    fontSize: "0.75rem",
                  }}
                >
                  Privacy Policy
                </Button>
              </Typography>
            </Box>
          </Grid>

          {/* Right Side - Welcome Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              background: "linear-gradient(135deg, #000000 0%, #1a1a1a 70%, #003d4d 100%)",
              color: "white",
              p: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
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
                width: 70,
                height: 70,
                borderRadius: "50%",
                background: "linear-gradient(45deg, #1a1a1a, #333333)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
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
              <Typography variant="h4" fontWeight="bold" color="#00bcd4">
                S
              </Typography>
            </Box>

            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{
                zIndex: 1,
                color: "#ffffff",
                mb: 2,
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
              }}
            >
              SoundWave
            </Typography>

            {/* Continuous Typing Animation */}
            <Typography
              variant="body1"
              sx={{
                maxWidth: 320,
                zIndex: 1,
                lineHeight: 1.5,
                color: "#cccccc",
                minHeight: "3em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.95rem",
              }}
            >
              {typedText}
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  width: "2px",
                  height: "1.2em",
                  backgroundColor: "#00bcd4",
                  ml: 1,
                  animation: "blink 1s infinite",
                  "@keyframes blink": {
                    "0%, 50%": { opacity: 1 },
                    "51%, 100%": { opacity: 0 },
                  },
                }}
              />
            </Typography>

            <Box sx={{ mt: 3, zIndex: 1 }}>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 1.5, fontSize: "0.85rem" }}>
                Don't have an account?
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderColor: "#333",
                  color: "#cccccc",
                  px: 2.5,
                  py: 0.8,
                  fontSize: "0.85rem",
                  "&:hover": {
                    borderColor: "#00bcd4",
                    color: "#00bcd4",
                    backgroundColor: "rgba(0, 188, 212, 0.1)",
                  },
                }}
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default LoginForm