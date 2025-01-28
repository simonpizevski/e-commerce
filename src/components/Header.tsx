"use client";

import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Header() {
    const router = useRouter();
    const { totalItems } = useCart();

    return (
        <AppBar position="sticky" sx={{ backgroundColor: "primary", color: "white" }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="home" onClick={() => router.push("/")}>
                    <HomeIcon />
                </IconButton>

                <Box
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        justifyContent: "center",
                        gap: 4,
                    }}
                >
                    <Typography
                        variant="body1"
                        onClick={() => router.push("/products")}
                        sx={{
                            cursor: "pointer",
                            fontWeight: "bold",
                            "&:hover": { textDecoration: "underline" },
                        }}
                    >
                        Products
                    </Typography>

                    <Typography
                        variant="body1"
                        onClick={() => router.push("/admin")}
                        sx={{
                            cursor: "pointer",
                            fontWeight: "bold",
                            "&:hover": { textDecoration: "underline" },
                        }}
                    >
                        Admin
                    </Typography>

                    <Typography
                        variant="body1"
                        onClick={() => router.push("/login")}
                        sx={{
                            cursor: "pointer",
                            fontWeight: "bold",
                            "&:hover": { textDecoration: "underline" },
                        }}
                    >
                        Login
                    </Typography>
                </Box>

                <Typography
                    variant="body1"
                    sx={{
                        cursor: "pointer",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                    onClick={() => router.push("/cart")}
                >
                    Cart ({totalItems})
                </Typography>
            </Toolbar>
        </AppBar>
    );
}