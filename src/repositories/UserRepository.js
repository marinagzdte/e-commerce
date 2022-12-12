//import Product from '../models/Product.js'
import UsersDaoFactory from '../daos/users/UsersDaoFactory.js'
import { asDto } from '../dtos/UserDto.js'
import logger from '../utils/logger.js'

export class UsersRepository {
    #dao

    constructor() {
        this.#dao = UsersDaoFactory.getDao()
    }

    async getAll() {
        const products = asDto(await this.#dao.getAll())
        return products;
    }

    async getById(id) {
        const dto = asDto(await this.#dao.getById(id))
        return dto
    }

    async getByCondition(condition) {
        const dto = asDto(await this.#dao.getByCondition(condition))
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