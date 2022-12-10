import { MessagesRepository } from '../repositories/MessageRepository.js'
import logger from '../utils/logger.js';

const messagesApi = new MessagesRepository();

const getMessage = async (req, res) => {
    if (req.params.id === undefined) {
        try {
            const messages = await messagesApi.getAll();
            res.json(messages);
        } catch (error) {
            logger.logError(error)

            res.status(500);
            res.json({ error: -1, descripcion: 'error al listar los mensajes' });
        }
    } else {
        try {
            const message = await messagesApi.getById(req.params.id);
            res.json(message);
        } catch (error) {
            logger.logError(error);

            if (error.message.includes('404'))
                res.status(404);
            else
                res.status(500);
            res.json({ error: -2, descripcion: 'mensaje no encontrado' });
        }
    }
}

const postMessage = async (req, res) => {
    try {
        const id = await messagesApi.add(req.body);
        res.json({ id: id });
    } catch (error) {
        logger.logError(error);

        res.status(500);
        res.json({ error: -3, descripcion: 'error al guardar mensaje' });
    }
}

const deleteMessage = async (req, res) => {
    if (req.params.id === undefined) {
        try {
            await messagesApi.deleteAll();
            res.status(204)
               .send();
        } catch (error) {
            logger.logError(error)

            res.status(500);
            res.json({ error: -1, descripcion: 'error al eliminar los mensajes' });
        }
    } else {
        try {
            await messagesApi.deleteById(req.params.id);
            res.status(204)
               .send();
        } catch (error) {
            logger.logError(error);
    
            if (error.message.includes('404'))
                res.status(404);
            else
                res.status(500);
    
            res.json({ error: -5, descripcion: 'error al borrar mensaje' });
        }
    }
}

export { getMessage, postMessage, deleteMessage }