import { connectToDB } from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import {getSession} from "next-auth/react";

export async function GET(req: Request) {
    await connectToDB();
    const products = await Product.find({});
    return NextResponse.json(products);
}

export async function POST(req: Request) {
    const session = await getSession({ req });
    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();
    const data = await req.json();
    const newProduct = new Product(data);
    await newProduct.save();
    return NextResponse.json(newProduct);
}