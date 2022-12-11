import { Router } from 'express';
import { checkAuth, checkAdmin } from '../middlewares/auth.js';
import { getMessages, getMessage, postMessage, deleteMessage } from '../controllers/MessagesController.js'
import logger from '../utils/logger.js';

const messageRouter = Router();

// si el usuario es admin trae todos los mensajes
// sino, trae todos los usuarios "de" o "para" el usuario logueado
messageRouter.get('/', logger.logReqInfo, checkAuth, getMessages);

messageRouter.get('/:id', logger.logReqInfo, checkAdmin, getMessage);

messageRouter.post('/', logger.logReqInfo, checkAuth, postMessage);

messageRouter.delete('/:id?', logger.logReqInfo, checkAdmin, deleteMessage);

export default messageRouter;