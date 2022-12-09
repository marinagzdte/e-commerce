import MongoDbProductsDao from './MongoDbProductsDao.js'
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

// import FirebaseProductsDao from './FirebaseProductsDao.js'
// import yargs from 'yargs/yargs';
// import { hideBin } from 'yargs/helpers'

// const argv = yargs(hideBin(process.argv)).argv;
// const option = argv.persistence || 'mongo';
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

export default class PersonasDaoFactory {
    static getDao() {
        return dao
    }
}