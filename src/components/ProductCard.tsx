import React, { useState } from "react";
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Snackbar } from "@mui/material";

interface ProductCardProps {
    name: string;
    description: string;
    price: number;
    image: string;
    stock: number;
    onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, description, price, image, stock, onAddToCart }) => {
    console.log("Rendering product:", { name, description, price, image, stock });

    const [showSnackbar, setShowSnackbar] = useState(false);

    const handleAddToCart = () => {
        onAddToCart();
        setShowSnackbar(true);
    };

    return (
        <Card sx={{ maxWidth: 345, m: 2, boxShadow: 3 }}>
            <CardMedia
                component="img"
                height="200"
                image={image}
                alt={name}
                sx={{ objectFit: "cover" }}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {name}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                    }}
                >
                    {description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                    {price} kr
                </Typography>
                <Typography variant="body2" color={stock > 0 ? "success.main" : "error.main"} sx={{ mt: 1 }}>
                    {stock > 0 ? `In Stock: ${stock}` : "Out of Stock"}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={onAddToCart}
                    disabled={stock === 0}
                >
                    Add to Cart
                </Button>
                <Button size="small" variant="outlined" color="secondary" disabled>
                    View More
                </Button>
            </CardActions>
            <Snackbar
                open={showSnackbar}
                autoHideDuration={2000}
                onClose={() => setShowSnackbar(false)}
                message="Produkten har lagts till i kundvagnen!"
            />
        </Card>
    );
};

export default ProductCard;