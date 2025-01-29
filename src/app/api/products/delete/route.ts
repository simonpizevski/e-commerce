import { connectToDB } from "@/lib/db";
import {Product} from "@/models/Product";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface User {
    email?: string | null;
    role?: string;
}

export async function DELETE(req: NextRequest) {
    await connectToDB();

    const session = await getServerSession({req, ...authOptions}) as {user: User};

    if (!session || !session.user || session.user.role !== "admin") {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    try {
        const url = new URL(req.url);
        const productId = url.searchParams.get("id");

        if (!productId) {
            return NextResponse.json({error: "Product ID is required"}, {status: 400});
        }

        const product = await Product.findByIdAndDelete(productId);

        if (!product) {
            return NextResponse.json({error: "Product not found"}, {status: 404});
        }

        return NextResponse.json({success: true, message: "Product deleted"}, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Server error"}, {status: 500});
    }
}