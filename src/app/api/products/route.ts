import { connectToDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAllProducts } from "@/lib/products";

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

    try {
        const products = await getAllProducts();
        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}

/*export async function POST(req: NextRequest) {
    await connectToDB();
    const session = await getServerSession({req, ...authOptions});

    if (!session || !session.user || session.user.role !== "admin") {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    try {
        const data = await req.json();
        const {name, description, price, image, category, stock} = data;

        if (!name || !description || !price || !category || !image || !stock) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const product = await Product.create({
            name,
            description,
            price,
            image,
            category,
            stock
        });

        return NextResponse.json(product, {status: 201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Server error"}, {status: 500});
    }
}*/