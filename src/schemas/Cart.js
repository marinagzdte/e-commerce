import mongoose from 'mongoose';
const { Schema } = mongoose;

export const CartSchema = new Schema({
    timestamp: { type: Date, required: true },
    products: { type: Array, required: true },
});