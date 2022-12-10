import mongoose from 'mongoose';
const { Schema } = mongoose;

export const MessageSchema = new Schema({
    email: { type: String, required: true },
    type: { type: String, required: true },
    timestamp: { type: String, required: true },
    text: { type: String, required: true }
});