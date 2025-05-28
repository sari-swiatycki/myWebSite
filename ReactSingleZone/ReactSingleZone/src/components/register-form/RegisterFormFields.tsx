"use client"

import type React from "react"
import { useState } from "react"
import { Box, IconButton, CircularProgress, Button, Typography } from "@mui/material"
import { Visibility, VisibilityOff, Person, Email, Lock, Work } from "@mui/icons-material"
import FormField from "./FormField"
import type { RegisterFormData } from "./types"
import { FORM_STYLES } from "./constants"

interface RegisterFormFieldsProps {
  formData: RegisterFormData
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  isLoading: boolean
  error: string | null
}

const RegisterFormFields: React.FC<RegisterFormFieldsProps> = ({ formData, onChange, onSubmit, isLoading, error }) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", width: "100%" }}>
      <Typography
        variant="h4"
        textAlign="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#ffffff",
          mb: 1,
        }}
      >
        Create Account
      </Typography>

      <Typography
        variant="body2"
        textAlign="center"
        sx={{
          color: "#888888",
          mb: 3,
        }}
      >
        Get started with your musical journey
      </Typography>

      {error && (
        <Box
          sx={{
            p: 2,
            mb: 3,
            backgroundColor: "#1a0000",
            borderRadius: 2,
            border: "1px solid #ff3333",
          }}
        >
          <Typography color="error" fontSize="0.9rem" textAlign="center">
            {error}
          </Typography>
        </Box>
      )}

      <form onSubmit={onSubmit}>
        <FormField
          label="Username"
          name="UserName"
          value={formData.UserName}
          onChange={onChange}
          startIcon={<Person sx={{ color: "#666" }} />}
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          startIcon={<Email sx={{ color: "#666" }} />}
        />

        <FormField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={onChange}
          startIcon={<Lock sx={{ color: "#666" }} />}
          endIcon={
            <IconButton onClick={togglePasswordVisibility} edge="end" sx={{ color: "#666" }}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          }
        />

        <FormField
          label="Role Name"
          name="roleName"
          value={formData.roleName}
          onChange={onChange}
          startIcon={<Work sx={{ color: "#666" }} />}
        />

        <Button type="submit" fullWidth variant="contained" sx={FORM_STYLES.submitButton} disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
        </Button>
      </form>

      <Typography
        variant="body2"
        textAlign="center"
        sx={{
          mt: 2,
          color: "#666",
          fontSize: "0.8rem",
        }}
      >
        By creating an account, you agree to our{" "}
        <Button variant="text" size="small" sx={FORM_STYLES.linkButton}>
          Terms
        </Button>{" "}
        and{" "}
        <Button variant="text" size="small" sx={FORM_STYLES.linkButton}>
          Privacy Policy
        </Button>
      </Typography>
    </Box>
  )
}

export default RegisterFormFields
