import { connectToDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
    await connectToDB();
    const products = await Product.find({});
    return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(req, authOptions);
    if (!session || !session.user || (session.user as { role: string }).role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();
    const data = await req.json();
    const newProduct = new Product(data);
    await newProduct.save();
    return NextResponse.json(newProduct);
}