"use client";

import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Header() {
    const router = useRouter();
    const { totalItems } = useCart();

    return (
        <AppBar position="sticky" sx={{ backgroundColor: "#1976d2", color: "white" }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="home" onClick={() => router.push("/")}>
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

                <IconButton
                    color="inherit"
                    onClick={() => router.push("/cart")}
                    aria-label="go to cart"
                >
                    <Badge badgeContent={totalItems} color="error">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}