import React from "react";
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from "@mui/material";

interface ProductCardProps {
    name: string;
    description: string;
    price: number;
    image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, description, price, image }) => {
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
                <Typography variant="body2" color="text.secondary" noWrap>
                    {description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                    {price} kr
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained" color="primary">
                    Add to Cart
                </Button>
                <Button size="small" variant="outlined" color="secondary">
                    View More
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;