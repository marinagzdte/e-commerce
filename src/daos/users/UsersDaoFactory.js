import MongoDbUsersDao from './MongoDbUsersDao.js'
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const persistence = process.env.PERSISTENCE;
console.log(`Persistencia seleccionada: ${persistence}`);

let dao
switch (persistence) {
    case 'mongodb':
        dao = new MongoDbUsersDao()
        break
    // case 'firebase':
    //     dao = new FirebaseOrdersDao()
    //     break
    default:
        dao = new MongoDbUsersDao()
}

export default class UsersDaoFactory {
    static getDao() {
        return dao
    }
}