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

        if (response && !response.error) {
            const res = await fetch("/api/auth/session");
            const session = await res.json();

            if (session?.user?.role === "admin") {
                router.push("/admin");
            } else {
                router.push("/");
            }
        } else {
            alert("Felaktigt lösenord eller email.");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h1>Log in</h1>
            <label>Email:</label>
            <input type="email" name="email" required />
            <label>Password:</label>
            <input type="password" name="password" required />
            <button type="submit">Log in</button>
        </form>
    );
}