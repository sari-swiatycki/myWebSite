"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Modal, Box } from "@mui/material"
import ModalHeader from "./ModalHeader"
import RatingContent from "./RatingContent"
import SuccessView from "./SuccessView"
import type { RatingModalProps } from "./types"
import { MODAL_STYLES } from "./constants"
import { addRating } from "../../Slices/actionSongSlice"
import type { AppDispatch } from "../../Stores/songStore"

const RatingModal: React.FC<RatingModalProps> = ({ open, onClose, songId, songTitle }) => {
  const dispatch = useDispatch<AppDispatch>()

  const [rating, setRating] = useState<number>(0)
  const [hoveredRating, setHoveredRating] = useState<number>(0)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setRating(0)
      setHoveredRating(0)
      setIsSubmitted(false)
    }
  }, [open])

  const handleRatingChange = (newRating: number) => {
    setRating(newRating)
  }

  const handleMouseEnter = (index: number) => {
    setHoveredRating(index)
  }

  const handleMouseLeave = () => {
    setHoveredRating(0)
  }

  const handleSubmitRating = async () => {
    await dispatch(addRating({ songId, value: rating }))
    console.log(`Submitting rating ${rating} for song ID ${songId}`)
    setIsSubmitted(true)

    // Close modal after 2 seconds
    setTimeout(() => {
      handleReset()
      onClose()
    }, 2000)
  }

  const handleReset = () => {
    setRating(0)
    setHoveredRating(0)
    setIsSubmitted(false)
  }

  const handleClose = () => {
    if (!isSubmitted) {
      handleReset()
      onClose()
    }
  }

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="rating-modal-title">
      <Box sx={MODAL_STYLES.container}>
        {isSubmitted ? (
          <SuccessView rating={rating} />
        ) : (
          <>
            <ModalHeader songTitle={songTitle} onClose={handleClose} />
            <RatingContent
              rating={rating}
              hoveredRating={hoveredRating}
              onRatingChange={handleRatingChange}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onSubmit={handleSubmitRating}
              onClose={handleClose}
            />
          </>
        )}
      </Box>
    </Modal>
  )
}

export default RatingModal
