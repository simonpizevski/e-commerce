import { connectToDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession, Session } from "next-auth";
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

export async function POST(req: NextRequest) {
    await connectToDB();
    const session = await getServerSession({req, ...authOptions});

    if (!session || !session.user || session.user.role !== "admin") {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    try {
        const data = await req.json();
        const {name, description, price, image, stock} = data;

        const product = await Product.create({
            name,
            description,
            price,
            image,
            stock,
        });

        return NextResponse.json(product, {status: 201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Server error"}, {status: 500});
    }
}