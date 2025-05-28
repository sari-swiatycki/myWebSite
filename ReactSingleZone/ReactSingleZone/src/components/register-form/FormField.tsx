"use client"

import type React from "react"
import { TextField, InputAdornment } from "@mui/material"
import { FORM_STYLES } from "./constants"

interface FormFieldProps {
  label: string
  name: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

const FormField: React.FC<FormFieldProps> = ({ label, name, type = "text", value, onChange, startIcon, endIcon }) => {
  return (
    <TextField
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      fullWidth
      margin="dense"
      variant="outlined"
      size="small"
      InputProps={{
        startAdornment: startIcon && <InputAdornment position="start">{startIcon}</InputAdornment>,
        endAdornment: endIcon && <InputAdornment position="end">{endIcon}</InputAdornment>,
      }}
      sx={FORM_STYLES.textField}
    />
  )
}

export default FormField
