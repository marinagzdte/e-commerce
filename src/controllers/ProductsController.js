import { ProductsRepository } from '../repositories/ProductRepository.js'
import logger from '../utils/logger.js';

const productsApi = new ProductsRepository();

const getProduct = async (req, res) => {
    if (req.params.id === undefined) {
        try {
            const products = await productsApi.getAll();
            res.json(products);
        } catch (error) {
            logger.logError(error)

            res.status(500);
            res.json({ error: -1, descripcion: 'error al listar los productos' });
        }
    } else {
        try {
            const product = await productsApi.getById(req.params.id);
            res.json(product);
        } catch (error) {
            logger.logError(error);

            if (error.message.includes('404'))
                res.status(404);
            else
                res.status(500);
            res.json({ error: -2, descripcion: 'producto no encontrado' });
        }
    }
}

const getProductsByCategory = async (req, res) => {
    try {
        const aux = await productsApi.getAll();
        const products = aux.filter(p => p.category.toLowerCase() === req.params.category.toLowerCase())
        res.json(products);
    } catch (error) {
        logger.logError(error)

        res.status(500);
        res.json({ error: -1, descripcion: 'error al listar los productos' });
    }
}

const postProduct = async (req, res) => {
    try {
        const id = await productsApi.add(req.body);
        res.json({ id: id });
    } catch (error) {
        logger.logError(error);

        res.status(500);
        res.json({ error: -3, descripcion: 'error al guardar producto' });
    }
}

const putProduct = async (req, res) => {
    try {
        await productsApi.modifyById(req.params.id, req.body);
        res.status(204);
        res.send();
    } catch (error) {
        logger.logError(error);

        if (error.message.includes('404'))
            res.status(404);
        else
            res.status(500);

        res.json({ error: -4, descripcion: 'error al actualizar producto' });
    }
}

const deleteProduct = async (req, res) => {
    if (req.params.id === undefined) {
        try {
            await productsApi.deleteAll();
            res.status(204)
                .send();
        } catch (error) {
            logger.logError(error)

            res.status(500);
            res.json({ error: -1, descripcion: 'error al eliminar los productos' });
        }
    } else {
        try {
            await productsApi.deleteById(req.params.id);
            res.status(204)
                .send();
        } catch (error) {
            logger.logError(error);

            if (error.message.includes('404'))
                res.status(404);
            else
                res.status(500);

            res.json({ error: -5, descripcion: 'error al borrar producto' });
        }
    }
}

export { getProduct, getProductsByCategory, postProduct, putProduct, deleteProduct }