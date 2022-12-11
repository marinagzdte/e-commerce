import mongoose from 'mongoose';
const { Schema } = mongoose;

export const MessageSchema = new Schema({
    to: { type: String, required: true },
    from: {type: String, required: true},
    type: { type: String, required: true },
    timestamp: { type: String, required: true },
    text: { type: String, required: true }
});