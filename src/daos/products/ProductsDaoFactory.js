import MongoDbProductsDao from './MongoDbProductsDao.js'
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const persistence = process.env.PERSISTENCE;

let dao
switch (persistence) {
    case 'mongodb':
    default:
        dao = new MongoDbProductsDao()
}

export default class ProductsDaoFactory {
    static getDao() {
        return dao
    }
}