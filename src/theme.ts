import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#F43F5E", // rose-500
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#8B5CF6", // violet-500
    },

    background: {
      default: "#05070A", // 최상위 배경
      paper: "#14181f", // 카드 / 패널
    },

    text: {
      primary: "#FFFFFF",
      secondary: "#9CA3AF", // gray-400
      disabled: "#6B7280", // gray-500
    },

    action: {
      selected: "rgba(244,63,94,0.15)", // rose tint
      active: "#F43F5E",
    },

    divider: "rgba(255,255,255,0.06)",
  },

  typography: {
    fontFamily: `"Inter", "Roboto", "Arial", sans-serif`,

    h1: {
      fontWeight: 900,
      fontSize: "2rem",
      letterSpacing: "-0.02em",
    },

    h2: {
      fontWeight: 800,
      fontSize: "1.5rem",
      letterSpacing: "-0.01em",
    },

    body1: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },

    subtitle1: {
      fontSize: "0.75rem",
      fontWeight: 600,
      color: "#9CA3AF",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          textTransform: "none",
          fontWeight: 700,
        },

        containedPrimary: {
          backgroundColor: "#FFFFFF",
          color: "#000000",
          "&:hover": {
            backgroundColor: "#E5E7EB",
          },
        },

        outlinedPrimary: {
          borderColor: "rgba(255,255,255,0.15)",
          color: "#FFFFFF",
          "&:hover": {
            borderColor: "#F43F5E",
            backgroundColor: "rgba(244,63,94,0.08)",
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export default theme;
