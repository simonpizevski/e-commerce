import { connectToDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

declare module "next-auth" {
    interface Session {
        user?: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role?: string | null;
        };
    }
}

export async function GET() {
    await connectToDB();
    const products = await Product.find({});
    return NextResponse.json(products);
}

