import MongoDbContainer from '../../containers/MongoDbContainer.js';
import { MessageSchema } from '../../schemas/Message.js';

class MongoDbMessagesDao extends MongoDbContainer {
    constructor() {
        super('messages', MessageSchema);
    }
}

export default MongoDbMessagesDao;