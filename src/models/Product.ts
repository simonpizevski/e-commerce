import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: false },
    category: { type: String, required: true },
    stock: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: true,
  },
);

export const Product =
  models.Product || model("Product", ProductSchema, "products");
