export const EMOJIS = ["😞", "😕", "😊", "😃", "🤩"]

export const RATING_TEXTS = [
  "Sorry to hear that. Please tell us how we can improve.",
  "There's room for improvement. Thanks for your feedback.",
  "Thank you for the positive rating!",
  "Great! We're glad you enjoyed it.",
  "Perfect! We're thrilled you loved the song!",
]

export const MODAL_STYLES = {
  container: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: 450 },
    maxWidth: "95vw",
    bgcolor: "#0f0f0f",
    color: "white",
    borderRadius: 2,
    boxShadow: "0 10px 40px rgba(0, 204, 255, 0.25)",
    overflow: "hidden",
    border: "1px solid rgba(0, 204, 255, 0.1)",
    animation: "fadeIn 0.5s ease-out",
    "@keyframes fadeIn": {
      from: { opacity: 0, transform: "translate(-50%, -45%)" },
      to: { opacity: 1, transform: "translate(-50%, -50%)" },
    },
  },
  gradientBackground: {
    background: "linear-gradient(to bottom, #0f0f0f, #001620)",
  },
  closeButton: {
    position: "absolute" as const,
    top: 8,
    right: 8,
    color: "rgba(255,255,255,0.8)",
    "&:hover": {
      color: "#00ccff",
      background: "rgba(0, 204, 255, 0.1)",
    },
  },
  submitButton: {
    borderRadius: 1.5,
    px: 3,
    py: 1,
    background: "linear-gradient(90deg, #00ccff, #0088cc)",
    boxShadow: "0 4px 12px rgba(0, 204, 255, 0.3)",
    textTransform: "none" as const,
    fontWeight: 600,
    "&:hover": {
      background: "linear-gradient(90deg, #00d8ff, #0099dd)",
      boxShadow: "0 6px 15px rgba(0, 204, 255, 0.4)",
    },
    "&:disabled": {
      background: "linear-gradient(90deg, #004455, #006677)",
      boxShadow: "none",
      opacity: 0.5,
    },
    transition: "all 0.3s",
  },
  cancelButton: {
    borderRadius: 1.5,
    px: 3,
    py: 1,
    color: "rgba(255,255,255,0.8)",
    borderColor: "rgba(255,255,255,0.15)",
    textTransform: "none" as const,
    fontWeight: 500,
    "&:hover": {
      bgcolor: "rgba(255,255,255,0.05)",
      borderColor: "rgba(255,255,255,0.25)",
    },
  },
}
