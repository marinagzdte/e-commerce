import { OrdersRepository } from '../repositories/OrderRepository.js'
import { sendNewOrderEmail } from '../utils/emailUtils.js'
import { isAdmin } from '../middlewares/auth.js';
import logger from '../utils/logger.js';

const ordersApi = new OrdersRepository();
let totalOrders = 0;

const getOrders = async (req, res) => {
    try {
        let orders;
        if (isAdmin(req.user)) {
            orders = await ordersApi.getAll();
        } else {
            let aux = await ordersApi.getAll();
            orders = aux.filter(o => o.email === req.user.email)
        }    
        res.json(orders);

    } catch (error) {
        logger.logError(error)

        res.status(500);
        res.json({ error: -1, descripcion: 'error al listar los mensajes' });
    }
}


const getOrder = async (req, res) => {
    if (req.params.id === undefined) {
        try {
            const orders = await ordersApi.getAll();
            res.json(orders);
        } catch (error) {
            logger.logError(error)

            res.status(500);
            res.json({ error: -1, descripcion: 'error al listar las ordenes' });
        }
    } else {
        try {
            const order = await ordersApi.getById(req.params.id);
            res.json(order);
        } catch (error) {
            logger.logError(error);

            if (error.message.includes('404'))
                res.status(404);
            else
                res.status(500);
            res.json({ error: -2, descripcion: 'orden no encontrada' });
        }
    }
}

const postOrder = async (req, res) => {
    try {
        totalOrders++
        const newOrder = {
            number: totalOrders,
            items: req.body.items,
            timestamp: Date.now().toString(),
            status: "generated",
            email: req.user.email,
            address: req.user.address,
            phoneNumber: req.user.phoneNumber
        }
        const id = await ordersApi.add(newOrder);
        await sendNewOrderEmail(newOrder);

        res.json({ id: id });
    } catch (error) {
        totalOrders--
        logger.logError(error);

        res.status(500);
        res.json({ error: -3, descripcion: 'error al guardar orden' });
    }
}

const deleteOrder = async (req, res) => {
    if (req.params.id === undefined) {
        try {
            await ordersApi.deleteAll();
            res.status(204)
               .send();
        } catch (error) {
            logger.logError(error)

            res.status(500);
            res.json({ error: -1, descripcion: 'error al eliminar las ordenes' });
        }
    } else {
        try {
            await ordersApi.deleteById(req.params.id);
            res.status(204)
               .send();
        } catch (error) {
            logger.logError(error);
    
            if (error.message.includes('404'))
                res.status(404);
            else
                res.status(500);
    
            res.json({ error: -5, descripcion: 'error al borrar orden' });
        }
    }
}

export { getOrders, getOrder, postOrder, deleteOrder }