import MongoDbCartsDao from './MongoDbCartsDao.js'
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const persistence = process.env.PERSISTENCE;
console.log(`Persistencia seleccionada: ${persistence}`);

let dao
switch (persistence) {
    case 'mongodb':
        dao = new MongoDbCartsDao()
        break
    // case 'firebase':
    //     dao = new FirebaseOrdersDao()
    //     break
    default:
        dao = new MongoDbCartsDao()
}

export default class CartsDaoFactory {
    static getDao() {
        return dao
    }
}