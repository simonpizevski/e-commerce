import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    stock: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: true,
  },
);

const Product = models.Product || model("Product", ProductSchema);
export default Product;
