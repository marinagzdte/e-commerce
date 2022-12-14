import CartsDaoFactory from '../daos/carts/CartsDaoFactory.js'
import { asDto } from '../dtos/CartDto.js'
import logger from '../utils/logger.js'

export class CartRepository {
    #dao

    constructor() {
        this.#dao = CartsDaoFactory.getDao()
    }

    async getAll() {
        const carts = asDto(await this.#dao.getAll())
        return carts;
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