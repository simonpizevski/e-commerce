"use client";

import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();

    return (
        <AppBar position="sticky" sx={{ backgroundColor: "#1976d2", color: "white" }}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="home"
                    sx={{ mr: 2 }}
                    onClick={() => router.push("/")}
                >
                    <HomeIcon />
                </IconButton>

                <Typography
                    variant="h6"
                    sx={{
                        flexGrow: 1,
                        cursor: "pointer",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                    }}
                    onClick={() => router.push("/")}
                >
                    My E-commerce
                </Typography>

                <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
                    <Button
                        color="inherit"
                        startIcon={<ShoppingCartIcon />}
                        onClick={() => router.push("/products")}
                    >
                        Products
                    </Button>
                    <Button
                        color="inherit"
                        startIcon={<AdminPanelSettingsIcon />}
                        onClick={() => router.push("/admin")}
                    >
                        Admin
                    </Button>
                </Box>

                <IconButton
                    color="inherit"
                    aria-label="menu"
                    sx={{ display: { sm: "none" } }}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}