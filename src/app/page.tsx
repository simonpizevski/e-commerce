"use client";

import { Container, Box, Typography, Button } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Välkommen till E-handel
      </Typography>
      <Typography variant="body1" color="text.secondary" >
        Här kan du köpa produkter online.
        <Button variant="contained" color="primary" href="/products">
          Visa produkter
        </Button>
      </Typography>
    </Container>
  );
}
