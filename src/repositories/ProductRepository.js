//import Product from '../models/Product.js'
import ProductsDaoFactory from '../daos/products/ProductsDaoFactory.js'
import { asDto } from '../dtos/ProductDTO.js'
import logger from '../utils/logger.js'

export class ProductsRepository {
    #dao

    constructor() {
        this.#dao = ProductsDaoFactory.getDao()
    }

    async getAll() {
        const products = asDto(await this.#dao.getAll())
        return products;
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