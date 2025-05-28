"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Box, Typography } from "@mui/material"

interface TypingAnimationProps {
  text: string
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ text }) => {
  const [typedText, setTypedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let index = 0
    let timer: NodeJS.Timeout

    const typeText = () => {
      if (!isDeleting && index < text.length) {
        setTypedText(text.slice(0, index + 1))
        index++
        timer = setTimeout(typeText, 50)
      } else if (!isDeleting && index === text.length) {
        timer = setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && index > 0) {
        setTypedText(text.slice(0, index - 1))
        index--
        timer = setTimeout(typeText, 30)
      } else if (isDeleting && index === 0) {
        setIsDeleting(false)
        timer = setTimeout(typeText, 500)
      }
    }

    typeText()

    return () => clearTimeout(timer)
  }, [isDeleting, text])

  return (
    <Typography
      variant="h6"
      sx={{
        maxWidth: 350,
        zIndex: 1,
        lineHeight: 1.6,
        color: "#cccccc",
        minHeight: "4em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
  )
}

export default TypingAnimation
