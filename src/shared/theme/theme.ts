import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#9fb4c3" },
    background: { default: "#ffffff", paper: "#fafafa" },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
    button: { textTransform: "none" },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { padding: "8px 16px", borderRadius: 10 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { boxShadow: "none" },
      },
    },
  },
});

export default theme;
