import { connectToDB } from "@/lib/db";
import {createProduct, getAllProducts} from "@/lib/products";
import { uploadImage } from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
    await connectToDB();

    const session = await getServerSession({ req, ...authOptions });
    if (!session || (session.user as { role: string })?.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try {
        const data = await req.json();
        const { name, description, price, category, stock, image,  } = data;

        if (!name || !description || price === undefined || category === undefined || image === undefined || stock === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const existingProducts = await getAllProducts();
        const nameExists = existingProducts.some((product) => product.name === name);
        if (nameExists) {
            return NextResponse.json({ error: "Product with this name already exists" }, { status: 409 });
        }

        const imageUrl = await uploadImage(image);

        const product = await createProduct({
            name,
            description,
            price,
            image: imageUrl,
            category,
            stock
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error("Error creating product:", error);
        if ((error as { code?: number })?.code === 11000) {
            return NextResponse.json({ error: "Product with this name already exists" }, { status: 409 });
        }
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}