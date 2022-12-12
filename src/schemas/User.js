import mongoose from 'mongoose';
const { Schema } = mongoose;

export const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cart: { type: String, required: true }
})