'use client'

import { Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation"; // Ändra detta

export default function SuccessPage() {
    const router = useRouter();

    return (
        <Container sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Payment successful
            </Typography>
            <Typography variant="body1">Thank you for your order.</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => router.push("/")}>
                Back to start page
            </Button>
        </Container>
    );
}