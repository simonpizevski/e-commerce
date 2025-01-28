import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, CircularProgress, MenuItem } from "@mui/material";

const AddProductForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [stock, setStock] = useState(0);
    const [category, setCategory] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [previewImage, setPreviewImage] = useState<string>("");
    const categories = ["T-shirts", "Pants", "Shoes", "Accessories"];

    const validateFile = (file: File): boolean => {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
            setErrorMessage("Unsupported file type. Please upload a JPG, PNG, or GIF image.");
            return false;
        }
        return true;
    };

    const handleImageUpload = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ml_default");
        formData.append("folder", "ecommerce");

        try {
            setIsUploading(true);
            setErrorMessage("");

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
            setPreviewImage(data.secure_url);
        } catch (error) {
            console.error("Error uploading image:", error);
            setErrorMessage("Image upload failed. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && validateFile(file)) {
            setPreviewImage(URL.createObjectURL(file));
            await handleImageUpload(file);
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        if (!name.trim() || !description.trim() || !category.trim() || !image.trim() || price <= 0 || stock <= 0 ) {
            setErrorMessage("Please fill out all required fields and ensure prices and quantities are valid.");
            return;
        }

        const product = { name, description, price, image, category, stock };

        const response = await fetch("/api/products/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });

        if (response.ok) {
            const newProduct = await response.json();
            alert("Product successfully added!");
            console.log("Product added:", newProduct);
            setName("");
            setDescription("");
            setPrice(0);
            setImage("");
            setStock(0);
            setPreviewImage("");
            setCategory("");
        } else {
            console.error("Failed to add product");
        }
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
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mt: 2,
                        border: "2px dashed #ccc",
                        borderRadius: "8px",
                        padding: "16px",
                        position: "relative",
                        textAlign: "center",
                    }}
                >
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                        Drag and drop an image here or click to select a file
                    </Typography>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onFileChange}
                        style={{
                            opacity: 0,
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                        }}
                    />
                    {isUploading ? (
                        <CircularProgress size={24} />
                    ) : previewImage ? (
                        <Box
                            component="img"
                            src={previewImage}
                            alt="Preview"
                            sx={{
                                maxWidth: "100%",
                                maxHeight: "150px",
                                mt: 2,
                                borderRadius: "8px",
                            }}
                        />
                    ) : (
                        <Typography variant="body2" color="textSecondary">
                            No file selected
                        </Typography>
                    )}
                </Box>
                <TextField
                    select
                    label="Category"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    {categories.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                            {cat}
                        </MenuItem>
                    ))}
                </TextField>
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
                    disabled={!image || isUploading}
                >
                    Add Product
                </Button>
            </Box>
        </Container>
    );
};

export default AddProductForm;