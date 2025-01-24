"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = async (event: any) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        const response = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (!response?.error) {
            router.push("/");
        } else {
            alert("Felaktigt lösenord eller email.");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h1>Logga in</h1>
            <label>Email:</label>
            <input type="email" name="email" required />
            <label>Lösenord:</label>
            <input type="password" name="password" required />
            <button type="submit">Logga in</button>
        </form>
    );
}