import { connectToDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(req: NextRequest) {
    await connectToDB();

    const session = await getServerSession({ req, ...authOptions });

    if (!session || !session.user || session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const data = await req.json();
        const { productId, name, description, price, image, stock } = data;

        if (!productId) {
            return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = price;
        if (image) product.image = image;
        if (stock !== undefined) product.stock = stock;

        await product.save();
        return NextResponse.json({ success: true, product }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}