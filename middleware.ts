import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDB } from "@/lib/db";
import User from "@/models/User";

export async function middleware(request: NextRequest) {
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");
    const pathname = new URL(request.url).pathname;

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET || "default-secret-key"
        ) as jwt.JwtPayload;

        await connectToDB();
        const user = await User.findById(decodedToken.id);

        if (!user) {
            return NextResponse.redirect(
                new URL("/login", request.url)
            );
        }

        if (pathname.startsWith("/admin") && decodedToken?.role !== "admin") {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        if (
            pathname.startsWith("/customer") &&
            decodedToken?.role !== "customer"
        ) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    } catch (error) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/customer/:path*"],
};