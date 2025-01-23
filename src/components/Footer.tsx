'use client'

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

export default function Footer() {
    return (
        <AppBar position="static" sx={{ top: "auto", bottom: 0 }}>
            <Toolbar sx={{ justifyContent: "center" }}>
                <Typography variant="body2" color="text.secondary">
                    © 2025 E-handel. Alla rättigheter förbehållna.
                </Typography>
            </Toolbar>
        </AppBar>
    );
}