import mongoose, { Schema, Document } from "mongoose";

interface Order extends Document {
  userEmail: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: string;
  createdAt: Date;
}

const OrderSchema = new Schema<Order>({
  userEmail: { type: String, required: true },
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  total: { type: Number, required: true },
  status: { type: String, default: "Processing" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model<Order>("Order", OrderSchema);