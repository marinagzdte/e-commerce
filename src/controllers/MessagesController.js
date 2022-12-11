import { MessagesRepository } from '../repositories/MessageRepository.js'
import { isAdmin } from '../middlewares/auth.js';
import logger from '../utils/logger.js';

const messagesApi = new MessagesRepository();

const getMessages = async (req, res) => {
    try {
        let messages;
        if (isAdmin(req.user)) {
            messages = await messagesApi.getAll();
        } else {
            let aux = await messagesApi.getAll();
            messages = Array.prototype.concat(aux.filter(msg => msg.to === req.user.email),
                                              aux.filter(msg => msg.from === req.user.email))
        }    
        res.json(messages);

    } catch (error) {
        logger.logError(error)

        res.status(500);
        res.json({ error: -1, descripcion: 'error al listar los mensajes' });
    }
}

const getMessage = async (req, res) => {
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

export { getMessages, getMessage, postMessage, deleteMessage }