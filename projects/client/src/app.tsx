import { StrictMode, useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { router } from "./router";
import { TrpcProvider } from "./trpc";
import type { TypographyOptions } from "@mui/material/styles/createTypography";

const typographyOptions: TypographyOptions = {
  fontFamily: "'Roboto', 'Noto Sans JP', sans-serif",
  h1: {
    fontSize: "2rem",
    fontWeight: 500,
    lineHeight: 1.75,
    letterSpacing: "-0.035em",
  },
  h2: {
    fontSize: "1.65rem",
    fontWeight: 500,
    lineHeight: 1.75,
    letterSpacing: "-0.03em",
  },
  h3: {
    fontSize: "1.5rem",
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: "-0.025em",
  },
  h4: {
    fontSize: "1.25rem",
    lineHeight: 1.5,
    letterSpacing: "-0.02em",
  },
  body1: {
    lineHeight: 1.7,
    letterSpacing: "0.05em",
  },
  caption: {
    fontSize: "0.85rem",
    lineHeight: 1.75,
    letterSpacing: "0.075em",
  },
  button: {
    fontSize: "0.85rem",
    fontWeight: 500,
  },
};

export const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
        typography: typographyOptions,
      }),
    [prefersDarkMode],
  );

  return (
    <StrictMode>
      <TrpcProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </TrpcProvider>
    </StrictMode>
  );
};
