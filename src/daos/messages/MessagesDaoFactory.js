import MongoDbMessagesDao from './MongoDbMessagesDao.js'
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const persistence = process.env.PERSISTENCE;
console.log(`Persistencia seleccionada: ${persistence}`);

let dao
switch (persistence) {
    case 'mongodb':
        dao = new MongoDbMessagesDao()
        break
    // case 'firebase':
    //     dao = new FirebaseMessagesDao()
    //     break
    default:
        dao = new MongoDbMessagesDao()
}

export default class MessagesDaoFactory {
    static getDao() {
        return dao
    }
}