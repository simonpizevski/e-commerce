"use client";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {Metadata} from "next";

const theme = createTheme(
);

export const metadata: Metadata = {
    title: "Ecommerce",
    description: "Ecommerce built with Next, MUI and MongoDB",
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
        <body>
        <ThemeProvider theme={theme}>
            <CssBaseline />
                <Header />
                {children}
                <Footer />
        </ThemeProvider>
        </body>
        </html>
    );
}