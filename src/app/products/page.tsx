"use client";

import { useEffect, useState } from "react";
import { Grid, Container, Typography, CircularProgress } from "@mui/material";
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
            <Typography variant="h4" gutterBottom>
                Våra produkter
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={4}>
                    {products.map((product) => (
                        <Grid item key={product._id} xs={12} sm={6} md={4}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}