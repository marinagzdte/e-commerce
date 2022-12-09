import mongoose from 'mongoose';
const { Schema } = mongoose;

export const ProductSchema = new Schema({
    description: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true }
});

