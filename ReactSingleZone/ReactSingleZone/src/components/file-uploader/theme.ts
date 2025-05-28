import { createTheme } from "@mui/material/styles"

// Custom theme with black background and turquoise accents
export const fileUploaderTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#20B2AA", // Turquoise
    },
    secondary: {
      main: "#80CBC4", // Lighter turquoise
    },
    background: {
      default: "#000000", // Pure black for page background
      paper: "#121212", // Dark gray for components
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0B0",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#20B2AA",
          },
        },
        notchedOutline: {
          borderColor: "#333333",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: "100px",
          backgroundColor: "#000000",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#20B2AA",
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#121212",
          },
        },
      },
    },
  },
})
