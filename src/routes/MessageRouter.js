import { Router } from 'express';
import validateAdmin from '../utils/validateAdmin.js';
import { getMessage, postMessage, deleteMessage } from '../controllers/MessagesController.js'
import logger from '../utils/logger.js';

const messageRouter = Router();

messageRouter.get('/:id?', logger.logReqInfo, getMessage);

messageRouter.post('/', logger.logReqInfo, postMessage);

messageRouter.delete('/:id?', logger.logReqInfo, validateAdmin, deleteMessage);

export default messageRouter;