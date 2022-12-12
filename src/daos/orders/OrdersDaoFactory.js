import MongoDbOrdersDao from './MongoDbOrdersDao.js'
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const persistence = process.env.PERSISTENCE;
console.log(`Persistencia seleccionada: ${persistence}`);

let dao
switch (persistence) {
    case 'mongodb':
        dao = new MongoDbOrdersDao()
        break
    // case 'firebase':
    //     dao = new FirebaseOrdersDao()
    //     break
    default:
        dao = new MongoDbOrdersDao()
}

export default class OrdersDaoFactory {
    static getDao() {
        return dao
    }
}