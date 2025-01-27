"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    stock: number;
}

interface CartItem extends Product {
    quantity: number;
}

interface CartContextProps {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    totalItems: number;
    totalPrice: number;
    clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item._id === product._id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCartItems((prevItems) =>
            prevItems
                .map((item) => (item._id === productId ? { ...item, quantity: item.quantity - 1 } : item))
                .filter((item) => item.quantity > 0)
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, totalItems, totalPrice, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};