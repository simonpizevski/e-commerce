"use client";

import { useEffect, useState } from "react";
import React from 'react';
import {

} from "@mui/material";

interface Product {
    _id?: string;
    name: string;
    description: string;
    price: number;
    image: string;
    stock: number;
}

export default function AdminPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [newProduct, setNewProduct] = useState<Product>({
        name: "",
        description: "",
        price: 0,
        image: "",
        stock: 0,
    });



    return (
        <div></div>
    );
}