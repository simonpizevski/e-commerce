import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/lib/db";
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
                await connectToDB();

                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Both email and password required!");
                }

                const normalizedEmail = credentials.email.trim().toLowerCase();
                const user = await User.findOne({ email: normalizedEmail });
                if (!user) {
                    throw new Error("User not found!");
                }

                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password,
                    user.password
                );
                console.log("Password correctness:", isPasswordCorrect);

                if (!isPasswordCorrect) {
                    throw new Error("Invalid password!");
                }

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
                token.id = user.id;
                token.role = user.role;
                token.expires = Date.now() + 30 * 60 * 1000;
            }

            if (Date.now() > (token.expires as number)) {
                console.warn("JWT token expired");
                return null;
            }

            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    ...session.user,
                    id: token.id,
                    role: token.role,
                };

                if (Date.now() > (token.expires as number)) {
                    console.log("Session expired, logging out...");
                    return null;
                }
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    csrf: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };