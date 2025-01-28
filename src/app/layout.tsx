"use client";

import { CssBaseline, ThemeProvider, createTheme, Box } from "@mui/material";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#f48fb1" },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
    background: {
      default: "#121212",
      paper: "#1d1d1d",
    },
  },
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <SessionProvider>
            <CartProvider>
              <Header />
              {children}
            </CartProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
