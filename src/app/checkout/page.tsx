"use client";

import { useCart } from "@/context/CartContext";
import { Container, Typography, Box, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

export default function CheckoutPage() {
    const { cartItems, totalPrice } = useCart();
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = async () => {
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
        console.log("Public Stripe Key:", process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
        if (!stripe) {
            console.error("Could not load stripe");
            return;
        }
        setIsLoading(true);

        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cartItems }),
            });

            const { sessionId } = await res.json();

            if (!stripe) {
                throw new Error("Could not load stripe.");
            }


            await stripe.redirectToCheckout({ sessionId });
        } catch (error) {
            console.error("Unsuccessful payment:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Checkout
            </Typography>

            {cartItems.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                    Your cart is empty.
                </Typography>
            ) : (
                <Box>
                    <Typography variant="h6" gutterBottom>
                        Products
                    </Typography>
                    {cartItems.map((item) => (
                        <Box
                            key={item._id}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                borderBottom: "1px solid #ccc",
                                py: 1,
                            }}
                        >
                            <Typography>{item.name}</Typography>
                            <Typography>{item.quantity} x {item.price} SEK</Typography>
                        </Box>
                    ))}

                    <Typography variant="body1" sx={{ mt: 2, fontWeight: "bold" }}>
                        Total: {totalPrice} SEK
                    </Typography>

                    <Box sx={{ mt: 4 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCheckout}
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Pay"}
                        </Button>
                    </Box>
                </Box>
            )}
        </Container>
    );
}