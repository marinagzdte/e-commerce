import { CartRepository } from '../repositories/CartRepository.js'
import logger from '../utils/logger.js';


const cartsApi = new CartRepository();

const getCarts = async (req, res) => {
    try {
        const carts = await cartsApi.getAll();
        res.json(carts);
    } catch (error) {
        logger.logError(error);

        res.status(500);
        res.json({ error: -6, descripcion: 'error listar carritos' });
    }
}

const postCart = async (req, res) => {
    try {
        const id = await cartsApi.add(req.body);
        res.json({ id: id });
    } catch (error) {
        logger.logError(error);

        res.status(500);
        res.json({ error: -6, descripcion: 'error al guardar carrito' });
    }
}

const deleteCart = async (req, res) => {
    try {
        await cartsApi.deleteById(req.params.id);
        res.status(204);
        res.send();
    } catch (error) {
        logger.logError(error);

        if (error.message.includes('404'))
            res.status(404);
        else
            res.status(500);

        res.json({ error: -7, descripcion: 'carrito no encontrado' });
    }
}

const getCartsProducts = async (req, res) => {
    try {
        const cart = await cartsApi.getById(req.params.id);
        res.json(cart.products);
    } catch (error) {
        logger.logError(error);

        if (error.message.includes('404'))
            res.status(404);
        else
            res.status(500);

        res.json({ error: -7, descripcion: 'carrito no encontrado' })
    }
}

const postProduct = async (req, res) => {
    try {
        const cart = await cartsApi.getById(req.params.id);
        const index = cart.products.findIndex(p => p.id == req.body.id)
        if (index === -1) {
            const prod = req.body
            prod.amount = 1
            cart.products.push(prod);
        }
        else
            cart.products[index].amount += 1
            
        cartsApi.modifyById(req.params.id, cart);
        res.json(cart.products);
    } catch (error) {
        logger.logError(error);

        res.status(500);
        res.json({ error: -8, descripcion: 'no se pudo agregar el producto al carrito' })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const cart = await cartsApi.getById(req.params.id);

        const index = cart.products.findIndex(prod => prod.id === req.params.id_prod)
        if (index === -1) {
            res.status(404)
            res.json({ error: -9, descripcion: 'el carrito no contiene ese producto' });
        } else {
            cart.products.splice(index, 1);
            await cartsApi.modifyById(req.params.id, cart);
            res.status(204);
            res.send();
        }

    } catch (error) {
        logger.logError(error);

        if (error.message.includes('404')) {
            res.status(404);
            res.json({ error: -7, descripcion: 'carrito no encontrado' });
        }
        else {
            res.status(500);
            res.json({ error: -10, descripcion: 'no se pudo eliminar el producto del carrito' })
        }
    }
}

const deleteAllProducts = async (req, res) => {
    try {
        const cart = await cartsApi.getById(req.params.id);

        const index = cart.products.findIndex(prod => prod.id === req.params.id_prod || prod._id === req.params.id_prod)
        if (index === -1) {
            res.status(404)
            res.json({ error: -9, descripcion: 'el carrito no contiene ese producto' });
        } else {
            cart.products = []
            await cartsApi.modifyById(req.params.id, cart);
            res.status(204);
            res.send();
        }

    } catch (error) {
        logger.logError(error);

        if (error.message.includes('404')) {
            res.status(404);
            res.json({ error: -7, descripcion: 'carrito no encontrado' });
        }
        else {
            res.status(500);
            res.json({ error: -10, descripcion: 'no se pudo eliminar el producto del carrito' })
        }
    }
}

export { getCarts, postCart, postProduct, deleteCart, deleteProduct, deleteAllProducts, getCartsProducts };