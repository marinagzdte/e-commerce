import { Router } from 'express';
import { checkAdmin, checkAuth } from '../middlewares/auth.js';
import { getOrders, getOrder, postOrder, deleteOrder } from '../controllers/OrdersController.js'
import logger from '../utils/logger.js';

const orderRouter = Router();

// si el usuario es admin trae todas las ordenes
// sino, trae todas las ordenes del usuario logueado
orderRouter.get('/', logger.logReqInfo, checkAuth, getOrders);

orderRouter.get('/:id', logger.logReqInfo, checkAdmin, getOrder);

orderRouter.post('/', logger.logReqInfo, postOrder);

orderRouter.delete('/:id?', logger.logReqInfo, checkAdmin, deleteOrder);

export default orderRouter;