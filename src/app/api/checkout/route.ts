import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-12-18.acacia" });

export async function POST(req: Request) {
    const { cartItems } = await req.json();

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: cartItems.map((item: any) => ({
                price_data: {
                    currency: "sek",
                    product_data: { name: item.name },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            })),
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (error: any) {
        console.error("Stripe checkout error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}