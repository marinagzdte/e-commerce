import MongoDbUsersDao from './MongoDbUsersDao.js'
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const persistence = process.env.PERSISTENCE;

let dao
switch (persistence) {
    case 'mongodb':
    default:
        dao = new MongoDbUsersDao()
}

export default class UsersDaoFactory {
    static getDao() {
        return dao
    }
}