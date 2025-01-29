import {Product} from "@/models/Product";

export async function getAllProducts() {
    return Product.find({});
}

export async function getProductById(id: string) {
    return await Product.findById(id);
}

export async function createProduct(data: {
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    category: string;
}) {
    return await Product.create(data);
}

export async function updateProduct(id: string, updates: any) {
    return await Product.findByIdAndUpdate(id, updates, { new: true });
}

export async function deleteProduct(id: string) {
    return await Product.findByIdAndDelete(id);
}

export async function updateProductStock(id: string, stock: number) {
    if (stock < 0) throw new Error("Stock cannot be negative");
    return await Product.findByIdAndUpdate(id, { stock }, { new: true });
}