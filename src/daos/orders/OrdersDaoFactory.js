import MongoDbOrdersDao from './MongoDbOrdersDao.js'
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const persistence = process.env.PERSISTENCE;

let dao
switch (persistence) {
    case 'mongodb':
    default:
        dao = new MongoDbOrdersDao()
}

export default class OrdersDaoFactory {
    static getDao() {
        return dao
    }
}