import httpServer from './src/server.js';
import logger from './src/utils/logger.js';
import mongoose from 'mongoose';
import config from './src/config.js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const PORT = Number(process.env.PORT) || 8080;
const server = httpServer.listen(PORT, async () => {
    logger.logInfo(`Servidor escuchando en puerto ${PORT}.`);
    try {
        await mongoose.connect(process.env.CONNECTION_STRING, config.mongodb.options)
        logger.logInfo('conectado a la db')
    } catch (error) {
        logger.logError(error)
    }
})

server.on('error', error => logger.logError(error))