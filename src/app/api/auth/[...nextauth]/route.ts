import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { clientPromise } from "@/utils/mongoAdapter";
import User from "@/models/User";

export const authOptions: AuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    console.error("Email and password are required!");
                    throw new Error("Email och lösenord krävs!");
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
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.role = token.role;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };