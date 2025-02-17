import { createTheme } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: "'Mulish', sans-serif",
    h1: {
      fontSize: "20px",
      [createTheme().breakpoints.up('md')]: {
        fontSize: "40px",
      },
      fontWeight: 700,
    },
    h2: {
      fontSize: "16px",
      [createTheme().breakpoints.up('md')]: {
        fontSize: "32px",
      },
      fontWeight: 700,
    },
  },
});

export default theme;