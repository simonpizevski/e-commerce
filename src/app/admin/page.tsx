'use client';

import { useSession } from "next-auth/react";
import { useState } from "react";
import AddProductForm from "@/components/AddProductForm";

type User = {
    email: string;
    role: string;
};

export default function AdminPage() {
    const { data: session, status } = useSession();
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (!session) {
        return <p>You must log in to access this page.</p>;
    }

    const user = session.user as User;

    if (!user || user.role !== "admin") {
        return <p>Access denied! Only admins can see this page.</p>;
    }

    const handleCreateProduct = async (event: any) => {
        event.preventDefault();

        const response = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: productName,
                price: productPrice,
            }),
        });

        if (response.ok) {
            alert("Product created successfully!");
            setProductName("");
            setProductPrice("");
        } else {
            alert("Failed to create product.");
        }
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <p>Welcome {user.email}!</p>
            <AddProductForm  />
        </div>
    );
}