import MongoDbMessagesDao from './MongoDbMessagesDao.js'
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const persistence = process.env.PERSISTENCE;

let dao
switch (persistence) {
    case 'mongodb':
    default:
        dao = new MongoDbMessagesDao()
}

export default class MessagesDaoFactory {
    static getDao() {
        return dao
    }
}