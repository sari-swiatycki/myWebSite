export const WELCOME_TEXT = "Join the ultimate music experience. Create personalized playlists and discover new sounds."

export const FORM_STYLES = {
  textField: {
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
  },
  submitButton: {
    py: 1.5,
    fontWeight: "bold",
    fontSize: "1.1rem",
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
  },
  linkButton: {
    p: 0,
    minWidth: "auto",
    color: "#00bcd4",
    textDecoration: "underline",
    fontSize: "0.8rem",
  },
  signInButton: {
    borderColor: "#333",
    color: "#cccccc",
    px: 3,
    py: 1,
    "&:hover": {
      borderColor: "#00bcd4",
      color: "#00bcd4",
      backgroundColor: "rgba(0, 188, 212, 0.1)",
    },
  },
}
