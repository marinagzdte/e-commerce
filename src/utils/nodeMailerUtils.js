import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import { createTransport } from "nodemailer";
import logger from "./logger.js";

const transporter = createTransport({
    service: 'gmail',
    port: process.env.NODEMAILER_PORT,
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

export const sendMail = async (options) => {
    try {
        await transporter.sendMail(options)
    } catch (error) {
        logger.logError(error)
    }
}