"use client";

import { useEffect, useState } from "react";
import { Container, Typography, CircularProgress, Box } from "@mui/material";
import ProductCard from "@/components/ProductCard";

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    stock: number;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 8 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Products
            </Typography>
            {loading ? (
                <CircularProgress sx={{ display: "block", mt: 4, mx: "auto" }} />
            ) : products.length > 0 ? (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: 4,
                        mt: 4,
                    }}
                >
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            name={product.name}
                            description={product.description}
                            price={product.price}
                            image={product.image}
                        />
                    ))}
                </Box>
            ) : (
                <Typography variant="body1" color="text.secondary" sx={{ mt: 4 }}>
                    No products available.
                </Typography>
            )}
        </Container>
    );
}