"use client";

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }} onClick={() => router.push("/")}>
                    E-handel
                </Typography>
                <Box>
                    <Button color="inherit" onClick={() => router.push("/products")}>
                        Produkter
                    </Button>
                    <Button color="inherit" onClick={() => router.push("/admin")}>
                        Admin
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}