import MongoDbProductsDao from './MongoDbProductsDao.js'
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const persistence = process.env.PERSISTENCE;
console.log(`Persistencia seleccionada: ${persistence}`);

let dao
switch (persistence) {
    case 'mongo':
        dao = new MongoDbProductsDao()
        break
    // case 'firebase':
    //     dao = new FirebaseProductsDao()
    //     break
    default:
        dao = new MongoDbProductsDao()
}

export default class ProductsDaoFactory {
    static getDao() {
        return dao
    }
}