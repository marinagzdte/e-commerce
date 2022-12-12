import { Router } from 'express';
import { checkAdmin, checkAuth } from '../middlewares/auth.js';
import { getProduct, getProductsByCategory, postProduct, putProduct, deleteProduct } from '../controllers/ProductsController.js'
import logger from '../utils/logger.js';

const productRouter = Router();

productRouter.get('/:id?', logger.logReqInfo, checkAuth, getProduct);

productRouter.get('/categoria/:category', logger.logReqInfo, checkAuth, getProductsByCategory);

productRouter.post('/', logger.logReqInfo, checkAdmin, postProduct);

productRouter.put('/:id', logger.logReqInfo, checkAdmin, putProduct);

productRouter.delete('/:id?', logger.logReqInfo, checkAdmin, deleteProduct);

export default productRouter;