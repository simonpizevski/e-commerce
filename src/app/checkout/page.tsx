"use client";

import { Container, Typography, Button, Box } from "@mui/material";

export default function CheckoutPage() {
    const handlePayment = () => {
        alert("Betalning simulerad! Tack för ditt köp.");
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
                Kassasida
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
                Detta är en simulerad betalning. Inga riktiga betalningar hanteras.
            </Typography>
            <Button variant="contained" color="primary" onClick={handlePayment}>
                Betala nu
            </Button>
        </Container>
    );
}
