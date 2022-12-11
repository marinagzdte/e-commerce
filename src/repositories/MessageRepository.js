//import Product from '../models/Product.js'
import MessagesDaoFactory from '../daos/messages/MessagesDaoFactory.js'
import { asDto } from '../dtos/MessageDTO.js'
import logger from '../utils/logger.js'

export class MessagesRepository {
    #dao

    constructor() {
        this.#dao = MessagesDaoFactory.getDao()
    }

    async getAll() {
        const messages = asDto(await this.#dao.getAll())
        return messages;
    }

    async getById(id) {
        const dto = asDto(await this.#dao.getById(id))
        return dto
    }

    async modifyById(id, prod) {
        await this.#dao.modifyItemById(id, prod);
    }

    async add(doc) {
        const id = await this.#dao.save(doc)
        return id
    }

    async deleteById(id) {
        await this.#dao.deleteById(id)
    }

    async deleteAll() {
        await this.#dao.deleteAll()
    }
}