import mongoose from 'mongoose';
const { Schema } = mongoose;

export const OrderSchema = new Schema({
    number: { type: Number, required: true },
    items: { type: Array, required: true },
    timestamp: { type: String, required: true },
    status: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true},
    phoneNumber: { type: String, required: true }
});