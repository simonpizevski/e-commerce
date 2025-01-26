import {NextRequest, NextResponse} from "next/server";
import {connectToDB} from "@/lib/db";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import Product from "@/models/Product";

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

export async function POST(req: NextRequest) {
    await connectToDB();
    const session = await getServerSession({req, ...authOptions});

    if (!session || !session.user || session.user.role !== "admin") {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    try {
        const data = await req.json();
        const {name, description, price, image, stock} = data;

        if (!name || !description || !price || !image || !stock) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

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