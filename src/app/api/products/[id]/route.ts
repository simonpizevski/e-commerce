import { connectToDB } from "@/lib/db";
import {Product} from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    await connectToDB();
    const product = await Product.findById(params.id);
    if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    await connectToDB();
    const data = await req.json();
    const product = await Product.findByIdAndUpdate(params.id, data, { new: true });
    if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    await connectToDB();
    const product = await Product.findByIdAndDelete(params.id);
    if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Product deleted successfully" });
}