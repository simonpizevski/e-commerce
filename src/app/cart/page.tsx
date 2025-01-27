"use client";

import { Box, Button, Container, List, ListItem, ListItemText, Typography, Divider } from "@mui/material";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const { cartItems, removeFromCart, totalPrice, clearCart } = useCart();
    const router = useRouter();

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Cart
            </Typography>

            {cartItems.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                    The cart is empty
                </Typography>
            ) : (
                <>
                    <List>
                        {cartItems.map((item) => (
                            <Box key={item._id}>
                                <ListItem>
                                    <ListItemText
                                        primary={`${item.name}`}
                                        secondary={`Antal: ${item.quantity} | Pris: ${item.price} kr`}
                                    />
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        color="error"
                                        onClick={() => removeFromCart(item._id)}
                                    >
                                        Remove
                                    </Button>
                                </ListItem>
                                <Divider />
                            </Box>
                        ))}
                    </List>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Total: {totalPrice} kr
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <Button variant="contained" color="primary" onClick={() => router.push("/checkout")}>
                            Proceed to checkout
                        </Button>
                        <Button variant="outlined" color="error" sx={{ ml: 2 }} onClick={() => clearCart()}>
                            Empty cart
                        </Button>
                    </Box>
                </>
            )}
        </Container>
    );
}