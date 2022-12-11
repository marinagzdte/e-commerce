import { Router } from 'express';
import { checkAuth, checkAdmin } from '../middlewares/auth.js';
import { getCarts, postCart, postProduct, getCartsProducts, deleteCart, deleteProduct, deleteAllProducts } from '../controllers/CartsController.js';
import logger from '../utils/logger.js';

const cartRouter = Router();

cartRouter.post('/', logger.logReqInfo, checkAdmin, postCart);

cartRouter.delete('/:id', logger.logReqInfo, checkAdmin, deleteCart);

cartRouter.get('/', logger.logReqInfo, checkAdmin, getCarts);

// to do: check cart belongs to non admin user
cartRouter.get('/:id/productos', logger.logReqInfo, checkAuth, getCartsProducts);

// to do: check cart belongs to non admin user
cartRouter.post('/:id/productos', logger.logReqInfo, checkAuth, postProduct);

// to do: check cart belongs to non admin user
cartRouter.delete('/:id/productos/:id_prod', logger.logReqInfo, checkAuth, deleteProduct);

// to do: check cart belongs to non admin user
cartRouter.delete('/:id/productos', logger.logReqInfo, checkAuth, deleteAllProducts);

export default cartRouter;