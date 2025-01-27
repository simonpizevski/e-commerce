"use client";

import { Container, Typography, Button } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Welcome to my E-commerce site!
      </Typography>
      <Typography variant="body1" color="text.secondary" >
        <Button variant="contained" color="primary" href="/products">
          Show products
        </Button>
      </Typography>
    </Container>
  );
}
