import MongoDbContainer from '../../containers/MongoDbContainer.js';
import { UserSchema } from '../../schemas/User.js';
import mongoose from 'mongoose';

class MongoDbUsersDao extends MongoDbContainer {
    constructor() {
        super('users', UserSchema);
    }
}

export default MongoDbUsersDao;