import MongoDbCartsDao from './MongoDbCartsDao.js'
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const persistence = process.env.PERSISTENCE;

let dao
switch (persistence) {
    case 'mongodb':
    default:
        dao = new MongoDbCartsDao()
}

export default class CartsDaoFactory {
    static getDao() {
        return dao
    }
}