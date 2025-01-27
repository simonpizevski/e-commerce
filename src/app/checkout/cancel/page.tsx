"use client"

import { Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function CancelPage() {
    const router = useRouter();

    return (
        <Container sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h4" color="error" gutterBottom>
                Payment cancelled
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => router.push("/cart")}>
                Back to cart
            </Button>
        </Container>
    );
}