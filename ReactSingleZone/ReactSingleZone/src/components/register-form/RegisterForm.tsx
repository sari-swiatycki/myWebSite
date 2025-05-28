"use client"

import type React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Grid, Box, Paper } from "@mui/material"
import RegisterFormFields from "./RegisterFormFields"
import WelcomeSection from "./WelcomeSection"
import type { RegisterFormData } from "./types"
import type { AppDispatch, RootStore } from "../../Stores/songStore"
import { registerUser } from "../../Slices/authSlice "


const RegisterForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { isLoading, error } = useSelector((state: RootStore) => state.auth)

  const [formData, setFormData] = useState<RegisterFormData>({
    UserName: "",
    email: "",
    password: "",
    roleName: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await dispatch(registerUser(formData))
    if (registerUser.fulfilled.match(result)) {
      navigate("/personal-area")
    }
  }

  const handleNavigateToLogin = () => {
    navigate("/login")
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
          {/* Left Side - Registration Form */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              backgroundColor: "#000000",
              p: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <RegisterFormFields
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={error}
            />
          </Grid>

          {/* Right Side - Welcome Section */}
          <Grid item xs={12} md={6}>
            <WelcomeSection onNavigateToLogin={handleNavigateToLogin} />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default RegisterForm
