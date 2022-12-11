import mongoose from 'mongoose';
const { Schema } = mongoose;

export const CartSchema = new Schema({
    timestamp: { type: Date, required: true },
    email: { type: String, required: true},
    address: { type: String, required: true },
    products: { type: Array, required: true },
});