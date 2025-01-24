import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  customer: { type: String, required: true },
  status: { type: String, default: "Pending" },
});

const Order = models.Order || model("Order", OrderSchema);
export default Order;
