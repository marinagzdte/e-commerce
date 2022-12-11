import { Router } from 'express';
import validateAdmin from '../utils/validateAdmin.js';
import { getOrder, postOrder, deleteOrder } from '../controllers/OrdersController.js'
import logger from '../utils/logger.js';

const orderRouter = Router();

orderRouter.get('/:id?', logger.logReqInfo, getOrder);

orderRouter.post('/', logger.logReqInfo, postOrder);

orderRouter.delete('/:id?', logger.logReqInfo, validateAdmin, deleteOrder);

export default orderRouter;