import OrdersDaoFactory from '../daos/orders/OrdersDaoFactory.js'
import { asDto } from '../dtos/OrderDto.js'
import logger from '../utils/logger.js'

export class OrdersRepository {
    #dao

    constructor() {
        this.#dao = OrdersDaoFactory.getDao()
    }

    async getAll() {
        const orders = asDto(await this.#dao.getAll())
        return orders;
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