import { connectToDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    await connectToDB();

    try {
        const { productId, quantity } = await req.json();

        if (!productId || !quantity || quantity <= 0) {
            return NextResponse.json({ error: "Invalid product or quantity" }, { status: 400 });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        if (product.stock < quantity) {
            return NextResponse.json(
                { error: "Not enough stock available" },
                { status: 400 }
            );
        }

        product.stock -= quantity;
        await product.save();

        return NextResponse.json({ success: true, product }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}