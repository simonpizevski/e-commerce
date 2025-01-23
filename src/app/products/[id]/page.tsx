"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Container, Typography, Box, Button, CircularProgress } from "@mui/material";

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    stock: number;
}

export default function ProductDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`);
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return <CircularProgress />;
    }

    if (!product) {
        return <Typography variant="h6">Produkten hittades inte.</Typography>;
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Typography variant="h4" gutterBottom>
                {product.name}
            </Typography>
            <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", borderRadius: "8px", marginBottom: "16px" }}
            />
            <Typography variant="body1" color="text.secondary" paragraph>
                {product.description}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Pris: {product.price} SEK
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
                Lager: {product.stock > 0 ? product.stock : "Slut i lager"}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                disabled={product.stock <= 0}
                onClick={() => router.push("/checkout")}
            >
                Köp nu
            </Button>
        </Container>
    );
}