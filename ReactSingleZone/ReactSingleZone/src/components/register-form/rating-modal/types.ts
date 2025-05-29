export interface RatingModalProps {
  open: boolean
  onClose: () => void
  songId: number
  songTitle: string
}

export interface StarRatingProps {
  rating: number
  hoveredRating: number
  onRatingChange: (rating: number) => void
  onMouseEnter: (index: number) => void
  onMouseLeave: () => void
}

export interface SuccessViewProps {
  rating: number
}

export interface ModalHeaderProps {
  songTitle: string
  onClose: () => void
}
