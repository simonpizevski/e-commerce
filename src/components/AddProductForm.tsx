import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const AddProductForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [stock, setStock] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpload = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ml_default");
        formData.append("folder", "ecommerce");

        try {
            setIsUploading(true);

            const response = await fetch(
                "https://api.cloudinary.com/v1_1/dok3sc9dl/image/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error("Failed to upload image");
            }

            const data = await response.json();
            setImage(data.secure_url);
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const product = { name, description, price, image, stock };

        const response = await fetch("/api/products/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });

        if (response.ok) {
            const newProduct = await response.json();
            console.log("Product added:", newProduct);
        } else {
            console.error("Failed to add product");
        }
    };

    const validateFile = (file: File): boolean => {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
            alert("Unsupported file type. Please upload a JPG, PNG, or GIF image.");
            return false;
        }
        return true;
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h5" component="h1" gutterBottom>
                Add Product
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <TextField
                    label="Price"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file && validateFile(file)) {
                            try {
                                await handleImageUpload(file);
                            } catch (error) {
                                console.error("Image upload error:", error);
                            }
                        } else {
                            alert("No file selected. Please select an image file.");
                        }
                    }}
                />
                {isUploading && <Typography>Uploading image...</Typography>}
                {image && (
                    <Typography>
                        Image uploaded: <a href={image}>View Image</a>
                    </Typography>
                )}
                <TextField
                    label="Quantity"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Add Product
                </Button>
            </Box>
        </Container>
    );
};

export default AddProductForm;