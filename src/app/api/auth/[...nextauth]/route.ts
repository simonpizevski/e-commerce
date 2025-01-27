import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "@/models/User";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Login",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    console.error("Email and password are required!");
                    throw new Error("Email and password required!");
                }

                await mongoose.connect(process.env.MONGODB_URI || "");
                console.log("Connected to MongoDB in auth");

                const user = await User.findOne({ email: credentials.email });
                if (!user) {
                    console.error("User not found!");
                    throw new Error("User not found!");
                }

                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password,
                    user.password
                );
                console.log("Password correctness:", isPasswordCorrect);

                if (!isPasswordCorrect) {
                    console.error("Incorrect password!");
                    throw new Error("Fel lösenord!");
                }

                console.log("User authenticated successfully");

                return {
                    id: user._id,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user && 'role' in user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            console.log("Session callback token:", token);
            if (token) {
                session.user.role = token.role;

                const user = await User.findById(token.sub);
                if (!user) {
                    console.log("User not found, ending session.");
                    return null;
                }
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    csrf: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };